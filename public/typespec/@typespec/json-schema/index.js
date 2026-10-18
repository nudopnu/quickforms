var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/@typespec/json-schema/dist/src/index.js
var src_exports = {};
__export(src_exports, {
  $baseUri: () => $baseUri,
  $contains: () => $contains,
  $contentEncoding: () => $contentEncoding,
  $contentMediaType: () => $contentMediaType,
  $contentSchema: () => $contentSchema,
  $decorators: () => $decorators,
  $extension: () => $extension,
  $flags: () => $flags,
  $id: () => $id,
  $jsonSchema: () => $jsonSchema,
  $lib: () => $lib,
  $maxContains: () => $maxContains,
  $maxProperties: () => $maxProperties,
  $minContains: () => $minContains,
  $minProperties: () => $minProperties,
  $multipleOf: () => $multipleOf,
  $onEmit: () => $onEmit,
  $oneOf: () => $oneOf,
  $prefixItems: () => $prefixItems,
  $uniqueItems: () => $uniqueItems,
  EmitterOptionsSchema: () => EmitterOptionsSchema,
  JsonSchemaEmitter: () => JsonSchemaEmitter,
  findBaseUri: () => findBaseUri,
  getBaseUri: () => getBaseUri,
  getContains: () => getContains,
  getContentEncoding: () => getContentEncoding,
  getContentMediaType: () => getContentMediaType,
  getContentSchema: () => getContentSchema,
  getExtensions: () => getExtensions,
  getId: () => getId,
  getJsonSchema: () => getJsonSchema,
  getJsonSchemaTypes: () => getJsonSchemaTypes,
  getMaxContains: () => getMaxContains,
  getMaxProperties: () => getMaxProperties,
  getMinContains: () => getMinContains,
  getMinProperties: () => getMinProperties,
  getMultipleOf: () => getMultipleOf,
  getMultipleOfAsNumeric: () => getMultipleOfAsNumeric,
  getPrefixItems: () => getPrefixItems,
  getUniqueItems: () => getUniqueItems,
  isJsonSchemaDeclaration: () => isJsonSchemaDeclaration,
  isOneOf: () => isOneOf,
  namespace: () => namespace,
  setExtension: () => setExtension
});

// node_modules/@typespec/asset-emitter/dist/src/asset-emitter.js
import { compilerAssert as compilerAssert2, getTypeName as getTypeName2, isTemplateDeclaration as isTemplateDeclaration2, joinPaths, sanitizePathSegment } from "@typespec/compiler";
import { $ } from "@typespec/compiler/typekit";

// node_modules/@typespec/asset-emitter/dist/src/custom-key-map.js
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

// node_modules/@typespec/asset-emitter/dist/src/placeholder.js
var Placeholder = class {
  #listeners = [];
  setValue(value) {
    for (const listener of this.#listeners) {
      listener(value);
    }
  }
  onValue(cb) {
    this.#listeners.push(cb);
  }
};

// node_modules/@typespec/asset-emitter/dist/src/ref-scope.js
function scopeChain(scope) {
  const chain = [];
  while (scope) {
    chain.unshift(scope);
    scope = scope.parentScope;
  }
  return chain;
}
function resolveDeclarationReferenceScope(target, currentScope) {
  const targetScope = target.scope;
  const targetChain = scopeChain(targetScope);
  const currentChain = scopeChain(currentScope);
  let diffStart = 0;
  while (targetChain[diffStart] && currentChain[diffStart] && targetChain[diffStart] === currentChain[diffStart]) {
    diffStart++;
  }
  const pathUp = currentChain.slice(diffStart);
  const pathDown = targetChain.slice(diffStart);
  const commonScope = targetChain[diffStart - 1] ?? null;
  return { pathUp, pathDown, commonScope };
}

