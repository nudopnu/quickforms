import {
  fr
} from "./chunk-3X2732FK.js";
import {
  NodeFlags,
  SyntaxKind,
  compilerAssert,
  getSourceLocation,
  parse,
  printIdentifier,
  splitLines,
  visitChildren
} from "./chunk-THH472PB.js";
import {
  mutate
} from "./chunk-LIGHGDDD.js";
import {
  init_define_process_env
} from "./chunk-D557AYM7.js";
import {
  __export
} from "./chunk-VOEMSLEO.js";

// node_modules/@typespec/compiler/dist/src/formatter/index.js
var formatter_exports = {};
__export(formatter_exports, {
  defaultOptions: () => defaultOptions,
  languages: () => languages,
  parsers: () => parsers,
  printers: () => printers
});
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/formatter/parser.js
init_define_process_env();
function parse2(text, options) {
  const result = parse(text, { comments: true, docs: true });
  flattenNamespaces(result);
  const errors = result.parseDiagnostics.filter((x) => x.severity === "error");
  if (errors.length > 0 && !result.printable) {
    throw new PrettierParserError(errors[0]);
  }
  mutate(result).comments = result.comments.filter((x) => !(x.kind === SyntaxKind.BlockComment && x.parsedAsDocs));
  return result;
}
function flattenNamespaces(base) {
  visitChildren(base, (node) => {
    if (node.kind === SyntaxKind.NamespaceStatement) {
      let current = node;
      const ids = [node.id];
      while (current.statements && "kind" in current.statements) {
        current = current.statements;
        ids.push(current.id);
      }
      Object.assign(node, current, {
        ids
      });
      flattenNamespaces(current);
    }
  });
}
var PrettierParserError = class extends Error {
  error;
  loc;
  constructor(error) {
    super(error.message);
    this.error = error;
    const location = getSourceLocation(error.target);
    this.loc = {
      start: location?.pos ?? 0,
      end: location?.end ?? 0
    };
  }
};

// node_modules/@typespec/compiler/dist/src/formatter/print/index.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/formatter/print/printer.js
init_define_process_env();

