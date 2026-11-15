import type { Check, CheckStatus } from "@/game/types";
export function Status({ status }: { status: CheckStatus }) {
  return (
    <span className={`status-pill status-${status}`}>
      {status === "pass" ? "✓" : status === "close" ? "!" : "×"}{" "}
      {status === "close" ? "WARNING" : status.toUpperCase()}
    </span>
  );
}
export function CheckList({ checks }: { checks: Check[] }) {
  return (
    <div className="verification-checks">
      {checks.map((c) => (
        <div className="verification-check" key={c.id}>
          <div>
            <h3>{c.label}</h3>
            <Status status={c.status} />
          </div>
          <p>
            {c.reason}
            {c.status !== "pass"
              ? c.blocking === false
                ? " This advisory does not block launch."
                : " Resolve this requirement before launch."
              : ""}
          </p>
          {!!c.unit && (
            <span className="technical">
              ACTUAL {c.actual.toFixed(1)} {c.unit} / TARGET{" "}
              {c.target.toFixed(1)} {c.unit}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