// node_modules/@typespec/asset-emitter/dist/src/reference-cycle.js
import { getTypeName } from "@typespec/compiler";
var ReferenceCycle = class {
  /**
   * If this cycle contains a declaration.
   */
  containsDeclaration;
  #entries;
  constructor(entries) {
    const firstDeclarationIndex = entries.findIndex((entry) => entry.entity.kind === "declaration");
    this.containsDeclaration = firstDeclarationIndex !== -1;
    this.#entries = this.containsDeclaration ? [...entries.slice(firstDeclarationIndex), ...entries.slice(0, firstDeclarationIndex)] : entries;
  }
  get first() {
    return this.#entries[0];
  }
  [Symbol.iterator]() {
    return this.#entries[Symbol.iterator]();
  }
  [Symbol.toStringTag]() {
    return [...this.#entries, this.#entries[0]].map((x) => getTypeName(x.type)).join(" -> ");
  }
  toString() {
    return this[Symbol.toStringTag]();
  }
};

// node_modules/@typespec/asset-emitter/dist/src/type-emitter.js
import { compilerAssert, emitFile, isTemplateDeclaration } from "@typespec/compiler";
var TypeEmitter = class {
  emitter;
  /**
   * @private
   *
   * Constructs a TypeEmitter. Do not use this constructor directly, instead
   * call `createAssetEmitter` on the emitter context object.
   * @param emitter The asset emitter
   */
  constructor(emitter) {
    this.emitter = emitter;
  }
  /**
   * Context shared by the entire program. In cases where you are emitting to a
   * single file, use this method to establish your main source file and set the
   * `scope` property to that source file's `globalScope`.
   * @param program
   * @returns Context
   */
  programContext(program) {
    return {};
  }
  /**
   * Emit a namespace
   *
   * @param namespace
   * @returns Emitter output
   */
  namespace(namespace2) {
    for (const ns of namespace2.namespaces.values()) {
      this.emitter.emitType(ns);
    }
    for (const model of namespace2.models.values()) {
      if (!isTemplateDeclaration(model)) {
        this.emitter.emitType(model);
      }
    }
    for (const operation of namespace2.operations.values()) {
      if (!isTemplateDeclaration(operation)) {
        this.emitter.emitType(operation);
      }
    }
    for (const enumeration of namespace2.enums.values()) {
      this.emitter.emitType(enumeration);
    }
    for (const union of namespace2.unions.values()) {
      if (!isTemplateDeclaration(union)) {
        this.emitter.emitType(union);
      }
    }
    for (const iface of namespace2.interfaces.values()) {
      if (!isTemplateDeclaration(iface)) {
        this.emitter.emitType(iface);
      }
    }
    for (const scalar of namespace2.scalars.values()) {
      this.emitter.emitType(scalar);
    }
    return this.emitter.result.none();
  }
  /**
   * Set lexical context for a namespace
   *
   * @param namespace
   */
  namespaceContext(namespace2) {
    return {};
  }
  /**
   * Set reference context for a namespace.
   *
   * @param namespace
   */
  namespaceReferenceContext(namespace2) {
    return {};
  }
  /**
   * Emit a model literal (e.g. as created by `{}` syntax in TypeSpec).
   *
   * @param model
   */
  modelLiteral(model) {
    if (model.baseModel) {
      this.emitter.emitType(model.baseModel);
    }
    this.emitter.emitModelProperties(model);
    return this.emitter.result.none();
  }
  /**
   * Set lexical context for a model literal.
   * @param model
   */
  modelLiteralContext(model) {
    return {};
  }
  /**
   * Set reference context for a model literal.
   * @param model
   */
  modelLiteralReferenceContext(model) {
    return {};
  }
  /**
   * Emit a model declaration (e.g. as created by `model Foo { }` syntax in
   * TypeSpec).
   *
   * @param model
   */
  modelDeclaration(model, name) {
    if (model.baseModel) {
      this.emitter.emitType(model.baseModel);
    }
    this.emitter.emitModelProperties(model);
    return this.emitter.result.none();
  }
  /**
   * Set lexical context for a model declaration.
   *
   * @param model
   * @param name the model's declaration name as retrieved from the
   * `declarationName` method.
   */
  modelDeclarationContext(model, name) {
    return {};
  }
  /**
   * Set reference context for a model declaration.
   * @param model
   */
  modelDeclarationReferenceContext(model, name) {
    return {};
  }
  /**
   * Emit a model instantiation (e.g. as created by `Box<string>` syntax in
   * TypeSpec). In some cases, `name` is undefined because a good name could
   * not be found for the instantiation. This often occurs with for instantiations
   * involving type expressions like `Box<string | int32>`.
   *
   * @param model
   * @param name The name of the instantiation as retrieved from the
   * `declarationName` method.
   */
  modelInstantiation(model, name) {
    if (model.baseModel) {
      this.emitter.emitType(model.baseModel);
    }
    this.emitter.emitModelProperties(model);
    return this.emitter.result.none();
  }
  /**
   * Set lexical context for a model instantiation.
   * @param model
   */
  modelInstantiationContext(model, name) {
    return {};
  }
  /**
   * Set reference context for a model declaration.
   * @param model
   */
  modelInstantiationReferenceContext(model, name) {
    return {};
  }
  /**
   * Emit a model's properties. Unless overridden, this method will emit each of
   * the model's properties and return a no emit result.
   *
   * @param model
   */
  modelProperties(model) {
    for (const prop of model.properties.values()) {
      this.emitter.emitModelProperty(prop);
    }
    return this.emitter.result.none();
  }
  modelPropertiesContext(model) {
    return {};
  }
  modelPropertiesReferenceContext(model) {
    return {};
  }
  /**
   * Emit a property of a model.
   *
   * @param property
   */
  modelPropertyLiteral(property) {
    this.emitter.emitTypeReference(property.type);
    return this.emitter.result.none();
  }
  /**
   * Set lexical context for a property of a model.
   *
   * @param property
   */
  modelPropertyLiteralContext(property) {
    return {};
  }
  /**
   * Set reference context for a property of a model.
   *
   * @param property
   */
  modelPropertyLiteralReferenceContext(property) {
    return {};
  }
  /**
   * Emit a model property reference (e.g. as created by the `SomeModel.prop`
   * syntax in TypeSpec). By default, this will emit the type of the referenced
   * property and return that result. In other words, the emit will look as if
   * `SomeModel.prop` were replaced with the type of `prop`.
   *
   * @param property
   */
  modelPropertyReference(property) {
    return this.emitter.emitTypeReference(property.type);
  }
  /**
   * Emit an enum member reference (e.g. as created by the `SomeEnum.member` syntax
   * in TypeSpec). By default, this will emit nothing.
   *
   * @param property the enum member
   */
  enumMemberReference(member) {
    return this.emitter.result.none();
  }
  arrayDeclaration(array, name, elementType) {
    this.emitter.emitType(array.indexer.value);
    return this.emitter.result.none();
  }
  arrayDeclarationContext(array, name, elementType) {
    return {};
  }
  arrayDeclarationReferenceContext(array, name, elementType) {
    return {};
  }
  arrayLiteral(array, elementType) {
    return this.emitter.result.none();
  }
  arrayLiteralContext(array, elementType) {
    return {};
  }
  arrayLiteralReferenceContext(array, elementType) {
    return {};
  }
  scalarDeclaration(scalar, name) {
    if (scalar.baseScalar) {
      this.emitter.emitType(scalar.baseScalar);
    }
    return this.emitter.result.none();
  }
  scalarDeclarationContext(scalar, name) {
    return {};
  }
  scalarDeclarationReferenceContext(scalar, name) {
    return {};
  }
  scalarInstantiation(scalar, name) {
    return this.emitter.result.none();
  }
  scalarInstantiationContext(scalar, name) {
    return {};
  }
  intrinsic(intrinsic, name) {
    return this.emitter.result.none();
  }
  intrinsicContext(intrinsic, name) {
    return {};
  }
  booleanLiteralContext(boolean) {
    return {};
  }
  booleanLiteral(boolean) {
    return this.emitter.result.none();
  }
  stringTemplateContext(string2) {
    return {};
  }
  stringTemplate(stringTemplate) {
    return this.emitter.result.none();
  }
  stringLiteralContext(string2) {
    return {};
  }
  stringLiteral(string2) {
    return this.emitter.result.none();
  }
  numericLiteralContext(number) {
    return {};
  }
  numericLiteral(number) {
    return this.emitter.result.none();
  }
  operationDeclaration(operation, name) {
    this.emitter.emitOperationParameters(operation);
    this.emitter.emitOperationReturnType(operation);
    return this.emitter.result.none();
  }
  operationDeclarationContext(operation, name) {
    return {};
  }
  operationDeclarationReferenceContext(operation, name) {
    return {};
  }
  interfaceDeclarationOperationsContext(iface) {
    return {};
  }
  interfaceDeclarationOperationsReferenceContext(iface) {
    return {};
  }
  interfaceOperationDeclarationContext(operation, name) {
    return {};
  }
  interfaceOperationDeclarationReferenceContext(operation, name) {
    return {};
  }
  operationParameters(operation, parameters) {
    return this.emitter.result.none();
  }
  operationParametersContext(operation, parameters) {
    return {};
  }
  operationParametersReferenceContext(operation, parameters) {
    return {};
  }
  operationReturnType(operation, returnType) {
    return this.emitter.result.none();
  }
  operationReturnTypeContext(operation, returnType) {
    return {};
  }
  operationReturnTypeReferenceContext(operation, returnType) {
    return {};
  }
  interfaceDeclaration(iface, name) {
    this.emitter.emitInterfaceOperations(iface);
    return this.emitter.result.none();
  }
  interfaceDeclarationContext(iface, name) {
    return {};
  }
  interfaceDeclarationReferenceContext(iface, name) {
    return {};
  }
  interfaceDeclarationOperations(iface) {
    for (const op of iface.operations.values()) {
      this.emitter.emitInterfaceOperation(op);
    }
    return this.emitter.result.none();
  }
  interfaceOperationDeclaration(operation, name) {
    this.emitter.emitOperationParameters(operation);
    this.emitter.emitOperationReturnType(operation);
    return this.emitter.result.none();
  }
  enumDeclaration(en, name) {
    this.emitter.emitEnumMembers(en);
    return this.emitter.result.none();
  }
  enumDeclarationContext(en, name) {
    return {};
  }
  enumDeclarationReferenceContext(en, name) {
    return {};
  }
  enumMembers(en) {
    for (const member of en.members.values()) {
      this.emitter.emitType(member);
    }
    return this.emitter.result.none();
  }
  enumMembersContext(en) {
    return {};
  }
  enumMember(member) {
    return this.emitter.result.none();
  }
  enumMemberContext(member) {
    return {};
  }
  unionDeclaration(union, name) {
    this.emitter.emitUnionVariants(union);
    return this.emitter.result.none();
  }
  unionDeclarationContext(union) {
    return {};
  }
  unionDeclarationReferenceContext(union) {
    return {};
  }
  unionInstantiation(union, name) {
    this.emitter.emitUnionVariants(union);
    return this.emitter.result.none();
  }
  unionInstantiationContext(union, name) {
    return {};
  }
  unionInstantiationReferenceContext(union, name) {
    return {};
  }
  unionLiteral(union) {
    this.emitter.emitUnionVariants(union);
    return this.emitter.result.none();
  }
  unionLiteralContext(union) {
    return {};
  }
  unionLiteralReferenceContext(union) {
    return {};
  }
  unionVariants(union) {
    for (const variant of union.variants.values()) {
      this.emitter.emitType(variant);
    }
    return this.emitter.result.none();
  }
  unionVariantsContext() {
    return {};
  }
  unionVariantsReferenceContext() {
    return {};
  }
  unionVariant(variant) {
    this.emitter.emitTypeReference(variant.type);
    return this.emitter.result.none();
  }
  unionVariantContext(union) {
    return {};
  }
  unionVariantReferenceContext(union) {
    return {};
  }
  tupleLiteral(tuple) {
    this.emitter.emitTupleLiteralValues(tuple);
    return this.emitter.result.none();
  }
  tupleLiteralContext(tuple) {
    return {};
  }
  tupleLiteralValues(tuple) {
    for (const value of tuple.values.values()) {
      this.emitter.emitTypeReference(value);
    }
    return this.emitter.result.none();
  }
  tupleLiteralValuesContext(tuple) {
    return {};
  }
  tupleLiteralValuesReferenceContext(tuple) {
    return {};
  }
  tupleLiteralReferenceContext(tuple) {
    return {};
  }
  sourceFile(sourceFile) {
    const emittedSourceFile = {
      path: sourceFile.path,
      contents: ""
    };
    for (const decl of sourceFile.globalScope.declarations) {
      emittedSourceFile.contents += decl.value + "\n";
    }
    return emittedSourceFile;
  }
  async writeOutput(sourceFiles) {
    for (const file of sourceFiles) {
      const outputFile = await this.emitter.emitSourceFile(file);
      await emitFile(this.emitter.getProgram(), {
        path: outputFile.path,
        content: outputFile.contents
      });
    }
  }
  reference(targetDeclaration, pathUp, pathDown, commonScope) {
    return this.emitter.result.none();
  }
  /**
   * Handle circular references. When this method is called it means we are resolving a circular reference.
   * By default if the target is a declaration it will call to {@link reference} otherwise it means we have an inline reference
   * @param target Reference target.
   * @param scope Current scope.
   * @returns Resolved reference entity.
   */
  circularReference(target, scope, cycle) {
    if (!cycle.containsDeclaration) {
      throw new Error(`Circular references to non-declarations are not supported by this emitter. Cycle:
${cycle}`);
    }
    if (target.kind !== "declaration") {
      return target;
    }
    compilerAssert(scope, "Emit context must have a scope set in order to create references to declarations.");
    const { pathUp, pathDown, commonScope } = resolveDeclarationReferenceScope(target, scope);
    return this.reference(target, pathUp, pathDown, commonScope);
  }
  declarationName(declarationType) {
    compilerAssert(declarationType.name !== void 0, "Can't emit a declaration that doesn't have a name.");
    if (declarationType.kind === "Enum" || declarationType.kind === "Intrinsic") {
      return declarationType.name;
    }
    if (declarationType.kind === "Operation" && declarationType.interface) {
      return declarationType.name;
    }
    if (!declarationType.templateMapper) {
      return declarationType.name;
    }
    let unspeakable = false;
    const parameterNames = declarationType.templateMapper.args.map((t) => {
      if (t.entityKind === "Indeterminate") {
        t = t.type;
      }
      if (!("kind" in t)) {
        return void 0;
      }
      switch (t.kind) {
        case "Model":
        case "Scalar":
        case "Interface":
        case "Operation":
        case "Enum":
        case "Union":
        case "Intrinsic":
          if (!t.name) {
            unspeakable = true;
            return void 0;
          }
          const declName = this.emitter.emitDeclarationName(t);
          if (declName === void 0) {
            unspeakable = true;
            return void 0;
          }
          return declName[0].toUpperCase() + declName.slice(1);
        default:
          unspeakable = true;
          return void 0;
      }
    });
    if (unspeakable) {
      return void 0;
    }
    return declarationType.name + parameterNames.join("");
  }
};

// node_modules/@typespec/asset-emitter/dist/src/types.js
var EmitterResult = class {
};
var Declaration = class extends EmitterResult {
  name;
  scope;
  value;
  kind = "declaration";
  meta = {};
  constructor(name, scope, value) {
    if (value instanceof Placeholder) {
      value.onValue((v) => this.value = v);
    }
    super();
    this.name = name;
    this.scope = scope;
    this.value = value;
  }
};
var RawCode = class extends EmitterResult {
  value;
  kind = "code";
  constructor(value) {
    if (value instanceof Placeholder) {
      value.onValue((v) => this.value = v);
    }
    super();
    this.value = value;
  }
};
var NoEmit = class extends EmitterResult {
  kind = "none";
};
var CircularEmit = class extends EmitterResult {
  emitEntityKey;
  kind = "circular";
  constructor(emitEntityKey) {
    super();
    this.emitEntityKey = emitEntityKey;
  }
};

// node_modules/@typespec/asset-emitter/dist/src/asset-emitter.js
function createAssetEmitter(program, TypeEmitterClass, emitContext) {
  const sourceFiles = [];
  const options = {
    noEmit: program.compilerOptions.dryRun ?? false,
    emitterOutputDir: emitContext.emitterOutputDir,
    ...emitContext.options
  };
  const typeId = CustomKeyMap.objectKeyer();
  const contextId = CustomKeyMap.objectKeyer();
  const entryId = CustomKeyMap.objectKeyer();
  const typeToEmitEntity = new CustomKeyMap(([method, type, context2]) => {
    return `${method}-${typeId.getKey(type)}-${contextId.getKey(context2)}`;
  });
  const waitingCircularRefs = new CustomKeyMap(([method, type, context2]) => {
    return `${method}-${typeId.getKey(type)}-${contextId.getKey(context2)}`;
  });
  const knownContexts = new CustomKeyMap(([entry, context2]) => {
    return `${entryId.getKey(entry)}-${contextId.getKey(context2)}`;
  });
  let lexicalTypeStack = [];
  let referenceTypeChain = [];
  let context = {
    lexicalContext: {},
    referenceContext: {}
  };
  let programContext = null;
  let incomingReferenceContext = null;
  let incomingReferenceContextTarget = null;
  const stateInterner = createInterner();
  const stackEntryInterner = createInterner();
  const assetEmitter = {
    getContext() {
      return {
        ...context.lexicalContext,
        ...context.referenceContext
      };
    },
    getOptions() {
      return options;
    },
    getProgram() {
      return program;
    },
    result: {
      declaration(name, value) {
        const scope = currentScope();
        compilerAssert2(scope, "Emit context must have a scope set in order to create declarations. Consider setting scope to a new source file's global scope in the `programContext` method of `TypeEmitter`.");
        return new Declaration(name, scope, value);
      },
      rawCode(value) {
        return new RawCode(value);
      },
      none() {
        return new NoEmit();
      }
    },
    createScope(block, name, parentScope = null) {
      let newScope;
      if (!parentScope) {
        newScope = {
          kind: "sourceFile",
          name,
          sourceFile: block,
          parentScope,
          childScopes: [],
          declarations: []
        };
      } else {
        newScope = {
          kind: "namespace",
          name,
          namespace: block,
          childScopes: [],
          declarations: [],
          parentScope
        };
      }
      parentScope?.childScopes.push(newScope);
      return newScope;
    },
    createSourceFile(path) {
      const basePath = options.emitterOutputDir;
      const sourceFile = {
        globalScope: void 0,
        path: joinPaths(basePath, resolveContainedPath(path)),
        imports: /* @__PURE__ */ new Map(),
        meta: {}
      };
      sourceFile.globalScope = this.createScope(sourceFile, "");
      sourceFiles.push(sourceFile);
      return sourceFile;
    },
    emitTypeReference(target, options2) {
      return withPatchedReferenceContext(options2?.referenceContext, () => {
        const oldIncomingReferenceContext = incomingReferenceContext;
        const oldIncomingReferenceContextTarget = incomingReferenceContextTarget;
        incomingReferenceContext = context.referenceContext ?? null;
        incomingReferenceContextTarget = incomingReferenceContext ? target : null;
        let result;
        if (target.kind === "ModelProperty") {
          result = invokeTypeEmitter("modelPropertyReference", target);
        } else if (target.kind === "EnumMember") {
          result = invokeTypeEmitter("enumMemberReference", target);
        }
        if (result) {
          incomingReferenceContext = oldIncomingReferenceContext;
          incomingReferenceContextTarget = oldIncomingReferenceContextTarget;
          return result;
        }
        const entity = this.emitType(target);
        incomingReferenceContext = oldIncomingReferenceContext;
        incomingReferenceContextTarget = oldIncomingReferenceContextTarget;
        let placeholder = null;
        if (entity.kind === "circular") {
          let waiting = waitingCircularRefs.get(entity.emitEntityKey);
          if (!waiting) {
            waiting = [];
            waitingCircularRefs.set(entity.emitEntityKey, waiting);
          }
          const typeChainSnapshot = referenceTypeChain;
          waiting.push({
            state: {
              lexicalTypeStack,
              context
            },
            cb: (resolvedEntity) => invokeReference(this, resolvedEntity, true, resolveReferenceCycle(typeChainSnapshot, entity, typeToEmitEntity))
          });
          placeholder = new Placeholder();
          return this.result.rawCode(placeholder);
        } else {
          return invokeReference(this, entity, false);
        }
        function invokeReference(assetEmitter2, entity2, circular, cycle) {
          let ref;
          const scope = currentScope();
          if (circular) {
            ref = typeEmitter.circularReference(entity2, scope, cycle);
          } else {
            if (entity2.kind !== "declaration") {
              return entity2;
            }
            compilerAssert2(scope, "Emit context must have a scope set in order to create references to declarations.");
            const { pathUp, pathDown, commonScope } = resolveDeclarationReferenceScope(entity2, scope);
            ref = typeEmitter.reference(entity2, pathUp, pathDown, commonScope);
          }
          if (!(ref instanceof EmitterResult)) {
            ref = assetEmitter2.result.rawCode(ref);
          }
          if (placeholder) {
            compilerAssert2(ref.kind !== "circular", "TypeEmitter `reference` returned circular emit");
            compilerAssert2(ref.kind === "none" || !(ref.value instanceof Placeholder), "TypeEmitter's `reference` method cannot return a placeholder.");
            switch (ref.kind) {
              case "code":
              case "declaration":
                placeholder.setValue(ref.value);
                break;
              case "none":
                placeholder.setValue("");
                break;
            }
          }
          return ref;
        }
      });
    },
    emitDeclarationName(type) {
      return typeEmitter.declarationName(type);
    },
    async writeOutput() {
      return typeEmitter.writeOutput(sourceFiles);
    },
    getSourceFiles() {
      return sourceFiles;
    },
    emitType(type, context2) {
      if (context2?.referenceContext) {
        incomingReferenceContext = context2?.referenceContext ?? incomingReferenceContext;
        incomingReferenceContextTarget = type ?? incomingReferenceContextTarget;
      }
      const declName = isDeclaration(type) && type.kind !== "Namespace" ? typeEmitter.declarationName(type) : null;
      const key = typeEmitterKey(type);
      let args;
      switch (key) {
        case "scalarDeclaration":
        case "scalarInstantiation":
        case "modelDeclaration":
        case "modelInstantiation":
        case "operationDeclaration":
        case "interfaceDeclaration":
        case "interfaceOperationDeclaration":
        case "enumDeclaration":
        case "unionDeclaration":
        case "unionInstantiation":
          args = [declName];
          break;
        case "arrayDeclaration":
          const arrayDeclElement = type.indexer.value;
          args = [declName, arrayDeclElement];
          break;
        case "arrayLiteral":
          const arrayLiteralElement = type.indexer.value;
          args = [arrayLiteralElement];
          break;
        case "intrinsic":
          args = [declName];
          break;
        default:
          args = [];
      }
      const result = invokeTypeEmitter(key, type, ...args);
      return result;
    },
    emitProgram(options2) {
      const namespace2 = program.getGlobalNamespaceType();
      if (options2?.emitGlobalNamespace) {
        this.emitType(namespace2);
        return;
      }
      for (const ns of namespace2.namespaces.values()) {
        if (ns.name === "TypeSpec" && !options2?.emitTypeSpecNamespace)
          continue;
        this.emitType(ns);
      }
      for (const model of namespace2.models.values()) {
        if (!isTemplateDeclaration2(model)) {
          this.emitType(model);
        }
      }
      for (const operation of namespace2.operations.values()) {
        if (!isTemplateDeclaration2(operation)) {
          this.emitType(operation);
        }
      }
      for (const enumeration of namespace2.enums.values()) {
        this.emitType(enumeration);
      }
      for (const union of namespace2.unions.values()) {
        if (!isTemplateDeclaration2(union)) {
          this.emitType(union);
        }
      }
      for (const iface of namespace2.interfaces.values()) {
        if (!isTemplateDeclaration2(iface)) {
          this.emitType(iface);
        }
      }
      for (const scalar of namespace2.scalars.values()) {
        this.emitType(scalar);
      }
    },
    emitModelProperties(model) {
      const res = invokeTypeEmitter("modelProperties", model);
      if (res instanceof EmitterResult) {
        return res;
      } else {
        return this.result.rawCode(res);
      }
    },
    emitModelProperty(property) {
      return invokeTypeEmitter("modelPropertyLiteral", property);
    },
    emitOperationParameters(operation) {
      return invokeTypeEmitter("operationParameters", operation, operation.parameters);
    },
    emitOperationReturnType(operation) {
      return invokeTypeEmitter("operationReturnType", operation, operation.returnType);
    },
    emitInterfaceOperations(iface) {
      return invokeTypeEmitter("interfaceDeclarationOperations", iface);
    },
    emitInterfaceOperation(operation) {
      const name = typeEmitter.declarationName(operation);
      if (name === void 0) {
        compilerAssert2(false, "Unnamed operations are not supported");
      }
      return invokeTypeEmitter("interfaceOperationDeclaration", operation, name);
    },
    emitEnumMembers(en) {
      return invokeTypeEmitter("enumMembers", en);
    },
    emitUnionVariants(union) {
      return invokeTypeEmitter("unionVariants", union);
    },
    emitTupleLiteralValues(tuple) {
      return invokeTypeEmitter("tupleLiteralValues", tuple);
    },
    async emitSourceFile(sourceFile) {
      return await typeEmitter.sourceFile(sourceFile);
    }
  };
  const typeEmitter = new TypeEmitterClass(assetEmitter);
  return assetEmitter;
  function invokeTypeEmitter(method, ...args) {
    const type = args[0];
    let entity;
    let emitEntityKey;
    let cached = false;
    withTypeContext(method, args, () => {
      emitEntityKey = [method, type, context];
      const seenEmitEntity = typeToEmitEntity.get(emitEntityKey);
      if (seenEmitEntity) {
        entity = seenEmitEntity;
        cached = true;
        return;
      }
      typeToEmitEntity.set(emitEntityKey, new CircularEmit(emitEntityKey));
      compilerAssert2(typeEmitter[method], `TypeEmitter doesn't have a method named ${method}.`);
      entity = liftToRawCode(typeEmitter[method](...args));
    });
    if (cached) {
      return entity;
    }
    if (entity instanceof Placeholder) {
      entity.onValue((v) => handleCompletedEntity(v));
      return entity;
    }
    handleCompletedEntity(entity);
    return entity;
    function handleCompletedEntity(entity2) {
      typeToEmitEntity.set(emitEntityKey, entity2);
      const waitingRefCbs = waitingCircularRefs.get(emitEntityKey);
      if (waitingRefCbs) {
        for (const record of waitingRefCbs) {
          withContext(record.state, () => {
            record.cb(entity2);
          });
        }
        waitingCircularRefs.set(emitEntityKey, []);
      }
      if (entity2.kind === "declaration") {
        entity2.scope.declarations.push(entity2);
      }
    }
    function liftToRawCode(value) {
      if (value instanceof EmitterResult) {
        return value;
      }
      return assetEmitter.result.rawCode(value);
    }
  }
  function isInternalMethod(method) {
    return method === "interfaceDeclarationOperations" || method === "interfaceOperationDeclaration" || method === "operationParameters" || method === "operationReturnType" || method === "modelProperties" || method === "enumMembers" || method === "tupleLiteralValues" || method === "unionVariants";
  }
  function setContextForType(method, args) {
    const type = args[0];
    let newTypeStack;
    const isUnspeakableInstantiation = (method === "modelInstantiation" || method === "unionInstantiation") && args[1] === void 0;
    if (isDeclaration(type) && type.kind !== "Intrinsic" && !isInternalMethod(method) && !isUnspeakableInstantiation) {
      newTypeStack = [stackEntryInterner.intern({ method, args: stackEntryInterner.intern(args) })];
      let ns = type.namespace;
      while (ns) {
        if (ns.name === "")
          break;
        newTypeStack.unshift(stackEntryInterner.intern({ method: "namespace", args: stackEntryInterner.intern([ns]) }));
        ns = ns.namespace;
      }
    } else {
      newTypeStack = [
        ...lexicalTypeStack,
        stackEntryInterner.intern({ method, args: stackEntryInterner.intern(args) })
      ];
    }
    lexicalTypeStack = newTypeStack;
    if (!programContext) {
      programContext = stateInterner.intern({
        lexicalContext: typeEmitter.programContext(program),
        referenceContext: stateInterner.intern({})
      });
    }
    context = programContext;
    for (const entry of lexicalTypeStack) {
      if (incomingReferenceContext && entry.args[0] === incomingReferenceContextTarget) {
        context = stateInterner.intern({
          lexicalContext: context.lexicalContext,
          referenceContext: stateInterner.intern({
            ...context.referenceContext,
            ...incomingReferenceContext
          })
        });
      }
      const seenContext = knownContexts.get([entry, context]);
      if (seenContext) {
        context = seenContext;
        continue;
      }
      const lexicalKey = entry.method + "Context";
      const referenceKey = entry.method + "ReferenceContext";
      if (keyHasContext(entry.method)) {
        compilerAssert2(typeEmitter[lexicalKey], `TypeEmitter doesn't have a method named ${lexicalKey}`);
      }
      if (keyHasReferenceContext(entry.method)) {
        compilerAssert2(typeEmitter[referenceKey], `TypeEmitter doesn't have a method named ${referenceKey}`);
      }
      const newContext = keyHasContext(entry.method) ? typeEmitter[lexicalKey](...entry.args) : {};
      const newReferenceContext = keyHasReferenceContext(entry.method) ? typeEmitter[referenceKey](...entry.args) : {};
      const newContextState = stateInterner.intern({
        lexicalContext: stateInterner.intern({
          ...context.lexicalContext,
          ...newContext
        }),
        referenceContext: stateInterner.intern({
          ...context.referenceContext,
          ...newReferenceContext
        })
      });
      knownContexts.set([entry, context], newContextState);
      context = newContextState;
    }
    if (!isInternalMethod(method)) {
      referenceTypeChain = [
        ...referenceTypeChain,
        stackEntryInterner.intern({
          method,
          type,
          context
        })
      ];
    }
  }
  function withTypeContext(method, args, cb) {
    const oldContext = context;
    const oldTypeStack = lexicalTypeStack;
    const oldRefTypeStack = referenceTypeChain;
    setContextForType(method, args);
    cb();
    context = oldContext;
    lexicalTypeStack = oldTypeStack;
    referenceTypeChain = oldRefTypeStack;
  }
  function withPatchedReferenceContext(referenceContext, cb) {
    if (referenceContext !== void 0) {
      const oldContext = context;
      context = stateInterner.intern({
        lexicalContext: context.lexicalContext,
        referenceContext: stateInterner.intern({
          ...context.referenceContext,
          ...referenceContext
        })
      });
      const result = cb();
      context = oldContext;
      return result;
    } else {
      return cb();
    }
  }
  function withContext(newContext, cb) {
    const oldContext = context;
    const oldTypeStack = lexicalTypeStack;
    context = newContext.context;
    lexicalTypeStack = newContext.lexicalTypeStack;
    cb();
    context = oldContext;
    lexicalTypeStack = oldTypeStack;
  }
  function typeEmitterKey(type) {
    switch (type.kind) {
      case "Model":
        if ($(program).array.is(type) && type.name === "Array") {
          return "arrayLiteral";
        }
        if (type.name === "") {
          return "modelLiteral";
        }
        if (type.templateMapper) {
          return "modelInstantiation";
        }
        if (type.indexer && type.indexer.key.name === "integer") {
          return "arrayDeclaration";
        }
        return "modelDeclaration";
      case "Namespace":
        return "namespace";
      case "ModelProperty":
        return "modelPropertyLiteral";
      case "StringTemplate":
        return "stringTemplate";
      case "Boolean":
        return "booleanLiteral";
      case "String":
        return "stringLiteral";
      case "Number":
        return "numericLiteral";
      case "Operation":
        if (type.interface) {
          return "interfaceOperationDeclaration";
        } else {
          return "operationDeclaration";
        }
      case "Interface":
        return "interfaceDeclaration";
      case "Enum":
        return "enumDeclaration";
      case "EnumMember":
        return "enumMember";
      case "Union":
        if (!type.name) {
          return "unionLiteral";
        }
        if (type.templateMapper) {
          return "unionInstantiation";
        }
        return "unionDeclaration";
      case "UnionVariant":
        return "unionVariant";
      case "Tuple":
        return "tupleLiteral";
      case "Scalar":
        if (type.templateMapper) {
          return "scalarInstantiation";
        } else {
          return "scalarDeclaration";
        }
      case "Intrinsic":
        return "intrinsic";
      default:
        compilerAssert2(false, `Encountered type ${type.kind} which we don't know how to emit.`);
    }
  }
  function currentScope() {
    return context.referenceContext?.scope ?? context.lexicalContext?.scope ?? null;
  }
}
function isDeclaration(type) {
  switch (type.kind) {
    case "Namespace":
    case "Interface":
    case "Enum":
    case "Operation":
    case "Scalar":
    case "Intrinsic":
      return true;
    case "Model":
      return type.name ? type.name !== "" && type.name !== "Array" : false;
    case "Union":
      return type.name ? type.name !== "" : false;
    default:
      return false;
  }
}
function createInterner() {
  const emptyObject = {};
  const root = /* @__PURE__ */ new Map();
  function intern(object) {
    if (object === null || typeof object !== "object")
      return object;
    const keys = Object.keys(object);
    if (keys.length === 0)
      return emptyObject;
    let node = root.get(keys.length);
    if (!node) {
      node = /* @__PURE__ */ new Map();
      root.set(keys.length, node);
    }
    const sortedKeys = keys.sort();
    let curr = node;
    for (const key of sortedKeys) {
      if (!curr.has(key))
        curr.set(key, /* @__PURE__ */ new Map());
      curr = curr.get(key);
    }
    let valueNode = curr.valueNode;
    if (!valueNode) {
      valueNode = /* @__PURE__ */ new Map();
      curr.valueNode = valueNode;
    }
    const values = sortedKeys.map((k) => object[k]);
    let leaf = valueNode;
    for (let i = 0; i < values.length; i++) {
      const v = values[i];
      const isObj = v && typeof v === "object";
      let next;
      if (isObj) {
        if (!leaf.has("obj"))
          leaf.set("obj", /* @__PURE__ */ new WeakMap());
        next = leaf.get("obj");
        if (!next.has(v))
          next.set(v, /* @__PURE__ */ new Map());
        next = next.get(v);
      } else {
        if (!leaf.has("prim"))
          leaf.set("prim", /* @__PURE__ */ new Map());
        next = leaf.get("prim");
        if (!next.has(v))
          next.set(v, /* @__PURE__ */ new Map());
        next = next.get(v);
      }
      leaf = next;
    }
    if (leaf.has("interned")) {
      return leaf.get("interned");
    }
    leaf.set("interned", object);
    return object;
  }
  return { intern };
}
var noContext = /* @__PURE__ */ new Set(["modelPropertyReference", "enumMemberReference"]);
function keyHasContext(key) {
  return !noContext.has(key);
}
var noReferenceContext = /* @__PURE__ */ new Set([
  ...noContext,
  "booleanLiteral",
  "stringTemplate",
  "stringLiteral",
  "numericLiteral",
  "scalarInstantiation",
  "enumMember",
  "enumMembers",
  "intrinsic"
]);
function keyHasReferenceContext(key) {
  return !noReferenceContext.has(key);
}
function resolveReferenceCycle(stack, entity, typeToEmitEntity) {
  for (let i = stack.length - 1; i >= 0; i--) {
    if (stack[i].type === entity.emitEntityKey[1]) {
      return new ReferenceCycle(stack.slice(i).map((x) => {
        return {
          type: x.type,
          entity: typeToEmitEntity.get([x.method, x.type, x.context])
        };
      }));
    }
  }
  throw new Error(`Couldn't resolve the circular reference stack for ${getTypeName2(entity.emitEntityKey[1])}`);
}
function resolveContainedPath(path) {
  return path.split(/[/\\]/).filter((segment) => segment !== "" && segment !== "." && segment !== "..").map(sanitizePathSegment).join("/");
}

// node_modules/@typespec/asset-emitter/dist/src/builders/array-builder.js
import { compilerAssert as compilerAssert3 } from "@typespec/compiler";
var ArrayBuilder = class extends Array {
  #setPlaceholderValue(p, value) {
    for (const [i, item] of this.entries()) {
      if (item === p) {
        this[i] = value;
      }
    }
  }
  push(...values) {
    for (const v of values) {
      let toPush;
      if (v instanceof EmitterResult) {
        compilerAssert3(v.kind !== "circular", "Can't push a circular emit result.");
        if (v.kind === "none") {
          toPush = void 0;
        } else {
          toPush = v.value;
        }
      } else {
        toPush = v;
      }
      if (toPush instanceof Placeholder) {
        toPush.onValue((v2) => this.#setPlaceholderValue(toPush, v2));
      }
      super.push(toPush);
    }
    return values.length;
  }
};

// node_modules/@typespec/asset-emitter/dist/src/builders/object-builder.js
import { compilerAssert as compilerAssert4 } from "@typespec/compiler";
var placeholderSym = /* @__PURE__ */ Symbol("placeholder");
var setSym = /* @__PURE__ */ Symbol("ObjectBuilder.set");
var ObjectBuilder = class _ObjectBuilder {
  static SET = setSym;
  [placeholderSym];
  constructor(initializer = {}) {
    const copyProperties = (source) => {
      for (const [key, value] of Object.entries(source)) {
        this[setSym](key, value);
      }
    };
    const registerPlaceholder = (placeholder) => {
      placeholder.onValue(copyProperties);
    };
    if (initializer instanceof _ObjectBuilder) {
      if (initializer[placeholderSym]) {
        this[placeholderSym] = initializer[placeholderSym];
        registerPlaceholder(initializer[placeholderSym]);
      }
      copyProperties(initializer);
    } else if (initializer instanceof Placeholder) {
      this[placeholderSym] = initializer;
      registerPlaceholder(initializer);
    } else {
      copyProperties(initializer);
    }
  }
  /** @deprecated Use setProperty(builder, key, value) */
  set(key, v) {
    this[setSym](key, v);
  }
  [setSym](key, v) {
    let value = v;
    if (v instanceof EmitterResult) {
      compilerAssert4(v.kind !== "circular", "Can't set a circular emit result.");
      if (v.kind === "none") {
        this[key] = void 0;
        return;
      } else {
        value = v.value;
      }
    }
    if (value instanceof Placeholder) {
      value.onValue((v2) => {
        this[key] = v2;
      });
    }
    this[key] = value;
  }
};
function setProperty(builder, key, value) {
  builder[setSym](key, value);
}

// node_modules/@typespec/json-schema/dist/src/json-schema-emitter.js
import { compilerAssert as compilerAssert5, emitFile as emitFile2, explainStringTemplateNotSerializable, getDeprecated, getDirectoryPath, getDiscriminator, getDoc, getExamples, getFormat, getMaxItems, getMaxLength, getMaxValue, getMaxValueExclusive, getMinItems, getMinLength, getMinValue, getMinValueExclusive, getPattern, getRelativePathFromDirectory, getSummary, isStringType, isType, joinPaths as joinPaths2, sanitizePathSegment as sanitizePathSegment2, serializeValueAsJson } from "@typespec/compiler";
import { DuplicateTracker } from "@typespec/compiler/utils";

// node_modules/yaml/browser/dist/nodes/identity.js
var ALIAS = /* @__PURE__ */ Symbol.for("yaml.alias");
var DOC = /* @__PURE__ */ Symbol.for("yaml.document");
var MAP = /* @__PURE__ */ Symbol.for("yaml.map");
var PAIR = /* @__PURE__ */ Symbol.for("yaml.pair");
var SCALAR = /* @__PURE__ */ Symbol.for("yaml.scalar");
var SEQ = /* @__PURE__ */ Symbol.for("yaml.seq");
var NODE_TYPE = /* @__PURE__ */ Symbol.for("yaml.node.type");
var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
function isCollection(node) {
  if (node && typeof node === "object")
    switch (node[NODE_TYPE]) {
      case MAP:
      case SEQ:
        return true;
    }
  return false;
}
function isNode(node) {
  if (node && typeof node === "object")
    switch (node[NODE_TYPE]) {
      case ALIAS:
      case MAP:
      case SCALAR:
      case SEQ:
        return true;
    }
  return false;
}
var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;

// node_modules/yaml/browser/dist/visit.js
var BREAK = /* @__PURE__ */ Symbol("break visit");
var SKIP = /* @__PURE__ */ Symbol("skip children");
var REMOVE = /* @__PURE__ */ Symbol("remove node");
function visit(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
    if (cd === REMOVE)
      node.contents = null;
  } else
    visit_(null, node, visitor_, Object.freeze([]));
}
visit.BREAK = BREAK;
visit.SKIP = SKIP;
visit.REMOVE = REMOVE;
function visit_(key, node, visitor, path) {
  const ctrl = callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visit_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = visit_(i, node.items[i], visitor, path);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK)
          return BREAK;
        else if (ci === REMOVE) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = visit_("key", node.key, visitor, path);
      if (ck === BREAK)
        return BREAK;
      else if (ck === REMOVE)
        node.key = null;
      const cv = visit_("value", node.value, visitor, path);
      if (cv === BREAK)
        return BREAK;
      else if (cv === REMOVE)
        node.value = null;
    }
  }
  return ctrl;
}
async function visitAsync(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
    if (cd === REMOVE)
      node.contents = null;
  } else
    await visitAsync_(null, node, visitor_, Object.freeze([]));
}
visitAsync.BREAK = BREAK;
visitAsync.SKIP = SKIP;
visitAsync.REMOVE = REMOVE;
async function visitAsync_(key, node, visitor, path) {
  const ctrl = await callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visitAsync_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = await visitAsync_(i, node.items[i], visitor, path);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK)
          return BREAK;
        else if (ci === REMOVE) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = await visitAsync_("key", node.key, visitor, path);
      if (ck === BREAK)
        return BREAK;
      else if (ck === REMOVE)
        node.key = null;
      const cv = await visitAsync_("value", node.value, visitor, path);
      if (cv === BREAK)
        return BREAK;
      else if (cv === REMOVE)
        node.value = null;
    }
  }
  return ctrl;
}
function initVisitor(visitor) {
  if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
    return Object.assign({
      Alias: visitor.Node,
      Map: visitor.Node,
      Scalar: visitor.Node,
      Seq: visitor.Node
    }, visitor.Value && {
      Map: visitor.Value,
      Scalar: visitor.Value,
      Seq: visitor.Value
    }, visitor.Collection && {
      Map: visitor.Collection,
      Seq: visitor.Collection
    }, visitor);
  }
  return visitor;
}
function callVisitor(key, node, visitor, path) {
  if (typeof visitor === "function")
    return visitor(key, node, path);
  if (isMap(node))
    return visitor.Map?.(key, node, path);
  if (isSeq(node))
    return visitor.Seq?.(key, node, path);
  if (isPair(node))
    return visitor.Pair?.(key, node, path);
  if (isScalar(node))
    return visitor.Scalar?.(key, node, path);
  if (isAlias(node))
    return visitor.Alias?.(key, node, path);
  return void 0;
}
function replaceNode(key, path, node) {
  const parent = path[path.length - 1];
  if (isCollection(parent)) {
    parent.items[key] = node;
  } else if (isPair(parent)) {
    if (key === "key")
      parent.key = node;
    else
      parent.value = node;
  } else if (isDocument(parent)) {
    parent.contents = node;
  } else {
    const pt = isAlias(parent) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${pt} parent`);
  }
}

// node_modules/yaml/browser/dist/doc/directives.js
var escapeChars = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
};
var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
var Directives = class _Directives {
  constructor(yaml, tags) {
    this.docStart = null;
    this.docEnd = false;
    this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
    this.tags = Object.assign({}, _Directives.defaultTags, tags);
  }
  clone() {
    const copy = new _Directives(this.yaml, this.tags);
    copy.docStart = this.docStart;
    return copy;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const res = new _Directives(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = true;
        break;
      case "1.2":
        this.atNextDocument = false;
        this.yaml = {
          explicit: _Directives.defaultYaml.explicit,
          version: "1.2"
        };
        this.tags = Object.assign({}, _Directives.defaultTags);
        break;
    }
    return res;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(line, onError) {
    if (this.atNextDocument) {
      this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
      this.tags = Object.assign({}, _Directives.defaultTags);
      this.atNextDocument = false;
    }
    const parts = line.trim().split(/[ \t]+/);
    const name = parts.shift();
    switch (name) {
      case "%TAG": {
        if (parts.length !== 2) {
          onError(0, "%TAG directive should contain exactly two parts");
          if (parts.length < 2)
            return false;
        }
        const [handle, prefix] = parts;
        this.tags[handle] = prefix;
        return true;
      }
      case "%YAML": {
        this.yaml.explicit = true;
        if (parts.length !== 1) {
          onError(0, "%YAML directive should contain exactly one part");
          return false;
        }
        const [version] = parts;
        if (version === "1.1" || version === "1.2") {
          this.yaml.version = version;
          return true;
        } else {
          const isValid = /^\d+\.\d+$/.test(version);
          onError(6, `Unsupported YAML version ${version}`, isValid);
          return false;
        }
      }
      default:
        onError(0, `Unknown directive ${name}`, true);
        return false;
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(source, onError) {
    if (source === "!")
      return "!";
    if (source[0] !== "!") {
      onError(`Not a valid tag: ${source}`);
      return null;
    }
    if (source[1] === "<") {
      const verbatim = source.slice(2, -1);
      if (verbatim === "!" || verbatim === "!!") {
        onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
        return null;
      }
      if (source[source.length - 1] !== ">")
        onError("Verbatim tags must end with a >");
      return verbatim;
    }
    const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
    if (!suffix)
      onError(`The ${source} tag has no suffix`);
    const prefix = this.tags[handle];
    if (prefix) {
      try {
        return prefix + decodeURIComponent(suffix);
      } catch (error) {
        onError(String(error));
        return null;
      }
    }
    if (handle === "!")
      return source;
    onError(`Could not resolve tag: ${source}`);
    return null;
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(tag) {
    for (const [handle, prefix] of Object.entries(this.tags)) {
      if (tag.startsWith(prefix))
        return handle + escapeTagName(tag.substring(prefix.length));
    }
    return tag[0] === "!" ? tag : `!<${tag}>`;
  }
  toString(doc) {
    const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
    const tagEntries = Object.entries(this.tags);
    let tagNames;
    if (doc && tagEntries.length > 0 && isNode(doc.contents)) {
      const tags = {};
      visit(doc.contents, (_key, node) => {
        if (isNode(node) && node.tag)
          tags[node.tag] = true;
      });
      tagNames = Object.keys(tags);
    } else
      tagNames = [];
    for (const [handle, prefix] of tagEntries) {
      if (handle === "!!" && prefix === "tag:yaml.org,2002:")
        continue;
      if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
        lines.push(`%TAG ${handle} ${prefix}`);
    }
    return lines.join("\n");
  }
};
Directives.defaultYaml = { explicit: false, version: "1.2" };
Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };

// node_modules/yaml/browser/dist/doc/anchors.js
function anchorIsValid(anchor) {
  if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
    const sa = JSON.stringify(anchor);
    const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
    throw new Error(msg);
  }
  return true;
}
function anchorNames(root) {
  const anchors = /* @__PURE__ */ new Set();
  visit(root, {
    Value(_key, node) {
      if (node.anchor)
        anchors.add(node.anchor);
    }
  });
  return anchors;
}
function findNewAnchor(prefix, exclude) {
  for (let i = 1; true; ++i) {
    const name = `${prefix}${i}`;
    if (!exclude.has(name))
      return name;
  }
}
function createNodeAnchors(doc, prefix) {
  const aliasObjects = [];
  const sourceObjects = /* @__PURE__ */ new Map();
  let prevAnchors = null;
  return {
    onAnchor: (source) => {
      aliasObjects.push(source);
      prevAnchors ?? (prevAnchors = anchorNames(doc));
      const anchor = findNewAnchor(prefix, prevAnchors);
      prevAnchors.add(anchor);
      return anchor;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const source of aliasObjects) {
        const ref = sourceObjects.get(source);
        if (typeof ref === "object" && ref.anchor && (isScalar(ref.node) || isCollection(ref.node))) {
          ref.node.anchor = ref.anchor;
        } else {
          const error = new Error("Failed to resolve repeated object (this should not happen)");
          error.source = source;
          throw error;
        }
      }
    },
    sourceObjects
  };
}

// node_modules/yaml/browser/dist/doc/applyReviver.js
function applyReviver(reviver, obj, key, val) {
  if (val && typeof val === "object") {
    if (Array.isArray(val)) {
      for (let i = 0, len = val.length; i < len; ++i) {
        const v0 = val[i];
        const v1 = applyReviver(reviver, val, String(i), v0);
        if (v1 === void 0)
          delete val[i];
        else if (v1 !== v0)
          val[i] = v1;
      }
    } else if (val instanceof Map) {
      for (const k of Array.from(val.keys())) {
        const v0 = val.get(k);
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === void 0)
          val.delete(k);
        else if (v1 !== v0)
          val.set(k, v1);
      }
    } else if (val instanceof Set) {
      for (const v0 of Array.from(val)) {
        const v1 = applyReviver(reviver, val, v0, v0);
        if (v1 === void 0)
          val.delete(v0);
        else if (v1 !== v0) {
          val.delete(v0);
          val.add(v1);
        }
      }
    } else {
      for (const [k, v0] of Object.entries(val)) {
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === void 0)
          delete val[k];
        else if (v1 !== v0)
          val[k] = v1;
      }
    }
  }
  return reviver.call(obj, key, val);
}

// node_modules/yaml/browser/dist/nodes/toJS.js
function toJS(value, arg, ctx) {
  if (Array.isArray(value))
    return value.map((v, i) => toJS(v, String(i), ctx));
  if (value && typeof value.toJSON === "function") {
    if (!ctx || !hasAnchor(value))
      return value.toJSON(arg, ctx);
    const data = { aliasCount: 0, count: 1, res: void 0 };
    ctx.anchors.set(value, data);
    ctx.onCreate = (res2) => {
      data.res = res2;
      delete ctx.onCreate;
    };
    const res = value.toJSON(arg, ctx);
    if (ctx.onCreate)
      ctx.onCreate(res);
    return res;
  }
  if (typeof value === "bigint" && !ctx?.keep)
    return Number(value);
  return value;
}

// node_modules/yaml/browser/dist/nodes/Node.js
var NodeBase = class {
  constructor(type) {
    Object.defineProperty(this, NODE_TYPE, { value: type });
  }
  /** Create a copy of this node.  */
  clone() {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /** A plain JavaScript representation of this node. */
  toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
    if (!isDocument(doc))
      throw new TypeError("A document argument is required");
    const ctx = {
      anchors: /* @__PURE__ */ new Map(),
      doc,
      keep: true,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
    };
    const res = toJS(this, "", ctx);
    if (typeof onAnchor === "function")
      for (const { count, res: res2 } of ctx.anchors.values())
        onAnchor(res2, count);
    return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res;
  }
};

// node_modules/yaml/browser/dist/nodes/Alias.js
var Alias = class extends NodeBase {
  constructor(source) {
    super(ALIAS);
    this.source = source;
    Object.defineProperty(this, "tag", {
      set() {
        throw new Error("Alias nodes cannot have tags");
      }
    });
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(doc, ctx) {
    if (ctx?.maxAliasCount === 0)
      throw new ReferenceError("Alias resolution is disabled");
    let nodes;
    if (ctx?.aliasResolveCache) {
      nodes = ctx.aliasResolveCache;
    } else {
      nodes = [];
      visit(doc, {
        Node: (_key, node) => {
          if (isAlias(node) || hasAnchor(node))
            nodes.push(node);
        }
      });
      if (ctx)
        ctx.aliasResolveCache = nodes;
    }
    let found = void 0;
    for (const node of nodes) {
      if (node === this)
        break;
      if (node.anchor === this.source)
        found = node;
    }
    if (found && ctx) {
      const { anchors, doc: doc2, maxAliasCount } = ctx;
      let data = anchors.get(found);
      if (!data) {
        toJS(found, null, ctx);
        data = anchors.get(found);
      }
      if (data?.res === void 0) {
        const msg = "This should not happen: Alias anchor was not resolved?";
        throw new ReferenceError(msg);
      }
      if (maxAliasCount >= 0) {
        data.count += 1;
        if (data.aliasCount === 0)
          data.aliasCount = getAliasCount(doc2, found, anchors);
        if (data.count * data.aliasCount > maxAliasCount) {
          const msg = "Excessive alias count indicates a resource exhaustion attack";
          throw new ReferenceError(msg);
        }
      }
    }
    return found;
  }
  toJSON(_arg, ctx) {
    if (!ctx)
      return { source: this.source };
    const source = this.resolve(ctx.doc, ctx);
    if (!source) {
      const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(msg);
    }
    return ctx.anchors.get(source).res;
  }
  toString(ctx, _onComment, _onChompKeep) {
    const src = `*${this.source}`;
    if (ctx) {
      anchorIsValid(this.source);
      if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
        const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(msg);
      }
      if (ctx.implicitKey)
        return `${src} `;
    }
    return src;
  }
};
function getAliasCount(doc, node, anchors) {
  if (isAlias(node)) {
    const source = node.resolve(doc);
    const anchor = anchors && source && anchors.get(source);
    return anchor ? anchor.count * anchor.aliasCount : 0;
  } else if (isCollection(node)) {
    let count = 0;
    for (const item of node.items) {
      const c = getAliasCount(doc, item, anchors);
      if (c > count)
        count = c;
    }
    return count;
  } else if (isPair(node)) {
    const kc = getAliasCount(doc, node.key, anchors);
    const vc = getAliasCount(doc, node.value, anchors);
    return Math.max(kc, vc);
  }
  return 1;
}

// node_modules/yaml/browser/dist/nodes/Scalar.js
var isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
var Scalar = class extends NodeBase {
  constructor(value) {
    super(SCALAR);
    this.value = value;
  }
  toJSON(arg, ctx) {
    return ctx?.keep ? this.value : toJS(this.value, arg, ctx);
  }
  toString() {
    return String(this.value);
  }
};
Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
Scalar.PLAIN = "PLAIN";
Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";

// node_modules/yaml/browser/dist/doc/createNode.js
var defaultTagPrefix = "tag:yaml.org,2002:";
function findTagObject(value, tagName, tags) {
  if (tagName) {
    const match = tags.filter((t) => t.tag === tagName);
    const tagObj = match.find((t) => !t.format) ?? match[0];
    if (!tagObj)
      throw new Error(`Tag ${tagName} not found`);
    return tagObj;
  }
  return tags.find((t) => t.identify?.(value) && !t.format);
}
function createNode(value, tagName, ctx) {
  if (isDocument(value))
    value = value.contents;
  if (isNode(value))
    return value;
  if (isPair(value)) {
    const map2 = ctx.schema[MAP].createNode?.(ctx.schema, null, ctx);
    map2.items.push(value);
    return map2;
  }
  if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
    value = value.valueOf();
  }
  const { aliasDuplicateObjects, onAnchor, onTagObj, schema: schema4, sourceObjects } = ctx;
  let ref = void 0;
  if (aliasDuplicateObjects && value && typeof value === "object") {
    ref = sourceObjects.get(value);
    if (ref) {
      ref.anchor ?? (ref.anchor = onAnchor(value));
      return new Alias(ref.anchor);
    } else {
      ref = { anchor: null, node: null };
      sourceObjects.set(value, ref);
    }
  }
  if (tagName?.startsWith("!!"))
    tagName = defaultTagPrefix + tagName.slice(2);
  let tagObj = findTagObject(value, tagName, schema4.tags);
  if (!tagObj) {
    if (value && typeof value.toJSON === "function") {
      value = value.toJSON();
    }
    if (!value || typeof value !== "object") {
      const node2 = new Scalar(value);
      if (ref)
        ref.node = node2;
      return node2;
    }
    tagObj = value instanceof Map ? schema4[MAP] : Symbol.iterator in Object(value) ? schema4[SEQ] : schema4[MAP];
  }
  if (onTagObj) {
    onTagObj(tagObj);
    delete ctx.onTagObj;
  }
  const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar(value);
  if (tagName)
    node.tag = tagName;
  else if (!tagObj.default)
    node.tag = tagObj.tag;
  if (ref)
    ref.node = node;
  return node;
}

// node_modules/yaml/browser/dist/nodes/Collection.js
function collectionFromPath(schema4, path, value) {
  let v = value;
  for (let i = path.length - 1; i >= 0; --i) {
    const k = path[i];
    if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
      const a = [];
      a[k] = v;
      v = a;
    } else {
      v = /* @__PURE__ */ new Map([[k, v]]);
    }
  }
  return createNode(v, void 0, {
    aliasDuplicateObjects: false,
    keepUndefined: false,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: schema4,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
var isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
var Collection = class extends NodeBase {
  constructor(type, schema4) {
    super(type);
    Object.defineProperty(this, "schema", {
      value: schema4,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(schema4) {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    if (schema4)
      copy.schema = schema4;
    copy.items = copy.items.map((it) => isNode(it) || isPair(it) ? it.clone(schema4) : it);
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(path, value) {
    if (isEmptyPath(path))
      this.add(value);
    else {
      const [key, ...rest] = path;
      const node = this.get(key, true);
      if (isCollection(node))
        node.addIn(rest, value);
      else if (node === void 0 && this.schema)
        this.set(key, collectionFromPath(this.schema, rest, value));
      else
        throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    const [key, ...rest] = path;
    if (rest.length === 0)
      return this.delete(key);
    const node = this.get(key, true);
    if (isCollection(node))
      return node.deleteIn(rest);
    else
      throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    const [key, ...rest] = path;
    const node = this.get(key, true);
    if (rest.length === 0)
      return !keepScalar && isScalar(node) ? node.value : node;
    else
      return isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
  }
  hasAllNullValues(allowScalar) {
    return this.items.every((node) => {
      if (!isPair(node))
        return false;
      const n = node.value;
      return n == null || allowScalar && isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(path) {
    const [key, ...rest] = path;
    if (rest.length === 0)
      return this.has(key);
    const node = this.get(key, true);
    return isCollection(node) ? node.hasIn(rest) : false;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    const [key, ...rest] = path;
    if (rest.length === 0) {
      this.set(key, value);
    } else {
      const node = this.get(key, true);
      if (isCollection(node))
        node.setIn(rest, value);
      else if (node === void 0 && this.schema)
        this.set(key, collectionFromPath(this.schema, rest, value));
      else
        throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyComment.js
var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
function indentComment(comment, indent) {
  if (/^\n+$/.test(comment))
    return comment.substring(1);
  return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
}
var lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;

// node_modules/yaml/browser/dist/stringify/foldFlowLines.js
var FOLD_FLOW = "flow";
var FOLD_BLOCK = "block";
var FOLD_QUOTED = "quoted";
function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
  if (!lineWidth || lineWidth < 0)
    return text;
  if (lineWidth < minContentWidth)
    minContentWidth = 0;
  const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
  if (text.length <= endStep)
    return text;
  const folds = [];
  const escapedFolds = {};
  let end = lineWidth - indent.length;
  if (typeof indentAtStart === "number") {
    if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
      folds.push(0);
    else
      end = lineWidth - indentAtStart;
  }
  let split = void 0;
  let prev = void 0;
  let overflow = false;
  let i = -1;
  let escStart = -1;
  let escEnd = -1;
  if (mode === FOLD_BLOCK) {
    i = consumeMoreIndentedLines(text, i, indent.length);
    if (i !== -1)
      end = i + endStep;
  }
  for (let ch; ch = text[i += 1]; ) {
    if (mode === FOLD_QUOTED && ch === "\\") {
      escStart = i;
      switch (text[i + 1]) {
        case "x":
          i += 3;
          break;
        case "u":
          i += 5;
          break;
        case "U":
          i += 9;
          break;
        default:
          i += 1;
      }
      escEnd = i;
    }
    if (ch === "\n") {
      if (mode === FOLD_BLOCK)
        i = consumeMoreIndentedLines(text, i, indent.length);
      end = i + indent.length + endStep;
      split = void 0;
    } else {
      if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
        const next = text[i + 1];
        if (next && next !== " " && next !== "\n" && next !== "	")
          split = i;
      }
      if (i >= end) {
        if (split) {
          folds.push(split);
          end = split + endStep;
          split = void 0;
        } else if (mode === FOLD_QUOTED) {
          while (prev === " " || prev === "	") {
            prev = ch;
            ch = text[i += 1];
            overflow = true;
          }
          const j = i > escEnd + 1 ? i - 2 : escStart - 1;
          if (escapedFolds[j])
            return text;
          folds.push(j);
          escapedFolds[j] = true;
          end = j + endStep;
          split = void 0;
        } else {
          overflow = true;
        }
      }
    }
    prev = ch;
  }
  if (overflow && onOverflow)
    onOverflow();
  if (folds.length === 0)
    return text;
  if (onFold)
    onFold();
  let res = text.slice(0, folds[0]);
  for (let i2 = 0; i2 < folds.length; ++i2) {
    const fold = folds[i2];
    const end2 = folds[i2 + 1] || text.length;
    if (fold === 0)
      res = `
${indent}${text.slice(0, end2)}`;
    else {
      if (mode === FOLD_QUOTED && escapedFolds[fold])
        res += `${text[fold]}\\`;
      res += `
${indent}${text.slice(fold + 1, end2)}`;
    }
  }
  return res;
}
function consumeMoreIndentedLines(text, i, indent) {
  let end = i;
  let start = i + 1;
  let ch = text[start];
  while (ch === " " || ch === "	") {
    if (i < start + indent) {
      ch = text[++i];
    } else {
      do {
        ch = text[++i];
      } while (ch && ch !== "\n");
      end = i;
      start = i + 1;
      ch = text[start];
    }
  }
  return end;
}

// node_modules/yaml/browser/dist/stringify/stringifyString.js
var getFoldOptions = (ctx, isBlock) => ({
  indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
  lineWidth: ctx.options.lineWidth,
  minContentWidth: ctx.options.minContentWidth
});
var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
function lineLengthOverLimit(str, lineWidth, indentLength) {
  if (!lineWidth || lineWidth < 0)
    return false;
  const limit = lineWidth - indentLength;
  const strLen = str.length;
  if (strLen <= limit)
    return false;
  for (let i = 0, start = 0; i < strLen; ++i) {
    if (str[i] === "\n") {
      if (i - start > limit)
        return true;
      start = i + 1;
      if (strLen - start <= limit)
        return false;
    }
  }
  return true;
}
function doubleQuotedString(value, ctx) {
  const json = JSON.stringify(value);
  if (ctx.options.doubleQuotedAsJSON)
    return json;
  const { implicitKey } = ctx;
  const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
  let str = "";
  let start = 0;
  for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
    if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
      str += json.slice(start, i) + "\\ ";
      i += 1;
      start = i;
      ch = "\\";
    }
    if (ch === "\\")
      switch (json[i + 1]) {
        case "u":
          {
            str += json.slice(start, i);
            const code2 = json.substr(i + 2, 4);
            switch (code2) {
              case "0000":
                str += "\\0";
                break;
              case "0007":
                str += "\\a";
                break;
              case "000b":
                str += "\\v";
                break;
              case "001b":
                str += "\\e";
                break;
              case "0085":
                str += "\\N";
                break;
              case "00a0":
                str += "\\_";
                break;
              case "2028":
                str += "\\L";
                break;
              case "2029":
                str += "\\P";
                break;
              default:
                if (code2.substr(0, 2) === "00")
                  str += "\\x" + code2.substr(2);
                else
                  str += json.substr(i, 6);
            }
            i += 5;
            start = i + 1;
          }
          break;
        case "n":
          if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
            i += 1;
          } else {
            str += json.slice(start, i) + "\n\n";
            while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
              str += "\n";
              i += 2;
            }
            str += indent;
            if (json[i + 2] === " ")
              str += "\\";
            i += 1;
            start = i + 1;
          }
          break;
        default:
          i += 1;
      }
  }
  str = start ? str + json.slice(start) : json;
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx, false));
}
function singleQuotedString(value, ctx) {
  if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
    return doubleQuotedString(value, ctx);
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
  const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
  return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function quotedString(value, ctx) {
  const { singleQuote } = ctx.options;
  let qs;
  if (singleQuote === false)
    qs = doubleQuotedString;
  else {
    const hasDouble = value.includes('"');
    const hasSingle = value.includes("'");
    if (hasDouble && !hasSingle)
      qs = singleQuotedString;
    else if (hasSingle && !hasDouble)
      qs = doubleQuotedString;
    else
      qs = singleQuote ? singleQuotedString : doubleQuotedString;
  }
  return qs(value, ctx);
}
var blockEndNewlines;
try {
  blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
} catch {
  blockEndNewlines = /\n+(?!\n|$)/g;
}
function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
  const { blockQuote, commentString, lineWidth } = ctx.options;
  if (!blockQuote || /\n[\t ]+$/.test(value)) {
    return quotedString(value, ctx);
  }
  const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
  const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.BLOCK_FOLDED ? false : type === Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
  if (!value)
    return literal ? "|\n" : ">\n";
  let chomp;
  let endStart;
  for (endStart = value.length; endStart > 0; --endStart) {
    const ch = value[endStart - 1];
    if (ch !== "\n" && ch !== "	" && ch !== " ")
      break;
  }
  let end = value.substring(endStart);
  const endNlPos = end.indexOf("\n");
  if (endNlPos === -1) {
    chomp = "-";
  } else if (value === end || endNlPos !== end.length - 1) {
    chomp = "+";
    if (onChompKeep)
      onChompKeep();
  } else {
    chomp = "";
  }
  if (end) {
    value = value.slice(0, -end.length);
    if (end[end.length - 1] === "\n")
      end = end.slice(0, -1);
    end = end.replace(blockEndNewlines, `$&${indent}`);
  }
  let startWithSpace = false;
  let startEnd;
  let startNlPos = -1;
  for (startEnd = 0; startEnd < value.length; ++startEnd) {
    const ch = value[startEnd];
    if (ch === " ")
      startWithSpace = true;
    else if (ch === "\n")
      startNlPos = startEnd;
    else
      break;
  }
  let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
  if (start) {
    value = value.substring(start.length);
    start = start.replace(/\n+/g, `$&${indent}`);
  }
  const indentSize = indent ? "2" : "1";
  let header = (startWithSpace ? indentSize : "") + chomp;
  if (comment) {
    header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
    if (onComment)
      onComment();
  }
  if (!literal) {
    const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
    let literalFallback = false;
    const foldOptions = getFoldOptions(ctx, true);
    if (blockQuote !== "folded" && type !== Scalar.BLOCK_FOLDED) {
      foldOptions.onOverflow = () => {
        literalFallback = true;
      };
    }
    const body = foldFlowLines(`${start}${foldedValue}${end}`, indent, FOLD_BLOCK, foldOptions);
    if (!literalFallback)
      return `>${header}
${indent}${body}`;
  }
  value = value.replace(/\n+/g, `$&${indent}`);
  return `|${header}
${indent}${start}${value}${end}`;
}
function plainString(item, ctx, onComment, onChompKeep) {
  const { type, value } = item;
  const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
  if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
    return quotedString(value, ctx);
  }
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
    return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
  }
  if (!implicitKey && !inFlow && type !== Scalar.PLAIN && value.includes("\n")) {
    return blockString(item, ctx, onComment, onChompKeep);
  }
  if (containsDocumentMarker(value)) {
    if (indent === "") {
      ctx.forceBlockIndent = true;
      return blockString(item, ctx, onComment, onChompKeep);
    } else if (implicitKey && indent === indentStep) {
      return quotedString(value, ctx);
    }
  }
  const str = value.replace(/\n+/g, `$&
${indent}`);
  if (actualString) {
    const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
    const { compat, tags } = ctx.doc.schema;
    if (tags.some(test) || compat?.some(test))
      return quotedString(value, ctx);
  }
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function stringifyString(item, ctx, onComment, onChompKeep) {
  const { implicitKey, inFlow } = ctx;
  const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
  let { type } = item;
  if (type !== Scalar.QUOTE_DOUBLE) {
    if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
      type = Scalar.QUOTE_DOUBLE;
  }
  const _stringify = (_type) => {
    switch (_type) {
      case Scalar.BLOCK_FOLDED:
      case Scalar.BLOCK_LITERAL:
        return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
      case Scalar.QUOTE_DOUBLE:
        return doubleQuotedString(ss.value, ctx);
      case Scalar.QUOTE_SINGLE:
        return singleQuotedString(ss.value, ctx);
      case Scalar.PLAIN:
        return plainString(ss, ctx, onComment, onChompKeep);
      default:
        return null;
    }
  };
  let res = _stringify(type);
  if (res === null) {
    const { defaultKeyType, defaultStringType } = ctx.options;
    const t = implicitKey && defaultKeyType || defaultStringType;
    res = _stringify(t);
    if (res === null)
      throw new Error(`Unsupported default string type ${t}`);
  }
  return res;
}

// node_modules/yaml/browser/dist/stringify/stringify.js
function createStringifyContext(doc, options) {
  const opt = Object.assign({
    blockQuote: true,
    commentString: stringifyComment,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: false,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: true,
    indentSeq: true,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: false,
    singleQuote: null,
    trailingComma: false,
    trueStr: "true",
    verifyAliasOrder: true
  }, doc.schema.toStringOptions, options);
  let inFlow;
  switch (opt.collectionStyle) {
    case "block":
      inFlow = false;
      break;
    case "flow":
      inFlow = true;
      break;
    default:
      inFlow = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc,
    flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
    inFlow,
    options: opt
  };
}
function getTagObject(tags, item) {
  if (item.tag) {
    const match = tags.filter((t) => t.tag === item.tag);
    if (match.length > 0)
      return match.find((t) => t.format === item.format) ?? match[0];
  }
  let tagObj = void 0;
  let obj;
  if (isScalar(item)) {
    obj = item.value;
    let match = tags.filter((t) => t.identify?.(obj));
    if (match.length > 1) {
      const testMatch = match.filter((t) => t.test);
      if (testMatch.length > 0)
        match = testMatch;
    }
    tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
  } else {
    obj = item;
    tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
  }
  if (!tagObj) {
    const name = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
    throw new Error(`Tag not resolved for ${name} value`);
  }
  return tagObj;
}
function stringifyProps(node, tagObj, { anchors, doc }) {
  if (!doc.directives)
    return "";
  const props = [];
  const anchor = (isScalar(node) || isCollection(node)) && node.anchor;
  if (anchor && anchorIsValid(anchor)) {
    anchors.add(anchor);
    props.push(`&${anchor}`);
  }
  const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
  if (tag)
    props.push(doc.directives.tagString(tag));
  return props.join(" ");
}
function stringify(item, ctx, onComment, onChompKeep) {
  if (isPair(item))
    return item.toString(ctx, onComment, onChompKeep);
  if (isAlias(item)) {
    if (ctx.doc.directives)
      return item.toString(ctx);
    if (ctx.resolvedAliases?.has(item)) {
      throw new TypeError(`Cannot stringify circular structure without alias nodes`);
    } else {
      if (ctx.resolvedAliases)
        ctx.resolvedAliases.add(item);
      else
        ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
      item = item.resolve(ctx.doc);
    }
  }
  let tagObj = void 0;
  const node = isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
  tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
  const props = stringifyProps(node, tagObj, ctx);
  if (props.length > 0)
    ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
  const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : isScalar(node) ? stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
  if (!props)
    return str;
  return isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
}

// node_modules/yaml/browser/dist/stringify/stringifyPair.js
function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
  const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
  let keyComment = isNode(key) && key.comment || null;
  if (simpleKeys) {
    if (keyComment) {
      throw new Error("With simple keys, key nodes cannot have comments");
    }
    if (isCollection(key) || !isNode(key) && typeof key === "object") {
      const msg = "With simple keys, collection cannot be used as a key value";
      throw new Error(msg);
    }
  }
  let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || isCollection(key) || (isScalar(key) ? key.type === Scalar.BLOCK_FOLDED || key.type === Scalar.BLOCK_LITERAL : typeof key === "object"));
  ctx = Object.assign({}, ctx, {
    allNullValues: false,
    implicitKey: !explicitKey && (simpleKeys || !allNullValues),
    indent: indent + indentStep
  });
  let keyCommentDone = false;
  let chompKeep = false;
  let str = stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
  if (!explicitKey && !ctx.inFlow && str.length > 1024) {
    if (simpleKeys)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    explicitKey = true;
  }
  if (ctx.inFlow) {
    if (allNullValues || value == null) {
      if (keyCommentDone && onComment)
        onComment();
      return str === "" ? "?" : explicitKey ? `? ${str}` : str;
    }
  } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
    str = `? ${str}`;
    if (keyComment && !keyCommentDone) {
      str += lineComment(str, ctx.indent, commentString(keyComment));
    } else if (chompKeep && onChompKeep)
      onChompKeep();
    return str;
  }
  if (keyCommentDone)
    keyComment = null;
  if (explicitKey) {
    if (keyComment)
      str += lineComment(str, ctx.indent, commentString(keyComment));
    str = `? ${str}
${indent}:`;
  } else {
    str = `${str}:`;
    if (keyComment)
      str += lineComment(str, ctx.indent, commentString(keyComment));
  }
  let vsb, vcb, valueComment;
  if (isNode(value)) {
    vsb = !!value.spaceBefore;
    vcb = value.commentBefore;
    valueComment = value.comment;
  } else {
    vsb = false;
    vcb = null;
    valueComment = null;
    if (value && typeof value === "object")
      value = doc.createNode(value);
  }
  ctx.implicitKey = false;
  if (!explicitKey && !keyComment && isScalar(value))
    ctx.indentAtStart = str.length + 1;
  chompKeep = false;
  if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && isSeq(value) && !value.flow && !value.tag && !value.anchor) {
    ctx.indent = ctx.indent.substring(2);
  }
  let valueCommentDone = false;
  const valueStr = stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
  let ws = " ";
  if (keyComment || vsb || vcb) {
    ws = vsb ? "\n" : "";
    if (vcb) {
      const cs = commentString(vcb);
      ws += `
${indentComment(cs, ctx.indent)}`;
    }
    if (valueStr === "" && !ctx.inFlow) {
      if (ws === "\n" && valueComment)
        ws = "\n\n";
    } else {
      ws += `
${ctx.indent}`;
    }
  } else if (!explicitKey && isCollection(value)) {
    const vs0 = valueStr[0];
    const nl0 = valueStr.indexOf("\n");
    const hasNewline = nl0 !== -1;
    const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
    if (hasNewline || !flow) {
      let hasPropsLine = false;
      if (hasNewline && (vs0 === "&" || vs0 === "!")) {
        let sp0 = valueStr.indexOf(" ");
        if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
          sp0 = valueStr.indexOf(" ", sp0 + 1);
        }
        if (sp0 === -1 || nl0 < sp0)
          hasPropsLine = true;
      }
      if (!hasPropsLine)
        ws = `
${ctx.indent}`;
    }
  } else if (valueStr === "" || valueStr[0] === "\n") {
    ws = "";
  }
  str += ws + valueStr;
  if (ctx.inFlow) {
    if (valueCommentDone && onComment)
      onComment();
  } else if (valueComment && !valueCommentDone) {
    str += lineComment(str, ctx.indent, commentString(valueComment));
  } else if (chompKeep && onChompKeep) {
    onChompKeep();
  }
  return str;
}

// node_modules/yaml/browser/dist/log.js
function warn(logLevel, warning) {
  if (logLevel === "debug" || logLevel === "warn") {
    console.warn(warning);
  }
}

// node_modules/yaml/browser/dist/schema/yaml-1.1/merge.js
var MERGE_KEY = "<<";
var merge = {
  identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new Scalar(Symbol(MERGE_KEY)), {
    addToJSMap: addMergeToJSMap
  }),
  stringify: () => MERGE_KEY
};
var isMergeKey = (ctx, key) => (merge.identify(key) || isScalar(key) && (!key.type || key.type === Scalar.PLAIN) && merge.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default);
function addMergeToJSMap(ctx, map2, value) {
  const source = resolveAliasValue(ctx, value);
  if (isSeq(source))
    for (const it of source.items)
      mergeValue(ctx, map2, it);
  else if (Array.isArray(source))
    for (const it of source)
      mergeValue(ctx, map2, it);
  else
    mergeValue(ctx, map2, source);
}
function mergeValue(ctx, map2, value) {
  const source = resolveAliasValue(ctx, value);
  if (!isMap(source))
    throw new Error("Merge sources must be maps or map aliases");
  const srcMap = source.toJSON(null, ctx, Map);
  for (const [key, value2] of srcMap) {
    if (map2 instanceof Map) {
      if (!map2.has(key))
        map2.set(key, value2);
    } else if (map2 instanceof Set) {
      map2.add(key);
    } else if (!Object.prototype.hasOwnProperty.call(map2, key)) {
      Object.defineProperty(map2, key, {
        value: value2,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  }
  return map2;
}
function resolveAliasValue(ctx, value) {
  return ctx && isAlias(value) ? value.resolve(ctx.doc, ctx) : value;
}

// node_modules/yaml/browser/dist/nodes/addPairToJSMap.js
function addPairToJSMap(ctx, map2, { key, value }) {
  if (isNode(key) && key.addToJSMap)
    key.addToJSMap(ctx, map2, value);
  else if (isMergeKey(ctx, key))
    addMergeToJSMap(ctx, map2, value);
  else {
    const jsKey = toJS(key, "", ctx);
    if (map2 instanceof Map) {
      map2.set(jsKey, toJS(value, jsKey, ctx));
    } else if (map2 instanceof Set) {
      map2.add(jsKey);
    } else {
      const stringKey = stringifyKey(key, jsKey, ctx);
      const jsValue = toJS(value, stringKey, ctx);
      if (stringKey in map2)
        Object.defineProperty(map2, stringKey, {
          value: jsValue,
          writable: true,
          enumerable: true,
          configurable: true
        });
      else
        map2[stringKey] = jsValue;
    }
  }
  return map2;
}
function stringifyKey(key, jsKey, ctx) {
  if (jsKey === null)
    return "";
  if (typeof jsKey !== "object")
    return String(jsKey);
  if (isNode(key) && ctx?.doc) {
    const strCtx = createStringifyContext(ctx.doc, {});
    strCtx.anchors = /* @__PURE__ */ new Set();
    for (const node of ctx.anchors.keys())
      strCtx.anchors.add(node.anchor);
    strCtx.inFlow = true;
    strCtx.inStringifyKey = true;
    const strKey = key.toString(strCtx);
    if (!ctx.mapKeyWarned) {
      let jsonStr = JSON.stringify(strKey);
      if (jsonStr.length > 40)
        jsonStr = jsonStr.substring(0, 36) + '..."';
      warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
      ctx.mapKeyWarned = true;
    }
    return strKey;
  }
  return JSON.stringify(jsKey);
}

// node_modules/yaml/browser/dist/nodes/Pair.js
function createPair(key, value, ctx) {
  const k = createNode(key, void 0, ctx);
  const v = createNode(value, void 0, ctx);
  return new Pair(k, v);
}
var Pair = class _Pair {
  constructor(key, value = null) {
    Object.defineProperty(this, NODE_TYPE, { value: PAIR });
    this.key = key;
    this.value = value;
  }
  clone(schema4) {
    let { key, value } = this;
    if (isNode(key))
      key = key.clone(schema4);
    if (isNode(value))
      value = value.clone(schema4);
    return new _Pair(key, value);
  }
  toJSON(_2, ctx) {
    const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return addPairToJSMap(ctx, pair, this);
  }
  toString(ctx, onComment, onChompKeep) {
    return ctx?.doc ? stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyCollection.js
function stringifyCollection(collection, ctx, options) {
  const flow = ctx.inFlow ?? collection.flow;
  const stringify4 = flow ? stringifyFlowCollection : stringifyBlockCollection;
  return stringify4(collection, ctx, options);
}
function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
  const { indent, options: { commentString } } = ctx;
  const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
  let chompKeep = false;
  const lines = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment2 = null;
    if (isNode(item)) {
      if (!chompKeep && item.spaceBefore)
        lines.push("");
      addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
      if (item.comment)
        comment2 = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (!chompKeep && ik.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
      }
    }
    chompKeep = false;
    let str2 = stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
    if (comment2)
      str2 += lineComment(str2, itemIndent, commentString(comment2));
    if (chompKeep && comment2)
      chompKeep = false;
    lines.push(blockItemPrefix + str2);
  }
  let str;
  if (lines.length === 0) {
    str = flowChars.start + flowChars.end;
  } else {
    str = lines[0];
    for (let i = 1; i < lines.length; ++i) {
      const line = lines[i];
      str += line ? `
${indent}${line}` : "\n";
    }
  }
  if (comment) {
    str += "\n" + indentComment(commentString(comment), indent);
    if (onComment)
      onComment();
  } else if (chompKeep && onChompKeep)
    onChompKeep();
  return str;
}
function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
  const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
  itemIndent += indentStep;
  const itemCtx = Object.assign({}, ctx, {
    indent: itemIndent,
    inFlow: true,
    type: null
  });
  let reqNewline = false;
  let linesAtValue = 0;
  const lines = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment = null;
    if (isNode(item)) {
      if (item.spaceBefore)
        lines.push("");
      addCommentBefore(ctx, lines, item.commentBefore, false);
      if (item.comment)
        comment = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (ik.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, ik.commentBefore, false);
        if (ik.comment)
          reqNewline = true;
      }
      const iv = isNode(item.value) ? item.value : null;
      if (iv) {
        if (iv.comment)
          comment = iv.comment;
        if (iv.commentBefore)
          reqNewline = true;
      } else if (item.value == null && ik?.comment) {
        comment = ik.comment;
      }
    }
    if (comment)
      reqNewline = true;
    let str = stringify(item, itemCtx, () => comment = null);
    reqNewline || (reqNewline = lines.length > linesAtValue || str.includes("\n"));
    if (i < items.length - 1) {
      str += ",";
    } else if (ctx.options.trailingComma) {
      if (ctx.options.lineWidth > 0) {
        reqNewline || (reqNewline = lines.reduce((sum, line) => sum + line.length + 2, 2) + (str.length + 2) > ctx.options.lineWidth);
      }
      if (reqNewline) {
        str += ",";
      }
    }
    if (comment)
      str += lineComment(str, itemIndent, commentString(comment));
    lines.push(str);
    linesAtValue = lines.length;
  }
  const { start, end } = flowChars;
  if (lines.length === 0) {
    return start + end;
  } else {
    if (!reqNewline) {
      const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
      reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
    }
    if (reqNewline) {
      let str = start;
      for (const line of lines)
        str += line ? `
${indentStep}${indent}${line}` : "\n";
      return `${str}
${indent}${end}`;
    } else {
      return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
    }
  }
}
function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
  if (comment && chompKeep)
    comment = comment.replace(/^\n+/, "");
  if (comment) {
    const ic = indentComment(commentString(comment), indent);
    lines.push(ic.trimStart());
  }
}

// node_modules/yaml/browser/dist/nodes/YAMLMap.js
function findPair(items, key) {
  const k = isScalar(key) ? key.value : key;
  for (const it of items) {
    if (isPair(it)) {
      if (it.key === key || it.key === k)
        return it;
      if (isScalar(it.key) && it.key.value === k)
        return it;
    }
  }
  return void 0;
}
var YAMLMap = class extends Collection {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(schema4) {
    super(MAP, schema4);
    this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(schema4, obj, ctx) {
    const { keepUndefined, replacer } = ctx;
    const map2 = new this(schema4);
    const add = (key, value) => {
      if (typeof replacer === "function")
        value = replacer.call(obj, key, value);
      else if (Array.isArray(replacer) && !replacer.includes(key))
        return;
      if (value !== void 0 || keepUndefined)
        map2.items.push(createPair(key, value, ctx));
    };
    if (obj instanceof Map) {
      for (const [key, value] of obj)
        add(key, value);
    } else if (obj && typeof obj === "object") {
      for (const key of Object.keys(obj))
        add(key, obj[key]);
    }
    if (typeof schema4.sortMapEntries === "function") {
      map2.items.sort(schema4.sortMapEntries);
    }
    return map2;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(pair, overwrite) {
    let _pair;
    if (isPair(pair))
      _pair = pair;
    else if (!pair || typeof pair !== "object" || !("key" in pair)) {
      _pair = new Pair(pair, pair?.value);
    } else
      _pair = new Pair(pair.key, pair.value);
    const prev = findPair(this.items, _pair.key);
    const sortEntries = this.schema?.sortMapEntries;
    if (prev) {
      if (!overwrite)
        throw new Error(`Key ${_pair.key} already set`);
      if (isScalar(prev.value) && isScalarValue(_pair.value))
        prev.value.value = _pair.value;
      else
        prev.value = _pair.value;
    } else if (sortEntries) {
      const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
      if (i === -1)
        this.items.push(_pair);
      else
        this.items.splice(i, 0, _pair);
    } else {
      this.items.push(_pair);
    }
  }
  delete(key) {
    const it = findPair(this.items, key);
    if (!it)
      return false;
    const del = this.items.splice(this.items.indexOf(it), 1);
    return del.length > 0;
  }
  get(key, keepScalar) {
    const it = findPair(this.items, key);
    const node = it?.value;
    return (!keepScalar && isScalar(node) ? node.value : node) ?? void 0;
  }
  has(key) {
    return !!findPair(this.items, key);
  }
  set(key, value) {
    this.add(new Pair(key, value), true);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(_2, ctx, Type) {
    const map2 = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    if (ctx?.onCreate)
      ctx.onCreate(map2);
    for (const item of this.items)
      addPairToJSMap(ctx, map2, item);
    return map2;
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    for (const item of this.items) {
      if (!isPair(item))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
    }
    if (!ctx.allNullValues && this.hasAllNullValues(false))
      ctx = Object.assign({}, ctx, { allNullValues: true });
    return stringifyCollection(this, ctx, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: ctx.indent || "",
      onChompKeep,
      onComment
    });
  }
};

// node_modules/yaml/browser/dist/schema/common/map.js
var map = {
  collection: "map",
  default: true,
  nodeClass: YAMLMap,
  tag: "tag:yaml.org,2002:map",
  resolve(map2, onError) {
    if (!isMap(map2))
      onError("Expected a mapping for this tag");
    return map2;
  },
  createNode: (schema4, obj, ctx) => YAMLMap.from(schema4, obj, ctx)
};

// node_modules/yaml/browser/dist/nodes/YAMLSeq.js
var YAMLSeq = class extends Collection {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(schema4) {
    super(SEQ, schema4);
    this.items = [];
  }
  add(value) {
    this.items.push(value);
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      return false;
    const del = this.items.splice(idx, 1);
    return del.length > 0;
  }
  get(key, keepScalar) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      return void 0;
    const it = this.items[idx];
    return !keepScalar && isScalar(it) ? it.value : it;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(key) {
    const idx = asItemIndex(key);
    return typeof idx === "number" && idx < this.items.length;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(key, value) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      throw new Error(`Expected a valid index, not ${key}.`);
    const prev = this.items[idx];
    if (isScalar(prev) && isScalarValue(value))
      prev.value = value;
    else
      this.items[idx] = value;
  }
  toJSON(_2, ctx) {
    const seq2 = [];
    if (ctx?.onCreate)
      ctx.onCreate(seq2);
    let i = 0;
    for (const item of this.items)
      seq2.push(toJS(item, String(i++), ctx));
    return seq2;
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    return stringifyCollection(this, ctx, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (ctx.indent || "") + "  ",
      onChompKeep,
      onComment
    });
  }
  static from(schema4, obj, ctx) {
    const { replacer } = ctx;
    const seq2 = new this(schema4);
    if (obj && Symbol.iterator in Object(obj)) {
      let i = 0;
      for (let it of obj) {
        if (typeof replacer === "function") {
          const key = obj instanceof Set ? it : String(i++);
          it = replacer.call(obj, key, it);
        }
        seq2.items.push(createNode(it, void 0, ctx));
      }
    }
    return seq2;
  }
};
function asItemIndex(key) {
  let idx = isScalar(key) ? key.value : key;
  if (idx && typeof idx === "string")
    idx = Number(idx);
  return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
}

// node_modules/yaml/browser/dist/schema/common/seq.js
var seq = {
  collection: "seq",
  default: true,
  nodeClass: YAMLSeq,
  tag: "tag:yaml.org,2002:seq",
  resolve(seq2, onError) {
    if (!isSeq(seq2))
      onError("Expected a sequence for this tag");
    return seq2;
  },
  createNode: (schema4, obj, ctx) => YAMLSeq.from(schema4, obj, ctx)
};

// node_modules/yaml/browser/dist/schema/common/string.js
var string = {
  identify: (value) => typeof value === "string",
  default: true,
  tag: "tag:yaml.org,2002:str",
  resolve: (str) => str,
  stringify(item, ctx, onComment, onChompKeep) {
    ctx = Object.assign({ actualString: true }, ctx);
    return stringifyString(item, ctx, onComment, onChompKeep);
  }
};

// node_modules/yaml/browser/dist/schema/common/null.js
var nullTag = {
  identify: (value) => value == null,
  createNode: () => new Scalar(null),
  default: true,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new Scalar(null),
  stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
};

// node_modules/yaml/browser/dist/schema/core/bool.js
var boolTag = {
  identify: (value) => typeof value === "boolean",
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (str) => new Scalar(str[0] === "t" || str[0] === "T"),
  stringify({ source, value }, ctx) {
    if (source && boolTag.test.test(source)) {
      const sv = source[0] === "t" || source[0] === "T";
      if (value === sv)
        return source;
    }
    return value ? ctx.options.trueStr : ctx.options.falseStr;
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyNumber.js
function stringifyNumber({ format, minFractionDigits, tag, value }) {
  if (typeof value === "bigint")
    return String(value);
  const num = typeof value === "number" ? value : Number(value);
  if (!isFinite(num))
    return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
  let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
  if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^-?\d/.test(n) && !n.includes("e")) {
    let i = n.indexOf(".");
    if (i < 0) {
      i = n.length;
      n += ".";
    }
    let d = minFractionDigits - (n.length - i - 1);
    while (d-- > 0)
      n += "0";
  }
  return n;
}

// node_modules/yaml/browser/dist/schema/core/float.js
var floatNaN = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: stringifyNumber
};
var floatExp = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (str) => parseFloat(str),
  stringify(node) {
    const num = Number(node.value);
    return isFinite(num) ? num.toExponential() : stringifyNumber(node);
  }
};
var float = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str));
    const dot = str.indexOf(".");
    if (dot !== -1 && str[str.length - 1] === "0")
      node.minFractionDigits = str.length - dot - 1;
    return node;
  },
  stringify: stringifyNumber
};

// node_modules/yaml/browser/dist/schema/core/int.js
var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
var intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
function intStringify(node, radix, prefix) {
  const { value } = node;
  if (intIdentify(value) && value >= 0)
    return prefix + value.toString(radix);
  return stringifyNumber(node);
}
var intOct = {
  identify: (value) => intIdentify(value) && value >= 0,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
  stringify: (node) => intStringify(node, 8, "0o")
};
var int = {
  identify: intIdentify,
  default: true,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
  stringify: stringifyNumber
};
var intHex = {
  identify: (value) => intIdentify(value) && value >= 0,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
  stringify: (node) => intStringify(node, 16, "0x")
};

// node_modules/yaml/browser/dist/schema/core/schema.js
var schema = [
  map,
  seq,
  string,
  nullTag,
  boolTag,
  intOct,
  int,
  intHex,
  floatNaN,
  floatExp,
  float
];

// node_modules/yaml/browser/dist/schema/json/schema.js
function intIdentify2(value) {
  return typeof value === "bigint" || Number.isInteger(value);
}
var stringifyJSON = ({ value }) => JSON.stringify(value);
var jsonScalars = [
  {
    identify: (value) => typeof value === "string",
    default: true,
    tag: "tag:yaml.org,2002:str",
    resolve: (str) => str,
    stringify: stringifyJSON
  },
  {
    identify: (value) => value == null,
    createNode: () => new Scalar(null),
    default: true,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: stringifyJSON
  },
  {
    identify: (value) => typeof value === "boolean",
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (str) => str === "true",
    stringify: stringifyJSON
  },
  {
    identify: intIdentify2,
    default: true,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
    stringify: ({ value }) => intIdentify2(value) ? value.toString() : JSON.stringify(value)
  },
  {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (str) => parseFloat(str),
    stringify: stringifyJSON
  }
];
var jsonError = {
  default: true,
  tag: "",
  test: /^/,
  resolve(str, onError) {
    onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
    return str;
  }
};
var schema2 = [map, seq].concat(jsonScalars, jsonError);

// node_modules/yaml/browser/dist/schema/yaml-1.1/binary.js
var binary = {
  identify: (value) => value instanceof Uint8Array,
  // Buffer inherits from Uint8Array
  default: false,
  tag: "tag:yaml.org,2002:binary",
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(src, onError) {
    if (typeof atob === "function") {
      const str = atob(src.replace(/[\n\r]/g, ""));
      const buffer = new Uint8Array(str.length);
      for (let i = 0; i < str.length; ++i)
        buffer[i] = str.charCodeAt(i);
      return buffer;
    } else {
      onError("This environment does not support reading binary tags; either Buffer or atob is required");
      return src;
    }
  },
  stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
    if (!value)
      return "";
    const buf = value;
    let str;
    if (typeof btoa === "function") {
      let s = "";
      for (let i = 0; i < buf.length; ++i)
        s += String.fromCharCode(buf[i]);
      str = btoa(s);
    } else {
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    }
    type ?? (type = Scalar.BLOCK_LITERAL);
    if (type !== Scalar.QUOTE_DOUBLE) {
      const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
      const n = Math.ceil(str.length / lineWidth);
      const lines = new Array(n);
      for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
        lines[i] = str.substr(o, lineWidth);
      }
      str = lines.join(type === Scalar.BLOCK_LITERAL ? "\n" : " ");
    }
    return stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
  }
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/pairs.js
function resolvePairs(seq2, onError) {
  if (isSeq(seq2)) {
    for (let i = 0; i < seq2.items.length; ++i) {
      let item = seq2.items[i];
      if (isPair(item))
        continue;
      else if (isMap(item)) {
        if (item.items.length > 1)
          onError("Each pair must have its own sequence indicator");
        const pair = item.items[0] || new Pair(new Scalar(null));
        if (item.commentBefore)
          pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
        if (item.comment) {
          const cn = pair.value ?? pair.key;
          cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
        }
        item = pair;
      }
      seq2.items[i] = isPair(item) ? item : new Pair(item);
    }
  } else
    onError("Expected a sequence for this tag");
  return seq2;
}
function createPairs(schema4, iterable, ctx) {
  const { replacer } = ctx;
  const pairs2 = new YAMLSeq(schema4);
  pairs2.tag = "tag:yaml.org,2002:pairs";
  let i = 0;
  if (iterable && Symbol.iterator in Object(iterable))
    for (let it of iterable) {
      if (typeof replacer === "function")
        it = replacer.call(iterable, String(i++), it);
      let key, value;
      if (Array.isArray(it)) {
        if (it.length === 2) {
          key = it[0];
          value = it[1];
        } else
          throw new TypeError(`Expected [key, value] tuple: ${it}`);
      } else if (it && it instanceof Object) {
        const keys = Object.keys(it);
        if (keys.length === 1) {
          key = keys[0];
          value = it[key];
        } else {
          throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
        }
      } else {
        key = it;
      }
      pairs2.items.push(createPair(key, value, ctx));
    }
  return pairs2;
}
var pairs = {
  collection: "seq",
  default: false,
  tag: "tag:yaml.org,2002:pairs",
  resolve: resolvePairs,
  createNode: createPairs
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/omap.js
var YAMLOMap = class _YAMLOMap extends YAMLSeq {
  constructor() {
    super();
    this.add = YAMLMap.prototype.add.bind(this);
    this.delete = YAMLMap.prototype.delete.bind(this);
    this.get = YAMLMap.prototype.get.bind(this);
    this.has = YAMLMap.prototype.has.bind(this);
    this.set = YAMLMap.prototype.set.bind(this);
    this.tag = _YAMLOMap.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(_2, ctx) {
    if (!ctx)
      return super.toJSON(_2);
    const map2 = /* @__PURE__ */ new Map();
    if (ctx?.onCreate)
      ctx.onCreate(map2);
    for (const pair of this.items) {
      let key, value;
      if (isPair(pair)) {
        key = toJS(pair.key, "", ctx);
        value = toJS(pair.value, key, ctx);
      } else {
        key = toJS(pair, "", ctx);
      }
      if (map2.has(key))
        throw new Error("Ordered maps must not include duplicate keys");
      map2.set(key, value);
    }
    return map2;
  }
  static from(schema4, iterable, ctx) {
    const pairs2 = createPairs(schema4, iterable, ctx);
    const omap2 = new this();
    omap2.items = pairs2.items;
    return omap2;
  }
};
YAMLOMap.tag = "tag:yaml.org,2002:omap";
var omap = {
  collection: "seq",
  identify: (value) => value instanceof Map,
  nodeClass: YAMLOMap,
  default: false,
  tag: "tag:yaml.org,2002:omap",
  resolve(seq2, onError) {
    const pairs2 = resolvePairs(seq2, onError);
    const seenKeys = [];
    for (const { key } of pairs2.items) {
      if (isScalar(key)) {
        if (seenKeys.includes(key.value)) {
          onError(`Ordered maps must not include duplicate keys: ${key.value}`);
        } else {
          seenKeys.push(key.value);
        }
      }
    }
    return Object.assign(new YAMLOMap(), pairs2);
  },
  createNode: (schema4, iterable, ctx) => YAMLOMap.from(schema4, iterable, ctx)
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/bool.js
function boolStringify({ value, source }, ctx) {
  const boolObj = value ? trueTag : falseTag;
  if (source && boolObj.test.test(source))
    return source;
  return value ? ctx.options.trueStr : ctx.options.falseStr;
}
var trueTag = {
  identify: (value) => value === true,
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new Scalar(true),
  stringify: boolStringify
};
var falseTag = {
  identify: (value) => value === false,
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new Scalar(false),
  stringify: boolStringify
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/float.js
var floatNaN2 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: stringifyNumber
};
var floatExp2 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (str) => parseFloat(str.replace(/_/g, "")),
  stringify(node) {
    const num = Number(node.value);
    return isFinite(num) ? num.toExponential() : stringifyNumber(node);
  }
};
var float2 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str.replace(/_/g, "")));
    const dot = str.indexOf(".");
    if (dot !== -1) {
      const f = str.substring(dot + 1).replace(/_/g, "");
      if (f[f.length - 1] === "0")
        node.minFractionDigits = f.length;
    }
    return node;
  },
  stringify: stringifyNumber
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/int.js
var intIdentify3 = (value) => typeof value === "bigint" || Number.isInteger(value);
function intResolve2(str, offset, radix, { intAsBigInt }) {
  const sign = str[0];
  if (sign === "-" || sign === "+")
    offset += 1;
  str = str.substring(offset).replace(/_/g, "");
  if (intAsBigInt) {
    switch (radix) {
      case 2:
        str = `0b${str}`;
        break;
      case 8:
        str = `0o${str}`;
        break;
      case 16:
        str = `0x${str}`;
        break;
    }
    const n2 = BigInt(str);
    return sign === "-" ? BigInt(-1) * n2 : n2;
  }
  const n = parseInt(str, radix);
  return sign === "-" ? -1 * n : n;
}
function intStringify2(node, radix, prefix) {
  const { value } = node;
  if (intIdentify3(value)) {
    const str = value.toString(radix);
    return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
  }
  return stringifyNumber(node);
}
var intBin = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (str, _onError, opt) => intResolve2(str, 2, 2, opt),
  stringify: (node) => intStringify2(node, 2, "0b")
};
var intOct2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (str, _onError, opt) => intResolve2(str, 1, 8, opt),
  stringify: (node) => intStringify2(node, 8, "0")
};
var int2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (str, _onError, opt) => intResolve2(str, 0, 10, opt),
  stringify: stringifyNumber
};
var intHex2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (str, _onError, opt) => intResolve2(str, 2, 16, opt),
  stringify: (node) => intStringify2(node, 16, "0x")
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/set.js
var YAMLSet = class _YAMLSet extends YAMLMap {
  constructor(schema4) {
    super(schema4);
    this.tag = _YAMLSet.tag;
  }
  add(key) {
    let pair;
    if (isPair(key))
      pair = key;
    else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
      pair = new Pair(key.key, null);
    else
      pair = new Pair(key, null);
    const prev = findPair(this.items, pair.key);
    if (!prev)
      this.items.push(pair);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(key, keepPair) {
    const pair = findPair(this.items, key);
    return !keepPair && isPair(pair) ? isScalar(pair.key) ? pair.key.value : pair.key : pair;
  }
  set(key, value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
    const prev = findPair(this.items, key);
    if (prev && !value) {
      this.items.splice(this.items.indexOf(prev), 1);
    } else if (!prev && value) {
      this.items.push(new Pair(key));
    }
  }
  toJSON(_2, ctx) {
    return super.toJSON(_2, ctx, Set);
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    if (this.hasAllNullValues(true))
      return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
    else
      throw new Error("Set items must all have null values");
  }
  static from(schema4, iterable, ctx) {
    const { replacer } = ctx;
    const set2 = new this(schema4);
    if (iterable && Symbol.iterator in Object(iterable))
      for (let value of iterable) {
        if (typeof replacer === "function")
          value = replacer.call(iterable, value, value);
        set2.items.push(createPair(value, null, ctx));
      }
    return set2;
  }
};
YAMLSet.tag = "tag:yaml.org,2002:set";
var set = {
  collection: "map",
  identify: (value) => value instanceof Set,
  nodeClass: YAMLSet,
  default: false,
  tag: "tag:yaml.org,2002:set",
  createNode: (schema4, iterable, ctx) => YAMLSet.from(schema4, iterable, ctx),
  resolve(map2, onError) {
    if (isMap(map2)) {
      if (map2.hasAllNullValues(true))
        return Object.assign(new YAMLSet(), map2);
      else
        onError("Set items must all have null values");
    } else
      onError("Expected a mapping for this tag");
    return map2;
  }
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/timestamp.js
function parseSexagesimal(str, asBigInt) {
  const sign = str[0];
  const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
  const num = (n) => asBigInt ? BigInt(n) : Number(n);
  const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
  return sign === "-" ? num(-1) * res : res;
}
function stringifySexagesimal(node) {
  let { value } = node;
  let num = (n) => n;
  if (typeof value === "bigint")
    num = (n) => BigInt(n);
  else if (isNaN(value) || !isFinite(value))
    return stringifyNumber(node);
  let sign = "";
  if (value < 0) {
    sign = "-";
    value *= num(-1);
  }
  const _60 = num(60);
  const parts = [value % _60];
  if (value < 60) {
    parts.unshift(0);
  } else {
    value = (value - parts[0]) / _60;
    parts.unshift(value % _60);
    if (value >= 60) {
      value = (value - parts[0]) / _60;
      parts.unshift(value);
    }
  }
  return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
var intTime = {
  identify: (value) => typeof value === "bigint" || Number.isInteger(value),
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
  stringify: stringifySexagesimal
};
var floatTime = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (str) => parseSexagesimal(str, false),
  stringify: stringifySexagesimal
};
var timestamp = {
  identify: (value) => value instanceof Date,
  default: true,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(str) {
    const match = str.match(timestamp.test);
    if (!match)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, year, month, day, hour, minute, second] = match.map(Number);
    const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
    let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
    const tz = match[8];
    if (tz && tz !== "Z") {
      let d = parseSexagesimal(tz, false);
      if (Math.abs(d) < 30)
        d *= 60;
      date -= 6e4 * d;
    }
    return new Date(date);
  },
  stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
};

// node_modules/yaml/browser/dist/schema/yaml-1.1/schema.js
var schema3 = [
  map,
  seq,
  string,
  nullTag,
  trueTag,
  falseTag,
  intBin,
  intOct2,
  int2,
  intHex2,
  floatNaN2,
  floatExp2,
  float2,
  binary,
  merge,
  omap,
  pairs,
  set,
  intTime,
  floatTime,
  timestamp
];

// node_modules/yaml/browser/dist/schema/tags.js
var schemas = /* @__PURE__ */ new Map([
  ["core", schema],
  ["failsafe", [map, seq, string]],
  ["json", schema2],
  ["yaml11", schema3],
  ["yaml-1.1", schema3]
]);
var tagsByName = {
  binary,
  bool: boolTag,
  float,
  floatExp,
  floatNaN,
  floatTime,
  int,
  intHex,
  intOct,
  intTime,
  map,
  merge,
  null: nullTag,
  omap,
  pairs,
  seq,
  set,
  timestamp
};
var coreKnownTags = {
  "tag:yaml.org,2002:binary": binary,
  "tag:yaml.org,2002:merge": merge,
  "tag:yaml.org,2002:omap": omap,
  "tag:yaml.org,2002:pairs": pairs,
  "tag:yaml.org,2002:set": set,
  "tag:yaml.org,2002:timestamp": timestamp
};
function getTags(customTags, schemaName, addMergeTag) {
  const schemaTags = schemas.get(schemaName);
  if (schemaTags && !customTags) {
    return addMergeTag && !schemaTags.includes(merge) ? schemaTags.concat(merge) : schemaTags.slice();
  }
  let tags = schemaTags;
  if (!tags) {
    if (Array.isArray(customTags))
      tags = [];
    else {
      const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
      throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
    }
  }
  if (Array.isArray(customTags)) {
    for (const tag of customTags)
      tags = tags.concat(tag);
  } else if (typeof customTags === "function") {
    tags = customTags(tags.slice());
  }
  if (addMergeTag)
    tags = tags.concat(merge);
  return tags.reduce((tags2, tag) => {
    const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
    if (!tagObj) {
      const tagName = JSON.stringify(tag);
      const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
      throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
    }
    if (!tags2.includes(tagObj))
      tags2.push(tagObj);
    return tags2;
  }, []);
}

// node_modules/yaml/browser/dist/schema/Schema.js
var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
var Schema = class _Schema {
  constructor({ compat, customTags, merge: merge2, resolveKnownTags, schema: schema4, sortMapEntries, toStringDefaults }) {
    this.compat = Array.isArray(compat) ? getTags(compat, "compat") : compat ? getTags(null, compat) : null;
    this.name = typeof schema4 === "string" && schema4 || "core";
    this.knownTags = resolveKnownTags ? coreKnownTags : {};
    this.tags = getTags(customTags, this.name, merge2);
    this.toStringOptions = toStringDefaults ?? null;
    Object.defineProperty(this, MAP, { value: map });
    Object.defineProperty(this, SCALAR, { value: string });
    Object.defineProperty(this, SEQ, { value: seq });
    this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
  }
  clone() {
    const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
    copy.tags = this.tags.slice();
    return copy;
  }
};

// node_modules/yaml/browser/dist/stringify/stringifyDocument.js
function stringifyDocument(doc, options) {
  const lines = [];
  let hasDirectives = options.directives === true;
  if (options.directives !== false && doc.directives) {
    const dir = doc.directives.toString(doc);
    if (dir) {
      lines.push(dir);
      hasDirectives = true;
    } else if (doc.directives.docStart)
      hasDirectives = true;
  }
  if (hasDirectives)
    lines.push("---");
  const ctx = createStringifyContext(doc, options);
  const { commentString } = ctx.options;
  if (doc.commentBefore) {
    if (lines.length !== 1)
      lines.unshift("");
    const cs = commentString(doc.commentBefore);
    lines.unshift(indentComment(cs, ""));
  }
  let chompKeep = false;
  let contentComment = null;
  if (doc.contents) {
    if (isNode(doc.contents)) {
      if (doc.contents.spaceBefore && hasDirectives)
        lines.push("");
      if (doc.contents.commentBefore) {
        const cs = commentString(doc.contents.commentBefore);
        lines.push(indentComment(cs, ""));
      }
      ctx.forceBlockIndent = !!doc.comment;
      contentComment = doc.contents.comment;
    }
    const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
    let body = stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
    if (contentComment)
      body += lineComment(body, "", commentString(contentComment));
    if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
      lines[lines.length - 1] = `--- ${body}`;
    } else
      lines.push(body);
  } else {
    lines.push(stringify(doc.contents, ctx));
  }
  if (doc.directives?.docEnd) {
    if (doc.comment) {
      const cs = commentString(doc.comment);
      if (cs.includes("\n")) {
        lines.push("...");
        lines.push(indentComment(cs, ""));
      } else {
        lines.push(`... ${cs}`);
      }
    } else {
      lines.push("...");
    }
  } else {
    let dc = doc.comment;
    if (dc && chompKeep)
      dc = dc.replace(/^\n+/, "");
    if (dc) {
      if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
        lines.push("");
      lines.push(indentComment(commentString(dc), ""));
    }
  }
  return lines.join("\n") + "\n";
}

// node_modules/yaml/browser/dist/doc/Document.js
var Document = class _Document {
  constructor(value, replacer, options) {
    this.commentBefore = null;
    this.comment = null;
    this.errors = [];
    this.warnings = [];
    Object.defineProperty(this, NODE_TYPE, { value: DOC });
    let _replacer = null;
    if (typeof replacer === "function" || Array.isArray(replacer)) {
      _replacer = replacer;
    } else if (options === void 0 && replacer) {
      options = replacer;
      replacer = void 0;
    }
    const opt = Object.assign({
      intAsBigInt: false,
      keepSourceTokens: false,
      logLevel: "warn",
      prettyErrors: true,
      strict: true,
      stringKeys: false,
      uniqueKeys: true,
      version: "1.2"
    }, options);
    this.options = opt;
    let { version } = opt;
    if (options?._directives) {
      this.directives = options._directives.atDocument();
      if (this.directives.yaml.explicit)
        version = this.directives.yaml.version;
    } else
      this.directives = new Directives({ version });
    this.setSchema(version, options);
    this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const copy = Object.create(_Document.prototype, {
      [NODE_TYPE]: { value: DOC }
    });
    copy.commentBefore = this.commentBefore;
    copy.comment = this.comment;
    copy.errors = this.errors.slice();
    copy.warnings = this.warnings.slice();
    copy.options = Object.assign({}, this.options);
    if (this.directives)
      copy.directives = this.directives.clone();
    copy.schema = this.schema.clone();
    copy.contents = isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /** Adds a value to the document. */
  add(value) {
    if (assertCollection(this.contents))
      this.contents.add(value);
  }
  /** Adds a value to the document. */
  addIn(path, value) {
    if (assertCollection(this.contents))
      this.contents.addIn(path, value);
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(node, name) {
    if (!node.anchor) {
      const prev = anchorNames(this);
      node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !name || prev.has(name) ? findNewAnchor(name || "a", prev) : name;
    }
    return new Alias(node.anchor);
  }
  createNode(value, replacer, options) {
    let _replacer = void 0;
    if (typeof replacer === "function") {
      value = replacer.call({ "": value }, "", value);
      _replacer = replacer;
    } else if (Array.isArray(replacer)) {
      const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
      const asStr = replacer.filter(keyToStr).map(String);
      if (asStr.length > 0)
        replacer = replacer.concat(asStr);
      _replacer = replacer;
    } else if (options === void 0 && replacer) {
      options = replacer;
      replacer = void 0;
    }
    const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
    const { onAnchor, setAnchors, sourceObjects } = createNodeAnchors(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      anchorPrefix || "a"
    );
    const ctx = {
      aliasDuplicateObjects: aliasDuplicateObjects ?? true,
      keepUndefined: keepUndefined ?? false,
      onAnchor,
      onTagObj,
      replacer: _replacer,
      schema: this.schema,
      sourceObjects
    };
    const node = createNode(value, tag, ctx);
    if (flow && isCollection(node))
      node.flow = true;
    setAnchors();
    return node;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(key, value, options = {}) {
    const k = this.createNode(key, null, options);
    const v = this.createNode(value, null, options);
    return new Pair(k, v);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    return assertCollection(this.contents) ? this.contents.delete(key) : false;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    if (isEmptyPath(path)) {
      if (this.contents == null)
        return false;
      this.contents = null;
      return true;
    }
    return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(key, keepScalar) {
    return isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    if (isEmptyPath(path))
      return !keepScalar && isScalar(this.contents) ? this.contents.value : this.contents;
    return isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(key) {
    return isCollection(this.contents) ? this.contents.has(key) : false;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(path) {
    if (isEmptyPath(path))
      return this.contents !== void 0;
    return isCollection(this.contents) ? this.contents.hasIn(path) : false;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(key, value) {
    if (this.contents == null) {
      this.contents = collectionFromPath(this.schema, [key], value);
    } else if (assertCollection(this.contents)) {
      this.contents.set(key, value);
    }
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    if (isEmptyPath(path)) {
      this.contents = value;
    } else if (this.contents == null) {
      this.contents = collectionFromPath(this.schema, Array.from(path), value);
    } else if (assertCollection(this.contents)) {
      this.contents.setIn(path, value);
    }
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(version, options = {}) {
    if (typeof version === "number")
      version = String(version);
    let opt;
    switch (version) {
      case "1.1":
        if (this.directives)
          this.directives.yaml.version = "1.1";
        else
          this.directives = new Directives({ version: "1.1" });
        opt = { resolveKnownTags: false, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        if (this.directives)
          this.directives.yaml.version = version;
        else
          this.directives = new Directives({ version });
        opt = { resolveKnownTags: true, schema: "core" };
        break;
      case null:
        if (this.directives)
          delete this.directives;
        opt = null;
        break;
      default: {
        const sv = JSON.stringify(version);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
      }
    }
    if (options.schema instanceof Object)
      this.schema = options.schema;
    else if (opt)
      this.schema = new Schema(Object.assign(opt, options));
    else
      throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
    const ctx = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !json,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
    };
    const res = toJS(this.contents, jsonArg ?? "", ctx);
    if (typeof onAnchor === "function")
      for (const { count, res: res2 } of ctx.anchors.values())
        onAnchor(res2, count);
    return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res;
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(jsonArg, onAnchor) {
    return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
  }
  /** A YAML representation of the document. */
  toString(options = {}) {
    if (this.errors.length > 0)
      throw new Error("Document with errors cannot be stringified");
    if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
      const s = JSON.stringify(options.indent);
      throw new Error(`"indent" option must be a positive integer, not ${s}`);
    }
    return stringifyDocument(this, options);
  }
};
function assertCollection(contents) {
  if (isCollection(contents))
    return true;
  throw new Error("Expected a YAML collection as document contents");
}

// node_modules/yaml/browser/dist/parse/cst-visit.js
var BREAK2 = /* @__PURE__ */ Symbol("break visit");
var SKIP2 = /* @__PURE__ */ Symbol("skip children");
var REMOVE2 = /* @__PURE__ */ Symbol("remove item");
function visit2(cst, visitor) {
  if ("type" in cst && cst.type === "document")
    cst = { start: cst.start, value: cst.value };
  _visit(Object.freeze([]), cst, visitor);
}
visit2.BREAK = BREAK2;
visit2.SKIP = SKIP2;
visit2.REMOVE = REMOVE2;
visit2.itemAtPath = (cst, path) => {
  let item = cst;
  for (const [field, index] of path) {
    const tok = item?.[field];
    if (tok && "items" in tok) {
      item = tok.items[index];
    } else
      return void 0;
  }
  return item;
};
visit2.parentCollection = (cst, path) => {
  const parent = visit2.itemAtPath(cst, path.slice(0, -1));
  const field = path[path.length - 1][0];
  const coll = parent?.[field];
  if (coll && "items" in coll)
    return coll;
  throw new Error("Parent collection not found");
};
function _visit(path, item, visitor) {
  let ctrl = visitor(item, path);
  if (typeof ctrl === "symbol")
    return ctrl;
  for (const field of ["key", "value"]) {
    const token = item[field];
    if (token && "items" in token) {
      for (let i = 0; i < token.items.length; ++i) {
        const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK2)
          return BREAK2;
        else if (ci === REMOVE2) {
          token.items.splice(i, 1);
          i -= 1;
        }
      }
      if (typeof ctrl === "function" && field === "key")
        ctrl = ctrl(item, path);
    }
  }
  return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
}

// node_modules/yaml/browser/dist/parse/lexer.js
var hexDigits = new Set("0123456789ABCDEFabcdef");
var tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
var flowIndicatorChars = new Set(",[]{}");
var invalidAnchorChars = new Set(" ,[]{}\n\r	");

// node_modules/yaml/browser/dist/public-api.js
function stringify3(value, replacer, options) {
  let _replacer = null;
  if (typeof replacer === "function" || Array.isArray(replacer)) {
    _replacer = replacer;
  } else if (options === void 0 && replacer) {
    options = replacer;
  }
  if (typeof options === "string")
    options = options.length;
  if (typeof options === "number") {
    const indent = Math.round(options);
    options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
  }
  if (value === void 0) {
    const { keepUndefined } = options ?? replacer ?? {};
    if (!keepUndefined)
      return void 0;
  }
  if (isDocument(value) && !_replacer)
    return value.toString(options);
  return new Document(value, _replacer, options).toString(options);
}

// node_modules/@typespec/json-schema/dist/src/lib.js
import { createTypeSpecLibrary, definePackageFlags, paramMessage } from "@typespec/compiler";
var EmitterOptionsSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    "file-type": {
      type: "string",
      enum: ["yaml", "json"],
      nullable: true,
      description: "Serialize the schema as either yaml or json."
    },
    "int64-strategy": {
      type: "string",
      enum: ["string", "number"],
      nullable: true,
      description: `How to handle 64 bit integers on the wire. Options are:

* string: serialize as a string (widely interoperable)
* number: serialize as a number (not widely interoperable)`
    },
    bundleId: {
      type: "string",
      nullable: true,
      description: "When provided, bundle all the schemas into a single json schema document with schemas under $defs. The provided id is the id of the root document and is also used for the file name."
    },
    emitAllModels: {
      type: "boolean",
      nullable: true,
      description: "When true, emit all model declarations to JSON Schema without requiring the @jsonSchema decorator."
    },
    emitAllRefs: {
      type: "boolean",
      nullable: true,
      description: "When true, emit all references as json schema files, even if the referenced type does not have the `@jsonSchema` decorator or is not within a namespace with the `@jsonSchema` decorator."
    },
    "seal-object-schemas": {
      type: "boolean",
      nullable: true,
      default: false,
      description: [
        "If true, then for models emitted as object schemas we default `unevaluatedProperties` to `{ not: {} }`,",
        "if not explicitly specified elsewhere.",
        "Default: `false`"
      ].join("\n")
    },
    "polymorphic-models-strategy": {
      type: "string",
      enum: ["ignore", "oneOf", "anyOf"],
      nullable: true,
      default: "ignore",
      description: [
        "Strategy for emitting models with the @discriminator decorator:",
        "- ignore: Emit as regular object schema (default). Derived models use allOf to reference their base model.",
        "- oneOf: Emit a oneOf schema with references to all derived models (closed union)",
        "- anyOf: Emit an anyOf schema with references to all derived models (open union)",
        "",
        "When using oneOf or anyOf, derived models will inline all properties from their base model",
        "instead of using allOf references. This avoids circular references in the generated schemas,",
        "since the base model references derived models via oneOf/anyOf."
      ].join("\n")
    }
  },
  required: []
};
var $lib = createTypeSpecLibrary({
  name: "@typespec/json-schema",
  diagnostics: {
    "invalid-default": {
      severity: "error",
      messages: {
        default: paramMessage`Invalid type '${"type"}' for a default value`
      }
    },
    "duplicate-id": {
      severity: "error",
      messages: {
        default: paramMessage`There are multiple types with the same id "${"id"}".`
      }
    },
    "unknown-scalar": {
      severity: "warning",
      messages: {
        default: paramMessage`Scalar '${"name"}' is not a known scalar type and doesn't extend a known scalar type.`
      }
    }
  },
  emitter: {
    options: EmitterOptionsSchema
  },
  state: {
    JsonSchema: { description: "State indexing types marked with @jsonSchema" },
    "JsonSchema.baseURI": { description: "Contains data configured with @baseUri decorator" },
    "JsonSchema.multipleOf": { description: "Contains data configured with @multipleOf decorator" },
    "JsonSchema.id": { description: "Contains data configured with @id decorator" },
    "JsonSchema.oneOf": { description: "Contains data configured with @oneOf decorator" },
    "JsonSchema.contains": { description: "Contains data configured with @contains decorator" },
    "JsonSchema.minContains": {
      description: "Contains data configured with @minContains decorator"
    },
    "JsonSchema.maxContains": {
      description: "Contains data configured with @maxContains decorator"
    },
    "JsonSchema.uniqueItems": {
      description: "Contains data configured with @uniqueItems decorator"
    },
    "JsonSchema.minProperties": {
      description: "Contains data configured with @minProperties decorator"
    },
    "JsonSchema.maxProperties": {
      description: "Contains data configured with @maxProperties decorator"
    },
    "JsonSchema.contentEncoding": {
      description: "Contains data configured with @contentEncoding decorator"
    },
    "JsonSchema.contentSchema": {
      description: "Contains data configured with @contentSchema decorator"
    },
    "JsonSchema.contentMediaType": {
      description: "Contains data configured with @contentMediaType decorator"
    },
    "JsonSchema.prefixItems": {
      description: "Contains data configured with @prefixItems decorator"
    },
    "JsonSchema.extension": { description: "Contains data configured with @extension decorator" }
  }
});
var $flags = definePackageFlags({});
var { reportDiagnostic, createStateSymbol, stateKeys: JsonSchemaStateKeys } = $lib;

