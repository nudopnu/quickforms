import {
  init_define_process_env
} from "./chunk-D557AYM7.js";

// node_modules/@typespec/compiler/dist/src/utils/index.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/perf.js
init_define_process_env();
function startTimer() {
  const start = performance.now();
  return {
    end: () => {
      return performance.now() - start;
    }
  };
}
function time(fn) {
  const timer = startTimer();
  fn();
  return timer.end();
}
async function timeAsync(fn) {
  const timer = startTimer();
  await fn();
  return timer.end();
}
var perf = {
  startTimer,
  time,
  timeAsync
};
function createPerfReporter() {
  const measures = {};
  function startReportingTimer(label) {
    const timer = startTimer();
    return {
      end: () => {
        const time2 = timer.end();
        measures[label] = time2;
        return time2;
      }
    };
  }
  return {
    startTimer: startReportingTimer,
    time: (label, fn) => {
      const timer = startReportingTimer(label);
      const result = fn();
      timer.end();
      return result;
    },
    timeAsync: async (label, fn) => {
      const timer = startReportingTimer(label);
      const result = await fn();
      timer.end();
      return result;
    },
    report: (label, duration) => {
      measures[label] = duration;
    },
    measures
  };
}

// node_modules/@typespec/compiler/dist/src/utils/duplicate-tracker.js
init_define_process_env();
var DuplicateTracker = class {
  #entries = /* @__PURE__ */ new Map();
  /**
   * Track usage of K.
   * @param k key that is being checked for duplicate.
   * @param v value that map to the key
   */
  track(k, v) {
    const existing = this.#entries.get(k);
    if (existing === void 0) {
      this.#entries.set(k, [v]);
    } else {
      existing.push(v);
    }
  }
  /**
   * Return iterator of all the duplicate entries.
   */
  *entries() {
    for (const [k, v] of this.#entries.entries()) {
      if (v.length > 1) {
        yield [k, v];
      }
    }
  }
};

// node_modules/@typespec/compiler/dist/src/utils/state-accessor.js
init_define_process_env();
function useStateMap(key) {
  const getter = (program, target) => program.stateMap(key).get(target);
  const setter = (program, target, value) => program.stateMap(key).set(target, value);
  const mapGetter = (program) => program.stateMap(key);
  return [getter, setter, mapGetter];
}
function useStateSet(key) {
  const getter = (program, target) => program.stateSet(key).has(target);
  const setter = (program, target) => program.stateSet(key).add(target);
  return [getter, setter];
}

export {
  useStateMap,
  useStateSet,
  DuplicateTracker,
  perf,
  createPerfReporter
};
