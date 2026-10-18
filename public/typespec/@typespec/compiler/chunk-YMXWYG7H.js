import {
  formatter_exports,
  parsers
} from "./chunk-54OXEPL2.js";
import {
  Pu,
  Vi
} from "./chunk-3X2732FK.js";
import {
  init_define_process_env
} from "./chunk-D557AYM7.js";

// node_modules/@typespec/compiler/dist/src/core/formatter.js
init_define_process_env();
function printTypeSpecNode(node) {
  return Pu(".", {
    parser: "typespec",
    plugins: [
      {
        ...formatter_exports,
        parsers: {
          typespec: {
            ...parsers.typespec,
            parse: () => node
          }
        }
      }
    ]
  });
}
async function formatTypeSpec(code, prettierConfig) {
  const output = await Pu(code, {
    ...prettierConfig,
    parser: "typespec",
    plugins: [formatter_exports]
  });
  return output;
}
async function checkFormatTypeSpec(code, prettierConfig) {
  return Vi(code, {
    ...prettierConfig,
    parser: "typespec",
    plugins: [formatter_exports]
  });
}

export {
  printTypeSpecNode,
  formatTypeSpec,
  checkFormatTypeSpec
};