// node_modules/@typespec/json-schema/dist/src/utils.js
import { isTemplateDeclaration as isTemplateDeclaration3 } from "@typespec/compiler";
import { useStateMap } from "@typespec/compiler/utils";
function createDataDecorator(key, validate) {
  const [getData, setData] = useStateMap(key);
  const decorator = (...args) => {
    if (validate && !validate(...args)) {
      return;
    }
    const [context, target, value] = args;
    setData(context.program, target, value);
  };
  return [getData, setData, decorator];
}
function includeDerivedModel(model) {
  return !isTemplateDeclaration3(model) && (model.templateMapper?.args === void 0 || model.templateMapper.args?.length === 0 || model.derivedModels.length > 0);
}

// node_modules/@typespec/json-schema/dist/src/json-schema-emitter.js
function isAnonymousExpression(type) {
  return type.expression && !type.name;
}
var JsonSchemaEmitter = class extends TypeEmitter {
  #idDuplicateTracker = new DuplicateTracker();
  #typeForSourceFile = /* @__PURE__ */ new Map();
  #declDefKey = /* @__PURE__ */ new Map();
  #applyModelIndexer(schema4, model) {
    if (model.indexer) {
      setProperty(schema4, "unevaluatedProperties", this.emitter.emitTypeReference(model.indexer.value));
      return;
    }
    if (!this.emitter.getOptions()["seal-object-schemas"])
      return;
    const derivedModels = model.derivedModels.filter(includeDerivedModel);
    if (!derivedModels.length) {
      setProperty(schema4, "unevaluatedProperties", { not: {} });
    }
  }
  modelDeclaration(model, name) {
    const discriminator = getDiscriminator(this.emitter.getProgram(), model);
    const strategy = this.emitter.getOptions()["polymorphic-models-strategy"];
    if ((strategy === "oneOf" || strategy === "anyOf") && discriminator && model.derivedModels.length > 0) {
      return this.#createDiscriminatedUnionDeclaration(model, name, discriminator, strategy);
    }
    const shouldInlineBase = model.baseModel && this.#isBaseUsingDiscriminatedUnion(model.baseModel);
    const schema4 = this.#initializeSchema(model, name, {
      type: "object",
      properties: shouldInlineBase ? this.#getAllModelProperties(model) : this.emitter.emitModelProperties(model),
      required: shouldInlineBase ? this.#getAllRequiredModelProperties(model) : this.#requiredModelProperties(model)
    });
    if (model.baseModel && !shouldInlineBase) {
      const allOf = new ArrayBuilder();
      allOf.push(this.emitter.emitTypeReference(model.baseModel));
      setProperty(schema4, "allOf", allOf);
    }
    this.#applyModelIndexer(schema4, model);
    this.#applyConstraints(model, schema4);
    return this.#createDeclaration(model, name, schema4);
  }
  #isBaseUsingDiscriminatedUnion(model) {
    const discriminator = getDiscriminator(this.emitter.getProgram(), model);
    const strategy = this.emitter.getOptions()["polymorphic-models-strategy"];
    return (strategy === "oneOf" || strategy === "anyOf") && !!discriminator && model.derivedModels.length > 0;
  }
  modelLiteral(model) {
    const schema4 = new ObjectBuilder({
      type: "object",
      properties: this.emitter.emitModelProperties(model),
      required: this.#requiredModelProperties(model)
    });
    this.#applyModelIndexer(schema4, model);
    return schema4;
  }
  modelInstantiation(model, name) {
    if (!name) {
      return this.modelLiteral(model);
    }
    return this.modelDeclaration(model, name);
  }
  arrayDeclaration(array, name, elementType) {
    const schema4 = this.#initializeSchema(array, name, {
      type: "array",
      items: this.emitter.emitTypeReference(elementType)
    });
    this.#applyConstraints(array, schema4);
    return this.#createDeclaration(array, name, schema4);
  }
  arrayLiteral(array, elementType) {
    return new ObjectBuilder({
      type: "array",
      items: this.emitter.emitTypeReference(elementType)
    });
  }
  #requiredModelProperties(model) {
    const requiredProps = [];
    for (const prop of model.properties.values()) {
      if (!prop.optional) {
        requiredProps.push(prop.name);
      }
    }
    const discriminator = getDiscriminator(this.emitter.getProgram(), model);
    if (discriminator && !model.properties.has(discriminator.propertyName)) {
      requiredProps.push(discriminator.propertyName);
    }
    return requiredProps.length > 0 ? requiredProps : void 0;
  }
  // Get all required properties including inherited ones (for when base uses discriminated union)
  #getAllRequiredModelProperties(model) {
    const requiredProps = [];
    const visited = /* @__PURE__ */ new Set();
    const collectRequired = (m) => {
      if (visited.has(m))
        return;
      visited.add(m);
      if (m.baseModel) {
        collectRequired(m.baseModel);
      }
      for (const prop of m.properties.values()) {
        if (!prop.optional && !requiredProps.includes(prop.name)) {
          requiredProps.push(prop.name);
        }
      }
      const discriminator = getDiscriminator(this.emitter.getProgram(), m);
      if (discriminator && !m.properties.has(discriminator.propertyName) && !requiredProps.includes(discriminator.propertyName)) {
        requiredProps.push(discriminator.propertyName);
      }
    };
    collectRequired(model);
    return requiredProps.length > 0 ? requiredProps : void 0;
  }
  // Get all properties including inherited ones (for when base uses discriminated union)
  #getAllModelProperties(model) {
    const props = new ObjectBuilder();
    const visited = /* @__PURE__ */ new Set();
    const collectProperties = (m) => {
      if (visited.has(m))
        return;
      visited.add(m);
      if (m.baseModel) {
        collectProperties(m.baseModel);
      }
      for (const [name, prop] of m.properties) {
        const result = this.emitter.emitModelProperty(prop);
        setProperty(props, name, result);
      }
      const discriminator = getDiscriminator(this.emitter.getProgram(), m);
      if (discriminator && !(discriminator.propertyName in props)) {
        setProperty(props, discriminator.propertyName, {
          type: "string",
          description: `Discriminator property for ${m.name}.`
        });
      }
    };
    collectProperties(model);
    return props;
  }
  modelProperties(model) {
    const props = new ObjectBuilder();
    for (const [name, prop] of model.properties) {
      const result = this.emitter.emitModelProperty(prop);
      setProperty(props, name, result);
    }
    const discriminator = getDiscriminator(this.emitter.getProgram(), model);
    if (discriminator && !(discriminator.propertyName in props)) {
      setProperty(props, discriminator.propertyName, {
        type: "string",
        description: `Discriminator property for ${model.name}.`
      });
    }
    return props;
  }
  modelPropertyLiteral(property) {
    const propertyType = this.emitter.emitTypeReference(property.type);
    compilerAssert5(propertyType.kind === "code", "Unexpected non-code result from emit reference");
    const result = new ObjectBuilder(propertyType.value);
    if (property.defaultValue) {
      result.default = this.#getDefaultValue(property, property.defaultValue);
    }
    if (result.anyOf && isOneOf(this.emitter.getProgram(), property)) {
      result.oneOf = result.anyOf;
      delete result.anyOf;
    }
    this.#applyConstraints(property, result);
    return result;
  }
  #getDefaultValue(modelProperty, defaultType) {
    return serializeValueAsJson(this.emitter.getProgram(), defaultType, modelProperty);
  }
  booleanLiteral(boolean) {
    return { type: "boolean", const: boolean.value };
  }
  stringLiteral(string2) {
    return { type: "string", const: string2.value };
  }
  stringTemplate(string2) {
    if (string2.stringValue !== void 0) {
      return { type: "string", const: string2.stringValue };
    }
    const diagnostics = explainStringTemplateNotSerializable(string2);
    this.emitter.getProgram().reportDiagnostics(diagnostics.map((x) => ({ ...x, severity: "warning" })));
    return { type: "string" };
  }
  numericLiteral(number) {
    return { type: "number", const: number.value };
  }
  enumDeclaration(en, name) {
    const enumTypes = /* @__PURE__ */ new Set();
    const enumValues = /* @__PURE__ */ new Set();
    for (const member of en.members.values()) {
      enumTypes.add(typeof member.value === "number" ? "number" : "string");
      enumValues.add(member.value ?? member.name);
    }
    const enumTypesArray = [...enumTypes];
    const withConstraints = this.#initializeSchema(en, name, {
      type: enumTypesArray.length === 1 ? enumTypesArray[0] : enumTypesArray,
      enum: [...enumValues]
    });
    this.#applyConstraints(en, withConstraints);
    return this.#createDeclaration(en, name, withConstraints);
  }
  enumMemberReference(member) {
    switch (typeof member.value) {
      case "undefined":
        return { type: "string", const: member.name };
      case "string":
        return { type: "string", const: member.value };
      case "number":
        return { type: "number", const: member.value };
    }
  }
  tupleLiteral(tuple) {
    const size = tuple.values.length;
    return new ObjectBuilder({
      type: "array",
      prefixItems: this.emitter.emitTupleLiteralValues(tuple),
      minItems: size,
      maxItems: size
    });
  }
  tupleLiteralValues(tuple) {
    const values = new ArrayBuilder();
    for (const value of tuple.values.values()) {
      values.push(this.emitter.emitTypeReference(value));
    }
    return values;
  }
  unionInstantiation(union, name) {
    if (!name) {
      return this.unionLiteral(union);
    }
    return this.unionDeclaration(union, name);
  }
  unionDeclaration(union, name) {
    const key = isOneOf(this.emitter.getProgram(), union) ? "oneOf" : "anyOf";
    const withConstraints = this.#initializeSchema(union, name, {
      [key]: this.emitter.emitUnionVariants(union)
    });
    this.#applyConstraints(union, withConstraints);
    return this.#createDeclaration(union, name, withConstraints);
  }
  unionLiteral(union) {
    const key = isOneOf(this.emitter.getProgram(), union) ? "oneOf" : "anyOf";
    return new ObjectBuilder({
      [key]: this.emitter.emitUnionVariants(union)
    });
  }
  unionVariants(union) {
    const variants = new ArrayBuilder();
    for (const variant of union.variants.values()) {
      variants.push(this.emitter.emitType(variant));
    }
    return variants;
  }
  unionVariant(variant) {
    const variantType = this.emitter.emitTypeReference(variant.type);
    compilerAssert5(variantType.kind === "code", "Unexpected non-code result from emit reference");
    const result = new ObjectBuilder(variantType.value);
    this.#applyConstraints(variant, result);
    return result;
  }
  modelPropertyReference(property) {
    const refSchema = this.emitter.emitTypeReference(property.type);
    compilerAssert5(refSchema.kind === "code", "Unexpected non-code result from emit reference");
    const schema4 = new ObjectBuilder(refSchema.value);
    this.#applyConstraints(property, schema4);
    return schema4;
  }
  reference(targetDeclaration, pathUp, pathDown, commonScope) {
    if (targetDeclaration.value instanceof Placeholder) {
      throw new Error("Can't form reference to declaration that hasn't been created yet");
    }
    const currentSfScope = pathUp[pathUp.length - 1];
    const targetSfScope = pathDown[0];
    if (targetSfScope && currentSfScope && !targetSfScope.sourceFile.meta.shouldEmit) {
      currentSfScope.sourceFile.meta.bundledRefs.push(targetDeclaration);
    }
    if (targetDeclaration.value.$id) {
      return { $ref: targetDeclaration.value.$id };
    }
    if (!commonScope) {
      if (targetSfScope && !targetSfScope.sourceFile.meta.shouldEmit) {
        return { $ref: "#/$defs/" + targetDeclaration.name };
      } else {
        const resolved = getRelativePathFromDirectory(getDirectoryPath(currentSfScope.sourceFile.path), targetSfScope.sourceFile.path, false);
        return { $ref: resolved };
      }
    }
    if (!currentSfScope && !targetSfScope) {
      return { $ref: "#/$defs/" + targetDeclaration.name };
    }
    throw new Error("JSON Pointer refs to arbitrary schemas is not supported");
  }
  scalarInstantiation(scalar, name) {
    if (!name) {
      return this.#getSchemaForScalar(scalar);
    }
    return this.scalarDeclaration(scalar, name);
  }
  scalarInstantiationContext(scalar, name) {
    if (name === void 0) {
      return {};
    } else {
      return this.#newFileScope(scalar);
    }
  }
  scalarDeclaration(scalar, name) {
    const isStd = this.#isStdType(scalar);
    const schema4 = this.#getSchemaForScalar(scalar);
    if (isStd) {
      return schema4;
    }
    const builderSchema = this.#initializeSchema(scalar, name, schema4);
    return this.#createDeclaration(scalar, name, builderSchema);
  }
  #getSchemaForScalar(scalar) {
    let result;
    const isStd = this.#isStdType(scalar);
    if (isStd) {
      result = this.#getSchemaForStdScalars(scalar);
    } else if (scalar.baseScalar) {
      result = this.#getSchemaForScalar(scalar.baseScalar);
    } else {
      reportDiagnostic(this.emitter.getProgram(), {
        code: "unknown-scalar",
        format: { name: scalar.name },
        target: scalar
      });
      return {};
    }
    const objectBuilder = new ObjectBuilder(result);
    this.#applyConstraints(scalar, objectBuilder);
    if (isStd) {
      delete objectBuilder.description;
    }
    return objectBuilder;
  }
  #getSchemaForStdScalars(baseBuiltIn) {
    switch (baseBuiltIn.name) {
      case "uint8":
        return { type: "integer", minimum: 0, maximum: 255 };
      case "uint16":
        return { type: "integer", minimum: 0, maximum: 65535 };
      case "uint32":
        return { type: "integer", minimum: 0, maximum: 4294967295 };
      case "int8":
        return { type: "integer", minimum: -128, maximum: 127 };
      case "int16":
        return { type: "integer", minimum: -32768, maximum: 32767 };
      case "int32":
      case "unixTimestamp32":
        return { type: "integer", minimum: -2147483648, maximum: 2147483647 };
      case "int64":
        const int64Strategy = this.emitter.getOptions()["int64-strategy"] ?? "string";
        if (int64Strategy === "string") {
          return { type: "string" };
        } else {
          return { type: "integer" };
        }
      case "uint64":
        const uint64Strategy = this.emitter.getOptions()["int64-strategy"] ?? "string";
        if (uint64Strategy === "string") {
          return { type: "string" };
        } else {
          return { type: "integer" };
        }
      case "decimal":
      case "decimal128":
        return { type: "string" };
      case "integer":
        return { type: "integer" };
      case "safeint":
        return { type: "integer" };
      case "float":
        return { type: "number" };
      case "float32":
        return { type: "number" };
      case "float64":
        return { type: "number" };
      case "numeric":
        return { type: "number" };
      case "string":
        return { type: "string" };
      case "boolean":
        return { type: "boolean" };
      case "plainDate":
        return { type: "string", format: "date" };
      case "plainTime":
        return { type: "string", format: "time" };
      case "offsetDateTime":
      case "utcDateTime":
        return { type: "string", format: "date-time" };
      case "duration":
        return { type: "string", format: "duration" };
      case "url":
        return { type: "string", format: "uri" };
      case "bytes":
        return { type: "string", contentEncoding: "base64" };
      default:
        reportDiagnostic(this.emitter.getProgram(), {
          code: "unknown-scalar",
          format: { name: baseBuiltIn.name },
          target: baseBuiltIn
        });
        return {};
    }
  }
  #applySchemaExamples(type, target) {
    const program = this.emitter.getProgram();
    const examples = getExamples(program, type);
    if (examples.length > 0) {
      setProperty(target, "examples", examples.map((x) => serializeValueAsJson(program, x.value, type)));
    }
  }
  #applyConstraints(type, schema4) {
    const applyConstraint = (fn, key) => {
      const value = fn(this.emitter.getProgram(), type);
      if (value !== void 0) {
        schema4[key] = value;
      }
    };
    const applyTypeConstraint = (fn, key) => {
      const constraintType = fn(this.emitter.getProgram(), type);
      if (constraintType) {
        const ref = this.emitter.emitTypeReference(constraintType);
        compilerAssert5(ref.kind === "code", "Unexpected non-code result from emit reference");
        setProperty(schema4, key, ref.value);
      }
    };
    if (type.kind !== "UnionVariant") {
      this.#applySchemaExamples(type, schema4);
    }
    applyConstraint(getMinLength, "minLength");
    applyConstraint(getMaxLength, "maxLength");
    applyConstraint(getMinValue, "minimum");
    applyConstraint(getMinValueExclusive, "exclusiveMinimum");
    applyConstraint(getMaxValue, "maximum");
    applyConstraint(getMaxValueExclusive, "exclusiveMaximum");
    applyConstraint(getPattern, "pattern");
    applyConstraint(getMinItems, "minItems");
    applyConstraint(getMaxItems, "maxItems");
    if (!this.#isStdType(type) || type.name !== "url") {
      applyConstraint(getFormat, "format");
    }
    applyConstraint(getMultipleOf, "multipleOf");
    applyTypeConstraint(getContains, "contains");
    applyConstraint(getMinContains, "minContains");
    applyConstraint(getMaxContains, "maxContains");
    applyConstraint(getUniqueItems, "uniqueItems");
    applyConstraint(getMinProperties, "minProperties");
    applyConstraint(getMaxProperties, "maxProperties");
    applyConstraint(getContentEncoding, "contentEncoding");
    applyConstraint(getContentMediaType, "contentMediaType");
    applyTypeConstraint(getContentSchema, "contentSchema");
    applyConstraint(getDoc, "description");
    applyConstraint(getSummary, "title");
    applyConstraint((p, t) => getDeprecated(p, t) !== void 0 ? true : void 0, "deprecated");
    const prefixItems = getPrefixItems(this.emitter.getProgram(), type);
    if (prefixItems) {
      const prefixItemsSchema = new ArrayBuilder();
      for (const item of prefixItems.values) {
        prefixItemsSchema.push(this.emitter.emitTypeReference(item));
      }
      setProperty(schema4, "prefixItems", prefixItemsSchema);
    }
    const extensions = getExtensions(this.emitter.getProgram(), type);
    for (const { key, value } of extensions) {
      if (this.#isTypeLike(value)) {
        setProperty(schema4, key, this.emitter.emitTypeReference(value));
      } else {
        setProperty(schema4, key, value);
      }
    }
  }
  #isTypeLike(value) {
    return typeof value === "object" && value !== null && isType(value);
  }
  #createDeclaration(type, name, schema4) {
    if (isAnonymousExpression(type)) {
      return schema4;
    }
    const decl = this.emitter.result.declaration(name, schema4);
    const sf = decl.scope.sourceFile;
    sf.meta.shouldEmit = this.#shouldEmitRootSchema(type);
    const explicitId = getId(this.emitter.getProgram(), type);
    if (explicitId) {
      this.#declDefKey.set(decl, explicitId);
    }
    return decl;
  }
  #initializeSchema(type, name, props) {
    const rootSchemaProps = this.#shouldEmitRootSchema(type) ? this.#getRootSchemaProps(type, name) : {};
    return new ObjectBuilder({
      ...rootSchemaProps,
      ...props
    });
  }
  #getRootSchemaProps(type, name) {
    return {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      $id: this.#getDeclId(type, name)
    };
  }
  #shouldEmitRootSchema(type) {
    if (isAnonymousExpression(type)) {
      return false;
    }
    return this.emitter.getOptions().emitAllRefs || this.emitter.getOptions().emitAllModels || isJsonSchemaDeclaration(this.emitter.getProgram(), type);
  }
  #isStdType(type) {
    return this.emitter.getProgram().checker.isStdType(type);
  }
  #createDiscriminatedUnionDeclaration(model, name, discriminator, strategy) {
    const variants = new ArrayBuilder();
    const knownDiscriminatorValues = [];
    for (const derived of model.derivedModels) {
      if (!includeDerivedModel(derived))
        continue;
      const derivedRef = this.emitter.emitTypeReference(derived);
      variants.push(derivedRef);
      const values = this.#getDiscriminatorValues(derived, discriminator.propertyName);
      knownDiscriminatorValues.push(...values);
    }
    if (this.#isOpenDiscriminator(model, discriminator.propertyName)) {
      const catchAllVariant = this.#createCatchAllVariant(model, discriminator.propertyName, knownDiscriminatorValues);
      variants.push(catchAllVariant);
    }
    const schema4 = this.#initializeSchema(model, name, {
      type: "object",
      properties: this.emitter.emitModelProperties(model),
      required: this.#requiredModelProperties(model),
      [strategy]: variants
    });
    this.#applyConstraints(model, schema4);
    return this.#createDeclaration(model, name, schema4);
  }
  /**
   * Check if the discriminator property type is "open" (includes the string scalar type).
   * This means the discriminated union can accept unknown discriminator values.
   */
  #isOpenDiscriminator(model, discriminatorPropertyName) {
    const prop = model.properties.get(discriminatorPropertyName);
    if (!prop)
      return false;
    return this.#typeIncludesString(prop.type);
  }
  /**
   * Check if a type includes the string scalar (not just string literals).
   */
  #typeIncludesString(type) {
    const program = this.emitter.getProgram();
    switch (type.kind) {
      case "Scalar":
        return isStringType(program, type);
      case "Union":
        for (const variant of type.variants.values()) {
          if (this.#typeIncludesString(variant.type)) {
            return true;
          }
        }
        return false;
      default:
        return false;
    }
  }
  /**
   * Get string discriminator values from a model's discriminator property.
   */
  #getDiscriminatorValues(model, discriminatorPropertyName) {
    const prop = model.properties.get(discriminatorPropertyName);
    if (!prop)
      return [];
    return this.#getStringLiteralValues(prop.type);
  }
  /**
   * Extract string literal values from a type.
   */
  #getStringLiteralValues(type) {
    switch (type.kind) {
      case "String":
        return [type.value];
      case "Union":
        return [...type.variants.values()].flatMap((v) => this.#getStringLiteralValues(v.type));
      case "UnionVariant":
        return this.#getStringLiteralValues(type.type);
      case "EnumMember":
        return typeof type.value !== "number" ? [type.value ?? type.name] : [];
      default:
        return [];
    }
  }
  /**
   * Create a catch-all variant for open discriminated unions.
   * This variant matches any discriminator value not in the known values.
   */
  #createCatchAllVariant(model, discriminatorPropertyName, knownValues) {
    const properties = new ObjectBuilder();
    for (const [propName, prop] of model.properties) {
      if (propName === discriminatorPropertyName) {
        setProperty(properties, propName, {
          type: "string",
          not: { enum: knownValues }
        });
      } else {
        const result = this.emitter.emitModelProperty(prop);
        setProperty(properties, propName, result);
      }
    }
    if (!model.properties.has(discriminatorPropertyName)) {
      setProperty(properties, discriminatorPropertyName, {
        type: "string",
        not: { enum: knownValues }
      });
    }
    const required = this.#requiredModelProperties(model);
    return {
      type: "object",
      properties,
      ...required && { required }
    };
  }
  intrinsic(intrinsic, name) {
    switch (intrinsic.name) {
      case "null":
        return { type: "null" };
      case "unknown":
        return {};
      case "never":
      case "void":
        return { not: {} };
      case "ErrorType":
        return {};
      default:
        const _assertNever = intrinsic.name;
        compilerAssert5(false, "Unreachable");
    }
  }
  #reportDuplicateIds() {
    for (const [id, targets] of this.#idDuplicateTracker.entries()) {
      for (const target of targets) {
        reportDiagnostic(this.emitter.getProgram(), {
          code: "duplicate-id",
          format: { id },
          target
        });
      }
    }
  }
  async writeOutput(sourceFiles) {
    if (this.emitter.getProgram().compilerOptions.dryRun) {
      return;
    }
    this.#reportDuplicateIds();
    const toEmit = [];
    const bundleId = this.emitter.getOptions().bundleId;
    if (bundleId) {
      const content = {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        $id: bundleId,
        $defs: {}
      };
      for (const sf of sourceFiles) {
        if (sf.meta.shouldEmit) {
          const decl = sf.globalScope.declarations[0];
          content.$defs[this.#getDefKey(decl)] = this.#finalizeSourceFileContent(sf);
        }
      }
      await emitFile2(this.emitter.getProgram(), {
        path: joinPaths2(this.emitter.getOptions().emitterOutputDir, bundleId),
        content: this.#serializeSourceFileContent(content)
      });
    } else {
      for (const sf of sourceFiles) {
        const emittedSf = await this.emitter.emitSourceFile(sf);
        if (sf.meta.shouldEmit) {
          toEmit.push(emittedSf);
        }
      }
      for (const emittedSf of toEmit) {
        await emitFile2(this.emitter.getProgram(), {
          path: emittedSf.path,
          content: emittedSf.contents
        });
      }
    }
  }
  sourceFile(sourceFile) {
    const content = this.#finalizeSourceFileContent(sourceFile);
    return {
      contents: this.#serializeSourceFileContent(content),
      path: sourceFile.path
    };
  }
  #finalizeSourceFileContent(sourceFile) {
    const decls = sourceFile.globalScope.declarations;
    compilerAssert5(decls.length === 1, "Multiple decls in single schema per file mode");
    const content = { ...decls[0].value };
    const bundledDecls = /* @__PURE__ */ new Set();
    if (sourceFile.meta.bundledRefs.length > 0) {
      content.$defs = {};
      const refsToBundle = [...sourceFile.meta.bundledRefs];
      while (refsToBundle.length > 0) {
        const decl = refsToBundle.shift();
        if (bundledDecls.has(decl)) {
          continue;
        }
        bundledDecls.add(decl);
        content.$defs[this.#getDefKey(decl)] = decl.value;
        const refSf = decl.scope.sourceFile;
        refsToBundle.push(...refSf.meta.bundledRefs);
      }
    }
    return content;
  }
  #serializeSourceFileContent(content) {
    if (this.emitter.getOptions()["file-type"] === "json") {
      return JSON.stringify(content, null, 4);
    } else {
      return stringify3(content, {
        aliasDuplicateObjects: false,
        lineWidth: 0
      });
    }
  }
  #getCurrentSourceFile() {
    let scope = this.emitter.getContext().scope;
    compilerAssert5(scope, "Scope should exists");
    while (scope && scope.kind !== "sourceFile") {
      scope = scope.parentScope;
    }
    compilerAssert5(scope, "Top level scope should be a source file");
    return scope.sourceFile;
  }
  #getDeclId(type, name) {
    const baseUri = findBaseUri(this.emitter.getProgram(), type);
    const explicitId = getId(this.emitter.getProgram(), type);
    if (explicitId) {
      return this.#trackId(idWithBaseURI(explicitId, baseUri), type);
    }
    const base = this.emitter.getOptions().emitterOutputDir;
    const file = this.#getCurrentSourceFile().path;
    const relative = getRelativePathFromDirectory(base, file, false);
    if (baseUri) {
      return this.#trackId(new URL(relative, baseUri).href, type);
    } else {
      return this.#trackId(relative, type);
    }
    function idWithBaseURI(id, baseUri2) {
      if (baseUri2) {
        return new URL(id, baseUri2).href;
      } else {
        return id;
      }
    }
  }
  #trackId(id, target) {
    this.#idDuplicateTracker.track(id, target);
    return id;
  }
  #getDefKey(decl) {
    return this.#declDefKey.get(decl) ?? decl.name;
  }
  // #region context emitters
  modelDeclarationContext(model, name) {
    if (this.#isStdType(model) && model.name === "object") {
      return {};
    }
    return this.#newFileScope(model);
  }
  modelInstantiationContext(model, name) {
    if (name === void 0) {
      return {};
    } else {
      return this.#newFileScope(model);
    }
  }
  arrayDeclarationContext(array) {
    return this.#newFileScope(array);
  }
  enumDeclarationContext(en) {
    if (isAnonymousExpression(en)) {
      return {};
    }
    return this.#newFileScope(en);
  }
  unionDeclarationContext(union) {
    return this.#newFileScope(union);
  }
  scalarDeclarationContext(scalar) {
    if (this.#isStdType(scalar)) {
      return {};
    } else if (isAnonymousExpression(scalar)) {
      return {};
    } else {
      return this.#newFileScope(scalar);
    }
  }
  #newFileScope(type) {
    const sourceFile = this.emitter.createSourceFile(`${sanitizePathSegment2(this.declarationName(type))}.${this.#fileExtension()}`);
    sourceFile.meta.shouldEmit = true;
    sourceFile.meta.bundledRefs = [];
    this.#typeForSourceFile.set(sourceFile, type);
    return {
      scope: sourceFile.globalScope
    };
  }
  #fileExtension() {
    return this.emitter.getOptions()["file-type"] === "json" ? "json" : "yaml";
  }
};

