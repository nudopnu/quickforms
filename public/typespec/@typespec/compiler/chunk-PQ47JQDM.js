import {
  capitalize
} from "./chunk-LS4CFXSY.js";
import {
  DuplicateTracker,
  useStateMap,
  useStateSet
} from "./chunk-G5YGM2MV.js";
import {
  createTypekit,
  defineKit
} from "./chunk-HC4YXFN4.js";
import {
  IdentifierKind,
  ListenerFlow,
  ModifierFlags,
  NoTarget,
  NodeFlags,
  ResolutionResultFlags,
  SymbolFlags,
  SyntaxKind,
  checkModifiers,
  compilerAssert,
  createDiagnostic,
  createDiagnosticCollector,
  defineCodeFix,
  exprIsBareIdentifier,
  getFirstAncestor,
  getIdentifierContext,
  getSourceLocation,
  hasParseError,
  ignoreDiagnostics,
  printIdentifier,
  printMemberExpressionPath,
  reportDeprecated,
  reportDiagnostic,
  typeReferenceToString,
  visitChildren
} from "./chunk-THH472PB.js";
import {
  MultiKeyMap,
  createRekeyableMap,
  isArray,
  isDefined,
  mutate
} from "./chunk-LIGHGDDD.js";
import {
  init_define_process_env
} from "./chunk-D557AYM7.js";

// node_modules/@typespec/compiler/dist/src/typekit/index.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/experimental/realm.js
init_define_process_env();
var _a;
var StateMapRealmView = class {
  #realm;
  #parentState;
  #realmState;
  constructor(realm, realmState, parentState) {
    this.#realm = realm;
    this.#parentState = parentState;
    this.#realmState = realmState;
  }
  has(t) {
    return this.#select(t).has(t) ?? false;
  }
  set(t, v) {
    this.#select(t).set(t, v);
    return this;
  }
  get(t) {
    return this.#select(t).get(t);
  }
  delete(t) {
    return this.#select(t).delete(t);
  }
  forEach(cb, thisArg) {
    for (const item of this.entries()) {
      cb.call(thisArg, item[1], item[0], this);
    }
    return this;
  }
  get size() {
    return this.#realmState.size + this.#parentState.size;
  }
  clear() {
    this.#realmState.clear();
  }
  *entries() {
    for (const item of this.#realmState) {
      yield item;
    }
    for (const item of this.#parentState) {
      yield item;
    }
    return void 0;
  }
  *values() {
    for (const item of this.entries()) {
      yield item[1];
    }
    return void 0;
  }
  *keys() {
    for (const item of this.entries()) {
      yield item[0];
    }
    return void 0;
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  [Symbol.toStringTag] = "StateMap";
  #select(keyType) {
    if (this.#realm.hasType(keyType)) {
      return this.#realmState;
    }
    return this.#parentState;
  }
};
var Realm = class {
  #program;
  /**
   * Stores all types owned by this realm.
   */
  #types = /* @__PURE__ */ new Set();
  /**
   * Stores types that are deleted in this realm. When a realm is active and doing a traversal, you will
   * not find this type in e.g. collections. Deleted types are mapped to `null` if you ask for it.
   */
  #deletedTypes = /* @__PURE__ */ new WeakSet();
  #stateMaps = /* @__PURE__ */ new Map();
  key;
  /**
   * Create a new realm in the given program.
   *
   * @param program - The program to create the realm in.
   * @param description - A short description of the realm's purpose.
   */
  constructor(program, description) {
    this.key = Symbol(description);
    this.#program = program;
  }
  #_typekit;
  /**
   * The typekit instance bound to this realm.
   *
   * If the realm does not already have a typekit associated with it, one will be created and bound to this realm.
   */
  get typekit() {
    return this.#_typekit ??= createTypekit(this);
  }
  /**
   * The program that this realm is associated with.
   */
  get program() {
    return this.#program;
  }
  /**
   * Gets a state map for the given state key symbol.
   *
   * This state map is a view of the program's state map for the given state key, with modifications made to the realm's
   * own state.
   *
   * @param stateKey - The symbol to use as the state key.
   * @returns The realm's state map for the given state key.
   */
  stateMap(stateKey) {
    let m = this.#stateMaps.get(stateKey);
    if (!m) {
      m = /* @__PURE__ */ new Map();
      this.#stateMaps.set(stateKey, m);
    }
    return new StateMapRealmView(this, m, this.#program.stateMap(stateKey));
  }
  /**
   * Clones a type and adds it to the realm. This operation will use the realm's typekit to clone the type.
   *
   * @param type - The type to clone.
   * @returns A clone of the input type that exists within this realm.
   */
  clone(type) {
    compilerAssert(type, "Undefined type passed to clone");
    const clone = this.#cloneIntoRealm(type);
    this.typekit.type.finishType(clone);
    return clone;
  }
  /**
   * Removes a type from this realm. This operation will not affect the type in the program, only this realm's view
   * of the type.
   *
   * @param type - The TypeSpec type to remove from this realm.
   */
  remove(type) {
    this.#deletedTypes.add(type);
  }
  /**
   * Determines whether or not this realm contains a given type.
   *
   * @param type - The type to check.
   * @returns true if the type was created within this realm or added to this realm, false otherwise.
   */
  hasType(type) {
    return this.#types.has(type);
  }
  /**
   * Adds a type to this realm. Once a type is added to the realm, the realm considers it part of itself.
   *
   * A type can be present in multiple realms, but `Realm.realmForType` will only return the last realm that the type
   * was added to.
   *
   * @param type - The type to add to this realm.
   */
  addType(type) {
    this.#types.add(type);
    _a.realmForType.set(type, this);
  }
  #cloneIntoRealm(type) {
    const clone = this.typekit.type.clone(type);
    this.#types.add(clone);
    _a.realmForType.set(clone, this);
    return clone;
  }
  // TODO better way?
  /** @internal */
  get types() {
    return this.#types;
  }
  static realmForType = singleton("Realm.realmForType", () => /* @__PURE__ */ new WeakMap());
};
_a = Realm;
function singleton(key, init) {
  const sym = Symbol.for(key);
  if (!globalThis[sym]) {
    globalThis[sym] = init();
  }
  return globalThis[sym];
}

// node_modules/@typespec/compiler/dist/src/typekit/create-diagnosable.js
init_define_process_env();
function createDiagnosable(fn) {
  function wrapper(...args) {
    return ignoreDiagnostics(fn.apply(this, args));
  }
  wrapper.withDiagnostics = fn;
  return wrapper;
}

// node_modules/@typespec/compiler/dist/src/typekit/kits/index.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/typekit/kits/array.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/type-utils.js
init_define_process_env();
function isErrorType(type) {
  return "kind" in type && type.kind === "Intrinsic" && type.name === "ErrorType";
}
function isVoidType(type) {
  return "kind" in type && type.kind === "Intrinsic" && type.name === "void";
}
function isNeverType(type) {
  return "kind" in type && type.kind === "Intrinsic" && type.name === "never";
}
function isUnknownType(type) {
  return "kind" in type && type.kind === "Intrinsic" && type.name === "unknown";
}
function isNullType(type) {
  return "kind" in type && type.kind === "Intrinsic" && type.name === "null";
}
function isType(entity) {
  return entity.entityKind === "Type";
}
function isValue(entity) {
  return entity.entityKind === "Value";
}
function isArrayModelType(programOrType, maybeType) {
  const type = maybeType ?? programOrType;
  return Boolean(type.indexer && type.indexer.key.name === "integer");
}
function isRecordModelType(programOrType, maybeType) {
  const type = maybeType ?? programOrType;
  return Boolean(type.indexer && type.indexer.key.name === "string");
}
function getParentTemplateNode(node) {
  switch (node.kind) {
    case SyntaxKind.ModelStatement:
    case SyntaxKind.ModelDeclarationExpression:
    case SyntaxKind.ScalarStatement:
    case SyntaxKind.ScalarDeclarationExpression:
    case SyntaxKind.UnionStatement:
    case SyntaxKind.UnionDeclarationExpression:
    case SyntaxKind.InterfaceStatement:
      return node.templateParameters.length > 0 ? node : void 0;
    case SyntaxKind.OperationStatement:
      return node.templateParameters.length > 0 ? node : node.parent?.kind === SyntaxKind.InterfaceStatement ? node.parent.templateParameters.length > 0 ? node.parent : void 0 : void 0;
    case SyntaxKind.OperationSignatureDeclaration:
    case SyntaxKind.ModelProperty:
    case SyntaxKind.UnionVariant:
    case SyntaxKind.ModelExpression:
    case SyntaxKind.UnionExpression:
      return node.parent ? getParentTemplateNode(node.parent) : void 0;
    default:
      return void 0;
  }
}
function isTemplateInstance(type) {
  const maybeTemplateType = type;
  return maybeTemplateType.templateMapper !== void 0 && !maybeTemplateType.templateMapper.partial && maybeTemplateType.isFinished;
}
function isDeclaredType(type) {
  if (type.node === void 0) {
    return false;
  }
  const node = type.node;
  return node.templateParameters === void 0 || type.templateMapper === void 0;
}
function isTemplateDeclaration(type) {
  if (type.node === void 0) {
    return false;
  }
  const node = type.node;
  return node.templateParameters && node.templateParameters.length > 0 && type.templateMapper === void 0;
}
function isTemplateDeclarationOrInstance(type) {
  if (type.node === void 0) {
    return false;
  }
  const node = type.node;
  return node.templateParameters && node.templateParameters.length > 0;
}
function isGlobalNamespace(program, namespace) {
  return program.getGlobalNamespaceType() === namespace;
}
function isDeclaredInNamespace(type, namespace, options = { recursive: true }) {
  let candidateNs = type.namespace;
  while (candidateNs) {
    if (candidateNs === namespace) {
      return true;
    }
    if (type.kind === "Operation" && type.interface && type.interface.namespace === namespace) {
      return true;
    }
    candidateNs = options.recursive ? candidateNs.namespace : void 0;
  }
  return false;
}
function getFullyQualifiedSymbolName(sym, options) {
  if (!sym)
    return "";
  if (sym.symbolSource)
    sym = sym.symbolSource;
  const parent = sym.parent && !(sym.parent.flags & SymbolFlags.SourceFile) ? sym.parent : void 0;
  const name = sym.flags & SymbolFlags.Decorator ? sym.name.slice(1) : sym.name;
  if (parent?.name) {
    return `${getFullyQualifiedSymbolName(parent)}.${name}`;
  } else if (options?.useGlobalPrefixAtTopLevel) {
    return `global.${name}`;
  } else {
    return name;
  }
}

// node_modules/@typespec/compiler/dist/src/typekit/kits/array.js
defineKit({
  array: {
    is(type) {
      return type.entityKind === "Type" && type.kind === "Model" && isArrayModelType(type) && type.properties.size === 0;
    },
    getElementType(type) {
      if (!this.array.is(type)) {
        throw new Error("Type is not an array.");
      }
      return type.indexer.value;
    },
    create(elementType) {
      return this.model.create({
        name: "Array",
        properties: {},
        indexer: {
          key: this.builtin.integer,
          value: elementType
        }
      });
    }
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/builtin.js
init_define_process_env();
defineKit({
  builtin: {
    get string() {
      return this.program.checker.getStdType("string");
    },
    get boolean() {
      return this.program.checker.getStdType("boolean");
    },
    get bytes() {
      return this.program.checker.getStdType("bytes");
    },
    get decimal() {
      return this.program.checker.getStdType("decimal");
    },
    get decimal128() {
      return this.program.checker.getStdType("decimal128");
    },
    get duration() {
      return this.program.checker.getStdType("duration");
    },
    get float() {
      return this.program.checker.getStdType("float");
    },
    get float32() {
      return this.program.checker.getStdType("float32");
    },
    get float64() {
      return this.program.checker.getStdType("float64");
    },
    get int8() {
      return this.program.checker.getStdType("int8");
    },
    get int16() {
      return this.program.checker.getStdType("int16");
    },
    get int32() {
      return this.program.checker.getStdType("int32");
    },
    get int64() {
      return this.program.checker.getStdType("int64");
    },
    get integer() {
      return this.program.checker.getStdType("integer");
    },
    get offsetDateTime() {
      return this.program.checker.getStdType("offsetDateTime");
    },
    get plainDate() {
      return this.program.checker.getStdType("plainDate");
    },
    get plainTime() {
      return this.program.checker.getStdType("plainTime");
    },
    get safeInt() {
      return this.program.checker.getStdType("safeint");
    },
    get uint8() {
      return this.program.checker.getStdType("uint8");
    },
    get uint16() {
      return this.program.checker.getStdType("uint16");
    },
    get uint32() {
      return this.program.checker.getStdType("uint32");
    },
    get uint64() {
      return this.program.checker.getStdType("uint64");
    },
    get url() {
      return this.program.checker.getStdType("url");
    },
    get utcDateTime() {
      return this.program.checker.getStdType("utcDateTime");
    },
    get numeric() {
      return this.program.checker.getStdType("numeric");
    }
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/entity.js
init_define_process_env();
defineKit({
  entity: {
    isAssignableTo: createDiagnosable(function(source, target, diagnosticTarget) {
      return this.program.checker.isTypeAssignableTo(source, target, diagnosticTarget ?? source);
    }),
    resolve: createDiagnosable(function(reference) {
      return this.program.resolveTypeOrValueReference(reference);
    })
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/enum-member.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/typekit/utils.js
init_define_process_env();
function copyMap(map) {
  return createRekeyableMap(map.entries());
}
function resolveExpressionFlag(kind, name, expression) {
  if (!name) {
    if (expression === false) {
      throw new Error(`Cannot create an anonymous ${kind} declaration. Provide a name or leave \`expression\` unset.`);
    }
    return true;
  }
  return expression ?? false;
}
function decoratorApplication(typekit, decorators) {
  return decorators?.map((arg) => {
    const [decorator, args] = Array.isArray(arg) ? [arg[0], arg.slice(1)] : [arg, []];
    return {
      decorator,
      args: args.map((rawValue) => ({
        value: typeof rawValue === "object" && rawValue !== null ? rawValue : typekit.literal.create(rawValue),
        jsValue: rawValue
      }))
    };
  }) ?? [];
}

// node_modules/@typespec/compiler/dist/src/typekit/kits/enum-member.js
defineKit({
  enumMember: {
    create(desc) {
      const member = this.program.checker.createType({
        kind: "EnumMember",
        name: desc.name,
        value: desc.value,
        decorators: decoratorApplication(this, desc.decorators),
        enum: desc.enum
        // initialized in enum.build if not provided here
      });
      this.program.checker.finishType(member);
      return member;
    },
    is(type) {
      return type.entityKind === "Type" && type.kind === "EnumMember";
    }
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/enum.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/lib/decorators.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/decorator-utils.js
init_define_process_env();
function validateDecoratorTarget(context, target, decoratorName, expectedType) {
  const isCorrectType = isTypeSpecValueTypeOf(target, expectedType);
  if (!isCorrectType) {
    reportDiagnostic(context.program, {
      code: "decorator-wrong-target",
      format: {
        decorator: decoratorName,
        to: target.kind
      },
      target: context.decoratorTarget
    });
    return false;
  }
  return true;
}
function isIntrinsicType(program, type, kind) {
  return ignoreDiagnostics(program.checker.isTypeAssignableTo(type, program.checker.getStdType(kind), type));
}
function isTypeSpecValueTypeOf(target, expectedType) {
  const kind = getTypeKind(target);
  if (kind === void 0) {
    return false;
  }
  return typeof expectedType === "string" ? expectedType === "Any" || kind === expectedType : expectedType.includes("Any") || expectedType.includes(kind);
}
function getTypeKind(target) {
  switch (typeof target) {
    case "object":
      return target.kind;
    case "string":
      return "String";
    case "number":
      return "Number";
    case "boolean":
      return "Boolean";
    default:
      return void 0;
  }
}
function typespecTypeToJson(typespecType, target) {
  if (typeof typespecType !== "object") {
    return [typespecType, []];
  }
  return typespecTypeToJsonInternal(typespecType, target, []);
}
function typespecTypeToJsonInternal(typespecType, target, path) {
  switch (typespecType.kind) {
    case "String":
    case "Boolean":
    case "Number":
      return [typespecType.value, []];
    case "EnumMember":
      return [typespecType.value ?? typespecType.name, []];
    case "Tuple": {
      const result = [];
      for (const [index, type] of typespecType.values.entries()) {
        const [item, diagnostics] = typespecTypeToJsonInternal(type, target, [
          ...path,
          index.toString()
        ]);
        if (diagnostics.length > 0) {
          return [void 0, diagnostics];
        }
        result.push(item);
      }
      return [result, []];
    }
    case "Model": {
      const result = {};
      for (const [name, type] of typespecType.properties.entries()) {
        const [item, diagnostics] = typespecTypeToJsonInternal(type.type, target, [
          ...path,
          name.toString()
        ]);
        if (diagnostics.length > 0) {
          return [void 0, diagnostics];
        }
        result[name] = item;
      }
      return [result, []];
    }
    case "StringTemplate":
      if (typespecType.stringValue) {
        return [typespecType.stringValue, []];
      }
    // By design
    // eslint-disable-next-line no-fallthrough
    default:
      const diagnostic = path.length === 0 ? createDiagnostic({
        code: "invalid-value",
        format: {
          kind: typespecType.kind
        },
        target
      }) : createDiagnostic({
        code: "invalid-value",
        messageId: "atPath",
        format: {
          kind: typespecType.kind,
          path: path.join(".")
        },
        target
      });
      return [void 0, [diagnostic]];
  }
}
function validateDecoratorUniqueOnNode(context, type, decorator) {
  compilerAssert("decorators" in type, "Type should have decorators");
  const sameDecorators = type.decorators.filter((x) => x.decorator === decorator && x.node?.kind === SyntaxKind.DecoratorExpression && x.node?.parent === type.node);
  if (sameDecorators.length > 1) {
    reportDiagnostic(context.program, {
      code: "duplicate-decorator",
      format: { decoratorName: "@" + decorator.name.slice(1) },
      target: context.decoratorTarget
    });
    return false;
  }
  return true;
}
function validateDecoratorNotOnType(context, type, badDecorator, givenDecorator) {
  compilerAssert("decorators" in type, "Type should have decorators");
  const decAppsToCheck = [];
  let base = type;
  while (base) {
    decAppsToCheck.push(...base.decorators);
    base = getHeritage(base);
  }
  for (const decapp of decAppsToCheck) {
    if (decapp.decorator === badDecorator) {
      reportDiagnostic(context.program, {
        code: "decorator-conflict",
        format: {
          decoratorName: "@" + badDecorator.name.slice(1),
          otherDecoratorName: "@" + givenDecorator.name.slice(1)
        },
        target: context.decoratorTarget
      });
      return false;
    }
  }
  return true;
  function getHeritage(type2) {
    if (type2.kind === "Model") {
      return type2.baseModel;
    } else if (type2.kind === "Scalar") {
      return type2.baseScalar;
    } else {
      return void 0;
    }
  }
}
function getPropertyType(target) {
  if (target.kind === "ModelProperty") {
    return target.type;
  } else {
    return target;
  }
}

// node_modules/@typespec/compiler/dist/src/core/deprecation.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/lib/utils.js
init_define_process_env();
function filterModelPropertiesInPlace(model, filter) {
  for (const [key, prop] of model.properties) {
    if (!filter(prop)) {
      model.properties.delete(key);
    }
  }
}
function createStateSymbol(name) {
  return /* @__PURE__ */ Symbol.for(`TypeSpec.${name}`);
}
function replaceTemplatedStringFromProperties(formatString, sourceObject) {
  if (sourceObject.kind === "TemplateParameter") {
    return formatString;
  }
  return formatString.replace(/{(\w+)}/g, (_, propName) => {
    return sourceObject[propName];
  });
}

// node_modules/@typespec/compiler/dist/src/core/deprecation.js
var deprecatedKey = createStateSymbol("deprecated");
function isDeprecated(program, type) {
  return program.stateMap(deprecatedKey).has(type);
}
function getDeprecationDetails(program, typeOrNode) {
  function isType2(maybeType) {
    return typeof maybeType.kind === "string";
  }
  if (isType2(typeOrNode)) {
    return program.stateMap(deprecatedKey).get(typeOrNode);
  } else {
    const deprecatedDirective = (typeOrNode.directives ?? []).find((directive) => directive.target.sv === "deprecated");
    if (deprecatedDirective?.arguments[0].kind === SyntaxKind.StringLiteral) {
      return {
        message: deprecatedDirective.arguments[0].value
      };
    }
  }
  return void 0;
}
function markDeprecated(program, type, details) {
  program.stateMap(deprecatedKey).set(type, details);
}

// node_modules/@typespec/compiler/dist/src/core/helpers/discriminator-utils.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/intrinsic-type-state.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/numeric.js
init_define_process_env();
var InvalidNumericError = class extends Error {
  code = "InvalidNumeric";
};
var InternalDataSym = /* @__PURE__ */ Symbol.for("NumericInternalData");
function isNumeric(arg) {
  return typeof arg === "object" && arg !== null && InternalDataSym in arg;
}
function Numeric(stringValue) {
  if (new.target) {
    throw new Error("Numeric is not a constructor");
  }
  const data = parse(stringValue);
  const isInteger2 = data.d === 0;
  const obj = {
    [InternalDataSym]: data,
    isInteger: isInteger2
  };
  const numeric = setTypedProptotype(obj, NumericPrototype);
  return Object.freeze(numeric);
}
function setTypedProptotype(obj, prototype) {
  Object.setPrototypeOf(obj, prototype);
  return obj;
}
function parse(original) {
  let stringValue = original;
  let start = 0;
  let sign = 1;
  let n;
  let exp;
  let decimal = void 0;
  if (stringValue[0] === "-") {
    start = 1;
    sign = -1;
  }
  const second = stringValue[start + 1]?.toLowerCase();
  if (stringValue[start] === "0" && (second === "b" || second === "x" || second === "o")) {
    try {
      n = BigInt(stringValue.slice(start));
      exp = n.toString().length;
      decimal = 0;
    } catch {
      throw new InvalidNumericError(`Invalid numeric value: ${original}`);
    }
  } else {
    while (stringValue[start] === "0") {
      start++;
    }
    const decimalPointIndex = stringValue.indexOf(".");
    const adjustedPointIndex = decimalPointIndex - start;
    if (decimalPointIndex !== -1) {
      exp = adjustedPointIndex;
      stringValue = stringValue.replace(".", "");
    }
    let i;
    if ((i = stringValue.search(/e/i)) > 0) {
      if (exp === void 0) {
        exp = i - start;
      }
      exp += Number(stringValue.slice(i + 1));
      stringValue = stringValue.slice(start, i);
      decimal = Math.max(stringValue.length - exp, 0);
    } else if (exp === void 0) {
      exp = stringValue.length - start;
      stringValue = stringValue.slice(start);
    } else {
      stringValue = stringValue.slice(start);
    }
    let end = stringValue.length;
    while (stringValue[end - 1] === "0" && end > adjustedPointIndex) {
      end--;
    }
    if (start === adjustedPointIndex + 1) {
      let cur = adjustedPointIndex;
      while (stringValue[cur] === "0" && cur < end) {
        cur++;
        exp--;
      }
    }
    try {
      stringValue = stringValue.slice(0, end);
      stringValue = stringValue + "0".repeat(Math.max(exp - stringValue.length, 0));
      n = BigInt(stringValue);
      if (n === 0n) {
        decimal = 0;
      } else if (decimal === void 0) {
        decimal = Math.max(stringValue.length - Math.max(exp, 0), 0);
      }
    } catch {
      throw new InvalidNumericError(`Invalid numeric value: ${original}`);
    }
  }
  return { n, e: exp, s: sign, d: decimal };
}
function stringify(value) {
  if (value.n === 0n)
    return "0";
  const n = value.n.toString();
  const sign = value.s === -1 ? "-" : "";
  const int = value.e <= 0 ? "0" : n.slice(0, value.e);
  const decimal = value.e < n.length ? "." + n.slice(-value.d).padStart(value.d, "0") : "";
  return sign + int + decimal;
}
var equals = (a, b) => a.n === b.n && a.e === b.e;
var compare = (a, b) => {
  if (a.s < b.s) {
    return -1;
  } else if (a.s > b.s) {
    return 1;
  }
  const neg = a.s;
  if (a.e < b.e) {
    return -1 * neg;
  } else if (a.e > b.e) {
    return 1 * neg;
  }
  let aN = a.n;
  let bN = b.n;
  if (a.d < b.d) {
    aN *= 10n ** BigInt(b.d - a.d);
  } else {
    bN *= 10n ** BigInt(a.d - b.d);
  }
  if (aN < bN)
    return -1 * neg;
  if (aN > bN)
    return 1 * neg;
  return 0;
};
var NumericPrototype = {
  toString: function() {
    return stringify(this[InternalDataSym]);
  },
  asNumber: function() {
    const num = Number(stringify(this[InternalDataSym]));
    return equals(this[InternalDataSym], Numeric(num.toString())[InternalDataSym]) ? num : null;
  },
  asBigInt: function() {
    if (!this.isInteger) {
      return null;
    }
    const { s, n } = this[InternalDataSym];
    return BigInt(s) * n;
  },
  equals: function(other) {
    return equals(this[InternalDataSym], other[InternalDataSym]);
  },
  lt: function(other) {
    return compare(this[InternalDataSym], other[InternalDataSym]) === -1;
  },
  lte: function(other) {
    return compare(this[InternalDataSym], other[InternalDataSym]) <= 0;
  },
  gt: function(other) {
    return compare(this[InternalDataSym], other[InternalDataSym]) === 1;
  },
  gte: function(other) {
    return compare(this[InternalDataSym], other[InternalDataSym]) >= 0;
  }
};
NumericPrototype.toString = function() {
  return stringify(this[InternalDataSym]);
};

// node_modules/@typespec/compiler/dist/src/core/intrinsic-type-state.js
var stateKeys = {
  minValues: createStateSymbol("minValues"),
  maxValues: createStateSymbol("maxValues"),
  minValueExclusive: createStateSymbol("minValueExclusive"),
  maxValueExclusive: createStateSymbol("maxValueExclusive"),
  minLength: createStateSymbol("minLengthValues"),
  maxLength: createStateSymbol("maxLengthValues"),
  minItems: createStateSymbol("minItems"),
  maxItems: createStateSymbol("maxItems"),
  docs: createStateSymbol("docs"),
  returnDocs: createStateSymbol("returnsDocs"),
  errorsDocs: createStateSymbol("errorDocs"),
  discriminator: createStateSymbol("discriminator")
};
var [
  /** Get the min value for numeric or scalar types like date times */
  getMinValueRaw,
  setMinValue
] = useStateMap(stateKeys.minValues);
function getMinValueForScalar(program, target) {
  const value = getMinValueRaw(program, target);
  return !isNumeric(value) ? value : void 0;
}
function getMinValueAsNumeric(program, target) {
  const value = getMinValueRaw(program, target);
  return isNumeric(value) ? value : void 0;
}
function getMinValue(program, target) {
  return getMinValueAsNumeric(program, target)?.asNumber() ?? void 0;
}
var [
  /** Get the max value for numeric or scalar types like date times */
  getMaxValueRaw,
  setMaxValue
] = useStateMap(stateKeys.maxValues);
function getMaxValueForScalar(program, target) {
  const value = getMaxValueRaw(program, target);
  return !isNumeric(value) ? value : void 0;
}
function getMaxValueAsNumeric(program, target) {
  const value = getMaxValueRaw(program, target);
  return isNumeric(value) ? value : void 0;
}
function getMaxValue(program, target) {
  return getMaxValueAsNumeric(program, target)?.asNumber() ?? void 0;
}
var [
  /** Get the min value exclusive for numeric or scalar types like date times */
  getMinValueExclusiveRaw,
  setMinValueExclusive
] = useStateMap(stateKeys.minValueExclusive);
function getMinValueExclusiveForScalar(program, target) {
  const value = getMinValueExclusiveRaw(program, target);
  return !isNumeric(value) ? value : void 0;
}
function getMinValueExclusiveAsNumeric(program, target) {
  const value = getMinValueExclusiveRaw(program, target);
  return isNumeric(value) ? value : void 0;
}
function getMinValueExclusive(program, target) {
  return getMinValueExclusiveAsNumeric(program, target)?.asNumber() ?? void 0;
}
var [
  /** Get the max value exclusive for numeric or scalar types like date times */
  getMaxValueExclusiveRaw,
  setMaxValueExclusive
] = useStateMap(stateKeys.maxValueExclusive);
function getMaxValueExclusiveForScalar(program, target) {
  const value = getMaxValueExclusiveRaw(program, target);
  return !isNumeric(value) ? value : void 0;
}
function getMaxValueExclusiveAsNumeric(program, target) {
  const value = getMaxValueExclusiveRaw(program, target);
  return isNumeric(value) ? value : void 0;
}
function getMaxValueExclusive(program, target) {
  return getMaxValueExclusiveAsNumeric(program, target)?.asNumber() ?? void 0;
}
function setMinLength(program, target, value) {
  program.stateMap(stateKeys.minLength).set(target, value);
}
function getMinLengthAsNumeric(program, target) {
  return program.stateMap(stateKeys.minLength).get(target);
}
function getMinLength(program, target) {
  return getMinLengthAsNumeric(program, target)?.asNumber() ?? void 0;
}
function setMaxLength(program, target, value) {
  program.stateMap(stateKeys.maxLength).set(target, value);
}
function getMaxLengthAsNumeric(program, target) {
  return program.stateMap(stateKeys.maxLength).get(target);
}
function getMaxLength(program, target) {
  return getMaxLengthAsNumeric(program, target)?.asNumber() ?? void 0;
}
function setMinItems(program, target, value) {
  program.stateMap(stateKeys.minItems).set(target, value);
}
function getMinItemsAsNumeric(program, target) {
  return program.stateMap(stateKeys.minItems).get(target);
}
function getMinItems(program, target) {
  return getMinItemsAsNumeric(program, target)?.asNumber() ?? void 0;
}
function setMaxItems(program, target, value) {
  program.stateMap(stateKeys.maxItems).set(target, value);
}
function getMaxItemsAsNumeric(program, target) {
  return program.stateMap(stateKeys.maxItems).get(target);
}
function getMaxItems(program, target) {
  return getMaxItemsAsNumeric(program, target)?.asNumber() ?? void 0;
}
function setDocData(program, target, key, data) {
  program.stateMap(getDocKey(key)).set(target, data);
}
function getDocKey(target) {
  switch (target) {
    case "self":
      return stateKeys.docs;
    case "returns":
      return stateKeys.returnDocs;
    case "errors":
      return stateKeys.errorsDocs;
  }
}
function getDocDataInternal(program, target, key) {
  return program.stateMap(getDocKey(key)).get(target);
}
function getDocData(program, target) {
  return getDocDataInternal(program, target, "self");
}
function setDiscriminator(program, entity, discriminator) {
  program.stateMap(stateKeys.discriminator).set(entity, discriminator);
}
function getDiscriminator(program, entity) {
  return program.stateMap(stateKeys.discriminator).get(entity);
}
function getDiscriminatedTypes(program) {
  return [...program.stateMap(stateKeys.discriminator).entries()];
}
var [getDiscriminatedOptions, setDiscriminatedOptions] = useStateMap(createStateSymbol("discriminated"));

// node_modules/@typespec/compiler/dist/src/core/helpers/discriminator-utils.js
function getDiscriminatedUnion(typeOrProgram, typeOrDiscriminator) {
  return getDiscriminatedUnionForUnion(typeOrProgram, typeOrDiscriminator);
}
function validateInheritanceDiscriminatedUnions(program) {
  for (const [type, discriminator] of getDiscriminatedTypes(program)) {
    if (type.kind === "Model") {
      const [_, diagnostics] = getDiscriminatedUnionFromInheritance(type, discriminator);
      program.reportDiagnostics(diagnostics);
    }
  }
}
function getDiscriminatedUnionForUnion(program, type) {
  const options = getDiscriminatedOptions(program, type);
  const diagnostics = [];
  if (options === void 0) {
    return [void 0, []];
  }
  const variants = /* @__PURE__ */ new Map();
  let defaultVariant;
  for (const variant of type.variants.values()) {
    if (typeof variant.name !== "string") {
      if (defaultVariant) {
        diagnostics.push(createDiagnostic({
          code: "invalid-discriminated-union-variant",
          messageId: "duplicateDefaultVariant",
          format: { unionName: type.name ?? "(anonymous)" },
          target: variant
        }));
      } else {
        defaultVariant = variant.type;
      }
      continue;
    }
    variants.set(variant.name, variant.type);
    if (options.envelope === "none") {
      if (variant.type.kind !== "Model") {
        diagnostics.push(createDiagnostic({
          code: "invalid-discriminated-union-variant",
          messageId: "noEnvelopeModel",
          format: { name: variant.name.toString() },
          target: variant
        }));
        continue;
      }
      const prop = variant.type.properties.get(options.discriminatorPropertyName);
      if (prop !== void 0) {
        const key = getStringValue(prop.type);
        if (key !== variant.name) {
          diagnostics.push(createDiagnostic({
            code: "invalid-discriminated-union-variant",
            messageId: "discriminantMismatch",
            format: {
              name: variant.name.toString(),
              discriminant: options.discriminatorPropertyName,
              propertyValue: key,
              variantName: String(variant.name)
            },
            target: variant.type
          }));
        }
      }
    }
  }
  return [
    {
      type,
      options,
      variants,
      defaultVariant
    },
    diagnostics
  ];
}
function getDiscriminatedUnionFromInheritance(type, discriminator) {
  const variants = /* @__PURE__ */ new Map();
  const diagnostics = [];
  const duplicates = new DuplicateTracker();
  function checkForVariantsIn(current) {
    for (const derivedModel of current.derivedModels) {
      if (isTemplateDeclarationOrInstance(derivedModel)) {
        continue;
      }
      const keys = getDiscriminatorValues(derivedModel, discriminator, diagnostics);
      if (keys === void 0) {
        if (derivedModel.derivedModels.length === 0) {
          diagnostics.push(createDiagnostic({
            code: "missing-discriminator-property",
            format: { discriminator: discriminator.propertyName },
            target: derivedModel
          }));
        } else {
          checkForVariantsIn(derivedModel);
        }
      } else {
        for (const key of keys) {
          duplicates.track(key, derivedModel);
          variants.set(key, derivedModel);
        }
      }
    }
  }
  checkForVariantsIn(type);
  reportDuplicateDiscriminatorValues(duplicates, diagnostics);
  const discriminatedUnion = {
    kind: "legacy",
    propertyName: discriminator.propertyName,
    variants
  };
  return [discriminatedUnion, diagnostics];
}
function reportDuplicateDiscriminatorValues(duplicates, diagnostics) {
  for (const [duplicateKey, models] of duplicates.entries()) {
    for (const model of models) {
      diagnostics.push(createDiagnostic({
        code: "invalid-discriminator-value",
        messageId: "duplicate",
        format: { discriminator: duplicateKey },
        target: model
      }));
    }
  }
}
function getDiscriminatorProperty(model, discriminator, diagnostics) {
  const prop = model.properties.get(discriminator.propertyName);
  if (prop && prop.optional) {
    diagnostics.push(createDiagnostic({
      code: "invalid-discriminator-value",
      messageId: "required",
      target: prop
    }));
  }
  return prop;
}
function getDiscriminatorValues(model, discriminator, diagnostics) {
  const prop = getDiscriminatorProperty(model, discriminator, diagnostics);
  if (!prop)
    return void 0;
  const keys = getStringValues(prop.type);
  if (keys.length === 0) {
    diagnostics.push(createDiagnostic({
      code: "invalid-discriminator-value",
      format: { kind: prop.type.kind },
      target: prop
    }));
  }
  return keys;
}
function getStringValues(type) {
  switch (type.kind) {
    case "String":
      return [type.value];
    case "Union":
      return [...type.variants.values()].flatMap((x) => getStringValues(x.type)).filter(isDefined);
    case "EnumMember":
      return typeof type.value !== "number" ? [type.value ?? type.name] : [];
    case "UnionVariant":
      return getStringValues(type.type);
    default:
      return [];
  }
}
function getStringValue(type) {
  switch (type.kind) {
    case "String":
      return type.value;
    case "EnumMember":
      return typeof type.value !== "number" ? type.value ?? type.name : void 0;
    default:
      return void 0;
  }
}

// node_modules/@typespec/compiler/dist/src/core/helpers/type-name-utils.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/helpers/raw-text-cache.js
init_define_process_env();
var nodeRawTextCache = /* @__PURE__ */ new WeakMap();
function cacheRawText(node, rawText) {
  nodeRawTextCache.set(node, rawText);
}
function getCachedRawText(node) {
  return nodeRawTextCache.get(node);
}
function getRawTextWithCache(node) {
  const cached = getCachedRawText(node);
  if (cached !== void 0) {
    return cached;
  }
  let rawText = "";
  if ("rawText" in node) {
    rawText = node.rawText;
  } else {
    const scriptNode = getTypeSpecScript(node);
    if (scriptNode) {
      rawText = scriptNode.file.text.slice(node.pos, node.end);
    }
  }
  cacheRawText(node, rawText);
  return rawText;
}
function getTypeSpecScript(node) {
  let current = node;
  while (current.parent) {
    current = current.parent;
  }
  return current.kind === SyntaxKind.TypeSpecScript ? current : void 0;
}

// node_modules/@typespec/compiler/dist/src/core/helpers/type-name-utils.js
function getTypeName(type, options) {
  switch (type.kind) {
    case "Namespace":
      return getNamespaceFullName(type, options);
    case "TemplateParameter":
      return getIdentifierName(type.node.id.sv, options);
    case "TemplateParameterAccess":
      return type.path;
    case "Scalar":
      return getScalarName(type, options);
    case "Model":
      return getModelName(type, options);
    case "ModelProperty":
      return getModelPropertyName(type, options);
    case "Interface":
      return getInterfaceName(type, options);
    case "Operation":
      return getOperationName(type, options);
    case "Enum":
      return getEnumName(type, options);
    case "EnumMember":
      return `${getEnumName(type.enum, options)}.${getIdentifierName(type.name, options)}`;
    case "Union":
      return getUnionName(type, options);
    case "UnionVariant":
      return getTypeName(type.type, options);
    case "Tuple":
      return "[" + type.values.map((x) => getTypeName(x, options)).join(", ") + "]";
    case "StringTemplate":
      return getStringTemplateName(type);
    case "String":
      return `"${type.value}"`;
    case "Number":
      return type.valueAsString;
    case "Boolean":
      return type.value.toString();
    case "Intrinsic":
      return type.name;
    case "FunctionType":
      return getFunctionSignature(type);
    default:
      return `(unnamed type)`;
  }
}
function getFunctionSignature(type) {
  const parameters = [...type.parameters].map((x) => {
    const rest = x.rest ? "..." : "";
    const optional = x.optional ? "?" : "";
    return `${rest}${x.name}${optional}: ${getEntityName(x.type)}`;
  });
  return `fn (${parameters.join(", ")}) => ${getEntityName(type.returnType)}`;
}
function getValuePreview(value, options) {
  switch (value.valueKind) {
    case "ObjectValue":
      return `#{${[...value.properties.entries()].map(([name, value2]) => `${name}: ${getValuePreview(value2.value, options)}`).join(", ")}}`;
    case "ArrayValue":
      return `#[${value.values.map((x) => getValuePreview(x, options)).join(", ")}]`;
    case "StringValue":
      return `"${value.value}"`;
    case "BooleanValue":
      return `${value.value}`;
    case "NumericValue":
      return `${value.value.toString()}`;
    case "EnumValue":
      return getTypeName(value.value);
    case "NullValue":
      return "null";
    case "ScalarValue":
      return `${getTypeName(value.type, options)}.${value.value.name}(${value.value.args.map((x) => getValuePreview(x, options)).join(", ")}})`;
    case "Function": {
      return `fn ${value.name ?? "<anonymous>"}`;
    }
  }
}
function getEntityName(entity, options) {
  if (isValue(entity)) {
    return getValuePreview(entity, options);
  } else if (isType(entity)) {
    return getTypeName(entity, options);
  } else {
    switch (entity.entityKind) {
      case "MixedParameterConstraint":
        return [
          entity.type && getEntityName(entity.type),
          entity.valueType && `valueof ${getEntityName(entity.valueType)}`
        ].filter(isDefined).join(" | ");
      case "Indeterminate":
        return getTypeName(entity.type, options);
    }
  }
}
function isStdNamespace(namespace) {
  return namespace.name === "TypeSpec" && namespace.namespace?.name === "" || namespace.name === "Reflection" && namespace.namespace?.name === "TypeSpec" && namespace.namespace?.namespace?.name === "";
}
function getNamespaceFullName(type, options) {
  const filter = options?.namespaceFilter;
  const segments = [];
  let current = type;
  while (current && current.name !== "") {
    if (filter && !filter(current)) {
      break;
    }
    segments.unshift(getIdentifierName(current.name, options));
    current = current.namespace;
  }
  return segments.join(".");
}
function getNamespacePrefix(type, options) {
  if (type === void 0 || isStdNamespace(type) || options?.nameOnly === true) {
    return "";
  }
  const namespaceFullName = getNamespaceFullName(type, options);
  return namespaceFullName !== "" ? namespaceFullName + "." : "";
}
function getEnumName(e, options) {
  if (e.name === "") {
    return `{ ${[...e.members.values()].map((m) => m.name).join(", ")} }`;
  }
  const nsPrefix = e.expression ? "" : getNamespacePrefix(e.namespace, options);
  return `${nsPrefix}${getIdentifierName(e.name, options)}`;
}
function getScalarName(scalar, options) {
  if (scalar.name === "") {
    return scalar.baseScalar ? `scalar extends ${getTypeName(scalar.baseScalar, options)}` : "scalar";
  }
  const nsPrefix = scalar.expression ? "" : getNamespacePrefix(scalar.namespace, options);
  return `${nsPrefix}${getIdentifierName(scalar.name, options)}`;
}
function getModelName(model, options) {
  const nsPrefix = model.expression ? "" : getNamespacePrefix(model.namespace, options);
  if (model.name === "") {
    const operationParametersName = getOperationParametersName(model, options);
    if (operationParametersName !== void 0) {
      return operationParametersName;
    }
  }
  if (model.name === "" && model.properties.size === 0) {
    return "{}";
  }
  if (model.indexer && model.indexer.key.kind === "Scalar") {
    if (model.name === "Array" && isInTypeSpecNamespace(model)) {
      return `${getTypeName(model.indexer.value, options)}[]`;
    }
  }
  if (model.name === "") {
    return nsPrefix + `{ ${[...model.properties.values()].map((prop) => `${prop.name}: ${getTypeName(prop.type, options)}`).join(", ")} }`;
  }
  const modelName = nsPrefix + getIdentifierName(model.name, options);
  if (isTemplateInstance(model)) {
    const args = model.templateMapper.args.map((x) => getEntityName(x, options));
    return `${modelName}<${args.join(", ")}>`;
  } else if (model.node?.templateParameters?.length > 0) {
    const params = model.node.templateParameters.map((t) => {
      const cachedRawText = getCachedRawText(t);
      return getIdentifierName(t.id.sv, options, cachedRawText);
    });
    return `${modelName}<${params.join(", ")}>`;
  } else {
    return modelName;
  }
}
function getOperationParametersName(model, options) {
  const node = model.node;
  if (node?.kind !== SyntaxKind.ModelExpression)
    return void 0;
  const signature = node.parent;
  if (signature?.kind !== SyntaxKind.OperationSignatureDeclaration || signature.parameters !== node) {
    return void 0;
  }
  const operation = signature.parent;
  if (operation?.kind !== SyntaxKind.OperationStatement)
    return void 0;
  const opName = getIdentifierName(operation.id.sv, options);
  if (options?.nameOnly === true) {
    return `${opName}::parameters`;
  }
  const iface = operation.parent;
  const prefix = iface?.kind === SyntaxKind.InterfaceStatement ? `${getNamespacePrefix(model.namespace, options)}${getIdentifierName(iface.id.sv, options)}.` : getNamespacePrefix(model.namespace, options);
  return `${prefix}${opName}::parameters`;
}
function getUnionName(type, options) {
  const nsPrefix = type.expression ? "" : getNamespacePrefix(type.namespace, options);
  const typeName = type.name ? getIdentifierName(type.name, options) : [...type.variants.values()].map((x) => getTypeName(x.type, options)).join(" | ");
  return nsPrefix + typeName;
}
function isTypeSpecNamespace(namespace) {
  return namespace.name === "TypeSpec" && namespace.namespace?.name === "";
}
function isInTypeSpecNamespace(type) {
  return Boolean(type.namespace && isTypeSpecNamespace(type.namespace));
}
function getModelPropertyName(prop, options) {
  if (options?.nameOnly === true) {
    return prop.name;
  }
  const modelName = prop.model ? getModelName(prop.model, options) : void 0;
  return `${modelName ?? "(anonymous model)"}.${prop.name}`;
}
function getInterfaceName(iface, options) {
  let interfaceName = getIdentifierName(iface.name, options);
  if (isTemplateInstance(iface)) {
    interfaceName += `<${iface.templateMapper.args.map((x) => getEntityName(x, options)).join(", ")}>`;
  } else if (iface.node && iface.node.templateParameters.length > 0) {
    const params = iface.node.templateParameters.map((t) => {
      const cachedRawText = getCachedRawText(t);
      return getIdentifierName(t.id.sv, options, cachedRawText);
    });
    interfaceName += `<${params.join(", ")}>`;
  }
  return `${getNamespacePrefix(iface.namespace, options)}${interfaceName}`;
}
function getOperationName(op, options) {
  let opName = getIdentifierName(op.name, options);
  if (op.node && op.node.templateParameters.length > 0) {
    const params = op.node.templateParameters.map((t) => getIdentifierName(t.id.sv, options));
    opName += `<${params.join(", ")}>`;
  }
  if (options?.nameOnly === true) {
    return opName;
  } else {
    const prefix = op.interface ? getInterfaceName(op.interface, options) + "." : getNamespacePrefix(op.namespace, options);
    return `${prefix}${opName}`;
  }
}
function getIdentifierName(name, options, nodeIncludeRawText) {
  return nodeIncludeRawText ?? (options?.printable ? printIdentifier(name) : name);
}
function getStringTemplateName(type) {
  if (type.stringValue) {
    return `"${type.stringValue}"`;
  }
  return "string";
}

// node_modules/@typespec/compiler/dist/src/core/mime-type.js
init_define_process_env();
var regex = /^(application|audio|font|example|image|message|model|multipart|text|video|x-(?:[0-9A-Za-z!#$%&'*+.^_`|~-]+))\/([0-9A-Za-z!#$%&'*+.^_`|~-]+)$/;
function parseMimeType(mimeType) {
  const match = mimeType.match(regex);
  if (match == null) {
    return void 0;
  }
  const type = {
    type: match[1],
    ...parseSubType(match[2])
  };
  return type;
}
function parseSubType(value) {
  if (!value.includes("+"))
    return { subtype: value };
  const [subtype, suffix] = value.split("+", 2);
  return { subtype, suffix };
}

// node_modules/@typespec/compiler/dist/src/lib/key.js
init_define_process_env();
var [getKey, setKey] = useStateMap(createStateSymbol("key"));
function isKey(program, property) {
  return getKey(program, property) !== void 0;
}

// node_modules/@typespec/compiler/dist/src/lib/encoded-names.js
init_define_process_env();
var [getEncodedNamesMap, setEncodedNamesMap, getEncodedNamesStateMap] = useStateMap(createStateSymbol("encodedName"));
function $encodedName(context, target, mimeType, name) {
  let existing = getEncodedNamesMap(context.program, target);
  if (existing === void 0) {
    existing = /* @__PURE__ */ new Map();
    setEncodedNamesMap(context.program, target, existing);
  }
  const mimeTypeObj = parseMimeType(mimeType);
  if (mimeTypeObj === void 0) {
    reportDiagnostic(context.program, {
      code: "invalid-mime-type",
      format: { mimeType },
      target: context.getArgumentTarget(0)
    });
  } else if (mimeTypeObj.suffix) {
    reportDiagnostic(context.program, {
      code: "no-mime-type-suffix",
      format: { mimeType, suffix: mimeTypeObj.suffix },
      target: context.getArgumentTarget(0)
    });
  }
  existing.set(mimeType, name);
}
function getEncodedName(program, target, mimeType) {
  const mimeTypeObj = parseMimeType(mimeType);
  if (mimeTypeObj === void 0) {
    return void 0;
  }
  const resolvedMimeType = mimeTypeObj?.suffix ? `${mimeTypeObj.type}/${mimeTypeObj.suffix}` : mimeType;
  return getEncodedNamesMap(program, target)?.get(resolvedMimeType);
}
function resolveEncodedName(program, target, mimeType) {
  return getEncodedName(program, target, mimeType) ?? target.name;
}
function validateEncodedNamesConflicts(program) {
  const duplicateTrackers = /* @__PURE__ */ new Map();
  function getOrCreateDuplicateTracker(type, mimeType) {
    let perMimeTypes = duplicateTrackers.get(type);
    if (perMimeTypes === void 0) {
      perMimeTypes = /* @__PURE__ */ new Map();
      duplicateTrackers.set(type, perMimeTypes);
    }
    let tracker = perMimeTypes.get(mimeType);
    if (tracker === void 0) {
      tracker = new DuplicateTracker();
      perMimeTypes.set(mimeType, tracker);
    }
    return tracker;
  }
  for (const [target, map] of getEncodedNamesStateMap(program).entries()) {
    const scope = getScope(target);
    const memberValues = new Set(scope?.members.values());
    if (scope === void 0 || // Workaround: exclude members that aren't actually in the scope. This can happen when types of
    // properties, enum members, or union variants are cloned for one reason or another, but are not
    // actually attached to the parent type. This should probably be fixed in cloning logic (mutator
    // implementation) instead, but for now this workaround solves some problems with false positives
    // in duplication tracking here.
    !memberValues.has(target)) {
      return;
    }
    for (const [mimeType, name] of map.entries()) {
      const duplicateTracker = getOrCreateDuplicateTracker(scope.parent, mimeType);
      duplicateTracker.track(name, target);
      if (scope.members.has(name)) {
        reportDiagnostic(program, {
          code: "encoded-name-conflict",
          format: { name, mimeType },
          target
        });
      }
    }
  }
  for (const perMimeTypes of duplicateTrackers.values()) {
    for (const [mimeType, tracker] of perMimeTypes.entries()) {
      for (const [duplicateName, items] of tracker.entries()) {
        for (const item of items) {
          reportDiagnostic(program, {
            code: "encoded-name-conflict",
            messageId: "duplicate",
            format: { name: duplicateName, mimeType },
            target: item
          });
        }
      }
    }
  }
}
function getScope(type) {
  switch (type.kind) {
    case "ModelProperty":
      return type.model && { parent: type.model, members: type.model.properties };
    case "EnumMember":
      return { parent: type.enum, members: type.enum.members };
    case "UnionVariant":
      return { parent: type.union, members: type.union.variants };
    default:
      return void 0;
  }
}

// node_modules/@typespec/compiler/dist/src/lib/examples.js
init_define_process_env();

// node_modules/temporal-polyfill/index.js
init_define_process_env();

// node_modules/temporal-polyfill/chunks/root.js
init_define_process_env();
var NativeTemporal = globalThis.Temporal;

// node_modules/temporal-polyfill/chunks/classApi-basic.js
init_define_process_env();

// node_modules/temporal-polyfill/chunks/internal.js
init_define_process_env();

// node_modules/temporal-utils/dist/protected.js
init_define_process_env();

// node_modules/temporal-utils/dist/utils.js
init_define_process_env();

// node_modules/temporal-utils/dist/errorMessages.js
init_define_process_env();
var expectedPositive = (entityName, num) => `Non-positive ${entityName}: ${num}`;
var expectedFinite = (entityName, num) => `Non-finite ${entityName}: ${num}`;
var forbiddenBigIntToNumber = (entityName) => `Cannot convert bigint to ${entityName}`;
var invalidObject = "Invalid object";
var numberOutOfRange = (entityName, val, min, max) => invalidEntity(entityName, val) + `; must be between ${min}-${max}`;
var invalidEntity = (fieldName, val) => `Invalid ${fieldName}: ${val}`;

// node_modules/temporal-utils/dist/utils.js
var nanoInMicro = 1e3;
var nanoInMilli = 1e6;
var nanoInSec = 1e9;
var nanoInMinute = 6e10;
var nanoInHour = 36e11;
function normalizeOptions(options) {
  if (options === void 0) {
    return /* @__PURE__ */ Object.create(null);
  }
  return requireObjectLike(options);
}
function toFiniteNumber(arg, entityName = "number") {
  if (typeof arg === "bigint") {
    throw new TypeError(forbiddenBigIntToNumber(entityName));
  }
  arg = Number(arg);
  if (!Number.isFinite(arg)) {
    throw new RangeError(expectedFinite(entityName, arg));
  }
  return arg;
}
function toIntegerWithTrunc(arg, entityName) {
  return Math.trunc(toFiniteNumber(arg, entityName)) || 0;
}
function toPositiveIntegerWithTruncation(arg, entityName) {
  return requireNumberIsPositive(toIntegerWithTrunc(arg, entityName), entityName);
}
function requireNumberIsPositive(num, entityName = "number") {
  if (num <= 0) {
    throw new RangeError(expectedPositive(entityName, num));
  }
  return num;
}
function constrainToRange(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function isObjectLike(arg) {
  return arg !== null && (typeof arg === "object" || typeof arg === "function");
}
function requireObjectLike(arg) {
  if (!isObjectLike(arg)) {
    throw new TypeError(invalidObject);
  }
  return arg;
}

// node_modules/temporal-utils/dist/protected-error-messages.js
init_define_process_env();

// node_modules/temporal-polyfill/chunks/internal.js
var invalidEntity2 = invalidEntity;
var missingField = (fieldName) => `Missing ${fieldName}`;
var noValidFields = (validFields) => "No valid fields: " + validFields.join();
var invalidBag = "Invalid bag";
var invalidChoice = (fieldName, val, choiceMap) => invalidEntity(fieldName, val) + "; must be " + Object.keys(choiceMap).join();
var forbiddenValueOf = "Cannot use valueOf";
var invalidCallingContext = "Invalid calling context";
var missingYear = (allowEra) => "Missing year" + (allowEra ? "/era/eraYear" : "");
var invalidLeapMonth = "Invalid leap month";
var invalidCalendar = (calendarId) => invalidEntity("Calendar", calendarId);
var exoticCalendarRequired = (calendarId, remedy) => `Unknown calendar ${calendarId}; might need ${remedy}`;
var invalidTimeZone = (calendarId) => invalidEntity("TimeZone", calendarId);
var outOfBoundsDate = "Out-of-bounds date";
var failedParse = (s) => `Cannot parse: ${s}`;
var invalidSubstring = (substring) => `Invalid substring: ${substring}`;
var constrainToRange2 = constrainToRange;
var isObjectLike2 = isObjectLike;
function throwRangeError(message) {
  throw new RangeError(message);
}
function throwTypeError(message) {
  throw new TypeError(message);
}
function clampProp(props, propName, min, max, overflow) {
  return clampEntity(propName, ((props2, propName2) => {
    const propVal = props2[propName2];
    return void 0 === propVal && throwTypeError(missingField(propName2)), propVal;
  })(props, propName), min, max, overflow);
}
function clampEntity(entityName, num, min, max, overflow, choices) {
  const clamped = constrainToRange2(num, min, max);
  return overflow && num !== clamped && throwRangeError(((entityName2, val, min2, max2, choices2) => choices2 ? numberOutOfRange(entityName2, choices2[val], choices2[min2], choices2[max2]) : numberOutOfRange(entityName2, val, min2, max2))(entityName, num, min, max, choices)), clamped;
}
function memoize(generator, MapClass = Map) {
  const map = new MapClass();
  return (key, ...otherArgs) => {
    if (map.has(key)) {
      return map.get(key);
    }
    const val = generator(key, ...otherArgs);
    return map.set(key, val), val;
  };
}
var createNameDescriptors = (name) => createPropDescriptors({
  name
}, 1);
var createPropDescriptors = (propVals, readonly) => mapProps((value) => ({
  value,
  configurable: 1,
  writable: !readonly
}), propVals);
var createStringTagDescriptors = (value) => ({
  [Symbol.toStringTag]: {
    value,
    configurable: 1
  }
});
function mapProps(transformer, props) {
  const res = {};
  for (const propName in props) {
    res[propName] = transformer(props[propName], propName);
  }
  return res;
}
function zipPropsConst(propNames, propVal) {
  const res = {};
  for (const propName of propNames) {
    res[propName] = propVal;
  }
  return res;
}
function createPropGetters(propNames) {
  const getters = {};
  for (const propName of propNames) {
    getters[propName] = (slots) => slots[propName];
  }
  return getters;
}
function pluckProps(propNames, props, dest = /* @__PURE__ */ Object.create(null)) {
  for (const propName of propNames) {
    dest[propName] = props[propName];
  }
  return dest;
}
function allPropsEqual(propNames, props0, props1) {
  for (const propName of propNames) {
    if (props0[propName] !== props1[propName]) {
      return 0;
    }
  }
  return 1;
}
function zeroOutProps(propNames, clearUntilI, props) {
  const copy = {
    ...props
  };
  for (let i = 0; i < clearUntilI; i++) {
    copy[propNames[i]] = 0;
  }
  return copy;
}
function bindArgs(f, ...boundArgs) {
  return (...dynamicArgs) => f(...boundArgs, ...dynamicArgs);
}
function noop() {
}
function capitalize2(s) {
  return s[0].toUpperCase() + s.substring(1);
}
function sortStrings(...strss) {
  return [].concat(...strss).sort();
}
function createRegExp(meat) {
  return new RegExp(`^${meat}$`, "i");
}
function parseSubsecNano(fracStr) {
  return parseInt(fracStr.padEnd(9, "0"));
}
function parseSign(s) {
  return s && "+" !== s ? -1 : 1;
}
function parseInt0(s) {
  return void 0 === s ? 0 : parseInt(s);
}
function padNumber(digits, num) {
  return String(num).padStart(digits, "0");
}
var padNumber2 = /* @__PURE__ */ bindArgs(padNumber, 2);
function compareNumbers(a, b) {
  return Math.sign(a - b);
}
function compareBigInts(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}
function divFloorBigInt(num, denom) {
  const whole = num / denom;
  return num % denom < 0n ? whole - 1n : whole;
}
function divModFloorBigInt(num, divisor) {
  const quotient = divFloorBigInt(num, divisor);
  return [quotient, num - quotient * divisor];
}
function divModFloor(num, divisor) {
  return [Math.floor(num / divisor), modFloor(num, divisor)];
}
function modFloor(num, divisor) {
  return (num % divisor + divisor) % divisor;
}
function divTrunc(num, divisor) {
  return Math.trunc(num / divisor) || 0;
}
function modTrunc(num, divisor) {
  return num % divisor || 0;
}
function fabricateNearHalfFraction(halfCompare, sign = 1) {
  return sign * (0.5 + halfCompare / 5);
}
function hasHalf(num) {
  return 0.5 === Math.abs(num % 1);
}
var isoCalendarId = "iso8601";
var gregoryCalendarId = "gregory";
var gregoryEraOrigins = {
  "bce": -1,
  "ce": 0
};
function normalizeEraName(era) {
  const normalized = era.normalize("NFD").toLowerCase().replace(/[^a-z0-9]/g, "");
  return "bc" === normalized || "b" === normalized ? "bce" : "ad" === normalized || "a" === normalized ? "ce" : normalized;
}
var isoCalendarImpl = void 0;
var gregoryCalendarImpl = 0;
function getCalendarSlotId(calendar) {
  return calendar === isoCalendarImpl ? "iso8601" : 0 === calendar ? "gregory" : calendar.id;
}
var monthCodeRegExp = /^M(\d{2})(L?)$/;
function parseMonthCode(monthCode) {
  const m = monthCodeRegExp.exec(monthCode);
  return m || throwRangeError(((monthCode2) => `Invalid monthCode: ${monthCode2}`)(monthCode)), [parseInt(m[1]), Boolean(m[2])];
}
function formatMonthCode(monthCodeNumber, isLeapMonth) {
  return "M" + padNumber2(monthCodeNumber) + (isLeapMonth ? "L" : "");
}
function monthCodeNumberToMonth(monthCodeNumber, isLeapMonth, leapMonth) {
  return monthCodeNumber + (isLeapMonth || leapMonth && monthCodeNumber >= leapMonth ? 1 : 0);
}
var unitNameMap = {
  nanosecond: 0,
  microsecond: 1,
  millisecond: 2,
  second: 3,
  minute: 4,
  hour: 5,
  day: 6,
  week: 7,
  month: 8,
  year: 9
};
var unitNamesAsc = /* @__PURE__ */ Object.keys(unitNameMap);
var nanoInMicro2 = nanoInMicro;
var nanoInMilli2 = nanoInMilli;
var nanoInSec2 = nanoInSec;
var nanoInMinute2 = nanoInMinute;
var nanoInHour2 = nanoInHour;
var nanoInUtcDay = 864e11;
var unitNanoMap = [1, nanoInMicro2, nanoInMilli2, nanoInSec2, nanoInMinute2, nanoInHour2, nanoInUtcDay];
var bigNanoInMicro = /* @__PURE__ */ BigInt(nanoInMicro2);
var bigNanoInMilli = /* @__PURE__ */ BigInt(nanoInMilli2);
var bigNanoInSec = /* @__PURE__ */ BigInt(nanoInSec2);
var bigNanoInMinute = /* @__PURE__ */ BigInt(nanoInMinute2);
var bigNanoInHour = /* @__PURE__ */ BigInt(nanoInHour2);
var bigNanoInUtcDay = /* @__PURE__ */ BigInt(nanoInUtcDay);
function divideBigNanoToExactNumber(bigNano, divisorNano) {
  const days = Number(bigNano / bigNanoInUtcDay);
  const timeNano = Number(bigNano % bigNanoInUtcDay);
  return days * (nanoInUtcDay / divisorNano) + (Math.trunc(timeNano / divisorNano) + timeNano % divisorNano / divisorNano);
}
var timeFieldNamesAsc = /* @__PURE__ */ unitNamesAsc.slice(0, 6);
var timeGetters = /* @__PURE__ */ createPropGetters(timeFieldNamesAsc);
var yearFieldNamesAsc = ["year"];
var dayFieldNamesAsc = ["day"];
var calendarDateFieldNamesAsc = ["day", "month", "year"];
var offsetFieldNames = ["offset"];
var timeZoneFieldNames = ["timeZone"];
var eraYearFieldNames = ["era", "eraYear"];
var allYearFieldNames = ["era", "eraYear", "year"];
var monthFieldNames = ["month", "monthCode"];
var monthDayFieldNames = ["day", "month", "monthCode"];
var timeFieldNamesAlpha = /* @__PURE__ */ sortStrings(timeFieldNamesAsc);
var yearFieldNamesWithEraAlpha = /* @__PURE__ */ sortStrings(eraYearFieldNames, yearFieldNamesAsc);
var yearMonthFieldNamesAlpha = /* @__PURE__ */ sortStrings(monthFieldNames, yearFieldNamesAsc);
var yearMonthFieldNamesWithEraAlpha = /* @__PURE__ */ sortStrings(eraYearFieldNames, yearMonthFieldNamesAlpha);
var yearMonthCodeFieldNamesAlpha = /* @__PURE__ */ sortStrings(["monthCode"], yearFieldNamesAsc);
var yearMonthCodeFieldNamesWithEraAlpha = /* @__PURE__ */ sortStrings(eraYearFieldNames, yearMonthCodeFieldNamesAlpha);
var monthCodeDayFieldNamesAlpha = /* @__PURE__ */ sortStrings(dayFieldNamesAsc, ["monthCode"]);
var dateFieldNamesAlpha = /* @__PURE__ */ sortStrings(dayFieldNamesAsc, yearMonthFieldNamesAlpha);
var dateFieldNamesWithEraAlpha = /* @__PURE__ */ sortStrings(dayFieldNamesAsc, eraYearFieldNames, yearMonthFieldNamesAlpha);
var dateTimeFieldNamesAlpha = /* @__PURE__ */ sortStrings(dateFieldNamesAlpha, timeFieldNamesAsc);
var dateTimeFieldNamesWithEraAlpha = /* @__PURE__ */ sortStrings(dateFieldNamesWithEraAlpha, timeFieldNamesAsc);
var dateTimeAndOffsetFieldNamesAlpha = /* @__PURE__ */ sortStrings(dateFieldNamesAlpha, timeFieldNamesAsc, offsetFieldNames);
var dateTimeAndOffsetFieldNamesWithEraAlpha = /* @__PURE__ */ sortStrings(dateFieldNamesWithEraAlpha, timeFieldNamesAsc, offsetFieldNames);
var dateTimeAndZoneFieldNamesAlpha = /* @__PURE__ */ sortStrings(dateFieldNamesAlpha, timeFieldNamesAsc, offsetFieldNames, timeZoneFieldNames);
var dateTimeAndZoneFieldNamesWithEraAlpha = /* @__PURE__ */ sortStrings(dateFieldNamesWithEraAlpha, timeFieldNamesAsc, offsetFieldNames, timeZoneFieldNames);
var yearMonthCodeDayFieldNamesAlpha = /* @__PURE__ */ sortStrings(dayFieldNamesAsc, yearMonthCodeFieldNamesAlpha);
var yearMonthCodeDayFieldNamesWithEraAlpha = /* @__PURE__ */ sortStrings(dayFieldNamesAsc, eraYearFieldNames, yearMonthCodeFieldNamesAlpha);
var timeFieldDefaults = /* @__PURE__ */ zipPropsConst(timeFieldNamesAsc, 0);
function validateTimeFields(timeFields) {
  return constrainTimeFields(timeFields, 1), timeFields;
}
var maxValues = {
  hour: 23,
  minute: 59,
  second: 59
};
function constrainTimeFields(timeFields, overflow) {
  const constrainedFields = {};
  for (const fieldName of timeFieldNamesAsc) {
    constrainedFields[fieldName] = clampEntity(fieldName, timeFields[fieldName], 0, maxValues[fieldName] || 999, overflow);
  }
  return constrainedFields;
}
function timeFieldsToNano(timeFields) {
  return timeFieldsToSec(timeFields) * nanoInSec2 + timeFieldsToSubsecNano(timeFields);
}
function timeFieldsToMilli(timeFields) {
  return 1e3 * timeFieldsToSec(timeFields) + timeFields.millisecond;
}
function timeFieldsToSec(timeFields) {
  return 3600 * timeFields.hour + 60 * timeFields.minute + timeFields.second;
}
function timeFieldsToSubsecNano(timeFields) {
  return timeFields.millisecond * nanoInMilli2 + timeFields.microsecond * nanoInMicro2 + timeFields.nanosecond;
}
function nanoToTimeAndDay(nano) {
  const [dayDelta, timeNano] = divModFloor(nano, nanoInUtcDay);
  return [nanoToTimeFields(timeNano), dayDelta];
}
function nanoToTimeFields(timeNano) {
  const [timeMilli, nanoAfterMilli] = divModFloor(timeNano, nanoInMilli2);
  const [microsecond, nanosecond] = divModFloor(nanoAfterMilli, nanoInMicro2);
  return milliToTimeFields(timeMilli, microsecond, nanosecond);
}
function milliToTimeFields(timeMilli, microsecond = 0, nanosecond = 0) {
  const [hour, milliAfterHour] = divModFloor(timeMilli, 36e5);
  const [minute, milliAfterMinute] = divModFloor(milliAfterHour, 6e4);
  const [second, millisecond] = divModFloor(milliAfterMinute, 1e3);
  return {
    hour,
    minute,
    second,
    millisecond,
    microsecond,
    nanosecond
  };
}
function epochNanoToSecMod(epochNano) {
  const [epochSec, nano] = divModFloorBigInt(epochNano, bigNanoInSec);
  return [Number(epochSec), Number(nano)];
}
function epochNanoToMilli(epochNano) {
  return Number(divFloorBigInt(epochNano, bigNanoInMilli));
}
function isoDateTimeToEpochNano(isoDateTime) {
  return isoDateToEpochNano(isoDateTime) + BigInt(timeFieldsToNano(isoDateTime));
}
function isoDateTimeToEpochMilli(isoDateTime) {
  return isoDateToEpochMilli(isoDateTime) + timeFieldsToMilli(isoDateTime);
}
function isoDateToEpochNano(isoDate) {
  return BigInt(isoDateToEpochDays(isoDate)) * bigNanoInUtcDay;
}
function isoDateToEpochMilli(isoDate) {
  return 864e5 * isoDateToEpochDays(isoDate);
}
function isoDateToEpochDays(isoDate) {
  return isoPartsToEpochDays(isoDate.year, isoDate.month, isoDate.day);
}
function isoPartsToEpochDays(isoYear, isoMonth = 1, isoDay = 1) {
  const monthIndex = isoMonth - 1;
  return isoYear += Math.floor(monthIndex / 12), isoMonth = modFloor(monthIndex, 12), Date.UTC(isoYear % 400 - 400, isoMonth, 0) / 864e5 + 146097 * (divTrunc(isoYear, 400) + 1) + isoDay;
}
function epochNanoToIsoDateTime(epochNano) {
  const [epochDays, nanoAfterDay] = divModFloorBigInt(epochNano, bigNanoInUtcDay);
  return {
    ...epochDaysToIsoDate(Number(epochDays)),
    ...nanoToTimeFields(Number(nanoAfterDay))
  };
}
function epochDaysToIsoDate(epochDays) {
  const legacyDate = new Date(864e5 * modFloor(epochDays, 146097));
  return {
    year: legacyDate.getUTCFullYear() + 400 * Math.floor(epochDays / 146097),
    month: legacyDate.getUTCMonth() + 1,
    day: legacyDate.getUTCDate()
  };
}
var isoEpochFirstLeapYear = 1972;
function computeIsoMonthCodeParts(month) {
  return [month, 0];
}
function computeIsoYearMonthFieldsForMonthDay(monthCodeNumber, isLeapMonth) {
  if (!isLeapMonth) {
    return {
      year: 1972,
      month: monthCodeNumber
    };
  }
}
function computeIsoFieldsFromParts(year, month, day) {
  return {
    year,
    month,
    day
  };
}
function computeIsoDaysInMonth(year, month) {
  switch (month) {
    case 2:
      return computeIsoInLeapYear(year) ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
  }
  return 31;
}
function computeIsoDaysInYear(year) {
  return computeIsoInLeapYear(year) ? 366 : 365;
}
function computeIsoInLeapYear(year) {
  return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
}
function addIsoMonths(year, month, monthDelta) {
  return year += divTrunc(monthDelta, 12), (month += modTrunc(monthDelta, 12)) < 1 ? (year--, month += 12) : month > 12 && (year++, month -= 12), {
    year,
    month
  };
}
function diffIsoMonthSlots(year0, month0, year1, month1) {
  return 12 * (year1 - year0) + month1 - month0;
}
function computeIsoDayOfWeek(isoDate) {
  return modFloor(isoPartsToEpochDays(isoDate.year, isoDate.month, isoDate.day) + 4, 7) || 7;
}
function computeIsoDayOfYear(isoDate) {
  return isoPartsToEpochDays(isoDate.year, isoDate.month, isoDate.day) - isoPartsToEpochDays(isoDate.year) + 1;
}
function computeIsoWeekFields(isoDate) {
  let yearOfWeek = isoDate.year;
  let weekOfYear = Math.floor((computeIsoDayOfYear(isoDate) - computeIsoDayOfWeek(isoDate) + 10) / 7);
  let weeksInYear = computeIsoWeeksInYear(yearOfWeek);
  return weekOfYear < 1 ? weekOfYear = weeksInYear = computeIsoWeeksInYear(--yearOfWeek) : weekOfYear > weeksInYear && (weekOfYear = 1, weeksInYear = computeIsoWeeksInYear(++yearOfWeek)), {
    weekOfYear,
    yearOfWeek,
    De: weeksInYear
  };
}
function computeIsoWeeksInYear(year) {
  const y0DayOfWeek = computeIsoDayOfWeek({
    year,
    month: 1,
    day: 1
  });
  return 4 === y0DayOfWeek || 3 === y0DayOfWeek && computeIsoInLeapYear(year) ? 53 : 52;
}
function computeGregoryEraFields({ year }) {
  return year < 1 ? {
    era: "bce",
    eraYear: 1 - year
  } : {
    era: "ce",
    eraYear: year
  };
}
function validateIsoDateTimeFields(isoDateTime) {
  return validateIsoDateFields(isoDateTime), validateTimeFields(isoDateTime);
}
function validateIsoDateFields(isoInternals) {
  return constrainIsoDateFields(isoInternals, 1), isoInternals;
}
function isIsoDateFieldsValid(isoDate) {
  return allPropsEqual(calendarDateFieldNamesAsc, isoDate, constrainIsoDateFields(isoDate));
}
function constrainIsoDateFields(isoDate, overflow) {
  const { year } = isoDate;
  const month = clampProp(isoDate, "month", 1, 12, overflow);
  return {
    year,
    month,
    day: clampProp(isoDate, "day", 1, computeIsoDaysInMonth(year, month), overflow)
  };
}
function computeCalendarDateFields(calendar, isoDate) {
  return calendar ? calendar.de(isoDate) : isoDate;
}
function computeCalendarMonthCodeParts(calendar, year, month) {
  return calendar ? calendar.N(year, month) : computeIsoMonthCodeParts(month);
}
function computeCalendarEraFields(calendar, isoDate) {
  return 0 === calendar ? computeGregoryEraFields(isoDate) : calendar && calendar.h?.(isoDate) || {};
}
function computeCalendarIsoFieldsFromParts(calendar, year, month, day) {
  return calendar ? calendar.fe(year, month, day) : computeIsoFieldsFromParts(year, month, day);
}
function computeCalendarMonthsInYearForYear(calendar, year) {
  return calendar ? calendar.j(year) : 12;
}
function computeCalendarDaysInMonthForYearMonth(calendar, year, month) {
  return calendar ? calendar.o(year, month) : computeIsoDaysInMonth(year, month);
}
function computeCalendarMonthCode(calendar, isoDate) {
  const { year, month } = computeCalendarDateFields(calendar, isoDate);
  const [monthCodeNumber, isLeapMonth] = computeCalendarMonthCodeParts(calendar, year, month);
  return formatMonthCode(monthCodeNumber, isLeapMonth);
}
function computeCalendarInLeapYear(calendar, isoDate) {
  const { year } = computeCalendarDateFields(calendar, isoDate);
  return calendar ? calendar.q(year) : computeIsoInLeapYear(year);
}
function computeCalendarMonthsInYear(calendar, isoDate) {
  const { year } = computeCalendarDateFields(calendar, isoDate);
  return computeCalendarMonthsInYearForYear(calendar, year);
}
function computeCalendarDaysInMonth(calendar, isoDate) {
  const { year, month } = computeCalendarDateFields(calendar, isoDate);
  return computeCalendarDaysInMonthForYearMonth(calendar, year, month);
}
function computeCalendarDaysInYear(calendar, isoDate) {
  const { year } = computeCalendarDateFields(calendar, isoDate);
  return calendar ? calendar.i(year) : computeIsoDaysInYear(year);
}
function computeCalendarDayOfYear(calendar, isoDate) {
  if (!calendar) {
    return computeIsoDayOfYear(isoDate);
  }
  const { year } = computeCalendarDateFields(calendar, isoDate);
  const yearStartIsoDate = computeCalendarIsoFieldsFromParts(calendar, year, 1, 1);
  return isoDateToEpochDays(isoDate) - isoDateToEpochDays(yearStartIsoDate) + 1;
}
function computeCalendarWeekOfYear(calendar, isoDate) {
  return calendar === isoCalendarImpl ? computeIsoWeekFields(isoDate).weekOfYear : void 0;
}
function computeCalendarYearOfWeek(calendar, isoDate) {
  return calendar === isoCalendarImpl ? computeIsoWeekFields(isoDate).yearOfWeek : void 0;
}
var durationFieldNamesAsc = /* @__PURE__ */ unitNamesAsc.map((unitName) => unitName + "s");
var durationGetters = /* @__PURE__ */ createPropGetters(durationFieldNamesAsc);
var durationFieldNamesAlpha = /* @__PURE__ */ sortStrings(durationFieldNamesAsc);
var durationTimeFieldNamesAsc = /* @__PURE__ */ durationFieldNamesAsc.slice(0, 6);
var durationDateFieldNamesAsc = /* @__PURE__ */ durationFieldNamesAsc.slice(6);
var durationCalendarFieldNamesAsc = /* @__PURE__ */ durationDateFieldNamesAsc.slice(1);
var durationFieldDefaults = /* @__PURE__ */ zipPropsConst(durationFieldNamesAsc, 0);
var durationTimeFieldDefaults = /* @__PURE__ */ zipPropsConst(durationTimeFieldNamesAsc, 0);
var clearDurationFields = /* @__PURE__ */ bindArgs(zeroOutProps, durationFieldNamesAsc);
function requirePropDefined(optionName, optionVal) {
  return null == optionVal && throwRangeError(missingField(optionName)), optionVal;
}
var requireString = /* @__PURE__ */ bindArgs(requireType, "string");
function requireType(typeName, arg, entityName = typeName) {
  return typeof arg !== typeName && throwTypeError(invalidEntity2(entityName, arg)), arg;
}
function requireNumberIsInteger(num, entityName = "number") {
  return Number.isInteger(num) || throwRangeError(((entityName2, num2) => `Non-integer ${entityName2}: ${num2}`)(entityName, num)), num || 0;
}
function toString(arg) {
  return "symbol" == typeof arg && throwTypeError("Cannot convert Symbol to string"), String(arg);
}
function toPrimitiveWithStringHint(arg) {
  if (!isObjectLike(arg)) {
    return arg;
  }
  const exoticToPrimitive = arg[Symbol.toPrimitive];
  if (null != exoticToPrimitive) {
    "function" != typeof exoticToPrimitive && throwTypeError();
    const primitive = Reflect.apply(exoticToPrimitive, arg, ["string"]);
    return isObjectLike(primitive) && throwTypeError(), primitive;
  }
  return Date.prototype[Symbol.toPrimitive].call(arg, "string");
}
function toBigInt(bi) {
  return "boolean" == typeof bi ? BigInt(bi ? 1 : 0) : "string" == typeof bi ? BigInt(bi) : ("bigint" != typeof bi && throwTypeError(`Invalid bigint: ${bi}`), bi);
}
function toStrictInteger(arg, entityName) {
  return requireNumberIsInteger(toFiniteNumber(arg, entityName), entityName);
}
var smallestUnitStr = "smallestUnit";
var overflowMap = {
  constrain: 0,
  reject: 1
};
var epochDisambigMap = {
  compatible: 0,
  reject: 1,
  earlier: 2,
  later: 3
};
var offsetDisambigMap = {
  reject: 0,
  use: 1,
  prefer: 2,
  ignore: 3
};
var calendarDisplayMap = {
  auto: 0,
  never: 1,
  critical: 2,
  always: 3
};
var timeZoneDisplayMap = {
  auto: 0,
  never: 1,
  critical: 2
};
var offsetDisplayMap = {
  auto: 0,
  never: 1
};
var roundingModeMap = {
  floor: 0,
  halfFloor: 1,
  ceil: 2,
  halfCeil: 3,
  trunc: 4,
  halfTrunc: 5,
  expand: 6,
  halfExpand: 7,
  halfEven: 8
};
var roundingModeFuncs = [Math.floor, (num) => hasHalf(num) ? Math.floor(num) : Math.round(num), Math.ceil, (num) => hasHalf(num) ? Math.ceil(num) : Math.round(num), Math.trunc, (num) => hasHalf(num) ? Math.trunc(num) || 0 : Math.round(num), (num) => num < 0 ? Math.floor(num) : Math.ceil(num), (num) => Math.sign(num) * Math.round(Math.abs(num)) || 0, (num) => hasHalf(num) ? (num = Math.trunc(num) || 0) + num % 2 : Math.round(num)];
var directionMap = {
  previous: -1,
  next: 1
};
function coerceRoundingIncInteger(options) {
  const roundingInc = options.roundingIncrement;
  return void 0 === roundingInc ? 1 : toIntegerWithTrunc(roundingInc, "roundingIncrement");
}
function coerceFractionalSecondDigits(options) {
  let subsecDigits = options.fractionalSecondDigits;
  if (void 0 !== subsecDigits) {
    if ("number" != typeof subsecDigits) {
      if ("auto" === toString(subsecDigits)) {
        return;
      }
      throwRangeError(invalidEntity2("fractionalSecondDigits", subsecDigits));
    }
    subsecDigits = clampEntity("fractionalSecondDigits", Math.floor(subsecDigits), 0, 9, 1);
  }
  return subsecDigits;
}
function coerceUnitOption(optionName, options, minUnit = 0, ensureDefined) {
  let unitStr = options[optionName];
  if (void 0 === unitStr) {
    return ensureDefined ? minUnit : void 0;
  }
  if (unitStr = toString(unitStr), "auto" === unitStr) {
    return ensureDefined ? minUnit : null;
  }
  let unit = unitNameMap[unitStr];
  return void 0 === unit && (unit = durationFieldNamesAsc.indexOf(unitStr)), unit < 0 && throwRangeError(invalidChoice(optionName, unitStr, unitNameMap)), unit;
}
function coerceChoiceOption(optionName, enumNameMap, options, defaultChoice = 0) {
  const enumArg = options[optionName];
  if (void 0 === enumArg) {
    return defaultChoice;
  }
  const enumStr = toString(enumArg);
  const enumNum = enumNameMap[enumStr];
  return void 0 === enumNum && throwRangeError(invalidChoice(optionName, enumStr, enumNameMap)), enumNum;
}
var coerceSmallestUnit = /* @__PURE__ */ bindArgs(coerceUnitOption, smallestUnitStr);
var coerceLargestUnit = /* @__PURE__ */ bindArgs(coerceUnitOption, "largestUnit");
var coerceTotalUnit = /* @__PURE__ */ bindArgs(coerceUnitOption, "unit");
var coerceOverflow = /* @__PURE__ */ bindArgs(coerceChoiceOption, "overflow", overflowMap);
var coerceEpochDisambig = /* @__PURE__ */ bindArgs(coerceChoiceOption, "disambiguation", epochDisambigMap);
var coerceOffsetDisambig = /* @__PURE__ */ bindArgs(coerceChoiceOption, "offset", offsetDisambigMap);
var coerceCalendarDisplay = /* @__PURE__ */ bindArgs(coerceChoiceOption, "calendarName", calendarDisplayMap);
var coerceTimeZoneDisplay = /* @__PURE__ */ bindArgs(coerceChoiceOption, "timeZoneName", timeZoneDisplayMap);
var coerceOffsetDisplay = /* @__PURE__ */ bindArgs(coerceChoiceOption, "offset", offsetDisplayMap);
var coerceRoundingMode = /* @__PURE__ */ bindArgs(coerceChoiceOption, "roundingMode", roundingModeMap);
var coerceDirection = /* @__PURE__ */ bindArgs(coerceChoiceOption, "direction", directionMap);
function normalizeOptionsOrString(options, optionName) {
  return "string" == typeof options ? ((optionName2, optionVal) => {
    const res = /* @__PURE__ */ Object.create(null);
    return res[optionName2] = optionVal, res;
  })(optionName, options) : requireObjectLike(options);
}
function validateRoundingInc(roundingInc, smallestUnit, allowManyLargeUnits, solarMode) {
  const upUnitNano = solarMode ? nanoInUtcDay : unitNanoMap[smallestUnit + 1];
  if (upUnitNano) {
    const unitNano = unitNanoMap[smallestUnit];
    upUnitNano % ((roundingInc = clampEntity("roundingIncrement", roundingInc, 1, upUnitNano / unitNano - (solarMode ? 0 : 1), 1)) * unitNano) && throwRangeError(invalidEntity2("roundingIncrement", roundingInc));
  } else {
    roundingInc = clampEntity("roundingIncrement", roundingInc, 1, allowManyLargeUnits ? 10 ** 9 : 1, 1);
  }
  return roundingInc;
}
function validateUnitRange(optionName, unit, minUnit, maxUnit) {
  return null != unit && clampEntity(optionName, unit, minUnit, maxUnit, 1, unitNamesAsc), unit;
}
function checkLargestSmallestUnit(largestUnit, smallestUnit) {
  smallestUnit > largestUnit && throwRangeError("smallestUnit > largestUnit");
}
function refineDiffOptions(roundingModeInvert, options, defaultLargestUnit, maxUnit = 9, minUnit = 0, defaultRoundingMode = 4) {
  options = normalizeOptions(options);
  let largestUnit = coerceLargestUnit(options, minUnit);
  let roundingInc = coerceRoundingIncInteger(options);
  let roundingMode = coerceRoundingMode(options, defaultRoundingMode);
  let smallestUnit = coerceSmallestUnit(options, minUnit, 1);
  return largestUnit = validateUnitRange("largestUnit", largestUnit, minUnit, maxUnit), smallestUnit = validateUnitRange(smallestUnitStr, smallestUnit, minUnit, maxUnit), null == largestUnit ? largestUnit = Math.max(defaultLargestUnit, smallestUnit) : checkLargestSmallestUnit(largestUnit, smallestUnit), roundingInc = validateRoundingInc(roundingInc, smallestUnit, 1), roundingModeInvert && (roundingMode = ((roundingMode2) => roundingMode2 < 4 ? (roundingMode2 + 2) % 4 : roundingMode2)(roundingMode)), [largestUnit, smallestUnit, roundingInc, roundingMode];
}
function refineRoundingOptions(options, maxUnit = 6, solarMode) {
  let roundingInc = coerceRoundingIncInteger(options = normalizeOptionsOrString(options, smallestUnitStr));
  const roundingMode = coerceRoundingMode(options, 7);
  let smallestUnit = coerceSmallestUnit(options);
  return smallestUnit = requirePropDefined(smallestUnitStr, smallestUnit), smallestUnit = validateUnitRange(smallestUnitStr, smallestUnit, 0, maxUnit), roundingInc = validateRoundingInc(roundingInc, smallestUnit, void 0, solarMode), [smallestUnit, roundingInc, roundingMode];
}
function combineDateAndTime(isoDate, time) {
  return pluckProps(calendarDateFieldNamesAsc, isoDate, pluckProps(timeFieldNamesAsc, time));
}
var epochNanoMax = /* @__PURE__ */ BigInt(1e8) * bigNanoInUtcDay;
var epochNanoMin = /* @__PURE__ */ BigInt(-1e8) * bigNanoInUtcDay;
var plainDateEpochNanoMin = epochNanoMin - bigNanoInUtcDay;
var isoYearMonthIndexMin = -3261848;
function checkIsoYearMonthInBounds(isoDate) {
  const isoYearMonthIndex = 12 * isoDate.year + isoDate.month;
  return (isoYearMonthIndex < isoYearMonthIndexMin || isoYearMonthIndex > 3309129) && throwRangeError(outOfBoundsDate), isoDate;
}
function checkIsoDateInBounds(isoDate, allowPlainDateLowerEdge = 1) {
  const epochNano = isoDateToEpochNano(isoDate);
  return (epochNano < (allowPlainDateLowerEdge ? plainDateEpochNanoMin : epochNanoMin) || epochNano > epochNanoMax) && throwRangeError(outOfBoundsDate), isoDate;
}
function checkIsoDateTimeInBounds(isoDateTime) {
  return checkIsoDateTimeEpochNanoInBounds(isoDateTimeToEpochNano(isoDateTime)), isoDateTime;
}
function checkIsoDateTimeEpochNanoInBounds(epochNano) {
  return (epochNano <= plainDateEpochNanoMin || epochNano >= epochNanoMax + bigNanoInUtcDay) && throwRangeError(outOfBoundsDate), epochNano;
}
function checkEpochNanoInBounds(epochNano) {
  return (epochNano < epochNanoMin || epochNano > epochNanoMax) && throwRangeError(outOfBoundsDate), epochNano;
}
function isoDateTimeAndOffsetToEpochNano(isoDateTime, offsetNano) {
  return checkEpochNanoInBounds(isoDateToEpochNano(isoDateTime) + BigInt(timeFieldsToNano(isoDateTime) - offsetNano));
}
function roundNumberToInc(num, roundingInc, roundingMode) {
  return roundWithMode(num / roundingInc, roundingMode) * roundingInc;
}
function roundWithMode(num, roundingMode) {
  return roundingModeFuncs[roundingMode](num);
}
function totalRelativeUnit(wholeValue, sign, endEpochNano, moveValueToEpochNano) {
  const unitWindow = clampRelativeUnitValue(wholeValue, sign, moveValueToEpochNano, endEpochNano);
  return interpolateRelativeUnitWindow(unitWindow, Number(endEpochNano - unitWindow.I) / Number(unitWindow.O - unitWindow.I));
}
function roundRelativeUnitWindow(unitWindow, endEpochNano, roundingInc, roundingMode) {
  return roundNumberToInc(interpolateRelativeUnitWindow(unitWindow, computeEpochNanoFrac(endEpochNano, unitWindow.I, unitWindow.O)), roundingInc, roundingMode);
}
function clampRelativeUnitValue(startValue, valueDelta, moveValueToEpochNano, epochNanoProgress) {
  let unitWindow = computeRelativeUnitWindow(startValue, valueDelta, moveValueToEpochNano);
  return ((epochNanoProgress2, epochNano0, epochNano1, sign) => sign > 0 ? epochNano0 <= epochNanoProgress2 && epochNanoProgress2 <= epochNano1 : epochNano1 <= epochNanoProgress2 && epochNanoProgress2 <= epochNano0)(epochNanoProgress, unitWindow.I, unitWindow.O, Math.sign(valueDelta)) || (unitWindow = computeRelativeUnitWindow(startValue + valueDelta, valueDelta, moveValueToEpochNano)), unitWindow;
}
function computeRelativeUnitWindow(startValue, valueDelta, moveValueToEpochNano) {
  const endValue = startValue + valueDelta;
  return {
    ve: startValue,
    qe: endValue,
    I: moveValueToEpochNano(startValue),
    O: moveValueToEpochNano(endValue)
  };
}
function interpolateRelativeUnitWindow(unitWindow, fraction) {
  return unitWindow.ve + fraction * (unitWindow.qe - unitWindow.ve);
}
function computeEpochNanoFrac(epochNanoProgress, epochNano0, epochNano1) {
  const denomBig = epochNano1 - epochNano0;
  const numeratorBig = epochNanoProgress - epochNano0;
  if (!numeratorBig) {
    return 0;
  }
  const absNumerator = numeratorBig < 0n ? -numeratorBig : numeratorBig;
  const absDenom = denomBig < 0n ? -denomBig : denomBig;
  const fracSign = compareBigInts(numeratorBig, 0n) === compareBigInts(denomBig, 0n) ? 1 : -1;
  return compareBigInts(absNumerator, absDenom) <= 0 ? absNumerator === absDenom ? fracSign : fabricateNearHalfFraction(compareBigInts(2n * absNumerator, absDenom), fracSign) : Number(numeratorBig) / Number(denomBig);
}
function createEpochNanoSlots(epochNano) {
  return {
    epochNanoseconds: epochNano
  };
}
function createZonedEpochNanoSlots(epochNano, timeZone, calendar) {
  return {
    calendar,
    timeZone,
    epochNanoseconds: epochNano
  };
}
function createDateTimeSlots(isoDateTime, calendar) {
  return pluckProps(timeFieldNamesAsc, isoDateTime, createDateSlots(isoDateTime, calendar));
}
function createDateSlots(isoDate, calendar) {
  return pluckProps(calendarDateFieldNamesAsc, isoDate, {
    calendar
  });
}
function createTimeSlots(time) {
  return pluckProps(timeFieldNamesAsc, time);
}
function createDurationSlots(durationFields) {
  return pluckProps(durationFieldNamesAsc, durationFields, {
    sign: computeDurationSign(durationFields)
  });
}
function roundZonedEpochSlotsToUnit(slots, smallestUnit, roundingInc, roundingMode) {
  return createZonedEpochNanoSlots(6 === smallestUnit ? roundZonedEpochToDay(slots, roundingMode) : roundZonedEpochToTime(slots, smallestUnit, roundingInc, roundingMode), slots.timeZone, slots.calendar);
}
function computeZonedHoursInDay(slots) {
  const [epochNano0, epochNano1] = computeZonedDayEpochInterval(slots);
  return divideBigNanoToExactNumber(epochNano1 - epochNano0, nanoInHour2);
}
function computeZonedStartOfDay(slots) {
  const { timeZone, calendar } = slots;
  return createZonedEpochNanoSlots(getStartOfDayInstantFor(timeZone, combineDateAndTime(zonedEpochSlotsToIso(slots), timeFieldDefaults)), timeZone, calendar);
}
function roundRelativeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, relativeOps, isZoned) {
  if (0 === smallestUnit && 1 === roundingInc) {
    return durationFields;
  }
  const sign = computeDurationSign(durationFields) || 1;
  const nudgeFunc = isUniformUnit(smallestUnit, isZoned) ? isZoned && smallestUnit < 6 && largestUnit >= 6 ? nudgeZonedTimeDuration : nudgeDayTimeDuration : nudgeRelativeDuration;
  let [roundedDurationFields, roundedEpochNano, grewBigUnit] = nudgeFunc(sign, durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, relativeOps);
  return grewBigUnit && 7 !== smallestUnit && (roundedDurationFields = ((durationFields2, endEpochNano2, largestUnit2, smallestUnit2, sign2, relativeOps2) => {
    for (let currentUnit = smallestUnit2 + 1; currentUnit <= largestUnit2; currentUnit++) {
      if (7 === currentUnit && 7 !== largestUnit2) {
        continue;
      }
      const baseDurationFields = clearDurationFields(currentUnit, durationFields2);
      baseDurationFields[durationFieldNamesAsc[currentUnit]] += sign2;
      const thresholdCompare = compareBigInts(endEpochNano2, moveRelativeMarkerToEpochNano(relativeOps2, baseDurationFields));
      if (thresholdCompare && thresholdCompare !== sign2) {
        break;
      }
      durationFields2 = baseDurationFields;
    }
    return durationFields2;
  })(roundedDurationFields, roundedEpochNano, largestUnit, Math.max(6, smallestUnit), sign, relativeOps)), roundedDurationFields;
}
function roundDayTimeDurationByInc(durationFields, nanoInc, roundingMode) {
  const maxUnit = Math.min(getMaxDurationUnit(durationFields), 6);
  return nanoToDurationDayTimeFields(roundBigNanoToInc(durationDayTimeToBigNano(durationFields), BigInt(nanoInc), roundingMode), maxUnit);
}
function roundZonedEpochToDay(slots, roundingMode) {
  const [epochNano0, epochNano1] = computeZonedDayEpochInterval(slots);
  return roundZonedEpochToBounds(slots.epochNanoseconds, epochNano0, epochNano1, roundingMode);
}
function roundZonedEpochToTime(slots, smallestUnit, roundingInc, roundingMode) {
  if (0 === smallestUnit && 1 === roundingInc) {
    return slots.epochNanoseconds;
  }
  const isoDateTime = zonedEpochSlotsToIso(slots);
  return getMatchingInstantFor(slots.timeZone, roundDateTimeToInc(isoDateTime, computeNanoInc(smallestUnit, roundingInc), roundingMode), isoDateTime.offsetNanoseconds, 2, 0, 1);
}
function roundDateTimeToInc(isoDateTime, nanoInc, roundingMode) {
  const [roundedTimeFields, dayDelta] = roundTimeToInc(isoDateTime, nanoInc, roundingMode);
  const roundedIsoDateTime = combineDateAndTime(moveDateByDays(isoDateTime, dayDelta), roundedTimeFields);
  return checkIsoDateTimeInBounds(roundedIsoDateTime), roundedIsoDateTime;
}
function roundTimeToInc(timeFields, nanoInc, roundingMode) {
  return nanoToTimeAndDay(roundNumberToInc(timeFieldsToNano(timeFields), nanoInc, roundingMode));
}
function nudgeRelativeDuration(sign, durationFields, endEpochNano, _largestUnit, smallestUnit, roundingInc, roundingMode, relativeOps) {
  const smallestUnitFieldName = durationFieldNamesAsc[smallestUnit];
  const baseDurationFields = clearDurationFields(smallestUnit, durationFields);
  7 === smallestUnit && (durationFields = {
    ...durationFields,
    weeks: durationFields.weeks + Math.trunc(durationFields.days / 7)
  });
  const truncedVal = divTrunc(durationFields[smallestUnitFieldName], roundingInc) * roundingInc;
  const nudgeWindow = clampRelativeUnitValue(truncedVal, roundingInc * sign, (value) => (baseDurationFields[smallestUnitFieldName] = value, moveRelativeMarkerToEpochNano(relativeOps, baseDurationFields)), endEpochNano);
  const roundedVal = roundRelativeUnitWindow(nudgeWindow, endEpochNano, roundingInc, roundingMode);
  return baseDurationFields[smallestUnitFieldName] = roundedVal, [baseDurationFields, roundedVal === nudgeWindow.qe ? nudgeWindow.O : nudgeWindow.I, roundedVal !== truncedVal];
}
function nudgeZonedTimeDuration(sign, durationFields, endEpochNano, _largestUnit, smallestUnit, roundingInc, roundingMode, relativeOps) {
  const timeNano = Number(durationTimeToBigNano(durationFields));
  const nanoInc = computeNanoInc(smallestUnit, roundingInc);
  let roundedTimeNano = roundNumberToInc(timeNano, nanoInc, roundingMode);
  const dateDurationFields = {
    ...durationFields,
    ...durationTimeFieldDefaults
  };
  const dayWindow = clampRelativeUnitValue(dateDurationFields.days, sign, (days) => (dateDurationFields.days = days, moveRelativeMarkerToEpochNano(relativeOps, dateDurationFields)), endEpochNano);
  const dayEpochNano0 = dayWindow.I;
  const dayEpochNano1 = dayWindow.O;
  const beyondDayNano = roundedTimeNano - Number(dayEpochNano1 - dayEpochNano0);
  let dayDelta = 0;
  beyondDayNano && Math.sign(beyondDayNano) !== sign ? endEpochNano = dayEpochNano0 + BigInt(roundedTimeNano) : (dayDelta += sign, roundedTimeNano = roundNumberToInc(beyondDayNano, nanoInc, roundingMode), endEpochNano = dayEpochNano1 + BigInt(roundedTimeNano));
  const durationTimeFields = nanoToDurationTimeFields(roundedTimeNano);
  return [{
    ...durationFields,
    ...durationTimeFields,
    days: durationFields.days + dayDelta
  }, endEpochNano, Boolean(dayDelta)];
}
function nudgeDayTimeDuration(sign, durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode) {
  const bigNano = durationDayTimeToBigNano(durationFields);
  const roundedBigNano = roundBigNanoToInc(bigNano, computeBigNanoInc(smallestUnit, roundingInc), roundingMode);
  const nanoDiff = roundedBigNano - bigNano;
  const expandedBigUnit = Math.sign(Number(roundedBigNano / bigNanoInUtcDay) - Number(bigNano / bigNanoInUtcDay)) === sign;
  const roundedDayTimeFields = nanoToDurationDayTimeFields(roundedBigNano, Math.min(largestUnit, 6));
  return [{
    ...durationFields,
    ...roundedDayTimeFields
  }, endEpochNano + nanoDiff, expandedBigUnit];
}
function computeZonedDayEpochInterval(slots) {
  const { timeZone } = slots;
  const isoDateTime0 = combineDateAndTime(zonedEpochSlotsToIso(slots), timeFieldDefaults);
  const isoDateTime1 = combineDateAndTime(moveDateByDays(isoDateTime0, 1), timeFieldDefaults);
  return [getStartOfDayInstantFor(timeZone, isoDateTime0), getStartOfDayInstantFor(timeZone, isoDateTime1)];
}
function roundZonedEpochToBounds(epochNano, epochNano0, epochNano1, roundingMode) {
  return roundWithMode(computeEpochNanoFrac(epochNano < epochNano1 ? epochNano : epochNano1 - 1n, epochNano0, epochNano1), roundingMode) ? epochNano1 : epochNano0;
}
function roundToMinute(offsetNano) {
  return roundNumberToInc(offsetNano, nanoInMinute2, 7);
}
function roundBigNanoToInc(bigNano, bigNanoInc, roundingMode) {
  return roundBigNanoToIncWithTail(bigNano, bigNanoInc, roundingMode, bigNano / bigNanoInc % 2n);
}
function roundBigNanoToDayOriginInc(bigNano, bigNanoInc, roundingMode) {
  const [day, timeNano] = divModFloorBigInt(bigNano, bigNanoInUtcDay);
  const dayOriginNano = day * bigNanoInUtcDay;
  return dayOriginNano + roundBigNanoToIncWithTail(timeNano, bigNanoInc, roundingMode, (dayOriginNano / bigNanoInc + timeNano / bigNanoInc) % 2n);
}
function roundBigNanoToIncWithTail(bigNano, bigNanoInc, roundingMode, quotientTail) {
  const quotient = bigNano / bigNanoInc;
  const remainder = bigNano % bigNanoInc;
  let fraction = 0;
  remainder && (fraction = fabricateNearHalfFraction(compareBigInts(2n * (remainder < 0n ? -remainder : remainder), bigNanoInc), Math.sign(Number(remainder))));
  const roundedTail = roundWithMode(Number(quotientTail) + fraction, roundingMode);
  return (quotient - quotientTail + BigInt(roundedTail)) * bigNanoInc;
}
function computeNanoInc(smallestUnit, roundingInc) {
  return unitNanoMap[smallestUnit] * roundingInc;
}
function computeBigNanoInc(smallestUnit, roundingInc) {
  return BigInt(unitNanoMap[smallestUnit]) * BigInt(roundingInc);
}
var zonedEpochSlotsToIso = /* @__PURE__ */ memoize(_zonedEpochSlotsToIso, WeakMap);
function _zonedEpochSlotsToIso(slots) {
  const { epochNanoseconds, timeZone } = slots;
  const offsetNanoseconds = timeZone.B(epochNanoseconds);
  return {
    ...epochNanoToIsoDateTime(epochNanoseconds + BigInt(offsetNanoseconds)),
    offsetNanoseconds
  };
}
function getMatchingInstantFor(timeZone, isoDateTime, offsetNano, offsetDisambig = 0, epochDisambig = 0, epochFuzzy, hasZ) {
  if (void 0 !== offsetNano && 1 === offsetDisambig && (1 === offsetDisambig || hasZ)) {
    return isoDateTimeAndOffsetToEpochNano(isoDateTime, offsetNano);
  }
  2 !== offsetDisambig && 0 !== offsetDisambig || checkIsoDateInBounds(isoDateTime, 0);
  const possibleEpochNanos = timeZone.R(isoDateTime);
  if (void 0 !== offsetNano && 3 !== offsetDisambig) {
    const matchingEpochNano = ((possibleEpochNanos2, isoDateTime2, offsetNano2, fuzzy) => {
      const zonedEpochNano = isoDateTimeToEpochNano(isoDateTime2);
      fuzzy && (offsetNano2 = roundToMinute(offsetNano2));
      for (const possibleEpochNano of possibleEpochNanos2) {
        let possibleOffsetNano = Number(zonedEpochNano - possibleEpochNano);
        if (fuzzy && (possibleOffsetNano = roundToMinute(possibleOffsetNano)), possibleOffsetNano === offsetNano2) {
          return possibleEpochNano;
        }
      }
    })(possibleEpochNanos, isoDateTime, offsetNano, epochFuzzy);
    if (void 0 !== matchingEpochNano) {
      return matchingEpochNano;
    }
    0 === offsetDisambig && throwRangeError("Invalid TimeZone offset");
  }
  return hasZ ? isoDateTimeToEpochNano(isoDateTime) : getSingleInstantFor(timeZone, isoDateTime, epochDisambig, possibleEpochNanos);
}
function getSingleInstantFor(timeZone, isoDateTime, disambig = 0, possibleEpochNanos = timeZone.R(isoDateTime)) {
  if (1 === possibleEpochNanos.length) {
    return possibleEpochNanos[0];
  }
  if (1 === disambig && throwRangeError("Ambiguous offset"), possibleEpochNanos.length) {
    return possibleEpochNanos[3 === disambig ? 1 : 0];
  }
  const zonedEpochNano = isoDateTimeToEpochNano(isoDateTime);
  const gapNano = ((timeZone2, zonedEpochNano2) => {
    const startOffsetNano = timeZone2.B(zonedEpochNano2 - bigNanoInUtcDay);
    return ((gapNano2) => (gapNano2 > nanoInUtcDay && throwRangeError("Out-of-bounds TimeZone gap"), gapNano2))(timeZone2.B(zonedEpochNano2 + bigNanoInUtcDay) - startOffsetNano);
  })(timeZone, zonedEpochNano);
  const shiftedIsoDateTime = epochNanoToIsoDateTime(zonedEpochNano + BigInt(gapNano * (2 === disambig ? -1 : 1)));
  return (possibleEpochNanos = timeZone.R(shiftedIsoDateTime))[2 === disambig ? 0 : possibleEpochNanos.length - 1];
}
function getStartOfDayInstantFor(timeZone, isoDateTime) {
  const possibleEpochNanos = timeZone.R(isoDateTime);
  if (possibleEpochNanos.length) {
    return possibleEpochNanos[0];
  }
  const zonedEpochNanoDayBefore = isoDateTimeToEpochNano(isoDateTime) - bigNanoInUtcDay;
  return timeZone.C(zonedEpochNanoDayBefore, 1);
}
function moveYearMonth(calendar, isoDate, durationSlots, overflow = 0) {
  computeDurationSign(durationSlots) && clampEntity("unit", getMaxDurationUnit(durationSlots), 8, 9, 1, durationFieldNamesAsc);
  const first = checkIsoDateInBounds(moveToStartOfMonth(calendar, isoDate));
  return moveToStartOfMonth(calendar, moveDate(calendar, first, durationSlots, overflow));
}
function moveZonedEpochSlots(slots, durationFields, overflow = 0) {
  const { calendar, epochNanoseconds: epochNano, timeZone } = slots;
  const timeOnlyNano = durationTimeToBigNano(durationFields);
  let movedEpochNano = epochNano;
  if (durationHasDateParts(durationFields)) {
    const isoDateTime = zonedEpochSlotsToIso(slots);
    movedEpochNano = getSingleInstantFor(timeZone, combineDateAndTime(moveDate(calendar, isoDateTime, {
      ...durationFields,
      ...durationTimeFieldDefaults
    }, overflow), isoDateTime)) + timeOnlyNano;
  } else {
    movedEpochNano += timeOnlyNano;
  }
  return {
    ...slots,
    epochNanoseconds: checkEpochNanoInBounds(movedEpochNano)
  };
}
function moveDateTime(calendar, isoDateTime, durationFields, overflow = 0) {
  const [movedTimeFields, dayDelta] = moveTime(isoDateTime, durationFields);
  return checkIsoDateTimeInBounds(combineDateAndTime(moveDate(calendar, isoDateTime, {
    ...durationFields,
    ...durationTimeFieldDefaults,
    days: durationFields.days + dayDelta
  }, overflow), movedTimeFields));
}
function moveTime(timeFields, durationFields) {
  return moveTimeByNano(timeFields, durationTimeToBigNano(durationFields));
}
function moveEpochNano(epochNano, durationFields) {
  return moveEpochNanoByNano(epochNano, (clampEntity("unit", getMaxDurationUnit(fields = durationFields), 0, 5, 1, durationFieldNamesAsc), durationTimeToBigNano(fields)));
  var fields;
}
function moveDate(calendar, isoDate, durationFields, overflow = 0) {
  let { years, months, weeks, days } = durationFields;
  let movedIsoDate;
  if (days += Number(durationTimeToBigNano(durationFields) / bigNanoInUtcDay), years || months) {
    movedIsoDate = moveDateByCalendarUnits(calendar, isoDate, years, months, overflow);
  } else {
    if (!weeks && !days) {
      return isoDate;
    }
    movedIsoDate = isoDate;
  }
  return (weeks || days) && (movedIsoDate = moveDateByDays(movedIsoDate, 7 * weeks + days)), checkIsoDateInBounds(movedIsoDate);
}
function moveToStartOfMonth(calendar, isoDate) {
  return moveDateByDays(isoDate, 1 - computeCalendarDateFields(calendar, isoDate).day);
}
function moveDateByCalendarUnits(calendar, isoDate, years, months, overflow) {
  const dateParts = computeCalendarDateFields(calendar, isoDate);
  let { year, month, day } = dateParts;
  if (years) {
    const [monthCodeNumber, isLeapMonth] = computeCalendarMonthCodeParts(calendar, year, month);
    year += years, month = resolveMonthInMovedYear(calendar, monthCodeNumber, isLeapMonth, calendar ? calendar.p(year) : void 0, overflow), month = clampEntity("month", month, 1, computeCalendarMonthsInYearForYear(calendar, year), overflow);
  }
  if (months) {
    const yearMonthParts = addCalendarMonths(calendar, year, month, months);
    ({ year, month } = yearMonthParts);
  }
  return day = clampEntity("day", day, 1, computeCalendarDaysInMonthForYearMonth(calendar, year, month), overflow), computeCalendarIsoFieldsFromParts(calendar, year, month, day);
}
function addCalendarMonths(calendar, year, month, monthDelta) {
  return calendar ? calendar.ae(year, month, monthDelta) : addIsoMonths(year, month, monthDelta);
}
function resolveMonthInMovedYear(calendar, monthCodeNumber, isLeapMonth, targetLeapMonth, overflow) {
  if (isLeapMonth) {
    const leapMonthMeta = calendar ? calendar.l : void 0;
    return void 0 !== targetLeapMonth && (leapMonthMeta < 0 || targetLeapMonth === monthCodeNumber + 1) ? targetLeapMonth : (1 === overflow && throwRangeError(invalidLeapMonth), leapMonthMeta < 0 ? -leapMonthMeta : monthCodeNumber);
  }
  return monthCodeNumberToMonth(monthCodeNumber, 0, targetLeapMonth);
}
function moveTimeByNano(timeFields, durationBigNano) {
  const durDays = Number(durationBigNano / bigNanoInUtcDay);
  const durTimeNano = Number(durationBigNano % bigNanoInUtcDay);
  const [newTimeFields, overflowDays] = nanoToTimeAndDay(timeFieldsToNano(timeFields) + durTimeNano);
  return [newTimeFields, durDays + overflowDays];
}
function moveEpochNanoByNano(epochNano, deltaNano) {
  return checkEpochNanoInBounds(epochNano + deltaNano);
}
function moveDateByDays(isoDate, days) {
  return days ? epochDaysToIsoDate(isoDateToEpochDays(isoDate) + days) : isoDate;
}
function getCommonCalendar(a, b) {
  return getCalendarSlotId(a) !== getCalendarSlotId(b) && throwRangeError("Mismatching Calendars"), a;
}
function getCommonTimeZone(a, b) {
  return a.m !== b.m && throwRangeError("Mismatching TimeZones"), a;
}
function getZonedTimeZoneId(slots) {
  return slots.timeZone.id;
}
function diffZonedDateTimesRounded(calendar, startZoned, endZoned, largestUnit, smallestUnit, roundingInc, roundingMode) {
  return largestUnit < 6 ? diffEpochNanosRounded(startZoned.epochNanoseconds, endZoned.epochNanoseconds, largestUnit, smallestUnit, roundingInc, roundingMode) : ((calendar2, startZoned2, endZoned2, largestUnit2, smallestUnit2, roundingInc2, roundingMode2) => {
    const endEpochNano = endZoned2.epochNanoseconds;
    if (endEpochNano === startZoned2.epochNanoseconds) {
      return durationFieldDefaults;
    }
    let durationFields;
    const timeZone = getCommonTimeZone(startZoned2.timeZone, endZoned2.timeZone);
    return durationFields = diffZonedEpochsExact(timeZone, calendar2, startZoned2, endZoned2, largestUnit2), durationFields = roundRelativeDuration(durationFields, endEpochNano, largestUnit2, smallestUnit2, roundingInc2, roundingMode2, createZonedRelativeOps(calendar2, timeZone, startZoned2), 1), durationFields;
  })(calendar, startZoned, endZoned, largestUnit, smallestUnit, roundingInc, roundingMode);
}
function diffDateTimesRounded(calendar, startIsoDateTime, endIsoDateTime, largestUnit, smallestUnit, roundingInc, roundingMode) {
  return largestUnit <= 6 ? diffEpochNanosRounded(isoDateTimeToEpochNano(startIsoDateTime), isoDateTimeToEpochNano(endIsoDateTime), largestUnit, smallestUnit, roundingInc, roundingMode) : ((calendar2, startIsoDateTime2, endIsoDateTime2, largestUnit2, smallestUnit2, roundingInc2, roundingMode2) => {
    const endEpochNano = isoDateTimeToEpochNano(endIsoDateTime2);
    const sign = compareBigInts(endEpochNano, isoDateTimeToEpochNano(startIsoDateTime2));
    if (!sign) {
      return durationFieldDefaults;
    }
    let durationFields;
    return durationFields = diffDateTimesBig(calendar2, startIsoDateTime2, endIsoDateTime2, sign, largestUnit2), durationFields = roundRelativeDuration(durationFields, endEpochNano, largestUnit2, smallestUnit2, roundingInc2, roundingMode2, ((calendar3, origin) => ({
      ne: isoDateTimeToEpochNano(origin),
      ke: (duration) => isoDateTimeToEpochNano(combineDateAndTime(moveDate(calendar3, origin, duration), origin))
    }))(calendar2, startIsoDateTime2)), durationFields;
  })(calendar, startIsoDateTime, endIsoDateTime, largestUnit, smallestUnit, roundingInc, roundingMode);
}
function diffYearMonthsRounded(calendar, startIsoDate, endIsoDate, largestUnit, smallestUnit, roundingInc, roundingMode) {
  const firstOfMonth0 = moveToStartOfMonth(calendar, startIsoDate);
  const firstOfMonth1 = moveToStartOfMonth(calendar, endIsoDate);
  return compareIsoDates(firstOfMonth0, firstOfMonth1) ? diffDateCalendarUnitsRounded(calendar, checkIsoDateInBounds(firstOfMonth0), checkIsoDateInBounds(firstOfMonth1), largestUnit, smallestUnit, roundingInc, roundingMode, 8) : durationFieldDefaults;
}
function diffDatesRounded(calendar, startIsoDate, endIsoDate, largestUnit, smallestUnit, roundingInc, roundingMode, smallestPrecision = 6) {
  return 6 === largestUnit ? diffEpochNanosRounded(isoDateToEpochNano(startIsoDate), isoDateToEpochNano(endIsoDate), largestUnit, smallestUnit, roundingInc, roundingMode) : diffDateCalendarUnitsRounded(calendar, startIsoDate, endIsoDate, largestUnit, smallestUnit, roundingInc, roundingMode, smallestPrecision);
}
function diffTimesRounded(plainTimeSlots0, plainTimeSlots1, largestUnit, smallestUnit, roundingInc, roundingMode) {
  const timeDiffNano = roundNumberToInc(timeFieldsToNano(plainTimeSlots1) - timeFieldsToNano(plainTimeSlots0), computeNanoInc(smallestUnit, roundingInc), roundingMode);
  return {
    ...durationFieldDefaults,
    ...nanoToDurationTimeFields(timeDiffNano, largestUnit)
  };
}
function diffDateCalendarUnitsRounded(calendar, startIsoDate, endIsoDate, largestUnit, smallestUnit, roundingInc, roundingMode, smallestPrecision = 6) {
  const endEpochNano = isoDateToEpochNano(endIsoDate);
  if (!compareIsoDates(startIsoDate, endIsoDate)) {
    return durationFieldDefaults;
  }
  let durationFields;
  return durationFields = diffCalendarDates(calendar, startIsoDate, endIsoDate, largestUnit), smallestUnit === smallestPrecision && 1 === roundingInc || (durationFields = roundRelativeDuration(durationFields, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, createDateRelativeOps(calendar, startIsoDate))), durationFields;
}
function diffEpochNanosRounded(startEpochNano, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode) {
  return {
    ...durationFieldDefaults,
    ...nanoToDurationDayTimeFields(roundBigNanoToInc(endEpochNano - startEpochNano, computeBigNanoInc(smallestUnit, roundingInc), roundingMode), largestUnit)
  };
}
function diffZonedEpochsExact(timeZone, calendar, startZoned, endZoned, largestUnit) {
  return largestUnit < 6 ? {
    ...durationFieldDefaults,
    ...nanoToDurationDayTimeFields(endZoned.epochNanoseconds - startZoned.epochNanoseconds, largestUnit)
  } : ((timeZone2, startZoned2, endZoned2) => {
    const sign = compareBigInts(endZoned2.epochNanoseconds, startZoned2.epochNanoseconds);
    if (!sign) {
      return durationFieldDefaults;
    }
    if (!compareIsoDates(zonedEpochSlotsToIso(startZoned2), zonedEpochSlotsToIso(endZoned2))) {
      return {
        ...durationFieldDefaults,
        ...nanoToDurationDayTimeFields(endZoned2.epochNanoseconds - startZoned2.epochNanoseconds, 5)
      };
    }
    const [startIsoDateTime, endIsoDate, remainderNano] = prepareZonedEpochDiff(timeZone2, startZoned2, endZoned2, sign);
    return {
      ...(start = startIsoDateTime, end = endIsoDate, diffCalendarDates(calendar, start, end, largestUnit)),
      ...nanoToDurationTimeFields(remainderNano)
    };
    var start, end;
  })(timeZone, startZoned, endZoned);
}
function diffDateTimesExact(calendar, startIsoDateTime, endIsoDateTime, largestUnit) {
  const startEpochNano = isoDateTimeToEpochNano(startIsoDateTime);
  const endEpochNano = isoDateTimeToEpochNano(endIsoDateTime);
  const sign = compareBigInts(endEpochNano, startEpochNano);
  return sign ? largestUnit <= 6 ? {
    ...durationFieldDefaults,
    ...nanoToDurationDayTimeFields(endEpochNano - startEpochNano, largestUnit)
  } : diffDateTimesBig(calendar, startIsoDateTime, endIsoDateTime, sign, largestUnit) : durationFieldDefaults;
}
function diffDateTimesBig(calendar, startIsoDateTime, endIsoDateTime, sign, largestUnit) {
  let diffEndDate = endIsoDateTime;
  let timeNano = timeFieldsToNano(endIsoDateTime) - timeFieldsToNano(startIsoDateTime);
  return Math.sign(timeNano) === -sign && (diffEndDate = moveDateByDays(endIsoDateTime, -sign), timeNano += nanoInUtcDay * sign), {
    ...diffCalendarDates(calendar, startIsoDateTime, diffEndDate, largestUnit),
    ...nanoToDurationTimeFields(timeNano)
  };
}
function prepareZonedEpochDiff(timeZone, startZoned, endZoned, sign) {
  const startIsoDate = zonedEpochSlotsToIso(startZoned);
  const endIsoDate = zonedEpochSlotsToIso(endZoned);
  const endEpochNano = endZoned.epochNanoseconds;
  let dayCorrection = 0;
  const timeDiffNano = timeFieldsToNano(endIsoDate) - timeFieldsToNano(startIsoDate);
  Math.sign(timeDiffNano) === -sign && dayCorrection++;
  const maxDayCorrection = dayCorrection + (sign > 0 ? 1 : 0);
  for (; ; dayCorrection++) {
    const midIsoDate = moveDateByDays(endIsoDate, dayCorrection * -sign);
    const midEpochNano = getSingleInstantFor(timeZone, combineDateAndTime(midIsoDate, startIsoDate));
    if (dayCorrection === maxDayCorrection || compareBigInts(endEpochNano, midEpochNano) !== -sign) {
      return [startIsoDate, midIsoDate, Number(endEpochNano - midEpochNano)];
    }
  }
}
function diffCalendarDates(calendar, startIsoDate, endIsoDate, largestUnit) {
  if (largestUnit <= 7) {
    return ((asWeeks, start, end) => {
      const days = countIsoDays(start, end);
      return asWeeks ? {
        ...durationFieldDefaults,
        weeks: divTrunc(days, 7),
        days: modTrunc(days, 7)
      } : {
        ...durationFieldDefaults,
        days
      };
    })(7 === largestUnit, startIsoDate, endIsoDate);
  }
  const yearMonthDayStart = computeCalendarDateFields(calendar, startIsoDate);
  const yearMonthDayEnd = computeCalendarDateFields(calendar, endIsoDate);
  if (8 === largestUnit) {
    const { year: year02, month: month02, day: day02 } = yearMonthDayStart;
    const { year: year12, month: month12, day: day12 } = yearMonthDayEnd;
    const sign = Math.sign(compareNumbers(year12, year02) || compareNumbers(month12, month02) || countIsoDays(startIsoDate, endIsoDate));
    let months = 0;
    let days = 0;
    if (sign) {
      months = calendar ? calendar.ee(year02, month02, year12, month12) : diffIsoMonthSlots(year02, month02, year12, month12);
      let anchorIsoDate = moveDateByCalendarUnits(calendar, startIsoDate, 0, months, 0);
      sign * compareNumbers(day02, day12) > 0 && (months -= sign, anchorIsoDate = moveDateByCalendarUnits(calendar, startIsoDate, 0, months, 0)), days = countIsoDays(anchorIsoDate, endIsoDate);
    }
    return {
      ...durationFieldDefaults,
      months,
      days
    };
  }
  const { year: year0, month: month0, day: day0 } = yearMonthDayStart;
  let { year: year1, month: month1, day: day1 } = yearMonthDayEnd;
  let yearDiff = year1 - year0;
  let monthDiff = month1 - month0;
  let dayDiff = day1 - day0;
  if (yearDiff || monthDiff) {
    const sign = Math.sign(yearDiff || monthDiff);
    let daysInMonth1 = computeCalendarDaysInMonthForYearMonth(calendar, year1, month1);
    let dayCorrect = 0;
    if (Math.sign(day1 - day0) === -sign) {
      const origDaysInMonth1 = daysInMonth1;
      const yearMonthParts = addCalendarMonths(calendar, year1, month1, -sign);
      ({ year: year1, month: month1 } = yearMonthParts), yearDiff = year1 - year0, monthDiff = month1 - month0, daysInMonth1 = computeCalendarDaysInMonthForYearMonth(calendar, year1, month1), dayCorrect = sign < 0 ? -origDaysInMonth1 : daysInMonth1;
    }
    if (dayDiff = day1 - Math.min(day0, daysInMonth1) + dayCorrect, yearDiff) {
      const [monthCodeNumber0, isLeapMonth0] = computeCalendarMonthCodeParts(calendar, year0, month0);
      const [monthCodeNumber1, isLeapMonth1] = computeCalendarMonthCodeParts(calendar, year1, month1);
      const leapMonthMeta = calendar ? calendar.l : void 0;
      if (monthDiff = void 0 !== leapMonthMeta && isLeapMonth0 && !isLeapMonth1 && (leapMonthMeta < 0 ? sign > 0 && monthCodeNumber1 === -leapMonthMeta : sign < 0 && monthCodeNumber1 === monthCodeNumber0) ? 0 : monthCodeNumber1 - monthCodeNumber0 || Number(isLeapMonth1) - Number(isLeapMonth0), Math.sign(monthDiff) === -sign) {
        const monthCorrect = sign < 0 && -computeCalendarMonthsInYearForYear(calendar, year1);
        year1 -= sign, yearDiff = year1 - year0, monthDiff = month1 - resolveMonthInMovedYear(calendar, monthCodeNumber0, isLeapMonth0, calendar ? calendar.p(year1) : void 0, 0) + (monthCorrect || computeCalendarMonthsInYearForYear(calendar, year1));
      } else if (calendar) {
        const month0Projected = resolveMonthInMovedYear(calendar, monthCodeNumber0, isLeapMonth0, calendar.p(year1), 0);
        monthDiff = calendar.ee(year1, month0Projected, year1, month1);
      }
    }
  }
  return {
    ...durationFieldDefaults,
    years: yearDiff,
    months: monthDiff,
    days: dayDiff
  };
}
function compareIsoDates(isoDate0, isoDate1) {
  return compareNumbers(isoDate0.year, isoDate1.year) || compareNumbers(isoDate0.month, isoDate1.month) || compareNumbers(isoDate0.day, isoDate1.day);
}
function countIsoDays(startIsoDate, endIsoDate) {
  return isoDateToEpochDays(endIsoDate) - isoDateToEpochDays(startIsoDate);
}
function spanRelativeDuration(relativeToSlots, durationFields, largestUnit) {
  return isZonedEpochSlots(relativeToSlots) ? ((relativeToSlots2, durationFields2, largestUnit2) => {
    const { calendar, timeZone } = relativeToSlots2;
    const endSlots = moveZonedEpochSlots(relativeToSlots2, durationFields2);
    return [diffZonedEpochsExact(timeZone, calendar, relativeToSlots2, endSlots, largestUnit2), endSlots.epochNanoseconds, createZonedRelativeOps(calendar, timeZone, relativeToSlots2)];
  })(relativeToSlots, durationFields, largestUnit) : ((relativeToSlots2, durationFields2, largestUnit2) => {
    const { calendar } = relativeToSlots2;
    const origin = checkIsoDateTimeInBounds(combineDateAndTime(relativeToSlots2, timeFieldDefaults));
    const end = moveDateTime(calendar, origin, durationFields2);
    return [diffDateTimesExact(calendar, origin, end, largestUnit2), isoDateTimeToEpochNano(end), createDateRelativeOps(calendar, relativeToSlots2)];
  })(relativeToSlots, durationFields, largestUnit);
}
function moveRelativeEndpointToEpochNano(relativeToSlots, durationFields) {
  return isZonedEpochSlots(relativeToSlots) ? moveZonedEpochSlots(relativeToSlots, durationFields).epochNanoseconds : isoDateTimeToEpochNano(moveDateTime(relativeToSlots.calendar, combineDateAndTime(relativeToSlots, timeFieldDefaults), durationFields));
}
function moveRelativeMarkerToEpochNano(relativeOps, dateDuration) {
  return durationHasDateParts(dateDuration) ? relativeOps.ke(dateDuration) : relativeOps.ne;
}
function createZonedRelativeOps(calendar, timeZone, slots) {
  const origin = zonedEpochSlotsToIso(slots);
  return {
    ne: slots.epochNanoseconds,
    ke: (duration) => getSingleInstantFor(timeZone, combineDateAndTime(moveDate(calendar, origin, duration), origin))
  };
}
function createDateRelativeOps(calendar, origin) {
  return {
    ne: isoDateToEpochNano(origin),
    ke: (duration) => isoDateToEpochNano(moveDate(calendar, origin, duration))
  };
}
function isZonedEpochSlots(slots) {
  return "timeZone" in slots;
}
function isUniformUnit(unit, isZoned) {
  return unit <= 6 - (isZoned ? 1 : 0);
}
function nanoToGivenFields(nano, largestUnit, fieldNames) {
  const fields = {};
  for (let unit = largestUnit; unit >= 0; unit--) {
    const divisor = unitNanoMap[unit];
    fields[fieldNames[unit]] = divTrunc(nano, divisor), nano = modTrunc(nano, divisor);
  }
  return fields;
}
var maxDurationSeconds = 2 ** 53;
function addDurationsWithoutRelativeTo(doSubtract, slots, otherSlots) {
  const maxUnit = Math.max(getMaxDurationUnit(slots), getMaxDurationUnit(otherSlots));
  return clampEntity("unit", maxUnit, 0, 6, 1, durationFieldNamesAsc), ((doSubtract2, slots2, otherSlots2, maxUnit2) => createDurationSlots(validateDurationFields(((a, b, largestUnit, doSubtract3) => {
    const combined = durationDayTimeToBigNano(a) + durationDayTimeToBigNano(b) * BigInt(doSubtract3 ? -1 : 1);
    return Number.isFinite(Number(combined / bigNanoInUtcDay)) || throwRangeError(outOfBoundsDate), {
      ...durationFieldDefaults,
      ...nanoToDurationDayTimeFields(combined, largestUnit)
    };
  })(slots2, otherSlots2, maxUnit2, doSubtract2))))(doSubtract, slots, otherSlots, maxUnit);
}
function roundDuration(refineRelativeTo, slots, options) {
  const durationLargestUnit = getMaxDurationUnit(slots);
  const [largestUnit, smallestUnit, roundingInc, roundingMode, relativeToSlots] = ((options2, defaultLargestUnit, refineRelativeTo2) => {
    options2 = normalizeOptionsOrString(options2, smallestUnitStr);
    let largestUnit2 = coerceLargestUnit(options2);
    const relativeToInternals = refineRelativeTo2(options2.relativeTo);
    let roundingInc2 = coerceRoundingIncInteger(options2);
    const roundingMode2 = coerceRoundingMode(options2, 7);
    let smallestUnit2 = coerceSmallestUnit(options2);
    return void 0 === largestUnit2 && void 0 === smallestUnit2 && throwRangeError("Required smallestUnit or largestUnit"), null == smallestUnit2 && (smallestUnit2 = 0), null == largestUnit2 && (largestUnit2 = Math.max(smallestUnit2, defaultLargestUnit)), checkLargestSmallestUnit(largestUnit2, smallestUnit2), roundingInc2 = validateRoundingInc(roundingInc2, smallestUnit2, 1), roundingInc2 > 1 && smallestUnit2 > 5 && largestUnit2 !== smallestUnit2 && throwRangeError("For calendar units with roundingIncrement > 1, use largestUnit = smallestUnit"), [largestUnit2, smallestUnit2, roundingInc2, roundingMode2, relativeToInternals];
  })(options, durationLargestUnit, refineRelativeTo);
  if (!relativeToSlots && Math.max(durationLargestUnit, largestUnit) <= 6) {
    return createDurationSlots(validateDurationFields(((durationFields, largestUnit2, smallestUnit2, roundingInc2, roundingMode2) => {
      const roundedBigNano = roundBigNanoToInc(durationDayTimeToBigNano(durationFields), computeBigNanoInc(smallestUnit2, roundingInc2), roundingMode2);
      return {
        ...durationFieldDefaults,
        ...nanoToDurationDayTimeFields(roundedBigNano, largestUnit2)
      };
    })(slots, largestUnit, smallestUnit, roundingInc, roundingMode)));
  }
  relativeToSlots || throwRangeError("Missing relativeTo");
  const isZoned = isZonedEpochSlots(relativeToSlots);
  if (!slots.sign && (!isZoned || largestUnit < 6)) {
    return slots;
  }
  const [balancedDuration, endEpochNano, relativeOps] = spanRelativeDuration(relativeToSlots, slots, largestUnit);
  return createDurationSlots(roundRelativeDuration(balancedDuration, endEpochNano, largestUnit, smallestUnit, roundingInc, roundingMode, relativeOps, isZoned));
}
function absDuration(slots) {
  return -1 === slots.sign ? negateDuration(slots) : slots;
}
function negateDuration(slots) {
  return createDurationSlots(negateDurationFields(slots));
}
function negateDurationFields(fields) {
  const res = {};
  for (const fieldName of durationFieldNamesAsc) {
    res[fieldName] = -1 * fields[fieldName] || 0;
  }
  return res;
}
function computeDurationSign(fields, fieldNames = durationFieldNamesAsc) {
  let sign = 0;
  for (const fieldName of fieldNames) {
    const fieldSign = Math.sign(fields[fieldName]);
    fieldSign && (sign && sign !== fieldSign && throwRangeError("Cannot mix duration signs"), sign = fieldSign);
  }
  return sign;
}
function validateDurationFields(fields) {
  for (const calendarUnit of durationCalendarFieldNamesAsc) {
    validateDurationCalendarUnit(calendarUnit, fields[calendarUnit]);
  }
  const bigNano = durationDayTimeToBigNano(fields);
  return validateDurationTimeUnit(Number(bigNano / bigNanoInSec)), fields;
}
function validateDurationCalendarUnit(unit, value) {
  return clampEntity(unit, value, -4294967295, 4294967295, 1);
}
function validateDurationTimeUnit(n) {
  Number.isSafeInteger(n) || throwRangeError("Out-of-bounds duration");
}
function durationDayTimeToBigNano(fields) {
  return BigInt(fields.days) * bigNanoInUtcDay + durationTimeToBigNano(fields);
}
function durationTimeToBigNano(fields) {
  return BigInt(fields.hours) * bigNanoInHour + BigInt(fields.minutes) * bigNanoInMinute + durationSubMinuteToBigNano(fields);
}
function durationSubMinuteToBigNano(fields) {
  return BigInt(fields.seconds) * bigNanoInSec + BigInt(fields.milliseconds) * bigNanoInMilli + BigInt(fields.microseconds) * bigNanoInMicro + BigInt(fields.nanoseconds);
}
function nanoToDurationDayTimeFields(bigNano, largestUnit = 6) {
  const days = Number(bigNano / bigNanoInUtcDay);
  const timeNano = Number(bigNano % bigNanoInUtcDay);
  const unitNano = unitNanoMap[largestUnit];
  const largestUnitVal = largestUnit <= 3 ? Number(bigNano / BigInt(unitNano)) : days * (nanoInUtcDay / unitNano) + divTrunc(timeNano, unitNano);
  Number.isFinite(largestUnitVal) || throwRangeError(outOfBoundsDate), largestUnit <= 3 && Math.abs(largestUnitVal) / (nanoInSec2 / unitNanoMap[largestUnit]) >= maxDurationSeconds && throwRangeError(outOfBoundsDate);
  const dayTimeFields = nanoToGivenFields(timeNano, largestUnit, durationFieldNamesAsc);
  return dayTimeFields[durationFieldNamesAsc[largestUnit]] = largestUnitVal, dayTimeFields;
}
function nanoToDurationTimeFields(nano, largestUnit = 5) {
  return nanoToGivenFields(nano, largestUnit, durationFieldNamesAsc);
}
function durationHasDateParts(fields) {
  return Boolean(computeDurationSign(fields, durationDateFieldNamesAsc));
}
function getMaxDurationUnit(fields) {
  let unit = 9;
  for (; unit > 0 && !fields[durationFieldNamesAsc[unit]]; unit--) {
  }
  return unit;
}
function compareZonedEpochSlots(zonedEpochSlots0, zonedEpochSlots1) {
  return compareBigInts(zonedEpochSlots0.epochNanoseconds, zonedEpochSlots1.epochNanoseconds);
}
function compareDurations(refineRelativeTo, durationSlots0, durationSlots1, options) {
  const relativeToSlots = refineRelativeTo(normalizeOptions(options).relativeTo);
  const maxUnit = Math.max(getMaxDurationUnit(durationSlots0), getMaxDurationUnit(durationSlots1));
  return allPropsEqual(durationFieldNamesAsc, durationSlots0, durationSlots1) ? 0 : isUniformUnit(maxUnit, relativeToSlots && isZonedEpochSlots(relativeToSlots)) ? compareBigInts(durationDayTimeToBigNano(durationSlots0), durationDayTimeToBigNano(durationSlots1)) : (relativeToSlots || throwRangeError("Missing relativeTo"), compareBigInts(moveRelativeEndpointToEpochNano(relativeToSlots, durationSlots0), moveRelativeEndpointToEpochNano(relativeToSlots, durationSlots1)));
}
function compareIsoDateTimeFields(isoDateTime0, isoDateTime1) {
  return compareIsoDateFields(isoDateTime0, isoDateTime1) || compareTimeFields(isoDateTime0, isoDateTime1);
}
function compareIsoDateFields(isoDate0, isoDate1) {
  return compareNumbers(isoDateToEpochDays(isoDate0), isoDateToEpochDays(isoDate1));
}
function compareTimeFields(timeFields0, timeFields1) {
  return compareNumbers(timeFieldsToNano(timeFields0), timeFieldsToNano(timeFields1));
}
function instantsEqual(instantSlots0, instantSlots1) {
  return !compareZonedEpochSlots(instantSlots0, instantSlots1);
}
function zonedDateTimesEqual(zonedDateTimeSlots0, zonedDateTimeSlots1) {
  return !compareZonedEpochSlots(zonedDateTimeSlots0, zonedDateTimeSlots1) && zonedDateTimeSlots0.timeZone.m === zonedDateTimeSlots1.timeZone.m && zonedDateTimeSlots0.calendar === zonedDateTimeSlots1.calendar;
}
function plainDateTimesEqual(plainDateTimeSlots0, plainDateTimeSlots1) {
  return !compareIsoDateTimeFields(plainDateTimeSlots0, plainDateTimeSlots1) && plainDateTimeSlots0.calendar === plainDateTimeSlots1.calendar;
}
function plainDatesEqual(plainDateSlots0, plainDateSlots1) {
  return !compareIsoDateFields(plainDateSlots0, plainDateSlots1) && plainDateSlots0.calendar === plainDateSlots1.calendar;
}
function plainYearMonthsEqual(plainYearMonthSlots0, plainYearMonthSlots1) {
  return !compareIsoDateFields(plainYearMonthSlots0, plainYearMonthSlots1) && plainYearMonthSlots0.calendar === plainYearMonthSlots1.calendar;
}
function plainMonthDaysEqual(plainMonthDaySlots0, plainMonthDaySlots1) {
  return !compareIsoDateFields(plainMonthDaySlots0, plainMonthDaySlots1) && plainMonthDaySlots0.calendar === plainMonthDaySlots1.calendar;
}
function plainTimesEqual(plainTimeSlots0, plainTimeSlots1) {
  return !compareTimeFields(plainTimeSlots0, plainTimeSlots1);
}
function getCalendarEraOrigins(calendar) {
  return 0 === calendar ? gregoryEraOrigins : calendar ? calendar.k : void 0;
}
function getCalendarFieldNames(calendar, fieldNames, fieldNamesWithEra = fieldNames) {
  return getCalendarEraOrigins(calendar) ? fieldNamesWithEra : fieldNames;
}
function resolveCalendarYear(fields, calendar) {
  const exoticCalendar = calendar || void 0;
  const eraOrigins = getCalendarEraOrigins(calendar);
  let { era, eraYear, year } = fields;
  if (void 0 !== year && (year = toIntegerWithTrunc(year, "year")), void 0 !== eraYear && (eraYear = toIntegerWithTrunc(eraYear, "eraYear")), void 0 !== era || void 0 !== eraYear) {
    void 0 !== era && void 0 !== eraYear || throwTypeError("Mismatching era/eraYear"), eraOrigins || throwRangeError("Forbidden era/eraYear");
    const normalizedEra = normalizeEraName(era);
    const eraOrigin = eraOrigins[normalizedEra];
    void 0 === eraOrigin && throwRangeError(((era2) => `Invalid era: ${era2}`)(era));
    const yearByEra = exoticCalendar?._ ? exoticCalendar._(eraYear, normalizedEra, eraOrigin) : eraYearToYear(eraYear, eraOrigin);
    void 0 !== year && year !== yearByEra && throwRangeError("Mismatching year/eraYear"), year = yearByEra;
  } else {
    void 0 === year && throwTypeError(missingYear(eraOrigins));
  }
  return year;
}
function resolveCalendarMonth(fields, calendar, year, monthCodeParts, overflow) {
  let { month, monthCode } = fields;
  if (void 0 !== monthCode) {
    const monthByCode = ((calendar2, monthCode2, year2, overflow2, monthCodeParts2 = parseMonthCode(monthCode2)) => {
      const leapMonth = calendar2 ? calendar2.p(year2) : void 0;
      const [monthCodeNumber, wantsLeapMonth] = monthCodeParts2;
      let month2 = monthCodeNumberToMonth(monthCodeNumber, wantsLeapMonth, leapMonth);
      if (wantsLeapMonth) {
        const leapMonthMeta = calendar2 ? calendar2.l : void 0;
        void 0 === leapMonthMeta && throwRangeError(invalidLeapMonth), leapMonthMeta > 0 ? (month2 > leapMonthMeta && throwRangeError(invalidLeapMonth), leapMonth !== month2 && (1 === overflow2 && throwRangeError(invalidLeapMonth), month2 = monthCodeNumberToMonth(monthCodeNumber, 0, leapMonth))) : (month2 !== -leapMonthMeta && throwRangeError(invalidLeapMonth), void 0 === leapMonth && 1 === overflow2 && throwRangeError(invalidLeapMonth));
      }
      return month2;
    })(calendar, monthCode, year, overflow, monthCodeParts);
    void 0 !== month && month !== monthByCode && throwRangeError("Mismatching month/monthCode"), month = monthByCode, overflow = 1;
  } else {
    void 0 === month && throwTypeError("Missing month/monthCode");
  }
  return clampEntity("month", month, 1, computeCalendarMonthsInYearForYear(calendar, year), overflow);
}
function resolveCalendarDay(fields, calendar, year, month, overflow) {
  return clampProp(fields, "day", 1, computeCalendarDaysInMonthForYearMonth(calendar, year, month), overflow);
}
function eraYearToYear(eraYear, eraOrigin) {
  return (eraOrigin + eraYear) * (Math.sign(eraOrigin) || 1) || 0;
}
function resolveTimeFields(fields, overflow) {
  return constrainTimeFields(pluckProps(timeFieldNamesAsc, {
    ...timeFieldDefaults,
    ...fields
  }), overflow);
}
var offsetRegExp = /* @__PURE__ */ createRegExp("([+-])(\\d{2})(?::?(\\d{2})(?::?(\\d{2})(?:[.,](\\d{1,9}))?)?)?");
function parseOffsetNano(s) {
  const offsetNano = parseOffsetNanoMaybe(s);
  return void 0 === offsetNano && throwRangeError(failedParse(s)), offsetNano;
}
function parseOffsetNanoMaybe(s, onlyHourMinute) {
  const parts = offsetRegExp.exec(s);
  if (parts && ((s2) => ((s3) => {
    "T" !== s3[0] && "t" !== s3[0] || (s3 = s3.slice(1));
    const fractionIndex = s3.search(/[.,]/);
    const main = fractionIndex < 0 ? s3 : s3.slice(0, fractionIndex);
    const parts2 = main.split(":");
    return 1 === parts2.length ? /^(?:\d{2}|\d{4}|\d{6})$/i.test(main) : (2 === parts2.length || 3 === parts2.length) && parts2.every((part) => 2 === part.length && /^\d{2}$/i.test(part));
  })(s2.slice(1)))(parts[0])) {
    return ((parts2, onlyHourMinute2) => {
      const firstSubMinutePart = parts2[4] || parts2[5];
      onlyHourMinute2 && firstSubMinutePart && throwRangeError(invalidSubstring(firstSubMinutePart));
      const offsetNanoPos = parseInt0(parts2[2]) * nanoInHour2 + parseInt0(parts2[3]) * nanoInMinute2 + parseInt0(parts2[4]) * nanoInSec2 + parseSubsecNano(parts2[5] || "");
      return offsetNano = offsetNanoPos * parseSign(parts2[1]), Math.abs(offsetNano) >= nanoInUtcDay && throwRangeError("Out-of-bounds offset"), offsetNano;
      var offsetNano;
    })(parts, onlyHourMinute);
  }
}
var dateFieldRefiners = {
  era: toString,
  month: toPositiveIntegerWithTruncation,
  monthCode(monthCode, fieldName) {
    return requireString(toPrimitiveWithStringHint(monthCode), fieldName);
  },
  day: toPositiveIntegerWithTruncation
};
var timeFieldRefiners = /* @__PURE__ */ zipPropsConst(timeFieldNamesAsc, toIntegerWithTrunc);
var durationFieldRefiners = /* @__PURE__ */ zipPropsConst(durationFieldNamesAsc, toStrictInteger);
var dateTimeFieldRefiners = /* @__PURE__ */ Object.assign({}, dateFieldRefiners, timeFieldRefiners);
var zonedDateTimeFieldRefiners = {
  offset(offsetString) {
    return parseOffsetNano(requireString(toPrimitiveWithStringHint(offsetString)));
  },
  ...dateTimeFieldRefiners
};
function readAndRefineBagFields(bag, validFieldNames, fieldRefiners, requiredFieldNames, disallowEmpty = !requiredFieldNames) {
  const res = {};
  let anyMatching = 0;
  for (const fieldName of validFieldNames) {
    let fieldVal = bag[fieldName];
    if (void 0 !== fieldVal) {
      anyMatching = 1;
      const refiner = fieldRefiners[fieldName];
      refiner && (fieldVal = refiner(fieldVal, fieldName)), res[fieldName] = fieldVal;
    } else {
      requiredFieldNames && requiredFieldNames.includes(fieldName) && throwTypeError(missingField(fieldName));
    }
  }
  return disallowEmpty && !anyMatching && throwTypeError(noValidFields(validFieldNames)), res;
}
function refineOverflowOptions(options) {
  return void 0 === options ? 0 : coerceOverflow(requireObjectLike(options));
}
function refineZonedFieldOptions(options, defaultOffsetDisambig = 0) {
  options = normalizeOptions(options);
  const epochDisambig = coerceEpochDisambig(options);
  const offsetDisambig = coerceOffsetDisambig(options, defaultOffsetDisambig);
  return [coerceOverflow(options), offsetDisambig, epochDisambig];
}
function refineEpochDisambigOptions(options) {
  return coerceEpochDisambig(normalizeOptions(options));
}
function refineCalendarDateFields(fields, calendar, allowMissingDay) {
  const eraOrigins = getCalendarEraOrigins(calendar);
  void 0 !== fields.year || void 0 !== fields.era && void 0 !== fields.eraYear || throwTypeError(missingYear(eraOrigins)), void 0 === fields.monthCode && void 0 === fields.month && throwTypeError("Missing month/monthCode"), allowMissingDay || void 0 !== fields.day || throwTypeError(missingField("day"));
  const monthCodeParts = parseMonthCodeField(fields);
  return [resolveCalendarYear(fields, calendar), monthCodeParts];
}
function refineMonthDayFields(fields, calendar) {
  const isIso = calendar === isoCalendarImpl;
  const eraOrigins = getCalendarEraOrigins(calendar);
  void 0 === fields.day && throwTypeError(missingField("day")), isIso || void 0 === fields.month || void 0 !== fields.year || void 0 !== fields.era && void 0 !== fields.eraYear || throwTypeError(missingYear(eraOrigins));
  const monthCodeParts = parseMonthCodeField(fields);
  return [void 0 !== fields.eraYear || void 0 !== fields.year ? resolveCalendarYear(fields, calendar) : void 0, monthCodeParts];
}
function createDateTimeFromRefinedFields(isoDate, timeFields = timeFieldDefaults, calendar) {
  const isoDateTime = combineDateAndTime(isoDate, timeFields);
  return checkIsoDateTimeInBounds(isoDateTime), createDateTimeSlots(isoDateTime, calendar);
}
function createDateFromRefinedFields(fields, calendar, year, monthCodeParts, overflow) {
  const month = resolveCalendarMonth(fields, calendar, year, monthCodeParts, overflow);
  return createDateSlots(checkIsoDateInBounds(computeCalendarIsoFieldsFromParts(calendar, year, month, resolveCalendarDay(fields, calendar, year, month, overflow))), calendar);
}
function createYearMonthFromRefinedFields(fields, calendar, year, monthCodeParts, overflow) {
  return createYearMonthFromCalendarParts(calendar, year, resolveCalendarMonth(fields, calendar, year, monthCodeParts, overflow));
}
function createMonthDayFromRefinedFields(fields, calendar, year, monthCodeParts, overflow) {
  const isIso = calendar === isoCalendarImpl;
  let yearMaybe = year;
  let day;
  let monthCodeNumber;
  let isLeapMonth;
  if (void 0 === yearMaybe && isIso && (yearMaybe = 1972), void 0 !== yearMaybe) {
    isIso || checkIsoDateInBounds(computeCalendarIsoFieldsFromParts(calendar, yearMaybe, 1, 1));
    const month = resolveCalendarMonth(fields, calendar, yearMaybe, monthCodeParts, overflow);
    day = resolveCalendarDay(fields, calendar, yearMaybe, month, overflow), [monthCodeNumber, isLeapMonth] = computeCalendarMonthCodeParts(calendar, yearMaybe, month);
  } else {
    void 0 === fields.monthCode && throwTypeError("Missing month/monthCode"), [monthCodeNumber, isLeapMonth] = monthCodeParts;
    const referenceYear = calendar ? calendar.re : 1972;
    if (void 0 !== referenceYear) {
      day = resolveCalendarDay(fields, calendar, referenceYear, resolveCalendarMonth(fields, calendar, referenceYear, monthCodeParts, overflow), overflow);
    } else {
      const constrainedDay = 0 === overflow && calendar ? calendar.ge?.(monthCodeNumber, isLeapMonth, fields.day) : void 0;
      day = void 0 !== constrainedDay ? constrainedDay : fields.day;
    }
  }
  return createMonthDayFromMonthCodeParts(calendar, monthCodeNumber, isLeapMonth, day, fields.day, overflow);
}
function createYearMonthFromCalendarParts(calendar, year, month) {
  return createDateSlots(checkIsoYearMonthInBounds(computeCalendarIsoFieldsFromParts(calendar, year, month, 1)), calendar);
}
function createMonthDayFromMonthCodeParts(calendar, monthCodeNumber, isLeapMonthArg, day, requestedDay, overflow) {
  let isLeapMonth = isLeapMonthArg;
  isLeapMonth && ((calendar && calendar.V?.[monthCodeNumber]) ?? 1 / 0) < requestedDay && (1 === overflow && throwRangeError(invalidLeapMonth), isLeapMonth = 0, day = constrainToRange2(requestedDay, 1, (calendar && calendar.U) ?? 1 / 0));
  let res = calendar ? calendar.u(monthCodeNumber, Boolean(isLeapMonth), day) : computeIsoYearMonthFieldsForMonthDay(monthCodeNumber, Boolean(isLeapMonth));
  for (; !res && 0 === overflow && day > 1; ) {
    day--, res = calendar ? calendar.u(monthCodeNumber, Boolean(isLeapMonth), day) : computeIsoYearMonthFieldsForMonthDay(monthCodeNumber, Boolean(isLeapMonth));
  }
  res || throwRangeError("Cannot guess year");
  const { year: finalYear, month: finalMonth } = res;
  return createDateSlots(checkIsoDateInBounds(computeCalendarIsoFieldsFromParts(calendar, finalYear, finalMonth, day)), calendar);
}
function parseMonthCodeField(fields) {
  if (void 0 !== fields.monthCode) {
    return parseMonthCode(fields.monthCode);
  }
}
var RawDateTimeFormat = Intl.DateTimeFormat;
function formatEpochMilliToPartsRecord(intlFormat, epochMilli) {
  epochMilli < -864e13 && throwRangeError(outOfBoundsDate);
  const parts = intlFormat.formatToParts(epochMilli);
  const hash = {};
  for (const part of parts) {
    hash[part.type] = part.value;
  }
  return hash;
}
var timeZonePeriodDaysByName = {
  "El_Aaiun": 17,
  "Tucuman": 12,
  "Tirane": 11,
  "Riga": 10,
  "Simferopol": 9,
  "Vienna": 9,
  "Tunis": 8,
  "Boa_Vista": 6,
  "Fortaleza": 6,
  "Maceio": 6,
  "Noronha": 6,
  "Recife": 6,
  "Gaza": 6,
  "Hebron": 6,
  "DeNoronha": 6
};
var minPossibleTransitionSec = -388152e4;
function refineTimeDisplayTuple(options, maxSmallestUnit = 4) {
  const subsecDigits = coerceFractionalSecondDigits(options);
  const roundingMode = coerceRoundingMode(options, 4);
  const smallestUnit = coerceSmallestUnit(options);
  return [roundingMode, ...resolveSmallestUnitAndSubsecDigits(validateUnitRange(smallestUnitStr, smallestUnit, 0, maxSmallestUnit), subsecDigits)];
}
function refineDateDisplayOptions(options) {
  return coerceCalendarDisplay(normalizeOptions(options));
}
function refineTimeDisplayOptions(options, maxSmallestUnit) {
  return refineTimeDisplayTuple(normalizeOptions(options), maxSmallestUnit);
}
function resolveSmallestUnitAndSubsecDigits(smallestUnit, subsecDigits) {
  return null != smallestUnit ? [unitNanoMap[smallestUnit], smallestUnit < 4 ? 9 - 3 * smallestUnit : -1] : [void 0 === subsecDigits ? 1 : 10 ** (9 - subsecDigits), subsecDigits];
}
function formatInstantIso(refineTimeZoneString, instantSlots, options) {
  const [timeZoneArg, roundingMode, nanoInc, subsecDigits] = ((options2) => {
    const subsecDigits2 = coerceFractionalSecondDigits(options2 = normalizeOptions(options2));
    const roundingMode2 = coerceRoundingMode(options2, 4);
    const smallestUnit = coerceSmallestUnit(options2);
    return [options2.timeZone, roundingMode2, ...resolveSmallestUnitAndSubsecDigits(validateUnitRange(smallestUnitStr, smallestUnit, 0, 4), subsecDigits2)];
  })(options);
  const providedTimeZone = void 0 !== timeZoneArg;
  return ((providedTimeZone2, timeZone, epochNano, roundingMode2, nanoInc2, subsecDigits2) => {
    epochNano = roundBigNanoToDayOriginInc(epochNano, BigInt(nanoInc2), roundingMode2);
    const offsetNano = timeZone.B(epochNano);
    return formatIsoDateTimeFields(epochNanoToIsoDateTime(epochNano + BigInt(offsetNano)), subsecDigits2) + (providedTimeZone2 ? formatOffsetNano(roundToMinute(offsetNano)) : "Z");
  })(providedTimeZone, queryTimeZone(providedTimeZone ? refineTimeZoneString(timeZoneArg) : "UTC"), instantSlots.epochNanoseconds, roundingMode, nanoInc, subsecDigits);
}
function formatZonedDateTimeIso(zonedDateTimeSlots0, options) {
  const displayOptions = ((options2) => {
    options2 = normalizeOptions(options2);
    const calendarDisplay = coerceCalendarDisplay(options2);
    const subsecDigits = coerceFractionalSecondDigits(options2);
    const offsetDisplay = coerceOffsetDisplay(options2);
    const roundingMode = coerceRoundingMode(options2, 4);
    const smallestUnit = coerceSmallestUnit(options2);
    return [calendarDisplay, coerceTimeZoneDisplay(options2), offsetDisplay, roundingMode, ...resolveSmallestUnitAndSubsecDigits(validateUnitRange(smallestUnitStr, smallestUnit, 0, 4), subsecDigits)];
  })(options);
  return ((calendar, timeZoneId, timeZone, epochNano, calendarDisplay, timeZoneDisplay, offsetDisplay, roundingMode, nanoInc, subsecDigits) => {
    epochNano = roundBigNanoToDayOriginInc(epochNano, BigInt(nanoInc), roundingMode);
    const offsetNano = timeZone.B(epochNano);
    return formatIsoDateTimeFields(epochNanoToIsoDateTime(epochNano + BigInt(offsetNano)), subsecDigits) + formatOffsetNano(roundToMinute(offsetNano), offsetDisplay) + formatTimeZone(timeZoneId, timeZoneDisplay) + formatCalendar(calendar, calendarDisplay);
  })(zonedDateTimeSlots0.calendar, zonedDateTimeSlots0.timeZone.id, zonedDateTimeSlots0.timeZone, zonedDateTimeSlots0.epochNanoseconds, ...displayOptions);
}
function formatPlainDateTimeIso(plainDateTimeSlots0, options) {
  const displayOptions = ((options2) => (options2 = normalizeOptions(options2), [coerceCalendarDisplay(options2), ...refineTimeDisplayTuple(options2)]))(options);
  return ((calendar, isoDateTime, calendarDisplay, roundingMode, nanoInc, subsecDigits) => formatIsoDateTimeFields(roundDateTimeToInc(isoDateTime, nanoInc, roundingMode), subsecDigits) + formatCalendar(calendar, calendarDisplay))(plainDateTimeSlots0.calendar, plainDateTimeSlots0, ...displayOptions);
}
function formatPlainDateIso(plainDateSlots, options) {
  return calendar = plainDateSlots.calendar, isoDate = plainDateSlots, calendarDisplay = refineDateDisplayOptions(options), formatIsoDateFields(isoDate) + formatCalendar(calendar, calendarDisplay);
  var calendar, isoDate, calendarDisplay;
}
function formatPlainYearMonthIso(plainYearMonthSlots, options) {
  return formatDateLikeIso(plainYearMonthSlots.calendar, formatIsoYearMonthFields, plainYearMonthSlots, refineDateDisplayOptions(options));
}
function formatPlainMonthDayIso(plainMonthDaySlots, options) {
  return formatDateLikeIso(plainMonthDaySlots.calendar, formatIsoMonthDayFields, plainMonthDaySlots, refineDateDisplayOptions(options));
}
function formatDateLikeIso(calendar, formatSimple, isoDate, calendarDisplay) {
  const showCalendar = calendarDisplay > 1 || 0 === calendarDisplay && calendar !== isoCalendarImpl;
  return 1 === calendarDisplay ? calendar === isoCalendarImpl ? formatSimple(isoDate) : formatIsoDateFields(isoDate) : showCalendar ? formatIsoDateFields(isoDate) + formatCalendarId(getCalendarSlotId(calendar), 2 === calendarDisplay) : formatSimple(isoDate);
}
function formatPlainTimeIso(slots, options) {
  return ((fields, roundingMode, nanoInc, subsecDigits) => formatTimeFields(roundTimeToInc(fields, nanoInc, roundingMode)[0], subsecDigits))(slots, ...refineTimeDisplayOptions(options));
}
function formatDurationIso(slots, options) {
  const [roundingMode, nanoInc, subsecDigits] = refineTimeDisplayOptions(options, 3);
  return nanoInc > 1 && validateDurationFields(slots = {
    ...slots,
    ...roundDayTimeDurationByInc(slots, nanoInc, roundingMode)
  }), formatDurationSlots(slots, subsecDigits);
}
function formatDurationSlots(durationSlots, subsecDigits) {
  const { sign } = durationSlots;
  const abs = -1 === sign ? negateDurationFields(durationSlots) : durationSlots;
  const { hours, minutes } = abs;
  const bigNano = durationSubMinuteToBigNano(abs);
  const wholeSec = Number(bigNano / bigNanoInSec);
  const subsecNano = Number(bigNano % bigNanoInSec);
  validateDurationTimeUnit(wholeSec);
  const subsecNanoString = formatSubsecNano(subsecNano, subsecDigits);
  const forceSec = subsecDigits >= 0 || !sign || subsecNanoString;
  return (sign < 0 ? "-" : "") + "P" + formatDurationFragments({
    "Y": formatDurationNumber(abs.years),
    "M": formatDurationNumber(abs.months),
    "W": formatDurationNumber(abs.weeks),
    "D": formatDurationNumber(abs.days)
  }) + (hours || minutes || wholeSec || forceSec ? "T" + formatDurationFragments({
    "H": formatDurationNumber(hours),
    "M": formatDurationNumber(minutes),
    "S": formatDurationNumber(wholeSec, forceSec) + subsecNanoString
  }) : "");
}
function formatDurationFragments(fragObj) {
  const parts = [];
  for (const fragName in fragObj) {
    const fragVal = fragObj[fragName];
    fragVal && parts.push(fragVal, fragName);
  }
  return parts.join("");
}
function formatDurationNumber(n, force) {
  if (!n && !force) {
    return "";
  }
  const options = /* @__PURE__ */ Object.create(null);
  return options.useGrouping = 0, n.toLocaleString("fullwide", options);
}
function formatIsoDateTimeFields(isoDateTime, subsecDigits) {
  return formatIsoDateFields(isoDateTime) + "T" + formatTimeFields(isoDateTime, subsecDigits);
}
function formatIsoDateFields(isoDate) {
  return formatIsoYearMonthFields(isoDate) + "-" + padNumber2(isoDate.day);
}
function formatIsoYearMonthFields(isoDate) {
  const { year } = isoDate;
  return (year < 0 || year > 9999 ? getSignStr(year) + padNumber(6, Math.abs(year)) : padNumber(4, year)) + "-" + padNumber2(isoDate.month);
}
function formatIsoMonthDayFields(isoDate) {
  return padNumber2(isoDate.month) + "-" + padNumber2(isoDate.day);
}
function formatTimeFields(timeFields, subsecDigits) {
  const parts = [padNumber2(timeFields.hour), padNumber2(timeFields.minute)];
  return -1 !== subsecDigits && parts.push(padNumber2(timeFields.second) + ((millisecond, microsecond, nanosecond, subsecDigits2) => formatSubsecNano(millisecond * nanoInMilli2 + microsecond * nanoInMicro2 + nanosecond, subsecDigits2))(timeFields.millisecond, timeFields.microsecond, timeFields.nanosecond, subsecDigits)), parts.join(":");
}
function formatOffsetNano(offsetNano, offsetDisplay = 0) {
  if (1 === offsetDisplay) {
    return "";
  }
  const [hour, nanoRemainder0] = divModFloor(Math.abs(offsetNano), nanoInHour2);
  const [minute, nanoRemainder1] = divModFloor(nanoRemainder0, nanoInMinute2);
  const [second, nanoRemainder2] = divModFloor(nanoRemainder1, nanoInSec2);
  return getSignStr(offsetNano) + padNumber2(hour) + ":" + padNumber2(minute) + (second || nanoRemainder2 ? ":" + padNumber2(second) + formatSubsecNano(nanoRemainder2) : "");
}
function formatTimeZone(timeZoneId, timeZoneDisplay) {
  return 1 !== timeZoneDisplay ? "[" + (2 === timeZoneDisplay ? "!" : "") + timeZoneId + "]" : "";
}
function formatCalendar(calendar, calendarDisplay) {
  return calendarDisplay > 1 || 0 === calendarDisplay && calendar !== isoCalendarImpl ? formatCalendarId(getCalendarSlotId(calendar), 2 === calendarDisplay) : "";
}
function formatCalendarId(calendarId, isCritical) {
  return "[" + (isCritical ? "!" : "") + "u-ca=" + calendarId + "]";
}
var trailingZerosRE = /0+$/;
function formatSubsecNano(totalNano, subsecDigits) {
  let s = padNumber(9, totalNano);
  return s = void 0 === subsecDigits ? s.replace(trailingZerosRE, "") : s.slice(0, subsecDigits), s ? "." + s : "";
}
function getSignStr(num) {
  return num < 0 ? "-" : "+";
}
var icuRegExp = /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/;
var badCharactersRegExp = /[^\w\/:+-]+/;
function refineTimeZoneId(rawId) {
  return resolveTimeZoneId(requireString(rawId));
}
function resolveTimeZoneId(rawId) {
  return resolveTimeZoneRecord(rawId).id;
}
function resolveTimeZoneRecord(rawId) {
  const upperRawId = rawId.toUpperCase();
  const offsetRecord = ((upperRawId2) => {
    const offsetNano = parseOffsetNanoMaybe(upperRawId2, 1);
    if (void 0 !== offsetNano) {
      return {
        id: formatOffsetNano(offsetNano),
        Z: offsetNano,
        m: offsetNano
      };
    }
  })(upperRawId);
  if (offsetRecord) {
    return {
      kind: "fixed",
      ...offsetRecord
    };
  }
  const normId = "UTC" === upperRawId ? "UTC" : ((rawId2) => (badCharactersRegExp.test(rawId2) && throwRangeError(invalidTimeZone(rawId2)), icuRegExp.test(rawId2) && throwRangeError("Forbidden ICU TimeZone"), rawId2.toLowerCase().split("/").map((part, partI) => (part.length <= 3 || /\d/.test(part)) && !/etc|yap/.test(part) ? part.toUpperCase() : part.replace(/baja|dumont|[a-z]+/g, (a, i) => a.length <= 2 && !partI || "in" === a || "chat" === a ? a.toUpperCase() : a.length > 2 || !i ? capitalize2(a).replace(/island|noronha|murdo|rivadavia|urville/, capitalize2) : a)).join("/")))(rawId);
  return queryNamedTimeZoneRecord(normId);
}
var queryNamedTimeZoneRecord = /* @__PURE__ */ memoize((normId) => {
  if ("UTC" === normId) {
    return {
      kind: "utc",
      id: normId,
      m: normId
    };
  }
  const upperNormId = normId.toUpperCase();
  const format = queryTimeZoneIntlFormat(upperNormId);
  return {
    kind: "named",
    id: normId,
    format,
    m: format.resolvedOptions().timeZone
  };
});
var queryTimeZoneIntlFormat = /* @__PURE__ */ memoize((upperNormId) => new RawDateTimeFormat("en-u-hc-h23", {
  calendar: "iso8601",
  timeZone: upperNormId,
  era: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
}));
function queryTimeZone(rawTimeZoneId) {
  const record = resolveTimeZoneRecord(rawTimeZoneId);
  return queryTimeZoneRecord(record.id, record);
}
var queryTimeZoneRecord = /* @__PURE__ */ memoize((normTimeZoneId, record) => "named" === record.kind ? new IntlTimeZone(normTimeZoneId, record.m, record.format) : new FixedTimeZone(normTimeZoneId, record.m, "fixed" === record.kind ? record.Z : 0));
var FixedTimeZone = class {
  constructor(id, compareKey, offsetNano) {
    this.id = id, this.m = compareKey, this.Z = offsetNano;
  }
  B() {
    return this.Z;
  }
  R(isoDateTime) {
    return [isoDateTimeAndOffsetToEpochNano(isoDateTime, this.Z)];
  }
  C() {
  }
};
var IntlTimeZone = class {
  constructor(id, compareKey, format) {
    this.id = id, this.m = compareKey, this.oe = ((computeOffsetSec, periodDays) => {
      const getSample = memoize(computeOffsetSec);
      const getSplit = memoize(createSplitTuple);
      const periodSec = 86400 * periodDays;
      function getOffsetSec(epochSec) {
        const [startEpochSec, endEpochSec] = computePeriod(epochSec, periodSec);
        const clampedStartEpochSec = clampIntlSampleEpochSec(startEpochSec);
        const clampedEndEpochSec = clampIntlSampleEpochSec(endEpochSec);
        const startOffsetSec = getSample(clampedStartEpochSec);
        const endOffsetSec = getSample(clampedEndEpochSec);
        return startOffsetSec === endOffsetSec ? startOffsetSec : pinch(getSplit(clampedStartEpochSec, clampedEndEpochSec), startOffsetSec, endOffsetSec, epochSec);
      }
      function pinch(split, startOffsetSec, endOffsetSec, forEpochSec) {
        let offsetSec;
        let splitDurSec;
        for (; (void 0 === forEpochSec || void 0 === (offsetSec = forEpochSec < split[0] ? startOffsetSec : forEpochSec >= split[1] ? endOffsetSec : void 0)) && (splitDurSec = split[1] - split[0]); ) {
          const middleEpochSec = split[0] + Math.floor(splitDurSec / 2);
          computeOffsetSec(middleEpochSec) === endOffsetSec ? split[1] = middleEpochSec : split[0] = middleEpochSec + 1;
        }
        return offsetSec;
      }
      return {
        Ae(zonedEpochSec) {
          const wideOffsetSec0 = getOffsetSec(zonedEpochSec - 86400);
          const wideOffsetSec1 = getOffsetSec(zonedEpochSec + 86400);
          const wideUtcEpochSec0 = zonedEpochSec - wideOffsetSec0;
          const wideUtcEpochSec1 = zonedEpochSec - wideOffsetSec1;
          if (wideOffsetSec0 === wideOffsetSec1) {
            return [wideUtcEpochSec0];
          }
          const narrowOffsetSec0 = getOffsetSec(wideUtcEpochSec0);
          return narrowOffsetSec0 === getOffsetSec(wideUtcEpochSec1) ? [zonedEpochSec - narrowOffsetSec0] : wideOffsetSec0 > wideOffsetSec1 ? [wideUtcEpochSec0, wideUtcEpochSec1] : [];
        },
        ze: getOffsetSec,
        C: function getTransition(epochSec, direction) {
          if (direction > 0 && epochSec >= 864e10) {
            return;
          }
          if (direction < 0) {
            if (epochSec <= minPossibleTransitionSec) {
              return;
            }
            const lookaheadEpochSec = getCurrentEpochSec() + 94867200;
            if (epochSec > lookaheadEpochSec) {
              return getTransition(lookaheadEpochSec, -1);
            }
          }
          const searchEpochSec = direction > 0 ? Math.max(epochSec, minPossibleTransitionSec) : epochSec;
          let [startEpochSec, endEpochSec] = computePeriod(searchEpochSec, periodSec);
          const inc = periodSec * direction;
          const searchLimit = direction > 0 ? Math.max(epochSec, getCurrentEpochSec()) + 94867200 : minPossibleTransitionSec;
          const inBounds = () => direction < 0 ? endEpochSec > searchLimit : startEpochSec < searchLimit;
          for (; inBounds(); ) {
            const clampedStartEpochSec = clampIntlSampleEpochSec(startEpochSec);
            const clampedEndEpochSec = clampIntlSampleEpochSec(endEpochSec);
            const startOffsetSec = getSample(clampedStartEpochSec);
            const endOffsetSec = getSample(clampedEndEpochSec);
            if (startOffsetSec !== endOffsetSec) {
              const split = getSplit(clampedStartEpochSec, clampedEndEpochSec);
              pinch(split, startOffsetSec, endOffsetSec);
              const transitionEpochSec = split[0];
              if ((compareNumbers(transitionEpochSec, epochSec) || 1) === direction) {
                return transitionEpochSec;
              }
            }
            startEpochSec += inc, endEpochSec += inc;
          }
        }
      };
    })(/* @__PURE__ */ ((format2) => (epochSec) => {
      const intlParts = formatEpochMilliToPartsRecord(format2, 1e3 * epochSec);
      return 86400 * isoPartsToEpochDays(((intlParts2) => {
        const relatedYear = intlParts2.relatedYear;
        if (void 0 !== relatedYear) {
          return parseInt(relatedYear);
        }
        const year = parseInt(intlParts2.year);
        return void 0 !== intlParts2.era && "bce" === normalizeEraName(intlParts2.era) ? 1 - year : year;
      })(intlParts), parseInt(intlParts.month), parseInt(intlParts.day)) + 3600 * parseInt(intlParts.hour) + 60 * parseInt(intlParts.minute) + parseInt(intlParts.second) - epochSec;
    })(format), ((timeZoneId) => {
      const timeZoneName = timeZoneId.split("/").pop();
      return timeZonePeriodDaysByName[timeZoneName] || 60;
    })(id));
  }
  B(epochNano) {
    return this.oe.ze(((epochNano2) => epochNanoToSecMod(epochNano2)[0])(epochNano)) * nanoInSec2;
  }
  R(isoDateTime) {
    const zonedEpochSec = 86400 * isoDateToEpochDays(isoDateTime) + timeFieldsToSec(isoDateTime);
    const subsecNano = timeFieldsToSubsecNano(isoDateTime);
    return this.oe.Ae(zonedEpochSec).map((epochSec) => checkEpochNanoInBounds(BigInt(epochSec) * bigNanoInSec + BigInt(subsecNano)));
  }
  C(epochNano, direction) {
    const [epochSec, subsecNano] = epochNanoToSecMod(epochNano);
    const resEpochSec = this.oe.C(epochSec + (direction > 0 || subsecNano ? 1 : 0), direction);
    if (void 0 !== resEpochSec) {
      return BigInt(resEpochSec) * bigNanoInSec;
    }
  }
};
function getCurrentEpochSec() {
  return Math.floor(Date.now() / 1e3);
}
function createSplitTuple(startEpochSec, endEpochSec) {
  return [startEpochSec, endEpochSec];
}
function computePeriod(epochSec, periodSec) {
  const startEpochSec = Math.floor(epochSec / periodSec) * periodSec;
  return [startEpochSec, startEpochSec + periodSec];
}
function clampIntlSampleEpochSec(epochSec) {
  return constrainToRange2(epochSec, -1e10, 864e10);
}
function refineMaybeZonedDateTimeObjectLike(refineTimeZoneString, calendar, bag) {
  const fields = readAndRefineBagFields(bag, getCalendarFieldNames(calendar, dateTimeAndZoneFieldNamesAlpha, dateTimeAndZoneFieldNamesWithEraAlpha), zonedDateTimeFieldRefiners, [], 0);
  const isZoned = void 0 !== fields.timeZone;
  const [year, monthCodeParts] = refineCalendarDateFields(fields, calendar);
  const isoDate = createDateFromRefinedFields(fields, calendar, year, monthCodeParts, 0);
  if (isZoned) {
    const timeFields = resolveTimeFields(fields);
    const timeZone = queryTimeZone(refineTimeZoneString(fields.timeZone));
    return {
      epochNanoseconds: getMatchingInstantFor(timeZone, combineDateAndTime(isoDate, timeFields), fields.offset),
      timeZone,
      calendar
    };
  }
  return isoDate;
}
function refineZonedDateTimeObjectLike(refineTimeZoneString, calendar, bag, options) {
  const fields = readAndRefineBagFields(bag, getCalendarFieldNames(calendar, dateTimeAndZoneFieldNamesAlpha, dateTimeAndZoneFieldNamesWithEraAlpha), zonedDateTimeFieldRefiners, timeZoneFieldNames, 0);
  const timeZoneId = refineTimeZoneString(fields.timeZone);
  const [year, monthCodeParts] = refineCalendarDateFields(fields, calendar);
  const [overflow, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options);
  const isoDate = createDateFromRefinedFields(fields, calendar, year, monthCodeParts, overflow);
  const timeFields = resolveTimeFields(fields, overflow);
  const timeZone = queryTimeZone(timeZoneId);
  return createZonedEpochNanoSlots(getMatchingInstantFor(timeZone, combineDateAndTime(isoDate, timeFields), fields.offset, offsetDisambig, epochDisambig), timeZone, calendar);
}
function refinePlainDateTimeObjectLike(calendar, bag, options) {
  const fields = readAndRefineBagFields(bag, getCalendarFieldNames(calendar, dateTimeFieldNamesAlpha, dateTimeFieldNamesWithEraAlpha), dateTimeFieldRefiners, [], 0);
  const [year, monthCodeParts] = refineCalendarDateFields(fields, calendar);
  const overflow = refineOverflowOptions(options);
  return createDateTimeFromRefinedFields(createDateFromRefinedFields(fields, calendar, year, monthCodeParts, overflow), resolveTimeFields(fields, overflow), calendar);
}
function refinePlainDateObjectLike(calendar, bag, options, requireFields = []) {
  const fields = readAndRefineBagFields(bag, getCalendarFieldNames(calendar, dateFieldNamesAlpha, dateFieldNamesWithEraAlpha), dateFieldRefiners, requireFields);
  const [year, monthCodeParts] = refineCalendarDateFields(fields, calendar);
  return createDateFromRefinedFields(fields, calendar, year, monthCodeParts, refineOverflowOptions(options));
}
function refinePlainYearMonthObjectLike(calendar, bag, options, requireFields) {
  const fields = readAndRefineBagFields(bag, getCalendarFieldNames(calendar, yearMonthFieldNamesAlpha, yearMonthFieldNamesWithEraAlpha), dateFieldRefiners, requireFields);
  const [year, monthCodeParts] = refineCalendarDateFields(fields, calendar, 1);
  return createYearMonthFromRefinedFields(fields, calendar, year, monthCodeParts, refineOverflowOptions(options));
}
function refinePlainMonthDayObjectLike(calendar, calendarAbsent, bag, options) {
  const fields = readAndRefineBagFields(bag, getCalendarFieldNames(calendar, dateFieldNamesAlpha, dateFieldNamesWithEraAlpha), dateFieldRefiners, dayFieldNamesAsc, 0);
  calendarAbsent && void 0 !== fields.month && void 0 === fields.monthCode && void 0 === fields.year && (fields.year = 1972);
  const [year, monthCodeParts] = refineMonthDayFields(fields, calendar);
  return createMonthDayFromRefinedFields(fields, calendar, year, monthCodeParts, refineOverflowOptions(options));
}
function refinePlainTimeObjectLike(bag, options) {
  return resolveTimeFields(readAndRefineBagFields(bag, timeFieldNamesAlpha, timeFieldRefiners, [], 1), refineOverflowOptions(options));
}
function refineDurationObjectLike(bag) {
  const durationFields = readAndRefineBagFields(bag, durationFieldNamesAlpha, durationFieldRefiners);
  return createDurationSlots(validateDurationFields({
    ...durationFieldDefaults,
    ...durationFields
  }));
}
function throwFailedParse(s) {
  throwRangeError(failedParse(s));
}
function parseInstant(s) {
  const organized = parseDateTimeLike(s = requireString(toPrimitiveWithStringHint(s)));
  let offsetNano;
  return organized || throwFailedParse(s), organized.F ? offsetNano = 0 : organized.offset ? offsetNano = parseOffsetNano(organized.offset) : throwFailedParse(s), organized.timeZoneId && parseOffsetNanoMaybe(organized.timeZoneId, 1), validateIsoDateTimeFields(organized), createEpochNanoSlots(isoDateTimeAndOffsetToEpochNano(organized, offsetNano));
}
function parseRelativeToSlots(s, resolveCalendar) {
  const organized = parseDateTimeLike(requireString(s));
  return organized || throwFailedParse(s), organized.timeZoneId ? finalizeZonedDateTime(organized, resolveCalendar, void 0) : (organized.F && throwFailedParse(s), finalizeDate(organized, resolveCalendar));
}
function parseZonedDateTime(s, resolveCalendar, options) {
  const organized = parseDateTimeLike(requireString(s));
  return organized && organized.timeZoneId || throwFailedParse(s), finalizeZonedDateTime(organized, resolveCalendar, options);
}
function parsePlainDateTime(s, resolveCalendar) {
  const organized = parseDateTimeLike(requireString(s));
  return organized && !organized.F || throwFailedParse(s), finalizeDateTime(organized, resolveCalendar);
}
function parsePlainDate(s, resolveCalendar) {
  const slots = finalizeDateLike(parsePlainDateLike(requireString(s)), void 0, resolveCalendar);
  return createDateSlots(slots, slots.calendar);
}
function parsePlainYearMonth(s, resolveCalendar) {
  const organized = parseYearMonthOnly(requireString(s));
  if (organized) {
    return requireIsoCalendar(organized), createDateSlots(checkIsoYearMonthInBounds(validateIsoDateFields(organized)), resolveCalendar(organized.calendarId));
  }
  const dateSlots = finalizeDateLike(parsePlainDateLike(s), projectIsoYearMonthDate, resolveCalendar);
  const { calendar } = dateSlots;
  return createDateSlots(moveToStartOfMonth(calendar, dateSlots), calendar);
}
function requireIsoCalendar(organized) {
  "iso8601" !== organized.calendarId && throwRangeError(invalidSubstring(organized.calendarId));
}
function parsePlainMonthDay(s, resolveCalendar) {
  const organized = parseMonthDayOnly(requireString(s));
  if (organized) {
    return requireIsoCalendar(organized), createDateSlots(validateIsoDateFields(organized), resolveCalendar(organized.calendarId));
  }
  const dateSlots = finalizeDateLike(parsePlainDateLike(s), projectIsoMonthDayDate, resolveCalendar);
  const { calendar } = dateSlots;
  const { year: origYear, month: origMonth, day } = computeCalendarDateFields(calendar, dateSlots);
  const [monthCodeNumber, isLeapMonth] = computeCalendarMonthCodeParts(calendar, origYear, origMonth);
  const { year, month } = ((calendar2, monthCodeNumber2, isLeapMonth2, day2) => {
    const yearMonthFields = calendar2 ? calendar2.u(monthCodeNumber2, isLeapMonth2, day2) : computeIsoYearMonthFieldsForMonthDay(monthCodeNumber2, isLeapMonth2);
    return yearMonthFields || throwRangeError("Cannot guess year"), yearMonthFields;
  })(calendar, monthCodeNumber, isLeapMonth, day);
  return createDateSlots(checkIsoDateInBounds(computeCalendarIsoFieldsFromParts(calendar, year, month, day)), calendar);
}
function parsePlainTime(s) {
  let organized = ((s2) => {
    const parts = parseTimeOnlyParts(s2);
    return parts ? (organizeAnnotationParts(parts[13]), organizeTimeParts(parts, 1)) : void 0;
  })(s = requireString(s));
  if (!organized) {
    const dateTime = parseDateTimeLike(s);
    dateTime && dateTime.te || throwFailedParse(s), dateTime.F && throwRangeError(invalidSubstring("Z")), requireIsoCalendar(dateTime), organized = dateTime;
  }
  let altParsed;
  return (altParsed = parseYearMonthOnly(s)) && isIsoDateFieldsValid(altParsed) && throwFailedParse(s), (altParsed = parseMonthDayOnly(s)) && isIsoDateFieldsValid(altParsed) && throwFailedParse(s), createTimeSlots(validateTimeFields(organized));
}
function parseDuration(s) {
  const parts = durationRegExp.exec(requireString(s));
  return parts || throwFailedParse(s), createDurationSlots(validateDurationFields(((parts2) => {
    let hasAny = 0;
    let hasAnyFrac = 0;
    let leftoverNano = 0;
    let durationFields = {
      years: parseUnit(parts2[2]),
      months: parseUnit(parts2[3]),
      weeks: parseUnit(parts2[4]),
      days: parseUnit(parts2[5]),
      hours: parseUnit(parts2[6], parts2[7], 5),
      minutes: parseUnit(parts2[8], parts2[9], 4),
      seconds: parseUnit(parts2[10], parts2[11], 3),
      ...nanoToGivenFields(leftoverNano, 2, durationFieldNamesAsc)
    };
    return hasAny || throwRangeError(noValidFields(durationFieldNamesAsc)), parseSign(parts2[1]) < 0 && (durationFields = negateDurationFields(durationFields)), durationFields;
    function parseUnit(wholeStr, fracStr, timeUnit) {
      let leftoverUnits = 0;
      let wholeUnits = 0;
      return timeUnit && ([leftoverUnits, leftoverNano] = divModFloor(leftoverNano, unitNanoMap[timeUnit])), void 0 !== wholeStr && (hasAnyFrac && throwRangeError(invalidSubstring(wholeStr)), wholeUnits = ((s2) => {
        const n = parseInt(s2);
        return Number.isFinite(n) || throwRangeError(invalidSubstring(s2)), n;
      })(wholeStr), hasAny = 1, fracStr && (leftoverNano = parseSubsecNano(fracStr) * (unitNanoMap[timeUnit] / nanoInSec2), hasAnyFrac = 1)), leftoverUnits + wholeUnits;
    }
  })(parts)));
}
function parseCalendarId(s) {
  const res = parseDateTimeLike(s) || parseYearMonthOnly(s) || parseMonthDayOnly(s);
  if (res) {
    return res.calendarId;
  }
  const timeParts = parseTimeOnlyParts(s);
  return timeParts ? organizeAnnotationParts(timeParts[13]).calendarId : s;
}
function parseTimeZoneId(s) {
  const parsed = parseDateTimeLike(s);
  return parsed && (parsed.timeZoneId || parsed.F && "UTC" || parsed.offset) || s;
}
function parsePlainDateLike(s) {
  const organized = parseDateTimeLike(s);
  return organized && !organized.F || throwFailedParse(s), organized;
}
function finalizeDateLike(organized, isoDateProjector, resolveCalendar) {
  return isoDateProjector && "iso8601" === organized.calendarId ? (validateIsoDateFields(organized), organized.te && validateTimeFields(organized), finalizeDate(isoDateProjector(organized), resolveCalendar)) : organized.te ? finalizeDateTime(organized, resolveCalendar) : finalizeDate(organized, resolveCalendar);
}
function projectIsoYearMonthDate(organized) {
  const day = 12 * organized.year + organized.month === isoYearMonthIndexMin ? 20 : 1;
  return {
    ...organized,
    day
  };
}
function projectIsoMonthDayDate(organized) {
  return {
    ...organized,
    year: 1972
  };
}
function finalizeZonedDateTime(organized, resolveCalendar, options) {
  const timeZone = queryTimeZone(resolveTimeZoneId(organized.timeZoneId));
  let epochNano;
  if (validateIsoDateTimeFields(organized), organized.te) {
    const offsetNano = organized.offset ? parseOffsetNano(organized.offset) : void 0;
    const [, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options);
    epochNano = getMatchingInstantFor(timeZone, organized, offsetNano, offsetDisambig, epochDisambig, !(timeZone.Z || void 0 === organized.offset || (offset = organized.offset, offset.replace(/\D/g, "").length > 4)), organized.F);
  } else {
    refineZonedFieldOptions(options), epochNano = getStartOfDayInstantFor(timeZone, organized);
  }
  var offset;
  return checkEpochNanoInBounds(epochNano), createZonedEpochNanoSlots(epochNano, timeZone, resolveCalendar(organized.calendarId));
}
function finalizeDateTime(organized, resolveCalendar) {
  return validateIsoDateTimeFields(organized), checkIsoDateTimeInBounds(organized), {
    ...combineDateAndTime(organized, organized),
    calendar: resolveCalendar(organized.calendarId)
  };
}
function finalizeDate(organized, resolveCalendar) {
  return validateIsoDateFields(organized), checkIsoDateInBounds(organized), {
    calendar: resolveCalendar(organized.calendarId),
    year: organized.year,
    month: organized.month,
    day: organized.day
  };
}
function timeRegExpStr(separatorIndex) {
  return `(\\d{2})(?:(:?)(\\d{2})(?:\\${separatorIndex}(\\d{2})(?:[.,](\\d{1,9}))?)?)?`;
}
var dateTimeRegExpStr = "(?:(?:([+-])(\\d{6}))|(\\d{4}))(-?)(\\d{2})\\4(\\d{2})(?:[T ]" + timeRegExpStr(8) + "(Z|([+-])" + timeRegExpStr(15) + ")?)?";
var yearMonthRegExp = /* @__PURE__ */ createRegExp("(?:(?:([+-])(\\d{6}))|(\\d{4}))-?(\\d{2})((?:\\[(!?)([^\\]]*)\\]){0,9})");
var monthDayRegExp = /* @__PURE__ */ createRegExp("(?:--)?(\\d{2})-?(\\d{2})((?:\\[(!?)([^\\]]*)\\]){0,9})");
var dateTimeRegExp = /* @__PURE__ */ createRegExp(dateTimeRegExpStr + "((?:\\[(!?)([^\\]]*)\\]){0,9})");
var timeRegExp = /* @__PURE__ */ createRegExp("T?" + timeRegExpStr(2) + `(([+-])${timeRegExpStr(9)})?((?:\\[(!?)([^\\]]*)\\]){0,9})`);
var annotationRegExp = /* @__PURE__ */ new RegExp("\\[(!?)([^\\]]*)\\]", "g");
var durationRegExp = /* @__PURE__ */ createRegExp("([+-])?P(\\d+Y)?(\\d+M)?(\\d+W)?(\\d+D)?(?:T(?!$)(?:(\\d+)(?:[.,](\\d{1,9}))?H)?(?:(\\d+)(?:[.,](\\d{1,9}))?M)?(?:(\\d+)(?:[.,](\\d{1,9}))?S)?)?");
function parseDateTimeLike(s) {
  const parts = dateTimeRegExp.exec(s);
  return parts ? ((parts2) => {
    const zOrOffset = parts2[12];
    const hasZ = "Z" === (zOrOffset || "").toUpperCase();
    return {
      year: organizeIsoYearParts(parts2),
      month: parseInt(parts2[5]),
      day: parseInt(parts2[6]),
      ...organizeTimeParts(parts2, 7),
      ...organizeAnnotationParts(parts2[19]),
      te: Boolean(parts2[7]),
      F: hasZ,
      offset: hasZ ? void 0 : zOrOffset
    };
  })(parts) : void 0;
}
function parseYearMonthOnly(s) {
  const parts = yearMonthRegExp.exec(s);
  if (parts) {
    return ((parts2) => ({
      year: organizeIsoYearParts(parts2),
      month: parseInt(parts2[4]),
      day: 1,
      ...organizeAnnotationParts(parts2[5])
    }))(parts);
  }
}
function parseMonthDayOnly(s) {
  const parts = monthDayRegExp.exec(s);
  return parts ? ((parts2) => ({
    year: 1972,
    month: parseInt(parts2[1]),
    day: parseInt(parts2[2]),
    ...organizeAnnotationParts(parts2[3])
  }))(parts) : void 0;
}
function parseTimeOnlyParts(s) {
  const parts = timeRegExp.exec(s);
  if (parts) {
    return parts[6] && parseOffsetNano(parts[6]), parts;
  }
}
function organizeTimeParts(parts, hourIndex) {
  const second = parseInt0(parts[hourIndex + 3]);
  return {
    ...nanoToTimeAndDay(parseSubsecNano(parts[hourIndex + 4] || ""))[0],
    hour: parseInt0(parts[hourIndex]),
    minute: parseInt0(parts[hourIndex + 2]),
    second: 60 === second ? 59 : second
  };
}
function organizeIsoYearParts(parts) {
  const yearSign = parseSign(parts[1]);
  const year = parseInt(parts[2] || parts[3]);
  return yearSign < 0 && !year && throwRangeError(invalidSubstring(-0)), yearSign * year;
}
function organizeAnnotationParts(s) {
  let calendarIsCritical;
  let timeZoneId;
  const calendarIds = [];
  return s.replace(annotationRegExp, (whole, criticalStr, mainStr) => {
    const isCritical = Boolean(criticalStr);
    const [val, name] = mainStr.split("=").reverse();
    return name ? "u-ca" === name ? (calendarIds.push(val.toLowerCase()), calendarIsCritical || (calendarIsCritical = isCritical)) : (isCritical || /[A-Z]/.test(name)) && throwRangeError(invalidSubstring(whole)) : (timeZoneId && throwRangeError(invalidSubstring(whole)), timeZoneId = val), "";
  }), calendarIds.length > 1 && calendarIsCritical && throwRangeError(invalidSubstring(s)), {
    timeZoneId,
    calendarId: calendarIds[0] || "iso8601"
  };
}
function mergeCalendarFields(calendar, baseFields, additionalFields) {
  const merged = Object.assign(/* @__PURE__ */ Object.create(null), baseFields);
  return spliceFields(merged, additionalFields, monthFieldNames), getCalendarEraOrigins(calendar) && (spliceFields(merged, additionalFields, allYearFieldNames), calendar && calendar.je && spliceFields(merged, additionalFields, monthDayFieldNames, eraYearFieldNames)), merged;
}
function spliceFields(dest, additional, allPropNames, deletablePropNames) {
  let anyMatching = 0;
  const nonMatchingPropNames = [];
  for (const propName of allPropNames) {
    void 0 !== additional[propName] ? anyMatching = 1 : nonMatchingPropNames.push(propName);
  }
  if (Object.assign(dest, additional), anyMatching) {
    for (const deletablePropName of deletablePropNames || nonMatchingPropNames) {
      delete dest[deletablePropName];
    }
  }
}
function mergeZonedDateTimeFields(calendar, zonedDateTimeSlots, modFields) {
  const validFieldNames = getCalendarFieldNames(calendar, dateTimeAndOffsetFieldNamesAlpha, dateTimeAndOffsetFieldNamesWithEraAlpha);
  const zonedSlots = zonedEpochSlotsToIso(zonedDateTimeSlots);
  const { year, month, day } = computeCalendarDateFields(calendar, zonedSlots);
  const origFields = {
    year,
    monthCode: computeMonthCode(calendar, year, month),
    day,
    hour: zonedSlots.hour,
    minute: zonedSlots.minute,
    second: zonedSlots.second,
    millisecond: zonedSlots.millisecond,
    microsecond: zonedSlots.microsecond,
    nanosecond: zonedSlots.nanosecond,
    offset: zonedSlots.offsetNanoseconds
  };
  const partialFields = readAndRefineBagFields(modFields, validFieldNames, zonedDateTimeFieldRefiners);
  const mergedCalendarFields = mergeCalendarFields(calendar, origFields, partialFields);
  return [{
    ...origFields,
    ...partialFields
  }, mergedCalendarFields];
}
function mergeDateTimeFields(calendar, plainDateTimeSlots, modFields) {
  const validFieldNames = getCalendarFieldNames(calendar, dateTimeFieldNamesAlpha, dateTimeFieldNamesWithEraAlpha);
  const { year, month, day } = computeCalendarDateFields(calendar, plainDateTimeSlots);
  const origFields = {
    year,
    monthCode: computeMonthCode(calendar, year, month),
    day,
    hour: plainDateTimeSlots.hour,
    minute: plainDateTimeSlots.minute,
    second: plainDateTimeSlots.second,
    millisecond: plainDateTimeSlots.millisecond,
    microsecond: plainDateTimeSlots.microsecond,
    nanosecond: plainDateTimeSlots.nanosecond
  };
  const partialFields = readAndRefineBagFields(modFields, validFieldNames, dateTimeFieldRefiners);
  const mergedCalendarFields = mergeCalendarFields(calendar, origFields, partialFields);
  return [{
    ...origFields,
    ...partialFields
  }, mergedCalendarFields];
}
function mergeDateFields(calendar, plainDateSlots, modFields) {
  const validFieldNames = getCalendarFieldNames(calendar, dateFieldNamesAlpha, dateFieldNamesWithEraAlpha);
  const { year, month, day } = computeCalendarDateFields(calendar, plainDateSlots);
  return mergeCalendarFields(calendar, {
    year,
    monthCode: computeMonthCode(calendar, year, month),
    day
  }, readAndRefineBagFields(modFields, validFieldNames, dateFieldRefiners));
}
function mergeYearMonthFields(calendar, plainYearMonthSlots, modFields) {
  const validFieldNames = getCalendarFieldNames(calendar, yearMonthFieldNamesAlpha, yearMonthFieldNamesWithEraAlpha);
  const { year, month } = computeCalendarDateFields(calendar, plainYearMonthSlots);
  return mergeCalendarFields(calendar, {
    year,
    monthCode: computeMonthCode(calendar, year, month)
  }, readAndRefineBagFields(modFields, validFieldNames, dateFieldRefiners));
}
function mergeMonthDayFields(calendar, plainMonthDaySlots, modFields) {
  const validFieldNames = getCalendarFieldNames(calendar, dateFieldNamesAlpha, dateFieldNamesWithEraAlpha);
  const { year, month, day } = computeCalendarDateFields(calendar, plainMonthDaySlots);
  return mergeCalendarFields(calendar, {
    monthCode: computeMonthCode(calendar, year, month),
    day
  }, readAndRefineBagFields(modFields, validFieldNames, dateFieldRefiners));
}
function createZonedDateTimeFromMergedFields(zonedDateTimeSlots, mergedAllFields, calendarFields, year, monthCodeParts, overflow, offsetDisambig, epochDisambig) {
  const { calendar, timeZone } = zonedDateTimeSlots;
  return createZonedEpochNanoSlots(getMatchingInstantFor(timeZone, combineDateAndTime(createDateFromRefinedFields(calendarFields, calendar, year, monthCodeParts, overflow), constrainTimeFields(mergedAllFields, overflow)), mergedAllFields.offset, offsetDisambig, epochDisambig), timeZone, calendar);
}
function createDateTimeFromMergedFields(mergedAllFields, calendarFields, calendar, year, monthCodeParts, overflow) {
  return createDateTimeFromRefinedFields(createDateFromRefinedFields(calendarFields, calendar, year, monthCodeParts, overflow), constrainTimeFields(mergedAllFields, overflow), calendar);
}
function mergeTimeFields(initialFields, modFields) {
  return {
    ...pluckProps(timeFieldNamesAlpha, initialFields),
    ...readAndRefineBagFields(modFields, timeFieldNamesAlpha, timeFieldRefiners)
  };
}
function mergeDurationFields(slots, fields) {
  return createDurationSlots((initialFields = slots, modFields = fields, validateDurationFields({
    ...initialFields,
    ...readAndRefineBagFields(modFields, durationFieldNamesAlpha, durationFieldRefiners)
  })));
  var initialFields, modFields;
}
function computeMonthCode(calendar, year, month) {
  const [monthCodeNumber, isLeapMonth] = computeCalendarMonthCodeParts(calendar, year, month);
  return formatMonthCode(monthCodeNumber, isLeapMonth);
}
function totalDuration(refineRelativeTo, slots, options) {
  const [totalUnit, relativeToSlots] = ((options2, refineRelativeTo2) => {
    const relativeToInternals = refineRelativeTo2((options2 = normalizeOptionsOrString(options2, "unit")).relativeTo);
    let totalUnit2 = coerceTotalUnit(options2);
    return totalUnit2 = requirePropDefined("unit", totalUnit2), [totalUnit2, relativeToInternals];
  })(options, refineRelativeTo);
  const maxDurationUnit = getMaxDurationUnit(slots);
  const maxUnit = Math.max(totalUnit, maxDurationUnit);
  const isZoned = relativeToSlots && isZonedEpochSlots(relativeToSlots);
  if (!relativeToSlots && isUniformUnit(maxUnit, isZoned)) {
    return totalDayTimeDuration(slots, totalUnit);
  }
  if (relativeToSlots || throwRangeError("Missing relativeTo"), !slots.sign && (!isZoned || totalUnit < 6)) {
    return 0;
  }
  const [balancedDuration, endEpochNano, relativeOps] = spanRelativeDuration(relativeToSlots, slots, totalUnit);
  return isUniformUnit(totalUnit, isZoned) ? totalDayTimeDuration(balancedDuration, totalUnit) : ((durationFields, endEpochNano2, totalUnit2, relativeOps2) => {
    const fieldName = durationFieldNamesAsc[totalUnit2];
    const baseDurationFields = clearDurationFields(totalUnit2, durationFields);
    return totalRelativeUnit(durationFields[fieldName], computeDurationSign(durationFields) || 1, endEpochNano2, (value) => (baseDurationFields[fieldName] = value, moveRelativeMarkerToEpochNano(relativeOps2, baseDurationFields)));
  })(balancedDuration, endEpochNano, totalUnit, relativeOps);
}
function totalDayTimeDuration(durationFields, totalUnit) {
  return divideBigNanoToExactNumber(durationDayTimeToBigNano(durationFields), unitNanoMap[totalUnit]);
}
function instantToZonedDateTime(instantSlots, timeZone, calendar) {
  return createZonedEpochNanoSlots(instantSlots.epochNanoseconds, timeZone, calendar);
}
function zonedDateTimeToInstant(zonedDateTimeSlots0) {
  return createEpochNanoSlots(zonedDateTimeSlots0.epochNanoseconds);
}
function zonedDateTimeToDateTime(zonedDateTimeSlots0) {
  return createDateTimeSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0), zonedDateTimeSlots0.calendar);
}
function zonedDateTimeToDate(zonedDateTimeSlots0) {
  return createDateSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0), zonedDateTimeSlots0.calendar);
}
function zonedDateTimeToTime(zonedDateTimeSlots0) {
  return createTimeSlots(zonedEpochSlotsToIso(zonedDateTimeSlots0));
}
function dateTimeToZonedDateTime(plainDateTimeSlots, timeZone, epochDisambig) {
  return createZonedEpochNanoSlots(checkEpochNanoInBounds(getSingleInstantFor(timeZone, plainDateTimeSlots, epochDisambig)), timeZone, plainDateTimeSlots.calendar);
}
function dateToZonedDateTime(plainDateSlots, timeZone, timeFields) {
  let epochNano;
  return epochNano = timeFields ? getSingleInstantFor(timeZone, combineDateAndTime(plainDateSlots, timeFields)) : getStartOfDayInstantFor(timeZone, combineDateAndTime(plainDateSlots, timeFieldDefaults)), createZonedEpochNanoSlots(epochNano, timeZone, plainDateSlots.calendar);
}
function yearMonthToDate(calendar, input, bag) {
  return mergeFieldsIntoDate(calendar, pluckProps(getCalendarFieldNames(calendar, yearMonthCodeFieldNamesAlpha, yearMonthCodeFieldNamesWithEraAlpha), input), readAndRefineBagFields(requireObjectLike(bag), dayFieldNamesAsc, dateFieldRefiners, []));
}
function monthDayToDate(calendar, input, bag) {
  const extraFieldNames = getCalendarFieldNames(calendar, yearFieldNamesAsc, yearFieldNamesWithEraAlpha);
  return mergeFieldsIntoDate(calendar, pluckProps(monthCodeDayFieldNamesAlpha, input), readAndRefineBagFields(requireObjectLike(bag), extraFieldNames, dateFieldRefiners, []));
}
function fieldsToMonthDay(calendar, input) {
  const refinedFields = readAndRefineBagFields(input, monthCodeDayFieldNamesAlpha, dateFieldRefiners);
  const [year, monthCodeParts] = refineMonthDayFields(refinedFields, calendar);
  return createMonthDayFromRefinedFields(refinedFields, calendar, year, monthCodeParts, 0);
}
function fieldsToYearMonth(calendar, input) {
  const refinedFields = readAndRefineBagFields(input, getCalendarFieldNames(calendar, yearMonthCodeFieldNamesAlpha, yearMonthCodeFieldNamesWithEraAlpha), dateFieldRefiners);
  const [year, monthCodeParts] = refineCalendarDateFields(refinedFields, calendar, 1);
  return createYearMonthFromRefinedFields(refinedFields, calendar, year, monthCodeParts, 0);
}
function mergeFieldsIntoDate(calendar, inputFields, extraFields) {
  const mergedFieldNames = getCalendarFieldNames(calendar, yearMonthCodeDayFieldNamesAlpha, yearMonthCodeDayFieldNamesWithEraAlpha);
  let mergedFields = mergeCalendarFields(calendar, inputFields, extraFields);
  mergedFields = readAndRefineBagFields(mergedFields, mergedFieldNames, dateFieldRefiners, []);
  const [year, monthCodeParts] = refineCalendarDateFields(mergedFields, calendar);
  return createDateFromRefinedFields(mergedFields, calendar, year, monthCodeParts, 0);
}
function epochMilliToInstant(epochMilli) {
  return createEpochNanoSlots(checkEpochNanoInBounds(BigInt(toStrictInteger(epochMilli)) * bigNanoInMilli));
}
function epochNanoToInstant(epochNano) {
  return createEpochNanoSlots(checkEpochNanoInBounds(toBigInt(epochNano)));
}
function applyPlainFormatTimeZone(options) {
  return options.timeZone = "UTC", ["full", "long"].includes(options.timeStyle) && (options.timeStyle = "medium"), options;
}
function applyZonedFormatTimeZone(options, timeZoneId) {
  return void 0 !== options.timeZone && throwTypeError("Cannot specify TimeZone"), options.timeZone = timeZoneId, options;
}
function checkResolvedCalendarCompatible(format, slots, strictCalendarCheck) {
  const resolvedCalendarId = format.resolvedOptions().calendar;
  !strictCalendarCheck && slots.calendar === isoCalendarImpl || getCalendarSlotId(slots.calendar) === resolvedCalendarId || throwRangeError("Mismatching Calendars");
}
function createOptionsTransformer(shapeFieldNames, invalidShapeFieldNames, ignoredFieldNames, defaultShapeFields, dateStyleReplacementFields) {
  const shapeFieldNameSet = new Set(shapeFieldNames);
  const invalidShapeFieldNameSet = new Set(invalidShapeFieldNames);
  const ignoredFieldNameSet = new Set(ignoredFieldNames);
  return (options, allowPartialOverlap) => {
    let dateStyle;
    let timeStyle;
    const granularShapeFields = {};
    const modifierFields = {};
    const otherFields = {};
    let hasInvalidGranularShapeFields = 0;
    let hasInvalidStyleFields = 0;
    for (const name of Object.keys(options)) {
      const value = options[name];
      void 0 === value || ignoredFieldNameSet.has(name) || (shapeFieldNameSet.has(name) ? "dateStyle" === name ? dateStyle = value : "timeStyle" === name ? timeStyle = value : granularShapeFields[name] = value : "era" === name ? modifierFields[name] = value : invalidShapeFieldNameSet.has(name) ? "dateStyle" === name || "timeStyle" === name ? hasInvalidStyleFields = 1 : hasInvalidGranularShapeFields = 1 : otherFields[name] = value);
    }
    const hasDateStyle = void 0 !== dateStyle;
    const hasTimeStyle = void 0 !== timeStyle;
    const hasAnyStyle = hasDateStyle || hasTimeStyle;
    const hasGranularShapeFields = Object.keys(granularShapeFields).length > 0;
    const hasInvalids = hasInvalidGranularShapeFields || hasInvalidStyleFields;
    const hasShapeFields = hasGranularShapeFields || hasDateStyle || hasTimeStyle;
    const hasModifierFields = Object.keys(modifierFields).length > 0;
    (!allowPartialOverlap && hasInvalids || allowPartialOverlap && hasInvalids && !hasShapeFields || hasAnyStyle && (hasGranularShapeFields || hasModifierFields || hasInvalidGranularShapeFields)) && throwTypeError("Invalid formatting options");
    const transformedOptions = {};
    return hasAnyStyle || hasShapeFields || Object.assign(transformedOptions, defaultShapeFields), Object.assign(transformedOptions, granularShapeFields, modifierFields, otherFields), hasDateStyle && (dateStyleReplacementFields ? Object.assign(transformedOptions, dateStyleReplacementFields[dateStyle]) : transformedOptions.dateStyle = dateStyle), hasTimeStyle && (transformedOptions.timeStyle = timeStyle), transformedOptions;
  };
}
var dateDefaultShapeFields = {
  year: "numeric",
  month: "numeric",
  day: "numeric"
};
var timeDefaultShapeFields = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
};
var dateTimeDefaultShapeFields = /* @__PURE__ */ Object.assign({}, dateDefaultShapeFields, timeDefaultShapeFields);
var dateShapeFieldNames = ["weekday", "year", "month", "day", "dateStyle"];
var timeShapeFieldNames = ["dayPeriod", "hour", "minute", "second", "fractionalSecondDigits", "timeStyle"];
var dateTimeShapeFieldNames = /* @__PURE__ */ dateShapeFieldNames.concat(timeShapeFieldNames);
var yearMonthIgnoredFieldNames = /* @__PURE__ */ ["weekday", "day"].concat(timeShapeFieldNames);
var monthDayIgnoredFieldNames = /* @__PURE__ */ ["weekday", "year"].concat(timeShapeFieldNames);
var transformInstantOptions = /* @__PURE__ */ createOptionsTransformer(dateTimeShapeFieldNames, [], [], dateTimeDefaultShapeFields);
var transformZonedOptions = /* @__PURE__ */ createOptionsTransformer(dateTimeShapeFieldNames, [], [], {
  ...dateTimeDefaultShapeFields,
  timeZoneName: "short"
});
var transformDateTimeOptions = /* @__PURE__ */ createOptionsTransformer(dateTimeShapeFieldNames, [], ["timeZoneName"], dateTimeDefaultShapeFields);
var transformDateOptions = /* @__PURE__ */ createOptionsTransformer(dateShapeFieldNames, timeShapeFieldNames, ["timeZoneName"], dateDefaultShapeFields);
var transformTimeOptions = /* @__PURE__ */ createOptionsTransformer(timeShapeFieldNames, dateShapeFieldNames, ["timeZoneName", "era"], timeDefaultShapeFields);
var transformYearMonthOptions = /* @__PURE__ */ createOptionsTransformer(["year", "month", "dateStyle"], yearMonthIgnoredFieldNames, ["timeZoneName"], {
  year: "numeric",
  month: "numeric"
}, {
  full: {
    year: "numeric",
    month: "long"
  },
  long: {
    year: "numeric",
    month: "long"
  },
  medium: {
    year: "numeric",
    month: "short"
  },
  short: {
    year: "2-digit",
    month: "numeric"
  }
});
var transformMonthDayOptions = /* @__PURE__ */ createOptionsTransformer(["month", "day", "dateStyle"], monthDayIgnoredFieldNames, ["timeZoneName", "era"], {
  month: "numeric",
  day: "numeric"
}, {
  full: {
    month: "long",
    day: "numeric"
  },
  long: {
    month: "long",
    day: "numeric"
  },
  medium: {
    month: "short",
    day: "numeric"
  },
  short: {
    month: "numeric",
    day: "numeric"
  }
});
function zonedDateTimeWithPlainTime(zonedDateTimeSlots, plainTimeFields) {
  const { timeZone } = zonedDateTimeSlots;
  const isoDateTime = zonedEpochSlotsToIso(zonedDateTimeSlots);
  const { offsetNanoseconds } = isoDateTime;
  const time = plainTimeFields || timeFieldDefaults;
  let epochNano;
  return epochNano = plainTimeFields ? getMatchingInstantFor(timeZone, combineDateAndTime(isoDateTime, time), offsetNanoseconds, 2) : getStartOfDayInstantFor(timeZone, combineDateAndTime(isoDateTime, time)), createZonedEpochNanoSlots(epochNano, timeZone, zonedDateTimeSlots.calendar);
}
function refineDirectionOptions(options) {
  const normalizedOptions = normalizeOptionsOrString(options, "direction");
  const res = coerceDirection(normalizedOptions, 0);
  return res || throwRangeError(invalidEntity2("direction", res)), res;
}
function getCurrentIsoDateTime(timeZone) {
  const epochNano = getCurrentEpochNano();
  const offsetNano = timeZone.B(epochNano);
  return epochNanoToIsoDateTime(epochNano + BigInt(offsetNano));
}
function getCurrentEpochNano() {
  return BigInt(Date.now()) * bigNanoInMilli;
}
function getCurrentTimeZoneId() {
  return new RawDateTimeFormat().resolvedOptions().timeZone;
}

// node_modules/temporal-polyfill/chunks/apiHelpers.js
init_define_process_env();
var PlainYearMonthBranding = "PlainYearMonth";
var PlainMonthDayBranding = "PlainMonthDay";
var PlainDateBranding = "PlainDate";
var PlainDateTimeBranding = "PlainDateTime";
var PlainTimeBranding = "PlainTime";
var ZonedDateTimeBranding = "ZonedDateTime";
var InstantBranding = "Instant";
var DurationBranding = "Duration";
function defineTemporalClass(branding, cls, getSlots, ...getterMaps) {
  return Object.defineProperties(cls, createNameDescriptors(branding)), Object.defineProperties(cls.prototype, createStringTagDescriptors("Temporal." + branding)), Object.defineProperties(cls.prototype, mapProps((getter) => ({
    get() {
      return getter(getSlots(this));
    },
    configurable: 1
  }), Object.assign({}, ...getterMaps))), cls;
}
var attachDebugString = "noop" === noop.name ? (instance) => {
  Object.defineProperty(instance, "_str_", {
    value: instance.toJSON()
  });
} : noop;
function invalidRecordType() {
  throwTypeError(invalidCallingContext);
}
function forbiddenValueOf2() {
  throwTypeError(forbiddenValueOf);
}
var yearMonthFieldGetters$1 = {
  era(slots) {
    return computeCalendarEraFields(slots.calendar, slots).era;
  },
  eraYear(slots) {
    return computeCalendarEraFields(slots.calendar, slots).eraYear;
  },
  year(slots) {
    return computeCalendarDateFields(slots.calendar, slots).year;
  },
  month(slots) {
    return computeCalendarDateFields(slots.calendar, slots).month;
  },
  monthCode(slots) {
    return computeCalendarMonthCode(slots.calendar, slots);
  }
};
var dateFieldGetters$1 = {
  era(slots) {
    return computeCalendarEraFields(slots.calendar, slots).era;
  },
  eraYear(slots) {
    return computeCalendarEraFields(slots.calendar, slots).eraYear;
  },
  year(slots) {
    return computeCalendarDateFields(slots.calendar, slots).year;
  },
  month(slots) {
    return computeCalendarDateFields(slots.calendar, slots).month;
  },
  monthCode(slots) {
    return computeCalendarMonthCode(slots.calendar, slots);
  },
  day(slots) {
    return computeCalendarDateFields(slots.calendar, slots).day;
  }
};
var monthDayFieldGetters$1 = {
  monthCode(slots) {
    return computeCalendarMonthCode(slots.calendar, slots);
  },
  day(slots) {
    return computeCalendarDateFields(slots.calendar, slots).day;
  }
};
var yearMonthDerivedGetters = {
  daysInMonth(slots) {
    return computeCalendarDaysInMonth(slots.calendar, slots);
  },
  daysInYear(slots) {
    return computeCalendarDaysInYear(slots.calendar, slots);
  },
  monthsInYear(slots) {
    return computeCalendarMonthsInYear(slots.calendar, slots);
  },
  inLeapYear(slots) {
    return computeCalendarInLeapYear(slots.calendar, slots);
  }
};
var dateDerivedGetters = {
  dayOfWeek(slots) {
    return computeIsoDayOfWeek(slots);
  },
  dayOfYear(slots) {
    return computeCalendarDayOfYear(slots.calendar, slots);
  },
  weekOfYear(slots) {
    return computeCalendarWeekOfYear(slots.calendar, slots);
  },
  yearOfWeek(slots) {
    return computeCalendarYearOfWeek(slots.calendar, slots);
  },
  daysInWeek() {
    return 7;
  },
  daysInMonth(slots) {
    return computeCalendarDaysInMonth(slots.calendar, slots);
  },
  daysInYear(slots) {
    return computeCalendarDaysInYear(slots.calendar, slots);
  },
  monthsInYear(slots) {
    return computeCalendarMonthsInYear(slots.calendar, slots);
  },
  inLeapYear(slots) {
    return computeCalendarInLeapYear(slots.calendar, slots);
  }
};
function diffInstants(invert, instantSlots0, instantSlots1, options) {
  const [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, options, 3, 5);
  return createDiffDurationSlots(invert, diffEpochNanosRounded(instantSlots0.epochNanoseconds, instantSlots1.epochNanoseconds, largestUnit, smallestUnit, roundingInc, roundingMode));
}
function diffZonedDateTimes(invert, slots0, slots1, options) {
  const calendar = getCommonCalendar(slots0.calendar, slots1.calendar);
  const [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, options, 5);
  return createDiffDurationSlots(invert, diffZonedDateTimesRounded(calendar, slots0, slots1, largestUnit, smallestUnit, roundingInc, roundingMode));
}
function diffDateTimes(invert, plainDateTimeSlots0, plainDateTimeSlots1, options) {
  const calendar = getCommonCalendar(plainDateTimeSlots0.calendar, plainDateTimeSlots1.calendar);
  const [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, options, 6);
  return createDiffDurationSlots(invert, diffDateTimesRounded(calendar, plainDateTimeSlots0, plainDateTimeSlots1, largestUnit, smallestUnit, roundingInc, roundingMode));
}
function diffDates(invert, plainDateSlots0, plainDateSlots1, options) {
  const calendar = getCommonCalendar(plainDateSlots0.calendar, plainDateSlots1.calendar);
  const [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, options, 6, 9, 6);
  return createDiffDurationSlots(invert, diffDatesRounded(calendar, plainDateSlots0, plainDateSlots1, largestUnit, smallestUnit, roundingInc, roundingMode));
}
function diffYearMonths(invert, plainYearMonthSlots0, plainYearMonthSlots1, options) {
  const calendar = getCommonCalendar(plainYearMonthSlots0.calendar, plainYearMonthSlots1.calendar);
  const [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, options, 9, 9, 8);
  return createDiffDurationSlots(invert, diffYearMonthsRounded(calendar, plainYearMonthSlots0, plainYearMonthSlots1, largestUnit, smallestUnit, roundingInc, roundingMode));
}
function diffTimes(invert, plainTimeSlots0, plainTimeSlots1, options) {
  const [largestUnit, smallestUnit, roundingInc, roundingMode] = refineDiffOptions(invert, options, 5, 5);
  return createDiffDurationSlots(invert, diffTimesRounded(plainTimeSlots0, plainTimeSlots1, largestUnit, smallestUnit, roundingInc, roundingMode));
}
function createDiffDurationSlots(invert, durationFields) {
  return createDurationSlots(invert ? negateDurationFields(durationFields) : durationFields);
}
function withDateFields(slots, modFields, options) {
  const { calendar } = slots;
  const fields = mergeDateFields(calendar, slots, modFields);
  const [year, monthCodeParts] = refineCalendarDateFields(fields, calendar);
  const overflow = refineOverflowOptions(options);
  return createDateFromRefinedFields(fields, calendar, year, monthCodeParts, overflow);
}
function withDateTimeFields(slots, modFields, options) {
  const { calendar } = slots;
  const [mergedFields, calendarFields] = mergeDateTimeFields(calendar, slots, modFields);
  const [year, monthCodeParts] = refineCalendarDateFields(calendarFields, calendar);
  const overflow = refineOverflowOptions(options);
  return createDateTimeFromMergedFields(mergedFields, calendarFields, calendar, year, monthCodeParts, overflow);
}
function withYearMonthFields(slots, modFields, options) {
  const { calendar } = slots;
  const fields = mergeYearMonthFields(calendar, slots, modFields);
  const [year, monthCodeParts] = refineCalendarDateFields(fields, calendar, 1);
  const overflow = refineOverflowOptions(options);
  return createYearMonthFromRefinedFields(fields, calendar, year, monthCodeParts, overflow);
}
function withMonthDayFields(slots, modFields, options) {
  const { calendar } = slots;
  const fields = mergeMonthDayFields(calendar, slots, modFields);
  const [year, monthCodeParts] = refineMonthDayFields(fields, calendar);
  const overflow = refineOverflowOptions(options);
  return createMonthDayFromRefinedFields(fields, calendar, year, monthCodeParts, overflow);
}
function withTimeFields(slots, modFields, options) {
  const refinedFields = mergeTimeFields(slots, modFields);
  const overflow = refineOverflowOptions(options);
  return resolveTimeFields(refinedFields, overflow);
}
function withZonedDateTimeFields(slots, modFields, options) {
  const { calendar } = slots;
  const [mergedFields, calendarFields] = mergeZonedDateTimeFields(calendar, slots, modFields);
  const [year, monthCodeParts] = refineCalendarDateFields(calendarFields, calendar);
  const [overflow, offsetDisambig, epochDisambig] = refineZonedFieldOptions(options, 2);
  return createZonedDateTimeFromMergedFields(slots, mergedFields, calendarFields, year, monthCodeParts, overflow, offsetDisambig, epochDisambig);
}

// node_modules/temporal-polyfill/chunks/classApi-basic.js
function resolveBasicCalendarId(rawCalendarId) {
  const lowerRawCalendarId = requireString(rawCalendarId).toLowerCase();
  return lowerRawCalendarId === isoCalendarId ? isoCalendarImpl : lowerRawCalendarId === gregoryCalendarId ? gregoryCalendarImpl : void throwRangeError(exoticCalendarRequired(rawCalendarId, "temporal-polyfill/full"));
}
function resolveBasicCalendarArg(rawCalendarId = isoCalendarId) {
  return resolveBasicCalendarId(rawCalendarId);
}
var zonedDateTimeSlotsMap = /* @__PURE__ */ new WeakMap();
var ZonedDateTime = /* @__PURE__ */ defineTemporalClass(ZonedDateTimeBranding, class {
  constructor(epochNanoseconds, timeZoneId, calendar = void 0) {
    const epochNano = checkEpochNanoInBounds(toBigInt(epochNanoseconds));
    const timeZone = queryTimeZone(refineTimeZoneId(timeZoneId));
    const calendarImpl = resolveBasicCalendarArg(calendar);
    initZonedDateTime(this, createZonedEpochNanoSlots(epochNano, timeZone, calendarImpl));
  }
  static from(arg, options = void 0) {
    return createZonedDateTime(toZonedDateTimeSlots(arg, options));
  }
  static compare(arg0, arg1) {
    return compareZonedEpochSlots(toZonedDateTimeSlots(arg0), toZonedDateTimeSlots(arg1));
  }
  get calendarId() {
    return getCalendarSlotId(getZonedDateTimeSlots(this).calendar);
  }
  get timeZoneId() {
    return getZonedDateTimeSlots(this).timeZone.id;
  }
  get epochMilliseconds() {
    return epochNanoToMilli(getZonedDateTimeSlots(this).epochNanoseconds);
  }
  get epochNanoseconds() {
    return getZonedDateTimeSlots(this).epochNanoseconds;
  }
  get offset() {
    return formatOffsetNano(zonedEpochSlotsToIso(getZonedDateTimeSlots(this)).offsetNanoseconds);
  }
  get offsetNanoseconds() {
    return zonedEpochSlotsToIso(getZonedDateTimeSlots(this)).offsetNanoseconds;
  }
  get hoursInDay() {
    return computeZonedHoursInDay(getZonedDateTimeSlots(this));
  }
  with(mod, options = void 0) {
    return createZonedDateTime(withZonedDateTimeFields(getZonedDateTimeSlots(this), validateBag(mod), options));
  }
  withCalendar(calendarArg) {
    return createZonedDateTime({
      ...getZonedDateTimeSlots(this),
      calendar: refineCalendarArg(calendarArg)
    });
  }
  withTimeZone(timeZoneArg) {
    return createZonedDateTime({
      ...getZonedDateTimeSlots(this),
      timeZone: queryTimeZone(refineTimeZoneArg(timeZoneArg))
    });
  }
  withPlainTime(plainTimeArg = void 0) {
    return createZonedDateTime(zonedDateTimeWithPlainTime(getZonedDateTimeSlots(this), optionalToPlainTimeFields(plainTimeArg)));
  }
  add(durationArg, options = void 0) {
    const slots = getZonedDateTimeSlots(this);
    return createZonedDateTime(moveZonedEpochSlots(slots, toDurationSlots(durationArg), refineOverflowOptions(options)));
  }
  subtract(durationArg, options = void 0) {
    const slots = getZonedDateTimeSlots(this);
    return createZonedDateTime(moveZonedEpochSlots(slots, negateDurationFields(toDurationSlots(durationArg)), refineOverflowOptions(options)));
  }
  until(otherArg, options = void 0) {
    const slots = getZonedDateTimeSlots(this);
    const other = toZonedDateTimeSlots(otherArg);
    return createDuration(diffZonedDateTimes(0, slots, other, options));
  }
  since(otherArg, options = void 0) {
    const slots = getZonedDateTimeSlots(this);
    const other = toZonedDateTimeSlots(otherArg);
    return createDuration(diffZonedDateTimes(1, slots, other, options));
  }
  round(options) {
    const slots = getZonedDateTimeSlots(this);
    const [smallestUnit, roundingInc, roundingMode] = refineRoundingOptions(options);
    return createZonedDateTime(roundZonedEpochSlotsToUnit(slots, smallestUnit, roundingInc, roundingMode));
  }
  startOfDay() {
    return createZonedDateTime(computeZonedStartOfDay(getZonedDateTimeSlots(this)));
  }
  equals(otherArg) {
    return zonedDateTimesEqual(getZonedDateTimeSlots(this), toZonedDateTimeSlots(otherArg));
  }
  toInstant() {
    return createInstant(zonedDateTimeToInstant(getZonedDateTimeSlots(this)));
  }
  toPlainDateTime() {
    return createPlainDateTime(zonedDateTimeToDateTime(getZonedDateTimeSlots(this)));
  }
  toPlainDate() {
    return createPlainDate(zonedDateTimeToDate(getZonedDateTimeSlots(this)));
  }
  toPlainTime() {
    return createPlainTime(zonedDateTimeToTime(getZonedDateTimeSlots(this)));
  }
  toLocaleString(locales = void 0, options = {}) {
    const slots = getZonedDateTimeSlots(this);
    const format = new RawDateTimeFormat(locales, applyZonedFormatTimeZone(transformZonedOptions(options), getZonedTimeZoneId(slots)));
    return checkResolvedCalendarCompatible(format, slots), format.format(epochNanoToMilli(slots.epochNanoseconds));
  }
  toString(options = void 0) {
    return formatZonedDateTimeIso(getZonedDateTimeSlots(this), options);
  }
  toJSON() {
    return formatZonedDateTimeIso(getZonedDateTimeSlots(this));
  }
  getTimeZoneTransition(options) {
    const slots = getZonedDateTimeSlots(this);
    const newEpochNano = slots.timeZone.C(slots.epochNanoseconds, refineDirectionOptions(options));
    return void 0 !== newEpochNano ? createZonedDateTime({
      ...slots,
      epochNanoseconds: newEpochNano
    }) : null;
  }
  valueOf() {
    return forbiddenValueOf2();
  }
}, getZonedDateTimeIsoSlots, dateFieldGetters$1, dateDerivedGetters, timeGetters);
function createZonedDateTime(slots) {
  return initZonedDateTime(Object.create(ZonedDateTime.prototype), slots);
}
function getZonedDateTimeSlots(obj) {
  return getZonedDateTimeSlotsIfPresent(obj) || invalidRecordType();
}
function getZonedDateTimeIsoSlots(obj) {
  const slots = getZonedDateTimeSlots(obj);
  return {
    ...zonedEpochSlotsToIso(slots),
    calendar: slots.calendar
  };
}
function getZonedDateTimeSlotsIfPresent(obj) {
  return zonedDateTimeSlotsMap.get(obj);
}
function toZonedDateTimeSlots(arg, options) {
  if (isObjectLike2(arg)) {
    const ownSlots = getZonedDateTimeSlotsIfPresent(arg);
    if (ownSlots) {
      return refineZonedFieldOptions(options), ownSlots;
    }
    const calendar = getCalendarFromBag(arg);
    return refineZonedDateTimeObjectLike(refineTimeZoneArg, calendar, arg, options);
  }
  return parseZonedDateTime(arg, resolveBasicCalendarId, options);
}
function initZonedDateTime(instance, slots) {
  return zonedDateTimeSlotsMap.set(instance, slots), attachDebugString(instance), instance;
}
function refineTimeZoneArg(arg) {
  if (isObjectLike2(arg)) {
    const slots = getZonedDateTimeSlotsIfPresent(arg);
    return slots || throwTypeError(invalidTimeZone(arg)), slots.timeZone.id;
  }
  return ((arg2) => resolveTimeZoneId(parseTimeZoneId(requireString(arg2))))(arg);
}
var instantSlotsMap = /* @__PURE__ */ new WeakMap();
var Instant = /* @__PURE__ */ defineTemporalClass(InstantBranding, class {
  constructor(epochNanoseconds) {
    const epochNano = checkEpochNanoInBounds(toBigInt(epochNanoseconds));
    initInstant(this, createEpochNanoSlots(epochNano));
  }
  static from(arg) {
    return createInstant(toInstantSlots(arg));
  }
  static fromEpochMilliseconds(epochMilli) {
    return createInstant(epochMilliToInstant(epochMilli));
  }
  static fromEpochNanoseconds(epochNano) {
    return createInstant(epochNanoToInstant(epochNano));
  }
  static compare(a, b) {
    return compareZonedEpochSlots(toInstantSlots(a), toInstantSlots(b));
  }
  get epochMilliseconds() {
    return epochNanoToMilli(getInstantSlots(this).epochNanoseconds);
  }
  get epochNanoseconds() {
    return getInstantSlots(this).epochNanoseconds;
  }
  add(durationArg) {
    const slots = getInstantSlots(this);
    return createInstant(createEpochNanoSlots(moveEpochNano(slots.epochNanoseconds, toDurationSlots(durationArg))));
  }
  subtract(durationArg) {
    const slots = getInstantSlots(this);
    return createInstant(createEpochNanoSlots(moveEpochNano(slots.epochNanoseconds, negateDurationFields(toDurationSlots(durationArg)))));
  }
  until(otherArg, options = void 0) {
    return createDuration(diffInstants(0, getInstantSlots(this), toInstantSlots(otherArg), options));
  }
  since(otherArg, options = void 0) {
    return createDuration(diffInstants(1, getInstantSlots(this), toInstantSlots(otherArg), options));
  }
  round(options) {
    const slots = getInstantSlots(this);
    const [smallestUnit, roundingInc, roundingMode] = refineRoundingOptions(options, 5, 1);
    return createInstant(createEpochNanoSlots(roundBigNanoToDayOriginInc(slots.epochNanoseconds, computeBigNanoInc(smallestUnit, roundingInc), roundingMode)));
  }
  equals(otherArg) {
    return instantsEqual(getInstantSlots(this), toInstantSlots(otherArg));
  }
  toZonedDateTimeISO(timeZoneArg) {
    return createZonedDateTime(instantToZonedDateTime(getInstantSlots(this), queryTimeZone(refineTimeZoneArg(timeZoneArg))));
  }
  toLocaleString(locales = void 0, options = {}) {
    const slots = getInstantSlots(this);
    return new RawDateTimeFormat(locales, transformInstantOptions(options)).format(epochNanoToMilli(slots.epochNanoseconds));
  }
  toString(options = void 0) {
    return formatInstantIso(refineTimeZoneArg, getInstantSlots(this), options);
  }
  toJSON() {
    return formatInstantIso(refineTimeZoneArg, getInstantSlots(this));
  }
  valueOf() {
    return forbiddenValueOf2();
  }
});
function createInstant(slots) {
  return initInstant(Object.create(Instant.prototype), slots);
}
function getInstantSlots(obj) {
  return getInstantSlotsIfPresent(obj) || invalidRecordType();
}
function getInstantSlotsIfPresent(obj) {
  return instantSlotsMap.get(obj);
}
function toInstantSlots(arg) {
  if (isObjectLike2(arg)) {
    const ownSlots = getInstantSlotsIfPresent(arg);
    if (ownSlots) {
      return ownSlots;
    }
    const zonedDateTimeSlots = getZonedDateTimeSlotsIfPresent(arg);
    if (zonedDateTimeSlots) {
      return createEpochNanoSlots(zonedDateTimeSlots.epochNanoseconds);
    }
  }
  return parseInstant(arg);
}
var { toTemporalInstant } = {
  toTemporalInstant() {
    const epochMilli = Date.prototype.valueOf.call(this);
    return createInstant(createEpochNanoSlots(BigInt(requireNumberIsInteger(epochMilli)) * bigNanoInMilli));
  }
};
function initInstant(instance, slots) {
  return instantSlotsMap.set(instance, slots), attachDebugString(instance), instance;
}
var plainMonthDaySlotsMap = /* @__PURE__ */ new WeakMap();
var PlainMonthDay = /* @__PURE__ */ defineTemporalClass(PlainMonthDayBranding, class {
  constructor(isoMonth, isoDay, calendar = void 0, referenceIsoYear) {
    const isoMonthInt = toIntegerWithTrunc(isoMonth);
    const isoDayInt = toIntegerWithTrunc(isoDay);
    const calendarImpl = resolveBasicCalendarArg(calendar);
    const isoYearInt = toIntegerWithTrunc(referenceIsoYear ?? isoEpochFirstLeapYear);
    const fields = checkIsoDateInBounds(validateIsoDateFields({
      year: isoYearInt,
      month: isoMonthInt,
      day: isoDayInt
    }));
    initPlainMonthDay(this, createDateSlots(fields, calendarImpl));
  }
  static from(arg, options = void 0) {
    return createPlainMonthDay(toPlainMonthDaySlots(arg, options));
  }
  get calendarId() {
    return getCalendarSlotId(getPlainMonthDaySlots(this).calendar);
  }
  with(mod, options = void 0) {
    return createPlainMonthDay(withMonthDayFields(getPlainMonthDaySlots(this), validateBag(mod), options));
  }
  equals(otherArg) {
    return plainMonthDaysEqual(getPlainMonthDaySlots(this), toPlainMonthDaySlots(otherArg));
  }
  toPlainDate(bag) {
    const slots = getPlainMonthDaySlots(this);
    return createPlainDate(monthDayToDate(slots.calendar, this, bag));
  }
  toLocaleString(locales = void 0, options = {}) {
    const slots = getPlainMonthDaySlots(this);
    const format = new RawDateTimeFormat(locales, applyPlainFormatTimeZone(transformMonthDayOptions(options)));
    return checkResolvedCalendarCompatible(format, slots, 1), format.format(isoDateToEpochMilli(slots));
  }
  toString(options = void 0) {
    return formatPlainMonthDayIso(getPlainMonthDaySlots(this), options);
  }
  toJSON() {
    return formatPlainMonthDayIso(getPlainMonthDaySlots(this));
  }
  valueOf() {
    return forbiddenValueOf2();
  }
}, getPlainMonthDaySlots, monthDayFieldGetters$1);
function createPlainMonthDay(slots) {
  return initPlainMonthDay(Object.create(PlainMonthDay.prototype), slots);
}
function getPlainMonthDaySlots(obj) {
  return getPlainMonthDaySlotsIfPresent(obj) || invalidRecordType();
}
function getPlainMonthDaySlotsIfPresent(obj) {
  return plainMonthDaySlotsMap.get(obj);
}
function toPlainMonthDaySlots(arg, options) {
  if (isObjectLike2(arg)) {
    const ownSlots = getPlainMonthDaySlotsIfPresent(arg);
    if (ownSlots) {
      return refineOverflowOptions(options), ownSlots;
    }
    const calendarMaybe = extractCalendarFromBag(arg);
    return refinePlainMonthDayObjectLike(void 0 === calendarMaybe ? isoCalendarImpl : calendarMaybe, void 0 === calendarMaybe, arg, options);
  }
  const res = parsePlainMonthDay(arg, resolveBasicCalendarId);
  return refineOverflowOptions(options), res;
}
function initPlainMonthDay(instance, slots) {
  return plainMonthDaySlotsMap.set(instance, slots), attachDebugString(instance), instance;
}
var plainYearMonthSlotsMap = /* @__PURE__ */ new WeakMap();
var PlainYearMonth = /* @__PURE__ */ defineTemporalClass(PlainYearMonthBranding, class {
  constructor(isoYear, isoMonth, calendar = void 0, referenceIsoDay) {
    const isoYearInt = toIntegerWithTrunc(isoYear);
    const isoMonthInt = toIntegerWithTrunc(isoMonth);
    const calendarImpl = resolveBasicCalendarArg(calendar);
    const isoDayInt = toIntegerWithTrunc(referenceIsoDay ?? 1);
    const fields = checkIsoYearMonthInBounds(validateIsoDateFields({
      year: isoYearInt,
      month: isoMonthInt,
      day: isoDayInt
    }));
    initPlainYearMonth(this, createDateSlots(fields, calendarImpl));
  }
  static from(arg, options = void 0) {
    return createPlainYearMonth(toPlainYearMonthSlots(arg, options));
  }
  static compare(arg0, arg1) {
    return compareIsoDateFields(toPlainYearMonthSlots(arg0), toPlainYearMonthSlots(arg1));
  }
  get calendarId() {
    return getCalendarSlotId(getPlainYearMonthSlots(this).calendar);
  }
  with(mod, options = void 0) {
    return createPlainYearMonth(withYearMonthFields(getPlainYearMonthSlots(this), validateBag(mod), options));
  }
  add(durationArg, options = void 0) {
    const slots = getPlainYearMonthSlots(this);
    return createPlainYearMonth(createDateSlots(moveYearMonth(slots.calendar, slots, toDurationSlots(durationArg), refineOverflowOptions(options)), slots.calendar));
  }
  subtract(durationArg, options = void 0) {
    const slots = getPlainYearMonthSlots(this);
    return createPlainYearMonth(createDateSlots(moveYearMonth(slots.calendar, slots, negateDurationFields(toDurationSlots(durationArg)), refineOverflowOptions(options)), slots.calendar));
  }
  until(otherArg, options = void 0) {
    const slots = getPlainYearMonthSlots(this);
    const other = toPlainYearMonthSlots(otherArg);
    return createDuration(diffYearMonths(0, slots, other, options));
  }
  since(otherArg, options = void 0) {
    const slots = getPlainYearMonthSlots(this);
    const other = toPlainYearMonthSlots(otherArg);
    return createDuration(diffYearMonths(1, slots, other, options));
  }
  equals(otherArg) {
    return plainYearMonthsEqual(getPlainYearMonthSlots(this), toPlainYearMonthSlots(otherArg));
  }
  toPlainDate(bag) {
    const slots = getPlainYearMonthSlots(this);
    return createPlainDate(yearMonthToDate(slots.calendar, this, bag));
  }
  toLocaleString(locales = void 0, options = {}) {
    const slots = getPlainYearMonthSlots(this);
    const format = new RawDateTimeFormat(locales, applyPlainFormatTimeZone(transformYearMonthOptions(options)));
    return checkResolvedCalendarCompatible(format, slots, 1), format.format(isoDateToEpochMilli(slots));
  }
  toString(options = void 0) {
    return formatPlainYearMonthIso(getPlainYearMonthSlots(this), options);
  }
  toJSON() {
    return formatPlainYearMonthIso(getPlainYearMonthSlots(this));
  }
  valueOf() {
    return forbiddenValueOf2();
  }
}, getPlainYearMonthSlots, yearMonthFieldGetters$1, yearMonthDerivedGetters);
function createPlainYearMonth(slots) {
  return initPlainYearMonth(Object.create(PlainYearMonth.prototype), slots);
}
function getPlainYearMonthSlots(obj) {
  return getPlainYearMonthSlotsIfPresent(obj) || invalidRecordType();
}
function getPlainYearMonthSlotsIfPresent(obj) {
  return plainYearMonthSlotsMap.get(obj);
}
function toPlainYearMonthSlots(arg, options) {
  if (isObjectLike2(arg)) {
    const ownSlots = getPlainYearMonthSlotsIfPresent(arg);
    if (ownSlots) {
      return refineOverflowOptions(options), ownSlots;
    }
    const calendar = getCalendarFromBag(arg);
    return refinePlainYearMonthObjectLike(calendar, arg, options);
  }
  const res = parsePlainYearMonth(arg, resolveBasicCalendarId);
  return refineOverflowOptions(options), res;
}
function initPlainYearMonth(instance, slots) {
  return plainYearMonthSlotsMap.set(instance, slots), attachDebugString(instance), instance;
}
function getTemporalBrandingAndSlots(obj) {
  if (!isObjectLike2(obj)) {
    return;
  }
  let slots = getInstantSlotsIfPresent(obj);
  return slots ? [InstantBranding, slots] : (slots = getZonedDateTimeSlotsIfPresent(obj), slots ? [ZonedDateTimeBranding, slots] : (slots = getPlainDateTimeSlotsIfPresent(obj), slots ? [PlainDateTimeBranding, slots] : (slots = getPlainDateSlotsIfPresent(obj), slots ? [PlainDateBranding, slots] : (slots = getPlainTimeSlotsIfPresent(obj), slots ? [PlainTimeBranding, slots] : (slots = getPlainYearMonthSlotsIfPresent(obj), slots ? [PlainYearMonthBranding, slots] : (slots = getPlainMonthDaySlotsIfPresent(obj), slots ? [PlainMonthDayBranding, slots] : (slots = getDurationSlotsIfPresent(obj), slots ? [DurationBranding, slots] : void 0)))))));
}
function validateBag(bag) {
  return (getTemporalBrandingAndSlots(bag) || void 0 !== bag.calendar || void 0 !== bag.timeZone) && throwTypeError(invalidBag), bag;
}
var plainTimeSlotsMap = /* @__PURE__ */ new WeakMap();
var PlainTime = /* @__PURE__ */ defineTemporalClass(PlainTimeBranding, class {
  constructor(hour = 0, minute = 0, second = 0, millisecond = 0, microsecond = 0, nanosecond = 0) {
    const fields = validateTimeFields(mapProps(toIntegerWithTrunc, {
      hour,
      minute,
      second,
      millisecond,
      microsecond,
      nanosecond
    }));
    initPlainTime(this, createTimeSlots(fields));
  }
  static from(arg, options = void 0) {
    return createPlainTime(toPlainTimeSlots(arg, options));
  }
  static compare(arg0, arg1) {
    return compareTimeFields(toPlainTimeSlots(arg0), toPlainTimeSlots(arg1));
  }
  with(mod, options = void 0) {
    return createPlainTime(withTimeFields(getPlainTimeSlots(this), validateBag(mod), options));
  }
  add(durationArg) {
    const slots = getPlainTimeSlots(this);
    return createPlainTime(moveTime(slots, toDurationSlots(durationArg))[0]);
  }
  subtract(durationArg) {
    const slots = getPlainTimeSlots(this);
    return createPlainTime(moveTime(slots, negateDurationFields(toDurationSlots(durationArg)))[0]);
  }
  until(otherArg, options = void 0) {
    return createDuration(diffTimes(0, getPlainTimeSlots(this), toPlainTimeSlots(otherArg), options));
  }
  since(otherArg, options = void 0) {
    return createDuration(diffTimes(1, getPlainTimeSlots(this), toPlainTimeSlots(otherArg), options));
  }
  round(options) {
    const slots = getPlainTimeSlots(this);
    const [smallestUnit, roundingInc, roundingMode] = refineRoundingOptions(options, 5);
    return createPlainTime(roundTimeToInc(slots, computeNanoInc(smallestUnit, roundingInc), roundingMode)[0]);
  }
  equals(other) {
    return plainTimesEqual(getPlainTimeSlots(this), toPlainTimeSlots(other));
  }
  toLocaleString(locales = void 0, options = {}) {
    const slots = getPlainTimeSlots(this);
    return new RawDateTimeFormat(locales, applyPlainFormatTimeZone(transformTimeOptions(options))).format(timeFieldsToMilli(slots));
  }
  toString(options = void 0) {
    return formatPlainTimeIso(getPlainTimeSlots(this), options);
  }
  toJSON() {
    return formatPlainTimeIso(getPlainTimeSlots(this));
  }
  valueOf() {
    return forbiddenValueOf2();
  }
}, getPlainTimeSlots, timeGetters);
function createPlainTime(slots) {
  return initPlainTime(Object.create(PlainTime.prototype), slots);
}
function getPlainTimeSlots(obj) {
  return getPlainTimeSlotsIfPresent(obj) || invalidRecordType();
}
function getPlainTimeSlotsIfPresent(obj) {
  return plainTimeSlotsMap.get(obj);
}
function toPlainTimeSlots(arg, options) {
  if (isObjectLike2(arg)) {
    const ownSlots = getPlainTimeSlotsIfPresent(arg);
    if (ownSlots) {
      return refineOverflowOptions(options), ownSlots;
    }
    const dateTimeSlots = getPlainDateTimeSlotsIfPresent(arg);
    if (dateTimeSlots) {
      return refineOverflowOptions(options), createTimeSlots(dateTimeSlots);
    }
    const zonedDateTimeSlots = getZonedDateTimeSlotsIfPresent(arg);
    return zonedDateTimeSlots ? (refineOverflowOptions(options), zonedDateTimeToTime(zonedDateTimeSlots)) : refinePlainTimeObjectLike(arg, options);
  }
  const timeSlots = parsePlainTime(arg);
  return refineOverflowOptions(options), timeSlots;
}
function optionalToPlainTimeFields(timeArg) {
  return void 0 === timeArg ? void 0 : toPlainTimeSlots(timeArg);
}
function initPlainTime(instance, slots) {
  return plainTimeSlotsMap.set(instance, slots), attachDebugString(instance), instance;
}
var plainDateTimeSlotsMap = /* @__PURE__ */ new WeakMap();
var PlainDateTime = /* @__PURE__ */ defineTemporalClass(PlainDateTimeBranding, class {
  constructor(isoYear, isoMonth, isoDay, hour = 0, minute = 0, second = 0, millisecond = 0, microsecond = 0, nanosecond = 0, calendar = void 0) {
    const fields = checkIsoDateTimeInBounds(validateIsoDateTimeFields(mapProps(toIntegerWithTrunc, {
      year: isoYear,
      month: isoMonth,
      day: isoDay,
      hour,
      minute,
      second,
      millisecond,
      microsecond,
      nanosecond
    })));
    const calendarImpl = resolveBasicCalendarArg(calendar);
    initPlainDateTime(this, createDateTimeSlots(fields, calendarImpl));
  }
  static from(arg, options = void 0) {
    return createPlainDateTime(toPlainDateTimeSlots(arg, options));
  }
  static compare(arg0, arg1) {
    const slots0 = toPlainDateTimeSlots(arg0);
    const slots1 = toPlainDateTimeSlots(arg1);
    return compareIsoDateTimeFields(slots0, slots1);
  }
  get calendarId() {
    return getCalendarSlotId(getPlainDateTimeSlots(this).calendar);
  }
  with(mod, options = void 0) {
    return createPlainDateTime(withDateTimeFields(getPlainDateTimeSlots(this), validateBag(mod), options));
  }
  withCalendar(calendarArg) {
    const slots = getPlainDateTimeSlots(this);
    return createPlainDateTime(createDateTimeSlots(slots, refineCalendarArg(calendarArg)));
  }
  withPlainTime(plainTimeArg = void 0) {
    const slots = getPlainDateTimeSlots(this);
    return createPlainDateTime(createDateTimeFromRefinedFields(slots, optionalToPlainTimeFields(plainTimeArg), slots.calendar));
  }
  add(durationArg, options = void 0) {
    const slots = getPlainDateTimeSlots(this);
    return createPlainDateTime(createDateTimeSlots(moveDateTime(slots.calendar, slots, toDurationSlots(durationArg), refineOverflowOptions(options)), slots.calendar));
  }
  subtract(durationArg, options = void 0) {
    const slots = getPlainDateTimeSlots(this);
    return createPlainDateTime(createDateTimeSlots(moveDateTime(slots.calendar, slots, negateDurationFields(toDurationSlots(durationArg)), refineOverflowOptions(options)), slots.calendar));
  }
  until(otherArg, options = void 0) {
    const slots = getPlainDateTimeSlots(this);
    const other = toPlainDateTimeSlots(otherArg);
    return createDuration(diffDateTimes(0, slots, other, options));
  }
  since(otherArg, options = void 0) {
    const slots = getPlainDateTimeSlots(this);
    const other = toPlainDateTimeSlots(otherArg);
    return createDuration(diffDateTimes(1, slots, other, options));
  }
  round(options) {
    const slots = getPlainDateTimeSlots(this);
    const [smallestUnit, roundingInc, roundingMode] = refineRoundingOptions(options);
    return createPlainDateTime(createDateTimeSlots(roundDateTimeToInc(slots, computeNanoInc(smallestUnit, roundingInc), roundingMode), slots.calendar));
  }
  equals(otherArg) {
    return plainDateTimesEqual(getPlainDateTimeSlots(this), toPlainDateTimeSlots(otherArg));
  }
  toZonedDateTime(timeZoneArg, options = void 0) {
    return createZonedDateTime(dateTimeToZonedDateTime(getPlainDateTimeSlots(this), queryTimeZone(refineTimeZoneArg(timeZoneArg)), refineEpochDisambigOptions(options)));
  }
  toPlainDate() {
    const slots = getPlainDateTimeSlots(this);
    return createPlainDate(createDateSlots(slots, slots.calendar));
  }
  toPlainTime() {
    return createPlainTime(createTimeSlots(getPlainDateTimeSlots(this)));
  }
  toLocaleString(locales = void 0, options = {}) {
    const slots = getPlainDateTimeSlots(this);
    const format = new RawDateTimeFormat(locales, applyPlainFormatTimeZone(transformDateTimeOptions(options)));
    return checkResolvedCalendarCompatible(format, slots), format.format(isoDateTimeToEpochMilli(slots));
  }
  toString(options = void 0) {
    return formatPlainDateTimeIso(getPlainDateTimeSlots(this), options);
  }
  toJSON() {
    return formatPlainDateTimeIso(getPlainDateTimeSlots(this));
  }
  valueOf() {
    return forbiddenValueOf2();
  }
}, getPlainDateTimeSlots, dateFieldGetters$1, dateDerivedGetters, timeGetters);
function createPlainDateTime(slots) {
  return initPlainDateTime(Object.create(PlainDateTime.prototype), slots);
}
function getPlainDateTimeSlots(obj) {
  return getPlainDateTimeSlotsIfPresent(obj) || invalidRecordType();
}
function getPlainDateTimeSlotsIfPresent(obj) {
  return plainDateTimeSlotsMap.get(obj);
}
function toPlainDateTimeSlots(arg, options) {
  if (isObjectLike2(arg)) {
    const ownSlots = getPlainDateTimeSlotsIfPresent(arg);
    if (ownSlots) {
      return refineOverflowOptions(options), ownSlots;
    }
    const dateSlots = getPlainDateSlotsIfPresent(arg);
    if (dateSlots) {
      return refineOverflowOptions(options), createDateTimeSlots(combineDateAndTime(dateSlots, timeFieldDefaults), dateSlots.calendar);
    }
    const zonedDateTimeSlots = getZonedDateTimeSlotsIfPresent(arg);
    if (zonedDateTimeSlots) {
      return refineOverflowOptions(options), zonedDateTimeToDateTime(zonedDateTimeSlots);
    }
    const calendar = getCalendarFromBag(arg);
    return refinePlainDateTimeObjectLike(calendar, arg, options);
  }
  const res = parsePlainDateTime(arg, resolveBasicCalendarId);
  return refineOverflowOptions(options), res;
}
function initPlainDateTime(instance, slots) {
  return plainDateTimeSlotsMap.set(instance, slots), attachDebugString(instance), instance;
}
var plainDateSlotsMap = /* @__PURE__ */ new WeakMap();
var PlainDate = /* @__PURE__ */ defineTemporalClass(PlainDateBranding, class {
  constructor(isoYear, isoMonth, isoDay, calendar = void 0) {
    const fields = checkIsoDateInBounds(validateIsoDateFields(mapProps(toIntegerWithTrunc, {
      year: isoYear,
      month: isoMonth,
      day: isoDay
    })));
    const calendarImpl = resolveBasicCalendarArg(calendar);
    initPlainDate(this, createDateSlots(fields, calendarImpl));
  }
  static from(arg, options = void 0) {
    return createPlainDate(toPlainDateSlots(arg, options));
  }
  static compare(arg0, arg1) {
    return compareIsoDateFields(toPlainDateSlots(arg0), toPlainDateSlots(arg1));
  }
  get calendarId() {
    return getCalendarSlotId(getPlainDateSlots(this).calendar);
  }
  with(mod, options = void 0) {
    return createPlainDate(withDateFields(getPlainDateSlots(this), validateBag(mod), options));
  }
  withCalendar(calendarArg) {
    const slots = getPlainDateSlots(this);
    return createPlainDate(createDateSlots(slots, refineCalendarArg(calendarArg)));
  }
  add(durationArg, options = void 0) {
    const slots = getPlainDateSlots(this);
    return createPlainDate(createDateSlots(moveDate(slots.calendar, slots, toDurationSlots(durationArg), refineOverflowOptions(options)), slots.calendar));
  }
  subtract(durationArg, options = void 0) {
    const slots = getPlainDateSlots(this);
    return createPlainDate(createDateSlots(moveDate(slots.calendar, slots, negateDurationFields(toDurationSlots(durationArg)), refineOverflowOptions(options)), slots.calendar));
  }
  until(otherArg, options = void 0) {
    const slots = getPlainDateSlots(this);
    const other = toPlainDateSlots(otherArg);
    return createDuration(diffDates(0, slots, other, options));
  }
  since(otherArg, options = void 0) {
    const slots = getPlainDateSlots(this);
    const other = toPlainDateSlots(otherArg);
    return createDuration(diffDates(1, slots, other, options));
  }
  equals(otherArg) {
    return plainDatesEqual(getPlainDateSlots(this), toPlainDateSlots(otherArg));
  }
  toZonedDateTime(options) {
    const optionsObj = isObjectLike2(options) ? {
      timeZone: options.timeZone,
      plainTime: options.plainTime
    } : {
      timeZone: options
    };
    const slots = getPlainDateSlots(this);
    const timeZoneId = refineTimeZoneArg(optionsObj.timeZone);
    const plainTimeArg = optionsObj.plainTime;
    const timeFields = void 0 !== plainTimeArg ? toPlainTimeSlots(plainTimeArg) : void 0;
    return createZonedDateTime(dateToZonedDateTime(slots, queryTimeZone(timeZoneId), timeFields));
  }
  toPlainDateTime(plainTimeArg = void 0) {
    const slots = getPlainDateSlots(this);
    return createPlainDateTime(createDateTimeFromRefinedFields(slots, optionalToPlainTimeFields(plainTimeArg), slots.calendar));
  }
  toPlainYearMonth() {
    const slots = getPlainDateSlots(this);
    return createPlainYearMonth(fieldsToYearMonth(slots.calendar, this));
  }
  toPlainMonthDay() {
    const slots = getPlainDateSlots(this);
    return createPlainMonthDay(fieldsToMonthDay(slots.calendar, this));
  }
  toLocaleString(locales = void 0, options = {}) {
    const slots = getPlainDateSlots(this);
    const format = new RawDateTimeFormat(locales, applyPlainFormatTimeZone(transformDateOptions(options)));
    return checkResolvedCalendarCompatible(format, slots), format.format(isoDateToEpochMilli(slots));
  }
  toString(options = void 0) {
    return formatPlainDateIso(getPlainDateSlots(this), options);
  }
  toJSON() {
    return formatPlainDateIso(getPlainDateSlots(this));
  }
  valueOf() {
    return forbiddenValueOf2();
  }
}, getPlainDateSlots, dateFieldGetters$1, dateDerivedGetters);
function createPlainDate(slots) {
  return initPlainDate(Object.create(PlainDate.prototype), slots);
}
function getPlainDateSlots(obj) {
  return getPlainDateSlotsIfPresent(obj) || invalidRecordType();
}
function getPlainDateSlotsIfPresent(obj) {
  return plainDateSlotsMap.get(obj);
}
function toPlainDateSlots(arg, options) {
  if (isObjectLike2(arg)) {
    const ownSlots = getPlainDateSlotsIfPresent(arg);
    if (ownSlots) {
      return refineOverflowOptions(options), ownSlots;
    }
    const dateTimeSlots = getPlainDateTimeSlotsIfPresent(arg);
    if (dateTimeSlots) {
      return refineOverflowOptions(options), createDateSlots(dateTimeSlots, dateTimeSlots.calendar);
    }
    const zonedDateTimeSlots = getZonedDateTimeSlotsIfPresent(arg);
    if (zonedDateTimeSlots) {
      return refineOverflowOptions(options), zonedDateTimeToDate(zonedDateTimeSlots);
    }
    const calendar = getCalendarFromBag(arg);
    return refinePlainDateObjectLike(calendar, arg, options);
  }
  const res = parsePlainDate(arg, resolveBasicCalendarId);
  return refineOverflowOptions(options), res;
}
function initPlainDate(instance, slots) {
  return plainDateSlotsMap.set(instance, slots), attachDebugString(instance), instance;
}
function getCalendarFromBag(bag) {
  const calendar = extractCalendarFromBag(bag);
  return void 0 === calendar ? isoCalendarImpl : calendar;
}
function extractCalendarFromBag(bag) {
  const { calendar: calendarArg } = bag;
  if (void 0 !== calendarArg) {
    return refineCalendarArg(calendarArg);
  }
}
function refineCalendarArg(arg) {
  if (isObjectLike2(arg)) {
    const slots = getPlainDateSlotsIfPresent(arg) || getPlainDateTimeSlotsIfPresent(arg) || getZonedDateTimeSlotsIfPresent(arg) || getPlainMonthDaySlotsIfPresent(arg) || getPlainYearMonthSlotsIfPresent(arg);
    return slots || throwTypeError(invalidCalendar(arg)), slots.calendar;
  }
  return ((arg2) => resolveBasicCalendarId(parseCalendarId(requireString(arg2))))(arg);
}
var durationSlotsMap = /* @__PURE__ */ new WeakMap();
var Duration = /* @__PURE__ */ defineTemporalClass(DurationBranding, class {
  constructor(years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, microseconds = 0, nanoseconds = 0) {
    const fields = validateDurationFields(mapProps(toStrictInteger, {
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
      microseconds,
      nanoseconds
    }));
    initDuration(this, createDurationSlots(fields));
  }
  static from(arg) {
    return createDuration(toDurationSlots(arg));
  }
  static compare(durationArg0, durationArg1, options = void 0) {
    return compareDurations(refinePublicRelativeTo, toDurationSlots(durationArg0), toDurationSlots(durationArg1), options);
  }
  get sign() {
    return getDurationSlots(this).sign;
  }
  get blank() {
    return !getDurationSlots(this).sign;
  }
  with(mod) {
    return createDuration(mergeDurationFields(getDurationSlots(this), mod));
  }
  negated() {
    return createDuration(negateDuration(getDurationSlots(this)));
  }
  abs() {
    return createDuration(absDuration(getDurationSlots(this)));
  }
  add(otherArg) {
    return createDuration(addDurationsWithoutRelativeTo(0, getDurationSlots(this), toDurationSlots(otherArg)));
  }
  subtract(otherArg) {
    return createDuration(addDurationsWithoutRelativeTo(1, getDurationSlots(this), toDurationSlots(otherArg)));
  }
  round(roundTo) {
    return createDuration(roundDuration(refinePublicRelativeTo, getDurationSlots(this), roundTo));
  }
  total(totalOf) {
    return totalDuration(refinePublicRelativeTo, getDurationSlots(this), totalOf);
  }
  toLocaleString(locales = void 0, options) {
    const slots = getDurationSlots(this);
    return Intl.DurationFormat ? new Intl.DurationFormat(locales, options).format(slots) : formatDurationIso(slots, options);
  }
  toString(options = void 0) {
    return formatDurationIso(getDurationSlots(this), options);
  }
  toJSON() {
    return formatDurationIso(getDurationSlots(this));
  }
  valueOf() {
    return forbiddenValueOf2();
  }
}, getDurationSlots, durationGetters);
function createDuration(slots) {
  return initDuration(Object.create(Duration.prototype), slots);
}
function getDurationSlots(obj) {
  return getDurationSlotsIfPresent(obj) || invalidRecordType();
}
function getDurationSlotsIfPresent(obj) {
  return durationSlotsMap.get(obj);
}
function toDurationSlots(arg) {
  if (isObjectLike2(arg)) {
    return getDurationSlotsIfPresent(arg) || refineDurationObjectLike(arg);
  }
  return parseDuration(arg);
}
function refinePublicRelativeTo(relativeTo) {
  if (void 0 !== relativeTo) {
    if (isObjectLike2(relativeTo)) {
      const zonedDateTimeSlots = getZonedDateTimeSlotsIfPresent(relativeTo);
      if (zonedDateTimeSlots) {
        return zonedDateTimeSlots;
      }
      const dateSlots = getPlainDateSlotsIfPresent(relativeTo);
      if (dateSlots) {
        return dateSlots;
      }
      const dateTimeSlots = getPlainDateTimeSlotsIfPresent(relativeTo);
      if (dateTimeSlots) {
        return createDateSlots(dateTimeSlots, dateTimeSlots.calendar);
      }
      const calendar = getCalendarFromBag(relativeTo);
      return refineMaybeZonedDateTimeObjectLike(refineTimeZoneArg, calendar, relativeTo);
    }
    return parseRelativeToSlots(relativeTo, resolveBasicCalendarId);
  }
}
function initDuration(instance, slots) {
  return durationSlotsMap.set(instance, slots), attachDebugString(instance), instance;
}
var Now = /* @__PURE__ */ Object.defineProperties({}, {
  ...createStringTagDescriptors("Temporal.Now"),
  ...createPropDescriptors({
    timeZoneId() {
      return getCurrentTimeZoneId();
    },
    instant() {
      return createInstant(createEpochNanoSlots(getCurrentEpochNano()));
    },
    zonedDateTimeISO(timeZoneArg = getCurrentTimeZoneId()) {
      const timeZone = queryTimeZone(refineTimeZoneArg(timeZoneArg));
      return createZonedDateTime(createZonedEpochNanoSlots(getCurrentEpochNano(), timeZone));
    },
    plainDateTimeISO(timeZoneArg = getCurrentTimeZoneId()) {
      const isoDateTime = getCurrentIsoDateTime(queryTimeZone(refineTimeZoneArg(timeZoneArg)));
      return createPlainDateTime(createDateTimeSlots(isoDateTime));
    },
    plainDateISO(timeZoneArg = getCurrentTimeZoneId()) {
      const isoDateTime = getCurrentIsoDateTime(queryTimeZone(refineTimeZoneArg(timeZoneArg)));
      return createPlainDate(createDateSlots(isoDateTime));
    },
    plainTimeISO(timeZoneArg = getCurrentTimeZoneId()) {
      const isoDateTime = getCurrentIsoDateTime(queryTimeZone(refineTimeZoneArg(timeZoneArg)));
      return createPlainTime(createTimeSlots(isoDateTime));
    }
  })
});
var Temporal = /* @__PURE__ */ Object.defineProperties({}, {
  ...createStringTagDescriptors("Temporal"),
  ...createPropDescriptors({
    PlainYearMonth,
    PlainMonthDay,
    PlainDate,
    PlainTime,
    PlainDateTime,
    ZonedDateTime,
    Instant,
    Duration,
    Now
  })
});

// node_modules/temporal-polyfill/index.js
var Temporal2 = NativeTemporal || Temporal;
var toTemporalInstant2 = NativeTemporal ? Date.prototype.toTemporalInstant : toTemporalInstant;

// node_modules/@typespec/compiler/dist/src/core/semantic-walker.js
init_define_process_env();
var defaultOptions = {
  includeTemplateDeclaration: false
};
function navigateProgram(program, listeners, options = {}) {
  const context = createNavigationContext(listeners, options);
  context.emit("root", program);
  navigateNamespaceType(program.getGlobalNamespaceType(), context);
}
function navigateType(type, listeners, options) {
  const context = createNavigationContext(listeners, options);
  navigateTypeInternal(type, context);
}
function scopeNavigationToNamespace(namespace, listeners, options = {}) {
  const wrappedListeners = {};
  for (const [name, callback] of Object.entries(listeners)) {
    wrappedListeners[name] = (x) => {
      if (x !== namespace && "namespace" in x) {
        if (options.skipSubNamespaces && x.namespace !== namespace) {
          return ListenerFlow.NoRecursion;
        }
        if (x.namespace && !isSubNamespace(x.namespace, namespace)) {
          return ListenerFlow.NoRecursion;
        }
      }
      return callback(x);
    };
  }
  return wrappedListeners;
}
function navigateTypesInNamespace(namespace, listeners, options = {}) {
  navigateType(namespace, scopeNavigationToNamespace(namespace, listeners, options), options);
}
function mapEventEmitterToNodeListener(eventEmitter) {
  const listener = {};
  for (const eventName of eventNames) {
    listener[eventName] = (...args) => {
      eventEmitter.emit(eventName, ...args);
    };
  }
  return listener;
}
function isSubNamespace(subNamespace, namespace) {
  let current = subNamespace;
  while (current !== void 0) {
    if (current === namespace) {
      return true;
    }
    current = current.namespace;
  }
  return false;
}
function createNavigationContext(listeners, options = {}) {
  return {
    visited: /* @__PURE__ */ new Set(),
    emit: (key, ...args) => listeners[key]?.(...args),
    options: computeOptions(options)
  };
}
function computeOptions(options) {
  return { ...defaultOptions, ...options };
}
function navigateNamespaceType(namespace, context) {
  if (context.emit("namespace", namespace) === ListenerFlow.NoRecursion)
    return;
  for (const model of namespace.models.values()) {
    navigateModelType(model, context);
  }
  for (const scalar of namespace.scalars.values()) {
    navigateScalarType(scalar, context);
  }
  for (const operation of namespace.operations.values()) {
    navigateOperationType(operation, context);
  }
  for (const subNamespace of namespace.namespaces.values()) {
    if (!(namespace.name === "TypeSpec" && subNamespace.name === "Prototypes")) {
      navigateNamespaceType(subNamespace, context);
    }
  }
  for (const union of namespace.unions.values()) {
    navigateUnionType(union, context);
  }
  for (const iface of namespace.interfaces.values()) {
    navigateInterfaceType(iface, context);
  }
  for (const enumType of namespace.enums.values()) {
    navigateEnumType(enumType, context);
  }
  for (const decorator of namespace.decoratorDeclarations.values()) {
    navigateDecoratorDeclaration(decorator, context);
  }
  for (const func of namespace.functionDeclarations.values()) {
    navigateFunctionDeclaration(func, context);
  }
  context.emit("exitNamespace", namespace);
}
function checkVisited(visited, item) {
  if (visited.has(item)) {
    return true;
  }
  visited.add(item);
  return false;
}
function shouldNavigateTemplatableType(context, type) {
  if (context.options.includeTemplateDeclaration) {
    return type.isFinished || isTemplateDeclaration(type);
  } else {
    return type.isFinished;
  }
}
function navigateOperationType(operation, context) {
  if (checkVisited(context.visited, operation)) {
    return;
  }
  if (!shouldNavigateTemplatableType(context, operation)) {
    return;
  }
  if (context.emit("operation", operation) === ListenerFlow.NoRecursion)
    return;
  for (const parameter of operation.parameters.properties.values()) {
    navigateTypeInternal(parameter, context);
  }
  navigateTypeInternal(operation.returnType, context);
  if (operation.sourceOperation) {
    navigateTypeInternal(operation.sourceOperation, context);
  }
  context.emit("exitOperation", operation);
}
function navigateModelType(model, context) {
  if (checkVisited(context.visited, model)) {
    return;
  }
  if (!shouldNavigateTemplatableType(context, model)) {
    return;
  }
  if (context.emit("model", model) === ListenerFlow.NoRecursion)
    return;
  for (const property of model.properties.values()) {
    navigateModelTypeProperty(property, context);
  }
  if (model.baseModel) {
    navigateModelType(model.baseModel, context);
  }
  if (model.indexer && model.indexer.value) {
    navigateTypeInternal(model.indexer.value, context);
  }
  if (context.options.visitDerivedTypes) {
    for (const derived of model.derivedModels) {
      navigateModelType(derived, context);
    }
  }
  context.emit("exitModel", model);
}
function navigateModelTypeProperty(property, context) {
  if (checkVisited(context.visited, property)) {
    return;
  }
  if (context.emit("modelProperty", property) === ListenerFlow.NoRecursion)
    return;
  navigateTypeInternal(property.type, context);
  context.emit("exitModelProperty", property);
}
function navigateScalarType(scalar, context) {
  if (checkVisited(context.visited, scalar)) {
    return;
  }
  if (context.emit("scalar", scalar) === ListenerFlow.NoRecursion)
    return;
  if (scalar.baseScalar) {
    navigateScalarType(scalar.baseScalar, context);
  }
  for (const constructor of scalar.constructors.values()) {
    navigateScalarConstructor(constructor, context);
  }
  context.emit("exitScalar", scalar);
}
function navigateInterfaceType(type, context) {
  if (checkVisited(context.visited, type)) {
    return;
  }
  if (!shouldNavigateTemplatableType(context, type)) {
    return;
  }
  context.emit("interface", type);
  for (const op of type.operations.values()) {
    navigateOperationType(op, context);
  }
  context.emit("exitInterface", type);
}
function navigateEnumType(type, context) {
  if (checkVisited(context.visited, type)) {
    return;
  }
  context.emit("enum", type);
  for (const member of type.members.values()) {
    navigateTypeInternal(member, context);
  }
  context.emit("exitEnum", type);
}
function navigateUnionType(type, context) {
  if (checkVisited(context.visited, type)) {
    return;
  }
  if (!shouldNavigateTemplatableType(context, type)) {
    return;
  }
  if (context.emit("union", type) === ListenerFlow.NoRecursion)
    return;
  if (type.baseType) {
    navigateTypeInternal(type.baseType, context);
  }
  for (const variant of type.variants.values()) {
    navigateUnionTypeVariant(variant, context);
  }
  context.emit("exitUnion", type);
}
function navigateUnionTypeVariant(type, context) {
  if (checkVisited(context.visited, type)) {
    return;
  }
  if (context.emit("unionVariant", type) === ListenerFlow.NoRecursion)
    return;
  navigateTypeInternal(type.type, context);
  context.emit("exitUnionVariant", type);
}
function navigateTupleType(type, context) {
  if (checkVisited(context.visited, type)) {
    return;
  }
  if (context.emit("tuple", type) === ListenerFlow.NoRecursion)
    return;
  for (const value of type.values) {
    navigateTypeInternal(value, context);
  }
  context.emit("exitTuple", type);
}
function navigateStringTemplate(type, context) {
  if (checkVisited(context.visited, type)) {
    return;
  }
  if (context.emit("stringTemplate", type) === ListenerFlow.NoRecursion)
    return;
  for (const value of type.spans) {
    navigateTypeInternal(value, context);
  }
}
function navigateStringTemplateSpan(type, context) {
  if (checkVisited(context.visited, type)) {
    return;
  }
  if (context.emit("stringTemplateSpan", type) === ListenerFlow.NoRecursion)
    return;
  navigateTypeInternal(type.type, context);
}
function navigateTemplateParameter(type, context) {
  if (checkVisited(context.visited, type)) {
    return;
  }
  if (context.emit("templateParameter", type) === ListenerFlow.NoRecursion)
    return;
  context.emit("exitTemplateParameter", type);
}
function navigateTemplateParameterAccess(type, context) {
  if (checkVisited(context.visited, type)) {
    return;
  }
  if (context.emit("templateParameterAccess", type) === ListenerFlow.NoRecursion)
    return;
  context.emit("exitTemplateParameterAccess", type);
}
function navigateDecoratorDeclaration(type, context) {
  if (checkVisited(context.visited, type)) {
    return;
  }
  if (context.emit("decorator", type) === ListenerFlow.NoRecursion)
    return;
}
function navigateScalarConstructor(type, context) {
  if (checkVisited(context.visited, type)) {
    return;
  }
  if (context.emit("scalarConstructor", type) === ListenerFlow.NoRecursion)
    return;
}
function navigateFunctionDeclaration(value, context) {
  if (checkVisited(context.visited, value)) {
    return;
  }
  if (context.emit("function", value) === ListenerFlow.NoRecursion)
    return;
}
function navigateTypeInternal(entity, context) {
  if (entity.entityKind === "Type") {
    switch (entity.kind) {
      case "Model":
        return navigateModelType(entity, context);
      case "Scalar":
        return navigateScalarType(entity, context);
      case "ModelProperty":
        return navigateModelTypeProperty(entity, context);
      case "Namespace":
        return navigateNamespaceType(entity, context);
      case "Interface":
        return navigateInterfaceType(entity, context);
      case "Enum":
        return navigateEnumType(entity, context);
      case "Operation":
        return navigateOperationType(entity, context);
      case "Union":
        return navigateUnionType(entity, context);
      case "UnionVariant":
        return navigateUnionTypeVariant(entity, context);
      case "Tuple":
        return navigateTupleType(entity, context);
      case "StringTemplate":
        return navigateStringTemplate(entity, context);
      case "StringTemplateSpan":
        return navigateStringTemplateSpan(entity, context);
      case "TemplateParameter":
        return navigateTemplateParameter(entity, context);
      case "TemplateParameterAccess":
        return navigateTemplateParameterAccess(entity, context);
      case "Decorator":
        return navigateDecoratorDeclaration(entity, context);
      case "ScalarConstructor":
        return navigateScalarConstructor(entity, context);
      case "FunctionParameter":
      case "FunctionType":
      case "Boolean":
      case "EnumMember":
      case "Intrinsic":
      case "Number":
      case "String":
        return;
      default:
        const _assertNever = entity;
        return;
    }
  } else {
    if (entity.valueKind === "Function") {
      return navigateFunctionDeclaration(entity, context);
    }
    return;
  }
}
function getProperty(type, propertyName) {
  while (type.baseModel) {
    if (type.properties.has(propertyName)) {
      return type.properties.get(propertyName);
    }
    type = type.baseModel;
  }
  return type.properties.get(propertyName);
}
var EventEmitter = class {
  listeners = /* @__PURE__ */ new Map();
  on(name, listener) {
    const array = this.listeners.get(name);
    if (array) {
      array.push(listener);
    } else {
      this.listeners.set(name, [listener]);
    }
  }
  emit(name, ...args) {
    const listeners = this.listeners.get(name);
    if (listeners) {
      for (const listener of listeners) {
        listener(...args);
      }
    }
  }
};
var eventNames = [
  "root",
  "templateParameter",
  "templateParameterAccess",
  "exitTemplateParameter",
  "exitTemplateParameterAccess",
  "scalar",
  "exitScalar",
  "model",
  "exitModel",
  "modelProperty",
  "exitModelProperty",
  "interface",
  "exitInterface",
  "enum",
  "exitEnum",
  "enumMember",
  "exitEnumMember",
  "namespace",
  "exitNamespace",
  "operation",
  "exitOperation",
  "string",
  "exitString",
  "number",
  "exitNumber",
  "boolean",
  "exitBoolean",
  "tuple",
  "exitTuple",
  "union",
  "exitUnion",
  "unionVariant",
  "exitUnionVariant",
  "intrinsic",
  "exitIntrinsic"
];

// node_modules/@typespec/compiler/dist/src/lib/examples.js
var UnserializableValueError = class extends Error {
  reason;
  constructor(reason = "Cannot serialize value as JSON.") {
    super(reason);
    this.reason = reason;
    this.name = "UnserializableValueError";
  }
};
var UnsupportedScalarConstructorError = class extends UnserializableValueError {
  scalarName;
  constructorName;
  supportedConstructors;
  constructor(scalarName, constructorName, supportedConstructors) {
    super(`Cannot serialize scalar '${scalarName}' with constructor '${constructorName}'. Supported constructors: ${supportedConstructors.join(", ")}`);
    this.scalarName = scalarName;
    this.constructorName = constructorName;
    this.supportedConstructors = supportedConstructors;
    this.name = "UnsupportedScalarConstructorError";
  }
};
function serializeValueAsJson(program, value, type, encodeAs, handlers, diagnosticTarget) {
  if (type.kind === "ModelProperty") {
    return serializeValueAsJson(program, value, type.type, encodeAs ?? getEncode(program, type), handlers, diagnosticTarget);
  }
  switch (value.valueKind) {
    case "NullValue":
      return null;
    case "BooleanValue":
    case "StringValue":
      return value.value;
    case "NumericValue":
      return value.value.asNumber();
    case "EnumValue":
      return value.value.value ?? value.value.name;
    case "ArrayValue":
      return value.values.map((v) => serializeValueAsJson(
        program,
        v,
        type.kind === "Model" && isArrayModelType(type) ? type.indexer.value : program.checker.anyType,
        /* encodeAs: */
        void 0,
        handlers,
        diagnosticTarget
      ));
    case "ObjectValue":
      return serializeObjectValueAsJson(program, value, type, handlers, diagnosticTarget);
    case "ScalarValue":
      return serializeScalarValueAsJson(program, value, type, encodeAs, handlers);
    case "Function":
      throw new UnserializableValueError("Cannot serialize a function value as JSON.");
  }
}
function getPropertyOfType(type, name) {
  switch (type.kind) {
    case "Model":
      return getProperty(type, name) ?? type.indexer?.value;
    case "Intrinsic":
      if (isUnknownType(type)) {
        return type;
      } else {
        return;
      }
    default:
      return void 0;
  }
}
function resolveUnions(program, value, type) {
  if (type.kind !== "Union") {
    return type;
  }
  const exactValueType = program.checker.getValueExactType(value);
  for (const variant of type.variants.values()) {
    if (ignoreDiagnostics(program.checker.isTypeAssignableTo(exactValueType ?? value.type, variant.type, value))) {
      if (variant.type.kind === "Union") {
        const resolvedNested = resolveUnions(program, value, variant.type);
        if (resolvedNested && resolvedNested !== variant.type) {
          return resolvedNested;
        }
      }
      return variant.type;
    }
  }
  return type;
}
function serializeObjectValueAsJson(program, value, type, handlers, diagnosticTarget) {
  type = resolveUnions(program, value, type) ?? type;
  const obj = {};
  for (const propValue of value.properties.values()) {
    const definition = getPropertyOfType(type, propValue.name);
    if (definition) {
      const name = definition.kind === "ModelProperty" ? resolveEncodedName(program, definition, "application/json") : propValue.name;
      obj[name] = serializeValueAsJson(
        program,
        propValue.value,
        definition,
        /* encodeAs: */
        void 0,
        handlers,
        propValue.node
      );
    }
  }
  return obj;
}
function resolveKnownScalar(program, scalar) {
  const encode = getEncode(program, scalar);
  if (program.checker.isStdType(scalar)) {
    switch (scalar.name) {
      case "utcDateTime":
      case "offsetDateTime":
      case "plainDate":
      case "plainTime":
      case "duration":
        return { scalar, encodeAs: encode };
      case "unixTimestamp32":
        break;
      default:
        return void 0;
    }
  }
  if (scalar.baseScalar) {
    const result = resolveKnownScalar(program, scalar.baseScalar);
    return result && { scalar: result.scalar, encodeAs: encode };
  }
  return void 0;
}
function serializeScalarValueAsJson(program, value, type, encodeAs, handlers) {
  if (handlers?.serializeScalarValue) {
    return handlers.serializeScalarValue(value, type, encodeAs, serializeScalarValueAsJson.bind(null, program, value, type, encodeAs, void 0));
  }
  const result = resolveKnownScalar(program, value.scalar);
  if (result === void 0) {
    return void 0;
  }
  encodeAs = encodeAs ?? result.encodeAs;
  switch (result.scalar.name) {
    case "utcDateTime":
      if (value.value.name === "fromISO") {
        return ScalarSerializers.utcDateTime(value.value.args[0].value, encodeAs);
      }
      throw new UnsupportedScalarConstructorError("utcDateTime", value.value.name, ["fromISO"]);
    case "offsetDateTime":
      if (value.value.name === "fromISO") {
        return ScalarSerializers.offsetDateTime(value.value.args[0].value, encodeAs);
      }
      throw new UnsupportedScalarConstructorError("offsetDateTime", value.value.name, ["fromISO"]);
    case "plainDate":
      if (value.value.name === "fromISO") {
        return ScalarSerializers.plainDate(value.value.args[0].value);
      }
      throw new UnsupportedScalarConstructorError("plainDate", value.value.name, ["fromISO"]);
    case "plainTime":
      if (value.value.name === "fromISO") {
        return ScalarSerializers.plainTime(value.value.args[0].value);
      }
      throw new UnsupportedScalarConstructorError("plainTime", value.value.name, ["fromISO"]);
    case "duration":
      if (value.value.name === "fromISO") {
        return ScalarSerializers.duration(value.value.args[0].value, encodeAs);
      }
      throw new UnsupportedScalarConstructorError("duration", value.value.name, ["fromISO"]);
  }
}
var ScalarSerializers = {
  utcDateTime: (value, encodeAs) => {
    if (encodeAs === void 0 || encodeAs.encoding === "rfc3339") {
      return value;
    }
    const date = new Date(value);
    switch (encodeAs.encoding) {
      case "unixTimestamp":
        return Math.floor(date.getTime() / 1e3);
      case "rfc7231":
        return date.toUTCString();
      default:
        return date.toISOString();
    }
  },
  offsetDateTime: (value, encodeAs) => {
    if (encodeAs === void 0 || encodeAs.encoding === "rfc3339") {
      return value;
    }
    const date = new Date(value);
    switch (encodeAs.encoding) {
      case "rfc7231":
        return date.toUTCString();
      default:
        return date.toISOString();
    }
  },
  plainDate: (value) => {
    return value;
  },
  plainTime: (value) => {
    return value;
  },
  duration: (value, encodeAs) => {
    const duration = Temporal2.Duration.from(value);
    switch (encodeAs?.encoding) {
      case "seconds":
        if (isInteger(encodeAs.type)) {
          return Math.floor(duration.total({ unit: "seconds" }));
        } else {
          return duration.total({ unit: "seconds" });
        }
      case "milliseconds":
        if (isInteger(encodeAs.type)) {
          return Math.floor(duration.total({ unit: "milliseconds" }));
        } else {
          return duration.total({ unit: "milliseconds" });
        }
      default:
        return duration.toString();
    }
  }
};
function isInteger(scalar) {
  while (scalar.baseScalar) {
    scalar = scalar.baseScalar;
    if (scalar.name === "integer") {
      return true;
    }
  }
  return false;
}

// node_modules/@typespec/compiler/dist/src/lib/paging.js
init_define_process_env();
var [
  /**
   * Check if the given operation is used to page through a list.
   * @param program Program
   * @param target Operation
   */
  isList,
  markList,
  /** {@inheritdoc ListDecorator} */
  listDecorator
] = createMarkerDecorator("list");
var [
  /**
   * Check if the given property is the `@offset` property for a paging operation.
   * @param program Program
   * @param target Model Property
   */
  isOffsetProperty,
  markOffset,
  /** {@inheritdoc OffsetDecorator} */
  offsetDecorator
] = createMarkerDecorator("offset", createNumericValidation("offset"));
var [
  /**
   * Check if the given property is the `@pageIndex` property for a paging operation.
   * @param program Program
   * @param target Model Property
   */
  isPageIndexProperty,
  markPageIndexProperty,
  /** {@inheritdoc PageIndexDecorator} */
  pageIndexDecorator
] = createMarkerDecorator("pageIndex", createNumericValidation("pageIndex"));
var [
  /**
   * Check if the given property is the `@pageIndex` property for a paging operation.
   * @param program Program
   * @param target Model Property
   */
  isPageSizeProperty,
  markPageSizeProperty,
  /** {@inheritdoc PageSizeDecorator} */
  pageSizeDecorator
] = createMarkerDecorator("pageSize", createNumericValidation("pageSize"));
var [
  /**
   * Check if the given property is the `@pageIndex` property for a paging operation.
   * @param program Program
   * @param target Model Property
   */
  isPageItemsProperty,
  markPageItemsProperty,
  /** {@inheritdoc PageItemsDecorator} */
  pageItemsDecorator
] = createMarkerDecorator("pageItems", (context, target) => {
  if (target.type.kind !== "Model" || !isArrayModelType(target.type)) {
    reportDiagnostic(context.program, {
      code: "decorator-wrong-target",
      messageId: "withExpected",
      format: { decorator: "continuationToken", expected: "Array", to: getTypeName(target.type) },
      target: context.decoratorTarget
    });
    return false;
  }
  return true;
});
var [
  /**
   * Check if the given property is the `@pageIndex` property for a paging operation.
   * @param program Program
   * @param target Model Property
   */
  isContinuationTokenProperty,
  markContinuationTokenProperty,
  /** {@inheritdoc ContinuationTokenDecorator} */
  continuationTokenDecorator
] = createMarkerDecorator("continuationToken");
var [
  /**
   * Check if the given property is the `@nextLink` property for a paging operation.
   * @param program Program
   * @param target Model Property
   */
  isNextLink,
  markNextLink,
  /** {@inheritdoc NextLinkDecorator} */
  nextLinkDecorator
] = createMarkerDecorator("nextLink");
var [
  /**
   * Check if the given property is the `@prevLink` property for a paging operation.
   * @param program Program
   * @param target Model Property
   */
  isPrevLink,
  markPrevLink,
  /** {@inheritdoc PrevLinkDecorator} */
  prevLinkDecorator
] = createMarkerDecorator("prevLink");
var [
  /**
   * Check if the given property is the `@firstLink` property for a paging operation.
   * @param program Program
   * @param target Model Property
   */
  isFirstLink,
  markFirstLink,
  /** {@inheritdoc FirstLinkDecorator} */
  firstLinkDecorator
] = createMarkerDecorator("firstLink");
var [
  /**
   * Check if the given property is the `@lastLink` property for a paging operation.
   * @param program Program
   * @param target Model Property
   */
  isLastLink,
  markLastLink,
  /** {@inheritdoc LastLinkDecorator} */
  lastLinkDecorator
] = createMarkerDecorator("lastLink");
function validatePagingOperations(program) {
  navigateProgram(program, {
    operation: (op) => {
      if (isList(program, op)) {
        validatePagingOperation(program, op);
      }
    }
  });
}
var inputProps = /* @__PURE__ */ new Set(["offset", "pageIndex", "pageSize", "continuationToken"]);
var outputProps = /* @__PURE__ */ new Set([
  "pageItems",
  "nextLink",
  "prevLink",
  "firstLink",
  "lastLink",
  "continuationToken"
]);
function findPagingProperties(program, op, base, source) {
  const diags = createDiagnosticCollector();
  const acceptableProps = source === "input" ? inputProps : outputProps;
  const duplicateTracker = new DuplicateTracker();
  const data = {};
  navigateProperties(base, (property, path) => {
    const kind = diags.pipe(getPagingProperty(program, property));
    if (kind === void 0) {
      return;
    }
    duplicateTracker.track(kind, property);
    if (acceptableProps.has(kind)) {
      data[kind] = { property, path };
    } else {
      diags.add(createDiagnostic({
        code: "invalid-paging-prop",
        messageId: source === "input" ? "input" : "output",
        format: { kind },
        target: property
      }));
    }
  });
  for (const [key, duplicates] of duplicateTracker.entries()) {
    for (const prop of duplicates) {
      diags.add(createDiagnostic({
        code: "duplicate-paging-prop",
        format: { kind: key, operationName: op.name },
        target: prop
      }));
    }
  }
  return diags.wrap(data);
}
function getPagingOperation(program, op) {
  const diags = createDiagnosticCollector();
  const result = {
    input: diags.pipe(findPagingProperties(program, op, op.parameters, "input")),
    output: diags.pipe(findPagingProperties(program, op, op.returnType, "output"))
  };
  if (result.output.pageItems === void 0) {
    diags.add(createDiagnostic({
      code: "missing-paging-items",
      format: { operationName: op.name },
      target: op
    }));
    return diags.wrap(void 0);
  }
  return diags.wrap(result);
}
function navigateProperties(type, callback, path = [], visited = /* @__PURE__ */ new Set()) {
  if (visited.has(type))
    return;
  visited.add(type);
  switch (type.kind) {
    case "Model":
      for (const prop of type.properties.values()) {
        callback(prop, [...path, prop]);
        navigateProperties(prop.type, callback, [...path, prop], visited);
      }
      if (type.baseModel) {
        navigateProperties(type.baseModel, callback, path, visited);
      }
      break;
    case "Union":
      for (const member of type.variants.values()) {
        navigateProperties(member, callback, path, visited);
      }
      break;
    case "UnionVariant":
      navigateProperties(type.type, callback, path, visited);
      break;
  }
}
function getPagingProperty(program, prop) {
  const diagnostics = [];
  const props = {
    offset: isOffsetProperty(program, prop),
    pageIndex: isPageIndexProperty(program, prop),
    pageItems: isPageItemsProperty(program, prop),
    pageSize: isPageSizeProperty(program, prop),
    continuationToken: isContinuationTokenProperty(program, prop),
    nextLink: isNextLink(program, prop),
    prevLink: isPrevLink(program, prop),
    lastLink: isLastLink(program, prop),
    firstLink: isFirstLink(program, prop)
  };
  const defined = Object.entries(props).filter((x) => !!x[1]);
  if (defined.length > 1) {
    diagnostics.push(createDiagnostic({
      code: "incompatible-paging-props",
      format: { kinds: defined.map((x) => x[0]).join(", ") },
      target: prop
    }));
  }
  if (defined.length === 0) {
    return [void 0, diagnostics];
  }
  return [defined[0][0], diagnostics];
}
function validatePagingOperation(program, op) {
  const [_, diagnostics] = getPagingOperation(program, op);
  program.reportDiagnostics(diagnostics);
}
function createMarkerDecorator(key, validate) {
  const [isLink, markLink] = useStateSet(createStateSymbol(key));
  const decorator = (...args) => {
    if (validate && !validate(...args)) {
      return;
    }
    const [context, target] = args;
    markLink(context.program, target);
  };
  return [isLink, markLink, decorator];
}
function createNumericValidation(decoratorName) {
  return (context, target) => {
    if (!isNumericType(context.program, target.type)) {
      reportDiagnostic(context.program, {
        code: "decorator-wrong-target",
        messageId: "withExpected",
        format: {
          decorator: decoratorName,
          expected: "numeric",
          to: getTypeName(target.type)
        },
        target: context.decoratorTarget
      });
      return false;
    }
    return true;
  };
}

// node_modules/@typespec/compiler/dist/src/lib/service.js
init_define_process_env();
var [getService, setService, getServiceMap] = useStateMap(/* @__PURE__ */ Symbol.for("@typespec/compiler.services"));
function listServices(program) {
  return [...getServiceMap(program).values()].filter((x) => !Realm.realmForType.has(x.type));
}
function isService(program, namespace) {
  return getServiceMap(program).has(namespace);
}
function addService(program, namespace, details = {}) {
  const serviceMap = getServiceMap(program);
  const existing = serviceMap.get(namespace) ?? {};
  setService(program, namespace, { ...existing, ...details, type: namespace });
}
var $service = (context, target, options) => {
  validateDecoratorUniqueOnNode(context, target, $service);
  addService(context.program, target, options);
};

// node_modules/@typespec/compiler/dist/src/lib/visibility.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/visibility/core.js
init_define_process_env();
var [getVisibilityStore, setVisibilityStore] = useStateMap(createStateSymbol("visibilityStore"));
function getRawVisibilityStore(...params) {
  return getVisibilityStore(...params);
}
function getOrInitializeVisibilityModifiers(program, property) {
  let visibilityModifiers = getVisibilityStore(program, property);
  if (!visibilityModifiers) {
    visibilityModifiers = /* @__PURE__ */ new Map();
    setVisibilityStore(program, property, visibilityModifiers);
  }
  return visibilityModifiers;
}
function getOrInitializeActiveModifierSetForClass(program, property, visibilityClass, defaultSet) {
  const visibilityModifiers = getOrInitializeVisibilityModifiers(program, property);
  let visibilityModifierSet = visibilityModifiers.get(visibilityClass);
  if (!visibilityModifierSet) {
    visibilityModifierSet = defaultSet;
    visibilityModifiers.set(visibilityClass, visibilityModifierSet);
  }
  return visibilityModifierSet;
}
var VISIBILITY_PROGRAM_SEALS = /* @__PURE__ */ new WeakSet();
var [isVisibilitySealedForProperty, sealVisibilityForProperty] = useStateSet(createStateSymbol("propertyVisibilitySealed"));
var [getSealedVisibilityClasses, setSealedVisibilityClasses] = useStateMap(createStateSymbol("sealedVisibilityClasses"));
function sealVisibilityModifiersForClass(program, property, visibilityClass) {
  let sealedClasses = getSealedVisibilityClasses(program, property);
  if (!sealedClasses) {
    sealedClasses = /* @__PURE__ */ new Set();
    setSealedVisibilityClasses(program, property, sealedClasses);
  }
  sealedClasses.add(visibilityClass);
}
var [getDefaultModifiers, setDefaultModifiers] = useStateMap(createStateSymbol("defaultVisibilityModifiers"));
function getDefaultModifierSetForClass(program, visibilityClass) {
  const cached = getDefaultModifiers(program, visibilityClass);
  if (cached)
    return new Set(cached);
  const defaultModifierSet = new Set(visibilityClass.members.values());
  setDefaultModifiers(program, visibilityClass, defaultModifierSet);
  return new Set(defaultModifierSet);
}
function setDefaultModifierSetForVisibilityClass(program, visibilityClass, defaultSet) {
  compilerAssert(!getDefaultModifiers(program, visibilityClass), "The default modifier set for a visibility class may only be set once.");
  setDefaultModifiers(program, visibilityClass, defaultSet);
}
function groupModifiersByVisibilityClass(modifiers) {
  const enumMap = /* @__PURE__ */ new Map();
  for (const modifier of modifiers) {
    const visibilityClass = modifier.enum;
    let modifierSet = enumMap.get(visibilityClass);
    if (!modifierSet) {
      modifierSet = /* @__PURE__ */ new Set();
      enumMap.set(visibilityClass, modifierSet);
    }
    modifierSet.add(modifier);
  }
  return enumMap;
}
function isSealed(program, property, visibilityClass) {
  if (VISIBILITY_PROGRAM_SEALS.has(program))
    return true;
  const classSealed = visibilityClass ? getSealedVisibilityClasses(program, property)?.has(visibilityClass) : false;
  return classSealed || isVisibilitySealedForProperty(program, property);
}
function sealVisibilityModifiers(program, property, visibilityClass) {
  if (visibilityClass) {
    sealVisibilityModifiersForClass(program, property, visibilityClass);
  } else {
    sealVisibilityForProperty(program, property);
  }
}
function sealVisibilityModifiersForProgram(program) {
  VISIBILITY_PROGRAM_SEALS.add(program);
}
function addVisibilityModifiers(program, property, modifiers, context) {
  const modifiersByClass = groupModifiersByVisibilityClass(modifiers);
  for (const [visibilityClass, newModifiers] of modifiersByClass.entries()) {
    const target = context?.decoratorTarget ?? property;
    if (isSealed(program, property, visibilityClass)) {
      reportDiagnostic(program, {
        code: "visibility-sealed",
        format: {
          propName: property.name
        },
        target
      });
      continue;
    }
    const modifierSet = getOrInitializeActiveModifierSetForClass(
      program,
      property,
      visibilityClass,
      /* defaultSet: */
      /* @__PURE__ */ new Set()
    );
    for (const modifier of newModifiers) {
      modifierSet.add(modifier);
    }
  }
}
function removeVisibilityModifiers(program, property, modifiers, context) {
  const modifiersByClass = groupModifiersByVisibilityClass(modifiers);
  for (const [visibilityClass, newModifiers] of modifiersByClass.entries()) {
    const target = context?.decoratorTarget ?? property;
    if (isSealed(program, property, visibilityClass)) {
      reportDiagnostic(program, {
        code: "visibility-sealed",
        format: {
          propName: property.name
        },
        target
      });
      continue;
    }
    const modifierSet = getOrInitializeActiveModifierSetForClass(
      program,
      property,
      visibilityClass,
      /* defaultSet: */
      getDefaultModifierSetForClass(program, visibilityClass)
    );
    for (const modifier of newModifiers) {
      modifierSet.delete(modifier);
    }
  }
}
function clearVisibilityModifiersForClass(program, property, visibilityClass, context) {
  const target = context?.decoratorTarget ?? property;
  if (isSealed(program, property, visibilityClass)) {
    reportDiagnostic(program, {
      code: "visibility-sealed",
      format: {
        propName: property.name
      },
      target
    });
    return;
  }
  const modifierSet = getOrInitializeActiveModifierSetForClass(
    program,
    property,
    visibilityClass,
    /* defaultSet: */
    /* @__PURE__ */ new Set()
  );
  modifierSet.clear();
}
function resetVisibilityModifiersForClass(program, property, visibilityClass, context) {
  const target = context?.decoratorTarget ?? property;
  if (isSealed(program, property, visibilityClass)) {
    reportDiagnostic(program, {
      code: "visibility-sealed",
      format: {
        propName: property.name
      },
      target
    });
    return;
  }
  getOrInitializeVisibilityModifiers(program, property).delete(visibilityClass);
}
function getVisibilityForClass(program, property, visibilityClass) {
  const store = getVisibilityStore(program, property);
  return store?.get(visibilityClass) ?? getDefaultModifierSetForClass(program, visibilityClass);
}
function hasVisibility(program, property, modifier) {
  const visibilityClass = modifier.enum;
  return getVisibilityForClass(program, property, visibilityClass).has(modifier) ?? false;
}
var VISIBILITY_FILTER = /* @__PURE__ */ Symbol.for("TypeSpec.Core.VisibilityFilter");
var VisibilityFilter = {
  /**
   * Convert a TypeSpec `GeneratedVisibilityFilter` value to a `VisibilityFilter`.
   *
   * @param filter - the decorator argument filter to convert
   * @returns a `VisibilityFilter` object that can be consumed by the visibility APIs
   */
  fromDecoratorArgument(filter) {
    return filter[VISIBILITY_FILTER] ??= {
      all: filter.all && new Set(filter.all.map((v) => v.value)),
      any: filter.any && new Set(filter.any.map((v) => v.value)),
      none: filter.none && new Set(filter.none.map((v) => v.value))
    };
  },
  /**
   * Extracts the unique visibility classes referred to by the modifiers in a
   * visibility filter.
   *
   * @param filter - the visibility filter to extract visibility classes from
   * @returns a set of visibility classes referred to by the filter
   */
  getVisibilityClasses(filter) {
    const classes = /* @__PURE__ */ new Set();
    if (filter.all)
      filter.all.forEach((v) => classes.add(v.enum));
    if (filter.any)
      filter.any.forEach((v) => classes.add(v.enum));
    if (filter.none)
      filter.none.forEach((v) => classes.add(v.enum));
    return classes;
  },
  /**
   * Converts a visibility filter into a stable string representation.
   *
   * This can be used as a cache key for the filter that will be stable for filters that are not object-identical but
   * are semantically identical.
   */
  toCacheKey(program, filter) {
    return visibilityFilterToCacheKey(program, filter);
  }
};
var ENUM_INTERN_TABLE = /* @__PURE__ */ Symbol.for("TypeSpec.Core.enumInternTable");
function internEnum(program, enumType) {
  const enumInternTable = program[ENUM_INTERN_TABLE] ??= {
    idx: 0,
    map: /* @__PURE__ */ new WeakMap()
  };
  let idx = enumInternTable.map.get(enumType);
  if (idx === void 0) {
    idx = enumInternTable.idx++;
    enumInternTable.map.set(enumType, idx);
  }
  return idx;
}
var VISIBILITY_FILTER_TO_STRING_CACHE = /* @__PURE__ */ Symbol.for("TypeSpec.Core.visibilityFilterToStringCache");
function visibilityFilterToCacheKey(program, filter) {
  const visibilityFilterToStringCache = program[VISIBILITY_FILTER_TO_STRING_CACHE] ??= /* @__PURE__ */ new WeakMap();
  let str = visibilityFilterToStringCache.get(filter);
  if (str) {
    return str;
  }
  str = "{";
  for (const [key, modifierSet] of Object.entries(filter).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))) {
    if (!modifierSet)
      continue;
    str += `${key}:[`;
    const values = [];
    for (const modifier of modifierSet) {
      const enumType = internEnum(program, modifier.enum);
      values.push({ _enum: enumType, modifier: modifier.name });
    }
    str += values.sort(function sortByEnumThenModifier(a, b) {
      if (a._enum !== b._enum) {
        return a._enum - b._enum;
      }
      return a.modifier.localeCompare(b.modifier);
    }).join(",") + "]";
  }
  str += "}";
  visibilityFilterToStringCache.set(filter, str);
  return str;
}
function isVisible(program, property, filter) {
  if (filter.all) {
    for (const modifier of filter.all) {
      if (!hasVisibility(program, property, modifier))
        return false;
    }
  }
  if (filter.none) {
    for (const modifier of filter.none) {
      if (hasVisibility(program, property, modifier))
        return false;
    }
  }
  if (filter.any) {
    for (const modifier of filter.any) {
      if (hasVisibility(program, property, modifier))
        return true;
    }
    return false;
  }
  return true;
}

// node_modules/@typespec/compiler/dist/src/core/visibility/lifecycle.js
init_define_process_env();
var LIFECYCLE_ENUM_CACHE = /* @__PURE__ */ new WeakMap();
function getLifecycleVisibilityEnum(program) {
  const cached = LIFECYCLE_ENUM_CACHE.get(program);
  if (cached)
    return cached;
  const [type, diagnostics] = program.resolveTypeReference("TypeSpec.Lifecycle");
  compilerAssert(diagnostics.length === 0, "Encountered diagnostics when resolving the `TypeSpec.Lifecycle` visibility class enum");
  compilerAssert(type.kind === "Enum", "Expected `TypeSpec.Visibility.Lifecycle` to be an enum");
  LIFECYCLE_ENUM_CACHE.set(program, type);
  return type;
}

// node_modules/@typespec/compiler/dist/src/experimental/mutators.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/helpers/location-context.js
init_define_process_env();
function getLocationContext(program, type) {
  const sourceLocation = getSourceLocation(type);
  if (sourceLocation.isSynthetic) {
    return { type: "synthetic" };
  }
  return program.getSourceFileLocationContext(sourceLocation.file);
}

// node_modules/@typespec/compiler/dist/src/utils/custom-key-map.js
init_define_process_env();
var CustomKeyMap = class {
  #items = /* @__PURE__ */ new Map();
  #keyer;
  constructor(keyer) {
    this.#keyer = keyer;
  }
  get(items) {
    return this.#items.get(this.#keyer(items));
  }
  set(items, value) {
    const key = this.#keyer(items);
    this.#items.set(key, value);
  }
  static objectKeyer() {
    const knownKeys = /* @__PURE__ */ new WeakMap();
    let count = 0;
    return {
      getKey(o) {
        if (knownKeys.has(o)) {
          return knownKeys.get(o);
        }
        const key = count;
        count++;
        knownKeys.set(o, key);
        return key;
      }
    };
  }
};

// node_modules/@typespec/compiler/dist/src/experimental/mutators.js
var MutatorFlow;
(function(MutatorFlow2) {
  MutatorFlow2[MutatorFlow2["MutateAndRecur"] = 0] = "MutateAndRecur";
  MutatorFlow2[MutatorFlow2["DoNotMutate"] = 1] = "DoNotMutate";
  MutatorFlow2[MutatorFlow2["DoNotRecur"] = 2] = "DoNotRecur";
})(MutatorFlow || (MutatorFlow = {}));
function isMutableTypeWithNamespace(type) {
  switch (type.kind) {
    case "TemplateParameter":
    case "Intrinsic":
    case "Decorator":
    case "FunctionParameter":
      return false;
    default:
      void type;
      return true;
  }
}
function isMutableType(type) {
  switch (type.kind) {
    case "TemplateParameter":
    case "Intrinsic":
    case "Decorator":
    case "FunctionParameter":
    case "Namespace":
      return false;
    default:
      void type;
      return true;
  }
}
var typeId = CustomKeyMap.objectKeyer();
var mutatorId = CustomKeyMap.objectKeyer();
var seenByProgram = /* @__PURE__ */ new WeakMap();
function getSeenCache(program) {
  let seen = seenByProgram.get(program);
  if (seen === void 0) {
    seen = new CustomKeyMap(([type, mutators]) => {
      const key = `${typeId.getKey(type)}-${[...mutators.values()].map((v) => mutatorId.getKey(v)).join("-")}`;
      return key;
    });
    seenByProgram.set(program, seen);
  }
  return seen;
}
function mutateSubgraphWithNamespace(program, mutators, type) {
  const engine = createMutatorEngine(program, mutators, {
    mutateNamespaces: true
  });
  const mutated = engine.mutate(type);
  if (mutated === type) {
    return { realm: null, type };
  }
  return { realm: engine.realm, type: mutated };
}
function mutateSubgraph(program, mutators, type) {
  const engine = createMutatorEngine(program, mutators, {
    mutateNamespaces: false
  });
  const mutated = engine.mutate(type);
  if (mutated === type) {
    return { realm: null, type };
  }
  return { realm: engine.realm, type: mutated };
}
var [getAlwaysMutate, _setAlwaysMutate] = useStateMap(/* @__PURE__ */ Symbol.for("TypeSpec.Mutators.alwaysMutate"));
function setAlwaysMutate(program, type, alwaysMutate = true) {
  _setAlwaysMutate(program, type, alwaysMutate);
}
function createMutatorEngine(program, mutators, options) {
  const realm = new Realm(program, `Mutator realm ${mutators.map((m) => m.name).join(", ")}`);
  const interstitialFunctions = [];
  const seen = getSeenCache(program);
  let preparingNamespace = false;
  const muts = new Set(mutators);
  const postVisits = [];
  const namespacesVisitedContent = /* @__PURE__ */ new Set();
  if (options.mutateNamespaces) {
    preparingNamespace = true;
    mutateSubgraphWorker(program.getGlobalNamespaceType(), muts);
    preparingNamespace = false;
    postVisits.forEach((visit) => visit());
  }
  return {
    realm,
    mutate: (type) => {
      return mutateSubgraphWorker(type, muts);
    }
  };
  function resolveMutators(activeMutators, type) {
    const mutatorsWithOptions = [];
    const newMutators = new Set(activeMutators.values());
    for (const mutator of activeMutators) {
      const record = mutator[type.kind];
      if (!record) {
        continue;
      }
      let mutationFn;
      let replaceFn = null;
      let mutate2;
      let recurse;
      if (typeof record === "function") {
        mutationFn = record;
        mutate2 = true;
        recurse = true;
      } else {
        mutationFn = "mutate" in record ? record.mutate : null;
        replaceFn = "replace" in record ? record.replace : null;
        if (record.filter) {
          const filterResult = record.filter(type, program, realm);
          if (filterResult === true) {
            mutate2 = true;
            recurse = true;
          } else if (filterResult === false) {
            mutate2 = false;
            recurse = true;
          } else {
            mutate2 = (filterResult & MutatorFlow.DoNotMutate) === 0;
            recurse = (filterResult & MutatorFlow.DoNotRecur) === 0;
          }
        } else {
          mutate2 = true;
          recurse = true;
        }
      }
      if (!recurse) {
        newMutators.delete(mutator);
      }
      if (mutate2) {
        mutatorsWithOptions.push({ mutator, mutationFn, replaceFn });
      }
    }
    return { mutatorsWithOptions, newMutators };
  }
  function applyMutations(type, clone, mutatorsWithOptions) {
    let resolved = clone;
    for (const { mutationFn, replaceFn } of mutatorsWithOptions) {
      const result = (mutationFn ?? replaceFn)(type, resolved, program, realm);
      if (replaceFn && result !== void 0) {
        resolved = result;
      }
    }
    return resolved;
  }
  function mutateSubgraphWorker(type, activeMutators, mutateSubNamespace = true) {
    let existing = seen.get([type, activeMutators]);
    if (existing) {
      if (mutateSubNamespace && existing.kind === "Namespace" && !namespacesVisitedContent.has(existing)) {
        namespacesVisitedContent.add(existing);
        mutateSubMap(existing, "namespaces", true, activeMutators);
      }
      clearInterstitialFunctions();
      return existing;
    }
    const alwaysMutate = getAlwaysMutate(program, type);
    if (!alwaysMutate && getLocationContext(program, type).type === "compiler" && !isTemplateInstance(type)) {
      return type;
    }
    let clone = null;
    const { mutatorsWithOptions, newMutators } = resolveMutators(activeMutators, type);
    const mutatorsToApply = mutatorsWithOptions.map((v) => v.mutator);
    let mutating = false;
    if (mutatorsWithOptions.length === 0) {
      if (newMutators.size > 0) {
        interstitialFunctions.push(initializeClone);
        seen.set([type, activeMutators], type);
        visitSubgraph();
        visitParents();
        interstitialFunctions.pop();
        return clone ?? type;
      } else {
        return type;
      }
    }
    clearInterstitialFunctions();
    existing = seen.get([type, mutatorsToApply]);
    if (existing) {
      return existing;
    }
    initializeClone();
    const result = applyMutations(type, clone, mutatorsWithOptions);
    if (result !== clone) {
      clone = result;
      seen.set([type, activeMutators], clone);
      seen.set([type, mutatorsToApply], clone);
    }
    if (newMutators.size > 0) {
      if (preparingNamespace && type.kind === "Namespace") {
        compilerAssert(mutating, "Cannot be preparing namespaces and not have cloned it.");
        prepareNamespace(clone);
        postVisits.push(() => visitNamespaceContents(clone));
      } else {
        visitSubgraph();
      }
    }
    if (type.isFinished) {
      $(realm).type.finishType(clone);
    }
    if (type.kind === "Namespace" && mutateSubNamespace) {
      compilerAssert(mutating, "Cannot be preparing namespaces and not have cloned it.");
      visitSubNamespaces(clone);
    }
    if (type.kind !== "Namespace") {
      visitParents();
    }
    return clone;
    function initializeClone() {
      clone = $(realm).type.clone(type);
      mutating = true;
      seen.set([type, activeMutators], clone);
      seen.set([type, mutatorsToApply], clone);
    }
    function clearInterstitialFunctions() {
      for (const interstitial of interstitialFunctions) {
        interstitial();
      }
      interstitialFunctions.length = 0;
    }
    function mutateNamespaceProperty(root) {
      if (!options.mutateNamespaces) {
        return;
      }
      if ("namespace" in root && root.namespace) {
        const newNs = mutateSubgraphWorker(root.namespace, newMutators, false);
        compilerAssert(newNs.kind === "Namespace", `Expected to be mutated to a namespace`);
        clone.namespace = newNs;
      }
    }
    function prepareNamespace(root) {
      visitDecorators(root, true, newMutators);
      mutateNamespaceProperty(root);
    }
    function visitSubNamespaces(type2) {
      namespacesVisitedContent.add(type2);
      mutateSubMap(type2, "namespaces", true, newMutators);
    }
    function visitNamespaceContents(root) {
      mutateSubMap(root, "models", mutating, newMutators);
      mutateSubMap(root, "operations", mutating, newMutators);
      mutateSubMap(root, "interfaces", mutating, newMutators);
      mutateSubMap(root, "enums", mutating, newMutators);
      mutateSubMap(root, "unions", mutating, newMutators);
      mutateSubMap(root, "scalars", mutating, newMutators);
    }
    function visitModel(root) {
      mutateSubMap(root, "properties", mutating, newMutators);
      if (root.indexer) {
        const res = mutateSubgraphWorker(root.indexer.value, newMutators);
        if (mutating) {
          root.indexer.value = res;
        }
      }
      for (const [index, prop] of root.sourceModels.entries()) {
        const newModel = mutateSubgraphWorker(prop.model, newMutators);
        if (mutating) {
          mutate(root.sourceModels[index]).model = newModel;
        }
      }
      mutateProperty(root, "sourceModel", mutating, newMutators);
      mutateProperty(root, "baseModel", mutating, newMutators);
      mutateSubArray(root, "derivedModels", mutating, newMutators);
    }
    function visitSubgraph() {
      const root = clone ?? type;
      switch (root.kind) {
        case "Namespace":
          visitNamespaceContents(root);
          break;
        case "Model":
          visitModel(root);
          break;
        case "ModelProperty":
          mutateProperty(root, "type", mutating, newMutators);
          mutateProperty(root, "sourceProperty", mutating, newMutators);
          break;
        case "Tuple":
          mutateSubArray(root, "values", mutating, newMutators);
          break;
        case "Operation":
          mutateProperty(root, "parameters", mutating, newMutators);
          mutateProperty(root, "returnType", mutating, newMutators);
          mutateProperty(root, "sourceOperation", mutating, newMutators);
          break;
        case "Interface":
          mutateSubMap(root, "operations", mutating, newMutators);
          break;
        case "Enum":
          mutateSubMap(root, "members", mutating, newMutators);
          break;
        case "EnumMember":
          break;
        case "Union":
          mutateSubMap(root, "variants", mutating, newMutators);
          mutateProperty(root, "baseType", mutating, newMutators);
          break;
        case "UnionVariant":
          mutateProperty(root, "type", mutating, newMutators);
          break;
        case "Scalar":
          mutateSubMap(root, "constructors", mutating, newMutators);
          mutateProperty(root, "baseScalar", mutating, newMutators);
          mutateSubArray(root, "derivedScalars", mutating, newMutators);
          break;
        case "ScalarConstructor":
          mutateProperty(root, "scalar", mutating, newMutators);
          break;
      }
      if ("templateMapper" in root) {
        mutateTemplateMapper(root, mutating, newMutators);
      }
      if ("decorators" in root) {
        visitDecorators(root, mutating, newMutators);
      }
      mutateNamespaceProperty(root);
    }
    function visitParents() {
      const root = clone ?? type;
      switch (root.kind) {
        case "ModelProperty":
          mutateProperty(root, "model", mutating, newMutators);
          break;
        case "Operation":
          mutateProperty(root, "interface", mutating, newMutators);
          break;
        case "EnumMember":
          mutateProperty(root, "enum", mutating, newMutators);
          break;
        case "UnionVariant":
          mutateProperty(root, "union", mutating, newMutators);
          break;
        case "ScalarConstructor":
          mutateProperty(root, "scalar", mutating, newMutators);
          break;
      }
    }
  }
  function visitDecorators(type, mutating, newMutators) {
    for (const [index, dec] of type.decorators.entries()) {
      const args = [];
      for (const arg of dec.args) {
        args.push({
          ...arg,
          value: mutateDecoratorArgumentValue(arg.value, newMutators),
          jsValue: mutateDecoratorArgumentValue(arg.jsValue, newMutators)
        });
      }
      if (mutating) {
        type.decorators[index] = { ...dec, args };
      }
    }
  }
  function mutateDecoratorArgumentValue(value, newMutators) {
    if (typeof value === "object" && value !== null) {
      if (isType(value)) {
        return isMutableTypeWithNamespace(value) ? mutateSubgraphWorker(value, newMutators) : value;
      }
      if (isValue(value)) {
        return mutateValue(value, newMutators);
      }
      if (isNumeric(value)) {
        return value;
      }
      if (Array.isArray(value)) {
        return value.map((item) => mutateDecoratorArgumentValue(item, newMutators));
      }
      return Object.entries(value).reduce((acc, [key, val]) => {
        return {
          ...acc,
          [key]: mutateDecoratorArgumentValue(val, newMutators)
        };
      }, {});
    }
    return value;
  }
  function mutateValue(value, newMutators) {
    switch (value.valueKind) {
      case "ObjectValue":
        const newObjectValue = {
          ...value,
          properties: /* @__PURE__ */ new Map(),
          type: mutateDecoratorArgumentValue(value.type, newMutators)
        };
        for (const [key, val] of value.properties.entries()) {
          newObjectValue.properties.set(key, {
            ...val,
            value: mutateValue(val.value, newMutators)
          });
        }
        return newObjectValue;
      case "ArrayValue":
        return {
          ...value,
          type: mutateDecoratorArgumentValue(value.type, newMutators),
          values: value.values.map((val) => mutateValue(val, newMutators))
        };
      case "EnumValue":
        return {
          ...value,
          type: mutateDecoratorArgumentValue(value.type, newMutators),
          value: mutateDecoratorArgumentValue(value.value, newMutators)
        };
      default:
        return value;
    }
  }
  function mutateTemplateMapper(type, mutating, newMutators) {
    if (type.templateMapper === void 0) {
      return;
    }
    const mutatedMapper = {
      ...type.templateMapper,
      args: [],
      map: /* @__PURE__ */ new Map()
    };
    for (const arg of type.templateMapper.args) {
      mutate(mutatedMapper.args).push(mutateSubgraphWorker(arg, newMutators));
    }
    for (const [param, paramType] of type.templateMapper.map) {
      mutatedMapper.map.set(param, mutateSubgraphWorker(paramType, newMutators));
    }
    if (mutating) {
      type.templateMapper = mutatedMapper;
    }
  }
  function mutateSubMap(type, prop, mutate2, newMutators) {
    for (const [key, value] of type[prop].entries()) {
      const newValue = mutateSubgraphWorker(value, newMutators);
      if (mutate2) {
        type[prop].set(key, newValue);
        if (newValue.name !== value.name) {
          type[prop].rekey(key, newValue.name);
        }
      }
    }
  }
  function mutateSubArray(type, prop, mutate2, newMutators) {
    for (const [index, value] of type[prop].entries()) {
      const newValue = mutateSubgraphWorker(value, newMutators);
      if (mutate2) {
        type[prop][index] = newValue;
      }
    }
  }
  function mutateProperty(type, prop, mutating, newMutators) {
    if (type[prop] === void 0) {
      return;
    }
    const newValue = mutateSubgraphWorker(type[prop], newMutators);
    if (mutating) {
      type[prop] = newValue;
    }
  }
}

// node_modules/@typespec/compiler/dist/src/lib/visibility.js
var $withDefaultKeyVisibility = (context, entity, visibility) => {
  const keyProperties = [...entity.properties].filter(([_, prop]) => {
    return isKey(context.program, prop) && !getRawVisibilityStore(context.program, prop);
  });
  for (const [name, keyProp] of keyProperties) {
    entity.properties.set(name, context.program.checker.cloneType(keyProp, {
      decorators: [
        ...keyProp.decorators,
        {
          decorator: $visibility,
          args: [
            {
              value: visibility,
              jsValue: visibility
            }
          ]
        }
      ]
    }));
  }
};
var [getOperationVisibilityConfigRaw, setOperationVisibilityConfigRaw] = useStateMap(createStateSymbol("operationVisibilityConfig"));
function getOperationVisibilityConfig(program, operation) {
  let config = getOperationVisibilityConfigRaw(program, operation);
  if (!config) {
    config = {};
    setOperationVisibilityConfigRaw(program, operation, config);
  }
  return config;
}
var $parameterVisibility = (context, operation, ...modifiers) => {
  validateDecoratorUniqueOnNode(context, operation, $parameterVisibility);
  if (modifiers.length === 0) {
    reportDiagnostic(context.program, {
      code: "operation-visibility-constraint-empty",
      messageId: "parameter",
      target: context.decoratorTarget
    });
    return;
  }
  getOperationVisibilityConfig(context.program, operation).parameters = modifiers.map((m) => m.value);
};
var EmptyVisibilityProvider = {
  parameters: () => ({}),
  returnType: () => ({})
};
function getParameterVisibilityFilter(program, operation, defaultProvider) {
  const operationVisibilityConfig = getOperationVisibilityConfig(program, operation);
  if (!operationVisibilityConfig.parameters)
    return defaultProvider.parameters(program, operation);
  compilerAssert(operationVisibilityConfig.parameters.length !== 0, "Empty parameter visibility constraint.");
  return {
    // WARNING: the HTTP library depends on `any` being the only key in the filter object returned by this method.
    //          if you change this logic, you will need to update the HTTP library to account for differences in the
    //          returned object. HTTP does not currently have a way to express `all` or `none` constraints in the same
    //          way that the core visibility system does.
    any: new Set(operationVisibilityConfig.parameters)
  };
}
var $returnTypeVisibility = (context, operation, ...modifiers) => {
  validateDecoratorUniqueOnNode(context, operation, $parameterVisibility);
  if (modifiers.length === 0) {
    reportDiagnostic(context.program, {
      code: "operation-visibility-constraint-empty",
      messageId: "returnType",
      target: context.decoratorTarget
    });
    return;
  }
  getOperationVisibilityConfig(context.program, operation).returnType = modifiers.map((m) => m.value);
};
function getReturnTypeVisibilityFilter(program, operation, defaultProvider) {
  const visibilityConfig = getOperationVisibilityConfig(program, operation);
  if (!visibilityConfig.returnType)
    return defaultProvider.returnType(program, operation);
  compilerAssert(visibilityConfig.returnType.length !== 0, "Empty return type visibility constraint.");
  return {
    // WARNING: the HTTP library depends on `any` being the only key in the filter object returned by this method.
    //          if you change this logic, you will need to update the HTTP library to account for differences in the
    //          returned object. HTTP does not currently have a way to express `all` or `none` constraints in the same
    //          way that the core visibility system does.
    any: new Set(visibilityConfig.returnType)
  };
}
var $visibility = (context, target, ...modifiers) => {
  addVisibilityModifiers(context.program, target, modifiers.map((m) => m.value), context);
};
var $removeVisibility = (context, target, ...visibilities) => {
  removeVisibilityModifiers(context.program, target, visibilities.map((v) => v.value));
};
var $invisible = (context, target, visibilityClass) => {
  clearVisibilityModifiersForClass(context.program, target, visibilityClass);
};
var $defaultVisibility = (context, target, ...visibilities) => {
  validateDecoratorUniqueOnNode(context, target, $defaultVisibility);
  const modifierSet = /* @__PURE__ */ new Set();
  for (const visibility of visibilities) {
    if (visibility.value.enum !== target) {
      reportDiagnostic(context.program, {
        code: "default-visibility-not-member",
        target: context.decoratorTarget
      });
    } else {
      modifierSet.add(visibility.value);
    }
  }
  setDefaultModifierSetForVisibilityClass(context.program, target, modifierSet);
};
var $withVisibility = (context, target, ...modifiers) => {
  const modifierMembers = modifiers.map((m) => m.value);
  const filter = {
    all: new Set(modifierMembers)
  };
  const visibilityClasses = new Set(modifierMembers.map((m) => m.enum));
  filterModelPropertiesInPlace(target, (p) => isVisible(context.program, p, filter));
  for (const p of target.properties.values()) {
    for (const c of visibilityClasses) {
      resetVisibilityModifiersForClass(context.program, p, c);
    }
  }
};
var $withUpdateableProperties = (context, target) => {
  if (!validateDecoratorTarget(context, target, "@withUpdateableProperties", "Model")) {
    return;
  }
  const filter = {
    all: /* @__PURE__ */ new Set([getLifecycleVisibilityEnum(context.program).members.get("Update")])
  };
  filterModelPropertiesInPlace(target, (p) => isVisible(context.program, p, filter));
};
var VISIBILITY_FILTER_MUTATOR_CACHE = /* @__PURE__ */ Symbol.for("TypeSpec.Core.visibilityFilterMutatorCache");
function applyVisibilityFilter(context, input, _filter, nameTemplate) {
  const filter = VisibilityFilter.fromDecoratorArgument(_filter);
  const mutatorCache = context.program[VISIBILITY_FILTER_MUTATOR_CACHE] ??= {};
  const byNameTemplate = mutatorCache.byNameTemplate ??= {};
  const mutatorCacheByNameTemplate = nameTemplate === void 0 ? mutatorCache.unnamed ??= {} : byNameTemplate[nameTemplate] ??= {};
  const mutatorCacheByVisibilityFilter = mutatorCacheByNameTemplate.byVisibilityFilter ??= /* @__PURE__ */ new Map();
  const vfKey = VisibilityFilter.toCacheKey(context.program, filter);
  let mutator = mutatorCacheByVisibilityFilter.get(vfKey);
  if (!mutator) {
    mutator = createVisibilityFilterMutator(filter, {
      decoratorFn: $withVisibilityFilter,
      decoratorName: "@withVisibilityFilter",
      nameTemplate
    });
    mutatorCacheByVisibilityFilter.set(vfKey, mutator);
  }
  setAlwaysMutate(context.program, input);
  const { type } = cachedMutateSubgraph(context.program, mutator, input);
  setAlwaysMutate(context.program, input, false);
  compilerAssert(type.kind === "Model", "Expected visibility filter mutator to return a Model type.");
  return type;
}
var $withVisibilityFilter = (context, target, _filter, nameTemplate) => {
  const transformed = applyVisibilityFilter(context, target, _filter, nameTemplate);
  target.properties = transformed.properties;
};
function applyLifecycleUpdate(context, input, nameTemplate) {
  const mutatorCache = context.program[VISIBILITY_FILTER_MUTATOR_CACHE] ??= {};
  const byNameTemplate = mutatorCache.byNameTemplate ??= {};
  const mutatorCacheByNameTemplate = nameTemplate === void 0 ? mutatorCache.unnamed ??= {} : byNameTemplate[nameTemplate] ??= {};
  let mutator = mutatorCacheByNameTemplate.lifecycleUpdate;
  if (!mutator) {
    const lifecycle = getLifecycleVisibilityEnum(context.program);
    const lifecycleUpdate = {
      all: /* @__PURE__ */ new Set([lifecycle.members.get("Update")])
    };
    const lifecycleCreateOrUpdate = {
      any: /* @__PURE__ */ new Set([lifecycle.members.get("Create"), lifecycle.members.get("Update")])
    };
    const createOrUpdateMutator = createVisibilityFilterMutator(lifecycleCreateOrUpdate, {
      nameTemplate
    });
    mutator = createVisibilityFilterMutator(lifecycleUpdate, {
      recur: createOrUpdateMutator,
      decoratorFn: $withLifecycleUpdate,
      decoratorName: "@withLifecycleUpdate",
      nameTemplate
    });
    mutatorCacheByNameTemplate.lifecycleUpdate = mutator;
  }
  setAlwaysMutate(context.program, input);
  const { type } = cachedMutateSubgraph(context.program, mutator, input);
  setAlwaysMutate(context.program, input, false);
  compilerAssert(type.kind === "Model", "Expected lifecycle update mutator to return a Model type.");
  return type;
}
var $withLifecycleUpdate = (context, target, nameTemplate) => {
  const transformed = applyLifecycleUpdate(context, target, nameTemplate);
  target.properties = transformed.properties;
};
var VISIBILITY_FILTER_MUTATOR_RESULT = /* @__PURE__ */ Symbol.for("TypeSpec.Core.visibilityFilterMutatorResult");
function cachedMutateSubgraph(program, mutator, source) {
  const mutatorCache = mutator[VISIBILITY_FILTER_MUTATOR_RESULT] ??= /* @__PURE__ */ new WeakMap();
  const cached = mutatorCache.get(source);
  if (cached) {
    return cached;
  }
  const mutated = mutateSubgraph(program, [mutator], source);
  mutatorCache.set(source, mutated);
  return mutated;
}
function createVisibilityFilterMutator(filter, options = {}) {
  const visibilityClasses = VisibilityFilter.getVisibilityClasses(filter);
  const isTypeSpecDecorator = (application, decoratorName) => application.definition?.name === decoratorName && application.definition.namespace.name === "TypeSpec";
  const matchesDecorator = (application, decoratorName, decoratorFn) => isTypeSpecDecorator(application, decoratorName) || application.decorator === decoratorFn;
  const mpMutator = {
    name: "VisibilityFilterProperty",
    ModelProperty: {
      filter: () => MutatorFlow.DoNotRecur,
      replace: (prop, clone, program) => {
        let modified = false;
        const decorators = [];
        for (const decorator of prop.decorators) {
          if (matchesDecorator(decorator, "@visibility", $visibility) || matchesDecorator(decorator, "@removeVisibility", $removeVisibility)) {
            const nextArgs = decorator.args.filter((arg) => {
              if (arg.value.entityKind !== "Value")
                return false;
              const isString = arg.value.valueKind === "StringValue";
              const isOperativeVisibility = arg.value.valueKind === "EnumValue" && visibilityClasses.has(arg.value.value.enum);
              return !(isString || isOperativeVisibility);
            });
            modified ||= nextArgs.length !== decorator.args.length;
            if (nextArgs.length > 0) {
              decorators.push({
                ...decorator,
                args: nextArgs
              });
            }
          } else if (!matchesDecorator(decorator, "@invisible", $invisible)) {
            decorators.push(decorator);
          }
        }
        clone.decorators = decorators;
        modified ||= decorators.length !== prop.decorators.length;
        for (const visibilityClass of visibilityClasses) {
          resetVisibilityModifiersForClass(program, clone, visibilityClass);
        }
        if (isVisibilitySubject(prop.type)) {
          clone.type = cachedMutateSubgraph(program, options.recur ?? self, prop.type).type;
          modified ||= clone.type !== prop.type;
        }
        return modified ? clone : prop;
      }
    }
  };
  const self = {
    name: "VisibilityFilter",
    Union: {
      filter: () => MutatorFlow.DoNotRecur,
      replace: (union, clone, program) => {
        let modified = false;
        for (const [key, member] of union.variants) {
          if (isVisibilitySubject(member.type)) {
            const variant = {
              ...member,
              type: cachedMutateSubgraph(program, self, member.type).type
            };
            clone.variants.set(key, variant);
            modified ||= variant.type !== member.type;
          }
        }
        rename(clone, options.nameTemplate);
        return modified ? clone : union;
      }
    },
    Model: {
      filter: () => MutatorFlow.DoNotRecur,
      replace: (model, clone, program, realm) => {
        let modified = false;
        if (model.indexer && isVisibilitySubject(model.indexer.value)) {
          clone.indexer = { ...model.indexer };
          mutate(clone.indexer).value = cachedMutateSubgraph(program, options.recur ?? self, model.indexer.value).type;
          if ($(realm).array.is(model) && clone.name === "Array" && clone.indexer.value !== model.indexer.value) {
            return $(program).array.create(clone.indexer.value);
          }
          if ($(realm).record.is(model) && clone.name === "Record" && clone.indexer.value !== model.indexer.value) {
            return $(program).record.create(clone.indexer.value);
          }
          modified ||= clone.indexer.value !== model.indexer.value;
        }
        for (const [key, prop] of model.properties) {
          if (!isVisible(program, prop, filter)) {
            clone.properties.delete(key);
            realm.remove(clone);
            modified = true;
          } else {
            const mutated = cachedMutateSubgraph(program, mpMutator, prop);
            clone.properties.set(key, mutated.type);
            modified ||= mutated.type !== prop;
          }
        }
        if (options.decoratorFn) {
          clone.decorators = clone.decorators.filter((d) => !(d.decorator === options.decoratorFn || options.decoratorName && isTypeSpecDecorator(d, options.decoratorName)));
          modified ||= clone.decorators.length !== model.decorators.length;
        }
        rename(clone, options.nameTemplate);
        return modified ? clone : model;
      }
    },
    ModelProperty: {
      filter: () => MutatorFlow.DoNotRecur,
      replace: (prop, clone, program) => {
        if (isVisibilitySubject(prop.type)) {
          clone.type = cachedMutateSubgraph(program, self, prop.type).type;
        }
        return clone.type !== prop.type ? clone : prop;
      }
    },
    UnionVariant: {
      filter: () => MutatorFlow.DoNotRecur,
      replace: (variant, clone, program) => {
        if (isVisibilitySubject(variant.type)) {
          clone.type = cachedMutateSubgraph(program, self, variant.type).type;
        }
        return clone.type !== variant.type ? clone : variant;
      }
    },
    Tuple: {
      filter: () => MutatorFlow.DoNotRecur,
      replace: (tuple, clone, program) => {
        let modified = false;
        for (const [index, element] of tuple.values.entries()) {
          if (isVisibilitySubject(element)) {
            clone.values[index] = cachedMutateSubgraph(program, self, element).type;
            modified ||= clone.values[index] !== element;
          }
        }
        return modified ? clone : tuple;
      }
    }
  };
  return self;
}
function rename(type, nameTemplate) {
  if (!nameTemplate || !type.name)
    return;
  const renamed = replaceTemplatedStringFromProperties(nameTemplate, type);
  type.name = renamed;
}
function isVisibilitySubject(t) {
  return t.kind === "Model" || t.kind === "Union" || t.kind === "ModelProperty" || t.kind === "UnionVariant" || t.kind === "Tuple";
}

// node_modules/@typespec/compiler/dist/src/lib/decorators.js
var [getSummary, setSummary] = useStateMap(createStateSymbol("summary"));
var $summary = (context, target, text, sourceObject) => {
  if (sourceObject) {
    text = replaceTemplatedStringFromProperties(text, sourceObject);
  }
  setSummary(context.program, target, text);
};
var $doc = (context, target, text, sourceObject) => {
  validateDecoratorUniqueOnNode(context, target, $doc);
  if (sourceObject) {
    text = replaceTemplatedStringFromProperties(text, sourceObject);
  }
  setDocData(context.program, target, "self", { value: text, source: "decorator" });
};
function getDoc(program, target) {
  return getDocDataInternal(program, target, "self")?.value;
}
var $returnsDoc = (context, target, text) => {
  validateDecoratorUniqueOnNode(context, target, $doc);
  setDocData(context.program, target, "returns", { value: text, source: "decorator" });
};
function getReturnsDocData(program, target) {
  return getDocDataInternal(program, target, "returns");
}
function getReturnsDoc(program, target) {
  return getDocDataInternal(program, target, "returns")?.value;
}
var $errorsDoc = (context, target, text) => {
  validateDecoratorUniqueOnNode(context, target, $doc);
  setDocData(context.program, target, "errors", { value: text, source: "decorator" });
};
function getErrorsDocData(program, target) {
  return getDocDataInternal(program, target, "errors");
}
function getErrorsDoc(program, target) {
  return getDocDataInternal(program, target, "errors")?.value;
}
var $inspectType = (context, target, text) => {
  if (text)
    console.log(text);
  console.dir(target, { depth: 3 });
};
var $inspectTypeName = (context, target, text) => {
  if (text)
    console.log(text);
  console.log(getTypeName(target));
};
function isStringType(program, target) {
  const stringType = program.checker.getStdType("string");
  return target.kind === "Scalar" && program.checker.isTypeAssignableTo(target, stringType, target)[0];
}
function isNumericType(program, target) {
  const numericType = program.checker.getStdType("numeric");
  return target.kind === "Scalar" && program.checker.isTypeAssignableTo(target, numericType, target)[0];
}
function isDateTimeType(program, target) {
  if (target.kind !== "Scalar") {
    return false;
  }
  const dateTimeTypes = [
    "utcDateTime",
    "offsetDateTime",
    "plainDate",
    "plainTime",
    "duration"
  ];
  return dateTimeTypes.some((typeName) => {
    const stdType = program.checker.getStdType(typeName);
    return program.checker.isTypeAssignableTo(target, stdType, target)[0];
  });
}
function isTypeIn(type, condition) {
  if (type.kind === "Union") {
    return [...type.variants.values()].some((v) => condition(v.type));
  }
  return condition(type);
}
function validateTargetingComparableType(context, target, decoratorName) {
  const valid = isTypeIn(getPropertyType(target), (x) => isNumericType(context.program, x) || isDateTimeType(context.program, x));
  if (!valid) {
    reportDiagnostic(context.program, {
      code: "decorator-wrong-target",
      format: {
        decorator: decoratorName,
        to: `type it must be a numeric or comparable type`
      },
      target: context.decoratorTarget
    });
  }
  return valid;
}
function validateValueAssignableToTarget(context, target, value) {
  const targetType = getPropertyType(target);
  if (isNumeric(value)) {
    value = $(context.program).value.createNumeric(value);
  }
  const [assignable, diagnostics] = $(context.program).value.isOfType.withDiagnostics(value, targetType, context.getArgumentTarget(0));
  if (!assignable) {
    context.program.reportDiagnostics(diagnostics);
  }
  return assignable;
}
function validateTargetingAString(context, target, decoratorName) {
  const propertyType = getPropertyType(target);
  const valid = isTypeIn(propertyType, (x) => isStringType(context.program, x));
  if (!valid) {
    reportDiagnostic(context.program, {
      code: "decorator-wrong-target",
      format: {
        decorator: decoratorName,
        to: propertyType.kind === "Union" ? `a union type that is not string compatible. The union must explicitly include a string type, and all union values should be strings. For example: union Test { string, "A", "B" }` : `type it is not a string`
      },
      target: context.decoratorTarget
    });
  }
  return valid;
}
function getTypeForArrayValidation(target) {
  if (target.kind === "ModelProperty") {
    return target.type;
  } else {
    return target.kind === "Model" ? target : target.type;
  }
}
function validateTargetingAnArray(context, target, decoratorName) {
  const targetType = getTypeForArrayValidation(target);
  const valid = isTypeIn(targetType, (x) => x.kind === "Model" && isArrayModelType(x));
  if (!valid) {
    reportDiagnostic(context.program, {
      code: "decorator-wrong-target",
      format: {
        decorator: decoratorName,
        to: `non Array type`
      },
      target: context.decoratorTarget
    });
  }
  return valid;
}
var [getErrorState, setErrorState] = useStateSet(createStateSymbol("error"));
var $error = (context, entity) => {
  validateDecoratorUniqueOnNode(context, entity, $error);
  setErrorState(context.program, entity);
};
function isErrorModel(program, target) {
  if (target.kind !== "Model") {
    return false;
  }
  let current = target;
  while (current) {
    if (getErrorState(program, current)) {
      return true;
    }
    current = current.baseModel;
  }
  return false;
}
var [_getMediaTypeHint, _setMediaTypeHint] = useStateMap(createStateSymbol("mediaTypeHint"));
var $mediaTypeHint = (context, target, mediaType) => {
  validateDecoratorUniqueOnNode(context, target, $mediaTypeHint);
  const mimeTypeObj = parseMimeType(mediaType);
  if (mimeTypeObj === void 0) {
    reportDiagnostic(context.program, {
      code: "invalid-mime-type",
      format: { mimeType: mediaType },
      target: context.getArgumentTarget(0)
    });
  }
  _setMediaTypeHint(context.program, target, mediaType);
};
function setMediaTypeHint(program, target, mediaType) {
  const mimeTypeObj = parseMimeType(mediaType);
  compilerAssert(mimeTypeObj !== void 0, `Invalid MIME type '${mediaType}' provided to setMediaTypeHint`);
  _setMediaTypeHint(program, target, mediaType);
}
function getMediaTypeHint(program, target) {
  switch (target.kind) {
    case "Scalar":
      const isTypeSpecString = target.name === "string" && target.namespace?.name === "TypeSpec" && target.namespace.namespace === program.getGlobalNamespaceType();
      if (isTypeSpecString)
        return "text/plain";
    // Intentional fallthrough
    // eslint-disable-next-line no-fallthrough
    case "Union":
    case "Enum":
    case "Model": {
      const hint = _getMediaTypeHint(program, target);
      if (!hint) {
        const ancestor = target.kind === "Model" ? target.baseModel : target.kind === "Scalar" ? target.baseScalar : void 0;
        if (ancestor) {
          return getMediaTypeHint(program, ancestor);
        }
      }
      return hint;
    }
    default:
      return void 0;
  }
}
var [getFormat, setFormat] = useStateMap(createStateSymbol("format"));
var $format = (context, target, format) => {
  validateDecoratorUniqueOnNode(context, target, $format);
  if (!validateTargetingAString(context, target, "@format")) {
    return;
  }
  setFormat(context.program, target, format);
};
var [getPatternData, setPatternData] = useStateMap(createStateSymbol("patternValues"));
var $pattern = (context, target, pattern, validationMessage) => {
  validateDecoratorUniqueOnNode(context, target, $pattern);
  if (!validateTargetingAString(context, target, "@pattern")) {
    return;
  }
  try {
    new RegExp(pattern);
  } catch (e) {
    reportDiagnostic(context.program, {
      code: "invalid-pattern-regex",
      target
    });
  }
  const patternData = {
    pattern,
    validationMessage
  };
  setPatternData(context.program, target, patternData);
};
function getPattern(program, target) {
  return getPatternData(program, target)?.pattern;
}
var $minLength = (context, target, minLength) => {
  validateDecoratorUniqueOnNode(context, target, $minLength);
  if (!validateTargetingAString(context, target, "@minLength") || !validateRange(context, minLength, getMaxLengthAsNumeric(context.program, target))) {
    return;
  }
  setMinLength(context.program, target, minLength);
};
var $maxLength = (context, target, maxLength) => {
  validateDecoratorUniqueOnNode(context, target, $maxLength);
  if (!validateTargetingAString(context, target, "@maxLength") || !validateRange(context, getMinLengthAsNumeric(context.program, target), maxLength)) {
    return;
  }
  setMaxLength(context.program, target, maxLength);
};
var $minItems = (context, target, minItems) => {
  validateDecoratorUniqueOnNode(context, target, $minItems);
  if (!validateTargetingAnArray(context, target, "@minItems")) {
    return;
  }
  if (!validateRange(context, minItems, getMaxItemsAsNumeric(context.program, target))) {
    return;
  }
  setMinItems(context.program, target, minItems);
};
var $maxItems = (context, target, maxItems) => {
  validateDecoratorUniqueOnNode(context, target, $maxItems);
  if (!validateTargetingAnArray(context, target, "@maxItems")) {
    return;
  }
  if (!validateRange(context, getMinItemsAsNumeric(context.program, target), maxItems)) {
    return;
  }
  setMaxItems(context.program, target, maxItems);
};
var $minValue = (context, target, minValue) => {
  validateDecoratorUniqueOnNode(context, target, $minValue);
  validateDecoratorNotOnType(context, target, $minValueExclusive, $minValue);
  const { program } = context;
  if (!validateTargetingComparableType(context, target, "@minValue")) {
    return;
  }
  if (!validateValueAssignableToTarget(context, target, minValue)) {
    return;
  }
  if (!validateRange(context, minValue, getMaxValueAsNumeric(context.program, target) ?? getMaxValueExclusiveAsNumeric(context.program, target))) {
    return;
  }
  setMinValue(program, target, minValue);
};
var $maxValue = (context, target, maxValue) => {
  validateDecoratorUniqueOnNode(context, target, $maxValue);
  validateDecoratorNotOnType(context, target, $maxValueExclusive, $maxValue);
  const { program } = context;
  if (!validateTargetingComparableType(context, target, "@maxValue")) {
    return;
  }
  if (!validateValueAssignableToTarget(context, target, maxValue)) {
    return;
  }
  if (!validateRange(context, getMinValueAsNumeric(context.program, target) ?? getMinValueExclusiveAsNumeric(context.program, target), maxValue)) {
    return;
  }
  setMaxValue(program, target, maxValue);
};
var $minValueExclusive = (context, target, minValueExclusive) => {
  validateDecoratorUniqueOnNode(context, target, $minValueExclusive);
  validateDecoratorNotOnType(context, target, $minValue, $minValueExclusive);
  const { program } = context;
  if (!validateTargetingComparableType(context, target, "@minValueExclusive")) {
    return;
  }
  if (!validateValueAssignableToTarget(context, target, minValueExclusive)) {
    return;
  }
  if (!validateRange(context, minValueExclusive, getMaxValueAsNumeric(context.program, target) ?? getMaxValueExclusiveAsNumeric(context.program, target))) {
    return;
  }
  setMinValueExclusive(program, target, minValueExclusive);
};
var $maxValueExclusive = (context, target, maxValueExclusive) => {
  validateDecoratorUniqueOnNode(context, target, $maxValueExclusive);
  validateDecoratorNotOnType(context, target, $maxValue, $maxValueExclusive);
  const { program } = context;
  if (!validateTargetingComparableType(context, target, "@maxValueExclusive")) {
    return;
  }
  if (!validateValueAssignableToTarget(context, target, maxValueExclusive)) {
    return;
  }
  if (!validateRange(context, getMinValueAsNumeric(context.program, target) ?? getMinValueExclusiveAsNumeric(context.program, target), maxValueExclusive)) {
    return;
  }
  setMaxValueExclusive(program, target, maxValueExclusive);
};
var [isSecret, markSecret] = useStateSet(createStateSymbol("secretTypes"));
var $secret = (context, target) => {
  validateDecoratorUniqueOnNode(context, target, $secret);
  markSecret(context.program, target);
};
var [getEncode, setEncodeData] = useStateMap(createStateSymbol("encode"));
var $encode = (context, target, encoding, encodeAs) => {
  validateDecoratorUniqueOnNode(context, target, $encode);
  const encodeData = computeEncoding(context.program, encoding, encodeAs);
  if (encodeData === void 0) {
    return;
  }
  const targetType = getPropertyType(target);
  validateEncodeData(context, targetType, encodeData);
  setEncodeData(context.program, target, encodeData);
};
function computeEncoding(program, encodingOrEncodeAs, encodeAs) {
  const strType = program.checker.getStdType("string");
  const resolvedEncodeAs = encodeAs ?? strType;
  if (typeof encodingOrEncodeAs === "string") {
    return { encoding: encodingOrEncodeAs, type: resolvedEncodeAs };
  } else if (isValue(encodingOrEncodeAs)) {
    const member = encodingOrEncodeAs.value;
    if (member.value && typeof member.value === "string") {
      return { encoding: member.value, type: resolvedEncodeAs };
    } else {
      return { encoding: getTypeName(member), type: resolvedEncodeAs };
    }
  } else {
    const originalType = encodingOrEncodeAs;
    if (originalType !== strType) {
      reportDiagnostic(program, {
        code: "invalid-encode",
        messageId: "firstArg",
        target: encodingOrEncodeAs
      });
      return void 0;
    }
    return { type: encodingOrEncodeAs };
  }
}
function validateEncodeData(context, target, encodeData) {
  function check(validTargets, validEncodeTypes) {
    const checker = context.program.checker;
    const isTargetValid = isTypeIn(target, (type) => validTargets.some((validTarget) => {
      return ignoreDiagnostics(checker.isTypeAssignableTo(type, checker.getStdType(validTarget), target));
    }));
    if (!isTargetValid) {
      reportDiagnostic(context.program, {
        code: "invalid-encode",
        messageId: "wrongType",
        format: {
          encoding: encodeData.encoding ?? "string",
          type: getTypeName(target),
          expected: validTargets.join(", ")
        },
        target: context.decoratorTarget
      });
    }
    const isEncodingTypeValid = validEncodeTypes.some((validEncoding) => {
      return ignoreDiagnostics(checker.isTypeAssignableTo(encodeData.type, checker.getStdType(validEncoding), target));
    });
    if (!isEncodingTypeValid) {
      const typeName = getTypeName(encodeData.type);
      reportDiagnostic(context.program, {
        code: "invalid-encode",
        messageId: ["unixTimestamp", "seconds", "milliseconds"].includes(encodeData.encoding ?? "string") ? "wrongNumericEncodingType" : "wrongEncodingType",
        format: {
          encoding: encodeData.encoding,
          type: getTypeName(target),
          expected: validEncodeTypes.join(", "),
          actual: typeName
        },
        target: context.decoratorTarget
      });
    }
  }
  switch (encodeData.encoding) {
    case "rfc3339":
      return check(["utcDateTime", "offsetDateTime"], ["string"]);
    case "rfc7231":
      return check(["utcDateTime", "offsetDateTime"], ["string"]);
    case "unixTimestamp":
      return check(["utcDateTime"], ["integer"]);
    case "seconds":
      return check(["duration"], ["numeric"]);
    case "milliseconds":
      return check(["duration"], ["numeric"]);
    case "base64":
      return check(["bytes"], ["string"]);
    case "base64url":
      return check(["bytes"], ["string"]);
    case void 0:
      return check(["numeric", "boolean"], ["string"]);
  }
}
var $withOptionalProperties = (context, target) => {
  target.properties.forEach((p) => p.optional = true);
};
var $withoutOmittedProperties = (context, target, omitProperties) => {
  const omitNames = /* @__PURE__ */ new Set();
  if (omitProperties.kind === "String") {
    omitNames.add(omitProperties.value);
  } else if (omitProperties.kind === "Union") {
    for (const variant of omitProperties.variants.values()) {
      if (variant.type.kind === "String") {
        omitNames.add(variant.type.value);
      }
    }
  }
  filterModelPropertiesInPlace(target, (prop) => !omitNames.has(prop.name));
};
var $withPickedProperties = (context, target, pickedProperties) => {
  const pickedNames = /* @__PURE__ */ new Set();
  if (pickedProperties.kind === "String") {
    pickedNames.add(pickedProperties.value);
  } else if (pickedProperties.kind === "Union") {
    for (const variant of pickedProperties.variants.values()) {
      if (variant.type.kind === "String") {
        pickedNames.add(variant.type.value);
      }
    }
  }
  filterModelPropertiesInPlace(target, (prop) => pickedNames.has(prop.name));
};
var $withoutDefaultValues = (context, target) => {
  target.properties.forEach((p) => {
    delete p.defaultValue;
  });
};
var [getTagsState, setTags] = useStateMap(createStateSymbol("tagProperties"));
var $tag = (context, target, tag) => {
  const tags = getTagsState(context.program, target);
  if (tags) {
    tags.push(tag);
  } else {
    setTags(context.program, target, [tag]);
  }
};
function getTags(program, target) {
  return getTagsState(program, target) || [];
}
function getAllTags(program, target) {
  const tags = /* @__PURE__ */ new Set();
  let current = target;
  while (current !== void 0) {
    for (const t of getTags(program, current)) {
      tags.add(t);
    }
    if (current.kind === "Operation") {
      current = current.interface ?? current.namespace;
    } else {
      current = current.namespace;
    }
  }
  return tags.size > 0 ? Array.from(tags).reverse() : void 0;
}
var [getFriendlyName, setFriendlyName] = useStateMap(createStateSymbol("friendlyNames"));
var $friendlyName = (context, target, friendlyName, sourceObject) => {
  if (target.kind === "Model" || target.kind === "Operation") {
    if (context.decoratorTarget.kind === SyntaxKind.AugmentDecoratorStatement) {
      if (ignoreDiagnostics(context.program.checker.resolveTypeReference(context.decoratorTarget.targetType))?.node !== target.node) {
        return;
      }
    }
    if (context.decoratorTarget.kind === SyntaxKind.DecoratorExpression) {
      if (context.decoratorTarget.parent !== target.node) {
        return;
      }
    }
  }
  if (sourceObject) {
    friendlyName = replaceTemplatedStringFromProperties(friendlyName, sourceObject);
  }
  setFriendlyName(context.program, target, friendlyName);
};
var $key = (context, entity, altName) => {
  if (entity.optional) {
    reportDiagnostic(context.program, {
      code: "no-optional-key",
      format: { propertyName: entity.name },
      target: entity
    });
    return;
  }
  setKey(context.program, entity, altName || entity.name);
};
function getDeprecated(program, type) {
  return getDeprecationDetails(program, type)?.message;
}
var [getOverloads, setOverloads] = useStateMap(createStateSymbol("overloadedByKey"));
var [getOverloadedOperation, setOverloadBase] = useStateMap(createStateSymbol("overloadsOperation"));
var $overload = (context, target, overloadBase) => {
  const [paramValid, paramDiagnostics] = context.program.checker.isTypeAssignableTo(target.parameters, overloadBase.parameters, target);
  if (!paramValid)
    context.program.reportDiagnostics(paramDiagnostics);
  const [returnTypeValid, returnTypeDiagnostics] = context.program.checker.isTypeAssignableTo(target.returnType, overloadBase.returnType, target);
  if (!returnTypeValid)
    context.program.reportDiagnostics(returnTypeDiagnostics);
  if (!areOperationsInSameContainer(target, overloadBase)) {
    reportDiagnostic(context.program, {
      code: "overload-same-parent",
      target: context.decoratorTarget
    });
  }
  setOverloadBase(context.program, target, overloadBase);
  const existingOverloads = getOverloads(context.program, overloadBase) || new Array();
  setOverloads(context.program, overloadBase, existingOverloads.concat(target));
};
function areOperationsInSameContainer(op1, op2) {
  if (op1.interface || op2.interface) {
    return op1.interface === op2.interface || // Handle mutated/cloned types (e.g., in versioned namespaces) where operations
    // may reference different clones of the same interface by comparing AST nodes.
    op1.interface?.node !== void 0 && op1.interface?.node === op2.interface?.node;
  }
  return op1.namespace === op2.namespace || op1.namespace?.node !== void 0 && op1.namespace?.node === op2.namespace?.node;
}
function validateRange(context, min, max) {
  if (min === void 0 || max === void 0) {
    return true;
  }
  if (!isNumeric(min) || !isNumeric(max)) {
    return true;
  }
  if (min.gt(max)) {
    reportDiagnostic(context.program, {
      code: "invalid-range",
      format: { start: min.toString(), end: max.toString() },
      target: context.decoratorTarget
    });
    return false;
  }
  return true;
}
var discriminatedDecorator = (context, entity, options = {}) => {
  setDiscriminatedOptions(context.program, entity, {
    envelope: "object",
    discriminatorPropertyName: "kind",
    envelopePropertyName: "value",
    ...options
  });
  const [_, diagnostics] = getDiscriminatedUnion(context.program, entity);
  context.program.reportDiagnostics(diagnostics);
};
var $discriminator = (context, entity, propertyName) => {
  setDiscriminator(context.program, entity, { propertyName });
};
var [getExamplesState, setExamples] = useStateMap(createStateSymbol("examples"));
var $example = (context, target, _example, options) => {
  const decorator = target.decorators.find((d) => d.decorator === $example && d.node === context.decoratorTarget);
  compilerAssert(decorator, `Couldn't find @example decorator`, context.decoratorTarget);
  const rawExample = decorator.args[0].value;
  if (Realm.realmForType.get(target) === void 0) {
    if (!checkExampleValid(context.program, rawExample, target.kind === "ModelProperty" ? target.type : target, context.getArgumentTarget(0))) {
      return;
    }
  }
  let list = getExamplesState(context.program, target);
  if (list === void 0) {
    list = [];
    setExamples(context.program, target, list);
  }
  list.push({ value: rawExample, ...options });
};
function getExamples(program, target) {
  return getExamplesState(program, target) ?? [];
}
var [getOpExamplesState, setOpExamples] = useStateMap(createStateSymbol("opExamples"));
var $opExample = (context, target, _example, options) => {
  const decorator = target.decorators.find((d) => d.decorator === $opExample && d.node === context.decoratorTarget);
  compilerAssert(decorator, `Couldn't find @opExample decorator`, context.decoratorTarget);
  const rawExampleConfig = decorator.args[0].value;
  const parameters = rawExampleConfig.properties.get("parameters")?.value;
  const returnType = rawExampleConfig.properties.get("returnType")?.value;
  if (Realm.realmForType.get(target) === void 0) {
    if (parameters && !checkExampleValid(context.program, parameters, target.parameters, context.getArgumentTarget(0))) {
      return;
    }
    if (returnType && !checkExampleValid(context.program, returnType, target.returnType, context.getArgumentTarget(0))) {
      return;
    }
  }
  let list = getOpExamplesState(context.program, target);
  if (list === void 0) {
    list = [];
    setOpExamples(context.program, target, list);
  }
  list.push({ parameters, returnType, ...options });
};
function checkExampleValid(program, value, target, diagnosticTarget) {
  const exactType = program.checker.getValueExactType(value);
  const [assignable, diagnostics] = program.checker.isTypeAssignableTo(exactType ?? value.type, target, diagnosticTarget);
  if (!assignable) {
    program.reportDiagnostics(diagnostics);
  }
  return assignable;
}
function getOpExamples(program, target) {
  return getOpExamplesState(program, target) ?? [];
}

// node_modules/@typespec/compiler/dist/src/typekit/kits/enum.js
defineKit({
  enum: {
    create(desc) {
      const en = this.program.checker.createType({
        kind: "Enum",
        name: desc.name,
        decorators: decoratorApplication(this, desc.decorators),
        members: createRekeyableMap(),
        expression: resolveExpressionFlag("enum", desc.name, desc.expression)
      });
      if (Array.isArray(desc.members)) {
        for (const member of desc.members) {
          member.enum = en;
          en.members.set(member.name, member);
        }
      } else {
        for (const [name, member] of Object.entries(desc.members ?? {})) {
          en.members.set(name, this.enumMember.create({ name, value: member, enum: en }));
        }
      }
      this.program.checker.finishType(en);
      return en;
    },
    is(type) {
      return type.entityKind === "Type" && type.kind === "Enum";
    },
    createFromUnion(type) {
      if (!type.name) {
        throw new Error("Cannot create an enum from an anonymous union.");
      }
      const enumMembers = [];
      for (const variant of type.variants.values()) {
        if (variant.name && typeof variant.name === "symbol" || !this.literal.isString(variant.type) && !this.literal.isNumeric(variant.type)) {
          continue;
        }
        const variantDoc = getDoc(this.program, variant);
        enumMembers.push(this.enumMember.create({
          name: variant.name,
          value: variant.type.value,
          decorators: variantDoc ? [[$doc, variantDoc]] : void 0
        }));
      }
      const unionDoc = getDoc(this.program, type);
      return this.enum.create({
        name: type.name,
        members: enumMembers,
        decorators: unionDoc ? [[$doc, unionDoc]] : void 0
      });
    }
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/intrinsic.js
init_define_process_env();
defineKit({
  intrinsic: {
    get any() {
      return this.program.checker.anyType;
    },
    get error() {
      return this.program.checker.errorType;
    },
    get never() {
      return this.program.checker.neverType;
    },
    get null() {
      return this.program.checker.nullType;
    },
    get void() {
      return this.program.checker.voidType;
    },
    is(entity) {
      return entity.entityKind === "Type" && entity.kind === "Intrinsic";
    }
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/literal.js
init_define_process_env();
defineKit({
  literal: {
    create(value) {
      return this.program.checker.createLiteralType(value);
    },
    createString(value) {
      return this.program.checker.createLiteralType(value);
    },
    createNumeric(value) {
      return this.program.checker.createLiteralType(value);
    },
    createBoolean(value) {
      return this.program.checker.createLiteralType(value);
    },
    isBoolean(type) {
      return type.entityKind === "Type" && type.kind === "Boolean";
    },
    isString(type) {
      return type.entityKind === "Type" && type.kind === "String";
    },
    isNumeric(type) {
      return type.entityKind === "Type" && type.kind === "Number";
    },
    is(type) {
      return this.literal.isBoolean(type) || this.literal.isNumeric(type) || this.literal.isString(type);
    }
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/model-property.js
init_define_process_env();
defineKit({
  modelProperty: {
    is(type) {
      return type.entityKind === "Type" && type.kind === "ModelProperty";
    },
    getEncoding(type) {
      return getEncode(this.program, type) ?? getEncode(this.program, type.type);
    },
    getFormat(type) {
      return getFormat(this.program, type) ?? getFormat(this.program, type.type);
    },
    getVisibilityForClass(property, visibilityClass) {
      return getVisibilityForClass(this.program, property, visibilityClass);
    },
    create(desc) {
      return this.program.checker.createType({
        kind: "ModelProperty",
        name: desc.name,
        type: desc.type,
        optional: desc.optional ?? false,
        decorators: [],
        defaultValue: desc.defaultValue
      });
    }
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/model.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/checker.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/lib/intrinsic/decorators.js
init_define_process_env();
var indexTypeKey = /* @__PURE__ */ Symbol.for(`TypeSpec.index`);
var indexerDecorator = (context, target, key, value) => {
  const indexer = { key, value };
  context.program.stateMap(indexTypeKey).set(target, indexer);
};
function getIndexer(program, target) {
  return program.stateMap(indexTypeKey).get(target);
}
var docFromCommentDecorator = (context, target, key, text) => {
  setDocData(context.program, target, key, { value: text, source: "comment" });
};
var prototypeGetterKey = /* @__PURE__ */ Symbol.for(`TypeSpec.Prototypes.getter`);
function getterDecorator(context, target) {
  context.program.stateMap(prototypeGetterKey).set(target, true);
}

// node_modules/@typespec/compiler/dist/src/core/auto-decorator.js
init_define_process_env();
function getAutoDecoratorStateKey(decoratorFqn) {
  return /* @__PURE__ */ Symbol.for(`dec:${decoratorFqn}`);
}
function createAutoDecoratorImplementation(symbol, node) {
  const fqn = getFullyQualifiedSymbolName(symbol);
  const paramNames = node.parameters.map((p) => p.id.sv);
  const lastParamIsRest = node.parameters.length > 0 && node.parameters[node.parameters.length - 1].rest;
  const impl = (context, target, ...args) => {
    if ("decorators" in target) {
      validateDecoratorUniqueOnNode(context, target, impl);
    }
    const data = {};
    if (lastParamIsRest) {
      for (let i = 0; i < paramNames.length - 1; i++) {
        data[paramNames[i]] = args[i];
      }
      data[paramNames[paramNames.length - 1]] = args.slice(paramNames.length - 1);
    } else {
      for (let i = 0; i < paramNames.length; i++) {
        data[paramNames[i]] = args[i];
      }
    }
    setAutoDecorator(context.program, fqn, target, data);
  };
  Object.defineProperty(impl, "name", { value: `$${node.id.sv}` });
  return impl;
}
function setAutoDecorator(program, decoratorFqn, target, value = {}) {
  const key = getAutoDecoratorStateKey(decoratorFqn);
  program.stateMap(key).set(target, value);
}
function hasAutoDecorator(program, decoratorFqn, target) {
  const key = getAutoDecoratorStateKey(decoratorFqn);
  return program.stateMap(key).has(target);
}
function getAutoDecoratorValue(program, decoratorFqn, target) {
  const key = getAutoDecoratorStateKey(decoratorFqn);
  return program.stateMap(key).get(target);
}
function getAutoDecoratorTargets(program, decoratorFqn) {
  const key = getAutoDecoratorStateKey(decoratorFqn);
  return program.stateMap(key);
}

// node_modules/@typespec/compiler/dist/src/core/binder.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/features.js
init_define_process_env();
var compilerFeatures = {
  "function-declarations": {
    description: "Allows use of function declarations without experimental warnings in project code."
  },
  "declaration-expressions": {
    description: "Allows use of declaration expressions (named or anonymous model, scalar, enum and union declarations in expression position) in project code."
  },
  "auto-decorators": {
    description: "Allows use of auto decorator declarations without experimental warnings in project code."
  },
  "type-info-provider": {
    description: "Enables the experimental `$provideTypeInfo` provider allowing libraries to contribute extra information about types to IDE hover and tooling (queried via `program.getTypeInfo`)."
  },
  "union-extends": {
    description: "Enables experimental union `extends` clauses in project code."
  }
};
var compilerFeatureNames = Object.keys(compilerFeatures);
var compilerFeatureNameSet = new Set(compilerFeatureNames);
function isCompilerFeatureName(feature) {
  return compilerFeatureNameSet.has(feature);
}
function isCompilerFeatureEnabled(program, feature, target) {
  if (target === void 0) {
    return program.compilerOptions.configFile?.features?.includes(feature) ?? false;
  }
  const context = getLocationContext(program, target);
  switch (context.type) {
    case "project":
      return program.compilerOptions.configFile?.features?.includes(feature) ?? false;
    case "library":
      return context.features?.includes(feature) ?? false;
    default:
      return false;
  }
}

// node_modules/@typespec/compiler/dist/src/core/binder.js
var DecoratorFunctionPattern = /^\$/;
var SymbolTable = class extends Map {
  duplicates = /* @__PURE__ */ new Map();
  constructor(source) {
    super();
    if (source) {
      this.include(source);
    }
  }
  /** {@inheritdoc MutableSymboleTable} */
  include(source, parentSym) {
    for (const [key, value] of source) {
      super.set(key, { ...value, parent: parentSym ?? value.parent });
    }
    for (const [key, value] of source.duplicates) {
      this.duplicates.set(key, new Set(value));
    }
  }
  // First set for a given key wins, but record all duplicates for diagnostics.
  set(key, value) {
    const existing = super.get(key);
    if (existing === void 0) {
      super.set(key, value);
    } else {
      if (existing.flags & SymbolFlags.Using) {
        mutate(existing).flags |= SymbolFlags.DuplicateUsing;
      }
      const duplicateArray = this.duplicates.get(existing);
      if (duplicateArray) {
        duplicateArray.add(value);
      } else {
        this.duplicates.set(existing, /* @__PURE__ */ new Set([existing, value]));
      }
    }
    return this;
  }
};
function createSymbolTable(source) {
  return new SymbolTable(source);
}
function createBinder(program) {
  let currentFile;
  let parentNode;
  let fileNamespace;
  let scope;
  return {
    bindSourceFile,
    bindJsSourceFile,
    bindNode
  };
  function isFunctionName(name) {
    return DecoratorFunctionPattern.test(name);
  }
  function getFunctionName(name) {
    return name.replace(DecoratorFunctionPattern, "");
  }
  function bindJsSourceFile(sourceFile) {
    if (sourceFile.symbol !== void 0) {
      return;
    }
    fileNamespace = void 0;
    mutate(sourceFile).symbol = createSymbol(sourceFile, sourceFile.file.path, SymbolFlags.SourceFile | SymbolFlags.Declaration);
    const rootNs = sourceFile.esmExports["namespace"];
    for (const [key, member] of Object.entries(sourceFile.esmExports)) {
      let name;
      if (key === "$flags") {
        const context = getLocationContext(program, sourceFile);
        if (context.type === "library" || context.type === "project") {
          mutate(context).flags = member;
        }
      } else if (key === "$decorators") {
        const value = member;
        for (const [namespaceName, decorators] of Object.entries(value)) {
          for (const [decoratorName, decorator] of Object.entries(decorators)) {
            bindFunctionImplementation(namespaceName === "" ? [] : namespaceName.split("."), "decorator", decoratorName, decorator, sourceFile);
          }
        }
      } else if (key === "$functions") {
        const value = member;
        for (const [namespaceName, functions] of Object.entries(value)) {
          for (const [functionName, fn] of Object.entries(functions)) {
            bindFunctionImplementation(namespaceName === "" ? [] : namespaceName.split("."), "function", functionName, fn, sourceFile);
          }
        }
      } else if (typeof member === "function") {
        if (isFunctionName(key)) {
          name = getFunctionName(key);
          if (name === "onValidate") {
            const context = getLocationContext(program, sourceFile);
            const metadata = context.type === "library" ? context.metadata : { type: "file" };
            program.onValidate(member, metadata);
            continue;
          } else if (name === "provideTypeInfo") {
            if (isCompilerFeatureEnabled(program, "type-info-provider", sourceFile)) {
              const context = getLocationContext(program, sourceFile);
              const metadata = context.type === "library" ? context.metadata : { type: "file" };
              program.registerTypeInfoProvider(member, metadata);
            }
            continue;
          } else if (name === "onEmit") {
            continue;
          }
          const nsParts = resolveJSMemberNamespaceParts(rootNs, member);
          bindFunctionImplementation(nsParts, "decorator", name, member, sourceFile);
        }
      }
    }
  }
  function bindFunctionImplementation(nsParts, kind, name, fn, sourceFile) {
    let containerSymbol = sourceFile.symbol;
    const tracer = program.tracer.sub("bind.js");
    for (const part of nsParts) {
      const existingBinding = containerSymbol.exports.get(part);
      const jsNamespaceNode = {
        kind: SyntaxKind.JsNamespaceDeclaration,
        id: {
          kind: SyntaxKind.Identifier,
          sv: part,
          pos: 0,
          end: 0,
          flags: NodeFlags.None,
          symbol: void 0
        },
        pos: sourceFile.pos,
        end: sourceFile.end,
        parent: sourceFile,
        flags: NodeFlags.None,
        symbol: void 0,
        modifiers: [],
        modifierFlags: ModifierFlags.None
      };
      const sym2 = createSymbol(jsNamespaceNode, part, SymbolFlags.Namespace | SymbolFlags.Declaration, containerSymbol);
      mutate(jsNamespaceNode).symbol = sym2;
      if (existingBinding) {
        if (existingBinding.flags & SymbolFlags.Namespace) {
          containerSymbol = existingBinding;
        } else {
          mutate(containerSymbol.exports).set(part, sym2);
        }
      } else {
        mutate(sym2).exports = createSymbolTable();
        mutate(containerSymbol.exports).set(part, sym2);
        containerSymbol = sym2;
      }
    }
    let sym;
    if (kind === "decorator") {
      tracer.trace("decorator", `Bound decorator "@${name}" in namespace "${nsParts.join(".")}".`);
      sym = createSymbol(sourceFile, "@" + name, SymbolFlags.Decorator | SymbolFlags.Declaration | SymbolFlags.Implementation, containerSymbol);
    } else {
      tracer.trace("function", `Bound function "${name}" in namespace "${nsParts.join(".")}".`);
      sym = createSymbol(sourceFile, name, SymbolFlags.Function | SymbolFlags.Declaration | SymbolFlags.Implementation, containerSymbol);
    }
    mutate(sym).value = fn;
    mutate(containerSymbol.exports).set(sym.name, sym);
  }
  function resolveJSMemberNamespaceParts(rootNs, member) {
    const memberNs = member.namespace;
    const nsParts = [];
    if (rootNs) {
      nsParts.push(...rootNs.split("."));
    }
    if (memberNs) {
      nsParts.push(...memberNs.split("."));
    }
    return nsParts;
  }
  function bindSourceFile(script) {
    if (script.locals !== void 0) {
      return;
    }
    mutate(script).locals = createSymbolTable();
    mutate(script).symbol = createSymbol(script, script.file.path, SymbolFlags.SourceFile);
    mutate(script.symbol).exports = createSymbolTable();
    fileNamespace = void 0;
    currentFile = script;
    scope = script;
    bindNode(script);
  }
  function bindNode(node) {
    if (!node)
      return;
    mutate(node).parent = parentNode;
    switch (node.kind) {
      case SyntaxKind.ModelStatement:
        bindModelStatement(node);
        break;
      case SyntaxKind.ModelDeclarationExpression:
        bindModelDeclarationExpression(node);
        break;
      case SyntaxKind.ModelExpression:
        bindModelExpression(node);
        break;
      case SyntaxKind.ModelProperty:
        bindModelProperty(node);
        break;
      case SyntaxKind.IntersectionExpression:
        bindIntersectionExpression(node);
        break;
      case SyntaxKind.ScalarStatement:
        bindScalarStatement(node);
        break;
      case SyntaxKind.ScalarDeclarationExpression:
        bindScalarDeclarationExpression(node);
        break;
      case SyntaxKind.ScalarConstructor:
        bindScalarConstructor(node);
        break;
      case SyntaxKind.InterfaceStatement:
        bindInterfaceStatement(node);
        break;
      case SyntaxKind.UnionStatement:
        bindUnionStatement(node);
        break;
      case SyntaxKind.UnionDeclarationExpression:
        bindUnionDeclarationExpression(node);
        break;
      case SyntaxKind.AliasStatement:
        bindAliasStatement(node);
        break;
      case SyntaxKind.ConstStatement:
        bindConstStatement(node);
        break;
      case SyntaxKind.EnumStatement:
        bindEnumStatement(node);
        break;
      case SyntaxKind.EnumDeclarationExpression:
        bindEnumDeclarationExpression(node);
        break;
      case SyntaxKind.EnumMember:
        bindEnumMember(node);
        break;
      case SyntaxKind.UnionVariant:
        bindUnionVariant(node);
        break;
      case SyntaxKind.NamespaceStatement:
        bindNamespaceStatement(node);
        break;
      case SyntaxKind.OperationStatement:
        bindOperationStatement(node);
        break;
      case SyntaxKind.TemplateParameterDeclaration:
        bindTemplateParameterDeclaration(node);
        break;
      case SyntaxKind.UsingStatement:
        bindUsingStatement(node);
        break;
      case SyntaxKind.DecoratorDeclarationStatement:
        bindDecoratorDeclarationStatement(node);
        break;
      case SyntaxKind.FunctionDeclarationStatement:
        bindFunctionDeclarationStatement(node);
        break;
      case SyntaxKind.FunctionParameter:
        bindFunctionParameter(node);
        break;
    }
    const prevParent = parentNode;
    parentNode = node;
    if (hasScope(node)) {
      const prevScope = scope;
      scope = node;
      visitChildren(node, bindNode);
      if ("locals" in node) {
        program.reportDuplicateSymbols(node.locals);
      }
      if (prevScope?.kind === SyntaxKind.TypeSpecScript && fileNamespace) {
        scope = fileNamespace;
      } else {
        scope = prevScope;
      }
    } else {
      visitChildren(node, bindNode);
    }
    parentNode = prevParent;
  }
  function bindTemplateParameterDeclaration(node) {
    declareSymbol(node, SymbolFlags.TemplateParameter | SymbolFlags.Declaration);
  }
  function bindModelStatement(node) {
    const internal = node.modifierFlags & ModifierFlags.Internal ? SymbolFlags.Internal : SymbolFlags.None;
    declareSymbol(node, SymbolFlags.Model | SymbolFlags.Declaration | internal);
    mutate(node).locals = new SymbolTable();
  }
  function bindModelDeclarationExpression(node) {
    bindSymbol(node, SymbolFlags.Model);
    mutate(node).locals = new SymbolTable();
  }
  function bindModelExpression(node) {
    bindSymbol(node, SymbolFlags.Model);
  }
  function bindModelProperty(node) {
    declareMember(node, SymbolFlags.Member, node.id.sv);
  }
  function bindIntersectionExpression(node) {
    bindSymbol(node, SymbolFlags.Model);
  }
  function bindScalarStatement(node) {
    const internal = node.modifierFlags & ModifierFlags.Internal ? SymbolFlags.Internal : SymbolFlags.None;
    declareSymbol(node, SymbolFlags.Scalar | SymbolFlags.Declaration | internal);
    mutate(node).locals = new SymbolTable();
  }
  function bindScalarDeclarationExpression(node) {
    bindSymbol(node, SymbolFlags.Scalar);
    mutate(node).locals = new SymbolTable();
  }
  function bindScalarConstructor(node) {
    declareMember(node, SymbolFlags.Member, node.id.sv);
  }
  function bindInterfaceStatement(node) {
    const internal = node.modifierFlags & ModifierFlags.Internal ? SymbolFlags.Internal : SymbolFlags.None;
    declareSymbol(node, SymbolFlags.Interface | SymbolFlags.Declaration | internal);
    mutate(node).locals = new SymbolTable();
  }
  function bindUnionStatement(node) {
    const internal = node.modifierFlags & ModifierFlags.Internal ? SymbolFlags.Internal : SymbolFlags.None;
    declareSymbol(node, SymbolFlags.Union | SymbolFlags.Declaration | internal);
    mutate(node).locals = new SymbolTable();
  }
  function bindUnionDeclarationExpression(node) {
    bindSymbol(node, SymbolFlags.Union);
    mutate(node).locals = new SymbolTable();
  }
  function bindAliasStatement(node) {
    const internal = node.modifierFlags & ModifierFlags.Internal ? SymbolFlags.Internal : SymbolFlags.None;
    declareSymbol(node, SymbolFlags.Alias | SymbolFlags.Declaration | internal);
    mutate(node).locals = new SymbolTable();
  }
  function bindConstStatement(node) {
    const internal = node.modifierFlags & ModifierFlags.Internal ? SymbolFlags.Internal : SymbolFlags.None;
    declareSymbol(node, SymbolFlags.Const | SymbolFlags.Declaration | internal);
  }
  function bindEnumStatement(node) {
    const internal = node.modifierFlags & ModifierFlags.Internal ? SymbolFlags.Internal : SymbolFlags.None;
    declareSymbol(node, SymbolFlags.Enum | SymbolFlags.Declaration | internal);
  }
  function bindEnumDeclarationExpression(node) {
    bindSymbol(node, SymbolFlags.Enum);
  }
  function bindEnumMember(node) {
    declareMember(node, SymbolFlags.Member, node.id.sv);
  }
  function bindUnionVariant(node) {
    if (node.id) {
      declareMember(node, SymbolFlags.Member, node.id.sv);
    }
  }
  function bindNamespaceStatement(statement) {
    const effectiveScope = scope;
    const existingBinding = effectiveScope.symbol.exports.get(statement.id.sv);
    if (existingBinding && existingBinding.flags & SymbolFlags.Namespace) {
      mutate(statement).symbol = existingBinding;
      mutate(statement).locals = createSymbolTable();
      mutate(existingBinding.declarations).push(statement);
    } else {
      mutate(statement).locals = createSymbolTable();
      declareSymbol(statement, SymbolFlags.Namespace | SymbolFlags.Declaration);
    }
    currentFile.namespaces.push(statement);
    if (statement.statements === void 0) {
      fileNamespace = statement;
      scope = statement;
      let current = statement;
      while (current.kind !== SyntaxKind.TypeSpecScript) {
        currentFile.inScopeNamespaces.push(current);
        current = current.parent;
      }
    }
  }
  function bindUsingStatement(statement) {
    mutate(statement).scopeNamespace = scope.kind === SyntaxKind.NamespaceStatement ? scope : void 0;
    mutate(currentFile.usings).push(statement);
  }
  function bindOperationStatement(statement) {
    const internal = statement.modifierFlags & ModifierFlags.Internal ? SymbolFlags.Internal : SymbolFlags.None;
    if (scope.kind === SyntaxKind.InterfaceStatement) {
      declareMember(statement, SymbolFlags.Operation | SymbolFlags.Member | SymbolFlags.Declaration | internal, statement.id.sv);
    } else {
      declareSymbol(statement, SymbolFlags.Operation | SymbolFlags.Declaration | internal);
    }
    mutate(statement).locals = createSymbolTable();
  }
  function bindDecoratorDeclarationStatement(node) {
    const internal = node.modifierFlags & ModifierFlags.Internal ? SymbolFlags.Internal : SymbolFlags.None;
    declareSymbol(node, SymbolFlags.Decorator | SymbolFlags.Declaration | internal, `@${node.id.sv}`);
  }
  function bindFunctionDeclarationStatement(node) {
    const internal = node.modifierFlags & ModifierFlags.Internal ? SymbolFlags.Internal : SymbolFlags.None;
    declareSymbol(node, SymbolFlags.Function | SymbolFlags.Declaration | internal);
  }
  function bindFunctionParameter(node) {
    const symbol = createSymbol(node, node.id.sv, SymbolFlags.FunctionParameter | SymbolFlags.Declaration, scope.symbol);
    mutate(node).symbol = symbol;
  }
  function declareSymbol(node, flags, name) {
    compilerAssert(flags & SymbolFlags.Declaration, `Expected declaration symbol: ${name}`, node);
    switch (scope.kind) {
      case SyntaxKind.NamespaceStatement:
        return declareNamespaceMember(node, flags, name);
      case SyntaxKind.TypeSpecScript:
      case SyntaxKind.JsSourceFile:
        return declareScriptMember(node, flags, name);
      default:
        const key = name ?? node.id.sv;
        const symbol = createSymbol(node, key, flags, scope?.symbol);
        mutate(node).symbol = symbol;
        mutate(scope.locals).set(key, symbol);
        return symbol;
    }
  }
  function bindSymbol(node, flags) {
    const symbol = createSymbol(node, "-", flags, scope?.symbol);
    mutate(node).symbol = symbol;
    return symbol;
  }
  function declareNamespaceMember(node, flags, name) {
    if (flags & SymbolFlags.Namespace && mergeNamespaceDeclarations(node, scope)) {
      return;
    }
    const key = name ?? node.id.sv;
    const symbol = createSymbol(node, key, flags, scope.symbol);
    mutate(node).symbol = symbol;
    mutate(scope.symbol.exports).set(key, symbol);
    return symbol;
  }
  function declareScriptMember(node, flags, name) {
    const effectiveScope = scope;
    if (flags & SymbolFlags.Namespace && mergeNamespaceDeclarations(node, effectiveScope)) {
      return;
    }
    const key = name ?? node.id.sv;
    const symbol = createSymbol(node, key, flags, fileNamespace?.symbol);
    mutate(node).symbol = symbol;
    mutate(effectiveScope.symbol.exports).set(key, symbol);
    return symbol;
  }
  function declareMember(node, flags, name) {
    const symbol = createSymbol(node, name, flags, scope.symbol);
    mutate(node).symbol = symbol;
    mutate(scope.symbol.members).set(name, symbol);
    return symbol;
  }
  function mergeNamespaceDeclarations(node, scope2) {
    const existingBinding = scope2.symbol.exports.get(node.id.sv);
    if (existingBinding && existingBinding.flags & SymbolFlags.Namespace) {
      mutate(existingBinding.declarations).push(node);
      mutate(node).symbol = existingBinding;
      return true;
    }
    return false;
  }
}
function hasScope(node) {
  switch (node.kind) {
    case SyntaxKind.ModelStatement:
    case SyntaxKind.ModelDeclarationExpression:
    case SyntaxKind.ModelExpression:
    case SyntaxKind.ScalarStatement:
    case SyntaxKind.ScalarDeclarationExpression:
    case SyntaxKind.ConstStatement:
    case SyntaxKind.AliasStatement:
    case SyntaxKind.TypeSpecScript:
    case SyntaxKind.InterfaceStatement:
    case SyntaxKind.OperationStatement:
    case SyntaxKind.UnionStatement:
    case SyntaxKind.UnionDeclarationExpression:
    case SyntaxKind.EnumStatement:
    case SyntaxKind.EnumDeclarationExpression:
      return true;
    case SyntaxKind.NamespaceStatement:
      return node.statements !== void 0;
    default:
      return false;
  }
}
function createSymbol(node, name, flags, parent, value) {
  let exports;
  if (flags & SymbolFlags.ExportContainer) {
    exports = createSymbolTable();
  }
  let members;
  if (flags & SymbolFlags.MemberContainer) {
    members = createSymbolTable();
  }
  compilerAssert(!(flags & SymbolFlags.Declaration) || node !== void 0, "Declaration without node");
  return {
    declarations: flags & SymbolFlags.Declaration ? [node] : [],
    node: !(flags & SymbolFlags.Declaration) ? node : void 0,
    name,
    exports,
    members,
    flags,
    value,
    parent,
    metatypeMembers: createSymbolTable()
  };
}
function getSymNode(sym) {
  return sym.flags & SymbolFlags.Declaration ? sym.declarations[0] : sym.node;
}

// node_modules/@typespec/compiler/dist/src/core/compiler-code-fixes/change-identifier.codefix.js
init_define_process_env();
function createChangeIdentifierCodeFix(node, newIdentifier) {
  return defineCodeFix({
    id: "change-identifier",
    label: `Change ${node.sv} to ${newIdentifier}`,
    fix: (context) => {
      const location = getSourceLocation(node);
      return context.replaceText(location, newIdentifier);
    }
  });
}

// node_modules/@typespec/compiler/dist/src/core/compiler-code-fixes/convert-to-value.codefix.js
init_define_process_env();
function createTupleToArrayValueCodeFix(node) {
  return defineCodeFix({
    id: "tuple-to-array-value",
    label: `Convert to an array value \`#[]\``,
    fix: (context) => {
      const result = [];
      addCreatedCodeFixResult(node);
      createChildTupleToArrValCodeFix(node, addCreatedCodeFixResult);
      return result;
      function addCreatedCodeFixResult(node2) {
        const location = getSourceLocation(node2);
        result.push(context.prependText(location, "#"));
      }
    }
  });
}
function createModelToObjectValueCodeFix(node) {
  return defineCodeFix({
    id: "model-to-object-value",
    label: `Convert to an object value \`#{}\``,
    fix: (context) => {
      const result = [];
      addCreatedCodeFixResult(node);
      createChildModelToObjValCodeFix(node, addCreatedCodeFixResult);
      return result;
      function addCreatedCodeFixResult(node2) {
        const location = getSourceLocation(node2);
        result.push(context.prependText(location, "#"));
      }
    }
  });
}
function createChildTupleToArrValCodeFix(node, addCreatedCodeFixResult) {
  for (const childNode of node.values) {
    if (childNode.kind === SyntaxKind.ModelExpression) {
      addCreatedCodeFixResult(childNode);
      createChildModelToObjValCodeFix(childNode, addCreatedCodeFixResult);
    } else if (childNode.kind === SyntaxKind.TupleExpression) {
      addCreatedCodeFixResult(childNode);
      createChildTupleToArrValCodeFix(childNode, addCreatedCodeFixResult);
    }
  }
}
function createChildModelToObjValCodeFix(node, addCreatedCodeFixResult) {
  for (const prop of node.properties.values()) {
    if (prop.kind === SyntaxKind.ModelProperty) {
      const childNode = prop.value;
      if (childNode.kind === SyntaxKind.ModelExpression) {
        addCreatedCodeFixResult(childNode);
        createChildModelToObjValCodeFix(childNode, addCreatedCodeFixResult);
      } else if (childNode.kind === SyntaxKind.TupleExpression) {
        addCreatedCodeFixResult(childNode);
        createChildTupleToArrValCodeFix(childNode, addCreatedCodeFixResult);
      }
    }
  }
}

// node_modules/@typespec/compiler/dist/src/core/helpers/string-template-utils.js
init_define_process_env();
function isStringTemplateSerializable(stringTemplate) {
  if (stringTemplate.stringValue !== void 0) {
    return [true, []];
  } else {
    return [false, explainStringTemplateNotSerializable(stringTemplate)];
  }
}
function explainStringTemplateNotSerializable(stringTemplate) {
  const diagnostics = createDiagnosticCollector();
  for (const span of stringTemplate.spans) {
    if (span.isInterpolated) {
      switch (span.type.kind) {
        case "String":
        case "Number":
        case "Boolean":
          break;
        case "StringTemplate":
          diagnostics.pipe(isStringTemplateSerializable(span.type));
          break;
        case "TemplateParameter":
        case "TemplateParameterAccess":
          if (span.type.constraint && span.type.constraint.valueType !== void 0) {
            break;
          }
        // eslint-disable-next-line no-fallthrough
        default:
          if (!isErrorType(span.type)) {
            diagnostics.add(createDiagnostic({
              code: "non-literal-string-template",
              target: span
            }));
          }
      }
    }
  }
  return diagnostics.diagnostics;
}

// node_modules/@typespec/compiler/dist/src/core/js-marshaller.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/numeric-ranges.js
init_define_process_env();
var numericRanges = {
  int64: [
    Numeric("-9223372036854775808"),
    Numeric("9223372036854775807"),
    { int: true, isJsNumber: false }
  ],
  int32: [Numeric("-2147483648"), Numeric("2147483647"), { int: true, isJsNumber: true }],
  int16: [Numeric("-32768"), Numeric("32767"), { int: true, isJsNumber: true }],
  int8: [Numeric("-128"), Numeric("127"), { int: true, isJsNumber: true }],
  uint64: [Numeric("0"), Numeric("18446744073709551615"), { int: true, isJsNumber: false }],
  uint32: [Numeric("0"), Numeric("4294967295"), { int: true, isJsNumber: true }],
  uint16: [Numeric("0"), Numeric("65535"), { int: true, isJsNumber: true }],
  uint8: [Numeric("0"), Numeric("255"), { int: true, isJsNumber: true }],
  safeint: [
    Numeric(Number.MIN_SAFE_INTEGER.toString()),
    Numeric(Number.MAX_SAFE_INTEGER.toString()),
    { int: true, isJsNumber: true }
  ],
  float32: [Numeric("-3.4e38"), Numeric("3.4e38"), { int: false, isJsNumber: true }],
  float64: [
    Numeric(`${-Number.MAX_VALUE}`),
    Numeric(Number.MAX_VALUE.toString()),
    { int: false, isJsNumber: true }
  ]
};

// node_modules/@typespec/compiler/dist/src/core/js-marshaller.js
function marshalTypeForJs(value, valueConstraint) {
  switch (value.valueKind) {
    case "BooleanValue":
    case "StringValue":
      return value.value;
    case "NumericValue":
      return numericValueToJs(value, valueConstraint);
    case "ObjectValue":
      return objectValueToJs(value);
    case "ArrayValue":
      return arrayValueToJs(value);
    case "NullValue":
    case "TemplateValue":
      return null;
    case "ScalarValue":
    case "EnumValue":
    case "Function":
      return value;
    default:
      compilerAssert(false, `Cannot marshal value of kind '${value.valueKind}' to JS.`);
  }
}
function isNumericScalar(scalar) {
  let current = scalar;
  while (current) {
    if (current.name === "numeric" && current.namespace?.name === "TypeSpec") {
      return true;
    }
    current = current.baseScalar;
  }
  return false;
}
function canNumericConstraintBeJsNumber(type) {
  if (type === void 0)
    return true;
  switch (type.kind) {
    case "Scalar":
      if (isNumericScalar(type)) {
        return numericRanges[type.name]?.[2].isJsNumber;
      } else {
        return true;
      }
    case "Union":
      return [...type.variants.values()].every((x) => canNumericConstraintBeJsNumber(x.type));
    default:
      return true;
  }
}
function numericValueToJs(type, valueConstraint) {
  const canBeANumber = canNumericConstraintBeJsNumber(valueConstraint);
  if (canBeANumber) {
    const asNumber = type.value.asNumber();
    compilerAssert(asNumber !== null, `Numeric value '${type.value.toString()}' is not able to convert to a number without losing precision.`);
    return asNumber;
  }
  return type.value;
}
function objectValueToJs(type) {
  return Object.fromEntries([...type.properties].map(([key, value]) => [key, marshalTypeForJs(value.value, void 0)]));
}
function arrayValueToJs(type) {
  return type.values.map((x) => marshalTypeForJs(x, void 0));
}
function unmarshalJsToValue(program, value, onInvalid) {
  if (typeof value === "object" && value !== null && "entityKind" in value && value.entityKind === "Value") {
    return value;
  }
  if (value === null || value === void 0) {
    return {
      entityKind: "Value",
      valueKind: "NullValue",
      value: null,
      type: program.checker.nullType
    };
  } else if (typeof value === "boolean") {
    const boolean = program.checker.getStdType("boolean");
    return {
      entityKind: "Value",
      valueKind: "BooleanValue",
      value,
      type: boolean,
      scalar: boolean
    };
  } else if (typeof value === "string") {
    const string = program.checker.getStdType("string");
    return {
      entityKind: "Value",
      valueKind: "StringValue",
      value,
      type: string,
      scalar: string
    };
  } else if (typeof value === "number") {
    const numeric = Numeric(String(value));
    const numericType = program.checker.getStdType("numeric");
    return {
      entityKind: "Value",
      valueKind: "NumericValue",
      value: numeric,
      type: $(program).literal.create(value),
      scalar: numericType
    };
  } else if (Array.isArray(value)) {
    const values = [];
    const uniqueTypes = /* @__PURE__ */ new Set();
    for (const item of value) {
      const itemValue = unmarshalJsToValue(program, item, onInvalid);
      if (itemValue) {
        values.push(itemValue);
        uniqueTypes.add(itemValue.type);
      }
    }
    return {
      entityKind: "Value",
      valueKind: "ArrayValue",
      type: $(program).array.create($(program).union.create([...uniqueTypes])),
      values
    };
  } else if (typeof value === "object" && !("entityKind" in value)) {
    const properties = /* @__PURE__ */ new Map();
    for (const [key, val] of Object.entries(value)) {
      const propertyValue = unmarshalJsToValue(program, val, onInvalid);
      if (propertyValue) {
        properties.set(key, { name: key, value: propertyValue });
      }
    }
    return {
      entityKind: "Value",
      valueKind: "ObjectValue",
      properties,
      type: $(program).model.create({
        properties: Object.fromEntries([...properties.entries()].map(([k, v]) => [k, $(program).modelProperty.create({ name: k, type: v.value.type })]))
      })
    };
  } else {
    onInvalid(value);
    return null;
  }
}

// node_modules/@typespec/compiler/dist/src/core/type-relation-checker.js
init_define_process_env();
var Related;
(function(Related2) {
  Related2[Related2["false"] = 0] = "false";
  Related2[Related2["true"] = 1] = "true";
  Related2[Related2["maybe"] = 2] = "maybe";
})(Related || (Related = {}));
function createRelationCache() {
  return new MultiKeyMap();
}
var ReflectionNameToKind = {
  Enum: "Enum",
  EnumMember: "EnumMember",
  Interface: "Interface",
  Model: "Model",
  ModelProperty: "ModelProperty",
  Namespace: "Namespace",
  Operation: "Operation",
  Scalar: "Scalar",
  TemplateParameter: "TemplateParameter",
  Tuple: "Tuple",
  Union: "Union",
  UnionVariant: "UnionVariant"
};
function createTypeRelationChecker(program, checker) {
  return {
    isTypeAssignableTo,
    isValueOfType,
    isReflectionType,
    areScalarsRelated
  };
  function isTypeAssignableTo(source, target, diagnosticTarget) {
    const [related, errors] = isTypeAssignableToInternal(source, target, diagnosticTarget, createRelationCache());
    return [related === Related.true, convertErrorsToDiagnostics(errors, diagnosticTarget)];
  }
  function isTargetChildOf(target, base) {
    const errorNode = "kind" in target && typeof target.kind === "number" ? target : target.node;
    const baseNode = "kind" in base && typeof base.kind === "number" ? base : base.node;
    let currentNode = errorNode;
    while (currentNode) {
      if (currentNode === baseNode) {
        return true;
      }
      currentNode = currentNode.parent;
    }
    return false;
  }
  function convertErrorsToDiagnostics(errors, diagnosticBase) {
    return errors.flatMap((x) => convertErrorToDiagnostic(x, diagnosticBase));
  }
  function combineErrorMessage(error) {
    let message = error.message;
    let current = error.children[0];
    let indent = "  ";
    while (current !== void 0) {
      message += current.message.split("\n").map((line) => `
${indent}${line}`).join("");
      indent += "  ";
      current = current.children[0];
    }
    return message;
  }
  function flattenErrors(error, diagnosticBase) {
    if (!isTargetChildOf(error.target, diagnosticBase)) {
      return [{ ...error, target: diagnosticBase }];
    }
    if (error.children.length === 0) {
      return [error];
    }
    return error.children.flatMap((x) => flattenErrors(x, error.target));
  }
  function convertErrorToDiagnostic(error, diagnosticBase) {
    const flattened = flattenErrors(error, diagnosticBase);
    return flattened.map((error2) => {
      const messageBase = error2.skipIfFirst && error2.children.length > 0 ? error2.children[0] : error2;
      const message = combineErrorMessage(messageBase);
      return {
        severity: "error",
        code: error2.code,
        message,
        target: error2.target
      };
    });
  }
  function isValueOfType(source, target, diagnosticTarget) {
    const [related, errors] = isValueOfTypeInternal(source, target, diagnosticTarget, createRelationCache());
    return [related === Related.true, convertErrorsToDiagnostics(errors, diagnosticTarget)];
  }
  function isTypeAssignableToInternal(source, target, diagnosticTarget, relationCache) {
    const cached = relationCache.get([source, target]);
    if (cached !== void 0) {
      return cached;
    }
    const result = isTypeAssignableToWorker(source, target, diagnosticTarget, relationCache);
    relationCache.set([source, target], result);
    return result;
  }
  function isTypeAssignableToWorker(source, target, diagnosticTarget, relationCache) {
    if ("kind" in source && (source.kind === "TemplateParameter" || source.kind === "TemplateParameterAccess")) {
      source = source.constraint ?? checker.anyType;
    }
    if (target.entityKind === "Indeterminate") {
      target = target.type;
    }
    if (source === target)
      return [Related.true, []];
    if (isValue(target)) {
      return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
    }
    if (source.entityKind === "Indeterminate") {
      return isIndeterminateEntityAssignableTo(source, target, diagnosticTarget, relationCache);
    }
    if (target.entityKind === "MixedParameterConstraint") {
      return isAssignableToMixedParameterConstraint(source, target, diagnosticTarget, relationCache);
    }
    if (isValue(source) || source.entityKind === "MixedParameterConstraint" && source.valueType) {
      return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
    }
    if (source.entityKind === "MixedParameterConstraint") {
      return isTypeAssignableToInternal(source.type, target, diagnosticTarget, relationCache);
    }
    if (isReflectionType(target)) {
      return source.kind === ReflectionNameToKind[target.name] || isNeverType(source) ? [Related.true, []] : [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
    }
    const isSimpleTypeRelated = isSimpleTypeAssignableTo(source, target);
    if (isSimpleTypeRelated === true) {
      return [Related.true, []];
    } else if (isSimpleTypeRelated === false) {
      return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
    }
    if (source.kind === "Union") {
      relationCache.set([source, target], [Related.maybe, []]);
      for (const variant of source.variants.values()) {
        const [variantAssignable] = isTypeAssignableToInternal(variant.type, target, diagnosticTarget, relationCache);
        if (!variantAssignable) {
          return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
        }
      }
      return [Related.true, []];
    }
    if (target.kind === "Model" && source.kind === "Model" && target.name !== "object" && target.indexer === void 0 && source.indexer && source.indexer.key.name === "integer") {
      return [
        Related.false,
        [
          createTypeRelationError({
            code: "missing-index",
            format: {
              indexType: getTypeName(source.indexer.key),
              sourceType: getTypeName(target)
            },
            diagnosticTarget
          })
        ]
      ];
    } else if (target.kind === "Model" && isArrayModelType(target) && source.kind === "Model") {
      if (isArrayModelType(source)) {
        return hasIndexAndIsAssignableTo(source, target, diagnosticTarget, relationCache);
      } else {
        return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
      }
    } else if (target.kind === "Model" && source.kind === "Model") {
      return areModelsRelated(source, target, diagnosticTarget, relationCache);
    } else if (target.kind === "Model" && isArrayModelType(target) && source.kind === "Tuple") {
      return isTupleAssignableToArray(source, target, diagnosticTarget, relationCache);
    } else if (target.kind === "Tuple" && source.kind === "Tuple") {
      return isTupleAssignableToTuple(source, target, diagnosticTarget, relationCache);
    } else if (target.kind === "Union") {
      return isAssignableToUnion(source, target, diagnosticTarget, relationCache);
    } else if (target.kind === "Enum") {
      return isAssignableToEnum(source, target, diagnosticTarget);
    } else if (target.kind === "FunctionType") {
      return isAssignableToFunctionType(source, target, diagnosticTarget, relationCache);
    }
    return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
  }
  function isIndeterminateEntityAssignableTo(indeterminate, target, diagnosticTarget, relationCache) {
    const [typeRelated, typeDiagnostics] = isTypeAssignableToInternal(indeterminate.type, target, diagnosticTarget, relationCache);
    if (typeRelated) {
      return [Related.true, []];
    }
    if (target.entityKind === "MixedParameterConstraint" && target.valueType) {
      const [valueRelated] = isTypeAssignableToInternal(indeterminate.type, target.valueType, diagnosticTarget, relationCache);
      if (valueRelated) {
        return [Related.true, []];
      }
    }
    return [Related.false, typeDiagnostics];
  }
  function isAssignableToValueType(source, target, diagnosticTarget, relationCache) {
    if (!isValue(source)) {
      return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
    }
    return isValueOfTypeInternal(source, target, diagnosticTarget, relationCache);
  }
  function isAssignableToMixedParameterConstraint(source, target, diagnosticTarget, relationCache) {
    if ("entityKind" in source && source.entityKind === "MixedParameterConstraint") {
      if (source.type && target.type) {
        const [variantAssignable, diagnostics] = isTypeAssignableToInternal(source.type, target.type, diagnosticTarget, relationCache);
        if (variantAssignable === Related.false) {
          return [Related.false, diagnostics];
        }
        return [Related.true, []];
      }
      if (source.valueType && target.valueType) {
        const [variantAssignable, diagnostics] = isTypeAssignableToInternal(source.valueType, target.valueType, diagnosticTarget, relationCache);
        if (variantAssignable === Related.false) {
          return [Related.false, diagnostics];
        }
        return [Related.true, []];
      }
      return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
    }
    if (target.type) {
      const [related] = isTypeAssignableToInternal(source, target.type, diagnosticTarget, relationCache);
      if (related) {
        return [Related.true, []];
      }
    }
    if (target.valueType) {
      const [related] = isAssignableToValueType(source, target.valueType, diagnosticTarget, relationCache);
      if (related) {
        return [Related.true, []];
      }
    }
    return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
  }
  function isValueOfTypeInternal(source, target, diagnosticTarget, relationCache) {
    return isTypeAssignableToInternal(source.type, target, diagnosticTarget, relationCache);
  }
  function isReflectionType(type) {
    return type.kind === "Model" && type.namespace?.name === "Reflection" && type.namespace?.namespace?.name === "TypeSpec";
  }
  function isRelatedToScalar(source, target) {
    switch (source.kind) {
      case "Number":
        return isNumericLiteralRelatedTo(source, target);
      case "String":
      case "StringTemplate":
        return isStringLiteralRelatedTo(source, target);
      case "Boolean":
        return areScalarsRelated(target, checker.getStdType("boolean"));
      case "Scalar":
        return areScalarsRelated(source, target);
      case "Union":
        return void 0;
      default:
        return false;
    }
  }
  function areScalarsRelated(source, target) {
    let current = source;
    while (current) {
      if (current === target) {
        return true;
      }
      current = current.baseScalar;
    }
    return false;
  }
  function isSimpleTypeAssignableTo(source, target) {
    if (isNeverType(source))
      return true;
    if (isVoidType(target))
      return isVoidType(source);
    if (isUnknownType(target))
      return true;
    if (target.kind === "Scalar") {
      return isRelatedToScalar(source, target);
    }
    if (source.kind === "Scalar" && target.kind === "Model") {
      return false;
    }
    if (target.kind === "String") {
      return source.kind === "String" && source.value === target.value || source.kind === "StringTemplate" && source.stringValue === target.value;
    }
    if (target.kind === "StringTemplate" && target.stringValue) {
      return source.kind === "String" && source.value === target.stringValue || source.kind === "StringTemplate" && source.stringValue === target.stringValue;
    }
    if (target.kind === "Number") {
      return source.kind === "Number" && target.value === source.value;
    }
    return void 0;
  }
  function isAssignableToFunctionType(source, target, diagnosticTarget, relationCache) {
    if (source.kind !== "FunctionType") {
      return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
    }
    const { parameters: sourceParameters, returnType: sourceReturnType } = source;
    const { parameters: targetParameters, returnType: targetReturnType } = target;
    const [parametersAssignable, parameterErrors] = areParametersAssignable(targetParameters, sourceParameters, diagnosticTarget, relationCache);
    const [returnTypeAssignable, returnTypeErrors] = isAssignableToMixedParameterConstraint(sourceReturnType, targetReturnType, diagnosticTarget, relationCache);
    const related = returnTypeAssignable === Related.true && parametersAssignable === Related.true;
    return related ? [Related.true, []] : [
      Related.false,
      wrapUnassignableErrors(source, target, [...parameterErrors, ...returnTypeErrors])
    ];
  }
  function areParametersAssignable(sourceParameters, targetParameters, diagnosticTarget, relationCache) {
    const queue = sourceParameters.slice();
    const errors = [];
    for (const targetParam of targetParameters) {
      if (targetParam.rest) {
        const restElementType = getArrayElementType(targetParam.type);
        for (const sourceParam of queue) {
          if (sourceParam.rest) {
            const sourceRestElementType = getArrayElementType(sourceParam.type);
            const [assignable, innerErrors] = isTypeAssignableToInternal(sourceRestElementType, restElementType, diagnosticTarget, relationCache);
            return assignable === Related.true ? [Related.true, []] : [Related.false, [...errors, ...innerErrors]];
          } else {
            const [assignable, innerErrors] = isTypeAssignableToInternal(sourceParam.type, restElementType, diagnosticTarget, relationCache);
            if (!assignable) {
              errors.push(...innerErrors);
            }
          }
        }
        return errors.length === 0 ? [Related.true, []] : [Related.false, errors];
      } else {
        const nextSourceParam = queue.shift();
        if (!nextSourceParam) {
          if (!targetParam.optional) {
            errors.push(createTypeRelationError({
              code: "parameter-required",
              messageId: "missing",
              format: {
                paramName: targetParam.name
              },
              diagnosticTarget
            }));
          }
        } else {
          if (nextSourceParam.rest) {
            if (!targetParam.optional) {
              errors.push(createTypeRelationError({
                code: "parameter-required",
                messageId: "rest-to-required",
                format: {
                  paramName: nextSourceParam.name
                },
                diagnosticTarget
              }));
            }
            const sourceRestElementType = getArrayElementType(nextSourceParam.type);
            const [assignable, innerErrors] = isTypeAssignableToInternal(sourceRestElementType, targetParam.type, diagnosticTarget, relationCache);
            if (!assignable) {
              errors.push(...innerErrors);
            }
            queue.unshift(nextSourceParam);
          } else {
            if (nextSourceParam.optional && !targetParam.optional) {
              errors.push(createTypeRelationError({
                code: "parameter-required",
                format: {
                  paramName: nextSourceParam.name
                },
                diagnosticTarget
              }));
            }
            const [assignable, innerErrors] = isTypeAssignableToInternal(nextSourceParam.type, targetParam.type, diagnosticTarget, relationCache);
            if (!assignable) {
              errors.push(...innerErrors);
            }
          }
        }
      }
    }
    return errors.length === 0 ? [Related.true, []] : [Related.false, errors];
    function getArrayElementType(constraint) {
      compilerAssert((constraint.type || constraint.valueType) && (!constraint.type || !constraint.valueType), "Mixed parameter rest constraint cannot have both type and value constraints.");
      if (constraint.type) {
        compilerAssert(constraint.type.kind === "Model" && isArrayModelType(constraint.type), "Expected rest parameter type constraint to be an array type.");
        return {
          entityKind: "MixedParameterConstraint",
          node: constraint.node,
          type: constraint.type.indexer.value
        };
      } else {
        compilerAssert(constraint.valueType && constraint.valueType.kind === "Model" && isArrayModelType(constraint.valueType), "Mixed parameter rest constraint must have either type or value constraint.");
        return {
          entityKind: "MixedParameterConstraint",
          node: constraint.node,
          valueType: constraint.valueType.indexer.value
        };
      }
    }
  }
  function isNumericLiteralRelatedTo(source, target) {
    if (!isNumericAssignableToNumericScalar(source.numericValue, target)) {
      return false;
    }
    const min = getMinValueAsNumeric(program, target);
    const max = getMaxValueAsNumeric(program, target);
    const minExclusive = getMinValueExclusiveAsNumeric(program, target);
    const maxExclusive = getMaxValueExclusiveAsNumeric(program, target);
    if (min && source.numericValue.lt(min)) {
      return false;
    }
    if (minExclusive && source.numericValue.lte(minExclusive)) {
      return false;
    }
    if (max && source.numericValue.gt(max)) {
      return false;
    }
    if (maxExclusive && source.numericValue.gte(maxExclusive)) {
      return false;
    }
    return true;
  }
  function isNumericAssignableToNumericScalar(source, target) {
    if (!areScalarsRelated(target, checker.getStdType("numeric"))) {
      return false;
    }
    while (!target.namespace || !isTypeSpecNamespace2(target.namespace)) {
      compilerAssert(target.baseScalar, "Should not be possible to be derived from TypeSpec.numeric and not have a base when not in TypeSpec namespace.");
      target = target.baseScalar;
    }
    if (target.name === "numeric")
      return true;
    if (target.name === "decimal")
      return true;
    if (target.name === "decimal128")
      return true;
    const isInt = source.isInteger;
    if (target.name === "integer")
      return isInt;
    if (target.name === "float")
      return true;
    if (!(target.name in numericRanges))
      return false;
    const [low, high, options] = numericRanges[target.name];
    return source.gte(low) && source.lte(high) && (!options.int || isInt);
  }
  function isStringLiteralRelatedTo(source, target) {
    if (!areScalarsRelated(target, checker.getStdType("string"))) {
      return false;
    }
    if (source.kind === "StringTemplate") {
      return true;
    }
    const len = source.value.length;
    const min = getMinLength(program, target);
    const max = getMaxLength(program, target);
    if (min && len < min) {
      return false;
    }
    if (max && len > max) {
      return false;
    }
    return true;
  }
  function areModelsRelated(source, target, diagnosticTarget, relationCache) {
    relationCache.set([source, target], [Related.maybe, []]);
    const errors = [];
    const remainingProperties = new Map(source.properties);
    for (const prop of walkPropertiesInherited(target)) {
      const sourceProperty = getProperty2(source, prop.name);
      if (sourceProperty === void 0) {
        if (!prop.optional) {
          errors.push(createTypeRelationError({
            code: "missing-property",
            format: {
              propertyName: prop.name,
              sourceType: getTypeName(source),
              targetType: getTypeName(target)
            },
            diagnosticTarget: source
          }));
        }
      } else {
        remainingProperties.delete(prop.name);
        if (sourceProperty.optional && !prop.optional) {
          errors.push(createTypeRelationError({
            code: "property-required",
            format: {
              propName: prop.name,
              targetType: getTypeName(target)
            },
            diagnosticTarget
          }));
        }
        const [related, propErrors] = isTypeAssignableToInternal(sourceProperty.type, prop.type, diagnosticTarget, relationCache);
        if (!related) {
          errors.push(...wrapUnassignablePropertyErrors(sourceProperty, propErrors));
        }
      }
    }
    if (target.indexer) {
      const [_, indexerDiagnostics] = arePropertiesAssignableToIndexer(remainingProperties, target.indexer.value, diagnosticTarget, relationCache);
      errors.push(...indexerDiagnostics);
      if (source.name !== "" && target.indexer.key.name !== "integer") {
        const [related, indexDiagnostics] = hasIndexAndIsAssignableTo(source, target, diagnosticTarget, relationCache);
        if (!related) {
          errors.push(...indexDiagnostics);
        }
      }
    } else if (shouldCheckExcessProperties(source)) {
      for (const [propName, prop] of remainingProperties) {
        if (shouldCheckExcessProperty(prop)) {
          errors.push(createTypeRelationError({
            code: "unexpected-property",
            format: {
              propertyName: propName,
              type: getEntityName(target)
            },
            diagnosticTarget: prop
          }));
        }
      }
    }
    if (errors.length === 0) {
      return [Related.true, []];
    } else {
      return [Related.false, wrapUnassignableErrors(source, target, errors)];
    }
  }
  function shouldCheckExcessProperties(model) {
    return model.node?.kind === SyntaxKind.ObjectLiteral;
  }
  function shouldCheckExcessProperty(prop) {
    return prop.node?.kind === SyntaxKind.ObjectLiteralProperty && prop.node.parent === prop.model?.node;
  }
  function getProperty2(model, name) {
    return model.properties.get(name) ?? (model.baseModel !== void 0 ? getProperty2(model.baseModel, name) : void 0);
  }
  function arePropertiesAssignableToIndexer(properties, indexerConstaint, diagnosticTarget, relationCache) {
    for (const prop of properties.values()) {
      const [related, diagnostics] = isTypeAssignableToInternal(prop.type, indexerConstaint, diagnosticTarget, relationCache);
      if (!related) {
        return [Related.false, diagnostics];
      }
    }
    return [Related.true, []];
  }
  function hasIndexAndIsAssignableTo(source, target, diagnosticTarget, relationCache) {
    if (source.indexer === void 0 || source.indexer.key !== target.indexer.key) {
      return [
        Related.false,
        [
          createTypeRelationError({
            code: "missing-index",
            format: {
              indexType: getTypeName(target.indexer.key),
              sourceType: getTypeName(source)
            },
            diagnosticTarget
          })
        ]
      ];
    }
    return isTypeAssignableToInternal(source.indexer.value, target.indexer.value, diagnosticTarget, relationCache);
  }
  function isTupleAssignableToArray(source, target, diagnosticTarget, relationCache) {
    const minItems = getMinItems(program, target);
    const maxItems = getMaxItems(program, target);
    if (minItems !== void 0 && source.values.length < minItems) {
      return [
        Related.false,
        [
          createUnassignableDiagnostic(source, target, diagnosticTarget, `Source has ${source.values.length} element(s) but target requires ${minItems}.`)
        ]
      ];
    }
    if (maxItems !== void 0 && source.values.length > maxItems) {
      return [
        Related.false,
        [
          createUnassignableDiagnostic(source, target, diagnosticTarget, `Source has ${source.values.length} element(s) but target only allows ${maxItems}.`)
        ]
      ];
    }
    for (const item of source.values) {
      const [related, diagnostics] = isTypeAssignableToInternal(item, target.indexer.value, diagnosticTarget, relationCache);
      if (!related) {
        return [Related.false, diagnostics];
      }
    }
    return [Related.true, []];
  }
  function isTupleAssignableToTuple(source, target, diagnosticTarget, relationCache) {
    if (source.values.length !== target.values.length) {
      return [
        Related.false,
        [
          createUnassignableDiagnostic(source, target, diagnosticTarget, `Source has ${source.values.length} element(s) but target requires ${target.values.length}.`)
        ]
      ];
    }
    for (const [index, sourceItem] of source.values.entries()) {
      const targetItem = target.values[index];
      const [related, diagnostics] = isTypeAssignableToInternal(sourceItem, targetItem, diagnosticTarget, relationCache);
      if (!related) {
        return [Related.false, diagnostics];
      }
    }
    return [Related.true, []];
  }
  function isAssignableToUnion(source, target, diagnosticTarget, relationCache) {
    if (source.kind === "UnionVariant" && source.union === target) {
      return [Related.true, []];
    }
    relationCache.set([source, target], [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]]);
    for (const option of target.variants.values()) {
      const [related] = isTypeAssignableToInternal(source, option.type, diagnosticTarget, relationCache);
      if (related) {
        return [Related.true, []];
      }
    }
    return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
  }
  function isAssignableToEnum(source, target, diagnosticTarget) {
    switch (source.kind) {
      case "Enum":
        if (source === target) {
          return [Related.true, []];
        } else {
          return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
        }
      case "EnumMember":
        if (source.enum === target) {
          return [Related.true, []];
        } else {
          return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
        }
      default:
        return [Related.false, [createUnassignableDiagnostic(source, target, diagnosticTarget)]];
    }
  }
  function isTypeSpecNamespace2(namespace) {
    return namespace.name === "TypeSpec" && namespace.namespace === checker.getGlobalNamespaceType();
  }
}
function wrapUnassignableErrors(source, target, errors) {
  const error = createUnassignableDiagnostic(source, target, source);
  error.children = errors;
  return [error];
}
function wrapUnassignablePropertyErrors(source, errors) {
  const error = createTypeRelationError({
    code: "property-unassignable",
    diagnosticTarget: source,
    format: {
      propName: source.name
    },
    skipIfFirst: true
  });
  error.children = errors;
  return [error];
}
function createTypeRelationError({ code, messageId, format, details, diagnosticTarget, skipIfFirst }) {
  const diag = createDiagnostic({
    code,
    messageId,
    format,
    target: NoTarget
  });
  return {
    code,
    message: details ? `${diag.message}
  ${details}` : diag.message,
    target: diagnosticTarget,
    skipIfFirst,
    children: []
  };
}
function createUnassignableDiagnostic(source, target, diagnosticTarget, details) {
  return createTypeRelationError({
    code: "unassignable",
    format: {
      sourceType: getEntityName(source),
      targetType: getEntityName(target)
    },
    diagnosticTarget,
    details
  });
}

// node_modules/@typespec/compiler/dist/src/core/checker.js
var CheckFlags;
(function(CheckFlags2) {
  CheckFlags2[CheckFlags2["None"] = 0] = "None";
  CheckFlags2[CheckFlags2["InTemplateDeclaration"] = 1] = "InTemplateDeclaration";
})(CheckFlags || (CheckFlags = {}));
var CheckContext = class _CheckContext {
  /** The type mapper associated with this context, if any. */
  mapper;
  /** The flags enabled in this context. */
  flags;
  #templateParametersObserved;
  static from(contextOrMapper) {
    if (contextOrMapper instanceof _CheckContext) {
      return contextOrMapper;
    }
    return new _CheckContext(contextOrMapper, CheckFlags.None);
  }
  /**
   * The default CheckContext to use at API entrypoints.
   */
  static DEFAULT = new _CheckContext(void 0, CheckFlags.None);
  constructor(mapper, flags, templateParametersObserved) {
    this.mapper = mapper;
    this.flags = flags;
    this.#templateParametersObserved = templateParametersObserved;
    Object.freeze(this);
  }
  /**
   * Returns a new context with the given flags _added_ to the existing flags.
   *
   * @param flags - the flags to enable
   * @returns a new CheckContext with the given flags enabled.
   */
  withFlags(flags) {
    return new _CheckContext(this.mapper, this.flags | flags, this.#templateParametersObserved);
  }
  /**
   * Returns a new context with the given flags disabled.
   *
   * @param flags - the flags to disable
   * @returns a new CheckContext with the given flags disabled.
   */
  maskFlags(flags) {
    return new _CheckContext(this.mapper, this.flags & ~flags, this.#templateParametersObserved);
  }
  /**
   * Returns true if ALL of the given flags are enabled in this context.
   */
  hasFlags(flags) {
    return (this.flags & flags) === flags;
  }
  /**
   * Returns a new context with the given mapper.
   *
   * @param mapper - the new type mapper, or undefined to clear the mapper
   * @returns a new CheckContext with the given mapper.
   */
  withMapper(mapper) {
    return new _CheckContext(mapper, this.flags, this.#templateParametersObserved);
  }
  /**
   * Observes a template parameter within the current observation scope, if any.
   *
   * @param param - the TemplateParameter type instance to observe
   */
  observeTemplateParameter(param) {
    this.#templateParametersObserved?.add(param);
  }
  /**
   * Returns a new CheckContext with a new (empty) template parameter observation scope.
   *
   * Call this when you need to observe template parameters used within a specific context.
   *
   * @returns a new CheckContext with an empty template parameter observation scope.
   */
  enterTemplateObserverScope() {
    return new _CheckContext(this.mapper, this.flags, /* @__PURE__ */ new Set());
  }
  /**
   * Creates a new CheckContext with no template parameter observation enabled.
   *
   * Call this when the checker is moving from one declaration to another, where usage of template parameters
   * from the next scope should not impact the usage from the previous scope.
   *
   * @returns a new CheckContext with no template parameter observation.
   */
  exitTemplateObserverScope() {
    return new _CheckContext(this.mapper, this.flags, void 0);
  }
  /**
   * @returns true if the observer scope in this context has seen any template parameter usage.
   */
  hasObservedTemplateParameters() {
    return this.#templateParametersObserved !== void 0 ? this.#templateParametersObserved.size > 0 : false;
  }
};
var TypeInstantiationMap = class extends MultiKeyMap {
};
function createChecker(program, resolver) {
  const waitingForResolution = /* @__PURE__ */ new Map();
  const stats = {
    createdTypes: 0,
    finishedTypes: 0
  };
  const stdTypes = {};
  const indeterminateEntities = /* @__PURE__ */ new WeakMap();
  const docFromCommentForSym = /* @__PURE__ */ new Map();
  const referenceSymCache = /* @__PURE__ */ new WeakMap();
  const valueExactTypes = /* @__PURE__ */ new WeakMap();
  let onCheckerDiagnostic = (x) => {
    program.reportDiagnostic(x);
  };
  const typePrototype = {};
  const globalNamespaceType = createGlobalNamespaceType();
  const nodeDeprecationMap = /* @__PURE__ */ new Map();
  const errorType = createAndFinishType({ kind: "Intrinsic", name: "ErrorType" });
  const voidType = createAndFinishType({ kind: "Intrinsic", name: "void" });
  const neverType = createAndFinishType({ kind: "Intrinsic", name: "never" });
  const unknownType = createAndFinishType({ kind: "Intrinsic", name: "unknown" });
  const nullType = createAndFinishType({ kind: "Intrinsic", name: "null" });
  const pendingResolutions = new PendingResolutions();
  const spreadResolutionAncestors = /* @__PURE__ */ new Map();
  const postCheckValidators = [];
  const typespecNamespaceBinding = resolver.symbols.global.exports.get("TypeSpec");
  if (typespecNamespaceBinding) {
    initializeTypeSpecIntrinsics();
  }
  const templateParameterUsageMap = /* @__PURE__ */ new Map();
  const templateAccessSymbolCache = /* @__PURE__ */ new Map();
  const templateAccessCacheKeys = /* @__PURE__ */ new WeakMap();
  const symbolCacheIds = /* @__PURE__ */ new WeakMap();
  let nextSymbolCacheId = 1;
  const checker = {
    getTypeForNode,
    checkProgram,
    checkSourceFile,
    getLiteralType,
    getGlobalNamespaceType,
    cloneType,
    resolveRelatedSymbols,
    resolveCompletions,
    neverType,
    errorType,
    nullType,
    anyType: unknownType,
    voidType,
    unknownType,
    typePrototype,
    createType,
    createAndFinishType,
    createLiteralType,
    finishType,
    isStdType: isStdType2,
    getStdType,
    resolveTypeReference,
    resolveTypeOrValueReference,
    getValueForNode,
    getTypeOrValueForNode,
    getValueExactType,
    getTemplateParameterUsageMap,
    isTypeAssignableTo: void 0,
    isValueOfType: void 0,
    stats
  };
  const relation = createTypeRelationChecker(program, checker);
  checker.isTypeAssignableTo = relation.isTypeAssignableTo;
  checker.isValueOfType = relation.isValueOfType;
  return checker;
  function getTemplateParameterUsageMap() {
    return templateParameterUsageMap;
  }
  function wrapInstantiationDiagnostic(diagnostic, templateMapper) {
    if (templateMapper === void 0 || typeof diagnostic.target !== "object")
      return diagnostic;
    return {
      ...diagnostic,
      target: {
        node: diagnostic.target,
        templateMapper
      }
    };
  }
  function reportCheckerDiagnostic(diagnostic, mapper) {
    onCheckerDiagnostic(wrapInstantiationDiagnostic(diagnostic, mapper));
  }
  function reportCheckerDiagnostics(diagnostics) {
    diagnostics.forEach((x) => reportCheckerDiagnostic(x));
  }
  function initializeTypeSpecIntrinsics() {
    mutate(typespecNamespaceBinding.exports).set("log", {
      flags: SymbolFlags.Function,
      name: "log",
      value(p, ...strs) {
        program.trace("log", strs.join(" "));
        return voidType;
      },
      declarations: [],
      node: void 0
      // TODO: is this correct?
    });
    const internalDecorators = [
      typespecNamespaceBinding.exports?.get("@indexer"),
      typespecNamespaceBinding.exports?.get("@docFromComment"),
      typespecNamespaceBinding.exports?.get("Prototypes")?.exports?.get("@getter")
    ];
    for (const decorator of internalDecorators) {
      if (decorator) {
        mutate(decorator).flags |= SymbolFlags.Internal;
      }
    }
    mutate(resolver.symbols.null).type = nullType;
    getSymbolLinks(resolver.symbols.null).type = nullType;
  }
  function getStdType(name) {
    const type = stdTypes[name];
    if (type !== void 0) {
      return type;
    }
    const sym = typespecNamespaceBinding?.exports?.get(name);
    compilerAssert(sym, `Unexpected missing symbol to std type "${name}"`);
    if (sym.flags & SymbolFlags.Model) {
      checkModelStatement(CheckContext.DEFAULT, sym.declarations[0]);
    } else {
      checkScalar(CheckContext.DEFAULT, sym.declarations[0]);
    }
    const loadedType = stdTypes[name];
    compilerAssert(loadedType, `TypeSpec std type "${name}" should have been initalized before using array syntax.`);
    return loadedType;
  }
  function linkType(ctx, links, type) {
    if (ctx.mapper === void 0) {
      links.declaredType = type;
      links.instantiations = new TypeInstantiationMap();
    } else if (links.instantiations) {
      links.instantiations.set(ctx.mapper.args, type);
    }
  }
  function linkMemberType(ctx, links, type) {
    if (ctx.mapper === void 0) {
      links.declaredType = type;
    }
  }
  function checkMemberSym(ctx, sym) {
    const symbolLinks = getSymbolLinks(sym);
    const parentNode = getSymNode(sym.parent);
    compilerAssert(parentNode, "Expected member container parent symbol to have a node");
    const memberContainer = getTypeForNode(parentNode, ctx);
    const type = symbolLinks.declaredType ?? symbolLinks.type;
    if (type) {
      return type;
    } else {
      const memberNode = getSymNode(sym);
      compilerAssert(memberNode, "Expected member symbol to have a node");
      return checkMember(ctx, memberNode, memberContainer);
    }
  }
  function checkMember(ctx, node, containerType) {
    switch (node.kind) {
      case SyntaxKind.ModelProperty:
        return checkModelProperty(ctx, node);
      case SyntaxKind.EnumMember:
        return checkEnumMember(ctx, node, containerType);
      case SyntaxKind.OperationStatement:
        return checkOperation(ctx, node, containerType);
      case SyntaxKind.UnionVariant:
        return checkUnionVariant(ctx, node);
      case SyntaxKind.ScalarConstructor:
        return checkScalarConstructor(ctx, node, containerType);
    }
  }
  function getTypeForTypeOrIndeterminate(entity) {
    if (entity.entityKind === "Indeterminate") {
      return entity.type;
    }
    return entity;
  }
  function getTypeForNode(node, mapperOrContext) {
    const ctx = CheckContext.from(mapperOrContext);
    const entity = checkNode(ctx, node);
    if (entity === null) {
      return errorType;
    }
    if (entity.entityKind === "Indeterminate") {
      return entity.type;
    }
    if (isValue(entity)) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "value-in-type",
        target: node
      }));
      return errorType;
    }
    if (entity.kind === "TemplateParameter" || entity.kind === "TemplateParameterAccess") {
      if (entity.constraint?.valueType) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "value-in-type",
          messageId: "referenceTemplate",
          target: node
        }));
      }
    }
    return entity;
  }
  function getValueForNode(node, mapperOrContext, constraint) {
    const ctx = CheckContext.from(mapperOrContext);
    const initial = checkNode(ctx, node, constraint);
    if (initial === null || initial === errorType) {
      return null;
    }
    let entity;
    if (initial.entityKind === "Indeterminate") {
      entity = getValueFromIndeterminate(initial.type, constraint, node);
    } else {
      entity = initial;
    }
    if (entity === null) {
      return null;
    }
    if (isValue(entity)) {
      if (entity.valueKind === "Function")
        return entity;
      return constraint ? inferScalarsFromConstraints(entity, constraint.type) : entity;
    }
    if ((entity.kind === "TemplateParameter" || entity.kind === "TemplateParameterAccess") && entity.constraint?.valueType && entity.constraint.type === void 0) {
      return createValue({
        entityKind: "Value",
        valueKind: "TemplateValue",
        type: entity.constraint.valueType
      }, entity.constraint.valueType);
    }
    reportExpectedValue(node, entity);
    return null;
  }
  function reportExpectedValue(target, type) {
    if (type.kind === "Model" && type.name === "" && target.kind === SyntaxKind.ModelExpression) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "expect-value",
        messageId: "model",
        format: { name: getTypeName(type) },
        codefixes: [createModelToObjectValueCodeFix(target)],
        target
      }));
    } else if (type.kind === "Tuple" && target.kind === SyntaxKind.TupleExpression) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "expect-value",
        messageId: "tuple",
        format: { name: getTypeName(type) },
        codefixes: [createTupleToArrayValueCodeFix(target)],
        target
      }));
    } else {
      reportCheckerDiagnostic(createDiagnostic({
        code: "expect-value",
        format: { name: getTypeName(type) },
        target
      }));
    }
  }
  function getValueFromIndeterminate(type, constraint, node) {
    switch (type.kind) {
      case "String":
      case "StringTemplate":
        return checkStringValue(type, constraint, node);
      case "Number":
        return checkNumericValue(type, constraint, node);
      case "Boolean":
        return checkBooleanValue(type, constraint, node);
      case "EnumMember":
        return checkEnumValue(type, constraint, node);
      case "UnionVariant":
        return getValueFromIndeterminate(type.type, constraint, node);
      case "Intrinsic":
        if (type.name === "null") {
          return checkNullValue(type, constraint, node);
        }
        return type;
      default:
        return type;
    }
  }
  function interceptTypesUsedAsValue(type) {
    switch (type.kind) {
      case "Tuple":
        return interceptTupleUsedAsValue(type);
      case "Model":
        return interceptModelExpressionUsedAsValue(type);
      default:
        return type;
    }
  }
  function interceptModelExpressionUsedAsValue(model) {
    if (model.node?.kind !== SyntaxKind.ModelExpression) {
      return model;
    }
    reportCheckerDiagnostic(createDiagnostic({
      code: "expect-value",
      codefixes: [createModelToObjectValueCodeFix(model.node)],
      messageId: "modelExpression",
      target: model.node
    }));
    return null;
  }
  function interceptTupleUsedAsValue(tuple) {
    if (tuple.node?.kind !== SyntaxKind.TupleExpression) {
      return tuple;
    }
    reportCheckerDiagnostic(createDiagnostic({
      code: "expect-value",
      codefixes: [createTupleToArrayValueCodeFix(tuple.node)],
      messageId: "tuple",
      target: tuple.node
    }));
    return null;
  }
  function shouldTryInterceptTypeUsedAsValue(constraint) {
    return Boolean(constraint?.valueType && !constraint.type);
  }
  function getTypeOrValueForNode(node, contextOrMapper, constraint) {
    const ctx = CheckContext.from(contextOrMapper);
    const valueConstraint = extractValueOfConstraints(constraint);
    const entity = checkNode(ctx, node, valueConstraint);
    if (entity === null) {
      return entity;
    } else if (isType(entity)) {
      if (shouldTryInterceptTypeUsedAsValue(constraint?.constraint)) {
        return interceptTypesUsedAsValue(entity);
      } else {
        return entity;
      }
    } else if (isValue(entity)) {
      return entity;
    }
    compilerAssert(entity.entityKind === "Indeterminate", "Expected indeterminate entity");
    if (valueConstraint) {
      const valueDiagnostics = [];
      const oldDiagnosticHook = onCheckerDiagnostic;
      onCheckerDiagnostic = (x) => valueDiagnostics.push(x);
      const result = getValueFromIndeterminate(entity.type, valueConstraint, node);
      onCheckerDiagnostic = oldDiagnosticHook;
      if (result) {
        reportCheckerDiagnostics(valueDiagnostics);
        return result;
      } else {
        const canBeType = constraint?.constraint.type !== void 0;
        return canBeType ? entity.type : getValueFromIndeterminate(entity.type, void 0, node);
      }
    }
    return entity.type;
  }
  function extractValueOfConstraints(constraint) {
    if (constraint?.constraint.valueType) {
      return { kind: constraint.kind, type: constraint.constraint.valueType };
    } else {
      return void 0;
    }
  }
  function checkNode(ctx, node, valueConstraint) {
    switch (node.kind) {
      case SyntaxKind.ModelExpression:
        return checkModel(ctx, node);
      case SyntaxKind.ModelStatement:
        return checkModel(ctx, node);
      case SyntaxKind.ModelDeclarationExpression:
        return checkModel(ctx, node);
      case SyntaxKind.ModelProperty:
        return checkModelProperty(ctx, node);
      case SyntaxKind.ScalarStatement:
        return checkScalar(ctx, node);
      case SyntaxKind.ScalarDeclarationExpression:
        return checkScalar(ctx, node);
      case SyntaxKind.AliasStatement:
        return checkAlias(ctx, node);
      case SyntaxKind.EnumStatement:
        return checkEnum(ctx, node);
      case SyntaxKind.EnumDeclarationExpression:
        return checkEnum(ctx, node);
      case SyntaxKind.EnumMember:
        return checkEnumMember(ctx, node);
      case SyntaxKind.InterfaceStatement:
        return checkInterface(ctx, node);
      case SyntaxKind.UnionStatement:
        return checkUnion(ctx, node);
      case SyntaxKind.UnionDeclarationExpression:
        return checkUnion(ctx, node);
      case SyntaxKind.UnionVariant:
        return checkUnionVariant(ctx, node);
      case SyntaxKind.NamespaceStatement:
      case SyntaxKind.JsNamespaceDeclaration:
        return checkNamespace(ctx, node);
      case SyntaxKind.OperationStatement:
        return checkOperation(ctx, node);
      case SyntaxKind.NumericLiteral:
        return checkNumericLiteral(node);
      case SyntaxKind.BooleanLiteral:
        return checkBooleanLiteral(node);
      case SyntaxKind.StringLiteral:
        return checkStringLiteral(node);
      case SyntaxKind.TupleExpression:
        return checkTupleExpression(ctx, node);
      case SyntaxKind.StringTemplateExpression:
        return checkStringTemplateExpresion(ctx, node);
      case SyntaxKind.ArrayExpression:
        return checkArrayExpression(ctx, node);
      case SyntaxKind.UnionExpression:
        return checkUnionExpression(ctx, node);
      case SyntaxKind.IntersectionExpression:
        return checkIntersectionExpression(ctx, node);
      case SyntaxKind.DecoratorDeclarationStatement:
        return checkDecoratorDeclaration(ctx, node);
      case SyntaxKind.FunctionDeclarationStatement:
        return checkFunctionDeclaration(ctx, node);
      case SyntaxKind.FunctionTypeExpression:
        return checkFunctionTypeExpression(ctx, node);
      case SyntaxKind.TypeReference:
        return checkTypeOrValueReference(ctx, node);
      case SyntaxKind.TemplateArgument:
        return checkTemplateArgument(ctx, node);
      case SyntaxKind.TemplateParameterDeclaration:
        return checkTemplateParameterDeclaration(ctx, node);
      case SyntaxKind.VoidKeyword:
        return voidType;
      case SyntaxKind.NeverKeyword:
        return neverType;
      case SyntaxKind.UnknownKeyword:
        return unknownType;
      case SyntaxKind.ObjectLiteral:
        return checkObjectValue(ctx, node, valueConstraint);
      case SyntaxKind.ArrayLiteral:
        return checkArrayValue(ctx, node, valueConstraint);
      case SyntaxKind.ConstStatement:
        return checkConst(node);
      case SyntaxKind.CallExpression:
        return checkCallExpression(ctx, node);
      case SyntaxKind.TypeOfExpression:
        return checkTypeOfExpression(ctx, node);
      case SyntaxKind.AugmentDecoratorStatement:
        return checkAugmentDecorator(ctx, node);
      case SyntaxKind.UsingStatement:
        return checkUsings(ctx, node);
      default:
        return errorType;
    }
  }
  function reportDeclarationExpressionFeature(node) {
    const isExpression = node.kind === SyntaxKind.ModelDeclarationExpression || node.kind === SyntaxKind.ScalarDeclarationExpression || node.kind === SyntaxKind.EnumDeclarationExpression || node.kind === SyntaxKind.UnionDeclarationExpression;
    if (!isExpression) {
      return;
    }
    if (!isCompilerFeatureEnabled(program, "declaration-expressions", node)) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "declaration-expression-disabled",
        target: node
      }));
    }
  }
  function getNodeSym(node) {
    const symbol = node.kind === SyntaxKind.OperationStatement && node.parent?.kind === SyntaxKind.InterfaceStatement ? getSymbolForMember(node) : node.symbol;
    return symbol;
  }
  function isTypeSpecNamespace2(namespace) {
    return namespace.name === "TypeSpec" && namespace.namespace === globalNamespaceType;
  }
  function isInTypeSpecNamespace2(type) {
    return Boolean(type.namespace && isTypeSpecNamespace2(type.namespace));
  }
  function checkTemplateParameterDeclaration(ctx, node) {
    const parentNode = node.parent;
    const grandParentNode = parentNode.parent;
    const links = getSymbolLinks(node.symbol);
    if (!templateParameterUsageMap.has(node)) {
      templateParameterUsageMap.set(node, false);
    }
    if (pendingResolutions.has(getNodeSym(node), ResolutionKind.Constraint)) {
      if (ctx.mapper === void 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "circular-constraint",
          format: { typeName: node.id.sv },
          target: node.constraint
        }));
      }
      return errorType;
    }
    let type = links.declaredType;
    if (type === void 0) {
      if (grandParentNode) {
        if ("locals" in grandParentNode && grandParentNode.locals?.has(node.id.sv)) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "shadow",
            format: { name: node.id.sv },
            target: node
          }));
        }
      }
      const index = parentNode.templateParameters.findIndex((v) => v === node);
      type = links.declaredType = createAndFinishType({
        kind: "TemplateParameter",
        node
      });
      if (node.constraint) {
        pendingResolutions.start(getNodeSym(node), ResolutionKind.Constraint);
        type.constraint = getParamConstraintEntityForNode(ctx, node.constraint);
        pendingResolutions.finish(getNodeSym(node), ResolutionKind.Constraint);
      }
      if (node.default) {
        type.default = unknownType;
        type.default = checkTemplateParameterDefault(ctx, node.default, parentNode.templateParameters, index, type.constraint);
      }
    }
    return ctx.mapper ? ctx.mapper.getMappedType(type) : type;
  }
  function getResolvedTypeParameterDefault(ctx, declaredType, node) {
    if (declaredType.default === void 0) {
      return void 0;
    }
    if (isType(declaredType.default) && isErrorType(declaredType.default) || declaredType.default === null) {
      return declaredType.default;
    }
    return checkNode(ctx, node.default);
  }
  function checkTemplateParameterDefault(ctx, nodeDefault, templateParameters, index, constraint) {
    function visit(node) {
      const entity = checkNode(ctx, node);
      let hasError = false;
      if (entity !== null && "kind" in entity && (entity.kind === "TemplateParameter" || entity.kind === "TemplateParameterAccess")) {
        if (entity.kind === "TemplateParameterAccess") {
          return entity;
        }
        for (let i = index; i < templateParameters.length; i++) {
          if (entity.node?.symbol === templateParameters[i].symbol) {
            reportCheckerDiagnostic(createDiagnostic({ code: "invalid-template-default", target: node }));
            return void 0;
          }
        }
        return entity;
      }
      visitChildren(node, (x) => {
        const visited = visit(x);
        if (visited === void 0) {
          hasError = true;
        }
      });
      return hasError ? void 0 : entity;
    }
    const type = visit(nodeDefault) ?? errorType;
    if (!("kind" in type && isErrorType(type)) && constraint) {
      checkTypeAssignable(type, constraint, nodeDefault);
    }
    return type;
  }
  function checkTypeReference(ctx, node, instantiateTemplate2 = true) {
    const sym = resolveTypeReferenceSym(ctx, node);
    if (!sym) {
      return errorType;
    }
    const type = checkTypeReferenceSymbol(ctx, sym, node, instantiateTemplate2);
    return type;
  }
  function checkTypeOrValueReference(ctx, node, instantiateTemplate2 = true) {
    const sym = resolveTypeReferenceSym(ctx, node);
    if (!sym) {
      return errorType;
    }
    return checkTypeOrValueReferenceSymbol(ctx, sym, node, instantiateTemplate2) ?? errorType;
  }
  function checkTemplateArgument(ctx, node) {
    return checkNode(ctx, node.argument);
  }
  function resolveTypeOrValueReference(node) {
    const oldDiagnosticHook = onCheckerDiagnostic;
    const diagnostics = [];
    onCheckerDiagnostic = (x) => diagnostics.push(x);
    const entity = checkTypeOrValueReference(CheckContext.DEFAULT, node, false);
    onCheckerDiagnostic = oldDiagnosticHook;
    return [entity === errorType ? void 0 : entity, diagnostics];
  }
  function resolveTypeReference(node) {
    const oldDiagnosticHook = onCheckerDiagnostic;
    const diagnostics = [];
    onCheckerDiagnostic = (x) => diagnostics.push(x);
    const type = checkTypeReference(CheckContext.DEFAULT, node, false);
    onCheckerDiagnostic = oldDiagnosticHook;
    return [type === errorType ? void 0 : type, diagnostics];
  }
  function copyDeprecation(sourceType, destType) {
    const deprecationDetails = getDeprecationDetails(program, sourceType);
    if (deprecationDetails) {
      markDeprecated(program, destType, deprecationDetails);
    }
  }
  function checkDeprecated(type, node, target) {
    if (node) {
      const deprecationDetails2 = getDeprecationDetails(program, node);
      if (deprecationDetails2) {
        reportDeprecated(program, deprecationDetails2.message, target, reportCheckerDiagnostic);
        return;
      }
    }
    const deprecationDetails = getDeprecationDetails(program, type);
    if (deprecationDetails) {
      reportDeprecated(program, deprecationDetails.message, target, reportCheckerDiagnostic);
    }
  }
  function isTypeReferenceContextDeprecated(node) {
    function checkDeprecatedNode(node2) {
      if (!nodeDeprecationMap.has(node2)) {
        nodeDeprecationMap.set(node2, (node2.directives ?? []).findIndex((d) => d.target.sv === "deprecated") >= 0);
      }
      return nodeDeprecationMap.get(node2);
    }
    switch (node.kind) {
      case SyntaxKind.ModelStatement:
        return checkDeprecatedNode(node);
      case SyntaxKind.OperationStatement:
        return checkDeprecatedNode(node) || node.parent.kind === SyntaxKind.InterfaceStatement && isTypeReferenceContextDeprecated(node.parent);
      case SyntaxKind.InterfaceStatement:
        return checkDeprecatedNode(node);
      case SyntaxKind.UnionStatement:
        return checkDeprecatedNode(node);
      case SyntaxKind.IntersectionExpression:
      case SyntaxKind.UnionExpression:
      case SyntaxKind.ModelProperty:
      case SyntaxKind.OperationSignatureDeclaration:
      case SyntaxKind.OperationSignatureReference:
        return isTypeReferenceContextDeprecated(node.parent);
      default:
        return false;
    }
  }
  function checkTemplateInstantiationArgs(ctx, node, args, decls, parentMapper) {
    const params = /* @__PURE__ */ new Map();
    const positional = [];
    const initMap = new Map(decls.map((decl) => {
      const declaredType = checkTemplateParameterDeclaration(CheckContext.DEFAULT, decl);
      positional.push(declaredType);
      params.set(decl.id.sv, declaredType);
      return [
        declaredType,
        {
          decl,
          checkArgument: null
        }
      ];
    }));
    let named = false;
    for (const [arg, idx] of args.map((v, i) => [v, i])) {
      let deferredCheck = function() {
        return [arg, checkNode(ctx, arg.argument)];
      };
      if (arg.name) {
        named = true;
        const param = params.get(arg.name.sv);
        if (!param) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "invalid-template-args",
            messageId: "unknownName",
            format: {
              name: arg.name.sv
            },
            target: arg
          }));
          continue;
        }
        if (initMap.get(param).checkArgument !== null) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "invalid-template-args",
            messageId: "specifiedAgain",
            format: {
              name: arg.name.sv
            },
            target: arg
          }));
          continue;
        }
        initMap.get(param).checkArgument = deferredCheck;
      } else {
        if (named) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "invalid-template-args",
            messageId: "positionalAfterNamed",
            target: arg
          }));
        }
        if (idx >= positional.length) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "invalid-template-args",
            messageId: "tooMany",
            target: node
          }));
          continue;
        }
        const param = positional[idx];
        initMap.get(param).checkArgument ??= deferredCheck;
      }
    }
    const finalMap = initMap;
    const mapperParams = [];
    const mapperArgs = [];
    for (const [param, { decl, checkArgument: init }] of [...initMap]) {
      let commit = function(param2, type2) {
        finalMap.set(param2, type2);
        mapperParams.push(param2);
        mapperArgs.push(type2);
      };
      if (init === null) {
        const argumentMapper = createTypeMapper(mapperParams, mapperArgs, { node, mapper: ctx.mapper }, parentMapper);
        const defaultValue = getResolvedTypeParameterDefault(ctx.withMapper(argumentMapper), param, decl);
        if (defaultValue) {
          commit(param, defaultValue);
        } else {
          reportCheckerDiagnostic(createDiagnostic({
            code: "invalid-template-args",
            messageId: "missing",
            format: {
              name: decl.id.sv
            },
            target: node
          }));
          commit(param, param.constraint?.type ?? unknownType);
        }
        continue;
      }
      const [argNode, type] = init();
      if (type === null) {
        commit(param, unknownType);
        continue;
      }
      if (param.constraint) {
        const constraint = param.constraint.type?.kind === "TemplateParameter" ? finalMap.get(param.constraint.type) : param.constraint;
        if (isType(type) && shouldTryInterceptTypeUsedAsValue(param.constraint)) {
          const converted = interceptTypesUsedAsValue(type);
          if (converted !== type) {
            commit(param, type);
            continue;
          }
        }
        if (param.constraint && !checkArgumentAssignable(type, constraint, argNode)) {
          const effectiveType = param.constraint.type ?? unknownType;
          commit(param, effectiveType);
          continue;
        }
      } else if (isErrorType(type)) {
        commit(param, unknownType);
        continue;
      } else if (isValue(type)) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "value-in-type",
          messageId: "noTemplateConstraint",
          target: argNode
        }));
        commit(param, unknownType);
        continue;
      }
      commit(param, type);
    }
    return finalMap;
  }
  function checkTypeReferenceSymbol(ctx, sym, node, instantiateTemplates = true) {
    const result = checkTypeOrValueReferenceSymbol(ctx, sym, node, instantiateTemplates);
    if (result === null || isValue(result)) {
      reportCheckerDiagnostic(createDiagnostic({ code: "value-in-type", target: node }));
      return errorType;
    }
    if (result.entityKind === "Indeterminate") {
      return result.type;
    }
    return result;
  }
  function checkTypeOrValueReferenceSymbol(ctx, sym, node, instantiateTemplates = true) {
    const entity = checkTypeOrValueReferenceSymbolWorker(ctx, sym, node, instantiateTemplates);
    if (entity !== null && isType(entity) && entity.kind === "TemplateParameter") {
      ctx.observeTemplateParameter(entity);
      templateParameterUsageMap.set(entity.node, true);
    }
    return entity;
  }
  function checkTypeOrValueReferenceSymbolWorker(ctx, sym, node, instantiateTemplates = true) {
    if (sym.flags & SymbolFlags.Const) {
      return getValueForNode(sym.declarations[0], ctx.mapper);
    }
    if (sym.flags & SymbolFlags.Decorator) {
      reportCheckerDiagnostic(createDiagnostic({ code: "invalid-type-ref", messageId: "decorator", target: sym }));
      return errorType;
    }
    if (sym.flags & SymbolFlags.Function) {
      return getValueForNode(sym.declarations[0], ctx);
    }
    const argumentNodes = node.kind === SyntaxKind.TypeReference ? node.arguments : [];
    const symbolLinks = getSymbolLinks(sym);
    let baseType;
    if (sym.flags & SymbolFlags.Declaration && sym.flags & (SymbolFlags.Model | SymbolFlags.Scalar | SymbolFlags.Alias | SymbolFlags.Interface | SymbolFlags.Operation | SymbolFlags.Union)) {
      const decl = sym.declarations[0];
      if (!isTemplatedNode(decl)) {
        const innerCtx = ctx.maskFlags(CheckFlags.InTemplateDeclaration).exitTemplateObserverScope();
        if (argumentNodes.length > 0) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "invalid-template-args",
            messageId: "notTemplate",
            target: node
          }));
        }
        if (sym.flags & SymbolFlags.LateBound) {
          compilerAssert(sym.type, "Expected late bound symbol to have type");
          return sym.type;
        } else if (symbolLinks.declaredType) {
          baseType = symbolLinks.declaredType;
        } else if (sym.flags & SymbolFlags.Member) {
          baseType = checkMemberSym(innerCtx, sym);
        } else {
          baseType = checkDeclaredTypeOrIndeterminate(innerCtx, sym, decl);
        }
      } else {
        const declaredType = getOrCheckDeclaredType(ctx.withMapper(void 0), sym, decl);
        const templateParameters = decl.templateParameters;
        const instantiationArgsCtx = ctx.enterTemplateObserverScope();
        const instantiation = checkTemplateInstantiationArgs(instantiationArgsCtx, node, argumentNodes, templateParameters, declaredType.templateMapper);
        const innerCtx = (instantiationArgsCtx.hasObservedTemplateParameters() ? ctx : ctx.maskFlags(CheckFlags.InTemplateDeclaration)).exitTemplateObserverScope();
        baseType = getOrInstantiateTemplate(innerCtx, decl, [...instantiation.keys()], [...instantiation.values()], { node, mapper: ctx.mapper }, declaredType.templateMapper, instantiateTemplates);
      }
    } else {
      const symNode = getSymNode(sym);
      if (argumentNodes.length > 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "invalid-template-args",
          messageId: "notTemplate",
          target: node
        }));
      }
      if (sym.flags & SymbolFlags.LateBound) {
        compilerAssert(sym.type, `Expected late bound symbol to have type`);
        return sym.type;
      } else if (sym.flags & SymbolFlags.TemplateParameter) {
        compilerAssert(symNode, "Expected template parameter symbol to have a node");
        const mapped = checkTemplateParameterDeclaration(ctx, symNode);
        baseType = mapped;
      } else if (symbolLinks.type) {
        baseType = symbolLinks.type;
      } else if (symbolLinks.declaredType) {
        baseType = symbolLinks.declaredType;
      } else {
        if (sym.flags & SymbolFlags.Member) {
          baseType = checkMemberSym(ctx, sym);
        } else {
          compilerAssert(symNode, "Expected symbol to have a node to resolve type");
          baseType = getTypeForNode(symNode, ctx);
          symbolLinks.type = baseType;
        }
      }
    }
    const declarationNode = getSymNode(sym);
    if (declarationNode && ctx.mapper === void 0 && isType(baseType)) {
      if (!isTypeReferenceContextDeprecated(node.parent)) {
        checkDeprecated(baseType, declarationNode, node);
      }
    }
    if (isType(baseType) && (baseType.kind === "EnumMember" || baseType.kind === "UnionVariant") || isNullType(baseType)) {
      return createIndeterminateEntity(baseType);
    }
    return baseType;
  }
  function getOrCheckDeclaredType(ctx, sym, decl) {
    const symbolLinks = getSymbolLinks(sym);
    if (symbolLinks.declaredType) {
      return symbolLinks.declaredType;
    }
    if (sym.flags & SymbolFlags.LateBound) {
      compilerAssert(sym.type, "Expected late bound symbol to have type");
      return sym.type;
    }
    if (sym.flags & SymbolFlags.Member) {
      return checkMemberSym(ctx, sym);
    } else {
      return checkDeclaredType(ctx, sym, decl);
    }
  }
  function checkDeclaredTypeOrIndeterminate(ctx, sym, node) {
    const type = sym.flags & SymbolFlags.Model ? checkModelStatement(ctx, node) : sym.flags & SymbolFlags.Scalar ? checkScalar(ctx, node) : sym.flags & SymbolFlags.Alias ? checkAlias(ctx, node) : sym.flags & SymbolFlags.Interface ? checkInterface(ctx, node) : sym.flags & SymbolFlags.Operation ? checkOperation(ctx, node) : checkUnion(ctx, node);
    return type;
  }
  function checkDeclaredType(ctx, sym, node) {
    return getTypeForTypeOrIndeterminate(checkDeclaredTypeOrIndeterminate(ctx, sym, node));
  }
  function getOrInstantiateTemplate(ctx, templateNode, params, args, source, parentMapper, instantiateTemplates = true) {
    const symbolLinks = templateNode.kind === SyntaxKind.OperationStatement && templateNode.parent.kind === SyntaxKind.InterfaceStatement ? getSymbolLinksForMember(templateNode) : getSymbolLinks(templateNode.symbol);
    compilerAssert(symbolLinks, `Unexpected checker error. symbolLinks was not defined for ${SyntaxKind[templateNode.kind]}`);
    if (symbolLinks.instantiations === void 0) {
      const type = getTypeForNode(templateNode);
      if (isErrorType(type)) {
        return errorType;
      } else {
        compilerAssert(false, `Unexpected checker error. symbolLinks.instantiations was not defined for ${SyntaxKind[templateNode.kind]}`);
      }
    }
    const mapper = createTypeMapper(params, args, source, parentMapper);
    const cached = symbolLinks.instantiations?.get(mapper.args);
    if (cached) {
      return cached;
    }
    if (instantiateTemplates) {
      return instantiateTemplate(ctx.withMapper(mapper), symbolLinks.instantiations, templateNode, params);
    } else {
      return errorType;
    }
  }
  function instantiateTemplate(ctx, instantiations, templateNode, params) {
    const type = getTypeForNode(templateNode, ctx);
    if (!instantiations.get(ctx.mapper.args)) {
      instantiations.set(ctx.mapper.args, type);
    }
    if (type.kind === "Model") {
      type.templateNode = templateNode;
    }
    return type;
  }
  function checkMixedParameterConstraintUnion(ctx, node) {
    const values = [];
    const types = [];
    for (const option of node.options) {
      const [kind, type] = getTypeOrValueOfTypeForNode(ctx, option);
      if (kind === "value") {
        values.push(type);
      } else {
        types.push(type);
      }
    }
    return {
      entityKind: "MixedParameterConstraint",
      node,
      valueType: values.length === 0 ? void 0 : values.length === 1 ? values[0] : createConstraintUnion(node, values),
      type: types.length === 0 ? void 0 : types.length === 1 ? types[0] : createConstraintUnion(node, types)
    };
  }
  function createConstraintUnion(node, options) {
    const variants = createRekeyableMap();
    const union = createAndFinishType({
      kind: "Union",
      node,
      options,
      decorators: [],
      variants,
      expression: true
    });
    for (const option of options) {
      const name = /* @__PURE__ */ Symbol("indexer-union-variant");
      variants.set(name, createAndFinishType({
        kind: "UnionVariant",
        node: void 0,
        type: option,
        name,
        union,
        decorators: []
      }));
    }
    return union;
  }
  function checkUnionExpression(ctx, node) {
    const unionType = createAndFinishType({
      kind: "Union",
      node,
      get options() {
        return Array.from(this.variants.values()).map((v) => v.type);
      },
      expression: true,
      namespace: getParentNamespaceType(node),
      variants: createRekeyableMap(),
      decorators: []
    });
    for (const o of node.options) {
      const type = getTypeForNode(o, ctx);
      if (type === neverType) {
        continue;
      }
      if (type.kind === "Union" && type.node?.kind === SyntaxKind.UnionExpression) {
        for (const [name, variant] of type.variants) {
          unionType.variants.set(name, variant);
        }
      } else {
        const variant = createType({
          kind: "UnionVariant",
          type,
          name: /* @__PURE__ */ Symbol("name"),
          decorators: [],
          node: void 0,
          union: unionType
        });
        unionType.variants.set(variant.name, variant);
      }
    }
    linkMapper(unionType, ctx.mapper);
    return unionType;
  }
  function checkIntersectionExpression(ctx, node) {
    const links = getSymbolLinks(node.symbol);
    if (links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    const intersection = initModel(node);
    const options = node.options.map((o) => [o, getTypeForNode(o, ctx)]);
    ensureResolved(options.map(([, type]) => type), intersection, () => {
      const type = mergeModelTypes(ctx, node.symbol, node, options, intersection);
      linkType(ctx, links, type);
      finishType(intersection);
    });
    return intersection;
  }
  function ensureResolved(types, awaitingType, callback) {
    const waitingFor = /* @__PURE__ */ new Set();
    for (const type of types) {
      if (type === void 0)
        continue;
      if (type.creating) {
        waitingFor.add(type);
      }
    }
    function check() {
      if (waitingFor.size === 0) {
        callback();
      }
    }
    for (const type of waitingFor) {
      waitingForResolution.set(type, [
        ...waitingForResolution.get(type) || [],
        [
          awaitingType,
          () => {
            waitingFor.delete(type);
            check();
          }
        ]
      ]);
    }
    check();
  }
  function checkDecoratorDeclaration(ctx, node) {
    const symbol = getMergedSymbol(node.symbol);
    const links = getSymbolLinks(symbol);
    if (links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    checkModifiers(program, node);
    const namespace = getParentNamespaceType(node);
    compilerAssert(namespace, `Decorator ${node.id.sv} should have resolved a namespace or found the global namespace.`);
    const name = node.id.sv;
    const isAuto = (node.modifierFlags & ModifierFlags.Auto) !== 0;
    if (isAuto && !isCompilerFeatureEnabled(program, "auto-decorators", node)) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "auto-decorator-disabled",
        target: node
      }));
    }
    let implementation = symbol.value;
    if (isAuto) {
      implementation = createAutoDecoratorImplementation(symbol, node);
    } else if (implementation === void 0) {
      reportCheckerDiagnostic(createDiagnostic({ code: "missing-implementation", target: node }));
    }
    const decoratorType = createType({
      kind: "Decorator",
      name: `@${name}`,
      namespace,
      node,
      target: checkFunctionParameter(ctx, node.target, true),
      parameters: node.parameters.map((param) => checkFunctionParameter(ctx, param, true)),
      implementation: implementation ?? (() => {
      }),
      declarationKind: isAuto ? "auto" : "extern"
    });
    namespace.decoratorDeclarations.set(name, decoratorType);
    linkType(ctx, links, decoratorType);
    return decoratorType;
  }
  function checkFunctionDeclaration(ctx, node) {
    const mergedSymbol = getMergedSymbol(node.symbol);
    const links = getSymbolLinks(mergedSymbol);
    if (links.value !== void 0) {
      return links.value;
    }
    checkModifiers(program, node);
    if (!isCompilerFeatureEnabled(program, "function-declarations", node)) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "experimental-feature",
        messageId: "functionDeclarations",
        target: node
      }));
    }
    const namespace = getParentNamespaceType(node);
    compilerAssert(namespace, `Function ${node.id.sv} should have resolved a declared namespace or the global namespace.`);
    const name = node.id.sv;
    const implementation = mergedSymbol.value;
    if (implementation === void 0) {
      reportCheckerDiagnostic(createDiagnostic({ code: "missing-implementation", target: node }));
    }
    const parameters = node.parameters.map((x) => checkFunctionParameter(ctx, x, true));
    const returnType = node.returnType ? getParamConstraintEntityForNode(ctx, node.returnType) : {
      entityKind: "MixedParameterConstraint",
      type: unknownType
    };
    const functionValue = createValue({
      entityKind: "Value",
      valueKind: "Function",
      name,
      type: createAndFinishType({
        kind: "FunctionType",
        parameters,
        returnType
      }),
      parameters,
      returnType,
      namespace,
      node,
      implementation: implementation ?? Object.assign(() => getDefaultFunctionResult(returnType), {
        isDefaultFunctionImplementation: true
      })
    }, unknownType);
    namespace.functionDeclarations.set(name, functionValue);
    links.value = functionValue;
    return functionValue;
  }
  function checkFunctionTypeExpression(ctx, node) {
    const parameters = node.parameters.map((param) => checkFunctionParameter(ctx, param, true));
    const returnType = node.returnType ? getParamConstraintEntityForNode(ctx, node.returnType) : {
      entityKind: "MixedParameterConstraint",
      type: unknownType
    };
    return createAndFinishType({
      kind: "FunctionType",
      node,
      parameters,
      returnType
    });
  }
  function checkFunctionParameter(ctx, node, mixed) {
    const links = getSymbolLinks(node.symbol);
    if (links.declaredType) {
      return links.declaredType;
    }
    if (node.rest && node.type && !(node.type.kind === SyntaxKind.ArrayExpression || node.type.kind === SyntaxKind.ValueOfExpression && node.type.target.kind === SyntaxKind.ArrayExpression)) {
      reportCheckerDiagnostic(createDiagnostic({ code: "rest-parameter-array", target: node.type }));
    }
    const base = {
      kind: "FunctionParameter",
      node,
      name: node.id.sv,
      optional: node.optional,
      rest: node.rest,
      implementation: node.symbol.value
    };
    let parameterType;
    if (mixed) {
      const type = node.type ? getParamConstraintEntityForNode(ctx, node.type) : {
        entityKind: "MixedParameterConstraint",
        type: unknownType
      };
      parameterType = createType({
        ...base,
        type,
        mixed: true,
        implementation: node.symbol.value
      });
    } else {
      parameterType = createType({
        ...base,
        mixed: false,
        type: node.type ? getTypeForNode(node.type) : unknownType,
        implementation: node.symbol.value
      });
    }
    linkType(ctx, links, parameterType);
    return parameterType;
  }
  function getTypeOrValueOfTypeForNode(ctx, node) {
    switch (node.kind) {
      case SyntaxKind.ValueOfExpression:
        const target = getTypeForNode(node.target, ctx);
        return ["value", target];
      default:
        return ["type", getTypeForNode(node, ctx)];
    }
  }
  function getParamConstraintEntityForNode(ctx, node) {
    switch (node.kind) {
      case SyntaxKind.UnionExpression:
        return checkMixedParameterConstraintUnion(ctx, node);
      default:
        const [kind, entity] = getTypeOrValueOfTypeForNode(ctx, node);
        return {
          entityKind: "MixedParameterConstraint",
          node,
          type: kind === "value" ? void 0 : entity,
          valueType: kind === "value" ? entity : void 0
        };
    }
  }
  function mergeModelTypes(ctx, parentModelSym, node, options, intersection) {
    const properties = intersection.properties;
    const indexers = [];
    const modelOptions = options.filter((entry) => {
      const [optionNode, option] = entry;
      if (option.kind === "TemplateParameter" || option.kind === "TemplateParameterAccess") {
        return false;
      }
      if (option.kind !== "Model") {
        reportCheckerDiagnostic(createDiagnostic({ code: "intersect-non-model", target: optionNode }));
        return false;
      }
      return true;
    });
    for (const [optionNode, option] of modelOptions) {
      if (option.indexer) {
        if (option.indexer.key.name === "integer") {
          reportCheckerDiagnostic(createDiagnostic({
            code: "intersect-invalid-index",
            messageId: "array",
            target: optionNode
          }));
        } else {
          indexers.push(option.indexer);
        }
      }
    }
    for (const [optionNode, option] of modelOptions) {
      intersection.sourceModels.push({ usage: "intersection", model: option, node: optionNode });
      const allProps = walkPropertiesInherited(option);
      for (const prop of allProps) {
        if (properties.has(prop.name)) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "intersect-duplicate-property",
            format: { propName: prop.name },
            target: node
          }));
          continue;
        }
        const memberSym = parentModelSym && getMemberSymbol(parentModelSym, prop.name);
        const overrides = {
          sourceProperty: prop,
          model: intersection
        };
        const newPropType = memberSym ? cloneTypeForSymbol(memberSym, prop, overrides) : cloneType(prop, overrides);
        properties.set(prop.name, newPropType);
        linkIndirectMember(ctx, node, newPropType);
        for (const indexer of indexers.filter((x) => x !== option.indexer)) {
          checkPropertyCompatibleWithIndexer(indexer, prop, node);
        }
      }
    }
    if (indexers.length === 1) {
      intersection.indexer = indexers[0];
    } else if (indexers.length > 1) {
      intersection.indexer = {
        key: indexers[0].key,
        value: mergeModelTypes(ctx, void 0, node, indexers.map((x) => [x.value.node, x.value]), initModel(node))
      };
    }
    linkMapper(intersection, ctx.mapper);
    return finishType(intersection);
  }
  function checkArrayExpression(ctx, node) {
    const elementCtx = ctx.enterTemplateObserverScope();
    const elementType = getTypeForNode(node.elementType, elementCtx);
    const instantiationCtx = elementCtx.hasObservedTemplateParameters() ? ctx : ctx.maskFlags(CheckFlags.InTemplateDeclaration);
    const arrayType = getStdType("Array");
    const arrayNode = arrayType.node;
    const param = getTypeForNode(arrayNode.templateParameters[0]);
    return getOrInstantiateTemplate(instantiationCtx, arrayNode, [param], [elementType], { node, mapper: ctx.mapper }, void 0);
  }
  function checkNamespace(ctx, node) {
    const links = getSymbolLinks(getMergedSymbol(node.symbol));
    let type = links.type;
    if (!type) {
      type = initializeTypeForNamespace(node);
    }
    if (node.kind === SyntaxKind.NamespaceStatement) {
      checkModifiers(program, node);
      if (isArray(node.statements)) {
        node.statements.forEach((x) => checkNode(ctx, x));
      } else if (node.statements) {
        const subNs = checkNamespace(ctx, node.statements);
        type.namespaces.set(subNs.name, subNs);
      }
    }
    return type;
  }
  function initializeTypeForNamespace(node) {
    compilerAssert(node.symbol, "Namespace is unbound.", node);
    const mergedSymbol = getMergedSymbol(node.symbol);
    const symbolLinks = getSymbolLinks(mergedSymbol);
    if (!symbolLinks.type) {
      const namespace = getParentNamespaceType(node);
      const name = node.id.sv;
      const type = createType({
        kind: "Namespace",
        name,
        namespace,
        node,
        models: /* @__PURE__ */ new Map(),
        scalars: /* @__PURE__ */ new Map(),
        operations: /* @__PURE__ */ new Map(),
        namespaces: /* @__PURE__ */ new Map(),
        interfaces: /* @__PURE__ */ new Map(),
        unions: /* @__PURE__ */ new Map(),
        enums: /* @__PURE__ */ new Map(),
        decoratorDeclarations: /* @__PURE__ */ new Map(),
        functionDeclarations: /* @__PURE__ */ new Map(),
        decorators: []
      });
      symbolLinks.type = type;
      for (const sourceNode of mergedSymbol.declarations) {
        if (sourceNode.kind !== SyntaxKind.NamespaceStatement)
          continue;
        type.decorators = type.decorators.concat(checkDecorators(CheckContext.DEFAULT, type, sourceNode));
      }
      finishType(type);
      namespace?.namespaces.set(name, type);
    }
    return symbolLinks.type;
  }
  function getParentNamespaceType(node) {
    if (node === globalNamespaceType.node)
      return void 0;
    if (node.kind === SyntaxKind.ModelExpression || node.kind === SyntaxKind.IntersectionExpression || node.kind === SyntaxKind.UnionExpression || node.kind === SyntaxKind.ModelDeclarationExpression || node.kind === SyntaxKind.EnumDeclarationExpression || node.kind === SyntaxKind.UnionDeclarationExpression || node.kind === SyntaxKind.ScalarDeclarationExpression) {
      let parent = node.parent;
      while (parent !== void 0) {
        if (parent.kind === SyntaxKind.AliasStatement || parent.kind === SyntaxKind.ModelStatement || parent.kind === SyntaxKind.ScalarStatement || parent.kind === SyntaxKind.OperationStatement || parent.kind === SyntaxKind.EnumStatement || parent.kind === SyntaxKind.InterfaceStatement || parent.kind === SyntaxKind.UnionStatement || parent.kind === SyntaxKind.ModelExpression || parent.kind === SyntaxKind.IntersectionExpression || parent.kind === SyntaxKind.UnionExpression) {
          return getParentNamespaceType(parent);
        } else {
          parent = parent.parent;
        }
      }
      return void 0;
    }
    if (node.kind === SyntaxKind.OperationStatement && node.parent && node.parent.kind === SyntaxKind.InterfaceStatement) {
      return getParentNamespaceType(node.parent);
    }
    if (!node.symbol.parent) {
      return globalNamespaceType;
    }
    if (node.symbol.parent.declarations[0].kind === SyntaxKind.TypeSpecScript || node.symbol.parent.declarations[0].kind === SyntaxKind.JsSourceFile) {
      return globalNamespaceType;
    }
    const mergedSymbol = getMergedSymbol(node.symbol.parent);
    const symbolLinks = getSymbolLinks(mergedSymbol);
    if (!symbolLinks.type) {
      const namespaceNode = mergedSymbol.declarations.find((x) => x.kind === SyntaxKind.NamespaceStatement || x.kind === SyntaxKind.JsNamespaceDeclaration);
      compilerAssert(namespaceNode, "Can't find namespace declaration node.", node);
      symbolLinks.type = initializeTypeForNamespace(namespaceNode);
    }
    return symbolLinks.type;
  }
  function checkOperation(ctx, node, parentInterface) {
    const inInterface = node.parent?.kind === SyntaxKind.InterfaceStatement;
    const symbol = inInterface ? getSymbolForMember(node) : node.symbol;
    const links = symbol && getSymbolLinks(symbol);
    if (links) {
      if (links.declaredType && ctx.mapper === void 0) {
        return links.declaredType;
      }
    }
    if (ctx.mapper === void 0) {
      checkModifiers(program, node);
    }
    if (ctx.mapper === void 0 && inInterface) {
      compilerAssert(parentInterface, "Operation in interface should already have been checked.", node.parent);
    }
    if (ctx.mapper === void 0 && node.templateParameters.length > 0) {
      ctx = ctx.withFlags(CheckFlags.InTemplateDeclaration);
    }
    checkTemplateDeclaration(ctx, node);
    if (isTemplatedNode(node) && ctx.mapper !== void 0 && parentInterface) {
      ctx = ctx.withMapper({ ...ctx.mapper, partial: true });
    }
    if (ctx.mapper?.partial && node.templateParameters.length > 0) {
      ctx = ctx.withFlags(CheckFlags.InTemplateDeclaration);
    }
    const namespace = getParentNamespaceType(node);
    const name = node.id.sv;
    const { resolvedSymbol: parameterModelSym } = resolver.resolveMetaMemberByName(symbol, "parameters");
    if (parameterModelSym?.members) {
      const members = resolver.getAugmentedSymbolTable(parameterModelSym.members);
      const paramDocs = extractParamDocs(node);
      for (const [name2, memberSym] of members) {
        const doc = paramDocs.get(name2);
        if (doc) {
          docFromCommentForSym.set(memberSym, doc);
          const declarationSymbol = memberSym.node?.symbol;
          if (declarationSymbol && declarationSymbol !== memberSym) {
            docFromCommentForSym.set(declarationSymbol, doc);
          }
        }
      }
    }
    const operationType = createType({
      kind: "Operation",
      name,
      namespace,
      parameters: null,
      returnType: voidType,
      node,
      decorators: [],
      interface: parentInterface
    });
    if (links) {
      linkType(ctx, links, operationType);
    }
    const parent = node.parent;
    function finishOperation() {
      operationType.parameters.namespace = namespace;
      operationType.decorators.push(...checkDecorators(ctx, operationType, node));
      return finishType(operationType, {
        skipDecorators: ctx.hasFlags(CheckFlags.InTemplateDeclaration)
      });
    }
    if (node.signature.kind === SyntaxKind.OperationSignatureReference) {
      const baseOperation = checkOperationIs(ctx, node, node.signature.baseOperation);
      if (baseOperation) {
        ensureResolved([baseOperation], operationType, () => {
          operationType.sourceOperation = baseOperation;
          const clone = initializeClone(baseOperation.parameters, {
            properties: createRekeyableMap()
          });
          clone.properties = createRekeyableMap(Array.from(baseOperation.parameters.properties.entries()).map(([key, prop]) => [
            key,
            cloneTypeForSymbol(getMemberSymbol(parameterModelSym, prop.name), prop, {
              model: clone,
              sourceProperty: prop
            })
          ]));
          operationType.parameters = finishType(clone);
          operationType.returnType = baseOperation.returnType;
          operationType.decorators.push(...baseOperation.decorators);
          finishOperation();
        });
      } else {
        operationType.parameters = initModel();
        operationType.returnType = voidType;
        finishOperation();
      }
    } else {
      operationType.parameters = getTypeForNode(node.signature.parameters, ctx);
      operationType.returnType = getTypeForNode(node.signature.returnType, ctx);
      ensureResolved([operationType.parameters], operationType, () => {
        finishOperation();
      });
    }
    linkMapper(operationType, ctx.mapper);
    if (parent.kind !== SyntaxKind.InterfaceStatement && ctx.mapper === void 0) {
      namespace?.operations.set(name, operationType);
    }
    return operationType;
  }
  function checkOperationIs(ctx, operation, opReference) {
    if (!opReference)
      return void 0;
    const opSymId = getNodeSym(operation);
    if (opSymId) {
      pendingResolutions.start(opSymId, ResolutionKind.BaseType);
    }
    const target = resolver.getNodeLinks(opReference).resolvedSymbol;
    if (target && pendingResolutions.has(target, ResolutionKind.BaseType)) {
      if (ctx.mapper === void 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "circular-op-signature",
          format: { typeName: target.name },
          target: opReference
        }));
      }
      return void 0;
    }
    const baseOperation = getTypeForNode(opReference, ctx);
    if (opSymId) {
      pendingResolutions.finish(opSymId, ResolutionKind.BaseType);
    }
    if (isErrorType(baseOperation)) {
      return void 0;
    }
    if (baseOperation.kind !== "Operation") {
      reportCheckerDiagnostic(createDiagnostic({ code: "is-operation", target: opReference }));
      return;
    }
    return baseOperation;
  }
  function getGlobalNamespaceType() {
    return globalNamespaceType;
  }
  function getGlobalNamespaceNode() {
    return resolver.symbols.global.declarations[0];
  }
  function checkTupleExpression(ctx, node) {
    return createAndFinishType({
      kind: "Tuple",
      node,
      values: node.values.map((v) => getTypeForNode(v, ctx))
    });
  }
  function getSymbolLinks(s) {
    return resolver.getSymbolLinks(s);
  }
  function resolveRelatedSymbols(id, mapper) {
    const ctx = CheckContext.from(mapper);
    let sym;
    const { node, kind } = getIdentifierContext(id);
    switch (kind) {
      case IdentifierKind.ModelExpressionProperty:
      case IdentifierKind.ObjectLiteralProperty:
        const model = getReferencedModel(node);
        return model.map((m) => getMemberSymbol(m.node.symbol, id.sv)).filter((m) => m !== void 0);
      case IdentifierKind.ModelStatementProperty:
      case IdentifierKind.Declaration:
        const links = resolver.getNodeLinks(id);
        return links.resolvedSymbol === void 0 ? void 0 : [links.resolvedSymbol];
      case IdentifierKind.Other:
        return void 0;
      case IdentifierKind.Decorator:
      case IdentifierKind.Function:
      case IdentifierKind.Using:
      case IdentifierKind.TypeReference:
        let ref = id;
        let resolveDecorator = kind === IdentifierKind.Decorator;
        if (id.parent?.kind === SyntaxKind.MemberExpression) {
          if (id.parent.id === id) {
            ref = id.parent;
          } else {
            resolveDecorator = false;
          }
        }
        sym = resolveTypeReferenceSym(ctx, ref, resolveDecorator);
        break;
      case IdentifierKind.TemplateArgument:
        const templates = getTemplateDeclarationsForArgument(ctx, node);
        const firstMatchingParameter = templates.flatMap((t) => t.templateParameters).find((p) => p.id.sv === id.sv);
        if (firstMatchingParameter) {
          sym = getMergedSymbol(firstMatchingParameter.symbol);
        }
        break;
      default:
        const _assertNever = kind;
        compilerAssert(false, "Unreachable");
    }
    if (sym) {
      const relatedSource = getRelatedSymbolSource(sym);
      if (relatedSource) {
        return sym.flags & SymbolFlags.LateBound ? [sym, relatedSource] : [relatedSource];
      }
      return [sym];
    }
    return void 0;
  }
  function getRelatedSymbolSource(sym) {
    if (sym.symbolSource) {
      return sym.symbolSource;
    }
    const type = sym.type;
    if (type && isType(type)) {
      return getTemplateAccessSymbolSource(type);
    }
    return void 0;
  }
  function getTemplateDeclarationsForArgument(ctx, node) {
    const ref = node.parent;
    let resolved = resolveTypeReferenceSym(ctx, ref, false);
    if (!resolved && hasParseError(ref) && ref.target !== void 0) {
      resolved = resolveTypeReferenceSym(ctx, ref.target, false);
    }
    return resolved?.declarations.filter((n) => isTemplatedNode(n)) ?? [];
  }
  function getReferencedModel(propertyNode) {
    const isModelOrArrayValue = (n) => n?.kind === SyntaxKind.ArrayLiteral || n?.kind === SyntaxKind.ObjectLiteral;
    const isModelOrArrayType = (n) => n?.kind === SyntaxKind.ModelExpression || n?.kind === SyntaxKind.TupleExpression;
    const isModelOrArray = (n) => isModelOrArrayValue(n) || isModelOrArrayType(n);
    const path = [];
    let preNode;
    const foundNode = getFirstAncestor(propertyNode, (n) => {
      pushToModelPath(n, preNode, path);
      preNode = n;
      return isModelOrArray(n) && (n.parent?.kind === SyntaxKind.TemplateParameterDeclaration || n.parent?.kind === SyntaxKind.TemplateArgument || n.parent?.kind === SyntaxKind.DecoratorExpression) || isModelOrArrayValue(n) && (n.parent?.kind === SyntaxKind.CallExpression || n.parent?.kind === SyntaxKind.ConstStatement);
    });
    let refType;
    switch (foundNode?.parent?.kind) {
      case SyntaxKind.TemplateParameterDeclaration:
      case SyntaxKind.TemplateArgument:
        refType = getReferencedTypeFromTemplateDeclaration(foundNode);
        break;
      case SyntaxKind.DecoratorExpression:
        refType = getReferencedTypeFromDecoratorArgument(foundNode);
        break;
      case SyntaxKind.CallExpression:
        refType = getReferencedTypeFromScalarConstructor(foundNode);
        break;
      case SyntaxKind.ConstStatement:
        refType = getReferencedTypeFromConstAssignment(foundNode);
        break;
    }
    return getNestedModel(refType, path);
    function pushToModelPath(node, preNode2, path2) {
      if (node.kind === SyntaxKind.ArrayLiteral || node.kind === SyntaxKind.TupleExpression) {
        const index = node.values.findIndex((n) => n === preNode2);
        if (index >= 0) {
          path2.unshift({ tupleIndex: index });
        } else {
          compilerAssert(false, "not expected, can't find child from the parent?");
        }
      }
      if (node.kind === SyntaxKind.ModelProperty || node.kind === SyntaxKind.ObjectLiteralProperty) {
        path2.unshift({ propertyName: node.id.sv });
      }
    }
    function getNestedModel(modelOrTupleOrUnion, path2) {
      let cur = modelOrTupleOrUnion;
      if (cur && cur.kind !== "Model" && cur.kind !== "Tuple" && cur.kind !== "Union") {
        return [];
      }
      if (path2.length === 0) {
        switch (cur?.kind) {
          case "Model":
            return [cur];
          case "Union":
            const models = [];
            for (const variant of cur.variants.values()) {
              if (variant.type.kind === "Model" || variant.type.kind === "Tuple" || variant.type.kind === "Union") {
                models.push(...getNestedModel(variant.type, path2) ?? []);
              }
            }
            return models;
          default:
            return [];
        }
      }
      const seg = path2[0];
      switch (cur?.kind) {
        case "Tuple":
          if (seg.tupleIndex !== void 0 && seg.tupleIndex >= 0 && seg.tupleIndex < cur.values.length) {
            return getNestedModel(cur.values[seg.tupleIndex], path2.slice(1));
          } else {
            return [];
          }
        case "Model":
          if (cur.name === "Array" && seg.tupleIndex !== void 0) {
            cur = cur.templateMapper?.args[0];
          } else if (cur.name !== "Array" && seg.propertyName) {
            cur = cur.properties.get(seg.propertyName)?.type;
          } else {
            return [];
          }
          return getNestedModel(cur, path2.slice(1));
        case "Union":
          const models = [];
          for (const variant of cur.variants.values()) {
            if (variant.type.kind === "Model" || variant.type.kind === "Tuple" || variant.type.kind === "Union") {
              models.push(...getNestedModel(variant.type, path2) ?? []);
            }
          }
          return models;
        default:
          return [];
      }
    }
    function getReferencedTypeFromTemplateDeclaration(node) {
      let templateParmaeterDeclNode = void 0;
      if (node?.parent?.kind === SyntaxKind.TemplateArgument && node?.parent?.parent?.kind === SyntaxKind.TypeReference) {
        const argNode = node.parent;
        const refNode = node.parent.parent;
        const decl = getTemplateDeclarationsForArgument(
          // We should be giving the argument so the mapper here should be undefined
          CheckContext.DEFAULT,
          argNode
        );
        const index = refNode.arguments.findIndex((n) => n === argNode);
        if (decl.length > 0 && decl[0].templateParameters.length > index) {
          templateParmaeterDeclNode = decl[0].templateParameters[index];
        }
      } else if (node.parent?.kind === SyntaxKind.TemplateParameterDeclaration) {
        templateParmaeterDeclNode = node?.parent;
      }
      if (templateParmaeterDeclNode?.kind !== SyntaxKind.TemplateParameterDeclaration || !templateParmaeterDeclNode.constraint) {
        return void 0;
      }
      let constraintType;
      if (isModelOrArrayValue(node) && templateParmaeterDeclNode.constraint.kind === SyntaxKind.ValueOfExpression) {
        constraintType = program.checker.getTypeForNode(templateParmaeterDeclNode.constraint.target);
      } else if (isModelOrArrayType(node) && templateParmaeterDeclNode.constraint.kind !== SyntaxKind.ValueOfExpression) {
        constraintType = program.checker.getTypeForNode(templateParmaeterDeclNode.constraint);
      }
      return constraintType;
    }
    function getReferencedTypeFromScalarConstructor(argNode) {
      const callExpNode = argNode?.parent;
      if (callExpNode?.kind !== SyntaxKind.CallExpression) {
        return void 0;
      }
      const ctorType = checkCallExpressionTarget(CheckContext.DEFAULT, callExpNode);
      if (ctorType?.entityKind !== "Type" || ctorType?.kind !== "ScalarConstructor") {
        return void 0;
      }
      const argIndex = callExpNode.arguments.findIndex((n) => n === argNode);
      if (argIndex < 0 || argIndex >= ctorType.parameters.length) {
        return void 0;
      }
      const arg = ctorType.parameters[argIndex];
      return arg.type;
    }
    function getReferencedTypeFromConstAssignment(valueNode) {
      const constNode = valueNode?.parent;
      if (!constNode || constNode.kind !== SyntaxKind.ConstStatement || !constNode.type || constNode.value !== valueNode) {
        return void 0;
      }
      return program.checker.getTypeForNode(constNode.type);
    }
    function getReferencedTypeFromDecoratorArgument(decArgNode) {
      const decNode = decArgNode?.parent;
      if (decNode?.kind !== SyntaxKind.DecoratorExpression) {
        return void 0;
      }
      const decSym = program.checker.resolveRelatedSymbols(decNode.target.kind === SyntaxKind.MemberExpression ? decNode.target.id : decNode.target);
      if (!decSym || decSym.length <= 0) {
        return void 0;
      }
      const decDecl = decSym[0].declarations.find((x) => x.kind === SyntaxKind.DecoratorDeclarationStatement);
      if (!decDecl) {
        return void 0;
      }
      const decType = program.checker.getTypeForNode(decDecl);
      compilerAssert(decType.kind === "Decorator", "Expected type to be a Decorator.");
      const argIndex = decNode.arguments.findIndex((n) => n === decArgNode);
      if (argIndex < 0 || argIndex >= decType.parameters.length) {
        return void 0;
      }
      const decArg = decType.parameters[argIndex];
      let type;
      if (isModelOrArrayValue(decArgNode)) {
        type = decArg.type.valueType;
      } else if (isModelOrArrayType(decArgNode)) {
        type = decArg.type.type ?? decArg.type.valueType;
      } else {
        compilerAssert(false, "not expected node type to get reference model from decorator argument");
      }
      return type;
    }
  }
  function resolveCompletions(identifier) {
    const completions = /* @__PURE__ */ new Map();
    const { kind, node: ancestor } = getIdentifierContext(identifier);
    switch (kind) {
      case IdentifierKind.Using:
      case IdentifierKind.Decorator:
      case IdentifierKind.Function:
      case IdentifierKind.TypeReference:
      case IdentifierKind.ModelExpressionProperty:
      case IdentifierKind.ModelStatementProperty:
      case IdentifierKind.ObjectLiteralProperty:
        break;
      // supported
      case IdentifierKind.Other:
        return completions;
      // not implemented
      case IdentifierKind.Declaration:
        return completions;
      // cannot complete, name can be chosen arbitrarily
      case IdentifierKind.TemplateArgument: {
        const templates = getTemplateDeclarationsForArgument(CheckContext.DEFAULT, ancestor);
        for (const template of templates) {
          for (const param of template.templateParameters) {
            addCompletion(param.id.sv, param.symbol);
          }
        }
        return completions;
      }
      default:
        const _assertNever = kind;
        compilerAssert(false, "Unreachable");
    }
    if (kind === IdentifierKind.ModelStatementProperty) {
      const model = ancestor.parent;
      const modelType = program.checker.getTypeForNode(model);
      const baseType = modelType.baseModel;
      const baseNode = baseType?.node;
      if (!baseNode) {
        return completions;
      }
      for (const prop of baseType.properties.values()) {
        if (identifier.sv === prop.name || !modelType.properties.has(prop.name)) {
          const sym = getMemberSymbol(baseNode.symbol, prop.name);
          if (sym) {
            addCompletion(prop.name, sym);
          }
        }
      }
    } else if (kind === IdentifierKind.ModelExpressionProperty || kind === IdentifierKind.ObjectLiteralProperty) {
      const model = getReferencedModel(ancestor);
      if (model.length <= 0) {
        return completions;
      }
      const curModelNode = ancestor.parent;
      for (const curModel of model) {
        for (const prop of walkPropertiesInherited(curModel)) {
          if (identifier.sv === prop.name || !curModelNode.properties.find((p) => (p.kind === SyntaxKind.ModelProperty || p.kind === SyntaxKind.ObjectLiteralProperty) && p.id.sv === prop.name)) {
            const sym = getMemberSymbol(curModel.node.symbol, prop.name);
            if (sym) {
              addCompletion(prop.name, sym);
            }
          }
        }
      }
    } else if (identifier.parent && identifier.parent.kind === SyntaxKind.MemberExpression) {
      const memberExpression = identifier.parent;
      let baseType = getCompletionBaseType(memberExpression.base);
      let base = resolver.getNodeLinks(memberExpression.base).resolvedSymbol;
      if (base && base.flags & SymbolFlags.Alias) {
        base = getAliasedSymbol(CheckContext.DEFAULT, base);
      }
      if (!baseType && base) {
        baseType = getCompletionBaseTypeFromSymbol(base);
      }
      if (baseType && (!base || !!(base.flags & SymbolFlags.TemplateParameter))) {
        if (memberExpression.selector === "::") {
          addMetaCompletionsForType(baseType);
        } else {
          addMemberCompletionsForType(baseType);
        }
      }
      if (base) {
        if (memberExpression.selector === "::") {
          if (base?.node === void 0 && base?.declarations && base.declarations.length > 0) {
            const nodeModels = base?.declarations[0];
            if (nodeModels.kind === SyntaxKind.OperationStatement) {
              const operation = nodeModels;
              addCompletion("parameters", operation.symbol);
              addCompletion("returnType", operation.symbol);
            }
          } else if (base?.node?.kind === SyntaxKind.ModelProperty) {
            const metaProperty = base.node;
            addCompletion("type", metaProperty.symbol);
          }
        } else {
          addCompletions(base.exports ?? base.members);
        }
      }
    } else {
      if (kind === IdentifierKind.TypeReference && exprIsBareIdentifier(ancestor) && ancestor.parent?.kind === SyntaxKind.TemplateArgument && ancestor.parent.name === void 0) {
        const templates = getTemplateDeclarationsForArgument(CheckContext.DEFAULT, ancestor.parent);
        for (const template of templates) {
          for (const param of template.templateParameters) {
            addCompletion(param.id.sv, param.symbol, { suffix: " = " });
          }
        }
      }
      let scope = identifier.parent;
      while (scope && scope.kind !== SyntaxKind.TypeSpecScript) {
        if (scope.symbol && scope.symbol.exports) {
          const mergedSymbol = getMergedSymbol(scope.symbol);
          addCompletions(mergedSymbol.exports);
        }
        if ("locals" in scope) {
          addCompletions(scope.locals);
        }
        scope = scope.parent;
      }
      if (scope && scope.kind === SyntaxKind.TypeSpecScript) {
        if (!isUsingBeforeFileNamespace(identifier)) {
          for (const ns of scope.inScopeNamespaces) {
            const mergedSymbol = getMergedSymbol(ns.symbol);
            addCompletions(mergedSymbol.exports);
          }
        }
        addCompletions(resolver.symbols.global.exports);
        addCompletions(scope.locals);
      }
    }
    return completions;
    function getCompletionBaseType(base) {
      const entity = getTypeOrValueForNode(base, CheckContext.DEFAULT);
      if (!entity || !isType(entity) || isErrorType(entity)) {
        if (base.kind === SyntaxKind.Identifier) {
          const scopedTemplateParameter = getTemplateParameterTypeFromScope(base);
          if (scopedTemplateParameter) {
            return resolveTemplateConstraintType(scopedTemplateParameter);
          }
        }
        const templateBase = probeTemplateAccessBaseEntity(base);
        return templateBase ? resolveTemplateConstraintType(templateBase) : void 0;
      }
      if (isTemplateAccessType(entity)) {
        return resolveTemplateConstraintType(entity);
      }
      return entity;
    }
    function getCompletionBaseTypeFromSymbol(base) {
      if (base.flags & SymbolFlags.LateBound) {
        const lateBoundType = base.type;
        return lateBoundType && isType(lateBoundType) ? resolveCompletionType(lateBoundType) : void 0;
      }
      if (base.flags & SymbolFlags.TemplateParameter) {
        const mapped = checkTemplateParameterDeclaration(CheckContext.DEFAULT, getSymNode(base));
        return isType(mapped) ? resolveCompletionType(mapped) : void 0;
      }
      return void 0;
    }
    function resolveCompletionType(type) {
      return isTemplateAccessType(type) ? resolveTemplateConstraintType(type) : type;
    }
    function addMemberCompletionsForType(baseType) {
      switch (baseType.kind) {
        case "Model":
          for (const property of walkPropertiesInherited(baseType)) {
            const ownerSymbol = baseType.node?.symbol;
            const propertySymbol = (ownerSymbol ? getMemberSymbol(ownerSymbol, property.name) : void 0) ?? property.node?.symbol;
            if (propertySymbol) {
              addCompletion(property.name, propertySymbol);
            }
          }
          return;
        case "Interface":
          for (const [name, operation] of baseType.operations) {
            const operationSymbol = operation.node?.symbol;
            if (operationSymbol) {
              addCompletion(name, operationSymbol);
            }
          }
          return;
        case "Enum":
          for (const [name, member] of baseType.members) {
            const enumMemberSymbol = member.node?.symbol;
            if (enumMemberSymbol) {
              addCompletion(name, enumMemberSymbol);
            }
          }
          return;
        case "Union":
          for (const [name, variant] of baseType.variants) {
            if (typeof name === "string" && variant.node?.symbol) {
              addCompletion(name, variant.node.symbol);
            }
          }
          return;
        case "Scalar":
          for (const [name, constructor] of baseType.constructors) {
            const constructorSymbol = constructor.node?.symbol;
            if (constructorSymbol) {
              addCompletion(name, constructorSymbol);
            }
          }
          return;
        case "Namespace":
          addCompletions(baseType.node?.symbol?.exports);
          return;
      }
    }
    function addMetaCompletionsForType(baseType) {
      const baseSymbol = getTypeSymbol(baseType);
      if (!baseSymbol) {
        return;
      }
      for (const metaMemberName of resolver.getMetaMemberNames(baseSymbol)) {
        addCompletion(metaMemberName, baseSymbol);
      }
    }
    function addCompletions(table) {
      if (!table) {
        return;
      }
      table = resolver.getAugmentedSymbolTable(table);
      for (const [key, sym] of table) {
        if (sym.flags & SymbolFlags.DuplicateUsing) {
          const duplicates = table.duplicates.get(sym);
          for (const duplicate of duplicates) {
            if (duplicate.flags & SymbolFlags.Using) {
              const fqn = getFullyQualifiedSymbolName(duplicate.symbolSource);
              addCompletion(fqn, duplicate);
            }
          }
        } else {
          addCompletion(key, sym);
        }
      }
    }
    function addCompletion(key, sym, options = {}) {
      if (sym.symbolSource && !(sym.flags & SymbolFlags.LateBound)) {
        sym = sym.symbolSource;
      }
      if (!shouldAddCompletion(sym)) {
        return;
      }
      if (key.startsWith("@")) {
        key = key.slice(1);
      }
      if (!completions.has(key)) {
        completions.set(key, { ...options, sym });
      }
    }
    function shouldAddCompletion(sym) {
      switch (kind) {
        case IdentifierKind.ModelExpressionProperty:
        case IdentifierKind.ModelStatementProperty:
        case IdentifierKind.ObjectLiteralProperty:
          return !!(sym.flags & SymbolFlags.Member);
        case IdentifierKind.Decorator:
          return !!(sym.flags & (SymbolFlags.Decorator | SymbolFlags.Namespace));
        case IdentifierKind.Function:
          return !!(sym.flags & (SymbolFlags.Function | SymbolFlags.Namespace));
        case IdentifierKind.Using:
          return !!(sym.flags & SymbolFlags.Namespace);
        case IdentifierKind.TypeReference:
          return !(sym.flags & SymbolFlags.Decorator);
        case IdentifierKind.TemplateArgument:
          return !!(sym.flags & SymbolFlags.TemplateParameter);
        default:
          compilerAssert(false, "We should have bailed up-front on other kinds.");
      }
    }
  }
  function getCodefixesForUnknownIdentifier(node) {
    switch (node.sv) {
      case "number":
        return [createChangeIdentifierCodeFix(node, "float64")];
      default:
        return void 0;
    }
  }
  function resolveTypeReferenceSym(ctx, node, options) {
    const resolvedOptions = typeof options === "boolean" ? { ...defaultSymbolResolutionOptions, resolveDecorators: options } : { ...defaultSymbolResolutionOptions, ...options ?? {} };
    if (ctx.mapper === void 0 && !resolvedOptions.resolveDeclarationOfTemplate && referenceSymCache.has(node)) {
      return referenceSymCache.get(node);
    }
    resolvedOptions.locationContext ??= getLocationContext(program, node);
    const sym = resolveTypeReferenceSymInternal(ctx, node, resolvedOptions);
    if (ctx.mapper === void 0 && !resolvedOptions.resolveDeclarationOfTemplate) {
      referenceSymCache.set(node, sym);
    }
    return sym;
  }
  function resolveTypeReferenceSymInternal(ctx, node, options) {
    if (hasParseError(node)) {
      return void 0;
    }
    if (node.kind === SyntaxKind.TypeReference) {
      return resolveTypeReferenceSym(ctx, node.target, options);
    } else if (node.kind === SyntaxKind.Identifier) {
      const links = resolver.getNodeLinks(node);
      if (ctx.mapper === void 0 && links.resolutionResult) {
        if (ctx.mapper === void 0 && // do not report error when instantiating
        links.resolutionResult & (ResolutionResultFlags.NotFound | ResolutionResultFlags.Unknown)) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "invalid-ref",
            messageId: options.resolveDecorators ? "decorator" : "identifier",
            format: { id: printTypeReferenceNode(node) },
            target: node,
            codefixes: getCodefixesForUnknownIdentifier(node)
          }));
        } else if (links.resolutionResult & ResolutionResultFlags.Ambiguous) {
          reportAmbiguousIdentifier(node, links.ambiguousSymbols);
        }
      }
      const sym = links.resolvedSymbol?.symbolSource ?? links.resolvedSymbol;
      checkSymbolAccess(options.locationContext, node, sym);
      return sym;
    } else if (node.kind === SyntaxKind.MemberExpression) {
      let base = resolveTypeReferenceSym(ctx, node.base, {
        ...options,
        resolveDecorators: false
        // when resolving decorator the base cannot also be one
      });
      if (!base) {
        return void 0;
      }
      const directTemplateAccessSym = tryResolveTemplateAccessSymbol(ctx, node, base);
      if (directTemplateAccessSym) {
        return directTemplateAccessSym;
      }
      if (base.flags & SymbolFlags.Alias) {
        if (!options.resolveDeclarationOfTemplate && isTemplatedNode(getSymNode(base))) {
          const ty = checkTypeReferenceSymbol(
            ctx.withMapper(void 0),
            base,
            node.base,
            /* instantiateTemplates */
            true
          );
          base = lateBindContainer(ty, base);
          if (base?.members) {
            switch (ty.kind) {
              case "Model":
              case "Union":
              case "Interface":
              case "Enum":
              case "Scalar":
                lateBindMembers(ty);
            }
          }
          if (!base)
            return void 0;
        } else {
          const aliasedSym = getAliasedSymbol(ctx, base);
          if (!aliasedSym) {
            reportCheckerDiagnostic(createDiagnostic({
              code: "invalid-ref",
              messageId: "node",
              format: {
                id: node.id.sv,
                nodeName: base.declarations[0] ? SyntaxKind[base.declarations[0].kind] : "Unknown node"
              },
              target: node
            }));
            return void 0;
          }
          base = aliasedSym;
        }
      } else if (!options.resolveDeclarationOfTemplate && isTemplatedNode(getSymNode(base))) {
        const baseSym = getContainerTemplateSymbol(ctx, base, node.base);
        if (!baseSym) {
          return void 0;
        }
        base = baseSym;
      }
      const templateAccessSym = tryResolveTemplateAccessSymbol(ctx, node, base);
      if (templateAccessSym) {
        return templateAccessSym;
      }
      const sym = resolveMemberInContainer(ctx, base, node, options);
      checkSymbolAccess(options.locationContext, node, sym);
      return sym;
    }
    compilerAssert(false, `Unknown type reference kind "${SyntaxKind[node.kind]}"`, node);
  }
  function tryResolveTemplateAccessSymbol(ctx, node, baseSym) {
    const mappedSymbol = tryResolveMappedTemplateAccessSymbol(ctx, node, baseSym);
    if (mappedSymbol) {
      return mappedSymbol;
    }
    const baseEntity = getTemplateAccessBaseEntity(ctx, node.base, baseSym);
    if (!baseEntity) {
      return void 0;
    }
    observeTemplateAccessBase(ctx, baseEntity);
    const accessedType = resolveTemplateAccessType(ctx, node, baseEntity);
    const useCache = ctx.mapper === void 0;
    if (isErrorType(accessedType)) {
      return createTemplateAccessSymbol(baseEntity, node, errorType, useCache);
    }
    if (node.selector === "." && baseEntity.kind === "TemplateParameterAccess" && baseEntity.node.selector === "::") {
      return getPreferredTemplateAccessSymbol(node, accessedType);
    }
    if (ctx.mapper !== void 0) {
      return getPreferredTemplateAccessSymbol(node, accessedType);
    }
    return createTemplateAccessSymbol(baseEntity, node, accessedType, useCache);
  }
  function tryResolveMappedTemplateAccessSymbol(ctx, node, baseSym) {
    if (!ctx.mapper || !(baseSym.flags & SymbolFlags.TemplateParameter)) {
      return void 0;
    }
    const declared = checkTemplateParameterDeclaration(CheckContext.DEFAULT, getSymNode(baseSym));
    if (!isType(declared) || declared.kind !== "TemplateParameter") {
      return void 0;
    }
    const mapped = ctx.mapper.getMappedType(declared);
    if (!isType(mapped) || isTemplateAccessType(mapped)) {
      return void 0;
    }
    if (isUninstantiatedTemplateType(mapped)) {
      return void 0;
    }
    const resolvedType = node.selector === "." ? resolveMemberTypeFromConstraint(mapped, node.id.sv) : resolveMetaTypeFromConstraint(ctx, mapped, node);
    if (!resolvedType) {
      return void 0;
    }
    return getPreferredTemplateAccessSymbol(node, resolvedType);
  }
  function isUninstantiatedTemplateType(type) {
    if ("templateMapper" in type && type.templateMapper !== void 0) {
      return false;
    }
    const node = type.node;
    return Boolean(node && "templateParameters" in node && node.templateParameters.length > 0);
  }
  function shouldUseLateBoundTemplateAccessType(type) {
    return "templateMapper" in type && type.templateMapper !== void 0;
  }
  function getPreferredTemplateAccessSymbol(node, type) {
    const canonicalMemberSymbol = getCanonicalTemplateAccessMemberSymbol(type);
    if (canonicalMemberSymbol) {
      return canonicalMemberSymbol;
    }
    if (!shouldUseLateBoundTemplateAccessType(type)) {
      return getTypeSymbol(type) ?? createLateBoundTypeSymbol(node, type);
    }
    return createLateBoundTypeSymbol(node, type);
  }
  function getCanonicalTemplateAccessMemberSymbol(type) {
    switch (type.kind) {
      case "ModelProperty":
        return getExactInstantiatedMemberSymbol(type.model?.symbol, type.name, type);
      case "Operation":
        return getExactInstantiatedMemberSymbol(type.interface?.symbol, type.name, type);
      case "EnumMember":
        return getExactInstantiatedMemberSymbol(type.enum?.symbol, type.name, type);
      case "UnionVariant":
        return getExactInstantiatedMemberSymbol(type.union?.symbol, type.name, type);
      case "ScalarConstructor":
        return getExactInstantiatedMemberSymbol(type.scalar?.symbol, type.name, type);
      default:
        return void 0;
    }
  }
  function getExactInstantiatedMemberSymbol(containerSymbol, memberName, type) {
    if (!containerSymbol || typeof memberName !== "string") {
      return void 0;
    }
    const memberSymbol = getMemberSymbol(containerSymbol, memberName);
    return memberSymbol?.type === type ? memberSymbol : void 0;
  }
  function getTemplateAccessBaseEntity(_ctx, baseNode, baseSym) {
    if (baseSym.flags & SymbolFlags.LateBound) {
      const lateBoundType = baseSym.type;
      if (lateBoundType && lateBoundType.kind === "TemplateParameterAccess") {
        return lateBoundType;
      }
      return void 0;
    }
    if (baseSym.flags & SymbolFlags.TemplateParameter) {
      const baseSymbolNode = getSymNode(baseSym);
      const mapped = checkTemplateParameterDeclaration(CheckContext.DEFAULT, baseSymbolNode);
      return isType(mapped) && isTemplateAccessType(mapped) ? mapped : void 0;
    }
    if (baseNode.kind === SyntaxKind.Identifier) {
      const templateParameterType = getTemplateParameterTypeFromScope(baseNode);
      if (templateParameterType) {
        return templateParameterType;
      }
      return void 0;
    }
    return void 0;
  }
  function probeTemplateAccessBaseEntity(node) {
    const oldDiagnosticHook = onCheckerDiagnostic;
    onCheckerDiagnostic = () => {
    };
    const entity = checkTypeOrValueReference(CheckContext.DEFAULT, node, false);
    onCheckerDiagnostic = oldDiagnosticHook;
    return isType(entity) && isTemplateAccessType(entity) ? entity : void 0;
  }
  function getTemplateParameterTypeFromScope(identifier) {
    const declaration = findTemplateParameterDeclarationInScope(identifier, identifier.sv);
    if (!declaration) {
      return void 0;
    }
    const mapped = checkTemplateParameterDeclaration(CheckContext.DEFAULT, declaration);
    return isType(mapped) && isTemplateAccessType(mapped) ? mapped : void 0;
  }
  function findTemplateParameterDeclarationInScope(node, name) {
    let current = node.parent;
    while (current) {
      if ("templateParameters" in current && current.templateParameters) {
        const declaration = current.templateParameters.find((x) => x.id.sv === name);
        if (declaration) {
          return declaration;
        }
      }
      current = current.parent;
    }
    return void 0;
  }
  function resolveTemplateAccessType(ctx, node, baseEntity) {
    const baseType = resolveTemplateAccessBaseType(ctx, baseEntity);
    if (!baseType) {
      if (hasErrorTemplateConstraint(baseEntity)) {
        return errorType;
      }
      reportTemplateAccessNotGuaranteed(node, baseEntity);
      return errorType;
    }
    const resolvedType = node.selector === "." ? resolveMemberTypeFromConstraint(baseType, node.id.sv) : resolveMetaTypeFromConstraint(ctx, baseType, node);
    if (!resolvedType) {
      reportTemplateAccessNotGuaranteed(node, baseType);
      return errorType;
    }
    return resolvedType;
  }
  function resolveTemplateAccessBaseType(ctx, baseEntity) {
    if (ctx.mapper && baseEntity.kind === "TemplateParameterAccess") {
      const mappedBaseType = resolveTemplateAccessBaseType(ctx, baseEntity.base);
      if (!mappedBaseType) {
        return void 0;
      }
      return baseEntity.node.selector === "." ? resolveMemberTypeFromConstraint(mappedBaseType, baseEntity.node.id.sv) : resolveMetaTypeFromConstraint(ctx, mappedBaseType, baseEntity.node);
    }
    if (ctx.mapper && baseEntity.kind === "TemplateParameter") {
      const mapped = ctx.mapper.getMappedType(baseEntity);
      if (isType(mapped)) {
        if (isTemplateAccessType(mapped)) {
          return resolveTemplateConstraintType(mapped);
        }
        if (isUninstantiatedTemplateType(mapped)) {
          return resolveTemplateConstraintType(baseEntity);
        }
        return mapped;
      }
    }
    return resolveTemplateConstraintType(baseEntity);
  }
  function resolveTemplateConstraintType(templateType) {
    const visited = /* @__PURE__ */ new Set();
    let current = templateType;
    while (true) {
      if (visited.has(current)) {
        return void 0;
      }
      visited.add(current);
      const constraintType = current.constraint?.type;
      if (!constraintType || isErrorType(constraintType)) {
        return void 0;
      }
      if (!isTemplateAccessType(constraintType)) {
        return constraintType;
      }
      current = constraintType;
    }
  }
  function hasErrorTemplateConstraint(templateType) {
    let current = templateType;
    while (true) {
      const constraintType = current.constraint?.type;
      if (constraintType && isErrorType(constraintType)) {
        return true;
      }
      if (current.kind !== "TemplateParameterAccess") {
        return false;
      }
      current = current.base;
    }
  }
  function observeTemplateAccessBase(ctx, base) {
    const root = getTemplateAccessRoot(base);
    ctx.observeTemplateParameter(root);
    templateParameterUsageMap.set(root.node, true);
  }
  function getTemplateAccessRoot(base) {
    let current = base;
    while (current.kind === "TemplateParameterAccess") {
      current = current.base;
    }
    return current;
  }
  function resolveMemberTypeFromConstraint(constraintType, memberName) {
    const canonicalMemberType = getCanonicalResolvedMemberType(constraintType, memberName);
    if (canonicalMemberType) {
      return canonicalMemberType;
    }
    switch (constraintType.kind) {
      case "Model":
        for (const property of walkPropertiesInherited(constraintType)) {
          if (property.name === memberName) {
            return property;
          }
        }
        return void 0;
      case "Interface":
        return constraintType.operations.get(memberName);
      case "Enum":
        return constraintType.members.get(memberName);
      case "Union":
        return constraintType.variants.get(memberName);
      case "Scalar":
        return constraintType.constructors.get(memberName);
      default:
        return void 0;
    }
  }
  function getCanonicalResolvedMemberSymbol(containerType, memberName) {
    switch (containerType.kind) {
      case "Model":
      case "Interface":
      case "Enum":
      case "Union":
      case "Scalar":
        break;
      default:
        return void 0;
    }
    const containerSymbol = containerType.symbol;
    if (containerSymbol === void 0 || !containerSymbol.members) {
      return void 0;
    }
    let memberSymbol = getMemberSymbol(containerSymbol, memberName);
    if (!memberSymbol?.type && containerSymbol.flags & SymbolFlags.LateBound) {
      lateBindMembers(containerType);
      memberSymbol = getMemberSymbol(containerSymbol, memberName);
    }
    return memberSymbol;
  }
  function getCanonicalResolvedMemberType(containerType, memberName) {
    const memberType = getCanonicalResolvedMemberSymbol(containerType, memberName)?.type;
    return memberType && isType(memberType) ? memberType : void 0;
  }
  function resolveMetaTypeFromConstraint(ctx, constraintType, node) {
    if (constraintType.kind === "ModelProperty" && node.id.sv === "type") {
      return constraintType.type;
    }
    if (constraintType.kind === "Operation") {
      switch (node.id.sv) {
        case "parameters":
          return constraintType.parameters;
        case "returnType":
          return constraintType.returnType;
      }
    }
    const constraintSymbol = getTypeSymbol(constraintType);
    if (!constraintSymbol) {
      return void 0;
    }
    const metaMemberNames = resolver.getMetaMemberNames(constraintSymbol);
    if (!metaMemberNames.includes(node.id.sv)) {
      return void 0;
    }
    if (isReflectionMetaProjectionSymbol(constraintSymbol)) {
      return unknownType;
    }
    const resolved = resolver.resolveMetaMemberByName(constraintSymbol, node.id.sv);
    if (resolved.resolutionResult & ResolutionResultFlags.Resolved && resolved.resolvedSymbol) {
      const entity = checkTypeOrValueReferenceSymbol(ctx, resolved.resolvedSymbol, node, false);
      if (entity === null) {
        return void 0;
      }
      if (entity.entityKind === "Indeterminate") {
        return entity.type;
      }
      return isType(entity) ? entity : void 0;
    }
    return unknownType;
  }
  function isReflectionMetaProjectionSymbol(sym) {
    return sym.node?.kind === SyntaxKind.ModelStatement && sym.parent?.name === "Reflection" && sym.parent?.parent?.name === "TypeSpec";
  }
  function reportTemplateAccessNotGuaranteed(node, baseType) {
    reportCheckerDiagnostic(createDiagnostic({
      code: "invalid-ref",
      messageId: node.selector === "." ? "member" : "metaProperty",
      format: { kind: getTemplateAccessKindName(baseType), id: node.id.sv },
      target: node
    }));
  }
  function getTemplateAccessKindName(type) {
    switch (type.kind) {
      case "Model":
      case "ModelProperty":
      case "Enum":
      case "Interface":
      case "Union":
      case "Operation":
      case "Scalar":
      case "TemplateParameter":
      case "TemplateParameterAccess":
        return type.kind;
      default:
        return "Type";
    }
  }
  function isTemplateAccessType(type) {
    return type.kind === "TemplateParameter" || type.kind === "TemplateParameterAccess";
  }
  function createTemplateAccessSymbol(base, node, constraintType, useCache = true) {
    const cacheKey = getTemplateAccessCacheKey(base, node);
    if (useCache) {
      const existing = templateAccessSymbolCache.get(cacheKey);
      if (existing) {
        return existing;
      }
    }
    const constraint = {
      entityKind: "MixedParameterConstraint",
      node,
      type: constraintType
    };
    const type = createAndFinishType({
      kind: "TemplateParameterAccess",
      node,
      base,
      path: printMemberExpressionPath(getTemplateAccessPath(base), node.selector, node.id.sv),
      constraint
    });
    templateAccessCacheKeys.set(type, cacheKey);
    const symbol = createSymbol(node, node.id.sv, SymbolFlags.LateBound);
    mutate(symbol).type = type;
    if (useCache) {
      templateAccessSymbolCache.set(cacheKey, symbol);
    }
    return symbol;
  }
  function getTemplateAccessPath(base) {
    return base.kind === "TemplateParameterAccess" ? base.path : printIdentifier(base.node.id.sv);
  }
  function getTemplateAccessCacheKey(base, node) {
    let baseKey;
    if (base.kind === "TemplateParameterAccess") {
      const cacheKey = templateAccessCacheKeys.get(base);
      compilerAssert(cacheKey, "Expected template access cache key");
      baseKey = cacheKey;
    } else {
      baseKey = `tp:${getSymbolCacheId(base.node.symbol)}`;
    }
    return `${baseKey}${node.selector}${node.id.sv}`;
  }
  function getTypeSymbol(type) {
    return type.node?.symbol ? getMergedSymbol(type.node.symbol) : void 0;
  }
  function getSymbolCacheId(sym) {
    const existing = symbolCacheIds.get(sym);
    if (existing !== void 0) {
      return existing;
    }
    const id = nextSymbolCacheId++;
    symbolCacheIds.set(sym, id);
    return id;
  }
  function checkSymbolAccess(sourceLocation, node, symbol) {
    if (!symbol)
      return;
    const isInternalDeclaration = (symbol.flags & (SymbolFlags.Internal | SymbolFlags.Declaration)) === (SymbolFlags.Internal | SymbolFlags.Declaration);
    if (isInternalDeclaration) {
      if (sourceLocation.type === "synthetic" || sourceLocation.type === "compiler") {
        return;
      }
      const isDeclaredInCompatibleLocation = symbol.declarations.some((decl) => {
        const declLocation = getLocationContext(program, decl);
        if (declLocation.type !== sourceLocation.type)
          return false;
        if (declLocation.type === "project")
          return true;
        return declLocation === sourceLocation;
      });
      if (isDeclaredInCompatibleLocation)
        return;
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-ref",
        messageId: "internal",
        format: { id: symbol.name },
        target: node
      }));
    }
  }
  function reportAmbiguousIdentifier(node, symbols) {
    const duplicateNames = symbols.map((s) => getFullyQualifiedSymbolName(s, { useGlobalPrefixAtTopLevel: true }));
    program.reportDiagnostic(createDiagnostic({
      code: "ambiguous-symbol",
      format: { name: node.sv, duplicateNames: duplicateNames.join(", ") },
      target: node
    }));
  }
  function resolveMemberInContainer(ctx, base, node, options) {
    const symbolFromType = resolveMemberOnSymbolType(ctx, base, node);
    if (symbolFromType) {
      return symbolFromType;
    }
    const { finalSymbol: sym, resolvedSymbol: nextSym } = resolver.resolveMemberExpressionForSym(base, node, options);
    const symbol = nextSym ?? sym;
    if (symbol) {
      return symbol;
    }
    if (node.selector === "." && base.flags & SymbolFlags.MemberContainer) {
      const resolvedMember = tryForceResolveLateBoundMember(ctx, base, node);
      if (resolvedMember) {
        return resolvedMember;
      }
    }
    if (base.flags & SymbolFlags.Namespace) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-ref",
        messageId: "underNamespace",
        format: {
          namespace: getFullyQualifiedSymbolName(base),
          id: node.id.sv
        },
        target: node
      }));
    } else if (base.flags & SymbolFlags.Decorator) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-ref",
        messageId: "inDecorator",
        format: { id: node.id.sv },
        target: node
      }));
    } else if (base.flags & SymbolFlags.Function) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-ref",
        messageId: "node",
        format: { id: node.id.sv, nodeName: "function" },
        target: node
      }));
    } else if (base.flags & SymbolFlags.MemberContainer) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-ref",
        messageId: node.selector === "." ? "member" : "metaProperty",
        format: { kind: getMemberKindName(getSymNode(base)), id: node.id.sv },
        target: node
      }));
    } else {
      const symNode = getSymNode(base);
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-ref",
        messageId: "node",
        format: {
          id: node.id.sv,
          nodeName: symNode ? SyntaxKind[symNode.kind] : "Unknown node"
        },
        target: node
      }));
    }
    return void 0;
  }
  function tryForceResolveLateBoundMember(ctx, base, node) {
    const links = getSymbolLinks(base);
    if (!links.hasUnknownMembers) {
      return void 0;
    }
    if (pendingResolutions.has(base, ResolutionKind.Type)) {
      return void 0;
    }
    pendingResolutions.start(base, ResolutionKind.Type);
    const type = checkTypeReferenceSymbol(ctx, base, node.base);
    pendingResolutions.finish(base, ResolutionKind.Type);
    if (isErrorType(type)) {
      return void 0;
    }
    switch (type.kind) {
      case "Model":
      case "Interface":
      case "Union":
      case "Enum":
      case "Scalar":
        lateBindMemberContainer(type);
        lateBindMembers(type);
        break;
      default:
        return void 0;
    }
    return getCanonicalResolvedMemberSymbol(type, node.id.sv);
  }
  function getMemberKindName(node) {
    switch (node?.kind) {
      case SyntaxKind.ModelStatement:
      case SyntaxKind.ModelDeclarationExpression:
      case SyntaxKind.ModelExpression:
        return "Model";
      case SyntaxKind.ModelProperty:
        return "ModelProperty";
      case SyntaxKind.EnumStatement:
      case SyntaxKind.EnumDeclarationExpression:
        return "Enum";
      case SyntaxKind.InterfaceStatement:
        return "Interface";
      case SyntaxKind.UnionStatement:
      case SyntaxKind.UnionDeclarationExpression:
        return "Union";
      default:
        return "Type";
    }
  }
  function resolveMemberOnSymbolType(ctx, base, node) {
    const baseType = getMemberResolutionType(ctx, base);
    if (!baseType) {
      return void 0;
    }
    const resolvedBaseType = isTemplateAccessType(baseType) ? resolveTemplateAccessBaseType(ctx, baseType) : baseType;
    if (!resolvedBaseType) {
      return void 0;
    }
    if (node.selector === ".") {
      const table = base.exports ?? base.members;
      if (table) {
        const directMember = resolver.getAugmentedSymbolTable(table).get(node.id.sv);
        if (directMember) {
          return directMember;
        }
      }
      const canonicalMember = getCanonicalResolvedMemberSymbol(resolvedBaseType, node.id.sv);
      if (canonicalMember) {
        return canonicalMember;
      }
    }
    const resolvedType = node.selector === "." ? resolveMemberTypeFromConstraint(resolvedBaseType, node.id.sv) : resolveMetaTypeFromConstraint(ctx, resolvedBaseType, node);
    if (!resolvedType) {
      return void 0;
    }
    if (node.selector === "::" && node.id.sv === "type" && resolvedType.kind === "TemplateParameterAccess" && resolvedType.base.kind === "TemplateParameterAccess" && resolvedType.base.node.selector === ".") {
      const sourceProperty = resolveTemplateConstraintType(resolvedType.base);
      if (sourceProperty) {
        return getTypeSymbol(sourceProperty) ?? createLateBoundTypeSymbol(node, sourceProperty);
      }
    }
    return getPreferredTemplateAccessSymbol(node, resolvedType);
  }
  function getMemberResolutionType(_ctx, base) {
    if (base.flags & SymbolFlags.LateBound) {
      return base.type && isType(base.type) ? base.type : void 0;
    }
    if (base.flags & SymbolFlags.Member) {
      return base.type && isType(base.type) ? base.type : void 0;
    }
    return void 0;
  }
  function createLateBoundTypeSymbol(node, type) {
    const symbol = createSymbol(node, node.id.sv, SymbolFlags.LateBound);
    mutate(symbol).type = type;
    const symbolSource = getTemplateAccessSymbolSource(type);
    if (symbolSource) {
      mutate(symbol).symbolSource = symbolSource;
    }
    return symbol;
  }
  function getTemplateAccessSymbolSource(type) {
    const symbolSource = type.kind === "ModelProperty" ? getModelPropertySymbolSource(type) : getCanonicalTemplateAccessMemberSymbol(type) ?? getTypeSymbol(type);
    return symbolSource?.symbolSource ?? symbolSource;
  }
  function getModelPropertySymbolSource(type) {
    let fallback;
    for (let property = type; property; property = property.sourceProperty) {
      const symbolSource = getCanonicalTemplateAccessMemberSymbol(property) ?? (property.model?.symbol && typeof property.name === "string" ? getMemberSymbol(property.model.symbol, property.name) : void 0) ?? getTypeSymbol(property);
      if (symbolSource) {
        fallback ??= symbolSource;
        if (!property.sourceProperty) {
          return symbolSource;
        }
      }
    }
    return fallback;
  }
  function getAliasedSymbol(ctx, aliasSymbol) {
    const node = getSymNode(aliasSymbol);
    compilerAssert(node, "Expected alias symbol to have a node");
    const links = resolver.getSymbolLinks(aliasSymbol);
    if (!links.aliasResolutionIsTemplate) {
      const aliased = links.aliasedSymbol ?? resolver.getNodeLinks(node).resolvedSymbol;
      if (aliased && isTemplatedNode(getSymNode(aliased))) {
        const aliasType2 = getTypeForNode(node, ctx);
        return lateBindContainer(aliasType2, aliasSymbol);
      }
      return aliased;
    }
    const aliasType = getTypeForNode(node, ctx);
    return lateBindContainer(aliasType, aliasSymbol);
  }
  function getContainerTemplateSymbol(ctx, sym, node) {
    if (pendingResolutions.has(sym, ResolutionKind.Type)) {
      if (ctx.mapper === void 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "circular-alias-type",
          format: { typeName: sym.name },
          target: node
        }));
      }
      return void 0;
    }
    pendingResolutions.start(sym, ResolutionKind.Type);
    const type = checkTypeReferenceSymbol(ctx, sym, node);
    pendingResolutions.finish(sym, ResolutionKind.Type);
    return lateBindContainer(type, sym);
  }
  function lateBindContainer(type, sym) {
    if (isErrorType(type)) {
      return void 0;
    }
    switch (type.kind) {
      case "Model":
      case "Interface":
      case "Union":
        if (isTemplateInstance(type)) {
          lateBindMemberContainer(type);
          return type.symbol;
        }
      // fallthrough
      default:
        return getMergedSymbol(type.node.symbol) ?? sym;
    }
  }
  function checkStringTemplateExpresion(ctx, node) {
    let hasType = false;
    let hasValue = false;
    const spanTypeOrValues = [];
    for (const span of node.spans) {
      const typeOrValue = checkNode(ctx, span.expression);
      if (typeOrValue === null) {
        return null;
      }
      spanTypeOrValues.push([span, typeOrValue]);
    }
    for (const [_, typeOrValue] of spanTypeOrValues) {
      if (isValue(typeOrValue)) {
        hasValue = true;
      } else if ("kind" in typeOrValue && (typeOrValue.kind === "TemplateParameter" || typeOrValue.kind === "TemplateParameterAccess")) {
        if (typeOrValue.constraint) {
          if (typeOrValue.constraint.valueType) {
            hasValue = true;
          }
          if (typeOrValue.constraint.type) {
            hasType = true;
          }
        } else {
          hasType = true;
        }
      } else {
        hasType = true;
      }
    }
    if (hasType && hasValue) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "mixed-string-template",
        target: node
      }));
      return null;
    }
    if (hasValue) {
      let str = node.head.value;
      for (const [span, typeOrValue] of spanTypeOrValues) {
        if (!("kind" in typeOrValue) || typeOrValue.kind !== "TemplateParameter" && typeOrValue.kind !== "TemplateParameterAccess") {
          compilerAssert(isValue(typeOrValue), "Expected value.");
          str += stringifyValueForTemplate(typeOrValue);
        }
        str += span.literal.value;
      }
      return checkStringValue(createLiteralType(str), void 0, node);
    } else {
      let hasNonStringElement = false;
      let stringValue = node.head.value;
      const spans = [createTemplateSpanLiteral(node.head)];
      for (const [span, typeOrValue] of spanTypeOrValues) {
        compilerAssert(!isValue(typeOrValue), "Expected type.");
        const type = typeOrValue.entityKind === "Indeterminate" ? typeOrValue.type : typeOrValue;
        const spanValue = createTemplateSpanValue(span.expression, type);
        spans.push(spanValue);
        const spanValueAsString = stringifyTypeForTemplate(type);
        if (spanValueAsString !== void 0) {
          stringValue += spanValueAsString;
        } else {
          hasNonStringElement = true;
        }
        spans.push(createTemplateSpanLiteral(span.literal));
        stringValue += span.literal.value;
      }
      return createIndeterminateEntity(createType({
        kind: "StringTemplate",
        node,
        spans,
        stringValue: hasNonStringElement ? void 0 : stringValue
      }));
    }
  }
  function createIndeterminateEntity(type) {
    const existing = indeterminateEntities.get(type);
    if (existing) {
      return existing;
    }
    const entity = {
      entityKind: "Indeterminate",
      type
    };
    indeterminateEntities.set(type, entity);
    return entity;
  }
  function stringifyTypeForTemplate(type) {
    switch (type.kind) {
      case "String":
      case "Number":
      case "Boolean":
        return String(type.value);
      case "StringTemplate":
        if (type.stringValue !== void 0) {
          return type.stringValue;
        }
        return void 0;
      default:
        return void 0;
    }
  }
  function stringifyValueForTemplate(value) {
    switch (value.valueKind) {
      case "StringValue":
      case "NumericValue":
      case "BooleanValue":
        return value.value.toString();
      default:
        reportCheckerDiagnostic(createDiagnostic({
          code: "non-literal-string-template",
          target: value
        }));
        return `[${value.valueKind}]`;
    }
  }
  function createTemplateSpanLiteral(node) {
    return createType({
      kind: "StringTemplateSpan",
      node,
      isInterpolated: false,
      type: getLiteralType(node)
    });
  }
  function createTemplateSpanValue(node, type) {
    return createType({
      kind: "StringTemplateSpan",
      node,
      isInterpolated: true,
      type
    });
  }
  function checkStringLiteral(str) {
    return createIndeterminateEntity(getLiteralType(str));
  }
  function checkNumericLiteral(num) {
    return createIndeterminateEntity(getLiteralType(num));
  }
  function checkBooleanLiteral(bool) {
    return createIndeterminateEntity(getLiteralType(bool));
  }
  function checkProgram() {
    checkDuplicateSymbols();
    for (const file of program.sourceFiles.values()) {
      checkDuplicateUsings(file);
      for (const ns of file.namespaces) {
        initializeTypeForNamespace(ns);
      }
    }
    for (const file of program.sourceFiles.values()) {
      checkSourceFile(file);
    }
    checkOrphanedFunctionImplementations();
    internalDecoratorValidation();
    assertNoPendingResolutions();
    runPostValidators(postCheckValidators);
  }
  function assertNoPendingResolutions() {
    if (waitingForResolution.size === 0) {
      return;
    }
    const message = [
      "Unexpected pending resolutions found",
      ...[...waitingForResolution.entries()].flatMap(([type, items]) => {
        const base = `  (${type.kind}) ${getTypeName(type)} => `;
        return items.map(([item], index) => `${index === 0 ? base : " ".repeat(base.length)}${getTypeName(item)}`);
      })
    ].join("\n");
    compilerAssert(false, message);
  }
  function checkDuplicateSymbols() {
    program.reportDuplicateSymbols(resolver.symbols.global.exports);
    for (const file of program.sourceFiles.values()) {
      for (const ns of file.namespaces) {
        const exports = getMergedSymbol(ns.symbol).exports ?? ns.symbol.exports;
        program.reportDuplicateSymbols(exports);
      }
    }
  }
  function checkOrphanedFunctionImplementations() {
    for (const file of program.jsSourceFiles.values()) {
      checkSymbolTableForOrphanedFunctions(file.symbol.exports, file);
    }
  }
  function checkSymbolTableForOrphanedFunctions(exports, sourceFile) {
    if (!exports)
      return;
    for (const sym of exports.values()) {
      if (sym.flags & SymbolFlags.Function && sym.flags & SymbolFlags.Implementation) {
        const merged = getMergedSymbol(sym);
        const hasFunctionDeclaration = merged.declarations.some((d) => d.kind === SyntaxKind.FunctionDeclarationStatement);
        if (!hasFunctionDeclaration) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "missing-extern-declaration",
            format: { name: sym.name },
            target: sourceFile
          }));
        }
      }
      if (sym.flags & SymbolFlags.Namespace && sym.exports) {
        checkSymbolTableForOrphanedFunctions(sym.exports, sourceFile);
      }
    }
  }
  function checkDuplicateUsings(file) {
    const duplicateTrackers = /* @__PURE__ */ new Map();
    function getTracker(sym) {
      const existing = duplicateTrackers.get(sym);
      if (existing)
        return existing;
      const newTacker = new DuplicateTracker();
      duplicateTrackers.set(sym, newTacker);
      return newTacker;
    }
    for (const using of file.usings) {
      const ns = using.parent;
      const sym = getMergedSymbol(ns.symbol);
      const tracker = getTracker(sym);
      const targetSym = resolver.getNodeLinks(using.name).resolvedSymbol;
      if (!targetSym)
        continue;
      tracker.track(targetSym, using);
    }
    for (const tracker of duplicateTrackers.values()) {
      for (const [_, nodes] of tracker.entries()) {
        for (const node of nodes) {
          program.reportDiagnostic(createDiagnostic({
            code: "duplicate-using",
            format: { usingName: typeReferenceToString(node.name) },
            target: node
          }));
        }
      }
    }
  }
  function internalDecoratorValidation() {
    validateInheritanceDiscriminatedUnions(program);
  }
  function checkSourceFile(file) {
    for (const statement of file.statements) {
      checkNode(CheckContext.DEFAULT, statement, void 0);
    }
  }
  function checkTemplateDeclaration(ctx, node) {
    if (ctx.mapper === void 0) {
      for (const templateParameter of node.templateParameters) {
        checkTemplateParameterDeclaration(ctx, templateParameter);
      }
    }
  }
  function checkModel(ctx, node) {
    if (node.kind === SyntaxKind.ModelExpression) {
      return checkModelExpression(ctx, node);
    } else {
      return checkModelStatement(ctx, node);
    }
  }
  function checkExpressionDeclarationConstraints(node) {
    const isExpression = node.kind === SyntaxKind.ModelDeclarationExpression || node.kind === SyntaxKind.UnionDeclarationExpression || node.kind === SyntaxKind.ScalarDeclarationExpression;
    if (isExpression && node.templateParameters.length > 0) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "templated-declaration-in-expression",
        target: node.templateParameters[0]
      }));
    }
  }
  function checkModelStatement(ctx, node) {
    const links = getSymbolLinks(node.symbol);
    if (ctx.mapper === void 0 && node.templateParameters.length > 0) {
      ctx = ctx.withFlags(CheckFlags.InTemplateDeclaration);
    }
    if (links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    if (ctx.mapper === void 0) {
      checkModifiers(program, node);
    }
    checkTemplateDeclaration(ctx, node);
    checkExpressionDeclarationConstraints(node);
    if (ctx.mapper === void 0) {
      reportDeclarationExpressionFeature(node);
    }
    const decorators = [];
    const type = createType({
      kind: "Model",
      name: node.id?.sv ?? "",
      node,
      properties: createRekeyableMap(),
      namespace: getParentNamespaceType(node),
      decorators,
      sourceModels: [],
      derivedModels: [],
      expression: node.kind === SyntaxKind.ModelDeclarationExpression
    });
    linkType(ctx, links, type);
    if (node.symbol.members) {
      const members = resolver.getAugmentedSymbolTable(node.symbol.members);
      const propDocs = extractPropDocs(node);
      for (const [name, memberSym] of members) {
        const doc = propDocs.get(name);
        if (doc) {
          docFromCommentForSym.set(memberSym, doc);
        }
      }
    }
    const isBase = checkModelIs(ctx, node, node.is);
    ensureResolved([
      isBase,
      ...node.properties.filter((x) => x.kind === SyntaxKind.ModelSpreadProperty).map((x) => checkSpreadTarget(ctx, node, x.target))
    ], type, () => {
      if (isBase) {
        type.sourceModel = isBase;
        type.sourceModels.push({ usage: "is", model: isBase, node: node.is });
        decorators.push(...isBase.decorators);
        if (isBase.indexer) {
          type.indexer = isBase.indexer;
        }
        for (const prop of isBase.properties.values()) {
          const memberSym = getMemberSymbol(node.symbol, prop.name);
          const newProp = cloneTypeForSymbol(memberSym, prop, {
            sourceProperty: prop,
            model: type
          });
          linkIndirectMember(ctx, node, newProp);
          type.properties.set(prop.name, newProp);
        }
      }
      if (isBase) {
        type.baseModel = isBase.baseModel;
      } else if (node.extends) {
        type.baseModel = checkClassHeritage(ctx, node, node.extends);
        if (type.baseModel) {
          copyDeprecation(type.baseModel, type);
        }
      }
      if (type.baseModel) {
        type.baseModel.derivedModels.push(type);
      }
      if (ctx.mapper === void 0 && !type.expression) {
        type.namespace?.models.set(type.name, type);
      }
      checkModelProperties(ctx, node, type.properties, type);
      decorators.push(...checkDecorators(ctx, type, node));
      linkMapper(type, ctx.mapper);
      finishType(type, { skipDecorators: ctx.hasFlags(CheckFlags.InTemplateDeclaration) });
      lateBindMemberContainer(type);
      lateBindMembers(type);
      const indexer = getIndexer(program, type);
      if (type.name === "Array" && isInTypeSpecNamespace2(type)) {
        stdTypes.Array = type;
      } else if (type.name === "Record" && isInTypeSpecNamespace2(type)) {
        stdTypes.Record = type;
      }
      if (indexer) {
        type.indexer = indexer;
      }
    });
    return type;
  }
  function checkModelExpression(ctx, node) {
    const links = getSymbolLinks(node.symbol);
    if (links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    const type = initModel(node);
    const properties = type.properties;
    linkType(ctx, links, type);
    linkMapper(type, ctx.mapper);
    ensureResolved(node.properties.filter((x) => x.kind === SyntaxKind.ModelSpreadProperty).map((x) => checkSpreadTarget(ctx, node, x.target)), type, () => {
      checkModelProperties(ctx, node, properties, type);
      finishType(type, { skipDecorators: ctx.hasFlags(CheckFlags.InTemplateDeclaration) });
    });
    return type;
  }
  function findIndexer(model) {
    let current = model;
    while (current) {
      if (current.indexer) {
        return current.indexer;
      }
      current = current.baseModel;
    }
    return void 0;
  }
  function checkPropertyCompatibleWithModelIndexer(parentModel, property, diagnosticTarget) {
    const indexer = findIndexer(parentModel);
    if (indexer === void 0) {
      return;
    }
    return checkPropertyCompatibleWithIndexer(indexer, property, diagnosticTarget);
  }
  function checkPropertyCompatibleWithIndexer(indexer, property, diagnosticTarget) {
    if (indexer.key.name === "integer") {
      reportCheckerDiagnostics([
        createDiagnostic({
          code: "no-array-properties",
          target: diagnosticTarget
        })
      ]);
      return;
    }
    const [valid, diagnostics] = relation.isTypeAssignableTo(property.type, indexer.value, diagnosticTarget);
    if (!valid)
      reportCheckerDiagnostic(createDiagnostic({
        code: "incompatible-indexer",
        format: { message: diagnostics.map((x) => `  ${x.message}`).join("\n") },
        target: diagnosticTarget.kind === SyntaxKind.ModelProperty ? diagnosticTarget.value : diagnosticTarget
      }));
  }
  function checkModelProperties(ctx, node, properties, parentModel) {
    let spreadIndexers;
    for (const prop of node.properties) {
      if ("id" in prop) {
        const newProp = checkModelProperty(ctx, prop);
        newProp.model = parentModel;
        checkPropertyCompatibleWithModelIndexer(parentModel, newProp, prop);
        defineProperty(properties, newProp);
      } else {
        const [newProperties, additionalIndexer] = checkSpreadProperty(ctx, node.symbol, prop.target, parentModel);
        if (findIndexer(parentModel)?.key.name === "integer" && (newProperties.length > 0 || additionalIndexer !== void 0)) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "no-array-properties",
            target: prop
          }));
          continue;
        }
        if (additionalIndexer) {
          if (spreadIndexers) {
            spreadIndexers.push(additionalIndexer);
          } else {
            spreadIndexers = [additionalIndexer];
          }
        }
        for (const newProp of newProperties) {
          linkIndirectMember(ctx, node, newProp);
          checkPropertyCompatibleWithModelIndexer(parentModel, newProp, prop);
          defineProperty(properties, newProp, prop);
        }
      }
    }
    if (spreadIndexers) {
      const value = spreadIndexers.length === 1 ? spreadIndexers[0].value : createUnion(spreadIndexers.map((i) => i.value));
      parentModel.indexer = {
        key: spreadIndexers[0].key,
        value
      };
    }
  }
  function checkObjectValue(ctx, node, constraint) {
    const properties = checkObjectLiteralProperties(ctx, node);
    if (properties === null) {
      return null;
    }
    const preciseType = createTypeForObjectValue(node, properties);
    if (constraint && !checkTypeOfValueMatchConstraint(preciseType, constraint, node)) {
      return null;
    }
    return createValue({
      entityKind: "Value",
      valueKind: "ObjectValue",
      node,
      properties,
      type: constraint ? constraint.type : preciseType
    }, preciseType);
  }
  function createTypeForObjectValue(node, properties) {
    const model = createType({
      kind: "Model",
      name: "",
      node,
      properties: createRekeyableMap(),
      decorators: [],
      derivedModels: [],
      sourceModels: [],
      expression: true
    });
    for (const prop of properties.values()) {
      model.properties.set(prop.name, createModelPropertyForObjectPropertyDescriptor(prop, model));
    }
    return finishType(model);
  }
  function createModelPropertyForObjectPropertyDescriptor(prop, parentModel) {
    return createAndFinishType({
      kind: "ModelProperty",
      node: prop.node,
      model: parentModel,
      optional: false,
      name: prop.name,
      type: prop.value.type,
      decorators: []
    });
  }
  function checkObjectLiteralProperties(ctx, node) {
    const properties = /* @__PURE__ */ new Map();
    let hasError = false;
    for (const prop of node.properties) {
      if ("id" in prop) {
        const value = getValueForNode(prop.value, ctx.mapper);
        if (value === null) {
          hasError = true;
        } else {
          properties.set(prop.id.sv, { name: prop.id.sv, value, node: prop });
        }
      } else {
        const targetType = checkObjectSpreadProperty(ctx, prop.target);
        if (targetType) {
          for (const [name, value] of targetType.properties) {
            properties.set(name, { ...value });
          }
        }
      }
    }
    return hasError ? null : properties;
  }
  function checkObjectSpreadProperty(ctx, targetNode) {
    const value = getValueForNode(targetNode, ctx.mapper);
    if (value === null) {
      return null;
    }
    if (value.valueKind !== "ObjectValue") {
      reportCheckerDiagnostic(createDiagnostic({ code: "spread-object", target: targetNode }));
      return null;
    }
    return value;
  }
  function checkArrayValue(ctx, node, constraint) {
    let hasError = false;
    const values = node.values.map((itemNode) => {
      const value = getValueForNode(itemNode, ctx.mapper);
      if (value === null) {
        hasError = true;
      }
      return value;
    });
    if (hasError) {
      return null;
    }
    const preciseType = createTypeForArrayValue(node, values);
    if (constraint && !checkTypeOfValueMatchConstraint(preciseType, constraint, node)) {
      return null;
    }
    return createValue({
      entityKind: "Value",
      valueKind: "ArrayValue",
      node,
      values,
      type: constraint ? constraint.type : preciseType
    }, preciseType);
  }
  function createValue(value, preciseType) {
    valueExactTypes.set(value, preciseType);
    return value;
  }
  function copyValue(value, overrides) {
    const newValue = { ...value, ...overrides };
    const preciseType = valueExactTypes.get(value);
    if (preciseType) {
      valueExactTypes.set(newValue, preciseType);
    }
    return newValue;
  }
  function createTypeForArrayValue(node, values) {
    return createAndFinishType({
      kind: "Tuple",
      node,
      values: values.map((x) => x.type)
    });
  }
  function inferScalarForPrimitiveValue(type, literalType) {
    if (type === void 0) {
      return void 0;
    }
    switch (type.kind) {
      case "Scalar":
        if (ignoreDiagnostics(checker.isTypeAssignableTo(literalType, type, literalType))) {
          return type;
        }
        return void 0;
      case "Union":
        let found = void 0;
        for (const variant of type.variants.values()) {
          const scalar = inferScalarForPrimitiveValue(variant.type, literalType);
          if (scalar) {
            if (found) {
              reportCheckerDiagnostic(createDiagnostic({
                code: "ambiguous-scalar-type",
                format: {
                  value: getTypeName(literalType),
                  types: [found, scalar].map((x) => x.name).join(", "),
                  example: found.name
                },
                target: literalType
              }));
              return void 0;
            } else {
              found = scalar;
            }
          }
        }
        return found;
      default:
        return void 0;
    }
  }
  function checkStringValue(literalType, constraint, node) {
    if (constraint && !checkTypeOfValueMatchConstraint(literalType, constraint, node)) {
      return null;
    }
    let value;
    if (literalType.kind === "StringTemplate") {
      if (literalType.stringValue) {
        value = literalType.stringValue;
      } else {
        reportCheckerDiagnostics(explainStringTemplateNotSerializable(literalType));
        return null;
      }
    } else {
      value = literalType.value;
    }
    const scalar = inferScalarForPrimitiveValue(constraint?.type, literalType);
    return createValue({
      entityKind: "Value",
      valueKind: "StringValue",
      value,
      type: constraint ? constraint.type : literalType,
      scalar
    }, literalType);
  }
  function checkNumericValue(literalType, constraint, node) {
    if (constraint && !checkTypeOfValueMatchConstraint(literalType, constraint, node)) {
      return null;
    }
    const scalar = inferScalarForPrimitiveValue(constraint?.type, literalType);
    return createValue({
      entityKind: "Value",
      valueKind: "NumericValue",
      value: Numeric(literalType.valueAsString),
      type: constraint ? constraint.type : literalType,
      scalar
    }, literalType);
  }
  function checkBooleanValue(literalType, constraint, node) {
    if (constraint && !checkTypeOfValueMatchConstraint(literalType, constraint, node)) {
      return null;
    }
    const scalar = inferScalarForPrimitiveValue(constraint?.type, literalType);
    return createValue({
      entityKind: "Value",
      valueKind: "BooleanValue",
      value: literalType.value,
      type: constraint ? constraint.type : literalType,
      scalar
    }, literalType);
  }
  function checkNullValue(literalType, constraint, node) {
    if (constraint && !checkTypeOfValueMatchConstraint(literalType, constraint, node)) {
      return null;
    }
    return createValue({
      entityKind: "Value",
      valueKind: "NullValue",
      type: constraint ? constraint.type : literalType,
      value: null
    }, literalType);
  }
  function checkEnumValue(literalType, constraint, node) {
    if (constraint && !checkTypeOfValueMatchConstraint(literalType, constraint, node)) {
      return null;
    }
    return createValue({
      entityKind: "Value",
      valueKind: "EnumValue",
      type: constraint ? constraint.type : literalType,
      value: literalType
    }, literalType);
  }
  function checkCallExpressionTarget(ctx, node) {
    const target = checkTypeOrValueReference(ctx, node.target);
    if (target.entityKind === "Type") {
      if (target.kind === "Scalar" || target.kind === "ScalarConstructor") {
        return target;
      } else if (target.kind === "TemplateParameter" || target.kind === "TemplateParameterAccess") {
        const callable = target.constraint && constraintIsCallable(target.constraint);
        if (!callable) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "non-callable",
            messageId: "templateParameter",
            format: {
              name: target.node.id.sv,
              constraint: target.constraint ? getEntityName(target.constraint, { printable: true }) : "unknown"
            },
            target: node.target
          }));
        }
        return null;
      }
    } else if (target.entityKind === "Value") {
      if (target.valueKind === "Function") {
        return target;
      }
    }
    const kind = target.entityKind === "Type" ? target.kind : target.entityKind === "Indeterminate" ? target.type.kind : target.valueKind;
    if (!isErrorType(target)) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "non-callable",
        format: { type: kind },
        target: node.target
      }));
    }
    return null;
    function constraintIsCallable(constraint) {
      compilerAssert(constraint.type || constraint.valueType, "Expected constraint to have type or value type");
      let callable = true;
      if (constraint.type) {
        callable &&= typeIsCallable(constraint.type);
      }
      if (constraint.valueType) {
        callable &&= constraint.valueType.kind === "FunctionType";
      }
      return callable;
    }
    function typeIsCallable(type) {
      switch (type.kind) {
        case "Scalar":
        case "ScalarConstructor":
          return true;
        case "Union":
          return [...type.variants.values()].every(typeIsCallable);
        default:
          return false;
      }
    }
  }
  function checkPrimitiveArg(node, scalar, valueKind) {
    if (node.arguments.length !== 1) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-primitive-init",
        target: node.target
      }));
      return null;
    }
    const argNode = node.arguments[0];
    const value = getValueForNode(argNode, void 0);
    if (value === null) {
      return null;
    }
    if (value.valueKind !== valueKind) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-primitive-init",
        messageId: "invalidArg",
        format: { actual: value.valueKind, expected: valueKind },
        target: argNode
      }));
      return null;
    }
    if (!checkValueOfType(value, scalar, argNode)) {
      return null;
    }
    return copyValue(value, { scalar, type: scalar });
  }
  function createScalarValue(ctx, node, declaration) {
    let hasError = false;
    const minArgs = declaration.parameters.filter((x) => !x.optional && !x.rest).length ?? 0;
    const maxArgs = declaration.parameters[declaration.parameters.length - 1]?.rest ? void 0 : declaration.parameters.length;
    if (node.arguments.length < minArgs || maxArgs !== void 0 && node.arguments.length > maxArgs) {
      if (node.arguments.length < minArgs) {
        hasError = true;
      }
      if (maxArgs === void 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "invalid-argument-count",
          messageId: "atLeast",
          format: { actual: node.arguments.length.toString(), expected: minArgs.toString() },
          target: node
        }));
      } else {
        const expected = minArgs === maxArgs ? minArgs.toString() : `${minArgs}-${maxArgs}`;
        reportCheckerDiagnostic(createDiagnostic({
          code: "invalid-argument-count",
          format: { actual: node.arguments.length.toString(), expected },
          target: node
        }));
      }
    }
    const resolvedArgs = [];
    for (const [index, parameter] of declaration.parameters.entries()) {
      if (parameter.rest) {
        const restType = getIndexType(parameter.type);
        if (restType) {
          for (let i = index; i < node.arguments.length; i++) {
            const argNode2 = node.arguments[i];
            if (argNode2) {
              const arg = getValueForNode(argNode2, ctx.mapper, {
                kind: "argument",
                type: restType
              });
              if (arg === null) {
                hasError = true;
                continue;
              }
              if (checkValueOfType(arg, restType, argNode2)) {
                resolvedArgs.push(arg);
              } else {
                hasError = true;
              }
            }
          }
        }
        break;
      }
      const argNode = node.arguments[index];
      if (argNode) {
        const arg = getValueForNode(argNode, ctx.mapper, {
          kind: "argument",
          type: parameter.type
        });
        if (arg === null) {
          hasError = true;
          continue;
        }
        if (checkValueOfType(arg, parameter.type, argNode)) {
          resolvedArgs.push(arg);
        } else {
          hasError = true;
        }
      }
    }
    if (hasError) {
      return null;
    }
    return {
      entityKind: "Value",
      valueKind: "ScalarValue",
      value: {
        name: declaration.name,
        args: resolvedArgs
      },
      scalar: declaration.scalar,
      type: declaration.scalar
    };
  }
  function checkCallExpression(ctx, node) {
    const target = checkCallExpressionTarget(ctx, node);
    if (target === null) {
      return null;
    }
    if (target.entityKind === "Type" && target.kind === "ScalarConstructor") {
      return createScalarValue(ctx, node, target);
    } else if (target.entityKind === "Value" && target.valueKind === "Function") {
      return checkFunctionCall(ctx, node, target);
    }
    compilerAssert(target.entityKind === "Type", "Expected type entity");
    if (relation.areScalarsRelated(target, getStdType("string"))) {
      return checkPrimitiveArg(node, target, "StringValue");
    } else if (relation.areScalarsRelated(target, getStdType("numeric"))) {
      return checkPrimitiveArg(node, target, "NumericValue");
    } else if (relation.areScalarsRelated(target, getStdType("boolean"))) {
      return checkPrimitiveArg(node, target, "BooleanValue");
    } else {
      reportCheckerDiagnostic(createDiagnostic({
        code: "named-init-required",
        format: { typeKind: target.kind },
        target: node.target
      }));
      return null;
    }
  }
  function checkFunctionCall(ctx, node, target) {
    const [satisfied, resolvedArgs] = checkFunctionCallArguments(ctx, node.arguments, target, node);
    const canCall = satisfied && !ctx.hasFlags(CheckFlags.InTemplateDeclaration) && !target.implementation.isDefaultFunctionImplementation;
    const fnCtx = createFunctionContext(program, node);
    if (!canCall) {
      return getDefaultFunctionResult(target.returnType);
    }
    const functionReturn = target.implementation(fnCtx, ...resolvedArgs);
    const returnIsEntity = typeof functionReturn === "object" && functionReturn !== null && "entityKind" in functionReturn && (functionReturn.entityKind === "Type" || functionReturn.entityKind === "Value" || functionReturn.entityKind === "Indeterminate");
    if (functionReturn === void 0 && isVoidReturn(target.returnType)) {
      return voidType;
    }
    const unmarshaled = returnIsEntity ? functionReturn : unmarshalJsToValue(program, functionReturn, function onInvalid(value) {
      let valueSummary = String(value);
      if (valueSummary.length > 30) {
        valueSummary = valueSummary.slice(0, 27) + "...";
      }
      reportCheckerDiagnostic(createDiagnostic({
        code: "function-return",
        messageId: "invalid-value",
        format: { value: valueSummary },
        target: node
      }));
    });
    let result = unmarshaled;
    if (satisfied && result !== null)
      result = checkFunctionReturn(target, result, node);
    return result;
  }
  function isVoidReturn(constraint) {
    if (constraint.valueType) {
      return false;
    }
    if (constraint.type) {
      if (!isVoidType2(constraint.type))
        return false;
    }
    return true;
    function isVoidType2(type) {
      return type.kind === "Intrinsic" && type.name === "void";
    }
  }
  function getDefaultFunctionResult(constraint) {
    if (constraint.valueType) {
      return null;
    } else {
      compilerAssert(constraint.type, "Expected function to have a return type when it did not have a value type constraint");
      return constraint.type;
    }
  }
  function checkFunctionCallArguments(ctx, args, target, diagnosticTarget) {
    let satisfied = true;
    const minArgs = target.parameters.filter((p) => !p.optional && !p.rest).length;
    const maxArgs = target.parameters[target.parameters.length - 1]?.rest ? void 0 : target.parameters.length;
    if (args.length < minArgs) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-argument-count",
        messageId: "atLeast",
        format: { actual: args.length.toString(), expected: minArgs.toString() },
        target: diagnosticTarget
      }));
      return [false, []];
    } else if (maxArgs !== void 0 && args.length > maxArgs) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-argument-count",
        format: { actual: args.length.toString(), expected: maxArgs.toString() },
        target: diagnosticTarget
      }));
    }
    const collector = createDiagnosticCollector();
    const resolvedArgs = [];
    let idx = 0;
    for (const param of target.parameters) {
      if (param.rest) {
        const constraint = extractRestParamConstraint(param.type);
        if (!constraint) {
          satisfied = false;
          continue;
        }
        const restArgExpressions = args.slice(idx);
        const restArgs = restArgExpressions.map((arg) => getTypeOrValueForNode(arg, ctx, { kind: "argument", constraint }));
        if (restArgs.some((x) => x === null)) {
          satisfied = false;
          continue;
        }
        for (const [idx2, restArg] of restArgs.entries()) {
          const resolved = collector.pipe(checkEntityAssignableToConstraint(restArg, constraint, restArgExpressions[idx2]));
          satisfied &&= !!resolved;
          resolvedArgs.push(resolved ? isValue(resolved) ? marshalTypeForJs(resolved, void 0) : resolved : void 0);
        }
      } else {
        const arg = args[idx++];
        if (!arg) {
          if (param.optional) {
            resolvedArgs.push(void 0);
            continue;
          } else {
            satisfied = false;
            continue;
          }
        }
        const checkedArg = getTypeOrValueForNode(arg, ctx, {
          kind: "argument",
          constraint: param.type
        });
        if (!checkedArg) {
          satisfied = false;
          continue;
        }
        const resolved = collector.pipe(checkEntityAssignableToConstraint(checkedArg, param.type, arg));
        satisfied &&= !!resolved;
        resolvedArgs.push(resolved ? isValue(resolved) ? marshalTypeForJs(resolved, void 0) : resolved : void 0);
      }
    }
    reportCheckerDiagnostics(collector.diagnostics);
    return [satisfied, resolvedArgs];
  }
  function checkFunctionReturn(target, result, diagnosticTarget) {
    const [checked, diagnostics] = checkEntityAssignableToConstraint(result, target.returnType, diagnosticTarget);
    if (diagnostics.length > 0) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "function-return",
        messageId: "unassignable",
        format: {
          name: getEntityName(target, { printable: true }),
          entityKind: result.entityKind.toLowerCase(),
          return: getEntityName(result, { printable: true }),
          type: getEntityName(target.returnType, { printable: true })
        },
        target: diagnosticTarget
      }));
    }
    return checked;
  }
  function checkEntityAssignableToConstraint(entity, constraint, diagnosticTarget) {
    const constraintIsValue = !!constraint.valueType;
    const constraintIsType = !!constraint.type;
    const collector = createDiagnosticCollector();
    switch (true) {
      case (constraintIsValue && constraintIsType): {
        const tried = tryAssignValue();
        if (tried[0] !== null || entity.entityKind === "Value") {
          return tried;
        }
        const typeEntity = entity.entityKind === "Indeterminate" ? entity.type : entity;
        const assignable = collector.pipe(relation.isTypeAssignableTo(typeEntity, constraint.type, diagnosticTarget));
        return collector.wrap(assignable ? typeEntity : null);
      }
      case constraintIsValue: {
        const normed = collector.pipe(normalizeValue(entity, constraint, diagnosticTarget));
        if (!normed)
          return collector.wrap(null);
        const assignable = collector.pipe(relation.isValueOfType(normed, constraint.valueType, diagnosticTarget));
        return collector.wrap(assignable ? normed : null);
      }
      case constraintIsType: {
        if (entity.entityKind === "Indeterminate")
          entity = entity.type;
        if (entity.entityKind !== "Type") {
          collector.add(createDiagnostic({
            code: "value-in-type",
            format: { name: getTypeName(entity.type) },
            target: diagnosticTarget
          }));
          return collector.wrap(null);
        }
        const assignable = collector.pipe(relation.isTypeAssignableTo(entity, constraint.type, diagnosticTarget));
        return collector.wrap(assignable ? entity : null);
      }
      default: {
        compilerAssert(false, "Expected at least one of type or value constraint to be defined.");
      }
    }
    function tryAssignValue() {
      const collector2 = createDiagnosticCollector();
      const normed = collector2.pipe(normalizeValue(entity, constraint, diagnosticTarget));
      const assignable = normed ? collector2.pipe(relation.isValueOfType(normed, constraint.valueType, diagnosticTarget)) : false;
      return collector2.wrap(assignable ? normed : null);
    }
  }
  function normalizeValue(entity, constraint, diagnosticTarget) {
    if (entity.entityKind === "Value")
      return [entity, []];
    if (entity.entityKind === "Indeterminate") {
      const coerced = getValueFromIndeterminate(entity.type, constraint.type && { kind: "argument", type: constraint.type }, entity.type.node);
      if (coerced?.entityKind !== "Value") {
        return [
          null,
          [
            createDiagnostic({
              code: "expect-value",
              format: { name: getTypeName(entity.type) },
              target: diagnosticTarget
            })
          ]
        ];
      }
      return [coerced, []];
    }
    if (entity.entityKind === "Type") {
      if (entity.kind === "TemplateParameter" && entity.constraint?.valueType && entity.constraint.type === void 0) {
        return [
          createValue({
            entityKind: "Value",
            valueKind: "TemplateValue",
            type: entity.constraint.valueType
          }, entity.constraint.valueType),
          []
        ];
      }
      return [
        null,
        [
          createDiagnostic({
            code: "expect-value",
            format: { name: getTypeName(entity) },
            target: diagnosticTarget
          })
        ]
      ];
    }
    compilerAssert(false, `Unreachable: unexpected entity kind '${entity.entityKind}'`);
  }
  function checkTypeOfExpression(ctx, node) {
    const entity = checkNode(ctx, node.target, void 0);
    if (entity === null) {
      return errorType;
    }
    if (entity.entityKind === "Indeterminate") {
      return entity.type;
    }
    if (isType(entity)) {
      if (entity.kind === "TemplateParameter" || entity.kind === "TemplateParameterAccess") {
        if (entity.constraint === void 0 || entity.constraint.type !== void 0) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "expect-value",
            messageId: "templateConstraint",
            format: { name: getTypeName(entity) },
            target: node.target
          }));
          return errorType;
        } else if (entity.constraint.valueType) {
          return entity.constraint.valueType;
        }
      }
      reportCheckerDiagnostic(createDiagnostic({
        code: "expect-value",
        format: { name: getTypeName(entity) },
        target: node.target
      }));
      return entity;
    }
    return entity.type;
  }
  function createUnion(options) {
    const variants = createRekeyableMap();
    const union = createAndFinishType({
      kind: "Union",
      node: void 0,
      options,
      decorators: [],
      variants,
      expression: true
    });
    for (const option of options) {
      const name = /* @__PURE__ */ Symbol("indexer-union-variant");
      variants.set(name, createAndFinishType({
        kind: "UnionVariant",
        node: void 0,
        type: option,
        name,
        union,
        decorators: []
      }));
    }
    return union;
  }
  function defineProperty(properties, newProp, diagnosticTarget) {
    if (properties.has(newProp.name)) {
      const modelName = newProp.model?.name;
      reportCheckerDiagnostic(modelName ? createDiagnostic({
        code: "duplicate-property",
        messageId: "withModel",
        format: { propName: newProp.name, modelName },
        target: diagnosticTarget ?? newProp
      }) : createDiagnostic({
        code: "duplicate-property",
        format: { propName: newProp.name },
        target: diagnosticTarget ?? newProp
      }));
      return;
    }
    const overriddenProp = getOverriddenProperty(newProp);
    if (overriddenProp) {
      const [isAssignable, _] = relation.isTypeAssignableTo(newProp.type, overriddenProp.type, newProp);
      const parentType = getTypeName(overriddenProp.type);
      const newPropType = getTypeName(newProp.type);
      let invalid = false;
      if (!isAssignable) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "override-property-mismatch",
          format: { propName: newProp.name, propType: newPropType, parentType },
          target: diagnosticTarget ?? newProp
        }));
        invalid = true;
      }
      if (!overriddenProp.optional && newProp.optional) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "override-property-mismatch",
          messageId: "disallowedOptionalOverride",
          format: { propName: overriddenProp.name },
          target: diagnosticTarget ?? newProp
        }));
        invalid = true;
      }
      if (invalid)
        return;
    }
    properties.set(newProp.name, newProp);
  }
  function lateBindMemberContainer(type) {
    const existingSymbol = type.symbol;
    if (existingSymbol && !(isTemplateInstance(type) && !(existingSymbol.flags & SymbolFlags.LateBound))) {
      return;
    }
    switch (type.kind) {
      case "Model":
        type.symbol = createSymbol(type.node, type.name, SymbolFlags.Model | SymbolFlags.LateBound);
        mutate(type.symbol).type = type;
        break;
      case "Interface":
        type.symbol = createSymbol(type.node, type.name, SymbolFlags.Interface | SymbolFlags.LateBound);
        mutate(type.symbol).type = type;
        break;
      case "Union":
        if (!type.name)
          return;
        type.symbol = createSymbol(type.node, type.name, SymbolFlags.Union | SymbolFlags.LateBound);
        mutate(type.symbol).type = type;
        break;
    }
  }
  function lateBindMembers(type) {
    compilerAssert(type.symbol, "Type must have a symbol to late bind members");
    const containerSym = type.symbol;
    compilerAssert(containerSym.members, "Container symbol didn't have members at late-bind");
    const containerMembers = resolver.getAugmentedSymbolTable(containerSym.members);
    switch (type.kind) {
      case "Model":
        for (const prop of walkPropertiesInherited(type)) {
          lateBindMember(prop, SymbolFlags.Member | SymbolFlags.Declaration);
        }
        break;
      case "Scalar":
        for (const member of type.constructors.values()) {
          lateBindMember(member, SymbolFlags.Member | SymbolFlags.Declaration);
        }
        break;
      case "Enum":
        for (const member of type.members.values()) {
          lateBindMember(member, SymbolFlags.Member | SymbolFlags.Declaration);
        }
        break;
      case "Interface":
        for (const member of type.operations.values()) {
          lateBindMember(member, SymbolFlags.Member | SymbolFlags.Operation | SymbolFlags.Declaration);
        }
        break;
      case "Union":
        for (const variant of type.variants.values()) {
          lateBindMember(variant, SymbolFlags.Member | SymbolFlags.Declaration);
        }
        break;
    }
    function lateBindMember(member, kind) {
      if (!member.node || typeof member.name !== "string") {
        return;
      }
      const sym = createSymbol(member.node, member.name, kind | SymbolFlags.LateBound, containerSym);
      mutate(sym).type = member;
      const symbolSource = getTypeSymbol(member);
      if (symbolSource) {
        mutate(sym).symbolSource = symbolSource.symbolSource ?? symbolSource;
      }
      compilerAssert(containerSym.members, "containerSym.members is undefined");
      containerMembers.set(member.name, sym);
    }
  }
  function checkClassHeritage(ctx, model, heritageRef) {
    if (heritageRef.kind === SyntaxKind.ModelExpression) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "extend-model",
        messageId: "modelExpression",
        target: heritageRef
      }));
      return void 0;
    }
    if (heritageRef.kind !== SyntaxKind.TypeReference && heritageRef.kind !== SyntaxKind.ArrayExpression) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "extend-model",
        target: heritageRef
      }));
      return void 0;
    }
    const modelSymId = getNodeSym(model);
    pendingResolutions.start(modelSymId, ResolutionKind.BaseType);
    const target = resolver.getNodeLinks(heritageRef).resolvedSymbol;
    if (target && pendingResolutions.has(target, ResolutionKind.BaseType)) {
      if (ctx.mapper === void 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "circular-base-type",
          format: { typeName: target.name },
          target
        }));
      }
      return void 0;
    }
    const heritageType = getTypeForNode(heritageRef, ctx);
    pendingResolutions.finish(modelSymId, ResolutionKind.BaseType);
    if (isErrorType(heritageType)) {
      compilerAssert(program.hasError(), "Should already have reported an error.", heritageRef);
      return void 0;
    }
    if (heritageType.kind !== "Model") {
      reportCheckerDiagnostic(createDiagnostic({ code: "extend-model", target: heritageRef }));
      return void 0;
    }
    if (heritageType.name === "") {
      reportCheckerDiagnostic(createDiagnostic({
        code: "extend-model",
        messageId: "modelExpression",
        target: heritageRef
      }));
    }
    return heritageType;
  }
  function checkModelIs(ctx, model, isExpr) {
    if (!isExpr)
      return void 0;
    const modelSymId = getNodeSym(model);
    pendingResolutions.start(modelSymId, ResolutionKind.BaseType);
    let isType2;
    if (isExpr.kind === SyntaxKind.ModelExpression) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "is-model",
        messageId: "modelExpression",
        target: isExpr
      }));
      pendingResolutions.finish(modelSymId, ResolutionKind.BaseType);
      return void 0;
    } else if (isExpr.kind === SyntaxKind.ArrayExpression) {
      isType2 = checkArrayExpression(ctx, isExpr);
    } else if (isExpr.kind === SyntaxKind.TypeReference) {
      const target = resolver.getNodeLinks(isExpr).resolvedSymbol;
      if (target && pendingResolutions.has(target, ResolutionKind.BaseType)) {
        if (ctx.mapper === void 0) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "circular-base-type",
            format: { typeName: target.name },
            target
          }));
        }
        pendingResolutions.finish(modelSymId, ResolutionKind.BaseType);
        return void 0;
      }
      isType2 = getTypeForNode(isExpr, ctx);
    } else {
      reportCheckerDiagnostic(createDiagnostic({ code: "is-model", target: isExpr }));
      pendingResolutions.finish(modelSymId, ResolutionKind.BaseType);
      return void 0;
    }
    pendingResolutions.finish(modelSymId, ResolutionKind.BaseType);
    if (isType2.kind !== "Model") {
      reportCheckerDiagnostic(createDiagnostic({ code: "is-model", target: isExpr }));
      return;
    }
    if (isType2.name === "") {
      reportCheckerDiagnostic(createDiagnostic({ code: "is-model", messageId: "modelExpression", target: isExpr }));
      return void 0;
    }
    return isType2;
  }
  function checkSpreadTarget(ctx, model, target) {
    const modelSymId = getNodeSym(model);
    const targetSym = resolver.getNodeLinks(target).resolvedSymbol;
    if (targetSym === modelSymId) {
      if (ctx.mapper === void 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "spread-model",
          messageId: "selfSpread",
          target
        }));
      }
      return void 0;
    }
    const modelAncestors = spreadResolutionAncestors.get(modelSymId);
    if (targetSym && modelAncestors?.has(targetSym)) {
      if (ctx.mapper === void 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "spread-model",
          messageId: "selfSpread",
          target
        }));
      }
      return void 0;
    }
    if (targetSym) {
      let targetAncestors = spreadResolutionAncestors.get(targetSym);
      if (!targetAncestors) {
        targetAncestors = /* @__PURE__ */ new Set();
        spreadResolutionAncestors.set(targetSym, targetAncestors);
      }
      targetAncestors.add(modelSymId);
      for (const ancestor of modelAncestors ?? []) {
        targetAncestors.add(ancestor);
      }
    }
    const type = getTypeForNode(target, ctx);
    return type;
  }
  function checkSpreadProperty(ctx, parentModelSym, targetNode, parentModel) {
    const targetType = getTypeForNode(targetNode, ctx);
    if (targetType.kind === "TemplateParameter" || targetType.kind === "TemplateParameterAccess" || isErrorType(targetType)) {
      return [[], void 0];
    }
    if (targetType.kind !== "Model") {
      reportCheckerDiagnostic(createDiagnostic({ code: "spread-model", target: targetNode }), ctx.mapper);
      return [[], void 0];
    }
    if (isArrayModelType(targetType)) {
      reportCheckerDiagnostic(createDiagnostic({ code: "spread-model", target: targetNode }), ctx.mapper);
      return [[], void 0];
    }
    parentModel.sourceModels.push({ usage: "spread", model: targetType, node: targetNode });
    const props = [];
    for (const prop of walkPropertiesInherited(targetType)) {
      const memberSym = getMemberSymbol(parentModelSym, prop.name);
      props.push(cloneTypeForSymbol(memberSym, prop, {
        sourceProperty: prop,
        model: parentModel
      }));
    }
    return [props, targetType.indexer];
  }
  function linkIndirectMember(ctx, containerNode, member) {
    if (ctx.mapper !== void 0) {
      return;
    }
    compilerAssert(typeof member.name === "string", "Cannot link unmapped unions");
    if (containerNode.symbol === void 0) {
      return;
    }
    const memberSym = getMemberSymbol(containerNode.symbol, member.name);
    if (memberSym) {
      const links = resolver.getSymbolLinks(memberSym);
      linkMemberType(ctx, links, member);
    }
  }
  function checkModelProperty(ctx, prop) {
    const sym = getSymbolForMember(prop);
    const links = getSymbolLinksForMember(prop);
    if (links && links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    const name = prop.id.sv;
    const type = createType({
      kind: "ModelProperty",
      name,
      node: prop,
      optional: prop.optional,
      type: void 0,
      decorators: []
    });
    if (links) {
      linkType(ctx, links, type);
    }
    type.type = getTypeForNode(prop.value, ctx);
    if (hasPropertyTypeCycle(type)) {
      if (ctx.mapper === void 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "circular-prop",
          format: { propName: name },
          target: prop
        }));
      }
      type.type = errorType;
    }
    if (prop.default) {
      const defaultValue = checkDefaultValue(ctx, prop.default, type.type);
      if (defaultValue !== null) {
        type.defaultValue = defaultValue;
      }
    }
    type.decorators = checkDecorators(ctx, type, prop);
    const parentTemplate = getParentTemplateNode(prop);
    linkMapper(type, ctx.mapper);
    const shouldRunDecorators = !ctx.hasFlags(CheckFlags.InTemplateDeclaration);
    if (!parentTemplate || shouldRunDecorators) {
      const docComment = getDocCommentForSymbol(sym) ?? getOperationParameterDocComment(prop);
      if (docComment) {
        type.decorators.unshift(createDocFromCommentDecorator("self", docComment));
      }
    }
    return finishType(type, { skipDecorators: !shouldRunDecorators });
  }
  function hasPropertyTypeCycle(prop) {
    let current = prop.type;
    while (current !== void 0 && current.kind === "ModelProperty") {
      if (current === prop)
        return true;
      current = current.type;
    }
    return false;
  }
  function getOperationParameterDocComment(prop) {
    if (prop.parent?.kind !== SyntaxKind.ModelExpression) {
      return void 0;
    }
    const signature = prop.parent.parent;
    if (signature?.kind !== SyntaxKind.OperationSignatureDeclaration) {
      return void 0;
    }
    const operation = signature.parent;
    if (operation?.kind !== SyntaxKind.OperationStatement) {
      return void 0;
    }
    return extractParamDocs(operation).get(prop.id.sv);
  }
  function createDocFromCommentDecorator(key, doc) {
    return {
      decorator: docFromCommentDecorator,
      args: [
        { value: createLiteralType(key), jsValue: key },
        { value: createLiteralType(doc), jsValue: doc }
      ]
    };
  }
  function getDocCommentForSymbol(sym) {
    if (!sym) {
      return void 0;
    }
    const relatedSource = getRelatedSymbolSource(sym);
    return docFromCommentForSym.get(sym) ?? (relatedSource && docFromCommentForSym.get(relatedSource)) ?? (sym.flags & SymbolFlags.LateBound && sym.type && isType(sym.type) ? getDocCommentForType(sym.type) : void 0);
  }
  function getDocCommentForType(type) {
    if (!type) {
      return void 0;
    }
    if (type.kind === "ModelProperty") {
      for (let property = type; property; property = property.sourceProperty) {
        const docComment = getDocCommentForSymbol(getTemplateAccessSymbolSource(property));
        if (docComment) {
          return docComment;
        }
      }
      return void 0;
    }
    return getDocCommentForSymbol(getTemplateAccessSymbolSource(type));
  }
  function checkDefaultValue(ctx, defaultNode, type) {
    if (isErrorType(type)) {
      return null;
    }
    const defaultValue = getValueForNode(defaultNode, ctx, {
      kind: "assignment",
      type
    });
    if (defaultValue === null) {
      return null;
    }
    const [related, diagnostics] = relation.isValueOfType(defaultValue, type, defaultNode);
    if (!related) {
      reportCheckerDiagnostics(diagnostics);
      return null;
    } else if (defaultValue.valueKind === "TemplateValue") {
      return null;
    } else {
      return { ...defaultValue, type };
    }
  }
  function checkDecoratorApplication(ctx, targetType, decNode) {
    const sym = resolveTypeReferenceSym(ctx.withMapper(void 0), decNode.target, true);
    if (!sym) {
      return void 0;
    }
    if (!(sym.flags & SymbolFlags.Decorator)) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-decorator",
        format: { id: sym.name },
        target: decNode
      }));
      return void 0;
    }
    const symbolLinks = getSymbolLinks(sym);
    let hasError = false;
    if (symbolLinks.declaredType === void 0) {
      const decoratorDeclNode = sym.declarations.find((x) => x.kind === SyntaxKind.DecoratorDeclarationStatement);
      if (decoratorDeclNode) {
        checkDecoratorDeclaration(ctx.withMapper(void 0), decoratorDeclNode);
      }
    }
    if (symbolLinks.declaredType) {
      compilerAssert(symbolLinks.declaredType.kind === "Decorator", `Expected to find a decorator type but got ${symbolLinks.declaredType.kind}`);
      if (!checkDecoratorTarget(targetType, symbolLinks.declaredType, decNode)) {
        hasError = true;
      }
    }
    const [argsHaveError, args] = checkDecoratorArguments(ctx, decNode, symbolLinks.declaredType);
    if (hasError || argsHaveError) {
      return void 0;
    }
    const impl = sym.value ?? symbolLinks.declaredType?.implementation;
    return {
      definition: symbolLinks.declaredType,
      decorator: impl ?? ((...args2) => {
      }),
      node: decNode,
      args
    };
  }
  function checkDecoratorTarget(targetType, declaration, decoratorNode) {
    const [targetValid] = relation.isTypeAssignableTo(targetType, declaration.target.type, decoratorNode);
    if (!targetValid) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "decorator-wrong-target",
        messageId: "withExpected",
        format: {
          decorator: declaration.name,
          to: getTypeName(targetType),
          expected: getEntityName(declaration.target.type)
        },
        target: decoratorNode
      }));
    }
    return targetValid;
  }
  function checkDecoratorArguments(ctx, node, declaration) {
    if (declaration === void 0) {
      return [
        false,
        node.arguments.map((argNode) => {
          let type = checkNode(ctx, argNode) ?? errorType;
          if (type.entityKind === "Indeterminate") {
            type = type.type;
          }
          return {
            value: type,
            jsValue: type,
            node: argNode
          };
        })
      ];
    }
    let hasError = false;
    const minArgs = declaration.parameters.filter((x) => !x.optional && !x.rest).length ?? 0;
    const maxArgs = declaration.parameters[declaration.parameters.length - 1]?.rest ? void 0 : declaration.parameters.length;
    if (node.arguments.length < minArgs || maxArgs !== void 0 && node.arguments.length > maxArgs) {
      if (node.arguments.length < minArgs) {
        hasError = true;
      }
      if (maxArgs === void 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "invalid-argument-count",
          messageId: "atLeast",
          format: { actual: node.arguments.length.toString(), expected: minArgs.toString() },
          target: node
        }));
      } else {
        const expected = minArgs === maxArgs ? minArgs.toString() : `${minArgs}-${maxArgs}`;
        reportCheckerDiagnostic(createDiagnostic({
          code: "invalid-argument-count",
          format: { actual: node.arguments.length.toString(), expected },
          target: node
        }));
      }
    }
    const resolvedArgs = [];
    function resolveArg(argNode, perParamType) {
      const arg = getTypeOrValueForNode(argNode, ctx, {
        kind: "argument",
        constraint: perParamType
      });
      if (arg !== null && !(isType(arg) && isErrorType(arg)) && checkArgumentAssignable(arg, perParamType, argNode)) {
        const [valid, jsValue] = resolveArgumentJsValue(arg, extractValueOfConstraints({
          kind: "argument",
          constraint: perParamType
        }), argNode);
        if (!valid)
          return void 0;
        return {
          value: arg,
          node: argNode,
          jsValue
        };
      } else {
        return void 0;
      }
    }
    for (const [index, parameter] of declaration.parameters.entries()) {
      if (parameter.rest) {
        const restType = extractRestParamConstraint(parameter.type);
        if (restType) {
          for (let i = index; i < node.arguments.length; i++) {
            const argNode2 = node.arguments[i];
            if (argNode2) {
              const arg = resolveArg(argNode2, restType);
              if (arg) {
                resolvedArgs.push(arg);
              } else {
                hasError = true;
              }
            }
          }
        }
        break;
      }
      const argNode = node.arguments[index];
      if (argNode) {
        const arg = resolveArg(argNode, parameter.type);
        if (arg) {
          resolvedArgs.push(arg);
        } else {
          hasError = true;
        }
      }
    }
    return [hasError, resolvedArgs];
  }
  function extractRestParamConstraint(constraint) {
    let valueType;
    let type;
    if (constraint.valueType) {
      if (constraint.valueType.kind === "Model" && isArrayModelType(constraint.valueType)) {
        valueType = constraint.valueType.indexer.value;
      } else {
        return void 0;
      }
    }
    if (constraint.type) {
      if (constraint.type.kind === "Model" && isArrayModelType(constraint.type)) {
        type = constraint.type.indexer.value;
      } else {
        return void 0;
      }
    }
    return {
      entityKind: "MixedParameterConstraint",
      type,
      valueType
    };
  }
  function getIndexType(type) {
    return type.kind === "Model" ? type.indexer?.value : void 0;
  }
  function resolveArgumentJsValue(value, valueConstraint, diagnosticTarget) {
    if (valueConstraint !== void 0) {
      if (isValue(value)) {
        const unmarshaled = marshalTypeForJs(value, valueConstraint.type);
        return [true, unmarshaled];
      } else {
        return [true, value];
      }
    }
    return [true, value];
  }
  function checkArgumentAssignable(argumentType, parameterType, diagnosticTarget) {
    const [valid] = relation.isTypeAssignableTo(argumentType, parameterType, diagnosticTarget);
    if (!valid) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "invalid-argument",
        format: {
          value: getEntityName(argumentType),
          expected: getEntityName(parameterType)
        },
        target: diagnosticTarget
      }));
    }
    return valid;
  }
  function checkAugmentDecorators(ctx, sym, targetType) {
    const augmentDecoratorNodes = resolver.getAugmentDecoratorsForSym(sym);
    const decorators = [];
    for (const decNode of augmentDecoratorNodes) {
      const decorator = checkDecoratorApplication(ctx, targetType, decNode);
      if (decorator) {
        decorators.unshift(decorator);
      }
    }
    return decorators;
  }
  function checkAugmentDecorator(ctx, node) {
    resolveTypeReferenceSym(ctx.withMapper(void 0), node.targetType, {
      resolveDeclarationOfTemplate: true
    });
    const links = resolver.getNodeLinks(node.targetType);
    if (links.isTemplateInstantiation) {
      program.reportDiagnostic(createDiagnostic({
        code: "augment-decorator-target",
        messageId: "noInstance",
        target: node.targetType
      }));
    } else if (links.finalSymbol?.flags && ~links.finalSymbol.flags & SymbolFlags.Declaration && ~links.finalSymbol.flags & SymbolFlags.Member && !isDeclarationExpressionSym(links.finalSymbol)) {
      program.reportDiagnostic(createDiagnostic({
        code: "augment-decorator-target",
        messageId: links.finalSymbol.flags & SymbolFlags.Model ? "noModelExpression" : links.finalSymbol.flags & SymbolFlags.Union ? "noUnionExpression" : "default",
        target: node.targetType
      }));
    } else if (links.finalSymbol?.flags && links.finalSymbol.flags & SymbolFlags.Alias) {
      const aliasNode = getSymNode(links.finalSymbol);
      compilerAssert(aliasNode, "Expected alias symbol to have a node");
      program.reportDiagnostic(createDiagnostic({
        code: "augment-decorator-target",
        messageId: aliasNode.value.kind === SyntaxKind.UnionExpression ? "noUnionExpression" : "default",
        target: node.targetType
      }));
    }
    return errorType;
  }
  function isDeclarationExpressionSym(sym) {
    switch (getSymNode(sym)?.kind) {
      case SyntaxKind.ModelDeclarationExpression:
      case SyntaxKind.EnumDeclarationExpression:
      case SyntaxKind.UnionDeclarationExpression:
      case SyntaxKind.ScalarDeclarationExpression:
        return true;
      default:
        return false;
    }
  }
  function checkUsings(ctx, node) {
    const usedSym = resolveTypeReferenceSym(ctx.withMapper(void 0), node.name);
    if (usedSym) {
      if (~usedSym.flags & SymbolFlags.Namespace) {
        reportCheckerDiagnostic(createDiagnostic({ code: "using-invalid-ref", target: node.name }));
      }
    }
    return errorType;
  }
  function isUsingBeforeFileNamespace(identifier) {
    let node = identifier.parent;
    while (node?.kind === SyntaxKind.MemberExpression) {
      node = node.parent;
    }
    return node?.kind === SyntaxKind.UsingStatement && node.scopeNamespace === void 0;
  }
  function checkDecorators(ctx, targetType, node) {
    const sym = isMemberNode(node) ? getSymbolForMember(node) ?? node.symbol : getMergedSymbol(node.symbol);
    const decorators = [];
    const augmentDecoratorNodes = resolver.getAugmentDecoratorsForSym(sym);
    const decoratorNodes = [
      ...augmentDecoratorNodes,
      // the first decorator will be executed at last, so augmented decorator should be placed at first.
      ...node.decorators
    ];
    for (const decNode of decoratorNodes) {
      const decorator = checkDecoratorApplication(ctx, targetType, decNode);
      if (decorator) {
        decorators.unshift(decorator);
      }
    }
    const docComment = extractMainDoc(targetType);
    if (docComment) {
      decorators.unshift(createDocFromCommentDecorator("self", docComment));
    }
    if (targetType.kind === "Operation") {
      const returnTypesDocs = extractReturnsDocs(targetType);
      if (returnTypesDocs.returns) {
        decorators.unshift(createDocFromCommentDecorator("returns", returnTypesDocs.returns));
      }
      if (returnTypesDocs.errors) {
        decorators.unshift(createDocFromCommentDecorator("errors", returnTypesDocs.errors));
      }
    } else if (targetType.kind === "ModelProperty") {
    }
    return decorators;
  }
  function checkScalar(ctx, node) {
    const links = getSymbolLinks(node.symbol);
    if (ctx.mapper === void 0 && node.templateParameters.length > 0) {
      ctx = ctx.withFlags(CheckFlags.InTemplateDeclaration);
    }
    if (links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    if (ctx.mapper === void 0) {
      checkModifiers(program, node);
    }
    checkTemplateDeclaration(ctx, node);
    checkExpressionDeclarationConstraints(node);
    if (ctx.mapper === void 0) {
      reportDeclarationExpressionFeature(node);
    }
    const decorators = [];
    const type = createType({
      kind: "Scalar",
      name: node.id?.sv ?? "",
      node,
      constructors: /* @__PURE__ */ new Map(),
      namespace: getParentNamespaceType(node),
      decorators,
      derivedScalars: [],
      expression: node.kind === SyntaxKind.ScalarDeclarationExpression
    });
    linkType(ctx, links, type);
    if (node.extends) {
      type.baseScalar = checkScalarExtends(ctx, node, node.extends);
      if (type.baseScalar) {
        copyDeprecation(type.baseScalar, type);
        type.baseScalar.derivedScalars.push(type);
      }
    }
    checkScalarConstructors(ctx, type, node, type.constructors);
    decorators.push(...checkDecorators(ctx, type, node));
    if (ctx.mapper === void 0 && !type.expression) {
      type.namespace?.scalars.set(type.name, type);
    }
    linkMapper(type, ctx.mapper);
    if (isInTypeSpecNamespace2(type)) {
      stdTypes[type.name] = type;
    }
    return finishType(type, { skipDecorators: ctx.hasFlags(CheckFlags.InTemplateDeclaration) });
  }
  function checkScalarExtends(ctx, scalar, extendsRef) {
    const symId = getNodeSym(scalar);
    pendingResolutions.start(symId, ResolutionKind.BaseType);
    const target = resolver.getNodeLinks(extendsRef).resolvedSymbol;
    if (target && pendingResolutions.has(target, ResolutionKind.BaseType)) {
      if (ctx.mapper === void 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "circular-base-type",
          format: { typeName: target.declarations[0].id.sv },
          target
        }));
      }
      return void 0;
    }
    const extendsType = getTypeForNode(extendsRef, ctx);
    pendingResolutions.finish(symId, ResolutionKind.BaseType);
    if (isErrorType(extendsType)) {
      compilerAssert(program.hasError(), "Should already have reported an error.", extendsRef);
      return void 0;
    }
    if (extendsType.kind !== "Scalar") {
      reportCheckerDiagnostic(createDiagnostic({ code: "extend-model", target: extendsRef }));
      return void 0;
    }
    return extendsType;
  }
  function checkScalarConstructors(ctx, parentScalar, node, constructors) {
    if (parentScalar.baseScalar) {
      for (const member of parentScalar.baseScalar.constructors.values()) {
        const newConstructor = cloneTypeForSymbol(getMemberSymbol(node.symbol, member.name), {
          ...member,
          scalar: parentScalar
        });
        linkIndirectMember(ctx, node, newConstructor);
        constructors.set(member.name, newConstructor);
      }
    }
    for (const member of node.members) {
      const constructor = checkScalarConstructor(ctx, member, parentScalar);
      if (constructors.has(constructor.name)) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "constructor-duplicate",
          format: { name: constructor.name.toString() },
          target: member
        }));
        continue;
      }
      constructors.set(constructor.name, constructor);
    }
  }
  function checkScalarConstructor(ctx, node, parentScalar) {
    const name = node.id.sv;
    const links = getSymbolLinksForMember(node);
    if (links && links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    const member = createType({
      kind: "ScalarConstructor",
      scalar: parentScalar,
      name,
      node,
      parameters: node.parameters.map((x) => checkFunctionParameter(ctx, x, false))
    });
    linkMapper(member, ctx.mapper);
    if (links) {
      linkType(ctx, links, member);
    }
    return finishType(member, {
      skipDecorators: ctx.hasFlags(CheckFlags.InTemplateDeclaration)
    });
  }
  function checkAlias(ctx, node) {
    const links = getSymbolLinks(node.symbol);
    if (ctx.mapper === void 0 && node.templateParameters.length > 0) {
      ctx = ctx.withFlags(CheckFlags.InTemplateDeclaration);
    }
    if (links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    if (ctx.mapper === void 0) {
      checkModifiers(program, node);
    }
    checkTemplateDeclaration(ctx, node);
    const aliasSymId = getNodeSym(node);
    if (pendingResolutions.has(aliasSymId, ResolutionKind.Type)) {
      const valueSym = node.value.symbol;
      if (valueSym) {
        const valueLinks = getSymbolLinks(valueSym);
        const inProgressType = ctx.mapper === void 0 ? valueLinks.declaredType : valueLinks.instantiations?.get(ctx.mapper.args);
        if (inProgressType) {
          linkType(ctx, links, inProgressType);
          return inProgressType;
        }
      }
      if (node.value.kind === SyntaxKind.ModelExpression) {
        return getTypeForNode(node.value, ctx);
      }
      if (ctx.mapper === void 0) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "circular-alias-type",
          format: { typeName: node.id.sv },
          target: node
        }));
      }
      links.declaredType = errorType;
      return errorType;
    }
    pendingResolutions.start(aliasSymId, ResolutionKind.Type);
    const type = checkNode(ctx, node.value);
    if (type === null) {
      links.declaredType = errorType;
      return errorType;
    }
    if (isValue(type)) {
      reportCheckerDiagnostic(createDiagnostic({ code: "value-in-type", target: node.value }));
      links.declaredType = errorType;
      return errorType;
    }
    linkType(ctx, links, type);
    pendingResolutions.finish(aliasSymId, ResolutionKind.Type);
    return type;
  }
  function checkConst(node) {
    const links = getSymbolLinks(node.symbol);
    if (links.value !== void 0) {
      return links.value;
    }
    checkModifiers(program, node);
    const type = node.type ? getTypeForNode(node.type, void 0) : void 0;
    if (pendingResolutions.has(node.symbol, ResolutionKind.Value)) {
      reportCheckerDiagnostic(createDiagnostic({
        code: "circular-const",
        format: { name: node.id.sv },
        target: node
      }));
      return null;
    }
    pendingResolutions.start(node.symbol, ResolutionKind.Value);
    const value = getValueForNode(node.value, void 0, type && { kind: "assignment", type });
    pendingResolutions.finish(node.symbol, ResolutionKind.Value);
    if (value === null || type && !checkValueOfType(value, type, node.id)) {
      links.value = null;
      return links.value;
    }
    links.value = type ? copyValue(value, { type }) : copyValue(value);
    return links.value;
  }
  function inferScalarsFromConstraints(value, type) {
    switch (value.valueKind) {
      case "BooleanValue":
      case "StringValue":
      case "NumericValue":
        if (value.scalar === void 0) {
          const scalar = inferScalarForPrimitiveValue(type, value.type);
          return copyValue(value, { scalar });
        }
        return value;
      case "ArrayValue":
      case "ObjectValue":
      case "EnumValue":
      case "NullValue":
      case "ScalarValue":
      case "Function":
        return value;
    }
  }
  function checkEnum(ctx, node) {
    const links = getSymbolLinks(node.symbol);
    if (links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    if (ctx.mapper === void 0) {
      checkModifiers(program, node);
      reportDeclarationExpressionFeature(node);
    }
    const enumType = createType({
      kind: "Enum",
      name: node.id?.sv ?? "",
      node,
      members: createRekeyableMap(),
      decorators: [],
      expression: node.kind === SyntaxKind.EnumDeclarationExpression
    });
    linkType(ctx, links, enumType);
    const memberNames = /* @__PURE__ */ new Set();
    for (const member of node.members) {
      if (member.kind === SyntaxKind.EnumMember) {
        const memberType = checkEnumMember(ctx, member, enumType);
        if (memberNames.has(memberType.name)) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "enum-member-duplicate",
            format: { name: memberType.name },
            target: node
          }));
          continue;
        }
        memberNames.add(memberType.name);
        enumType.members.set(memberType.name, memberType);
      } else {
        const members = checkEnumSpreadMember(ctx, node.symbol, enumType, member.target, memberNames);
        for (const memberType of members) {
          linkIndirectMember(ctx, node, memberType);
          enumType.members.set(memberType.name, memberType);
        }
      }
    }
    enumType.namespace = getParentNamespaceType(node);
    if (ctx.mapper === void 0 && !enumType.expression) {
      enumType.namespace?.enums.set(enumType.name, enumType);
    }
    enumType.decorators = checkDecorators(ctx, enumType, node);
    linkMapper(enumType, ctx.mapper);
    return finishType(enumType, {
      skipDecorators: ctx.hasFlags(CheckFlags.InTemplateDeclaration)
    });
  }
  function checkInterface(ctx, node) {
    const links = getSymbolLinks(node.symbol);
    if (ctx.mapper === void 0 && node.templateParameters.length > 0) {
      ctx = ctx.withFlags(CheckFlags.InTemplateDeclaration);
    }
    if (links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    if (ctx.mapper === void 0) {
      checkModifiers(program, node);
    }
    checkTemplateDeclaration(ctx, node);
    const interfaceType = createType({
      kind: "Interface",
      decorators: [],
      node,
      namespace: getParentNamespaceType(node),
      sourceInterfaces: [],
      operations: createRekeyableMap(),
      name: node.id.sv
    });
    linkType(ctx, links, interfaceType);
    interfaceType.decorators = checkDecorators(ctx, interfaceType, node);
    const ownMembers = checkInterfaceMembers(ctx, node, interfaceType);
    for (const extendsNode of node.extends) {
      const extendsType = getTypeForNode(extendsNode, ctx);
      if (extendsType.kind !== "Interface") {
        reportCheckerDiagnostic(createDiagnostic({ code: "extends-interface", target: extendsNode }));
        continue;
      }
      for (const member of extendsType.operations.values()) {
        if (interfaceType.operations.has(member.name)) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "extends-interface-duplicate",
            format: { name: member.name },
            target: extendsNode
          }));
        }
        const newMember = cloneTypeForSymbol(getMemberSymbol(node.symbol, member.name), member, {
          interface: interfaceType
        });
        if (!ownMembers.has(member.name)) {
          linkIndirectMember(ctx, node, newMember);
        }
        copyDeprecation(member, newMember);
        interfaceType.operations.set(newMember.name, newMember);
      }
      interfaceType.sourceInterfaces.push(extendsType);
    }
    for (const [key, value] of ownMembers) {
      interfaceType.operations.set(key, value);
    }
    linkMapper(interfaceType, ctx.mapper);
    if (ctx.mapper === void 0) {
      interfaceType.namespace?.interfaces.set(interfaceType.name, interfaceType);
    }
    lateBindMemberContainer(interfaceType);
    lateBindMembers(interfaceType);
    return finishType(interfaceType, {
      skipDecorators: ctx.hasFlags(CheckFlags.InTemplateDeclaration)
    });
  }
  function checkInterfaceMembers(ctx, node, interfaceType) {
    const ownMembers = /* @__PURE__ */ new Map();
    for (const opNode of node.operations) {
      const symbol = getSymbolForMember(opNode);
      const links = symbol && getSymbolLinks(symbol);
      if (links) {
        links.instantiations = new TypeInstantiationMap();
      }
    }
    for (const opNode of node.operations) {
      const opType = checkOperation(ctx, opNode, interfaceType);
      if (ownMembers.has(opType.name)) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "interface-duplicate",
          format: { name: opType.name },
          target: opNode
        }));
        continue;
      }
      ownMembers.set(opType.name, opType);
    }
    return ownMembers;
  }
  function checkUnion(ctx, node) {
    const links = getSymbolLinks(node.symbol);
    if (ctx.mapper === void 0 && node.templateParameters.length > 0) {
      ctx = ctx.withFlags(CheckFlags.InTemplateDeclaration);
    }
    if (links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    if (ctx.mapper === void 0) {
      checkModifiers(program, node);
      if (node.extends && !isCompilerFeatureEnabled(program, "union-extends", node)) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "union-extends-disabled",
          target: node.extends
        }));
      }
    }
    checkTemplateDeclaration(ctx, node);
    checkExpressionDeclarationConstraints(node);
    if (ctx.mapper === void 0) {
      reportDeclarationExpressionFeature(node);
    }
    const variants = createRekeyableMap();
    const unionType = createType({
      kind: "Union",
      decorators: [],
      node,
      namespace: getParentNamespaceType(node),
      name: node.id?.sv,
      variants,
      get options() {
        return Array.from(this.variants.values()).map((v) => v.type);
      },
      expression: node.kind === SyntaxKind.UnionDeclarationExpression
    });
    linkType(ctx, links, unionType);
    if (node.extends) {
      unionType.baseType = checkUnionBaseType(ctx, node, unionType, node.extends);
    }
    unionType.decorators = checkDecorators(ctx, unionType, node);
    checkUnionVariants(ctx, unionType, node, variants);
    linkMapper(unionType, ctx.mapper);
    if (ctx.mapper === void 0 && !unionType.expression) {
      unionType.namespace?.unions.set(unionType.name, unionType);
    }
    lateBindMemberContainer(unionType);
    if (unionType.symbol) {
      lateBindMembers(unionType);
    }
    return finishType(unionType, {
      skipDecorators: ctx.hasFlags(CheckFlags.InTemplateDeclaration)
    });
  }
  function checkUnionVariants(ctx, parentUnion, node, variants) {
    for (const variantNode of node.options) {
      const variantType = checkUnionVariant(ctx, variantNode);
      variantType.union = parentUnion;
      if (variants.has(variantType.name)) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "union-duplicate",
          format: { name: variantType.name.toString() },
          target: variantNode
        }));
        continue;
      }
      variants.set(variantType.name, variantType);
      checkUnionVariantAgainstBaseType(ctx, parentUnion, variantNode, variantType);
    }
  }
  function checkUnionVariantAgainstBaseType(ctx, parentUnion, variantNode, variantType) {
    const baseType = parentUnion.baseType;
    if (baseType === void 0 || ctx.hasFlags(CheckFlags.InTemplateDeclaration)) {
      return;
    }
    if (isErrorType(variantType.type)) {
      return;
    }
    checkTypeAssignable(variantType.type, baseType, variantNode.value);
  }
  function checkUnionBaseType(ctx, union, unionType, extendsRef) {
    const unionSymId = getNodeSym(union);
    pendingResolutions.start(unionSymId, ResolutionKind.BaseType);
    try {
      const target = resolver.getNodeLinks(extendsRef).resolvedSymbol;
      if (target && pendingResolutions.has(target, ResolutionKind.BaseType)) {
        if (ctx.mapper === void 0) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "circular-base-type",
            format: { typeName: target.name },
            target
          }));
        }
        return void 0;
      }
      const baseType = getTypeForNode(extendsRef, ctx);
      if (isErrorType(baseType)) {
        return void 0;
      }
      if (unionExpressionReferences(baseType, unionType)) {
        if (ctx.mapper === void 0) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "circular-base-type",
            format: { typeName: union.id?.sv ?? "(anonymous union)" },
            target: extendsRef
          }));
        }
        return void 0;
      }
      if (ctx.hasFlags(CheckFlags.InTemplateDeclaration) && (baseType.kind === "TemplateParameter" || baseType.kind === "TemplateParameterAccess")) {
        return void 0;
      }
      if (baseType.kind === "Model" && baseType.node?.kind === SyntaxKind.ModelExpression) {
        reportCheckerDiagnostic(createDiagnostic({
          code: "extend-union",
          messageId: "modelExpression",
          target: extendsRef
        }));
        return void 0;
      }
      if (!isUnionBaseType(baseType)) {
        reportCheckerDiagnostic(createDiagnostic({ code: "extend-union", target: extendsRef }));
        return void 0;
      }
      return baseType;
    } finally {
      pendingResolutions.finish(unionSymId, ResolutionKind.BaseType);
    }
  }
  function isUnionBaseType(type) {
    return type.kind === "Model" || type.kind === "Scalar" || type.kind === "Enum" || type.kind === "Union";
  }
  function unionExpressionReferences(type, target) {
    if (type === target) {
      return true;
    }
    if (type.kind === "Union" && type.expression) {
      for (const variant of type.variants.values()) {
        if (unionExpressionReferences(variant.type, target)) {
          return true;
        }
      }
    }
    return false;
  }
  function checkUnionVariant(ctx, variantNode) {
    const links = getSymbolLinksForMember(variantNode);
    if (links && links.declaredType && ctx.mapper === void 0) {
      return links.declaredType;
    }
    const name = variantNode.id ? variantNode.id.sv : /* @__PURE__ */ Symbol("name");
    const type = getTypeForNode(variantNode.value, ctx);
    const variantType = createType({
      kind: "UnionVariant",
      name,
      node: variantNode,
      decorators: [],
      type,
      union: void 0
    });
    variantType.decorators = checkDecorators(ctx, variantType, variantNode);
    linkMapper(variantType, ctx.mapper);
    if (links) {
      linkType(ctx, links, variantType);
    }
    return finishType(variantType, {
      skipDecorators: ctx.hasFlags(CheckFlags.InTemplateDeclaration)
    });
  }
  function isMemberNode(node) {
    return node.symbol && !!(node.symbol.flags & SymbolFlags.Member);
  }
  function getMemberSymbol(parentSym, name) {
    return parentSym ? resolver.getAugmentedSymbolTable(parentSym.members).get(name) : void 0;
  }
  function getSymbolForMember(node) {
    if (!node.id) {
      return void 0;
    }
    const name = node.id.sv;
    const parentSym = node.parent?.symbol;
    return parentSym ? getMemberSymbol(parentSym, name) : void 0;
  }
  function getSymbolLinksForMember(node) {
    const sym = getSymbolForMember(node);
    return sym ? getSymNode(sym) === node ? getSymbolLinks(sym) : void 0 : void 0;
  }
  function checkEnumMember(ctx, node, parentEnum) {
    const name = node.id.sv;
    const links = getSymbolLinksForMember(node);
    if (links?.type) {
      return links.type;
    }
    compilerAssert(parentEnum, "Enum member should already have been checked.");
    const value = node.value ? node.value.value : void 0;
    const member = createType({
      kind: "EnumMember",
      enum: parentEnum,
      name,
      node,
      value,
      decorators: []
    });
    if (links) {
      links.type = member;
    }
    member.decorators = checkDecorators(ctx, member, node);
    return finishType(member);
  }
  function checkEnumSpreadMember(ctx, parentEnumSym, parentEnum, targetNode, existingMemberNames) {
    const members = [];
    const targetType = getTypeForNode(targetNode, ctx);
    if (!isErrorType(targetType)) {
      if (targetType.kind !== "Enum") {
        reportCheckerDiagnostic(createDiagnostic({ code: "spread-enum", target: targetNode }));
        return members;
      }
      for (const member of targetType.members.values()) {
        if (existingMemberNames.has(member.name)) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "enum-member-duplicate",
            format: { name: member.name },
            target: targetNode
          }));
        } else {
          existingMemberNames.add(member.name);
          const memberSym = getMemberSymbol(parentEnumSym, member.name);
          const clonedMember = cloneTypeForSymbol(memberSym, member, {
            enum: parentEnum,
            sourceMember: member
          });
          if (clonedMember) {
            members.push(clonedMember);
          }
        }
      }
    }
    return members;
  }
  function checkDirectives(node, type) {
    let hasDeprecation = false;
    for (const directive of node.directives ?? []) {
      if (directive.target.sv === "deprecated") {
        const message = directive.arguments[0];
        if (message === void 0) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "invalid-deprecation-argument",
            messageId: "missing",
            target: directive
          }));
          continue;
        }
        let messageStr;
        if (message.kind !== SyntaxKind.StringLiteral) {
          reportCheckerDiagnostic(createDiagnostic({
            code: "invalid-deprecation-argument",
            format: { kind: SyntaxKind[message.kind] },
            target: directive.arguments[0]
          }));
          messageStr = "<missing message>";
        } else {
          messageStr = message.value;
        }
        if (hasDeprecation === true) {
          reportCheckerDiagnostic(createDiagnostic({ code: "duplicate-deprecation", target: node }));
        } else {
          hasDeprecation = true;
          markDeprecated(program, type, {
            message: messageStr
          });
        }
      }
    }
  }
  function createAndFinishType(typeDef) {
    createType(typeDef);
    return finishType(typeDef);
  }
  function initModel(node) {
    return createType({
      kind: "Model",
      node,
      name: "",
      namespace: node && getParentNamespaceType(node),
      properties: createRekeyableMap(),
      decorators: [],
      derivedModels: [],
      sourceModels: [],
      expression: true
    });
  }
  function createType(typeDef) {
    stats.createdTypes++;
    Object.setPrototypeOf(typeDef, typePrototype);
    typeDef.isFinished = false;
    typeDef.creating = true;
    const createdType = typeDef;
    createdType.entityKind = "Type";
    if (createdType.node) {
      checkDirectives(createdType.node, createdType);
    }
    return createdType;
  }
  function finishType(typeDef, options = {}) {
    stats.finishedTypes++;
    if (!options.skipDecorators) {
      let postSelfValidators = [];
      if ("decorators" in typeDef) {
        postSelfValidators = applyDecoratorsToType(typeDef);
      }
      typeDef.isFinished = true;
      Object.setPrototypeOf(typeDef, typePrototype);
      runPostValidators(postSelfValidators);
    }
    markAsChecked(typeDef);
    return typeDef;
  }
  function applyDecoratorsToType(typeDef) {
    const postSelfValidators = [];
    for (const decApp of typeDef.decorators) {
      const validators = applyDecoratorToType(program, decApp, typeDef);
      if (validators?.onTargetFinish) {
        postSelfValidators.push(validators.onTargetFinish);
      }
      if (validators?.onGraphFinish) {
        postCheckValidators.push(validators.onGraphFinish);
      }
    }
    return postSelfValidators;
  }
  function runPostValidators(validators) {
    for (const validator of validators) {
      program.reportDiagnostics(validator());
    }
  }
  function markAsChecked(type) {
    if (!type.creating)
      return;
    delete type.creating;
    const pending = waitingForResolution.get(type);
    if (pending) {
      pending.forEach(([_, resolution]) => resolution());
    }
    waitingForResolution.delete(type);
  }
  function getLiteralType(node) {
    return createLiteralType(node.value, node);
  }
  function getMergedSymbol(sym) {
    return resolver.getMergedSymbol(sym);
  }
  function createGlobalNamespaceType() {
    const sym = resolver.symbols.global;
    const type = createType({
      kind: "Namespace",
      name: "",
      node: getGlobalNamespaceNode(),
      models: /* @__PURE__ */ new Map(),
      scalars: /* @__PURE__ */ new Map(),
      operations: /* @__PURE__ */ new Map(),
      namespaces: /* @__PURE__ */ new Map(),
      interfaces: /* @__PURE__ */ new Map(),
      unions: /* @__PURE__ */ new Map(),
      enums: /* @__PURE__ */ new Map(),
      decoratorDeclarations: /* @__PURE__ */ new Map(),
      functionDeclarations: /* @__PURE__ */ new Map(),
      decorators: []
    });
    getSymbolLinks(sym).type = type;
    type.decorators = checkAugmentDecorators(CheckContext.DEFAULT, sym, type);
    return finishType(type);
  }
  function initializeClone(type, additionalProps) {
    let clone;
    switch (type.kind) {
      case "Model":
        const newModel = createType({
          ...type,
          decorators: [...type.decorators],
          properties: void 0,
          ...additionalProps
        });
        if (!("properties" in additionalProps)) {
          newModel.properties = createRekeyableMap(Array.from(type.properties.entries()).map(([key, prop]) => [
            key,
            cloneType(prop, { model: newModel })
          ]));
        }
        clone = newModel;
        break;
      case "Union":
        const newUnion = createType({
          ...type,
          decorators: [...type.decorators],
          variants: void 0,
          get options() {
            return Array.from(this.variants.values()).map((v) => v.type);
          },
          ...additionalProps
        });
        if (!("variants" in additionalProps)) {
          newUnion.variants = createRekeyableMap(Array.from(type.variants.entries()).map(([key, prop]) => [
            key,
            cloneType(prop, { union: newUnion })
          ]));
        }
        clone = newUnion;
        break;
      case "Interface":
        const newInterface = createType({
          ...type,
          decorators: [...type.decorators],
          operations: void 0,
          ...additionalProps
        });
        if (!("operations" in additionalProps)) {
          newInterface.operations = createRekeyableMap(Array.from(type.operations.entries()).map(([key, prop]) => [
            key,
            cloneType(prop, { interface: newInterface })
          ]));
        }
        clone = newInterface;
        break;
      case "Enum":
        const newEnum = createType({
          ...type,
          decorators: [...type.decorators],
          members: void 0,
          ...additionalProps
        });
        if (!("members" in additionalProps)) {
          newEnum.members = createRekeyableMap(Array.from(type.members.entries()).map(([key, prop]) => [
            key,
            cloneType(prop, { enum: newEnum })
          ]));
        }
        clone = newEnum;
        break;
      default:
        clone = createType({
          ...type,
          ..."decorators" in type ? { decorators: [...type.decorators] } : {},
          ...additionalProps
        });
        break;
    }
    return clone;
  }
  function cloneType(type, additionalProps = {}) {
    const clone = initializeClone(type, additionalProps);
    compilerAssert(clone.kind === type.kind, "cloneType must not change type kind");
    return finishType(clone, { skipDecorators: !type.isFinished });
  }
  function cloneTypeForSymbol(sym, type, additionalProps = {}) {
    let clone = initializeClone(type, additionalProps);
    if ("decorators" in clone) {
      const docComment = getDocCommentForSymbol(sym) ?? getDocCommentForType(type);
      if (docComment) {
        clone.decorators.push(createDocFromCommentDecorator("self", docComment));
      }
      for (const dec of checkAugmentDecorators(CheckContext.DEFAULT, sym, clone)) {
        clone.decorators.push(dec);
      }
    }
    if (type.isFinished) {
      clone = finishType(clone);
    }
    compilerAssert(clone.kind === type.kind, "cloneType must not change type kind");
    return clone;
  }
  function createLiteralType(value, node) {
    if (program.literalTypes.has(value)) {
      return program.literalTypes.get(value);
    }
    let type;
    switch (typeof value) {
      case "string":
        type = createType({ kind: "String", value });
        break;
      case "boolean":
        type = createType({ kind: "Boolean", value });
        break;
      case "number":
        let valueAsString;
        if (node) {
          compilerAssert(node.kind === SyntaxKind.NumericLiteral, "Must pass numeric literal node or undefined when creating a numeric literal type");
          valueAsString = node.valueAsString;
        } else {
          valueAsString = String(value);
        }
        type = createType({
          kind: "Number",
          value,
          valueAsString,
          numericValue: Numeric(valueAsString)
        });
        break;
      default:
        type = createType({
          kind: "Number",
          value: value.asNumber() ?? 0,
          valueAsString: value.toString(),
          numericValue: value
        });
    }
    program.literalTypes.set(value, type);
    return finishType(type);
  }
  function checkTypeOfValueMatchConstraint(source, constraint, diagnosticTarget) {
    const [related, diagnostics] = relation.isTypeAssignableTo(source, constraint.type, diagnosticTarget);
    if (!related) {
      if (constraint.kind === "argument") {
        reportCheckerDiagnostic(createDiagnostic({
          code: "invalid-argument",
          format: {
            value: getEntityName(source),
            expected: getEntityName(constraint.type)
          },
          target: diagnosticTarget
        }));
      } else {
        reportCheckerDiagnostics(diagnostics);
      }
    }
    return related;
  }
  function checkTypeAssignable(source, target, diagnosticTarget) {
    const [related, diagnostics] = relation.isTypeAssignableTo(source, target, diagnosticTarget);
    if (!related) {
      reportCheckerDiagnostics(diagnostics);
    }
    return related;
  }
  function checkValueOfType(source, target, diagnosticTarget) {
    const [related, diagnostics] = relation.isValueOfType(source, target, diagnosticTarget);
    if (!related) {
      reportCheckerDiagnostics(diagnostics);
    }
    return related;
  }
  function isStdType2(type, stdType) {
    if (type.kind !== "Model" && type.kind !== "Scalar" || type.namespace === void 0 || !isTypeSpecNamespace2(type.namespace))
      return false;
    if (type.kind === "Scalar")
      return stdType === void 0 || stdType === type.name;
    if (stdType === "Array" && type === stdTypes["Array"])
      return true;
    if (stdType === "Record" && type === stdTypes["Record"])
      return true;
    if (type.kind === "Model")
      return stdType === void 0 || stdType === type.name;
    return false;
  }
  function getValueExactType(value) {
    return valueExactTypes.get(value);
  }
}
function getNamedSourceModels(property) {
  if (!property.sourceProperty) {
    return void 0;
  }
  const set = /* @__PURE__ */ new Set();
  for (let p = property; p; p = p.sourceProperty) {
    if (p.model?.name) {
      set.add(p.model);
    }
  }
  return set;
}
function addDerivedModels(models, possiblyDerivedModels) {
  for (const element of possiblyDerivedModels) {
    if (!models.has(element)) {
      for (let t = element.baseModel; t; t = t.baseModel) {
        if (models.has(t)) {
          models.add(element);
          break;
        }
      }
    }
  }
}
function createTypeMapper(parameters, args, source, parentMapper) {
  const map = new Map(parentMapper?.map ?? []);
  for (const [index, param] of parameters.entries()) {
    map.set(param, args[index]);
  }
  return {
    partial: false,
    args: [...parentMapper?.args ?? [], ...args],
    getMappedType: (type) => {
      return map.get(type) ?? type;
    },
    source,
    map
  };
}
function getEffectiveModelType(program, model, filter) {
  if (filter) {
    model = filterModelProperties(program, model, filter);
  }
  if (model.name) {
    return model;
  }
  compilerAssert(!model.baseModel, "Anonymous model with base model.");
  if (model.properties.size === 0) {
    return model;
  }
  let candidates;
  for (const property of model.properties.values()) {
    const sources = getNamedSourceModels(property);
    if (!sources) {
      return model;
    }
    if (!candidates) {
      candidates = sources;
      continue;
    }
    addDerivedModels(sources, candidates);
    for (const candidate of candidates) {
      if (!sources.has(candidate)) {
        candidates.delete(candidate);
      }
    }
  }
  let match;
  for (const candidate of candidates ?? []) {
    if (model.properties.size === countPropertiesInherited(candidate)) {
      match = candidate;
      break;
    }
    if (filter && !match && model.properties.size === countPropertiesInherited(candidate, filter)) {
      match = candidate;
      continue;
    }
  }
  return match ?? model;
}
function filterModelProperties(program, model, filter) {
  let filtered = false;
  for (const property of walkPropertiesInherited(model)) {
    if (!filter(property)) {
      filtered = true;
      break;
    }
  }
  if (!filtered) {
    return model;
  }
  const realm = Realm.realmForType.get(model);
  const typekit = realm ? $(realm) : $(program);
  const newModel = typekit.model.create({
    name: "",
    indexer: void 0,
    properties: {},
    decorators: [],
    derivedModels: [],
    sourceModels: [{ usage: "spread", model }]
  });
  for (const property of walkPropertiesInherited(model)) {
    if (filter(property)) {
      const newProperty = typekit.type.clone(property);
      Object.assign(newProperty, {
        sourceProperty: property,
        model: newModel
      });
      newModel.properties.set(property.name, newProperty);
      typekit.type.finishType(newProperty);
    }
  }
  return program.checker.finishType(newModel);
}
function getOverriddenProperty(property) {
  compilerAssert(property.model, "Parent model must be set before overridden property can be found.");
  for (let current = property.model.baseModel; current; current = current.baseModel) {
    const overridden = current.properties.get(property.name);
    if (overridden) {
      return overridden;
    }
  }
  return void 0;
}
function* walkPropertiesInherited(model) {
  const returned = /* @__PURE__ */ new Set();
  for (let current = model; current; current = current.baseModel) {
    for (const property of current.properties.values()) {
      if (returned.has(property.name)) {
        continue;
      }
      returned.add(property.name);
      yield property;
    }
  }
}
function countPropertiesInherited(model, filter) {
  let count = 0;
  for (const property of walkPropertiesInherited(model)) {
    if (!filter || filter(property)) {
      count++;
    }
  }
  return count;
}
function linkMapper(typeDef, mapper) {
  if (mapper) {
    compilerAssert(!typeDef.templateMapper, "Mapper provided but template arguments already set.");
    typeDef.templateMapper = mapper;
  }
}
function extractMainDoc(type) {
  if (type.node?.docs === void 0) {
    return void 0;
  }
  let mainDoc = "";
  for (const doc of type.node.docs) {
    mainDoc += getDocContent(doc.content);
  }
  const trimmed = mainDoc.trim();
  return trimmed === "" ? void 0 : trimmed;
}
function extractReturnsDocs(type) {
  const result = {
    returns: void 0,
    errors: void 0
  };
  if (type.node?.docs === void 0) {
    return result;
  }
  for (const doc of type.node.docs) {
    for (const tag of doc.tags) {
      if (tag.kind === SyntaxKind.DocReturnsTag) {
        result.returns = getDocContent(tag.content);
      }
      if (tag.kind === SyntaxKind.DocErrorsTag) {
        result.errors = getDocContent(tag.content);
      }
    }
  }
  return result;
}
function extractParamDocs(node) {
  if (node.docs === void 0) {
    return /* @__PURE__ */ new Map();
  }
  const paramDocs = /* @__PURE__ */ new Map();
  for (const doc of node.docs) {
    for (const tag of doc.tags) {
      if (tag.kind === SyntaxKind.DocParamTag) {
        paramDocs.set(tag.paramName.sv, getDocContent(tag.content));
      }
    }
  }
  return paramDocs;
}
function extractPropDocs(node) {
  if (node.docs === void 0) {
    return /* @__PURE__ */ new Map();
  }
  const propDocs = /* @__PURE__ */ new Map();
  for (const doc of node.docs) {
    for (const tag of doc.tags) {
      if (tag.kind === SyntaxKind.DocPropTag) {
        propDocs.set(tag.propName.sv, getDocContent(tag.content));
      }
    }
  }
  return propDocs;
}
function getDocContent(content) {
  const docs = [];
  for (const node of content) {
    compilerAssert(node.kind === SyntaxKind.DocText, "No other doc content node kinds exist yet. Update this code appropriately when more are added.");
    docs.push(node.text);
  }
  return docs.join("");
}
function applyDecoratorToType(program, decApp, target) {
  compilerAssert("decorators" in target, "Cannot apply decorator to non-decoratable type", target);
  for (const arg of decApp.args) {
    if (isType(arg.value) && isErrorType(arg.value)) {
      return;
    }
  }
  if (decApp.definition) {
    const deprecation = getDeprecationDetails(program, decApp.definition);
    if (deprecation !== void 0) {
      reportDeprecated(program, deprecation.message, decApp.node ?? target);
    }
  }
  try {
    const args = decApp.args.map((x) => x.jsValue);
    const fn = decApp.decorator;
    const context = createDecoratorContext(program, decApp);
    return fn(context, target, ...args);
  } catch (error) {
    if (program.compilerOptions.designTimeBuild) {
      program.reportDiagnostic(createDiagnostic({
        code: "decorator-fail",
        format: { decoratorName: decApp.decorator.name, error: error.stack },
        target: decApp.node ?? target
      }));
    } else {
      throw error;
    }
  }
}
function createPassThruContexts(program, target) {
  const decCtx = {
    program,
    decoratorTarget: target,
    getArgumentTarget: () => target,
    call: (decorator, target2, ...args) => {
      return decCtx.callDecorator(decorator, target2, ...args);
    },
    callDecorator(decorator, target2, ...args) {
      return decorator(decCtx, target2, ...args);
    },
    callFunction(fn, ...args) {
      return fn(fnCtx, ...args);
    }
  };
  const fnCtx = {
    program,
    functionCallTarget: target,
    getArgumentTarget: () => target,
    callFunction(fn, ...args) {
      return fn(fnCtx, ...args);
    },
    callDecorator(decorator, target2, ...args) {
      return decorator(decCtx, target2, ...args);
    }
  };
  return {
    decorator: decCtx,
    function: fnCtx
  };
}
function createDecoratorContext(program, decApp) {
  const passthrough = createPassThruContexts(program, decApp.node);
  const decCtx = {
    program,
    decoratorTarget: decApp.node,
    getArgumentTarget: (index) => {
      return decApp.args[index]?.node;
    },
    call: (decorator, target, ...args) => {
      return decCtx.callDecorator(decorator, target, ...args);
    },
    callDecorator: (decorator, target, ...args) => {
      return decorator(passthrough.decorator, target, ...args);
    },
    callFunction(fn, ...args) {
      return fn(passthrough.function, ...args);
    }
  };
  return decCtx;
}
function createFunctionContext(program, fnCall) {
  const passthrough = createPassThruContexts(program, fnCall);
  return {
    program,
    functionCallTarget: fnCall,
    getArgumentTarget: (index) => {
      return fnCall.arguments[index];
    },
    callDecorator(decorator, target, ...args) {
      return decorator(passthrough.decorator, target, ...args);
    },
    callFunction(fn, ...args) {
      return fn(passthrough.function, ...args);
    }
  };
}
function isTemplatedNode(node) {
  if (node === void 0)
    return false;
  return "templateParameters" in node && node.templateParameters.length > 0;
}
var ResolutionKind;
(function(ResolutionKind2) {
  ResolutionKind2[ResolutionKind2["Value"] = 0] = "Value";
  ResolutionKind2[ResolutionKind2["Type"] = 1] = "Type";
  ResolutionKind2[ResolutionKind2["BaseType"] = 2] = "BaseType";
  ResolutionKind2[ResolutionKind2["Constraint"] = 3] = "Constraint";
})(ResolutionKind || (ResolutionKind = {}));
var PendingResolutions = class {
  #data = /* @__PURE__ */ new Map();
  start(symId, kind) {
    let existing = this.#data.get(symId);
    if (existing === void 0) {
      existing = /* @__PURE__ */ new Set();
      this.#data.set(symId, existing);
    }
    existing.add(kind);
  }
  has(symId, kind) {
    return this.#data.get(symId)?.has(kind) ?? false;
  }
  finish(symId, kind) {
    const existing = this.#data.get(symId);
    if (existing === void 0) {
      return;
    }
    existing?.delete(kind);
    if (existing.size === 0) {
      this.#data.delete(symId);
    }
  }
};
var defaultSymbolResolutionOptions = {
  resolveDecorators: false,
  resolveDeclarationOfTemplate: false
};
function printTypeReferenceNode(node) {
  switch (node.kind) {
    case SyntaxKind.MemberExpression:
      return `${printTypeReferenceNode(node.base)}.${printTypeReferenceNode(node.id)}`;
    case SyntaxKind.TypeReference:
      return printTypeReferenceNode(node.target);
    case SyntaxKind.Identifier:
      return node.sv;
  }
}

// node_modules/@typespec/compiler/dist/src/typekit/kits/model.js
var indexCache = /* @__PURE__ */ new Map();
defineKit({
  model: {
    create(desc) {
      const properties = createRekeyableMap(Array.from(Object.entries(desc.properties)));
      const model = this.program.checker.createType({
        kind: "Model",
        name: desc.name ?? "",
        decorators: decoratorApplication(this, desc.decorators),
        properties,
        derivedModels: desc.derivedModels ?? [],
        sourceModels: desc.sourceModels ?? [],
        indexer: desc.indexer,
        expression: resolveExpressionFlag("model", desc.name, desc.expression)
      });
      this.program.checker.finishType(model);
      return model;
    },
    is(type) {
      return type.entityKind === "Type" && type.kind === "Model";
    },
    isExpresion(type) {
      return type.expression;
    },
    getEffectiveModel(model, filter) {
      return getEffectiveModelType(this.program, model, filter);
    },
    getIndexType(model) {
      if (indexCache.has(model)) {
        return indexCache.get(model);
      }
      if (!model.indexer) {
        return void 0;
      }
      if (model.indexer.key.name === "string") {
        const record = this.record.create(model.indexer.value);
        indexCache.set(model, record);
        return record;
      }
      if (model.indexer.key.name === "integer") {
        const array = this.array.create(model.indexer.value);
        indexCache.set(model, array);
        return array;
      }
      return void 0;
    },
    getProperties(model, options = {}) {
      const properties = copyMap(model.properties);
      const discriminator = this.model.getDiscriminatedUnion(model);
      if (discriminator) {
        const discriminatorName = discriminator.propertyName;
        properties.set(discriminatorName, this.modelProperty.create({ name: discriminatorName, type: this.builtin.string }));
      }
      if (options.includeExtended) {
        let base = model.baseModel;
        while (base) {
          for (const [key, value] of base.properties) {
            if (!properties.has(key)) {
              properties.set(key, value);
            }
          }
          base = base.baseModel;
        }
      }
      return properties;
    },
    getAdditionalPropertiesRecord(model) {
      if (this.model.is(model) && model.sourceModel && this.record.is(model.sourceModel)) {
        return model.sourceModel;
      }
      if (model.baseModel && this.record.is(model.baseModel)) {
        return model.baseModel;
      }
      const indexType = this.model.getIndexType(model);
      if (indexType && this.record.is(indexType)) {
        return indexType;
      }
      if (model.baseModel) {
        return this.model.getAdditionalPropertiesRecord(model.baseModel);
      }
      return void 0;
    },
    getDiscriminatedUnion: createDiagnosable(function(model) {
      const discriminator = getDiscriminator(this.program, model);
      if (!discriminator) {
        return [void 0, []];
      }
      return getDiscriminatedUnionFromInheritance(model, discriminator);
    })
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/operation.js
init_define_process_env();
defineKit({
  operation: {
    is(type) {
      return type.entityKind === "Type" && type.kind === "Operation";
    },
    getPagingMetadata: createDiagnosable(function(operation) {
      return getPagingOperation(this.program, operation);
    }),
    create(desc) {
      const parametersModel = this.model.create({
        name: `${desc.name}Parameters`,
        properties: desc.parameters.reduce((acc, property) => {
          acc[property.name] = property;
          return acc;
        }, {})
      });
      const operation = this.program.checker.createType({
        kind: "Operation",
        name: desc.name,
        decorators: [],
        parameters: parametersModel,
        returnType: desc.returnType
      });
      this.program.checker.finishType(operation);
      return operation;
    }
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/record.js
init_define_process_env();
defineKit({
  record: {
    is(type) {
      return type.entityKind === "Type" && type.kind === "Model" && isRecordModelType(type) && type.properties.size === 0;
    },
    getElementType(type) {
      if (!this.record.is(type)) {
        throw new Error("Type is not a record.");
      }
      return type.indexer.value;
    },
    create(elementType) {
      return this.model.create({
        name: "Record",
        properties: {},
        indexer: {
          key: this.builtin.string,
          value: elementType
        }
      });
    }
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/scalar.js
init_define_process_env();
defineKit({
  scalar: {
    is(type) {
      return type.entityKind === "Type" && type.kind === "Scalar";
    },
    extendsBoolean: extendsStdType("boolean"),
    extendsBytes: extendsStdType("bytes"),
    extendsDecimal: extendsStdType("decimal"),
    extendsDecimal128: extendsStdType("decimal128"),
    extendsDuration: extendsStdType("duration"),
    extendsFloat: extendsStdType("float"),
    extendsFloat32: extendsStdType("float32"),
    extendsFloat64: extendsStdType("float64"),
    extendsInt8: extendsStdType("int8"),
    extendsInt16: extendsStdType("int16"),
    extendsInt32: extendsStdType("int32"),
    extendsInt64: extendsStdType("int64"),
    extendsInteger: extendsStdType("integer"),
    extendsNumeric: extendsStdType("numeric"),
    extendsOffsetDateTime: extendsStdType("offsetDateTime"),
    extendsPlainDate: extendsStdType("plainDate"),
    extendsPlainTime: extendsStdType("plainTime"),
    extendsSafeint: extendsStdType("safeint"),
    extendsString: extendsStdType("string"),
    extendsUint8: extendsStdType("uint8"),
    extendsUint16: extendsStdType("uint16"),
    extendsUint32: extendsStdType("uint32"),
    extendsUint64: extendsStdType("uint64"),
    extendsUrl: extendsStdType("url"),
    extendsUtcDateTime: extendsStdType("utcDateTime"),
    isBoolean: isStdType("boolean"),
    isBytes: isStdType("bytes"),
    isDecimal: isStdType("decimal"),
    isDecimal128: isStdType("decimal128"),
    isDuration: isStdType("duration"),
    isFloat: isStdType("float"),
    isFloat32: isStdType("float32"),
    isFloat64: isStdType("float64"),
    isInt8: isStdType("int8"),
    isInt16: isStdType("int16"),
    isInt32: isStdType("int32"),
    isInt64: isStdType("int64"),
    isInteger: isStdType("integer"),
    isNumeric: isStdType("numeric"),
    isOffsetDateTime: isStdType("offsetDateTime"),
    isPlainDate: isStdType("plainDate"),
    isPlainTime: isStdType("plainTime"),
    isSafeint: isStdType("safeint"),
    isString: isStdType("string"),
    isUint8: isStdType("uint8"),
    isUint16: isStdType("uint16"),
    isUint32: isStdType("uint32"),
    isUint64: isStdType("uint64"),
    isUrl: isStdType("url"),
    isUtcDateTime: isStdType("utcDateTime"),
    getStdBase(type) {
      const tspNamespace = this.program.resolveTypeReference("TypeSpec")[0];
      let current = type;
      while (current) {
        if (current.namespace === tspNamespace) {
          return current;
        }
        current = current.baseScalar;
      }
      return null;
    },
    getEncoding(type) {
      return getEncode(this.program, type);
    },
    getFormat(type) {
      return getFormat(this.program, type);
    }
  }
});
function isStdType(typeName) {
  return function(type) {
    return type === this.program.checker.getStdType(typeName);
  };
}
function extendsStdType(typeName) {
  return function(type) {
    if (!this.scalar.is(type)) {
      return false;
    }
    return isIntrinsicType(this.program, type, typeName);
  };
}

// node_modules/@typespec/compiler/dist/src/typekit/kits/tuple.js
init_define_process_env();
defineKit({
  tuple: {
    is(type) {
      return type.entityKind === "Type" && type.kind === "Tuple";
    },
    create(values = []) {
      const tuple = this.program.checker.createType({
        kind: "Tuple",
        name: "Tuple",
        values
      });
      this.program.checker.finishType(tuple);
      return tuple;
    }
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/type.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/typekit/utils/get-plausible-name.js
init_define_process_env();
function getPlausibleName(type) {
  let name = type.name ?? "TypeExpression";
  if (isTemplateInstance(type)) {
    const namePrefix = type.templateMapper.args.map((a) => {
      if (a.entityKind === "Type") {
        switch (a.kind) {
          case "Scalar":
            const name2 = getPlausibleName(a);
            return capitalize(name2);
          case "Model":
          case "Interface":
          case "Enum":
          case "Union":
            return getPlausibleName(a);
        }
      }
      return "name" in a ? a.name : "";
    }).join("_");
    name = `${namePrefix}${name}`;
  }
  return name;
}

// node_modules/@typespec/compiler/dist/src/typekit/kits/type.js
defineKit({
  type: {
    is(entity) {
      return entity.entityKind === "Type";
    },
    finishType(type) {
      this.program.checker.finishType(type);
    },
    clone(type) {
      let clone;
      switch (type.kind) {
        case "Model":
          clone = this.program.checker.createType({
            ...type,
            decorators: [...type.decorators],
            derivedModels: [...type.derivedModels],
            sourceModels: type.sourceModels.map((x) => ({ ...x })),
            properties: copyMap(type.properties),
            indexer: type.indexer ? { ...type.indexer } : void 0
          });
          break;
        case "Union":
          clone = this.program.checker.createType({
            ...type,
            decorators: [...type.decorators],
            variants: copyMap(type.variants),
            get options() {
              return Array.from(this.variants.values()).map((v) => v.type);
            }
          });
          break;
        case "Interface":
          clone = this.program.checker.createType({
            ...type,
            decorators: [...type.decorators],
            operations: copyMap(type.operations)
          });
          break;
        case "Enum":
          clone = this.program.checker.createType({
            ...type,
            decorators: [...type.decorators],
            members: copyMap(type.members)
          });
          break;
        case "Namespace":
          clone = this.program.checker.createType({
            ...type,
            decorators: [...type.decorators],
            instantiationParameters: type.instantiationParameters ? [...type.instantiationParameters] : void 0,
            models: copyMap(type.models),
            decoratorDeclarations: copyMap(type.decoratorDeclarations),
            enums: copyMap(type.enums),
            unions: copyMap(type.unions),
            operations: copyMap(type.operations),
            interfaces: copyMap(type.interfaces),
            namespaces: copyMap(type.namespaces),
            scalars: copyMap(type.scalars)
          });
          break;
        case "Scalar":
          clone = this.program.checker.createType({
            ...type,
            decorators: [...type.decorators],
            derivedScalars: [...type.derivedScalars],
            constructors: copyMap(type.constructors)
          });
          break;
        case "Tuple":
          clone = this.program.checker.createType({
            ...type,
            values: [...type.values]
          });
          break;
        default:
          clone = this.program.checker.createType({
            ...type,
            ..."decorators" in type ? { decorators: [...type.decorators] } : {}
          });
          break;
      }
      this.realm.addType(clone);
      return clone;
    },
    isError(type) {
      return isErrorModel(this.program, type);
    },
    getEncodedName(type, encoding) {
      return resolveEncodedName(this.program, type, encoding);
    },
    getSummary(type) {
      return getSummary(this.program, type);
    },
    getDoc(type) {
      return getDoc(this.program, type);
    },
    getPlausibleName(type) {
      return getPlausibleName(type);
    },
    maxValue(type) {
      return getMaxValue(this.program, type);
    },
    minValue(type) {
      return getMinValue(this.program, type);
    },
    maxLength(type) {
      return getMaxLength(this.program, type);
    },
    minLength(type) {
      return getMinLength(this.program, type);
    },
    maxItems(type) {
      return getMaxItems(this.program, type);
    },
    maxValueExclusive(type) {
      return getMaxValueExclusive(this.program, type);
    },
    minValueExclusive(type) {
      return getMinValueExclusive(this.program, type);
    },
    minItems(type) {
      return getMinItems(this.program, type);
    },
    isNever(type) {
      return isNeverType(type);
    },
    isUserDefined(type) {
      return getLocationContext(this.program, type).type === "project";
    },
    inNamespace(type, namespace) {
      if (type === namespace) {
        return true;
      }
      switch (type.kind) {
        case "ModelProperty":
          if (type.model) {
            return this.type.inNamespace(type.model, namespace);
          }
          break;
        case "EnumMember":
          return this.type.inNamespace(type.enum, namespace);
        case "UnionVariant":
          return this.type.inNamespace(type.union, namespace);
        case "Operation":
          if (type.interface) {
            return this.type.inNamespace(type.interface, namespace);
          }
          break;
      }
      if ("namespace" in type && type.namespace) {
        return this.type.inNamespace(type.namespace, namespace);
      }
      return false;
    },
    isAssignableTo: createDiagnosable(function(source, target, diagnosticTarget) {
      return this.program.checker.isTypeAssignableTo(source, target, diagnosticTarget ?? source);
    }),
    resolve: createDiagnosable(function(reference, kind) {
      const [type, diagnostics] = this.program.resolveTypeReference(reference);
      if (type && kind && type.kind !== kind) {
        throw new Error(`Type kind mismatch: expected ${kind}, got ${type.kind}`);
      }
      return [type, diagnostics];
    })
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/union-variant.js
init_define_process_env();
defineKit({
  unionVariant: {
    create(desc) {
      const variant = this.program.checker.createType({
        kind: "UnionVariant",
        name: desc.name ?? /* @__PURE__ */ Symbol("name"),
        decorators: decoratorApplication(this, desc.decorators),
        type: desc.type,
        union: desc.union
      });
      this.program.checker.finishType(variant);
      return variant;
    },
    is(type) {
      return type.entityKind === "Type" && type.kind === "UnionVariant";
    }
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/union.js
init_define_process_env();
var UnionKit = defineKit({
  union: {
    filter(union, filterFn) {
      const variants = Array.from(union.variants.values()).filter(filterFn);
      return this.union.create({ variants });
    },
    create(descOrChildren) {
      let descriptor;
      if (Array.isArray(descOrChildren)) {
        descriptor = {
          decorators: [],
          variants: descOrChildren.map((child) => {
            const memberDoc = getDoc(this.program, child);
            return this.unionVariant.create({
              type: child,
              decorators: memberDoc ? [[$doc, memberDoc]] : void 0
            });
          })
        };
      } else {
        descriptor = descOrChildren;
      }
      const union = this.program.checker.createType({
        kind: "Union",
        name: descriptor.name,
        decorators: decoratorApplication(this, descriptor.decorators),
        variants: createRekeyableMap(),
        get options() {
          return Array.from(this.variants.values()).map((v) => v.type);
        },
        expression: resolveExpressionFlag("union", descriptor.name, descriptor.expression)
      });
      if (Array.isArray(descriptor.variants)) {
        for (const variant of descriptor.variants) {
          union.variants.set(variant.name, variant);
          variant.union = union;
        }
      } else if (descriptor.variants) {
        for (const [name, value] of Object.entries(descriptor.variants)) {
          union.variants.set(name, this.unionVariant.create({ name, type: this.literal.create(value) }));
        }
      }
      this.program.checker.finishType(union);
      return union;
    },
    createFromEnum(type) {
      const enumDoc = getDoc(this.program, type);
      return this.union.create({
        name: type.name,
        decorators: enumDoc ? [[$doc, enumDoc]] : void 0,
        variants: Array.from(type.members.values()).map((member) => {
          const memberDoc = getDoc(this.program, member);
          const value = member.value ?? member.name;
          return this.unionVariant.create({
            name: member.name,
            type: this.literal.create(value),
            decorators: memberDoc ? [[$doc, memberDoc]] : void 0
          });
        })
      });
    },
    is(type) {
      return type.entityKind === "Type" && type.kind === "Union";
    },
    isValidEnum(type) {
      for (const variant of type.variants.values()) {
        if (!this.literal.isString(variant.type) && !this.literal.isNumeric(variant.type)) {
          return false;
        }
      }
      return true;
    },
    isExtensible(type) {
      const variants = Array.from(type.variants.values());
      if (variants.length === 0) {
        return false;
      }
      for (let i = 0; i < variants.length; i++) {
        let isCommon = true;
        for (let j = 0; j < variants.length; j++) {
          if (i === j) {
            continue;
          }
          const assignable = ignoreDiagnostics(this.program.checker.isTypeAssignableTo(variants[j].type, variants[i].type, type));
          if (!assignable) {
            isCommon = false;
            break;
          }
        }
        if (isCommon) {
          return true;
        }
      }
      return false;
    },
    isExpression(type) {
      return type.expression;
    },
    getDiscriminatedUnion: createDiagnosable(function(type) {
      return getDiscriminatedUnion(this.program, type);
    })
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/kits/value.js
init_define_process_env();
defineKit({
  value: {
    is(value) {
      return value.entityKind === "Value";
    },
    create(value) {
      if (typeof value === "string") {
        return this.value.createString(value);
      } else if (typeof value === "number") {
        return this.value.createNumeric(value);
      } else {
        return this.value.createBoolean(value);
      }
    },
    createString(value) {
      return {
        entityKind: "Value",
        value,
        valueKind: "StringValue",
        type: this.literal.createString(value),
        scalar: void 0
      };
    },
    createNumeric(value) {
      const valueAsString = String(value);
      return {
        entityKind: "Value",
        value: Numeric(valueAsString),
        valueKind: "NumericValue",
        type: this.literal.createNumeric(value),
        scalar: void 0
      };
    },
    createBoolean(value) {
      return {
        entityKind: "Value",
        value,
        valueKind: "BooleanValue",
        type: this.literal.createBoolean(value),
        scalar: void 0
      };
    },
    isBoolean(type) {
      return this.value.is(type) && type.valueKind === "BooleanValue";
    },
    isString(type) {
      return this.value.is(type) && type.valueKind === "StringValue";
    },
    isNumeric(type) {
      return this.value.is(type) && type.valueKind === "NumericValue";
    },
    isArray(type) {
      return this.value.is(type) && type.valueKind === "ArrayValue";
    },
    isObject(type) {
      return this.value.is(type) && type.valueKind === "ObjectValue";
    },
    isEnum(type) {
      return this.value.is(type) && type.valueKind === "EnumValue";
    },
    isNull(type) {
      return this.value.is(type) && type.valueKind === "NullValue";
    },
    isScalar(type) {
      return this.value.is(type) && type.valueKind === "ScalarValue";
    },
    isAssignableTo: createDiagnosable(function(source, target, diagnosticTarget) {
      return this.program.checker.isTypeAssignableTo(source, target, diagnosticTarget ?? source);
    }),
    isOfType: createDiagnosable(function(source, target, diagnosticTarget) {
      return this.program.checker.isValueOfType(source, target, diagnosticTarget ?? source);
    }),
    resolve: createDiagnosable(function(reference, kind) {
      const [value, diagnostics] = this.program.resolveTypeOrValueReference(reference);
      if (value && !isValue(value)) {
        return [void 0, diagnostics];
      }
      if (value && kind && value.valueKind !== kind) {
        throw new Error(`Value kind mismatch: expected ${kind}, got ${value.valueKind}`);
      }
      return [value, diagnostics];
    })
  }
});

// node_modules/@typespec/compiler/dist/src/typekit/index.js
var DEFAULT_REALM = /* @__PURE__ */ Symbol.for("TypeSpec.Typekit.DEFAULT_TYPEKIT_REALM");
function _$(arg) {
  let realm;
  if (Object.hasOwn(arg, "projectRoot")) {
    realm = arg[DEFAULT_REALM] ??= new Realm(arg, "default typekit realm");
  } else {
    realm = arg;
  }
  return realm.typekit;
}
var $ = _$;

export {
  getLocationContext,
  compilerFeatures,
  compilerFeatureNames,
  isCompilerFeatureName,
  isTypeSpecValueTypeOf,
  typespecTypeToJson,
  validateDecoratorUniqueOnNode,
  validateDecoratorNotOnType,
  getPropertyType,
  isErrorType,
  isVoidType,
  isNeverType,
  isUnknownType,
  isNullType,
  isType,
  isValue,
  isArrayModelType,
  isRecordModelType,
  isTemplateInstance,
  isDeclaredType,
  isTemplateDeclaration,
  isTemplateDeclarationOrInstance,
  isGlobalNamespace,
  isDeclaredInNamespace,
  getFullyQualifiedSymbolName,
  setAutoDecorator,
  hasAutoDecorator,
  getAutoDecoratorValue,
  getAutoDecoratorTargets,
  Realm,
  isNumeric,
  Numeric,
  getMinValueForScalar,
  getMinValueAsNumeric,
  getMinValue,
  getMaxValueForScalar,
  getMaxValueAsNumeric,
  getMaxValue,
  getMinValueExclusiveForScalar,
  getMinValueExclusiveAsNumeric,
  getMinValueExclusive,
  getMaxValueExclusiveForScalar,
  getMaxValueExclusiveAsNumeric,
  getMaxValueExclusive,
  getMinLengthAsNumeric,
  getMinLength,
  getMaxLengthAsNumeric,
  getMaxLength,
  getMinItemsAsNumeric,
  getMinItems,
  getMaxItemsAsNumeric,
  getMaxItems,
  getDocData,
  getDiscriminator,
  getDiscriminatedTypes,
  indexerDecorator,
  docFromCommentDecorator,
  getterDecorator,
  createDiagnosable,
  isDeprecated,
  getDeprecationDetails,
  markDeprecated,
  getDiscriminatedUnion,
  getDiscriminatedUnionFromInheritance,
  getRawTextWithCache,
  getTypeName,
  getEntityName,
  isStdNamespace,
  getNamespaceFullName,
  getKey,
  isKey,
  $encodedName,
  resolveEncodedName,
  validateEncodedNamesConflicts,
  navigateProgram,
  navigateType,
  scopeNavigationToNamespace,
  navigateTypesInNamespace,
  mapEventEmitterToNodeListener,
  getProperty,
  EventEmitter,
  UnserializableValueError,
  UnsupportedScalarConstructorError,
  serializeValueAsJson,
  isList,
  listDecorator,
  offsetDecorator,
  pageIndexDecorator,
  pageSizeDecorator,
  pageItemsDecorator,
  continuationTokenDecorator,
  nextLinkDecorator,
  prevLinkDecorator,
  firstLinkDecorator,
  lastLinkDecorator,
  validatePagingOperations,
  getPagingOperation,
  getService,
  listServices,
  isService,
  addService,
  $service,
  isSealed,
  sealVisibilityModifiers,
  sealVisibilityModifiersForProgram,
  addVisibilityModifiers,
  removeVisibilityModifiers,
  clearVisibilityModifiersForClass,
  resetVisibilityModifiersForClass,
  getVisibilityForClass,
  hasVisibility,
  VisibilityFilter,
  isVisible,
  getLifecycleVisibilityEnum,
  MutatorFlow,
  isMutableType,
  mutateSubgraphWithNamespace,
  mutateSubgraph,
  $withDefaultKeyVisibility,
  $parameterVisibility,
  EmptyVisibilityProvider,
  getParameterVisibilityFilter,
  $returnTypeVisibility,
  getReturnTypeVisibilityFilter,
  $visibility,
  $removeVisibility,
  $invisible,
  $defaultVisibility,
  $withVisibility,
  $withUpdateableProperties,
  applyVisibilityFilter,
  $withVisibilityFilter,
  applyLifecycleUpdate,
  $withLifecycleUpdate,
  getSummary,
  $summary,
  $doc,
  getDoc,
  $returnsDoc,
  getReturnsDocData,
  getReturnsDoc,
  $errorsDoc,
  getErrorsDocData,
  getErrorsDoc,
  $inspectType,
  $inspectTypeName,
  isStringType,
  isNumericType,
  $error,
  isErrorModel,
  $mediaTypeHint,
  setMediaTypeHint,
  getMediaTypeHint,
  getFormat,
  $format,
  getPatternData,
  $pattern,
  getPattern,
  $minLength,
  $maxLength,
  $minItems,
  $maxItems,
  $minValue,
  $maxValue,
  $minValueExclusive,
  $maxValueExclusive,
  isSecret,
  $secret,
  getEncode,
  $encode,
  $withOptionalProperties,
  $withoutOmittedProperties,
  $withPickedProperties,
  $withoutDefaultValues,
  $tag,
  getTags,
  getAllTags,
  getFriendlyName,
  $friendlyName,
  $key,
  getDeprecated,
  getOverloads,
  getOverloadedOperation,
  $overload,
  discriminatedDecorator,
  $discriminator,
  $example,
  getExamples,
  $opExample,
  getOpExamples,
  UnionKit,
  $,
  createSymbolTable,
  createBinder,
  createSymbol,
  getSymNode,
  explainStringTemplateNotSerializable,
  createChecker,
  getEffectiveModelType,
  filterModelProperties,
  walkPropertiesInherited
};
