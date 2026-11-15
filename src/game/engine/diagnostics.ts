import { getOrbit, PARTS } from "../data/catalog";
import type { Check, SavedRun } from "../types";
import { verify } from "./validation";
import { flightLifecycle } from "./flight-lifecycle";
export type DiagnosticStatus = "PASS" | "WARNING" | "FAIL" | "NOT EVALUATED";
export interface DiagnosticFinding {
    id: string;
    name: string;
    status: DiagnosticStatus;
    evidence: string;
    impact: string;
    recommendation: string;
    sourceIds: string[];
}
export interface DiagnosticTest {
    id: string;
    name: string;
    status: DiagnosticStatus;
    findings: DiagnosticFinding[];
}
const sourceIds = ["MISSIONX-EDUCATIONAL-ASSUMPTIONS", "NASA-SCIENCE-MISSIONS"];
const aggregate = (findings: DiagnosticFinding[]): DiagnosticStatus => findings.some(f => f.status === "FAIL") ? "FAIL" : findings.some(f => f.status === "WARNING") ? "WARNING" : findings.some(f => f.status === "PASS") ? "PASS" : "NOT EVALUATED";
/** Configuration commissioning, not invented live sensor readings or EOL forecasts. */
export function missionDiagnostics(run: SavedRun, time: number): DiagnosticTest[] {
    const eligible = flightLifecycle(run, time).arrived;
    const verification = verify(run.design);
    const check = (id: string): DiagnosticFinding => {
        const c: Check | undefined = verification.checks.find(c => c.id === id);
        return { id, name: c?.label ?? id, status: !eligible || !c ? "NOT EVALUATED" : c.status === "pass" ? "PASS" : c.blocking === false ? "WARNING" : "FAIL", evidence: !eligible ? "Mission-phase arrival has not been reached; commissioning was not performed." : c ? `${c.reason} Configuration calculation, not an in-flight sensor measurement.` : "No modeled check is available.", impact: c?.status === "pass" ? "Configured requirement is satisfied; flight performance is not guaranteed." : c?.reason ?? "No modeled evidence for this subsystem.", recommendation: c?.status === "pass" ? "Retain this capability when evaluating other design changes." : c?.reason ?? "Additional modeling or external analysis is required.", sourceIds: [...sourceIds] };
    };
    const missing = (id: string, name: string): DiagnosticFinding => ({ id, name, status: "NOT EVALUATED", evidence: "No validated measurement or subsystem model exists in MissionX.", impact: "No operational health or accuracy claim can be made.", recommendation: "Use a dedicated subsystem analysis before drawing real engineering conclusions.", sourceIds: ["MISSIONX-EDUCATIONAL-ASSUMPTIONS"] });
    const hardware = (category: string, name: string): DiagnosticFinding => {
        const parts = PARTS.filter(p => run.design.partIds.includes(p.id) && p.category === category);
        return { id: category, name, status: eligible && parts.length ? "PASS" : "NOT EVALUATED", evidence: eligible && parts.length ? `${parts.map(p => p.name).join(", ")} installed. Presence only; operational health is not measured.` : "No arrival-time subsystem measurement available.", impact: "Installation does not certify hardware health.", recommendation: "Review modeled compatibility and resource checks below.", sourceIds: [...sourceIds] };
    };
    const test = (id: string, name: string, findings: DiagnosticFinding[]): DiagnosticTest => ({ id, name, status: aggregate(findings), findings });
    const tests = [
        test("health", "Spacecraft configuration health", [hardware("power", "Electrical power hardware"), hardware("battery", "Battery hardware"), hardware("communications", "Communications hardware"), hardware("computer", "Onboard computer"), hardware("attitude", "Attitude hardware"), check("payload"), missing("propulsion", "Propulsion health"), missing("thermal", "Thermal status")]),
        test("power", "Power system diagnostics", [check("power"), check("battery"), check("power-margin")]),
        test("communications", "Communication diagnostics", [hardware("communications", "Radio installation"), check("data"), check("storage"), { ...missing("contact", "Ground contact readiness"), evidence: eligible ? `${getOrbit(run.design.orbitId).contact * 100}% authored contact fraction. Synthetic scheduled access; no arrival-time link acquisition measurement.` : "Arrival not reached; no contact test performed." }, missing("antenna", "RF antenna compatibility")]),
        test("navigation", "Orbit and navigation diagnostics", [check("orbit"), check("launch-orbit"), missing("orbit-solution", "Measured insertion and navigation accuracy")]),
        test("instruments", "Scientific instrument diagnostics", [check("payload"), check("parts"), check("dependencies"), missing("calibration", "Instrument health and calibration")]),
    ];
    tests.push(test("readiness", "Mission readiness", [...verification.checks.filter(c => c.blocking !== false).map(c => check(c.id)), ...verification.checks.filter(c => c.blocking === false && c.status !== "pass").map(c => check(c.id))]));
    return tests;
}