// node_modules/@typespec/json-schema/dist/src/decorators.js
import { isTemplateDeclaration as isTemplateDeclaration4, isType as isType2, serializeValueAsJson as serializeValueAsJson2, setTypeSpecNamespace, typespecTypeToJson } from "@typespec/compiler";
import { useStateMap as useStateMap2, useStateSet } from "@typespec/compiler/utils";
var [
  /** Check if the given type is annotated with `@jsonSchema`  */
  getJsonSchema,
  markJsonSchema
] = useStateSet(JsonSchemaStateKeys.JsonSchema);
var $jsonSchema = (context, target, baseUriOrId) => {
  markJsonSchema(context.program, target);
  if (baseUriOrId) {
    if (target.kind === "Namespace") {
      context.call($baseUri, target, baseUriOrId);
    } else {
      context.call($id, target, baseUriOrId);
    }
  }
};
var [
  /** Get base uri set via `@baseUri` decorator */
  getBaseUri,
  setBaseUri,
  /** {@inheritdoc BaseUriDecorator} */
  $baseUri
] = createDataDecorator(JsonSchemaStateKeys["JsonSchema.baseURI"]);
function findBaseUri(program, target) {
  let baseUrl;
  let current = target;
  do {
    baseUrl = getBaseUri(program, current);
    current = current.namespace;
  } while (!baseUrl && current);
  return baseUrl;
}
function isJsonSchemaDeclaration(program, target) {
  let current = target;
  do {
    if (getJsonSchema(program, current)) {
      return true;
    }
    current = current.namespace;
  } while (current);
  return false;
}
function getJsonSchemaTypes(program) {
  const types = [];
  function visitNamespace(ns) {
    if (getJsonSchema(program, ns)) {
      types.push(ns);
    }
    visitMembers(ns.models.values());
    visitMembers(ns.enums.values());
    visitMembers(ns.unions.values());
    visitMembers(ns.scalars.values());
    for (const member of ns.namespaces.values()) {
      visitNamespace(member);
    }
  }
  function visitMembers(members) {
    for (const member of members) {
      visitDeclaration(member);
    }
  }
  function visitDeclaration(type) {
    if (!(type.kind !== "Enum" && isTemplateDeclaration4(type)) && isJsonSchemaDeclaration(program, type)) {
      types.push(type);
    }
  }
  visitNamespace(program.getGlobalNamespaceType());
  return types;
}
var [
  /** Get value set by `@multipleOf` decorator as a `Numeric` type. */
  getMultipleOfAsNumeric,
  setMultipleOf,
  /** {@inheritdoc MultipleOfDecorator} */
  $multipleOf
] = createDataDecorator(JsonSchemaStateKeys["JsonSchema.multipleOf"]);
function getMultipleOf(program, target) {
  return getMultipleOfAsNumeric(program, target)?.asNumber() ?? void 0;
}
var [
  /** Get id as set with `@id` decorator. */
  getId,
  setId,
  /** {@inheritdoc IdDecorator} */
  $id
] = createDataDecorator(JsonSchemaStateKeys["JsonSchema.id"]);
var [
  /** Check if given type is annotated with `@oneOf` decorator */
  isOneOf,
  markOneOf
] = useStateSet(JsonSchemaStateKeys["JsonSchema.oneOf"]);
var $oneOf = (context, target) => {
  markOneOf(context.program, target);
};
var [
  /** Get contains value set by `@contains` decorator */
  getContains,
  setContains,
  /** {@inheritdoc ContainsDecorator} */
  $contains
] = createDataDecorator(JsonSchemaStateKeys["JsonSchema.contains"]);
var [
  /** Get value set by `@minContains` decorator */
  getMinContains,
  setMinContains,
  /** {@inheritdoc MinContainsDecorator} */
  $minContains
] = createDataDecorator(JsonSchemaStateKeys["JsonSchema.minContains"]);
var [
  /** Get value set by `@maxContains` decorator */
  getMaxContains,
  setMaxContains,
  /** {@inheritdoc MaxContainsDecorator} */
  $maxContains
] = createDataDecorator(JsonSchemaStateKeys["JsonSchema.maxContains"]);
var [
  /** Check if the given array is annotated with `@uniqueItems` decorator */
  getUniqueItems,
  setUniqueItems
] = useStateMap2(JsonSchemaStateKeys["JsonSchema.uniqueItems"]);
var $uniqueItems = (context, target) => setUniqueItems(context.program, target, true);
var [
  /** Get minimum number of properties set by `@minProperties` decorator */
  getMinProperties,
  setMinProperties,
  /** {@inheritdoc MinPropertiesDecorator} */
  $minProperties
] = createDataDecorator(JsonSchemaStateKeys["JsonSchema.minProperties"]);
var [
  /** Get maximum number of properties set by `@maxProperties` decorator */
  getMaxProperties,
  setMaxProperties,
  /** {@inheritdoc MaxPropertiesDecorator} */
  $maxProperties
] = createDataDecorator(JsonSchemaStateKeys["JsonSchema.maxProperties"]);
var [
  /** Get content encoding as configured by `@contentEncoding` decorator. */
  getContentEncoding,
  setContentEncoding,
  /** {@inheritdoc ContentEncodingDecorator} */
  $contentEncoding
] = createDataDecorator(JsonSchemaStateKeys["JsonSchema.contentEncoding"]);
var [
  /** Get content media type as configured by `@contentMediaType` decorator. */
  getContentMediaType,
  setContentMediaType,
  /** {@inheritdoc ContentMediaTypeDecorator} */
  $contentMediaType
] = createDataDecorator(JsonSchemaStateKeys["JsonSchema.contentMediaType"]);
var [
  /** Get content schema set with `@contentSchema` decorator */
  getContentSchema,
  setContentSchema,
  /** {@inheritdoc ContentSchemaDecorator} */
  $contentSchema
] = createDataDecorator(JsonSchemaStateKeys["JsonSchema.contentSchema"]);
var [
  /** Get prefix items set with `@prefixItems` decorator */
  getPrefixItems,
  setPrefixItems
] = useStateMap2(JsonSchemaStateKeys["JsonSchema.prefixItems"]);
var $prefixItems = (context, target, value) => {
  setPrefixItems(context.program, target, value);
};
var [getExtensionsInternal, _, getExtensionsStateMap] = useStateMap2(JsonSchemaStateKeys["JsonSchema.extension"]);
var $extension = (context, target, key, value) => {
  if (!isTypeLike(value)) {
    value = convertRemainingValuesToExtensions(context.program, value);
  }
  setExtension(context.program, target, key, value);
};
function convertRemainingValuesToExtensions(program, value) {
  switch (typeof value) {
    case "string":
    case "number":
    case "boolean":
      return value;
    case "object":
      if (value === null) {
        return null;
      }
      if (Array.isArray(value)) {
        return value.map((x) => convertRemainingValuesToExtensions(program, x));
      }
      if (isTypeSpecValue(value)) {
        return serializeValueAsJson2(program, value, value.type);
      } else {
        const result = {};
        for (const [key, val] of Object.entries(value)) {
          if (val === void 0) {
            continue;
          }
          result[key] = convertRemainingValuesToExtensions(program, val);
        }
        return result;
      }
    default:
      return value;
  }
}
function isTypeLike(value) {
  return typeof value === "object" && value !== null && isType2(value);
}
function isTypeSpecValue(value) {
  return "entityKind" in value && value.entityKind === "Value";
}
function getExtensions(program, target) {
  return getExtensionsInternal(program, target) ?? [];
}
function setExtension(program, target, key, value) {
  const stateMap = getExtensionsStateMap(program);
  const extensions = stateMap.has(target) ? stateMap.get(target) : stateMap.set(target, []).get(target);
  if (isJsonTemplateType(value)) {
    extensions.push({
      key,
      value: typespecTypeToJson(value.properties.get("value").type, target)[0]
    });
  } else {
    extensions.push({ key, value });
  }
}
function isJsonTemplateType(value) {
  return typeof value === "object" && value !== null && isType2(value) && value.kind === "Model" && value.name === "Json" && value.namespace?.name === "JsonSchema";
}
var $validatesRawJson = (context, target, value) => {
  const [_2, diagnostics] = typespecTypeToJson(value, target);
  if (diagnostics.length > 0) {
    context.program.reportDiagnostics(diagnostics);
  }
};
setTypeSpecNamespace("Private", $validatesRawJson);