// node_modules/prettier/doc.mjs
init_define_process_env();
var __defProp = Object.defineProperty;
var __export2 = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var public_exports = {};
__export2(public_exports, {
  builders: () => builders,
  printer: () => printer,
  utils: () => utils
});
var OPTIONAL_OBJECT = 1;
var createMethodShim = (methodName, getImplementation) => (flags, object, ...arguments_) => {
  if (flags | OPTIONAL_OBJECT && (object === void 0 || object === null)) {
    return;
  }
  const implementation = getImplementation.call(object) ?? object[methodName];
  return implementation.apply(object, arguments_);
};
function stringOrArrayAt(index) {
  return this[index < 0 ? this.length + index : index];
}
var at = /* @__PURE__ */ createMethodShim("at", function() {
  if (Array.isArray(this) || typeof this === "string") {
    return stringOrArrayAt;
  }
});
var method_at_default = at;
var noop = () => {
};
var noop_default = noop;
var DOC_TYPE_STRING = (
  /** @type {const} */
  "string"
);
var DOC_TYPE_ARRAY = (
  /** @type {const} */
  "array"
);
var DOC_TYPE_CURSOR = (
  /** @type {const} */
  "cursor"
);
var DOC_TYPE_INDENT = (
  /** @type {const} */
  "indent"
);
var DOC_TYPE_ALIGN = (
  /** @type {const} */
  "align"
);
var DOC_TYPE_TRIM = (
  /** @type {const} */
  "trim"
);
var DOC_TYPE_GROUP = (
  /** @type {const} */
  "group"
);
var DOC_TYPE_FILL = (
  /** @type {const} */
  "fill"
);
var DOC_TYPE_IF_BREAK = (
  /** @type {const} */
  "if-break"
);
var DOC_TYPE_INDENT_IF_BREAK = (
  /** @type {const} */
  "indent-if-break"
);
var DOC_TYPE_LINE_SUFFIX = (
  /** @type {const} */
  "line-suffix"
);
var DOC_TYPE_LINE_SUFFIX_BOUNDARY = (
  /** @type {const} */
  "line-suffix-boundary"
);
var DOC_TYPE_LINE = (
  /** @type {const} */
  "line"
);
var DOC_TYPE_LABEL = (
  /** @type {const} */
  "label"
);
var DOC_TYPE_BREAK_PARENT = (
  /** @type {const} */
  "break-parent"
);
var VALID_OBJECT_DOC_TYPES = /* @__PURE__ */ new Set([
  DOC_TYPE_CURSOR,
  DOC_TYPE_INDENT,
  DOC_TYPE_ALIGN,
  DOC_TYPE_TRIM,
  DOC_TYPE_GROUP,
  DOC_TYPE_FILL,
  DOC_TYPE_IF_BREAK,
  DOC_TYPE_INDENT_IF_BREAK,
  DOC_TYPE_LINE_SUFFIX,
  DOC_TYPE_LINE_SUFFIX_BOUNDARY,
  DOC_TYPE_LINE,
  DOC_TYPE_LABEL,
  DOC_TYPE_BREAK_PARENT
]);
function trimNewlinesEnd(string) {
  let end = string.length;
  while (end > 0 && (string[end - 1] === "\r" || string[end - 1] === "\n")) {
    end--;
  }
  return end < string.length ? string.slice(0, end) : string;
}
function getOrInsertComputed(map, key, callback) {
  if (!map.has(key)) {
    const value = callback(key);
    map.set(key, value);
  }
  return map.get(key);
}
function getDocType(doc) {
  if (typeof doc === "string") {
    return DOC_TYPE_STRING;
  }
  if (Array.isArray(doc)) {
    return DOC_TYPE_ARRAY;
  }
  if (!doc) {
    return;
  }
  const { type } = doc;
  if (VALID_OBJECT_DOC_TYPES.has(type)) {
    return type;
  }
}
var get_doc_type_default = getDocType;
var disjunctionListFormat = (list) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(list);
function getDocErrorMessage(doc) {
  const type = doc === null ? "null" : typeof doc;
  if (type !== "string" && type !== "object") {
    return `Unexpected doc '${type}', 
Expected it to be 'string' or 'object'.`;
  }
  if (get_doc_type_default(doc)) {
    throw new Error("doc is valid.");
  }
  const objectType = Object.prototype.toString.call(doc);
  if (objectType !== "[object Object]") {
    return `Unexpected doc '${objectType}'.`;
  }
  const EXPECTED_TYPE_VALUES = disjunctionListFormat(
    [...VALID_OBJECT_DOC_TYPES].map((type2) => `'${type2}'`)
  );
  return `Unexpected doc.type '${doc.type}'.
Expected it to be ${EXPECTED_TYPE_VALUES}.`;
}
var InvalidDocError = class extends Error {
  name = "InvalidDocError";
  constructor(doc) {
    super(getDocErrorMessage(doc));
    this.doc = doc;
  }
};
var invalid_doc_error_default = InvalidDocError;
var traverseDocOnExitStackMarker = {};
function traverseDoc(doc, onEnter, onExit, shouldTraverseConditionalGroups) {
  const docsStack = [doc];
  while (docsStack.length > 0) {
    const doc2 = docsStack.pop();
    if (doc2 === traverseDocOnExitStackMarker) {
      onExit(docsStack.pop());
      continue;
    }
    if (onExit) {
      docsStack.push(doc2, traverseDocOnExitStackMarker);
    }
    const docType = get_doc_type_default(doc2);
    if (!docType) {
      throw new invalid_doc_error_default(doc2);
    }
    if (onEnter?.(doc2) === false) {
      continue;
    }
    switch (docType) {
      case DOC_TYPE_ARRAY:
      case DOC_TYPE_FILL: {
        const parts = docType === DOC_TYPE_ARRAY ? doc2 : doc2.parts;
        for (let ic = parts.length, i = ic - 1; i >= 0; --i) {
          docsStack.push(parts[i]);
        }
        break;
      }
      case DOC_TYPE_IF_BREAK:
        docsStack.push(doc2.flatContents, doc2.breakContents);
        break;
      case DOC_TYPE_GROUP:
        if (shouldTraverseConditionalGroups && doc2.expandedStates) {
          for (let ic = doc2.expandedStates.length, i = ic - 1; i >= 0; --i) {
            docsStack.push(doc2.expandedStates[i]);
          }
        } else {
          docsStack.push(doc2.contents);
        }
        break;
      case DOC_TYPE_ALIGN:
      case DOC_TYPE_INDENT:
      case DOC_TYPE_INDENT_IF_BREAK:
      case DOC_TYPE_LABEL:
      case DOC_TYPE_LINE_SUFFIX:
        docsStack.push(doc2.contents);
        break;
      case DOC_TYPE_STRING:
      case DOC_TYPE_CURSOR:
      case DOC_TYPE_TRIM:
      case DOC_TYPE_LINE_SUFFIX_BOUNDARY:
      case DOC_TYPE_LINE:
      case DOC_TYPE_BREAK_PARENT:
        break;
      default:
        throw new invalid_doc_error_default(doc2);
    }
  }
}
var traverse_doc_default = traverseDoc;
function mapDoc(doc, cb) {
  if (typeof doc === "string") {
    return cb(doc);
  }
  const mapped = /* @__PURE__ */ new Map();
  return rec(doc);
  function rec(doc2) {
    return getOrInsertComputed(mapped, doc2, process2);
  }
  function process2(doc2) {
    switch (get_doc_type_default(doc2)) {
      case DOC_TYPE_ARRAY:
        return cb(doc2.map(rec));
      case DOC_TYPE_FILL:
        return cb({
          ...doc2,
          parts: doc2.parts.map(rec)
        });
      case DOC_TYPE_IF_BREAK:
        return cb({
          ...doc2,
          breakContents: rec(doc2.breakContents),
          flatContents: rec(doc2.flatContents)
        });
      case DOC_TYPE_GROUP: {
        let {
          expandedStates,
          contents
        } = doc2;
        if (expandedStates) {
          expandedStates = expandedStates.map(rec);
          contents = expandedStates[0];
        } else {
          contents = rec(contents);
        }
        return cb({
          ...doc2,
          contents,
          expandedStates
        });
      }
      case DOC_TYPE_ALIGN:
      case DOC_TYPE_INDENT:
      case DOC_TYPE_INDENT_IF_BREAK:
      case DOC_TYPE_LABEL:
      case DOC_TYPE_LINE_SUFFIX:
        return cb({
          ...doc2,
          contents: rec(doc2.contents)
        });
      case DOC_TYPE_STRING:
      case DOC_TYPE_CURSOR:
      case DOC_TYPE_TRIM:
      case DOC_TYPE_LINE_SUFFIX_BOUNDARY:
      case DOC_TYPE_LINE:
      case DOC_TYPE_BREAK_PARENT:
        return cb(doc2);
      default:
        throw new invalid_doc_error_default(doc2);
    }
  }
}
function findInDoc(doc, fn, defaultValue) {
  let result = defaultValue;
  let shouldSkipFurtherProcessing = false;
  function findInDocOnEnterFn(doc2) {
    if (shouldSkipFurtherProcessing) {
      return false;
    }
    const maybeResult = fn(doc2);
    if (maybeResult !== void 0) {
      shouldSkipFurtherProcessing = true;
      result = maybeResult;
    }
  }
  traverse_doc_default(doc, findInDocOnEnterFn);
  return result;
}
function willBreakFn(doc) {
  if (doc.type === DOC_TYPE_GROUP && doc.break) {
    return true;
  }
  if (doc.type === DOC_TYPE_LINE && doc.hard) {
    return true;
  }
  if (doc.type === DOC_TYPE_BREAK_PARENT) {
    return true;
  }
}
function willBreak(doc) {
  return findInDoc(doc, willBreakFn, false);
}
function breakParentGroup(groupStack) {
  if (groupStack.length > 0) {
    const parentGroup = method_at_default(
      /* OPTIONAL_OBJECT: false */
      0,
      groupStack,
      -1
    );
    if (!parentGroup.expandedStates && !parentGroup.break) {
      parentGroup.break = "propagated";
    }
  }
  return null;
}
function propagateBreaks(doc) {
  const alreadyVisitedSet = /* @__PURE__ */ new Set();
  const groupStack = [];
  function propagateBreaksOnEnterFn(doc2) {
    if (doc2.type === DOC_TYPE_BREAK_PARENT) {
      breakParentGroup(groupStack);
    }
    if (doc2.type === DOC_TYPE_GROUP) {
      groupStack.push(doc2);
      if (alreadyVisitedSet.has(doc2)) {
        return false;
      }
      alreadyVisitedSet.add(doc2);
    }
  }
  function propagateBreaksOnExitFn(doc2) {
    if (doc2.type === DOC_TYPE_GROUP) {
      const group22 = groupStack.pop();
      if (group22.break) {
        breakParentGroup(groupStack);
      }
    }
  }
  traverse_doc_default(
    doc,
    propagateBreaksOnEnterFn,
    propagateBreaksOnExitFn,
    /* shouldTraverseConditionalGroups */
    true
  );
}
function removeLinesFn(doc) {
  if (doc.type === DOC_TYPE_LINE && !doc.hard) {
    return doc.soft ? "" : " ";
  }
  if (doc.type === DOC_TYPE_IF_BREAK) {
    return doc.flatContents;
  }
  return doc;
}
function removeLines(doc) {
  return mapDoc(doc, removeLinesFn);
}
function stripTrailingHardlineFromParts(parts) {
  parts = [...parts];
  while (parts.length >= 2 && method_at_default(
    /* OPTIONAL_OBJECT: false */
    0,
    parts,
    -2
  ).type === DOC_TYPE_LINE && method_at_default(
    /* OPTIONAL_OBJECT: false */
    0,
    parts,
    -1
  ).type === DOC_TYPE_BREAK_PARENT) {
    parts.length -= 2;
  }
  if (parts.length > 0) {
    const lastPart = stripTrailingHardlineFromDoc(method_at_default(
      /* OPTIONAL_OBJECT: false */
      0,
      parts,
      -1
    ));
    parts[parts.length - 1] = lastPart;
  }
  return parts;
}
function stripTrailingHardlineFromDoc(doc) {
  switch (get_doc_type_default(doc)) {
    case DOC_TYPE_INDENT:
    case DOC_TYPE_INDENT_IF_BREAK:
    case DOC_TYPE_GROUP:
    case DOC_TYPE_LINE_SUFFIX:
    case DOC_TYPE_LABEL: {
      const contents = stripTrailingHardlineFromDoc(doc.contents);
      return {
        ...doc,
        contents
      };
    }
    case DOC_TYPE_IF_BREAK:
      return {
        ...doc,
        breakContents: stripTrailingHardlineFromDoc(doc.breakContents),
        flatContents: stripTrailingHardlineFromDoc(doc.flatContents)
      };
    case DOC_TYPE_FILL:
      return {
        ...doc,
        parts: stripTrailingHardlineFromParts(doc.parts)
      };
    case DOC_TYPE_ARRAY:
      return stripTrailingHardlineFromParts(doc);
    case DOC_TYPE_STRING:
      return trimNewlinesEnd(doc);
    case DOC_TYPE_ALIGN:
    case DOC_TYPE_CURSOR:
    case DOC_TYPE_TRIM:
    case DOC_TYPE_LINE_SUFFIX_BOUNDARY:
    case DOC_TYPE_LINE:
    case DOC_TYPE_BREAK_PARENT:
      break;
    default:
      throw new invalid_doc_error_default(doc);
  }
  return doc;
}
function stripTrailingHardline(doc) {
  return stripTrailingHardlineFromDoc(cleanDoc(doc));
}
function cleanDocFn(doc) {
  switch (get_doc_type_default(doc)) {
    case DOC_TYPE_FILL: {
      const {
        parts
      } = doc;
      if (parts.every((part) => part === "")) {
        return "";
      }
      if (parts.length === 1) {
        return parts[0];
      }
      break;
    }
    case DOC_TYPE_GROUP:
      if (!doc.contents && !doc.id && !doc.break && !doc.expandedStates) {
        return "";
      }
      if (doc.contents.type === DOC_TYPE_GROUP && doc.contents.id === doc.id && doc.contents.break === doc.break && doc.contents.expandedStates === doc.expandedStates) {
        return doc.contents;
      }
      break;
    case DOC_TYPE_ALIGN:
    case DOC_TYPE_INDENT:
    case DOC_TYPE_INDENT_IF_BREAK:
    case DOC_TYPE_LINE_SUFFIX:
      if (!doc.contents) {
        return "";
      }
      break;
    case DOC_TYPE_IF_BREAK:
      if (!doc.flatContents && !doc.breakContents) {
        return "";
      }
      break;
    case DOC_TYPE_ARRAY: {
      const parts = [];
      for (const part of doc) {
        if (!part) {
          continue;
        }
        const [currentPart, ...restParts] = Array.isArray(part) ? part : [part];
        if (typeof currentPart === "string" && typeof method_at_default(
          /* OPTIONAL_OBJECT: false */
          0,
          parts,
          -1
        ) === "string") {
          parts[parts.length - 1] += currentPart;
        } else {
          parts.push(currentPart);
        }
        parts.push(...restParts);
      }
      if (parts.length === 0) {
        return "";
      }
      if (parts.length === 1) {
        return parts[0];
      }
      return parts;
    }
    case DOC_TYPE_STRING:
    case DOC_TYPE_CURSOR:
    case DOC_TYPE_TRIM:
    case DOC_TYPE_LINE_SUFFIX_BOUNDARY:
    case DOC_TYPE_LINE:
    case DOC_TYPE_LABEL:
    case DOC_TYPE_BREAK_PARENT:
      break;
    default:
      throw new invalid_doc_error_default(doc);
  }
  return doc;
}
function cleanDoc(doc) {
  return mapDoc(doc, (currentDoc) => cleanDocFn(currentDoc));
}
function replaceEndOfLine(doc, replacement = literalline) {
  return mapDoc(doc, (currentDoc) => typeof currentDoc === "string" ? join(replacement, currentDoc.split("\n")) : currentDoc);
}
function canBreakFn(doc) {
  if (doc.type === DOC_TYPE_LINE) {
    return true;
  }
}
function canBreak(doc) {
  return findInDoc(doc, canBreakFn, false);
}
var assertDoc = true ? noop_default : (
  /**
  @param {Doc} doc
  */
  (function(doc) {
    traverse_doc_default(doc, (doc2) => {
      if (typeof doc2 === "string" || checked.has(doc2)) {
        return false;
      }
      checked.add(doc2);
    });
  })
);
var assertDocArray = true ? noop_default : (
  /**
  @param {readonly Doc[]} docs
  @param {boolean} [optional = false]
  */
  (function(docs, optional = false) {
    if (optional && !docs) {
      return;
    }
    if (!Array.isArray(docs)) {
      throw new TypeError("Unexpected doc array.");
    }
    for (const doc of docs) {
      assertDoc(doc);
    }
  })
);
var assertDocFillParts = true ? noop_default : (
  /**
  @param {readonly Doc[]} parts
  */
  (function(parts) {
    assertDocArray(parts);
    if (parts.length > 1 && isEmptyDoc(method_at_default(
      /* OPTIONAL_OBJECT: false */
      0,
      parts,
      -1
    ))) {
      parts = parts.slice(0, -1);
    }
    for (const [i, doc] of parts.entries()) {
      if (i % 2 === 1 && !isValidSeparator(doc)) {
        const type = get_doc_type_default(doc);
        throw new Error(`Unexpected non-line-break doc at ${i}. Doc type is ${type}.`);
      }
    }
  })
);
var assertAlignType = true ? noop_default : function(alignType) {
  if (!(typeof alignType === "number" || typeof alignType === "string" || alignType?.type === "root")) {
    throw new TypeError(`Invalid alignType '${alignType}'.`);
  }
};
function indent(contents) {
  assertDoc(contents);
  return { type: DOC_TYPE_INDENT, contents };
}
function align(alignType, contents) {
  assertAlignType(alignType);
  assertDoc(contents);
  return { type: DOC_TYPE_ALIGN, contents, n: alignType };
}
function dedentToRoot(contents) {
  return align(Number.NEGATIVE_INFINITY, contents);
}
function markAsRoot(contents) {
  return align({ type: "root" }, contents);
}
function dedent(contents) {
  return align(-1, contents);
}
function addAlignmentToDoc(doc, size, tabWidth) {
  assertDoc(doc);
  let aligned = doc;
  if (size > 0) {
    for (let level = 0; level < Math.floor(size / tabWidth); ++level) {
      aligned = indent(aligned);
    }
    aligned = align(size % tabWidth, aligned);
    aligned = align(Number.NEGATIVE_INFINITY, aligned);
  }
  return aligned;
}
var breakParent = { type: DOC_TYPE_BREAK_PARENT };
var cursor = { type: DOC_TYPE_CURSOR };
function fill(parts) {
  assertDocFillParts(parts);
  return { type: DOC_TYPE_FILL, parts };
}
function group(contents, options = {}) {
  assertDoc(contents);
  assertDocArray(
    options.expandedStates,
    /* optional */
    true
  );
  return {
    type: DOC_TYPE_GROUP,
    id: options.id,
    contents,
    break: Boolean(options.shouldBreak),
    expandedStates: options.expandedStates
  };
}
function conditionalGroup(states, options) {
  return group(states[0], { ...options, expandedStates: states });
}
function ifBreak(breakContents, flatContents = "", options = {}) {
  assertDoc(breakContents);
  if (flatContents !== "") {
    assertDoc(flatContents);
  }
  return {
    type: DOC_TYPE_IF_BREAK,
    breakContents,
    flatContents,
    groupId: options.groupId
  };
}
function indentIfBreak(contents, options) {
  assertDoc(contents);
  return {
    type: DOC_TYPE_INDENT_IF_BREAK,
    contents,
    groupId: options.groupId,
    negate: options.negate
  };
}
function join(separator, docs) {
  assertDoc(separator);
  assertDocArray(docs);
  const parts = [];
  for (let i = 0; i < docs.length; i++) {
    if (i !== 0) {
      parts.push(separator);
    }
    parts.push(docs[i]);
  }
  return parts;
}
function label(label2, contents) {
  assertDoc(contents);
  return label2 ? { type: DOC_TYPE_LABEL, label: label2, contents } : contents;
}
var line = { type: DOC_TYPE_LINE };
var softline = { type: DOC_TYPE_LINE, soft: true };
var hardlineWithoutBreakParent = { type: DOC_TYPE_LINE, hard: true };
var hardline = [hardlineWithoutBreakParent, breakParent];
var literallineWithoutBreakParent = {
  type: DOC_TYPE_LINE,
  hard: true,
  literal: true
};
var literalline = [literallineWithoutBreakParent, breakParent];
function lineSuffix(contents) {
  assertDoc(contents);
  return { type: DOC_TYPE_LINE_SUFFIX, contents };
}
var lineSuffixBoundary = { type: DOC_TYPE_LINE_SUFFIX_BOUNDARY };
var trim = { type: DOC_TYPE_TRIM };
var stringReplaceAll = String.prototype.replaceAll ?? function(pattern, replacement) {
  if (pattern.global) {
    return this.replace(pattern, replacement);
  }
  return this.split(pattern).join(replacement);
};
var replaceAll = /* @__PURE__ */ createMethodShim("replaceAll", function() {
  if (typeof this === "string") {
    return stringReplaceAll;
  }
});
var method_replace_all_default = replaceAll;
var OPTION_CR = "cr";
var OPTION_CRLF = "crlf";
var CHARACTER_CR = "\r";
var CHARACTER_CRLF = "\r\n";
var CHARACTER_LF = "\n";
var DEFAULT_EOL = CHARACTER_LF;
function convertEndOfLineOptionToCharacter(endOfLineOption) {
  return endOfLineOption === OPTION_CR ? CHARACTER_CR : endOfLineOption === OPTION_CRLF ? CHARACTER_CRLF : DEFAULT_EOL;
}
var emoji_regex_default = () => {
  return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
};
var fullwidthMinimalCodePoint = 12288;
var fullwidthMaximumCodePoint = 65510;
var fullwidthRanges = [12288, 12288, 65281, 65376, 65504, 65510];
var wideMinimalCodePoint = 4352;
var wideMaximumCodePoint = 262141;
var wideRanges = [4352, 4447, 8986, 8987, 9001, 9002, 9193, 9196, 9200, 9200, 9203, 9203, 9725, 9726, 9748, 9749, 9776, 9783, 9800, 9811, 9855, 9855, 9866, 9871, 9875, 9875, 9889, 9889, 9898, 9899, 9917, 9918, 9924, 9925, 9934, 9934, 9940, 9940, 9962, 9962, 9970, 9971, 9973, 9973, 9978, 9978, 9981, 9981, 9989, 9989, 9994, 9995, 10024, 10024, 10060, 10060, 10062, 10062, 10067, 10069, 10071, 10071, 10133, 10135, 10160, 10160, 10175, 10175, 11035, 11036, 11088, 11088, 11093, 11093, 11904, 11929, 11931, 12019, 12032, 12245, 12272, 12287, 12289, 12350, 12353, 12438, 12441, 12543, 12549, 12591, 12593, 12686, 12688, 12773, 12783, 12830, 12832, 12871, 12880, 42124, 42128, 42182, 43360, 43388, 44032, 55203, 63744, 64255, 65040, 65049, 65072, 65106, 65108, 65126, 65128, 65131, 94176, 94180, 94192, 94198, 94208, 101589, 101631, 101662, 101760, 101874, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 119552, 119638, 119648, 119670, 126980, 126980, 127183, 127183, 127374, 127374, 127377, 127386, 127488, 127490, 127504, 127547, 127552, 127560, 127568, 127569, 127584, 127589, 127744, 127776, 127789, 127797, 127799, 127868, 127870, 127891, 127904, 127946, 127951, 127955, 127968, 127984, 127988, 127988, 127992, 128062, 128064, 128064, 128066, 128252, 128255, 128317, 128331, 128334, 128336, 128359, 128378, 128378, 128405, 128406, 128420, 128420, 128507, 128591, 128640, 128709, 128716, 128716, 128720, 128722, 128725, 128728, 128732, 128735, 128747, 128748, 128756, 128764, 128992, 129003, 129008, 129008, 129292, 129338, 129340, 129349, 129351, 129535, 129648, 129660, 129664, 129674, 129678, 129734, 129736, 129736, 129741, 129756, 129759, 129770, 129775, 129784, 131072, 196605, 196608, 262141];
var isInRange = (ranges, codePoint) => {
  let low = 0;
  let high = Math.floor(ranges.length / 2) - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const i = mid * 2;
    if (codePoint < ranges[i]) {
      high = mid - 1;
    } else if (codePoint > ranges[i + 1]) {
      low = mid + 1;
    } else {
      return true;
    }
  }
  return false;
};
var commonCjkCodePoint = 19968;
var [wideFastPathStart, wideFastPathEnd] = /* @__PURE__ */ findWideFastPathRange(wideRanges);
function findWideFastPathRange(ranges) {
  let fastPathStart = ranges[0];
  let fastPathEnd = ranges[1];
  for (let index = 0; index < ranges.length; index += 2) {
    const start = ranges[index];
    const end = ranges[index + 1];
    if (commonCjkCodePoint >= start && commonCjkCodePoint <= end) {
      return [start, end];
    }
    if (end - start > fastPathEnd - fastPathStart) {
      fastPathStart = start;
      fastPathEnd = end;
    }
  }
  return [fastPathStart, fastPathEnd];
}
var isFullWidth = (codePoint) => {
  if (codePoint < fullwidthMinimalCodePoint || codePoint > fullwidthMaximumCodePoint) {
    return false;
  }
  return isInRange(fullwidthRanges, codePoint);
};
var isWide = (codePoint) => {
  if (codePoint >= wideFastPathStart && codePoint <= wideFastPathEnd) {
    return true;
  }
  if (codePoint < wideMinimalCodePoint || codePoint > wideMaximumCodePoint) {
    return false;
  }
  return isInRange(wideRanges, codePoint);
};
var narrowEmojiRegexp = /^(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u2764\u27A1\u2934\u2935\u2B05-\u2B07]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF3\uDFF5\uDFF7]|\uD83D[\uDC3F\uDC41\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])$/;
var isNarrowEmojiCharacter = (character) => narrowEmojiRegexp.test(character);
var notAsciiRegex = /[^\x20-\x7F]/;
function getStringWidth(text) {
  if (!text) {
    return 0;
  }
  if (!notAsciiRegex.test(text)) {
    return text.length;
  }
  let width = 0;
  text = text.replace(emoji_regex_default(), (character) => {
    width += isNarrowEmojiCharacter(character) ? 1 : 2;
    return "";
  });
  for (const character of text) {
    const codePoint = character.codePointAt(0);
    if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) {
      continue;
    }
    if (codePoint >= 768 && codePoint <= 879) {
      continue;
    }
    if (codePoint >= 65024 && codePoint <= 65039) {
      continue;
    }
    width += isFullWidth(codePoint) || isWide(codePoint) ? 2 : 1;
  }
  return width;
}
var get_string_width_default = getStringWidth;
var INDENT_COMMAND_TYPE_INDENT = 0;
var INDENT_COMMAND_TYPE_DEDENT = 1;
var INDENT_COMMAND_TYPE_WIDTH = 2;
var INDENT_COMMAND_TYPE_STRING = 3;
var INDENT_COMMAND_INDENT = { type: INDENT_COMMAND_TYPE_INDENT };
var INDENT_COMMAND_DEDENT = { type: INDENT_COMMAND_TYPE_DEDENT };
var ROOT_INDENT = {
  value: "",
  length: 0,
  queue: [],
  get root() {
    return ROOT_INDENT;
  }
};
function generateIndent(indent22, command, options) {
  const queue = command.type === INDENT_COMMAND_TYPE_DEDENT ? indent22.queue.slice(0, -1) : [...indent22.queue, command];
  let value = "";
  let length = 0;
  let lastTabs = 0;
  let lastSpaces = 0;
  for (const command2 of queue) {
    switch (command2.type) {
      case INDENT_COMMAND_TYPE_INDENT:
        flush();
        if (options.useTabs) {
          addTabs(1);
        } else {
          addSpaces(options.tabWidth);
        }
        break;
      case INDENT_COMMAND_TYPE_STRING: {
        const { string } = command2;
        flush();
        value += string;
        length += string.length;
        break;
      }
      case INDENT_COMMAND_TYPE_WIDTH: {
        const { width } = command2;
        lastTabs += 1;
        lastSpaces += width;
        break;
      }
      default:
        throw new Error(`Unexpected indent comment '${command2.type}'.`);
    }
  }
  flushSpaces();
  return { ...indent22, value, length, queue };
  function addTabs(count) {
    value += "	".repeat(count);
    length += options.tabWidth * count;
  }
  function addSpaces(count) {
    value += " ".repeat(count);
    length += count;
  }
  function flush() {
    if (options.useTabs) {
      flushTabs();
    } else {
      flushSpaces();
    }
  }
  function flushTabs() {
    if (lastTabs > 0) {
      addTabs(lastTabs);
    }
    resetLast();
  }
  function flushSpaces() {
    if (lastSpaces > 0) {
      addSpaces(lastSpaces);
    }
    resetLast();
  }
  function resetLast() {
    lastTabs = 0;
    lastSpaces = 0;
  }
}
function makeAlign(indent22, indentOptions, options) {
  if (!indentOptions) {
    return indent22;
  }
  if (indentOptions.type === "root") {
    return { ...indent22, root: indent22 };
  }
  if (indentOptions === Number.NEGATIVE_INFINITY) {
    return indent22.root;
  }
  let command;
  if (typeof indentOptions === "number") {
    if (indentOptions < 0) {
      command = INDENT_COMMAND_DEDENT;
    } else {
      command = { type: INDENT_COMMAND_TYPE_WIDTH, width: indentOptions };
    }
  } else {
    command = { type: INDENT_COMMAND_TYPE_STRING, string: indentOptions };
  }
  return generateIndent(indent22, command, options);
}
function makeIndent(indent22, options) {
  return generateIndent(indent22, INDENT_COMMAND_INDENT, options);
}
function getTrailingIndentionLength(text) {
  let length = 0;
  for (let index = text.length - 1; index >= 0; index--) {
    const character = text[index];
    if (character === " " || character === "	") {
      length++;
    } else {
      break;
    }
  }
  return length;
}
function trimIndentation(text) {
  const length = getTrailingIndentionLength(text);
  const trimmed = length === 0 ? text : text.slice(0, text.length - length);
  return { text: trimmed, count: length };
}
var printResult = class {
  /** @type {string[]} */
  #settledTexts = [];
  #unsettledText = "";
  #settledTextLength = 0;
  /** @type {number[]} */
  #settledPositions = [];
  /** @type {number[]} */
  #unsettledPositions = [];
  #settle() {
    const text = this.#unsettledText;
    if (text !== "") {
      this.#settledTexts.push(text);
      this.#settledTextLength += text.length;
      this.#unsettledText = "";
    }
    for (const position of this.#unsettledPositions) {
      this.#settledPositions.push(Math.min(position, this.#settledTextLength));
    }
    this.#unsettledPositions.length = 0;
  }
  markPosition() {
    if (this.#settledPositions.length + this.#unsettledPositions.length >= 2) {
      throw new Error("There are too many 'cursor' in doc.");
    }
    this.#unsettledPositions.push(
      this.#settledTextLength + this.#unsettledText.length
    );
  }
  /**
  @param {string} text
  */
  write(text) {
    this.#unsettledText += text;
  }
  trim() {
    const { text: trimmed, count } = trimIndentation(this.#unsettledText);
    this.#unsettledText = trimmed;
    this.#settle();
    return count;
  }
  finish() {
    this.#settle();
    return {
      text: this.#settledTexts.join(""),
      positions: this.#settledPositions
    };
  }
};
var print_result_default = printResult;
var MODE_BREAK = /* @__PURE__ */ Symbol("MODE_BREAK");
var MODE_FLAT = /* @__PURE__ */ Symbol("MODE_FLAT");
var DOC_FILL_PRINTED_LENGTH = /* @__PURE__ */ Symbol("DOC_FILL_PRINTED_LENGTH");
function fits(next, restCommands, remainingWidth, hasLineSuffix, groupModeMap, mustBeFlat) {
  if (remainingWidth === Number.POSITIVE_INFINITY) {
    return true;
  }
  let restCommandsIndex = restCommands.length;
  let hasPendingSpace = false;
  const commands = [next];
  let output = "";
  while (remainingWidth >= 0) {
    if (commands.length === 0) {
      if (restCommandsIndex === 0) {
        return true;
      }
      commands.push(restCommands[--restCommandsIndex]);
      continue;
    }
    const {
      mode,
      doc
    } = commands.pop();
    const docType = get_doc_type_default(doc);
    switch (docType) {
      case DOC_TYPE_STRING:
        if (doc) {
          if (hasPendingSpace) {
            output += " ";
            remainingWidth -= 1;
            hasPendingSpace = false;
          }
          output += doc;
          remainingWidth -= get_string_width_default(doc);
        }
        break;
      case DOC_TYPE_ARRAY:
      case DOC_TYPE_FILL: {
        const parts = docType === DOC_TYPE_ARRAY ? doc : doc.parts;
        const end = doc[DOC_FILL_PRINTED_LENGTH] ?? 0;
        for (let index = parts.length - 1; index >= end; index--) {
          commands.push({
            mode,
            doc: parts[index]
          });
        }
        break;
      }
      case DOC_TYPE_INDENT:
      case DOC_TYPE_ALIGN:
      case DOC_TYPE_INDENT_IF_BREAK:
      case DOC_TYPE_LABEL:
        commands.push({
          mode,
          doc: doc.contents
        });
        break;
      case DOC_TYPE_TRIM: {
        const {
          text,
          count
        } = trimIndentation(output);
        output = text;
        remainingWidth += count;
        break;
      }
      case DOC_TYPE_GROUP: {
        if (mustBeFlat && doc.break) {
          return false;
        }
        const groupMode = doc.break ? MODE_BREAK : mode;
        const contents = doc.expandedStates && groupMode === MODE_BREAK ? method_at_default(
          /* OPTIONAL_OBJECT: false */
          0,
          doc.expandedStates,
          -1
        ) : doc.contents;
        commands.push({
          mode: groupMode,
          doc: contents
        });
        break;
      }
      case DOC_TYPE_IF_BREAK: {
        const groupMode = doc.groupId ? groupModeMap[doc.groupId] || MODE_FLAT : mode;
        const contents = groupMode === MODE_BREAK ? doc.breakContents : doc.flatContents;
        if (contents) {
          commands.push({
            mode,
            doc: contents
          });
        }
        break;
      }
      case DOC_TYPE_LINE:
        if (mode === MODE_BREAK || doc.hard) {
          return true;
        }
        if (!doc.soft) {
          hasPendingSpace = true;
        }
        break;
      case DOC_TYPE_LINE_SUFFIX:
        hasLineSuffix = true;
        break;
      case DOC_TYPE_LINE_SUFFIX_BOUNDARY:
        if (hasLineSuffix) {
          return false;
        }
        break;
    }
  }
  return false;
}
function printDocToString(doc, options) {
  const groupModeMap = /* @__PURE__ */ Object.create(null);
  const width = options.printWidth;
  const newLine = convertEndOfLineOptionToCharacter(options.endOfLine);
  let position = 0;
  const commands = [{
    indent: ROOT_INDENT,
    mode: MODE_BREAK,
    doc
  }];
  let shouldRemeasure = false;
  const lineSuffix2 = [];
  const result = new print_result_default();
  propagateBreaks(doc);
  while (commands.length > 0) {
    const {
      indent: indent22,
      mode,
      doc: doc2
    } = commands.pop();
    switch (get_doc_type_default(doc2)) {
      case DOC_TYPE_STRING: {
        const formatted2 = newLine !== "\n" ? method_replace_all_default(
          /* OPTIONAL_OBJECT: false */
          0,
          doc2,
          "\n",
          newLine
        ) : doc2;
        if (formatted2) {
          result.write(formatted2);
          if (commands.length > 0) {
            position += get_string_width_default(formatted2);
          }
        }
        break;
      }
      case DOC_TYPE_ARRAY:
        for (let index = doc2.length - 1; index >= 0; index--) {
          commands.push({
            indent: indent22,
            mode,
            doc: doc2[index]
          });
        }
        break;
      case DOC_TYPE_CURSOR:
        result.markPosition();
        break;
      case DOC_TYPE_INDENT:
        commands.push({
          indent: makeIndent(indent22, options),
          mode,
          doc: doc2.contents
        });
        break;
      case DOC_TYPE_ALIGN:
        commands.push({
          indent: makeAlign(indent22, doc2.n, options),
          mode,
          doc: doc2.contents
        });
        break;
      case DOC_TYPE_TRIM:
        position -= result.trim();
        break;
      case DOC_TYPE_GROUP: {
        const command = (function printGroup() {
          if (mode === MODE_FLAT && !shouldRemeasure) {
            return {
              indent: indent22,
              mode: doc2.break ? MODE_BREAK : MODE_FLAT,
              doc: doc2.contents
            };
          }
          shouldRemeasure = false;
          const remainingWidth = width - position;
          const hasLineSuffix = lineSuffix2.length > 0;
          const flatCommand = {
            indent: indent22,
            mode: MODE_FLAT,
            doc: doc2.contents
          };
          if (!doc2.break && fits(flatCommand, commands, remainingWidth, hasLineSuffix, groupModeMap)) {
            return flatCommand;
          }
          if (!doc2.expandedStates) {
            return {
              indent: indent22,
              mode: MODE_BREAK,
              doc: doc2.contents
            };
          }
          if (!doc2.break) {
            for (let index = 1; index < doc2.expandedStates.length - 1; index++) {
              const flatCommand2 = {
                indent: indent22,
                mode: MODE_FLAT,
                doc: doc2.expandedStates[index]
              };
              if (fits(flatCommand2, commands, remainingWidth, hasLineSuffix, groupModeMap)) {
                return flatCommand2;
              }
            }
          }
          return {
            indent: indent22,
            mode: MODE_BREAK,
            doc: method_at_default(
              /* OPTIONAL_OBJECT: false */
              0,
              doc2.expandedStates,
              -1
            )
          };
        })();
        commands.push(command);
        if (doc2.id) {
          groupModeMap[doc2.id] = command.mode;
        }
        break;
      }
      // Fills each line with as much code as possible before moving to a new
      // line with the same indentation.
      //
      // Expects doc.parts to be an array of alternating content and
      // whitespace. The whitespace contains the linebreaks.
      //
      // For example:
      //   ["I", line, "love", line, "monkeys"]
      // or
      //   [{ type: group, ... }, softline, { type: group, ... }]
      //
      // It uses this parts structure to handle three main layout cases:
      // * The first two content items fit on the same line without
      //   breaking
      //   -> output the first content item and the whitespace "flat".
      // * Only the first content item fits on the line without breaking
      //   -> output the first content item "flat" and the whitespace with
      //   "break".
      // * Neither content item fits on the line without breaking
      //   -> output the first content item and the whitespace with "break".
      case DOC_TYPE_FILL: {
        const remainingWidth = width - position;
        const offset = doc2[DOC_FILL_PRINTED_LENGTH] ?? 0;
        const {
          parts
        } = doc2;
        const length = parts.length - offset;
        if (length === 0) {
          break;
        }
        const content = parts[offset + 0];
        const whitespace = parts[offset + 1];
        const contentFlatCommand = {
          indent: indent22,
          mode: MODE_FLAT,
          doc: content
        };
        const contentBreakCommand = {
          indent: indent22,
          mode: MODE_BREAK,
          doc: content
        };
        const contentFits = fits(contentFlatCommand, [], remainingWidth, lineSuffix2.length > 0, groupModeMap, true);
        if (length === 1) {
          if (contentFits) {
            commands.push(contentFlatCommand);
          } else {
            commands.push(contentBreakCommand);
          }
          break;
        }
        const whitespaceFlatCommand = {
          indent: indent22,
          mode: MODE_FLAT,
          doc: whitespace
        };
        const whitespaceBreakCommand = {
          indent: indent22,
          mode: MODE_BREAK,
          doc: whitespace
        };
        if (length === 2) {
          if (contentFits) {
            commands.push(whitespaceFlatCommand, contentFlatCommand);
          } else {
            commands.push(whitespaceBreakCommand, contentBreakCommand);
          }
          break;
        }
        const secondContent = parts[offset + 2];
        const remainingCommand = {
          indent: indent22,
          mode,
          doc: {
            ...doc2,
            [DOC_FILL_PRINTED_LENGTH]: offset + 2
          }
        };
        const firstAndSecondContentFlatCommand = {
          indent: indent22,
          mode: MODE_FLAT,
          doc: [content, whitespace, secondContent]
        };
        const firstAndSecondContentFits = fits(firstAndSecondContentFlatCommand, [], remainingWidth, lineSuffix2.length > 0, groupModeMap, true);
        commands.push(remainingCommand);
        if (firstAndSecondContentFits) {
          commands.push(whitespaceFlatCommand, contentFlatCommand);
        } else if (contentFits) {
          commands.push(whitespaceBreakCommand, contentFlatCommand);
        } else {
          commands.push(whitespaceBreakCommand, contentBreakCommand);
        }
        break;
      }
      case DOC_TYPE_IF_BREAK:
      case DOC_TYPE_INDENT_IF_BREAK: {
        const groupMode = doc2.groupId ? groupModeMap[doc2.groupId] : mode;
        if (groupMode === MODE_BREAK) {
          const breakContents = doc2.type === DOC_TYPE_IF_BREAK ? doc2.breakContents : doc2.negate ? doc2.contents : indent(doc2.contents);
          if (breakContents) {
            commands.push({
              indent: indent22,
              mode,
              doc: breakContents
            });
          }
        }
        if (groupMode === MODE_FLAT) {
          const flatContents = doc2.type === DOC_TYPE_IF_BREAK ? doc2.flatContents : doc2.negate ? indent(doc2.contents) : doc2.contents;
          if (flatContents) {
            commands.push({
              indent: indent22,
              mode,
              doc: flatContents
            });
          }
        }
        break;
      }
      case DOC_TYPE_LINE_SUFFIX:
        lineSuffix2.push({
          indent: indent22,
          mode,
          doc: doc2.contents
        });
        break;
      case DOC_TYPE_LINE_SUFFIX_BOUNDARY:
        if (lineSuffix2.length > 0) {
          commands.push({
            indent: indent22,
            mode,
            doc: hardlineWithoutBreakParent
          });
        }
        break;
      case DOC_TYPE_LINE:
        switch (mode) {
          case MODE_FLAT:
            if (!doc2.hard) {
              if (!doc2.soft) {
                result.write(" ");
                position += 1;
              }
              break;
            }
            shouldRemeasure = true;
          // fallthrough
          case MODE_BREAK:
            if (lineSuffix2.length > 0) {
              commands.push({
                indent: indent22,
                mode,
                doc: doc2
              }, ...lineSuffix2.reverse());
              lineSuffix2.length = 0;
              break;
            }
            if (doc2.literal) {
              result.write(newLine);
              position = 0;
              if (indent22.root) {
                if (indent22.root.value) {
                  result.write(indent22.root.value);
                }
                position = indent22.root.length;
              }
            } else {
              result.trim();
              result.write(newLine + indent22.value);
              position = indent22.length;
            }
            break;
        }
        break;
      case DOC_TYPE_LABEL:
        commands.push({
          indent: indent22,
          mode,
          doc: doc2.contents
        });
        break;
      case DOC_TYPE_BREAK_PARENT:
        break;
      default:
        throw new invalid_doc_error_default(doc2);
    }
    if (commands.length === 0 && lineSuffix2.length > 0) {
      commands.push(...lineSuffix2.reverse());
      lineSuffix2.length = 0;
    }
  }
  const {
    text: formatted,
    positions: cursorPositions
  } = result.finish();
  if (cursorPositions.length !== 2) {
    return {
      formatted
    };
  }
  const [cursorNodeStart, cursorNodeEnd] = cursorPositions;
  return {
    formatted,
    cursorNodeStart,
    cursorNodeText: formatted.slice(cursorNodeStart, cursorNodeEnd)
  };
}
var builders = {
  join,
  line,
  softline,
  hardline,
  literalline,
  group,
  conditionalGroup,
  fill,
  lineSuffix,
  lineSuffixBoundary,
  cursor,
  breakParent,
  ifBreak,
  trim,
  indent,
  indentIfBreak,
  align,
  addAlignmentToDoc,
  markAsRoot,
  dedentToRoot,
  dedent,
  hardlineWithoutBreakParent,
  literallineWithoutBreakParent,
  label,
  // TODO: Remove this in v4
  concat: (parts) => parts
};
var printer = { printDocToString };
var utils = {
  willBreak,
  traverseDoc: traverse_doc_default,
  findInDoc,
  mapDoc,
  removeLines,
  stripTrailingHardline,
  replaceEndOfLine,
  canBreak
};

