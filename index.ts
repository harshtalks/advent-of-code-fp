import { Effect } from "effect";
import { adventD1, adventD1P2 } from "./problems/q-1";
import { adventD2 } from "./problems/q-2";
import { NodeContext, NodeRuntime } from "@effect/platform-node";
import { adventD3 } from "./problems/q-3";

// Run the effects
Effect.all([adventD1, adventD1P2, adventD2, adventD3]).pipe(
  Effect.provide(NodeContext.layer),
  NodeRuntime.runMain,
);