// node_modules/@typespec/json-schema/dist/src/on-emit.js
import {} from "@typespec/compiler";
async function $onEmit(context) {
  const emitter = createAssetEmitter(context.program, JsonSchemaEmitter, context);
  if (emitter.getOptions().emitAllModels) {
    emitter.emitProgram({ emitTypeSpecNamespace: false });
  } else {
    for (const item of getJsonSchemaTypes(context.program)) {
      emitter.emitType(item);
    }
  }
  await emitter.writeOutput();
}

// node_modules/@typespec/json-schema/dist/src/tsp-index.js
var tsp_index_exports = {};
__export(tsp_index_exports, {
  $decorators: () => $decorators,
  $flags: () => $flags,
  $lib: () => $lib
});
var $decorators = {
  "TypeSpec.JsonSchema": {
    jsonSchema: $jsonSchema,
    baseUri: $baseUri,
    id: $id,
    oneOf: $oneOf,
    multipleOf: $multipleOf,
    contains: $contains,
    minContains: $minContains,
    maxContains: $maxContains,
    uniqueItems: $uniqueItems,
    minProperties: $minProperties,
    maxProperties: $maxProperties,
    contentEncoding: $contentEncoding,
    prefixItems: $prefixItems,
    contentMediaType: $contentMediaType,
    contentSchema: $contentSchema,
    extension: $extension
  },
  "TypeSpec.JsonSchema.Private": {
    validatesRawJson: $validatesRawJson
  }
};