// node_modules/@typespec/compiler/dist/src/formatter/print/comment-handler.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/formatter/print/util.js
init_define_process_env();
var util = fr;

// node_modules/@typespec/compiler/dist/src/formatter/print/comment-handler.js
var commentHandler = {
  ownLine: (comment, text, options, ast, isLastComment) => [addEmptyDeclarationComment, addCommentBetweenAnnotationsAndNode, handleOnlyComments].some((x) => x({ comment, text, options, ast, isLastComment })),
  remaining: (comment, text, options, ast, isLastComment) => [handleOnlyComments].some((x) => x({ comment, text, options, ast, isLastComment })),
  endOfLine: (comment, text, options, ast, isLastComment) => [handleOnlyComments].some((x) => x({ comment, text, options, ast, isLastComment }))
};
function addEmptyDeclarationComment({ comment }) {
  const { precedingNode, enclosingNode } = comment;
  if (!enclosingNode || !precedingNode) {
    return false;
  }
  let isEmptyDeclarationBody = false;
  switch (enclosingNode.kind) {
    case SyntaxKind.InterfaceStatement:
      isEmptyDeclarationBody = enclosingNode.operations.length === 0 && precedingNode.kind === SyntaxKind.Identifier;
      break;
    case SyntaxKind.ModelStatement:
    case SyntaxKind.ModelDeclarationExpression:
      isEmptyDeclarationBody = enclosingNode.properties.length === 0 && (precedingNode === enclosingNode.is || precedingNode === enclosingNode.id || precedingNode === enclosingNode.extends);
      break;
    case SyntaxKind.ScalarStatement:
    case SyntaxKind.ScalarDeclarationExpression:
      isEmptyDeclarationBody = enclosingNode.members.length === 0 && (precedingNode === enclosingNode.id || precedingNode === enclosingNode.extends);
      break;
    case SyntaxKind.UnionStatement:
      isEmptyDeclarationBody = enclosingNode.options.length === 0 && (precedingNode === enclosingNode.id || precedingNode === enclosingNode.extends);
      break;
    case SyntaxKind.UnionDeclarationExpression:
      isEmptyDeclarationBody = enclosingNode.options.length === 0 && precedingNode === enclosingNode.id;
      break;
  }
  if (isEmptyDeclarationBody) {
    util.addDanglingComment(enclosingNode, comment, void 0);
    return true;
  }
  return false;
}
function addCommentBetweenAnnotationsAndNode({ comment }) {
  const { precedingNode, enclosingNode } = comment;
  if (precedingNode && (precedingNode.kind === SyntaxKind.DecoratorExpression || precedingNode.kind === SyntaxKind.DirectiveExpression || precedingNode.kind === SyntaxKind.Doc) && enclosingNode && (enclosingNode.kind === SyntaxKind.NamespaceStatement || enclosingNode.kind === SyntaxKind.ModelStatement || enclosingNode.kind === SyntaxKind.ModelDeclarationExpression || enclosingNode.kind === SyntaxKind.EnumStatement || enclosingNode.kind === SyntaxKind.EnumDeclarationExpression || enclosingNode.kind === SyntaxKind.OperationStatement || enclosingNode.kind === SyntaxKind.ScalarStatement || enclosingNode.kind === SyntaxKind.ScalarDeclarationExpression || enclosingNode.kind === SyntaxKind.InterfaceStatement || enclosingNode.kind === SyntaxKind.ModelProperty || enclosingNode.kind === SyntaxKind.EnumMember || enclosingNode.kind === SyntaxKind.UnionVariant || enclosingNode.kind === SyntaxKind.UnionStatement || enclosingNode.kind === SyntaxKind.UnionDeclarationExpression)) {
    util.addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}
function handleOnlyComments({ comment, ast, isLastComment }) {
  const { enclosingNode } = comment;
  if (ast?.statements?.length === 0) {
    if (isLastComment) {
      util.addDanglingComment(ast, comment, void 0);
    } else {
      util.addLeadingComment(ast, comment);
    }
    return true;
  }
  if (enclosingNode?.kind === SyntaxKind.TypeSpecScript && enclosingNode.statements.length === 0 && enclosingNode.directives?.length === 0) {
    if (isLastComment) {
      util.addDanglingComment(enclosingNode, comment, void 0);
    } else {
      util.addLeadingComment(enclosingNode, comment);
    }
    return true;
  }
  return false;
}

// node_modules/@typespec/compiler/dist/src/formatter/print/needs-parens.js
init_define_process_env();
function needsParens(path, options) {
  const parent = path.getParentNode();
  if (!parent) {
    return false;
  }
  const node = path.node;
  switch (node.kind) {
    case SyntaxKind.ValueOfExpression:
      return parent.kind === SyntaxKind.UnionExpression || parent.kind === SyntaxKind.ArrayExpression || parent.kind === SyntaxKind.IntersectionExpression;
    case SyntaxKind.IntersectionExpression:
      return parent.kind === SyntaxKind.UnionExpression || parent.kind === SyntaxKind.ArrayExpression;
    case SyntaxKind.UnionExpression:
      return parent.kind === SyntaxKind.IntersectionExpression || parent.kind === SyntaxKind.ArrayExpression;
    default:
      return false;
  }
}

// node_modules/@typespec/compiler/dist/src/formatter/print/printer.js
var { align: align2, breakParent: breakParent2, conditionalGroup: conditionalGroup2, group: group2, hardline: hardline2, ifBreak: ifBreak2, indent: indent2, join: join2, line: line2, softline: softline2, literalline: literalline2, markAsRoot: markAsRoot2 } = builders;
var { isNextLineEmpty } = util;
var DecoratorsTryInline = {
  modelProperty: true,
  enumMember: true,
  unionVariant: true
};
var typespecPrinter = {
  print: printTypeSpec,
  isBlockComment: (node) => isBlockComment(node),
  canAttachComment,
  printComment,
  handleComments: commentHandler
};
function printTypeSpec(path, options, print) {
  const node = path.node;
  if (isDeclarationExpressionNode(node)) {
    return printDeclarationExpression(path, options, print);
  }
  const docs = printDocComments(path, options, print);
  const directives = shouldPrintDirective(node) ? printDirectives(path, options, print) : "";
  const printedNode = printNode(path, options, print);
  const value = needsParens(path, options) ? ["(", printedNode, ")"] : printedNode;
  const parts = [docs, directives, value];
  if (node.kind === SyntaxKind.TypeSpecScript) {
    parts.push(hardline2);
  }
  return parts;
}
function printDeclarationExpression(path, options, print) {
  const node = path.node;
  const bare = printNode(path, options, print);
  const docs = node.docs?.length ? path.map((x) => print(x), "docs") : [];
  const decorators = node.decorators?.length ? path.map((x) => print(x), "decorators") : [];
  const prefix = [...docs, ...decorators];
  if (prefix.length === 0) {
    return bare;
  }
  const inline = join2(" ", [...prefix, bare]);
  const broken = isInArgumentPosition(path) ? join2(hardline2, [...prefix, bare]) : indent2([hardline2, join2(hardline2, [...prefix, bare])]);
  return conditionalGroup2([inline, broken]);
}
function isInArgumentPosition(path) {
  const parent = path.getParentNode();
  switch (parent?.kind) {
    case SyntaxKind.DecoratorExpression:
    case SyntaxKind.AugmentDecoratorStatement:
    case SyntaxKind.CallExpression:
      return true;
    default:
      return false;
  }
}
function shouldPrintDirective(node) {
  return node.kind !== SyntaxKind.ModelProperty;
}
function printNode(path, options, print) {
  const node = path.node;
  switch (node.kind) {
    // Root
    case SyntaxKind.TypeSpecScript:
      return printTypeSpecScript(path, options, print);
    // Statements
    case SyntaxKind.ImportStatement:
      return [`import "${node.path.value}";`];
    case SyntaxKind.UsingStatement:
      return [`using `, path.call(print, "name"), `;`];
    case SyntaxKind.OperationStatement:
      return printOperationStatement(path, options, print);
    case SyntaxKind.OperationSignatureDeclaration:
      return printOperationSignatureDeclaration(path, options, print);
    case SyntaxKind.OperationSignatureReference:
      return printOperationSignatureReference(path, options, print);
    case SyntaxKind.NamespaceStatement:
      return printNamespaceStatement(path, options, print);
    case SyntaxKind.ModelStatement:
      return printModelStatement(path, options, print);
    case SyntaxKind.ModelDeclarationExpression:
      return printModelStatement(path, options, print);
    case SyntaxKind.ScalarStatement:
      return printScalarStatement(path, options, print);
    case SyntaxKind.ScalarDeclarationExpression:
      return printScalarStatement(path, options, print);
    case SyntaxKind.ScalarConstructor:
      return printScalarConstructor(path, options, print);
    case SyntaxKind.AliasStatement:
      return printAliasStatement(path, options, print);
    case SyntaxKind.EnumStatement:
      return printEnumStatement(path, options, print);
    case SyntaxKind.EnumDeclarationExpression:
      return printEnumStatement(path, options, print);
    case SyntaxKind.UnionStatement:
      return printUnionStatement(path, options, print);
    case SyntaxKind.UnionDeclarationExpression:
      return printUnionStatement(path, options, print);
    case SyntaxKind.InterfaceStatement:
      return printInterfaceStatement(path, options, print);
    // Others.
    case SyntaxKind.Identifier:
      return printIdentifier2(node);
    case SyntaxKind.StringLiteral:
      return printStringLiteral(path, options);
    case SyntaxKind.NumericLiteral:
      return printNumberLiteral(path, options);
    case SyntaxKind.BooleanLiteral:
      return printBooleanLiteral(path, options);
    case SyntaxKind.ModelExpression:
      return printModelExpression(path, options, print);
    case SyntaxKind.ModelProperty:
      return printModelProperty(path, options, print);
    case SyntaxKind.DecoratorExpression:
      return printDecorator(path, options, print);
    case SyntaxKind.AugmentDecoratorStatement:
      return printAugmentDecorator(path, options, print);
    case SyntaxKind.DirectiveExpression:
      return printDirective(path, options, print);
    case SyntaxKind.UnionExpression:
      return printUnion(path, options, print);
    case SyntaxKind.IntersectionExpression:
      return printIntersection(path, options, print);
    case SyntaxKind.ArrayExpression:
      return printArray(path, options, print);
    case SyntaxKind.TupleExpression:
      return printTuple(path, options, print);
    case SyntaxKind.MemberExpression:
      return printMemberExpression(path, options, print);
    case SyntaxKind.EnumMember:
      return printEnumMember(path, options, print);
    case SyntaxKind.EnumSpreadMember:
      return printEnumSpreadMember(path, options, print);
    case SyntaxKind.UnionVariant:
      return printUnionVariant(path, options, print);
    case SyntaxKind.TypeReference:
      return printTypeReference(path, options, print);
    case SyntaxKind.TemplateArgument:
      return printTemplateArgument(path, options, print);
    case SyntaxKind.ValueOfExpression:
      return printValueOfExpression(path, options, print);
    case SyntaxKind.TypeOfExpression:
      return printTypeOfExpression(path, options, print);
    case SyntaxKind.TemplateParameterDeclaration:
      return printTemplateParameterDeclaration(path, options, print);
    case SyntaxKind.ModelSpreadProperty:
      return printModelSpread(path, options, print);
    case SyntaxKind.DecoratorDeclarationStatement:
      return printDecoratorDeclarationStatement(path, options, print);
    case SyntaxKind.FunctionDeclarationStatement:
      return printFunctionDeclarationStatement(path, options, print);
    case SyntaxKind.FunctionTypeExpression:
      return printFunctionTypeExpression(path, options, print);
    case SyntaxKind.FunctionParameter:
      return printFunctionParameterDeclaration(path, options, print);
    case SyntaxKind.ExternKeyword:
      return "extern";
    case SyntaxKind.InternalKeyword:
      return "internal";
    case SyntaxKind.AutoKeyword:
      return "auto";
    case SyntaxKind.VoidKeyword:
      return "void";
    case SyntaxKind.NeverKeyword:
      return "never";
    case SyntaxKind.UnknownKeyword:
      return "unknown";
    case SyntaxKind.Doc:
      return printDoc(path, options, print);
    case SyntaxKind.DocText:
    case SyntaxKind.DocParamTag:
    case SyntaxKind.DocPropTag:
    case SyntaxKind.DocTemplateTag:
    case SyntaxKind.DocReturnsTag:
    case SyntaxKind.DocErrorsTag:
    case SyntaxKind.DocUnknownTag:
      compilerAssert(false, "Currently, doc comments are only handled as regular comments and we do not opt in to parsing them so we shouldn't reach here.");
      return "";
    case SyntaxKind.EmptyStatement:
      return "";
    case SyntaxKind.StringTemplateExpression:
      return printStringTemplateExpression(path, options, print);
    case SyntaxKind.ObjectLiteral:
      return printObjectLiteral(path, options, print);
    case SyntaxKind.ObjectLiteralProperty:
      return printObjectLiteralProperty(path, options, print);
    case SyntaxKind.ObjectLiteralSpreadProperty:
      return printObjectLiteralSpreadProperty(path, options, print);
    case SyntaxKind.ArrayLiteral:
      return printArrayLiteral(path, options, print);
    case SyntaxKind.ConstStatement:
      return printConstStatement(path, options, print);
    case SyntaxKind.CallExpression:
      return printCallExpression(path, options, print);
    case SyntaxKind.StringTemplateSpan:
    case SyntaxKind.StringTemplateHead:
    case SyntaxKind.StringTemplateMiddle:
    case SyntaxKind.StringTemplateTail:
    case SyntaxKind.JsSourceFile:
    case SyntaxKind.JsNamespaceDeclaration:
    case SyntaxKind.InvalidStatement:
      return getRawText(node, options);
    default:
      const _assertNever = node;
      return getRawText(node, options);
  }
}
function printTypeSpecScript(path, options, print) {
  const node = path.node;
  const nodeHasComments = hasComments(node, CommentCheckFlags.Dangling);
  const body = [];
  if (nodeHasComments) {
    body.push(printDanglingComments(path, options, { sameIndent: true }));
  }
  body.push(printStatementSequence(path, options, print, "statements"));
  return body;
}
function printAliasStatement(path, options, print) {
  const id = path.call(print, "id");
  const template = printTemplateParameterDeclarations(path, options, print, "templateParameters");
  return [
    printModifiers(path, options, print),
    "alias ",
    id,
    template,
    " = ",
    path.call(print, "value"),
    ";"
  ];
}
function printConstStatement(path, options, print) {
  const node = path.node;
  const id = path.call(print, "id");
  const type = node.type ? [": ", path.call(print, "type")] : "";
  return [
    printModifiers(path, options, print),
    "const ",
    id,
    type,
    " = ",
    path.call(print, "value"),
    ";"
  ];
}
function printCallExpression(path, options, print) {
  const args = printCallLikeArgs(path, options, print);
  return [path.call(print, "target"), args];
}
function printTemplateArguments(path, options, print, propertyName) {
  const node = path.node;
  const args = node[propertyName];
  if (args.length === 0) {
    return "";
  }
  const shouldHug = args.length === 1;
  if (shouldHug) {
    return ["<", join2(", ", path.map(print, propertyName)), ">"];
  } else {
    const body = indent2([softline2, join2([", ", softline2], path.map(print, propertyName))]);
    return group2(["<", body, softline2, ">"]);
  }
}
function printTemplateParameterDeclarations(path, options, print, propertyName) {
  const node = path.node;
  const params = node[propertyName];
  if (params.length === 0) {
    return "";
  }
  if (params.length === 1 && isUnbreakableTemplateParameter(params[0])) {
    return ["<", join2(", ", path.map(print, propertyName)), ">"];
  }
  const body = indent2([softline2, join2([",", line2], path.map(print, propertyName))]);
  return group2(["<", body, softline2, ">"]);
}
function isUnbreakableTemplateParameter(node) {
  return isUnbreakableType(node.constraint) && isUnbreakableType(node.default);
}
function isUnbreakableType(node) {
  if (node === void 0) {
    return true;
  }
  switch (node.kind) {
    case SyntaxKind.Identifier:
    case SyntaxKind.MemberExpression:
    case SyntaxKind.StringLiteral:
    case SyntaxKind.NumericLiteral:
    case SyntaxKind.BooleanLiteral:
    case SyntaxKind.VoidKeyword:
    case SyntaxKind.NeverKeyword:
    case SyntaxKind.UnknownKeyword:
      return true;
    case SyntaxKind.TypeReference:
      return node.arguments.length === 0 || node.arguments.length === 1 && isUnbreakableType(node.arguments[0].argument);
    case SyntaxKind.ArrayExpression:
      return isUnbreakableType(node.elementType);
    case SyntaxKind.ValueOfExpression:
    case SyntaxKind.TypeOfExpression:
      return isUnbreakableType(node.target);
    default:
      return false;
  }
}
function canAttachComment(node) {
  const kind = node.kind;
  return Boolean(kind && kind !== SyntaxKind.LineComment && kind !== SyntaxKind.BlockComment && kind !== SyntaxKind.EmptyStatement && kind !== SyntaxKind.DocParamTag && kind !== SyntaxKind.DocReturnsTag && kind !== SyntaxKind.DocTemplateTag && kind !== SyntaxKind.DocText && kind !== SyntaxKind.DocUnknownTag && !(node.flags & NodeFlags.Synthetic));
}
function printComment(commentPath, options) {
  const comment = commentPath.node;
  comment.printed = true;
  switch (comment.kind) {
    case SyntaxKind.BlockComment:
      return printBlockComment(commentPath, options);
    case SyntaxKind.LineComment:
      return `${getRawText(comment, options).trimEnd()}`;
    default:
      throw new Error(`Not a comment: ${JSON.stringify(comment)}`);
  }
}
function printBlockComment(commentPath, options) {
  const comment = commentPath.node;
  const rawComment = options.originalText.slice(comment.pos + 2, comment.end - 2);
  const printed = isIndentableBlockComment(rawComment) ? printIndentableBlockCommentContent(rawComment) : rawComment;
  return ["/*", printed, "*/"];
}
function isIndentableBlockComment(rawComment) {
  const lines = `*${rawComment}*`.split("\n");
  return lines.length > 1 && lines.every((line3) => line3.trim()[0] === "*");
}
function printIndentableBlockCommentContent(rawComment) {
  const lines = rawComment.split("\n");
  return [
    join2(hardline2, lines.map((line3, index) => index === 0 ? line3.trimEnd() : " " + (index < lines.length - 1 ? line3.trim() : line3.trimStart())))
  ];
}
function printDoc(path, options, print) {
  const node = path.node;
  const rawComment = getRawText(node, options).slice(3, -2);
  const printed = isIndentableBlockComment(rawComment) ? printIndentableBlockCommentContent(rawComment) : rawComment.includes("\n") ? rawComment : ` ${rawComment.trim()} `;
  return ["/**", printed, "*/"];
}
function printDecorators(path, options, print, { tryInline }) {
  const node = path.node;
  if (node.decorators.length === 0) {
    return { decorators: "", multiline: false };
  }
  const shouldBreak = shouldDecoratorBreakLine(path, options, { tryInline });
  const decorators = path.map((x) => [print(x), ifBreak2(line2, " ")], "decorators");
  return {
    decorators: group2([shouldBreak ? breakParent2 : "", decorators]),
    multiline: shouldBreak
  };
}
function shouldDecoratorBreakLine(path, options, { tryInline }) {
  const node = path.node;
  return !tryInline || node.decorators.length >= 3 || hasNewlineBetweenOrAfterDecorators(node, options);
}
function hasNewlineBetweenOrAfterDecorators(node, options) {
  return node.decorators.some((decorator) => util.hasNewline(options.originalText, decorator.end));
}
function printDecorator(path, options, print) {
  const args = printDecoratorArgs(path, options, print);
  const node = path.node;
  const name = node.target.kind === SyntaxKind.Identifier ? printIdentifier2(node.target, "allow-reserved") : path.call(print, "target");
  return ["@", name, args];
}
function printAugmentDecorator(path, options, print) {
  const node = path.node;
  const target = node.target.kind === SyntaxKind.Identifier ? printIdentifier2(node.target, "allow-reserved") : path.call(print, "target");
  const args = printAugmentDecoratorArgs(path, options, print);
  return ["@@", target, args, ";"];
}
function printAugmentDecoratorArgs(path, options, print) {
  return [
    "(",
    group2([
      indent2(join2(", ", [
        [softline2, path.call(print, "targetType")],
        ...path.map((arg) => [softline2, print(arg)], "arguments")
      ])),
      softline2
    ]),
    ")"
  ];
}
function printDocComments(path, options, print) {
  const node = path.node;
  if (node.docs === void 0 || node.docs.length === 0) {
    return "";
  }
  const docs = path.map((x) => [print(x), line2], "docs");
  return group2([...docs, breakParent2]);
}
function isDeclarationExpressionNode(node) {
  switch (node.kind) {
    case SyntaxKind.ModelDeclarationExpression:
    case SyntaxKind.EnumDeclarationExpression:
    case SyntaxKind.UnionDeclarationExpression:
    case SyntaxKind.ScalarDeclarationExpression:
      return true;
    default:
      return false;
  }
}
function printDirectives(path, options, print) {
  const node = path.node;
  if (node.directives === void 0 || node.directives.length === 0) {
    return "";
  }
  const directives = path.map((x) => [print(x), line2], "directives");
  return group2([...directives, breakParent2]);
}
function printDirective(path, options, print) {
  const args = printDirectiveArgs(path, options, print);
  return ["#", path.call(print, "target"), " ", args];
}
function printDecoratorArgs(path, options, print) {
  const node = path.node;
  if (node.arguments.length === 0) {
    return "";
  }
  return printCallLikeArgs(path, options, print);
}
function printCallLikeArgs(path, options, print) {
  const node = path.node;
  const shouldHug = node.arguments.length === 1 && (node.arguments[0].kind === SyntaxKind.ModelExpression || node.arguments[0].kind === SyntaxKind.ObjectLiteral || node.arguments[0].kind === SyntaxKind.ArrayLiteral || node.arguments[0].kind === SyntaxKind.StringLiteral || node.arguments[0].kind === SyntaxKind.StringTemplateExpression);
  if (shouldHug) {
    return [
      "(",
      join2(", ", path.map((arg) => [print(arg)], "arguments")),
      ")"
    ];
  }
  return [
    "(",
    group2([
      indent2(join2(", ", path.map((arg) => [softline2, print(arg)], "arguments"))),
      softline2
    ]),
    ")"
  ];
}
function printDirectiveArgs(path, options, print) {
  const node = path.node;
  if (node.arguments.length === 0) {
    return "";
  }
  return join2(" ", path.map((arg) => [print(arg)], "arguments"));
}
function printEnumStatement(path, options, print) {
  const inExpressionPosition = isDeclarationExpressionNode(path.node);
  const decorators = inExpressionPosition ? "" : printDecorators(path, options, print, { tryInline: false }).decorators;
  const id = path.node.id ? [" ", path.call(print, "id")] : "";
  return [
    decorators,
    printModifiers(path, options, print),
    "enum",
    id,
    " ",
    printEnumBlock(path, options, print)
  ];
}
function printEnumBlock(path, options, print) {
  const node = path.node;
  if (node.members.length === 0) {
    return "{}";
  }
  const body = joinMembersInBlock(path, "members", options, print, ",", hardline2);
  return group2(["{", indent2(body), hardline2, "}"]);
}
function printEnumMember(path, options, print) {
  const node = path.node;
  const id = printIdentifier2(node.id, "allow-reserved");
  const value = node.value ? [": ", path.call(print, "value")] : "";
  const { decorators } = printDecorators(path, options, print, {
    tryInline: DecoratorsTryInline.enumMember
  });
  return [decorators, id, value];
}
function printEnumSpreadMember(path, options, print) {
  return ["...", path.call(print, "target")];
}
function printUnionStatement(path, options, print) {
  const inExpressionPosition = isDeclarationExpressionNode(path.node);
  const id = path.node.id ? [" ", path.call(print, "id")] : "";
  const decorators = inExpressionPosition ? "" : printDecorators(path, options, print, { tryInline: false }).decorators;
  const generic = printTemplateParameterDeclarations(path, options, print, "templateParameters");
  const heritage = printHeritageClause(path, print, "extends", "extends");
  return [
    decorators,
    printModifiers(path, options, print),
    "union",
    id,
    generic,
    heritage,
    " ",
    printUnionVariantsBlock(path, options, print)
  ];
}
function printUnionVariantsBlock(path, options, print) {
  const node = path.node;
  const nodeHasComments = hasComments(node, CommentCheckFlags.Dangling);
  if (node.options.length === 0 && !nodeHasComments) {
    return "{}";
  }
  const body = [joinMembersInBlock(path, "options", options, print, ",", hardline2)];
  if (nodeHasComments) {
    body.push(printDanglingComments(path, options, { sameIndent: true }));
  }
  return group2(["{", indent2(body), hardline2, "}"]);
}
function printUnionVariant(path, options, print) {
  const id = path.node.id === void 0 ? "" : [printIdentifier2(path.node.id, "allow-reserved"), ": "];
  const { decorators } = printDecorators(path, options, print, {
    tryInline: DecoratorsTryInline.unionVariant
  });
  return [decorators, id, path.call(print, "value")];
}
function printInterfaceStatement(path, options, print) {
  const id = path.call(print, "id");
  const { decorators } = printDecorators(path, options, print, { tryInline: false });
  const generic = printTemplateParameterDeclarations(path, options, print, "templateParameters");
  const extendList = printInterfaceExtends(path, options, print);
  return [
    decorators,
    printModifiers(path, options, print),
    "interface ",
    id,
    generic,
    extendList,
    " ",
    printInterfaceMembers(path, options, print)
  ];
}
function printInterfaceExtends(path, options, print) {
  const node = path.node;
  if (node.extends.length === 0) {
    return "";
  }
  const keyword = "extends ";
  return [group2(indent2([line2, keyword, indent2(join2([",", line2], path.map(print, "extends")))]))];
}
function printInterfaceMembers(path, options, print) {
  const node = path.node;
  const hasOperations = node.operations.length > 0;
  const nodeHasComments = hasComments(node, CommentCheckFlags.Dangling);
  if (!hasOperations && !nodeHasComments) {
    return "{}";
  }
  const lastOperation = node.operations[node.operations.length - 1];
  const parts = [];
  path.each((operationPath) => {
    const node2 = operationPath.node;
    const printed = print(operationPath);
    parts.push(printed);
    if (node2 !== lastOperation) {
      parts.push(hardline2);
      if (isNextLineEmpty(options.originalText, node2, options.locEnd)) {
        parts.push(hardline2);
      }
    }
  }, "operations");
  const body = [hardline2, parts];
  if (nodeHasComments) {
    body.push(printDanglingComments(path, options, { sameIndent: true }));
  }
  return group2(["{", indent2(body), hardline2, "}"]);
}
function printDanglingComments(path, options, { sameIndent }) {
  const node = path.node;
  const parts = [];
  if (!node || !node.comments) {
    return "";
  }
  path.each((commentPath) => {
    const comment = commentPath.node;
    if (!comment.leading && !comment.trailing) {
      parts.push(printComment(path, options));
    }
  }, "comments");
  if (parts.length === 0) {
    return "";
  }
  if (sameIndent) {
    return join2(hardline2, parts);
  }
  return indent2([hardline2, join2(hardline2, parts)]);
}
function printIntersection(path, options, print) {
  const node = path.node;
  const types = path.map(print, "options");
  const result = [];
  let wasIndented = false;
  for (let i = 0; i < types.length; ++i) {
    if (i === 0) {
      result.push(types[i]);
    } else if (isModelNode(node.options[i - 1]) && isModelNode(node.options[i])) {
      result.push([" & ", wasIndented ? indent2(types[i]) : types[i]]);
    } else if (!isModelNode(node.options[i - 1]) && !isModelNode(node.options[i])) {
      result.push(indent2([" &", line2, types[i]]));
    } else {
      if (i > 1) {
        wasIndented = true;
      }
      result.push(" & ", i > 1 ? indent2(types[i]) : types[i]);
    }
  }
  return group2(result);
}
function isModelNode(node) {
  return node.kind === SyntaxKind.ModelExpression;
}
function printArray(path, options, print) {
  return [path.call(print, "elementType"), "[]"];
}
function printTuple(path, options, print) {
  return group2([
    "[",
    indent2(join2(", ", path.map((arg) => [softline2, print(arg)], "values"))),
    softline2,
    "]"
  ]);
}
function printMemberExpression(path, options, print) {
  const node = path.node;
  const id = printIdentifier2(node.id, "allow-reserved");
  return [node.base ? [path.call(print, "base"), node.selector] : "", id];
}
function printModelExpression(path, options, print) {
  const inBlock = isModelExpressionInBlock(path);
  const node = path.node;
  if (inBlock) {
    return group2(printModelPropertiesBlock(path, options, print));
  } else {
    const nodeHasComments = hasComments(node, CommentCheckFlags.Dangling);
    if (node.properties.length === 0) {
      if (nodeHasComments) {
        return group2([
          indent2(printDanglingComments(path, options, { sameIndent: true })),
          softline2
        ]);
      }
      return group2(["", softline2]);
    }
    const properties = indent2(joinMembersInBlock(path, "properties", options, print, ifBreak2(",", ", "), softline2));
    return group2([properties, softline2]);
  }
}
function printObjectLiteral(path, options, print) {
  const node = path.node;
  const hasProperties = node.properties && node.properties.length > 0;
  const nodeHasComments = hasComments(node, CommentCheckFlags.Dangling);
  if (!hasProperties && !nodeHasComments) {
    return "#{}";
  }
  const lineDoc = softline2;
  const body = [
    joinMembersInBlock(path, "properties", options, print, ifBreak2(",", ", "), softline2)
  ];
  if (nodeHasComments) {
    body.push(printDanglingComments(path, options, { sameIndent: true }));
  }
  return group2(["#{", ifBreak2("", " "), indent2(body), lineDoc, ifBreak2("", " "), "}"]);
}
function printObjectLiteralProperty(path, options, print) {
  const node = path.node;
  const id = printIdentifier2(node.id, "allow-reserved");
  return [printDirectives(path, options, print), id, ": ", path.call(print, "value")];
}
function printObjectLiteralSpreadProperty(path, options, print) {
  return [printDirectives(path, options, print), "...", path.call(print, "target")];
}
function printArrayLiteral(path, options, print) {
  return group2([
    "#[",
    indent2(join2(", ", path.map((arg) => [softline2, print(arg)], "values"))),
    softline2,
    "]"
  ]);
}
function printHeritageClause(path, print, keyword, propertyName) {
  const ref = path.node[propertyName];
  if (!ref) {
    return "";
  }
  const printed = [`${keyword} `, path.call(print, propertyName)];
  if (isMultiArgTemplateReference(ref)) {
    return [" ", printed];
  }
  return group2(indent2([ifBreak2(line2, " "), printed]));
}
function isMultiArgTemplateReference(node) {
  return node.kind === SyntaxKind.TypeReference && node.arguments.length >= 2;
}
function printModelStatement(path, options, print) {
  const node = path.node;
  const id = node.id ? [" ", path.call(print, "id")] : "";
  const heritage = printHeritageClause(path, print, "extends", "extends");
  const isBase = printHeritageClause(path, print, "is", "is");
  const generic = printTemplateParameterDeclarations(path, options, print, "templateParameters");
  const nodeHasComments = hasComments(node, CommentCheckFlags.Dangling);
  const shouldPrintBody = nodeHasComments || !(node.properties.length === 0 && node.is);
  const inExpressionPosition = isDeclarationExpressionNode(node);
  const body = shouldPrintBody ? [" ", printModelPropertiesBlock(path, options, print)] : inExpressionPosition ? "" : ";";
  const decorators = inExpressionPosition ? "" : printDecorators(path, options, print, { tryInline: false }).decorators;
  return [
    decorators,
    printModifiers(path, options, print),
    "model",
    id,
    generic,
    heritage,
    isBase,
    body
  ];
}
function printModelPropertiesBlock(path, options, print) {
  const node = path.node;
  const hasProperties = node.properties && node.properties.length > 0;
  const nodeHasComments = hasComments(node, CommentCheckFlags.Dangling);
  if (!hasProperties && !nodeHasComments) {
    return "{}";
  }
  const tryInline = path.getParentNode()?.kind === SyntaxKind.TemplateParameterDeclaration;
  const lineDoc = tryInline ? softline2 : hardline2;
  const rawSeparator = isModelAValue(path) ? "," : ";";
  const separator = tryInline ? ifBreak2(rawSeparator, `${rawSeparator} `) : rawSeparator;
  const body = [joinMembersInBlock(path, "properties", options, print, separator, lineDoc)];
  if (nodeHasComments) {
    body.push(printDanglingComments(path, options, { sameIndent: true }));
  }
  return group2(["{", indent2(body), lineDoc, "}"]);
}
function joinMembersInBlock(path, member, options, print, separator, regularLine = hardline2) {
  const doc = [regularLine];
  const propertyContainerNode = path.node;
  let newLineBeforeNextProp = false;
  path.each((item, propertyIndex) => {
    const isFirst = propertyIndex === 0;
    const isLast = propertyIndex === propertyContainerNode[member].length - 1;
    const shouldWrapInNewLines = shouldWrapMemberInNewLines(item, options);
    if ((newLineBeforeNextProp || shouldWrapInNewLines) && !isFirst) {
      doc.push(hardline2);
      newLineBeforeNextProp = false;
    }
    doc.push(print(item));
    if (isLast) {
      doc.push(ifBreak2(separator));
    } else {
      doc.push(separator);
      doc.push(regularLine);
      if (shouldWrapInNewLines) {
        newLineBeforeNextProp = true;
      }
    }
  }, member);
  return doc;
}
function shouldWrapMemberInNewLines(path, options) {
  const node = path.node;
  return node.kind !== SyntaxKind.ModelSpreadProperty && node.kind !== SyntaxKind.EnumSpreadMember && node.kind !== SyntaxKind.ScalarConstructor && node.kind !== SyntaxKind.ObjectLiteralProperty && node.kind !== SyntaxKind.ObjectLiteralSpreadProperty && shouldDecoratorBreakLine(path, options, {
    tryInline: DecoratorsTryInline.modelProperty
  }) || hasComments(node, CommentCheckFlags.Leading) || node.docs && node.docs?.length > 0;
}
function isModelAValue(path) {
  let count = 0;
  let node = path.node;
  do {
    switch (node.kind) {
      case SyntaxKind.ModelStatement:
      case SyntaxKind.ModelDeclarationExpression:
      case SyntaxKind.AliasStatement:
      case SyntaxKind.OperationStatement:
        return false;
      case SyntaxKind.DecoratorExpression:
        return true;
    }
  } while (node = path.getParentNode(count++));
  return true;
}
function printModelProperty(path, options, print) {
  const node = path.node;
  const { decorators } = printDecorators(path, options, print, {
    tryInline: DecoratorsTryInline.modelProperty
  });
  const id = printIdentifier2(node.id, "allow-reserved");
  return [
    printDirectives(path, options, print),
    decorators,
    id,
    node.optional ? "?: " : ": ",
    path.call(print, "value"),
    node.default ? [" = ", path.call(print, "default")] : ""
  ];
}
function printIdentifier2(id, context = "disallow-reserved") {
  return printIdentifier(id.sv, context);
}
function isModelExpressionInBlock(path) {
  const parent = path.getParentNode();
  switch (parent?.kind) {
    case SyntaxKind.OperationSignatureDeclaration:
      return parent.parameters !== path.getNode();
    default:
      return true;
  }
}
function printScalarStatement(path, options, print) {
  const node = path.node;
  const id = node.id ? [" ", path.call(print, "id")] : "";
  const template = printTemplateParameterDeclarations(path, options, print, "templateParameters");
  const heritage = printHeritageClause(path, print, "extends", "extends");
  const nodeHasComments = hasComments(node, CommentCheckFlags.Dangling);
  const shouldPrintBody = nodeHasComments || !(node.members.length === 0);
  const inExpressionPosition = isDeclarationExpressionNode(node);
  const members = shouldPrintBody ? [" ", printScalarBody(path, options, print)] : inExpressionPosition ? "" : ";";
  const decorators = inExpressionPosition ? "" : printDecorators(path, options, print, { tryInline: false }).decorators;
  return [
    decorators,
    printModifiers(path, options, print),
    "scalar",
    id,
    template,
    heritage,
    members
  ];
}
function printScalarBody(path, options, print) {
  const node = path.node;
  const hasProperties = node.members && node.members.length > 0;
  const nodeHasComments = hasComments(node, CommentCheckFlags.Dangling);
  if (!hasProperties && !nodeHasComments) {
    return "{}";
  }
  const body = [joinMembersInBlock(path, "members", options, print, ";", hardline2)];
  if (nodeHasComments) {
    body.push(printDanglingComments(path, options, { sameIndent: true }));
  }
  return group2(["{", indent2(body), hardline2, "}"]);
}
function printScalarConstructor(path, options, print) {
  const id = path.call(print, "id");
  const parameters = [
    group2([
      indent2(join2(", ", path.map((arg) => [softline2, print(arg)], "parameters"))),
      softline2
    ])
  ];
  return ["init ", id, "(", parameters, ")"];
}
function printNamespaceStatement(path, options, print) {
  const names = path.map(print, "ids");
  const currentNode = path.getNode();
  const suffix = currentNode?.statements === void 0 ? ";" : [
    " {",
    indent2([hardline2, printStatementSequence(path, options, print, "statements")]),
    hardline2,
    "}"
  ];
  const { decorators } = printDecorators(path, options, print, { tryInline: false });
  return [decorators, `namespace `, join2(".", names), suffix];
}
function printOperationSignatureDeclaration(path, options, print) {
  return ["(", path.call(print, "parameters"), "): ", path.call(print, "returnType")];
}
function printOperationSignatureReference(path, options, print) {
  return [" is ", path.call(print, "baseOperation")];
}
function printOperationStatement(path, options, print) {
  const inInterface = path.getParentNode()?.kind === SyntaxKind.InterfaceStatement;
  const templateParams = printTemplateParameterDeclarations(path, options, print, "templateParameters");
  const { decorators } = printDecorators(path, options, print, {
    tryInline: true
  });
  return [
    decorators,
    printModifiers(path, options, print),
    inInterface ? "" : "op ",
    path.call(print, "id"),
    templateParams,
    path.call(print, "signature"),
    `;`
  ];
}
function printStatementSequence(path, options, print, property) {
  const node = path.node;
  const parts = [];
  const lastStatement = getLastStatement(node[property]);
  path.each((statementPath) => {
    const node2 = path.node;
    if (node2.kind === SyntaxKind.EmptyStatement) {
      return;
    }
    const printed = print(statementPath);
    parts.push(printed);
    if (node2 !== lastStatement) {
      parts.push(hardline2);
      if (isNextLineEmpty(options.originalText, node2, options.locEnd)) {
        parts.push(hardline2);
      }
    }
  }, property);
  return parts;
}
function getLastStatement(statements) {
  for (let i = statements.length - 1; i >= 0; i--) {
    const statement = statements[i];
    if (statement.kind !== SyntaxKind.EmptyStatement) {
      return statement;
    }
  }
  return void 0;
}
function printUnion(path, options, print) {
  const inMultiTemplateArgumentList = isInMultiTemplateArgumentList(path);
  const types = path.map((typePath) => align2(2, print(typePath)), "options");
  const shouldAddStartLine = !inMultiTemplateArgumentList;
  const code = [ifBreak2([shouldAddStartLine ? line2 : "", "| "], ""), join2([line2, "| "], types)];
  return inMultiTemplateArgumentList ? group2(code) : group2(indent2(code));
}
function isInMultiTemplateArgumentList(path) {
  const argument = path.getParentNode();
  if (argument?.kind !== SyntaxKind.TemplateArgument) {
    return false;
  }
  if (argument.name !== void 0) {
    return false;
  }
  const reference = path.getParentNode(1);
  return reference?.kind === SyntaxKind.TypeReference && reference.arguments.length > 1;
}
function printTypeReference(path, options, print) {
  const type = path.call(print, "target");
  const template = printTemplateArguments(path, options, print, "arguments");
  return [type, template];
}
function printTemplateArgument(path, _options, print) {
  if (path.node.name !== void 0) {
    const name = path.call(print, "name");
    const argument = path.call(print, "argument");
    return group2([name, " = ", argument]);
  } else {
    return path.call(print, "argument");
  }
}
function printValueOfExpression(path, options, print) {
  const type = path.call(print, "target");
  return ["valueof ", type];
}
function printTypeOfExpression(path, options, print) {
  const type = path.call(print, "target");
  return ["typeof ", type];
}
function printTemplateParameterDeclaration(path, options, print) {
  const node = path.node;
  return [
    path.call(print, "id"),
    node.constraint ? [" extends ", path.call(print, "constraint")] : "",
    node.default ? [" = ", path.call(print, "default")] : ""
  ];
}
function printModelSpread(path, options, print) {
  return ["...", path.call(print, "target")];
}
function printDecoratorDeclarationStatement(path, options, print) {
  const id = path.call(print, "id");
  const parameters = [
    group2([
      indent2(join2(", ", [
        [softline2, path.call(print, "target")],
        ...path.map((arg) => [softline2, print(arg)], "parameters")
      ])),
      softline2
    ])
  ];
  return [printModifiers(path, options, print), "dec ", id, "(", parameters, ")", ";"];
}
function printFunctionDeclarationStatement(path, options, print) {
  const node = path.node;
  const id = path.call(print, "id");
  const parameters = [
    group2([
      indent2(join2(", ", path.map((arg) => [softline2, print(arg)], "parameters"))),
      softline2
    ])
  ];
  const returnType = node.returnType ? [": ", path.call(print, "returnType")] : "";
  return [printModifiers(path, options, print), "fn ", id, "(", parameters, ")", returnType, ";"];
}
function printFunctionTypeExpression(path, options, print) {
  const node = path.node;
  const parameters = [
    group2([
      indent2(join2(", ", path.map((arg) => [softline2, print(arg)], "parameters"))),
      softline2
    ])
  ];
  const returnType = node.returnType ? [" => ", path.call(print, "returnType")] : "";
  return ["fn", "(", parameters, ")", returnType];
}
function printFunctionParameterDeclaration(path, options, print) {
  const node = path.node;
  const id = printIdentifier2(node.id, "allow-reserved");
  const type = node.type ? [": ", path.call(print, "type")] : "";
  return [
    node.rest ? "..." : "",
    printDirectives(path, options, print),
    id,
    node.optional ? "?" : "",
    type
  ];
}
function printModifiers(path, options, print) {
  const node = path.node;
  if (node.modifiers === void 0 || node.modifiers.length === 0) {
    return "";
  }
  return path.map((x) => [print(x), " "], "modifiers");
}
function printStringLiteral(path, options) {
  const node = path.node;
  const multiline = isMultiline(node, options);
  const raw = getRawText(node, options);
  if (multiline) {
    const lines = splitLines(raw.slice(3));
    const whitespaceIndent = lines[lines.length - 1].length - 3;
    const newLines = trimMultilineString(lines, whitespaceIndent);
    return [`"""`, indent2(markAsRoot2(newLines))];
  } else {
    return raw;
  }
}
function isMultiline(node, options) {
  return options.originalText[node.pos] && options.originalText[node.pos + 1] === `"` && options.originalText[node.pos + 2] === `"`;
}
function printNumberLiteral(path, options) {
  const node = path.node;
  return node.valueAsString;
}
function printBooleanLiteral(path, options) {
  const node = path.node;
  return node.value ? "true" : "false";
}
function printStringTemplateExpression(path, options, print) {
  const node = path.node;
  const multiline = isMultiline(node, options);
  const rawHead = getRawText(node.head, options);
  if (multiline) {
    const lastSpan = node.spans[node.spans.length - 1];
    const lastLines = splitLines(getRawText(lastSpan.literal, options));
    const whitespaceIndent = lastLines[lastLines.length - 1].length - 3;
    const content = [
      trimMultilineString(splitLines(rawHead.slice(3)), whitespaceIndent),
      path.map((span) => {
        const expression = span.call(print, "expression");
        const spanRawText = getRawText(span.node.literal, options);
        const spanLines = splitLines(spanRawText);
        return [
          expression,
          spanLines[0],
          literalline2,
          trimMultilineString(spanLines.slice(1), whitespaceIndent)
        ];
      }, "spans")
    ];
    return [`"""`, indent2(markAsRoot2([content]))];
  } else {
    const content = [
      rawHead,
      path.map((span) => {
        const expression = span.call(print, "expression");
        return [expression, getRawText(span.node.literal, options)];
      }, "spans")
    ];
    return content;
  }
}
function trimMultilineString(lines, whitespaceIndent) {
  const newLines = [];
  for (let i = 0; i < lines.length; i++) {
    newLines.push(lines[i].slice(whitespaceIndent));
    if (i < lines.length - 1) {
      newLines.push(literalline2);
    }
  }
  return newLines;
}
function getRawText(node, options) {
  if ("rawText" in node) {
    return node.rawText;
  }
  return options.originalText.slice(node.pos, node.end);
}
function hasComments(node, flags) {
  if (!node.comments || node.comments.length === 0) {
    return false;
  }
  const test = getCommentTestFunction(flags);
  return test ? node.comments.some(test) : true;
}
var CommentCheckFlags;
(function(CommentCheckFlags2) {
  CommentCheckFlags2[CommentCheckFlags2["Leading"] = 2] = "Leading";
  CommentCheckFlags2[CommentCheckFlags2["Trailing"] = 4] = "Trailing";
  CommentCheckFlags2[CommentCheckFlags2["Dangling"] = 8] = "Dangling";
  CommentCheckFlags2[CommentCheckFlags2["Block"] = 16] = "Block";
  CommentCheckFlags2[CommentCheckFlags2["Line"] = 32] = "Line";
  CommentCheckFlags2[CommentCheckFlags2["PrettierIgnore"] = 64] = "PrettierIgnore";
  CommentCheckFlags2[CommentCheckFlags2["First"] = 128] = "First";
  CommentCheckFlags2[CommentCheckFlags2["Last"] = 256] = "Last";
})(CommentCheckFlags || (CommentCheckFlags = {}));
function getCommentTestFunction(flags) {
  if (flags) {
    return (comment, index, comments) => !(flags & CommentCheckFlags.Leading && !comment.leading || flags & CommentCheckFlags.Trailing && !comment.trailing || flags & CommentCheckFlags.Dangling && (comment.leading || comment.trailing) || flags & CommentCheckFlags.Block && !isBlockComment(comment) || flags & CommentCheckFlags.Line && !isLineComment(comment) || flags & CommentCheckFlags.First && index !== 0 || flags & CommentCheckFlags.Last && index !== comments.length - 1);
  }
  return void 0;
}
function isBlockComment(comment) {
  return comment.kind === SyntaxKind.BlockComment;
}
function isLineComment(comment) {
  return comment.kind === SyntaxKind.BlockComment;
}

// node_modules/@typespec/compiler/dist/src/formatter/index.js
var defaultOptions = {};
var languages = [
  {
    name: "TypeSpec",
    parsers: ["typespec"],
    extensions: [".tsp"],
    vscodeLanguageIds: ["typespec"]
  }
];
var TypeSpecParser = {
  parse: parse2,
  astFormat: "typespec-format",
  locStart(node) {
    return node.pos;
  },
  locEnd(node) {
    return node.end;
  }
};
var parsers = {
  typespec: TypeSpecParser
};
var printers = {
  "typespec-format": typespecPrinter
};

export {
  parsers,
  formatter_exports
};
