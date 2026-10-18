import {
  createSourceLoader
} from "./chunk-JFWK62HV.js";
import "./chunk-IDJX66SY.js";
import {
  MutatorFlow,
  Realm,
  isMutableType,
  mutateSubgraph,
  mutateSubgraphWithNamespace
} from "./chunk-PQ47JQDM.js";
import "./chunk-LS4CFXSY.js";
import "./chunk-G5YGM2MV.js";
import "./chunk-HC4YXFN4.js";
import "./chunk-THH472PB.js";
import "./chunk-LIGHGDDD.js";
import "./chunk-UKSZG66X.js";
import {
  init_define_process_env
} from "./chunk-D557AYM7.js";
import "./chunk-VOEMSLEO.js";

// node_modules/@typespec/compiler/dist/src/experimental/index.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/experimental/cache.js
init_define_process_env();
function useCache(program, key, type, compute) {
  const stage = program.currentStage;
  if (stage !== "validating" && stage !== "linting" && stage !== "emitting") {
    return compute();
  }
  if (!type.isFinished) {
    return compute();
  }
  const map = program.stateMap(key);
  const existing = map.get(type);
  if (existing !== void 0) {
    return existing;
  }
  const value = compute();
  map.set(type, value);
  return value;
}
export {
  MutatorFlow as unsafe_MutatorFlow,
  Realm as unsafe_Realm,
  createSourceLoader as unsafe_createSourceLoader,
  isMutableType as unsafe_isMutableType,
  mutateSubgraph as unsafe_mutateSubgraph,
  mutateSubgraphWithNamespace as unsafe_mutateSubgraphWithNamespace,
  useCache as unsafe_useCache
};