// node_modules/@typespec/json-schema/dist/src/index.js
var namespace = "TypeSpec.JsonSchema";

// virtual:virtual:entry.js
var TypeSpecJSSources = {
  "dist/src/index.js": src_exports,
  "dist/src/tsp-index.js": tsp_index_exports
};
var TypeSpecSources = {
  "package.json": '{"name":"@typespec/json-schema","version":"1.17.0","author":"Microsoft Corporation","description":"TypeSpec library for emitting TypeSpec to JSON Schema and converting JSON Schema to TypeSpec","homepage":"https://github.com/microsoft/typespec","readme":"https://github.com/microsoft/typespec/blob/main/README.md","license":"MIT","repository":{"type":"git","url":"git+https://github.com/microsoft/typespec.git"},"bugs":{"url":"https://github.com/microsoft/typespec/issues"},"keywords":["TypeSpec","json schema"],"type":"module","main":"dist/src/index.js","exports":{".":{"typespec":"./lib/main.tsp","types":"./dist/src/index.d.ts","default":"./dist/src/index.js"},"./testing":{"types":"./dist/src/testing/index.d.ts","default":"./dist/src/testing/index.js"}},"tspMain":"lib/main.tsp","engines":{"node":">=22.0.0"},"files":["lib/*.tsp","dist/**","!dist/test/**"],"peerDependencies":{"@typespec/compiler":"^1.17.0"},"devDependencies":{"@types/node":"^26.3.0","@vitest/coverage-v8":"^5.0.0","@vitest/ui":"^5.0.0","ajv":"^8.20.0","ajv-formats":"^3.0.1","rimraf":"^6.1.3","typescript":"npm:@typescript/typescript6@~6.0.2","vitest":"^5.0.0","@typespec/compiler":"^1.17.0","@typespec/internal-build-utils":"^0.87.0","@typespec/library-linter":"^0.87.0","@typespec/tspd":"^0.77.1"},"dependencies":{"yaml":"^2.9.0","@typespec/asset-emitter":"^0.79.3"},"scripts":{"clean":"rimraf ./dist ./temp","build":"pnpm gen-extern-signature && tsc -p tsconfig.build.json && pnpm lint-typespec-library && pnpm api-extractor","watch":"tsc -p tsconfig.build.json --watch","gen-extern-signature":"tspd --enable-experimental gen-extern-signature .","lint-typespec-library":"tsp compile . --warn-as-error --import @typespec/library-linter --no-emit","test":"vitest run","test:ui":"vitest --ui","test:ci":"vitest run --coverage --reporter=junit --reporter=default","lint":"oxlint . --deny-warnings","lint:fix":"oxlint . --fix","regen-docs":"tspd doc .  --enable-experimental --llmstxt  --output-dir ../../website/src/content/docs/docs/emitters/json-schema/reference","api-extractor":"api-extractor run --local --verbose"}}',
  "../compiler/lib/intrinsics.tsp": 'import "../dist/src/lib/intrinsic/tsp-index.js";\nimport "./prototypes.tsp";\n\n// This file contains all the intrinsic types of typespec. Everything here will always be loaded\nnamespace TypeSpec;\n\n/**\n * Represent a byte array\n */\nscalar bytes;\n\n/**\n * A numeric type\n */\nscalar numeric;\n\n/**\n * A whole number. This represent any `integer` value possible.\n * It is commonly represented as `BigInteger` in some languages.\n */\nscalar integer extends numeric;\n\n/**\n * A number with decimal value\n */\nscalar float extends numeric;\n\n/**\n * A 64-bit integer. (`-9,223,372,036,854,775,808` to `9,223,372,036,854,775,807`)\n */\nscalar int64 extends integer;\n\n/**\n * A 32-bit integer. (`-2,147,483,648` to `2,147,483,647`)\n */\nscalar int32 extends int64;\n\n/**\n * A 16-bit integer. (`-32,768` to `32,767`)\n */\nscalar int16 extends int32;\n\n/**\n * A 8-bit integer. (`-128` to `127`)\n */\nscalar int8 extends int16;\n\n/**\n * A 64-bit unsigned integer (`0` to `18,446,744,073,709,551,615`)\n */\nscalar uint64 extends integer;\n\n/**\n * A 32-bit unsigned integer (`0` to `4,294,967,295`)\n */\nscalar uint32 extends uint64;\n\n/**\n * A 16-bit unsigned integer (`0` to `65,535`)\n */\nscalar uint16 extends uint32;\n\n/**\n * A 8-bit unsigned integer (`0` to `255`)\n */\nscalar uint8 extends uint16;\n\n/**\n * An integer that can be serialized to JSON (`\u22129007199254740991 (\u2212(2^53 \u2212 1))` to `9007199254740991 (2^53 \u2212 1)` )\n */\nscalar safeint extends int64;\n\n/**\n * A 64 bit floating point number. (`\xB15.0 \xD7 10^\u2212324` to `\xB11.7 \xD7 10^308`)\n */\nscalar float64 extends float;\n\n/**\n * A 32 bit floating point number. (`\xB11.5 x 10^\u221245` to `\xB13.4 x 10^38`)\n */\nscalar float32 extends float64;\n\n/**\n * A decimal number with any length and precision. This represent any `decimal` value possible.\n * It is commonly represented as `BigDecimal` in some languages.\n */\nscalar decimal extends numeric;\n\n/**\n * A 128-bit decimal number.\n */\nscalar decimal128 extends decimal;\n\n/**\n * A sequence of textual characters.\n */\nscalar string;\n\n/**\n * A date on a calendar without a time zone, e.g. "April 10th"\n */\nscalar plainDate {\n  /**\n   * Create a plain date from an ISO 8601 string.\n   * @example\n   *\n   * ```tsp\n   * const date = plainDate.fromISO("2024-05-06");\n   * ```\n   */\n  init fromISO(value: string);\n\n  /**\n   * Create a plain date representing the current date.\n   * @example\n   *\n   * ```tsp\n   * const date = plainDate.now();\n   * ```\n   */\n  init now();\n}\n\n/**\n * A time on a clock without a time zone, e.g. "3:00 am"\n */\nscalar plainTime {\n  /**\n   * Create a plain time from an ISO 8601 string.\n   * @example\n   *\n   * ```tsp\n   * const time = plainTime.fromISO("12:34");\n   * ```\n   */\n  init fromISO(value: string);\n\n  /**\n   * Create a plain time representing the current time.\n   * @example\n   *\n   * ```tsp\n   * const time = plainTime.now();\n   * ```\n   */\n  init now();\n}\n\n/**\n * An instant in coordinated universal time (UTC)"\n */\nscalar utcDateTime {\n  /**\n   * Create a date from an ISO 8601 string.\n   * @example\n   *\n   * ```tsp\n   * const time = utcDateTime.fromISO("2024-05-06T12:20-12Z");\n   * ```\n   */\n  init fromISO(value: string);\n\n  /**\n   * Create a date representing the current date and time in UTC.\n   * @example\n   *\n   * ```tsp\n   * const time = utcDateTime.now();\n   * ```\n   */\n  init now();\n}\n\n/**\n * A date and time in a particular time zone, e.g. "April 10th at 3:00am in PST"\n */\nscalar offsetDateTime {\n  /**\n   * Create a date from an ISO 8601 string.\n   * @example\n   *\n   * ```tsp\n   * const time = offsetDateTime.fromISO("2024-05-06T12:20-12-0700");\n   * ```\n   */\n  init fromISO(value: string);\n\n  /**\n   * Create a date representing the current date and time with offset.\n   * @example\n   *\n   * ```tsp\n   * const time = offsetDateTime.now();\n   * ```\n   */\n  init now();\n}\n\n/**\n * A duration/time period. e.g 5s, 10h\n */\nscalar duration {\n  /**\n   * Create a duration from an ISO 8601 string.\n   * @example\n   *\n   * ```tsp\n   * const time = duration.fromISO("P1Y1D");\n   * ```\n   */\n  init fromISO(value: string);\n}\n\n/**\n * Boolean with `true` and `false` values.\n */\nscalar boolean;\n\n/**\n * @dev Array model type, equivalent to `Element[]`\n * @template Element The type of the array elements\n */\n@indexer(integer, Element)\nmodel Array<Element> {}\n\n/**\n * @dev Model with string properties where all the properties have type `Property`\n * @template Element The type of the properties\n */\n@indexer(string, Element)\nmodel Record<Element> {}\n',
  "../compiler/lib/prototypes.tsp": "namespace TypeSpec.Prototypes;\n\ninternal extern dec getter(target: unknown);\n\nnamespace Types {\n  interface ModelProperty {\n    @getter type(): unknown;\n  }\n\n  interface Operation {\n    @getter returnType(): unknown;\n    @getter parameters(): unknown;\n  }\n\n  interface Array<TElementType> {\n    @getter elementType(): TElementType;\n  }\n}\n",
  "../compiler/lib/std/main.tsp": '// TypeSpec standard library. Everything in here can be omitted by using `--nostdlib` cli flag or `nostdlib` in the config.\nimport "./types.tsp";\nimport "./decorators.tsp";\nimport "./reflection.tsp";\nimport "./visibility.tsp";\n',
  "../compiler/lib/std/types.tsp": 'namespace TypeSpec;\n\n/**\n * Represent a 32-bit unix timestamp datetime with 1s of granularity.\n * It measures time by the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970.\n */\n@encode("unixTimestamp", int32)\nscalar unixTimestamp32 extends utcDateTime;\n\n/**\n * Represent a URL string as described by https://url.spec.whatwg.org/\n */\nscalar url extends string;\n\n/**\n * Represents a collection of optional properties.\n *\n * @template Source An object whose spread properties are all optional.\n */\n@doc("The template for adding optional properties.")\n@withOptionalProperties\nmodel OptionalProperties<Source> {\n  ...Source;\n}\n\n/**\n * Represents a collection of updateable properties.\n *\n * @template Source An object whose spread properties are all updateable.\n */\n@doc("The template for adding updateable properties.")\n@withUpdateableProperties\nmodel UpdateableProperties<Source> {\n  ...Source;\n}\n\n/**\n * Represents a collection of omitted properties.\n *\n * @template Source An object whose properties are spread.\n * @template Keys The property keys to omit.\n */\n@doc("The template for omitting properties.")\n@withoutOmittedProperties(Keys)\nmodel OmitProperties<Source, Keys extends string> {\n  ...Source;\n}\n\n/**\n * Represents a collection of properties with only the specified keys included.\n *\n * @template Source An object whose properties are spread.\n * @template Keys The property keys to include.\n */\n@doc("The template for picking properties.")\n@withPickedProperties(Keys)\nmodel PickProperties<Source, Keys extends string> {\n  ...Source;\n}\n\n/**\n * Represents a collection of properties with default values omitted.\n *\n * @template Source An object whose spread property defaults are all omitted.\n */\n@withoutDefaultValues\nmodel OmitDefaults<Source> {\n  ...Source;\n}\n\n/**\n * Applies a visibility setting to a collection of properties.\n *\n * @template Source An object whose properties are spread.\n * @template Visibility The visibility to apply to all properties.\n */\n@doc("The template for setting the default visibility of key properties.")\n@withDefaultKeyVisibility(Visibility)\nmodel DefaultKeyVisibility<Source, Visibility extends valueof Reflection.EnumMember> {\n  ...Source;\n}\n',
  "../compiler/lib/std/decorators.tsp": 'import "../../dist/src/lib/tsp-index.js";\n\nusing TypeSpec.Reflection;\n\nnamespace TypeSpec;\n\n/**\n * Typically a short, single-line description.\n * @param summary Summary string.\n *\n * @example\n * ```typespec\n * @summary("This is a pet")\n * model Pet {}\n * ```\n */\nextern dec summary(target: unknown, summary: valueof string);\n\n/**\n * Attach a documentation string. Content support CommonMark markdown formatting.\n * @param doc Documentation string\n * @param formatArgs Record with key value pair that can be interpolated in the doc.\n *\n * @example\n * ```typespec\n * @doc("Represent a Pet available in the PetStore")\n * model Pet {}\n * ```\n */\nextern dec doc(target: unknown, doc: valueof string, formatArgs?: {});\n\n/**\n * Attach a documentation string to describe the successful return types of an operation.\n * If an operation returns a union of success and errors it only describes the success. See `@errorsDoc` for error documentation.\n * @param doc Documentation string\n *\n * @example\n * ```typespec\n * @returnsDoc("Returns doc")\n * op get(): Pet | NotFound;\n * ```\n */\nextern dec returnsDoc(target: Operation, doc: valueof string);\n\n/**\n * Attach a documentation string to describe the error return types of an operation.\n * If an operation returns a union of success and errors it only describes the errors. See `@returnsDoc` for success documentation.\n * @param doc Documentation string\n *\n * @example\n * ```typespec\n * @errorsDoc("Errors doc")\n * op get(): Pet | NotFound;\n * ```\n */\nextern dec errorsDoc(target: Operation, doc: valueof string);\n\n/**\n * Service options.\n */\nmodel ServiceOptions {\n  /**\n   * Title of the service.\n   */\n  title?: string;\n}\n\n/**\n * Mark this namespace as describing a service and configure service properties.\n * @param options Optional configuration for the service.\n *\n * @example\n * ```typespec\n * @service\n * namespace PetStore;\n * ```\n *\n * @example Setting service title\n * ```typespec\n * @service(#{title: "Pet store"})\n * namespace PetStore;\n * ```\n */\nextern dec service(target: Namespace, options?: valueof ServiceOptions);\n\n/**\n * Specify that this model is an error type. Operations return error types when the operation has failed.\n *\n * @example\n * ```typespec\n * @error\n * model PetStoreError {\n *   code: string;\n *   message: string;\n * }\n * ```\n */\nextern dec error(target: Model);\n\n/**\n * Applies a media type hint to a TypeSpec type. Emitters and libraries may choose to use this hint to determine how a\n * type should be serialized. For example, the `@typespec/http` library will use the media type hint of the response\n * body type as a default `Content-Type` if one is not explicitly specified in the operation.\n *\n * Media types (also known as MIME types) are defined by RFC 6838. The media type hint should be a valid media type\n * string as defined by the RFC, but the decorator does not enforce or validate this constraint.\n *\n * Notes: the applied media type is _only_ a hint. It may be overridden or not used at all. Media type hints are\n * inherited by subtypes. If a media type hint is applied to a model, it will be inherited by all other models that\n * `extend` it unless they delcare their own media type hint.\n *\n * @param mediaType The media type hint to apply to the target type.\n *\n * @example create a model that serializes as XML by default\n *\n * ```tsp\n * @mediaTypeHint("application/xml")\n * model Example {\n *   @visibility(Lifecycle.Read)\n *   id: string;\n *\n *   name: string;\n * }\n * ```\n */\nextern dec mediaTypeHint(target: Model | Scalar | Enum | Union, mediaType: valueof string);\n\n// Cannot apply this to the scalar itself. Needs to be applied here so that we don\'t crash nostdlib scenarios\n@@mediaTypeHint(TypeSpec.bytes, "application/octet-stream");\n\n// @@mediaTypeHint(TypeSpec.string "text/plain") -- This is hardcoded in the compiler to avoid circularity\n// between the initialization of the string scalar and the `valueof string` required to call the\n// `mediaTypeHint` decorator.\n\n/**\n * Specify a known data format hint for this string type. For example `uuid`, `uri`, etc.\n * This differs from the `@pattern` decorator which is meant to specify a regular expression while `@format` accepts a known format name.\n * The format names are open ended and are left to emitter to interpret.\n *\n * @param format format name.\n *\n * @example\n * ```typespec\n * @format("uuid")\n * scalar uuid extends string;\n * ```\n */\nextern dec format(target: string | ModelProperty, format: valueof string);\n\n/**\n * Specify the the pattern this string should respect using simple regular expression syntax.\n * The following syntax is allowed: alternations (`|`), quantifiers (`?`, `*`, `+`, and `{ }`), wildcard (`.`), and grouping parentheses.\n * Advanced features like look-around, capture groups, and references are not supported.\n *\n * This decorator may optionally provide a custom validation _message_. Emitters may choose to use the message to provide\n * context when pattern validation fails. For the sake of consistency, the message should be a phrase that describes in\n * plain language what sort of content the pattern attempts to validate. For example, a complex regular expression that\n * validates a GUID string might have a message like "Must be a valid GUID."\n *\n * @param pattern Regular expression.\n * @param validationMessage Optional validation message that may provide context when validation fails.\n *\n * @example\n * ```typespec\n * @pattern("[a-z]+", "Must be a string consisting of only lower case letters and of at least one character.")\n * scalar LowerAlpha extends string;\n * ```\n */\nextern dec pattern(\n  target: string | bytes | ModelProperty,\n  pattern: valueof string,\n  validationMessage?: valueof string\n);\n\n/**\n * Specify the minimum length this string type should be.\n * @param value Minimum length\n *\n * @example\n * ```typespec\n * @minLength(2)\n * scalar Username extends string;\n * ```\n */\nextern dec minLength(target: string | ModelProperty, value: valueof integer);\n\n/**\n * Specify the maximum length this string type should be.\n * @param value Maximum length\n *\n * @example\n * ```typespec\n * @maxLength(20)\n * scalar Username extends string;\n * ```\n */\nextern dec maxLength(target: string | ModelProperty, value: valueof integer);\n\n/** Types that can have range limits */\nalias RangeLimitableTypes =\n  | numeric\n  | utcDateTime\n  | offsetDateTime\n  | plainDate\n  | plainTime\n  | duration;\n\n/**\n * Specify the minimum number of items this array should have.\n * @param value Minimum number\n *\n * @example\n * ```typespec\n * @minItems(1)\n * model Endpoints is string[];\n * ```\n */\nextern dec minItems(target: unknown[] | ModelProperty, value: valueof integer);\n\n/**\n * Specify the maximum number of items this array should have.\n * @param value Maximum number\n *\n * @example\n * ```typespec\n * @maxItems(5)\n * model Endpoints is string[];\n * ```\n */\nextern dec maxItems(target: unknown[] | ModelProperty, value: valueof integer);\n\n/**\n * Specify the minimum value this numeric type should be.\n * @param value Minimum value\n *\n * @example\n * ```typespec\n * @minValue(18)\n * scalar Age is int32;\n * ```\n */\nextern dec minValue(\n  target: RangeLimitableTypes | ModelProperty,\n  value: valueof RangeLimitableTypes\n);\n\n/**\n * Specify the maximum value this numeric type should be.\n * @param value Maximum value\n *\n * @example\n * ```typespec\n * @maxValue(200)\n * scalar Age is int32;\n * ```\n */\nextern dec maxValue(\n  target: RangeLimitableTypes | ModelProperty,\n  value: valueof RangeLimitableTypes\n);\n\n/**\n * Specify the minimum value this numeric type should be, exclusive of the given\n * value.\n * @param value Minimum value\n *\n * @example\n * ```typespec\n * @minValueExclusive(0)\n * scalar distance is float64;\n * ```\n */\nextern dec minValueExclusive(\n  target: RangeLimitableTypes | ModelProperty,\n  value: valueof RangeLimitableTypes\n);\n\n/**\n * Specify the maximum value this numeric type should be, exclusive of the given\n * value.\n * @param value Maximum value\n *\n * @example\n * ```typespec\n * @maxValueExclusive(50)\n * scalar distance is float64;\n * ```\n */\nextern dec maxValueExclusive(\n  target: RangeLimitableTypes | ModelProperty,\n  value: valueof RangeLimitableTypes\n);\n\n/**\n * Mark this value as a secret value that should be treated carefully to avoid exposure\n *\n * @example\n * ```typespec\n * @secret\n * scalar Password is string;\n * ```\n */\nextern dec secret(target: Scalar | ModelProperty | Model | Union | Enum);\n\n/**\n * Attaches a tag to an operation, interface, or namespace. Multiple `@tag` decorators can be specified to attach multiple tags to a TypeSpec element.\n * @param tag Tag value\n */\nextern dec tag(target: Namespace | Interface | Operation, tag: valueof string);\n\n/**\n * Specifies how a templated type should name their instances.\n * @param name name the template instance should take\n * @param formatArgs Model with key value used to interpolate the name\n *\n * @example\n * ```typespec\n * @friendlyName("{name}List", T)\n * model List<Item> {\n *   value: Item[];\n *   nextLink: string;\n * }\n * ```\n */\nextern dec friendlyName(target: unknown, name: valueof string, formatArgs?: unknown);\n\n/**\n * Mark a model property as the key to identify instances of that type\n * @param altName Name of the property. If not specified, the decorated property name is used.\n *\n * @example\n * ```typespec\n * model Pet {\n *   @key id: string;\n * }\n * ```\n */\nextern dec key(target: ModelProperty, altName?: valueof string);\n\n/**\n * Specify this operation is an overload of the given operation.\n * @param overloadbase Base operation that should be a union of all overloads\n *\n * @example\n * ```typespec\n * op upload(data: string | bytes, @header contentType: "text/plain" | "application/octet-stream"): void;\n * @overload(upload)\n * op uploadString(data: string, @header contentType: "text/plain" ): void;\n * @overload(upload)\n * op uploadBytes(data: bytes, @header contentType: "application/octet-stream"): void;\n * ```\n */\nextern dec overload(target: Operation, overloadbase: Operation);\n\n/**\n * Provide an alternative name for this type when serialized to the given mime type.\n * @param mimeType Mime type this should apply to. The mime type should be a known mime type as described here https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types without any suffix (e.g. `+json`)\n * @param name Alternative name\n *\n * @example\n *\n * ```typespec\n * model Certificate {\n *   @encodedName("application/json", "exp")\n *   @encodedName("application/xml", "expiry")\n *   expireAt: int32;\n * }\n * ```\n *\n * @example Invalid values\n *\n * ```typespec\n * @encodedName("application/merge-patch+json", "exp")\n *              ^ error cannot use subtype\n * ```\n */\nextern dec encodedName(target: unknown, mimeType: valueof string, name: valueof string);\n\n/**\n * Options for `@discriminated` decorator.\n */\nmodel DiscriminatedOptions {\n  /**\n   * How is the discriminated union serialized.\n   * @default object\n   */\n  envelope?: "object" | "none";\n\n  /** Name of the discriminator property */\n  discriminatorPropertyName?: string;\n\n  /** Name of the property envelopping the data */\n  envelopePropertyName?: string;\n}\n\n/**\n * Specify that this union is discriminated.\n * @param options Options to configure the serialization of the discriminated union.\n *\n * @example\n *\n * ```typespec\n * @discriminated\n * union Pet{ cat: Cat, dog: Dog }\n *\n * model Cat { name: string, meow: boolean }\n * model Dog { name: string, bark: boolean }\n * ```\n * Serialized as:\n * ```json\n * {\n *   "kind": "cat",\n *   "value": {\n *     "name": "Whiskers",\n *     "meow": true\n *   }\n * },\n * {\n *   "kind": "dog",\n *   "value": {\n *     "name": "Rex",\n *     "bark": false\n *   }\n * }\n * ```\n *\n * @example Custom property names\n *\n * ```typespec\n * @discriminated(#{discriminatorPropertyName: "dataKind", envelopePropertyName: "data"})\n * union Pet{ cat: Cat, dog: Dog }\n *\n * model Cat { name: string, meow: boolean }\n * model Dog { name: string, bark: boolean }\n * ```\n * Serialized as:\n * ```json\n * {\n *   "dataKind": "cat",\n *   "data": {\n *     "name": "Whiskers",\n *     "meow": true\n *   }\n * },\n * {\n *   "dataKind": "dog",\n *   "data": {\n *     "name": "Rex",\n *     "bark": false\n *   }\n * }\n * ```\n */\nextern dec discriminated(target: Union, options?: valueof DiscriminatedOptions);\n\n/**\n * Specify the property to be used to discriminate this type.\n * @param propertyName The property name to use for discrimination\n *\n * @example\n *\n * ```typespec\n * @discriminator("kind")\n * model Pet{ kind: string }\n *\n * model Cat extends Pet {kind: "cat", meow: boolean}\n * model Dog extends Pet  {kind: "dog", bark: boolean}\n * ```\n */\nextern dec discriminator(target: Model, propertyName: valueof string);\n\n/**\n * Known encoding to use on utcDateTime or offsetDateTime\n */\nenum DateTimeKnownEncoding {\n  /**\n   * RFC 3339 standard. https://www.ietf.org/rfc/rfc3339.txt\n   * Encode to string.\n   */\n  rfc3339: "rfc3339",\n\n  /**\n   * RFC 7231 standard. https://www.ietf.org/rfc/rfc7231.txt\n   * Encode to string.\n   */\n  rfc7231: "rfc7231",\n\n  /**\n   * Encode a datetime to a unix timestamp.\n   * Unix timestamps are represented as an integer number of seconds since the Unix epoch and usually encoded as an int32.\n   */\n  unixTimestamp: "unixTimestamp",\n}\n\n/**\n * Known encoding to use on duration\n */\nenum DurationKnownEncoding {\n  /**\n   * ISO8601 duration\n   */\n  ISO8601: "ISO8601",\n\n  /**\n   * Encode to integer or float as seconds\n   */\n  seconds: "seconds",\n\n  /**\n   * Encode to integer or float as milliseconds\n   */\n  milliseconds: "milliseconds",\n}\n\n/**\n * Known encoding to use on bytes\n */\nenum BytesKnownEncoding {\n  /**\n   * Encode to Base64\n   */\n  base64: "base64",\n\n  /**\n   * Encode to Base64 Url\n   */\n  base64url: "base64url",\n}\n\n/**\n * Encoding for serializing arrays\n */\nenum ArrayEncoding {\n  /**\n   * Each value of the array is separated by a pipe character (|).\n   * Values can only contain | if the underlying protocol supports encoding them.\n   * - json -> error\n   * - http -> %7C\n   */\n  pipeDelimited,\n\n  /**\n   * Each value of the array is separated by a space character.\n   * Values can only contain spaces if the underlying protocol supports encoding them.\n   * - json -> error\n   * - http -> %20\n   */\n  spaceDelimited,\n\n  /**\n   * Each value of the array is separated by a comma (,).\n   * Values can only contain commas if the underlying protocol supports encoding them.\n   * - json -> error\n   * - http -> %2C\n   */\n  commaDelimited,\n\n  /**\n   * Each value of the array is separated by a newline character (\\n).\n   * Values can only contain newlines if the underlying protocol supports encoding them.\n   * - json -> error\n   * - http -> %0A\n   */\n  newlineDelimited,\n}\n\n/**\n * Specify how to encode the target type.\n * @param encodingOrEncodeAs Known name of an encoding or a scalar type to encode as(Only for numeric and boolean types to encode as string).\n * @param encodedAs What target type is this being encoded as. Default to string.\n *\n * @example offsetDateTime encoded with rfc7231\n *\n * ```tsp\n * @encode("rfc7231")\n * scalar myDateTime extends offsetDateTime;\n * ```\n *\n * @example utcDateTime encoded with unixTimestamp\n *\n * ```tsp\n * @encode("unixTimestamp", int32)\n * scalar myDateTime extends unixTimestamp;\n * ```\n *\n * @example encode numeric type to string\n *\n * ```tsp\n * model Pet {\n *   @encode(string) id: int64;\n * }\n * ```\n *\n * @example encode boolean type to string\n *\n * `@encode(string)` on boolean uses case-insensitive `true` / `false` values.\n *\n * ```tsp\n * model FeatureFlags {\n *   @encode(string) enabled: boolean;\n * }\n * ```\n */\nextern dec encode(\n  target: Scalar | ModelProperty,\n  encodingOrEncodeAs: (valueof string | EnumMember) | Scalar,\n  encodedAs?: Scalar\n);\n\n/** Options for example decorators */\nmodel ExampleOptions {\n  /** The title of the example */\n  title?: string;\n\n  /** Description of the example */\n  description?: string;\n}\n\n/**\n * Provide an example value for a data type.\n *\n * @param example Example value.\n * @param options Optional metadata for the example.\n *\n * @example\n *\n * ```tsp\n * @example(#{name: "Fluffy", age: 2})\n * model Pet {\n *  name: string;\n *  age: int32;\n * }\n * ```\n */\nextern dec example(\n  target: Model | Enum | Scalar | Union | ModelProperty | UnionVariant,\n  example: valueof unknown,\n  options?: valueof ExampleOptions\n);\n\n/**\n * Operation example configuration.\n */\nmodel OperationExample {\n  /** Example request body. */\n  parameters?: unknown;\n\n  /** Example response body. */\n  returnType?: unknown;\n}\n\n/**\n * Provide example values for an operation\'s parameters and corresponding return type.\n *\n * @param example Example value.\n * @param options Optional metadata for the example.\n *\n * @example\n *\n * ```tsp\n * @opExample(#{parameters: #{name: "Fluffy", age: 2}, returnType: #{name: "Fluffy", age: 2, id: "abc"})\n * op createPet(pet: Pet): Pet;\n * ```\n */\nextern dec opExample(\n  target: Operation,\n  example: valueof OperationExample,\n  options?: valueof ExampleOptions\n);\n\n/**\n * Returns the model with required properties removed.\n */\nextern dec withOptionalProperties(target: Model);\n\n/**\n * Returns the model with any default values removed.\n */\nextern dec withoutDefaultValues(target: Model);\n\n/**\n * Returns the model with the given properties omitted.\n * @param omit List of properties to omit\n */\nextern dec withoutOmittedProperties(target: Model, omit: string | Union);\n\n/**\n * Returns the model with only the given properties included.\n * @param pick List of properties to include\n */\nextern dec withPickedProperties(target: Model, pick: string | Union);\n\n//---------------------------------------------------------------------------\n// Paging\n//---------------------------------------------------------------------------\n\n/**\n * Mark this operation as a `list` operation that returns a paginated list of items.\n */\nextern dec list(target: Operation);\n\n/**\n * Pagination property defining the number of items to skip.\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n * }\n * @list op listPets(@offset skip: int32, @pageSize pageSize: int8): Page<Pet>;\n * ```\n */\nextern dec offset(target: ModelProperty);\n\n/**\n * Pagination property defining the page index.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n * }\n * @list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;\n * ```\n */\nextern dec pageIndex(target: ModelProperty);\n\n/**\n * Specify the pagination parameter that controls the maximum number of items to include in a page.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n * }\n * @list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;\n * ```\n */\nextern dec pageSize(target: ModelProperty);\n\n/**\n * Specify the the property that contains the array of page items.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n * }\n * @list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;\n * ```\n */\nextern dec pageItems(target: ModelProperty);\n\n/**\n * Pagination property defining the token to get to the next page.\n * It MUST be specified both on the request parameter and the response.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n *   @continuationToken continuationToken: string;\n * }\n * @list op listPets(@continuationToken continuationToken: string): Page<Pet>;\n * ```\n */\nextern dec continuationToken(target: ModelProperty);\n\n/**\n * Pagination property defining a link to the next page.\n *\n * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n *   @nextLink next: url;\n *   @prevLink prev: url;\n *   @firstLink first: url;\n *   @lastLink last: url;\n * }\n * @list op listPets(): Page<Pet>;\n * ```\n */\nextern dec nextLink(target: ModelProperty);\n\n/**\n * Pagination property defining a link to the previous page.\n *\n * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n *   @nextLink next: url;\n *   @prevLink prev: url;\n *   @firstLink first: url;\n *   @lastLink last: url;\n * }\n * @list op listPets(): Page<Pet>;\n * ```\n */\nextern dec prevLink(target: ModelProperty);\n\n/**\n * Pagination property defining a link to the first page.\n *\n * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n *   @nextLink next: url;\n *   @prevLink prev: url;\n *   @firstLink first: url;\n *   @lastLink last: url;\n * }\n * @list op listPets(): Page<Pet>;\n * ```\n */\nextern dec firstLink(target: ModelProperty);\n\n/**\n * Pagination property defining a link to the last page.\n *\n * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n *   @nextLink next: url;\n *   @prevLink prev: url;\n *   @firstLink first: url;\n *   @lastLink last: url;\n * }\n * @list op listPets(): Page<Pet>;\n * ```\n */\nextern dec lastLink(target: ModelProperty);\n\n//---------------------------------------------------------------------------\n// Debugging\n//---------------------------------------------------------------------------\n\n/**\n * A debugging decorator used to inspect a type.\n * @param text Custom text to log\n */\nextern dec inspectType(target: unknown, text: valueof string);\n\n/**\n * A debugging decorator used to inspect a type name.\n * @param text Custom text to log\n */\nextern dec inspectTypeName(target: unknown, text: valueof string);\n',
  "../compiler/lib/std/reflection.tsp": "namespace TypeSpec.Reflection;\n\nmodel Enum {}\nmodel EnumMember {}\nmodel Interface {}\nmodel Model {}\nmodel ModelProperty {}\nmodel Namespace {}\nmodel Operation {}\nmodel Scalar {}\nmodel Union {}\nmodel UnionVariant {}\nmodel StringTemplate {}\n",
  "../compiler/lib/std/visibility.tsp": '// Copyright (c) Microsoft Corporation\n// Licensed under the MIT license.\n\nimport "../../dist/src/lib/tsp-index.js";\n\nusing TypeSpec.Reflection;\n\nnamespace TypeSpec;\n\n/**\n * Sets the visibility modifiers that are active on a property, indicating that it is only considered to be present\n * (or "visible") in contexts that select for the given modifiers.\n *\n * A property without any visibility settings applied for any visibility class (e.g. `Lifecycle`) is considered to have\n * the default visibility settings for that class.\n *\n * If visibility for the property has already been set for a visibility class (for example, using `@invisible` or\n * `@removeVisibility`), this decorator will **add** the specified visibility modifiers to the property.\n *\n * See: [Visibility](https://typespec.io/docs/language-basics/visibility)\n *\n * The `@typespec/http` library uses `Lifecycle` visibility to determine which properties are included in the request or\n * response bodies of HTTP operations. By default, it uses the following visibility settings:\n *\n * - For the return type of operations, properties are included if they have `Lifecycle.Read` visibility.\n * - For POST operation parameters, properties are included if they have `Lifecycle.Create` visibility.\n * - For PUT operation parameters, properties are included if they have `Lifecycle.Create` or `Lifecycle.Update` visibility.\n * - For PATCH operation parameters, properties are included if they have `Lifecycle.Update` visibility.\n * - For DELETE operation parameters, properties are included if they have `Lifecycle.Delete` visibility.\n * - For GET or HEAD operation parameters, properties are included if they have `Lifecycle.Query` visibility.\n *\n * By default, properties have all five Lifecycle visibility modifiers enabled, so a property is visible in all contexts\n * by default.\n *\n * The default settings may be overridden using the `@returnTypeVisibility` and `@parameterVisibility` decorators.\n *\n * See also: [Automatic visibility](https://typespec.io/docs/libraries/http/operations#automatic-visibility)\n *\n * @param visibilities List of visibilities which apply to this property.\n *\n * @example\n *\n * ```typespec\n * model Dog {\n *   // The service will generate an ID, so you don\'t need to send it.\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   // The service will store this secret name, but won\'t ever return it.\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   // The regular name has all vi\n *   name: string;\n * }\n * ```\n */\nextern dec visibility(target: ModelProperty, ...visibilities: valueof EnumMember[]);\n\n/**\n * Indicates that a property is not visible in the given visibility class.\n *\n * This decorator removes all active visibility modifiers from the property within\n * the given visibility class, making it invisible to any context that selects for\n * visibility modifiers within that class.\n *\n * @param visibilityClass The visibility class to make the property invisible within.\n *\n * @example\n * ```typespec\n * model Example {\n *   @invisible(Lifecycle)\n *   hidden_property: string;\n * }\n * ```\n */\nextern dec invisible(target: ModelProperty, visibilityClass: Enum);\n\n/**\n * Removes visibility modifiers from a property.\n *\n * If the visibility modifiers for a visibility class have not been initialized,\n * this decorator will use the default visibility modifiers for the visibility\n * class as the default modifier set.\n *\n * @param target The property to remove visibility from.\n * @param visibilities The visibility modifiers to remove from the target property.\n *\n * @example\n * ```typespec\n * model Example {\n *   // This property will have all Lifecycle visibilities except the Read\n *   // visibility, since it is removed.\n *   @removeVisibility(Lifecycle.Read)\n *   secret_property: string;\n * }\n * ```\n */\nextern dec removeVisibility(target: ModelProperty, ...visibilities: valueof EnumMember[]);\n\n/**\n * Removes properties that do not have at least one of the given visibility modifiers\n * active.\n *\n * If no visibility modifiers are supplied, this decorator has no effect.\n *\n * See also: [Automatic visibility](https://typespec.io/docs/libraries/http/operations#automatic-visibility)\n *\n * When using an emitter that applies visibility automatically, it is generally\n * not necessary to use this decorator.\n *\n * @param visibilities List of visibilities that apply to this property.\n *\n * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   name: string;\n * }\n *\n * // The spread operator will copy all the properties of Dog into DogRead,\n * // and @withVisibility will then remove those that are not visible with\n * // create or update visibility.\n * //\n * // In this case, the id property is removed, and the name and secretName\n * // properties are kept.\n * @withVisibility(Lifecycle.Create, Lifecycle.Update)\n * model DogCreateOrUpdate {\n *   ...Dog;\n * }\n *\n * // In this case the id and name properties are kept and the secretName property\n * // is removed.\n * @withVisibility(Lifecycle.Read)\n * model DogRead {\n *   ...Dog;\n * }\n * ```\n */\nextern dec withVisibility(target: Model, ...visibilities: valueof EnumMember[]);\n\n/**\n * Set the visibility of key properties in a model if not already set.\n *\n * This will set the visibility modifiers of all key properties in the model if the visibility is not already _explicitly_ set,\n * but will not change the visibility of any properties that have visibility set _explicitly_, even if the visibility\n * is the same as the default visibility.\n *\n * Visibility may be set explicitly using any of the following decorators:\n *\n * - `@visibility`\n * - `@removeVisibility`\n * - `@invisible`\n *\n * @param visibility The desired default visibility value. If a key property already has visibility set, it will not be changed.\n */\nextern dec withDefaultKeyVisibility(target: Model, visibility: valueof EnumMember);\n\n/**\n * Declares the visibility constraint of the parameters of a given operation.\n *\n * A parameter or property nested within a parameter will be visible if it has _any_ of the visibilities\n * in the list.\n *\n * It is invalid to call this decorator with no visibility modifiers.\n *\n * @param visibilities List of visibility modifiers that apply to the parameters of this operation.\n */\nextern dec parameterVisibility(target: Operation, ...visibilities: valueof EnumMember[]);\n\n/**\n * Declares the visibility constraint of the return type of a given operation.\n *\n * A property within the return type of the operation will be visible if it has _any_ of the visibilities\n * in the list.\n *\n * It is invalid to call this decorator with no visibility modifiers.\n *\n * @param visibilities List of visibility modifiers that apply to the return type of this operation.\n */\nextern dec returnTypeVisibility(target: Operation, ...visibilities: valueof EnumMember[]);\n\n/**\n * Returns the model with non-updateable properties removed.\n */\nextern dec withUpdateableProperties(target: Model);\n\n/**\n * Declares the default visibility modifiers for a visibility class.\n *\n * The default modifiers are used when a property does not have any visibility decorators\n * applied to it.\n *\n * The modifiers passed to this decorator _MUST_ be members of the target Enum.\n *\n * @param visibilities the list of modifiers to use as the default visibility modifiers.\n */\nextern dec defaultVisibility(target: Enum, ...visibilities: valueof EnumMember[]);\n\n/**\n * A visibility class for resource lifecycle phases.\n *\n * These visibilities control whether a property is visible during the various phases of a resource\'s lifecycle.\n *\n * @example\n * ```typespec\n * model Dog {\n *  @visibility(Lifecycle.Read)\n *  id: int32;\n *\n *  @visibility(Lifecycle.Create, Lifecycle.Update)\n *  secretName: string;\n *\n *  name: string;\n * }\n * ```\n *\n * In this example, the `id` property is only visible during the read phase, and the `secretName` property is only visible\n * during the create and update phases. This means that the server will return the `id` property when returning a `Dog`,\n * but the client will not be able to set or update it. In contrast, the `secretName` property can be set when creating\n * or updating a `Dog`, but the server will never return it. The `name` property has no visibility modifiers and is\n * therefore visible in all phases.\n */\nenum Lifecycle {\n  /**\n   * The property is visible when a resource is being created.\n   */\n  Create,\n\n  /**\n   * The property is visible when a resource is being read.\n   */\n  Read,\n\n  /**\n   * The property is visible when a resource is being updated.\n   */\n  Update,\n\n  /**\n   * The property is visible when a resource is being deleted.\n   */\n  Delete,\n\n  /**\n   * The property is visible when a resource is being queried.\n   *\n   * In HTTP APIs, this visibility applies to parameters of GET or HEAD operations.\n   */\n  Query,\n}\n\n/**\n * A visibility filter, used to specify which properties should be included when\n * using the `withVisibilityFilter` decorator.\n *\n * The filter matches any property with ALL of the following:\n * - If the `any` key is present, the property must have at least one of the specified visibilities.\n * - If the `all` key is present, the property must have all of the specified visibilities.\n * - If the `none` key is present, the property must have none of the specified visibilities.\n */\nmodel VisibilityFilter {\n  any?: EnumMember[];\n  all?: EnumMember[];\n  none?: EnumMember[];\n}\n\n/**\n * Applies the given visibility filter to the properties of the target model.\n *\n * This transformation is recursive, so it will also apply the filter to any nested\n * or referenced models that are the types of any properties in the `target`.\n *\n * If a `nameTemplate` is provided, newly-created type instances will be named according\n * to the template. See the `@friendlyName` decorator for more information on the template\n * syntax. The transformed type is provided as the argument to the template.\n *\n * @param target The model to apply the visibility filter to.\n * @param filter The visibility filter to apply to the properties of the target model.\n * @param nameTemplate The name template to use when renaming new model instances.\n *\n * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   name: string;\n * }\n *\n * @withVisibilityFilter(#{ all: #[Lifecycle.Read] })\n * model DogRead {\n *  ...Dog\n * }\n * ```\n */\n#deprecated "withVisibilityFilter is deprecated and will be removed in a future release. Use the `FilterVisibility` template or Lifecycle specific templates (e.g. `Read`, `Create`, `Update`, etc.) instead."\nextern dec withVisibilityFilter(\n  target: Model,\n  filter: valueof VisibilityFilter,\n  nameTemplate?: valueof string\n);\n\n/**\n * A copy of the input model `M` with only the properties that match the given visibility filter.\n *\n * This transformation is recursive, so it will also apply the filter to any nested\n * or referenced models that are the types of any properties in the `target`.\n *\n * If a `nameTemplate` is provided, newly-created type instances will be named according\n * to the template. See the `@friendlyName` decorator for more information on the template\n * syntax. The transformed type is provided as the argument to the template.\n *\n * @template M the model to apply the visibility filter to.\n * @template Filter the visibility filter to apply to the properties of the target model.\n * @template NameTemplate the name template to use when renaming new type instances.\n *\n * @example\n * ```typespec\n * model Dog {\n *   @visibility(CustomVisibility.A)\n *   id: int32;\n *   @removeVisibility(CustomVisibility.A)\n *   name: string;\n * }\n *\n * enum CustomVisibility {\n *   A,\n *   B,\n * }\n *\n * const customFilter: VisibilityFilter = #{ all: #[CustomVisibility.A] };\n *\n * // This model will have the `id` property but not the `name` property, since `id` has the CustomVisibility.A visibility and `name` does not.\n * model DogRead is FilterVisibility<Dog, customFilter, "Read{name}">;\n * ```\n */\nalias FilterVisibility<\n  M extends Model,\n  Filter extends valueof VisibilityFilter,\n  NameTemplate extends valueof string\n> = applyVisibilityFilter(M, Filter, NameTemplate);\n\n#suppress "experimental-feature"\ninternal extern fn applyVisibilityFilter(\n  input: Model,\n  filter: valueof VisibilityFilter,\n  nameTemplate?: valueof string\n): Model;\n\n/**\n * Transforms the `target` model to include only properties that are visible during the\n * "Update" lifecycle phase.\n *\n * Any nested models of optional properties will be transformed into the "CreateOrUpdate"\n * lifecycle phase instead of the "Update" lifecycle phase, so that nested models may be\n * fully updated.\n *\n * If a `nameTemplate` is provided, newly-created type instances will be named according\n * to the template. See the `@friendlyName` decorator for more information on the template\n * syntax. The transformed type is provided as the argument to the template.\n *\n * @param target The model to apply the transformation to.\n * @param nameTemplate The name template to use when renaming new model instances.\n *\n * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   name: string;\n * }\n *\n * @withLifecycleUpdate\n * model DogUpdate {\n *   ...Dog\n * }\n * ```\n */\n#deprecated "withLifecycleUpdate is deprecated and will be removed in a future release. Use the `Update` template instead."\nextern dec withLifecycleUpdate(target: Model, nameTemplate?: valueof string);\n\n#suppress "experimental-feature"\ninternal extern fn applyLifecycleUpdate(input: Model, nameTemplate?: valueof string): Model;\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Create" resource lifecycle phase.\n *\n * This transformation is recursive, and will include only properties that have the\n * `Lifecycle.Create` visibility modifier.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   name: string;\n * }\n *\n * // This model has only the `name` field.\n * model CreateDog is Create<Dog>;\n * ```\n */\nalias Create<\n  T extends Model,\n  NameTemplate extends valueof string = "Create{name}"\n> = applyVisibilityFilter(T, #{ all: #[Lifecycle.Create] }, NameTemplate);\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Read" resource lifecycle phase.\n *\n * The "Read" lifecycle phase is used for properties returned by operations that read data, like\n * HTTP GET operations.\n *\n * This transformation is recursive, and will include only properties that have the\n * `Lifecycle.Read` visibility modifier.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   name: string;\n * }\n *\n * // This model has the `id` and `name` fields, but not `secretName`.\n * model ReadDog is Read<Dog>;\n * ```\n */\nalias Read<\n  T extends Model,\n  NameTemplate extends valueof string = "Read{name}"\n> = applyVisibilityFilter(T, #{ all: #[Lifecycle.Read] }, NameTemplate);\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Update" resource lifecycle phase.\n *\n * The "Update" lifecycle phase is used for properties passed as parameters to operations\n * that update data, like HTTP PATCH operations.\n *\n * This transformation will include only the properties that have the `Lifecycle.Update`\n * visibility modifier, and the types of all properties will be replaced with the\n * equivalent `CreateOrUpdate` transformation.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   name: string;\n * }\n *\n * // This model will have the `secretName` and `name` fields, but not the `id` field.\n * model UpdateDog is Update<Dog>;\n * ```\n */\nalias Update<\n  T extends Model,\n  NameTemplate extends valueof string = "Update{name}"\n> = applyLifecycleUpdate(T, NameTemplate);\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Create" or "Update" resource lifecycle phases.\n *\n * The "CreateOrUpdate" lifecycle phase is used by default for properties passed as parameters to operations\n * that can create _or_ update data, like HTTP PUT operations.\n *\n * This transformation is recursive, and will include only properties that have the\n * `Lifecycle.Create` or `Lifecycle.Update` visibility modifier.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   @visibility(Lifecycle.Create)\n *   immutableSecret: string;\n *\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   name: string;\n * }\n *\n * // This model will have the `immutableSecret`, `secretName`, and `name` fields, but not the `id` field.\n * model CreateOrUpdateDog is CreateOrUpdate<Dog>;\n * ```\n */\nalias CreateOrUpdate<\n  T extends Model,\n  NameTemplate extends valueof string = "CreateOrUpdate{name}"\n> = applyVisibilityFilter(T, #{ any: #[Lifecycle.Create, Lifecycle.Update] }, NameTemplate);\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Delete" resource lifecycle phase.\n *\n * The "Delete" lifecycle phase is used for properties passed as parameters to operations\n * that delete data, like HTTP DELETE operations.\n *\n * This transformation is recursive, and will include only properties that have the\n * `Lifecycle.Delete` visibility modifier.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   // Set when the Dog is removed from our data store. This happens when the\n *   // Dog is re-homed to a new owner.\n *   @visibility(Lifecycle.Delete)\n *   nextOwner: string;\n *\n *   name: string;\n * }\n *\n * // This model will have the `nextOwner` and `name` fields, but not the `id` field.\n * model DeleteDog is Delete<Dog>;\n * ```\n */\nalias Delete<\n  T extends Model,\n  NameTemplate extends valueof string = "Delete{name}"\n> = applyVisibilityFilter(T, #{ all: #[Lifecycle.Delete] }, NameTemplate);\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Query" resource lifecycle phase.\n *\n * The "Query" lifecycle phase is used for properties passed as parameters to operations\n * that read data, like HTTP GET or HEAD operations. This should not be confused for\n * the `@query` decorator, which specifies that the property is transmitted in the\n * query string of an HTTP request.\n *\n * This transformation is recursive, and will include only properties that have the\n * `Lifecycle.Query` visibility modifier.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   // When getting information for a Dog, you can set this field to true to include\n *   // some extra information about the Dog\'s pedigree that is normally not returned.\n *   // Alternatively, you could just use a separate option parameter to get this\n *   // information.\n *   @visibility(Lifecycle.Query)\n *   includePedigree?: boolean;\n *\n *   name: string;\n *\n *   // Only included if `includePedigree` is set to true in the request.\n *   @visibility(Lifecycle.Read)\n *   pedigree?: string;\n * }\n *\n * // This model will have the `includePedigree` and `name` fields, but not `id` or `pedigree`.\n * model QueryDog is Query<Dog>;\n * ```\n */\nalias Query<\n  T extends Model,\n  NameTemplate extends valueof string = "Query{name}"\n> = applyVisibilityFilter(T, #{ all: #[Lifecycle.Query] }, NameTemplate);\n',
  "lib/main.tsp": 'import "../dist/src/tsp-index.js";\n\nnamespace TypeSpec.JsonSchema;\n\n/**\n * Add to namespaces to emit models within that namespace to JSON schema.\n * Add to another declaration to emit that declaration to JSON schema.\n *\n * Optionally, for namespaces, you can provide a baseUri, and for other declarations,\n * you can provide the id.\n *\n * @param baseUri Schema IDs are interpreted as relative to this URI.\n */\nextern dec jsonSchema(target: unknown, baseUri?: valueof string);\n\n/**\n * Set the base URI for any schemas emitted from types within this namespace.\n *\n * @param baseUri The base URI. Schema IDs inside this namespace are relative to this URI.\n */\nextern dec baseUri(target: Reflection.Namespace, baseUri: valueof string);\n\n/**\n * Specify the JSON Schema id. If this model or a parent namespace has a base URI,\n * the provided ID will be relative to that base URI.\n *\n * By default, the id will be constructed based on the declaration\'s name.\n *\n * @param id The id of the JSON schema for this declaration.\n */\nextern dec id(target: unknown, id: valueof string);\n\n/**\n * Specify that `oneOf` should be used instead of `anyOf` for that union.\n */\nextern dec oneOf(target: Reflection.Union | Reflection.ModelProperty);\n\n/**\n * Specify that the numeric type must be a multiple of some numeric value.\n *\n * @param value The numeric type must be a multiple of this value.\n */\nextern dec multipleOf(target: numeric | Reflection.ModelProperty, value: valueof numeric);\n\n/**\n * Specify that the array must contain at least one instance of the provided type.\n * Use `@minContains` and `@maxContains` to customize how many instances to expect.\n *\n * @param value The type the array must contain.\n */\nextern dec contains(target: unknown[] | Reflection.ModelProperty, value: unknown);\n\n/**\n * Used in conjunction with the `@contains` decorator,\n * specifies that the array must contain at least a certain number of the types provided by the `@contains` decorator.\n *\n * @param value The minimum number of instances the array must contain\n */\nextern dec minContains(target: unknown[] | Reflection.ModelProperty, value: valueof int32);\n\n/**\n * Used in conjunction with the `@contains` decorator,\n * specifies that the array must contain at most a certain number of the types provided by the `@contains` decorator.\n *\n * @param value The maximum number of instances the array must contain\n */\nextern dec maxContains(target: unknown[] | Reflection.ModelProperty, value: valueof int32);\n\n/**\n * Specify that every item in the array must be unique.\n */\nextern dec uniqueItems(target: unknown[] | Reflection.ModelProperty);\n\n/**\n * Specify the minimum number of properties this object can have.\n *\n * @param value The minimum number of properties this object can have.\n */\nextern dec minProperties(target: Record<unknown> | Reflection.ModelProperty, value: valueof int32);\n\n/**\n * Specify the maximum number of properties this object can have.\n *\n * @param value The maximum number of properties this object can have.\n */\nextern dec maxProperties(target: Record<unknown> | Reflection.ModelProperty, value: valueof int32);\n\n/**\n * Specify the encoding used for the contents of a string.\n * @param value\n */\nextern dec contentEncoding(target: string | Reflection.ModelProperty, value: valueof string);\n\n/**\n * Specify that the target array must begin with the provided types.\n *\n * @param value A tuple containing the types that must be present at the start of the array\n */\nextern dec prefixItems(target: unknown[] | Reflection.ModelProperty, value: unknown[]);\n\n/**\n * Specify the content type of content stored in a string.\n *\n * @param value The media type of the string contents\n *\n */\nextern dec contentMediaType(target: string | Reflection.ModelProperty, value: valueof string);\n\n/**\n * Specify the schema for the contents of a string when interpreted according to the content\'s\n * media type and encoding.\n *\n * @param value The schema of the string contents\n */\nextern dec contentSchema(target: string | Reflection.ModelProperty, value: unknown);\n\n/**\n * Specify a custom property to add to the emitted schema. This is useful for adding custom keywords\n * and other vendor-specific extensions. Scalar values need to be specified using `typeof` to be converted to a schema.\n * \n * For example, `@extension("x-schema", typeof "foo")` will emit a JSON schema value for `x-schema`,\n * whereas `@extension("x-schema", "foo")` will emit the raw code `"foo"`.\n *\n * The value will be treated as a raw value if any of the following are true:\n * - The value is a scalar value (e.g. string, number, boolean, etc.)\n * - The value is wrapped in the `Json<Data>` template\n * - The value is provided using the value syntax (e.g. `#{}`, `#[]`)\n \n * For example, `@extension("x-schema", { x: "value" })` will emit a JSON schema value for `x-schema`,\n * whereas `@extension("x-schema", #{x: "value"})` and `@extension("x-schema", Json<{x: "value"}>)`\n * will emit the raw JSON code `{x: "value"}`.\n *\n * @param key The name of the keyword of vendor extension, e.g. `x-custom`.\n * @param value The value of the keyword.\n */\nextern dec extension(target: unknown, key: valueof string, value: (valueof unknown) | unknown);\n\n/**\n * Well-known JSON Schema formats.\n */\nenum Format {\n  /** A date and time, as defined by the `date-time` production in [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6). */\n  dateTime: "date-time",\n\n  /** A calendar date, as defined by the `full-date` production in [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6). */\n  date: "date",\n\n  /** A time of day, as defined by the `full-time` production in [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6). */\n  time: "time",\n\n  /** An ISO 8601 duration such as `P3DT4H5M`, as defined by the `duration` production in [RFC 3339, appendix A](https://datatracker.ietf.org/doc/html/rfc3339#appendix-A). */\n  duration: "duration",\n\n  /** An email address, as defined by the `addr-spec` production in [RFC 5322](https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1). */\n  email: "email",\n\n  /** An internationalized email address, as defined by [RFC 6531](https://datatracker.ietf.org/doc/html/rfc6531). */\n  idnEmail: "idn-email",\n\n  /** A host name, as defined by [RFC 1123](https://datatracker.ietf.org/doc/html/rfc1123#section-2.1). */\n  hostname: "hostname",\n\n  /** An internationalized host name, as defined by [RFC 5890](https://datatracker.ietf.org/doc/html/rfc5890#section-2.3.2.3). */\n  idnHostname: "idn-hostname",\n\n  /** An IPv4 address, as defined by the `dotted-quad` production in [RFC 2673](https://datatracker.ietf.org/doc/html/rfc2673#section-3.2). */\n  ipv4: "ipv4",\n\n  /** An IPv6 address, as defined by [RFC 4291](https://datatracker.ietf.org/doc/html/rfc4291#section-2.2). */\n  ipv6: "ipv6",\n\n  /** A URI, as defined by [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986). */\n  uri: "uri",\n\n  /** A URI reference, which may be relative, as defined by [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-4.1). */\n  uriReference: "uri-reference",\n\n  /** An internationalized resource identifier, as defined by [RFC 3987](https://datatracker.ietf.org/doc/html/rfc3987). */\n  iri: "iri",\n\n  /** An internationalized resource identifier reference, which may be relative, as defined by [RFC 3987](https://datatracker.ietf.org/doc/html/rfc3987). */\n  iriReference: "iri-reference",\n\n  /** A universally unique identifier, as defined by [RFC 4122](https://datatracker.ietf.org/doc/html/rfc4122). */\n  uuid: "uuid",\n\n  /** A JSON pointer, as defined by [RFC 6901](https://datatracker.ietf.org/doc/html/rfc6901). */\n  jsonPointer: "json-pointer",\n\n  /** A relative JSON pointer, as defined by the [relative JSON pointer draft](https://datatracker.ietf.org/doc/html/draft-handrews-relative-json-pointer-01). */\n  relativeJsonPointer: "relative-json-pointer",\n\n  /** A regular expression, as defined by [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/). */\n  regex: "regex",\n}\n\n/**\n * Specify that the provided template argument should be emitted as raw JSON or YAML\n * as opposed to a schema. Use in combination with the `@extension` decorator. For example,\n * `@extension("x-schema", { x: "value" })` will emit a JSON schema value for `x-schema`,\n * whereas `@extension("x-schema", Json<{x: "value"}>)` will emit the raw JSON code\n * `{x: "value"}`.\n *\n * @template Data the type to convert to raw JSON\n */\n@Private.validatesRawJson(Data)\nmodel Json<Data> {\n  /** The value to emit as raw JSON or YAML. */\n  value: Data;\n}\n\nnamespace Private {\n  extern dec validatesRawJson(target: Reflection.Model, value: unknown);\n}\n'
};
var _TypeSpecLibrary_ = {
  jsSourceFiles: TypeSpecJSSources,
  typespecSourceFiles: TypeSpecSources
};
export {
  $baseUri,
  $contains,
  $contentEncoding,
  $contentMediaType,
  $contentSchema,
  $decorators,
  $extension,
  $flags,
  $id,
  $jsonSchema,
  $lib,
  $maxContains,
  $maxProperties,
  $minContains,
  $minProperties,
  $multipleOf,
  $onEmit,
  $oneOf,
  $prefixItems,
  $uniqueItems,
  EmitterOptionsSchema,
  JsonSchemaEmitter,
  _TypeSpecLibrary_,
  findBaseUri,
  getBaseUri,
  getContains,
  getContentEncoding,
  getContentMediaType,
  getContentSchema,
  getExtensions,
  getId,
  getJsonSchema,
  getJsonSchemaTypes,
  getMaxContains,
  getMaxProperties,
  getMinContains,
  getMinProperties,
  getMultipleOf,
  getMultipleOfAsNumeric,
  getPrefixItems,
  getUniqueItems,
  isJsonSchemaDeclaration,
  isOneOf,
  namespace,
  setExtension
};
