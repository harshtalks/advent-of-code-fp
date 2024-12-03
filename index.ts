import { Effect } from "effect";
import { adventW1Q1 } from "./week-1/q-1";
import { adventW1Q2 } from "./week-1/q-2";
import { NodeContext, NodeRuntime } from "@effect/platform-node";

// Run the effects
Effect.all([adventW1Q1, adventW1Q2]).pipe(
  Effect.provide(NodeContext.layer),
  NodeRuntime.runMain,
);
