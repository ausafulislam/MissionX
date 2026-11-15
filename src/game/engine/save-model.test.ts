import { test } from "node:test";
import assert from "node:assert/strict";
import { useMissionStore } from "../store/mission-store";
import { STARTERS } from "../data/catalog";
import { simulate as oldSimulation } from "./legacy-v1/simulation";
import { simulate } from "./simulation";
const design = {
  missionId: "moon" as const,
  partIds: [...STARTERS.moon],
  orbitId: "lunar",
  rocketId: "swift",
};
test("save hydration retains legacy outcome and recomputes current model without trusting cached scores", () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const data = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => data.set(key, value),
    },
  });
  try {
    for (const result of [
      oldSimulation(design, 2026),
      simulate(design, 2026),
    ]) {
      const expected = structuredClone(result);
      const run = {
        id: "old-run",
        createdAt: "2026-11-14T00:00:00Z",
        design,
        result: { ...result, score: 99999 },
      };
      data.set(
        "missionx-flight-deck-v1",
        JSON.stringify({
          version: 1,
          chosen: true,
          design,
          run,
          complete: true,
          history: [run],
        }),
      );
      useMissionStore.setState({ ...useMissionStore.getInitialState() });
      useMissionStore.getState().hydrate();
      assert.deepEqual(useMissionStore.getState().run?.result, expected);
      assert.deepEqual(useMissionStore.getState().history[0].result, expected);
    }
  } finally {
    if (original) Object.defineProperty(globalThis, "localStorage", original);
    else Reflect.deleteProperty(globalThis, "localStorage");
    useMissionStore.setState({ ...useMissionStore.getInitialState() });
  }
});
test("flight identity and completion survive profile edits and hydration; absent legacy identity stays absent", async () => {
  const { useCommander } = await import("../store/commander-store");
  const original = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const data=new Map<string,string>();
  Object.defineProperty(globalThis,"localStorage",{configurable:true,value:{getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>data.set(k,v)}});
  try {
    useCommander.setState({...useCommander.getInitialState(),hydrated:true,name:"First Commander"});
    useMissionStore.setState({...useMissionStore.getInitialState(),hydrated:true,chosen:true,design});
    assert.equal(useMissionStore.getState().launch(2026),true);
    assert.equal(useMissionStore.getState().run?.commanderName,"First Commander");
    useCommander.getState().identify("New Commander");
    useMissionStore.getState().finish();
    const finished=structuredClone(useMissionStore.getState().run);
    assert.ok(finished?.completedAt);
    useMissionStore.getState().finish();
    assert.equal(useMissionStore.getState().run?.completedAt,finished.completedAt);
    useMissionStore.setState({hydrated:false});useMissionStore.getState().hydrate();
    assert.equal(useMissionStore.getState().run?.commanderName,"First Commander");
    assert.equal(useMissionStore.getState().run?.completedAt,finished.completedAt);
    const legacy={...finished};delete legacy.commanderName;delete legacy.completedAt;
    data.set("missionx-flight-deck-v1",JSON.stringify({version:1,chosen:true,complete:true,design,run:legacy,history:[legacy]}));
    useMissionStore.setState({hydrated:false});useMissionStore.getState().hydrate();
    assert.equal(useMissionStore.getState().run?.commanderName,undefined);
    assert.equal(useMissionStore.getState().run?.completedAt,undefined);
  } finally {
    useMissionStore.setState({...useMissionStore.getInitialState()});
    useCommander.setState({...useCommander.getInitialState()});
    if(original)Object.defineProperty(globalThis,"localStorage",original);else Reflect.deleteProperty(globalThis,"localStorage");
  }
});
