import {
  checkFormatTypeSpec,
  formatTypeSpec,
  printTypeSpecNode
} from "./chunk-YMXWYG7H.js";
import {
  TypeSpecConfigFilename,
  TypeSpecConfigJsonSchema,
  createJSONSchemaValidator,
  createResolveModuleHost,
  createSourceLoader,
  defaultConfig,
  doIO,
  emitterOptionsSchema,
  findProjectRoot,
  findTypeSpecConfigPath,
  getLocationInYamlScript,
  isDocument,
  isMap,
  isPair,
  isScalar,
  isSeq,
  linterRuleSetFilePrefix,
  loadFile,
  loadJsFile,
  loadLinterRuleSetFile,
  loadTypeSpecConfigFile,
  loadTypeSpecConfigForPath,
  moduleResolutionErrorToDiagnostic,
  parseDocument,
  parseYaml,
  resolveTypeSpecEntrypoint,
  stringify,
  validateConfigPathsAbsolute,
  visit
} from "./chunk-JFWK62HV.js";
import {
  ResolveModuleError,
  resolveModule
} from "./chunk-IDJX66SY.js";
import {
  $defaultVisibility,
  $discriminator,
  $doc,
  $encode,
  $encodedName,
  $error,
  $errorsDoc,
  $example,
  $format,
  $friendlyName,
  $inspectType,
  $inspectTypeName,
  $invisible,
  $key,
  $maxItems,
  $maxLength,
  $maxValue,
  $maxValueExclusive,
  $mediaTypeHint,
  $minItems,
  $minLength,
  $minValue,
  $minValueExclusive,
  $opExample,
  $overload,
  $parameterVisibility,
  $pattern,
  $removeVisibility,
  $returnTypeVisibility,
  $returnsDoc,
  $secret,
  $service,
  $summary,
  $tag,
  $visibility,
  $withDefaultKeyVisibility,
  $withLifecycleUpdate,
  $withOptionalProperties,
  $withPickedProperties,
  $withUpdateableProperties,
  $withVisibility,
  $withVisibilityFilter,
  $withoutDefaultValues,
  $withoutOmittedProperties,
  EmptyVisibilityProvider,
  EventEmitter,
  Numeric,
  UnserializableValueError,
  UnsupportedScalarConstructorError,
  VisibilityFilter,
  addService,
  addVisibilityModifiers,
  applyLifecycleUpdate,
  applyVisibilityFilter,
  clearVisibilityModifiersForClass,
  compilerFeatureNames,
  compilerFeatures,
  continuationTokenDecorator,
  createBinder,
  createChecker,
  createSymbol,
  createSymbolTable,
  discriminatedDecorator,
  docFromCommentDecorator,
  explainStringTemplateNotSerializable,
  filterModelProperties,
  firstLinkDecorator,
  getAllTags,
  getAutoDecoratorTargets,
  getAutoDecoratorValue,
  getDeprecated,
  getDeprecationDetails,
  getDiscriminatedTypes,
  getDiscriminatedUnion,
  getDiscriminatedUnionFromInheritance,
  getDiscriminator,
  getDoc,
  getDocData,
  getEffectiveModelType,
  getEncode,
  getEntityName,
  getErrorsDoc,
  getErrorsDocData,
  getExamples,
  getFormat,
  getFriendlyName,
  getFullyQualifiedSymbolName,
  getKey,
  getLifecycleVisibilityEnum,
  getLocationContext,
  getMaxItems,
  getMaxItemsAsNumeric,
  getMaxLength,
  getMaxLengthAsNumeric,
  getMaxValue,
  getMaxValueAsNumeric,
  getMaxValueExclusive,
  getMaxValueExclusiveAsNumeric,
  getMaxValueExclusiveForScalar,
  getMaxValueForScalar,
  getMediaTypeHint,
  getMinItems,
  getMinItemsAsNumeric,
  getMinLength,
  getMinLengthAsNumeric,
  getMinValue,
  getMinValueAsNumeric,
  getMinValueExclusive,
  getMinValueExclusiveAsNumeric,
  getMinValueExclusiveForScalar,
  getMinValueForScalar,
  getNamespaceFullName,
  getOpExamples,
  getOverloadedOperation,
  getOverloads,
  getPagingOperation,
  getParameterVisibilityFilter,
  getPattern,
  getPatternData,
  getProperty,
  getPropertyType,
  getRawTextWithCache,
  getReturnTypeVisibilityFilter,
  getReturnsDoc,
  getReturnsDocData,
  getService,
  getSummary,
  getSymNode,
  getTags,
  getTypeName,
  getVisibilityForClass,
  getterDecorator,
  hasAutoDecorator,
  hasVisibility,
  indexerDecorator,
  isArrayModelType,
  isDeclaredInNamespace,
  isDeclaredType,
  isDeprecated,
  isErrorModel,
  isErrorType,
  isGlobalNamespace,
  isKey,
  isList,
  isNeverType,
  isNullType,
  isNumeric,
  isNumericType,
  isRecordModelType,
  isSealed,
  isSecret,
  isService,
  isStdNamespace,
  isStringType,
  isTemplateDeclaration,
  isTemplateDeclarationOrInstance,
  isTemplateInstance,
  isType,
  isTypeSpecValueTypeOf,
  isUnknownType,
  isValue,
  isVisible,
  isVoidType,
  lastLinkDecorator,
  listDecorator,
  listServices,
  mapEventEmitterToNodeListener,
  markDeprecated,
  navigateProgram,
  navigateType,
  navigateTypesInNamespace,
  nextLinkDecorator,
  offsetDecorator,
  pageIndexDecorator,
  pageItemsDecorator,
  pageSizeDecorator,
  prevLinkDecorator,
  removeVisibilityModifiers,
  resetVisibilityModifiersForClass,
  resolveEncodedName,
  scopeNavigationToNamespace,
  sealVisibilityModifiers,
  sealVisibilityModifiersForProgram,
  serializeValueAsJson,
  setAutoDecorator,
  setMediaTypeHint,
  typespecTypeToJson,
  validateDecoratorNotOnType,
  validateDecoratorUniqueOnNode,
  validateEncodedNamesConflicts,
  validatePagingOperations,
  walkPropertiesInherited
} from "./chunk-PQ47JQDM.js";
import "./chunk-LS4CFXSY.js";
import {
  createPerfReporter,
  perf
} from "./chunk-G5YGM2MV.js";
import "./chunk-HC4YXFN4.js";
import "./chunk-54OXEPL2.js";
import "./chunk-3X2732FK.js";
import {
  CharCode,
  ListenerFlow,
  ModifierFlags,
  NoTarget,
  NodeFlags,
  ResolutionResultFlags,
  SymbolFlags,
  SyntaxKind,
  Token,
  TokenFlags,
  assertType,
  compilerAssert,
  compilerDiagnosticCodes,
  createDiagnostic,
  createDiagnosticCollector,
  createDiagnosticCreator,
  createScanner,
  createSourceFile,
  defineCodeFix,
  getDiagnosticTemplateInstantitationTrace,
  getFirstAncestor,
  getNodeAtPosition,
  getNodeAtPositionDetail,
  getNodeForTarget,
  getPositionBeforeTrivia,
  getSourceFileKindFromExt,
  getSourceLocation,
  ignoreDiagnostics,
  isKeyword,
  isPunctuation,
  isReservedKeyword,
  isWhiteSpace,
  logDiagnostics,
  paramMessage,
  parse,
  parseStandaloneTypeReference,
  positionInRange,
  printIdentifier,
  reportDeprecated,
  skipTrivia,
  skipWhiteSpace,
  visitChildren
} from "./chunk-THH472PB.js";
import {
  deepEquals,
  distinctArray,
  firstNonWhitespaceCharacterIndex,
  getEnvironmentVariable,
  getNormalizedRealPath,
  isArray,
  isDefined,
  isPromise,
  isWhitespaceStringOrUndefined,
  mapEquals,
  mutate,
  omitUndefined,
  readUrlOrPath,
  resolveRelativeUrlOrPath,
  resolveTspMain,
  tryParseJson
} from "./chunk-LIGHGDDD.js";
import {
  ensureTrailingDirectorySeparator,
  getAnyExtensionFromPath,
  getBaseFileName,
  getDirectoryPath,
  getNormalizedAbsolutePath,
  getNormalizedAbsolutePathWithoutRoot,
  getNormalizedPathComponents,
  getPathComponents,
  getPathFromPathComponents,
  getRelativePathFromDirectory,
  getRootLength,
  hasTrailingDirectorySeparator,
  isAnyDirectorySeparator,
  isPathAbsolute,
  isUrl,
  joinPaths,
  normalizePath,
  normalizeSlashes,
  reducePathComponents,
  removeTrailingDirectorySeparator,
  resolvePath
} from "./chunk-UKSZG66X.js";
import {
  define_process_env_default,
  init_define_process_env
} from "./chunk-D557AYM7.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  __toESM
} from "./chunk-VOEMSLEO.js";

// node_modules/vscode-jsonrpc/lib/common/is.js
var require_is = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/is.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boolean = boolean;
    exports.string = string;
    exports.number = number;
    exports.error = error;
    exports.func = func;
    exports.array = array;
    exports.stringArray = stringArray;
    function boolean(value) {
      return value === true || value === false;
    }
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    function error(value) {
      return value instanceof Error;
    }
    function func(value) {
      return typeof value === "function";
    }
    function array(value) {
      return Array.isArray(value);
    }
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
  }
});

// node_modules/vscode-jsonrpc/lib/common/messages.js
var require_messages = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messages.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Message = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType = exports.RequestType0 = exports.AbstractMessageSignature = exports.ParameterStructures = exports.ResponseError = exports.ErrorCodes = void 0;
    var is = __importStar(require_is());
    var ErrorCodes;
    (function(ErrorCodes2) {
      ErrorCodes2.ParseError = -32700;
      ErrorCodes2.InvalidRequest = -32600;
      ErrorCodes2.MethodNotFound = -32601;
      ErrorCodes2.InvalidParams = -32602;
      ErrorCodes2.InternalError = -32603;
      ErrorCodes2.jsonrpcReservedErrorRangeStart = -32099;
      ErrorCodes2.serverErrorStart = -32099;
      ErrorCodes2.MessageWriteError = -32099;
      ErrorCodes2.MessageReadError = -32098;
      ErrorCodes2.PendingResponseRejected = -32097;
      ErrorCodes2.ConnectionInactive = -32096;
      ErrorCodes2.ServerNotInitialized = -32002;
      ErrorCodes2.UnknownErrorCode = -32001;
      ErrorCodes2.jsonrpcReservedErrorRangeEnd = -32e3;
      ErrorCodes2.serverErrorEnd = -32e3;
    })(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
    var ResponseError = class _ResponseError extends Error {
      code;
      data;
      constructor(code, message, data) {
        super(message);
        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, _ResponseError.prototype);
      }
      toJson() {
        const result = {
          code: this.code,
          message: this.message
        };
        if (this.data !== void 0) {
          result.data = this.data;
        }
        return result;
      }
    };
    exports.ResponseError = ResponseError;
    var ParameterStructures = class _ParameterStructures {
      kind;
      /**
       * The parameter structure is automatically inferred on the number of parameters
       * and the parameter type in case of a single param.
       */
      static auto = new _ParameterStructures("auto");
      /**
       * Forces `byPosition` parameter structure. This is useful if you have a single
       * parameter which has a literal type.
       */
      static byPosition = new _ParameterStructures("byPosition");
      /**
       * Forces `byName` parameter structure. This is only useful when having a single
       * parameter. The library will report errors if used with a different number of
       * parameters.
       */
      static byName = new _ParameterStructures("byName");
      constructor(kind) {
        this.kind = kind;
      }
      static is(value) {
        return value === _ParameterStructures.auto || value === _ParameterStructures.byName || value === _ParameterStructures.byPosition;
      }
      toString() {
        return this.kind;
      }
    };
    exports.ParameterStructures = ParameterStructures;
    var AbstractMessageSignature = class {
      method;
      numberOfParams;
      constructor(method, numberOfParams) {
        this.method = method;
        this.numberOfParams = numberOfParams;
      }
      get parameterStructures() {
        return ParameterStructures.auto;
      }
    };
    exports.AbstractMessageSignature = AbstractMessageSignature;
    var RequestType0 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 0);
      }
    };
    exports.RequestType0 = RequestType0;
    var RequestType = class extends AbstractMessageSignature {
      _parameterStructures;
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports.RequestType = RequestType;
    var RequestType1 = class extends AbstractMessageSignature {
      _parameterStructures;
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports.RequestType1 = RequestType1;
    var RequestType2 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 2);
      }
    };
    exports.RequestType2 = RequestType2;
    var RequestType3 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 3);
      }
    };
    exports.RequestType3 = RequestType3;
    var RequestType4 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 4);
      }
    };
    exports.RequestType4 = RequestType4;
    var RequestType5 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 5);
      }
    };
    exports.RequestType5 = RequestType5;
    var RequestType6 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 6);
      }
    };
    exports.RequestType6 = RequestType6;
    var RequestType7 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 7);
      }
    };
    exports.RequestType7 = RequestType7;
    var RequestType8 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 8);
      }
    };
    exports.RequestType8 = RequestType8;
    var RequestType9 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 9);
      }
    };
    exports.RequestType9 = RequestType9;
    var NotificationType = class extends AbstractMessageSignature {
      _parameterStructures;
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports.NotificationType = NotificationType;
    var NotificationType0 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 0);
      }
    };
    exports.NotificationType0 = NotificationType0;
    var NotificationType1 = class extends AbstractMessageSignature {
      _parameterStructures;
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method, _parameterStructures = ParameterStructures.auto) {
        super(method, 1);
        this._parameterStructures = _parameterStructures;
      }
      get parameterStructures() {
        return this._parameterStructures;
      }
    };
    exports.NotificationType1 = NotificationType1;
    var NotificationType2 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 2);
      }
    };
    exports.NotificationType2 = NotificationType2;
    var NotificationType3 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 3);
      }
    };
    exports.NotificationType3 = NotificationType3;
    var NotificationType4 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 4);
      }
    };
    exports.NotificationType4 = NotificationType4;
    var NotificationType5 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 5);
      }
    };
    exports.NotificationType5 = NotificationType5;
    var NotificationType6 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 6);
      }
    };
    exports.NotificationType6 = NotificationType6;
    var NotificationType7 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 7);
      }
    };
    exports.NotificationType7 = NotificationType7;
    var NotificationType8 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 8);
      }
    };
    exports.NotificationType8 = NotificationType8;
    var NotificationType9 = class extends AbstractMessageSignature {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      _;
      constructor(method) {
        super(method, 9);
      }
    };
    exports.NotificationType9 = NotificationType9;
    var Message;
    (function(Message2) {
      function isRequest(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
      }
      Message2.isRequest = isRequest;
      function isNotification(message) {
        const candidate = message;
        return candidate && is.string(candidate.method) && message.id === void 0;
      }
      Message2.isNotification = isNotification;
      function isResponse(message) {
        const candidate = message;
        return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
      }
      Message2.isResponse = isResponse;
    })(Message || (exports.Message = Message = {}));
  }
});

// node_modules/vscode-jsonrpc/lib/common/linkedMap.js
var require_linkedMap = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/linkedMap.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LRUCache = exports.LinkedMap = exports.Touch = void 0;
    var Touch;
    (function(Touch2) {
      Touch2.None = 0;
      Touch2.First = 1;
      Touch2.AsOld = Touch2.First;
      Touch2.Last = 2;
      Touch2.AsNew = Touch2.Last;
    })(Touch || (exports.Touch = Touch = {}));
    var LinkedMap = class {
      [Symbol.toStringTag] = "LinkedMap";
      _map;
      _head;
      _tail;
      _size;
      _state;
      constructor() {
        this._map = /* @__PURE__ */ new Map();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
        this._state = 0;
      }
      clear() {
        this._map.clear();
        this._head = void 0;
        this._tail = void 0;
        this._size = 0;
        this._state++;
      }
      isEmpty() {
        return !this._head && !this._tail;
      }
      get size() {
        return this._size;
      }
      get first() {
        return this._head?.value;
      }
      get last() {
        return this._tail?.value;
      }
      before(key) {
        const item = this._map.get(key);
        return item ? item.previous?.value : void 0;
      }
      after(key) {
        const item = this._map.get(key);
        return item ? item.next?.value : void 0;
      }
      has(key) {
        return this._map.has(key);
      }
      get(key, touch = Touch.None) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
        }
        if (touch !== Touch.None) {
          this.touch(item, touch);
        }
        return item.value;
      }
      set(key, value, touch = Touch.None) {
        let item = this._map.get(key);
        if (item) {
          item.value = value;
          if (touch !== Touch.None) {
            this.touch(item, touch);
          }
        } else {
          item = { key, value, next: void 0, previous: void 0 };
          switch (touch) {
            case Touch.None:
              this.addItemLast(item);
              break;
            case Touch.First:
              this.addItemFirst(item);
              break;
            case Touch.Last:
              this.addItemLast(item);
              break;
            default:
              this.addItemLast(item);
              break;
          }
          this._map.set(key, item);
          this._size++;
        }
        return this;
      }
      delete(key) {
        return !!this.remove(key);
      }
      remove(key) {
        const item = this._map.get(key);
        if (!item) {
          return void 0;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      shift() {
        if (!this._head && !this._tail) {
          return void 0;
        }
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
      }
      forEach(callbackfn, thisArg) {
        const state = this._state;
        let current = this._head;
        while (current) {
          if (thisArg) {
            callbackfn.bind(thisArg)(current.value, current.key, this);
          } else {
            callbackfn(current.value, current.key, this);
          }
          if (this._state !== state) {
            throw new Error(`LinkedMap got modified during iteration.`);
          }
          current = current.next;
        }
      }
      keys() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: current.key, done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      values() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: current.value, done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      entries() {
        const state = this._state;
        let current = this._head;
        const iterator = {
          [Symbol.iterator]: () => {
            return iterator;
          },
          next: () => {
            if (this._state !== state) {
              throw new Error(`LinkedMap got modified during iteration.`);
            }
            if (current) {
              const result = { value: [current.key, current.value], done: false };
              current = current.next;
              return result;
            } else {
              return { value: void 0, done: true };
            }
          }
        };
        return iterator;
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      trimOld(newSize) {
        if (newSize >= this.size) {
          return;
        }
        if (newSize === 0) {
          this.clear();
          return;
        }
        let current = this._head;
        let currentSize = this.size;
        while (current && currentSize > newSize) {
          this._map.delete(current.key);
          current = current.next;
          currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) {
          current.previous = void 0;
        }
        this._state++;
      }
      addItemFirst(item) {
        if (!this._head && !this._tail) {
          this._tail = item;
        } else if (!this._head) {
          throw new Error("Invalid list");
        } else {
          item.next = this._head;
          this._head.previous = item;
        }
        this._head = item;
        this._state++;
      }
      addItemLast(item) {
        if (!this._head && !this._tail) {
          this._head = item;
        } else if (!this._tail) {
          throw new Error("Invalid list");
        } else {
          item.previous = this._tail;
          this._tail.next = item;
        }
        this._tail = item;
        this._state++;
      }
      removeItem(item) {
        if (item === this._head && item === this._tail) {
          this._head = void 0;
          this._tail = void 0;
        } else if (item === this._head) {
          if (!item.next) {
            throw new Error("Invalid list");
          }
          item.next.previous = void 0;
          this._head = item.next;
        } else if (item === this._tail) {
          if (!item.previous) {
            throw new Error("Invalid list");
          }
          item.previous.next = void 0;
          this._tail = item.previous;
        } else {
          const next = item.next;
          const previous = item.previous;
          if (!next || !previous) {
            throw new Error("Invalid list");
          }
          next.previous = previous;
          previous.next = next;
        }
        item.next = void 0;
        item.previous = void 0;
        this._state++;
      }
      touch(item, touch) {
        if (!this._head || !this._tail) {
          throw new Error("Invalid list");
        }
        if (touch !== Touch.First && touch !== Touch.Last) {
          return;
        }
        if (touch === Touch.First) {
          if (item === this._head) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._tail) {
            previous.next = void 0;
            this._tail = previous;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.previous = void 0;
          item.next = this._head;
          this._head.previous = item;
          this._head = item;
          this._state++;
        } else if (touch === Touch.Last) {
          if (item === this._tail) {
            return;
          }
          const next = item.next;
          const previous = item.previous;
          if (item === this._head) {
            next.previous = void 0;
            this._head = next;
          } else {
            next.previous = previous;
            previous.next = next;
          }
          item.next = void 0;
          item.previous = this._tail;
          this._tail.next = item;
          this._tail = item;
          this._state++;
        }
      }
      toJSON() {
        const data = [];
        this.forEach((value, key) => {
          data.push([key, value]);
        });
        return data;
      }
      fromJSON(data) {
        this.clear();
        for (const [key, value] of data) {
          this.set(key, value);
        }
      }
    };
    exports.LinkedMap = LinkedMap;
    var LRUCache = class extends LinkedMap {
      _limit;
      _ratio;
      constructor(limit, ratio = 1) {
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
      }
      get limit() {
        return this._limit;
      }
      set limit(limit) {
        this._limit = limit;
        this.checkTrim();
      }
      get ratio() {
        return this._ratio;
      }
      set ratio(ratio) {
        this._ratio = Math.min(Math.max(0, ratio), 1);
        this.checkTrim();
      }
      get(key, touch = Touch.AsNew) {
        return super.get(key, touch);
      }
      peek(key) {
        return super.get(key, Touch.None);
      }
      set(key, value) {
        super.set(key, value, Touch.Last);
        this.checkTrim();
        return this;
      }
      checkTrim() {
        if (this.size > this._limit) {
          this.trimOld(Math.round(this._limit * this._ratio));
        }
      }
    };
    exports.LRUCache = LRUCache;
  }
});

// node_modules/vscode-jsonrpc/lib/common/disposable.js
var require_disposable = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/disposable.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Disposable = void 0;
    var Disposable;
    (function(Disposable2) {
      function create(func) {
        return {
          dispose: func
        };
      }
      Disposable2.create = create;
    })(Disposable || (exports.Disposable = Disposable = {}));
  }
});

// node_modules/vscode-jsonrpc/lib/common/ral.js
var require_ral = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/ral.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    var _ral;
    function RAL() {
      if (_ral === void 0) {
        throw new Error(`No runtime abstraction layer installed`);
      }
      return _ral;
    }
    (function(RAL2) {
      function install(ral) {
        if (ral === void 0) {
          throw new Error(`No runtime abstraction layer provided`);
        }
        _ral = ral;
      }
      RAL2.install = install;
    })(RAL || (RAL = {}));
    exports.default = RAL;
  }
});

// node_modules/vscode-jsonrpc/lib/common/events.js
var require_events = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/events.js"(exports) {
    "use strict";
    init_define_process_env();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Emitter = exports.Event = void 0;
    var ral_1 = __importDefault(require_ral());
    var Event;
    (function(Event2) {
      const _disposable = { dispose() {
      } };
      Event2.None = function() {
        return _disposable;
      };
    })(Event || (exports.Event = Event = {}));
    var CallbackList = class {
      _callbacks;
      _contexts;
      add(callback, context = null, bucket) {
        if (!this._callbacks) {
          this._callbacks = [];
          this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
          bucket.push({ dispose: () => this.remove(callback, context) });
        }
      }
      remove(callback, context = null) {
        if (!this._callbacks) {
          return;
        }
        let foundCallbackWithDifferentContext = false;
        for (let i = 0, len = this._callbacks.length; i < len; i++) {
          if (this._callbacks[i] === callback) {
            if (this._contexts[i] === context) {
              this._callbacks.splice(i, 1);
              this._contexts.splice(i, 1);
              return;
            } else {
              foundCallbackWithDifferentContext = true;
            }
          }
        }
        if (foundCallbackWithDifferentContext) {
          throw new Error("When adding a listener with a context, you should remove it with the same context");
        }
      }
      invoke(...args) {
        if (!this._callbacks) {
          return [];
        }
        const ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
        for (let i = 0, len = callbacks.length; i < len; i++) {
          try {
            ret.push(callbacks[i].apply(contexts[i], args));
          } catch (e) {
            (0, ral_1.default)().console.error(e);
          }
        }
        return ret;
      }
      isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
      }
      dispose() {
        this._callbacks = void 0;
        this._contexts = void 0;
      }
    };
    var Emitter = class _Emitter {
      _options;
      static _noop = function() {
      };
      _event;
      _callbacks;
      constructor(_options) {
        this._options = _options;
      }
      /**
       * For the public to allow to subscribe
       * to events from this Emitter
       */
      get event() {
        if (!this._event) {
          this._event = (listener, thisArgs, disposables) => {
            if (!this._callbacks) {
              this._callbacks = new CallbackList();
            }
            if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
              this._options.onFirstListenerAdd(this);
            }
            this._callbacks.add(listener, thisArgs);
            const result = {
              dispose: () => {
                if (!this._callbacks) {
                  return;
                }
                this._callbacks.remove(listener, thisArgs);
                result.dispose = _Emitter._noop;
                if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                  this._options.onLastListenerRemove(this);
                }
              }
            };
            if (Array.isArray(disposables)) {
              disposables.push(result);
            }
            return result;
          };
        }
        return this._event;
      }
      /**
       * To be kept private to fire an event to
       * subscribers
       */
      fire(event) {
        if (this._callbacks) {
          this._callbacks.invoke.call(this._callbacks, event);
        }
      }
      dispose() {
        if (this._callbacks) {
          this._callbacks.dispose();
          this._callbacks = void 0;
        }
      }
    };
    exports.Emitter = Emitter;
  }
});

// node_modules/vscode-jsonrpc/lib/common/cancellation.js
var require_cancellation = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/cancellation.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CancellationTokenSource = exports.CancellationToken = void 0;
    var ral_1 = __importDefault(require_ral());
    var Is2 = __importStar(require_is());
    var events_1 = require_events();
    var CancellationToken;
    (function(CancellationToken2) {
      CancellationToken2.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events_1.Event.None
      });
      CancellationToken2.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events_1.Event.None
      });
      function is(value) {
        const candidate = value;
        return candidate && (candidate === CancellationToken2.None || candidate === CancellationToken2.Cancelled || Is2.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested);
      }
      CancellationToken2.is = is;
    })(CancellationToken || (exports.CancellationToken = CancellationToken = {}));
    var shortcutEvent = Object.freeze(function(callback, context) {
      const handle = (0, ral_1.default)().timer.setTimeout(callback.bind(context), 0);
      return { dispose() {
        handle.dispose();
      } };
    });
    var MutableToken = class {
      _isCancelled = false;
      _emitter;
      cancel() {
        if (!this._isCancelled) {
          this._isCancelled = true;
          if (this._emitter) {
            this._emitter.fire(void 0);
            this.dispose();
          }
        }
      }
      get isCancellationRequested() {
        return this._isCancelled;
      }
      get onCancellationRequested() {
        if (this._isCancelled) {
          return shortcutEvent;
        }
        if (!this._emitter) {
          this._emitter = new events_1.Emitter();
        }
        return this._emitter.event;
      }
      dispose() {
        if (this._emitter) {
          this._emitter.dispose();
          this._emitter = void 0;
        }
      }
    };
    var CancellationTokenSource = class {
      _token;
      get token() {
        if (!this._token) {
          this._token = new MutableToken();
        }
        return this._token;
      }
      cancel() {
        if (!this._token) {
          this._token = CancellationToken.Cancelled;
        } else {
          this._token.cancel();
        }
      }
      dispose() {
        if (!this._token) {
          this._token = CancellationToken.None;
        } else if (this._token instanceof MutableToken) {
          this._token.dispose();
        }
      }
    };
    exports.CancellationTokenSource = CancellationTokenSource;
  }
});

// node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js
var require_sharedArrayCancellation = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/sharedArrayCancellation.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SharedArrayReceiverStrategy = exports.SharedArraySenderStrategy = void 0;
    var cancellation_1 = require_cancellation();
    var CancellationState;
    (function(CancellationState2) {
      CancellationState2.Continue = 0;
      CancellationState2.Cancelled = 1;
    })(CancellationState || (CancellationState = {}));
    var SharedArraySenderStrategy = class {
      buffers;
      constructor() {
        this.buffers = /* @__PURE__ */ new Map();
      }
      enableCancellation(request) {
        if (request.id === null) {
          return;
        }
        const buffer = new SharedArrayBuffer(4);
        const data = new Int32Array(buffer, 0, 1);
        data[0] = CancellationState.Continue;
        this.buffers.set(request.id, buffer);
        request.$cancellationData = buffer;
      }
      async sendCancellation(_conn, id) {
        const buffer = this.buffers.get(id);
        if (buffer === void 0) {
          return;
        }
        const data = new Int32Array(buffer, 0, 1);
        Atomics.store(data, 0, CancellationState.Cancelled);
      }
      cleanup(id) {
        this.buffers.delete(id);
      }
      dispose() {
        this.buffers.clear();
      }
    };
    exports.SharedArraySenderStrategy = SharedArraySenderStrategy;
    var SharedArrayBufferCancellationToken = class {
      data;
      constructor(buffer) {
        this.data = new Int32Array(buffer, 0, 1);
      }
      get isCancellationRequested() {
        return Atomics.load(this.data, 0) === CancellationState.Cancelled;
      }
      get onCancellationRequested() {
        throw new Error(`Cancellation over SharedArrayBuffer doesn't support cancellation events`);
      }
    };
    var SharedArrayBufferCancellationTokenSource = class {
      token;
      constructor(buffer) {
        this.token = new SharedArrayBufferCancellationToken(buffer);
      }
      cancel() {
      }
      dispose() {
      }
    };
    var SharedArrayReceiverStrategy = class {
      kind = "request";
      createCancellationTokenSource(request) {
        const buffer = request.$cancellationData;
        if (buffer === void 0) {
          return new cancellation_1.CancellationTokenSource();
        }
        return new SharedArrayBufferCancellationTokenSource(buffer);
      }
    };
    exports.SharedArrayReceiverStrategy = SharedArrayReceiverStrategy;
  }
});

// node_modules/vscode-jsonrpc/lib/common/semaphore.js
var require_semaphore = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/semaphore.js"(exports) {
    "use strict";
    init_define_process_env();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Semaphore = void 0;
    var ral_1 = __importDefault(require_ral());
    var Semaphore = class {
      _capacity;
      _active;
      _waiting;
      constructor(capacity = 1) {
        if (capacity <= 0) {
          throw new Error("Capacity must be greater than 0");
        }
        this._capacity = capacity;
        this._active = 0;
        this._waiting = [];
      }
      lock(thunk) {
        return new Promise((resolve, reject) => {
          this._waiting.push({ thunk, resolve, reject });
          this.runNext();
        });
      }
      get active() {
        return this._active;
      }
      runNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        (0, ral_1.default)().timer.setImmediate(() => this.doRunNext());
      }
      doRunNext() {
        if (this._waiting.length === 0 || this._active === this._capacity) {
          return;
        }
        const next = this._waiting.shift();
        this._active++;
        if (this._active > this._capacity) {
          throw new Error(`Too many thunks active`);
        }
        try {
          const result = next.thunk();
          if (result instanceof Promise) {
            result.then((value) => {
              this._active--;
              next.resolve(value);
              this.runNext();
            }, (err) => {
              this._active--;
              next.reject(err);
              this.runNext();
            });
          } else {
            this._active--;
            next.resolve(result);
            this.runNext();
          }
        } catch (err) {
          this._active--;
          next.reject(err);
          this.runNext();
        }
      }
    };
    exports.Semaphore = Semaphore;
  }
});

// node_modules/vscode-jsonrpc/lib/common/messageReader.js
var require_messageReader = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messageReader.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = void 0;
    var ral_1 = __importDefault(require_ral());
    var Is2 = __importStar(require_is());
    var events_1 = require_events();
    var semaphore_1 = require_semaphore();
    var MessageReader;
    (function(MessageReader2) {
      function is(value) {
        const candidate = value;
        return candidate && Is2.func(candidate.listen) && Is2.func(candidate.dispose) && Is2.func(candidate.onError) && Is2.func(candidate.onClose) && Is2.func(candidate.onPartialMessage);
      }
      MessageReader2.is = is;
    })(MessageReader || (exports.MessageReader = MessageReader = {}));
    var AbstractMessageReader = class {
      errorEmitter;
      closeEmitter;
      partialMessageEmitter;
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
        this.partialMessageEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
        this.partialMessageEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error) {
        this.errorEmitter.fire(this.asError(error));
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      get onPartialMessage() {
        return this.partialMessageEmitter.event;
      }
      firePartialMessage(info) {
        this.partialMessageEmitter.fire(info);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Reader received error. Reason: ${Is2.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports.AbstractMessageReader = AbstractMessageReader;
    var ResolvedMessageReaderOptions;
    (function(ResolvedMessageReaderOptions2) {
      function fromOptions(options) {
        let charset;
        let result;
        let contentDecoder;
        const contentDecoders = /* @__PURE__ */ new Map();
        let contentTypeDecoder;
        const contentTypeDecoders = /* @__PURE__ */ new Map();
        if (options === void 0 || typeof options === "string") {
          charset = options ?? "utf-8";
        } else {
          charset = options.charset ?? "utf-8";
          if (options.contentDecoder !== void 0) {
            contentDecoder = options.contentDecoder;
            contentDecoders.set(contentDecoder.name, contentDecoder);
          }
          if (options.contentDecoders !== void 0) {
            for (const decoder of options.contentDecoders) {
              contentDecoders.set(decoder.name, decoder);
            }
          }
          if (options.contentTypeDecoder !== void 0) {
            contentTypeDecoder = options.contentTypeDecoder;
            contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
          }
          if (options.contentTypeDecoders !== void 0) {
            for (const decoder of options.contentTypeDecoders) {
              contentTypeDecoders.set(decoder.name, decoder);
            }
          }
        }
        if (contentTypeDecoder === void 0) {
          contentTypeDecoder = (0, ral_1.default)().applicationJson.decoder;
          contentTypeDecoders.set(contentTypeDecoder.name, contentTypeDecoder);
        }
        return { charset, contentDecoder, contentDecoders, contentTypeDecoder, contentTypeDecoders };
      }
      ResolvedMessageReaderOptions2.fromOptions = fromOptions;
    })(ResolvedMessageReaderOptions || (ResolvedMessageReaderOptions = {}));
    var ReadableStreamMessageReader = class extends AbstractMessageReader {
      readable;
      options;
      callback;
      nextMessageLength;
      messageToken;
      buffer;
      partialMessageTimer;
      _partialMessageTimeout;
      readSemaphore;
      constructor(readable, options) {
        super();
        this.readable = readable;
        this.options = ResolvedMessageReaderOptions.fromOptions(options);
        this.buffer = (0, ral_1.default)().messageBuffer.create(this.options.charset);
        this._partialMessageTimeout = 1e4;
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.readSemaphore = new semaphore_1.Semaphore(1);
      }
      set partialMessageTimeout(timeout) {
        this._partialMessageTimeout = timeout;
      }
      get partialMessageTimeout() {
        return this._partialMessageTimeout;
      }
      listen(callback) {
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.partialMessageTimer = void 0;
        this.callback = callback;
        const result = this.readable.onData((data) => {
          this.onData(data);
        });
        this.readable.onError((error) => this.fireError(error));
        this.readable.onClose(() => this.fireClose());
        return result;
      }
      onData(data) {
        try {
          this.buffer.append(data);
          while (true) {
            if (this.nextMessageLength === -1) {
              const headers = this.buffer.tryReadHeaders(true);
              if (!headers) {
                return;
              }
              const contentLength = headers.get("content-length");
              if (!contentLength) {
                this.fireError(new Error(`Header must provide a Content-Length property.
${JSON.stringify(Object.fromEntries(headers))}`));
                return;
              }
              const length = parseInt(contentLength);
              if (isNaN(length)) {
                this.fireError(new Error(`Content-Length value must be a number. Got ${contentLength}`));
                return;
              }
              this.nextMessageLength = length;
            }
            const body = this.buffer.tryReadBody(this.nextMessageLength);
            if (body === void 0) {
              this.setPartialMessageTimer();
              return;
            }
            this.clearPartialMessageTimer();
            this.nextMessageLength = -1;
            this.readSemaphore.lock(async () => {
              const bytes = this.options.contentDecoder !== void 0 ? await this.options.contentDecoder.decode(body) : body;
              const message = await this.options.contentTypeDecoder.decode(bytes, this.options);
              this.callback(message);
            }).catch((error) => {
              this.fireError(error);
            });
          }
        } catch (error) {
          this.fireError(error);
        }
      }
      clearPartialMessageTimer() {
        if (this.partialMessageTimer) {
          this.partialMessageTimer.dispose();
          this.partialMessageTimer = void 0;
        }
      }
      setPartialMessageTimer() {
        this.clearPartialMessageTimer();
        if (this._partialMessageTimeout <= 0) {
          return;
        }
        this.partialMessageTimer = (0, ral_1.default)().timer.setTimeout((token, timeout) => {
          this.partialMessageTimer = void 0;
          if (token === this.messageToken) {
            this.firePartialMessage({ messageToken: token, waitingTime: timeout });
            this.setPartialMessageTimer();
          }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
      }
    };
    exports.ReadableStreamMessageReader = ReadableStreamMessageReader;
  }
});

// node_modules/vscode-jsonrpc/lib/common/messageWriter.js
var require_messageWriter = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messageWriter.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = void 0;
    var ral_1 = __importDefault(require_ral());
    var Is2 = __importStar(require_is());
    var semaphore_1 = require_semaphore();
    var events_1 = require_events();
    var ContentLength = "Content-Length: ";
    var CRLF = "\r\n";
    var MessageWriter;
    (function(MessageWriter2) {
      function is(value) {
        const candidate = value;
        return candidate && Is2.func(candidate.dispose) && Is2.func(candidate.onClose) && Is2.func(candidate.onError) && Is2.func(candidate.write);
      }
      MessageWriter2.is = is;
    })(MessageWriter || (exports.MessageWriter = MessageWriter = {}));
    var AbstractMessageWriter = class {
      errorEmitter;
      closeEmitter;
      constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
      }
      dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
      }
      get onError() {
        return this.errorEmitter.event;
      }
      fireError(error, message, count) {
        this.errorEmitter.fire([this.asError(error), message, count]);
      }
      get onClose() {
        return this.closeEmitter.event;
      }
      fireClose() {
        this.closeEmitter.fire(void 0);
      }
      asError(error) {
        if (error instanceof Error) {
          return error;
        } else {
          return new Error(`Writer received error. Reason: ${Is2.string(error.message) ? error.message : "unknown"}`);
        }
      }
    };
    exports.AbstractMessageWriter = AbstractMessageWriter;
    var ResolvedMessageWriterOptions;
    (function(ResolvedMessageWriterOptions2) {
      function fromOptions(options) {
        if (options === void 0 || typeof options === "string") {
          return { charset: options ?? "utf-8", contentTypeEncoder: (0, ral_1.default)().applicationJson.encoder };
        } else {
          return { charset: options.charset ?? "utf-8", contentEncoder: options.contentEncoder, contentTypeEncoder: options.contentTypeEncoder ?? (0, ral_1.default)().applicationJson.encoder };
        }
      }
      ResolvedMessageWriterOptions2.fromOptions = fromOptions;
    })(ResolvedMessageWriterOptions || (ResolvedMessageWriterOptions = {}));
    var WriteableStreamMessageWriter = class extends AbstractMessageWriter {
      writable;
      options;
      errorCount;
      writeSemaphore;
      constructor(writable, options) {
        super();
        this.writable = writable;
        this.options = ResolvedMessageWriterOptions.fromOptions(options);
        this.errorCount = 0;
        this.writeSemaphore = new semaphore_1.Semaphore(1);
        this.writable.onError((error) => this.fireError(error));
        this.writable.onClose(() => this.fireClose());
      }
      async write(msg) {
        return this.writeSemaphore.lock(async () => {
          const payload = this.options.contentTypeEncoder.encode(msg, this.options).then((buffer) => {
            if (this.options.contentEncoder !== void 0) {
              return this.options.contentEncoder.encode(buffer);
            } else {
              return buffer;
            }
          });
          return payload.then((buffer) => {
            const headers = [];
            headers.push(ContentLength, buffer.byteLength.toString(), CRLF);
            headers.push(CRLF);
            return this.doWrite(msg, headers, buffer);
          }, (error) => {
            this.fireError(error);
            throw error;
          });
        });
      }
      async doWrite(msg, headers, data) {
        try {
          await this.writable.write(headers.join(""), "ascii");
          return this.writable.write(data);
        } catch (error) {
          this.handleError(error, msg);
          return Promise.reject(error);
        }
      }
      handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
      }
      end() {
        this.writable.end();
      }
    };
    exports.WriteableStreamMessageWriter = WriteableStreamMessageWriter;
  }
});

// node_modules/vscode-jsonrpc/lib/common/messageBuffer.js
var require_messageBuffer = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/messageBuffer.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AbstractMessageBuffer = void 0;
    var CR = 13;
    var LF = 10;
    var CRLF = "\r\n";
    var AbstractMessageBuffer = class {
      _encoding;
      _chunks;
      _totalLength;
      constructor(encoding = "utf-8") {
        this._encoding = encoding;
        this._chunks = [];
        this._totalLength = 0;
      }
      get encoding() {
        return this._encoding;
      }
      append(chunk) {
        const toAppend = typeof chunk === "string" ? this.fromString(chunk, this._encoding) : chunk;
        this._chunks.push(toAppend);
        this._totalLength += toAppend.byteLength;
      }
      tryReadHeaders(lowerCaseKeys = false) {
        if (this._chunks.length === 0) {
          return void 0;
        }
        let state = 0;
        let chunkIndex = 0;
        let offset = 0;
        let chunkBytesRead = 0;
        row: while (chunkIndex < this._chunks.length) {
          const chunk = this._chunks[chunkIndex];
          offset = 0;
          while (offset < chunk.length) {
            const value = chunk[offset];
            switch (value) {
              case CR:
                switch (state) {
                  case 0:
                    state = 1;
                    break;
                  case 2:
                    state = 3;
                    break;
                  default:
                    state = 0;
                }
                break;
              case LF:
                switch (state) {
                  case 1:
                    state = 2;
                    break;
                  case 3:
                    state = 4;
                    offset++;
                    break row;
                  default:
                    state = 0;
                }
                break;
              default:
                state = 0;
            }
            offset++;
          }
          chunkBytesRead += chunk.byteLength;
          chunkIndex++;
        }
        if (state !== 4) {
          return void 0;
        }
        const buffer = this._read(chunkBytesRead + offset);
        const result = /* @__PURE__ */ new Map();
        const headers = this.toString(buffer, "ascii").split(CRLF);
        if (headers.length < 2) {
          return result;
        }
        for (let i = 0; i < headers.length - 2; i++) {
          const header = headers[i];
          const index = header.indexOf(":");
          if (index === -1) {
            throw new Error(`Message header must separate key and value using ':'
${header}`);
          }
          const key = header.substr(0, index);
          const value = header.substr(index + 1).trim();
          result.set(lowerCaseKeys ? key.toLowerCase() : key, value);
        }
        return result;
      }
      tryReadBody(length) {
        if (this._totalLength < length) {
          return void 0;
        }
        return this._read(length);
      }
      get numberOfBytes() {
        return this._totalLength;
      }
      _read(byteCount) {
        if (byteCount === 0) {
          return this.emptyBuffer();
        }
        if (byteCount > this._totalLength) {
          throw new Error(`Cannot read so many bytes!`);
        }
        if (this._chunks[0].byteLength === byteCount) {
          const chunk = this._chunks[0];
          this._chunks.shift();
          this._totalLength -= byteCount;
          return this.asNative(chunk);
        }
        if (this._chunks[0].byteLength > byteCount) {
          const chunk = this._chunks[0];
          const result2 = this.asNative(chunk, byteCount);
          this._chunks[0] = chunk.slice(byteCount);
          this._totalLength -= byteCount;
          return result2;
        }
        const result = this.allocNative(byteCount);
        let resultOffset = 0;
        const chunkIndex = 0;
        while (byteCount > 0) {
          const chunk = this._chunks[chunkIndex];
          if (chunk.byteLength > byteCount) {
            const chunkPart = chunk.slice(0, byteCount);
            result.set(chunkPart, resultOffset);
            resultOffset += byteCount;
            this._chunks[chunkIndex] = chunk.slice(byteCount);
            this._totalLength -= byteCount;
            byteCount -= byteCount;
          } else {
            result.set(chunk, resultOffset);
            resultOffset += chunk.byteLength;
            this._chunks.shift();
            this._totalLength -= chunk.byteLength;
            byteCount -= chunk.byteLength;
          }
        }
        return result;
      }
    };
    exports.AbstractMessageBuffer = AbstractMessageBuffer;
  }
});

// node_modules/vscode-jsonrpc/lib/common/connection.js
var require_connection = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/connection.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConnectionOptions = exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.CancellationReceiverStrategy = exports.RequestCancellationReceiverStrategy = exports.IdCancellationReceiverStrategy = exports.ConnectionStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.TraceValue = exports.Trace = exports.NullLogger = exports.ProgressType = exports.ProgressToken = void 0;
    exports.createMessageConnection = createMessageConnection;
    var ral_1 = __importDefault(require_ral());
    var Is2 = __importStar(require_is());
    var messages_1 = require_messages();
    var linkedMap_1 = require_linkedMap();
    var events_1 = require_events();
    var cancellation_1 = require_cancellation();
    var CancelNotification;
    (function(CancelNotification2) {
      CancelNotification2.type = new messages_1.NotificationType("$/cancelRequest");
    })(CancelNotification || (CancelNotification = {}));
    var ProgressToken;
    (function(ProgressToken2) {
      function is(value) {
        return typeof value === "string" || typeof value === "number";
      }
      ProgressToken2.is = is;
    })(ProgressToken || (exports.ProgressToken = ProgressToken = {}));
    var ProgressNotification;
    (function(ProgressNotification2) {
      ProgressNotification2.type = new messages_1.NotificationType("$/progress");
    })(ProgressNotification || (ProgressNotification = {}));
    var ProgressType = class {
      /**
       * Clients must not use these properties. They are here to ensure correct typing.
       * in TypeScript
       */
      __;
      _pr;
      constructor() {
      }
    };
    exports.ProgressType = ProgressType;
    var StarRequestHandler;
    (function(StarRequestHandler2) {
      function is(value) {
        return Is2.func(value);
      }
      StarRequestHandler2.is = is;
    })(StarRequestHandler || (StarRequestHandler = {}));
    exports.NullLogger = Object.freeze({
      error: () => {
      },
      warn: () => {
      },
      info: () => {
      },
      log: () => {
      }
    });
    var Trace;
    (function(Trace2) {
      Trace2[Trace2["Off"] = 0] = "Off";
      Trace2[Trace2["Messages"] = 1] = "Messages";
      Trace2[Trace2["Compact"] = 2] = "Compact";
      Trace2[Trace2["Verbose"] = 3] = "Verbose";
    })(Trace || (exports.Trace = Trace = {}));
    var TraceValue;
    (function(TraceValue2) {
      TraceValue2.Off = "off";
      TraceValue2.Messages = "messages";
      TraceValue2.Compact = "compact";
      TraceValue2.Verbose = "verbose";
    })(TraceValue || (exports.TraceValue = TraceValue = {}));
    exports.TraceValues = TraceValue;
    (function(Trace2) {
      function fromString(value) {
        if (!Is2.string(value)) {
          return Trace2.Off;
        }
        value = value.toLowerCase();
        switch (value) {
          case "off":
            return Trace2.Off;
          case "messages":
            return Trace2.Messages;
          case "compact":
            return Trace2.Compact;
          case "verbose":
            return Trace2.Verbose;
          default:
            return Trace2.Off;
        }
      }
      Trace2.fromString = fromString;
      function toString(value) {
        switch (value) {
          case Trace2.Off:
            return "off";
          case Trace2.Messages:
            return "messages";
          case Trace2.Compact:
            return "compact";
          case Trace2.Verbose:
            return "verbose";
          default:
            return "off";
        }
      }
      Trace2.toString = toString;
    })(Trace || (exports.Trace = Trace = {}));
    var TraceFormat;
    (function(TraceFormat2) {
      TraceFormat2["Text"] = "text";
      TraceFormat2["JSON"] = "json";
    })(TraceFormat || (exports.TraceFormat = TraceFormat = {}));
    (function(TraceFormat2) {
      function fromString(value) {
        if (!Is2.string(value)) {
          return TraceFormat2.Text;
        }
        value = value.toLowerCase();
        if (value === "json") {
          return TraceFormat2.JSON;
        } else {
          return TraceFormat2.Text;
        }
      }
      TraceFormat2.fromString = fromString;
    })(TraceFormat || (exports.TraceFormat = TraceFormat = {}));
    var SetTraceNotification;
    (function(SetTraceNotification2) {
      SetTraceNotification2.type = new messages_1.NotificationType("$/setTrace");
    })(SetTraceNotification || (exports.SetTraceNotification = SetTraceNotification = {}));
    var LogTraceNotification;
    (function(LogTraceNotification2) {
      LogTraceNotification2.type = new messages_1.NotificationType("$/logTrace");
    })(LogTraceNotification || (exports.LogTraceNotification = LogTraceNotification = {}));
    var ConnectionErrors;
    (function(ConnectionErrors2) {
      ConnectionErrors2[ConnectionErrors2["Closed"] = 1] = "Closed";
      ConnectionErrors2[ConnectionErrors2["Disposed"] = 2] = "Disposed";
      ConnectionErrors2[ConnectionErrors2["AlreadyListening"] = 3] = "AlreadyListening";
    })(ConnectionErrors || (exports.ConnectionErrors = ConnectionErrors = {}));
    var ConnectionError = class _ConnectionError extends Error {
      code;
      constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, _ConnectionError.prototype);
      }
    };
    exports.ConnectionError = ConnectionError;
    var ConnectionStrategy;
    (function(ConnectionStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && Is2.func(candidate.cancelUndispatched);
      }
      ConnectionStrategy2.is = is;
    })(ConnectionStrategy || (exports.ConnectionStrategy = ConnectionStrategy = {}));
    var IdCancellationReceiverStrategy;
    (function(IdCancellationReceiverStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && (candidate.kind === void 0 || candidate.kind === "id") && Is2.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is2.func(candidate.dispose));
      }
      IdCancellationReceiverStrategy2.is = is;
    })(IdCancellationReceiverStrategy || (exports.IdCancellationReceiverStrategy = IdCancellationReceiverStrategy = {}));
    var RequestCancellationReceiverStrategy;
    (function(RequestCancellationReceiverStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && candidate.kind === "request" && Is2.func(candidate.createCancellationTokenSource) && (candidate.dispose === void 0 || Is2.func(candidate.dispose));
      }
      RequestCancellationReceiverStrategy2.is = is;
    })(RequestCancellationReceiverStrategy || (exports.RequestCancellationReceiverStrategy = RequestCancellationReceiverStrategy = {}));
    var CancellationReceiverStrategy;
    (function(CancellationReceiverStrategy2) {
      CancellationReceiverStrategy2.Message = Object.freeze({
        createCancellationTokenSource(_) {
          return new cancellation_1.CancellationTokenSource();
        }
      });
      function is(value) {
        return IdCancellationReceiverStrategy.is(value) || RequestCancellationReceiverStrategy.is(value);
      }
      CancellationReceiverStrategy2.is = is;
    })(CancellationReceiverStrategy || (exports.CancellationReceiverStrategy = CancellationReceiverStrategy = {}));
    var CancellationSenderStrategy;
    (function(CancellationSenderStrategy2) {
      CancellationSenderStrategy2.Message = Object.freeze({
        sendCancellation(conn, id) {
          return conn.sendNotification(CancelNotification.type, { id });
        },
        cleanup(_) {
        }
      });
      function is(value) {
        const candidate = value;
        return candidate && Is2.func(candidate.sendCancellation) && Is2.func(candidate.cleanup);
      }
      CancellationSenderStrategy2.is = is;
    })(CancellationSenderStrategy || (exports.CancellationSenderStrategy = CancellationSenderStrategy = {}));
    var CancellationStrategy;
    (function(CancellationStrategy2) {
      CancellationStrategy2.Message = Object.freeze({
        receiver: CancellationReceiverStrategy.Message,
        sender: CancellationSenderStrategy.Message
      });
      function is(value) {
        const candidate = value;
        return candidate && CancellationReceiverStrategy.is(candidate.receiver) && CancellationSenderStrategy.is(candidate.sender);
      }
      CancellationStrategy2.is = is;
    })(CancellationStrategy || (exports.CancellationStrategy = CancellationStrategy = {}));
    var MessageStrategy;
    (function(MessageStrategy2) {
      function is(value) {
        const candidate = value;
        return candidate && Is2.func(candidate.handleMessage);
      }
      MessageStrategy2.is = is;
    })(MessageStrategy || (exports.MessageStrategy = MessageStrategy = {}));
    var ConnectionOptions;
    (function(ConnectionOptions2) {
      function is(value) {
        const candidate = value;
        return candidate && (CancellationStrategy.is(candidate.cancellationStrategy) || ConnectionStrategy.is(candidate.connectionStrategy) || MessageStrategy.is(candidate.messageStrategy) || Is2.number(candidate.maxParallelism));
      }
      ConnectionOptions2.is = is;
    })(ConnectionOptions || (exports.ConnectionOptions = ConnectionOptions = {}));
    var ConnectionState;
    (function(ConnectionState2) {
      ConnectionState2[ConnectionState2["New"] = 1] = "New";
      ConnectionState2[ConnectionState2["Listening"] = 2] = "Listening";
      ConnectionState2[ConnectionState2["Closed"] = 3] = "Closed";
      ConnectionState2[ConnectionState2["Disposed"] = 4] = "Disposed";
    })(ConnectionState || (ConnectionState = {}));
    function createMessageConnection(messageReader, messageWriter, _logger, options) {
      const logger = _logger !== void 0 ? _logger : exports.NullLogger;
      let sequenceNumber = 0;
      let notificationSequenceNumber = 0;
      let unknownResponseSequenceNumber = 0;
      const version = "2.0";
      const maxParallelism = options?.maxParallelism ?? -1;
      let inFlight = 0;
      let starRequestHandler = void 0;
      const requestHandlers = /* @__PURE__ */ new Map();
      let starNotificationHandler = void 0;
      const notificationHandlers = /* @__PURE__ */ new Map();
      const progressHandlers = /* @__PURE__ */ new Map();
      let timer;
      let messageQueue = new linkedMap_1.LinkedMap();
      let responsePromises = /* @__PURE__ */ new Map();
      let knownCanceledRequests = /* @__PURE__ */ new Set();
      let requestTokens = /* @__PURE__ */ new Map();
      let trace = Trace.Off;
      let traceFormat = TraceFormat.Text;
      let tracer;
      let state = ConnectionState.New;
      const errorEmitter = new events_1.Emitter();
      const closeEmitter = new events_1.Emitter();
      const unhandledNotificationEmitter = new events_1.Emitter();
      const unhandledProgressEmitter = new events_1.Emitter();
      const disposeEmitter = new events_1.Emitter();
      const cancellationStrategy = options && options.cancellationStrategy ? options.cancellationStrategy : CancellationStrategy.Message;
      function cancelUndispatched(_message) {
        return void 0;
      }
      function isListening() {
        return state === ConnectionState.Listening;
      }
      function isClosed() {
        return state === ConnectionState.Closed;
      }
      function isDisposed() {
        return state === ConnectionState.Disposed;
      }
      function closeHandler() {
        if (state === ConnectionState.New || state === ConnectionState.Listening) {
          state = ConnectionState.Closed;
          closeEmitter.fire(void 0);
        }
      }
      function readErrorHandler(error) {
        errorEmitter.fire([error, void 0, void 0]);
      }
      function writeErrorHandler(data) {
        errorEmitter.fire(data);
      }
      messageReader.onClose(closeHandler);
      messageReader.onError(readErrorHandler);
      messageWriter.onClose(closeHandler);
      messageWriter.onError(writeErrorHandler);
      function createRequestQueueKey(id) {
        if (id === null) {
          throw new Error(`Can't send requests with id null since the response can't be correlated.`);
        }
        return "req-" + id.toString();
      }
      function createResponseQueueKey(id) {
        if (id === null) {
          return "res-unknown-" + (++unknownResponseSequenceNumber).toString();
        } else {
          return "res-" + id.toString();
        }
      }
      function createNotificationQueueKey() {
        return "not-" + (++notificationSequenceNumber).toString();
      }
      function addMessageToQueue(queue, message) {
        if (messages_1.Message.isRequest(message)) {
          queue.set(createRequestQueueKey(message.id), message);
        } else if (messages_1.Message.isResponse(message)) {
          if (maxParallelism === -1) {
            queue.set(createResponseQueueKey(message.id), message);
          } else {
            handleResponse(message);
          }
        } else {
          queue.set(createNotificationQueueKey(), message);
        }
      }
      function triggerMessageQueue() {
        if (timer || messageQueue.size === 0) {
          return;
        }
        if (maxParallelism !== -1 && inFlight >= maxParallelism) {
          return;
        }
        timer = (0, ral_1.default)().timer.setImmediate(async () => {
          timer = void 0;
          if (messageQueue.size === 0) {
            return;
          }
          if (maxParallelism !== -1 && inFlight >= maxParallelism) {
            return;
          }
          const message = messageQueue.shift();
          let result;
          try {
            inFlight++;
            const messageStrategy = options?.messageStrategy;
            if (MessageStrategy.is(messageStrategy)) {
              result = messageStrategy.handleMessage(message, handleMessage);
            } else {
              result = handleMessage(message);
            }
          } catch (error) {
            logger.error(`Processing message queue failed: ${error.toString()}`);
          } finally {
            if (result instanceof Promise) {
              result.then(() => {
                inFlight--;
                triggerMessageQueue();
              }).catch((error) => {
                logger.error(`Processing message queue failed: ${error.toString()}`);
              });
            } else {
              inFlight--;
            }
            triggerMessageQueue();
          }
        });
      }
      async function handleMessage(message) {
        if (messages_1.Message.isRequest(message)) {
          return handleRequest(message);
        } else if (messages_1.Message.isNotification(message)) {
          return handleNotification(message);
        } else if (messages_1.Message.isResponse(message)) {
          return handleResponse(message);
        } else {
          return handleInvalidMessage(message);
        }
      }
      const callback = (message) => {
        try {
          if (messages_1.Message.isNotification(message) && message.method === CancelNotification.type.method) {
            const cancelId = message.params.id;
            const key = createRequestQueueKey(cancelId);
            const toCancel = messageQueue.get(key);
            if (messages_1.Message.isRequest(toCancel)) {
              const strategy = options?.connectionStrategy;
              const response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
              if (response && (response.error !== void 0 || response.result !== void 0)) {
                messageQueue.delete(key);
                requestTokens.delete(cancelId);
                response.id = toCancel.id;
                traceSendingResponse(response, message.method, Date.now());
                messageWriter.write(response).catch(() => logger.error(`Sending response for canceled message failed.`));
                return;
              }
            }
            const cancellationToken = requestTokens.get(cancelId);
            if (cancellationToken !== void 0) {
              cancellationToken.cancel();
              traceReceivedNotification(message);
              return;
            } else {
              knownCanceledRequests.add(cancelId);
            }
          }
          addMessageToQueue(messageQueue, message);
        } finally {
          triggerMessageQueue();
        }
      };
      async function handleRequest(requestMessage) {
        if (isDisposed()) {
          return Promise.resolve();
        }
        function reply(resultOrError, method, startTime2) {
          const message = {
            jsonrpc: version,
            id: requestMessage.id
          };
          if (resultOrError instanceof messages_1.ResponseError) {
            message.error = resultOrError.toJson();
          } else {
            message.result = resultOrError === void 0 ? null : resultOrError;
          }
          traceSendingResponse(message, method, startTime2);
          return messageWriter.write(message);
        }
        function replyError(error, method, startTime2) {
          const message = {
            jsonrpc: version,
            id: requestMessage.id,
            error: error.toJson()
          };
          traceSendingResponse(message, method, startTime2);
          return messageWriter.write(message);
        }
        traceReceivedRequest(requestMessage);
        const element = requestHandlers.get(requestMessage.method);
        let type;
        let requestHandler;
        if (element) {
          type = element.type;
          requestHandler = element.handler;
        }
        const startTime = Date.now();
        if (requestHandler || starRequestHandler) {
          const tokenKey = requestMessage.id ?? String(Date.now());
          const cancellationSource = IdCancellationReceiverStrategy.is(cancellationStrategy.receiver) ? cancellationStrategy.receiver.createCancellationTokenSource(tokenKey) : cancellationStrategy.receiver.createCancellationTokenSource(requestMessage);
          if (requestMessage.id !== null && knownCanceledRequests.has(requestMessage.id)) {
            cancellationSource.cancel();
          }
          if (requestMessage.id !== null) {
            requestTokens.set(tokenKey, cancellationSource);
          }
          try {
            let handlerResult;
            if (requestHandler) {
              if (requestMessage.params === void 0) {
                if (type !== void 0 && type.numberOfParams !== 0) {
                  return replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines ${type.numberOfParams} params but received none.`), requestMessage.method, startTime);
                }
                handlerResult = requestHandler(cancellationSource.token);
              } else if (Array.isArray(requestMessage.params)) {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byName) {
                  return replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by name but received parameters by position`), requestMessage.method, startTime);
                }
                handlerResult = requestHandler(...requestMessage.params, cancellationSource.token);
              } else {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                  return replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InvalidParams, `Request ${requestMessage.method} defines parameters by position but received parameters by name`), requestMessage.method, startTime);
                }
                handlerResult = requestHandler(requestMessage.params, cancellationSource.token);
              }
            } else if (starRequestHandler) {
              handlerResult = starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
            }
            const resultOrError = await handlerResult;
            await reply(resultOrError, requestMessage.method, startTime);
          } catch (error) {
            if (error instanceof messages_1.ResponseError) {
              await reply(error, requestMessage.method, startTime);
            } else if (error && Is2.string(error.message)) {
              await replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
            } else {
              await replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
            }
          } finally {
            requestTokens.delete(tokenKey);
          }
        } else {
          await replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
        }
      }
      function handleResponse(responseMessage) {
        if (isDisposed()) {
          return;
        }
        if (responseMessage.id === null) {
          if (responseMessage.error) {
            logger.error(`Received response message without id: Error is: 
${JSON.stringify(responseMessage.error, void 0, 4)}`);
          } else {
            logger.error(`Received response message without id. No further error information provided.`);
          }
        } else {
          const key = responseMessage.id;
          const responsePromise = responsePromises.get(key);
          traceReceivedResponse(responseMessage, responsePromise);
          if (responsePromise !== void 0) {
            responsePromises.delete(key);
            try {
              if (responseMessage.error) {
                const error = responseMessage.error;
                responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
              } else if (responseMessage.result !== void 0) {
                responsePromise.resolve(responseMessage.result);
              } else {
                throw new Error("Should never happen.");
              }
            } catch (error) {
              if (error.message) {
                logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
              } else {
                logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
              }
            }
          }
        }
      }
      async function handleNotification(message) {
        if (isDisposed()) {
          return;
        }
        let type = void 0;
        let notificationHandler;
        if (message.method === CancelNotification.type.method) {
          const cancelId = message.params.id;
          knownCanceledRequests.delete(cancelId);
          traceReceivedNotification(message);
          return;
        } else {
          const element = notificationHandlers.get(message.method);
          if (element) {
            notificationHandler = element.handler;
            type = element.type;
          }
        }
        if (notificationHandler || starNotificationHandler) {
          try {
            traceReceivedNotification(message);
            if (notificationHandler) {
              if (message.params === void 0) {
                if (type !== void 0) {
                  if (type.numberOfParams !== 0 && type.parameterStructures !== messages_1.ParameterStructures.byName) {
                    logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received none.`);
                  }
                }
                await notificationHandler();
              } else if (Array.isArray(message.params)) {
                const params = message.params;
                if (message.method === ProgressNotification.type.method && params.length === 2 && ProgressToken.is(params[0])) {
                  await notificationHandler({ token: params[0], value: params[1] });
                } else {
                  if (type !== void 0) {
                    if (type.parameterStructures === messages_1.ParameterStructures.byName) {
                      logger.error(`Notification ${message.method} defines parameters by name but received parameters by position`);
                    }
                    if (type.numberOfParams !== message.params.length) {
                      logger.error(`Notification ${message.method} defines ${type.numberOfParams} params but received ${params.length} arguments`);
                    }
                  }
                  await notificationHandler(...params);
                }
              } else {
                if (type !== void 0 && type.parameterStructures === messages_1.ParameterStructures.byPosition) {
                  logger.error(`Notification ${message.method} defines parameters by position but received parameters by name`);
                }
                await notificationHandler(message.params);
              }
            } else if (starNotificationHandler) {
              await starNotificationHandler(message.method, message.params);
            }
          } catch (error) {
            if (error.message) {
              logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
            } else {
              logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
            }
          }
        } else {
          unhandledNotificationEmitter.fire(message);
        }
      }
      function handleInvalidMessage(message) {
        if (!message) {
          logger.error("Received empty message.");
          return;
        }
        logger.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(message, null, 4)}`);
        const responseMessage = message;
        if (Is2.string(responseMessage.id) || Is2.number(responseMessage.id)) {
          const key = responseMessage.id;
          const responseHandler = responsePromises.get(key);
          if (responseHandler) {
            responseHandler.reject(new Error("The received response has neither a result nor an error property."));
          }
        }
      }
      function stringifyTrace(params) {
        if (params === void 0 || params === null) {
          return void 0;
        }
        switch (trace) {
          case Trace.Verbose:
            return JSON.stringify(params, null, 4);
          case Trace.Compact:
            return JSON.stringify(params);
          default:
            return void 0;
        }
      }
      function traceSendingRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
            data = `Params: ${stringifyTrace(message.params)}`;
          }
          tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("send-request", message);
        }
      }
      function traceSendingNotification(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.params) {
              data = `Params: ${stringifyTrace(message.params)}`;
            } else {
              data = "No parameters provided.";
            }
          }
          tracer.log(`Sending notification '${message.method}'.`, data);
        } else {
          logLSPMessage("send-notification", message);
        }
      }
      function traceSendingResponse(message, method, startTime) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.error && message.error.data) {
              data = `Error data: ${stringifyTrace(message.error.data)}`;
            } else {
              if (message.result) {
                data = `Result: ${stringifyTrace(message.result)}`;
              } else if (message.error === void 0) {
                data = "No result returned.";
              }
            }
          }
          const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
          tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms.${error}`, data);
        } else {
          logLSPMessage("send-response", message);
        }
      }
      function traceReceivedRequest(message) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if ((trace === Trace.Verbose || trace === Trace.Compact) && message.params) {
            data = `Params: ${stringifyTrace(message.params)}`;
          }
          tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
        } else {
          logLSPMessage("receive-request", message);
        }
      }
      function traceReceivedNotification(message) {
        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.params) {
              data = `Params: ${stringifyTrace(message.params)}`;
            } else {
              data = "No parameters provided.";
            }
          }
          tracer.log(`Received notification '${message.method}'.`, data);
        } else {
          logLSPMessage("receive-notification", message);
        }
      }
      function traceReceivedResponse(message, responsePromise) {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        if (traceFormat === TraceFormat.Text) {
          let data = void 0;
          if (trace === Trace.Verbose || trace === Trace.Compact) {
            if (message.error && message.error.data) {
              data = `Error data: ${stringifyTrace(message.error.data)}`;
            } else {
              if (message.result) {
                data = `Result: ${stringifyTrace(message.result)}`;
              } else if (message.error === void 0) {
                data = "No result returned.";
              }
            }
          }
          if (responsePromise) {
            const error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : "";
            tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
          } else {
            tracer.log(`Received response ${message.id} without active response promise.`, data);
          }
        } else {
          logLSPMessage("receive-response", message);
        }
      }
      function logLSPMessage(type, message) {
        if (!tracer || trace === Trace.Off) {
          return;
        }
        const lspMessage = {
          isLSPMessage: true,
          type,
          message,
          timestamp: Date.now()
        };
        tracer.log(lspMessage);
      }
      function throwIfClosedOrDisposed() {
        if (isClosed()) {
          throw new ConnectionError(ConnectionErrors.Closed, "Connection is closed.");
        }
        if (isDisposed()) {
          throw new ConnectionError(ConnectionErrors.Disposed, "Connection is disposed.");
        }
      }
      function throwIfListening() {
        if (isListening()) {
          throw new ConnectionError(ConnectionErrors.AlreadyListening, "Connection is already listening");
        }
      }
      function throwIfNotListening() {
        if (!isListening()) {
          throw new Error("Call listen() first.");
        }
      }
      function undefinedToNull(param) {
        if (param === void 0) {
          return null;
        } else {
          return param;
        }
      }
      function nullToUndefined(param) {
        if (param === null) {
          return void 0;
        } else {
          return param;
        }
      }
      function isNamedParam(param) {
        return param !== void 0 && param !== null && !Array.isArray(param) && typeof param === "object";
      }
      function computeSingleParam(parameterStructures, param) {
        switch (parameterStructures) {
          case messages_1.ParameterStructures.auto:
            if (isNamedParam(param)) {
              return nullToUndefined(param);
            } else {
              return [undefinedToNull(param)];
            }
          case messages_1.ParameterStructures.byName:
            if (!isNamedParam(param)) {
              throw new Error(`Received parameters by name but param is not an object literal.`);
            }
            return nullToUndefined(param);
          case messages_1.ParameterStructures.byPosition:
            return [undefinedToNull(param)];
          default:
            throw new Error(`Unknown parameter structure ${parameterStructures.toString()}`);
        }
      }
      function computeMessageParams(type, params) {
        let result;
        const numberOfParams = type.numberOfParams;
        switch (numberOfParams) {
          case 0:
            result = void 0;
            break;
          case 1:
            result = computeSingleParam(type.parameterStructures, params[0]);
            break;
          default:
            result = [];
            for (let i = 0; i < params.length && i < numberOfParams; i++) {
              result.push(undefinedToNull(params[i]));
            }
            if (params.length < numberOfParams) {
              for (let i = params.length; i < numberOfParams; i++) {
                result.push(null);
              }
            }
            break;
        }
        return result;
      }
      const connection = {
        sendNotification: (type, ...args) => {
          throwIfClosedOrDisposed();
          let method;
          let messageParams;
          if (Is2.string(type)) {
            method = type;
            const first = args[0];
            let paramStart = 0;
            let parameterStructures = messages_1.ParameterStructures.auto;
            if (messages_1.ParameterStructures.is(first)) {
              paramStart = 1;
              parameterStructures = first;
            }
            const paramEnd = args.length;
            const numberOfParams = paramEnd - paramStart;
            switch (numberOfParams) {
              case 0:
                messageParams = void 0;
                break;
              case 1:
                messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                break;
              default:
                if (parameterStructures === messages_1.ParameterStructures.byName) {
                  throw new Error(`Received ${numberOfParams} parameters for 'by Name' notification parameter structure.`);
                }
                messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
                break;
            }
          } else {
            const params = args;
            method = type.method;
            messageParams = computeMessageParams(type, params);
          }
          const notificationMessage = {
            jsonrpc: version,
            method,
            params: messageParams
          };
          traceSendingNotification(notificationMessage);
          return messageWriter.write(notificationMessage).catch((error) => {
            logger.error(`Sending notification failed.`);
            throw error;
          });
        },
        onNotification: (type, handler) => {
          throwIfClosedOrDisposed();
          let method;
          if (Is2.func(type)) {
            starNotificationHandler = type;
          } else if (handler) {
            if (Is2.string(type)) {
              method = type;
              notificationHandlers.set(type, { type: void 0, handler });
            } else {
              method = type.method;
              notificationHandlers.set(type.method, { type, handler });
            }
          }
          return {
            dispose: () => {
              if (method !== void 0) {
                if (notificationHandlers.get(method)?.handler === handler) {
                  notificationHandlers.delete(method);
                }
              } else if (starNotificationHandler === type) {
                starNotificationHandler = void 0;
              }
            }
          };
        },
        onProgress: (_type, token, handler) => {
          if (progressHandlers.has(token)) {
            throw new Error(`Progress handler for token ${token} already registered`);
          }
          progressHandlers.set(token, handler);
          return {
            dispose: () => {
              if (progressHandlers.get(token) === handler) {
                progressHandlers.delete(token);
              }
            }
          };
        },
        sendProgress: (_type, token, value) => {
          return connection.sendNotification(ProgressNotification.type, { token, value });
        },
        onUnhandledProgress: unhandledProgressEmitter.event,
        sendRequest: (type, ...args) => {
          throwIfClosedOrDisposed();
          throwIfNotListening();
          function sendCancellation(connection2, id2) {
            const p = cancellationStrategy.sender.sendCancellation(connection2, id2);
            if (p === void 0) {
              logger.log(`Received no promise from cancellation strategy when cancelling id ${id2}`);
            } else {
              p.catch(() => {
                logger.log(`Sending cancellation messages for id ${id2} failed.`);
              });
            }
          }
          let method;
          let messageParams;
          let token = void 0;
          if (Is2.string(type)) {
            method = type;
            const first = args[0];
            const last = args[args.length - 1];
            let paramStart = 0;
            let parameterStructures = messages_1.ParameterStructures.auto;
            if (messages_1.ParameterStructures.is(first)) {
              paramStart = 1;
              parameterStructures = first;
            }
            let paramEnd = args.length;
            if (cancellation_1.CancellationToken.is(last)) {
              paramEnd = paramEnd - 1;
              token = last;
            }
            const numberOfParams = paramEnd - paramStart;
            switch (numberOfParams) {
              case 0:
                messageParams = void 0;
                break;
              case 1:
                messageParams = computeSingleParam(parameterStructures, args[paramStart]);
                break;
              default:
                if (parameterStructures === messages_1.ParameterStructures.byName) {
                  throw new Error(`Received ${numberOfParams} parameters for 'by Name' request parameter structure.`);
                }
                messageParams = args.slice(paramStart, paramEnd).map((value) => undefinedToNull(value));
                break;
            }
          } else {
            const params = args;
            method = type.method;
            messageParams = computeMessageParams(type, params);
            const numberOfParams = type.numberOfParams;
            token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : void 0;
          }
          const id = sequenceNumber++;
          let disposable;
          let tokenWasCancelled = false;
          if (token !== void 0) {
            if (token.isCancellationRequested) {
              tokenWasCancelled = true;
            } else {
              disposable = token.onCancellationRequested(() => {
                sendCancellation(connection, id);
              });
            }
          }
          const requestMessage = {
            jsonrpc: version,
            id,
            method,
            params: messageParams
          };
          traceSendingRequest(requestMessage);
          if (typeof cancellationStrategy.sender.enableCancellation === "function") {
            cancellationStrategy.sender.enableCancellation(requestMessage);
          }
          return new Promise(async (resolve, reject) => {
            const resolveWithCleanup = (r) => {
              resolve(r);
              cancellationStrategy.sender.cleanup(id);
              disposable?.dispose();
            };
            const rejectWithCleanup = (r) => {
              reject(r);
              cancellationStrategy.sender.cleanup(id);
              disposable?.dispose();
            };
            const responsePromise = { method, timerStart: Date.now(), resolve: resolveWithCleanup, reject: rejectWithCleanup };
            try {
              responsePromises.set(id, responsePromise);
              await messageWriter.write(requestMessage);
              if (tokenWasCancelled) {
                sendCancellation(connection, id);
              }
            } catch (error) {
              responsePromises.delete(id);
              responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, error.message ? error.message : "Unknown reason"));
              logger.error(`Sending request failed.`);
            }
          });
        },
        onRequest: (type, handler) => {
          throwIfClosedOrDisposed();
          let method = null;
          if (StarRequestHandler.is(type)) {
            method = void 0;
            starRequestHandler = type;
          } else if (Is2.string(type)) {
            method = null;
            if (handler !== void 0) {
              method = type;
              requestHandlers.set(type, { handler, type: void 0 });
            }
          } else {
            if (handler !== void 0) {
              method = type.method;
              requestHandlers.set(type.method, { type, handler });
            }
          }
          return {
            dispose: () => {
              if (method === null) {
                return;
              }
              if (method !== void 0) {
                if (requestHandlers.get(method)?.handler === handler) {
                  requestHandlers.delete(method);
                }
              } else if (starRequestHandler === type) {
                starRequestHandler = void 0;
              }
            }
          };
        },
        hasPendingResponse: () => {
          return responsePromises.size > 0;
        },
        trace: async (_value, _tracer, sendNotificationOrTraceOptions) => {
          let _sendNotification = false;
          let _traceFormat = TraceFormat.Text;
          if (sendNotificationOrTraceOptions !== void 0) {
            if (Is2.boolean(sendNotificationOrTraceOptions)) {
              _sendNotification = sendNotificationOrTraceOptions;
            } else {
              _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
              _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
            }
          }
          trace = _value;
          traceFormat = _traceFormat;
          if (trace === Trace.Off) {
            tracer = void 0;
          } else {
            tracer = _tracer;
          }
          if (_sendNotification && !isClosed() && !isDisposed()) {
            await connection.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
          }
        },
        onError: errorEmitter.event,
        onClose: closeEmitter.event,
        onUnhandledNotification: unhandledNotificationEmitter.event,
        onDispose: disposeEmitter.event,
        end: () => {
          messageWriter.end();
        },
        dispose: () => {
          if (isDisposed()) {
            return;
          }
          state = ConnectionState.Disposed;
          disposeEmitter.fire(void 0);
          const error = new messages_1.ResponseError(messages_1.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed");
          for (const promise of responsePromises.values()) {
            promise.reject(error);
          }
          responsePromises = /* @__PURE__ */ new Map();
          requestTokens = /* @__PURE__ */ new Map();
          knownCanceledRequests = /* @__PURE__ */ new Set();
          messageQueue = new linkedMap_1.LinkedMap();
          if (Is2.func(messageWriter.dispose)) {
            messageWriter.dispose();
          }
          if (Is2.func(messageReader.dispose)) {
            messageReader.dispose();
          }
        },
        listen: () => {
          throwIfClosedOrDisposed();
          throwIfListening();
          state = ConnectionState.Listening;
          messageReader.listen(callback);
        },
        inspect: () => {
          (0, ral_1.default)().console.log("inspect");
        }
      };
      connection.onNotification(LogTraceNotification.type, (params) => {
        if (trace === Trace.Off || !tracer) {
          return;
        }
        const verbose = trace === Trace.Verbose || trace === Trace.Compact;
        tracer.log(params.message, verbose ? params.verbose : void 0);
      });
      connection.onNotification(ProgressNotification.type, async (params) => {
        const handler = progressHandlers.get(params.token);
        if (handler) {
          await handler(params.value);
        } else {
          unhandledProgressEmitter.fire(params);
        }
      });
      return connection;
    }
  }
});

// node_modules/vscode-jsonrpc/lib/common/api.js
var require_api = __commonJS({
  "node_modules/vscode-jsonrpc/lib/common/api.js"(exports) {
    "use strict";
    init_define_process_env();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressType = exports.ProgressToken = exports.createMessageConnection = exports.NullLogger = exports.ConnectionOptions = exports.ConnectionStrategy = exports.AbstractMessageBuffer = exports.WriteableStreamMessageWriter = exports.AbstractMessageWriter = exports.MessageWriter = exports.ReadableStreamMessageReader = exports.AbstractMessageReader = exports.MessageReader = exports.SharedArrayReceiverStrategy = exports.SharedArraySenderStrategy = exports.CancellationToken = exports.CancellationTokenSource = exports.Emitter = exports.Event = exports.Disposable = exports.LRUCache = exports.Touch = exports.LinkedMap = exports.ParameterStructures = exports.NotificationType9 = exports.NotificationType8 = exports.NotificationType7 = exports.NotificationType6 = exports.NotificationType5 = exports.NotificationType4 = exports.NotificationType3 = exports.NotificationType2 = exports.NotificationType1 = exports.NotificationType0 = exports.NotificationType = exports.ErrorCodes = exports.ResponseError = exports.RequestType9 = exports.RequestType8 = exports.RequestType7 = exports.RequestType6 = exports.RequestType5 = exports.RequestType4 = exports.RequestType3 = exports.RequestType2 = exports.RequestType1 = exports.RequestType0 = exports.RequestType = exports.Message = exports.RAL = void 0;
    exports.MessageStrategy = exports.CancellationStrategy = exports.CancellationSenderStrategy = exports.RequestCancellationReceiverStrategy = exports.IdCancellationReceiverStrategy = exports.CancellationReceiverStrategy = exports.ConnectionError = exports.ConnectionErrors = exports.LogTraceNotification = exports.SetTraceNotification = exports.TraceFormat = exports.TraceValues = exports.TraceValue = exports.Trace = void 0;
    var messages_1 = require_messages();
    Object.defineProperty(exports, "Message", { enumerable: true, get: function() {
      return messages_1.Message;
    } });
    Object.defineProperty(exports, "RequestType", { enumerable: true, get: function() {
      return messages_1.RequestType;
    } });
    Object.defineProperty(exports, "RequestType0", { enumerable: true, get: function() {
      return messages_1.RequestType0;
    } });
    Object.defineProperty(exports, "RequestType1", { enumerable: true, get: function() {
      return messages_1.RequestType1;
    } });
    Object.defineProperty(exports, "RequestType2", { enumerable: true, get: function() {
      return messages_1.RequestType2;
    } });
    Object.defineProperty(exports, "RequestType3", { enumerable: true, get: function() {
      return messages_1.RequestType3;
    } });
    Object.defineProperty(exports, "RequestType4", { enumerable: true, get: function() {
      return messages_1.RequestType4;
    } });
    Object.defineProperty(exports, "RequestType5", { enumerable: true, get: function() {
      return messages_1.RequestType5;
    } });
    Object.defineProperty(exports, "RequestType6", { enumerable: true, get: function() {
      return messages_1.RequestType6;
    } });
    Object.defineProperty(exports, "RequestType7", { enumerable: true, get: function() {
      return messages_1.RequestType7;
    } });
    Object.defineProperty(exports, "RequestType8", { enumerable: true, get: function() {
      return messages_1.RequestType8;
    } });
    Object.defineProperty(exports, "RequestType9", { enumerable: true, get: function() {
      return messages_1.RequestType9;
    } });
    Object.defineProperty(exports, "ResponseError", { enumerable: true, get: function() {
      return messages_1.ResponseError;
    } });
    Object.defineProperty(exports, "ErrorCodes", { enumerable: true, get: function() {
      return messages_1.ErrorCodes;
    } });
    Object.defineProperty(exports, "NotificationType", { enumerable: true, get: function() {
      return messages_1.NotificationType;
    } });
    Object.defineProperty(exports, "NotificationType0", { enumerable: true, get: function() {
      return messages_1.NotificationType0;
    } });
    Object.defineProperty(exports, "NotificationType1", { enumerable: true, get: function() {
      return messages_1.NotificationType1;
    } });
    Object.defineProperty(exports, "NotificationType2", { enumerable: true, get: function() {
      return messages_1.NotificationType2;
    } });
    Object.defineProperty(exports, "NotificationType3", { enumerable: true, get: function() {
      return messages_1.NotificationType3;
    } });
    Object.defineProperty(exports, "NotificationType4", { enumerable: true, get: function() {
      return messages_1.NotificationType4;
    } });
    Object.defineProperty(exports, "NotificationType5", { enumerable: true, get: function() {
      return messages_1.NotificationType5;
    } });
    Object.defineProperty(exports, "NotificationType6", { enumerable: true, get: function() {
      return messages_1.NotificationType6;
    } });
    Object.defineProperty(exports, "NotificationType7", { enumerable: true, get: function() {
      return messages_1.NotificationType7;
    } });
    Object.defineProperty(exports, "NotificationType8", { enumerable: true, get: function() {
      return messages_1.NotificationType8;
    } });
    Object.defineProperty(exports, "NotificationType9", { enumerable: true, get: function() {
      return messages_1.NotificationType9;
    } });
    Object.defineProperty(exports, "ParameterStructures", { enumerable: true, get: function() {
      return messages_1.ParameterStructures;
    } });
    var linkedMap_1 = require_linkedMap();
    Object.defineProperty(exports, "LinkedMap", { enumerable: true, get: function() {
      return linkedMap_1.LinkedMap;
    } });
    Object.defineProperty(exports, "LRUCache", { enumerable: true, get: function() {
      return linkedMap_1.LRUCache;
    } });
    Object.defineProperty(exports, "Touch", { enumerable: true, get: function() {
      return linkedMap_1.Touch;
    } });
    var disposable_1 = require_disposable();
    Object.defineProperty(exports, "Disposable", { enumerable: true, get: function() {
      return disposable_1.Disposable;
    } });
    var events_1 = require_events();
    Object.defineProperty(exports, "Event", { enumerable: true, get: function() {
      return events_1.Event;
    } });
    Object.defineProperty(exports, "Emitter", { enumerable: true, get: function() {
      return events_1.Emitter;
    } });
    var cancellation_1 = require_cancellation();
    Object.defineProperty(exports, "CancellationTokenSource", { enumerable: true, get: function() {
      return cancellation_1.CancellationTokenSource;
    } });
    Object.defineProperty(exports, "CancellationToken", { enumerable: true, get: function() {
      return cancellation_1.CancellationToken;
    } });
    var sharedArrayCancellation_1 = require_sharedArrayCancellation();
    Object.defineProperty(exports, "SharedArraySenderStrategy", { enumerable: true, get: function() {
      return sharedArrayCancellation_1.SharedArraySenderStrategy;
    } });
    Object.defineProperty(exports, "SharedArrayReceiverStrategy", { enumerable: true, get: function() {
      return sharedArrayCancellation_1.SharedArrayReceiverStrategy;
    } });
    var messageReader_1 = require_messageReader();
    Object.defineProperty(exports, "MessageReader", { enumerable: true, get: function() {
      return messageReader_1.MessageReader;
    } });
    Object.defineProperty(exports, "AbstractMessageReader", { enumerable: true, get: function() {
      return messageReader_1.AbstractMessageReader;
    } });
    Object.defineProperty(exports, "ReadableStreamMessageReader", { enumerable: true, get: function() {
      return messageReader_1.ReadableStreamMessageReader;
    } });
    var messageWriter_1 = require_messageWriter();
    Object.defineProperty(exports, "MessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.MessageWriter;
    } });
    Object.defineProperty(exports, "AbstractMessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.AbstractMessageWriter;
    } });
    Object.defineProperty(exports, "WriteableStreamMessageWriter", { enumerable: true, get: function() {
      return messageWriter_1.WriteableStreamMessageWriter;
    } });
    var messageBuffer_1 = require_messageBuffer();
    Object.defineProperty(exports, "AbstractMessageBuffer", { enumerable: true, get: function() {
      return messageBuffer_1.AbstractMessageBuffer;
    } });
    var connection_1 = require_connection();
    Object.defineProperty(exports, "ConnectionStrategy", { enumerable: true, get: function() {
      return connection_1.ConnectionStrategy;
    } });
    Object.defineProperty(exports, "ConnectionOptions", { enumerable: true, get: function() {
      return connection_1.ConnectionOptions;
    } });
    Object.defineProperty(exports, "NullLogger", { enumerable: true, get: function() {
      return connection_1.NullLogger;
    } });
    Object.defineProperty(exports, "createMessageConnection", { enumerable: true, get: function() {
      return connection_1.createMessageConnection;
    } });
    Object.defineProperty(exports, "ProgressToken", { enumerable: true, get: function() {
      return connection_1.ProgressToken;
    } });
    Object.defineProperty(exports, "ProgressType", { enumerable: true, get: function() {
      return connection_1.ProgressType;
    } });
    Object.defineProperty(exports, "Trace", { enumerable: true, get: function() {
      return connection_1.Trace;
    } });
    Object.defineProperty(exports, "TraceValue", { enumerable: true, get: function() {
      return connection_1.TraceValue;
    } });
    Object.defineProperty(exports, "TraceFormat", { enumerable: true, get: function() {
      return connection_1.TraceFormat;
    } });
    Object.defineProperty(exports, "SetTraceNotification", { enumerable: true, get: function() {
      return connection_1.SetTraceNotification;
    } });
    Object.defineProperty(exports, "LogTraceNotification", { enumerable: true, get: function() {
      return connection_1.LogTraceNotification;
    } });
    Object.defineProperty(exports, "ConnectionErrors", { enumerable: true, get: function() {
      return connection_1.ConnectionErrors;
    } });
    Object.defineProperty(exports, "ConnectionError", { enumerable: true, get: function() {
      return connection_1.ConnectionError;
    } });
    Object.defineProperty(exports, "CancellationReceiverStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationReceiverStrategy;
    } });
    Object.defineProperty(exports, "IdCancellationReceiverStrategy", { enumerable: true, get: function() {
      return connection_1.IdCancellationReceiverStrategy;
    } });
    Object.defineProperty(exports, "RequestCancellationReceiverStrategy", { enumerable: true, get: function() {
      return connection_1.RequestCancellationReceiverStrategy;
    } });
    Object.defineProperty(exports, "CancellationSenderStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationSenderStrategy;
    } });
    Object.defineProperty(exports, "CancellationStrategy", { enumerable: true, get: function() {
      return connection_1.CancellationStrategy;
    } });
    Object.defineProperty(exports, "MessageStrategy", { enumerable: true, get: function() {
      return connection_1.MessageStrategy;
    } });
    Object.defineProperty(exports, "TraceValues", { enumerable: true, get: function() {
      return connection_1.TraceValues;
    } });
    var ral_1 = __importDefault(require_ral());
    exports.RAL = ral_1.default;
  }
});

// node_modules/vscode-languageserver-types/lib/esm/main.js
var main_exports = {};
__export(main_exports, {
  AnnotatedTextEdit: () => AnnotatedTextEdit,
  ApplyKind: () => ApplyKind,
  ChangeAnnotation: () => ChangeAnnotation,
  ChangeAnnotationIdentifier: () => ChangeAnnotationIdentifier,
  CodeAction: () => CodeAction,
  CodeActionContext: () => CodeActionContext,
  CodeActionKind: () => CodeActionKind,
  CodeActionTag: () => CodeActionTag,
  CodeActionTriggerKind: () => CodeActionTriggerKind,
  CodeDescription: () => CodeDescription,
  CodeLens: () => CodeLens,
  Color: () => Color,
  ColorInformation: () => ColorInformation,
  ColorPresentation: () => ColorPresentation,
  Command: () => Command,
  CompletionItem: () => CompletionItem,
  CompletionItemKind: () => CompletionItemKind,
  CompletionItemLabelDetails: () => CompletionItemLabelDetails,
  CompletionItemTag: () => CompletionItemTag,
  CompletionList: () => CompletionList,
  CreateFile: () => CreateFile,
  DeleteFile: () => DeleteFile,
  Diagnostic: () => Diagnostic,
  DiagnosticRelatedInformation: () => DiagnosticRelatedInformation,
  DiagnosticSeverity: () => DiagnosticSeverity,
  DiagnosticTag: () => DiagnosticTag,
  DocumentHighlight: () => DocumentHighlight,
  DocumentHighlightKind: () => DocumentHighlightKind,
  DocumentLink: () => DocumentLink,
  DocumentSymbol: () => DocumentSymbol,
  DocumentUri: () => DocumentUri,
  EOL: () => EOL,
  FoldingRange: () => FoldingRange,
  FoldingRangeKind: () => FoldingRangeKind,
  FormattingOptions: () => FormattingOptions,
  Hover: () => Hover,
  InlayHint: () => InlayHint,
  InlayHintKind: () => InlayHintKind,
  InlayHintLabelPart: () => InlayHintLabelPart,
  InlineCompletionContext: () => InlineCompletionContext,
  InlineCompletionItem: () => InlineCompletionItem,
  InlineCompletionList: () => InlineCompletionList,
  InlineCompletionTriggerKind: () => InlineCompletionTriggerKind,
  InlineValueContext: () => InlineValueContext,
  InlineValueEvaluatableExpression: () => InlineValueEvaluatableExpression,
  InlineValueText: () => InlineValueText,
  InlineValueVariableLookup: () => InlineValueVariableLookup,
  InsertReplaceEdit: () => InsertReplaceEdit,
  InsertTextFormat: () => InsertTextFormat,
  InsertTextMode: () => InsertTextMode,
  LanguageKind: () => LanguageKind,
  Location: () => Location,
  LocationLink: () => LocationLink,
  MarkedString: () => MarkedString,
  MarkupContent: () => MarkupContent,
  MarkupKind: () => MarkupKind,
  OptionalVersionedTextDocumentIdentifier: () => OptionalVersionedTextDocumentIdentifier,
  ParameterInformation: () => ParameterInformation,
  Position: () => Position,
  Range: () => Range,
  RenameFile: () => RenameFile,
  SelectedCompletionInfo: () => SelectedCompletionInfo,
  SelectionRange: () => SelectionRange,
  SemanticTokenModifiers: () => SemanticTokenModifiers,
  SemanticTokenTypes: () => SemanticTokenTypes,
  SemanticTokens: () => SemanticTokens,
  SignatureInformation: () => SignatureInformation,
  SnippetTextEdit: () => SnippetTextEdit,
  StringValue: () => StringValue,
  SymbolInformation: () => SymbolInformation,
  SymbolKind: () => SymbolKind,
  SymbolTag: () => SymbolTag,
  TextDocument: () => TextDocument,
  TextDocumentEdit: () => TextDocumentEdit,
  TextDocumentIdentifier: () => TextDocumentIdentifier,
  TextDocumentItem: () => TextDocumentItem,
  TextEdit: () => TextEdit,
  URI: () => URI,
  VersionedTextDocumentIdentifier: () => VersionedTextDocumentIdentifier,
  WorkspaceChange: () => WorkspaceChange,
  WorkspaceEdit: () => WorkspaceEdit,
  WorkspaceFolder: () => WorkspaceFolder,
  WorkspaceSymbol: () => WorkspaceSymbol,
  integer: () => integer,
  uinteger: () => uinteger
});
var DocumentUri, URI, integer, uinteger, Position, Range, Location, LocationLink, Color, ColorInformation, ColorPresentation, FoldingRangeKind, FoldingRange, DiagnosticRelatedInformation, DiagnosticSeverity, DiagnosticTag, CodeDescription, Diagnostic, Command, TextEdit, ChangeAnnotation, ChangeAnnotationIdentifier, AnnotatedTextEdit, TextDocumentEdit, CreateFile, RenameFile, DeleteFile, WorkspaceEdit, TextEditChangeImpl, SnippetTextEdit, ChangeAnnotations, WorkspaceChange, TextDocumentIdentifier, VersionedTextDocumentIdentifier, OptionalVersionedTextDocumentIdentifier, LanguageKind, TextDocumentItem, MarkupKind, MarkupContent, CompletionItemKind, InsertTextFormat, CompletionItemTag, InsertReplaceEdit, InsertTextMode, ApplyKind, CompletionItemLabelDetails, CompletionItem, CompletionList, MarkedString, Hover, ParameterInformation, SignatureInformation, DocumentHighlightKind, DocumentHighlight, SymbolKind, SymbolTag, SymbolInformation, WorkspaceSymbol, DocumentSymbol, CodeActionKind, CodeActionTriggerKind, CodeActionContext, CodeActionTag, CodeAction, CodeLens, FormattingOptions, DocumentLink, SelectionRange, SemanticTokenTypes, SemanticTokenModifiers, SemanticTokens, InlineValueText, InlineValueVariableLookup, InlineValueEvaluatableExpression, InlineValueContext, InlayHintKind, InlayHintLabelPart, InlayHint, StringValue, InlineCompletionItem, InlineCompletionList, InlineCompletionTriggerKind, SelectedCompletionInfo, InlineCompletionContext, WorkspaceFolder, EOL, TextDocument, FullTextDocument, Is;
var init_main = __esm({
  "node_modules/vscode-languageserver-types/lib/esm/main.js"() {
    "use strict";
    init_define_process_env();
    (function(DocumentUri2) {
      function is(value) {
        return typeof value === "string";
      }
      DocumentUri2.is = is;
    })(DocumentUri || (DocumentUri = {}));
    (function(URI2) {
      function is(value) {
        return typeof value === "string";
      }
      URI2.is = is;
    })(URI || (URI = {}));
    (function(integer2) {
      integer2.MIN_VALUE = -2147483648;
      integer2.MAX_VALUE = 2147483647;
      function is(value) {
        return typeof value === "number" && integer2.MIN_VALUE <= value && value <= integer2.MAX_VALUE;
      }
      integer2.is = is;
    })(integer || (integer = {}));
    (function(uinteger2) {
      uinteger2.MIN_VALUE = 0;
      uinteger2.MAX_VALUE = 2147483647;
      function is(value) {
        return typeof value === "number" && uinteger2.MIN_VALUE <= value && value <= uinteger2.MAX_VALUE;
      }
      uinteger2.is = is;
    })(uinteger || (uinteger = {}));
    (function(Position4) {
      function create(line, character) {
        if (line === Number.MAX_VALUE) {
          line = uinteger.MAX_VALUE;
        }
        if (character === Number.MAX_VALUE) {
          character = uinteger.MAX_VALUE;
        }
        return { line, character };
      }
      Position4.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
      }
      Position4.is = is;
    })(Position || (Position = {}));
    (function(Range8) {
      function create(one, two, three, four) {
        if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
          return { start: Position.create(one, two), end: Position.create(three, four) };
        } else if (Position.is(one) && Position.is(two)) {
          return { start: one, end: two };
        } else {
          throw new Error(`Range#create called with invalid arguments[${one}, ${two}, ${three}, ${four}]`);
        }
      }
      Range8.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
      }
      Range8.is = is;
    })(Range || (Range = {}));
    (function(Location2) {
      function create(uri, range) {
        return { uri, range };
      }
      Location2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
      }
      Location2.is = is;
    })(Location || (Location = {}));
    (function(LocationLink2) {
      function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
        return { targetUri, targetRange, targetSelectionRange, originSelectionRange };
      }
      LocationLink2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
      }
      LocationLink2.is = is;
    })(LocationLink || (LocationLink = {}));
    (function(Color2) {
      function create(red, green, blue, alpha) {
        return {
          red,
          green,
          blue,
          alpha
        };
      }
      Color2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
      }
      Color2.is = is;
    })(Color || (Color = {}));
    (function(ColorInformation2) {
      function create(range, color) {
        return {
          range,
          color
        };
      }
      ColorInformation2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
      }
      ColorInformation2.is = is;
    })(ColorInformation || (ColorInformation = {}));
    (function(ColorPresentation2) {
      function create(label, textEdit, additionalTextEdits) {
        return {
          label,
          textEdit,
          additionalTextEdits
        };
      }
      ColorPresentation2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
      }
      ColorPresentation2.is = is;
    })(ColorPresentation || (ColorPresentation = {}));
    (function(FoldingRangeKind3) {
      FoldingRangeKind3.Comment = "comment";
      FoldingRangeKind3.Imports = "imports";
      FoldingRangeKind3.Region = "region";
    })(FoldingRangeKind || (FoldingRangeKind = {}));
    (function(FoldingRange2) {
      function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
        const result = {
          startLine,
          endLine
        };
        if (Is.defined(startCharacter)) {
          result.startCharacter = startCharacter;
        }
        if (Is.defined(endCharacter)) {
          result.endCharacter = endCharacter;
        }
        if (Is.defined(kind)) {
          result.kind = kind;
        }
        if (Is.defined(collapsedText)) {
          result.collapsedText = collapsedText;
        }
        return result;
      }
      FoldingRange2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
      }
      FoldingRange2.is = is;
    })(FoldingRange || (FoldingRange = {}));
    (function(DiagnosticRelatedInformation2) {
      function create(location, message) {
        return {
          location,
          message
        };
      }
      DiagnosticRelatedInformation2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
      }
      DiagnosticRelatedInformation2.is = is;
    })(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
    (function(DiagnosticSeverity5) {
      DiagnosticSeverity5.Error = 1;
      DiagnosticSeverity5.Warning = 2;
      DiagnosticSeverity5.Information = 3;
      DiagnosticSeverity5.Hint = 4;
    })(DiagnosticSeverity || (DiagnosticSeverity = {}));
    (function(DiagnosticTag3) {
      DiagnosticTag3.Unnecessary = 1;
      DiagnosticTag3.Deprecated = 2;
    })(DiagnosticTag || (DiagnosticTag = {}));
    (function(CodeDescription2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.href);
      }
      CodeDescription2.is = is;
    })(CodeDescription || (CodeDescription = {}));
    (function(Diagnostic2) {
      function create(range, message, severity, code, source, relatedInformation) {
        const result = { range, message };
        if (Is.defined(severity)) {
          result.severity = severity;
        }
        if (Is.defined(code)) {
          result.code = code;
        }
        if (Is.defined(source)) {
          result.source = source;
        }
        if (Is.defined(relatedInformation)) {
          result.relatedInformation = relatedInformation;
        }
        return result;
      }
      Diagnostic2.create = create;
      function is(value) {
        var _a;
        const candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.message) || MarkupContent.is(candidate.message)) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
      }
      Diagnostic2.is = is;
      function is3_17(value) {
        return Is.string(value.message);
      }
      Diagnostic2.is3_17 = is3_17;
      function getMessageString(diagnostic) {
        if (Is.string(diagnostic.message)) {
          return diagnostic.message;
        } else if (MarkupContent.is(diagnostic.message)) {
          return diagnostic.message.value;
        } else {
          throw new Error(`Unknown message type ${typeof diagnostic.message}`);
        }
      }
      Diagnostic2.getMessageString = getMessageString;
    })(Diagnostic || (Diagnostic = {}));
    (function(Command2) {
      function create(title, command, ...args) {
        const result = { title, command };
        if (Is.defined(args) && args.length > 0) {
          result.arguments = args;
        }
        return result;
      }
      Command2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip)) && Is.string(candidate.command);
      }
      Command2.is = is;
    })(Command || (Command = {}));
    (function(TextEdit6) {
      function replace(range, newText) {
        return { range, newText };
      }
      TextEdit6.replace = replace;
      function insert(position, newText) {
        return { range: { start: position, end: position }, newText };
      }
      TextEdit6.insert = insert;
      function del(range) {
        return { range, newText: "" };
      }
      TextEdit6.del = del;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
      }
      TextEdit6.is = is;
    })(TextEdit || (TextEdit = {}));
    (function(ChangeAnnotation2) {
      function create(label, needsConfirmation, description) {
        const result = { label };
        if (needsConfirmation !== void 0) {
          result.needsConfirmation = needsConfirmation;
        }
        if (description !== void 0) {
          result.description = description;
        }
        return result;
      }
      ChangeAnnotation2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
      }
      ChangeAnnotation2.is = is;
    })(ChangeAnnotation || (ChangeAnnotation = {}));
    (function(ChangeAnnotationIdentifier2) {
      function is(value) {
        const candidate = value;
        return Is.string(candidate);
      }
      ChangeAnnotationIdentifier2.is = is;
    })(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
    (function(AnnotatedTextEdit2) {
      function replace(range, newText, annotation) {
        return { range, newText, annotationId: annotation };
      }
      AnnotatedTextEdit2.replace = replace;
      function insert(position, newText, annotation) {
        return { range: { start: position, end: position }, newText, annotationId: annotation };
      }
      AnnotatedTextEdit2.insert = insert;
      function del(range, annotation) {
        return { range, newText: "", annotationId: annotation };
      }
      AnnotatedTextEdit2.del = del;
      function is(value) {
        const candidate = value;
        return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      AnnotatedTextEdit2.is = is;
    })(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
    (function(TextDocumentEdit2) {
      function create(textDocument, edits) {
        return { textDocument, edits };
      }
      TextDocumentEdit2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
      }
      TextDocumentEdit2.is = is;
    })(TextDocumentEdit || (TextDocumentEdit = {}));
    (function(CreateFile2) {
      function create(uri, options, annotation) {
        const result = {
          kind: "create",
          uri
        };
        if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
          result.options = options;
        }
        if (annotation !== void 0) {
          result.annotationId = annotation;
        }
        return result;
      }
      CreateFile2.create = create;
      function is(value) {
        const candidate = value;
        return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      CreateFile2.is = is;
    })(CreateFile || (CreateFile = {}));
    (function(RenameFile2) {
      function create(oldUri, newUri, options, annotation) {
        const result = {
          kind: "rename",
          oldUri,
          newUri
        };
        if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
          result.options = options;
        }
        if (annotation !== void 0) {
          result.annotationId = annotation;
        }
        return result;
      }
      RenameFile2.create = create;
      function is(value) {
        const candidate = value;
        return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      RenameFile2.is = is;
    })(RenameFile || (RenameFile = {}));
    (function(DeleteFile2) {
      function create(uri, options, annotation) {
        const result = {
          kind: "delete",
          uri
        };
        if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
          result.options = options;
        }
        if (annotation !== void 0) {
          result.annotationId = annotation;
        }
        return result;
      }
      DeleteFile2.create = create;
      function is(value) {
        const candidate = value;
        return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
      }
      DeleteFile2.is = is;
    })(DeleteFile || (DeleteFile = {}));
    (function(WorkspaceEdit2) {
      function is(value) {
        const candidate = value;
        return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every((change) => {
          if (Is.string(change.kind)) {
            return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
          } else {
            return TextDocumentEdit.is(change);
          }
        }));
      }
      WorkspaceEdit2.is = is;
    })(WorkspaceEdit || (WorkspaceEdit = {}));
    TextEditChangeImpl = class {
      constructor(edits, changeAnnotations) {
        this.edits = edits;
        this.changeAnnotations = changeAnnotations;
      }
      insert(position, newText, annotation) {
        let edit;
        let id;
        if (annotation === void 0) {
          edit = TextEdit.insert(position, newText);
        } else if (ChangeAnnotationIdentifier.is(annotation)) {
          id = annotation;
          edit = AnnotatedTextEdit.insert(position, newText, annotation);
        } else {
          this.assertChangeAnnotations(this.changeAnnotations);
          id = this.changeAnnotations.manage(annotation);
          edit = AnnotatedTextEdit.insert(position, newText, id);
        }
        this.edits.push(edit);
        if (id !== void 0) {
          return id;
        }
      }
      replace(range, newText, annotation) {
        let edit;
        let id;
        if (annotation === void 0) {
          edit = TextEdit.replace(range, newText);
        } else if (ChangeAnnotationIdentifier.is(annotation)) {
          id = annotation;
          edit = AnnotatedTextEdit.replace(range, newText, annotation);
        } else {
          this.assertChangeAnnotations(this.changeAnnotations);
          id = this.changeAnnotations.manage(annotation);
          edit = AnnotatedTextEdit.replace(range, newText, id);
        }
        this.edits.push(edit);
        if (id !== void 0) {
          return id;
        }
      }
      delete(range, annotation) {
        let edit;
        let id;
        if (annotation === void 0) {
          edit = TextEdit.del(range);
        } else if (ChangeAnnotationIdentifier.is(annotation)) {
          id = annotation;
          edit = AnnotatedTextEdit.del(range, annotation);
        } else {
          this.assertChangeAnnotations(this.changeAnnotations);
          id = this.changeAnnotations.manage(annotation);
          edit = AnnotatedTextEdit.del(range, id);
        }
        this.edits.push(edit);
        if (id !== void 0) {
          return id;
        }
      }
      add(edit) {
        this.edits.push(edit);
      }
      all() {
        return this.edits;
      }
      clear() {
        this.edits.splice(0, this.edits.length);
      }
      assertChangeAnnotations(value) {
        if (value === void 0) {
          throw new Error(`Text edit change is not configured to manage change annotations.`);
        }
      }
    };
    (function(SnippetTextEdit2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && StringValue.isSnippet(candidate.snippet) && (candidate.annotationId === void 0 || (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId)));
      }
      SnippetTextEdit2.is = is;
    })(SnippetTextEdit || (SnippetTextEdit = {}));
    ChangeAnnotations = class {
      constructor(annotations) {
        this._annotations = annotations === void 0 ? /* @__PURE__ */ Object.create(null) : annotations;
        this._counter = 0;
        this._size = 0;
      }
      all() {
        return this._annotations;
      }
      get size() {
        return this._size;
      }
      manage(idOrAnnotation, annotation) {
        let id;
        if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
          id = idOrAnnotation;
        } else {
          id = this.nextId();
          annotation = idOrAnnotation;
        }
        if (this._annotations[id] !== void 0) {
          throw new Error(`Id ${id} is already in use.`);
        }
        if (annotation === void 0) {
          throw new Error(`No annotation provided for id ${id}`);
        }
        this._annotations[id] = annotation;
        this._size++;
        return id;
      }
      nextId() {
        this._counter++;
        return this._counter.toString();
      }
    };
    WorkspaceChange = class {
      constructor(workspaceEdit) {
        this._textEditChanges = /* @__PURE__ */ Object.create(null);
        if (workspaceEdit !== void 0) {
          this._workspaceEdit = workspaceEdit;
          if (workspaceEdit.documentChanges) {
            this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
            workspaceEdit.changeAnnotations = this._changeAnnotations.all();
            workspaceEdit.documentChanges.forEach((change) => {
              if (TextDocumentEdit.is(change)) {
                const textEditChange = new TextEditChangeImpl(change.edits, this._changeAnnotations);
                this._textEditChanges[change.textDocument.uri] = textEditChange;
              }
            });
          } else if (workspaceEdit.changes) {
            Object.keys(workspaceEdit.changes).forEach((key) => {
              const textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
              this._textEditChanges[key] = textEditChange;
            });
          }
        } else {
          this._workspaceEdit = {};
        }
      }
      /**
       * Returns the underlying {@link WorkspaceEdit} literal
       * use to be returned from a workspace edit operation like rename.
       */
      get edit() {
        this.initDocumentChanges();
        if (this._changeAnnotations !== void 0) {
          if (this._changeAnnotations.size === 0) {
            this._workspaceEdit.changeAnnotations = void 0;
          } else {
            this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
          }
        }
        return this._workspaceEdit;
      }
      getTextEditChange(key) {
        if (OptionalVersionedTextDocumentIdentifier.is(key)) {
          this.initDocumentChanges();
          if (this._workspaceEdit.documentChanges === void 0) {
            throw new Error("Workspace edit is not configured for document changes.");
          }
          const textDocument = { uri: key.uri, version: key.version };
          let result = this._textEditChanges[textDocument.uri];
          if (!result) {
            const edits = [];
            const textDocumentEdit = {
              textDocument,
              edits
            };
            this._workspaceEdit.documentChanges.push(textDocumentEdit);
            result = new TextEditChangeImpl(edits, this._changeAnnotations);
            this._textEditChanges[textDocument.uri] = result;
          }
          return result;
        } else {
          this.initChanges();
          if (this._workspaceEdit.changes === void 0) {
            throw new Error("Workspace edit is not configured for normal text edit changes.");
          }
          let result = this._textEditChanges[key];
          if (!result) {
            const edits = [];
            this._workspaceEdit.changes[key] = edits;
            result = new TextEditChangeImpl(edits);
            this._textEditChanges[key] = result;
          }
          return result;
        }
      }
      initDocumentChanges() {
        if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
          this._changeAnnotations = new ChangeAnnotations();
          this._workspaceEdit.documentChanges = [];
          this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
      }
      initChanges() {
        if (this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0) {
          this._workspaceEdit.changes = /* @__PURE__ */ Object.create(null);
        }
      }
      createFile(uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === void 0) {
          throw new Error("Workspace edit is not configured for document changes.");
        }
        let annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
          annotation = optionsOrAnnotation;
        } else {
          options = optionsOrAnnotation;
        }
        let operation;
        let id;
        if (annotation === void 0) {
          operation = CreateFile.create(uri, options);
        } else {
          id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
          operation = CreateFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== void 0) {
          return id;
        }
      }
      renameFile(oldUri, newUri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === void 0) {
          throw new Error("Workspace edit is not configured for document changes.");
        }
        let annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
          annotation = optionsOrAnnotation;
        } else {
          options = optionsOrAnnotation;
        }
        let operation;
        let id;
        if (annotation === void 0) {
          operation = RenameFile.create(oldUri, newUri, options);
        } else {
          id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
          operation = RenameFile.create(oldUri, newUri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== void 0) {
          return id;
        }
      }
      deleteFile(uri, optionsOrAnnotation, options) {
        this.initDocumentChanges();
        if (this._workspaceEdit.documentChanges === void 0) {
          throw new Error("Workspace edit is not configured for document changes.");
        }
        let annotation;
        if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
          annotation = optionsOrAnnotation;
        } else {
          options = optionsOrAnnotation;
        }
        let operation;
        let id;
        if (annotation === void 0) {
          operation = DeleteFile.create(uri, options);
        } else {
          id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
          operation = DeleteFile.create(uri, options, id);
        }
        this._workspaceEdit.documentChanges.push(operation);
        if (id !== void 0) {
          return id;
        }
      }
    };
    (function(TextDocumentIdentifier2) {
      function create(uri) {
        return { uri };
      }
      TextDocumentIdentifier2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
      }
      TextDocumentIdentifier2.is = is;
    })(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
    (function(VersionedTextDocumentIdentifier2) {
      function create(uri, version) {
        return { uri, version };
      }
      VersionedTextDocumentIdentifier2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
      }
      VersionedTextDocumentIdentifier2.is = is;
    })(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
    (function(OptionalVersionedTextDocumentIdentifier2) {
      function create(uri, version) {
        return { uri, version };
      }
      OptionalVersionedTextDocumentIdentifier2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
      }
      OptionalVersionedTextDocumentIdentifier2.is = is;
    })(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
    (function(LanguageKind2) {
      LanguageKind2.ABAP = "abap";
      LanguageKind2.WindowsBat = "bat";
      LanguageKind2.BibTeX = "bibtex";
      LanguageKind2.Clojure = "clojure";
      LanguageKind2.Coffeescript = "coffeescript";
      LanguageKind2.C = "c";
      LanguageKind2.CPP = "cpp";
      LanguageKind2.CSharp = "csharp";
      LanguageKind2.CSS = "css";
      LanguageKind2.D = "d";
      LanguageKind2.Delphi = "pascal";
      LanguageKind2.Diff = "diff";
      LanguageKind2.Dart = "dart";
      LanguageKind2.Dockerfile = "dockerfile";
      LanguageKind2.Elixir = "elixir";
      LanguageKind2.Erlang = "erlang";
      LanguageKind2.FSharp = "fsharp";
      LanguageKind2.GitCommit = "git-commit";
      LanguageKind2.GitRebase = "git-rebase";
      LanguageKind2.Go = "go";
      LanguageKind2.Groovy = "groovy";
      LanguageKind2.Handlebars = "handlebars";
      LanguageKind2.Haskell = "haskell";
      LanguageKind2.HTML = "html";
      LanguageKind2.Ini = "ini";
      LanguageKind2.Java = "java";
      LanguageKind2.JavaScript = "javascript";
      LanguageKind2.JavaScriptReact = "javascriptreact";
      LanguageKind2.JSON = "json";
      LanguageKind2.LaTeX = "latex";
      LanguageKind2.Less = "less";
      LanguageKind2.Lua = "lua";
      LanguageKind2.Makefile = "makefile";
      LanguageKind2.Markdown = "markdown";
      LanguageKind2.ObjectiveC = "objective-c";
      LanguageKind2.ObjectiveCPP = "objective-cpp";
      LanguageKind2.Pascal = "pascal";
      LanguageKind2.Perl = "perl";
      LanguageKind2.Perl6 = "perl6";
      LanguageKind2.PHP = "php";
      LanguageKind2.Plaintext = "plaintext";
      LanguageKind2.Powershell = "powershell";
      LanguageKind2.Pug = "jade";
      LanguageKind2.Python = "python";
      LanguageKind2.R = "r";
      LanguageKind2.Razor = "razor";
      LanguageKind2.Ruby = "ruby";
      LanguageKind2.Rust = "rust";
      LanguageKind2.SCSS = "scss";
      LanguageKind2.SASS = "sass";
      LanguageKind2.Scala = "scala";
      LanguageKind2.ShaderLab = "shaderlab";
      LanguageKind2.ShellScript = "shellscript";
      LanguageKind2.SQL = "sql";
      LanguageKind2.Swift = "swift";
      LanguageKind2.TypeScript = "typescript";
      LanguageKind2.TypeScriptReact = "typescriptreact";
      LanguageKind2.TeX = "tex";
      LanguageKind2.VisualBasic = "vb";
      LanguageKind2.XML = "xml";
      LanguageKind2.XSL = "xsl";
      LanguageKind2.YAML = "yaml";
    })(LanguageKind || (LanguageKind = {}));
    (function(TextDocumentItem2) {
      function create(uri, languageId, version, text) {
        return { uri, languageId, version, text };
      }
      TextDocumentItem2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
      }
      TextDocumentItem2.is = is;
    })(TextDocumentItem || (TextDocumentItem = {}));
    (function(MarkupKind4) {
      MarkupKind4.PlainText = "plaintext";
      MarkupKind4.Markdown = "markdown";
      function is(value) {
        const candidate = value;
        return candidate === MarkupKind4.PlainText || candidate === MarkupKind4.Markdown;
      }
      MarkupKind4.is = is;
    })(MarkupKind || (MarkupKind = {}));
    (function(MarkupContent2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
      }
      MarkupContent2.is = is;
    })(MarkupContent || (MarkupContent = {}));
    (function(CompletionItemKind4) {
      CompletionItemKind4.Text = 1;
      CompletionItemKind4.Method = 2;
      CompletionItemKind4.Function = 3;
      CompletionItemKind4.Constructor = 4;
      CompletionItemKind4.Field = 5;
      CompletionItemKind4.Variable = 6;
      CompletionItemKind4.Class = 7;
      CompletionItemKind4.Interface = 8;
      CompletionItemKind4.Module = 9;
      CompletionItemKind4.Property = 10;
      CompletionItemKind4.Unit = 11;
      CompletionItemKind4.Value = 12;
      CompletionItemKind4.Enum = 13;
      CompletionItemKind4.Keyword = 14;
      CompletionItemKind4.Snippet = 15;
      CompletionItemKind4.Color = 16;
      CompletionItemKind4.File = 17;
      CompletionItemKind4.Reference = 18;
      CompletionItemKind4.Folder = 19;
      CompletionItemKind4.EnumMember = 20;
      CompletionItemKind4.Constant = 21;
      CompletionItemKind4.Struct = 22;
      CompletionItemKind4.Event = 23;
      CompletionItemKind4.Operator = 24;
      CompletionItemKind4.TypeParameter = 25;
    })(CompletionItemKind || (CompletionItemKind = {}));
    (function(InsertTextFormat2) {
      InsertTextFormat2.PlainText = 1;
      InsertTextFormat2.Snippet = 2;
    })(InsertTextFormat || (InsertTextFormat = {}));
    (function(CompletionItemTag2) {
      CompletionItemTag2.Deprecated = 1;
    })(CompletionItemTag || (CompletionItemTag = {}));
    (function(InsertReplaceEdit2) {
      function create(newText, insert, replace) {
        return { newText, insert, replace };
      }
      InsertReplaceEdit2.create = create;
      function is(value) {
        const candidate = value;
        return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
      }
      InsertReplaceEdit2.is = is;
    })(InsertReplaceEdit || (InsertReplaceEdit = {}));
    (function(InsertTextMode2) {
      InsertTextMode2.asIs = 1;
      InsertTextMode2.adjustIndentation = 2;
    })(InsertTextMode || (InsertTextMode = {}));
    (function(ApplyKind2) {
      ApplyKind2.Replace = 1;
      ApplyKind2.Merge = 2;
    })(ApplyKind || (ApplyKind = {}));
    (function(CompletionItemLabelDetails2) {
      function is(value) {
        const candidate = value;
        return candidate && (Is.string(candidate.detail) || candidate.detail === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
      }
      CompletionItemLabelDetails2.is = is;
    })(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
    (function(CompletionItem2) {
      function create(label) {
        return { label };
      }
      CompletionItem2.create = create;
    })(CompletionItem || (CompletionItem = {}));
    (function(CompletionList3) {
      function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
      }
      CompletionList3.create = create;
    })(CompletionList || (CompletionList = {}));
    (function(MarkedString2) {
      function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
      }
      MarkedString2.fromPlainText = fromPlainText;
      function is(value) {
        const candidate = value;
        return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
      }
      MarkedString2.is = is;
    })(MarkedString || (MarkedString = {}));
    (function(Hover2) {
      function is(value) {
        const candidate = value;
        return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
      }
      Hover2.is = is;
    })(Hover || (Hover = {}));
    (function(ParameterInformation2) {
      function create(label, documentation) {
        return documentation ? { label, documentation } : { label };
      }
      ParameterInformation2.create = create;
    })(ParameterInformation || (ParameterInformation = {}));
    (function(SignatureInformation2) {
      function create(label, documentation, ...parameters) {
        const result = { label };
        if (Is.defined(documentation)) {
          result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
          result.parameters = parameters;
        } else {
          result.parameters = [];
        }
        return result;
      }
      SignatureInformation2.create = create;
    })(SignatureInformation || (SignatureInformation = {}));
    (function(DocumentHighlightKind3) {
      DocumentHighlightKind3.Text = 1;
      DocumentHighlightKind3.Read = 2;
      DocumentHighlightKind3.Write = 3;
    })(DocumentHighlightKind || (DocumentHighlightKind = {}));
    (function(DocumentHighlight2) {
      function create(range, kind) {
        const result = { range };
        if (Is.number(kind)) {
          result.kind = kind;
        }
        return result;
      }
      DocumentHighlight2.create = create;
    })(DocumentHighlight || (DocumentHighlight = {}));
    (function(SymbolKind3) {
      SymbolKind3.File = 1;
      SymbolKind3.Module = 2;
      SymbolKind3.Namespace = 3;
      SymbolKind3.Package = 4;
      SymbolKind3.Class = 5;
      SymbolKind3.Method = 6;
      SymbolKind3.Property = 7;
      SymbolKind3.Field = 8;
      SymbolKind3.Constructor = 9;
      SymbolKind3.Enum = 10;
      SymbolKind3.Interface = 11;
      SymbolKind3.Function = 12;
      SymbolKind3.Variable = 13;
      SymbolKind3.Constant = 14;
      SymbolKind3.String = 15;
      SymbolKind3.Number = 16;
      SymbolKind3.Boolean = 17;
      SymbolKind3.Array = 18;
      SymbolKind3.Object = 19;
      SymbolKind3.Key = 20;
      SymbolKind3.Null = 21;
      SymbolKind3.EnumMember = 22;
      SymbolKind3.Struct = 23;
      SymbolKind3.Event = 24;
      SymbolKind3.Operator = 25;
      SymbolKind3.TypeParameter = 26;
    })(SymbolKind || (SymbolKind = {}));
    (function(SymbolTag2) {
      SymbolTag2.Deprecated = 1;
    })(SymbolTag || (SymbolTag = {}));
    (function(SymbolInformation2) {
      function create(name, kind, range, uri, containerName) {
        const result = {
          name,
          kind,
          location: { uri, range }
        };
        if (containerName) {
          result.containerName = containerName;
        }
        return result;
      }
      SymbolInformation2.create = create;
    })(SymbolInformation || (SymbolInformation = {}));
    (function(WorkspaceSymbol2) {
      function create(name, kind, uri, range) {
        return range !== void 0 ? { name, kind, location: { uri, range } } : { name, kind, location: { uri } };
      }
      WorkspaceSymbol2.create = create;
    })(WorkspaceSymbol || (WorkspaceSymbol = {}));
    (function(DocumentSymbol3) {
      function create(name, detail, kind, range, selectionRange, children) {
        const result = {
          name,
          detail,
          kind,
          range,
          selectionRange
        };
        if (children !== void 0) {
          result.children = children;
        }
        return result;
      }
      DocumentSymbol3.create = create;
      function is(value) {
        const candidate = value;
        return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
      }
      DocumentSymbol3.is = is;
    })(DocumentSymbol || (DocumentSymbol = {}));
    (function(CodeActionKind3) {
      CodeActionKind3.Empty = "";
      CodeActionKind3.QuickFix = "quickfix";
      CodeActionKind3.Refactor = "refactor";
      CodeActionKind3.RefactorExtract = "refactor.extract";
      CodeActionKind3.RefactorInline = "refactor.inline";
      CodeActionKind3.RefactorMove = "refactor.move";
      CodeActionKind3.RefactorRewrite = "refactor.rewrite";
      CodeActionKind3.Source = "source";
      CodeActionKind3.SourceOrganizeImports = "source.organizeImports";
      CodeActionKind3.SourceFixAll = "source.fixAll";
      CodeActionKind3.Notebook = "notebook";
    })(CodeActionKind || (CodeActionKind = {}));
    (function(CodeActionTriggerKind2) {
      CodeActionTriggerKind2.Invoked = 1;
      CodeActionTriggerKind2.Automatic = 2;
    })(CodeActionTriggerKind || (CodeActionTriggerKind = {}));
    (function(CodeActionContext2) {
      function create(diagnostics, only, triggerKind) {
        const result = { diagnostics };
        if (only !== void 0 && only !== null) {
          result.only = only;
        }
        if (triggerKind !== void 0 && triggerKind !== null) {
          result.triggerKind = triggerKind;
        }
        return result;
      }
      CodeActionContext2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string)) && (candidate.triggerKind === void 0 || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
      }
      CodeActionContext2.is = is;
    })(CodeActionContext || (CodeActionContext = {}));
    (function(CodeActionTag2) {
      CodeActionTag2.LLMGenerated = 1;
      function is(value) {
        return Is.defined(value) && value === CodeActionTag2.LLMGenerated;
      }
      CodeActionTag2.is = is;
    })(CodeActionTag || (CodeActionTag = {}));
    (function(CodeAction2) {
      function create(title, kindOrCommandOrEdit, kind) {
        const result = { title };
        let checkKind = true;
        if (typeof kindOrCommandOrEdit === "string") {
          checkKind = false;
          result.kind = kindOrCommandOrEdit;
        } else if (Command.is(kindOrCommandOrEdit)) {
          result.command = kindOrCommandOrEdit;
        } else {
          result.edit = kindOrCommandOrEdit;
        }
        if (checkKind && kind !== void 0) {
          result.kind = kind;
        }
        return result;
      }
      CodeAction2.create = create;
      function is(value) {
        const candidate = value;
        return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit)) && (candidate.tags === void 0 || Is.typedArray(candidate.tags, CodeActionTag.is));
      }
      CodeAction2.is = is;
    })(CodeAction || (CodeAction = {}));
    (function(CodeLens2) {
      function create(range, data) {
        const result = { range };
        if (Is.defined(data)) {
          result.data = data;
        }
        return result;
      }
      CodeLens2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
      }
      CodeLens2.is = is;
    })(CodeLens || (CodeLens = {}));
    (function(FormattingOptions2) {
      function create(tabSize, insertSpaces) {
        return { tabSize, insertSpaces };
      }
      FormattingOptions2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
      }
      FormattingOptions2.is = is;
    })(FormattingOptions || (FormattingOptions = {}));
    (function(DocumentLink2) {
      function create(range, target, data) {
        return { range, target, data };
      }
      DocumentLink2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
      }
      DocumentLink2.is = is;
    })(DocumentLink || (DocumentLink = {}));
    (function(SelectionRange2) {
      function create(range, parent) {
        return { range, parent };
      }
      SelectionRange2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange2.is(candidate.parent));
      }
      SelectionRange2.is = is;
    })(SelectionRange || (SelectionRange = {}));
    (function(SemanticTokenTypes2) {
      SemanticTokenTypes2["namespace"] = "namespace";
      SemanticTokenTypes2["type"] = "type";
      SemanticTokenTypes2["class"] = "class";
      SemanticTokenTypes2["enum"] = "enum";
      SemanticTokenTypes2["interface"] = "interface";
      SemanticTokenTypes2["struct"] = "struct";
      SemanticTokenTypes2["typeParameter"] = "typeParameter";
      SemanticTokenTypes2["parameter"] = "parameter";
      SemanticTokenTypes2["variable"] = "variable";
      SemanticTokenTypes2["property"] = "property";
      SemanticTokenTypes2["enumMember"] = "enumMember";
      SemanticTokenTypes2["event"] = "event";
      SemanticTokenTypes2["function"] = "function";
      SemanticTokenTypes2["method"] = "method";
      SemanticTokenTypes2["macro"] = "macro";
      SemanticTokenTypes2["keyword"] = "keyword";
      SemanticTokenTypes2["modifier"] = "modifier";
      SemanticTokenTypes2["comment"] = "comment";
      SemanticTokenTypes2["string"] = "string";
      SemanticTokenTypes2["number"] = "number";
      SemanticTokenTypes2["regexp"] = "regexp";
      SemanticTokenTypes2["operator"] = "operator";
      SemanticTokenTypes2["decorator"] = "decorator";
      SemanticTokenTypes2["label"] = "label";
    })(SemanticTokenTypes || (SemanticTokenTypes = {}));
    (function(SemanticTokenModifiers2) {
      SemanticTokenModifiers2["declaration"] = "declaration";
      SemanticTokenModifiers2["definition"] = "definition";
      SemanticTokenModifiers2["readonly"] = "readonly";
      SemanticTokenModifiers2["static"] = "static";
      SemanticTokenModifiers2["deprecated"] = "deprecated";
      SemanticTokenModifiers2["abstract"] = "abstract";
      SemanticTokenModifiers2["async"] = "async";
      SemanticTokenModifiers2["modification"] = "modification";
      SemanticTokenModifiers2["documentation"] = "documentation";
      SemanticTokenModifiers2["defaultLibrary"] = "defaultLibrary";
    })(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
    (function(SemanticTokens2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
      }
      SemanticTokens2.is = is;
    })(SemanticTokens || (SemanticTokens = {}));
    (function(InlineValueText2) {
      function create(range, text) {
        return { range, text };
      }
      InlineValueText2.create = create;
      function is(value) {
        const candidate = value;
        return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
      }
      InlineValueText2.is = is;
    })(InlineValueText || (InlineValueText = {}));
    (function(InlineValueVariableLookup2) {
      function create(range, variableName, caseSensitiveLookup) {
        return { range, variableName, caseSensitiveLookup };
      }
      InlineValueVariableLookup2.create = create;
      function is(value) {
        const candidate = value;
        return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup) && (Is.string(candidate.variableName) || candidate.variableName === void 0);
      }
      InlineValueVariableLookup2.is = is;
    })(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
    (function(InlineValueEvaluatableExpression2) {
      function create(range, expression) {
        return { range, expression };
      }
      InlineValueEvaluatableExpression2.create = create;
      function is(value) {
        const candidate = value;
        return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && (Is.string(candidate.expression) || candidate.expression === void 0);
      }
      InlineValueEvaluatableExpression2.is = is;
    })(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
    (function(InlineValueContext2) {
      function create(frameId, stoppedLocation) {
        return { frameId, stoppedLocation };
      }
      InlineValueContext2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Range.is(value.stoppedLocation);
      }
      InlineValueContext2.is = is;
    })(InlineValueContext || (InlineValueContext = {}));
    (function(InlayHintKind2) {
      InlayHintKind2.Type = 1;
      InlayHintKind2.Parameter = 2;
      function is(value) {
        return value === 1 || value === 2;
      }
      InlayHintKind2.is = is;
    })(InlayHintKind || (InlayHintKind = {}));
    (function(InlayHintLabelPart2) {
      function create(value) {
        return { value };
      }
      InlayHintLabelPart2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === void 0 || Location.is(candidate.location)) && (candidate.command === void 0 || Command.is(candidate.command));
      }
      InlayHintLabelPart2.is = is;
    })(InlayHintLabelPart || (InlayHintLabelPart = {}));
    (function(InlayHint2) {
      function create(position, label, kind) {
        const result = { position, label };
        if (kind !== void 0) {
          result.kind = kind;
        }
        return result;
      }
      InlayHint2.create = create;
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.position) && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is.boolean(candidate.paddingRight));
      }
      InlayHint2.is = is;
    })(InlayHint || (InlayHint = {}));
    (function(StringValue2) {
      function createSnippet(value) {
        return { kind: "snippet", value };
      }
      StringValue2.createSnippet = createSnippet;
      function isSnippet(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && candidate.kind === "snippet" && Is.string(candidate.value);
      }
      StringValue2.isSnippet = isSnippet;
    })(StringValue || (StringValue = {}));
    (function(InlineCompletionItem2) {
      function create(insertText, filterText, range, command) {
        return { insertText, filterText, range, command };
      }
      InlineCompletionItem2.create = create;
    })(InlineCompletionItem || (InlineCompletionItem = {}));
    (function(InlineCompletionList2) {
      function create(items) {
        return { items };
      }
      InlineCompletionList2.create = create;
    })(InlineCompletionList || (InlineCompletionList = {}));
    (function(InlineCompletionTriggerKind2) {
      InlineCompletionTriggerKind2.Invoked = 1;
      InlineCompletionTriggerKind2.Automatic = 2;
    })(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
    (function(SelectedCompletionInfo2) {
      function create(range, text) {
        return { range, text };
      }
      SelectedCompletionInfo2.create = create;
    })(SelectedCompletionInfo || (SelectedCompletionInfo = {}));
    (function(InlineCompletionContext2) {
      function create(triggerKind, selectedCompletionInfo) {
        return { triggerKind, selectedCompletionInfo };
      }
      InlineCompletionContext2.create = create;
    })(InlineCompletionContext || (InlineCompletionContext = {}));
    (function(WorkspaceFolder2) {
      function is(value) {
        const candidate = value;
        return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
      }
      WorkspaceFolder2.is = is;
    })(WorkspaceFolder || (WorkspaceFolder = {}));
    EOL = ["\n", "\r\n", "\r"];
    (function(TextDocument2) {
      function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
      }
      TextDocument2.create = create;
      function is(value) {
        const candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
      }
      TextDocument2.is = is;
      function applyEdits(document, edits) {
        let text = document.getText();
        const sortedEdits = mergeSort(edits, (a, b) => {
          const diff = a.range.start.line - b.range.start.line;
          if (diff === 0) {
            return a.range.start.character - b.range.start.character;
          }
          return diff;
        });
        let lastModifiedOffset = text.length;
        for (let i = sortedEdits.length - 1; i >= 0; i--) {
          const e = sortedEdits[i];
          const startOffset = document.offsetAt(e.range.start);
          const endOffset = document.offsetAt(e.range.end);
          if (endOffset <= lastModifiedOffset) {
            text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
          } else {
            throw new Error("Overlapping edit");
          }
          lastModifiedOffset = startOffset;
        }
        return text;
      }
      TextDocument2.applyEdits = applyEdits;
      function mergeSort(data, compare) {
        if (data.length <= 1) {
          return data;
        }
        const p = data.length / 2 | 0;
        const left = data.slice(0, p);
        const right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        let leftIdx = 0;
        let rightIdx = 0;
        let i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
          const ret = compare(left[leftIdx], right[rightIdx]);
          if (ret <= 0) {
            data[i++] = left[leftIdx++];
          } else {
            data[i++] = right[rightIdx++];
          }
        }
        while (leftIdx < left.length) {
          data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
          data[i++] = right[rightIdx++];
        }
        return data;
      }
    })(TextDocument || (TextDocument = {}));
    FullTextDocument = class {
      constructor(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = void 0;
      }
      get uri() {
        return this._uri;
      }
      get languageId() {
        return this._languageId;
      }
      get version() {
        return this._version;
      }
      getText(range) {
        if (range) {
          const start = this.offsetAt(range.start);
          const end = this.offsetAt(range.end);
          return this._content.substring(start, end);
        }
        return this._content;
      }
      update(event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = void 0;
      }
      getLineOffsets() {
        if (this._lineOffsets === void 0) {
          const lineOffsets = [];
          const text = this._content;
          let isLineStart = true;
          for (let i = 0; i < text.length; i++) {
            if (isLineStart) {
              lineOffsets.push(i);
              isLineStart = false;
            }
            const ch = text.charAt(i);
            isLineStart = ch === "\r" || ch === "\n";
            if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") {
              i++;
            }
          }
          if (isLineStart && text.length > 0) {
            lineOffsets.push(text.length);
          }
          this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
      }
      positionAt(offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        const lineOffsets = this.getLineOffsets();
        let low = 0, high = lineOffsets.length;
        if (high === 0) {
          return Position.create(0, offset);
        }
        while (low < high) {
          const mid = Math.floor((low + high) / 2);
          if (lineOffsets[mid] > offset) {
            high = mid;
          } else {
            low = mid + 1;
          }
        }
        const line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
      }
      offsetAt(position) {
        const lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
          return this._content.length;
        } else if (position.line < 0) {
          return 0;
        }
        const lineOffset = lineOffsets[position.line];
        const nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
      }
      get lineCount() {
        return this.getLineOffsets().length;
      }
    };
    (function(Is2) {
      const toString = Object.prototype.toString;
      function defined(value) {
        return typeof value !== "undefined";
      }
      Is2.defined = defined;
      function undefined2(value) {
        return typeof value === "undefined";
      }
      Is2.undefined = undefined2;
      function boolean(value) {
        return value === true || value === false;
      }
      Is2.boolean = boolean;
      function string(value) {
        return toString.call(value) === "[object String]";
      }
      Is2.string = string;
      function number(value) {
        return toString.call(value) === "[object Number]";
      }
      Is2.number = number;
      function numberRange(value, min, max) {
        return toString.call(value) === "[object Number]" && min <= value && value <= max;
      }
      Is2.numberRange = numberRange;
      function integer2(value) {
        return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
      }
      Is2.integer = integer2;
      function uinteger2(value) {
        return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
      }
      Is2.uinteger = uinteger2;
      function func(value) {
        return toString.call(value) === "[object Function]";
      }
      Is2.func = func;
      function objectLiteral(value) {
        return value !== null && typeof value === "object";
      }
      Is2.objectLiteral = objectLiteral;
      function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
      }
      Is2.typedArray = typedArray;
    })(Is || (Is = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/messages.js
var require_messages2 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/messages.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CM = exports.ProtocolNotificationType = exports.ProtocolNotificationType0 = exports.ProtocolRequestType = exports.ProtocolRequestType0 = exports.RegistrationType = exports.MessageDirection = void 0;
    var vscode_jsonrpc_1 = require_api();
    var MessageDirection;
    (function(MessageDirection2) {
      MessageDirection2["clientToServer"] = "clientToServer";
      MessageDirection2["serverToClient"] = "serverToClient";
      MessageDirection2["both"] = "both";
    })(MessageDirection || (exports.MessageDirection = MessageDirection = {}));
    var RegistrationType = class {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      ____;
      method;
      constructor(method) {
        this.method = method;
      }
    };
    exports.RegistrationType = RegistrationType;
    var ProtocolRequestType0 = class extends vscode_jsonrpc_1.RequestType0 {
      /**
       * Clients must not use these properties. They are here to ensure correct typing.
       * in TypeScript
       */
      __;
      ___;
      ____;
      _pr;
      constructor(method) {
        super(method);
      }
    };
    exports.ProtocolRequestType0 = ProtocolRequestType0;
    var ProtocolRequestType = class extends vscode_jsonrpc_1.RequestType {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      __;
      ___;
      ____;
      _pr;
      constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
      }
    };
    exports.ProtocolRequestType = ProtocolRequestType;
    var ProtocolNotificationType0 = class extends vscode_jsonrpc_1.NotificationType0 {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      ___;
      ____;
      constructor(method) {
        super(method);
      }
    };
    exports.ProtocolNotificationType0 = ProtocolNotificationType0;
    var ProtocolNotificationType = class extends vscode_jsonrpc_1.NotificationType {
      /**
       * Clients must not use this property. It is here to ensure correct typing.
       */
      ___;
      ____;
      constructor(method) {
        super(method, vscode_jsonrpc_1.ParameterStructures.byName);
      }
    };
    exports.ProtocolNotificationType = ProtocolNotificationType;
    var CM;
    (function(CM2) {
      function create(client, server) {
        return { client, server };
      }
      CM2.create = create;
    })(CM || (exports.CM = CM = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/utils/is.js
var require_is2 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/utils/is.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boolean = boolean;
    exports.string = string;
    exports.number = number;
    exports.error = error;
    exports.func = func;
    exports.array = array;
    exports.stringArray = stringArray;
    exports.typedArray = typedArray;
    exports.objectLiteral = objectLiteral;
    function boolean(value) {
      return value === true || value === false;
    }
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    function error(value) {
      return value instanceof Error;
    }
    function func(value) {
      return typeof value === "function";
    }
    function array(value) {
      return Array.isArray(value);
    }
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    function objectLiteral(value) {
      return value !== null && typeof value === "object";
    }
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js
var require_protocol_implementation = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.implementation.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImplementationRequest = void 0;
    var messages_1 = require_messages2();
    var ImplementationRequest;
    (function(ImplementationRequest2) {
      ImplementationRequest2.method = "textDocument/implementation";
      ImplementationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ImplementationRequest2.type = new messages_1.ProtocolRequestType(ImplementationRequest2.method);
      ImplementationRequest2.capabilities = messages_1.CM.create("textDocument.implementation", "implementationProvider");
    })(ImplementationRequest || (exports.ImplementationRequest = ImplementationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js
var require_protocol_typeDefinition = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.typeDefinition.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeDefinitionRequest = void 0;
    var messages_1 = require_messages2();
    var TypeDefinitionRequest;
    (function(TypeDefinitionRequest2) {
      TypeDefinitionRequest2.method = "textDocument/typeDefinition";
      TypeDefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeDefinitionRequest2.type = new messages_1.ProtocolRequestType(TypeDefinitionRequest2.method);
      TypeDefinitionRequest2.capabilities = messages_1.CM.create("textDocument.typeDefinition", "typeDefinitionProvider");
    })(TypeDefinitionRequest || (exports.TypeDefinitionRequest = TypeDefinitionRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolder.js
var require_protocol_workspaceFolder = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.workspaceFolder.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = void 0;
    var messages_1 = require_messages2();
    var WorkspaceFoldersRequest;
    (function(WorkspaceFoldersRequest2) {
      WorkspaceFoldersRequest2.method = "workspace/workspaceFolders";
      WorkspaceFoldersRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      WorkspaceFoldersRequest2.type = new messages_1.ProtocolRequestType0(WorkspaceFoldersRequest2.method);
      WorkspaceFoldersRequest2.capabilities = messages_1.CM.create("workspace.workspaceFolders", "workspace.workspaceFolders");
    })(WorkspaceFoldersRequest || (exports.WorkspaceFoldersRequest = WorkspaceFoldersRequest = {}));
    var DidChangeWorkspaceFoldersNotification;
    (function(DidChangeWorkspaceFoldersNotification2) {
      DidChangeWorkspaceFoldersNotification2.method = "workspace/didChangeWorkspaceFolders";
      DidChangeWorkspaceFoldersNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeWorkspaceFoldersNotification2.type = new messages_1.ProtocolNotificationType(DidChangeWorkspaceFoldersNotification2.method);
      DidChangeWorkspaceFoldersNotification2.capabilities = messages_1.CM.create(void 0, "workspace.workspaceFolders.changeNotifications");
    })(DidChangeWorkspaceFoldersNotification || (exports.DidChangeWorkspaceFoldersNotification = DidChangeWorkspaceFoldersNotification = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js
var require_protocol_configuration = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.configuration.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConfigurationRequest = void 0;
    var messages_1 = require_messages2();
    var ConfigurationRequest;
    (function(ConfigurationRequest2) {
      ConfigurationRequest2.method = "workspace/configuration";
      ConfigurationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ConfigurationRequest2.type = new messages_1.ProtocolRequestType(ConfigurationRequest2.method);
      ConfigurationRequest2.capabilities = messages_1.CM.create("workspace.configuration", void 0);
    })(ConfigurationRequest || (exports.ConfigurationRequest = ConfigurationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js
var require_protocol_colorProvider = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.colorProvider.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ColorPresentationRequest = exports.DocumentColorRequest = void 0;
    var messages_1 = require_messages2();
    var DocumentColorRequest;
    (function(DocumentColorRequest2) {
      DocumentColorRequest2.method = "textDocument/documentColor";
      DocumentColorRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentColorRequest2.type = new messages_1.ProtocolRequestType(DocumentColorRequest2.method);
      DocumentColorRequest2.capabilities = messages_1.CM.create("textDocument.colorProvider", "colorProvider");
    })(DocumentColorRequest || (exports.DocumentColorRequest = DocumentColorRequest = {}));
    var ColorPresentationRequest;
    (function(ColorPresentationRequest2) {
      ColorPresentationRequest2.method = "textDocument/colorPresentation";
      ColorPresentationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ColorPresentationRequest2.type = new messages_1.ProtocolRequestType(ColorPresentationRequest2.method);
      ColorPresentationRequest2.capabilities = messages_1.CM.create("textDocument.colorProvider", "colorProvider");
    })(ColorPresentationRequest || (exports.ColorPresentationRequest = ColorPresentationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js
var require_protocol_foldingRange = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.foldingRange.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FoldingRangeRefreshRequest = exports.FoldingRangeRequest = void 0;
    var messages_1 = require_messages2();
    var FoldingRangeRequest;
    (function(FoldingRangeRequest2) {
      FoldingRangeRequest2.method = "textDocument/foldingRange";
      FoldingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      FoldingRangeRequest2.type = new messages_1.ProtocolRequestType(FoldingRangeRequest2.method);
      FoldingRangeRequest2.capabilities = messages_1.CM.create("textDocument.foldingRange", "foldingRangeProvider");
    })(FoldingRangeRequest || (exports.FoldingRangeRequest = FoldingRangeRequest = {}));
    var FoldingRangeRefreshRequest;
    (function(FoldingRangeRefreshRequest2) {
      FoldingRangeRefreshRequest2.method = `workspace/foldingRange/refresh`;
      FoldingRangeRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      FoldingRangeRefreshRequest2.type = new messages_1.ProtocolRequestType0(FoldingRangeRefreshRequest2.method);
      FoldingRangeRefreshRequest2.capabilities = messages_1.CM.create("workspace.foldingRange.refreshSupport", void 0);
    })(FoldingRangeRefreshRequest || (exports.FoldingRangeRefreshRequest = FoldingRangeRefreshRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js
var require_protocol_declaration = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.declaration.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeclarationRequest = void 0;
    var messages_1 = require_messages2();
    var DeclarationRequest;
    (function(DeclarationRequest2) {
      DeclarationRequest2.method = "textDocument/declaration";
      DeclarationRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DeclarationRequest2.type = new messages_1.ProtocolRequestType(DeclarationRequest2.method);
      DeclarationRequest2.capabilities = messages_1.CM.create("textDocument.declaration", "declarationProvider");
    })(DeclarationRequest || (exports.DeclarationRequest = DeclarationRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js
var require_protocol_selectionRange = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.selectionRange.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SelectionRangeRequest = void 0;
    var messages_1 = require_messages2();
    var SelectionRangeRequest;
    (function(SelectionRangeRequest2) {
      SelectionRangeRequest2.method = "textDocument/selectionRange";
      SelectionRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SelectionRangeRequest2.type = new messages_1.ProtocolRequestType(SelectionRangeRequest2.method);
      SelectionRangeRequest2.capabilities = messages_1.CM.create("textDocument.selectionRange", "selectionRangeProvider");
    })(SelectionRangeRequest || (exports.SelectionRangeRequest = SelectionRangeRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js
var require_protocol_progress = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.progress.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = void 0;
    var vscode_jsonrpc_1 = require_api();
    var messages_1 = require_messages2();
    var WorkDoneProgress;
    (function(WorkDoneProgress2) {
      WorkDoneProgress2.type = new vscode_jsonrpc_1.ProgressType();
      function is(value) {
        return value === WorkDoneProgress2.type;
      }
      WorkDoneProgress2.is = is;
    })(WorkDoneProgress || (exports.WorkDoneProgress = WorkDoneProgress = {}));
    var WorkDoneProgressCreateRequest;
    (function(WorkDoneProgressCreateRequest2) {
      WorkDoneProgressCreateRequest2.method = "window/workDoneProgress/create";
      WorkDoneProgressCreateRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      WorkDoneProgressCreateRequest2.type = new messages_1.ProtocolRequestType(WorkDoneProgressCreateRequest2.method);
      WorkDoneProgressCreateRequest2.capabilities = messages_1.CM.create("window.workDoneProgress", void 0);
    })(WorkDoneProgressCreateRequest || (exports.WorkDoneProgressCreateRequest = WorkDoneProgressCreateRequest = {}));
    var WorkDoneProgressCancelNotification;
    (function(WorkDoneProgressCancelNotification2) {
      WorkDoneProgressCancelNotification2.method = "window/workDoneProgress/cancel";
      WorkDoneProgressCancelNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkDoneProgressCancelNotification2.type = new messages_1.ProtocolNotificationType(WorkDoneProgressCancelNotification2.method);
    })(WorkDoneProgressCancelNotification || (exports.WorkDoneProgressCancelNotification = WorkDoneProgressCancelNotification = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js
var require_protocol_callHierarchy = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.callHierarchy.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.CallHierarchyPrepareRequest = void 0;
    var messages_1 = require_messages2();
    var CallHierarchyPrepareRequest;
    (function(CallHierarchyPrepareRequest2) {
      CallHierarchyPrepareRequest2.method = "textDocument/prepareCallHierarchy";
      CallHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyPrepareRequest2.method);
      CallHierarchyPrepareRequest2.capabilities = messages_1.CM.create("textDocument.callHierarchy", "callHierarchyProvider");
    })(CallHierarchyPrepareRequest || (exports.CallHierarchyPrepareRequest = CallHierarchyPrepareRequest = {}));
    var CallHierarchyIncomingCallsRequest;
    (function(CallHierarchyIncomingCallsRequest2) {
      CallHierarchyIncomingCallsRequest2.method = "callHierarchy/incomingCalls";
      CallHierarchyIncomingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyIncomingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyIncomingCallsRequest2.method);
      CallHierarchyIncomingCallsRequest2.capabilities = messages_1.CM.create("textDocument.callHierarchy", "callHierarchyProvider");
    })(CallHierarchyIncomingCallsRequest || (exports.CallHierarchyIncomingCallsRequest = CallHierarchyIncomingCallsRequest = {}));
    var CallHierarchyOutgoingCallsRequest;
    (function(CallHierarchyOutgoingCallsRequest2) {
      CallHierarchyOutgoingCallsRequest2.method = "callHierarchy/outgoingCalls";
      CallHierarchyOutgoingCallsRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CallHierarchyOutgoingCallsRequest2.type = new messages_1.ProtocolRequestType(CallHierarchyOutgoingCallsRequest2.method);
      CallHierarchyOutgoingCallsRequest2.capabilities = messages_1.CM.create("textDocument.callHierarchy", "callHierarchyProvider");
    })(CallHierarchyOutgoingCallsRequest || (exports.CallHierarchyOutgoingCallsRequest = CallHierarchyOutgoingCallsRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js
var require_protocol_semanticTokens = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.semanticTokens.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.SemanticTokensRegistrationType = exports.TokenFormat = void 0;
    var messages_1 = require_messages2();
    var TokenFormat;
    (function(TokenFormat2) {
      TokenFormat2.Relative = "relative";
    })(TokenFormat || (exports.TokenFormat = TokenFormat = {}));
    var SemanticTokensRegistrationType;
    (function(SemanticTokensRegistrationType2) {
      SemanticTokensRegistrationType2.method = "textDocument/semanticTokens";
      SemanticTokensRegistrationType2.type = new messages_1.RegistrationType(SemanticTokensRegistrationType2.method);
    })(SemanticTokensRegistrationType || (exports.SemanticTokensRegistrationType = SemanticTokensRegistrationType = {}));
    var SemanticTokensRequest;
    (function(SemanticTokensRequest2) {
      SemanticTokensRequest2.method = "textDocument/semanticTokens/full";
      SemanticTokensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRequest2.method);
      SemanticTokensRequest2.registrationMethod = SemanticTokensRegistrationType.method;
      SemanticTokensRequest2.capabilities = messages_1.CM.create("textDocument.semanticTokens", "semanticTokensProvider");
    })(SemanticTokensRequest || (exports.SemanticTokensRequest = SemanticTokensRequest = {}));
    var SemanticTokensDeltaRequest;
    (function(SemanticTokensDeltaRequest2) {
      SemanticTokensDeltaRequest2.method = "textDocument/semanticTokens/full/delta";
      SemanticTokensDeltaRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensDeltaRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensDeltaRequest2.method);
      SemanticTokensDeltaRequest2.registrationMethod = SemanticTokensRegistrationType.method;
      SemanticTokensDeltaRequest2.capabilities = messages_1.CM.create("textDocument.semanticTokens.requests.full.delta", "semanticTokensProvider.full.delta");
    })(SemanticTokensDeltaRequest || (exports.SemanticTokensDeltaRequest = SemanticTokensDeltaRequest = {}));
    var SemanticTokensRangeRequest;
    (function(SemanticTokensRangeRequest2) {
      SemanticTokensRangeRequest2.method = "textDocument/semanticTokens/range";
      SemanticTokensRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SemanticTokensRangeRequest2.type = new messages_1.ProtocolRequestType(SemanticTokensRangeRequest2.method);
      SemanticTokensRangeRequest2.registrationMethod = SemanticTokensRegistrationType.method;
      SemanticTokensRangeRequest2.capabilities = messages_1.CM.create("textDocument.semanticTokens.requests.range", "semanticTokensProvider.range");
    })(SemanticTokensRangeRequest || (exports.SemanticTokensRangeRequest = SemanticTokensRangeRequest = {}));
    var SemanticTokensRefreshRequest;
    (function(SemanticTokensRefreshRequest2) {
      SemanticTokensRefreshRequest2.method = `workspace/semanticTokens/refresh`;
      SemanticTokensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      SemanticTokensRefreshRequest2.type = new messages_1.ProtocolRequestType0(SemanticTokensRefreshRequest2.method);
      SemanticTokensRefreshRequest2.capabilities = messages_1.CM.create("workspace.semanticTokens.refreshSupport", void 0);
    })(SemanticTokensRefreshRequest || (exports.SemanticTokensRefreshRequest = SemanticTokensRefreshRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js
var require_protocol_showDocument = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.showDocument.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShowDocumentRequest = void 0;
    var messages_1 = require_messages2();
    var ShowDocumentRequest;
    (function(ShowDocumentRequest2) {
      ShowDocumentRequest2.method = "window/showDocument";
      ShowDocumentRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ShowDocumentRequest2.type = new messages_1.ProtocolRequestType(ShowDocumentRequest2.method);
      ShowDocumentRequest2.capabilities = messages_1.CM.create("window.showDocument.support", void 0);
    })(ShowDocumentRequest || (exports.ShowDocumentRequest = ShowDocumentRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js
var require_protocol_linkedEditingRange = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.linkedEditingRange.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinkedEditingRangeRequest = void 0;
    var messages_1 = require_messages2();
    var LinkedEditingRangeRequest;
    (function(LinkedEditingRangeRequest2) {
      LinkedEditingRangeRequest2.method = "textDocument/linkedEditingRange";
      LinkedEditingRangeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      LinkedEditingRangeRequest2.type = new messages_1.ProtocolRequestType(LinkedEditingRangeRequest2.method);
      LinkedEditingRangeRequest2.capabilities = messages_1.CM.create("textDocument.linkedEditingRange", "linkedEditingRangeProvider");
    })(LinkedEditingRangeRequest || (exports.LinkedEditingRangeRequest = LinkedEditingRangeRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js
var require_protocol_fileOperations = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.fileOperations.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.DidRenameFilesNotification = exports.WillRenameFilesRequest = exports.DidCreateFilesNotification = exports.WillCreateFilesRequest = exports.FileOperationPatternKind = void 0;
    var messages_1 = require_messages2();
    var FileOperationPatternKind;
    (function(FileOperationPatternKind2) {
      FileOperationPatternKind2.file = "file";
      FileOperationPatternKind2.folder = "folder";
    })(FileOperationPatternKind || (exports.FileOperationPatternKind = FileOperationPatternKind = {}));
    var WillCreateFilesRequest;
    (function(WillCreateFilesRequest2) {
      WillCreateFilesRequest2.method = "workspace/willCreateFiles";
      WillCreateFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillCreateFilesRequest2.type = new messages_1.ProtocolRequestType(WillCreateFilesRequest2.method);
      WillCreateFilesRequest2.capabilities = messages_1.CM.create("workspace.fileOperations.willCreate", "workspace.fileOperations.willCreate");
    })(WillCreateFilesRequest || (exports.WillCreateFilesRequest = WillCreateFilesRequest = {}));
    var DidCreateFilesNotification;
    (function(DidCreateFilesNotification2) {
      DidCreateFilesNotification2.method = "workspace/didCreateFiles";
      DidCreateFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidCreateFilesNotification2.type = new messages_1.ProtocolNotificationType(DidCreateFilesNotification2.method);
      DidCreateFilesNotification2.capabilities = messages_1.CM.create("workspace.fileOperations.didCreate", "workspace.fileOperations.didCreate");
    })(DidCreateFilesNotification || (exports.DidCreateFilesNotification = DidCreateFilesNotification = {}));
    var WillRenameFilesRequest;
    (function(WillRenameFilesRequest2) {
      WillRenameFilesRequest2.method = "workspace/willRenameFiles";
      WillRenameFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillRenameFilesRequest2.type = new messages_1.ProtocolRequestType(WillRenameFilesRequest2.method);
      WillRenameFilesRequest2.capabilities = messages_1.CM.create("workspace.fileOperations.willRename", "workspace.fileOperations.willRename");
    })(WillRenameFilesRequest || (exports.WillRenameFilesRequest = WillRenameFilesRequest = {}));
    var DidRenameFilesNotification;
    (function(DidRenameFilesNotification2) {
      DidRenameFilesNotification2.method = "workspace/didRenameFiles";
      DidRenameFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidRenameFilesNotification2.type = new messages_1.ProtocolNotificationType(DidRenameFilesNotification2.method);
      DidRenameFilesNotification2.capabilities = messages_1.CM.create("workspace.fileOperations.didRename", "workspace.fileOperations.didRename");
    })(DidRenameFilesNotification || (exports.DidRenameFilesNotification = DidRenameFilesNotification = {}));
    var DidDeleteFilesNotification;
    (function(DidDeleteFilesNotification2) {
      DidDeleteFilesNotification2.method = "workspace/didDeleteFiles";
      DidDeleteFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidDeleteFilesNotification2.type = new messages_1.ProtocolNotificationType(DidDeleteFilesNotification2.method);
      DidDeleteFilesNotification2.capabilities = messages_1.CM.create("workspace.fileOperations.didDelete", "workspace.fileOperations.didDelete");
    })(DidDeleteFilesNotification || (exports.DidDeleteFilesNotification = DidDeleteFilesNotification = {}));
    var WillDeleteFilesRequest;
    (function(WillDeleteFilesRequest2) {
      WillDeleteFilesRequest2.method = "workspace/willDeleteFiles";
      WillDeleteFilesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillDeleteFilesRequest2.type = new messages_1.ProtocolRequestType(WillDeleteFilesRequest2.method);
      WillDeleteFilesRequest2.capabilities = messages_1.CM.create("workspace.fileOperations.willDelete", "workspace.fileOperations.willDelete");
    })(WillDeleteFilesRequest || (exports.WillDeleteFilesRequest = WillDeleteFilesRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js
var require_protocol_moniker = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.moniker.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MonikerRequest = exports.MonikerKind = exports.UniquenessLevel = void 0;
    var messages_1 = require_messages2();
    var UniquenessLevel;
    (function(UniquenessLevel2) {
      UniquenessLevel2.document = "document";
      UniquenessLevel2.project = "project";
      UniquenessLevel2.group = "group";
      UniquenessLevel2.scheme = "scheme";
      UniquenessLevel2.global = "global";
    })(UniquenessLevel || (exports.UniquenessLevel = UniquenessLevel = {}));
    var MonikerKind;
    (function(MonikerKind2) {
      MonikerKind2.$import = "import";
      MonikerKind2.$export = "export";
      MonikerKind2.local = "local";
    })(MonikerKind || (exports.MonikerKind = MonikerKind = {}));
    var MonikerRequest;
    (function(MonikerRequest2) {
      MonikerRequest2.method = "textDocument/moniker";
      MonikerRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      MonikerRequest2.type = new messages_1.ProtocolRequestType(MonikerRequest2.method);
      MonikerRequest2.capabilities = messages_1.CM.create("textDocument.moniker", "monikerProvider");
    })(MonikerRequest || (exports.MonikerRequest = MonikerRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.typeHierarchy.js
var require_protocol_typeHierarchy = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.typeHierarchy.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeHierarchySubtypesRequest = exports.TypeHierarchySupertypesRequest = exports.TypeHierarchyPrepareRequest = void 0;
    var messages_1 = require_messages2();
    var TypeHierarchyPrepareRequest;
    (function(TypeHierarchyPrepareRequest2) {
      TypeHierarchyPrepareRequest2.method = "textDocument/prepareTypeHierarchy";
      TypeHierarchyPrepareRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchyPrepareRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchyPrepareRequest2.method);
      TypeHierarchyPrepareRequest2.capabilities = messages_1.CM.create("textDocument.typeHierarchy", "typeHierarchyProvider");
    })(TypeHierarchyPrepareRequest || (exports.TypeHierarchyPrepareRequest = TypeHierarchyPrepareRequest = {}));
    var TypeHierarchySupertypesRequest;
    (function(TypeHierarchySupertypesRequest2) {
      TypeHierarchySupertypesRequest2.method = "typeHierarchy/supertypes";
      TypeHierarchySupertypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchySupertypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySupertypesRequest2.method);
    })(TypeHierarchySupertypesRequest || (exports.TypeHierarchySupertypesRequest = TypeHierarchySupertypesRequest = {}));
    var TypeHierarchySubtypesRequest;
    (function(TypeHierarchySubtypesRequest2) {
      TypeHierarchySubtypesRequest2.method = "typeHierarchy/subtypes";
      TypeHierarchySubtypesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TypeHierarchySubtypesRequest2.type = new messages_1.ProtocolRequestType(TypeHierarchySubtypesRequest2.method);
    })(TypeHierarchySubtypesRequest || (exports.TypeHierarchySubtypesRequest = TypeHierarchySubtypesRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineValue.js
var require_protocol_inlineValue = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineValue.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InlineValueRefreshRequest = exports.InlineValueRequest = void 0;
    var messages_1 = require_messages2();
    var InlineValueRequest;
    (function(InlineValueRequest2) {
      InlineValueRequest2.method = "textDocument/inlineValue";
      InlineValueRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlineValueRequest2.type = new messages_1.ProtocolRequestType(InlineValueRequest2.method);
      InlineValueRequest2.capabilities = messages_1.CM.create("textDocument.inlineValue", "inlineValueProvider");
    })(InlineValueRequest || (exports.InlineValueRequest = InlineValueRequest = {}));
    var InlineValueRefreshRequest;
    (function(InlineValueRefreshRequest2) {
      InlineValueRefreshRequest2.method = `workspace/inlineValue/refresh`;
      InlineValueRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      InlineValueRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlineValueRefreshRequest2.method);
      InlineValueRefreshRequest2.capabilities = messages_1.CM.create("workspace.inlineValue.refreshSupport", void 0);
    })(InlineValueRefreshRequest || (exports.InlineValueRefreshRequest = InlineValueRefreshRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.inlayHint.js
var require_protocol_inlayHint = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.inlayHint.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = void 0;
    var messages_1 = require_messages2();
    var InlayHintRequest;
    (function(InlayHintRequest2) {
      InlayHintRequest2.method = "textDocument/inlayHint";
      InlayHintRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlayHintRequest2.type = new messages_1.ProtocolRequestType(InlayHintRequest2.method);
      InlayHintRequest2.capabilities = messages_1.CM.create("textDocument.inlayHint", "inlayHintProvider");
    })(InlayHintRequest || (exports.InlayHintRequest = InlayHintRequest = {}));
    var InlayHintResolveRequest;
    (function(InlayHintResolveRequest2) {
      InlayHintResolveRequest2.method = "inlayHint/resolve";
      InlayHintResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlayHintResolveRequest2.type = new messages_1.ProtocolRequestType(InlayHintResolveRequest2.method);
      InlayHintResolveRequest2.capabilities = messages_1.CM.create("textDocument.inlayHint.resolveSupport", "inlayHintProvider.resolveProvider");
    })(InlayHintResolveRequest || (exports.InlayHintResolveRequest = InlayHintResolveRequest = {}));
    var InlayHintRefreshRequest;
    (function(InlayHintRefreshRequest2) {
      InlayHintRefreshRequest2.method = `workspace/inlayHint/refresh`;
      InlayHintRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      InlayHintRefreshRequest2.type = new messages_1.ProtocolRequestType0(InlayHintRefreshRequest2.method);
      InlayHintRefreshRequest2.capabilities = messages_1.CM.create("workspace.inlayHint.refreshSupport", void 0);
    })(InlayHintRefreshRequest || (exports.InlayHintRefreshRequest = InlayHintRefreshRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.diagnostic.js
var require_protocol_diagnostic = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.diagnostic.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = void 0;
    var vscode_jsonrpc_1 = require_api();
    var Is2 = __importStar(require_is2());
    var messages_1 = require_messages2();
    var DiagnosticServerCancellationData;
    (function(DiagnosticServerCancellationData2) {
      function is(value) {
        const candidate = value;
        return candidate && Is2.boolean(candidate.retriggerRequest);
      }
      DiagnosticServerCancellationData2.is = is;
    })(DiagnosticServerCancellationData || (exports.DiagnosticServerCancellationData = DiagnosticServerCancellationData = {}));
    var DocumentDiagnosticReportKind;
    (function(DocumentDiagnosticReportKind2) {
      DocumentDiagnosticReportKind2.Full = "full";
      DocumentDiagnosticReportKind2.Unchanged = "unchanged";
    })(DocumentDiagnosticReportKind || (exports.DocumentDiagnosticReportKind = DocumentDiagnosticReportKind = {}));
    var DocumentDiagnosticRequest;
    (function(DocumentDiagnosticRequest2) {
      DocumentDiagnosticRequest2.method = "textDocument/diagnostic";
      DocumentDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentDiagnosticRequest2.type = new messages_1.ProtocolRequestType(DocumentDiagnosticRequest2.method);
      DocumentDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType();
      DocumentDiagnosticRequest2.capabilities = messages_1.CM.create("textDocument.diagnostic", "diagnosticProvider");
    })(DocumentDiagnosticRequest || (exports.DocumentDiagnosticRequest = DocumentDiagnosticRequest = {}));
    var WorkspaceDiagnosticRequest;
    (function(WorkspaceDiagnosticRequest2) {
      WorkspaceDiagnosticRequest2.method = "workspace/diagnostic";
      WorkspaceDiagnosticRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkspaceDiagnosticRequest2.type = new messages_1.ProtocolRequestType(WorkspaceDiagnosticRequest2.method);
      WorkspaceDiagnosticRequest2.partialResult = new vscode_jsonrpc_1.ProgressType();
      WorkspaceDiagnosticRequest2.capabilities = messages_1.CM.create("workspace.diagnostics", "diagnosticProvider.workspaceDiagnostics");
    })(WorkspaceDiagnosticRequest || (exports.WorkspaceDiagnosticRequest = WorkspaceDiagnosticRequest = {}));
    var DiagnosticRefreshRequest;
    (function(DiagnosticRefreshRequest2) {
      DiagnosticRefreshRequest2.method = `workspace/diagnostic/refresh`;
      DiagnosticRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      DiagnosticRefreshRequest2.type = new messages_1.ProtocolRequestType0(DiagnosticRefreshRequest2.method);
      DiagnosticRefreshRequest2.capabilities = messages_1.CM.create("workspace.diagnostics.refreshSupport", void 0);
    })(DiagnosticRefreshRequest || (exports.DiagnosticRefreshRequest = DiagnosticRefreshRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.notebook.js
var require_protocol_notebook = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.notebook.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = void 0;
    var vscode_languageserver_types_1 = (init_main(), __toCommonJS(main_exports));
    var Is2 = __importStar(require_is2());
    var messages_1 = require_messages2();
    var NotebookCellKind;
    (function(NotebookCellKind2) {
      NotebookCellKind2.Markup = 1;
      NotebookCellKind2.Code = 2;
      function is(value) {
        return value === 1 || value === 2;
      }
      NotebookCellKind2.is = is;
    })(NotebookCellKind || (exports.NotebookCellKind = NotebookCellKind = {}));
    var ExecutionSummary;
    (function(ExecutionSummary2) {
      function create(executionOrder, success) {
        const result = { executionOrder };
        if (success === true || success === false) {
          result.success = success;
        }
        return result;
      }
      ExecutionSummary2.create = create;
      function is(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.executionOrder) && (candidate.success === void 0 || Is2.boolean(candidate.success));
      }
      ExecutionSummary2.is = is;
      function equals(one, other) {
        if (one === other) {
          return true;
        }
        if (one === null || one === void 0 || other === null || other === void 0) {
          return false;
        }
        return one.executionOrder === other.executionOrder && one.success === other.success;
      }
      ExecutionSummary2.equals = equals;
    })(ExecutionSummary || (exports.ExecutionSummary = ExecutionSummary = {}));
    var NotebookCell;
    (function(NotebookCell2) {
      function create(kind, document) {
        return { kind, document };
      }
      NotebookCell2.create = create;
      function is(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && NotebookCellKind.is(candidate.kind) && vscode_languageserver_types_1.DocumentUri.is(candidate.document) && (candidate.metadata === void 0 || Is2.objectLiteral(candidate.metadata));
      }
      NotebookCell2.is = is;
      function diff(one, two) {
        const result = /* @__PURE__ */ new Set();
        if (one.document !== two.document) {
          result.add("document");
        }
        if (one.kind !== two.kind) {
          result.add("kind");
        }
        if (one.executionSummary !== two.executionSummary) {
          result.add("executionSummary");
        }
        if ((one.metadata !== void 0 || two.metadata !== void 0) && !equalsMetadata(one.metadata, two.metadata)) {
          result.add("metadata");
        }
        if ((one.executionSummary !== void 0 || two.executionSummary !== void 0) && !ExecutionSummary.equals(one.executionSummary, two.executionSummary)) {
          result.add("executionSummary");
        }
        return result;
      }
      NotebookCell2.diff = diff;
      function equalsMetadata(one, other) {
        if (one === other) {
          return true;
        }
        if (one === null || one === void 0 || other === null || other === void 0) {
          return false;
        }
        if (typeof one !== typeof other) {
          return false;
        }
        if (typeof one !== "object") {
          return false;
        }
        const oneArray = Array.isArray(one);
        const otherArray = Array.isArray(other);
        if (oneArray !== otherArray) {
          return false;
        }
        if (oneArray && otherArray) {
          if (one.length !== other.length) {
            return false;
          }
          for (let i = 0; i < one.length; i++) {
            if (!equalsMetadata(one[i], other[i])) {
              return false;
            }
          }
        }
        if (Is2.objectLiteral(one) && Is2.objectLiteral(other)) {
          const oneKeys = Object.keys(one);
          const otherKeys = Object.keys(other);
          if (oneKeys.length !== otherKeys.length) {
            return false;
          }
          oneKeys.sort();
          otherKeys.sort();
          if (!equalsMetadata(oneKeys, otherKeys)) {
            return false;
          }
          for (let i = 0; i < oneKeys.length; i++) {
            const prop = oneKeys[i];
            if (!equalsMetadata(one[prop], other[prop])) {
              return false;
            }
          }
        }
        return true;
      }
    })(NotebookCell || (exports.NotebookCell = NotebookCell = {}));
    var NotebookDocument;
    (function(NotebookDocument2) {
      function create(uri, notebookType, version, cells) {
        return { uri, notebookType, version, cells };
      }
      NotebookDocument2.create = create;
      function is(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && Is2.string(candidate.uri) && vscode_languageserver_types_1.integer.is(candidate.version) && Is2.typedArray(candidate.cells, NotebookCell.is);
      }
      NotebookDocument2.is = is;
    })(NotebookDocument || (exports.NotebookDocument = NotebookDocument = {}));
    var NotebookDocumentSyncRegistrationType;
    (function(NotebookDocumentSyncRegistrationType2) {
      NotebookDocumentSyncRegistrationType2.method = "notebookDocument/sync";
      NotebookDocumentSyncRegistrationType2.messageDirection = messages_1.MessageDirection.clientToServer;
      NotebookDocumentSyncRegistrationType2.type = new messages_1.RegistrationType(NotebookDocumentSyncRegistrationType2.method);
    })(NotebookDocumentSyncRegistrationType || (exports.NotebookDocumentSyncRegistrationType = NotebookDocumentSyncRegistrationType = {}));
    var DidOpenNotebookDocumentNotification;
    (function(DidOpenNotebookDocumentNotification2) {
      DidOpenNotebookDocumentNotification2.method = "notebookDocument/didOpen";
      DidOpenNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidOpenNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenNotebookDocumentNotification2.method);
      DidOpenNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidOpenNotebookDocumentNotification || (exports.DidOpenNotebookDocumentNotification = DidOpenNotebookDocumentNotification = {}));
    var NotebookCellArrayChange;
    (function(NotebookCellArrayChange2) {
      function is(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && vscode_languageserver_types_1.uinteger.is(candidate.start) && vscode_languageserver_types_1.uinteger.is(candidate.deleteCount) && (candidate.cells === void 0 || Is2.typedArray(candidate.cells, NotebookCell.is));
      }
      NotebookCellArrayChange2.is = is;
      function create(start, deleteCount, cells) {
        const result = { start, deleteCount };
        if (cells !== void 0) {
          result.cells = cells;
        }
        return result;
      }
      NotebookCellArrayChange2.create = create;
    })(NotebookCellArrayChange || (exports.NotebookCellArrayChange = NotebookCellArrayChange = {}));
    var DidChangeNotebookDocumentNotification;
    (function(DidChangeNotebookDocumentNotification2) {
      DidChangeNotebookDocumentNotification2.method = "notebookDocument/didChange";
      DidChangeNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeNotebookDocumentNotification2.method);
      DidChangeNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidChangeNotebookDocumentNotification || (exports.DidChangeNotebookDocumentNotification = DidChangeNotebookDocumentNotification = {}));
    var DidSaveNotebookDocumentNotification;
    (function(DidSaveNotebookDocumentNotification2) {
      DidSaveNotebookDocumentNotification2.method = "notebookDocument/didSave";
      DidSaveNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidSaveNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveNotebookDocumentNotification2.method);
      DidSaveNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidSaveNotebookDocumentNotification || (exports.DidSaveNotebookDocumentNotification = DidSaveNotebookDocumentNotification = {}));
    var DidCloseNotebookDocumentNotification;
    (function(DidCloseNotebookDocumentNotification2) {
      DidCloseNotebookDocumentNotification2.method = "notebookDocument/didClose";
      DidCloseNotebookDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidCloseNotebookDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseNotebookDocumentNotification2.method);
      DidCloseNotebookDocumentNotification2.registrationMethod = NotebookDocumentSyncRegistrationType.method;
    })(DidCloseNotebookDocumentNotification || (exports.DidCloseNotebookDocumentNotification = DidCloseNotebookDocumentNotification = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineCompletion.js
var require_protocol_inlineCompletion = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.inlineCompletion.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InlineCompletionRequest = void 0;
    var messages_1 = require_messages2();
    var InlineCompletionRequest;
    (function(InlineCompletionRequest2) {
      InlineCompletionRequest2.method = "textDocument/inlineCompletion";
      InlineCompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InlineCompletionRequest2.type = new messages_1.ProtocolRequestType(InlineCompletionRequest2.method);
      InlineCompletionRequest2.capabilities = messages_1.CM.create("textDocument.inlineCompletion", "inlineCompletionProvider");
    })(InlineCompletionRequest || (exports.InlineCompletionRequest = InlineCompletionRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.textDocumentContent.js
var require_protocol_textDocumentContent = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.textDocumentContent.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextDocumentContentRefreshRequest = exports.TextDocumentContentRequest = void 0;
    var messages_1 = require_messages2();
    var TextDocumentContentRequest;
    (function(TextDocumentContentRequest2) {
      TextDocumentContentRequest2.method = "workspace/textDocumentContent";
      TextDocumentContentRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      TextDocumentContentRequest2.type = new messages_1.ProtocolRequestType(TextDocumentContentRequest2.method);
      TextDocumentContentRequest2.capabilities = messages_1.CM.create("workspace.textDocumentContent", "workspace.textDocumentContent");
    })(TextDocumentContentRequest || (exports.TextDocumentContentRequest = TextDocumentContentRequest = {}));
    var TextDocumentContentRefreshRequest;
    (function(TextDocumentContentRefreshRequest2) {
      TextDocumentContentRefreshRequest2.method = `workspace/textDocumentContent/refresh`;
      TextDocumentContentRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      TextDocumentContentRefreshRequest2.type = new messages_1.ProtocolRequestType(TextDocumentContentRefreshRequest2.method);
    })(TextDocumentContentRefreshRequest || (exports.TextDocumentContentRefreshRequest = TextDocumentContentRefreshRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/protocol.js
var require_protocol = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/protocol.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodeActionRequest = exports.DocumentSymbolRequest = exports.DocumentHighlightRequest = exports.ReferencesRequest = exports.DefinitionRequest = exports.SignatureHelpRequest = exports.SignatureHelpTriggerKind = exports.HoverRequest = exports.CompletionResolveRequest = exports.CompletionRequest = exports.CompletionTriggerKind = exports.PublishDiagnosticsNotification = exports.WatchKind = exports.GlobPattern = exports.RelativePattern = exports.FileChangeType = exports.DidChangeWatchedFilesNotification = exports.WillSaveTextDocumentWaitUntilRequest = exports.WillSaveTextDocumentNotification = exports.TextDocumentSaveReason = exports.DidSaveTextDocumentNotification = exports.DidCloseTextDocumentNotification = exports.DidChangeTextDocumentNotification = exports.TextDocumentContentChangeEvent = exports.DidOpenTextDocumentNotification = exports.TextDocumentSyncKind = exports.TelemetryEventNotification = exports.LogMessageNotification = exports.ShowMessageRequest = exports.ShowMessageNotification = exports.MessageType = exports.DidChangeConfigurationNotification = exports.ExitNotification = exports.ShutdownRequest = exports.InitializedNotification = exports.InitializeErrorCodes = exports.InitializeRequest = exports.WorkDoneProgressOptions = exports.TextDocumentRegistrationOptions = exports.StaticRegistrationOptions = exports.PositionEncodingKind = exports.RegularExpressionEngineKind = exports.FailureHandlingKind = exports.ResourceOperationKind = exports.UnregistrationRequest = exports.RegistrationRequest = exports.DocumentSelector = exports.NotebookCellTextDocumentFilter = exports.NotebookDocumentFilter = exports.TextDocumentFilter = void 0;
    exports.UniquenessLevel = exports.WillDeleteFilesRequest = exports.DidDeleteFilesNotification = exports.WillRenameFilesRequest = exports.DidRenameFilesNotification = exports.WillCreateFilesRequest = exports.DidCreateFilesNotification = exports.FileOperationPatternKind = exports.LinkedEditingRangeRequest = exports.ShowDocumentRequest = exports.SemanticTokensRegistrationType = exports.SemanticTokensRefreshRequest = exports.SemanticTokensRangeRequest = exports.SemanticTokensDeltaRequest = exports.SemanticTokensRequest = exports.TokenFormat = exports.CallHierarchyPrepareRequest = exports.CallHierarchyOutgoingCallsRequest = exports.CallHierarchyIncomingCallsRequest = exports.WorkDoneProgressCancelNotification = exports.WorkDoneProgressCreateRequest = exports.WorkDoneProgress = exports.SelectionRangeRequest = exports.DeclarationRequest = exports.FoldingRangeRefreshRequest = exports.FoldingRangeRequest = exports.ColorPresentationRequest = exports.DocumentColorRequest = exports.ConfigurationRequest = exports.DidChangeWorkspaceFoldersNotification = exports.WorkspaceFoldersRequest = exports.TypeDefinitionRequest = exports.ImplementationRequest = exports.ApplyWorkspaceEditRequest = exports.ExecuteCommandRequest = exports.PrepareRenameRequest = exports.RenameRequest = exports.PrepareSupportDefaultBehavior = exports.DocumentOnTypeFormattingRequest = exports.DocumentRangesFormattingRequest = exports.DocumentRangeFormattingRequest = exports.DocumentFormattingRequest = exports.DocumentLinkResolveRequest = exports.DocumentLinkRequest = exports.CodeLensRefreshRequest = exports.CodeLensResolveRequest = exports.CodeLensRequest = exports.WorkspaceSymbolResolveRequest = exports.WorkspaceSymbolRequest = exports.CodeActionResolveRequest = void 0;
    exports.TextDocumentContentRefreshRequest = exports.TextDocumentContentRequest = exports.InlineCompletionRequest = exports.DidCloseNotebookDocumentNotification = exports.DidSaveNotebookDocumentNotification = exports.DidChangeNotebookDocumentNotification = exports.NotebookCellArrayChange = exports.DidOpenNotebookDocumentNotification = exports.NotebookDocumentSyncRegistrationType = exports.NotebookDocument = exports.NotebookCell = exports.ExecutionSummary = exports.NotebookCellKind = exports.DiagnosticRefreshRequest = exports.WorkspaceDiagnosticRequest = exports.DocumentDiagnosticRequest = exports.DocumentDiagnosticReportKind = exports.DiagnosticServerCancellationData = exports.InlayHintRefreshRequest = exports.InlayHintResolveRequest = exports.InlayHintRequest = exports.InlineValueRefreshRequest = exports.InlineValueRequest = exports.TypeHierarchySupertypesRequest = exports.TypeHierarchySubtypesRequest = exports.TypeHierarchyPrepareRequest = exports.MonikerRequest = exports.MonikerKind = void 0;
    var messages_1 = require_messages2();
    var vscode_languageserver_types_1 = (init_main(), __toCommonJS(main_exports));
    var Is2 = __importStar(require_is2());
    var protocol_implementation_1 = require_protocol_implementation();
    Object.defineProperty(exports, "ImplementationRequest", { enumerable: true, get: function() {
      return protocol_implementation_1.ImplementationRequest;
    } });
    var protocol_typeDefinition_1 = require_protocol_typeDefinition();
    Object.defineProperty(exports, "TypeDefinitionRequest", { enumerable: true, get: function() {
      return protocol_typeDefinition_1.TypeDefinitionRequest;
    } });
    var protocol_workspaceFolder_1 = require_protocol_workspaceFolder();
    Object.defineProperty(exports, "WorkspaceFoldersRequest", { enumerable: true, get: function() {
      return protocol_workspaceFolder_1.WorkspaceFoldersRequest;
    } });
    Object.defineProperty(exports, "DidChangeWorkspaceFoldersNotification", { enumerable: true, get: function() {
      return protocol_workspaceFolder_1.DidChangeWorkspaceFoldersNotification;
    } });
    var protocol_configuration_1 = require_protocol_configuration();
    Object.defineProperty(exports, "ConfigurationRequest", { enumerable: true, get: function() {
      return protocol_configuration_1.ConfigurationRequest;
    } });
    var protocol_colorProvider_1 = require_protocol_colorProvider();
    Object.defineProperty(exports, "DocumentColorRequest", { enumerable: true, get: function() {
      return protocol_colorProvider_1.DocumentColorRequest;
    } });
    Object.defineProperty(exports, "ColorPresentationRequest", { enumerable: true, get: function() {
      return protocol_colorProvider_1.ColorPresentationRequest;
    } });
    var protocol_foldingRange_1 = require_protocol_foldingRange();
    Object.defineProperty(exports, "FoldingRangeRequest", { enumerable: true, get: function() {
      return protocol_foldingRange_1.FoldingRangeRequest;
    } });
    Object.defineProperty(exports, "FoldingRangeRefreshRequest", { enumerable: true, get: function() {
      return protocol_foldingRange_1.FoldingRangeRefreshRequest;
    } });
    var protocol_declaration_1 = require_protocol_declaration();
    Object.defineProperty(exports, "DeclarationRequest", { enumerable: true, get: function() {
      return protocol_declaration_1.DeclarationRequest;
    } });
    var protocol_selectionRange_1 = require_protocol_selectionRange();
    Object.defineProperty(exports, "SelectionRangeRequest", { enumerable: true, get: function() {
      return protocol_selectionRange_1.SelectionRangeRequest;
    } });
    var protocol_progress_1 = require_protocol_progress();
    Object.defineProperty(exports, "WorkDoneProgress", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgress;
    } });
    Object.defineProperty(exports, "WorkDoneProgressCreateRequest", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgressCreateRequest;
    } });
    Object.defineProperty(exports, "WorkDoneProgressCancelNotification", { enumerable: true, get: function() {
      return protocol_progress_1.WorkDoneProgressCancelNotification;
    } });
    var protocol_callHierarchy_1 = require_protocol_callHierarchy();
    Object.defineProperty(exports, "CallHierarchyIncomingCallsRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyIncomingCallsRequest;
    } });
    Object.defineProperty(exports, "CallHierarchyOutgoingCallsRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyOutgoingCallsRequest;
    } });
    Object.defineProperty(exports, "CallHierarchyPrepareRequest", { enumerable: true, get: function() {
      return protocol_callHierarchy_1.CallHierarchyPrepareRequest;
    } });
    var protocol_semanticTokens_1 = require_protocol_semanticTokens();
    Object.defineProperty(exports, "TokenFormat", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.TokenFormat;
    } });
    Object.defineProperty(exports, "SemanticTokensRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRequest;
    } });
    Object.defineProperty(exports, "SemanticTokensDeltaRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensDeltaRequest;
    } });
    Object.defineProperty(exports, "SemanticTokensRangeRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRangeRequest;
    } });
    Object.defineProperty(exports, "SemanticTokensRefreshRequest", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRefreshRequest;
    } });
    Object.defineProperty(exports, "SemanticTokensRegistrationType", { enumerable: true, get: function() {
      return protocol_semanticTokens_1.SemanticTokensRegistrationType;
    } });
    var protocol_showDocument_1 = require_protocol_showDocument();
    Object.defineProperty(exports, "ShowDocumentRequest", { enumerable: true, get: function() {
      return protocol_showDocument_1.ShowDocumentRequest;
    } });
    var protocol_linkedEditingRange_1 = require_protocol_linkedEditingRange();
    Object.defineProperty(exports, "LinkedEditingRangeRequest", { enumerable: true, get: function() {
      return protocol_linkedEditingRange_1.LinkedEditingRangeRequest;
    } });
    var protocol_fileOperations_1 = require_protocol_fileOperations();
    Object.defineProperty(exports, "FileOperationPatternKind", { enumerable: true, get: function() {
      return protocol_fileOperations_1.FileOperationPatternKind;
    } });
    Object.defineProperty(exports, "DidCreateFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidCreateFilesNotification;
    } });
    Object.defineProperty(exports, "WillCreateFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillCreateFilesRequest;
    } });
    Object.defineProperty(exports, "DidRenameFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidRenameFilesNotification;
    } });
    Object.defineProperty(exports, "WillRenameFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillRenameFilesRequest;
    } });
    Object.defineProperty(exports, "DidDeleteFilesNotification", { enumerable: true, get: function() {
      return protocol_fileOperations_1.DidDeleteFilesNotification;
    } });
    Object.defineProperty(exports, "WillDeleteFilesRequest", { enumerable: true, get: function() {
      return protocol_fileOperations_1.WillDeleteFilesRequest;
    } });
    var protocol_moniker_1 = require_protocol_moniker();
    Object.defineProperty(exports, "UniquenessLevel", { enumerable: true, get: function() {
      return protocol_moniker_1.UniquenessLevel;
    } });
    Object.defineProperty(exports, "MonikerKind", { enumerable: true, get: function() {
      return protocol_moniker_1.MonikerKind;
    } });
    Object.defineProperty(exports, "MonikerRequest", { enumerable: true, get: function() {
      return protocol_moniker_1.MonikerRequest;
    } });
    var protocol_typeHierarchy_1 = require_protocol_typeHierarchy();
    Object.defineProperty(exports, "TypeHierarchyPrepareRequest", { enumerable: true, get: function() {
      return protocol_typeHierarchy_1.TypeHierarchyPrepareRequest;
    } });
    Object.defineProperty(exports, "TypeHierarchySubtypesRequest", { enumerable: true, get: function() {
      return protocol_typeHierarchy_1.TypeHierarchySubtypesRequest;
    } });
    Object.defineProperty(exports, "TypeHierarchySupertypesRequest", { enumerable: true, get: function() {
      return protocol_typeHierarchy_1.TypeHierarchySupertypesRequest;
    } });
    var protocol_inlineValue_1 = require_protocol_inlineValue();
    Object.defineProperty(exports, "InlineValueRequest", { enumerable: true, get: function() {
      return protocol_inlineValue_1.InlineValueRequest;
    } });
    Object.defineProperty(exports, "InlineValueRefreshRequest", { enumerable: true, get: function() {
      return protocol_inlineValue_1.InlineValueRefreshRequest;
    } });
    var protocol_inlayHint_1 = require_protocol_inlayHint();
    Object.defineProperty(exports, "InlayHintRequest", { enumerable: true, get: function() {
      return protocol_inlayHint_1.InlayHintRequest;
    } });
    Object.defineProperty(exports, "InlayHintResolveRequest", { enumerable: true, get: function() {
      return protocol_inlayHint_1.InlayHintResolveRequest;
    } });
    Object.defineProperty(exports, "InlayHintRefreshRequest", { enumerable: true, get: function() {
      return protocol_inlayHint_1.InlayHintRefreshRequest;
    } });
    var protocol_diagnostic_1 = require_protocol_diagnostic();
    Object.defineProperty(exports, "DiagnosticServerCancellationData", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DiagnosticServerCancellationData;
    } });
    Object.defineProperty(exports, "DocumentDiagnosticReportKind", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DocumentDiagnosticReportKind;
    } });
    Object.defineProperty(exports, "DocumentDiagnosticRequest", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DocumentDiagnosticRequest;
    } });
    Object.defineProperty(exports, "WorkspaceDiagnosticRequest", { enumerable: true, get: function() {
      return protocol_diagnostic_1.WorkspaceDiagnosticRequest;
    } });
    Object.defineProperty(exports, "DiagnosticRefreshRequest", { enumerable: true, get: function() {
      return protocol_diagnostic_1.DiagnosticRefreshRequest;
    } });
    var protocol_notebook_1 = require_protocol_notebook();
    Object.defineProperty(exports, "NotebookCellKind", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookCellKind;
    } });
    Object.defineProperty(exports, "ExecutionSummary", { enumerable: true, get: function() {
      return protocol_notebook_1.ExecutionSummary;
    } });
    Object.defineProperty(exports, "NotebookCell", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookCell;
    } });
    Object.defineProperty(exports, "NotebookDocument", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookDocument;
    } });
    Object.defineProperty(exports, "NotebookDocumentSyncRegistrationType", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookDocumentSyncRegistrationType;
    } });
    Object.defineProperty(exports, "DidOpenNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidOpenNotebookDocumentNotification;
    } });
    Object.defineProperty(exports, "NotebookCellArrayChange", { enumerable: true, get: function() {
      return protocol_notebook_1.NotebookCellArrayChange;
    } });
    Object.defineProperty(exports, "DidChangeNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidChangeNotebookDocumentNotification;
    } });
    Object.defineProperty(exports, "DidSaveNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidSaveNotebookDocumentNotification;
    } });
    Object.defineProperty(exports, "DidCloseNotebookDocumentNotification", { enumerable: true, get: function() {
      return protocol_notebook_1.DidCloseNotebookDocumentNotification;
    } });
    var protocol_inlineCompletion_1 = require_protocol_inlineCompletion();
    Object.defineProperty(exports, "InlineCompletionRequest", { enumerable: true, get: function() {
      return protocol_inlineCompletion_1.InlineCompletionRequest;
    } });
    var protocol_textDocumentContent_1 = require_protocol_textDocumentContent();
    Object.defineProperty(exports, "TextDocumentContentRequest", { enumerable: true, get: function() {
      return protocol_textDocumentContent_1.TextDocumentContentRequest;
    } });
    Object.defineProperty(exports, "TextDocumentContentRefreshRequest", { enumerable: true, get: function() {
      return protocol_textDocumentContent_1.TextDocumentContentRefreshRequest;
    } });
    var TextDocumentFilter;
    (function(TextDocumentFilter2) {
      function is(value) {
        const candidate = value;
        return Is2.string(candidate) || (Is2.string(candidate.language) || Is2.string(candidate.scheme) || GlobPattern.is(candidate.pattern));
      }
      TextDocumentFilter2.is = is;
    })(TextDocumentFilter || (exports.TextDocumentFilter = TextDocumentFilter = {}));
    var NotebookDocumentFilter;
    (function(NotebookDocumentFilter2) {
      function is(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && (Is2.string(candidate.notebookType) || Is2.string(candidate.scheme) || Is2.string(candidate.pattern));
      }
      NotebookDocumentFilter2.is = is;
    })(NotebookDocumentFilter || (exports.NotebookDocumentFilter = NotebookDocumentFilter = {}));
    var NotebookCellTextDocumentFilter;
    (function(NotebookCellTextDocumentFilter2) {
      function is(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && (Is2.string(candidate.notebook) || NotebookDocumentFilter.is(candidate.notebook)) && (candidate.language === void 0 || Is2.string(candidate.language));
      }
      NotebookCellTextDocumentFilter2.is = is;
    })(NotebookCellTextDocumentFilter || (exports.NotebookCellTextDocumentFilter = NotebookCellTextDocumentFilter = {}));
    var DocumentSelector;
    (function(DocumentSelector2) {
      function is(value) {
        if (!Array.isArray(value)) {
          return false;
        }
        for (const elem of value) {
          if (!Is2.string(elem) && !TextDocumentFilter.is(elem) && !NotebookCellTextDocumentFilter.is(elem)) {
            return false;
          }
        }
        return true;
      }
      DocumentSelector2.is = is;
    })(DocumentSelector || (exports.DocumentSelector = DocumentSelector = {}));
    var RegistrationRequest;
    (function(RegistrationRequest2) {
      RegistrationRequest2.method = "client/registerCapability";
      RegistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      RegistrationRequest2.type = new messages_1.ProtocolRequestType(RegistrationRequest2.method);
    })(RegistrationRequest || (exports.RegistrationRequest = RegistrationRequest = {}));
    var UnregistrationRequest;
    (function(UnregistrationRequest2) {
      UnregistrationRequest2.method = "client/unregisterCapability";
      UnregistrationRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      UnregistrationRequest2.type = new messages_1.ProtocolRequestType(UnregistrationRequest2.method);
    })(UnregistrationRequest || (exports.UnregistrationRequest = UnregistrationRequest = {}));
    var ResourceOperationKind;
    (function(ResourceOperationKind2) {
      ResourceOperationKind2.Create = "create";
      ResourceOperationKind2.Rename = "rename";
      ResourceOperationKind2.Delete = "delete";
    })(ResourceOperationKind || (exports.ResourceOperationKind = ResourceOperationKind = {}));
    var FailureHandlingKind;
    (function(FailureHandlingKind2) {
      FailureHandlingKind2.Abort = "abort";
      FailureHandlingKind2.Transactional = "transactional";
      FailureHandlingKind2.TextOnlyTransactional = "textOnlyTransactional";
      FailureHandlingKind2.Undo = "undo";
    })(FailureHandlingKind || (exports.FailureHandlingKind = FailureHandlingKind = {}));
    var RegularExpressionEngineKind;
    (function(RegularExpressionEngineKind2) {
      RegularExpressionEngineKind2.ES2020 = "ES2020";
    })(RegularExpressionEngineKind || (exports.RegularExpressionEngineKind = RegularExpressionEngineKind = {}));
    var PositionEncodingKind;
    (function(PositionEncodingKind2) {
      PositionEncodingKind2.UTF8 = "utf-8";
      PositionEncodingKind2.UTF16 = "utf-16";
      PositionEncodingKind2.UTF32 = "utf-32";
    })(PositionEncodingKind || (exports.PositionEncodingKind = PositionEncodingKind = {}));
    var StaticRegistrationOptions;
    (function(StaticRegistrationOptions2) {
      function hasId(value) {
        const candidate = value;
        return candidate && Is2.string(candidate.id) && candidate.id.length > 0;
      }
      StaticRegistrationOptions2.hasId = hasId;
    })(StaticRegistrationOptions || (exports.StaticRegistrationOptions = StaticRegistrationOptions = {}));
    var TextDocumentRegistrationOptions;
    (function(TextDocumentRegistrationOptions2) {
      function is(value) {
        const candidate = value;
        return candidate && (candidate.documentSelector === null || DocumentSelector.is(candidate.documentSelector));
      }
      TextDocumentRegistrationOptions2.is = is;
    })(TextDocumentRegistrationOptions || (exports.TextDocumentRegistrationOptions = TextDocumentRegistrationOptions = {}));
    var WorkDoneProgressOptions;
    (function(WorkDoneProgressOptions2) {
      function is(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && (candidate.workDoneProgress === void 0 || Is2.boolean(candidate.workDoneProgress));
      }
      WorkDoneProgressOptions2.is = is;
      function hasWorkDoneProgress(value) {
        const candidate = value;
        return candidate && Is2.boolean(candidate.workDoneProgress);
      }
      WorkDoneProgressOptions2.hasWorkDoneProgress = hasWorkDoneProgress;
    })(WorkDoneProgressOptions || (exports.WorkDoneProgressOptions = WorkDoneProgressOptions = {}));
    var InitializeRequest;
    (function(InitializeRequest2) {
      InitializeRequest2.method = "initialize";
      InitializeRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      InitializeRequest2.type = new messages_1.ProtocolRequestType(InitializeRequest2.method);
    })(InitializeRequest || (exports.InitializeRequest = InitializeRequest = {}));
    var InitializeErrorCodes;
    (function(InitializeErrorCodes2) {
      InitializeErrorCodes2.unknownProtocolVersion = 1;
    })(InitializeErrorCodes || (exports.InitializeErrorCodes = InitializeErrorCodes = {}));
    var InitializedNotification;
    (function(InitializedNotification2) {
      InitializedNotification2.method = "initialized";
      InitializedNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      InitializedNotification2.type = new messages_1.ProtocolNotificationType(InitializedNotification2.method);
    })(InitializedNotification || (exports.InitializedNotification = InitializedNotification = {}));
    var ShutdownRequest;
    (function(ShutdownRequest2) {
      ShutdownRequest2.method = "shutdown";
      ShutdownRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ShutdownRequest2.type = new messages_1.ProtocolRequestType0(ShutdownRequest2.method);
    })(ShutdownRequest || (exports.ShutdownRequest = ShutdownRequest = {}));
    var ExitNotification;
    (function(ExitNotification2) {
      ExitNotification2.method = "exit";
      ExitNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      ExitNotification2.type = new messages_1.ProtocolNotificationType0(ExitNotification2.method);
    })(ExitNotification || (exports.ExitNotification = ExitNotification = {}));
    var DidChangeConfigurationNotification;
    (function(DidChangeConfigurationNotification2) {
      DidChangeConfigurationNotification2.method = "workspace/didChangeConfiguration";
      DidChangeConfigurationNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeConfigurationNotification2.type = new messages_1.ProtocolNotificationType(DidChangeConfigurationNotification2.method);
      DidChangeConfigurationNotification2.capabilities = messages_1.CM.create("workspace.didChangeConfiguration", void 0);
    })(DidChangeConfigurationNotification || (exports.DidChangeConfigurationNotification = DidChangeConfigurationNotification = {}));
    var MessageType;
    (function(MessageType2) {
      MessageType2.Error = 1;
      MessageType2.Warning = 2;
      MessageType2.Info = 3;
      MessageType2.Log = 4;
      MessageType2.Debug = 5;
    })(MessageType || (exports.MessageType = MessageType = {}));
    var ShowMessageNotification;
    (function(ShowMessageNotification2) {
      ShowMessageNotification2.method = "window/showMessage";
      ShowMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      ShowMessageNotification2.type = new messages_1.ProtocolNotificationType(ShowMessageNotification2.method);
      ShowMessageNotification2.capabilities = messages_1.CM.create("window.showMessage", void 0);
    })(ShowMessageNotification || (exports.ShowMessageNotification = ShowMessageNotification = {}));
    var ShowMessageRequest;
    (function(ShowMessageRequest2) {
      ShowMessageRequest2.method = "window/showMessageRequest";
      ShowMessageRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ShowMessageRequest2.type = new messages_1.ProtocolRequestType(ShowMessageRequest2.method);
      ShowMessageRequest2.capabilities = messages_1.CM.create("window.showMessage", void 0);
    })(ShowMessageRequest || (exports.ShowMessageRequest = ShowMessageRequest = {}));
    var LogMessageNotification;
    (function(LogMessageNotification2) {
      LogMessageNotification2.method = "window/logMessage";
      LogMessageNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      LogMessageNotification2.type = new messages_1.ProtocolNotificationType(LogMessageNotification2.method);
    })(LogMessageNotification || (exports.LogMessageNotification = LogMessageNotification = {}));
    var TelemetryEventNotification;
    (function(TelemetryEventNotification2) {
      TelemetryEventNotification2.method = "telemetry/event";
      TelemetryEventNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      TelemetryEventNotification2.type = new messages_1.ProtocolNotificationType(TelemetryEventNotification2.method);
    })(TelemetryEventNotification || (exports.TelemetryEventNotification = TelemetryEventNotification = {}));
    var TextDocumentSyncKind2;
    (function(TextDocumentSyncKind3) {
      TextDocumentSyncKind3.None = 0;
      TextDocumentSyncKind3.Full = 1;
      TextDocumentSyncKind3.Incremental = 2;
    })(TextDocumentSyncKind2 || (exports.TextDocumentSyncKind = TextDocumentSyncKind2 = {}));
    var DidOpenTextDocumentNotification;
    (function(DidOpenTextDocumentNotification2) {
      DidOpenTextDocumentNotification2.method = "textDocument/didOpen";
      DidOpenTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidOpenTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidOpenTextDocumentNotification2.method);
      DidOpenTextDocumentNotification2.capabilities = messages_1.CM.create("textDocument.synchronization", "textDocumentSync.openClose");
    })(DidOpenTextDocumentNotification || (exports.DidOpenTextDocumentNotification = DidOpenTextDocumentNotification = {}));
    var TextDocumentContentChangeEvent;
    (function(TextDocumentContentChangeEvent2) {
      function isIncremental(event) {
        const candidate = event;
        return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range !== void 0 && (candidate.rangeLength === void 0 || typeof candidate.rangeLength === "number");
      }
      TextDocumentContentChangeEvent2.isIncremental = isIncremental;
      function isFull(event) {
        const candidate = event;
        return candidate !== void 0 && candidate !== null && typeof candidate.text === "string" && candidate.range === void 0 && candidate.rangeLength === void 0;
      }
      TextDocumentContentChangeEvent2.isFull = isFull;
    })(TextDocumentContentChangeEvent || (exports.TextDocumentContentChangeEvent = TextDocumentContentChangeEvent = {}));
    var DidChangeTextDocumentNotification;
    (function(DidChangeTextDocumentNotification2) {
      DidChangeTextDocumentNotification2.method = "textDocument/didChange";
      DidChangeTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidChangeTextDocumentNotification2.method);
      DidChangeTextDocumentNotification2.capabilities = messages_1.CM.create("textDocument.synchronization", "textDocumentSync");
    })(DidChangeTextDocumentNotification || (exports.DidChangeTextDocumentNotification = DidChangeTextDocumentNotification = {}));
    var DidCloseTextDocumentNotification;
    (function(DidCloseTextDocumentNotification2) {
      DidCloseTextDocumentNotification2.method = "textDocument/didClose";
      DidCloseTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidCloseTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidCloseTextDocumentNotification2.method);
      DidCloseTextDocumentNotification2.capabilities = messages_1.CM.create("textDocument.synchronization", "textDocumentSync.openClose");
    })(DidCloseTextDocumentNotification || (exports.DidCloseTextDocumentNotification = DidCloseTextDocumentNotification = {}));
    var DidSaveTextDocumentNotification;
    (function(DidSaveTextDocumentNotification2) {
      DidSaveTextDocumentNotification2.method = "textDocument/didSave";
      DidSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(DidSaveTextDocumentNotification2.method);
      DidSaveTextDocumentNotification2.capabilities = messages_1.CM.create("textDocument.synchronization.didSave", "textDocumentSync.save");
    })(DidSaveTextDocumentNotification || (exports.DidSaveTextDocumentNotification = DidSaveTextDocumentNotification = {}));
    var TextDocumentSaveReason;
    (function(TextDocumentSaveReason2) {
      TextDocumentSaveReason2.Manual = 1;
      TextDocumentSaveReason2.AfterDelay = 2;
      TextDocumentSaveReason2.FocusOut = 3;
    })(TextDocumentSaveReason || (exports.TextDocumentSaveReason = TextDocumentSaveReason = {}));
    var WillSaveTextDocumentNotification;
    (function(WillSaveTextDocumentNotification2) {
      WillSaveTextDocumentNotification2.method = "textDocument/willSave";
      WillSaveTextDocumentNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillSaveTextDocumentNotification2.type = new messages_1.ProtocolNotificationType(WillSaveTextDocumentNotification2.method);
      WillSaveTextDocumentNotification2.capabilities = messages_1.CM.create("textDocument.synchronization.willSave", "textDocumentSync.willSave");
    })(WillSaveTextDocumentNotification || (exports.WillSaveTextDocumentNotification = WillSaveTextDocumentNotification = {}));
    var WillSaveTextDocumentWaitUntilRequest;
    (function(WillSaveTextDocumentWaitUntilRequest2) {
      WillSaveTextDocumentWaitUntilRequest2.method = "textDocument/willSaveWaitUntil";
      WillSaveTextDocumentWaitUntilRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WillSaveTextDocumentWaitUntilRequest2.type = new messages_1.ProtocolRequestType(WillSaveTextDocumentWaitUntilRequest2.method);
      WillSaveTextDocumentWaitUntilRequest2.capabilities = messages_1.CM.create("textDocument.synchronization.willSaveWaitUntil", "textDocumentSync.willSaveWaitUntil");
    })(WillSaveTextDocumentWaitUntilRequest || (exports.WillSaveTextDocumentWaitUntilRequest = WillSaveTextDocumentWaitUntilRequest = {}));
    var DidChangeWatchedFilesNotification;
    (function(DidChangeWatchedFilesNotification2) {
      DidChangeWatchedFilesNotification2.method = "workspace/didChangeWatchedFiles";
      DidChangeWatchedFilesNotification2.messageDirection = messages_1.MessageDirection.clientToServer;
      DidChangeWatchedFilesNotification2.type = new messages_1.ProtocolNotificationType(DidChangeWatchedFilesNotification2.method);
      DidChangeWatchedFilesNotification2.capabilities = messages_1.CM.create("workspace.didChangeWatchedFiles", void 0);
    })(DidChangeWatchedFilesNotification || (exports.DidChangeWatchedFilesNotification = DidChangeWatchedFilesNotification = {}));
    var FileChangeType2;
    (function(FileChangeType3) {
      FileChangeType3.Created = 1;
      FileChangeType3.Changed = 2;
      FileChangeType3.Deleted = 3;
    })(FileChangeType2 || (exports.FileChangeType = FileChangeType2 = {}));
    var RelativePattern;
    (function(RelativePattern2) {
      function is(value) {
        const candidate = value;
        return Is2.objectLiteral(candidate) && (vscode_languageserver_types_1.URI.is(candidate.baseUri) || vscode_languageserver_types_1.WorkspaceFolder.is(candidate.baseUri)) && Is2.string(candidate.pattern);
      }
      RelativePattern2.is = is;
    })(RelativePattern || (exports.RelativePattern = RelativePattern = {}));
    var GlobPattern;
    (function(GlobPattern2) {
      function is(value) {
        const candidate = value;
        return Is2.string(candidate) || RelativePattern.is(candidate);
      }
      GlobPattern2.is = is;
    })(GlobPattern || (exports.GlobPattern = GlobPattern = {}));
    var WatchKind;
    (function(WatchKind2) {
      WatchKind2.Create = 1;
      WatchKind2.Change = 2;
      WatchKind2.Delete = 4;
    })(WatchKind || (exports.WatchKind = WatchKind = {}));
    var PublishDiagnosticsNotification;
    (function(PublishDiagnosticsNotification2) {
      PublishDiagnosticsNotification2.method = "textDocument/publishDiagnostics";
      PublishDiagnosticsNotification2.messageDirection = messages_1.MessageDirection.serverToClient;
      PublishDiagnosticsNotification2.type = new messages_1.ProtocolNotificationType(PublishDiagnosticsNotification2.method);
      PublishDiagnosticsNotification2.capabilities = messages_1.CM.create("textDocument.publishDiagnostics", void 0);
    })(PublishDiagnosticsNotification || (exports.PublishDiagnosticsNotification = PublishDiagnosticsNotification = {}));
    var CompletionTriggerKind;
    (function(CompletionTriggerKind2) {
      CompletionTriggerKind2.Invoked = 1;
      CompletionTriggerKind2.TriggerCharacter = 2;
      CompletionTriggerKind2.TriggerForIncompleteCompletions = 3;
    })(CompletionTriggerKind || (exports.CompletionTriggerKind = CompletionTriggerKind = {}));
    var CompletionRequest;
    (function(CompletionRequest2) {
      CompletionRequest2.method = "textDocument/completion";
      CompletionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CompletionRequest2.type = new messages_1.ProtocolRequestType(CompletionRequest2.method);
      CompletionRequest2.capabilities = messages_1.CM.create("textDocument.completion", "completionProvider");
    })(CompletionRequest || (exports.CompletionRequest = CompletionRequest = {}));
    var CompletionResolveRequest;
    (function(CompletionResolveRequest2) {
      CompletionResolveRequest2.method = "completionItem/resolve";
      CompletionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CompletionResolveRequest2.type = new messages_1.ProtocolRequestType(CompletionResolveRequest2.method);
      CompletionResolveRequest2.capabilities = messages_1.CM.create("textDocument.completion.completionItem.resolveSupport", "completionProvider.resolveProvider");
    })(CompletionResolveRequest || (exports.CompletionResolveRequest = CompletionResolveRequest = {}));
    var HoverRequest;
    (function(HoverRequest2) {
      HoverRequest2.method = "textDocument/hover";
      HoverRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      HoverRequest2.type = new messages_1.ProtocolRequestType(HoverRequest2.method);
      HoverRequest2.capabilities = messages_1.CM.create("textDocument.hover", "hoverProvider");
    })(HoverRequest || (exports.HoverRequest = HoverRequest = {}));
    var SignatureHelpTriggerKind;
    (function(SignatureHelpTriggerKind2) {
      SignatureHelpTriggerKind2.Invoked = 1;
      SignatureHelpTriggerKind2.TriggerCharacter = 2;
      SignatureHelpTriggerKind2.ContentChange = 3;
    })(SignatureHelpTriggerKind || (exports.SignatureHelpTriggerKind = SignatureHelpTriggerKind = {}));
    var SignatureHelpRequest;
    (function(SignatureHelpRequest2) {
      SignatureHelpRequest2.method = "textDocument/signatureHelp";
      SignatureHelpRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      SignatureHelpRequest2.type = new messages_1.ProtocolRequestType(SignatureHelpRequest2.method);
      SignatureHelpRequest2.capabilities = messages_1.CM.create("textDocument.signatureHelp", "signatureHelpProvider");
    })(SignatureHelpRequest || (exports.SignatureHelpRequest = SignatureHelpRequest = {}));
    var DefinitionRequest;
    (function(DefinitionRequest2) {
      DefinitionRequest2.method = "textDocument/definition";
      DefinitionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DefinitionRequest2.type = new messages_1.ProtocolRequestType(DefinitionRequest2.method);
      DefinitionRequest2.capabilities = messages_1.CM.create("textDocument.definition", "definitionProvider");
    })(DefinitionRequest || (exports.DefinitionRequest = DefinitionRequest = {}));
    var ReferencesRequest;
    (function(ReferencesRequest2) {
      ReferencesRequest2.method = "textDocument/references";
      ReferencesRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ReferencesRequest2.type = new messages_1.ProtocolRequestType(ReferencesRequest2.method);
      ReferencesRequest2.capabilities = messages_1.CM.create("textDocument.references", "referencesProvider");
    })(ReferencesRequest || (exports.ReferencesRequest = ReferencesRequest = {}));
    var DocumentHighlightRequest;
    (function(DocumentHighlightRequest2) {
      DocumentHighlightRequest2.method = "textDocument/documentHighlight";
      DocumentHighlightRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentHighlightRequest2.type = new messages_1.ProtocolRequestType(DocumentHighlightRequest2.method);
      DocumentHighlightRequest2.capabilities = messages_1.CM.create("textDocument.documentHighlight", "documentHighlightProvider");
    })(DocumentHighlightRequest || (exports.DocumentHighlightRequest = DocumentHighlightRequest = {}));
    var DocumentSymbolRequest;
    (function(DocumentSymbolRequest2) {
      DocumentSymbolRequest2.method = "textDocument/documentSymbol";
      DocumentSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentSymbolRequest2.type = new messages_1.ProtocolRequestType(DocumentSymbolRequest2.method);
      DocumentSymbolRequest2.capabilities = messages_1.CM.create("textDocument.documentSymbol", "documentSymbolProvider");
    })(DocumentSymbolRequest || (exports.DocumentSymbolRequest = DocumentSymbolRequest = {}));
    var CodeActionRequest;
    (function(CodeActionRequest2) {
      CodeActionRequest2.method = "textDocument/codeAction";
      CodeActionRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeActionRequest2.type = new messages_1.ProtocolRequestType(CodeActionRequest2.method);
      CodeActionRequest2.capabilities = messages_1.CM.create("textDocument.codeAction", "codeActionProvider");
    })(CodeActionRequest || (exports.CodeActionRequest = CodeActionRequest = {}));
    var CodeActionResolveRequest;
    (function(CodeActionResolveRequest2) {
      CodeActionResolveRequest2.method = "codeAction/resolve";
      CodeActionResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeActionResolveRequest2.type = new messages_1.ProtocolRequestType(CodeActionResolveRequest2.method);
      CodeActionResolveRequest2.capabilities = messages_1.CM.create("textDocument.codeAction.resolveSupport", "codeActionProvider.resolveProvider");
    })(CodeActionResolveRequest || (exports.CodeActionResolveRequest = CodeActionResolveRequest = {}));
    var WorkspaceSymbolRequest;
    (function(WorkspaceSymbolRequest2) {
      WorkspaceSymbolRequest2.method = "workspace/symbol";
      WorkspaceSymbolRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkspaceSymbolRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolRequest2.method);
      WorkspaceSymbolRequest2.capabilities = messages_1.CM.create("workspace.symbol", "workspaceSymbolProvider");
    })(WorkspaceSymbolRequest || (exports.WorkspaceSymbolRequest = WorkspaceSymbolRequest = {}));
    var WorkspaceSymbolResolveRequest;
    (function(WorkspaceSymbolResolveRequest2) {
      WorkspaceSymbolResolveRequest2.method = "workspaceSymbol/resolve";
      WorkspaceSymbolResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      WorkspaceSymbolResolveRequest2.type = new messages_1.ProtocolRequestType(WorkspaceSymbolResolveRequest2.method);
      WorkspaceSymbolResolveRequest2.capabilities = messages_1.CM.create("workspace.symbol.resolveSupport", "workspaceSymbolProvider.resolveProvider");
    })(WorkspaceSymbolResolveRequest || (exports.WorkspaceSymbolResolveRequest = WorkspaceSymbolResolveRequest = {}));
    var CodeLensRequest;
    (function(CodeLensRequest2) {
      CodeLensRequest2.method = "textDocument/codeLens";
      CodeLensRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeLensRequest2.type = new messages_1.ProtocolRequestType(CodeLensRequest2.method);
      CodeLensRequest2.capabilities = messages_1.CM.create("textDocument.codeLens", "codeLensProvider");
    })(CodeLensRequest || (exports.CodeLensRequest = CodeLensRequest = {}));
    var CodeLensResolveRequest;
    (function(CodeLensResolveRequest2) {
      CodeLensResolveRequest2.method = "codeLens/resolve";
      CodeLensResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      CodeLensResolveRequest2.type = new messages_1.ProtocolRequestType(CodeLensResolveRequest2.method);
      CodeLensResolveRequest2.capabilities = messages_1.CM.create("textDocument.codeLens.resolveSupport", "codeLensProvider.resolveProvider");
    })(CodeLensResolveRequest || (exports.CodeLensResolveRequest = CodeLensResolveRequest = {}));
    var CodeLensRefreshRequest;
    (function(CodeLensRefreshRequest2) {
      CodeLensRefreshRequest2.method = `workspace/codeLens/refresh`;
      CodeLensRefreshRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      CodeLensRefreshRequest2.type = new messages_1.ProtocolRequestType0(CodeLensRefreshRequest2.method);
      CodeLensRefreshRequest2.capabilities = messages_1.CM.create("workspace.codeLens", void 0);
    })(CodeLensRefreshRequest || (exports.CodeLensRefreshRequest = CodeLensRefreshRequest = {}));
    var DocumentLinkRequest;
    (function(DocumentLinkRequest2) {
      DocumentLinkRequest2.method = "textDocument/documentLink";
      DocumentLinkRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentLinkRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkRequest2.method);
      DocumentLinkRequest2.capabilities = messages_1.CM.create("textDocument.documentLink", "documentLinkProvider");
    })(DocumentLinkRequest || (exports.DocumentLinkRequest = DocumentLinkRequest = {}));
    var DocumentLinkResolveRequest;
    (function(DocumentLinkResolveRequest2) {
      DocumentLinkResolveRequest2.method = "documentLink/resolve";
      DocumentLinkResolveRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentLinkResolveRequest2.type = new messages_1.ProtocolRequestType(DocumentLinkResolveRequest2.method);
      DocumentLinkResolveRequest2.capabilities = messages_1.CM.create("textDocument.documentLink", "documentLinkProvider.resolveProvider");
    })(DocumentLinkResolveRequest || (exports.DocumentLinkResolveRequest = DocumentLinkResolveRequest = {}));
    var DocumentFormattingRequest;
    (function(DocumentFormattingRequest2) {
      DocumentFormattingRequest2.method = "textDocument/formatting";
      DocumentFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentFormattingRequest2.method);
      DocumentFormattingRequest2.capabilities = messages_1.CM.create("textDocument.formatting", "documentFormattingProvider");
    })(DocumentFormattingRequest || (exports.DocumentFormattingRequest = DocumentFormattingRequest = {}));
    var DocumentRangeFormattingRequest;
    (function(DocumentRangeFormattingRequest2) {
      DocumentRangeFormattingRequest2.method = "textDocument/rangeFormatting";
      DocumentRangeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentRangeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangeFormattingRequest2.method);
      DocumentRangeFormattingRequest2.capabilities = messages_1.CM.create("textDocument.rangeFormatting", "documentRangeFormattingProvider");
    })(DocumentRangeFormattingRequest || (exports.DocumentRangeFormattingRequest = DocumentRangeFormattingRequest = {}));
    var DocumentRangesFormattingRequest;
    (function(DocumentRangesFormattingRequest2) {
      DocumentRangesFormattingRequest2.method = "textDocument/rangesFormatting";
      DocumentRangesFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentRangesFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentRangesFormattingRequest2.method);
      DocumentRangesFormattingRequest2.capabilities = messages_1.CM.create("textDocument.rangeFormatting.rangesSupport", "documentRangeFormattingProvider.rangesSupport");
    })(DocumentRangesFormattingRequest || (exports.DocumentRangesFormattingRequest = DocumentRangesFormattingRequest = {}));
    var DocumentOnTypeFormattingRequest;
    (function(DocumentOnTypeFormattingRequest2) {
      DocumentOnTypeFormattingRequest2.method = "textDocument/onTypeFormatting";
      DocumentOnTypeFormattingRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      DocumentOnTypeFormattingRequest2.type = new messages_1.ProtocolRequestType(DocumentOnTypeFormattingRequest2.method);
      DocumentOnTypeFormattingRequest2.capabilities = messages_1.CM.create("textDocument.onTypeFormatting", "documentOnTypeFormattingProvider");
    })(DocumentOnTypeFormattingRequest || (exports.DocumentOnTypeFormattingRequest = DocumentOnTypeFormattingRequest = {}));
    var PrepareSupportDefaultBehavior;
    (function(PrepareSupportDefaultBehavior2) {
      PrepareSupportDefaultBehavior2.Identifier = 1;
    })(PrepareSupportDefaultBehavior || (exports.PrepareSupportDefaultBehavior = PrepareSupportDefaultBehavior = {}));
    var RenameRequest;
    (function(RenameRequest2) {
      RenameRequest2.method = "textDocument/rename";
      RenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      RenameRequest2.type = new messages_1.ProtocolRequestType(RenameRequest2.method);
      RenameRequest2.capabilities = messages_1.CM.create("textDocument.rename", "renameProvider");
    })(RenameRequest || (exports.RenameRequest = RenameRequest = {}));
    var PrepareRenameRequest;
    (function(PrepareRenameRequest2) {
      PrepareRenameRequest2.method = "textDocument/prepareRename";
      PrepareRenameRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      PrepareRenameRequest2.type = new messages_1.ProtocolRequestType(PrepareRenameRequest2.method);
      PrepareRenameRequest2.capabilities = messages_1.CM.create("textDocument.rename.prepareSupport", "renameProvider.prepareProvider");
    })(PrepareRenameRequest || (exports.PrepareRenameRequest = PrepareRenameRequest = {}));
    var ExecuteCommandRequest;
    (function(ExecuteCommandRequest2) {
      ExecuteCommandRequest2.method = "workspace/executeCommand";
      ExecuteCommandRequest2.messageDirection = messages_1.MessageDirection.clientToServer;
      ExecuteCommandRequest2.type = new messages_1.ProtocolRequestType(ExecuteCommandRequest2.method);
      ExecuteCommandRequest2.capabilities = messages_1.CM.create("workspace.executeCommand", "executeCommandProvider");
    })(ExecuteCommandRequest || (exports.ExecuteCommandRequest = ExecuteCommandRequest = {}));
    var ApplyWorkspaceEditRequest;
    (function(ApplyWorkspaceEditRequest2) {
      ApplyWorkspaceEditRequest2.method = "workspace/applyEdit";
      ApplyWorkspaceEditRequest2.messageDirection = messages_1.MessageDirection.serverToClient;
      ApplyWorkspaceEditRequest2.type = new messages_1.ProtocolRequestType("workspace/applyEdit");
      ApplyWorkspaceEditRequest2.capabilities = messages_1.CM.create("workspace.applyEdit", void 0);
    })(ApplyWorkspaceEditRequest || (exports.ApplyWorkspaceEditRequest = ApplyWorkspaceEditRequest = {}));
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/connection.js
var require_connection2 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/connection.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createProtocolConnection = createProtocolConnection;
    var vscode_jsonrpc_1 = require_api();
    function createProtocolConnection(input, output, logger, options) {
      if (vscode_jsonrpc_1.ConnectionStrategy.is(options)) {
        options = { connectionStrategy: options };
      }
      return (0, vscode_jsonrpc_1.createMessageConnection)(input, output, logger, options);
    }
  }
});

// node_modules/vscode-languageserver-protocol/lib/common/api.js
var require_api2 = __commonJS({
  "node_modules/vscode-languageserver-protocol/lib/common/api.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LSPErrorCodes = exports.createProtocolConnection = void 0;
    __exportStar(require_api(), exports);
    __exportStar((init_main(), __toCommonJS(main_exports)), exports);
    __exportStar(require_messages2(), exports);
    __exportStar(require_protocol(), exports);
    var connection_1 = require_connection2();
    Object.defineProperty(exports, "createProtocolConnection", { enumerable: true, get: function() {
      return connection_1.createProtocolConnection;
    } });
    var LSPErrorCodes;
    (function(LSPErrorCodes2) {
      LSPErrorCodes2.lspReservedErrorRangeStart = -32899;
      LSPErrorCodes2.RequestFailed = -32803;
      LSPErrorCodes2.ServerCancelled = -32802;
      LSPErrorCodes2.ContentModified = -32801;
      LSPErrorCodes2.RequestCancelled = -32800;
      LSPErrorCodes2.lspReservedErrorRangeEnd = -32800;
    })(LSPErrorCodes || (exports.LSPErrorCodes = LSPErrorCodes = {}));
  }
});

// node_modules/vscode-languageserver/lib/common/semanticTokens.js
var require_semanticTokens = __commonJS({
  "node_modules/vscode-languageserver/lib/common/semanticTokens.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SemanticTokensBuilder = exports.SemanticTokensDiff = exports.SemanticTokensFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var SemanticTokensFeature = (Base) => {
      return class extends Base {
        get semanticTokens() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.SemanticTokensRefreshRequest.type);
            },
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onDelta: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensDeltaRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onRange: (handler) => {
              const type = vscode_languageserver_protocol_1.SemanticTokensRangeRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports.SemanticTokensFeature = SemanticTokensFeature;
    var SemanticTokensDiff = class {
      originalSequence;
      modifiedSequence;
      constructor(originalSequence, modifiedSequence) {
        this.originalSequence = originalSequence;
        this.modifiedSequence = modifiedSequence;
      }
      computeDiff() {
        const originalLength = this.originalSequence.length;
        const modifiedLength = this.modifiedSequence.length;
        let startIndex = 0;
        while (startIndex < modifiedLength && startIndex < originalLength && this.originalSequence[startIndex] === this.modifiedSequence[startIndex]) {
          startIndex++;
        }
        if (startIndex < modifiedLength && startIndex < originalLength) {
          let originalEndIndex = originalLength - 1;
          let modifiedEndIndex = modifiedLength - 1;
          while (originalEndIndex >= startIndex && modifiedEndIndex >= startIndex && this.originalSequence[originalEndIndex] === this.modifiedSequence[modifiedEndIndex]) {
            originalEndIndex--;
            modifiedEndIndex--;
          }
          if (originalEndIndex < startIndex || modifiedEndIndex < startIndex) {
            originalEndIndex++;
            modifiedEndIndex++;
          }
          const deleteCount = originalEndIndex - startIndex + 1;
          const newData = this.modifiedSequence.slice(startIndex, modifiedEndIndex + 1);
          if (newData.length === 1 && newData[0] === this.originalSequence[originalEndIndex]) {
            return [
              { start: startIndex, deleteCount: deleteCount - 1 }
            ];
          } else {
            return [
              { start: startIndex, deleteCount, data: newData }
            ];
          }
        } else if (startIndex < modifiedLength) {
          return [
            { start: startIndex, deleteCount: 0, data: this.modifiedSequence.slice(startIndex) }
          ];
        } else if (startIndex < originalLength) {
          return [
            { start: startIndex, deleteCount: originalLength - startIndex }
          ];
        } else {
          return [];
        }
      }
    };
    exports.SemanticTokensDiff = SemanticTokensDiff;
    var SemanticTokensBuilder2 = class _SemanticTokensBuilder {
      _id;
      _prevLine;
      _prevChar;
      _dataIsSortedAndDeltaEncoded;
      _data;
      _dataNonDelta;
      _dataLen;
      _prevData;
      constructor() {
        this._prevData = void 0;
        this.initialize();
      }
      initialize() {
        this._id = Date.now();
        this._prevLine = 0;
        this._prevChar = 0;
        this._data = [];
        this._dataNonDelta = [];
        this._dataLen = 0;
        this._dataIsSortedAndDeltaEncoded = true;
      }
      push(line, char, length, tokenType, tokenModifiers) {
        if (this._dataIsSortedAndDeltaEncoded && (line < this._prevLine || line === this._prevLine && char < this._prevChar)) {
          this._dataIsSortedAndDeltaEncoded = false;
          this._dataNonDelta = _SemanticTokensBuilder._deltaDecode(this._data);
        }
        let pushLine = line;
        let pushChar = char;
        if (this._dataIsSortedAndDeltaEncoded && this._dataLen > 0) {
          pushLine -= this._prevLine;
          if (pushLine === 0) {
            pushChar -= this._prevChar;
          }
        }
        const dataSource = this._dataIsSortedAndDeltaEncoded ? this._data : this._dataNonDelta;
        dataSource[this._dataLen++] = pushLine;
        dataSource[this._dataLen++] = pushChar;
        dataSource[this._dataLen++] = length;
        dataSource[this._dataLen++] = tokenType;
        dataSource[this._dataLen++] = tokenModifiers;
        this._prevLine = line;
        this._prevChar = char;
      }
      get id() {
        return this._id.toString();
      }
      static _deltaDecode(data) {
        const tokenCount = data.length / 5 | 0;
        let prevLine = 0;
        let prevChar = 0;
        const result = [];
        for (let i = 0; i < tokenCount; i++) {
          const dstOffset = 5 * i;
          let line = data[dstOffset];
          let char = data[dstOffset + 1];
          if (line === 0) {
            line = prevLine;
            char += prevChar;
          } else {
            line += prevLine;
          }
          const length = data[dstOffset + 2];
          const tokenType = data[dstOffset + 3];
          const tokenModifiers = data[dstOffset + 4];
          result[dstOffset + 0] = line;
          result[dstOffset + 1] = char;
          result[dstOffset + 2] = length;
          result[dstOffset + 3] = tokenType;
          result[dstOffset + 4] = tokenModifiers;
          prevLine = line;
          prevChar = char;
        }
        return result;
      }
      static _sortAndDeltaEncode(data) {
        const pos = [];
        const tokenCount = data.length / 5 | 0;
        for (let i = 0; i < tokenCount; i++) {
          pos[i] = i;
        }
        pos.sort((a, b) => {
          const aLine = data[5 * a];
          const bLine = data[5 * b];
          if (aLine === bLine) {
            const aChar = data[5 * a + 1];
            const bChar = data[5 * b + 1];
            return aChar - bChar;
          }
          return aLine - bLine;
        });
        const result = [];
        let prevLine = 0;
        let prevChar = 0;
        for (let i = 0; i < tokenCount; i++) {
          const srcOffset = 5 * pos[i];
          const line = data[srcOffset + 0];
          const char = data[srcOffset + 1];
          const length = data[srcOffset + 2];
          const tokenType = data[srcOffset + 3];
          const tokenModifiers = data[srcOffset + 4];
          const pushLine = line - prevLine;
          const pushChar = pushLine === 0 ? char - prevChar : char;
          const dstOffset = 5 * i;
          result[dstOffset + 0] = pushLine;
          result[dstOffset + 1] = pushChar;
          result[dstOffset + 2] = length;
          result[dstOffset + 3] = tokenType;
          result[dstOffset + 4] = tokenModifiers;
          prevLine = line;
          prevChar = char;
        }
        return result;
      }
      getFinalDataDelta() {
        if (this._dataIsSortedAndDeltaEncoded) {
          return this._data;
        } else {
          return _SemanticTokensBuilder._sortAndDeltaEncode(this._dataNonDelta);
        }
      }
      previousResult(id) {
        if (this.id === id) {
          this._prevData = this.getFinalDataDelta();
        } else {
          this._prevData = void 0;
        }
        this.initialize();
      }
      build() {
        this._prevData = void 0;
        return {
          resultId: this.id,
          data: this.getFinalDataDelta()
        };
      }
      canBuildEdits() {
        return this._prevData !== void 0;
      }
      buildEdits() {
        if (this._prevData !== void 0) {
          return {
            resultId: this.id,
            edits: new SemanticTokensDiff(this._prevData, this.getFinalDataDelta()).computeDiff()
          };
        } else {
          return this.build();
        }
      }
    };
    exports.SemanticTokensBuilder = SemanticTokensBuilder2;
  }
});

// node_modules/vscode-languageserver/lib/common/utils/uuid.js
var require_uuid = __commonJS({
  "node_modules/vscode-languageserver/lib/common/utils/uuid.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.empty = void 0;
    exports.v4 = v4;
    exports.isUUID = isUUID;
    exports.parse = parse4;
    exports.generateUuid = generateUuid;
    var ValueUUID = class {
      _value;
      constructor(_value) {
        this._value = _value;
      }
      asHex() {
        return this._value;
      }
      equals(other) {
        return this.asHex() === other.asHex();
      }
    };
    var V4UUID = class _V4UUID extends ValueUUID {
      static _chars = ["0", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
      static _timeHighBits = ["8", "9", "a", "b"];
      static _oneOf(array) {
        return array[Math.floor(array.length * Math.random())];
      }
      static _randomHex() {
        return _V4UUID._oneOf(_V4UUID._chars);
      }
      constructor() {
        super([
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          "4",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._oneOf(_V4UUID._timeHighBits),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          "-",
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex(),
          _V4UUID._randomHex()
        ].join(""));
      }
    };
    exports.empty = new ValueUUID("00000000-0000-0000-0000-000000000000");
    function v4() {
      return new V4UUID();
    }
    var _UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    function isUUID(value) {
      return _UUIDPattern.test(value);
    }
    function parse4(value) {
      if (!isUUID(value)) {
        throw new Error("invalid uuid");
      }
      return new ValueUUID(value);
    }
    function generateUuid() {
      return v4().asHex();
    }
  }
});

// node_modules/vscode-languageserver/lib/common/progress.js
var require_progress = __commonJS({
  "node_modules/vscode-languageserver/lib/common/progress.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressFeature = exports.WorkDoneProgressReporter = void 0;
    exports.attachWorkDone = attachWorkDone;
    exports.attachPartialResult = attachPartialResult;
    var vscode_languageserver_protocol_1 = require_api2();
    var uuid_1 = require_uuid();
    var WorkDoneProgressReporter;
    (function(WorkDoneProgressReporter2) {
      function isNullInstance(reporter) {
        return reporter instanceof NullProgressReporter;
      }
      WorkDoneProgressReporter2.isNullInstance = isNullInstance;
    })(WorkDoneProgressReporter || (exports.WorkDoneProgressReporter = WorkDoneProgressReporter = {}));
    var WorkDoneProgressReporterImpl = class _WorkDoneProgressReporterImpl {
      _connection;
      _token;
      static Instances = /* @__PURE__ */ new Map();
      constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
        _WorkDoneProgressReporterImpl.Instances.set(this._token, this);
      }
      begin(title, percentage, message, cancellable) {
        const param = {
          kind: "begin",
          title,
          message,
          cancellable
        };
        if (typeof percentage === "number") {
          param.percentage = Math.round(percentage);
        }
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
      }
      report(arg0, arg1) {
        const param = {
          kind: "report"
        };
        if (typeof arg0 === "number") {
          param.percentage = Math.round(arg0);
          if (arg1 !== void 0) {
            param.message = arg1;
          }
        } else {
          param.message = arg0;
        }
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, param);
      }
      done() {
        _WorkDoneProgressReporterImpl.Instances.delete(this._token);
        this._connection.sendProgress(vscode_languageserver_protocol_1.WorkDoneProgress.type, this._token, { kind: "end" });
      }
    };
    var WorkDoneProgressServerReporterImpl = class extends WorkDoneProgressReporterImpl {
      _source;
      constructor(connection, token) {
        super(connection, token);
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
      }
      get token() {
        return this._source.token;
      }
      done() {
        this._source.dispose();
        super.done();
      }
      cancel() {
        this._source.cancel();
      }
    };
    var NullProgressReporter = class {
      constructor() {
      }
      begin() {
      }
      report() {
      }
      done() {
      }
    };
    var NullProgressServerReporter = class extends NullProgressReporter {
      _source;
      constructor() {
        super();
        this._source = new vscode_languageserver_protocol_1.CancellationTokenSource();
      }
      get token() {
        return this._source.token;
      }
      done() {
        this._source.dispose();
      }
      cancel() {
        this._source.cancel();
      }
    };
    function attachWorkDone(connection, params) {
      if (params === void 0 || params.workDoneToken === void 0) {
        return new NullProgressReporter();
      }
      const token = params.workDoneToken;
      delete params.workDoneToken;
      return new WorkDoneProgressReporterImpl(connection, token);
    }
    var ProgressFeature = (Base) => {
      return class extends Base {
        _progressSupported;
        constructor() {
          super();
          this._progressSupported = false;
        }
        initialize(capabilities) {
          super.initialize(capabilities);
          if (capabilities?.window?.workDoneProgress === true) {
            this._progressSupported = true;
            this.connection.onNotification(vscode_languageserver_protocol_1.WorkDoneProgressCancelNotification.type, (params) => {
              const progress = WorkDoneProgressReporterImpl.Instances.get(params.token);
              if (progress instanceof WorkDoneProgressServerReporterImpl || progress instanceof NullProgressServerReporter) {
                progress.cancel();
              }
            });
          }
        }
        attachWorkDoneProgress(token) {
          if (token === void 0) {
            return new NullProgressReporter();
          } else {
            return new WorkDoneProgressReporterImpl(this.connection, token);
          }
        }
        createWorkDoneProgress() {
          if (this._progressSupported) {
            const token = (0, uuid_1.generateUuid)();
            return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkDoneProgressCreateRequest.type, { token }).then(() => {
              const result = new WorkDoneProgressServerReporterImpl(this.connection, token);
              return result;
            });
          } else {
            return Promise.resolve(new NullProgressServerReporter());
          }
        }
      };
    };
    exports.ProgressFeature = ProgressFeature;
    var ResultProgress;
    (function(ResultProgress2) {
      ResultProgress2.type = new vscode_languageserver_protocol_1.ProgressType();
    })(ResultProgress || (ResultProgress = {}));
    var ResultProgressReporterImpl = class {
      _connection;
      _token;
      constructor(_connection, _token) {
        this._connection = _connection;
        this._token = _token;
      }
      report(data) {
        this._connection.sendProgress(ResultProgress.type, this._token, data);
      }
    };
    function attachPartialResult(connection, params) {
      if (params === void 0 || params.partialResultToken === void 0) {
        return void 0;
      }
      const token = params.partialResultToken;
      delete params.partialResultToken;
      return new ResultProgressReporterImpl(connection, token);
    }
  }
});

// node_modules/vscode-languageserver/lib/common/textDocuments.js
var require_textDocuments = __commonJS({
  "node_modules/vscode-languageserver/lib/common/textDocuments.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextDocuments = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var TextDocuments = class {
      _configuration;
      _syncedDocuments;
      _onDidChangeContent;
      _onDidOpen;
      _onDidClose;
      _onDidSave;
      _onWillSave;
      _willSaveWaitUntil;
      /**
       * Create a new text document manager.
       */
      constructor(configuration) {
        this._configuration = configuration;
        this._syncedDocuments = /* @__PURE__ */ new Map();
        this._onDidChangeContent = new vscode_languageserver_protocol_1.Emitter();
        this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
        this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
        this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
        this._onWillSave = new vscode_languageserver_protocol_1.Emitter();
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been opened.
       */
      get onDidOpen() {
        return this._onDidOpen.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been opened or the content changes.
       */
      get onDidChangeContent() {
        return this._onDidChangeContent.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * will be saved.
       */
      get onWillSave() {
        return this._onWillSave.event;
      }
      /**
       * Sets a handler that will be called if a participant wants to provide
       * edits during a text document save.
       */
      onWillSaveWaitUntil(handler) {
        this._willSaveWaitUntil = handler;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been saved.
       */
      get onDidSave() {
        return this._onDidSave.event;
      }
      /**
       * An event that fires when a text document managed by this manager
       * has been closed.
       */
      get onDidClose() {
        return this._onDidClose.event;
      }
      /**
       * Returns the document for the given URI. Returns undefined if
       * the document is not managed by this instance.
       *
       * @param uri The text document's URI to retrieve.
       * @return the text document or `undefined`.
       */
      get(uri) {
        return this._syncedDocuments.get(uri);
      }
      /**
       * Returns all text documents managed by this instance.
       *
       * @return all text documents.
       */
      all() {
        return Array.from(this._syncedDocuments.values());
      }
      /**
       * Returns the URIs of all text documents managed by this instance.
       *
       * @return the URI's of all text documents.
       */
      keys() {
        return Array.from(this._syncedDocuments.keys());
      }
      /**
       * Listens for `low level` notification on the given connection to
       * update the text documents managed by this instance.
       *
       * Please note that the connection only provides handlers not an event model. Therefore
       * listening on a connection will overwrite the following handlers on a connection:
       * `onDidOpenTextDocument`, `onDidChangeTextDocument`, `onDidCloseTextDocument`,
       * `onWillSaveTextDocument`, `onWillSaveTextDocumentWaitUntil` and `onDidSaveTextDocument`.
       *
       * Use the corresponding events on the TextDocuments instance instead.
       *
       * @param connection The connection to listen on.
       */
      listen(connection) {
        connection.__textDocumentSync = vscode_languageserver_protocol_1.TextDocumentSyncKind.Incremental;
        const disposables = [];
        disposables.push(connection.onDidOpenTextDocument((event) => {
          const td = event.textDocument;
          const document = this._configuration.create(td.uri, td.languageId, td.version, td.text);
          this._syncedDocuments.set(td.uri, document);
          const toFire = Object.freeze({ document });
          this._onDidOpen.fire(toFire);
          this._onDidChangeContent.fire(toFire);
        }));
        disposables.push(connection.onDidChangeTextDocument((event) => {
          const td = event.textDocument;
          const changes = event.contentChanges;
          if (changes.length === 0) {
            return;
          }
          const { version } = td;
          if (version === null || version === void 0) {
            throw new Error(`Received document change event for ${td.uri} without valid version identifier`);
          }
          let syncedDocument = this._syncedDocuments.get(td.uri);
          if (syncedDocument !== void 0) {
            syncedDocument = this._configuration.update(syncedDocument, changes, version);
            this._syncedDocuments.set(td.uri, syncedDocument);
            this._onDidChangeContent.fire(Object.freeze({ document: syncedDocument }));
          }
        }));
        disposables.push(connection.onDidCloseTextDocument((event) => {
          const syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0) {
            this._syncedDocuments.delete(event.textDocument.uri);
            this._onDidClose.fire(Object.freeze({ document: syncedDocument }));
          }
        }));
        disposables.push(connection.onWillSaveTextDocument((event) => {
          const syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0) {
            this._onWillSave.fire(Object.freeze({ document: syncedDocument, reason: event.reason }));
          }
        }));
        disposables.push(connection.onWillSaveTextDocumentWaitUntil((event, token) => {
          const syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0 && this._willSaveWaitUntil) {
            return this._willSaveWaitUntil(Object.freeze({ document: syncedDocument, reason: event.reason }), token);
          } else {
            return [];
          }
        }));
        disposables.push(connection.onDidSaveTextDocument((event) => {
          const syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
          if (syncedDocument !== void 0) {
            this._onDidSave.fire(Object.freeze({ document: syncedDocument }));
          }
        }));
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          disposables.forEach((disposable) => disposable.dispose());
        });
      }
    };
    exports.TextDocuments = TextDocuments;
  }
});

// node_modules/vscode-languageserver/lib/common/notebook.js
var require_notebook = __commonJS({
  "node_modules/vscode-languageserver/lib/common/notebook.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NotebookDocuments = exports.NotebookSyncFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var textDocuments_1 = require_textDocuments();
    var NotebookSyncFeature = (Base) => {
      return class extends Base {
        get synchronization() {
          return {
            onDidOpenNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidOpenNotebookDocumentNotification.type, (params) => {
                return handler(params);
              });
            },
            onDidChangeNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeNotebookDocumentNotification.type, (params) => {
                return handler(params);
              });
            },
            onDidSaveNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidSaveNotebookDocumentNotification.type, (params) => {
                return handler(params);
              });
            },
            onDidCloseNotebookDocument: (handler) => {
              return this.connection.onNotification(vscode_languageserver_protocol_1.DidCloseNotebookDocumentNotification.type, (params) => {
                return handler(params);
              });
            }
          };
        }
      };
    };
    exports.NotebookSyncFeature = NotebookSyncFeature;
    var CellTextDocumentConnection = class _CellTextDocumentConnection {
      static NULL_DISPOSE = Object.freeze({ dispose: () => {
      } });
      openHandler;
      changeHandler;
      closeHandler;
      onDidOpenTextDocument(handler) {
        this.openHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          this.openHandler = void 0;
        });
      }
      openTextDocument(params) {
        return this.openHandler && this.openHandler(params);
      }
      onDidChangeTextDocument(handler) {
        this.changeHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          this.changeHandler = handler;
        });
      }
      changeTextDocument(params) {
        return this.changeHandler && this.changeHandler(params);
      }
      onDidCloseTextDocument(handler) {
        this.closeHandler = handler;
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          this.closeHandler = void 0;
        });
      }
      closeTextDocument(params) {
        return this.closeHandler && this.closeHandler(params);
      }
      onWillSaveTextDocument() {
        return _CellTextDocumentConnection.NULL_DISPOSE;
      }
      onWillSaveTextDocumentWaitUntil() {
        return _CellTextDocumentConnection.NULL_DISPOSE;
      }
      onDidSaveTextDocument() {
        return _CellTextDocumentConnection.NULL_DISPOSE;
      }
    };
    var NotebookDocuments = class {
      notebookDocuments;
      notebookCellMap;
      _onDidOpen;
      _onDidSave;
      _onDidChange;
      _onDidClose;
      _cellTextDocuments;
      constructor(configurationOrTextDocuments) {
        if (configurationOrTextDocuments instanceof textDocuments_1.TextDocuments) {
          this._cellTextDocuments = configurationOrTextDocuments;
        } else {
          this._cellTextDocuments = new textDocuments_1.TextDocuments(configurationOrTextDocuments);
        }
        this.notebookDocuments = /* @__PURE__ */ new Map();
        this.notebookCellMap = /* @__PURE__ */ new Map();
        this._onDidOpen = new vscode_languageserver_protocol_1.Emitter();
        this._onDidChange = new vscode_languageserver_protocol_1.Emitter();
        this._onDidSave = new vscode_languageserver_protocol_1.Emitter();
        this._onDidClose = new vscode_languageserver_protocol_1.Emitter();
      }
      get cellTextDocuments() {
        return this._cellTextDocuments;
      }
      getCellTextDocument(cell) {
        return this._cellTextDocuments.get(cell.document);
      }
      getNotebookDocument(uri) {
        return this.notebookDocuments.get(uri);
      }
      getNotebookCell(uri) {
        const value = this.notebookCellMap.get(uri);
        return value && value[0];
      }
      findNotebookDocumentForCell(cell) {
        const key = typeof cell === "string" ? cell : cell.document;
        const value = this.notebookCellMap.get(key);
        return value && value[1];
      }
      get onDidOpen() {
        return this._onDidOpen.event;
      }
      get onDidSave() {
        return this._onDidSave.event;
      }
      get onDidChange() {
        return this._onDidChange.event;
      }
      get onDidClose() {
        return this._onDidClose.event;
      }
      /**
       * Listens for `low level` notification on the given connection to
       * update the notebook documents managed by this instance.
       *
       * Please note that the connection only provides handlers not an event model. Therefore
       * listening on a connection will overwrite the following handlers on a connection:
       * `onDidOpenNotebookDocument`, `onDidChangeNotebookDocument`, `onDidSaveNotebookDocument`,
       *  and `onDidCloseNotebookDocument`.
       *
       * @param connection The connection to listen on.
       */
      listen(connection) {
        const cellTextDocumentConnection = new CellTextDocumentConnection();
        const disposables = [];
        disposables.push(this.cellTextDocuments.listen(cellTextDocumentConnection));
        disposables.push(connection.notebooks.synchronization.onDidOpenNotebookDocument(async (params) => {
          this.notebookDocuments.set(params.notebookDocument.uri, params.notebookDocument);
          for (const cellTextDocument of params.cellTextDocuments) {
            await cellTextDocumentConnection.openTextDocument({ textDocument: cellTextDocument });
          }
          this.updateCellMap(params.notebookDocument);
          this._onDidOpen.fire(params.notebookDocument);
        }));
        disposables.push(connection.notebooks.synchronization.onDidChangeNotebookDocument(async (params) => {
          const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
          if (notebookDocument === void 0) {
            return;
          }
          notebookDocument.version = params.notebookDocument.version;
          const oldMetadata = notebookDocument.metadata;
          let metadataChanged = false;
          const change = params.change;
          if (change.metadata !== void 0) {
            metadataChanged = true;
            notebookDocument.metadata = change.metadata;
          }
          const opened = [];
          const closed = [];
          const data = [];
          const text = [];
          if (change.cells !== void 0) {
            const changedCells = change.cells;
            if (changedCells.structure !== void 0) {
              const array = changedCells.structure.array;
              notebookDocument.cells.splice(array.start, array.deleteCount, ...array.cells !== void 0 ? array.cells : []);
              if (changedCells.structure.didOpen !== void 0) {
                for (const open of changedCells.structure.didOpen) {
                  await cellTextDocumentConnection.openTextDocument({ textDocument: open });
                  opened.push(open.uri);
                }
              }
              if (changedCells.structure.didClose) {
                for (const close of changedCells.structure.didClose) {
                  await cellTextDocumentConnection.closeTextDocument({ textDocument: close });
                  closed.push(close.uri);
                }
              }
            }
            if (changedCells.data !== void 0) {
              const cellUpdates = new Map(changedCells.data.map((cell) => [cell.document, cell]));
              for (let i = 0; i <= notebookDocument.cells.length; i++) {
                const change2 = cellUpdates.get(notebookDocument.cells[i].document);
                if (change2 !== void 0) {
                  const old = notebookDocument.cells.splice(i, 1, change2);
                  data.push({ old: old[0], new: change2 });
                  cellUpdates.delete(change2.document);
                  if (cellUpdates.size === 0) {
                    break;
                  }
                }
              }
            }
            if (changedCells.textContent !== void 0) {
              for (const cellTextDocument of changedCells.textContent) {
                await cellTextDocumentConnection.changeTextDocument({ textDocument: cellTextDocument.document, contentChanges: cellTextDocument.changes });
                text.push(cellTextDocument.document.uri);
              }
            }
          }
          this.updateCellMap(notebookDocument);
          const changeEvent = { notebookDocument };
          if (metadataChanged) {
            changeEvent.metadata = { old: oldMetadata, new: notebookDocument.metadata };
          }
          const added = [];
          for (const open of opened) {
            added.push(this.getNotebookCell(open));
          }
          const removed = [];
          for (const close of closed) {
            removed.push(this.getNotebookCell(close));
          }
          const textContent = [];
          for (const change2 of text) {
            textContent.push(this.getNotebookCell(change2));
          }
          if (added.length > 0 || removed.length > 0 || data.length > 0 || textContent.length > 0) {
            changeEvent.cells = { added, removed, changed: { data, textContent } };
          }
          if (changeEvent.metadata !== void 0 || changeEvent.cells !== void 0) {
            this._onDidChange.fire(changeEvent);
          }
        }));
        disposables.push(connection.notebooks.synchronization.onDidSaveNotebookDocument((params) => {
          const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
          if (notebookDocument === void 0) {
            return;
          }
          this._onDidSave.fire(notebookDocument);
        }));
        disposables.push(connection.notebooks.synchronization.onDidCloseNotebookDocument(async (params) => {
          const notebookDocument = this.notebookDocuments.get(params.notebookDocument.uri);
          if (notebookDocument === void 0) {
            return;
          }
          this._onDidClose.fire(notebookDocument);
          for (const cellTextDocument of params.cellTextDocuments) {
            await cellTextDocumentConnection.closeTextDocument({ textDocument: cellTextDocument });
          }
          this.notebookDocuments.delete(params.notebookDocument.uri);
          for (const cell of notebookDocument.cells) {
            this.notebookCellMap.delete(cell.document);
          }
        }));
        return vscode_languageserver_protocol_1.Disposable.create(() => {
          disposables.forEach((disposable) => disposable.dispose());
        });
      }
      updateCellMap(notebookDocument) {
        for (const cell of notebookDocument.cells) {
          this.notebookCellMap.set(cell.document, [cell, notebookDocument]);
        }
      }
    };
    exports.NotebookDocuments = NotebookDocuments;
  }
});

// node_modules/vscode-languageserver/lib/common/utils/is.js
var require_is3 = __commonJS({
  "node_modules/vscode-languageserver/lib/common/utils/is.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boolean = boolean;
    exports.string = string;
    exports.number = number;
    exports.error = error;
    exports.func = func;
    exports.array = array;
    exports.stringArray = stringArray;
    exports.typedArray = typedArray;
    exports.thenable = thenable;
    function boolean(value) {
      return value === true || value === false;
    }
    function string(value) {
      return typeof value === "string" || value instanceof String;
    }
    function number(value) {
      return typeof value === "number" || value instanceof Number;
    }
    function error(value) {
      return value instanceof Error;
    }
    function func(value) {
      return typeof value === "function";
    }
    function array(value) {
      return Array.isArray(value);
    }
    function stringArray(value) {
      return array(value) && value.every((elem) => string(elem));
    }
    function typedArray(value, check) {
      return Array.isArray(value) && value.every(check);
    }
    function thenable(value) {
      return value && func(value.then);
    }
  }
});

// node_modules/vscode-languageserver/lib/common/configuration.js
var require_configuration = __commonJS({
  "node_modules/vscode-languageserver/lib/common/configuration.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConfigurationFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var Is2 = __importStar(require_is3());
    var ConfigurationFeature = (Base) => {
      return class extends Base {
        getConfiguration(arg) {
          if (!arg) {
            return this._getConfiguration({});
          } else if (Is2.string(arg)) {
            return this._getConfiguration({ section: arg });
          } else {
            return this._getConfiguration(arg);
          }
        }
        _getConfiguration(arg) {
          const params = {
            items: Array.isArray(arg) ? arg : [arg]
          };
          return this.connection.sendRequest(vscode_languageserver_protocol_1.ConfigurationRequest.type, params).then((result) => {
            if (Array.isArray(result)) {
              return Array.isArray(arg) ? result : result[0];
            } else {
              return Array.isArray(arg) ? [] : null;
            }
          });
        }
      };
    };
    exports.ConfigurationFeature = ConfigurationFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/workspaceFolder.js
var require_workspaceFolder = __commonJS({
  "node_modules/vscode-languageserver/lib/common/workspaceFolder.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkspaceFoldersFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var WorkspaceFoldersFeature = (Base) => {
      return class extends Base {
        _onDidChangeWorkspaceFolders;
        _unregistration;
        _notificationIsAutoRegistered;
        constructor() {
          super();
          this._notificationIsAutoRegistered = false;
        }
        initialize(capabilities) {
          super.initialize(capabilities);
          const workspaceCapabilities = capabilities.workspace;
          if (workspaceCapabilities && workspaceCapabilities.workspaceFolders) {
            this._onDidChangeWorkspaceFolders = new vscode_languageserver_protocol_1.Emitter();
            this.connection.onNotification(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type, (params) => {
              this._onDidChangeWorkspaceFolders.fire(params.event);
            });
          }
        }
        fillServerCapabilities(capabilities) {
          super.fillServerCapabilities(capabilities);
          const changeNotifications = capabilities.workspace?.workspaceFolders?.changeNotifications;
          this._notificationIsAutoRegistered = changeNotifications === true || typeof changeNotifications === "string";
        }
        getWorkspaceFolders() {
          return this.connection.sendRequest(vscode_languageserver_protocol_1.WorkspaceFoldersRequest.type);
        }
        get onDidChangeWorkspaceFolders() {
          if (!this._onDidChangeWorkspaceFolders) {
            throw new Error("Client doesn't support sending workspace folder change events.");
          }
          if (!this._notificationIsAutoRegistered && !this._unregistration) {
            this._unregistration = this.connection.client.register(vscode_languageserver_protocol_1.DidChangeWorkspaceFoldersNotification.type);
          }
          return this._onDidChangeWorkspaceFolders.event;
        }
      };
    };
    exports.WorkspaceFoldersFeature = WorkspaceFoldersFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/callHierarchy.js
var require_callHierarchy = __commonJS({
  "node_modules/vscode-languageserver/lib/common/callHierarchy.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CallHierarchyFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var CallHierarchyFeature = (Base) => {
      return class extends Base {
        get callHierarchy() {
          return {
            onPrepare: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.CallHierarchyPrepareRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
              });
            },
            onIncomingCalls: (handler) => {
              const type = vscode_languageserver_protocol_1.CallHierarchyIncomingCallsRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onOutgoingCalls: (handler) => {
              const type = vscode_languageserver_protocol_1.CallHierarchyOutgoingCallsRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports.CallHierarchyFeature = CallHierarchyFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/showDocument.js
var require_showDocument = __commonJS({
  "node_modules/vscode-languageserver/lib/common/showDocument.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShowDocumentFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var ShowDocumentFeature = (Base) => {
      return class extends Base {
        showDocument(params) {
          return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowDocumentRequest.type, params);
        }
      };
    };
    exports.ShowDocumentFeature = ShowDocumentFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/fileOperations.js
var require_fileOperations = __commonJS({
  "node_modules/vscode-languageserver/lib/common/fileOperations.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileOperationsFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var FileOperationsFeature = (Base) => {
      return class extends Base {
        onDidCreateFiles(handler) {
          return this.connection.onNotification(vscode_languageserver_protocol_1.DidCreateFilesNotification.type, (params) => {
            return handler(params);
          });
        }
        onDidRenameFiles(handler) {
          return this.connection.onNotification(vscode_languageserver_protocol_1.DidRenameFilesNotification.type, (params) => {
            return handler(params);
          });
        }
        onDidDeleteFiles(handler) {
          return this.connection.onNotification(vscode_languageserver_protocol_1.DidDeleteFilesNotification.type, (params) => {
            return handler(params);
          });
        }
        onWillCreateFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillCreateFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
        onWillRenameFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillRenameFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
        onWillDeleteFiles(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.WillDeleteFilesRequest.type, (params, cancel) => {
            return handler(params, cancel);
          });
        }
      };
    };
    exports.FileOperationsFeature = FileOperationsFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/linkedEditingRange.js
var require_linkedEditingRange = __commonJS({
  "node_modules/vscode-languageserver/lib/common/linkedEditingRange.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinkedEditingRangeFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var LinkedEditingRangeFeature = (Base) => {
      return class extends Base {
        onLinkedEditingRange(handler) {
          return this.connection.onRequest(vscode_languageserver_protocol_1.LinkedEditingRangeRequest.type, (params, cancel) => {
            return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
          });
        }
      };
    };
    exports.LinkedEditingRangeFeature = LinkedEditingRangeFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/typeHierarchy.js
var require_typeHierarchy = __commonJS({
  "node_modules/vscode-languageserver/lib/common/typeHierarchy.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeHierarchyFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var TypeHierarchyFeature = (Base) => {
      return class extends Base {
        get typeHierarchy() {
          return {
            onPrepare: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.TypeHierarchyPrepareRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), void 0);
              });
            },
            onSupertypes: (handler) => {
              const type = vscode_languageserver_protocol_1.TypeHierarchySupertypesRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            },
            onSubtypes: (handler) => {
              const type = vscode_languageserver_protocol_1.TypeHierarchySubtypesRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports.TypeHierarchyFeature = TypeHierarchyFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/inlineValue.js
var require_inlineValue = __commonJS({
  "node_modules/vscode-languageserver/lib/common/inlineValue.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InlineValueFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var InlineValueFeature = (Base) => {
      return class extends Base {
        get inlineValue() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.InlineValueRefreshRequest.type);
            },
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlineValueRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params));
              });
            }
          };
        }
      };
    };
    exports.InlineValueFeature = InlineValueFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/foldingRange.js
var require_foldingRange = __commonJS({
  "node_modules/vscode-languageserver/lib/common/foldingRange.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FoldingRangeFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var FoldingRangeFeature = (Base) => {
      return class extends Base {
        get foldingRange() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.FoldingRangeRefreshRequest.type);
            },
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.FoldingRangeRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports.FoldingRangeFeature = FoldingRangeFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/inlayHint.js
var require_inlayHint = __commonJS({
  "node_modules/vscode-languageserver/lib/common/inlayHint.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InlayHintFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var InlayHintFeature = (Base) => {
      return class extends Base {
        get inlayHint() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.InlayHintRefreshRequest.type);
            },
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlayHintRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params));
              });
            },
            resolve: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlayHintResolveRequest.type, (params, cancel) => {
                return handler(params, cancel);
              });
            }
          };
        }
      };
    };
    exports.InlayHintFeature = InlayHintFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/diagnostic.js
var require_diagnostic = __commonJS({
  "node_modules/vscode-languageserver/lib/common/diagnostic.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiagnosticFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var DiagnosticFeature = (Base) => {
      return class extends Base {
        get diagnostics() {
          return {
            refresh: () => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.DiagnosticRefreshRequest.type);
            },
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.DocumentDiagnosticRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(vscode_languageserver_protocol_1.DocumentDiagnosticRequest.partialResult, params));
              });
            },
            onWorkspace: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(vscode_languageserver_protocol_1.WorkspaceDiagnosticRequest.partialResult, params));
              });
            }
          };
        }
      };
    };
    exports.DiagnosticFeature = DiagnosticFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/moniker.js
var require_moniker = __commonJS({
  "node_modules/vscode-languageserver/lib/common/moniker.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MonikerFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var MonikerFeature = (Base) => {
      return class extends Base {
        get moniker() {
          return {
            on: (handler) => {
              const type = vscode_languageserver_protocol_1.MonikerRequest.type;
              return this.connection.onRequest(type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params), this.attachPartialResultProgress(type, params));
              });
            }
          };
        }
      };
    };
    exports.MonikerFeature = MonikerFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/inlineCompletion.js
var require_inlineCompletion = __commonJS({
  "node_modules/vscode-languageserver/lib/common/inlineCompletion.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InlineCompletionFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var InlineCompletionFeature = (Base) => {
      return class extends Base {
        get inlineCompletion() {
          return {
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.InlineCompletionRequest.type, (params, cancel) => {
                return handler(params, cancel, this.attachWorkDoneProgress(params));
              });
            }
          };
        }
      };
    };
    exports.InlineCompletionFeature = InlineCompletionFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/textDocumentContent.js
var require_textDocumentContent = __commonJS({
  "node_modules/vscode-languageserver/lib/common/textDocumentContent.js"(exports) {
    "use strict";
    init_define_process_env();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextDocumentContentFeature = void 0;
    var vscode_languageserver_protocol_1 = require_api2();
    var TextDocumentContentFeature = (Base) => {
      return class extends Base {
        get textDocumentContent() {
          return {
            refresh: (uri) => {
              return this.connection.sendRequest(vscode_languageserver_protocol_1.TextDocumentContentRefreshRequest.type, { uri });
            },
            on: (handler) => {
              return this.connection.onRequest(vscode_languageserver_protocol_1.TextDocumentContentRequest.type, (params, cancel) => {
                return handler(params, cancel);
              });
            }
          };
        }
      };
    };
    exports.TextDocumentContentFeature = TextDocumentContentFeature;
  }
});

// node_modules/vscode-languageserver/lib/common/server.js
var require_server = __commonJS({
  "node_modules/vscode-languageserver/lib/common/server.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._NotebooksImpl = exports._LanguagesImpl = exports.BulkUnregistration = exports.BulkRegistration = exports.ErrorMessageTracker = void 0;
    exports.combineConsoleFeatures = combineConsoleFeatures;
    exports.combineTelemetryFeatures = combineTelemetryFeatures;
    exports.combineTracerFeatures = combineTracerFeatures;
    exports.combineClientFeatures = combineClientFeatures;
    exports.combineWindowFeatures = combineWindowFeatures;
    exports.combineWorkspaceFeatures = combineWorkspaceFeatures;
    exports.combineLanguagesFeatures = combineLanguagesFeatures;
    exports.combineNotebooksFeatures = combineNotebooksFeatures;
    exports.combineFeatures = combineFeatures;
    exports.createConnection = createConnection;
    var vscode_languageserver_protocol_1 = require_api2();
    var Is2 = __importStar(require_is3());
    var UUID = __importStar(require_uuid());
    var progress_1 = require_progress();
    var configuration_1 = require_configuration();
    var workspaceFolder_1 = require_workspaceFolder();
    var callHierarchy_1 = require_callHierarchy();
    var semanticTokens_1 = require_semanticTokens();
    var showDocument_1 = require_showDocument();
    var fileOperations_1 = require_fileOperations();
    var linkedEditingRange_1 = require_linkedEditingRange();
    var typeHierarchy_1 = require_typeHierarchy();
    var inlineValue_1 = require_inlineValue();
    var foldingRange_1 = require_foldingRange();
    var inlayHint_1 = require_inlayHint();
    var diagnostic_1 = require_diagnostic();
    var notebook_1 = require_notebook();
    var moniker_1 = require_moniker();
    var inlineCompletion_1 = require_inlineCompletion();
    var textDocumentContent_1 = require_textDocumentContent();
    function null2Undefined(value) {
      if (value === null) {
        return void 0;
      }
      return value;
    }
    var ErrorMessageTracker = class {
      _messages;
      constructor() {
        this._messages = /* @__PURE__ */ Object.create(null);
      }
      /**
       * Add a message to the tracker.
       *
       * @param message The message to add.
       */
      add(message) {
        let count = this._messages[message];
        if (!count) {
          count = 0;
        }
        count++;
        this._messages[message] = count;
      }
      /**
       * Send all tracked messages to the connection's window.
       *
       * @param connection The connection established between client and server.
       */
      sendErrors(connection) {
        Object.keys(this._messages).forEach((message) => {
          connection.window.showErrorMessage(message);
        });
      }
    };
    exports.ErrorMessageTracker = ErrorMessageTracker;
    var RemoteConsoleImpl = class {
      _rawConnection;
      _connection;
      constructor() {
      }
      rawAttach(connection) {
        this._rawConnection = connection;
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      fillServerCapabilities(_capabilities) {
      }
      initialize(_capabilities) {
      }
      error(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Error, message);
      }
      warn(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Warning, message);
      }
      info(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Info, message);
      }
      log(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Log, message);
      }
      debug(message) {
        this.send(vscode_languageserver_protocol_1.MessageType.Debug, message);
      }
      send(type, message) {
        if (this._rawConnection) {
          this._rawConnection.sendNotification(vscode_languageserver_protocol_1.LogMessageNotification.type, { type, message }).catch(() => {
            (0, vscode_languageserver_protocol_1.RAL)().console.error(`Sending log message failed`);
          });
        }
      }
    };
    var _RemoteWindowImpl = class {
      _connection;
      constructor() {
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      showErrorMessage(message, ...actions) {
        const params = { type: vscode_languageserver_protocol_1.MessageType.Error, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
      showWarningMessage(message, ...actions) {
        const params = { type: vscode_languageserver_protocol_1.MessageType.Warning, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
      showInformationMessage(message, ...actions) {
        const params = { type: vscode_languageserver_protocol_1.MessageType.Info, message, actions };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ShowMessageRequest.type, params).then(null2Undefined);
      }
    };
    var RemoteWindowImpl = (0, showDocument_1.ShowDocumentFeature)((0, progress_1.ProgressFeature)(_RemoteWindowImpl));
    var BulkRegistration;
    (function(BulkRegistration2) {
      function create() {
        return new BulkRegistrationImpl();
      }
      BulkRegistration2.create = create;
    })(BulkRegistration || (exports.BulkRegistration = BulkRegistration = {}));
    var BulkRegistrationImpl = class {
      _registrations = [];
      _registered = /* @__PURE__ */ new Set();
      add(type, registerOptions) {
        const method = Is2.string(type) ? type : type.method;
        if (this._registered.has(method)) {
          throw new Error(`${method} is already added to this registration`);
        }
        const id = UUID.generateUuid();
        this._registrations.push({
          id,
          method,
          registerOptions: registerOptions || {}
        });
        this._registered.add(method);
      }
      asRegistrationParams() {
        return {
          registrations: this._registrations
        };
      }
    };
    var BulkUnregistration;
    (function(BulkUnregistration2) {
      function create() {
        return new BulkUnregistrationImpl(void 0, []);
      }
      BulkUnregistration2.create = create;
    })(BulkUnregistration || (exports.BulkUnregistration = BulkUnregistration = {}));
    var BulkUnregistrationImpl = class {
      _connection;
      _unregistrations = /* @__PURE__ */ new Map();
      constructor(_connection, unregistrations) {
        this._connection = _connection;
        unregistrations.forEach((unregistration) => {
          this._unregistrations.set(unregistration.method, unregistration);
        });
      }
      get isAttached() {
        return !!this._connection;
      }
      attach(connection) {
        this._connection = connection;
      }
      add(unregistration) {
        this._unregistrations.set(unregistration.method, unregistration);
      }
      dispose() {
        const unregistrations = [];
        for (const unregistration of this._unregistrations.values()) {
          unregistrations.push(unregistration);
        }
        const params = {
          unregisterations: unregistrations
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).catch(() => {
          this._connection.console.info(`Bulk unregistration failed.`);
        });
      }
      disposeSingle(arg) {
        const method = Is2.string(arg) ? arg : arg.method;
        const unregistration = this._unregistrations.get(method);
        if (!unregistration) {
          return false;
        }
        const params = {
          unregisterations: [unregistration]
        };
        this._connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).then(() => {
          this._unregistrations.delete(method);
        }, (_error) => {
          this._connection.console.info(`Un-registering request handler for ${unregistration.id} failed.`);
        });
        return true;
      }
    };
    var RemoteClientImpl = class {
      _connection;
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      register(typeOrRegistrations, registerOptionsOrType, registerOptions) {
        if (typeOrRegistrations instanceof BulkRegistrationImpl) {
          return this.registerMany(typeOrRegistrations);
        } else if (typeOrRegistrations instanceof BulkUnregistrationImpl) {
          return this.registerSingle1(typeOrRegistrations, registerOptionsOrType, registerOptions);
        } else {
          return this.registerSingle2(typeOrRegistrations, registerOptionsOrType);
        }
      }
      registerSingle1(unregistration, type, registerOptions) {
        const method = Is2.string(type) ? type : type.method;
        const id = UUID.generateUuid();
        const params = {
          registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        if (!unregistration.isAttached) {
          unregistration.attach(this.connection);
        }
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
          unregistration.add({ id, method });
          return unregistration;
        }, (_error) => {
          this.connection.console.info(`Registering request handler for ${method} failed.`);
          return Promise.reject(_error);
        });
      }
      registerSingle2(type, registerOptions) {
        const method = Is2.string(type) ? type : type.method;
        const id = UUID.generateUuid();
        const params = {
          registrations: [{ id, method, registerOptions: registerOptions || {} }]
        };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then((_result) => {
          return vscode_languageserver_protocol_1.Disposable.create(() => {
            this.unregisterSingle(id, method).catch(() => {
              this.connection.console.info(`Un-registering capability with id ${id} failed.`);
            });
          });
        }, (_error) => {
          this.connection.console.info(`Registering request handler for ${method} failed.`);
          return Promise.reject(_error);
        });
      }
      unregisterSingle(id, method) {
        const params = {
          unregisterations: [{ id, method }]
        };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.UnregistrationRequest.type, params).catch(() => {
          this.connection.console.info(`Un-registering request handler for ${id} failed.`);
        });
      }
      registerMany(registrations) {
        const params = registrations.asRegistrationParams();
        return this.connection.sendRequest(vscode_languageserver_protocol_1.RegistrationRequest.type, params).then(() => {
          return new BulkUnregistrationImpl(this._connection, params.registrations.map((registration) => {
            return { id: registration.id, method: registration.method };
          }));
        }, (_error) => {
          this.connection.console.info(`Bulk registration failed.`);
          return Promise.reject(_error);
        });
      }
    };
    var _RemoteWorkspaceImpl = class {
      _connection;
      constructor() {
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      applyEdit(paramOrEdit) {
        function isApplyWorkspaceEditParams(value) {
          return value && !!value.edit;
        }
        const params = isApplyWorkspaceEditParams(paramOrEdit) ? paramOrEdit : { edit: paramOrEdit };
        return this.connection.sendRequest(vscode_languageserver_protocol_1.ApplyWorkspaceEditRequest.type, params);
      }
    };
    var RemoteWorkspaceImpl = (0, textDocumentContent_1.TextDocumentContentFeature)((0, fileOperations_1.FileOperationsFeature)((0, workspaceFolder_1.WorkspaceFoldersFeature)((0, configuration_1.ConfigurationFeature)(_RemoteWorkspaceImpl))));
    var TracerImpl = class {
      _trace;
      _connection;
      constructor() {
        this._trace = vscode_languageserver_protocol_1.Trace.Off;
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      set trace(value) {
        this._trace = value;
      }
      log(message, verbose) {
        if (this._trace === vscode_languageserver_protocol_1.Trace.Off) {
          return;
        }
        this.connection.sendNotification(vscode_languageserver_protocol_1.LogTraceNotification.type, {
          message,
          verbose: this._trace === vscode_languageserver_protocol_1.Trace.Verbose ? verbose : void 0
        }).catch(() => {
        });
      }
    };
    var TelemetryImpl = class {
      _connection;
      constructor() {
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      logEvent(data) {
        this.connection.sendNotification(vscode_languageserver_protocol_1.TelemetryEventNotification.type, data).catch(() => {
          this.connection.console.log(`Sending TelemetryEventNotification failed`);
        });
      }
    };
    var _LanguagesImpl = class {
      _connection;
      constructor() {
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      attachWorkDoneProgress(params) {
        return (0, progress_1.attachWorkDone)(this.connection, params);
      }
      attachPartialResultProgress(_type, params) {
        return (0, progress_1.attachPartialResult)(this.connection, params);
      }
    };
    exports._LanguagesImpl = _LanguagesImpl;
    var LanguagesImpl = (0, inlineCompletion_1.InlineCompletionFeature)((0, foldingRange_1.FoldingRangeFeature)((0, moniker_1.MonikerFeature)((0, diagnostic_1.DiagnosticFeature)((0, inlayHint_1.InlayHintFeature)((0, inlineValue_1.InlineValueFeature)((0, typeHierarchy_1.TypeHierarchyFeature)((0, linkedEditingRange_1.LinkedEditingRangeFeature)((0, semanticTokens_1.SemanticTokensFeature)((0, callHierarchy_1.CallHierarchyFeature)(_LanguagesImpl))))))))));
    var _NotebooksImpl = class {
      _connection;
      constructor() {
      }
      attach(connection) {
        this._connection = connection;
      }
      get connection() {
        if (!this._connection) {
          throw new Error("Remote is not attached to a connection yet.");
        }
        return this._connection;
      }
      initialize(_capabilities) {
      }
      fillServerCapabilities(_capabilities) {
      }
      attachWorkDoneProgress(params) {
        return (0, progress_1.attachWorkDone)(this.connection, params);
      }
      attachPartialResultProgress(_type, params) {
        return (0, progress_1.attachPartialResult)(this.connection, params);
      }
    };
    exports._NotebooksImpl = _NotebooksImpl;
    var NotebooksImpl = (0, notebook_1.NotebookSyncFeature)(_NotebooksImpl);
    function combineConsoleFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    function combineTelemetryFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    function combineTracerFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    function combineClientFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    function combineWindowFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    function combineWorkspaceFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    function combineLanguagesFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    function combineNotebooksFeatures(one, two) {
      return function(Base) {
        return two(one(Base));
      };
    }
    function combineFeatures(one, two) {
      function combine(one2, two2, func) {
        if (one2 && two2) {
          return func(one2, two2);
        } else if (one2) {
          return one2;
        } else {
          return two2;
        }
      }
      const result = {
        __brand: "features",
        console: combine(one.console, two.console, combineConsoleFeatures),
        tracer: combine(one.tracer, two.tracer, combineTracerFeatures),
        telemetry: combine(one.telemetry, two.telemetry, combineTelemetryFeatures),
        client: combine(one.client, two.client, combineClientFeatures),
        window: combine(one.window, two.window, combineWindowFeatures),
        workspace: combine(one.workspace, two.workspace, combineWorkspaceFeatures),
        languages: combine(one.languages, two.languages, combineLanguagesFeatures),
        notebooks: combine(one.notebooks, two.notebooks, combineNotebooksFeatures)
      };
      return result;
    }
    function createConnection(connectionFactory, watchDog, factories) {
      const logger = factories && factories.console ? new (factories.console(RemoteConsoleImpl))() : new RemoteConsoleImpl();
      const connection = connectionFactory(logger);
      logger.rawAttach(connection);
      const tracer = factories && factories.tracer ? new (factories.tracer(TracerImpl))() : new TracerImpl();
      const telemetry = factories && factories.telemetry ? new (factories.telemetry(TelemetryImpl))() : new TelemetryImpl();
      const client = factories && factories.client ? new (factories.client(RemoteClientImpl))() : new RemoteClientImpl();
      const remoteWindow = factories && factories.window ? new (factories.window(RemoteWindowImpl))() : new RemoteWindowImpl();
      const workspace = factories && factories.workspace ? new (factories.workspace(RemoteWorkspaceImpl))() : new RemoteWorkspaceImpl();
      const languages = factories && factories.languages ? new (factories.languages(LanguagesImpl))() : new LanguagesImpl();
      const notebooks = factories && factories.notebooks ? new (factories.notebooks(NotebooksImpl))() : new NotebooksImpl();
      const allRemotes = [logger, tracer, telemetry, client, remoteWindow, workspace, languages, notebooks];
      function asPromise(value) {
        if (value instanceof Promise) {
          return value;
        } else if (Is2.thenable(value)) {
          return new Promise((resolve, reject) => {
            value.then((resolved) => resolve(resolved), (error) => reject(error));
          });
        } else {
          return Promise.resolve(value);
        }
      }
      let shutdownHandler = void 0;
      let initializeHandler = void 0;
      let exitHandler = void 0;
      const protocolConnection = {
        listen: () => connection.listen(),
        sendRequest: (type, ...params) => connection.sendRequest(Is2.string(type) ? type : type.method, ...params),
        onRequest: (type, handler) => connection.onRequest(type, handler),
        sendNotification: (type, param) => {
          const method = Is2.string(type) ? type : type.method;
          return connection.sendNotification(method, param);
        },
        onNotification: (type, handler) => connection.onNotification(type, handler),
        onProgress: connection.onProgress,
        sendProgress: connection.sendProgress,
        onInitialize: (handler) => {
          initializeHandler = handler;
          return {
            dispose: () => {
              initializeHandler = void 0;
            }
          };
        },
        onInitialized: (handler) => connection.onNotification(vscode_languageserver_protocol_1.InitializedNotification.type, handler),
        onShutdown: (handler) => {
          shutdownHandler = handler;
          return {
            dispose: () => {
              shutdownHandler = void 0;
            }
          };
        },
        onExit: (handler) => {
          exitHandler = handler;
          return {
            dispose: () => {
              exitHandler = void 0;
            }
          };
        },
        get console() {
          return logger;
        },
        get telemetry() {
          return telemetry;
        },
        get tracer() {
          return tracer;
        },
        get client() {
          return client;
        },
        get window() {
          return remoteWindow;
        },
        get workspace() {
          return workspace;
        },
        get languages() {
          return languages;
        },
        get notebooks() {
          return notebooks;
        },
        onDidChangeConfiguration: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeConfigurationNotification.type, handler),
        onDidChangeWatchedFiles: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeWatchedFilesNotification.type, handler),
        __textDocumentSync: void 0,
        onDidOpenTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidOpenTextDocumentNotification.type, handler),
        onDidChangeTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidChangeTextDocumentNotification.type, handler),
        onDidCloseTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidCloseTextDocumentNotification.type, handler),
        onWillSaveTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.WillSaveTextDocumentNotification.type, handler),
        onWillSaveTextDocumentWaitUntil: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WillSaveTextDocumentWaitUntilRequest.type, handler),
        onDidSaveTextDocument: (handler) => connection.onNotification(vscode_languageserver_protocol_1.DidSaveTextDocumentNotification.type, handler),
        sendDiagnostics: (params) => connection.sendNotification(vscode_languageserver_protocol_1.PublishDiagnosticsNotification.type, params),
        onHover: (handler) => connection.onRequest(vscode_languageserver_protocol_1.HoverRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        onCompletion: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CompletionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onCompletionResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CompletionResolveRequest.type, handler),
        onSignatureHelp: (handler) => connection.onRequest(vscode_languageserver_protocol_1.SignatureHelpRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        onDeclaration: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DeclarationRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDefinition: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DefinitionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onTypeDefinition: (handler) => connection.onRequest(vscode_languageserver_protocol_1.TypeDefinitionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onImplementation: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ImplementationRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onReferences: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ReferencesRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDocumentHighlight: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentHighlightRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDocumentSymbol: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentSymbolRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onWorkspaceSymbol: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onWorkspaceSymbolResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.WorkspaceSymbolResolveRequest.type, handler),
        onCodeAction: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeActionRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onCodeActionResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeActionResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onCodeLens: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeLensRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onCodeLensResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.CodeLensResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        onDocumentRangeFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentRangeFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        onDocumentRangesFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentRangesFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        onDocumentOnTypeFormatting: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentOnTypeFormattingRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onRenameRequest: (handler) => connection.onRequest(vscode_languageserver_protocol_1.RenameRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        onPrepareRename: (handler) => connection.onRequest(vscode_languageserver_protocol_1.PrepareRenameRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentLinks: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentLinkRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onDocumentLinkResolve: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentLinkResolveRequest.type, (params, cancel) => {
          return handler(params, cancel);
        }),
        onDocumentColor: (handler) => connection.onRequest(vscode_languageserver_protocol_1.DocumentColorRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onColorPresentation: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ColorPresentationRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onFoldingRanges: (handler) => connection.onRequest(vscode_languageserver_protocol_1.FoldingRangeRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onSelectionRanges: (handler) => connection.onRequest(vscode_languageserver_protocol_1.SelectionRangeRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), (0, progress_1.attachPartialResult)(connection, params));
        }),
        onExecuteCommand: (handler) => connection.onRequest(vscode_languageserver_protocol_1.ExecuteCommandRequest.type, (params, cancel) => {
          return handler(params, cancel, (0, progress_1.attachWorkDone)(connection, params), void 0);
        }),
        dispose: () => connection.dispose()
      };
      for (const remote of allRemotes) {
        remote.attach(protocolConnection);
      }
      connection.onRequest(vscode_languageserver_protocol_1.InitializeRequest.type, (params) => {
        watchDog.initialize(params);
        if (Is2.string(params.trace)) {
          tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.trace);
        }
        for (const remote of allRemotes) {
          remote.initialize(params.capabilities);
        }
        if (initializeHandler) {
          const result = initializeHandler(params, new vscode_languageserver_protocol_1.CancellationTokenSource().token, (0, progress_1.attachWorkDone)(connection, params), void 0);
          return asPromise(result).then((value) => {
            if (value instanceof vscode_languageserver_protocol_1.ResponseError) {
              return value;
            }
            let result2 = value;
            if (!result2) {
              result2 = { capabilities: {} };
            }
            let capabilities = result2.capabilities;
            if (!capabilities) {
              capabilities = {};
              result2.capabilities = capabilities;
            }
            if (capabilities.textDocumentSync === void 0 || capabilities.textDocumentSync === null) {
              capabilities.textDocumentSync = Is2.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
            } else if (!Is2.number(capabilities.textDocumentSync) && !Is2.number(capabilities.textDocumentSync.change)) {
              capabilities.textDocumentSync.change = Is2.number(protocolConnection.__textDocumentSync) ? protocolConnection.__textDocumentSync : vscode_languageserver_protocol_1.TextDocumentSyncKind.None;
            }
            for (const remote of allRemotes) {
              remote.fillServerCapabilities(capabilities);
            }
            return result2;
          });
        } else {
          const result = { capabilities: { textDocumentSync: vscode_languageserver_protocol_1.TextDocumentSyncKind.None } };
          for (const remote of allRemotes) {
            remote.fillServerCapabilities(result.capabilities);
          }
          return result;
        }
      });
      connection.onRequest(vscode_languageserver_protocol_1.ShutdownRequest.type, () => {
        watchDog.shutdownReceived = true;
        if (shutdownHandler) {
          return shutdownHandler(new vscode_languageserver_protocol_1.CancellationTokenSource().token);
        } else {
          return void 0;
        }
      });
      connection.onNotification(vscode_languageserver_protocol_1.ExitNotification.type, () => {
        try {
          if (exitHandler) {
            return exitHandler();
          }
        } finally {
          if (watchDog.shutdownReceived) {
            watchDog.exit(0);
          } else {
            watchDog.exit(1);
          }
        }
      });
      connection.onNotification(vscode_languageserver_protocol_1.SetTraceNotification.type, (params) => {
        tracer.trace = vscode_languageserver_protocol_1.Trace.fromString(params.value);
      });
      return protocolConnection;
    }
  }
});

// node_modules/vscode-languageserver/lib/common/api.js
var require_api3 = __commonJS({
  "node_modules/vscode-languageserver/lib/common/api.js"(exports) {
    "use strict";
    init_define_process_env();
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProposedFeatures = exports.NotebookDocuments = exports.TextDocuments = exports.SemanticTokensBuilder = exports.WorkDoneProgressReporter = void 0;
    var semanticTokens_1 = require_semanticTokens();
    Object.defineProperty(exports, "SemanticTokensBuilder", { enumerable: true, get: function() {
      return semanticTokens_1.SemanticTokensBuilder;
    } });
    var progress_1 = require_progress();
    Object.defineProperty(exports, "WorkDoneProgressReporter", { enumerable: true, get: function() {
      return progress_1.WorkDoneProgressReporter;
    } });
    __exportStar(require_api2(), exports);
    var textDocuments_1 = require_textDocuments();
    Object.defineProperty(exports, "TextDocuments", { enumerable: true, get: function() {
      return textDocuments_1.TextDocuments;
    } });
    var notebook_1 = require_notebook();
    Object.defineProperty(exports, "NotebookDocuments", { enumerable: true, get: function() {
      return notebook_1.NotebookDocuments;
    } });
    __exportStar(require_server(), exports);
    var ProposedFeatures;
    (function(ProposedFeatures2) {
      ProposedFeatures2.all = {
        __brand: "features"
      };
    })(ProposedFeatures || (exports.ProposedFeatures = ProposedFeatures = {}));
  }
});

// node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/semver/internal/debug.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var debug = typeof process === "object" && define_process_env_default && define_process_env_default.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module.exports = debug;
  }
});

// node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "node_modules/semver/internal/constants.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/semver/internal/re.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports = module.exports = {};
    var re = exports.re = [];
    var safeRe = exports.safeRe = [];
    var src = exports.src = [];
    var safeSrc = exports.safeSrc = [];
    var t = exports.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module.exports = parseOptions;
  }
});

// node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a === b ? 0 : a < b ? -1 : 1;
      }
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/semver/classes/semver.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var isPrereleaseIdentifier = (prerelease, identifier) => {
      const identifiers = identifier.split(".");
      if (identifiers.length > prerelease.length) {
        return false;
      }
      for (let i = 0; i < identifiers.length; i++) {
        if (compareIdentifiers(prerelease[i], identifiers[i]) !== 0) {
          return false;
        }
      }
      return true;
    };
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.major < other.major) {
          return -1;
        }
        if (this.major > other.major) {
          return 1;
        }
        if (this.minor < other.minor) {
          return -1;
        }
        if (this.minor > other.minor) {
          return 1;
        }
        if (this.patch < other.patch) {
          return -1;
        }
        if (this.patch > other.patch) {
          return 1;
        }
        return 0;
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match || match[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (isPrereleaseIdentifier(this.prerelease, identifier)) {
                const prereleaseBase = this.prerelease[identifier.split(".").length];
                if (isNaN(prereleaseBase)) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module.exports = SemVer;
  }
});

// node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "node_modules/semver/internal/lrucache.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module.exports = LRUCache;
  }
});

// node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/semver/functions/compare.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module.exports = compare;
  }
});

// node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "node_modules/semver/functions/eq.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var compare = require_compare();
    var eq = (a, b, loose) => compare(a, b, loose) === 0;
    module.exports = eq;
  }
});

// node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "node_modules/semver/functions/neq.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var compare = require_compare();
    var neq = (a, b, loose) => compare(a, b, loose) !== 0;
    module.exports = neq;
  }
});

// node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "node_modules/semver/functions/gt.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module.exports = gt;
  }
});

// node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/semver/functions/gte.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module.exports = gte;
  }
});

// node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "node_modules/semver/functions/lt.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module.exports = lt;
  }
});

// node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "node_modules/semver/functions/lte.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var compare = require_compare();
    var lte = (a, b, loose) => compare(a, b, loose) <= 0;
    module.exports = lte;
  }
});

// node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "node_modules/semver/functions/cmp.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module.exports = cmp;
  }
});

// node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "node_modules/semver/classes/comparator.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var ANY = /* @__PURE__ */ Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range8(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range8(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range8 = require_range();
  }
});

// node_modules/semver/classes/range.js
var require_range = __commonJS({
  "node_modules/semver/classes/range.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var SPACE_CHARACTERS = /\s+/g;
    var Range8 = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        range = range.replace(BUILDSTRIPRE, "");
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module.exports = Range8;
    var LRU = require_lrucache();
    var cache = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      src,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
    var BUILDSTRIPRE = new RegExp(src[t.BUILD], "g");
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      comp = comp.replace(re[t.BUILD], "");
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var invalidXRangeOrder = (M, m, p) => isX(M) && !isX(m) || isX(m) && p && !isX(p);
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        if (invalidXRangeOrder(M, m, p)) {
          return comp;
        }
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "node_modules/semver/ranges/max-satisfying.js"(exports, module) {
    "use strict";
    init_define_process_env();
    var SemVer = require_semver();
    var Range8 = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range8(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module.exports = maxSatisfying;
  }
});

// node_modules/picocolors/picocolors.browser.js
var require_picocolors_browser = __commonJS({
  "node_modules/picocolors/picocolors.browser.js"(exports, module) {
    init_define_process_env();
    var x = String;
    var create = function() {
      return { isColorSupported: false, reset: x, bold: x, dim: x, italic: x, underline: x, inverse: x, hidden: x, strikethrough: x, black: x, red: x, green: x, yellow: x, blue: x, magenta: x, cyan: x, white: x, gray: x, bgBlack: x, bgRed: x, bgGreen: x, bgYellow: x, bgBlue: x, bgMagenta: x, bgCyan: x, bgWhite: x, blackBright: x, redBright: x, greenBright: x, yellowBright: x, blueBright: x, magentaBright: x, cyanBright: x, whiteBright: x, bgBlackBright: x, bgRedBright: x, bgGreenBright: x, bgYellowBright: x, bgBlueBright: x, bgMagentaBright: x, bgCyanBright: x, bgWhiteBright: x };
    };
    module.exports = create();
    module.exports.createColors = create;
  }
});

// virtual:virtual:entry.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/index.js
var src_exports = {};
__export(src_exports, {
  $decorators: () => $decorators3,
  $defaultVisibility: () => $defaultVisibility,
  $discriminator: () => $discriminator,
  $doc: () => $doc,
  $encode: () => $encode,
  $encodedName: () => $encodedName,
  $error: () => $error,
  $errorsDoc: () => $errorsDoc,
  $example: () => $example,
  $format: () => $format,
  $friendlyName: () => $friendlyName,
  $functions: () => $functions2,
  $inspectType: () => $inspectType,
  $inspectTypeName: () => $inspectTypeName,
  $invisible: () => $invisible,
  $key: () => $key,
  $maxItems: () => $maxItems,
  $maxLength: () => $maxLength,
  $maxValue: () => $maxValue,
  $maxValueExclusive: () => $maxValueExclusive,
  $minItems: () => $minItems,
  $minLength: () => $minLength,
  $minValue: () => $minValue,
  $minValueExclusive: () => $minValueExclusive,
  $opExample: () => $opExample,
  $overload: () => $overload,
  $parameterVisibility: () => $parameterVisibility,
  $pattern: () => $pattern,
  $removeVisibility: () => $removeVisibility,
  $returnTypeVisibility: () => $returnTypeVisibility,
  $returnsDoc: () => $returnsDoc,
  $secret: () => $secret,
  $service: () => $service,
  $summary: () => $summary,
  $tag: () => $tag,
  $visibility: () => $visibility,
  $withDefaultKeyVisibility: () => $withDefaultKeyVisibility,
  $withLifecycleUpdate: () => $withLifecycleUpdate,
  $withOptionalProperties: () => $withOptionalProperties,
  $withPickedProperties: () => $withPickedProperties,
  $withUpdateableProperties: () => $withUpdateableProperties,
  $withVisibility: () => $withVisibility,
  $withVisibilityFilter: () => $withVisibilityFilter,
  $withoutDefaultValues: () => $withoutDefaultValues,
  $withoutOmittedProperties: () => $withoutOmittedProperties,
  EmptyVisibilityProvider: () => EmptyVisibilityProvider,
  ListenerFlow: () => ListenerFlow,
  MANIFEST: () => MANIFEST,
  NoTarget: () => NoTarget,
  NodeHost: () => NodeHost,
  Numeric: () => Numeric,
  TypeSpecLanguageConfiguration: () => TypeSpecLanguageConfiguration,
  UnserializableValueError: () => UnserializableValueError,
  UnsupportedScalarConstructorError: () => UnsupportedScalarConstructorError,
  UsageFlags: () => UsageFlags,
  VisibilityFilter: () => VisibilityFilter,
  addService: () => addService,
  addVisibilityModifiers: () => addVisibilityModifiers,
  applyCodeFix: () => applyCodeFix,
  applyCodeFixes: () => applyCodeFixes,
  assertType: () => assertType,
  checkFormatTypeSpec: () => checkFormatTypeSpec,
  clearVisibilityModifiersForClass: () => clearVisibilityModifiersForClass,
  compile: () => compile,
  compilerAssert: () => compilerAssert,
  createAddDecoratorCodeFix: () => createAddDecoratorCodeFix,
  createDiagnosticCollector: () => createDiagnosticCollector,
  createRule: () => createLinterRule,
  createServer: () => createServer,
  createSourceFile: () => createSourceFile,
  createSuppressCodeFix: () => createSuppressCodeFix,
  createSuppressCodeFixes: () => createSuppressCodeFixes,
  createTypeSpecLibrary: () => createTypeSpecLibrary,
  defineCodeFix: () => defineCodeFix,
  defineLinter: () => defineLinter,
  definePackageFlags: () => definePackageFlags,
  defineTypeInfoProvider: () => defineTypeInfoProvider,
  discriminatedDecorator: () => discriminatedDecorator,
  emitFile: () => emitFile,
  ensureTrailingDirectorySeparator: () => ensureTrailingDirectorySeparator,
  explainStringTemplateNotSerializable: () => explainStringTemplateNotSerializable,
  fileRef: () => fileRef,
  filterModelProperties: () => filterModelProperties,
  formatDiagnostic: () => formatDiagnostic,
  formatIdentifier: () => printIdentifier,
  formatTypeSpec: () => formatTypeSpec,
  getAllTags: () => getAllTags,
  getAnyExtensionFromPath: () => getAnyExtensionFromPath,
  getAutoDecoratorTargets: () => getAutoDecoratorTargets,
  getAutoDecoratorValue: () => getAutoDecoratorValue,
  getBaseFileName: () => getBaseFileName,
  getDeprecated: () => getDeprecated,
  getDeprecationDetails: () => getDeprecationDetails,
  getDirectoryPath: () => getDirectoryPath,
  getDiscriminatedTypes: () => getDiscriminatedTypes,
  getDiscriminatedUnion: () => getDiscriminatedUnion,
  getDiscriminatedUnionFromInheritance: () => getDiscriminatedUnionFromInheritance,
  getDiscriminator: () => getDiscriminator,
  getDoc: () => getDoc,
  getDocData: () => getDocData,
  getEffectiveModelType: () => getEffectiveModelType,
  getEncode: () => getEncode,
  getEntityName: () => getEntityName,
  getErrorsDoc: () => getErrorsDoc,
  getErrorsDocData: () => getErrorsDocData,
  getExamples: () => getExamples,
  getFormat: () => getFormat,
  getFriendlyName: () => getFriendlyName,
  getKeyName: () => getKey,
  getLifecycleVisibilityEnum: () => getLifecycleVisibilityEnum,
  getLocationContext: () => getLocationContext,
  getMaxItems: () => getMaxItems,
  getMaxItemsAsNumeric: () => getMaxItemsAsNumeric,
  getMaxLength: () => getMaxLength,
  getMaxLengthAsNumeric: () => getMaxLengthAsNumeric,
  getMaxValue: () => getMaxValue,
  getMaxValueAsNumeric: () => getMaxValueAsNumeric,
  getMaxValueExclusive: () => getMaxValueExclusive,
  getMaxValueExclusiveAsNumeric: () => getMaxValueExclusiveAsNumeric,
  getMaxValueExclusiveForScalar: () => getMaxValueExclusiveForScalar,
  getMaxValueForScalar: () => getMaxValueForScalar,
  getMediaTypeHint: () => getMediaTypeHint,
  getMinItems: () => getMinItems,
  getMinItemsAsNumeric: () => getMinItemsAsNumeric,
  getMinLength: () => getMinLength,
  getMinLengthAsNumeric: () => getMinLengthAsNumeric,
  getMinValue: () => getMinValue,
  getMinValueAsNumeric: () => getMinValueAsNumeric,
  getMinValueExclusive: () => getMinValueExclusive,
  getMinValueExclusiveAsNumeric: () => getMinValueExclusiveAsNumeric,
  getMinValueExclusiveForScalar: () => getMinValueExclusiveForScalar,
  getMinValueForScalar: () => getMinValueForScalar,
  getNamespaceFullName: () => getNamespaceFullName,
  getNormalizedAbsolutePath: () => getNormalizedAbsolutePath,
  getNormalizedAbsolutePathWithoutRoot: () => getNormalizedAbsolutePathWithoutRoot,
  getNormalizedPathComponents: () => getNormalizedPathComponents,
  getOpExamples: () => getOpExamples,
  getOverloadedOperation: () => getOverloadedOperation,
  getOverloads: () => getOverloads,
  getPagingOperation: () => getPagingOperation,
  getParameterVisibilityFilter: () => getParameterVisibilityFilter,
  getPathComponents: () => getPathComponents,
  getPathFromPathComponents: () => getPathFromPathComponents,
  getPattern: () => getPattern,
  getPatternData: () => getPatternData,
  getPositionBeforeTrivia: () => getPositionBeforeTrivia,
  getProperty: () => getProperty,
  getPropertyType: () => getPropertyType,
  getRelativePathFromDirectory: () => getRelativePathFromDirectory,
  getReturnTypeVisibilityFilter: () => getReturnTypeVisibilityFilter,
  getReturnsDoc: () => getReturnsDoc,
  getReturnsDocData: () => getReturnsDocData,
  getRootLength: () => getRootLength,
  getService: () => getService,
  getSourceFileKindFromExt: () => getSourceFileKindFromExt,
  getSourceLocation: () => getSourceLocation,
  getSummary: () => getSummary,
  getTags: () => getTags,
  getTypeName: () => getTypeName,
  getVisibilityForClass: () => getVisibilityForClass,
  hasAutoDecorator: () => hasAutoDecorator,
  hasTrailingDirectorySeparator: () => hasTrailingDirectorySeparator,
  hasVisibility: () => hasVisibility,
  ignoreDiagnostics: () => ignoreDiagnostics,
  interpolatePath: () => interpolatePath,
  isAnyDirectorySeparator: () => isAnyDirectorySeparator,
  isArrayModelType: () => isArrayModelType,
  isDeclaredInNamespace: () => isDeclaredInNamespace,
  isDeclaredType: () => isDeclaredType,
  isDeprecated: () => isDeprecated,
  isErrorModel: () => isErrorModel,
  isErrorType: () => isErrorType,
  isFileRef: () => isFileRef,
  isGlobalNamespace: () => isGlobalNamespace,
  isKey: () => isKey,
  isList: () => isList,
  isNeverType: () => isNeverType,
  isNullType: () => isNullType,
  isNumeric: () => isNumeric,
  isNumericType: () => isNumericType,
  isPathAbsolute: () => isPathAbsolute,
  isRecordModelType: () => isRecordModelType,
  isSealed: () => isSealed,
  isSecret: () => isSecret,
  isService: () => isService,
  isStdNamespace: () => isStdNamespace,
  isStringType: () => isStringType,
  isTemplateDeclaration: () => isTemplateDeclaration,
  isTemplateDeclarationOrInstance: () => isTemplateDeclarationOrInstance,
  isTemplateInstance: () => isTemplateInstance,
  isType: () => isType,
  isTypeSpecValueTypeOf: () => isTypeSpecValueTypeOf,
  isUnknownType: () => isUnknownType,
  isUrl: () => isUrl,
  isValue: () => isValue,
  isVisible: () => isVisible,
  isVoidType: () => isVoidType,
  joinPaths: () => joinPaths,
  listOperationsIn: () => listOperationsIn,
  listServices: () => listServices,
  logDiagnostics: () => logDiagnostics,
  mapEventEmitterToNodeListener: () => mapEventEmitterToNodeListener,
  markDeprecated: () => markDeprecated,
  navigateProgram: () => navigateProgram,
  navigateType: () => navigateType,
  navigateTypesInNamespace: () => navigateTypesInNamespace,
  normalizePath: () => normalizePath,
  normalizeSlashes: () => normalizeSlashes,
  paramMessage: () => paramMessage,
  printIdentifier: () => printIdentifier,
  reducePathComponents: () => reducePathComponents,
  removeTrailingDirectorySeparator: () => removeTrailingDirectorySeparator,
  removeVisibilityModifiers: () => removeVisibilityModifiers,
  reportDeprecated: () => reportDeprecated,
  resetVisibilityModifiersForClass: () => resetVisibilityModifiersForClass,
  resolveCodeFix: () => resolveCodeFix,
  resolveCompilerOptions: () => resolveCompilerOptions,
  resolveEncodedName: () => resolveEncodedName,
  resolveLinterDefinition: () => resolveLinterDefinition,
  resolveModule: () => resolveModule,
  resolvePath: () => resolvePath,
  resolveUsages: () => resolveUsages,
  sanitizePathSegment: () => sanitizePathSegment,
  scopeNavigationToNamespace: () => scopeNavigationToNamespace,
  sealVisibilityModifiers: () => sealVisibilityModifiers,
  sealVisibilityModifiersForProgram: () => sealVisibilityModifiersForProgram,
  serializeValueAsJson: () => serializeValueAsJson,
  setAutoDecorator: () => setAutoDecorator,
  setMediaTypeHint: () => setMediaTypeHint,
  setTypeSpecNamespace: () => setTypeSpecNamespace,
  typespecTypeToJson: () => typespecTypeToJson,
  validateDecoratorNotOnType: () => validateDecoratorNotOnType,
  validateDecoratorUniqueOnNode: () => validateDecoratorUniqueOnNode,
  walkPropertiesInherited: () => walkPropertiesInherited
});
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/config/index.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/config/config-to-options.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/config/config-interpolation.js
init_define_process_env();
function expandConfigVariables(config, expandOptions) {
  const diagnostics = createDiagnosticCollector();
  const builtInVars = {
    "project-root": config.projectRoot,
    cwd: expandOptions.cwd
  };
  const resolvedArgsParameters = diagnostics.pipe(resolveArgs(config.parameters, expandOptions.args));
  const commonVars = {
    ...builtInVars,
    ...resolvedArgsParameters,
    env: diagnostics.pipe(resolveArgs(config.environmentVariables, expandOptions.env, true)),
    "output-dir": expandOptions.outputDir ?? config.outputDir ?? "{cwd}/tsp-output"
  };
  const resolvedCommonVars = diagnostics.pipe(resolveValues(commonVars));
  const outputDir = resolvedCommonVars["output-dir"];
  const result = { ...config, outputDir };
  if (config.options) {
    const options = {};
    for (const [name, emitterOptions] of Object.entries(config.options)) {
      const emitterVars = { ...resolvedCommonVars, "output-dir": outputDir, "emitter-name": name };
      options[name] = diagnostics.pipe(resolveValues(emitterOptions, emitterVars));
    }
    result.options = options;
  }
  return diagnostics.wrap(result);
}
function resolveArgs(declarations, args, allowUnspecified = false) {
  const unmatchedArgs = new Set(Object.keys(args ?? {}));
  const result = {};
  if (declarations !== void 0) {
    for (const [name, definition] of Object.entries(declarations)) {
      unmatchedArgs.delete(name);
      result[name] = args?.[name] ?? definition.default;
    }
  }
  if (!allowUnspecified) {
    const diagnostics = [...unmatchedArgs].map((unmatchedArg) => {
      return createDiagnostic({
        code: "config-invalid-argument",
        format: { name: unmatchedArg },
        target: NoTarget
      });
    });
    return [result, diagnostics];
  }
  return [result, []];
}
function hasNestedValues(value) {
  return value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length > 0;
}
var VariableInterpolationRegex = /{([a-zA-Z-_.]+)}/g;
function resolveValues(values, predefinedVariables = {}) {
  const diagnostics = [];
  const resolvedValues = {};
  const resolvingValues = /* @__PURE__ */ new Set();
  function resolveValuePath(obj, path) {
    return path.reduce((acc, key) => acc && typeof acc === "object" ? acc[key] : void 0, obj);
  }
  function resolveValue(keys) {
    const keyPath = keys.join(".");
    resolvingValues.add(keyPath);
    let value = resolveValuePath(values, keys);
    if (typeof value !== "string") {
      if (hasNestedValues(value)) {
        value = value;
        const resultObject = {};
        for (const [nestedKey] of Object.entries(value)) {
          resultObject[nestedKey] = resolveValue(keys.concat(nestedKey));
        }
        resolvingValues.delete(keyPath);
        return resultObject;
      }
      resolvingValues.delete(keyPath);
      return value;
    }
    const replaced = value.replace(VariableInterpolationRegex, (match, expression) => {
      const resolved = resolveExpression2(expression);
      return typeof resolved === "string" || typeof resolved === "number" || typeof resolved === "boolean" ? String(resolved) : match;
    });
    resolvingValues.delete(keyPath);
    return replaced;
  }
  function resolveExpression2(expression) {
    if (resolvingValues.has(expression)) {
      diagnostics.push(createDiagnostic({
        code: "config-circular-variable",
        target: NoTarget,
        format: { name: expression }
      }));
      return void 0;
    }
    const segments = expression.split(".");
    return resolveValue(segments) ?? resolveValuePath(predefinedVariables, segments);
  }
  for (const key of Object.keys(values)) {
    if (key in resolvedValues) {
      continue;
    }
    resolvedValues[key] = resolveValue([key]);
  }
  return [resolvedValues, diagnostics];
}

// node_modules/@typespec/compiler/dist/src/config/config-to-options.js
async function resolveCompilerOptions(host, options) {
  const diagnostics = createDiagnosticCollector();
  const entrypointStat = await doIO(host.stat, options.entrypoint, (diag) => diagnostics.add(diag), { allowFileNotFound: true });
  const configPath = options.configPath ?? (entrypointStat?.isDirectory() ? options.entrypoint : getDirectoryPath(options.entrypoint));
  const config = await loadTypeSpecConfigForPath(host, configPath, options.configPath !== void 0, options.configPath === void 0);
  config.diagnostics.forEach((x) => diagnostics.add(x));
  if (options.configPath !== void 0 && config.kind === "project") {
    diagnostics.add(createDiagnostic({
      code: "config-project-not-as-cli-config",
      target: NoTarget
    }));
  }
  if (options.configPath !== void 0 && config.kind !== "project") {
    const entrypointDir = entrypointStat?.isDirectory() ? options.entrypoint : getDirectoryPath(options.entrypoint);
    const projectConfig = await findProjectConfig(host, entrypointDir);
    if (projectConfig?.kind === "project") {
      config.entrypoint ??= projectConfig.entrypoint;
      config.features ??= projectConfig.features;
    }
  }
  const compilerOptions = diagnostics.pipe(resolveOptionsFromConfig(config, options));
  return diagnostics.wrap(compilerOptions);
}
function resolveOptionsFromConfig(config, options) {
  const cwd = normalizePath(options.cwd);
  const diagnostics = createDiagnosticCollector();
  validateConfigNames(config).forEach((x) => diagnostics.add(x));
  const configWithOverrides = {
    ...config,
    ...options.overrides,
    options: mergeOptions(config.options, options.overrides?.options)
  };
  const expandedConfig = diagnostics.pipe(expandConfigVariables(configWithOverrides, {
    cwd,
    outputDir: options.overrides?.outputDir,
    env: options.env ?? {},
    args: options.args
  }));
  validateConfigPathsAbsolute(expandedConfig).forEach((x) => diagnostics.add(x));
  const resolvedOptions = omitUndefined({
    outputDir: expandedConfig.outputDir,
    config: config.filename,
    configFile: config,
    additionalImports: expandedConfig["imports"],
    warningAsError: expandedConfig.warnAsError,
    trace: expandedConfig.trace,
    emit: expandedConfig.emit,
    options: expandedConfig.options,
    linterRuleSet: expandedConfig.linter
  });
  return diagnostics.wrap(resolvedOptions);
}
function validateConfigNames(config) {
  const diagnostics = [];
  function checkName(name) {
    if (name.includes(".")) {
      diagnostics.push(createDiagnostic({
        code: "config-invalid-name",
        format: { name },
        target: NoTarget
      }));
    }
  }
  function validateNamesRecursively(obj) {
    for (const [key, value] of Object.entries(obj ?? {})) {
      checkName(key);
      if (hasNestedObjects(value)) {
        validateNamesRecursively(value);
      }
    }
  }
  validateNamesRecursively(config.options);
  validateNamesRecursively(config.parameters);
  return diagnostics;
}
function mergeOptions(base, overrides) {
  const configuredEmitters = structuredClone(base ?? {});
  function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }
  function deepMerge(target, source) {
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key])
            Object.assign(target, { [key]: {} });
          deepMerge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return target;
  }
  for (const [emitterName, cliOptionOverride] of Object.entries(overrides ?? {})) {
    configuredEmitters[emitterName] = deepMerge(configuredEmitters[emitterName] ?? {}, cliOptionOverride);
  }
  return configuredEmitters;
}
function hasNestedObjects(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}
async function findProjectConfig(host, startDir) {
  let dir = startDir;
  while (true) {
    const config = await loadTypeSpecConfigForPath(host, dir, false, false);
    if (config.kind === "project" && config.diagnostics.length === 0) {
      return config;
    }
    const parentDir = getDirectoryPath(dir);
    if (parentDir === dir) {
      return void 0;
    }
    dir = parentDir;
  }
}

// node_modules/@typespec/compiler/dist/src/core/emitter-utils.js
init_define_process_env();
var emittedFilesPerProgramKey = /* @__PURE__ */ Symbol.for("TYPESPEC_EMITTED_FILES_PATHS");
if (globalThis[emittedFilesPerProgramKey] === void 0) {
  globalThis[emittedFilesPerProgramKey] = /* @__PURE__ */ new WeakMap();
}
function getEmittedFilesForProgram(program) {
  const existing = globalThis[emittedFilesPerProgramKey].get(program);
  if (existing)
    return existing;
  const val = [];
  globalThis[emittedFilesPerProgramKey].set(program, val);
  return val;
}
async function emitFile(program, options) {
  const outputFolder = getDirectoryPath(options.path);
  await program.host.mkdirp(outputFolder);
  const content = options.newLine && options.newLine === "crlf" ? options.content.replace(/(\r\n|\n|\r)/gm, "\r\n") : options.content;
  getEmittedFilesForProgram(program).push(options.path);
  return await program.host.writeFile(options.path, content);
}

// node_modules/@typespec/compiler/dist/src/core/file-ref.js
init_define_process_env();
var fileRef = {
  /**
   * Create a {@link FileRef} pointing to a file relative to the package root (the directory
   * containing the library's `package.json`).
   *
   * @example
   * ```ts
   * docs: fileRef.fromPackageRoot("src/rules/my-rule.md"),
   * ```
   */
  fromPackageRoot(path) {
    return { kind: "file-ref", path };
  }
};
function isFileRef(value) {
  return typeof value === "object" && value !== null && value.kind === "file-ref";
}

// node_modules/@typespec/compiler/dist/src/core/helpers/index.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/helpers/operation-utils.js
init_define_process_env();
function listOperationsIn(container, options = {}) {
  const operations = [];
  function addOperations(current) {
    if (current.kind === "Interface" && isTemplateDeclaration(current)) {
      return;
    }
    for (const op of current.operations.values()) {
      if (!isTemplateDeclarationOrInstance(op)) {
        operations.push(op);
      }
    }
    if (current.kind === "Namespace" && !(current.name === "Prototypes" && current.namespace?.name === "TypeSpec" && current.namespace.namespace?.name === "")) {
      const recursive = options.recursive ?? true;
      const children = [
        ...recursive ? current.namespaces.values() : [],
        ...current.interfaces.values()
      ];
      for (const child of children) {
        addOperations(child);
      }
    }
  }
  addOperations(container);
  return operations;
}

// node_modules/@typespec/compiler/dist/src/core/helpers/path-interpolation.js
init_define_process_env();
var VariableInterpolationRegex2 = /{([a-zA-Z-_.]+)}(\/|\.?)/g;
var UnsafePathSegmentCharsRegex = /[/\\:\0]/g;
var OnlyDotsRegex = /^\.+$/;
function sanitizePathSegment(value) {
  const sanitized = value.replace(UnsafePathSegmentCharsRegex, "_");
  return OnlyDotsRegex.test(sanitized) ? "_" : sanitized;
}
function interpolatePath(pathTemplate, predefinedVariables) {
  return pathTemplate.replace(VariableInterpolationRegex2, (match, expression, suffix) => {
    const isPathSegment = suffix === "/" || suffix === ".";
    const resolved = resolveExpression(predefinedVariables, expression);
    if (resolved) {
      return isPathSegment ? `${resolved}${suffix}` : resolved;
    }
    return "";
  });
}
function resolveExpression(predefinedVariables, expression) {
  const segments = expression.split(".");
  let resolved = predefinedVariables;
  for (const segment of segments) {
    resolved = resolved[segment];
    if (resolved === void 0) {
      return void 0;
    }
  }
  if (typeof resolved === "string") {
    return resolved;
  } else {
    return void 0;
  }
}

// node_modules/@typespec/compiler/dist/src/core/helpers/usage-resolver.js
init_define_process_env();
var UsageFlags;
(function(UsageFlags2) {
  UsageFlags2[UsageFlags2["None"] = 0] = "None";
  UsageFlags2[UsageFlags2["Input"] = 2] = "Input";
  UsageFlags2[UsageFlags2["Output"] = 4] = "Output";
})(UsageFlags || (UsageFlags = {}));
function resolveUsages(types) {
  const usages = /* @__PURE__ */ new Map();
  if (isArray(types)) {
    for (const item of types) {
      addUsagesInContainer(item, usages);
    }
  } else {
    addUsagesInContainer(types, usages);
  }
  return {
    types: [...usages.keys()],
    isUsedAs: (type, usage) => {
      const used = usages.get(type);
      if (used === void 0) {
        return false;
      }
      return Boolean(used & usage);
    }
  };
}
function addUsagesInContainer(type, usages) {
  switch (type.kind) {
    case "Namespace":
      addUsagesInNamespace(type, usages);
      break;
    case "Interface":
      addUsagesInInterface(type, usages);
      break;
    case "Operation":
      addUsagesInOperation(type, usages);
      break;
  }
}
function trackUsage(usages, type, usage) {
  const existingFlag = usages.get(type) ?? UsageFlags.None;
  usages.set(type, existingFlag | usage);
}
function addUsagesInNamespace(namespace2, usages) {
  for (const subNamespace of namespace2.namespaces.values()) {
    addUsagesInNamespace(subNamespace, usages);
  }
  for (const Interface of namespace2.interfaces.values()) {
    addUsagesInInterface(Interface, usages);
  }
  for (const operation of namespace2.operations.values()) {
    addUsagesInOperation(operation, usages);
  }
}
function addUsagesInInterface(Interface, usages) {
  for (const operation of Interface.operations.values()) {
    addUsagesInOperation(operation, usages);
  }
}
function addUsagesInOperation(operation, usages) {
  navigateReferencedTypes(operation.parameters, (type) => trackUsage(usages, type, UsageFlags.Input));
  navigateReferencedTypes(operation.returnType, (type) => trackUsage(usages, type, UsageFlags.Output));
}
function navigateReferencedTypes(type, callback, visited = /* @__PURE__ */ new Set()) {
  if (visited.has(type)) {
    return;
  }
  visited.add(type);
  switch (type.kind) {
    case "Model":
      callback(type);
      navigateIterable(type.properties, callback, visited);
      navigateIterable(type.derivedModels, callback, visited);
      type.indexer?.value && navigateReferencedTypes(type.indexer.value, callback, visited);
      break;
    case "ModelProperty":
      navigateReferencedTypes(type.type, callback, visited);
      break;
    case "Union":
      callback(type);
      navigateIterable(type.variants, callback, visited);
      break;
    case "UnionVariant":
      navigateReferencedTypes(type.type, callback, visited);
      break;
    case "Enum":
    case "Tuple":
      callback(type);
      break;
  }
}
function navigateIterable(map, callback, visited = /* @__PURE__ */ new Set()) {
  for (const type of map.values()) {
    navigateReferencedTypes(type, callback, visited);
  }
}

// node_modules/@typespec/compiler/dist/src/core/library.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/diagnostic-code.js
init_define_process_env();
function getPackageShortName(name, alias) {
  if (alias !== void 0 && alias !== "") {
    return alias;
  }
  const typespecScope = /^@typespec\/(.+)$/.exec(name);
  if (typespecScope) {
    return typespecScope[1];
  }
  const scopedTypespecPrefix = /^@[^/]+\/typespec-(.+)$/.exec(name);
  if (scopedTypespecPrefix) {
    return scopedTypespecPrefix[1];
  }
  const unscopedTypespecPrefix = /^typespec-(.+)$/.exec(name);
  if (unscopedTypespecPrefix) {
    return unscopedTypespecPrefix[1];
  }
  return void 0;
}
function formatShortNameCandidates(candidates) {
  return candidates.map((name) => `"${name}"`).join(", ");
}
var libraryAliasPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function isValidLibraryAlias(alias) {
  return libraryAliasPattern.test(alias);
}
function createDiagnosticCodeResolver(libraries) {
  const shortToNames = /* @__PURE__ */ new Map();
  const fullNames = [];
  for (const lib of libraries) {
    fullNames.push(lib.name);
    const short = getPackageShortName(lib.name, lib.alias);
    if (short !== void 0) {
      const existing = shortToNames.get(short);
      if (existing) {
        existing.push(lib.name);
      } else {
        shortToNames.set(short, [lib.name]);
      }
    }
  }
  const shortToFull = /* @__PURE__ */ new Map();
  const ambiguousShortNames = /* @__PURE__ */ new Map();
  for (const [short, names] of shortToNames) {
    if (names.length === 1) {
      shortToFull.set(short, names[0]);
    } else {
      ambiguousShortNames.set(short, names);
    }
  }
  const sortedFullNames = [...fullNames].sort((a, b) => b.length - a.length);
  function matchFullPackage(code) {
    for (const name of sortedFullNames) {
      if (code.startsWith(`${name}/`)) {
        return name;
      }
    }
    return void 0;
  }
  return {
    resolveCode(code) {
      if (matchFullPackage(code) !== void 0) {
        return code;
      }
      const separator = code.indexOf("/");
      if (separator === -1) {
        return code;
      }
      const shortName = code.slice(0, separator);
      const rest = code.slice(separator + 1);
      const fullName = shortToFull.get(shortName);
      if (fullName !== void 0) {
        return `${fullName}/${rest}`;
      }
      return code;
    },
    getAmbiguousShortName(code) {
      if (matchFullPackage(code) !== void 0) {
        return void 0;
      }
      const separator = code.indexOf("/");
      if (separator === -1) {
        return void 0;
      }
      const shortName = code.slice(0, separator);
      const candidates = ambiguousShortNames.get(shortName);
      if (candidates === void 0) {
        return void 0;
      }
      return { shortName, candidates };
    }
  };
}

// node_modules/@typespec/compiler/dist/src/core/library.js
var globalLibraryUrlsLoadedSym = /* @__PURE__ */ Symbol.for("TYPESPEC_LIBRARY_URLS_LOADED");
if (globalThis[globalLibraryUrlsLoadedSym] === void 0) {
  globalThis[globalLibraryUrlsLoadedSym] = /* @__PURE__ */ new Set();
}
var loadedUrls = globalThis[globalLibraryUrlsLoadedSym];
function getLibraryUrlsLoaded() {
  return loadedUrls;
}
function createStateKeys(libName, state) {
  const result = {};
  for (const key of Object.keys(state ?? {})) {
    result[key] = /* @__PURE__ */ Symbol.for(`${libName}/${key}`);
  }
  return result;
}
function createTypeSpecLibrary(lib) {
  let emitterOptionValidator;
  compilerAssert(lib.alias === void 0 || isValidLibraryAlias(lib.alias), `Library alias "${lib.alias}" for library "${lib.name}" is invalid. It must contain only lowercase letters, digits, and hyphens (e.g. "tcgc").`);
  const { reportDiagnostic, createDiagnostic: createDiagnostic2 } = createDiagnosticCreator(lib.diagnostics, lib.name);
  function createStateSymbol(name) {
    return /* @__PURE__ */ Symbol.for(`${lib.name}.${name}`);
  }
  const caller = getCaller();
  if (caller) {
    loadedUrls.add(caller);
  }
  return {
    ...lib,
    diagnostics: lib.diagnostics,
    stateKeys: createStateKeys(lib.name, lib.state),
    reportDiagnostic,
    createDiagnostic: createDiagnostic2,
    createStateSymbol,
    get emitterOptionValidator() {
      if (!emitterOptionValidator && lib.emitter?.options) {
        emitterOptionValidator = createJSONSchemaValidator(lib.emitter.options, {
          coerceTypes: true
        });
      }
      return emitterOptionValidator;
    },
    getTracer
  };
  function getTracer(program) {
    return program.tracer.sub(lib.name);
  }
}
function definePackageFlags(flags) {
  return flags;
}
function defineLinter(def) {
  return def;
}
function defineTypeInfoProvider(provider) {
  return provider;
}
function createLinterRule(definition) {
  compilerAssert(!definition.name.includes("/"), "Rule name cannot contain a '/'.");
  return definition;
}
function setTypeSpecNamespace(namespace2, ...functions) {
  functions.forEach((c) => c.namespace = namespace2);
}
function getCaller() {
  const caller = getCallStack()[2];
  return typeof caller === "object" && "getFileName" in caller ? caller.getFileName() : void 0;
}
function getCallStack() {
  const _prepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack2) => stack2;
  const stack = new Error().stack.slice(1);
  Error.prepareStackTrace = _prepareStackTrace;
  return stack;
}

// node_modules/@typespec/compiler/dist/src/core/linter.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/linter-rules/unused-template-parameter.rule.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/compiler-code-fixes/remove-unused-template-parameter.codefix.js
init_define_process_env();
function removeUnusedTemplateParameterCodeFix(node) {
  return defineCodeFix({
    id: "remove-unused-template-parameter",
    label: `Remove unused template parameter ${node.id.sv}`,
    fix: (context) => {
      let location = getSourceLocation(node);
      const parent = node.parent;
      if (parent) {
        const length = parent.templateParameters.length;
        if (length === 1) {
          location = {
            file: location.file,
            pos: parent.templateParametersRange.pos,
            end: parent.templateParametersRange.end
          };
        } else {
          const index = parent.templateParameters.findIndex((param) => param === node);
          if (index !== -1) {
            if (index !== parent.templateParameters.length - 1) {
              location = {
                file: location.file,
                pos: location.pos,
                end: parent.templateParameters[index + 1].pos
              };
            } else {
              location = {
                file: location.file,
                pos: parent.templateParameters[index - 1].end,
                end: location.end
              };
            }
          }
        }
      }
      return context.replaceText(location, "");
    }
  });
}

// node_modules/@typespec/compiler/dist/src/core/linter-rules/unused-template-parameter.rule.js
var builtInLinterRule_UnusedTemplateParameter = `unused-template-parameter`;
function createUnusedTemplateParameterLinterRule() {
  return createLinterRule({
    name: builtInLinterRule_UnusedTemplateParameter,
    severity: "warning",
    description: "Linter rules for unused template parameter.",
    messages: {
      default: paramMessage`Templates should use all specified parameters, and parameter '${"parameterName"}' does not exist in type '${"type"}'. Consider removing this parameter.`
    },
    create(context) {
      return {
        root: (_root) => {
          const templateParameters = context.program.checker.getTemplateParameterUsageMap().entries();
          for (const [templateParameter, used] of templateParameters) {
            if (!used) {
              context.reportDiagnostic({
                format: {
                  parameterName: templateParameter.id.sv,
                  type: templateParameter.parent?.symbol.name ?? ""
                },
                target: templateParameter,
                codefixes: [removeUnusedTemplateParameterCodeFix(templateParameter)]
              });
            }
          }
        }
      };
    }
  });
}

// node_modules/@typespec/compiler/dist/src/core/linter-rules/unused-using.rule.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/compiler-code-fixes/remove-unused-code.codefix.js
init_define_process_env();
function removeUnusedCodeCodeFix(node) {
  return defineCodeFix({
    id: "remove-unused-code",
    label: `Remove unused code`,
    fix: (context) => {
      const location = getSourceLocation(node);
      return context.replaceText(location, "");
    }
  });
}

// node_modules/@typespec/compiler/dist/src/core/linter-rules/unused-using.rule.js
var builtInLinterRule_UnusedUsing = `unused-using`;
function createUnusedUsingLinterRule() {
  return createLinterRule({
    name: builtInLinterRule_UnusedUsing,
    severity: "warning",
    description: "Linter rules for unused using statement.",
    messages: {
      default: paramMessage`'using ${"code"}' is declared but never used.`
    },
    create(context) {
      return {
        root: (program) => {
          const getUsingName = (node) => {
            if (node.kind === SyntaxKind.MemberExpression) {
              return `${getUsingName(node.base)}${node.selector}${node.id.sv}`;
            } else {
              return node.sv;
            }
          };
          program.resolver.getUnusedUsings().forEach((target) => {
            context.reportDiagnostic({
              format: { code: getUsingName(target.name) },
              target,
              codefixes: [removeUnusedCodeCodeFix(target)]
            });
          });
        }
      };
    }
  });
}

// node_modules/@typespec/compiler/dist/src/core/linter.js
function resolveLinterDefinition(libName, linter) {
  const rules = linter.rules.map((rule) => {
    return { ...rule, id: `${libName}/${rule.name}` };
  });
  if (linter.rules.length === 0 || linter.ruleSets && "all" in linter.ruleSets) {
    return {
      rules,
      ruleSets: linter.ruleSets ?? {}
    };
  } else {
    return {
      rules,
      ruleSets: {
        all: {
          enable: Object.fromEntries(rules.map((x) => [x.id, true]))
        },
        ...linter.ruleSets
      }
    };
  }
}
function createLinter(program, loadLibrary, codeResolver) {
  const tracer = program.tracer.sub("linter");
  const resolveCode2 = (ref) => codeResolver ? codeResolver.resolveCode(ref) : ref;
  const reportIfAmbiguous = (ref, diagnostics) => {
    const conflict = codeResolver?.getAmbiguousShortName(ref);
    if (conflict) {
      diagnostics.add(createDiagnostic({
        code: "ambiguous-short-name",
        format: {
          shortName: conflict.shortName,
          candidates: formatShortNameCandidates(conflict.candidates)
        },
        target: NoTarget
      }));
      return true;
    }
    return false;
  };
  const ruleMap = /* @__PURE__ */ new Map();
  const enabledRules = /* @__PURE__ */ new Map();
  const linterLibraries = /* @__PURE__ */ new Map();
  return {
    extendRuleSet,
    registerLinterLibrary,
    lint
  };
  async function extendRuleSet(ruleSet, options) {
    const origin = {
      kind: "local",
      baseDir: options?.baseDir ?? program.projectRoot,
      source: options?.source
    };
    return extendRuleSetInternal(ruleSet, origin, []);
  }
  async function extendRuleSetInternal(ruleSet, origin, fileStack) {
    tracer.trace("extend-rule-set.start", JSON.stringify(ruleSet, null, 2));
    const diagnostics = createDiagnosticCollector();
    if (ruleSet.extends) {
      for (const [index, extendingRuleSetName] of ruleSet.extends.entries()) {
        if (extendingRuleSetName.startsWith(linterRuleSetFilePrefix)) {
          if (origin.kind === "library") {
            diagnostics.add(createDiagnostic({
              code: "ruleset-file-in-library",
              format: { ruleSetName: origin.ruleSetId, ref: extendingRuleSetName },
              target: NoTarget
            }));
            continue;
          }
          const target = origin.source ? getLocationInYamlScript(origin.source.script, [
            ...origin.source.path,
            "extends",
            String(index)
          ]) : NoTarget;
          for (const diagnostic of await extendRuleSetFile(extendingRuleSetName.slice(linterRuleSetFilePrefix.length), origin.baseDir, fileStack, target)) {
            diagnostics.add(diagnostic);
          }
          continue;
        }
        if (reportIfAmbiguous(extendingRuleSetName, diagnostics)) {
          continue;
        }
        const ref = diagnostics.pipe(parseRuleReference(resolveCode2(extendingRuleSetName)));
        if (ref) {
          const library = await resolveLibrary(ref.libraryName);
          const libLinterDefinition = library?.linter;
          const extendingRuleSet = libLinterDefinition?.ruleSets?.[ref.name];
          if (extendingRuleSet) {
            for (const diagnostic of await extendRuleSetInternal(extendingRuleSet, { kind: "library", ruleSetId: `${ref.libraryName}/${ref.name}` }, fileStack)) {
              diagnostics.add(diagnostic);
            }
          } else {
            diagnostics.add(createDiagnostic({
              code: "unknown-rule-set",
              format: { libraryName: ref.libraryName, ruleSetName: ref.name },
              target: NoTarget
            }));
          }
        }
      }
    }
    const enabledInThisRuleSet = /* @__PURE__ */ new Set();
    if (ruleSet.enable) {
      for (const [rawRuleName, enableValue] of Object.entries(ruleSet.enable)) {
        if (enableValue === false) {
          continue;
        }
        if (reportIfAmbiguous(rawRuleName, diagnostics)) {
          continue;
        }
        const ruleName = resolveCode2(rawRuleName);
        const ref = diagnostics.pipe(parseRuleReference(ruleName));
        if (ref) {
          await resolveLibrary(ref.libraryName);
          const rule = ruleMap.get(ruleName);
          if (rule) {
            enabledInThisRuleSet.add(ruleName);
            const [options, optionDiagnostics] = resolveRuleOptions(rule, enableValue);
            for (const d of optionDiagnostics) {
              diagnostics.add(d);
            }
            if (!optionDiagnostics.some((d) => d.severity === "error")) {
              enabledRules.set(ruleName, { rule, options });
            }
          } else {
            diagnostics.add(createDiagnostic({
              code: "unknown-rule",
              format: { libraryName: ref.libraryName, ruleName: ref.name },
              target: NoTarget
            }));
          }
        }
      }
    }
    if (ruleSet.disable) {
      for (const rawRuleName of Object.keys(ruleSet.disable)) {
        if (reportIfAmbiguous(rawRuleName, diagnostics)) {
          continue;
        }
        const ruleName = resolveCode2(rawRuleName);
        if (enabledInThisRuleSet.has(ruleName)) {
          diagnostics.add(createDiagnostic({
            code: "rule-enabled-disabled",
            format: { ruleName },
            target: NoTarget
          }));
        }
        enabledRules.delete(ruleName);
      }
    }
    tracer.trace("extend-rule-set.end", "Rules enabled: \n" + [...enabledRules.keys()].map((x) => ` - ${x}`).join("\n"));
    return diagnostics.diagnostics;
  }
  async function lint() {
    const syncLintResult = await lintInternal(
      false
      /* asyncRules */
    );
    const asyncLintResult = await lintInternal(
      true
      /* asyncRules */
    );
    return {
      diagnostics: [...syncLintResult.diagnostics, ...asyncLintResult.diagnostics],
      stats: {
        runtime: {
          total: syncLintResult.stats.runtime.total + asyncLintResult.stats.runtime.total,
          rules: {
            ...syncLintResult.stats.runtime.rules,
            ...asyncLintResult.stats.runtime.rules
          }
        }
      }
    };
  }
  async function lintInternal(asyncRules) {
    const diagnostics = createDiagnosticCollector();
    const eventEmitter = new EventEmitter();
    const stats = {
      runtime: {
        total: 0,
        rules: {}
      }
    };
    const filteredRules = /* @__PURE__ */ new Map();
    for (const [ruleId, entry] of enabledRules) {
      if ((entry.rule.async ?? false) === asyncRules) {
        filteredRules.set(ruleId, entry);
      }
    }
    tracer.trace("lint", `Running ${asyncRules ? "async" : "sync"} linter with following rules:
` + [...filteredRules.keys()].map((x) => ` - ${x}`).join("\n"));
    const timer = perf.startTimer();
    const exitCallbacks = [];
    const EXIT_EVENT_NAME = "exit";
    const allPromises = [];
    for (const { rule, options } of filteredRules.values()) {
      const createTiming = perf.startTimer();
      const listener = rule.create(createLinterRuleContext(program, rule, options, diagnostics));
      stats.runtime.rules[rule.id] = createTiming.end();
      for (const [name, cb] of Object.entries(listener)) {
        const timedCb = (...args) => {
          const timer2 = perf.startTimer();
          const result = cb(...args);
          if (name === EXIT_EVENT_NAME && isPromise(result)) {
            compilerAssert(rule.async, `Linter rule "${rule.id}" is not marked as async but returned a promise from the "${name}" callback.`);
            const rr = result.finally(() => {
              const duration = timer2.end();
              stats.runtime.rules[rule.id] += duration;
            });
            allPromises.push(rr);
          } else {
            const duration = timer2.end();
            stats.runtime.rules[rule.id] += duration;
          }
        };
        if (name === EXIT_EVENT_NAME) {
          exitCallbacks.push(timedCb);
        } else {
          eventEmitter.on(name, timedCb);
        }
      }
    }
    navigateProgram(program, mapEventEmitterToNodeListener(eventEmitter));
    for (const cb of exitCallbacks) {
      cb(program);
    }
    if (allPromises.length > 0) {
      await Promise.all(allPromises);
    }
    stats.runtime.total = timer.end();
    return { diagnostics: diagnostics.diagnostics, stats };
  }
  async function extendRuleSetFile(path, baseDir, fileStack, target) {
    const resolvedPath = resolvePath(baseDir, path);
    tracer.trace("extend-rule-set.file", resolvedPath);
    if (fileStack.includes(resolvedPath)) {
      return [
        createDiagnostic({
          code: "circular-ruleset-file",
          format: { path: resolvedPath },
          target
        })
      ];
    }
    const [loaded, diagnostics] = await loadLinterRuleSetFile(program.host, resolvedPath, target);
    if (loaded === void 0) {
      return diagnostics;
    }
    return [
      ...diagnostics,
      ...await extendRuleSetInternal(loaded.ruleSet, {
        kind: "local",
        baseDir: getDirectoryPath(resolvedPath),
        source: { script: loaded.script, path: [] }
      }, [...fileStack, resolvedPath])
    ];
  }
  async function resolveLibrary(name) {
    const loadedLibrary = linterLibraries.get(name);
    if (loadedLibrary === void 0) {
      return registerLinterLibrary(name);
    }
    return loadedLibrary;
  }
  async function registerLinterLibrary(name, lib) {
    tracer.trace("register-library", name);
    const library = lib ?? await loadLibrary(name);
    const linter = library?.linter;
    if (linter?.rules) {
      for (const rule of linter.rules) {
        tracer.trace("register-library.rule", `Registering rule "${rule.id}" for library "${name}".`);
        if (ruleMap.has(rule.id)) {
          compilerAssert(false, `Unexpected duplicate linter rule: "${rule.id}"`);
        } else {
          ruleMap.set(rule.id, rule);
        }
      }
    }
    linterLibraries.set(name, library);
    return library;
  }
  function parseRuleReference(ref) {
    const segments = ref.split("/");
    const name = segments.pop();
    const libraryName = segments.join("/");
    if (!libraryName || !name) {
      return [
        void 0,
        [createDiagnostic({ code: "invalid-rule-ref", format: { ref }, target: NoTarget })]
      ];
    }
    return [{ libraryName, name }, []];
  }
  function resolveRuleOptions(rule, enableValue) {
    const options = enableValue === true ? rule.defaultOptions ?? {} : { ...rule.defaultOptions ?? {}, ...enableValue };
    if (rule.optionSchema && enableValue !== true) {
      const validator = createJSONSchemaValidatorForRuleOptions(rule.optionSchema);
      const validationDiagnostics = validator.validate(options, NoTarget);
      if (validationDiagnostics.length > 0) {
        const details = validationDiagnostics.map((d) => d.message).join("; ");
        return [
          options,
          [
            createDiagnostic({
              code: "invalid-rule-options",
              format: { ruleName: rule.id, details },
              target: NoTarget
            })
          ]
        ];
      }
    }
    return [options, []];
  }
}
function createJSONSchemaValidatorForRuleOptions(schema) {
  return createJSONSchemaValidator(schema, { strict: false });
}
function createLinterRuleContext(program, rule, options, diagnosticCollector) {
  return {
    program,
    options,
    reportDiagnostic
  };
  function createDiagnostic2(diag) {
    const message = rule.messages[diag.messageId ?? "default"];
    if (!message) {
      const messageString = Object.keys(rule.messages).map((x) => ` - ${x}`).join("\n");
      const messageId = String(diag.messageId);
      throw new Error(`Unexpected message id '${messageId}' for rule '${rule.name}'. Defined messages:
${messageString}`);
    }
    const messageStr = typeof message === "string" ? message : message(diag.format);
    return {
      code: rule.id,
      severity: rule.severity,
      message: messageStr,
      target: diag.target,
      url: rule.url,
      codefixes: diag.codefixes
    };
  }
  function reportDiagnostic(diag) {
    const diagnostic = createDiagnostic2(diag);
    if (diagnostic.target !== NoTarget) {
      const context = getLocationContext(program, diagnostic.target);
      if (context.type === "project") {
        diagnosticCollector.add(diagnostic);
      }
    }
  }
}
var builtInLinterLibraryName = `@typespec/compiler`;
function createBuiltInLinterLibrary() {
  const builtInLinter = resolveLinterDefinition(builtInLinterLibraryName, createBuiltInLinter());
  return { linter: builtInLinter };
}
function createBuiltInLinter() {
  const unusedUsingLinterRule = createUnusedUsingLinterRule();
  const unusedTemplateParameterLinterRule = createUnusedTemplateParameterLinterRule();
  return defineLinter({
    rules: [unusedUsingLinterRule, unusedTemplateParameterLinterRule]
  });
}

// node_modules/@typespec/compiler/dist/src/core/logger/console-sink.browser.js
init_define_process_env();
function formatLog(log) {
  return JSON.stringify(log);
}
function formatDiagnostic(log) {
  return JSON.stringify(log);
}

// node_modules/@typespec/compiler/dist/src/core/node-host.browser.js
init_define_process_env();
var NodeHost = void 0;
var CompilerPackageRoot = void 0;

// node_modules/@typespec/compiler/dist/src/manifest.js
init_define_process_env();
var manifest;
try {
  manifest = (await import("./manifest-PHE7TER7.js")).default;
} catch {
  const name = ["../dist", "manifest.js"].join("/");
  manifest = (await import(
    /* @vite-ignore */
    /* webpackIgnore: true */
    name
  )).default;
}
var typespecVersion = manifest.version;
var MANIFEST = manifest;

// node_modules/@typespec/compiler/dist/src/server/index.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/server/language-config.js
init_define_process_env();
var TypeSpecLanguageConfiguration = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"]
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    // NOTE: autoclose for double quotes may interfere with typing """
    { open: '"', close: '"' },
    { open: "/**", close: " */", notIn: ["string"] }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' }
  ],
  // From https://github.com/microsoft/vscode/blob/main/extensions/javascript/javascript-language-configuration.json
  indentationRules: {
    decreaseIndentPattern: {
      pattern: "^((?!.*?/\\*).*\\*/)?\\s*[\\}\\]].*$"
    },
    increaseIndentPattern: {
      pattern: "^((?!//).)*(\\{([^}\"'`/]*|(\\t|[ ])*//.*)|\\([^)\"'`/]*|\\[[^\\]\"'`/]*)$"
    },
    // e.g.  * ...| or */| or *-----*/|
    unIndentedLinePattern: {
      pattern: "^(\\t|[ ])*[ ]\\*[^/]*\\*/\\s*$|^(\\t|[ ])*[ ]\\*/\\s*$|^(\\t|[ ])*[ ]\\*([ ]([^\\*]|\\*(?!/))*)?$"
    }
  },
  onEnterRules: [
    {
      // e.g. /** | */
      beforeText: {
        pattern: "^\\s*/\\*\\*(?!/)([^\\*]|\\*(?!/))*$"
      },
      afterText: {
        pattern: "^\\s*\\*/$"
      },
      action: {
        indent: "indentOutdent",
        appendText: " * "
      }
    },
    {
      // e.g. /** ...|
      beforeText: {
        pattern: "^\\s*/\\*\\*(?!/)([^\\*]|\\*(?!/))*$"
      },
      action: {
        indent: "none",
        appendText: " * "
      }
    },
    {
      // e.g.  * ...|
      beforeText: {
        pattern: "^(\\t|[ ])*[ ]\\*([ ]([^\\*]|\\*(?!/))*)?$"
      },
      previousLineText: {
        pattern: "(?=^(\\s*(/\\*\\*|\\*)).*)(?=(?!(\\s*\\*/)))"
      },
      action: {
        indent: "none",
        appendText: "* "
      }
    },
    {
      // e.g.  */|
      beforeText: {
        pattern: "^(\\t|[ ])*[ ]\\*/\\s*$"
      },
      action: {
        indent: "none",
        removeText: 1
      }
    },
    {
      // e.g.  *-----*/|
      beforeText: {
        pattern: "^(\\t|[ ])*[ ]\\*[^/]*\\*/\\s*$"
      },
      action: {
        indent: "none",
        removeText: 1
      }
    }
  ]
};

// node_modules/@typespec/compiler/dist/src/server/serverlib.js
init_define_process_env();
var import_vscode_languageserver7 = __toESM(require_api3(), 1);

// node_modules/@typespec/compiler/dist/src/core/code-fixes.js
init_define_process_env();
async function applyCodeFixes(host, codeFixes) {
  if (!codeFixes.length)
    return;
  const edits = (await Promise.all(codeFixes.map((codeFix) => resolveCodeFix(codeFix)))).flat();
  await applyCodeFixEdits(host, edits);
}
async function resolveCodeFix(codeFix) {
  const context = createCodeFixContext();
  const values = await codeFix.fix(context);
  const textEdit = values === void 0 ? [] : isArray(values) ? values : [values];
  return textEdit;
}
async function applyCodeFix(host, codeFix) {
  const edits = await resolveCodeFix(codeFix);
  await applyCodeFixEdits(host, edits);
}
async function applyCodeFixEdits(host, edits) {
  const perFile = /* @__PURE__ */ new Map();
  for (const edit of edits) {
    const file = edit.file;
    if (!perFile.has(file.path)) {
      perFile.set(file.path, [file, []]);
    }
    perFile.get(file.path)[1].push(edit);
  }
  for (const [file, edits2] of perFile.values()) {
    const newContent = applyCodeFixEditsOnText(file.text, edits2);
    await host.writeFile(file.path, newContent);
  }
}
function applyCodeFixEditsOnText(content, edits) {
  const segments = [];
  let last = 0;
  for (const edit of edits.sort((a, b) => a.pos - b.pos)) {
    switch (edit.kind) {
      case "insert-text":
        segments.push(content.slice(last, edit.pos));
        segments.push(edit.text);
        last = edit.pos;
        break;
      case "replace-text":
        segments.push(content.slice(last, edit.pos));
        segments.push(edit.text);
        last = edit.end;
    }
  }
  segments.push(content.slice(last));
  return segments.join("");
}
function createCodeFixContext() {
  return {
    prependText,
    appendText,
    replaceText
  };
  function prependText(node, text) {
    return {
      kind: "insert-text",
      pos: node.pos,
      text,
      file: node.file
    };
  }
  function appendText(node, text) {
    return {
      kind: "insert-text",
      pos: "end" in node ? node.end : node.pos,
      text,
      file: node.file
    };
  }
  function replaceText(node, text) {
    return {
      kind: "replace-text",
      pos: node.pos,
      end: node.end,
      file: node.file,
      text
    };
  }
}

// node_modules/@typespec/compiler/dist/src/core/logger/index.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/logger/logger.js
init_define_process_env();
var LogLevels = {
  trace: 10,
  warning: 40,
  error: 50
};
var defaultOptions = {
  level: "trace"
};
function createLogger(options) {
  const config = { ...defaultOptions, ...options };
  function log(log2) {
    if (LogLevels[config.level] <= LogLevels[log2.level]) {
      config.sink.log(processLog(log2));
    }
  }
  return {
    log,
    trace: (message) => log({ level: "trace", message }),
    warn: (message) => log({ level: "warning", message }),
    error: (message) => log({ level: "error", message }),
    trackAction: async (message, finalMessage, action) => config.sink.trackAction ? config.sink.trackAction(message, finalMessage, action) : action({
      message: "",
      fail() {
      },
      warn() {
      },
      succeed() {
      },
      skip() {
      },
      stop() {
      },
      isStopped: false
    })
  };
}
function processLog(log) {
  return {
    level: log.level,
    code: log.code,
    message: log.message,
    sourceLocation: getSourceLocation(log.target, { locateId: true })
  };
}

// node_modules/@typespec/compiler/dist/src/core/suppression-tracking.js
init_define_process_env();
function createSuppressionTracker(sourceResolution, codeResolver) {
  const suppressions = collectSuppressions(sourceResolution);
  return {
    markUsed(directiveNode) {
      const suppression = suppressions.get(directiveNode);
      if (suppression) {
        suppression.used = true;
      }
    },
    getUnusedSuppressions() {
      const unused = [];
      for (const suppression of suppressions.values()) {
        if (suppression.used) {
          continue;
        }
        const availability = getSuppressionSourceAvailability(resolveCode(codeResolver, suppression.directive.code), sourceResolution);
        if (availability === "unavailable") {
          continue;
        }
        unused.push({ directive: suppression.directive });
      }
      return unused;
    }
  };
}
function findDuplicateSuppressions(sourceResolution) {
  const duplicates = [];
  for (const script of sourceResolution.sourceFiles.values()) {
    if (sourceResolution.locationContexts.get(script.file)?.type !== "project") {
      continue;
    }
    visit2(script);
  }
  return duplicates;
  function visit2(node) {
    const seenSuppressions = /* @__PURE__ */ new Set();
    for (const directiveNode of node.directives ?? []) {
      const directive = parseDirective(directiveNode);
      if (directive?.name !== "suppress") {
        continue;
      }
      if (seenSuppressions.has(directive.code)) {
        duplicates.push({ directive });
        continue;
      }
      seenSuppressions.add(directive.code);
    }
    visitChildren(node, visit2);
  }
}
function findAmbiguousSuppressions(sourceResolution, codeResolver) {
  const ambiguous = [];
  if (codeResolver === void 0) {
    return ambiguous;
  }
  for (const script of sourceResolution.sourceFiles.values()) {
    if (sourceResolution.locationContexts.get(script.file)?.type !== "project") {
      continue;
    }
    visit2(script);
  }
  return ambiguous;
  function visit2(node) {
    for (const directiveNode of node.directives ?? []) {
      const directive = parseDirective(directiveNode);
      if (directive?.name !== "suppress") {
        continue;
      }
      const conflict = codeResolver.getAmbiguousShortName(directive.code);
      if (conflict) {
        ambiguous.push({ directive, ...conflict });
      }
    }
    visitChildren(node, visit2);
  }
}
function collectSuppressions(sourceResolution) {
  const suppressions = /* @__PURE__ */ new Map();
  for (const script of sourceResolution.sourceFiles.values()) {
    if (sourceResolution.locationContexts.get(script.file)?.type !== "project") {
      continue;
    }
    visit2(script);
  }
  return suppressions;
  function visit2(node) {
    for (const directiveNode of node.directives ?? []) {
      const directive = parseDirective(directiveNode);
      if (directive?.name === "suppress") {
        suppressions.set(directive.node, { directive, used: false });
      }
    }
    visitChildren(node, visit2);
  }
}
function resolveCode(codeResolver, code) {
  return codeResolver ? codeResolver.resolveCode(code) : code;
}
function getSuppressionSourceAvailability(code, sourceResolution) {
  if (compilerDiagnosticCodes.has(code) || matchesDiagnosticSource(code, builtInLinterLibraryName)) {
    return "available";
  }
  for (const libraryName of sourceResolution.loadedLibraries.keys()) {
    if (matchesDiagnosticSource(code, libraryName)) {
      return "available";
    }
  }
  return "unavailable";
}
function matchesDiagnosticSource(code, source) {
  return code.startsWith(`${source}/`);
}
function findDirectiveSuppressingOnNode(code, node, codeResolver) {
  let current = node;
  do {
    if (current.directives) {
      const directive = findDirectiveSuppressingCode(code, current.directives, codeResolver);
      if (directive) {
        return directive;
      }
    }
  } while (current = current.parent);
  return void 0;
}
function findDirectiveSuppressingCode(code, directives, codeResolver) {
  const resolvedCode = resolveCode(codeResolver, code);
  for (const directiveNode of directives) {
    const directive = parseDirective(directiveNode);
    if (directive?.name === "suppress") {
      if (resolveCode(codeResolver, directive.code) === resolvedCode) {
        return directive;
      }
    }
  }
  return void 0;
}
function parseDirective(node) {
  const args = node.arguments.map((x) => {
    return x.kind === SyntaxKind.Identifier ? x.sv : x.value;
  });
  switch (node.target.sv) {
    case "suppress":
      if (typeof args[0] !== "string") {
        return void 0;
      }
      return { name: "suppress", code: args[0], message: args[1] ?? "", node };
    case "deprecated":
      if (typeof args[0] !== "string") {
        return void 0;
      }
      return { name: "deprecated", message: args[0], node };
    default:
      return void 0;
  }
}
function createRemoveUnusedSuppressionCodeFix(node) {
  return defineCodeFix({
    id: "remove-unused-suppression",
    label: "Remove unused suppression",
    fix: (context) => {
      const location = getSourceLocation(node);
      const text = location.file.text;
      const lineStart = text.lastIndexOf("\n", location.pos - 1) + 1;
      const textBeforeDirective = text.slice(lineStart, location.pos);
      if (textBeforeDirective.trim() !== "") {
        return context.replaceText(location, "");
      }
      let end = location.end;
      while (end < text.length && (text[end] === " " || text[end] === "	")) {
        end++;
      }
      if (text[end] === "\r" && text[end + 1] === "\n") {
        end += 2;
      } else if (text[end] === "\n" || text[end] === "\r") {
        end++;
      }
      return context.replaceText({ ...location, pos: lineStart, end }, "");
    }
  });
}

// node_modules/@typespec/compiler/dist/src/init/core-templates.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/init/template-source/index.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/init/template-source/default-core-templates.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/init/template-source/uri-template-source.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/init/template-source/types.js
init_define_process_env();
function validateTemplateRelativePath(path, kind) {
  const normalizedPath = normalizePath(path);
  if (isPathAbsolute(normalizedPath) || normalizedPath === ".." || normalizedPath.startsWith("../")) {
    throw new Error(`Template file ${kind} must be a relative path: "${path}"`);
  }
  return normalizedPath;
}

// node_modules/@typespec/compiler/dist/src/init/template-source/uri-template-source.js
var SCAFFOLDING_FILENAME = "scaffolding.json";
var UriTemplateSource = class _UriTemplateSource {
  #host;
  #indexLocation;
  /** Directory (path or URL) that template file paths are resolved against. */
  #baseUri;
  /**
   * @param host Host used to read the index and template files.
   * @param indexLocation Location of the index file (a path or URL). Template files are resolved
   * relative to its containing directory.
   */
  constructor(host, indexLocation) {
    this.#host = host;
    this.#indexLocation = indexLocation;
    this.#baseUri = getDirectoryPath(indexLocation);
  }
  /**
   * Create a source for a template root directory (path or URL) whose index is a
   * `scaffolding.json` at its root.
   */
  static fromDirectory(host, directory) {
    return new _UriTemplateSource(host, resolveRelativeUrlOrPath(directory + "/", SCAFFOLDING_FILENAME));
  }
  async loadIndex() {
    const indexFile = await readUrlOrPath(this.#host, this.#indexLocation);
    const templates = JSON.parse(indexFile.text);
    return { templates, indexFile, baseUri: this.#baseUri };
  }
  async readFile(relativePath) {
    const path = validateTemplateRelativePath(relativePath, "path");
    const resolvedPath = resolveRelativeUrlOrPath(this.#baseUri + "/", path);
    if (isUrl(this.#baseUri)) {
      const baseUrl = new URL(this.#baseUri + "/");
      const resolvedUrl = new URL(resolvedPath);
      if (resolvedUrl.origin !== baseUrl.origin || !resolvedUrl.pathname.startsWith(baseUrl.pathname)) {
        throw new Error(`Template file path must be a relative path: "${relativePath}"`);
      }
    } else {
      const realBasePath = normalizePath(await this.#host.realpath(this.#baseUri));
      const realFilePath = normalizePath(await this.#host.realpath(resolvedPath));
      const relativeRealPath = getRelativePathFromDirectory(realBasePath, realFilePath, false);
      if (isPathAbsolute(relativeRealPath) || relativeRealPath === ".." || relativeRealPath.startsWith("../")) {
        throw new Error(`Template file path must be a relative path: "${relativePath}"`);
      }
    }
    return readUrlOrPath(this.#host, resolvedPath);
  }
};

// node_modules/@typespec/compiler/dist/src/init/template-source/default-core-templates.js
function defaultInternalTemplateSource(host) {
  return UriTemplateSource.fromDirectory(host, resolvePath(CompilerPackageRoot, "templates"));
}

// node_modules/@typespec/compiler/dist/src/init/template-source/in-memory-template-source.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/init/core-templates.js
var typeSpecCoreTemplates;
async function getTypeSpecCoreTemplates(host) {
  if (typeSpecCoreTemplates === void 0) {
    const { templates, baseUri } = await defaultInternalTemplateSource(host).loadIndex();
    typeSpecCoreTemplates = { baseUri, templates };
  }
  return typeSpecCoreTemplates;
}

// node_modules/@typespec/compiler/dist/src/init/init-template-validate.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/init/init-template.js
init_define_process_env();
var InitTemplateLibrarySpecSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    version: { type: "string", nullable: true }
  },
  required: ["name"]
};
var InitTemplateSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    target: { type: "string", enum: ["library", "project"], default: "project", nullable: true },
    compilerVersion: { type: "string", nullable: true },
    libraries: {
      type: "array",
      items: {
        oneOf: [{ type: "string" }, InitTemplateLibrarySpecSchema]
      },
      nullable: true
    },
    emitters: {
      type: "object",
      nullable: true,
      additionalProperties: {
        type: "object",
        properties: {
          label: { type: "string", nullable: true },
          description: { type: "string", nullable: true },
          selected: { type: "boolean", nullable: true },
          options: {},
          message: { type: "string", nullable: true },
          version: { type: "string", nullable: true }
        },
        required: []
      },
      required: []
    },
    skipCompilerPackage: { type: "boolean", nullable: true },
    config: { nullable: true, ...TypeSpecConfigJsonSchema },
    inputs: {
      type: "object",
      nullable: true,
      additionalProperties: {
        type: "object",
        properties: {
          description: { type: "string" },
          type: { type: "string", enum: ["text"] },
          initialValue: {}
        },
        required: ["description", "type"]
      },
      required: []
    },
    files: {
      type: "array",
      nullable: true,
      items: {
        type: "object",
        properties: {
          path: { type: "string" },
          destination: { type: "string" },
          skipGeneration: { type: "boolean", nullable: true }
        },
        required: ["path", "destination"]
      }
    }
  },
  required: ["title", "description"]
};

// node_modules/@typespec/compiler/dist/src/init/init-template-validate.js
function validateTemplateDefinitions(template, templateName, strictValidation) {
  const validator = createJSONSchemaValidator(InitTemplateSchema, {
    strict: strictValidation
  });
  const diagnostics = validator.validate(template, templateName);
  return { valid: diagnostics.length === 0, diagnostics };
}

// node_modules/@typespec/compiler/dist/src/init/scaffold.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/package-manger/npm-registry.js
init_define_process_env();
var import_max_satisfying = __toESM(require_max_satisfying(), 1);
var NpmRegistryError = class extends Error {
};
var defaultRegistry = `https://registry.npmjs.org`;
function getNpmRegistry() {
  return (define_process_env_default["TYPESPEC_NPM_REGISTRY"] ?? defaultRegistry).replace(/\/$/, "");
}
async function fetchPackageManifest(packageName, versionOrRange) {
  const encodedPackageName = packageName.startsWith("@") ? packageName.replace("/", "%2F") : packageName;
  const url = `${getNpmRegistry()}/${encodedPackageName}`;
  let res;
  try {
    res = await fetch(url, {
      headers: { Accept: "application/vnd.npm.install-v1+json" }
    });
  } catch (error) {
    const message = error instanceof Error ? `: ${error.message}` : "";
    throw new NpmRegistryError(`Request to ${url} failed${message}`);
  }
  if (!res.ok) {
    throw new NpmRegistryError(`Request to ${url} failed with status ${res.status}.`);
  }
  let response;
  try {
    response = await res.json();
  } catch {
    throw new NpmRegistryError(`Request to ${url} returned invalid JSON.`);
  }
  const packument = parsePackument(url, response);
  const version = packument["dist-tags"][versionOrRange] ?? (0, import_max_satisfying.default)(Object.keys(packument.versions), versionOrRange);
  const manifest2 = version === null ? void 0 : packument.versions[version];
  if (manifest2 === void 0 || !isNpmPackageVersion(manifest2)) {
    throw new NpmRegistryError(`Package "${packageName}" does not have a version or tag matching "${versionOrRange}".`);
  }
  return manifest2;
}
function fetchLatestPackageManifest(packageName) {
  return fetchPackageManifest(packageName, "latest");
}
function parsePackument(url, value) {
  if (!isRecord(value) || typeof value.name !== "string" || !isStringRecord(value["dist-tags"]) || !isRecord(value.versions)) {
    throw new NpmRegistryError(`Request to ${url} returned an invalid package document.`);
  }
  return value;
}
function isNpmPackageVersion(value) {
  return isRecord(value) && typeof value.name === "string" && typeof value.version === "string" && isRecord(value.dist) && typeof value.dist.tarball === "string";
}
function isStringRecord(value) {
  return isRecord(value) && Object.values(value).every((item) => typeof item === "string");
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// node_modules/@typespec/compiler/dist/src/init/file-templating.js
init_define_process_env();

// node_modules/change-case/dist/index.js
init_define_process_env();
var SPLIT_LOWER_UPPER_RE = /([\p{Ll}\d])(\p{Lu})/gu;
var SPLIT_UPPER_UPPER_RE = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu;
var SPLIT_SEPARATE_NUMBER_RE = /(\d)\p{Ll}|(\p{L})\d/u;
var DEFAULT_STRIP_REGEXP = /[^\p{L}\d]+/giu;
var SPLIT_REPLACE_VALUE = "$1\0$2";
var DEFAULT_PREFIX_SUFFIX_CHARACTERS = "";
function split(value) {
  let result = value.trim();
  result = result.replace(SPLIT_LOWER_UPPER_RE, SPLIT_REPLACE_VALUE).replace(SPLIT_UPPER_UPPER_RE, SPLIT_REPLACE_VALUE);
  result = result.replace(DEFAULT_STRIP_REGEXP, "\0");
  let start = 0;
  let end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  if (start === end)
    return [];
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split(/\0/g);
}
function splitSeparateNumbers(value) {
  const words = split(value);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const match = SPLIT_SEPARATE_NUMBER_RE.exec(word);
    if (match) {
      const offset = match.index + (match[1] ?? match[2]).length;
      words.splice(i, 1, word.slice(0, offset), word.slice(offset));
    }
  }
  return words;
}
function noCase(input, options) {
  const [prefix, words, suffix] = splitPrefixSuffix(input, options);
  return prefix + words.map(lowerFactory(options?.locale)).join(options?.delimiter ?? " ") + suffix;
}
function camelCase(input, options) {
  const [prefix, words, suffix] = splitPrefixSuffix(input, options);
  const lower = lowerFactory(options?.locale);
  const upper = upperFactory(options?.locale);
  const transform = options?.mergeAmbiguousCharacters ? capitalCaseTransformFactory(lower, upper) : pascalCaseTransformFactory(lower, upper);
  return prefix + words.map((word, index) => {
    if (index === 0)
      return lower(word);
    return transform(word, index);
  }).join(options?.delimiter ?? "") + suffix;
}
function pascalCase(input, options) {
  const [prefix, words, suffix] = splitPrefixSuffix(input, options);
  const lower = lowerFactory(options?.locale);
  const upper = upperFactory(options?.locale);
  const transform = options?.mergeAmbiguousCharacters ? capitalCaseTransformFactory(lower, upper) : pascalCaseTransformFactory(lower, upper);
  return prefix + words.map(transform).join(options?.delimiter ?? "") + suffix;
}
function kebabCase(input, options) {
  return noCase(input, { delimiter: "-", ...options });
}
function lowerFactory(locale) {
  return locale === false ? (input) => input.toLowerCase() : (input) => input.toLocaleLowerCase(locale);
}
function upperFactory(locale) {
  return locale === false ? (input) => input.toUpperCase() : (input) => input.toLocaleUpperCase(locale);
}
function capitalCaseTransformFactory(lower, upper) {
  return (word) => `${upper(word[0])}${lower(word.slice(1))}`;
}
function pascalCaseTransformFactory(lower, upper) {
  return (word, index) => {
    const char0 = word[0];
    const initial = index > 0 && char0 >= "0" && char0 <= "9" ? "_" + char0 : upper(char0);
    return initial + lower(word.slice(1));
  };
}
function splitPrefixSuffix(input, options = {}) {
  const splitFn = options.split ?? (options.separateNumbers ? splitSeparateNumbers : split);
  const prefixCharacters = options.prefixCharacters ?? DEFAULT_PREFIX_SUFFIX_CHARACTERS;
  const suffixCharacters = options.suffixCharacters ?? DEFAULT_PREFIX_SUFFIX_CHARACTERS;
  let prefixIndex = 0;
  let suffixIndex = input.length;
  while (prefixIndex < input.length) {
    const char = input.charAt(prefixIndex);
    if (!prefixCharacters.includes(char))
      break;
    prefixIndex++;
  }
  while (suffixIndex > prefixIndex) {
    const index = suffixIndex - 1;
    const char = input.charAt(index);
    if (!suffixCharacters.includes(char))
      break;
    suffixIndex = index;
  }
  return [
    input.slice(0, prefixIndex),
    splitFn(input.slice(prefixIndex, suffixIndex)),
    input.slice(suffixIndex)
  ];
}

// node_modules/mustache/mustache.mjs
init_define_process_env();
var objectToString = Object.prototype.toString;
var isArray2 = Array.isArray || function isArrayPolyfill(object) {
  return objectToString.call(object) === "[object Array]";
};
function isFunction(object) {
  return typeof object === "function";
}
function typeStr(obj) {
  return isArray2(obj) ? "array" : typeof obj;
}
function escapeRegExp(string) {
  return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function hasProperty(obj, propName) {
  return obj != null && typeof obj === "object" && propName in obj;
}
function primitiveHasOwnProperty(primitive, propName) {
  return primitive != null && typeof primitive !== "object" && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
}
var regExpTest = RegExp.prototype.test;
function testRegExp(re, string) {
  return regExpTest.call(re, string);
}
var nonSpaceRe = /\S/;
function isWhitespace(string) {
  return !testRegExp(nonSpaceRe, string);
}
var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;"
};
function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
    return entityMap[s];
  });
}
var whiteRe = /\s*/;
var spaceRe = /\s+/;
var equalsRe = /\s*=/;
var curlyRe = /\s*\}/;
var tagRe = /#|\^|\/|>|\{|&|=|!/;
function parseTemplate(template, tags) {
  if (!template)
    return [];
  var lineHasNonSpace = false;
  var sections = [];
  var tokens = [];
  var spaces = [];
  var hasTag = false;
  var nonSpace = false;
  var indentation = "";
  var tagIndex = 0;
  function stripSpace() {
    if (hasTag && !nonSpace) {
      while (spaces.length)
        delete tokens[spaces.pop()];
    } else {
      spaces = [];
    }
    hasTag = false;
    nonSpace = false;
  }
  var openingTagRe, closingTagRe, closingCurlyRe;
  function compileTags(tagsToCompile) {
    if (typeof tagsToCompile === "string")
      tagsToCompile = tagsToCompile.split(spaceRe, 2);
    if (!isArray2(tagsToCompile) || tagsToCompile.length !== 2)
      throw new Error("Invalid tags: " + tagsToCompile);
    openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + "\\s*");
    closingTagRe = new RegExp("\\s*" + escapeRegExp(tagsToCompile[1]));
    closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + tagsToCompile[1]));
  }
  compileTags(tags || mustache.tags);
  var scanner = new Scanner(template);
  var start, type, value, chr, token, openSection;
  while (!scanner.eos()) {
    start = scanner.pos;
    value = scanner.scanUntil(openingTagRe);
    if (value) {
      for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
        chr = value.charAt(i);
        if (isWhitespace(chr)) {
          spaces.push(tokens.length);
          indentation += chr;
        } else {
          nonSpace = true;
          lineHasNonSpace = true;
          indentation += " ";
        }
        tokens.push(["text", chr, start, start + 1]);
        start += 1;
        if (chr === "\n") {
          stripSpace();
          indentation = "";
          tagIndex = 0;
          lineHasNonSpace = false;
        }
      }
    }
    if (!scanner.scan(openingTagRe))
      break;
    hasTag = true;
    type = scanner.scan(tagRe) || "name";
    scanner.scan(whiteRe);
    if (type === "=") {
      value = scanner.scanUntil(equalsRe);
      scanner.scan(equalsRe);
      scanner.scanUntil(closingTagRe);
    } else if (type === "{") {
      value = scanner.scanUntil(closingCurlyRe);
      scanner.scan(curlyRe);
      scanner.scanUntil(closingTagRe);
      type = "&";
    } else {
      value = scanner.scanUntil(closingTagRe);
    }
    if (!scanner.scan(closingTagRe))
      throw new Error("Unclosed tag at " + scanner.pos);
    if (type == ">") {
      token = [type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace];
    } else {
      token = [type, value, start, scanner.pos];
    }
    tagIndex++;
    tokens.push(token);
    if (type === "#" || type === "^") {
      sections.push(token);
    } else if (type === "/") {
      openSection = sections.pop();
      if (!openSection)
        throw new Error('Unopened section "' + value + '" at ' + start);
      if (openSection[1] !== value)
        throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
    } else if (type === "name" || type === "{" || type === "&") {
      nonSpace = true;
    } else if (type === "=") {
      compileTags(value);
    }
  }
  stripSpace();
  openSection = sections.pop();
  if (openSection)
    throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
  return nestTokens(squashTokens(tokens));
}
function squashTokens(tokens) {
  var squashedTokens = [];
  var token, lastToken;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];
    if (token) {
      if (token[0] === "text" && lastToken && lastToken[0] === "text") {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
      } else {
        squashedTokens.push(token);
        lastToken = token;
      }
    }
  }
  return squashedTokens;
}
function nestTokens(tokens) {
  var nestedTokens = [];
  var collector = nestedTokens;
  var sections = [];
  var token, section;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];
    switch (token[0]) {
      case "#":
      case "^":
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case "/":
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
    }
  }
  return nestedTokens;
}
function Scanner(string) {
  this.string = string;
  this.tail = string;
  this.pos = 0;
}
Scanner.prototype.eos = function eos() {
  return this.tail === "";
};
Scanner.prototype.scan = function scan(re) {
  var match = this.tail.match(re);
  if (!match || match.index !== 0)
    return "";
  var string = match[0];
  this.tail = this.tail.substring(string.length);
  this.pos += string.length;
  return string;
};
Scanner.prototype.scanUntil = function scanUntil(re) {
  var index = this.tail.search(re), match;
  switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
  }
  this.pos += match.length;
  return match;
};
function Context(view, parentContext) {
  this.view = view;
  this.cache = { ".": this.view };
  this.parent = parentContext;
}
Context.prototype.push = function push(view) {
  return new Context(view, this);
};
Context.prototype.lookup = function lookup(name) {
  var cache = this.cache;
  var value;
  if (cache.hasOwnProperty(name)) {
    value = cache[name];
  } else {
    var context = this, intermediateValue, names, index, lookupHit = false;
    while (context) {
      if (name.indexOf(".") > 0) {
        intermediateValue = context.view;
        names = name.split(".");
        index = 0;
        while (intermediateValue != null && index < names.length) {
          if (index === names.length - 1)
            lookupHit = hasProperty(intermediateValue, names[index]) || primitiveHasOwnProperty(intermediateValue, names[index]);
          intermediateValue = intermediateValue[names[index++]];
        }
      } else {
        intermediateValue = context.view[name];
        lookupHit = hasProperty(context.view, name);
      }
      if (lookupHit) {
        value = intermediateValue;
        break;
      }
      context = context.parent;
    }
    cache[name] = value;
  }
  if (isFunction(value))
    value = value.call(this.view);
  return value;
};
function Writer() {
  this.templateCache = {
    _cache: {},
    set: function set(key, value) {
      this._cache[key] = value;
    },
    get: function get(key) {
      return this._cache[key];
    },
    clear: function clear() {
      this._cache = {};
    }
  };
}
Writer.prototype.clearCache = function clearCache() {
  if (typeof this.templateCache !== "undefined") {
    this.templateCache.clear();
  }
};
Writer.prototype.parse = function parse2(template, tags) {
  var cache = this.templateCache;
  var cacheKey = template + ":" + (tags || mustache.tags).join(":");
  var isCacheEnabled = typeof cache !== "undefined";
  var tokens = isCacheEnabled ? cache.get(cacheKey) : void 0;
  if (tokens == void 0) {
    tokens = parseTemplate(template, tags);
    isCacheEnabled && cache.set(cacheKey, tokens);
  }
  return tokens;
};
Writer.prototype.render = function render(template, view, partials, config) {
  var tags = this.getConfigTags(config);
  var tokens = this.parse(template, tags);
  var context = view instanceof Context ? view : new Context(view, void 0);
  return this.renderTokens(tokens, context, partials, template, config);
};
Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config) {
  var buffer = "";
  var token, symbol, value;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    value = void 0;
    token = tokens[i];
    symbol = token[0];
    if (symbol === "#") value = this.renderSection(token, context, partials, originalTemplate, config);
    else if (symbol === "^") value = this.renderInverted(token, context, partials, originalTemplate, config);
    else if (symbol === ">") value = this.renderPartial(token, context, partials, config);
    else if (symbol === "&") value = this.unescapedValue(token, context);
    else if (symbol === "name") value = this.escapedValue(token, context, config);
    else if (symbol === "text") value = this.rawValue(token);
    if (value !== void 0)
      buffer += value;
  }
  return buffer;
};
Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config) {
  var self = this;
  var buffer = "";
  var value = context.lookup(token[1]);
  function subRender(template) {
    return self.render(template, context, partials, config);
  }
  if (!value) return;
  if (isArray2(value)) {
    for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
      buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
    }
  } else if (typeof value === "object" || typeof value === "string" || typeof value === "number") {
    buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
  } else if (isFunction(value)) {
    if (typeof originalTemplate !== "string")
      throw new Error("Cannot use higher-order sections without the original template");
    value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
    if (value != null)
      buffer += value;
  } else {
    buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
  }
  return buffer;
};
Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config) {
  var value = context.lookup(token[1]);
  if (!value || isArray2(value) && value.length === 0)
    return this.renderTokens(token[4], context, partials, originalTemplate, config);
};
Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
  var filteredIndentation = indentation.replace(/[^ \t]/g, "");
  var partialByNl = partial.split("\n");
  for (var i = 0; i < partialByNl.length; i++) {
    if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
      partialByNl[i] = filteredIndentation + partialByNl[i];
    }
  }
  return partialByNl.join("\n");
};
Writer.prototype.renderPartial = function renderPartial(token, context, partials, config) {
  if (!partials) return;
  var tags = this.getConfigTags(config);
  var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
  if (value != null) {
    var lineHasNonSpace = token[6];
    var tagIndex = token[5];
    var indentation = token[4];
    var indentedValue = value;
    if (tagIndex == 0 && indentation) {
      indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
    }
    var tokens = this.parse(indentedValue, tags);
    return this.renderTokens(tokens, context, partials, indentedValue, config);
  }
};
Writer.prototype.unescapedValue = function unescapedValue(token, context) {
  var value = context.lookup(token[1]);
  if (value != null)
    return value;
};
Writer.prototype.escapedValue = function escapedValue(token, context, config) {
  var escape = this.getConfigEscape(config) || mustache.escape;
  var value = context.lookup(token[1]);
  if (value != null)
    return typeof value === "number" && escape === mustache.escape ? String(value) : escape(value);
};
Writer.prototype.rawValue = function rawValue(token) {
  return token[1];
};
Writer.prototype.getConfigTags = function getConfigTags(config) {
  if (isArray2(config)) {
    return config;
  } else if (config && typeof config === "object") {
    return config.tags;
  } else {
    return void 0;
  }
};
Writer.prototype.getConfigEscape = function getConfigEscape(config) {
  if (config && typeof config === "object" && !isArray2(config)) {
    return config.escape;
  } else {
    return void 0;
  }
};
var mustache = {
  name: "mustache.js",
  version: "4.2.0",
  tags: ["{{", "}}"],
  clearCache: void 0,
  escape: void 0,
  parse: void 0,
  render: void 0,
  Scanner: void 0,
  Context: void 0,
  Writer: void 0,
  /**
   * Allows a user to override the default caching strategy, by providing an
   * object with set, get and clear methods. This can also be used to disable
   * the cache by setting it to the literal `undefined`.
   */
  set templateCache(cache) {
    defaultWriter.templateCache = cache;
  },
  /**
   * Gets the default or overridden caching object from the default writer.
   */
  get templateCache() {
    return defaultWriter.templateCache;
  }
};
var defaultWriter = new Writer();
mustache.clearCache = function clearCache2() {
  return defaultWriter.clearCache();
};
mustache.parse = function parse3(template, tags) {
  return defaultWriter.parse(template, tags);
};
mustache.render = function render2(template, view, partials, config) {
  if (typeof template !== "string") {
    throw new TypeError('Invalid template! Template should be a "string" but "' + typeStr(template) + '" was given as the first argument for mustache#render(template, view, partials)');
  }
  return defaultWriter.render(template, view, partials, config);
};
mustache.escape = escapeHtml;
mustache.Scanner = Scanner;
mustache.Context = Context;
mustache.Writer = Writer;
var mustache_default = mustache;

// node_modules/@typespec/compiler/dist/src/init/file-templating.js
function createFileTemplatingContext(config) {
  const folderName = getBaseFileName(config.directory);
  return {
    ...config.template,
    ...config,
    folderName,
    normalizeVersion,
    toLowerCase,
    normalizePackageName,
    casing
  };
}
function render3(content, context) {
  return mustache_default.render(content, context);
}
var casing = {
  camelCase: createNamingUtils(camelCase),
  kebabCase: createNamingUtils(kebabCase),
  pascalCase: createNamingUtils(pascalCase)
};
function createNamingUtils(fn) {
  return () => (text, render4) => fn(render4(text));
}
var normalizeVersion = function() {
  return function(text, render4) {
    return render4(text).replaceAll("-", "_");
  };
};
var toLowerCase = function() {
  return function(text, render4) {
    return render4(text).toLowerCase();
  };
};
var normalizePackageName = function() {
  return function(text, render4) {
    return render4(text).replaceAll(".", "-").toLowerCase();
  };
};

// node_modules/@typespec/compiler/dist/src/init/scaffold.js
var TypeSpecConfigFilename2 = "tspconfig.yaml";
async function scaffoldNewProject(host, config) {
  await host.mkdirp(config.directory);
  await writePackageJson(host, config);
  await writeConfig(host, config);
  await writeMain(host, config);
  await writeGitignore(host, config);
  await writeFiles(host, config);
}
function isFileSkipGeneration(fileName, files) {
  for (const file of files) {
    if (file.destination === fileName) {
      return file.skipGeneration ?? false;
    }
  }
  return false;
}
async function writePackageJson(host, config) {
  if (isFileSkipGeneration("package.json", config.template.files ?? [])) {
    return;
  }
  const versionResolutions = [];
  if (!config.template.skipCompilerPackage) {
    versionResolutions.push(resolvePackageVersion("@typespec/compiler").then((v) => ["@typespec/compiler", v]));
  }
  for (const library of config.libraries) {
    versionResolutions.push(getPackageVersion(library.name, library).then((v) => [library.name, v]));
  }
  for (const key of Object.keys(config.emitters)) {
    versionResolutions.push(getPackageVersion(key, config.emitters[key]).then((v) => [key, v]));
  }
  const dependencies = Object.fromEntries(await Promise.all(versionResolutions));
  const packageJson = {
    name: config.name,
    version: "0.1.0",
    type: "module",
    private: true
  };
  if (config.template.target === "library") {
    packageJson.peerDependencies = dependencies;
    packageJson.devDependencies = dependencies;
  } else {
    packageJson.dependencies = dependencies;
  }
  return host.writeFile(joinPaths(config.directory, "package.json"), JSON.stringify(packageJson, null, 2));
}
var commentedOptions = `# entrypoint: main.tsp                           # Main TypeSpec file (default: main.tsp)
# extends: ../tspconfig.yaml                     # Extend another config file
# emit:                                          # Emitter name
#   - "<emitter-name"
# options:                                       # Emitter options
#   <emitter-name>:
#    "<option-name>": "<option-value>"
# environment-variables:                         # Environment variables which can be used to interpolate emitter options
#   <variable-name>:
#     default: "<variable-default>"
# parameters:                                    # Parameters which can be used to interpolate emitter options
#   <param-name>:
#     default: "<param-default>"
# trace:                                         # Trace areas to enable tracing
#  - "<trace-name>"
# warn-as-error: true                            # Treat warnings as errors
# output-dir: "{project-root}/_generated"        # Configure the base output directory for all emitters`;
var placeholderConfig = `kind: project                                    # Marks this as a TypeSpec project
${commentedOptions}`;
async function writeConfig(host, config) {
  if (isFileSkipGeneration(TypeSpecConfigFilename2, config.template.files ?? [])) {
    return;
  }
  let rawConfig;
  if (config.template.config !== void 0 && Object.keys(config.template.config).length > 0) {
    rawConfig = config.template.config;
  }
  if (Object.keys(config.emitters).length > 0) {
    rawConfig ??= {};
    rawConfig.emit = Object.keys(config.emitters);
    rawConfig.options = Object.fromEntries(Object.entries(config.emitters).map(([key, emitter]) => [key, emitter.options]));
  }
  const content = rawConfig ? stringify(rawConfig).trimEnd() + "\n" + commentedOptions : placeholderConfig;
  return host.writeFile(joinPaths(config.directory, TypeSpecConfigFilename2), content);
}
async function writeMain(host, config) {
  if (isFileSkipGeneration("main.tsp", config.template.files ?? [])) {
    return;
  }
  const lines = [...config.libraries.map((x) => `import "${x.name}";`), ""];
  const content = lines.join("\n");
  return host.writeFile(joinPaths(config.directory, "main.tsp"), content);
}
var defaultGitignore = `
# MacOS
.DS_Store

# Default TypeSpec output
tsp-output/
dist/

# Dependency directories
node_modules/
`.trim();
async function writeGitignore(host, config) {
  if (!config.includeGitignore || isFileSkipGeneration(".gitignore", config.template.files ?? [])) {
    return;
  }
  return host.writeFile(joinPaths(config.directory, ".gitignore"), defaultGitignore);
}
async function writeFiles(host, config) {
  const templateContext = createFileTemplatingContext(config);
  if (!config.template.files) {
    return;
  }
  for (const file of config.template.files) {
    if (file.skipGeneration !== true) {
      await writeFile(host, config, templateContext, file);
    }
  }
}
async function writeFile(host, config, context, file) {
  if (config.source === void 0) {
    throw new Error(`Cannot resolve template file "${file.path}": template was loaded without a source.`);
  }
  const destination = validateTemplateRelativePath(file.destination, "destination");
  const destinationFilePath = joinPaths(config.directory, destination);
  await validateRealPathWithinProject(host, config.directory, destinationFilePath, file.destination);
  const template = await config.source.readFile(file.path);
  const content = render3(template.text, context);
  await host.mkdirp(getDirectoryPath(destinationFilePath) + "/");
  await validateRealPathWithinProject(host, config.directory, destinationFilePath, file.destination);
  return host.writeFile(destinationFilePath, content);
}
async function validateRealPathWithinProject(host, projectDirectory, destinationFilePath, destination) {
  const realProjectDirectory = normalizePath(await host.realpath(projectDirectory));
  let ancestor = destinationFilePath;
  while (true) {
    try {
      const realAncestor = normalizePath(await host.realpath(ancestor));
      const relativePath = getRelativePathFromDirectory(realProjectDirectory, realAncestor, false);
      if (isPathAbsolute(relativePath) || relativePath === ".." || relativePath.startsWith("../")) {
        throw new Error(`Template file destination must be a relative path: "${destination}"`);
      }
      return;
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
      const parent = getDirectoryPath(ancestor);
      if (parent === ancestor) {
        throw error;
      }
      ancestor = parent;
    }
  }
}
async function getPackageVersion(packageName, templatePackageConfig) {
  if (templatePackageConfig.version !== void 0) {
    return templatePackageConfig.version;
  }
  return resolvePackageVersion(packageName);
}
async function resolvePackageVersion(packageName) {
  try {
    const manifest2 = await fetchLatestPackageManifest(packageName);
    return `^${manifest2.version}`;
  } catch {
    return "latest";
  }
}

// node_modules/@typespec/compiler/dist/src/utils/fs-utils.js
init_define_process_env();
async function listAllFilesInDir(host, dir) {
  const files = [];
  async function readDirs(currentDir) {
    const currentDirPath = resolvePath(dir, currentDir);
    const fileOrDirs = await host.readDir(currentDirPath);
    for (const file of fileOrDirs) {
      const fullPath = resolvePath(currentDirPath, file);
      const stat = await host.stat(fullPath);
      if (stat.isDirectory()) {
        await readDirs(resolvePath(currentDir, file));
      } else {
        files.push(resolvePath(currentDir, file));
      }
    }
  }
  await readDirs("");
  return files;
}

// node_modules/@typespec/compiler/dist/src/server/classify.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/server/types.js
init_define_process_env();
var SemanticTokenKind;
(function(SemanticTokenKind2) {
  SemanticTokenKind2[SemanticTokenKind2["Namespace"] = 0] = "Namespace";
  SemanticTokenKind2[SemanticTokenKind2["Type"] = 1] = "Type";
  SemanticTokenKind2[SemanticTokenKind2["Class"] = 2] = "Class";
  SemanticTokenKind2[SemanticTokenKind2["Enum"] = 3] = "Enum";
  SemanticTokenKind2[SemanticTokenKind2["Interface"] = 4] = "Interface";
  SemanticTokenKind2[SemanticTokenKind2["Struct"] = 5] = "Struct";
  SemanticTokenKind2[SemanticTokenKind2["TypeParameter"] = 6] = "TypeParameter";
  SemanticTokenKind2[SemanticTokenKind2["Parameter"] = 7] = "Parameter";
  SemanticTokenKind2[SemanticTokenKind2["Variable"] = 8] = "Variable";
  SemanticTokenKind2[SemanticTokenKind2["Property"] = 9] = "Property";
  SemanticTokenKind2[SemanticTokenKind2["EnumMember"] = 10] = "EnumMember";
  SemanticTokenKind2[SemanticTokenKind2["Event"] = 11] = "Event";
  SemanticTokenKind2[SemanticTokenKind2["Function"] = 12] = "Function";
  SemanticTokenKind2[SemanticTokenKind2["Method"] = 13] = "Method";
  SemanticTokenKind2[SemanticTokenKind2["Macro"] = 14] = "Macro";
  SemanticTokenKind2[SemanticTokenKind2["Keyword"] = 15] = "Keyword";
  SemanticTokenKind2[SemanticTokenKind2["Comment"] = 16] = "Comment";
  SemanticTokenKind2[SemanticTokenKind2["String"] = 17] = "String";
  SemanticTokenKind2[SemanticTokenKind2["Number"] = 18] = "Number";
  SemanticTokenKind2[SemanticTokenKind2["Regexp"] = 19] = "Regexp";
  SemanticTokenKind2[SemanticTokenKind2["Operator"] = 20] = "Operator";
  SemanticTokenKind2[SemanticTokenKind2["DocCommentTag"] = 21] = "DocCommentTag";
})(SemanticTokenKind || (SemanticTokenKind = {}));

// node_modules/@typespec/compiler/dist/src/server/classify.js
function getSemanticTokens(ast) {
  const ignore = -1;
  const defer = -2;
  const file = ast.file;
  const tokens = mapTokens();
  classifyNode(ast);
  return Array.from(tokens.values()).filter((t) => t.kind !== void 0);
  function mapTokens() {
    const tokens2 = /* @__PURE__ */ new Map();
    const scanner = createScanner(file, () => {
    });
    const templateStack = [];
    while (scanner.scan() !== Token.EndOfFile) {
      if (scanner.tokenFlags & TokenFlags.DocComment) {
        classifyDocComment({ pos: scanner.tokenPosition, end: scanner.position });
      } else {
        handleToken(scanner.token, scanner.tokenFlags, {
          pos: scanner.tokenPosition,
          end: scanner.position
        });
      }
    }
    return tokens2;
    function classifyDocComment(range) {
      scanner.scanRange(range, () => {
        while (scanner.scanDoc() !== Token.EndOfFile) {
          const kind = classifyDocToken(scanner.token);
          if (kind === ignore) {
            continue;
          }
          tokens2.set(scanner.tokenPosition, {
            kind: kind === defer ? void 0 : kind,
            pos: scanner.tokenPosition,
            end: scanner.position
          });
        }
      });
    }
    function handleToken(token, tokenFlags, range) {
      switch (token) {
        case Token.StringTemplateHead:
          templateStack.push([token, tokenFlags]);
          classifyStringTemplate(token, range);
          break;
        case Token.OpenBrace:
          if (templateStack.length > 0) {
            templateStack.push([token, tokenFlags]);
          }
          handleSimpleToken(token, range);
          break;
        case Token.CloseBrace:
          if (templateStack.length > 0) {
            const [lastToken, lastTokenFlags] = templateStack[templateStack.length - 1];
            if (lastToken === Token.StringTemplateHead) {
              token = scanner.reScanStringTemplate(lastTokenFlags);
              if (token === Token.StringTemplateTail) {
                templateStack.pop();
                classifyStringTemplate(token, {
                  pos: scanner.tokenPosition,
                  end: scanner.position
                });
              } else {
                compilerAssert(token === Token.StringTemplateMiddle, "Should have been a template middle.");
                classifyStringTemplate(token, {
                  pos: scanner.tokenPosition,
                  end: scanner.position
                });
              }
            } else {
              compilerAssert(lastToken === Token.OpenBrace, "Should have been an open brace");
              templateStack.pop();
            }
            break;
          }
          handleSimpleToken(token, range);
          break;
        default:
          handleSimpleToken(token, range);
      }
    }
    function handleSimpleToken(token, range) {
      const kind = classifyToken(scanner.token);
      if (kind === ignore) {
        return;
      }
      tokens2.set(range.pos, {
        kind: kind === defer ? void 0 : kind,
        ...range
      });
    }
    function classifyStringTemplate(token, range) {
      const stringStart = token === Token.StringTemplateHead ? range.pos : range.pos + 1;
      const stringEnd = token === Token.StringTemplateTail ? range.end : range.end - 2;
      if (stringStart !== range.pos) {
        tokens2.set(range.pos, {
          kind: SemanticTokenKind.Operator,
          pos: range.pos,
          end: stringStart
        });
      }
      tokens2.set(stringStart, {
        kind: SemanticTokenKind.String,
        pos: stringStart,
        end: stringEnd
      });
      if (stringEnd !== range.end) {
        tokens2.set(stringEnd, {
          kind: SemanticTokenKind.Operator,
          pos: stringEnd,
          end: range.end
        });
      }
    }
  }
  function classifyToken(token) {
    switch (token) {
      case Token.Identifier:
        return defer;
      case Token.StringLiteral:
        return SemanticTokenKind.String;
      case Token.NumericLiteral:
        return SemanticTokenKind.Number;
      case Token.MultiLineComment:
      case Token.SingleLineComment:
        return SemanticTokenKind.Comment;
      default:
        if (isReservedKeyword(token)) {
          return defer;
        }
        if (isKeyword(token)) {
          return SemanticTokenKind.Keyword;
        }
        if (isPunctuation(token)) {
          return SemanticTokenKind.Operator;
        }
        return ignore;
    }
  }
  function classifyDocToken(token) {
    switch (token) {
      case Token.NewLine:
      case Token.Whitespace:
        return ignore;
      case Token.DocText:
      case Token.Star:
      case Token.Identifier:
      case Token.DocCodeSpan:
        return SemanticTokenKind.Comment;
      case Token.At:
        return defer;
      default:
        return ignore;
    }
  }
  function classifyNode(node) {
    switch (node.kind) {
      case SyntaxKind.DirectiveExpression:
        const hashToken = tokens.get(node.target.pos - 1);
        if (hashToken) {
          hashToken.kind = SemanticTokenKind.Keyword;
        }
        classify(node.target, SemanticTokenKind.Keyword);
        break;
      case SyntaxKind.TemplateParameterDeclaration:
        classify(node.id, SemanticTokenKind.TypeParameter);
        break;
      case SyntaxKind.ModelProperty:
      case SyntaxKind.ObjectLiteralProperty:
      case SyntaxKind.UnionVariant:
        if (node.id) {
          classify(node.id, SemanticTokenKind.Property);
        }
        break;
      case SyntaxKind.AliasStatement:
        classify(node.id, SemanticTokenKind.Struct);
        break;
      case SyntaxKind.ModelStatement:
      case SyntaxKind.ModelDeclarationExpression:
        if (node.id)
          classify(node.id, SemanticTokenKind.Struct);
        break;
      case SyntaxKind.ScalarStatement:
      case SyntaxKind.ScalarDeclarationExpression:
        if (node.id)
          classify(node.id, SemanticTokenKind.Type);
        break;
      case SyntaxKind.ScalarConstructor:
        classify(node.id, SemanticTokenKind.Function);
        break;
      case SyntaxKind.UsingStatement:
        if (node.name.kind === SyntaxKind.Identifier) {
          classify(node.name, SemanticTokenKind.Namespace);
        }
        break;
      case SyntaxKind.EnumStatement:
      case SyntaxKind.EnumDeclarationExpression:
        if (node.id)
          classify(node.id, SemanticTokenKind.Enum);
        break;
      case SyntaxKind.UnionStatement:
      case SyntaxKind.UnionDeclarationExpression:
        if (node.id)
          classify(node.id, SemanticTokenKind.Enum);
        break;
      case SyntaxKind.EnumMember:
        classify(node.id, SemanticTokenKind.EnumMember);
        break;
      case SyntaxKind.NamespaceStatement:
        classify(node.id, SemanticTokenKind.Namespace);
        break;
      case SyntaxKind.InterfaceStatement:
        classify(node.id, SemanticTokenKind.Interface);
        break;
      case SyntaxKind.OperationStatement:
        classify(node.id, SemanticTokenKind.Function);
        break;
      case SyntaxKind.DecoratorDeclarationStatement:
        classify(node.id, SemanticTokenKind.Function);
        break;
      case SyntaxKind.FunctionDeclarationStatement:
        classify(node.id, SemanticTokenKind.Function);
        break;
      case SyntaxKind.ConstStatement:
        classify(node.id, SemanticTokenKind.Variable);
        break;
      case SyntaxKind.FunctionParameter:
        classify(node.id, SemanticTokenKind.Parameter);
        break;
      case SyntaxKind.AugmentDecoratorStatement:
        classifyReference(node.targetType, SemanticTokenKind.Type);
        classifyReference(node.target, SemanticTokenKind.Macro);
        break;
      case SyntaxKind.DecoratorExpression:
        classifyReference(node.target, SemanticTokenKind.Macro);
        break;
      case SyntaxKind.CallExpression:
        classifyReference(node.target, SemanticTokenKind.Function);
        break;
      case SyntaxKind.TypeReference:
        classifyReference(node.target);
        break;
      case SyntaxKind.MemberExpression:
        classifyReference(node);
        break;
      case SyntaxKind.DocParamTag:
      case SyntaxKind.DocTemplateTag:
        classifyDocTag(node.tagName, SemanticTokenKind.DocCommentTag);
        classifyOverride(node.paramName, SemanticTokenKind.Variable);
        break;
      case SyntaxKind.DocPropTag:
        classifyDocTag(node.tagName, SemanticTokenKind.DocCommentTag);
        classifyOverride(node.propName, SemanticTokenKind.Variable);
        break;
      case SyntaxKind.DocReturnsTag:
        classifyDocTag(node.tagName, SemanticTokenKind.DocCommentTag);
        break;
      case SyntaxKind.DocUnknownTag:
        classifyDocTag(node.tagName, SemanticTokenKind.Macro);
        break;
      case SyntaxKind.TemplateArgument:
        if (node.name)
          classify(node.name, SemanticTokenKind.TypeParameter);
        break;
      default:
        break;
    }
    visitChildren(node, classifyNode);
  }
  function classifyDocTag(node, kind) {
    classifyOverride(node, kind);
    const token = tokens.get(node.pos - 1);
    if (token) {
      token.kind = kind;
    }
  }
  function classify(node, kind) {
    const token = tokens.get(node.pos);
    if (token && token.kind === void 0) {
      token.kind = kind;
    }
  }
  function classifyOverride(node, kind) {
    const token = tokens.get(node.pos);
    if (token) {
      token.kind = kind;
    }
  }
  function classifyReference(node, kind = SemanticTokenKind.Type) {
    switch (node.kind) {
      case SyntaxKind.MemberExpression:
        classifyIdentifier(node.base, SemanticTokenKind.Namespace);
        classifyIdentifier(node.id, kind);
        break;
      case SyntaxKind.TypeReference:
        classifyIdentifier(node.target, kind);
        break;
      case SyntaxKind.Identifier:
        classify(node, kind);
        break;
    }
  }
  function classifyIdentifier(node, kind) {
    if (node.kind === SyntaxKind.Identifier) {
      classify(node, kind);
    }
  }
}

// node_modules/@typespec/compiler/dist/src/server/compile-service.js
init_define_process_env();
var import_vscode_languageserver = __toESM(require_api3(), 1);

// node_modules/@typespec/compiler/dist/src/server/constants.js
init_define_process_env();
var serverOptions = {
  dryRun: true,
  designTimeBuild: true,
  parseOptions: {
    comments: true,
    docs: true
  }
};

// node_modules/@typespec/compiler/dist/src/server/debug.js
init_define_process_env();
var debugAreas = {
  serverCompile: "server.compile",
  updateManager: "update.manager",
  compileConfig: "compile.config"
};
function isDebugEnabled(area) {
  const debug = getEnvironmentVariable("TYPESPEC_DEBUG");
  if (!debug) {
    return false;
  }
  const areas = debug.split(",").map((a) => a.trim());
  return areas.some((pattern) => {
    if (pattern === area) {
      return true;
    }
    if (pattern.includes("*")) {
      const regexPattern = pattern.replace(/\*/g, ".*");
      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(area);
    }
    return false;
  });
}
var debugLoggers = {
  serverCompile: { enabled: isDebugEnabled(debugAreas.serverCompile) },
  updateManager: { enabled: isDebugEnabled(debugAreas.updateManager) },
  compileConfig: { enabled: isDebugEnabled(debugAreas.compileConfig) }
};

// node_modules/@typespec/compiler/dist/src/server/entrypoint-resolver.js
init_define_process_env();
async function resolveEntrypointFile(host, entrypoints, path, fileSystemCache, log) {
  const options = { allowFileNotFound: true };
  const debug = debugLoggers.compileConfig;
  const logDebug = debug.enabled ? log : () => {
  };
  const pathStat = await doIO(() => host.stat(path), path, logMainFileSearchDiagnostic, options);
  const isFilePath = pathStat?.isFile() ?? false;
  let dir = isFilePath ? getDirectoryPath(path) : path;
  if (!entrypoints) {
    entrypoints = ["main.tsp"];
  }
  while (true) {
    const config = await loadTypeSpecConfigForPath(host, dir, false, false);
    if (config.kind === "project") {
      const entrypoint = config.entrypoint ?? "main.tsp";
      const candidate = await existingFile(dir, entrypoint);
      logDebug({
        level: "debug",
        message: `project tspconfig found in ${dir}, entrypoint: ${entrypoint}`
      });
      return candidate ?? (isFilePath ? path : void 0);
    }
    let pkg;
    const pkgPath = joinPaths(dir, "package.json");
    const cached = await fileSystemCache?.get(pkgPath);
    if (cached?.data) {
      pkg = cached.data;
    } else {
      [pkg] = await loadFile(host, pkgPath, JSON.parse, logMainFileSearchDiagnostic, options);
      await fileSystemCache?.setData(pkgPath, pkg ?? {});
    }
    const tspMain = resolveTspMain(pkg);
    if (typeof tspMain === "string") {
      logDebug({
        level: "debug",
        message: `tspMain resolved from package.json (${pkgPath}) as ${tspMain}`
      });
      const packageJsonEntrypoint = await existingFile(dir, tspMain);
      if (packageJsonEntrypoint) {
        logDebug({ level: "debug", message: `entrypoint file found as ${packageJsonEntrypoint}` });
        return packageJsonEntrypoint;
      }
    }
    for (const entrypoint of entrypoints) {
      const candidate = await existingFile(dir, entrypoint);
      if (candidate) {
        logDebug({
          level: "debug",
          message: `main file found using client provided entrypoint: ${candidate}`
        });
        return candidate;
      }
    }
    const parentDir = getDirectoryPath(dir);
    if (parentDir === dir) {
      break;
    }
    dir = parentDir;
  }
  logDebug({ level: "debug", message: `reached directory root, using '${path}' as main file` });
  return isFilePath ? path : void 0;
  function logMainFileSearchDiagnostic(diagnostic) {
    log({
      level: `error`,
      message: `Unexpected diagnostic while looking for main file of ${path}`,
      detail: formatDiagnostic(diagnostic)
    });
  }
  async function existingFile(dir2, file) {
    const candidate = joinPaths(dir2, file);
    const stat = await doIO(() => host.stat(candidate), candidate, logMainFileSearchDiagnostic, options);
    return stat?.isFile() ? candidate : void 0;
  }
}

// node_modules/@typespec/compiler/dist/src/server/server-compile-manager.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/server/server-track-action-task.js
init_define_process_env();
var ServerTrackActionTask = class {
  #log;
  #message;
  #running;
  #finalMessage;
  constructor(message, finalMessage, log) {
    this.#message = message;
    this.#finalMessage = finalMessage;
    this.#log = log;
    this.#running = true;
  }
  get message() {
    return this.#message;
  }
  get isStopped() {
    return !this.#running;
  }
  set message(newMessage) {
    this.#message = newMessage;
  }
  start() {
    this.#log({
      level: "info",
      message: this.#message
    });
  }
  succeed(message) {
    this.stop("success", message);
  }
  fail(message) {
    this.stop("failure", message);
  }
  warn(message) {
    this.stop("warn", message);
  }
  skip(message) {
    this.stop("skipped", message);
  }
  stop(status, message) {
    this.#running = false;
    this.#message = message ?? this.#finalMessage;
    this.#log({
      level: status !== "failure" ? "info" : "error",
      message: `[${TaskStatusText[status]}] ${this.#message}
`
    });
  }
};
var TaskStatusText = {
  success: "succeed",
  failure: "failed",
  warn: "succeeded with warnings",
  skipped: "skipped"
};
async function trackActionFunc(log, message, finalMessage, asyncAction) {
  const task = new ServerTrackActionTask(message, finalMessage, log);
  task.start();
  try {
    const result = await asyncAction(task);
    if (!task.isStopped) {
      task.succeed();
    }
    return result;
  } catch (error) {
    task.fail(message);
    throw error;
  }
}

// node_modules/@typespec/compiler/dist/src/server/server-compile-manager.js
var ServerCompileManager = class {
  updateManager;
  compilerHost;
  log;
  // We may want a ttl for this
  trackerCache = new CompileCache((msg) => this.logDebug(msg));
  compileId = 0;
  logDebug;
  constructor(updateManager, compilerHost, log) {
    this.updateManager = updateManager;
    this.compilerHost = compilerHost;
    this.log = log;
    const debug = debugLoggers.serverCompile;
    this.logDebug = debug.enabled ? (msg) => this.log({ level: "debug", message: msg }) : () => {
    };
  }
  async compile(mainFile, compileOptions = {}, serverCompileOptions) {
    let cache;
    const curId = this.compileId++;
    const err = new Error();
    const lines = err.stack?.split("\n") ?? [];
    const stackLines = lines.slice(3, 5).join("\n");
    this.logDebug(`Server compile #${curId}: Triggered, version=${this.updateManager.docChangedVersion}, mode=${serverCompileOptions.mode}, mainFile=${mainFile}, from
${stackLines}`);
    if (!serverCompileOptions.skipCache) {
      cache = this.trackerCache.get(mainFile, compileOptions, false, serverCompileOptions.mode);
      if (cache && cache.isUpToDate()) {
        this.logDebug(`Server compile #${curId}: Return cache at #${cache.getCompileId()}(${cache.getMode()})`);
        return cache;
      } else {
        this.logDebug(`Server compile #${curId}: Cache miss because ${cache ? `it's outdated with version ${cache.getVersion()}` : "no cache available"}`);
      }
    }
    let oldProgram = void 0;
    if (!serverCompileOptions.skipOldProgramFromCache) {
      const completedTracker = this.trackerCache.get(mainFile, compileOptions, true, serverCompileOptions.mode);
      oldProgram = await completedTracker?.getCompileResult();
      this.logDebug(`Server compile #${curId}: Use old program from cache: ${oldProgram ? `from #${completedTracker?.getCompileId() ?? "undefined"}` : "n/a"}`);
    }
    const tracker = CompileTracker.compile(curId, this.updateManager, this.compilerHost, mainFile, compileOptions, serverCompileOptions.mode, oldProgram, (msg) => this.logDebug(msg));
    this.trackerCache.set(mainFile, compileOptions, tracker);
    return tracker;
  }
};
var CompileCache = class {
  log;
  coreCache;
  fullCache;
  constructor(log) {
    this.log = log;
    this.coreCache = new CompileCacheInternal(log);
    this.fullCache = new CompileCacheInternal(log);
  }
  get(entrypoint, compileOption, completedOnly, mode) {
    switch (mode) {
      case "core":
        const core = this.coreCache.get(entrypoint, compileOption, completedOnly);
        const full = this.fullCache.get(entrypoint, compileOption, completedOnly);
        if (core && full && full.isCompleted()) {
          if (full.getVersion() > core.getVersion()) {
            this.log(`Server compile: Using full cache (version ${full.getVersion()}) over core cache (version ${core.getVersion()})`);
            return full;
          } else {
            return core;
          }
        } else if (core) {
          return core;
        } else if (full && full.isCompleted()) {
          this.log(`Server compile: Using full cache (version ${full.getVersion()}) over core cache which is unavailable`);
          return full;
        } else {
          return void 0;
        }
      case "full":
        return this.fullCache.get(entrypoint, compileOption, completedOnly);
      default:
        if (true) {
          throw new Error(`Unexpected compile mode: ${mode}`);
        }
        return void 0;
    }
  }
  set(entrypoint, compileOption, tracker) {
    const mode = tracker.getMode();
    switch (mode) {
      case "core":
        this.coreCache.set(entrypoint, compileOption, tracker);
        break;
      case "full":
        this.fullCache.set(entrypoint, compileOption, tracker);
        break;
      default:
        if (true) {
          throw new Error(`Unexpected compile mode: ${mode}`);
        }
        return void 0;
    }
  }
};
var CompileCacheInternal = class {
  log;
  cacheLatest = /* @__PURE__ */ new Map();
  /** Cache for completed compilation which is needed when we need an old program but the latest one is still in progress */
  cacheCompleted = /* @__PURE__ */ new Map();
  constructor(log) {
    this.log = log;
  }
  getCacheKey(entrypoint, compileOption) {
    const normalizedEntrypoint = normalizePath(entrypoint);
    const normalizedOptions = {
      ...compileOption,
      outputDir: void 0
    };
    return `${normalizedEntrypoint}
${normalizedOptions}`;
  }
  /** Get the latest completed compilation */
  get(entrypoint, compileOption, completedOnly) {
    const key = this.getCacheKey(entrypoint, compileOption);
    const tracker = this.cacheLatest.get(key);
    if (!completedOnly || !tracker) {
      return tracker;
    }
    if (tracker.isCompleted() === true) {
      return tracker;
    }
    return this.cacheCompleted.get(key);
  }
  set(entrypoint, compileOption, tracker) {
    const key = this.getCacheKey(entrypoint, compileOption);
    this.cacheLatest.set(key, tracker);
    const onComplete = () => {
      const cur = this.cacheCompleted.get(key);
      if (!cur || cur.getVersion() < tracker.getVersion()) {
        this.cacheCompleted.set(key, tracker);
        this.log(`Server compile #${tracker.getCompileId()}: Completed Cache updated ( ${cur?.getVersion() ?? "n/a"} -> ${tracker.getVersion()} )`);
      }
    };
    tracker.getCompileResult().then(() => {
      onComplete();
    }, (err) => {
      onComplete();
    });
  }
};
var CompileTracker = class _CompileTracker {
  id;
  updateManager;
  entrypoint;
  compileResultPromise;
  version;
  startTime;
  mode;
  logs;
  endTime;
  static compile(id, updateManager, host, mainFile, options = {}, mode, oldProgram, log) {
    const sLogs = [];
    const myHost = {
      ...host,
      logSink: {
        log: (log2) => {
          const msg = formatLog(log2, { excludeLogLevel: true });
          const sLog = {
            level: log2.level,
            message: msg
          };
          sLogs.push(sLog);
        },
        trackAction: (message, finalMessage, action) => trackActionFunc((log2) => sLogs.push(log2), message, finalMessage, action)
      }
    };
    const myOption = mode === "core" ? {
      ...options,
      emit: [],
      linterRuleSet: void 0
    } : {
      ...options
    };
    const version = updateManager.docChangedVersion;
    const startTime = /* @__PURE__ */ new Date();
    const p = compile(myHost, mainFile, myOption, oldProgram);
    log(`Server compile #${id}: Start compilation at ${startTime.toISOString()}, version = ${version}, mainFile = ${mainFile}, mode = ${mode}`);
    return new _CompileTracker(id, updateManager, mainFile, p, version, startTime, mode, sLogs, log);
  }
  constructor(id, updateManager, entrypoint, compileResultPromise, version, startTime, mode, logs, log) {
    this.id = id;
    this.updateManager = updateManager;
    this.entrypoint = entrypoint;
    this.compileResultPromise = compileResultPromise;
    this.version = version;
    this.startTime = startTime;
    this.mode = mode;
    this.logs = logs;
    this.startTime = startTime;
    const onComplete = () => {
      this.endTime = /* @__PURE__ */ new Date();
      log(`Server compile #${this.getCompileId()}: Compilation finished at ${this.endTime.toISOString()}. Duration = ${this.endTime.getTime() - this.startTime.getTime()}ms`);
    };
    compileResultPromise.then((r) => {
      onComplete();
    }, (err) => {
      onComplete();
    });
  }
  getCompileId() {
    return this.id;
  }
  getEntryPoint() {
    return this.entrypoint;
  }
  async getCompileResult() {
    return await this.compileResultPromise;
  }
  getVersion() {
    return this.version;
  }
  getStartTime() {
    return this.startTime;
  }
  getEndTime() {
    return this.endTime;
  }
  isCompleted() {
    return this.endTime !== void 0;
  }
  isUpToDate() {
    return this.version === this.updateManager.docChangedVersion;
  }
  getMode() {
    return this.mode;
  }
  getLogs() {
    return this.logs;
  }
};

// node_modules/@typespec/compiler/dist/src/server/compile-service.js
function createCompileService({ compilerHost, serverHost, fileService, fileSystemCache, updateManager, log, clientConfigsProvider }) {
  const eventListeners = /* @__PURE__ */ new Map();
  const compileManager = new ServerCompileManager(updateManager, compilerHost, log);
  let configFilePath;
  const debug = debugLoggers.compileConfig;
  const logDebug = debug.enabled ? log : () => {
  };
  return { compile: compile2, getScript, on, notifyChange, getMainFileForDocument };
  function on(event, listener) {
    eventListeners.set(event, listener);
  }
  function notify(event, ...args) {
    const listener = eventListeners.get(event);
    if (listener) {
      void listener(...args);
    }
  }
  function notifyChange(document, updateType) {
    void updateManager.scheduleUpdate(document, updateType);
  }
  async function compile2(document, additionalOptions, serverCompileOptions) {
    const path = await fileService.getPath(document);
    const pathBaseName = getBaseFileName(path);
    if (!path.endsWith(".tsp") && pathBaseName !== TypeSpecConfigFilename) {
      return void 0;
    }
    const mainFile = await getMainFileForDocument(path);
    if (mainFile === void 0) {
      logDebug({ level: "debug", message: `failed to resolve main file for ${path}` });
      return void 0;
    }
    if (!mainFile.endsWith(".tsp")) {
      return void 0;
    }
    const config = await getConfig(mainFile);
    configFilePath = config.filename;
    logDebug({ level: "debug", message: `config resolved`, detail: config });
    const [optionsFromConfig, _] = resolveOptionsFromConfig(config, {
      cwd: getDirectoryPath(path)
    });
    const clone = structuredClone(optionsFromConfig);
    const options = {
      ...clone,
      ...serverOptions,
      ...additionalOptions ?? {}
    };
    if (additionalOptions?.emit === void 0) {
      const configEmits = clientConfigsProvider?.config?.lsp?.emit;
      const CONFIG_DEFAULTS = "<config:defaults>";
      if (configEmits) {
        if (configEmits.find((e) => e === CONFIG_DEFAULTS)) {
          options.emit = distinctArray([...options.emit ?? [], ...configEmits.filter((e) => e !== CONFIG_DEFAULTS)], (s) => s);
        } else {
          options.emit = configEmits;
        }
      } else {
        options.emit = [];
      }
    }
    const unusedUsingRule = `${builtInLinterLibraryName}/${builtInLinterRule_UnusedUsing}`;
    if (options.linterRuleSet?.enable?.[unusedUsingRule] === void 0 && options.linterRuleSet?.disable?.[unusedUsingRule] === void 0) {
      options.linterRuleSet ??= {};
      options.linterRuleSet.enable ??= {};
      options.linterRuleSet.enable[unusedUsingRule] = true;
    }
    const unusedTemplateParameterRule = `${builtInLinterLibraryName}/${builtInLinterRule_UnusedTemplateParameter}`;
    if (options.linterRuleSet?.enable?.[unusedTemplateParameterRule] === void 0 && options.linterRuleSet?.disable?.[unusedTemplateParameterRule] === void 0) {
      options.linterRuleSet ??= {};
      options.linterRuleSet.enable ??= {};
      options.linterRuleSet.enable[unusedTemplateParameterRule] = true;
    }
    const isCancelledOrOutOfDate = () => {
      return serverCompileOptions.isCancelled?.() || !fileService.upToDate(document);
    };
    if (isCancelledOrOutOfDate()) {
      return void 0;
    }
    let tracker;
    try {
      tracker = await compileManager.compile(mainFile, options, serverCompileOptions);
      let program = await tracker.getCompileResult();
      if (isCancelledOrOutOfDate()) {
        return void 0;
      }
      if (mainFile !== path && !program.sourceFiles.has(path) && pathBaseName !== TypeSpecConfigFilename) {
        logDebug({
          level: "debug",
          message: `target file was not included in compiling, try to compile ${path} as main file directly`
        });
        tracker = await compileManager.compile(path, options, serverCompileOptions);
        program = await tracker.getCompileResult();
      }
      if (isCancelledOrOutOfDate()) {
        return void 0;
      }
      const doc = "version" in document ? document : serverHost.getOpenDocumentByURL(document.uri);
      const script = program.sourceFiles.get(path);
      const result = { program, document: doc, script, optionsFromConfig, tracker };
      notify("compileEnd", result);
      return result;
    } catch (err) {
      if (serverHost.throwInternalErrors) {
        throw err;
      }
      let uri = document.uri;
      let range = import_vscode_languageserver.Range.create(0, 0, 0, 0);
      if (err.name === "ExternalError" && err.info.kind === "emitter" && configFilePath) {
        const emitterName = err.info.metadata.name;
        const [yamlScript] = parseYaml(await serverHost.compilerHost.readFile(configFilePath));
        const target = getLocationInYamlScript(yamlScript, ["emit", emitterName], "key");
        if (target.pos === 0) {
          logDebug({
            level: "debug",
            message: `Unexpected situation, can't find emitter '${emitterName}' in config file '${configFilePath}'`
          });
        }
        uri = fileService.getURL(configFilePath);
        const lineAndChar = target.file.getLineAndCharacterOfPosition(target.pos);
        range = import_vscode_languageserver.Range.create(lineAndChar.line, lineAndChar.character, lineAndChar.line, lineAndChar.character + emitterName.length);
      }
      serverHost.sendDiagnostics({
        uri,
        diagnostics: [
          {
            severity: import_vscode_languageserver.DiagnosticSeverity.Error,
            range,
            message: (err.name === "ExternalError" ? "External compiler error!\n" : `Internal compiler error!
File issue at https://github.com/microsoft/typespec

`) + err.stack
          }
        ]
      });
      return void 0;
    }
  }
  async function getConfig(mainFile) {
    const entrypointStat = await compilerHost.stat(mainFile);
    const lookupDir = entrypointStat.isDirectory() ? mainFile : getDirectoryPath(mainFile);
    const configPath = await findTypeSpecConfigPath(compilerHost, lookupDir, true);
    if (!configPath) {
      logDebug({
        level: "debug",
        message: `can't find path with config file, try to use default config`
      });
      return { ...defaultConfig, projectRoot: getDirectoryPath(mainFile) };
    }
    const cached = await fileSystemCache.get(configPath);
    if (cached?.data) {
      return JSON.parse(JSON.stringify(cached.data));
    }
    const config = await loadTypeSpecConfigFile(compilerHost, configPath);
    return JSON.parse(JSON.stringify(config));
  }
  async function getScript(document) {
    const file = await compilerHost.readFile(await fileService.getPath(document));
    const cached = compilerHost.parseCache?.get(file);
    if (cached === void 0) {
      const parsed = parse(file, { docs: true, comments: true });
      compilerHost.parseCache?.set(file, parsed);
      return parsed;
    } else {
      return cached;
    }
  }
  async function getMainFileForDocument(path) {
    if (path.startsWith("untitled:")) {
      logDebug({
        level: "debug",
        message: `untitled document treated as its own main file: ${path}`
      });
      return path;
    }
    const entrypoints = clientConfigsProvider?.config?.entrypoint;
    return resolveEntrypointFile(compilerHost, entrypoints, path, fileSystemCache, log);
  }
}

// node_modules/@typespec/compiler/dist/src/server/completion.js
init_define_process_env();
var import_vscode_languageserver2 = __toESM(require_api3(), 1);

// node_modules/@typespec/compiler/dist/src/server/type-details.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/server/type-signature.js
init_define_process_env();
async function getSymbolSignature(program, sym, options = {
  includeBody: false
}) {
  const decl = getSymNode(sym);
  switch (decl?.kind) {
    case SyntaxKind.AliasStatement:
      return fence(`alias ${await getAliasSignature(decl)}`);
  }
  const entity = sym.type ?? (decl ? program.checker.getTypeOrValueForNode(decl) : null);
  return getEntitySignature(sym, entity, options);
}
function getEntitySignature(sym, entity, options) {
  if (entity === null) {
    return "(error)";
  }
  if ("valueKind" in entity) {
    if (sym.flags & SymbolFlags.Function && entity.valueKind === "Function") {
      const parameters = [...entity.parameters].map((x) => `${x.rest ? "..." : ""}${x.name}${x.optional ? "?" : ""}: ${getEntityName(x.type)}`);
      return fence(`fn ${entity.name ?? "<anonymous>"}(${parameters.join(", ")}) => ${getEntityName(entity.returnType)}`);
    }
    return fence(`const ${sym.name}: ${getTypeName(entity.type)}`);
  }
  return getTypeSignature(entity, options);
}
function getTypeSignature(type, options) {
  switch (type.kind) {
    case "Scalar":
    case "Enum":
    case "Union":
    case "Namespace":
      return fence(`${type.kind.toLowerCase()} ${getPrintableTypeName(type)}`);
    case "Interface":
      return fence(getInterfaceSignature(type, options.includeBody));
    case "Model":
      return fence(getModelSignature(type, options.includeBody));
    case "ScalarConstructor":
      return fence(`init ${getTypeSignature(type.scalar, options)}.${type.name}`);
    case "Decorator":
      return fence(getDecoratorSignature(type));
    case "Operation":
      return fence(getOperationSignature(type));
    case "String":
      return `(string)
${fence(`"${type.value}"`)}`;
    case "Boolean":
      return `(boolean)
${fence(type.value ? "true" : "false")}`;
    case "Number":
      return `(number)
${fence(type.value.toString())}`;
    case "StringTemplate":
      return `(string template)
${fence(getStringTemplateSignature(type))}`;
    case "StringTemplateSpan":
      return `(string template span)
${fence(getTypeName(type.type))}`;
    case "Intrinsic":
      return "";
    case "FunctionParameter":
      return `(function parameter)
${fence(getFunctionParameterSignature(type))}`;
    case "ModelProperty":
      return `(model property)
${fence(getModelPropertySignature(type))}`;
    case "EnumMember":
      return `(enum member)
${fence(getEnumMemberSignature(type))}`;
    case "TemplateParameter":
      return `(template parameter)
${fence(getTemplateConstraintSignature(type.node.id.sv, type.constraint))}`;
    case "TemplateParameterAccess":
      return `(template access)
${fence(getTemplateConstraintSignature(type.path, type.constraint))}`;
    case "UnionVariant":
      return `(union variant)
${fence(getUnionVariantSignature(type))}`;
    case "Tuple":
      return `(tuple)
[${fence(type.values.map((v) => getTypeSignature(v, options)).join(", "))}]`;
    case "FunctionType":
      return fence(`fn (${type.parameters.map((p) => getFunctionParameterSignature(p)).join(", ")}) => ${getEntityName(type.returnType)}`);
    default:
      const _assertNever = type;
      compilerAssert(false, "Unexpected type kind");
  }
}
function getTemplateConstraintSignature(nameOrPath, constraint) {
  if (!constraint) {
    return nameOrPath;
  }
  const parts = [];
  if (constraint.type) {
    parts.push(getTypeName(constraint.type, { printable: true }));
  }
  if (constraint.valueType) {
    parts.push(`valueof ${getTypeName(constraint.valueType, { printable: true })}`);
  }
  return parts.length > 0 ? `${nameOrPath} extends ${parts.join(" | ")}` : nameOrPath;
}
function getDecoratorSignature(type) {
  const ns = getQualifier(type.namespace);
  const name = type.name.slice(1);
  const parameters = [type.target, ...type.parameters].map((x) => getFunctionParameterSignature(x));
  return `dec ${ns}${name}(${parameters.join(", ")})`;
}
function getOperationSignature(type, includeQualifier = true) {
  const parameters = [...type.parameters.properties.values()].map((p) => getModelPropertySignature(
    p,
    false
    /* includeQualifier */
  ));
  return `op ${getTypeName(type, {
    nameOnly: !includeQualifier
  })}(${parameters.join(", ")}): ${getPrintableTypeName(type.returnType)}`;
}
function getInterfaceSignature(type, includeBody) {
  if (includeBody) {
    const INDENT = "  ";
    const opDesc = Array.from(type.operations).map(([name, op]) => INDENT + getOperationSignature(
      op,
      false
      /* includeQualifier */
    ) + ";");
    return `${type.kind.toLowerCase()} ${getPrintableTypeName(type)} {
${opDesc.join("\n")}
}`;
  } else {
    if (type.node && type.node.kind === SyntaxKind.InterfaceStatement && type.node.templateParameters) {
      type.node.templateParameters.forEach((t) => {
        if (t.default) {
          getRawTextWithCache(t);
        }
      });
    }
  }
  return `${type.kind.toLowerCase()} ${getPrintableTypeName(type)}`;
}
function getModelSignature(type, includeBody) {
  if (includeBody) {
    const propDesc = [];
    const INDENT = "  ";
    for (const prop of walkPropertiesInherited(type)) {
      propDesc.push(INDENT + getModelPropertySignature(
        prop,
        false
        /*includeQualifier*/
      ));
    }
    return `${type.kind.toLowerCase()} ${getPrintableTypeName(type)}{
${propDesc.map((d) => `${d};`).join("\n")}
}`;
  } else {
    if (type.node && (type.node.kind === SyntaxKind.ModelStatement || type.node.kind === SyntaxKind.ModelDeclarationExpression) && type.node.templateParameters) {
      type.node.templateParameters.forEach((t) => {
        if (t.default) {
          getRawTextWithCache(t);
        }
      });
    }
  }
  return `${type.kind.toLowerCase()} ${getPrintableTypeName(type)}`;
}
function getFunctionParameterSignature(parameter) {
  const rest = parameter.rest ? "..." : "";
  const optional = parameter.optional ? "?" : "";
  return `${rest}${printIdentifier(parameter.name, "allow-reserved")}${optional}: ${getEntityName(parameter.type)}`;
}
function getStringTemplateSignature(stringTemplate) {
  return "`" + [
    stringTemplate.spans.map((span) => {
      return span.isInterpolated ? "${" + getTypeName(span.type) + "}" : span.type.value;
    })
  ].join("") + "`";
}
function getModelPropertySignature(property, includeQualifier = true) {
  const ns = includeQualifier ? getQualifier(property.model) : "";
  return `${ns}${printIdentifier(property.name, "allow-reserved")}: ${getPrintableTypeName(property.type)}`;
}
function getUnionVariantSignature(variant) {
  if (typeof variant.name !== "string") {
    return getPrintableTypeName(variant.type);
  }
  const ns = getQualifier(variant.union);
  return `${ns}${printIdentifier(variant.name, "allow-reserved")}: ${getPrintableTypeName(variant.type)}`;
}
function getEnumMemberSignature(member) {
  const ns = getQualifier(member.enum);
  const value = typeof member.value === "string" ? `"${member.value}"` : member.value;
  return value === void 0 ? `${ns}${printIdentifier(member.name, "allow-reserved")}` : `${ns}${printIdentifier(member.name, "allow-reserved")}: ${value}`;
}
async function getAliasSignature(alias) {
  const fullName = getFullyQualifiedSymbolName(alias.symbol);
  const args = await Promise.all(alias.templateParameters.map(async (t, index) => {
    if (t.default) {
      getRawTextWithCache(t.default);
    }
    return await printTypeSpecNode(t);
  }));
  return args.length === 0 ? fullName : `${fullName}<${args.join(", ")}>`;
}
function getQualifier(parent) {
  if (!parent?.name || typeof parent.name !== "string" || parent.kind === "Namespace" && isStdNamespace(parent)) {
    return "";
  }
  const parentName = getPrintableTypeName(parent);
  if (!parentName) {
    return "";
  }
  return parentName + ".";
}
function getPrintableTypeName(type) {
  return getTypeName(type, {
    printable: true
  });
}
function fence(code) {
  return `\`\`\`typespec
${code}
\`\`\``;
}

// node_modules/@typespec/compiler/dist/src/server/type-details.js
async function getSymbolDetails(program, symbol, options = {
  includeSignature: true,
  includeParameterTags: true,
  includeExpandedDefinition: false
}) {
  const lines = [];
  if (options.includeSignature) {
    lines.push(await getSymbolSignature(program, symbol));
  }
  const type = resolveSymbolType(program, symbol);
  const doc = getSymbolDocumentation(program, symbol, type);
  if (doc) {
    lines.push(doc);
  }
  for (const node of symbol.declarations) {
    for (const doc2 of node?.docs ?? []) {
      for (const tag of doc2.tags) {
        if (!options.includeParameterTags && (tag.kind === SyntaxKind.DocParamTag || tag.kind === SyntaxKind.DocTemplateTag)) {
          continue;
        }
        lines.push(
          //prettier-ignore
          `_@${tag.tagName.sv}_${"paramName" in tag ? ` \`${tag.paramName.sv}\`` : ""} \u2014
${getDocContent(tag.content)}`
        );
      }
    }
  }
  if (options.includeExpandedDefinition) {
    lines.push(`*Full Definition:*`);
    lines.push(await getSymbolSignature(program, symbol, {
      includeBody: true
    }));
  }
  if (type) {
    const info = program.getTypeInfo(type);
    if (info) {
      if (lines.length > 0) {
        lines.push("---");
      }
      lines.push(info.content);
    }
  }
  return lines.join("\n\n");
}
function resolveSymbolType(program, symbol) {
  if (symbol.type) {
    return symbol.type;
  }
  const symNode = getSymNode(symbol);
  if (symNode) {
    const entity = program.checker.getTypeOrValueForNode(symNode);
    if (entity && isType(entity)) {
      return entity;
    }
  }
  return void 0;
}
function getSymbolDocumentation(program, symbol, type) {
  const docs = [];
  for (const node of [...symbol.declarations, ...symbol.node ? [symbol.node] : []]) {
    for (const d of node.docs ?? []) {
      docs.push(getDocContent(d.content));
    }
  }
  if (type) {
    const apiDocs = getDocData(program, type);
    if (apiDocs && apiDocs.source === "decorator") {
      docs.push(apiDocs.value);
    }
  }
  return docs.join("\n\n");
}
function getParameterDocumentation(program, type) {
  const map = /* @__PURE__ */ new Map();
  for (const d of type?.node?.docs ?? []) {
    for (const tag of d.tags) {
      if (tag.kind === SyntaxKind.DocParamTag) {
        map.set(tag.paramName.sv, getDocContent(tag.content));
      }
    }
  }
  return map;
}
function getTemplateParameterDocumentation(node) {
  const map = /* @__PURE__ */ new Map();
  for (const d of node?.docs ?? []) {
    for (const tag of d.tags) {
      if (tag.kind === SyntaxKind.DocTemplateTag) {
        map.set(tag.paramName.sv, getDocContent(tag.content));
      }
    }
  }
  return map;
}
function getDocContent(content) {
  const docs = [];
  for (const node of content) {
    compilerAssert(node.kind === SyntaxKind.DocText, "No other doc content node kinds exist yet. Update this code appropriately when more are added.");
    docs.push(node.text);
  }
  return docs.join("");
}

// node_modules/@typespec/compiler/dist/src/server/completion.js
async function resolveCompletion(context, posDetail) {
  let node = posDetail.node;
  if (!node) {
    if (posDetail.triviaStartPosition === 0 || !addCompletionByLookingBackward(posDetail, context)) {
      addKeywordCompletion("root", context.completions);
    }
  } else {
    if (!addCompletionByLookingBackward(posDetail, context)) {
      if (posDetail.inTrivia) {
        node = posDetail.getPositionDetailAfterTrivia().node;
      }
      await AddCompletionNonTrivia(node, context, posDetail);
    } else {
      if (!posDetail.inTrivia) {
        await AddCompletionNonTrivia(node, context, posDetail);
      }
    }
  }
  return context.completions;
}
function addCompletionByLookingBackward(posDetail, context) {
  if (posDetail.triviaStartPosition === 0) {
    return false;
  }
  const preDetail = posDetail.getPositionDetailBeforeTrivia();
  if (!preDetail.node) {
    return false;
  }
  const node = getFirstAncestor(
    preDetail.node,
    (n) => n.kind === SyntaxKind.ModelStatement || n.kind === SyntaxKind.ModelDeclarationExpression || n.kind === SyntaxKind.ScalarStatement || n.kind === SyntaxKind.ScalarDeclarationExpression || n.kind === SyntaxKind.OperationStatement || n.kind === SyntaxKind.InterfaceStatement || n.kind === SyntaxKind.UnionStatement || n.kind === SyntaxKind.TemplateParameterDeclaration,
    true
    /*includeSelf*/
  );
  return node !== void 0 && addCompletionByLookingBackwardNode(node, posDetail, context);
}
function addCompletionByLookingBackwardNode(preNode, posDetail, context) {
  const getIdentifierEndPos = (n) => {
    return n === void 0 || n.pos === n.end ? -1 : n.end;
  };
  const map = {
    [SyntaxKind.ModelStatement]: "modelHeader",
    [SyntaxKind.ModelDeclarationExpression]: "modelHeader",
    [SyntaxKind.ScalarStatement]: "scalarHeader",
    [SyntaxKind.ScalarDeclarationExpression]: "scalarHeader",
    [SyntaxKind.OperationStatement]: "operationHeader",
    [SyntaxKind.InterfaceStatement]: "interfaceHeader",
    [SyntaxKind.UnionStatement]: "unionHeader"
  };
  switch (preNode?.kind) {
    case SyntaxKind.ModelStatement:
    case SyntaxKind.ModelDeclarationExpression:
    case SyntaxKind.ScalarStatement:
    case SyntaxKind.ScalarDeclarationExpression:
    case SyntaxKind.OperationStatement:
    case SyntaxKind.InterfaceStatement:
    case SyntaxKind.UnionStatement:
      const idEndPos = preNode.templateParametersRange.end >= 0 ? preNode.templateParametersRange.end : getIdentifierEndPos(preNode.id);
      if (posDetail.triviaStartPosition === idEndPos) {
        const key = map[preNode.kind];
        if (!key) {
          compilerAssert(false, "KeywordArea missing in keyarea map.");
        }
        addKeywordCompletion(key, context.completions);
        return true;
      }
      break;
    case SyntaxKind.TemplateParameterDeclaration:
      if (posDetail.triviaStartPosition === getIdentifierEndPos(preNode.id)) {
        addKeywordCompletion("templateParameter", context.completions);
        return true;
      } else if (preNode.parent?.templateParametersRange.end === posDetail.triviaStartPosition) {
        return addCompletionByLookingBackwardNode(preNode.parent, posDetail, context);
      }
      break;
  }
  return false;
}
async function AddCompletionNonTrivia(node, context, posDetail, lookBackward = true) {
  if (node === void 0 || node.kind === SyntaxKind.InvalidStatement || node.kind === SyntaxKind.Identifier && (node.parent?.kind === SyntaxKind.TypeSpecScript || node.parent?.kind === SyntaxKind.NamespaceStatement)) {
    addKeywordCompletion("root", context.completions);
  } else {
    switch (node.kind) {
      case SyntaxKind.NamespaceStatement:
        addKeywordCompletion("namespace", context.completions);
        break;
      case SyntaxKind.ScalarStatement:
      case SyntaxKind.ScalarDeclarationExpression:
        if (positionInRange(posDetail.position, node.bodyRange)) {
          addKeywordCompletion("scalarBody", context.completions);
        }
        break;
      case SyntaxKind.Identifier:
        addDirectiveCompletion(context, node);
        await addIdentifierCompletion(context, node);
        break;
      case SyntaxKind.StringLiteral:
        if (node.parent && node.parent.kind === SyntaxKind.ImportStatement) {
          await addImportCompletion(context, node);
        }
        break;
      case SyntaxKind.ModelStatement:
      case SyntaxKind.ModelDeclarationExpression:
      case SyntaxKind.ObjectLiteral:
      case SyntaxKind.ModelExpression:
        await addModelCompletion(context, posDetail);
        break;
    }
  }
}
var keywords = [
  // Root only
  ["import", { root: true }],
  // Root and namespace
  ["using", { root: true, namespace: true }],
  ["model", { root: true, namespace: true }],
  ["scalar", { root: true, namespace: true }],
  ["namespace", { root: true, namespace: true }],
  ["interface", { root: true, namespace: true }],
  ["union", { root: true, namespace: true }],
  ["enum", { root: true, namespace: true }],
  ["alias", { root: true, namespace: true }],
  ["op", { root: true, namespace: true }],
  ["dec", { root: true, namespace: true }],
  ["fn", { root: true, namespace: true }],
  ["const", { root: true, namespace: true }],
  // On model `model Foo <keyword> ...`
  [
    "extends",
    {
      modelHeader: true,
      scalarHeader: true,
      templateParameter: true,
      interfaceHeader: true,
      unionHeader: true
    }
  ],
  ["is", { modelHeader: true, operationHeader: true }],
  // On identifier
  ["true", { identifier: true }],
  ["false", { identifier: true }],
  ["unknown", { identifier: true }],
  ["void", { identifier: true }],
  ["never", { identifier: true }],
  // Modifiers
  ["extern", { root: true, namespace: true }],
  ["internal", { root: true, namespace: true }],
  // Scalars
  ["init", { scalarBody: true }]
];
function addKeywordCompletion(area, completions) {
  const filteredKeywords = keywords.filter(([_, x]) => area in x);
  for (const [keyword] of filteredKeywords) {
    completions.items.push({
      label: keyword,
      kind: import_vscode_languageserver2.CompletionItemKind.Keyword
    });
  }
}
async function loadPackageJson(host, path) {
  const [libPackageJson] = await loadFile(host, path, JSON.parse, () => {
  });
  return libPackageJson;
}
async function isTspLibraryPackage(host, dir) {
  const libPackageJson = await loadPackageJson(host, resolvePath(dir, "package.json"));
  return resolveTspMain(libPackageJson) !== void 0;
}
async function addLibraryImportCompletion({ program, file, completions }, node) {
  const documentPath = file.file.path;
  const projectRoot = await findProjectRoot(program.host.stat, documentPath);
  if (projectRoot !== void 0) {
    const packagejson = await loadPackageJson(program.host, resolvePath(projectRoot, "package.json"));
    let dependencies = [];
    if (packagejson.dependencies !== void 0) {
      dependencies = dependencies.concat(Object.keys(packagejson.dependencies));
    }
    if (packagejson.peerDependencies !== void 0) {
      dependencies = dependencies.concat(Object.keys(packagejson.peerDependencies));
    }
    for (const dependency of dependencies) {
      const dependencyDir = resolvePath(projectRoot, "node_modules", dependency);
      if (await isTspLibraryPackage(program.host, dependencyDir)) {
        const range = {
          start: file.file.getLineAndCharacterOfPosition(node.pos + 1),
          end: file.file.getLineAndCharacterOfPosition(node.end - 1)
        };
        completions.items.push({
          textEdit: import_vscode_languageserver2.TextEdit.replace(range, dependency),
          label: dependency,
          kind: import_vscode_languageserver2.CompletionItemKind.Module
        });
      }
    }
  }
}
async function addImportCompletion(context, node) {
  if (node.value.startsWith("./") || node.value.startsWith("../")) {
    await addRelativePathCompletion(context, node);
  } else if (!node.value.startsWith(".")) {
    await addLibraryImportCompletion(context, node);
  }
}
async function tryListItemInDir(host, path) {
  try {
    return await host.readDir(path);
  } catch (e) {
    if (e.code === "ENOENT") {
      return [];
    }
    throw e;
  }
}
async function addRelativePathCompletion({ program, completions, file }, node) {
  const documentPath = file.file.path;
  const documentFile = getBaseFileName(documentPath);
  const documentDir = getDirectoryPath(documentPath);
  const currentRelativePath = hasTrailingDirectorySeparator(node.value) ? node.value : getDirectoryPath(node.value);
  const currentAbsolutePath = resolvePath(documentDir, currentRelativePath);
  const files = (await tryListItemInDir(program.host, currentAbsolutePath)).filter((x) => x !== documentFile && x !== "node_modules");
  const lastSlash = node.value.lastIndexOf("/");
  const offset = lastSlash === -1 ? 0 : lastSlash + 1;
  const range = {
    start: file.file.getLineAndCharacterOfPosition(node.pos + 1 + offset),
    end: file.file.getLineAndCharacterOfPosition(node.end - 1)
  };
  for (const file2 of files) {
    const extension = getAnyExtensionFromPath(file2);
    switch (extension) {
      case ".tsp":
      case ".js":
      case ".mjs":
        completions.items.push({
          label: file2,
          kind: import_vscode_languageserver2.CompletionItemKind.File,
          textEdit: import_vscode_languageserver2.TextEdit.replace(range, file2)
        });
        break;
      case "":
        completions.items.push({
          label: file2,
          kind: import_vscode_languageserver2.CompletionItemKind.Folder,
          textEdit: import_vscode_languageserver2.TextEdit.replace(range, file2)
        });
        break;
    }
  }
}
async function addModelCompletion(context, posDetail) {
  const node = posDetail.node;
  if (!node || node.kind !== SyntaxKind.ModelStatement && node.kind !== SyntaxKind.ModelDeclarationExpression && node.kind !== SyntaxKind.ModelExpression && node.kind !== SyntaxKind.ObjectLiteral) {
    return;
  }
  if (posDetail.position === node.bodyRange.end) {
    return;
  } else {
    const fakeProp = {
      kind: node.kind === SyntaxKind.ObjectLiteral ? SyntaxKind.ObjectLiteralProperty : SyntaxKind.ModelProperty,
      flags: NodeFlags.None,
      parent: node
    };
    const fakeId = {
      kind: SyntaxKind.Identifier,
      sv: "",
      flags: NodeFlags.None,
      parent: fakeProp
    };
    await addIdentifierCompletion(context, fakeId);
  }
}
async function addIdentifierCompletion({ program, completions }, node) {
  const result = program.checker.resolveCompletions(node);
  if (result.size === 0) {
    return;
  }
  const sourceLocation = getLocationContext(program, node);
  for (const [key, { sym, label, suffix }] of result) {
    if (!canAccessCompletionSymbol(sym, sourceLocation)) {
      continue;
    }
    let kind;
    let deprecated = false;
    const symNode = getSymNode(sym);
    const type = sym.type ?? (symNode ? program.checker.getTypeForNode(symNode) : void 0);
    if (sym.flags & (SymbolFlags.Function | SymbolFlags.Decorator)) {
      kind = import_vscode_languageserver2.CompletionItemKind.Function;
    } else if (sym.flags & SymbolFlags.Namespace && symNode?.kind !== SyntaxKind.NamespaceStatement) {
      kind = import_vscode_languageserver2.CompletionItemKind.Module;
    } else if (symNode?.kind === SyntaxKind.AliasStatement) {
      kind = import_vscode_languageserver2.CompletionItemKind.Variable;
      deprecated = getDeprecationDetails(program, symNode) !== void 0;
    } else {
      kind = type ? getCompletionItemKind(program, type) : import_vscode_languageserver2.CompletionItemKind.Variable;
      deprecated = type ? getDeprecationDetails(program, type) !== void 0 : false;
    }
    const documentation = await getSymbolDetails(program, sym);
    const item = {
      label: label ?? key,
      documentation: documentation ? {
        kind: import_vscode_languageserver2.MarkupKind.Markdown,
        value: documentation
      } : void 0,
      kind
    };
    if ((item.label === "indexer" || item.label === "docFromComment") && item.kind === import_vscode_languageserver2.CompletionItemKind.Function && sym.parent?.name === "TypeSpec" && item.documentation === void 0) {
      continue;
    }
    const identifierContext = getIdentifierPrintContext(node);
    const insertionText = printIdentifier(key, identifierContext) + (suffix ?? "");
    if (node.pos === node.end) {
      item.insertText = insertionText;
    } else {
      const targetNode = getSourceLocation(node);
      const start = targetNode.file.getLineAndCharacterOfPosition(node.pos);
      const end = targetNode.file.getLineAndCharacterOfPosition(node.end);
      if (sym.name.startsWith("$")) {
        item.textEdit = import_vscode_languageserver2.TextEdit.replace(import_vscode_languageserver2.Range.create(start, start), insertionText);
      } else {
        item.textEdit = import_vscode_languageserver2.TextEdit.replace(import_vscode_languageserver2.Range.create(start, end), insertionText);
      }
    }
    if (deprecated) {
      continue;
    }
    completions.items.push(item);
  }
  if (node.parent?.kind === SyntaxKind.TypeReference) {
    addKeywordCompletion("identifier", completions);
  }
  function canAccessCompletionSymbol(sym, sourceLocation2) {
    const isInternalDeclaration = (sym.flags & (SymbolFlags.Internal | SymbolFlags.Declaration)) === (SymbolFlags.Internal | SymbolFlags.Declaration);
    if (!isInternalDeclaration)
      return true;
    if (sourceLocation2.type === "synthetic" || sourceLocation2.type === "compiler")
      return true;
    return sym.declarations.some((decl) => {
      const declLocation = getLocationContext(program, decl);
      if (declLocation.type !== sourceLocation2.type)
        return false;
      if (declLocation.type === "project")
        return true;
      return declLocation === sourceLocation2;
    });
  }
}
function getIdentifierPrintContext(node) {
  switch (node.parent?.kind) {
    case SyntaxKind.MemberExpression:
    case SyntaxKind.ModelProperty:
    case SyntaxKind.ObjectLiteralProperty:
      return "allow-reserved";
    default:
      return "disallow-reserved";
  }
}
var directiveNames = ["suppress", "deprecated"];
function addDirectiveCompletion({ completions }, node) {
  if (!(node.parent?.kind === SyntaxKind.DirectiveExpression && node.parent.target === node)) {
    return;
  }
  for (const directive of directiveNames) {
    completions.items.push({
      label: directive,
      kind: import_vscode_languageserver2.CompletionItemKind.Keyword
    });
  }
}
function getCompletionItemKind(program, target) {
  switch (target.node?.kind) {
    case SyntaxKind.EnumStatement:
    case SyntaxKind.EnumDeclarationExpression:
    case SyntaxKind.UnionStatement:
    case SyntaxKind.UnionDeclarationExpression:
      return import_vscode_languageserver2.CompletionItemKind.Enum;
    case SyntaxKind.EnumMember:
    case SyntaxKind.UnionVariant:
      return import_vscode_languageserver2.CompletionItemKind.EnumMember;
    case SyntaxKind.AliasStatement:
      return import_vscode_languageserver2.CompletionItemKind.Variable;
    case SyntaxKind.ModelStatement:
    case SyntaxKind.ModelDeclarationExpression:
      return import_vscode_languageserver2.CompletionItemKind.Class;
    case SyntaxKind.ScalarStatement:
    case SyntaxKind.ScalarDeclarationExpression:
      return import_vscode_languageserver2.CompletionItemKind.Unit;
    case SyntaxKind.ModelProperty:
      return import_vscode_languageserver2.CompletionItemKind.Field;
    case SyntaxKind.OperationStatement:
      return import_vscode_languageserver2.CompletionItemKind.Method;
    case SyntaxKind.NamespaceStatement:
      return import_vscode_languageserver2.CompletionItemKind.Module;
    default:
      return import_vscode_languageserver2.CompletionItemKind.Struct;
  }
}

// node_modules/@typespec/compiler/dist/src/server/diagnostics.js
init_define_process_env();
var import_vscode_languageserver3 = __toESM(require_api3(), 1);
function convertDiagnosticToLsp(fileService, program, document, diagnostic) {
  const root = getVSLocation(fileService, getSourceLocation(diagnostic.target, { locateId: true }), document);
  if (root === void 0 || !fileService.upToDate(root.document))
    return [];
  const instantiationNodes = getDiagnosticTemplateInstantitationTrace(diagnostic.target);
  const relatedInformation = [];
  const relatedDiagnostics = [];
  if (instantiationNodes.length > 0) {
    const items = instantiationNodes.map((node) => getVSLocationWithTypeInfo(program, fileService, node, document)).filter(isDefined);
    for (const location of items) {
      relatedInformation.push({
        location: { uri: location.document.uri, range: location.range },
        message: `in instantiation of template \`${location.typeName}\``
      });
    }
    const [last, ...rest] = [...items].reverse();
    if (last) {
      relatedDiagnostics.push([
        createLspDiagnostic({
          range: last.range,
          message: `In instantiation of this template:`,
          severity: import_vscode_languageserver3.DiagnosticSeverity.Warning,
          code: diagnostic.code,
          relatedInformation: [
            ...rest.map((location) => ({
              location: { uri: location.document.uri, range: location.range },
              message: `in instantiation of template \`${location.typeName}\``
            })),
            {
              location: { uri: root.document.uri, range: root.range },
              message: diagnostic.message
            }
          ]
        }),
        last.document
      ]);
    }
  }
  const rootDiagnostic = [
    createLspDiagnostic({
      range: root.range,
      message: diagnostic.message,
      severity: convertSeverity(diagnostic.severity),
      code: diagnostic.code,
      relatedInformation
    }),
    root.document
  ];
  return [rootDiagnostic, ...relatedDiagnostics];
}
function createLspDiagnostic(diag) {
  return {
    source: "TypeSpec",
    ...diag
  };
}
function getDocumentForLocation(fileService, location, currentDocument) {
  if (location?.file) {
    const doc = location.file.document;
    if (doc) {
      return doc;
    }
    const opened = fileService.getOpenDocument(location.file.path);
    if (opened) {
      const initVersion = fileService.getOpenDocumentInitVersion(opened.uri);
      if (opened.version === initVersion) {
        return opened;
      }
    }
    return void 0;
  } else {
    return currentDocument;
  }
}
function getVSLocation(fileService, location, currentDocument) {
  if (location === void 0)
    return void 0;
  const document = getDocumentForLocation(fileService, location, currentDocument);
  if (!document) {
    return void 0;
  }
  const start = document.positionAt(location?.pos ?? 0);
  const end = document.positionAt(location?.end ?? 0);
  return { range: { start, end }, document };
}
function getVSLocationWithTypeInfo(program, fileService, node, document) {
  const location = getVSLocation(fileService, getSourceLocation(node, { locateId: true }), document);
  if (location === void 0)
    return void 0;
  return {
    ...location,
    node,
    typeName: getTypeName(program.checker.getTypeForNode(node))
  };
}
function convertSeverity(severity) {
  switch (severity) {
    case "warning":
      return import_vscode_languageserver3.DiagnosticSeverity.Warning;
    case "error":
      return import_vscode_languageserver3.DiagnosticSeverity.Error;
  }
}

// node_modules/@typespec/compiler/dist/src/server/file-service.js
init_define_process_env();
function createFileService({ serverHost }) {
  const compilerHost = serverHost.compilerHost;
  const pathToURLMap = /* @__PURE__ */ new Map();
  const documentsOpenedInitVersion = /* @__PURE__ */ new Map();
  return {
    upToDate,
    fileURLToRealPath,
    getPath,
    getURL,
    getOpenDocument,
    getOpenDocumentInitVersion,
    notifyDocumentOpened,
    notifyDocumentClosed
  };
  function upToDate(document) {
    if (!("version" in document)) {
      return true;
    }
    return document.version === serverHost.getOpenDocumentByURL(document.uri)?.version;
  }
  async function fileURLToRealPath(url) {
    return getNormalizedRealPath(compilerHost, compilerHost.fileURLToPath(url));
  }
  async function getPath(document) {
    if (isUntitled(document.uri)) {
      return document.uri;
    }
    const path = await fileURLToRealPath(document.uri);
    pathToURLMap.set(path, document.uri);
    return path;
  }
  function getURL(path) {
    if (isUntitled(path)) {
      return path;
    }
    return pathToURLMap.get(path) ?? compilerHost.pathToFileURL(path);
  }
  function getOpenDocument(path) {
    const url = getURL(path);
    return url ? serverHost.getOpenDocumentByURL(url) : void 0;
  }
  function getOpenDocumentInitVersion(uri) {
    return documentsOpenedInitVersion.get(uri) ?? void 0;
  }
  function notifyDocumentOpened(arg) {
    if (documentsOpenedInitVersion.has(arg.document.uri)) {
      serverHost.log({
        level: "debug",
        message: "Document already opened",
        detail: arg.document.uri
      });
    }
    documentsOpenedInitVersion.set(arg.document.uri, arg.document.version);
  }
  function notifyDocumentClosed(arg) {
    if (!documentsOpenedInitVersion.has(arg.document.uri)) {
      serverHost.log({
        level: "debug",
        message: "Document already closed",
        detail: arg.document.uri
      });
    }
    documentsOpenedInitVersion.delete(arg.document.uri);
  }
}
function isUntitled(pathOrUrl) {
  return pathOrUrl.startsWith("untitled:");
}

// node_modules/@typespec/compiler/dist/src/server/file-system-cache.js
init_define_process_env();
function createFileSystemCache({ fileService, log }) {
  const cache = /* @__PURE__ */ new Map();
  let changes = [];
  return {
    async get(path) {
      for (const change of changes) {
        const path2 = await fileService.fileURLToRealPath(change.uri);
        log({
          level: "trace",
          message: `FileSystemCache entry with key '${path2}' removed`
        });
        cache.delete(path2);
      }
      changes = [];
      const r = cache.get(path);
      if (!r) {
        let callstack;
        try {
          const target = {};
          if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(target);
            callstack = target.stack.substring("Error\n".length);
          }
        } catch {
        }
        log({ level: "trace", message: `FileSystemCache miss for ${path}`, detail: callstack });
      }
      return r;
    },
    set(path, entry) {
      cache.set(path, entry);
    },
    async setData(path, data) {
      const entry = await this.get(path);
      if (entry) {
        entry.data = data;
      }
    },
    notify(events) {
      changes.push(...events);
    }
  };
}

// node_modules/@typespec/compiler/dist/src/server/lib-provider.js
init_define_process_env();
var LibraryProvider = class {
  npmPackageProvider;
  filter;
  libPackageFilterResultCache = /* @__PURE__ */ new Map();
  constructor(npmPackageProvider, filter) {
    this.npmPackageProvider = npmPackageProvider;
    this.filter = filter;
  }
  /**
   *
   * @param startFolder folder starts to search for package.json with library defined as dependencies
   * @returns
   */
  async listLibraries(startFolder) {
    const packageJsonFolder = await this.npmPackageProvider.getPackageJsonFolder(startFolder);
    if (!packageJsonFolder)
      return {};
    const pkg = await this.npmPackageProvider.get(packageJsonFolder);
    const data = await pkg?.getPackageJsonData();
    if (!data)
      return {};
    const libs = {};
    const allDep = {
      ...data.dependencies ?? {},
      ...data.devDependencies ?? {}
    };
    for (const dep of Object.keys(allDep)) {
      const depPkg = await this.getLibraryFromDep(packageJsonFolder, dep);
      if (depPkg) {
        libs[dep] = depPkg;
      }
    }
    return libs;
  }
  /**
   *
   * @param startFolder folder starts to search for package.json with library defined as dependencies
   * @param libName
   * @returns
   */
  async getLibrary(startFolder, libName) {
    const packageJsonFolder = await this.npmPackageProvider.getPackageJsonFolder(startFolder);
    if (!packageJsonFolder) {
      return void 0;
    }
    return this.getLibraryFromDep(packageJsonFolder, libName);
  }
  async getLibFilterResult(depName, pkg) {
    if (this.libPackageFilterResultCache.has(depName)) {
      return this.libPackageFilterResultCache.get(depName);
    }
    const data = await pkg.getPackageJsonData();
    if (!data)
      return false;
    if (data.peerDependencies && data.peerDependencies["@typespec/compiler"] || data.dependencies && data.dependencies["@typespec/compiler"]) {
      const exports = await pkg.getModuleExports();
      if (!exports)
        return false;
      const filterResult = this.filter(exports);
      this.libPackageFilterResultCache.set(depName, filterResult);
      return filterResult;
    } else {
      this.libPackageFilterResultCache.set(depName, false);
      return false;
    }
  }
  async getLibraryFromDep(packageJsonFolder, depName) {
    const depFolder = joinPaths(packageJsonFolder, "node_modules", depName);
    const depPkg = await this.npmPackageProvider.get(depFolder);
    if (depPkg && await this.getLibFilterResult(depName, depPkg)) {
      return depPkg;
    }
    return void 0;
  }
};

// node_modules/@typespec/compiler/dist/src/server/npm-package-provider.js
init_define_process_env();
var NpmPackageProvider = class {
  host;
  pkgCache = /* @__PURE__ */ new Map();
  constructor(host) {
    this.host = host;
  }
  notify(changes) {
    let folders = changes.map((c) => normalizePath(this.host.fileURLToPath(c.uri))).filter((c) => c.endsWith("/package.json")).map((c) => getDirectoryPath(c));
    folders = distinctArray(folders, (f) => f);
    for (const folder of folders) {
      const pkg = this.pkgCache.get(folder);
      if (pkg) {
        pkg.resetCache();
        const nodeModulesFolder = joinPaths(folder, "node_modules");
        this.pkgCache.forEach((nmPkg, key) => {
          if (key.startsWith(nodeModulesFolder)) {
            nmPkg.resetCache();
          }
        });
      }
    }
  }
  /**
   * Search for the nearest package.json file starting from the given folder to its parent/grandparent/... folders
   * @param startFolder the folder to start searching for package.json file
   * @returns
   */
  async getPackageJsonFolder(startFolder) {
    if (isWhitespaceStringOrUndefined(startFolder)) {
      return void 0;
    }
    let lastFolder = "";
    let curFolder = startFolder;
    while (curFolder !== lastFolder) {
      const packageJsonPath = joinPaths(curFolder, "package.json");
      try {
        const stat = await this.host.stat(packageJsonPath);
        if (stat.isFile()) {
          return curFolder;
        }
      } catch (e) {
      }
      lastFolder = curFolder;
      curFolder = getDirectoryPath(curFolder);
    }
    return void 0;
  }
  /**
   * Get the NpmPackage instance from the folder containing the package.json file.
   *
   * @param packageJsonFolder the dir containing the package.json file. This method won't search for the package.json file, use getPackageJsonFolder to search for the folder containing the package.json file if needed.
   * @returns the NpmPackage instance or undefined if no proper package.json file found
   */
  async get(packageJsonFolder) {
    const key = normalizePath(packageJsonFolder);
    const r = this.pkgCache.get(key);
    if (r) {
      return r;
    } else {
      const pkg = await NpmPackage.createFrom(this.host, packageJsonFolder);
      if (pkg) {
        this.pkgCache.set(key, pkg);
        return pkg;
      } else {
        return void 0;
      }
    }
  }
  resetCache() {
    const t = this.pkgCache;
    this.pkgCache = /* @__PURE__ */ new Map();
    t.forEach((pkg) => {
      pkg.resetCache();
    });
  }
  /**
   * reset the status of the provider with all the caches properly cleaned up
   */
  reset() {
    this.resetCache();
  }
};
var NpmPackage = class _NpmPackage {
  host;
  packageJsonFolder;
  packageJsonData;
  constructor(host, packageJsonFolder, packageJsonData) {
    this.host = host;
    this.packageJsonFolder = packageJsonFolder;
    this.packageJsonData = packageJsonData;
  }
  async getPackageJsonData() {
    if (!this.packageJsonData) {
      this.packageJsonData = await _NpmPackage.loadNodePackage(this.host, this.packageJsonFolder);
    }
    return this.packageJsonData;
  }
  packageModule;
  async getModuleExports() {
    if (!this.packageModule) {
      const data = await this.getPackageJsonData();
      if (!data)
        return void 0;
      this.packageModule = await _NpmPackage.loadModuleExports(this.host, this.packageJsonFolder, data.name);
    }
    return this.packageModule;
  }
  resetCache() {
    this.packageJsonData = void 0;
    this.packageModule = void 0;
  }
  /**
   * Create a NpmPackage instance from a folder containing a package.json file. Make sure to dispose the instance when you finish using it.
   * @param packageJsonFolder the folder containing the package.json file
   * @returns
   */
  static async createFrom(host, packageJsonFolder) {
    if (!packageJsonFolder) {
      return void 0;
    }
    const data = await _NpmPackage.loadNodePackage(host, packageJsonFolder);
    if (!data) {
      return void 0;
    }
    return new _NpmPackage(host, packageJsonFolder, data);
  }
  /**
   *
   * @param packageJsonFolder the folder containing the package.json file
   * @returns
   */
  static async loadNodePackage(host, packageJsonFolder) {
    if (!packageJsonFolder) {
      return void 0;
    }
    const packageJsonPath = joinPaths(packageJsonFolder, "package.json");
    try {
      if (!(await host.stat(packageJsonPath)).isFile()) {
        return void 0;
      }
      const content = await host.readFile(packageJsonPath);
      const data = tryParseJson(content.text);
      if (!data || !data.name) {
        return void 0;
      }
      return data;
    } catch {
      return void 0;
    }
  }
  static async loadModuleExports(host, baseDir, packageName) {
    try {
      const module = await resolveModule({
        realpath: host.realpath,
        readFile: async (path) => {
          const sf = await host.readFile(path);
          return sf.text;
        },
        stat: host.stat
      }, packageName, { baseDir });
      if (!module) {
        return void 0;
      }
      const entrypoint = module.type === "file" ? module.path : module.mainFile;
      const oldExit = process.exit;
      try {
        let result;
        process.exit = (() => {
          result = {};
          throw new Error("process.exit is called unexpectedly when loading js file: " + entrypoint);
        });
        const [file] = await loadJsFile(host, entrypoint, NoTarget);
        return result ?? file?.esmExports;
      } finally {
        process.exit = oldExit;
      }
    } catch (e) {
      return void 0;
    }
  }
};

// node_modules/@typespec/compiler/dist/src/server/rename-file.js
init_define_process_env();
var import_vscode_languageserver4 = __toESM(require_api3(), 1);
function getRenameImportEdit(node, newImport) {
  const location = getSourceLocation(node);
  const lineAndChar = location.file.getLineAndCharacterOfPosition(node.path.pos);
  return import_vscode_languageserver4.TextEdit.replace(import_vscode_languageserver4.Range.create(import_vscode_languageserver4.Position.create(lineAndChar.line, lineAndChar.character + 1), import_vscode_languageserver4.Position.create(lineAndChar.line, lineAndChar.character + node.path.value.length + 1)), newImport);
}
function getUpdatedImportValue(target, params) {
  const filePath = getSourceLocation(target).file.path;
  const fileDir = getDirectoryPath(filePath);
  const importTarget = resolvePath(fileDir, target.path.value);
  const oldPath = params.oldPath;
  if (importTarget === oldPath || importTarget.startsWith(oldPath)) {
    let newPath = params.newPath;
    if (params.isDirRename) {
      const relativeToOldPath = getRelativePathFromDirectory(oldPath, importTarget, false);
      newPath = resolvePath(newPath, relativeToOldPath);
    }
    const replaceText = getRelativePathFromDirectory(fileDir, newPath, false);
    return {
      newValue: replaceText.startsWith(".") ? replaceText : `./${replaceText}`,
      filePath
    };
  }
  return void 0;
}

// node_modules/@typespec/compiler/dist/src/server/symbol-structure.js
init_define_process_env();
var import_vscode_languageserver5 = __toESM(require_api3(), 1);
function getSymbolStructure(ast) {
  const file = ast.file;
  const fileNamespace = findFileNamespace(ast);
  if (fileNamespace === void 0) {
    return getForStatements(ast.statements);
  }
  const fileNamespaceSymbol = getForNamespace(fileNamespace);
  fileNamespaceSymbol.children = getForStatements(ast.statements.filter((x) => x !== fileNamespace));
  return [fileNamespaceSymbol];
  function findFileNamespace(ast2) {
    const firstNamespace = ast2.statements.find((x) => x.kind === SyntaxKind.NamespaceStatement);
    if (firstNamespace === void 0) {
      return void 0;
    }
    let current = firstNamespace;
    while (current.statements !== void 0 && !isArray(current.statements) && current.statements?.kind === SyntaxKind.NamespaceStatement) {
      current = current.statements;
    }
    return current.statements === void 0 ? firstNamespace : void 0;
  }
  function getDocumentSymbolsForNode(node) {
    switch (node.kind) {
      case SyntaxKind.NamespaceStatement:
        return getForNamespace(node);
      case SyntaxKind.ModelStatement:
        return getForModel(node);
      case SyntaxKind.ModelProperty:
        return createDocumentSymbol(node, getName(node.id), import_vscode_languageserver5.SymbolKind.Property);
      case SyntaxKind.ModelSpreadProperty:
        return getForModelSpread(node);
      case SyntaxKind.UnionStatement:
        return getForUnion(node);
      case SyntaxKind.UnionVariant:
        return node.id === void 0 ? void 0 : createDocumentSymbol(node, getName(node.id), import_vscode_languageserver5.SymbolKind.EnumMember);
      case SyntaxKind.EnumStatement:
        return getForEnum(node);
      case SyntaxKind.EnumMember:
        return createDocumentSymbol(node, getName(node.id), import_vscode_languageserver5.SymbolKind.EnumMember);
      case SyntaxKind.EnumSpreadMember:
        return getForEnumSpread(node);
      case SyntaxKind.InterfaceStatement:
        return getForInterface(node);
      case SyntaxKind.OperationStatement:
        return createDocumentSymbol(node, node.id.sv, import_vscode_languageserver5.SymbolKind.Function);
      case SyntaxKind.AliasStatement:
        return createDocumentSymbol(node, node.id.sv, import_vscode_languageserver5.SymbolKind.Variable);
      default:
        return void 0;
    }
  }
  function getForStatements(statements) {
    return statements.map(getDocumentSymbolsForNode).filter(isDefined);
  }
  function getForNamespace(namespace2) {
    const names = [namespace2.id.sv];
    let current = namespace2;
    while (current.statements !== void 0 && !isArray(current.statements) && current.statements?.kind === SyntaxKind.NamespaceStatement) {
      current = current.statements;
      names.push(current.id.sv);
    }
    const statementSymbols = current.statements ? getForStatements(current.statements) : [];
    return createDocumentSymbol(namespace2, names.join("."), import_vscode_languageserver5.SymbolKind.Namespace, statementSymbols);
  }
  function createDocumentSymbol(node, name, kind, symbols) {
    const start = file.getLineAndCharacterOfPosition(node.pos);
    const end = file.getLineAndCharacterOfPosition(node.end);
    const range = import_vscode_languageserver5.Range.create(start, end);
    const safeName = name || "<anonymous>";
    return import_vscode_languageserver5.DocumentSymbol.create(safeName, void 0, kind, range, range, symbols);
  }
  function getName(id) {
    return id.kind === SyntaxKind.Identifier ? id.sv : id.value;
  }
  function getForModel(node) {
    const properties = [...node.properties.values()].map(getDocumentSymbolsForNode).filter(isDefined);
    return createDocumentSymbol(node, node.id.sv, import_vscode_languageserver5.SymbolKind.Struct, properties);
  }
  function getForModelSpread(node) {
    const target = node.target.target;
    if (target.kind === SyntaxKind.Identifier) {
      return createDocumentSymbol(node, target.sv, import_vscode_languageserver5.SymbolKind.Property);
    }
    return getDocumentSymbolsForNode(target);
  }
  function getForEnum(node) {
    const members = [...node.members.values()].map(getDocumentSymbolsForNode).filter(isDefined);
    return createDocumentSymbol(node, node.id.sv, import_vscode_languageserver5.SymbolKind.Enum, members);
  }
  function getForEnumSpread(node) {
    const target = node.target.target;
    if (target.kind === SyntaxKind.Identifier) {
      return createDocumentSymbol(node, target.sv, import_vscode_languageserver5.SymbolKind.EnumMember);
    }
    return getDocumentSymbolsForNode(target);
  }
  function getForInterface(node) {
    const operations = [...node.operations.values()].map(getDocumentSymbolsForNode).filter(isDefined);
    return createDocumentSymbol(node, node.id.sv, import_vscode_languageserver5.SymbolKind.Interface, operations);
  }
  function getForUnion(node) {
    const variants = [...node.options.values()].map(getDocumentSymbolsForNode).filter(isDefined);
    return createDocumentSymbol(node, node.id.sv, import_vscode_languageserver5.SymbolKind.Enum, variants);
  }
}

// node_modules/@typespec/compiler/dist/src/server/tspconfig/completion.js
init_define_process_env();
var import_vscode_languageserver6 = __toESM(require_api3(), 1);

// node_modules/@typespec/compiler/dist/src/server/yaml-resolver.js
init_define_process_env();
function resolveYamlPositionDetail(document, position, log) {
  const pos = document.offsetAt(position);
  const content = document.getText();
  const lines = content.split("\n");
  const targetLine = lines[position.line];
  const yamlDoc = parseDocument(content, {
    keepSourceTokens: true
  });
  if (!yamlDoc) {
    return void 0;
  }
  if (isCommentLine(targetLine) && position.character > firstNonWhitespaceCharacterIndex(targetLine)) {
    return void 0;
  }
  if (isWhitespaceStringOrUndefined(targetLine) || isCommentLine(targetLine)) {
    const indent = position.character;
    if (indent === 0) {
      const rootProperties = [];
      if (isMap(yamlDoc.contents)) {
        rootProperties.push(...yamlDoc.contents.items.map((item) => item.key.source ?? ""));
      } else if (isScalar(yamlDoc.contents) && !isWhitespaceStringOrUndefined(yamlDoc.contents.source)) {
        rootProperties.push(yamlDoc.contents.source);
      }
      return {
        path: [""],
        type: "key",
        source: "",
        sourceType: "PLAIN",
        siblings: rootProperties,
        yamlDoc,
        sourceRange: void 0,
        cursorPosition: pos
      };
    }
    for (let i = position.line - 1; i >= 0; i--) {
      const preLine = lines[i];
      if (isWhitespaceStringOrUndefined(preLine) || isCommentLine(preLine)) {
        continue;
      }
      const preIndent = getIndentOfYamlLine(preLine);
      if (preIndent === -1) {
        return void 0;
      }
      if (preIndent === indent) {
        const found = findScalarNode(yamlDoc, document.offsetAt({
          line: i,
          character: preIndent
        }));
        if (!found) {
          log({
            level: "debug",
            message: `Failed to find the scalar node in the found previous sibling line of empty line. curLine: ${targetLine}, preLine: ${preLine}`
          });
          return void 0;
        }
        const yp = createYamlPathFromVisitScalarNode(found, pos, log, yamlDoc);
        if (!yp || yp.path.length === 0) {
          log({
            level: "debug",
            message: `Unexpected found path which should at least contains one segment for the found previous non-empty line item`
          });
          return void 0;
        }
        if (yp.type === "arr-item") {
          return void 0;
        } else {
          return {
            path: [...yp.path.slice(0, yp.path.length - 1), ""],
            type: "key",
            source: "",
            sourceType: "PLAIN",
            siblings: [...yp.siblings, yp.source],
            yamlDoc,
            sourceRange: yp.sourceRange,
            cursorPosition: pos
          };
        }
        break;
      } else if (preIndent < indent) {
        const found = findScalarNode(yamlDoc, document.offsetAt({
          line: i,
          character: preIndent
        }));
        if (!found) {
          log({
            level: "debug",
            message: `Failed to find the scalar node in the found previous parent line of empty line. curLine: ${targetLine}, preLine: ${preLine}`
          });
          return void 0;
        }
        const last = found.path[found.path.length - 1];
        if (isPair(last) && (last.value === null || isMap(last.value) || isScalar(last.value) && isWhitespaceStringOrUndefined(last.value.source))) {
          const yp = createYamlPathFromVisitScalarNode(found, pos, log, yamlDoc);
          if (!yp || yp.path.length === 0) {
            log({
              level: "debug",
              message: `Unexpected found path which should at least contains one segment for the found previous non-empty line item`
            });
            return void 0;
          }
          return {
            path: [...yp.path, ""],
            type: "key",
            source: "",
            sourceType: "PLAIN",
            siblings: isMap(last.value) ? last.value?.items.map((item) => item.key.source ?? "") ?? [] : [],
            yamlDoc,
            sourceRange: yp.sourceRange,
            cursorPosition: pos
          };
        }
        break;
      }
    }
    return void 0;
  } else {
    const found = findScalarNode(yamlDoc, pos);
    if (!found) {
      log({
        level: "debug",
        message: `Failed to find the scalar node at the position: ${pos}`
      });
      return void 0;
    }
    const yp = createYamlPathFromVisitScalarNode(found, pos, log, yamlDoc);
    return yp;
  }
}
function createYamlPathFromVisitScalarNode(info, offset, log, yamlDoc) {
  const { key, n, path: nodePath } = info;
  if (nodePath.length === 0) {
    log({
      level: "debug",
      message: `Unexpected path structure, nodePath is empty while we always expect at least a root doc node`
    });
    return void 0;
  }
  const path = [];
  for (let i = 0; i < nodePath.length; i++) {
    const seg = nodePath[i];
    if (isPair(seg)) {
      path.push(seg.key.source ?? "");
    } else if (isSeq(seg)) {
      const next = nodePath.length > i + 1 ? nodePath[i + 1] : n;
      const index = seg.items.findIndex((item) => item === next);
      if (index >= 0) {
        path.push(index.toString());
      } else {
        log({
          level: "debug",
          message: `Unexpected path structure. the next element isn't found in the sequence(array): ${next.toJSON()}`
        });
        return void 0;
      }
    }
  }
  const last = nodePath[nodePath.length - 1];
  let curSourceRange = void 0;
  if (n.range) {
    const [startPos, endPos] = n.range;
    curSourceRange = { pos: startPos, end: endPos };
  }
  if (isDocument(last)) {
    return {
      path: [],
      type: key === null ? "key" : "value",
      source: n.source ?? "",
      sourceType: n.type ?? "PLAIN",
      siblings: [],
      yamlDoc,
      sourceRange: curSourceRange,
      cursorPosition: offset
    };
  } else if (isPair(last)) {
    if (nodePath.length < 2) {
      log({
        level: "debug",
        message: `Unexpected path structure, the pair node should have a parent node: ${last.toString()}`
      });
      return void 0;
    }
    const newline = last.srcToken?.sep?.find((t) => t.type === "newline");
    if (key === "value" && newline && newline.offset < offset) {
      path.push(n.source ?? "");
      return {
        path,
        type: "key",
        source: n.source ?? "",
        sourceType: n.type ?? "PLAIN",
        siblings: [],
        yamlDoc,
        sourceRange: curSourceRange,
        cursorPosition: offset
      };
    } else {
      const parent = nodePath.length >= 2 ? nodePath[nodePath.length - 2] : void 0;
      const targetSiblings = isMap(parent) ? parent.items.filter((item) => item !== last).map((item) => item.key.source ?? "") : [];
      return {
        path,
        type: key === "key" ? "key" : "value",
        source: n.source ?? "",
        siblings: targetSiblings,
        sourceType: n.type ?? "PLAIN",
        yamlDoc,
        sourceRange: curSourceRange,
        cursorPosition: offset
      };
    }
  } else if (isSeq(last)) {
    return {
      path,
      type: "arr-item",
      source: n.source ?? "",
      sourceType: n.type ?? "PLAIN",
      siblings: last.items.filter((i) => i !== n).map((item) => isScalar(item) ? item.source ?? "" : ""),
      yamlDoc,
      sourceRange: curSourceRange,
      cursorPosition: offset
    };
  } else {
    log({
      level: "debug",
      message: `Unexpected path structure, last element is not pair or seq for scalar node: ${last.toString()}`
    });
    return void 0;
  }
}
function isCommentLine(line) {
  return line.trimStart().startsWith("#");
}
function getIndentOfYamlLine(line) {
  return line.search(/[^\s-]/);
}
function findScalarNode(document, pos) {
  let found = void 0;
  visit(document, {
    Node: (key, n, path) => {
      if (isScalar(n)) {
        const [start, endValue, _endNode] = n.range ?? [];
        if (start === void 0 || endValue === void 0)
          return void 0;
        if (start <= pos && pos <= endValue) {
          found = { key, n, path };
          return visit.BREAK;
        }
      }
      return void 0;
    }
  });
  return found;
}

// node_modules/@typespec/compiler/dist/src/server/tspconfig/completion.js
async function provideTspconfigCompletionItems(tspConfigDoc, tspConfigPosition, context) {
  const { fileService, compilerHost, emitterProvider, linterProvider, log } = context;
  const target = resolveYamlPositionDetail(tspConfigDoc, tspConfigPosition, log);
  if (target === void 0) {
    return [];
  }
  if (target.sourceRange) {
    const variableInterpolationItems = resolveVariableInterpolationCompleteItems(target.yamlDoc, target.path, tspConfigDoc.getText().slice(target.sourceRange.pos, target.cursorPosition));
    if (variableInterpolationItems.length > 0) {
      return variableInterpolationItems;
    }
  }
  const items = resolveTspConfigCompleteItems(await fileService.getPath(tspConfigDoc), target, tspConfigPosition, log);
  return items;
  async function resolveTspConfigCompleteItems(tspConfigFile, target2, tspConfigPosition2, log2) {
    const { path: nodePath, type: targetType, siblings, source } = target2;
    const CONFIG_PATH_LENGTH_FOR_EMITTER_LIST = 2;
    const CONFIG_PATH_LENGTH_FOR_LINTER_LIST = 2;
    const CONFIG_PATH_LENGTH_FOR_EXTENDS = 1;
    const CONFIG_PATH_LENGTH_FOR_IMPORTS = 2;
    const CONFIG_PATH_LENGTH_FOR_FEATURES = 2;
    if (nodePath.length === CONFIG_PATH_LENGTH_FOR_EMITTER_LIST && nodePath[0] === "options" && targetType === "key" || nodePath.length === CONFIG_PATH_LENGTH_FOR_EMITTER_LIST && nodePath[0] === "emit" && targetType === "arr-item") {
      const emitters = await emitterProvider.listLibraries(tspConfigFile);
      const items2 = [];
      for (const [name, pkg] of Object.entries(emitters)) {
        if (!siblings.includes(name)) {
          const item = createCompletionItemWithQuote(name, (await pkg.getPackageJsonData())?.description ?? `Emitter from ${name}`, tspConfigPosition2, target2);
          items2.push(item);
        }
      }
      return items2;
    } else if (nodePath.length > CONFIG_PATH_LENGTH_FOR_EMITTER_LIST && nodePath[0] === "options") {
      const emitterName = nodePath[CONFIG_PATH_LENGTH_FOR_EMITTER_LIST - 1];
      const emitter = await emitterProvider.getLibrary(tspConfigFile, emitterName);
      if (!emitter) {
        return [];
      }
      const exports = await emitter.getModuleExports();
      const builtInEmitterSchema = emitterOptionsSchema;
      const itemsFromBuiltIn = builtInEmitterSchema ? resolveCompleteItems(builtInEmitterSchema, {
        ...target2,
        path: nodePath.slice(CONFIG_PATH_LENGTH_FOR_EMITTER_LIST)
      }) : [];
      const itemsFromEmitter = [];
      if (exports?.$lib?.emitter?.options !== void 0) {
        const more = resolveCompleteItems(exports.$lib.emitter.options, {
          ...target2,
          path: nodePath.slice(CONFIG_PATH_LENGTH_FOR_EMITTER_LIST)
        });
        itemsFromEmitter.push(...more);
      }
      return [...itemsFromBuiltIn, ...itemsFromEmitter];
    } else if (nodePath.length > CONFIG_PATH_LENGTH_FOR_LINTER_LIST && nodePath[0] === "linter") {
      const extendKeyWord = nodePath[CONFIG_PATH_LENGTH_FOR_LINTER_LIST - 1];
      const items2 = [];
      const linters = await linterProvider.listLibraries(tspConfigFile);
      if (extendKeyWord === "extends") {
        for (const [name, pkg] of Object.entries(linters)) {
          const exports = await pkg.getModuleExports();
          if (exports?.$linter?.ruleSets !== void 0) {
            for (const [ruleSet] of Object.entries(exports?.$linter?.ruleSets)) {
              const labelName = `${name}/${ruleSet}`;
              if (!siblings.includes(labelName)) {
                const item = createCompletionItemWithQuote(labelName, (await pkg.getPackageJsonData())?.description ?? `Linters from ${labelName}`, tspConfigPosition2, target2);
                items2.push(item);
              }
            }
          }
          if (!siblings.includes(name)) {
            const item = createCompletionItemWithQuote(name, (await pkg.getPackageJsonData())?.description ?? `Linters from ${name}`, tspConfigPosition2, target2);
            items2.push(item);
          }
        }
      } else if (extendKeyWord === "enable" || extendKeyWord === "disable") {
        for (const [name, pkg] of Object.entries(linters)) {
          const exports = await pkg.getModuleExports();
          if (exports?.$linter?.rules !== void 0) {
            for (const [, rule] of Object.entries(exports?.$linter?.rules)) {
              const labelName = `${name}/${rule.name}`;
              const item = createCompletionItemWithQuote(labelName, rule.description, tspConfigPosition2, target2);
              items2.push(item);
            }
          }
        }
      } else {
        log2({
          level: "warning",
          message: "Unknown linter keyword, it should be 'extends', 'enable' or 'disable'"
        });
      }
      return items2;
    } else if (nodePath.length === CONFIG_PATH_LENGTH_FOR_FEATURES && nodePath[0] === "features" && targetType === "arr-item") {
      return compilerFeatureNames.filter((name) => !siblings.includes(name)).map((name) => createCompletionItemWithQuote(name, compilerFeatures[name].description, tspConfigPosition2, target2));
    } else if (nodePath.length === CONFIG_PATH_LENGTH_FOR_EXTENDS && nodePath[0] === "extends") {
      const currentFolder = getDirectoryPath(tspConfigFile);
      const newFolderPath = joinPaths(currentFolder, source);
      const relativeFiles = await findFilesOrDirsWithSameExtension(compilerHost, newFolderPath, ".yaml", [normalizeSlashes(tspConfigFile)]);
      return getFilePathCompletionItems(relativeFiles, siblings, source);
    } else if (nodePath.length >= CONFIG_PATH_LENGTH_FOR_IMPORTS && nodePath[0] === "imports") {
      const currentFolder = getDirectoryPath(tspConfigFile);
      const newFolderPath = joinPaths(currentFolder, source);
      const relativeFiles = await findFilesOrDirsWithSameExtension(compilerHost, newFolderPath, ".tsp", [joinPaths(currentFolder, "main.tsp")]);
      return getFilePathCompletionItems(relativeFiles, siblings, source);
    } else {
      const schema = TypeSpecConfigJsonSchema;
      return schema ? resolveCompleteItems(schema, target2) : [];
    }
  }
  function findSchemaByPath(schema, path, curIndex, track = /* @__PURE__ */ new Set()) {
    if (curIndex >= path.length) {
      return [schema];
    }
    if (track.has(schema)) {
      return [];
    }
    const key = path[curIndex];
    const result = [];
    if (schema.type === "array") {
      return findSchemaByPath(schema.items, path, curIndex + 1);
    } else {
      if (schema.type === "object") {
        if (schema.properties && schema.properties[key]) {
          if (schema.properties[key].deprecated !== true) {
            const found = findSchemaByPath(schema.properties[key], path, curIndex + 1);
            result.push(...found);
          }
        } else if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
          const found = findSchemaByPath(schema.additionalProperties, path, curIndex + 1);
          result.push(...found);
        }
      }
      if (schema.oneOf || schema.anyOf || schema.allOf) {
        const choices = [...schema.anyOf ?? [], ...schema.oneOf ?? [], ...schema.allOf ?? []];
        const founds = choices.flatMap((choice) => findSchemaByPath(choice, path, curIndex), track);
        result.push(...founds);
      }
      return result;
    }
  }
  function expandPossibleSchema(schema, track = /* @__PURE__ */ new Set()) {
    if (track.has(schema))
      return [];
    const result = [schema];
    const choices = [...schema.anyOf ?? [], ...schema.oneOf ?? [], ...schema.allOf ?? []];
    for (const choice of choices) {
      result.push(...expandPossibleSchema(choice, track));
    }
    result.forEach((s) => track.add(s));
    return result;
  }
  function resolveCompleteItems(schema, target2) {
    const { path: nodePath, type: targetType } = target2;
    const path = targetType === "key" ? nodePath.slice(0, -1) : nodePath;
    const foundSchemas = findSchemaByPath(schema, path, 0);
    const result = [];
    foundSchemas.flatMap((s) => expandPossibleSchema(s)).forEach((cur) => {
      if (targetType === "key" || targetType === "arr-item") {
        if (cur.type === "object") {
          const props = Object.keys(cur.properties ?? {}).filter((key) => !target2.siblings.includes(key) && cur.properties[key].deprecated !== true).map((key) => {
            const item = {
              label: key,
              kind: import_vscode_languageserver6.CompletionItemKind.Field,
              documentation: cur.required?.includes(key) ? "[required]\n" + (cur.properties[key].description ?? "") : "[optional]\n" + (cur.properties[key].description ?? "")
            };
            return item;
          });
          result.push(...props);
        }
      }
      if (targetType === "value" || targetType === "arr-item") {
        if (cur.type === "boolean") {
          result.push(...["true", "false"].map((value) => {
            const item = {
              label: value,
              kind: import_vscode_languageserver6.CompletionItemKind.Value,
              documentation: cur.description
            };
            return item;
          }));
        } else if (cur.type === "string" && cur.enum) {
          const enums = cur.enum.map((value) => {
            const item = {
              label: value,
              kind: import_vscode_languageserver6.CompletionItemKind.Value,
              documentation: cur.description,
              insertText: `"${value}"`
            };
            return item;
          });
          result.push(...enums);
        }
      }
    });
    return distinctArray(result, (t) => t.label);
  }
}
function createCompletionItemWithQuote(labelName, description, tspConfigPosition, target) {
  if (target.sourceRange && target.cursorPosition >= target.sourceRange.pos && target.cursorPosition <= target.sourceRange.end) {
    const lenRelativeToStartPos = target.sourceType === "QUOTE_SINGLE" || target.sourceType === "QUOTE_DOUBLE" ? target.cursorPosition - target.sourceRange.pos - 1 : target.cursorPosition - target.sourceRange.pos;
    return {
      label: labelName,
      kind: import_vscode_languageserver6.CompletionItemKind.Field,
      documentation: description,
      textEdit: import_vscode_languageserver6.TextEdit.replace(import_vscode_languageserver6.Range.create(import_vscode_languageserver6.Position.create(tspConfigPosition.line, tspConfigPosition.character - lenRelativeToStartPos), import_vscode_languageserver6.Position.create(tspConfigPosition.line, tspConfigPosition.character)), target.sourceType === "QUOTE_SINGLE" || target.sourceType === "QUOTE_DOUBLE" ? labelName : `"${labelName}"`)
    };
  }
  return {
    label: labelName,
    kind: import_vscode_languageserver6.CompletionItemKind.Field,
    documentation: description,
    insertText: `"${labelName}"`
  };
}
async function findFilesOrDirsWithSameExtension(compilerHost, rootPath, fileExtension, excludeFiles = []) {
  const exclude = ["node_modules", "tsp-output", ".vs", ".vscode"];
  const files = [];
  try {
    const dirs = await compilerHost.readDir(rootPath);
    for (const d of dirs) {
      if (!exclude.includes(d) && !excludeFiles.includes(getNormalizedAbsolutePath(d, rootPath))) {
        try {
          const stat = await compilerHost.stat(joinPaths(rootPath, d));
          if (stat.isDirectory() || stat.isFile() && d.endsWith(fileExtension)) {
            files.push(d);
          }
        } catch {
          continue;
        }
      }
    }
  } catch {
    return files;
  }
  return files;
}
function getFilePathCompletionItems(relativeFiles, siblings, source) {
  return relativeFiles.filter((file) => !siblings.includes(joinPaths(source, file))).map((file) => {
    return {
      label: file,
      kind: import_vscode_languageserver6.CompletionItemKind.File
    };
  });
}
function resolveVariableInterpolationCompleteItems(yamlDocNodes, path, curText) {
  if (/{\s*env\.[^}]*$/.test(curText)) {
    return getVariableCompletionItem(yamlDocNodes, "environment-variables", "Custom environment variables");
  } else if (/{[^}]*$/.test(curText)) {
    const result = [
      ...getVariableCompletionItem(yamlDocNodes, "parameters", "Custom paramters variables"),
      ...["cwd", "project-root"].map((value) => {
        const item = {
          label: value,
          kind: import_vscode_languageserver6.CompletionItemKind.Value,
          documentation: "Built-in variables"
        };
        return item;
      })
    ];
    const CONFIG_PATH_LENGTH_FOR_OPTIONS = 2;
    if (path.length > CONFIG_PATH_LENGTH_FOR_OPTIONS && path[0] === "options") {
      result.push(...["output-dir", "emitter-name"].map((value) => {
        const item = {
          label: value,
          kind: import_vscode_languageserver6.CompletionItemKind.Value,
          documentation: "Built-in variables"
        };
        return item;
      }));
    }
    return result;
  }
  return [];
}
function getVariableCompletionItem(yamlDoc, filterName, description) {
  const result = [];
  if (isMap(yamlDoc.contents)) {
    const yamlMap = yamlDoc.contents.items.find((item) => item.key.source === filterName);
    if (yamlMap && yamlMap.value !== null && isMap(yamlMap.value)) {
      yamlMap.value.items.forEach((i) => {
        if (isPair(i)) {
          result.push({
            label: i.key.source ?? "",
            kind: import_vscode_languageserver6.CompletionItemKind.Value,
            documentation: description
          });
        }
      });
    }
  }
  return result;
}

// node_modules/@typespec/compiler/dist/src/server/update-manager.js
init_define_process_env();
var UpdateManager = class {
  name;
  #pendingUpdates = /* @__PURE__ */ new Map();
  #updateCb;
  // overall version which should be bumped for any actual doc change
  #docChangedVersion = 0;
  #scheduleBatchUpdate;
  #docChangedTimesteps = [];
  #isStarted = false;
  _log;
  getDebounceDelay;
  /**
   *
   * @param name For logging purpose, identify different update manager if there are multiple
   * @param log
   */
  constructor(name, log, getDebounceDelay) {
    this.name = name;
    const debug = debugLoggers.updateManager;
    this._log = debug.enabled ? (sl) => {
      log({ ...sl, message: `#FromUpdateManager(${this.name}): ${sl.message}` });
    } : () => {
    };
    this.getDebounceDelay = getDebounceDelay ?? this.getAdaptiveDebounceDelay;
    this.#scheduleBatchUpdate = debounceThrottle(async (arg) => {
      const updates = this.#pendingUpdates;
      this.#pendingUpdates = /* @__PURE__ */ new Map();
      return await this.#update(Array.from(updates.values()), arg);
    }, () => this.#isStarted ? "ready" : "pending", this.getDebounceDelay, this._log);
  }
  /**
   * Callback will only be invoked after start() is called.
   * We need to start explicitly to avoid compiling with incorrect settings when the lsp hasn't fully initialized (the client settings are not loaded yet.)
   */
  start() {
    this.#isStarted = true;
  }
  setCallback(callback) {
    this.#updateCb = callback;
  }
  get docChangedVersion() {
    return this.#docChangedVersion;
  }
  bumpDocChangedVersion() {
    this.#docChangedVersion++;
  }
  pushDocChangedTimestamp() {
    const now = Date.now();
    this.#docChangedTimesteps = [...this.getWindowedDocChangedTimesteps(), now];
  }
  WINDOW = 5e3;
  DEFAULT_DELAY = 500;
  // Provider different debounce delay according to whether usr are actively typing, increase the delay if so to avoid unnecessary invoke
  // The category below is suggested from AI, may adjust as needed in the future
  DELAY_CANDIDATES = [
    // IMPORTANT: sort by frequencyInWindow desc, we will pick the first match
    {
      // active typing
      frequencyInWindow: 20,
      delay: 1e3
    },
    {
      // moderate typing
      frequencyInWindow: 10,
      delay: 800
    },
    {
      // light typing
      frequencyInWindow: 0,
      delay: this.DEFAULT_DELAY
    }
  ];
  getWindowedDocChangedTimesteps() {
    const now = Date.now();
    return this.#docChangedTimesteps.filter((timestamp) => {
      const age = now - timestamp;
      return age < this.WINDOW;
    });
  }
  getAdaptiveDebounceDelay = () => {
    const frequent = this.getWindowedDocChangedTimesteps().length;
    for (const c of this.DELAY_CANDIDATES) {
      if (frequent >= c.frequencyInWindow) {
        return c.delay;
      }
    }
    return this.DEFAULT_DELAY;
  };
  /**
   * T will be returned if the schedule is triggered eventually, if a newer scheduleUpdate
   *  occurs before the debounce time, the previous ones will be cancelled and return undefined.
   */
  scheduleUpdate(document, updateType) {
    if (updateType === "changed" || updateType === "renamed") {
      this.bumpDocChangedVersion();
      this.pushDocChangedTimestamp();
    }
    const existing = this.#pendingUpdates.get(document.uri);
    if (existing === void 0) {
      this.#pendingUpdates.set(document.uri, {
        latest: document,
        latestUpdateTimestamp: Date.now()
      });
    } else {
      existing.latest = document;
      existing.latestUpdateTimestamp = Date.now();
    }
    return this.#scheduleBatchUpdate(document);
  }
  async #update(updates, arg) {
    if (this.#updateCb === void 0) {
      this._log({
        level: "warning",
        message: `No update callback registered, skip invoking update.`
      });
      return void 0;
    }
    return await this.#updateCb(updates, arg);
  }
};
function debounceThrottle(fn, getFnStatus, getDelay, log) {
  let timeout;
  let lastInvocation = void 0;
  let executingCount = 0;
  let debounceExecutionId = 0;
  const executionPromises = /* @__PURE__ */ new Map();
  const UPDATE_PARALLEL_LIMIT = 2;
  function maybeCall(arg) {
    const promise = new DeferredPromise();
    const curId = debounceExecutionId++;
    executionPromises.set(curId, promise);
    maybeCallInternal(curId, arg, promise);
    return promise.getPromise();
  }
  function clearPromisesBefore(id) {
    for (const k of executionPromises.keys()) {
      if (k < id) {
        executionPromises.get(k)?.resolvePromise(void 0);
        executionPromises.delete(k);
      }
    }
  }
  function maybeCallInternal(id, arg, promise) {
    clearTimeout(timeout);
    clearPromisesBefore(id);
    timeout = setTimeout(async () => {
      const delay = getDelay();
      const tooSoon = lastInvocation !== void 0 && Date.now() - lastInvocation < delay;
      const notReady = getFnStatus() !== "ready";
      const tooManyParallel = executingCount >= UPDATE_PARALLEL_LIMIT;
      if (notReady || tooSoon || tooManyParallel) {
        maybeCallInternal(id, arg, promise);
        return;
      }
      const s = /* @__PURE__ */ new Date();
      try {
        executingCount++;
        log({
          level: "debug",
          message: `Starting debounce execution #${id} at ${s.toISOString()}. Current parallel count: ${executingCount}`
        });
        const r = await fn(arg);
        promise.resolvePromise(r);
      } catch (e) {
        promise.rejectPromise(e);
      } finally {
        executionPromises.delete(id);
        executingCount--;
        const e = /* @__PURE__ */ new Date();
        log({
          level: "debug",
          message: `Finish debounce execution #${id} at ${e.toISOString()}, duration=${e.getTime() - s.getTime()}. Current parallel count: ${executingCount}`
        });
      }
      lastInvocation = Date.now();
    }, getDelay());
  }
  return maybeCall;
}
var DeferredPromise = class {
  #promise;
  #resolve;
  #reject;
  constructor() {
    this.#promise = new Promise((res, rej) => {
      this.#resolve = res;
      this.#reject = rej;
    });
  }
  getPromise() {
    return this.#promise;
  }
  resolvePromise(value) {
    this.#resolve(value);
  }
  rejectPromise(reason) {
    this.#reject(reason);
  }
};

// node_modules/@typespec/compiler/dist/src/server/serverlib.js
function createServer(host, clientConfigsProvider) {
  const fileService = createFileService({ serverHost: host });
  const fileSystemCache = createFileSystemCache({
    fileService,
    log
  });
  const compilerHost = createCompilerHost();
  const npmPackageProvider = new NpmPackageProvider(compilerHost);
  const emitterProvider = new LibraryProvider(npmPackageProvider, (exports) => exports.$onEmit !== void 0);
  const linterProvider = new LibraryProvider(npmPackageProvider, (exports) => exports.$linter !== void 0);
  const updateManager = new UpdateManager("doc-update", log);
  const signatureHelpUpdateManager = new UpdateManager("signature-help", log, host.getDocumentUpdateDebounceDelay);
  const compileService = createCompileService({
    fileService,
    fileSystemCache,
    compilerHost,
    serverHost: host,
    updateManager,
    log,
    clientConfigsProvider
  });
  let currentDiagnosticIndex = /* @__PURE__ */ new Map();
  let diagnosticIdCounter = 0;
  let workspaceFolders = [];
  let isInitialized = false;
  let pendingMessages = [];
  function wrapUnhandledError(fn) {
    const name = fn.name || "anonymous";
    return (async (...args) => {
      try {
        return await fn(...args);
      } catch (e) {
        if (e instanceof Error) {
          const detail = e.stack ? `${e.message}
${e.stack}` : e.message;
          throw new Error(`[${name}] ${detail}`, { cause: e });
        } else if (typeof e === "string") {
          throw new Error(`[${name}] ${e}`, { cause: e });
        } else if (typeof e === "object" && e !== null) {
          let detail;
          try {
            detail = JSON.stringify(e);
          } catch {
            throw e;
          }
          throw new Error(`[${name}] ${detail}`, { cause: e });
        }
        throw e;
      }
    });
  }
  return {
    get pendingMessages() {
      return pendingMessages;
    },
    get workspaceFolders() {
      return workspaceFolders;
    },
    compile: wrapUnhandledError(compile2),
    initialize: wrapUnhandledError(initialize),
    initialized: wrapUnhandledError(initialized),
    workspaceFoldersChanged: wrapUnhandledError(workspaceFoldersChanged),
    watchedFilesChanged: wrapUnhandledError(watchedFilesChanged),
    formatDocument: wrapUnhandledError(formatDocument),
    gotoDefinition: wrapUnhandledError(gotoDefinition),
    documentClosed: wrapUnhandledError(documentClosed),
    documentOpened: wrapUnhandledError(documentOpened),
    complete: wrapUnhandledError(complete),
    findReferences: wrapUnhandledError(findReferences),
    findDocumentHighlight: wrapUnhandledError(findDocumentHighlight),
    prepareRename: wrapUnhandledError(prepareRename),
    rename: wrapUnhandledError(rename),
    renameFiles: wrapUnhandledError(renameFiles),
    getSemanticTokens: wrapUnhandledError(getSemanticTokensForDocument),
    buildSemanticTokens: wrapUnhandledError(buildSemanticTokens),
    checkChange: wrapUnhandledError(checkChange),
    getFoldingRanges: wrapUnhandledError(getFoldingRanges),
    getHover: wrapUnhandledError(getHover),
    getSignatureHelp: wrapUnhandledError(getSignatureHelp),
    getDocumentSymbols: wrapUnhandledError(getDocumentSymbols),
    getCodeActions: wrapUnhandledError(getCodeActions),
    resolveCodeAction: wrapUnhandledError(resolveCodeAction),
    log,
    reportDiagnostics: wrapUnhandledError(reportDiagnostics),
    getInitProjectContext: wrapUnhandledError(getInitProjectContext),
    validateInitProjectTemplate: wrapUnhandledError(validateInitProjectTemplate),
    initProject: wrapUnhandledError(initProject),
    internalCompile: wrapUnhandledError(internalCompile)
  };
  async function initialize(params) {
    const tokenLegend = {
      tokenTypes: Object.keys(SemanticTokenKind).filter((x) => Number.isNaN(Number(x))).map((x) => x.slice(0, 1).toLocaleLowerCase() + x.slice(1)),
      tokenModifiers: []
    };
    updateManager.setCallback(async (updates) => {
      if (updates.length === 0) {
        return;
      }
      const lastUpdate = updates.reduce((pre, cur) => {
        return cur.latestUpdateTimestamp > pre.latestUpdateTimestamp ? cur : pre;
      });
      const curVersion = updateManager.docChangedVersion;
      const result2 = await compileService.compile(lastUpdate.latest, void 0, {
        mode: "full",
        // the callback should be or have been triggered for the new version, so this one should be
        // cancelled in this case
        isCancelled: () => updateManager.docChangedVersion > curVersion
      });
      if (result2 && curVersion === updateManager.docChangedVersion) {
        await reportDiagnostics(result2);
      }
    });
    signatureHelpUpdateManager.setCallback(async (_updates, triggeredBy) => {
      return await compileInCoreMode(triggeredBy);
    });
    const capabilities = {
      textDocumentSync: import_vscode_languageserver7.TextDocumentSyncKind.Incremental,
      definitionProvider: true,
      foldingRangeProvider: true,
      hoverProvider: true,
      documentSymbolProvider: true,
      documentHighlightProvider: true,
      completionProvider: {
        resolveProvider: false,
        triggerCharacters: [".", "@", "/"]
      },
      semanticTokensProvider: {
        full: true,
        legend: tokenLegend
      },
      referencesProvider: true,
      renameProvider: {
        prepareProvider: true
      },
      documentFormattingProvider: true,
      signatureHelpProvider: {
        triggerCharacters: ["(", ",", "<"],
        retriggerCharacters: [")"]
      },
      codeActionProvider: {
        codeActionKinds: ["quickfix"],
        resolveProvider: true
      }
    };
    if (params.capabilities.workspace?.workspaceFolders) {
      for (const w of params.workspaceFolders ?? []) {
        workspaceFolders.push({
          ...w,
          path: ensureTrailingDirectorySeparator(await fileService.fileURLToRealPath(w.uri))
        });
      }
      capabilities.workspace = {
        workspaceFolders: {
          supported: true,
          changeNotifications: true
        },
        fileOperations: {
          didRename: {
            filters: [
              {
                scheme: "file",
                pattern: { glob: "**/*.tsp", matches: "file" }
              },
              {
                scheme: "file",
                pattern: { glob: "**/*", matches: "folder" }
              }
            ]
          }
        }
      };
    } else if (params.rootUri) {
      workspaceFolders = [
        {
          name: "<root>",
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          uri: params.rootUri,
          path: ensureTrailingDirectorySeparator(
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            await fileService.fileURLToRealPath(params.rootUri)
          )
        }
      ];
    } else if (params.rootPath) {
      workspaceFolders = [
        {
          name: "<root>",
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          uri: compilerHost.pathToFileURL(params.rootPath),
          path: ensureTrailingDirectorySeparator(
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            await getNormalizedRealPath(compilerHost, params.rootPath)
          )
        }
      ];
    }
    log({ level: "info", message: `Workspace Folders`, detail: workspaceFolders });
    const customCapacities = {
      getInitProjectContext: true,
      initProject: true,
      validateInitProjectTemplate: true,
      internalCompile: true
    };
    const curFile = normalizePath(compilerHost.fileURLToPath(import.meta.url));
    const SERVERLIB_PATH_ENDWITH = "/dist/src/server/serverlib.js";
    let compilerRootFolder = void 0;
    if (!curFile.endsWith(SERVERLIB_PATH_ENDWITH)) {
    } else {
      compilerRootFolder = curFile.slice(0, curFile.length - SERVERLIB_PATH_ENDWITH.length);
    }
    const result = {
      serverInfo: {
        name: "TypeSpec Language Server",
        version: typespecVersion
      },
      capabilities,
      customCapacities,
      compilerRootFolder,
      compilerCliJsPath: compilerRootFolder ? joinPaths(compilerRootFolder, "cmd", "tsp.js") : void 0
    };
    return result;
  }
  function initialized(params) {
    updateManager.start();
    signatureHelpUpdateManager.start();
    isInitialized = true;
    log({ level: "info", message: "Initialization complete." });
  }
  async function getInitProjectContext() {
    return {
      coreInitTemplates: await getTypeSpecCoreTemplates(host.compilerHost)
    };
  }
  async function compile2(document, additionalOptions, serverCompileOptions) {
    return compileService.compile(document, additionalOptions, serverCompileOptions);
  }
  async function compileInCoreMode(document) {
    return compile2(document, void 0, { mode: "core" });
  }
  async function validateInitProjectTemplate(param) {
    const { template } = param;
    const validationResult = validateTemplateDefinitions(template, NoTarget, false);
    if (!validationResult.valid) {
      for (const diag of validationResult.diagnostics) {
        log({
          level: diag.severity,
          message: diag.message,
          detail: {
            code: diag.code,
            url: diag.url
          }
        });
      }
    }
    return validationResult.valid;
  }
  async function initProject(param) {
    try {
      await scaffoldNewProject(compilerHost, param.config);
      return true;
    } catch (e) {
      log({ level: "error", message: "Unexpected error when initializing project", detail: e });
      return false;
    }
  }
  async function internalCompile(param) {
    const option = {
      ...param.options
    };
    const result = await compileService.compile(param.doc, option, {
      skipCache: true,
      skipOldProgramFromCache: true,
      mode: "full"
    });
    if (result === void 0) {
      return {
        hasError: true,
        diagnostics: [
          {
            code: "internal-error",
            message: "Failed to get compiler result, please check the compilation output for details",
            severity: "error",
            target: NoTarget,
            url: void 0
          }
        ],
        entrypoint: void 0,
        options: void 0
      };
    } else {
      result.tracker.getLogs().forEach((logItem) => host.log(logItem));
      return {
        hasError: result.program.hasError(),
        diagnostics: result.program.diagnostics.map((diagnostic) => {
          const target = getSourceLocation(diagnostic.target, { locateId: true });
          let position = void 0;
          if (target?.file) {
            const lineAndCharacter = target.file.getLineAndCharacterOfPosition(target.pos);
            position = {
              line: lineAndCharacter.line + 1,
              column: lineAndCharacter.character + 1
            };
          }
          return {
            code: diagnostic.code,
            message: diagnostic.message,
            severity: diagnostic.severity,
            target: { ...target, position },
            url: diagnostic.url
          };
        }),
        entrypoint: result.document?.uri,
        options: result.program.compilerOptions
      };
    }
  }
  async function renameFiles(params) {
    const firstFilePath = params.files[0];
    if (!firstFilePath) {
      return;
    }
    for (const file of params.files) {
      const oldFilePath = await fileService.getPath({ uri: file.oldUri });
      const newFilePath = await fileService.getPath({ uri: file.newUri });
      const isDirRename = !file.oldUri.endsWith(".tsp");
      if (isDirRename) {
        const files = await listAllFilesInDir(compilerHost, newFilePath);
        for (const file2 of files) {
          const oldFile = resolvePath(oldFilePath, file2);
          fileSystemCache.notify([
            { uri: fileService.getURL(oldFile), type: import_vscode_languageserver7.FileChangeType.Deleted }
          ]);
        }
      }
    }
    const mainFile = await compileService.getMainFileForDocument(await fileService.getPath({ uri: firstFilePath.newUri }));
    if (mainFile === void 0) {
      log({ level: "debug", message: `failed to resolve main file for ${firstFilePath.newUri}` });
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
    void updateManager.scheduleUpdate({ uri: fileService.getURL(mainFile) }, "renamed");
    const result = await compileInCoreMode({ uri: fileService.getURL(mainFile) });
    if (!result) {
      log({
        level: "debug",
        message: `The main tsp file '${mainFile}' compilation failed, please check the detailed compilation message`
      });
      return;
    }
    for (const file of params.files) {
      const oldFilePath = await fileService.getPath({ uri: file.oldUri });
      const newFilePath = await fileService.getPath({ uri: file.newUri });
      const isDirRename = !file.oldUri.endsWith(".tsp");
      for (const diagnostic of result.program.diagnostics) {
        if (diagnostic.code !== "import-not-found")
          continue;
        const target = diagnostic.target;
        if (target.kind === SyntaxKind.ImportStatement) {
          const result2 = getUpdatedImportValue(target, {
            oldPath: oldFilePath,
            newPath: newFilePath,
            isDirRename
          });
          if (result2) {
            log({
              level: "info",
              message: `The imports content '${target.path.value}' needs to be modified in tsp file '${result2.filePath}' to '${result2.newValue}'`
            });
            const edit = getRenameImportEdit(target, result2.newValue);
            await host.applyEdit({ changes: { [fileService.getURL(result2.filePath)]: [edit] } });
          }
        }
      }
    }
  }
  async function workspaceFoldersChanged(e) {
    log({ level: "info", message: "Workspace Folders Changed", detail: e });
    const map = new Map(workspaceFolders.map((f) => [f.uri, f]));
    for (const folder of e.removed) {
      map.delete(folder.uri);
    }
    for (const folder of e.added) {
      map.set(folder.uri, {
        ...folder,
        path: ensureTrailingDirectorySeparator(await fileService.fileURLToRealPath(folder.uri))
      });
    }
    workspaceFolders = Array.from(map.values());
    log({ level: "info", message: `Workspace Folders`, detail: workspaceFolders });
  }
  function watchedFilesChanged(params) {
    fileSystemCache.notify(params.changes);
    npmPackageProvider.notify(params.changes);
  }
  function isTspConfigFile(doc) {
    return doc.uri.endsWith("tspconfig.yaml");
  }
  async function getFoldingRanges(params) {
    if (isTspConfigFile(params.textDocument))
      return [];
    const ast = await compileService.getScript(params.textDocument);
    if (!ast) {
      return [];
    }
    const file = ast.file;
    const ranges = [];
    let rangeStartSingleLines = -1;
    for (let i = 0; i < ast.comments.length; i++) {
      const comment = ast.comments[i];
      if (comment.kind === SyntaxKind.LineComment && i + 1 < ast.comments.length && ast.comments[i + 1].kind === SyntaxKind.LineComment && ast.comments[i + 1].pos === skipWhiteSpace(file.text, comment.end)) {
        if (rangeStartSingleLines === -1) {
          rangeStartSingleLines = comment.pos;
        }
      } else if (rangeStartSingleLines !== -1) {
        addRange(rangeStartSingleLines, comment.end, import_vscode_languageserver7.FoldingRangeKind.Comment);
        rangeStartSingleLines = -1;
      } else {
        addRange(comment.pos, comment.end, import_vscode_languageserver7.FoldingRangeKind.Comment);
      }
    }
    addRangesForImports();
    visitChildren(ast, addRangesForNode);
    function addRangesForImports() {
      const statements = ast.statements;
      let runStart = -1;
      for (let i = 0; i <= statements.length; i++) {
        const isImport = i < statements.length && statements[i].kind === SyntaxKind.ImportStatement;
        if (isImport) {
          if (runStart === -1) {
            runStart = i;
          }
        } else if (runStart !== -1) {
          addRange(statements[runStart].pos, statements[i - 1].end, import_vscode_languageserver7.FoldingRangeKind.Imports);
          runStart = -1;
        }
      }
    }
    function addRangesForNode(node) {
      if (node.kind === SyntaxKind.Doc) {
        return;
      }
      let nodeStart = node.pos;
      if ("decorators" in node && node.decorators.length > 0) {
        const decoratorEnd = node.decorators[node.decorators.length - 1].end;
        addRange(nodeStart, decoratorEnd);
        nodeStart = skipTrivia(file.text, decoratorEnd);
      }
      addRange(nodeStart, node.end);
      visitChildren(node, addRangesForNode);
    }
    return ranges;
    function addRange(startPos, endPos, kind) {
      const start = file.getLineAndCharacterOfPosition(startPos);
      const end = file.getLineAndCharacterOfPosition(endPos);
      if (start.line !== end.line) {
        const range = {
          startLine: start.line,
          startCharacter: start.character,
          endLine: end.line,
          endCharacter: end.character
        };
        if (kind !== void 0) {
          range.kind = kind;
        }
        ranges.push(range);
      }
    }
  }
  async function getDocumentSymbols(params) {
    if (isTspConfigFile(params.textDocument))
      return [];
    const ast = await compileService.getScript(params.textDocument);
    if (!ast) {
      return [];
    }
    return getSymbolStructure(ast);
  }
  async function findDocumentHighlight(params) {
    if (isTspConfigFile(params.textDocument))
      return [];
    const result = await compileInCoreMode(params.textDocument);
    if (result === void 0) {
      return [];
    }
    const { program, document, script } = result;
    if (!document || !script) {
      return [];
    }
    const identifiers = findReferenceIdentifiers(program, script, document.offsetAt(params.position), [script]);
    return identifiers.map((identifier) => ({
      range: getRange(identifier, script.file),
      kind: import_vscode_languageserver7.DocumentHighlightKind.Read
    }));
  }
  function checkChange(change) {
    const initVersion = fileService.getOpenDocumentInitVersion(change.document.uri);
    if (!initVersion) {
      log({
        level: "debug",
        message: "Document change received for document not in documentsOpened set",
        detail: change.document.uri
      });
      documentOpened(change);
    } else if (initVersion < change.document.version) {
      compileService.notifyChange(change.document, "changed");
    } else {
    }
  }
  function documentOpened(change) {
    fileService.notifyDocumentOpened(change);
    compileService.notifyChange(change.document, "opened");
  }
  async function reportDiagnostics({ program, document, optionsFromConfig }) {
    if (!document)
      return void 0;
    if (isTspConfigFile(document))
      return void 0;
    const newDiagnosticIndex = /* @__PURE__ */ new Map();
    const diagnosticMap = /* @__PURE__ */ new Map();
    diagnosticMap.set(document, []);
    for (const each of program.sourceFiles.values()) {
      const saved = each.file?.document;
      if (saved) {
        diagnosticMap.set(saved, []);
      } else {
        const opened = fileService.getOpenDocument(each.file.path);
        if (opened) {
          diagnosticMap.set(opened, []);
        }
      }
    }
    for (const each of program.diagnostics) {
      const results = convertDiagnosticToLsp(fileService, program, document, each);
      for (const result of results) {
        const [diagnostic, diagDocument] = result;
        if (each.url) {
          diagnostic.codeDescription = {
            href: each.url
          };
        }
        const unusedUsingRule = `${builtInLinterLibraryName}/${builtInLinterRule_UnusedUsing}`;
        const unusedTemlateParameterRule = `${builtInLinterLibraryName}/${builtInLinterRule_UnusedTemplateParameter}`;
        if (each.code === "deprecated") {
          diagnostic.tags = [import_vscode_languageserver7.DiagnosticTag.Deprecated];
        } else if (each.code === unusedUsingRule) {
          diagnostic.tags = [import_vscode_languageserver7.DiagnosticTag.Unnecessary];
          if (optionsFromConfig.linterRuleSet?.enable?.[unusedUsingRule] === void 0 && optionsFromConfig.linterRuleSet?.disable?.[unusedUsingRule] === void 0) {
            diagnostic.severity = import_vscode_languageserver7.DiagnosticSeverity.Hint;
          }
        } else if (each.code === unusedTemlateParameterRule) {
          diagnostic.tags = [import_vscode_languageserver7.DiagnosticTag.Unnecessary];
          if (optionsFromConfig.linterRuleSet?.enable?.[unusedTemlateParameterRule] === void 0 && optionsFromConfig.linterRuleSet?.disable?.[unusedTemlateParameterRule] === void 0) {
            diagnostic.severity = import_vscode_languageserver7.DiagnosticSeverity.Hint;
          }
        }
        diagnostic.data = {
          id: diagnosticIdCounter++,
          file: diagDocument.uri
        };
        const diagnostics = diagnosticMap.get(diagDocument);
        compilerAssert(diagnostics, "Diagnostic reported against a source file that was not added to the program.");
        diagnostics.push(diagnostic);
        newDiagnosticIndex.set(diagnostic.data.id, { diagnostic: each, fileUri: diagDocument.uri });
      }
    }
    for (const { directive } of program.suppressionTracker?.getUnusedSuppressions() ?? []) {
      const unusedSuppressionDiagnostic = {
        code: "unused-suppression",
        severity: "warning",
        message: `Suppression for "${directive.code}" is unused.`,
        target: directive.node,
        codefixes: [createRemoveUnusedSuppressionCodeFix(directive.node)]
      };
      const results = convertDiagnosticToLsp(fileService, program, document, unusedSuppressionDiagnostic);
      for (const [diagnostic, diagDocument] of results) {
        diagnostic.tags = [import_vscode_languageserver7.DiagnosticTag.Unnecessary];
        diagnostic.severity = import_vscode_languageserver7.DiagnosticSeverity.Hint;
        diagnostic.data = {
          id: diagnosticIdCounter++,
          file: diagDocument.uri
        };
        const diagnostics = diagnosticMap.get(diagDocument);
        compilerAssert(diagnostics, "Diagnostic reported against a source file that was not added to the program.");
        diagnostics.push(diagnostic);
        newDiagnosticIndex.set(diagnostic.data.id, {
          diagnostic: unusedSuppressionDiagnostic,
          fileUri: diagDocument.uri
        });
      }
    }
    currentDiagnosticIndex = newDiagnosticIndex;
    for (const [document2, diagnostics] of diagnosticMap) {
      sendDiagnostics(document2, diagnostics);
    }
  }
  async function getHover(params) {
    if (isTspConfigFile(params.textDocument))
      return { contents: [] };
    const result = await compileInCoreMode(params.textDocument);
    if (result === void 0) {
      return { contents: [] };
    }
    const { program, document, script } = result;
    if (!document || !script) {
      return { contents: [] };
    }
    const id = getNodeAtPosition(script, document.offsetAt(params.position));
    const sym = id?.kind === SyntaxKind.Identifier ? program.checker.resolveRelatedSymbols(id) : void 0;
    if (!sym || sym.length === 0) {
      return { contents: { kind: import_vscode_languageserver7.MarkupKind.Markdown, value: "" } };
    } else {
      let includeExpandedDefinition = false;
      const sn = getSymNode(sym[0]);
      if (sn && sn.kind !== SyntaxKind.AliasStatement) {
        const type = sym[0].type ?? program.checker.getTypeOrValueForNode(sn);
        if (type && "kind" in type) {
          const modelHasExtendOrIs = type.kind === "Model" && (type.baseModel !== void 0 || type.sourceModel !== void 0 || type.sourceModels.length > 0);
          const interfaceHasExtend = type.kind === "Interface" && type.sourceInterfaces.length > 0;
          includeExpandedDefinition = modelHasExtendOrIs || interfaceHasExtend;
        }
      }
      const markdown = {
        kind: import_vscode_languageserver7.MarkupKind.Markdown,
        value: sym && sym.length > 0 ? await getSymbolDetails(program, sym[0], {
          includeSignature: true,
          includeParameterTags: true,
          includeExpandedDefinition
        }) : ""
      };
      return {
        contents: markdown
      };
    }
  }
  async function getSignatureHelp(params) {
    if (isTspConfigFile(params.textDocument))
      return void 0;
    const result = await signatureHelpUpdateManager.scheduleUpdate(params.textDocument, "changed");
    log({
      level: "debug",
      message: `getSignatureHelp got compile result: isUndefined = ${result === void 0}`
    });
    if (result === void 0) {
      return void 0;
    }
    const { script, document, program } = result;
    if (!document || !script) {
      return void 0;
    }
    const data = getSignatureHelpNodeAtPosition(script, document.offsetAt(params.position));
    if (data === void 0) {
      return void 0;
    }
    const { node, argumentIndex } = data;
    switch (node.kind) {
      case SyntaxKind.TypeReference:
        return getSignatureHelpForTemplate(program, node, argumentIndex);
      case SyntaxKind.DecoratorExpression:
      case SyntaxKind.AugmentDecoratorStatement:
        return getSignatureHelpForDecorator(program, node, argumentIndex);
      default:
        const _assertNever = node;
        compilerAssert(false, "Unreachable");
    }
  }
  async function getSignatureHelpForTemplate(program, node, argumentIndex) {
    const sym = program.checker.resolveRelatedSymbols(node.target.kind === SyntaxKind.MemberExpression ? node.target.id : node.target);
    if (!sym || sym.length <= 0) {
      return void 0;
    }
    const templateDeclNode = sym[0].declarations[0];
    if (!templateDeclNode || !("templateParameters" in templateDeclNode) || templateDeclNode.templateParameters.length === 0) {
      return void 0;
    }
    const parameterDocs = getTemplateParameterDocumentation(templateDeclNode);
    const parameters = templateDeclNode.templateParameters.map((x) => {
      const info = { label: x.id.sv };
      const doc2 = parameterDocs.get(x.id.sv);
      if (doc2) {
        info.documentation = { kind: import_vscode_languageserver7.MarkupKind.Markdown, value: doc2 };
      }
      return info;
    });
    const help = {
      signatures: [
        {
          label: `${sym[0].name}<${parameters.map((x) => x.label).join(", ")}>`,
          parameters,
          activeParameter: Math.min(parameters.length - 1, argumentIndex)
        }
      ],
      activeSignature: 0,
      activeParameter: 0
    };
    const doc = await getSymbolDetails(program, sym[0], {
      includeSignature: false,
      includeParameterTags: false
    });
    if (doc) {
      help.signatures[0].documentation = { kind: import_vscode_languageserver7.MarkupKind.Markdown, value: doc };
    }
    return help;
  }
  async function getSignatureHelpForDecorator(program, node, argumentIndex) {
    const sym = program.checker.resolveRelatedSymbols(node.target.kind === SyntaxKind.MemberExpression ? node.target.id : node.target);
    if (!sym || sym.length <= 0) {
      return void 0;
    }
    const decoratorDeclNode = sym[0].declarations.find((x) => x.kind === SyntaxKind.DecoratorDeclarationStatement);
    if (decoratorDeclNode === void 0) {
      return void 0;
    }
    const type = program.checker.getTypeForNode(decoratorDeclNode);
    compilerAssert(type.kind === "Decorator", "Expected type to be a decorator.");
    const parameterDocs = getParameterDocumentation(program, type);
    let labelPrefix = "";
    const parameters = [];
    if (node.kind === SyntaxKind.AugmentDecoratorStatement) {
      const targetType = decoratorDeclNode.target.type ? program.checker.getTypeForNode(decoratorDeclNode.target.type) : void 0;
      parameters.push({
        label: `${decoratorDeclNode.target.id.sv}: ${targetType ? getTypeName(targetType) : "unknown"}`
      });
      labelPrefix = "@";
    }
    parameters.push(...type.parameters.map((x) => {
      const info = {
        // prettier-ignore
        label: `${x.rest ? "..." : ""}${x.name}${x.optional ? "?" : ""}: ${getEntityName(x.type)}`
      };
      const doc2 = parameterDocs.get(x.name);
      if (doc2) {
        info.documentation = { kind: import_vscode_languageserver7.MarkupKind.Markdown, value: doc2 };
      }
      return info;
    }));
    const help = {
      signatures: [
        {
          label: `${labelPrefix}${type.name}(${parameters.map((x) => x.label).join(", ")})`,
          parameters,
          activeParameter: Math.min(parameters.length - 1, argumentIndex)
        }
      ],
      activeSignature: 0,
      activeParameter: 0
    };
    const doc = await getSymbolDetails(program, sym[0], {
      includeSignature: false,
      includeParameterTags: false
    });
    if (doc) {
      help.signatures[0].documentation = { kind: import_vscode_languageserver7.MarkupKind.Markdown, value: doc };
    }
    return help;
  }
  async function formatDocument(params) {
    if (isTspConfigFile(params.textDocument))
      return [];
    const document = host.getOpenDocumentByURL(params.textDocument.uri);
    if (document === void 0) {
      return [];
    }
    const path = await fileService.fileURLToRealPath(params.textDocument.uri);
    const prettierConfig = await resolvePrettierConfig(path);
    const resolvedConfig = prettierConfig ?? {
      tabWidth: params.options.tabSize,
      useTabs: !params.options.insertSpaces
    };
    log({
      level: "info",
      message: `Formatting TypeSpec document: ${JSON.stringify({ fileUri: params.textDocument.uri, vscodeOptions: params.options, prettierConfig, resolvedConfig }, null, 2)}`
    });
    try {
      const formattedText = await formatTypeSpec(document.getText(), resolvedConfig);
      return [minimalEdit(document, formattedText)];
    } catch (error) {
      log({
        level: "error",
        message: `Failed to format TypeSpec document: ${params.textDocument.uri}`,
        detail: error
      });
      return [];
    }
  }
  async function resolvePrettierConfig(path) {
    try {
      const prettier = await import("./standalone-PTRAU2OO.js");
      return prettier.resolveConfig(path);
    } catch (e) {
      return null;
    }
  }
  function minimalEdit(document, string1) {
    const string0 = document.getText();
    let i = 0;
    while (i < string0.length && i < string1.length && string0[i] === string1[i]) {
      ++i;
    }
    let j = 0;
    while (i + j < string0.length && i + j < string1.length && string0[string0.length - j - 1] === string1[string1.length - j - 1]) {
      ++j;
    }
    const newText = string1.substring(i, string1.length - j);
    const pos0 = document.positionAt(i);
    const pos1 = document.positionAt(string0.length - j);
    return import_vscode_languageserver7.TextEdit.replace(import_vscode_languageserver7.Range.create(pos0, pos1), newText);
  }
  async function gotoDefinition(params) {
    if (isTspConfigFile(params.textDocument))
      return [];
    const result = await compileInCoreMode(params.textDocument);
    if (result === void 0 || result.document === void 0 || result.script === void 0) {
      return [];
    }
    const node = getNodeAtPosition(result.script, result.document.offsetAt(params.position));
    switch (node?.kind) {
      case SyntaxKind.Identifier:
        const sym = result.program.checker.resolveRelatedSymbols(node);
        return getLocations(sym && sym.length > 0 ? sym[0].declarations : void 0);
      case SyntaxKind.StringLiteral:
        if (node.parent?.kind === SyntaxKind.ImportStatement) {
          return [await getImportLocation(node.value, result.script)];
        } else {
          return [];
        }
    }
    return [];
  }
  async function getImportLocation(importPath, currentFile) {
    const host2 = {
      realpath: compilerHost.realpath,
      readFile: async (path) => {
        const file = await compilerHost.readFile(path);
        return file.text;
      },
      stat: compilerHost.stat
    };
    const resolved = await resolveModule(host2, importPath, {
      baseDir: getDirectoryPath(currentFile.file.path),
      directoryIndexFiles: ["main.tsp", "index.mjs", "index.js"],
      resolveMain(pkg) {
        return resolveTspMain(pkg) ?? pkg.main;
      },
      conditions: ["typespec"],
      fallbackOnMissingCondition: true
    });
    return {
      uri: fileService.getURL(resolved.type === "file" ? resolved.path : resolved.mainFile),
      range: import_vscode_languageserver7.Range.create(0, 0, 0, 0)
    };
  }
  async function complete(params) {
    if (isTspConfigFile(params.textDocument)) {
      const doc = host.getOpenDocumentByURL(params.textDocument.uri);
      if (doc) {
        const items = await provideTspconfigCompletionItems(doc, params.position, {
          fileService,
          compilerHost,
          emitterProvider,
          linterProvider,
          log
        });
        return import_vscode_languageserver7.CompletionList.create(items);
      }
      return import_vscode_languageserver7.CompletionList.create([]);
    }
    const completions = {
      isIncomplete: false,
      items: []
    };
    const result = await compileInCoreMode(params.textDocument);
    if (result) {
      const { script, document, program } = result;
      if (!document || !script) {
        return completions;
      }
      const posDetail = getCompletionNodeAtPosition(script, document.offsetAt(params.position));
      return await resolveCompletion({
        program,
        file: script,
        completions,
        params
      }, posDetail);
    }
    return completions;
  }
  async function findReferences(params) {
    if (isTspConfigFile(params.textDocument))
      return [];
    const result = await compileInCoreMode(params.textDocument);
    if (result === void 0 || result.document === void 0 || result.script === void 0) {
      return [];
    }
    const identifiers = findReferenceIdentifiers(result.program, result.script, result.document.offsetAt(params.position));
    return getLocations(identifiers);
  }
  async function prepareRename(params) {
    if (isTspConfigFile(params.textDocument))
      return void 0;
    const result = await compileInCoreMode(params.textDocument);
    if (result === void 0 || result.document === void 0 || result.script === void 0) {
      return void 0;
    }
    const id = getNodeAtPosition(result.script, result.document.offsetAt(params.position));
    return id?.kind === SyntaxKind.Identifier ? getLocation(id)?.range : void 0;
  }
  async function rename(params) {
    if (isTspConfigFile(params.textDocument))
      return { changes: {} };
    const changes = {};
    const result = await compileInCoreMode(params.textDocument);
    if (result && result.document && result.script) {
      const identifiers = findReferenceIdentifiers(result.program, result.script, result.document.offsetAt(params.position));
      for (const id of identifiers) {
        const location = getLocation(id);
        if (!location) {
          continue;
        }
        const change = import_vscode_languageserver7.TextEdit.replace(location.range, params.newName);
        if (location.uri in changes) {
          changes[location.uri].push(change);
        } else {
          changes[location.uri] = [change];
        }
      }
    }
    return { changes };
  }
  function findReferenceIdentifiers(program, file, pos, searchFiles = program.sourceFiles.values()) {
    const id = getNodeAtPosition(file, pos);
    if (id?.kind !== SyntaxKind.Identifier) {
      return [];
    }
    const sym = program.checker.resolveRelatedSymbols(id);
    if (!sym || sym.length <= 0) {
      return [id];
    }
    const references = [];
    for (const searchFile of searchFiles) {
      visitChildren(searchFile, function visit2(node) {
        if (node.kind === SyntaxKind.Identifier) {
          const s = program.checker.resolveRelatedSymbols(node);
          if (!s || s.length <= 0) {
            return;
          }
          if (s.some((candidate) => sym.some((target) => candidate === target || target.type && candidate.type === target.type))) {
            references.push(node);
          }
        }
        visitChildren(node, visit2);
      });
    }
    return references;
  }
  async function getSemanticTokensForDocument(params) {
    if (isTspConfigFile(params.textDocument))
      return [];
    const ast = await compileService.getScript(params.textDocument);
    if (!ast) {
      return [];
    }
    return getSemanticTokens(ast);
  }
  async function buildSemanticTokens(params) {
    if (isTspConfigFile(params.textDocument))
      return { data: [] };
    const builder = new import_vscode_languageserver7.SemanticTokensBuilder();
    const tokens = await getSemanticTokensForDocument(params);
    const file = await compilerHost.readFile(await fileService.getPath(params.textDocument));
    const starts = file.getLineStarts();
    for (const token of tokens) {
      const start = file.getLineAndCharacterOfPosition(token.pos);
      const end = file.getLineAndCharacterOfPosition(token.end);
      for (let pos = token.pos, line = start.line; line <= end.line; line++) {
        const endPos = line === end.line ? token.end : starts[line + 1];
        const character = line === start.line ? start.character : 0;
        builder.push(line, character, endPos - pos, token.kind, 0);
        pos = endPos;
      }
    }
    return builder.build();
  }
  async function getCodeActions(params) {
    if (isTspConfigFile(params.textDocument))
      return [];
    const fileUri = params.textDocument.uri;
    const actions = [];
    const fixIdsInSelection = /* @__PURE__ */ new Set();
    for (const vsDiag of params.context.diagnostics) {
      const entry = currentDiagnosticIndex.get(vsDiag.data?.id);
      if (entry === void 0 || entry.diagnostic.codefixes === void 0)
        continue;
      for (const fix of entry.diagnostic.codefixes) {
        const codeAction = {
          title: fix.label,
          kind: import_vscode_languageserver7.CodeActionKind.QuickFix,
          diagnostics: [vsDiag],
          data: { diagId: vsDiag.data?.id, fixId: fix.id }
        };
        actions.push(codeAction);
        fixIdsInSelection.add(fix.id);
      }
    }
    const fixIdInfoInFile = /* @__PURE__ */ new Map();
    for (const entry of currentDiagnosticIndex.values()) {
      if (entry.fileUri !== fileUri)
        continue;
      for (const fix of entry.diagnostic.codefixes ?? []) {
        const existing = fixIdInfoInFile.get(fix.id);
        if (existing) {
          existing.count++;
        } else {
          fixIdInfoInFile.set(fix.id, { count: 1, label: fix.label });
        }
      }
    }
    const addedFixAllIds = /* @__PURE__ */ new Set();
    for (const fixId of fixIdsInSelection) {
      const info = fixIdInfoInFile.get(fixId);
      if (info && info.count > 1 && !addedFixAllIds.has(fixId)) {
        addedFixAllIds.add(fixId);
        actions.push({
          title: `Fix all: ${info.label}`,
          kind: import_vscode_languageserver7.CodeActionKind.QuickFix,
          data: { fixAllInFile: { fixId, fileUri } }
        });
      }
    }
    return actions;
  }
  async function resolveCodeAction(codeAction) {
    const data = codeAction.data ?? {};
    if (data.fixAllInFile !== void 0) {
      const { fixId, fileUri } = data.fixAllInFile;
      const allEdits = [];
      for (const entry of currentDiagnosticIndex.values()) {
        if (entry.fileUri !== fileUri)
          continue;
        const codeFix = entry.diagnostic.codefixes?.find((x) => x.id === fixId);
        if (codeFix) {
          const edits = await resolveCodeFix(codeFix);
          allEdits.push(...edits);
        }
      }
      if (allEdits.length > 0) {
        codeAction.edit = { documentChanges: convertCodeFixEdits(allEdits) };
      }
    } else {
      const { diagId, fixId } = data;
      if (diagId !== void 0 && fixId) {
        const entry = currentDiagnosticIndex.get(diagId);
        const codeFix = entry?.diagnostic.codefixes?.find((x) => x.id === fixId);
        if (codeFix) {
          const edits = await resolveCodeFix(codeFix);
          codeAction.edit = { documentChanges: convertCodeFixEdits(edits) };
        }
      }
    }
    return codeAction;
  }
  function convertCodeFixEdits(edits) {
    const editsByFile = /* @__PURE__ */ new Map();
    for (const edit of edits) {
      const uri = fileService.getURL(edit.file.path);
      const textEdits = editsByFile.get(uri) ?? [];
      textEdits.push(convertCodeFixEdit(edit));
      editsByFile.set(uri, textEdits);
    }
    const documentChanges = [];
    for (const [uri, vsEdits] of editsByFile) {
      documentChanges.push({ kind: "create", uri, options: { ignoreIfExists: true } });
      const document = host.getOpenDocumentByURL(uri);
      documentChanges.push({
        textDocument: { uri, version: document ? document.version : null },
        edits: vsEdits
      });
    }
    return documentChanges;
  }
  function convertCodeFixEdit(edit) {
    switch (edit.kind) {
      case "insert-text":
        return import_vscode_languageserver7.TextEdit.insert(edit.file.getLineAndCharacterOfPosition(edit.pos), edit.text);
      case "replace-text":
        return import_vscode_languageserver7.TextEdit.replace(getRange(edit, edit.file), edit.text);
    }
  }
  function documentClosed(change) {
    fileService.notifyDocumentClosed(change);
    sendDiagnostics(change.document, []);
  }
  function getLocations(targets) {
    return targets?.map(getLocation).filter((x) => !!x) ?? [];
  }
  function getLocation(target) {
    const location = getSourceLocation(target);
    if (location.isSynthetic) {
      return void 0;
    }
    return {
      uri: fileService.getURL(location.file.path),
      range: getRange(location, location.file)
    };
  }
  function getRange(location, file) {
    const start = file.getLineAndCharacterOfPosition(location.pos);
    const end = file.getLineAndCharacterOfPosition(location.end);
    return import_vscode_languageserver7.Range.create(start, end);
  }
  function log(log2) {
    if (!isInitialized) {
      pendingMessages.push(log2);
      return;
    }
    for (const pending of pendingMessages) {
      host.log(pending);
    }
    pendingMessages = [];
    host.log(log2);
  }
  function sendDiagnostics(document, diagnostics) {
    host.sendDiagnostics({
      uri: document.uri,
      version: document.version,
      diagnostics
    });
  }
  function createCompilerHost() {
    const base = host.compilerHost;
    return {
      ...base,
      parseCache: /* @__PURE__ */ new WeakMap(),
      readFile,
      stat,
      getSourceFileKind,
      logSink: {
        log: (log2) => {
          const msg = formatLog(log2, { excludeLogLevel: true });
          const sLog = {
            level: log2.level,
            message: msg
          };
          host.log(sLog);
        }
      }
    };
    async function readFile(path) {
      const document = fileService.getOpenDocument(path);
      const cached = await fileSystemCache.get(path);
      if (cached && (!document || document.version === cached.version)) {
        if (cached.type === "error") {
          throw cached.error;
        }
        return cached.file;
      }
      if (document) {
        const file = {
          document,
          ...createSourceFile(document.getText(), path)
        };
        fileSystemCache.set(path, { type: "file", file, version: document.version });
        return file;
      }
      try {
        const file = await base.readFile(path);
        fileSystemCache.set(path, { type: "file", file });
        return file;
      } catch (error) {
        fileSystemCache.set(path, { type: "error", error });
        throw error;
      }
    }
    async function stat(path) {
      if (fileService.getOpenDocument(path) || (await fileSystemCache.get(path))?.type === "file") {
        return {
          isFile() {
            return true;
          },
          isDirectory() {
            return false;
          }
        };
      }
      return await base.stat(path);
    }
    function getSourceFileKind(path) {
      const document = fileService.getOpenDocument(path);
      if (document?.languageId === "typespec") {
        return "typespec";
      }
      return getSourceFileKindFromExt(path);
    }
  }
}
function getSignatureHelpNodeAtPosition(script, position) {
  position = getPositionBeforeTrivia(script, position);
  const node = getNodeAtPosition(script, position, (n) => {
    switch (n.kind) {
      case SyntaxKind.DecoratorExpression:
      case SyntaxKind.AugmentDecoratorStatement:
      case SyntaxKind.TypeReference:
        if (position <= n.target.end) {
          return false;
        }
        if (position === n.end) {
          const endChar = script.file.text.charCodeAt(position - 1);
          const closeChar = n.kind === SyntaxKind.TypeReference ? CharCode.GreaterThan : CharCode.CloseParen;
          if (endChar === closeChar) {
            return false;
          }
        }
        return true;
      default:
        return false;
    }
  });
  if (!node) {
    return void 0;
  }
  const argumentIndex = getSignatureHelpArgumentIndex(script, node, position);
  if (argumentIndex < 0) {
    return void 0;
  }
  return { node, argumentIndex };
}
function getSignatureHelpArgumentIndex(script, node, position) {
  const args = node.kind === SyntaxKind.AugmentDecoratorStatement ? [node.targetType, ...node.arguments] : node.arguments;
  for (let i = 0; i < args.length; i++) {
    if (position <= skipTrivia(script.file.text, args[i].end)) {
      return i;
    }
  }
  return args.length;
}
function getCompletionNodeAtPosition(script, position, filter = (node) => true) {
  return getNodeAtPositionDetail(script, position, filter);
}

// node_modules/@typespec/compiler/dist/src/lib/intrinsic/tsp-index.js
var tsp_index_exports = {};
__export(tsp_index_exports, {
  $decorators: () => $decorators
});
init_define_process_env();
var $decorators = {
  TypeSpec: {
    indexer: indexerDecorator,
    docFromComment: docFromCommentDecorator
  },
  "TypeSpec.Prototypes": {
    getter: getterDecorator
  }
};

// node_modules/@typespec/compiler/dist/src/lib/tsp-index.js
var tsp_index_exports2 = {};
__export(tsp_index_exports2, {
  $decorators: () => $decorators2,
  $functions: () => $functions,
  namespace: () => namespace
});
init_define_process_env();
var $functions = {
  TypeSpec: {
    applyVisibilityFilter,
    applyLifecycleUpdate
  }
};
var $decorators2 = {
  TypeSpec: {
    encode: $encode,
    mediaTypeHint: $mediaTypeHint,
    doc: $doc,
    withOptionalProperties: $withOptionalProperties,
    withUpdateableProperties: $withUpdateableProperties,
    withoutOmittedProperties: $withoutOmittedProperties,
    withPickedProperties: $withPickedProperties,
    withoutDefaultValues: $withoutDefaultValues,
    summary: $summary,
    returnsDoc: $returnsDoc,
    errorsDoc: $errorsDoc,
    service: $service,
    error: $error,
    format: $format,
    pattern: $pattern,
    minLength: $minLength,
    maxLength: $maxLength,
    minItems: $minItems,
    maxItems: $maxItems,
    minValue: $minValue,
    maxValue: $maxValue,
    minValueExclusive: $minValueExclusive,
    maxValueExclusive: $maxValueExclusive,
    secret: $secret,
    tag: $tag,
    friendlyName: $friendlyName,
    key: $key,
    overload: $overload,
    encodedName: $encodedName,
    discriminated: discriminatedDecorator,
    discriminator: $discriminator,
    example: $example,
    opExample: $opExample,
    inspectType: $inspectType,
    inspectTypeName: $inspectTypeName,
    visibility: $visibility,
    removeVisibility: $removeVisibility,
    invisible: $invisible,
    defaultVisibility: $defaultVisibility,
    withVisibility: $withVisibility,
    withVisibilityFilter: $withVisibilityFilter,
    withLifecycleUpdate: $withLifecycleUpdate,
    withDefaultKeyVisibility: $withDefaultKeyVisibility,
    parameterVisibility: $parameterVisibility,
    returnTypeVisibility: $returnTypeVisibility,
    list: listDecorator,
    offset: offsetDecorator,
    pageIndex: pageIndexDecorator,
    pageSize: pageSizeDecorator,
    pageItems: pageItemsDecorator,
    continuationToken: continuationTokenDecorator,
    nextLink: nextLinkDecorator,
    prevLink: prevLinkDecorator,
    firstLink: firstLinkDecorator,
    lastLink: lastLinkDecorator
  }
};
var namespace = "TypeSpec";

// node_modules/@typespec/compiler/dist/src/core/compiler-code-fixes/create-add-decorator/create-add-decorator.codefix.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/core/compiler-code-fixes/utils.js
init_define_process_env();
function findLineStartAndIndent(location) {
  const text = location.file.text;
  let pos = location.pos;
  let indent = 0;
  while (pos > 0 && text[pos - 1] !== "\n") {
    if (isWhiteSpace(text.charCodeAt(pos - 1))) {
      indent++;
    } else {
      indent = 0;
    }
    pos--;
  }
  return { lineStart: pos, indent: location.file.text.slice(pos, pos + indent) };
}

// node_modules/@typespec/compiler/dist/src/core/compiler-code-fixes/create-add-decorator/create-add-decorator.codefix.js
function createAddDecoratorCodeFix(diagnosticTarget, name, args) {
  return defineCodeFix({
    id: `add-decorator-${name}`,
    label: "Add `@${decoratorName}` decorator.",
    fix: (context) => {
      const location = getSourceLocation(diagnosticTarget);
      const { lineStart, indent } = findLineStartAndIndent(location);
      const updatedLocation = { ...location, pos: lineStart };
      const decText = args ? `${name}(${args.join(", ")})
` : `${name}
`;
      return context.prependText(updatedLocation, `${indent}@${decText}`);
    }
  });
}

// node_modules/@typespec/compiler/dist/src/core/compiler-code-fixes/suppress.codefix.js
init_define_process_env();
var mapGroupBy = Map.groupBy ?? ((items, keyFn) => {
  const result = /* @__PURE__ */ new Map();
  let index = 0;
  for (const item of items) {
    const key = keyFn(item, index++);
    const group = result.get(key);
    if (group) {
      group.push(item);
    } else {
      result.set(key, [item]);
    }
  }
  return result;
});
function createSuppressCodeFix(diagnosticTarget, warningCode, suppressionMessage = "") {
  return defineCodeFix({
    id: "suppress",
    label: `Suppress warning: "${warningCode}"`,
    fix: (context) => {
      const location = findSuppressTarget(diagnosticTarget);
      if (!location) {
        return void 0;
      }
      const { lineStart, indent } = findLineStartAndIndent(location);
      const updatedLocation = { ...location, pos: lineStart };
      return context.prependText(updatedLocation, `${indent}#suppress "${warningCode}" "${suppressionMessage}"
`);
    }
  });
}
function createSuppressCodeFixes(diagnostics, suppressionMessage = "") {
  return Array.from(Array.from(mapGroupBy(diagnostics.filter((diag) => diag.severity === "warning" && diag.target !== NoTarget).map((diag) => {
    const suppressTarget = findSuppressTarget(diag.target);
    return suppressTarget === void 0 ? void 0 : {
      groupingKey: `${diag.code}-${suppressTarget.file.path}-${suppressTarget.pos}-${suppressTarget.end}`,
      fix: createSuppressCodeFix(diag.target, diag.code, suppressionMessage)
    };
  }).filter((fix) => fix !== void 0), (fix) => fix.groupingKey).entries()).map((group) => group[1][0].fix));
}
function findSuppressTarget(target) {
  if ("file" in target) {
    return target;
  }
  const nodeTarget = getNodeForTarget(target);
  if (!nodeTarget)
    return void 0;
  const node = findSuppressNode(nodeTarget);
  return getSourceLocation(node);
}
function findSuppressNode(node) {
  switch (node.kind) {
    case SyntaxKind.Identifier:
    case SyntaxKind.TypeReference:
    case SyntaxKind.UnionExpression:
    case SyntaxKind.ModelExpression:
    case SyntaxKind.ArrayExpression:
    case SyntaxKind.TupleExpression:
    case SyntaxKind.TypeOfExpression:
    case SyntaxKind.CallExpression:
    case SyntaxKind.MemberExpression:
    case SyntaxKind.IntersectionExpression:
    case SyntaxKind.StringTemplateExpression:
    case SyntaxKind.StringTemplateHead:
    case SyntaxKind.StringTemplateSpan:
    case SyntaxKind.StringTemplateTail:
    case SyntaxKind.StringTemplateMiddle:
    case SyntaxKind.TemplateArgument:
    case SyntaxKind.OperationSignatureDeclaration:
      return findSuppressNode(node.parent);
    default:
      return node;
  }
}

// node_modules/@typespec/compiler/dist/src/core/program.js
init_define_process_env();
var import_picocolors = __toESM(require_picocolors_browser(), 1);

// node_modules/@typespec/compiler/dist/src/core/external-error.js
init_define_process_env();
var ExternalError = class extends Error {
  info;
  constructor(info) {
    super(renderExternalErrorInfo(info));
    this.info = info;
    this.name = "ExternalError";
  }
  render(color) {
    return renderExternalErrorInfo(this.info, color);
  }
};
function renderExternalErrorInfo(info, color = (x) => x) {
  const { metadata, kind } = info;
  const msg = [
    color(kind === "emitter" ? `Emitter "${metadata.name}" crashed! This is a bug.` : kind === "info" ? `Library "${metadata.name}" $provideTypeInfo crashed! This is a bug.` : `Library "${metadata.name}" $onValidate crashed! This is a bug.`, "red")
  ];
  if (metadata.bugs?.url) {
    msg.push(`Please file an issue at ${color(metadata.bugs?.url, "cyan")}`);
  } else {
    msg.push(`Please contact library author to report this issue.`);
  }
  msg.push("");
  msg.push(color(getInnerError(info), "gray"));
  msg.push("");
  msg.push(getReportInfo(metadata, color));
  return msg.join("\n");
}
function getInnerError({ error }) {
  if (typeof error === "object" && error !== null && "stack" in error && typeof error.stack === "string") {
    return error.stack;
  } else {
    return String(error);
  }
}
function getReportInfo(metadata, color) {
  const details = {
    "Library Version": metadata.version ?? "?",
    "TypeSpec Compiler Version": MANIFEST.version
  };
  return [
    "-".repeat(50),
    ...Object.entries(details).map(([k, v]) => `${k.padEnd(30)} ${color(v, "yellow")}`),
    "-".repeat(50)
  ].join("\n");
}

// node_modules/@typespec/compiler/dist/src/core/logger/tracer.js
init_define_process_env();
function createTracer(logger, tracerOptions = {}) {
  const filters = tracerOptions.filter ? createFilterTree(tracerOptions.filter) : void 0;
  function shouldTrace(area) {
    if (!filters) {
      return false;
    }
    return filters.match(area);
  }
  function log(area, message) {
    if (shouldTrace(area)) {
      logger.log({
        level: "trace",
        code: area,
        message
      });
    }
  }
  return createTracerInternal(log);
}
function createFilterTree(filters) {
  const tree = {
    all: false,
    children: {}
  };
  for (const filter of filters) {
    if (tree.all) {
      break;
    }
    let current = tree;
    const segments = filter.split(".");
    for (const segment of segments) {
      if (current.all) {
        break;
      }
      if (segment === "*") {
        current.all = true;
        break;
      }
      current.children[segment] = {
        all: false,
        children: {}
      };
      current = current.children[segment];
    }
    current.all = true;
  }
  return { match };
  function match(area) {
    if (tree.all) {
      return true;
    }
    const segments = area.split(".");
    let current = tree;
    for (const segment of segments) {
      if (current.all) {
        return true;
      }
      if (!current.children[segment]) {
        return false;
      }
      current = current.children[segment];
    }
    return true;
  }
}
function createTracerInternal(log) {
  return {
    trace,
    sub
  };
  function trace(area, message) {
    log(area, message);
  }
  function sub(subArea) {
    return createTracerInternal((area, message) => {
      log(joinAreas(subArea, area), message);
    });
  }
}
function joinAreas(a, b) {
  if (a) {
    if (b) {
      return `${a}.${b}`;
    }
    return a;
  } else {
    return b ?? "";
  }
}

// node_modules/@typespec/compiler/dist/src/core/name-resolver.js
init_define_process_env();
var currentNodeId = 0;
var currentSymbolId = 0;
function createResolver(program) {
  const mergedSymbols = /* @__PURE__ */ new Map();
  const augmentedSymbolTables = /* @__PURE__ */ new Map();
  const nodeLinks = /* @__PURE__ */ new Map();
  const symbolLinks = /* @__PURE__ */ new Map();
  const visitedNode = /* @__PURE__ */ new Set();
  const globalNamespaceNode = createGlobalNamespaceNode();
  const globalNamespaceSym = createSymbol(globalNamespaceNode, "global", SymbolFlags.Namespace | SymbolFlags.Declaration);
  mutate(globalNamespaceNode).symbol = globalNamespaceSym;
  mutate(globalNamespaceSym.exports).set(globalNamespaceNode.id.sv, globalNamespaceSym);
  const usedUsingSym = /* @__PURE__ */ new Map();
  const metaTypePrototypes = createMetaTypePrototypes();
  const nullSym = createSymbol(void 0, "null", SymbolFlags.None);
  const augmentDecoratorsForSym = /* @__PURE__ */ new Map();
  return {
    symbols: { global: globalNamespaceSym, null: nullSym },
    resolveProgram() {
      for (const file of program.jsSourceFiles.values()) {
        mergeSymbolTable(file.symbol.exports, mutate(globalNamespaceSym.exports));
      }
      for (const file of program.sourceFiles.values()) {
        mergeSymbolTable(file.symbol.exports, mutate(globalNamespaceSym.exports));
      }
      const typespecNamespaceBinding = globalNamespaceSym.exports.get("TypeSpec");
      if (typespecNamespaceBinding) {
        mutate(typespecNamespaceBinding.exports).set("null", nullSym);
        for (const file of program.sourceFiles.values()) {
          addUsingSymbols(typespecNamespaceBinding.exports, file.locals);
        }
      }
      for (const file of program.sourceFiles.values()) {
        setUsingsForFile(file);
      }
      for (const file of program.sourceFiles.values()) {
        bindAndResolveNode(file);
      }
    },
    getMergedSymbol,
    getAugmentedSymbolTable,
    getNodeLinks,
    getSymbolLinks,
    resolveMemberExpressionForSym,
    resolveMetaMemberByName,
    getMetaMemberNames,
    resolveTypeReference,
    getAugmentDecoratorsForSym,
    getUnusedUsings
  };
  function getUnusedUsings() {
    const unusedUsings = /* @__PURE__ */ new Set();
    for (const file of program.sourceFiles.values()) {
      const lc = program.getSourceFileLocationContext(file.file);
      if (lc.type === "project") {
        const usedSym = usedUsingSym.get(file) ?? /* @__PURE__ */ new Set();
        for (const using of file.usings) {
          const table = getNodeLinks(using.name).resolvedSymbol;
          let used = false;
          for (const [_, sym] of table?.exports ?? /* @__PURE__ */ new Map()) {
            if (usedSym.has(getMergedSymbol(sym))) {
              used = true;
              break;
            }
          }
          if (used === false) {
            unusedUsings.add(using);
          }
        }
      }
    }
    return [...unusedUsings];
  }
  function getAugmentDecoratorsForSym(sym) {
    return augmentDecoratorsForSym.get(sym) ?? [];
  }
  function getMergedSymbol(sym) {
    if (!sym)
      return sym;
    return mergedSymbols.get(sym) || sym;
  }
  function getNodeLinks(n) {
    const id = getNodeId(n);
    if (nodeLinks.has(id)) {
      return nodeLinks.get(id);
    }
    const links = {};
    nodeLinks.set(id, links);
    return links;
  }
  function getNodeId(n) {
    if (n._id === void 0) {
      mutate(n)._id = currentNodeId++;
    }
    return n._id;
  }
  function getSymbolLinks(s) {
    const id = getSymbolId(s);
    if (symbolLinks.has(id)) {
      return symbolLinks.get(id);
    }
    const links = {};
    symbolLinks.set(id, links);
    return links;
  }
  function getSymbolId(s) {
    if (s.id === void 0) {
      mutate(s).id = currentSymbolId++;
    }
    return s.id;
  }
  function resolveTypeReference(node, options = {}) {
    const links = getNodeLinks(node);
    if (links.resolutionResult) {
      return links;
    }
    let result = resolveTypeReferenceWorker(node, options);
    const resolvedSym = result.resolvedSymbol;
    Object.assign(links, result);
    if (resolvedSym && resolvedSym.flags & SymbolFlags.Alias) {
      const aliasNode = resolvedSym.declarations[0];
      const aliasResult = resolveAlias(aliasNode);
      const isTemplateInstantiation = aliasResult.isTemplateInstantiation && aliasNode.templateParameters.length === 0;
      if (isTemplateInstantiation) {
        links.isTemplateInstantiation = true;
      }
      if (aliasResult.finalSymbol) {
        links.finalSymbol = aliasResult.finalSymbol;
      }
      result = {
        ...aliasResult,
        finalSymbol: links.finalSymbol,
        isTemplateInstantiation: result.isTemplateInstantiation || isTemplateInstantiation
      };
    } else if (resolvedSym && resolvedSym.flags & SymbolFlags.TemplateParameter) {
      const templateNode = resolvedSym.declarations[0];
      if (templateNode.constraint) {
        result = resolveTemplateParameter(templateNode);
      }
    }
    if (resolvedSym) {
      if (resolvedSym.flags & SymbolFlags.Declaration && ~resolvedSym.flags & SymbolFlags.Namespace) {
        bindAndResolveNode(resolvedSym.declarations[0]);
      }
    }
    return result;
  }
  function resolveTypeReferenceWorker(node, options) {
    if (node.kind === SyntaxKind.TypeReference) {
      const result = resolveTypeReference(node.target, options);
      return node.arguments.length > 0 ? { ...result, isTemplateInstantiation: true } : result;
    } else if (node.kind === SyntaxKind.MemberExpression) {
      return resolveMemberExpression(node, options);
    } else if (node.kind === SyntaxKind.Identifier) {
      return resolveIdentifier(node, options);
    }
    compilerAssert(false, "Unexpected node kind");
  }
  function resolveMemberExpression(node, options) {
    const baseResult = resolveTypeReference(node.base, {
      ...options,
      resolveDecorators: false
      // When resolving the base it can never be a decorator
    });
    if (baseResult.resolutionResult & ResolutionResultFlags.ResolutionFailed) {
      return baseResult;
    }
    const baseSym = baseResult.finalSymbol;
    compilerAssert(baseSym, "Base symbol must be defined if resolution did not fail");
    const memberResult = resolveMemberExpressionForSym(baseSym, node, options);
    const idNodeLinks = getNodeLinks(node.id);
    idNodeLinks.resolvedSymbol = memberResult.resolvedSymbol;
    idNodeLinks.resolutionResult = memberResult.resolutionResult;
    const isTemplateInstantiation = baseResult.isTemplateInstantiation || memberResult.isTemplateInstantiation;
    idNodeLinks.isTemplateInstantiation = isTemplateInstantiation;
    return {
      ...memberResult,
      isTemplateInstantiation
    };
  }
  function resolveMemberExpressionForSym(baseSym, node, options = {}) {
    if (node.selector === ".") {
      if (baseSym.flags & SymbolFlags.MemberContainer) {
        return resolveMember(baseSym, node.id);
      } else if (baseSym.flags & SymbolFlags.ExportContainer) {
        const res = resolveExport(getMergedSymbol(baseSym), node.id, options);
        return res;
      }
    } else {
      return resolveMetaMember(baseSym, node.id);
    }
    return failedResult(ResolutionResultFlags.NotFound);
  }
  function resolveMember(baseSym, id) {
    const baseNode = baseSym.node ?? baseSym.declarations[0];
    compilerAssert(baseNode, "Base symbol must have an associated node");
    bindMemberContainer(baseNode);
    switch (baseNode.kind) {
      case SyntaxKind.ModelStatement:
      case SyntaxKind.ModelDeclarationExpression:
      case SyntaxKind.ModelExpression:
      case SyntaxKind.IntersectionExpression:
        return resolveModelMember(baseSym, baseNode, id);
      case SyntaxKind.InterfaceStatement:
        return resolveInterfaceMember(baseSym, id);
      case SyntaxKind.EnumStatement:
      case SyntaxKind.EnumDeclarationExpression:
        return resolveEnumMember(baseSym, id);
      case SyntaxKind.UnionStatement:
      case SyntaxKind.UnionDeclarationExpression:
        return resolveUnionVariant(baseSym, id);
      case SyntaxKind.ScalarStatement:
      case SyntaxKind.ScalarDeclarationExpression:
        return resolveScalarConstructor(baseSym, id);
    }
    compilerAssert(false, "Unknown member container kind: " + SyntaxKind[baseNode.kind]);
  }
  function resolvedResult(resolvedSymbol) {
    return {
      resolvedSymbol,
      finalSymbol: resolvedSymbol,
      resolutionResult: ResolutionResultFlags.Resolved
    };
  }
  function failedResult(resolutionResult) {
    return {
      resolvedSymbol: void 0,
      finalSymbol: void 0,
      resolutionResult
    };
  }
  function ambiguousResult(symbols) {
    return {
      resolutionResult: ResolutionResultFlags.Ambiguous,
      resolvedSymbol: void 0,
      finalSymbol: void 0,
      ambiguousSymbols: symbols
    };
  }
  function resolveModelMember(modelSym, modelNode, id) {
    const memberSym = tableLookup(modelSym.members, id);
    if (memberSym) {
      return resolvedResult(memberSym);
    }
    const modelSymLinks = getSymbolLinks(modelSym);
    const extendsRef = modelNode.kind === SyntaxKind.ModelStatement || modelNode.kind === SyntaxKind.ModelDeclarationExpression ? modelNode.extends : void 0;
    if (extendsRef && extendsRef.kind === SyntaxKind.TypeReference && !modelSymLinks.hasUnknownMembers) {
      const { finalSymbol: extendsSym, resolutionResult: extendsResult } = resolveTypeReference(extendsRef);
      if (extendsResult & ResolutionResultFlags.Resolved) {
        return resolveMember(extendsSym, id);
      }
      if (extendsResult & ResolutionResultFlags.Unknown) {
        modelSymLinks.hasUnknownMembers = true;
        return failedResult(ResolutionResultFlags.Unknown);
      }
    }
    return failedResult(modelSymLinks.hasUnknownMembers ? ResolutionResultFlags.Unknown : ResolutionResultFlags.NotFound);
  }
  function resolveInterfaceMember(ifaceSym, id) {
    const slinks = getSymbolLinks(ifaceSym);
    const memberSym = tableLookup(ifaceSym.members, id);
    if (memberSym) {
      return resolvedResult(memberSym);
    }
    return failedResult(slinks.hasUnknownMembers ? ResolutionResultFlags.Unknown : ResolutionResultFlags.NotFound);
  }
  function resolveEnumMember(enumSym, id) {
    const memberSym = tableLookup(enumSym.members, id);
    if (memberSym) {
      return resolvedResult(memberSym);
    }
    return failedResult(ResolutionResultFlags.NotFound);
  }
  function resolveUnionVariant(unionSym, id) {
    const memberSym = tableLookup(unionSym.members, id);
    if (memberSym) {
      return resolvedResult(memberSym);
    }
    return failedResult(ResolutionResultFlags.NotFound);
  }
  function resolveScalarConstructor(scalarSym, id) {
    const memberSym = tableLookup(scalarSym.members, id);
    if (memberSym) {
      return resolvedResult(memberSym);
    }
    return failedResult(ResolutionResultFlags.NotFound);
  }
  function resolveExport(baseSym, id, options) {
    const node = baseSym.declarations[0];
    compilerAssert(node.kind === SyntaxKind.NamespaceStatement || node.kind === SyntaxKind.TypeSpecScript || node.kind === SyntaxKind.JsNamespaceDeclaration, `Unexpected node kind ${SyntaxKind[node.kind]}`);
    const exportSym = tableLookup(baseSym.exports, id, options.resolveDecorators);
    if (!exportSym) {
      return failedResult(ResolutionResultFlags.NotFound);
    }
    return resolvedResult(exportSym);
  }
  function resolveAlias(node) {
    const symbol = node.symbol;
    const slinks = getSymbolLinks(symbol);
    if (slinks.aliasResolutionResult) {
      return {
        resolutionResult: slinks.aliasResolutionResult,
        resolvedSymbol: slinks.aliasedSymbol,
        finalSymbol: slinks.aliasedSymbol,
        isTemplateInstantiation: slinks.aliasResolutionIsTemplate
      };
    }
    if (node.value.kind === SyntaxKind.TypeReference) {
      const result = resolveTypeReference(node.value);
      if (result.finalSymbol && result.finalSymbol.flags & SymbolFlags.Alias) {
        const aliasLinks = getSymbolLinks(result.finalSymbol);
        slinks.aliasedSymbol = aliasLinks.aliasedSymbol ? aliasLinks.aliasedSymbol : result.finalSymbol;
      } else {
        slinks.aliasedSymbol = result.finalSymbol;
      }
      slinks.aliasResolutionResult = result.resolutionResult;
      slinks.aliasResolutionIsTemplate = result.isTemplateInstantiation;
      return {
        resolvedSymbol: result.resolvedSymbol,
        finalSymbol: slinks.aliasedSymbol,
        resolutionResult: slinks.aliasResolutionResult,
        isTemplateInstantiation: result.isTemplateInstantiation
      };
    } else if (node.value.kind === SyntaxKind.CallExpression) {
      const resolutionResult = resolveReturnType(node.value.target);
      slinks.aliasedSymbol = resolutionResult.finalSymbol;
      slinks.aliasResolutionResult = resolutionResult.resolutionResult;
      slinks.aliasResolutionIsTemplate = resolutionResult.isTemplateInstantiation;
      return resolutionResult;
    } else if (node.value.symbol) {
      slinks.aliasedSymbol = node.value.symbol;
      slinks.aliasResolutionResult = ResolutionResultFlags.Resolved;
      return resolvedResult(node.value.symbol);
    } else {
      slinks.aliasResolutionResult = ResolutionResultFlags.Unknown;
      return failedResult(ResolutionResultFlags.Unknown);
    }
  }
  function resolveReturnType(node) {
    const baseResult = resolveTypeReference(node, { resolveDecorators: false });
    if (baseResult.resolutionResult & ResolutionResultFlags.ResolutionFailed) {
      return baseResult;
    }
    const baseSym = baseResult.finalSymbol;
    compilerAssert(baseSym, "Base symbol must be defined if resolution did not fail");
    if (baseSym.flags & SymbolFlags.Function) {
      const funcNode = baseSym.declarations.find((decl) => decl.kind === SyntaxKind.FunctionDeclarationStatement);
      if (funcNode) {
        const returnTypeNode = funcNode.returnType;
        if (returnTypeNode) {
          return resolveExpression2(returnTypeNode);
        }
      }
      return failedResult(ResolutionResultFlags.None);
    }
    return failedResult(ResolutionResultFlags.Unknown);
  }
  function resolveTemplateParameter(node) {
    const symbol = node.symbol;
    const slinks = getSymbolLinks(symbol);
    if (!node.constraint) {
      return resolvedResult(node.symbol);
    }
    if (slinks.constraintResolutionResult) {
      return {
        finalSymbol: slinks.constraintSymbol,
        resolvedSymbol: slinks.constraintSymbol,
        resolutionResult: slinks.constraintResolutionResult
      };
    }
    if (node.constraint && node.constraint.kind === SyntaxKind.TypeReference) {
      const result = resolveTypeReference(node.constraint);
      slinks.constraintSymbol = result.finalSymbol;
      slinks.constraintResolutionResult = result.resolutionResult;
      return result;
    } else if (node.constraint.symbol) {
      slinks.constraintSymbol = node.constraint.symbol;
      slinks.constraintResolutionResult = ResolutionResultFlags.Resolved;
      return resolvedResult(node.constraint.symbol);
    } else {
      slinks.constraintSymbol = node.symbol;
      slinks.constraintResolutionResult = ResolutionResultFlags.Resolved;
      return resolvedResult(node.symbol);
    }
  }
  function resolveExpression2(node) {
    if (node.kind === SyntaxKind.TypeReference) {
      return resolveTypeReference(node);
    }
    if (node.symbol) {
      return resolvedResult(node.symbol);
    }
    return failedResult(ResolutionResultFlags.Unknown);
  }
  function resolveMetaMember(baseSym, id) {
    return resolveMetaMemberByName(baseSym, id.sv);
  }
  function resolveMetaMemberByName(baseSym, sv) {
    const baseNode = getSymNode(baseSym);
    if (!baseNode) {
      return failedResult(ResolutionResultFlags.NotFound);
    }
    const prototype = getMetaTypePrototypeForSymbol(baseSym, baseNode);
    if (!prototype || isReflectionMetaProjectionSymbol(baseSym, baseNode)) {
      return failedResult(ResolutionResultFlags.NotFound);
    }
    const getter = prototype.get(sv);
    if (!getter) {
      return failedResult(ResolutionResultFlags.NotFound);
    }
    return getter(baseSym);
  }
  function getMetaMemberNames(baseSym) {
    const baseNode = getSymNode(baseSym);
    if (!baseNode) {
      return [];
    }
    const prototype = getMetaTypePrototypeForSymbol(baseSym, baseNode);
    return prototype ? [...prototype.keys()] : [];
  }
  function getMetaTypePrototypeForSymbol(baseSym, baseNode) {
    const prototype = metaTypePrototypes.get(baseNode.kind);
    if (prototype) {
      return prototype;
    }
    if (baseNode.kind === SyntaxKind.ModelStatement && baseSym.parent?.name === "Reflection" && baseSym.parent?.parent?.name === "TypeSpec") {
      switch (baseSym.name) {
        case "ModelProperty":
          return metaTypePrototypes.get(SyntaxKind.ModelProperty);
        case "Operation":
          return metaTypePrototypes.get(SyntaxKind.OperationStatement);
      }
    }
    return void 0;
  }
  function isReflectionMetaProjectionSymbol(baseSym, baseNode) {
    return baseNode.kind === SyntaxKind.ModelStatement && baseSym.parent?.name === "Reflection" && baseSym.parent?.parent?.name === "TypeSpec";
  }
  function tableLookup(table, node, resolveDecorator = false) {
    table = augmentedSymbolTables.get(table) ?? table;
    let sym;
    if (resolveDecorator) {
      sym = table.get("@" + node.sv);
    } else {
      sym = table.get(node.sv);
    }
    if (!sym)
      return sym;
    return getMergedSymbol(sym);
  }
  function bindMemberContainer(node) {
    const sym = node.symbol;
    const symLinks = getSymbolLinks(sym);
    if (symLinks.membersBound) {
      return;
    }
    symLinks.membersBound = true;
    switch (node.kind) {
      case SyntaxKind.ModelStatement:
      case SyntaxKind.ModelDeclarationExpression:
      case SyntaxKind.ModelExpression:
        bindModelMembers(node);
        return;
      case SyntaxKind.IntersectionExpression:
        bindIntersectionMembers(node);
        return;
      case SyntaxKind.InterfaceStatement:
        bindInterfaceMembers(node);
        return;
      case SyntaxKind.EnumStatement:
      case SyntaxKind.EnumDeclarationExpression:
        bindEnumMembers(node);
        return;
      case SyntaxKind.UnionStatement:
      case SyntaxKind.UnionDeclarationExpression:
        bindUnionMembers(node);
        return;
      case SyntaxKind.ScalarStatement:
      case SyntaxKind.ScalarDeclarationExpression:
        bindScalarMembers(node);
        return;
    }
  }
  function bindOperationStatementParameters(node) {
    const targetTable = getAugmentedSymbolTable(node.symbol.metatypeMembers);
    if (node.signature.kind === SyntaxKind.OperationSignatureDeclaration) {
      const { finalSymbol: sym } = resolveExpression2(node.signature.parameters);
      if (sym) {
        targetTable.set("parameters", sym);
      }
    } else {
      const { finalSymbol: sig } = resolveTypeReference(node.signature.baseOperation);
      if (sig) {
        const sigTable = getAugmentedSymbolTable(sig.metatypeMembers);
        const sigParameterSym = sigTable.get("parameters");
        if (sigParameterSym !== void 0) {
          const parametersSym = createSymbol(sigParameterSym.node, "parameters", SymbolFlags.Model & SymbolFlags.MemberContainer);
          getAugmentedSymbolTable(parametersSym.members).include(getAugmentedSymbolTable(sigParameterSym.members), parametersSym);
          targetTable.set("parameters", parametersSym);
          targetTable.set("returnType", sigTable.get("returnType"));
        }
      }
    }
  }
  function bindDeclarationIdentifier(node) {
    if (node.kind === SyntaxKind.TypeSpecScript || node.kind === SyntaxKind.JsSourceFile)
      return;
    const links = getNodeLinks(node.id);
    let sym;
    if (node.symbol === void 0) {
      return;
    }
    if (node.symbol.flags & SymbolFlags.Member) {
      compilerAssert(node.parent, "Node should have a parent");
      const parentSym = getMergedSymbol(node.parent.symbol);
      const table = parentSym.exports ?? getAugmentedSymbolTable(parentSym.members);
      sym = table.get(node.id.sv);
    } else {
      sym = node.symbol;
    }
    compilerAssert(sym, "Should have a symbol");
    links.resolvedSymbol = sym;
    links.resolutionResult = ResolutionResultFlags.Resolved;
  }
  function bindModelMembers(node) {
    const modelSym = node.symbol;
    const modelSymLinks = getSymbolLinks(modelSym);
    const targetTable = getAugmentedSymbolTable(modelSym.members);
    const isRef = node.kind === SyntaxKind.ModelStatement || node.kind === SyntaxKind.ModelDeclarationExpression ? node.is : void 0;
    if (isRef && isRef.kind === SyntaxKind.TypeReference) {
      const { finalSymbol: isSym, resolutionResult: isResult } = resolveTypeReference(isRef);
      setUnknownMembers(modelSymLinks, isSym, isResult);
      if (isResult & ResolutionResultFlags.Resolved && isSym.flags & SymbolFlags.Model) {
        const sourceTable = getAugmentedSymbolTable(isSym.members);
        targetTable.include(sourceTable, modelSym);
      }
    }
    const extendsRef = node.kind === SyntaxKind.ModelStatement || node.kind === SyntaxKind.ModelDeclarationExpression ? node.extends : void 0;
    if (extendsRef && extendsRef.kind === SyntaxKind.TypeReference) {
      const { finalSymbol: sym, resolutionResult: result } = resolveTypeReference(extendsRef);
      setUnknownMembers(modelSymLinks, sym, result);
    }
    for (const propertyNode of node.properties) {
      if (propertyNode.kind !== SyntaxKind.ModelSpreadProperty) {
        continue;
      }
      const { finalSymbol: sourceSym, resolutionResult: sourceResult } = resolveTypeReference(propertyNode.target);
      setUnknownMembers(modelSymLinks, sourceSym, sourceResult);
      if (~sourceResult & ResolutionResultFlags.Resolved) {
        continue;
      }
      compilerAssert(sourceSym, "Spread symbol must be defined if resolution succeeded");
      if (~sourceSym.flags & SymbolFlags.Model) {
        continue;
      }
      const sourceTable = getAugmentedSymbolTable(sourceSym.members);
      targetTable.include(sourceTable, modelSym);
    }
  }
  function bindIntersectionMembers(node) {
    const intersectionSym = node.symbol;
    const intersectionSymLinks = getSymbolLinks(intersectionSym);
    const targetTable = getAugmentedSymbolTable(intersectionSym.members);
    for (const expr of node.options) {
      const { finalSymbol: sourceSym, resolutionResult: sourceResult } = resolveExpression2(expr);
      setUnknownMembers(intersectionSymLinks, sourceSym, sourceResult);
      if (~sourceResult & ResolutionResultFlags.Resolved) {
        continue;
      }
      compilerAssert(sourceSym, "Spread symbol must be defined if resolution succeeded");
      if (~sourceSym.flags & SymbolFlags.Model) {
        continue;
      }
      const sourceTable = getAugmentedSymbolTable(sourceSym.members);
      targetTable.include(sourceTable, intersectionSym);
    }
  }
  function setUnknownMembers(targetSymLinks, sym, result) {
    if (result & ResolutionResultFlags.Unknown) {
      targetSymLinks.hasUnknownMembers = true;
    } else if (result & ResolutionResultFlags.Resolved) {
      const isSymLinks = getSymbolLinks(sym);
      if (isSymLinks.hasUnknownMembers) {
        targetSymLinks.hasUnknownMembers = true;
      }
    }
  }
  function bindInterfaceMembers(node) {
    const ifaceSym = node.symbol;
    const ifaceSymLinks = getSymbolLinks(ifaceSym);
    for (const extendsRef of node.extends) {
      const { finalSymbol: extendsSym, resolutionResult: extendsResult } = resolveTypeReference(extendsRef);
      setUnknownMembers(ifaceSymLinks, extendsSym, extendsResult);
      if (~extendsResult & ResolutionResultFlags.Resolved) {
        continue;
      }
      compilerAssert(extendsSym, "Extends symbol must be defined if resolution succeeded");
      if (~extendsSym.flags & SymbolFlags.Interface) {
        continue;
      }
      const sourceTable = getAugmentedSymbolTable(extendsSym.members);
      const targetTable = getAugmentedSymbolTable(ifaceSym.members);
      targetTable.include(sourceTable, ifaceSym);
    }
  }
  function bindEnumMembers(node) {
    const enumSym = node.symbol;
    const enumSymLinks = getSymbolLinks(enumSym);
    const targetTable = getAugmentedSymbolTable(enumSym.members);
    for (const memberNode of node.members) {
      if (memberNode.kind !== SyntaxKind.EnumSpreadMember) {
        continue;
      }
      const { finalSymbol: sourceSym, resolutionResult: sourceResult } = resolveTypeReference(memberNode.target);
      setUnknownMembers(enumSymLinks, sourceSym, sourceResult);
      if (~sourceResult & ResolutionResultFlags.Resolved) {
        continue;
      }
      compilerAssert(sourceSym, "Spread symbol must be defined if resolution succeeded");
      if (~sourceSym.flags & SymbolFlags.Enum) {
        continue;
      }
      const sourceTable = getAugmentedSymbolTable(sourceSym.members);
      targetTable.include(sourceTable, enumSym);
    }
  }
  function bindUnionMembers(node) {
  }
  function bindScalarMembers(node) {
    const scalarSym = node.symbol;
    const targetTable = getAugmentedSymbolTable(scalarSym.members);
    const scalarSymLinks = getSymbolLinks(scalarSym);
    if (node.extends) {
      const { finalSymbol: extendsSym, resolutionResult: extendsResult } = resolveTypeReference(node.extends);
      setUnknownMembers(scalarSymLinks, extendsSym, extendsResult);
      if (~extendsResult & ResolutionResultFlags.Resolved) {
        return;
      }
      compilerAssert(extendsSym, "Scalar extends symbol must be defined if resolution succeeded");
      const sourceTable = getAugmentedSymbolTable(extendsSym.members);
      targetTable.include(sourceTable, scalarSym);
    }
  }
  function bindTemplateParameter(node) {
    const sym = node.symbol;
    const links = getSymbolLinks(sym);
    links.hasUnknownMembers = true;
  }
  function resolveIdentifier(node, options) {
    let scope = node.parent;
    let binding;
    while (scope && scope.kind !== SyntaxKind.TypeSpecScript) {
      if (scope.symbol && scope.symbol.flags & SymbolFlags.ExportContainer) {
        const mergedSymbol = getMergedSymbol(scope.symbol);
        binding = tableLookup(mergedSymbol.exports, node, options.resolveDecorators);
        if (binding)
          return resolvedResult(binding);
      }
      if ("locals" in scope && scope.locals !== void 0) {
        binding = tableLookup(scope.locals, node, options.resolveDecorators);
        if (binding) {
          if (binding.flags & SymbolFlags.Using && binding.symbolSource) {
            const fileNode = getFirstAncestor(node, (n) => n.kind === SyntaxKind.TypeSpecScript);
            if (fileNode) {
              usedUsingSym.get(fileNode)?.add(binding.symbolSource) ?? usedUsingSym.set(fileNode, /* @__PURE__ */ new Set([binding.symbolSource]));
            }
          }
          return resolvedResult(binding);
        }
      }
      scope = scope.parent;
    }
    if (!binding && scope && scope.kind === SyntaxKind.TypeSpecScript) {
      if (!options.skipFileNamespaces) {
        for (const ns of scope.inScopeNamespaces) {
          const mergedSymbol = getMergedSymbol(ns.symbol);
          binding = tableLookup(mergedSymbol.exports, node, options.resolveDecorators);
          if (binding)
            return resolvedResult(binding);
        }
      }
      const globalBinding = tableLookup(globalNamespaceNode.symbol.exports, node, options.resolveDecorators);
      const usingBinding = tableLookup(scope.locals, node, options.resolveDecorators);
      if (globalBinding && usingBinding) {
        return ambiguousResult([globalBinding, usingBinding]);
      } else if (globalBinding) {
        return resolvedResult(globalBinding);
      } else if (usingBinding) {
        if (usingBinding.flags & SymbolFlags.DuplicateUsing) {
          return ambiguousResult([
            ...augmentedSymbolTables.get(scope.locals)?.duplicates.get(usingBinding) ?? []
          ]);
        }
        if (usingBinding.flags & SymbolFlags.Using && usingBinding.symbolSource) {
          usedUsingSym.get(scope)?.add(usingBinding.symbolSource) ?? usedUsingSym.set(scope, /* @__PURE__ */ new Set([usingBinding.symbolSource]));
        }
        return resolvedResult(usingBinding.symbolSource);
      }
    }
    return failedResult(ResolutionResultFlags.Unknown);
  }
  function getAugmentedSymbolTable(table) {
    let augmented = augmentedSymbolTables.get(table);
    if (!augmented) {
      augmented = createSymbolTable(table);
      augmentedSymbolTables.set(table, augmented);
    }
    return mutate(augmented);
  }
  function mergeSymbolTable(source, target) {
    for (const [sym, duplicates] of source.duplicates) {
      const targetSet = target.duplicates.get(sym);
      if (targetSet === void 0) {
        mutate(target.duplicates).set(sym, /* @__PURE__ */ new Set([...duplicates]));
      } else {
        for (const duplicate of duplicates) {
          mutate(targetSet).add(duplicate);
        }
      }
    }
    for (const [key, sourceBinding] of source) {
      if (sourceBinding.flags & SymbolFlags.Namespace) {
        let targetBinding = target.get(key);
        if (!targetBinding) {
          targetBinding = {
            ...sourceBinding,
            declarations: [],
            exports: createSymbolTable()
          };
          target.set(key, targetBinding);
        }
        if (targetBinding.flags & SymbolFlags.Namespace) {
          mergedSymbols.set(sourceBinding, targetBinding);
          mutate(targetBinding.declarations).push(...sourceBinding.declarations);
          mergeSymbolTable(sourceBinding.exports, mutate(targetBinding.exports));
        } else {
          target.set(key, sourceBinding);
        }
      } else if (sourceBinding.flags & SymbolFlags.Decorator) {
        mergeDeclarationOrImplementation(key, sourceBinding, target, SymbolFlags.Decorator);
      } else if (sourceBinding.flags & SymbolFlags.Function) {
        mergeDeclarationOrImplementation(key, sourceBinding, target, SymbolFlags.Function);
      } else {
        target.set(key, sourceBinding);
      }
    }
  }
  function mergeDeclarationOrImplementation(key, sourceBinding, target, expectTargetFlags) {
    const targetBinding = target.get(key);
    if (!targetBinding || !(targetBinding.flags & expectTargetFlags)) {
      target.set(key, sourceBinding);
      return;
    }
    const isSourceImplementation = sourceBinding.flags & SymbolFlags.Implementation;
    const isTargetImplementation = targetBinding.flags & SymbolFlags.Implementation;
    if (!isTargetImplementation && isSourceImplementation) {
      mergedSymbols.set(sourceBinding, targetBinding);
      mutate(targetBinding).value = sourceBinding.value;
      mutate(targetBinding).flags |= sourceBinding.flags;
      mutate(targetBinding.declarations).push(...sourceBinding.declarations);
    } else if (isTargetImplementation && !isSourceImplementation) {
      mergedSymbols.set(sourceBinding, targetBinding);
      mutate(targetBinding).flags |= sourceBinding.flags;
      mutate(targetBinding.declarations).unshift(...sourceBinding.declarations);
    } else {
      target.set(key, sourceBinding);
    }
  }
  function setUsingsForFile(file) {
    const usedUsing = /* @__PURE__ */ new Map();
    function isAlreadyAddedIn(sym, target) {
      let current = sym;
      while (current) {
        if (usedUsing.get(sym)?.has(target)) {
          return true;
        }
        current = current.parent;
      }
      let usingForScope = usedUsing.get(sym);
      if (usingForScope === void 0) {
        usingForScope = /* @__PURE__ */ new Set();
        usedUsing.set(sym, usingForScope);
      }
      usingForScope.add(target);
      return false;
    }
    for (const using of file.usings) {
      const parentNs = using.parent;
      const { finalSymbol: usedSym, resolutionResult: usedSymResult } = resolveTypeReference(
        using.name,
        // A using declared before the blockless namespace is not scoped to the file namespace and, like in C#,
        // resolves from the global namespace.
        { skipFileNamespaces: using.scopeNamespace === void 0 }
      );
      if (~usedSymResult & ResolutionResultFlags.Resolved) {
        continue;
      }
      compilerAssert(usedSym, "Used symbol must be defined if resolution succeeded");
      if (~usedSym.flags & SymbolFlags.Namespace) {
        continue;
      }
      const namespaceSym = getMergedSymbol(usedSym);
      if (isAlreadyAddedIn(getMergedSymbol(parentNs.symbol), namespaceSym)) {
        continue;
      }
      addUsingSymbols(namespaceSym.exports, parentNs.locals);
    }
  }
  function addUsingSymbols(source, destination) {
    const augmented = getAugmentedSymbolTable(destination);
    for (const symbolSource of source.values()) {
      const sym = {
        flags: SymbolFlags.Using,
        declarations: [],
        name: symbolSource.name,
        symbolSource,
        node: void 0
      };
      augmented.set(sym.name, sym);
    }
  }
  function createGlobalNamespaceNode() {
    const nsId = {
      kind: SyntaxKind.Identifier,
      pos: 0,
      end: 0,
      sv: "global",
      symbol: void 0,
      flags: NodeFlags.Synthetic
    };
    const nsNode = {
      kind: SyntaxKind.NamespaceStatement,
      decorators: [],
      pos: 0,
      end: 0,
      id: nsId,
      symbol: void 0,
      locals: createSymbolTable(),
      flags: NodeFlags.Synthetic,
      modifiers: [],
      modifierFlags: ModifierFlags.None
    };
    return nsNode;
  }
  function bindAndResolveNode(node) {
    if (visitedNode.has(node)) {
      return;
    }
    visitedNode.add(node);
    if ("id" in node && node.kind !== SyntaxKind.MemberExpression && node.id) {
      bindDeclarationIdentifier(node);
    }
    switch (node.kind) {
      case SyntaxKind.TypeReference:
        resolveTypeReference(node);
        break;
      case SyntaxKind.ModelStatement:
      case SyntaxKind.ModelDeclarationExpression:
      case SyntaxKind.ModelExpression:
      case SyntaxKind.InterfaceStatement:
      case SyntaxKind.EnumStatement:
      case SyntaxKind.EnumDeclarationExpression:
      case SyntaxKind.ScalarStatement:
      case SyntaxKind.ScalarDeclarationExpression:
      case SyntaxKind.UnionStatement:
      case SyntaxKind.UnionDeclarationExpression:
      case SyntaxKind.IntersectionExpression:
        bindMemberContainer(node);
        break;
      case SyntaxKind.OperationStatement:
        bindOperationStatementParameters(node);
        break;
      case SyntaxKind.AliasStatement:
        resolveAlias(node);
        break;
      case SyntaxKind.TemplateParameterDeclaration:
        bindTemplateParameter(node);
        break;
      case SyntaxKind.DecoratorExpression:
        resolveDecoratorTarget(node);
        break;
      case SyntaxKind.AugmentDecoratorStatement:
        resolveAugmentDecorator(node);
        break;
      case SyntaxKind.CallExpression:
        resolveTypeReference(node.target);
        break;
    }
    visitChildren(node, bindAndResolveNode);
  }
  function resolveDecoratorTarget(decorator) {
    resolveTypeReference(decorator.target, { resolveDecorators: true });
  }
  function createMetaTypePrototypes() {
    const nodeInterfaces = /* @__PURE__ */ new Map();
    const modelPropertyPrototype = /* @__PURE__ */ new Map();
    modelPropertyPrototype.set("type", (baseSym) => {
      const node = getSymNode(baseSym);
      compilerAssert(node, "Expected model property symbol to have a node");
      return resolveExpression2(node.value);
    });
    nodeInterfaces.set(SyntaxKind.ModelProperty, modelPropertyPrototype);
    const operationPrototype = /* @__PURE__ */ new Map();
    operationPrototype.set("parameters", (baseSym) => {
      const sym = getAugmentedSymbolTable(baseSym.metatypeMembers)?.get("parameters");
      return sym === void 0 ? failedResult(ResolutionResultFlags.ResolutionFailed) : resolvedResult(sym);
    });
    operationPrototype.set("returnType", (baseSym) => {
      let node = baseSym.declarations[0];
      while (node.signature.kind === SyntaxKind.OperationSignatureReference) {
        const baseResult = resolveTypeReference(node.signature.baseOperation);
        if (baseResult.resolutionResult & ResolutionResultFlags.Resolved) {
          node = baseResult.resolvedSymbol.declarations[0];
        } else {
          return baseResult;
        }
      }
      return resolveExpression2(node.signature.returnType);
    });
    nodeInterfaces.set(SyntaxKind.OperationStatement, operationPrototype);
    return nodeInterfaces;
  }
  function resolveAugmentDecorator(decNode) {
    resolveTypeReference(decNode.target, { resolveDecorators: true });
    const targetResult = resolveTypeReference(decNode.targetType);
    if (targetResult.resolvedSymbol && !targetResult.isTemplateInstantiation) {
      let list = augmentDecoratorsForSym.get(targetResult.resolvedSymbol);
      if (list === void 0) {
        list = [];
        augmentDecoratorsForSym.set(targetResult.resolvedSymbol, list);
      }
      list.unshift(decNode);
    }
  }
}

// node_modules/@typespec/compiler/dist/src/core/state-accessors.js
init_define_process_env();
var StateMapView = class {
  map;
  constructor(map) {
    this.map = map;
  }
  /** Check if the given type has state */
  has(t) {
    return this.map.has(t) ?? false;
  }
  set(t, v) {
    this.map.set(t, v);
    return this;
  }
  get(t) {
    return this.map.get(t);
  }
  delete(t) {
    return this.map.delete(t);
  }
  /**
   * Danger: Iterating over all types in the state map is not recommended.
   * This occur unexpected result when types are dynamically created, cloned, or removed.
   */
  forEach(cb, thisArg) {
    this.map.forEach(cb, thisArg);
    return this;
  }
  /**
   * Danger: Iterating over all types in the state map is not recommended.
   * This occur unexpected result when types are dynamically created, cloned, or removed.
   */
  get size() {
    return this.map.size;
  }
  clear() {
    return this.map.clear();
  }
  /**
   * Danger: Iterating over all types in the state map is not recommended.
   * This occur unexpected result when types are dynamically created, cloned, or removed.
   */
  entries() {
    return this.map.entries();
  }
  /**
   * Danger: Iterating over all types in the state map is not recommended.
   * This occur unexpected result when types are dynamically created, cloned, or removed.
   */
  values() {
    return this.map.values();
  }
  /**
   * Danger: Iterating over all types in the state map is not recommended.
   * This occur unexpected result when types are dynamically created, cloned, or removed.
   */
  keys() {
    return this.map.keys();
  }
  /**
   * Danger: Iterating over all types in the state map is not recommended.
   * This occur unexpected result when types are dynamically created, cloned, or removed.
   */
  [Symbol.iterator]() {
    return this.entries();
  }
  [Symbol.toStringTag] = "StateMap";
};
var StateSetView = class {
  set;
  constructor(set) {
    this.set = set;
  }
  has(t) {
    return this.set.has(t) ?? false;
  }
  add(t) {
    this.set.add(t);
    return this;
  }
  delete(t) {
    return this.set.delete(t);
  }
  /**
   * Danger: Iterating over all types in the state map is not recommended.
   * This occur unexpected result when types are dynamically created, cloned, or removed.
   */
  forEach(cb, thisArg) {
    this.set.forEach(cb, thisArg);
    return this;
  }
  get size() {
    return this.set.size;
  }
  clear() {
    return this.set.clear();
  }
  /**
   * Danger: Iterating over all types in the state map is not recommended.
   * This occur unexpected result when types are dynamically created, cloned, or removed.
   */
  values() {
    return this.set.values();
  }
  /**
   * Danger: Iterating over all types in the state map is not recommended.
   * This occur unexpected result when types are dynamically created, cloned, or removed.
   */
  keys() {
    return this.set.keys();
  }
  /**
   * Danger: Iterating over all types in the state map is not recommended.
   * This occur unexpected result when types are dynamically created, cloned, or removed.
   */
  entries() {
    return this.set.entries();
  }
  /**
   * Danger: Iterating over all types in the state map is not recommended.
   * This occur unexpected result when types are dynamically created, cloned, or removed.
   */
  [Symbol.iterator]() {
    return this.values();
  }
  [Symbol.toStringTag] = "StateSet";
};
function createStateAccessors(stateMaps, stateSets) {
  function stateMap(key) {
    let m = stateMaps.get(key);
    if (!m) {
      m = /* @__PURE__ */ new Map();
      stateMaps.set(key, m);
    }
    return new StateMapView(m);
  }
  function stateSet(key) {
    let s = stateSets.get(key);
    if (!s) {
      s = /* @__PURE__ */ new Set();
      stateSets.set(key, s);
    }
    return new StateSetView(s);
  }
  return { stateMap, stateSet };
}

// node_modules/@typespec/compiler/dist/src/core/program.js
async function compile(host, mainFile, options = {}, oldProgram) {
  const logger = createLogger({ sink: host.logSink });
  const { program, shouldAbort } = await logger.trackAction("Compiling...", "Compiling", async (task) => {
    const result = await createProgram(host, mainFile, options, oldProgram);
    if (result.program.hasError()) {
      task.fail();
    } else if (result.program.diagnostics.length > 0) {
      task.warn();
    }
    return result;
  });
  if (shouldAbort) {
    return program;
  }
  const emitStats = {
    total: 0,
    emitters: {}
  };
  const timer = perf.startTimer();
  program.setCurrentStage("emitting");
  for (const emitter of program.emitters) {
    if (program.compilerOptions.dryRun && !emitter.library.definition?.capabilities?.dryRun) {
      continue;
    }
    const emitterStats = await emit(emitter, program);
    emitStats.emitters[emitter.metadata.name ?? "<unnamed>"] = emitterStats;
    if (options.listFiles) {
      logEmittedFilesPath(program);
    }
  }
  emitStats.total = timer.end();
  program.stats.runtime.emit = emitStats;
  return program;
}
async function createProgram(host, mainFile, options = {}, oldProgram) {
  const runtimeStats = {};
  const validateCbs = [];
  const typeInfoProviders = [];
  const stateMaps = /* @__PURE__ */ new Map();
  const stateSets = /* @__PURE__ */ new Map();
  const diagnostics = [];
  const duplicateSymbols = /* @__PURE__ */ new Set();
  const emitters = [];
  const requireImports = /* @__PURE__ */ new Map();
  const complexityStats = {};
  let sourceResolution = void 0;
  let error = false;
  let continueToNextStage = true;
  let suppressionTracker;
  let diagnosticCodeResolver;
  let currentStage = "parsing";
  const logger = createLogger({ sink: host.logSink });
  const tracer = createTracer(logger, { filter: options.trace });
  const resolvedMain = await resolveTypeSpecEntrypoint(host, mainFile, reportDiagnostic);
  const program = {
    checker: void 0,
    resolver: void 0,
    compilerOptions: resolveOptions(options),
    sourceFiles: /* @__PURE__ */ new Map(),
    jsSourceFiles: /* @__PURE__ */ new Map(),
    literalTypes: /* @__PURE__ */ new Map(),
    host,
    diagnostics,
    emitters,
    loadTypeSpecScript,
    getOption,
    stateMaps,
    stateSets,
    stats: {
      complexity: complexityStats,
      runtime: runtimeStats
    },
    tracer,
    trace,
    ...createStateAccessors(stateMaps, stateSets),
    reportDiagnostic,
    reportDiagnostics,
    reportDuplicateSymbols,
    get suppressionTracker() {
      return suppressionTracker;
    },
    get diagnosticCodeResolver() {
      return diagnosticCodeResolver;
    },
    get currentStage() {
      return currentStage;
    },
    setCurrentStage(stage) {
      currentStage = stage;
    },
    hasError() {
      return error;
    },
    onValidate(cb, metadata) {
      validateCbs.push({ callback: cb, metadata });
    },
    registerTypeInfoProvider(provider, metadata) {
      typeInfoProviders.push({ callback: provider, metadata });
    },
    getTypeInfo(target) {
      if (typeInfoProviders.length === 0) {
        return void 0;
      }
      const contents = [];
      const context = { program, target };
      for (const provider of typeInfoProviders) {
        let result;
        try {
          result = provider.callback(context);
        } catch (error2) {
          if (options.designTimeBuild) {
            trace("info-provider.crash", `Library "${provider.metadata.name ?? "<unnamed>"}" $provideTypeInfo crashed: ${error2.stack}`);
            continue;
          } else {
            throw new ExternalError({ kind: "info", metadata: provider.metadata, error: error2 });
          }
        }
        if (result) {
          contents.push(result.content);
        }
      }
      return contents.length > 0 ? { content: contents.join("\n\n") } : void 0;
    },
    getGlobalNamespaceType,
    resolveTypeReference,
    /** @internal */
    resolveTypeOrValueReference,
    getSourceFileLocationContext,
    projectRoot: getDirectoryPath(options.config ?? resolvedMain ?? "")
  };
  trace("compiler.options", JSON.stringify(options, null, 2));
  function trace(area, message) {
    tracer.trace(area, message);
  }
  const binder = createBinder(program);
  if (resolvedMain === void 0) {
    return { program, shouldAbort: true };
  }
  const basedir = getDirectoryPath(resolvedMain) || "/";
  await checkForCompilerVersionMismatch(basedir);
  runtimeStats.loader = await perf.timeAsync(() => loadSources(resolvedMain));
  const emit2 = options.noEmit ? [] : options.emit ?? [];
  const emitterOptions = options.options;
  await loadEmitters(basedir, emit2, emitterOptions ?? {});
  if (oldProgram && mapEquals(oldProgram.sourceFiles, program.sourceFiles) && deepEquals(oldProgram.compilerOptions, program.compilerOptions)) {
    return { program: oldProgram, shouldAbort: true };
  }
  oldProgram = void 0;
  diagnosticCodeResolver = createDiagnosticCodeResolver(collectLibraryNameInfos());
  suppressionTracker = createSuppressionTracker(sourceResolution, diagnosticCodeResolver);
  reportDiagnostics(findDuplicateSuppressions(sourceResolution).map(({ directive }) => createDiagnostic({
    code: "duplicate-suppression",
    format: { code: directive.code },
    target: directive.node
  })));
  reportDiagnostics(findAmbiguousSuppressions(sourceResolution, diagnosticCodeResolver).map(({ directive, shortName, candidates }) => createDiagnostic({
    code: "ambiguous-short-name",
    format: { shortName, candidates: formatShortNameCandidates(candidates) },
    target: directive.node
  })));
  const resolver = program.resolver = createResolver(program);
  runtimeStats.resolver = perf.time(() => resolver.resolveProgram());
  const linter = createLinter(program, (name) => loadLibrary(basedir, name), diagnosticCodeResolver);
  linter.registerLinterLibrary(builtInLinterLibraryName, createBuiltInLinterLibrary());
  if (options.linterRuleSet) {
    program.reportDiagnostics(await linter.extendRuleSet(options.linterRuleSet, {
      baseDir: program.projectRoot,
      source: options.configFile?.file ? { script: options.configFile.file, path: ["linter"] } : void 0
    }));
  }
  program.checker = createChecker(program, resolver);
  currentStage = "checking";
  runtimeStats.checker = perf.time(() => program.checker.checkProgram());
  complexityStats.createdTypes = program.checker.stats.createdTypes;
  complexityStats.finishedTypes = program.checker.stats.finishedTypes;
  if (!continueToNextStage) {
    return { program, shouldAbort: true };
  }
  currentStage = "validating";
  await runValidators();
  validateRequiredImports();
  await validateLoadedLibraries();
  if (!continueToNextStage) {
    return { program, shouldAbort: true };
  }
  currentStage = "linting";
  const lintResult = await linter.lint();
  runtimeStats.linter = lintResult.stats.runtime;
  program.reportDiagnostics(lintResult.diagnostics);
  return { program, shouldAbort: false };
  async function validateLoadedLibraries() {
    const loadedRoots = /* @__PURE__ */ new Set();
    for (const fileUrl of getLibraryUrlsLoaded()) {
      if (fileUrl.startsWith("file:")) {
        const root = await findProjectRoot(host.stat, host.fileURLToPath(fileUrl));
        if (root) {
          loadedRoots.add(root);
        }
      }
    }
    const libraries = new Map([...sourceResolution.loadedLibraries.entries()]);
    const incompatibleLibraries = /* @__PURE__ */ new Map();
    for (const root of loadedRoots) {
      const packageJsonPath = joinPaths(root, "package.json");
      try {
        const packageJson = JSON.parse((await host.readFile(packageJsonPath)).text);
        if (packageJson.name) {
          const found = libraries.get(packageJson.name);
          if (found && found.path !== root && found.manifest.version !== packageJson.version) {
            let incompatibleIndex = incompatibleLibraries.get(packageJson.name);
            if (incompatibleIndex === void 0) {
              incompatibleIndex = [found];
              incompatibleLibraries.set(packageJson.name, incompatibleIndex);
            }
            incompatibleIndex.push({ path: root, manifest: packageJson });
          }
        }
      } catch {
      }
    }
    for (const [name, incompatibleLibs] of incompatibleLibraries) {
      reportDiagnostic(createDiagnostic({
        code: "incompatible-library",
        format: {
          name,
          versionMap: incompatibleLibs.map((x) => `  - Version: "${x.manifest.version}" installed at "${x.path}"`).join("\n")
        },
        target: NoTarget
      }));
    }
  }
  async function loadSources(entrypoint) {
    const sourceLoader = await createSourceLoader(host, {
      parseOptions: options.parseOptions,
      tracer,
      getCachedScript: (file) => oldProgram?.sourceFiles.get(file.path) ?? host.parseCache?.get(file)
    });
    await loadIntrinsicTypes(sourceLoader);
    if (!options?.nostdlib) {
      await loadStandardLibrary(sourceLoader);
    }
    await sourceLoader.importFile(entrypoint, NoTarget, { type: "project" }, "entrypoint");
    for (const additionalImport of options?.additionalImports ?? []) {
      await sourceLoader.importPath(additionalImport, NoTarget, getDirectoryPath(entrypoint), {
        type: "project"
      });
    }
    sourceResolution = sourceLoader.resolution;
    program.sourceFiles = sourceResolution.sourceFiles;
    program.jsSourceFiles = sourceResolution.jsSourceFiles;
    for (const file of sourceResolution.sourceFiles.values()) {
      binder.bindSourceFile(file);
    }
    for (const jsFile of sourceResolution.jsSourceFiles.values()) {
      binder.bindJsSourceFile(jsFile);
    }
    program.reportDiagnostics(sourceResolution.diagnostics);
  }
  async function loadIntrinsicTypes(loader) {
    const locationContext = { type: "compiler" };
    return loader.importFile(resolvePath(host.getExecutionRoot(), "lib/intrinsics.tsp"), NoTarget, locationContext);
  }
  async function loadStandardLibrary(loader) {
    const locationContext = { type: "compiler" };
    for (const dir of host.getLibDirs()) {
      await loader.importFile(resolvePath(dir, "main.tsp"), NoTarget, locationContext);
    }
  }
  async function loadTypeSpecScript(file) {
    if (program.sourceFiles.has(file.path)) {
      throw new RangeError("Duplicate script path: " + file.path);
    }
    const script = parseOrReuse(file);
    program.reportDiagnostics(script.parseDiagnostics);
    program.sourceFiles.set(file.path, script);
    binder.bindSourceFile(script);
    return script;
  }
  function parseOrReuse(file) {
    const old = oldProgram?.sourceFiles.get(file.path) ?? host?.parseCache?.get(file);
    if (old?.file === file && deepEquals(old.parseOptions, options.parseOptions)) {
      return old;
    }
    const script = parse(file, options.parseOptions);
    host.parseCache?.set(file, script);
    return script;
  }
  function getSourceFileLocationContext(sourcefile) {
    const locationContext = sourceResolution.locationContexts.get(sourcefile);
    compilerAssert(locationContext, "SourceFile should have a declaration locationContext.");
    return locationContext;
  }
  async function loadEmitters(basedir2, emitterNameOrPaths, emitterOptions2) {
    for (const emitterNameOrPath of emitterNameOrPaths) {
      const emitter = await loadEmitter(basedir2, emitterNameOrPath, emitterOptions2);
      if (emitter) {
        emitters.push(emitter);
      }
    }
  }
  async function resolveEmitterModuleAndEntrypoint(basedir2, specifier) {
    const locationContext = { type: "project" };
    const [module, diagnostics2] = await resolveJSLibrary(specifier, basedir2, locationContext);
    if (!module) {
      return [void 0, diagnostics2];
    }
    const entrypoint = module.type === "file" ? module.path : module.mainFile;
    const [file, jsDiagnostics] = await loadJsFile(host, entrypoint, NoTarget);
    return [file && { module, entrypoint: file }, jsDiagnostics];
  }
  async function loadLibrary(basedir2, libraryNameOrPath, context) {
    const [resolution, diagnostics2] = await resolveEmitterModuleAndEntrypoint(basedir2, libraryNameOrPath);
    if (resolution === void 0) {
      if (context?.isEmitter && diagnostics2.some((d) => d.code === "import-not-found")) {
        program.reportDiagnostic(createDiagnostic({
          code: "emitter-not-found",
          format: { emitterPackage: libraryNameOrPath },
          target: NoTarget
        }));
      } else {
        program.reportDiagnostics(diagnostics2);
      }
      return void 0;
    }
    const { module, entrypoint } = resolution;
    const libDefinition = entrypoint?.esmExports.$lib;
    const metadata = computeLibraryMetadata(module, libDefinition);
    const linterDef = entrypoint?.esmExports.$linter;
    return {
      ...resolution,
      metadata,
      definition: libDefinition,
      linter: linterDef && resolveLinterDefinition(libraryNameOrPath, linterDef)
    };
  }
  async function loadEmitter(basedir2, emitterNameOrPath, emittersOptions) {
    const library = await loadLibrary(basedir2, emitterNameOrPath, { isEmitter: true });
    if (library === void 0) {
      return void 0;
    }
    const { entrypoint, metadata } = library;
    const emitFunction = entrypoint.esmExports.$onEmit;
    const libDefinition = library.definition;
    let { "emitter-output-dir": emitterOutputDir, ...emitterOptions2 } = emittersOptions[metadata.name ?? emitterNameOrPath] ?? {};
    if (emitterOutputDir === void 0) {
      emitterOutputDir = [options.outputDir, metadata.name].filter(isDefined).join("/");
    }
    if (libDefinition?.requireImports) {
      for (const lib of libDefinition.requireImports) {
        requireImports.set(lib, libDefinition.name);
      }
    }
    if (emitFunction !== void 0) {
      if (libDefinition?.emitter?.options) {
        const diagnostics2 = libDefinition?.emitterOptionValidator?.validate(emitterOptions2, options.configFile?.file ? {
          kind: "path-target",
          path: ["options", emitterNameOrPath],
          script: options.configFile.file
        } : NoTarget);
        if (diagnostics2 && diagnostics2.length > 0) {
          program.reportDiagnostics(diagnostics2);
          return;
        }
      }
      return {
        main: entrypoint.file.path,
        emitFunction,
        metadata,
        emitterOutputDir,
        options: emitterOptions2,
        library
      };
    } else {
      program.trace("emitter.load.invalid-emitter", `Emitter does not have an emit function. Available exported symbols are ${Object.keys(entrypoint.esmExports).join(", ")}`);
      program.reportDiagnostic(createDiagnostic({
        code: "invalid-emitter",
        format: {
          emitterPackage: emitterNameOrPath
        },
        target: NoTarget
      }));
      return void 0;
    }
  }
  function collectLibraryNameInfos() {
    const aliasByName = /* @__PURE__ */ new Map();
    for (const jsFile of sourceResolution.jsSourceFiles.values()) {
      const lib = jsFile.esmExports?.$lib;
      if (lib?.name && lib.alias) {
        aliasByName.set(lib.name, lib.alias);
      }
    }
    const infos = [];
    const seen = /* @__PURE__ */ new Set();
    for (const name of sourceResolution.loadedLibraries.keys()) {
      seen.add(name);
      infos.push({ name, alias: aliasByName.get(name) });
    }
    if (!seen.has(builtInLinterLibraryName)) {
      infos.push({ name: builtInLinterLibraryName });
    }
    return infos;
  }
  function computeLibraryMetadata(module, libDefinition) {
    if (module.type === "file") {
      return {
        type: "file",
        name: libDefinition?.name
      };
    }
    return computeModuleMetadata(module);
  }
  function computeModuleMetadata(module) {
    const metadata = {
      type: "module",
      name: module.manifest.name
    };
    if (module.manifest.homepage) {
      metadata.homepage = module.manifest.homepage;
    }
    if (module.manifest.bugs?.url) {
      metadata.bugs = { url: module.manifest.bugs?.url };
    }
    if (module.manifest.version) {
      metadata.version = module.manifest.version;
    }
    return metadata;
  }
  async function runValidators() {
    const start = perf.startTimer();
    runtimeStats.validation = { total: 0, validators: {} };
    runCompilerValidators();
    runtimeStats.validation.validators.compiler = start.end();
    for (const validator of validateCbs) {
      const start2 = perf.startTimer();
      const diagnostics2 = await runValidator(validator);
      if (diagnostics2 && Array.isArray(diagnostics2)) {
        program.reportDiagnostics(diagnostics2);
      }
      runtimeStats.validation.validators[validator.metadata.name ?? "<unnamed>"] = start2.end();
    }
    runtimeStats.validation.total = start.end();
  }
  async function runValidator(validator) {
    try {
      return await validator.callback(program);
    } catch (error2) {
      if (options.designTimeBuild) {
        program.reportDiagnostic(createDiagnostic({
          code: "on-validate-fail",
          format: { error: error2.stack },
          target: NoTarget
        }));
      } else {
        throw new ExternalError({ kind: "validator", metadata: validator.metadata, error: error2 });
      }
    }
  }
  function runCompilerValidators() {
    validateEncodedNamesConflicts(program);
    validatePagingOperations(program);
  }
  function validateRequiredImports() {
    for (const [requiredImport, emitterName] of requireImports) {
      if (!sourceResolution.loadedLibraries.has(requiredImport)) {
        program.reportDiagnostic(createDiagnostic({
          code: "missing-import",
          format: { requiredImport, emitterName },
          target: NoTarget
        }));
      }
    }
  }
  async function resolveJSLibrary(specifier, baseDir, locationContext) {
    try {
      return [
        await resolveModule(createResolveModuleHost(host), specifier, {
          baseDir,
          conditions: ["import"]
        }),
        []
      ];
    } catch (e) {
      if (e instanceof ResolveModuleError) {
        return [void 0, [moduleResolutionErrorToDiagnostic(e, specifier, NoTarget)]];
      } else {
        throw e;
      }
    }
  }
  async function checkForCompilerVersionMismatch(baseDir) {
    let actual;
    try {
      const resolved = await resolveModule({
        realpath: host.realpath,
        stat: host.stat,
        readFile: async (path) => {
          const file = await host.readFile(path);
          return file.text;
        }
      }, "@typespec/compiler", { baseDir });
      compilerAssert(resolved.type === "module", `Expected to have resolved "@typespec/compiler" to a node module.`);
      actual = resolved;
    } catch (err) {
      if (err.code === "MODULE_NOT_FOUND" || err.code === "INVALID_MAIN") {
        return true;
      }
      throw err;
    }
    const expected = host.getExecutionRoot();
    if (actual.path !== expected && MANIFEST.version !== actual.manifest.version) {
      const betterTypeSpecServerPath = actual.path;
      program.reportDiagnostic(createDiagnostic({
        code: "compiler-version-mismatch",
        format: { basedir: baseDir, betterTypeSpecServerPath, actual: actual.path, expected },
        target: NoTarget
      }));
      return false;
    }
    return true;
  }
  function getOption(key) {
    return (options.miscOptions || {})[key];
  }
  function reportDiagnostic(diagnostic) {
    if (shouldSuppress(diagnostic)) {
      return;
    }
    if (diagnostic.severity === "error") {
      continueToNextStage = false;
    }
    if (diagnostic.severity === "warning" && diagnostic.target !== NoTarget) {
      mutate(diagnostic).codefixes ??= [];
      mutate(diagnostic.codefixes).push(createSuppressCodeFix(diagnostic.target, diagnostic.code));
    }
    if (options.warningAsError && diagnostic.severity === "warning") {
      diagnostic = { ...diagnostic, severity: "error" };
    }
    if (diagnostic.severity === "error") {
      error = true;
    }
    diagnostics.push(diagnostic);
  }
  function reportDiagnostics(newDiagnostics) {
    for (const diagnostic of newDiagnostics) {
      reportDiagnostic(diagnostic);
    }
  }
  function shouldSuppress(diagnostic) {
    const { target } = diagnostic;
    if (diagnostic.code === "error") {
      diagnostics.push(diagnostic);
      return false;
    }
    if (target === NoTarget || target === void 0) {
      return false;
    }
    if ("file" in target) {
      return false;
    }
    const node = getNode(target);
    if (node === void 0) {
      return false;
    }
    const suppressing = findDirectiveSuppressingOnNode(diagnostic.code, node, diagnosticCodeResolver);
    if (suppressing) {
      if (diagnostic.severity === "error") {
        suppressionTracker?.markUsed(suppressing.node);
        diagnostics.push({
          severity: "error",
          code: "suppress-error",
          message: "Errors cannot be suppressed.",
          target: suppressing.node
        });
        return false;
      } else {
        suppressionTracker?.markUsed(suppressing.node);
        return true;
      }
    }
    return false;
  }
  function getNode(target) {
    if (!("kind" in target) && !("valueKind" in target) && !("entityKind" in target)) {
      if (!("declarations" in target)) {
        return target.node;
      }
      if (target.flags & SymbolFlags.Using) {
        return target.symbolSource.declarations[0];
      }
      return target.declarations[0];
    } else if ("kind" in target && typeof target.kind === "number") {
      return target;
    } else {
      return target.node;
    }
  }
  function reportDuplicateSymbols(symbols) {
    if (!symbols) {
      return;
    }
    for (const set of symbols.duplicates.values()) {
      for (const symbol of set) {
        if (!duplicateSymbols.has(symbol)) {
          duplicateSymbols.add(symbol);
          const name = symbol.flags & SymbolFlags.Using ? symbol.symbolSource.name : symbol.name;
          reportDiagnostic(createDiagnostic({
            code: "duplicate-symbol",
            format: { name },
            target: symbol
          }));
        }
      }
    }
  }
  function getGlobalNamespaceType() {
    return program.checker.getGlobalNamespaceType();
  }
  function resolveTypeReference(reference) {
    const [node, parseDiagnostics] = parseStandaloneTypeReference(reference);
    if (parseDiagnostics.length > 0) {
      return [void 0, parseDiagnostics];
    }
    const binder2 = createBinder(program);
    binder2.bindNode(node);
    mutate(node).parent = resolver.symbols.global.declarations[0];
    resolver.resolveTypeReference(node);
    return program.checker.resolveTypeReference(node);
  }
  function resolveTypeOrValueReference(reference) {
    const [node, parseDiagnostics] = parseStandaloneTypeReference(reference);
    if (parseDiagnostics.length > 0) {
      return [void 0, parseDiagnostics];
    }
    const binder2 = createBinder(program);
    binder2.bindNode(node);
    mutate(node).parent = resolver.symbols.global.declarations[0];
    resolver.resolveTypeReference(node);
    return program.checker.resolveTypeOrValueReference(node);
  }
}
function resolveOptions(options) {
  return { ...options };
}
async function emit(emitter, program) {
  const emitterName = emitter.metadata.name ?? "";
  const relativePathForEmittedFiles = transformPathForSink(program.host.logSink, emitter.emitterOutputDir) + "/";
  const errorCount = program.diagnostics.filter((x) => x.severity === "error").length;
  const warnCount = program.diagnostics.filter((x) => x.severity === "warning").length;
  const logger = createLogger({ sink: program.host.logSink });
  return await logger.trackAction(`Running ${emitterName}...`, "", async (task) => {
    const start = perf.startTimer();
    const emitterPerfReporter = await runEmitter(emitter, program);
    const duration = start.end();
    const message = `${emitterName} ${import_picocolors.default.green(`${Math.round(duration)}ms`)} ${import_picocolors.default.dim(relativePathForEmittedFiles)}`;
    const newErrorCount = program.diagnostics.filter((x) => x.severity === "error").length;
    const newWarnCount = program.diagnostics.filter((x) => x.severity === "warning").length;
    if (newErrorCount > errorCount) {
      task.fail(message);
    } else if (newWarnCount > warnCount) {
      task.warn(message);
    } else {
      task.succeed(message);
    }
    return { total: duration, steps: emitterPerfReporter.measures };
  });
}
async function runEmitter(emitter, program) {
  const perfReporter = createPerfReporter();
  const context = {
    program,
    emitterOutputDir: emitter.emitterOutputDir,
    options: emitter.options,
    perf: perfReporter
  };
  try {
    await emitter.emitFunction(context);
    return perfReporter;
  } catch (error) {
    throw new ExternalError({ kind: "emitter", metadata: emitter.metadata, error });
  }
}
function logEmittedFilesPath(program) {
  getEmittedFilesForProgram(program).forEach((filePath) => {
    console.log(`    ${import_picocolors.default.dim(transformPathForSink(program.host.logSink, filePath))}`);
  });
}
function transformPathForSink(logSink, path) {
  return logSink.getPath ? logSink.getPath(path) : path;
}

// node_modules/@typespec/compiler/dist/src/core/visibility/index.js
init_define_process_env();

// node_modules/@typespec/compiler/dist/src/index.js
var $decorators3 = {
  TypeSpec: {
    ...$decorators2.TypeSpec
  },
  "TypeSpec.Prototypes": {
    ...$decorators["TypeSpec.Prototypes"]
  }
};
var $functions2 = {
  TypeSpec: {
    ...$functions.TypeSpec
  }
};

// virtual:virtual:entry.js
var TypeSpecJSSources = {
  "dist/src/index.js": src_exports,
  "dist/src/lib/intrinsic/tsp-index.js": tsp_index_exports,
  "dist/src/lib/tsp-index.js": tsp_index_exports2
};
var TypeSpecSources = {
  "package.json": '{"name":"@typespec/compiler","version":"1.17.0","description":"TypeSpec compiler and standard library","author":"Microsoft Corporation","license":"MIT","homepage":"https://typespec.io","readme":"https://github.com/microsoft/typespec/blob/main/README.md","repository":{"type":"git","url":"git+https://github.com/microsoft/typespec.git"},"bugs":{"url":"https://github.com/microsoft/typespec/issues"},"keywords":["typespec","cli"],"type":"module","main":"dist/src/index.js","tspMain":"lib/std/main.tsp","exports":{".":{"typespec":"./lib/std/main.tsp","types":"./dist/src/index.d.ts","default":"./dist/src/index.js"},"./utils":{"types":"./dist/src/utils/index.d.ts","default":"./dist/src/utils/index.js"},"./testing":{"types":"./dist/src/testing/index.d.ts","default":"./dist/src/testing/index.js"},"./module-resolver":{"types":"./dist/module-resolver/index.d.ts","default":"./dist/src/module-resolver/index.js"},"./ast":{"import":"./dist/src/ast/index.js"},"./typekit":{"types":"./dist/src/typekit/index.d.ts","default":"./dist/src/typekit/index.js"},"./experimental":{"types":"./dist/src/experimental/index.d.ts","default":"./dist/src/experimental/index.js"},"./experimental/typekit":{"types":"./dist/src/experimental/typekit/index.d.ts","default":"./dist/src/experimental/typekit/index.js"},"./internals":{"types":"./dist/src/internals/index.d.ts","import":"./dist/src/internals/index.js"},"./internals/prettier-formatter":{"import":"./dist/src/internals/prettier-formatter.js"},"./internals/standalone":{"import":"./dist/src/internals/standalone.js"},"./casing":{"import":"./dist/src/casing/index.js"},"./package.json":"./package.json"},"browser":{"./dist/src/core/node-host.js":"./dist/src/core/node-host.browser.js","./dist/src/core/logger/console-sink.js":"./dist/src/core/logger/console-sink.browser.js"},"engines":{"node":">=22.0.0"},"bin":{"tsp":"cmd/tsp.js","tsp-server":"cmd/tsp-server.js"},"files":["lib/**/*.tsp","dist/**","templates/**","entrypoints","!dist/test/**"],"dependencies":{"@babel/code-frame":"^8.0.0","@inquirer/checkbox":"^5.2.2","@inquirer/confirm":"^6.2.0","@inquirer/input":"^5.1.3","@inquirer/select":"^5.2.2","ajv":"^8.20.0","change-case":"^5.4.4","env-paths":"^4.0.0","is-unicode-supported":"^2.1.0","mustache":"^4.2.0","picocolors":"^1.1.1","prettier":"^3.9.6","semver":"^7.8.5","tar":"^7.5.22","temporal-polyfill":"^1.0.4","vscode-languageserver":"^10.1.0","vscode-languageserver-textdocument":"^1.0.13","yaml":"^2.9.0","yargs":"^18.1.0"},"devDependencies":{"@types/babel__code-frame":"^7.27.0","@types/mustache":"^4.2.6","@types/node":"^26.3.0","@types/semver":"^7.8.0","@types/yargs":"^17.0.35","@vitest/coverage-v8":"^5.0.0","@vitest/ui":"^5.0.0","pathe":"^2.0.3","rimraf":"^6.1.3","typescript":"npm:@typescript/typescript6@~6.0.2","vitest":"^5.0.0","vscode-oniguruma":"^2.0.1","vscode-textmate":"^9.3.2","@typespec/internal-build-utils":"^0.87.0","tmlanguage-generator":"^0.6.8"},"scripts":{"clean":"rimraf ./dist ./temp","build:init-templates-index":"node ./.scripts/build-init-templates.ts","build":"pnpm gen-manifest && pnpm build:init-templates-index && pnpm compile && pnpm generate-tmlanguage","api-extractor":"api-extractor run --local --verbose","compile":"tsc -p tsconfig.build.json","watch":"tsc -p tsconfig.build.json --watch","watch-tmlanguage":"node scripts/watch-tmlanguage.ts","generate-tmlanguage":"node scripts/generate-tmlanguage.ts","gen-extern-signature":"node ./.scripts/gen-extern-signature.ts","dogfood":"node scripts/dogfood.ts","test":"vitest run","test:ui":"vitest --ui","test:watch":"vitest -w","test:ci":"vitest run --coverage --reporter=junit --reporter=default","test:e2e":"vitest run --config ./vitest.config.e2e.ts","gen-manifest":"node scripts/generate-manifest.ts","regen-nonascii":"node scripts/regen-nonascii.ts","fuzz":"node dist/test/manual/fuzz.js run","lint":"oxlint . --deny-warnings","lint:fix":"oxlint . --fix"}}',
  "lib/intrinsics.tsp": 'import "../dist/src/lib/intrinsic/tsp-index.js";\nimport "./prototypes.tsp";\n\n// This file contains all the intrinsic types of typespec. Everything here will always be loaded\nnamespace TypeSpec;\n\n/**\n * Represent a byte array\n */\nscalar bytes;\n\n/**\n * A numeric type\n */\nscalar numeric;\n\n/**\n * A whole number. This represent any `integer` value possible.\n * It is commonly represented as `BigInteger` in some languages.\n */\nscalar integer extends numeric;\n\n/**\n * A number with decimal value\n */\nscalar float extends numeric;\n\n/**\n * A 64-bit integer. (`-9,223,372,036,854,775,808` to `9,223,372,036,854,775,807`)\n */\nscalar int64 extends integer;\n\n/**\n * A 32-bit integer. (`-2,147,483,648` to `2,147,483,647`)\n */\nscalar int32 extends int64;\n\n/**\n * A 16-bit integer. (`-32,768` to `32,767`)\n */\nscalar int16 extends int32;\n\n/**\n * A 8-bit integer. (`-128` to `127`)\n */\nscalar int8 extends int16;\n\n/**\n * A 64-bit unsigned integer (`0` to `18,446,744,073,709,551,615`)\n */\nscalar uint64 extends integer;\n\n/**\n * A 32-bit unsigned integer (`0` to `4,294,967,295`)\n */\nscalar uint32 extends uint64;\n\n/**\n * A 16-bit unsigned integer (`0` to `65,535`)\n */\nscalar uint16 extends uint32;\n\n/**\n * A 8-bit unsigned integer (`0` to `255`)\n */\nscalar uint8 extends uint16;\n\n/**\n * An integer that can be serialized to JSON (`\u22129007199254740991 (\u2212(2^53 \u2212 1))` to `9007199254740991 (2^53 \u2212 1)` )\n */\nscalar safeint extends int64;\n\n/**\n * A 64 bit floating point number. (`\xB15.0 \xD7 10^\u2212324` to `\xB11.7 \xD7 10^308`)\n */\nscalar float64 extends float;\n\n/**\n * A 32 bit floating point number. (`\xB11.5 x 10^\u221245` to `\xB13.4 x 10^38`)\n */\nscalar float32 extends float64;\n\n/**\n * A decimal number with any length and precision. This represent any `decimal` value possible.\n * It is commonly represented as `BigDecimal` in some languages.\n */\nscalar decimal extends numeric;\n\n/**\n * A 128-bit decimal number.\n */\nscalar decimal128 extends decimal;\n\n/**\n * A sequence of textual characters.\n */\nscalar string;\n\n/**\n * A date on a calendar without a time zone, e.g. "April 10th"\n */\nscalar plainDate {\n  /**\n   * Create a plain date from an ISO 8601 string.\n   * @example\n   *\n   * ```tsp\n   * const date = plainDate.fromISO("2024-05-06");\n   * ```\n   */\n  init fromISO(value: string);\n\n  /**\n   * Create a plain date representing the current date.\n   * @example\n   *\n   * ```tsp\n   * const date = plainDate.now();\n   * ```\n   */\n  init now();\n}\n\n/**\n * A time on a clock without a time zone, e.g. "3:00 am"\n */\nscalar plainTime {\n  /**\n   * Create a plain time from an ISO 8601 string.\n   * @example\n   *\n   * ```tsp\n   * const time = plainTime.fromISO("12:34");\n   * ```\n   */\n  init fromISO(value: string);\n\n  /**\n   * Create a plain time representing the current time.\n   * @example\n   *\n   * ```tsp\n   * const time = plainTime.now();\n   * ```\n   */\n  init now();\n}\n\n/**\n * An instant in coordinated universal time (UTC)"\n */\nscalar utcDateTime {\n  /**\n   * Create a date from an ISO 8601 string.\n   * @example\n   *\n   * ```tsp\n   * const time = utcDateTime.fromISO("2024-05-06T12:20-12Z");\n   * ```\n   */\n  init fromISO(value: string);\n\n  /**\n   * Create a date representing the current date and time in UTC.\n   * @example\n   *\n   * ```tsp\n   * const time = utcDateTime.now();\n   * ```\n   */\n  init now();\n}\n\n/**\n * A date and time in a particular time zone, e.g. "April 10th at 3:00am in PST"\n */\nscalar offsetDateTime {\n  /**\n   * Create a date from an ISO 8601 string.\n   * @example\n   *\n   * ```tsp\n   * const time = offsetDateTime.fromISO("2024-05-06T12:20-12-0700");\n   * ```\n   */\n  init fromISO(value: string);\n\n  /**\n   * Create a date representing the current date and time with offset.\n   * @example\n   *\n   * ```tsp\n   * const time = offsetDateTime.now();\n   * ```\n   */\n  init now();\n}\n\n/**\n * A duration/time period. e.g 5s, 10h\n */\nscalar duration {\n  /**\n   * Create a duration from an ISO 8601 string.\n   * @example\n   *\n   * ```tsp\n   * const time = duration.fromISO("P1Y1D");\n   * ```\n   */\n  init fromISO(value: string);\n}\n\n/**\n * Boolean with `true` and `false` values.\n */\nscalar boolean;\n\n/**\n * @dev Array model type, equivalent to `Element[]`\n * @template Element The type of the array elements\n */\n@indexer(integer, Element)\nmodel Array<Element> {}\n\n/**\n * @dev Model with string properties where all the properties have type `Property`\n * @template Element The type of the properties\n */\n@indexer(string, Element)\nmodel Record<Element> {}\n',
  "lib/prototypes.tsp": "namespace TypeSpec.Prototypes;\n\ninternal extern dec getter(target: unknown);\n\nnamespace Types {\n  interface ModelProperty {\n    @getter type(): unknown;\n  }\n\n  interface Operation {\n    @getter returnType(): unknown;\n    @getter parameters(): unknown;\n  }\n\n  interface Array<TElementType> {\n    @getter elementType(): TElementType;\n  }\n}\n",
  "lib/std/main.tsp": '// TypeSpec standard library. Everything in here can be omitted by using `--nostdlib` cli flag or `nostdlib` in the config.\nimport "./types.tsp";\nimport "./decorators.tsp";\nimport "./reflection.tsp";\nimport "./visibility.tsp";\n',
  "lib/std/types.tsp": 'namespace TypeSpec;\n\n/**\n * Represent a 32-bit unix timestamp datetime with 1s of granularity.\n * It measures time by the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970.\n */\n@encode("unixTimestamp", int32)\nscalar unixTimestamp32 extends utcDateTime;\n\n/**\n * Represent a URL string as described by https://url.spec.whatwg.org/\n */\nscalar url extends string;\n\n/**\n * Represents a collection of optional properties.\n *\n * @template Source An object whose spread properties are all optional.\n */\n@doc("The template for adding optional properties.")\n@withOptionalProperties\nmodel OptionalProperties<Source> {\n  ...Source;\n}\n\n/**\n * Represents a collection of updateable properties.\n *\n * @template Source An object whose spread properties are all updateable.\n */\n@doc("The template for adding updateable properties.")\n@withUpdateableProperties\nmodel UpdateableProperties<Source> {\n  ...Source;\n}\n\n/**\n * Represents a collection of omitted properties.\n *\n * @template Source An object whose properties are spread.\n * @template Keys The property keys to omit.\n */\n@doc("The template for omitting properties.")\n@withoutOmittedProperties(Keys)\nmodel OmitProperties<Source, Keys extends string> {\n  ...Source;\n}\n\n/**\n * Represents a collection of properties with only the specified keys included.\n *\n * @template Source An object whose properties are spread.\n * @template Keys The property keys to include.\n */\n@doc("The template for picking properties.")\n@withPickedProperties(Keys)\nmodel PickProperties<Source, Keys extends string> {\n  ...Source;\n}\n\n/**\n * Represents a collection of properties with default values omitted.\n *\n * @template Source An object whose spread property defaults are all omitted.\n */\n@withoutDefaultValues\nmodel OmitDefaults<Source> {\n  ...Source;\n}\n\n/**\n * Applies a visibility setting to a collection of properties.\n *\n * @template Source An object whose properties are spread.\n * @template Visibility The visibility to apply to all properties.\n */\n@doc("The template for setting the default visibility of key properties.")\n@withDefaultKeyVisibility(Visibility)\nmodel DefaultKeyVisibility<Source, Visibility extends valueof Reflection.EnumMember> {\n  ...Source;\n}\n',
  "lib/std/decorators.tsp": 'import "../../dist/src/lib/tsp-index.js";\n\nusing TypeSpec.Reflection;\n\nnamespace TypeSpec;\n\n/**\n * Typically a short, single-line description.\n * @param summary Summary string.\n *\n * @example\n * ```typespec\n * @summary("This is a pet")\n * model Pet {}\n * ```\n */\nextern dec summary(target: unknown, summary: valueof string);\n\n/**\n * Attach a documentation string. Content support CommonMark markdown formatting.\n * @param doc Documentation string\n * @param formatArgs Record with key value pair that can be interpolated in the doc.\n *\n * @example\n * ```typespec\n * @doc("Represent a Pet available in the PetStore")\n * model Pet {}\n * ```\n */\nextern dec doc(target: unknown, doc: valueof string, formatArgs?: {});\n\n/**\n * Attach a documentation string to describe the successful return types of an operation.\n * If an operation returns a union of success and errors it only describes the success. See `@errorsDoc` for error documentation.\n * @param doc Documentation string\n *\n * @example\n * ```typespec\n * @returnsDoc("Returns doc")\n * op get(): Pet | NotFound;\n * ```\n */\nextern dec returnsDoc(target: Operation, doc: valueof string);\n\n/**\n * Attach a documentation string to describe the error return types of an operation.\n * If an operation returns a union of success and errors it only describes the errors. See `@returnsDoc` for success documentation.\n * @param doc Documentation string\n *\n * @example\n * ```typespec\n * @errorsDoc("Errors doc")\n * op get(): Pet | NotFound;\n * ```\n */\nextern dec errorsDoc(target: Operation, doc: valueof string);\n\n/**\n * Service options.\n */\nmodel ServiceOptions {\n  /**\n   * Title of the service.\n   */\n  title?: string;\n}\n\n/**\n * Mark this namespace as describing a service and configure service properties.\n * @param options Optional configuration for the service.\n *\n * @example\n * ```typespec\n * @service\n * namespace PetStore;\n * ```\n *\n * @example Setting service title\n * ```typespec\n * @service(#{title: "Pet store"})\n * namespace PetStore;\n * ```\n */\nextern dec service(target: Namespace, options?: valueof ServiceOptions);\n\n/**\n * Specify that this model is an error type. Operations return error types when the operation has failed.\n *\n * @example\n * ```typespec\n * @error\n * model PetStoreError {\n *   code: string;\n *   message: string;\n * }\n * ```\n */\nextern dec error(target: Model);\n\n/**\n * Applies a media type hint to a TypeSpec type. Emitters and libraries may choose to use this hint to determine how a\n * type should be serialized. For example, the `@typespec/http` library will use the media type hint of the response\n * body type as a default `Content-Type` if one is not explicitly specified in the operation.\n *\n * Media types (also known as MIME types) are defined by RFC 6838. The media type hint should be a valid media type\n * string as defined by the RFC, but the decorator does not enforce or validate this constraint.\n *\n * Notes: the applied media type is _only_ a hint. It may be overridden or not used at all. Media type hints are\n * inherited by subtypes. If a media type hint is applied to a model, it will be inherited by all other models that\n * `extend` it unless they delcare their own media type hint.\n *\n * @param mediaType The media type hint to apply to the target type.\n *\n * @example create a model that serializes as XML by default\n *\n * ```tsp\n * @mediaTypeHint("application/xml")\n * model Example {\n *   @visibility(Lifecycle.Read)\n *   id: string;\n *\n *   name: string;\n * }\n * ```\n */\nextern dec mediaTypeHint(target: Model | Scalar | Enum | Union, mediaType: valueof string);\n\n// Cannot apply this to the scalar itself. Needs to be applied here so that we don\'t crash nostdlib scenarios\n@@mediaTypeHint(TypeSpec.bytes, "application/octet-stream");\n\n// @@mediaTypeHint(TypeSpec.string "text/plain") -- This is hardcoded in the compiler to avoid circularity\n// between the initialization of the string scalar and the `valueof string` required to call the\n// `mediaTypeHint` decorator.\n\n/**\n * Specify a known data format hint for this string type. For example `uuid`, `uri`, etc.\n * This differs from the `@pattern` decorator which is meant to specify a regular expression while `@format` accepts a known format name.\n * The format names are open ended and are left to emitter to interpret.\n *\n * @param format format name.\n *\n * @example\n * ```typespec\n * @format("uuid")\n * scalar uuid extends string;\n * ```\n */\nextern dec format(target: string | ModelProperty, format: valueof string);\n\n/**\n * Specify the the pattern this string should respect using simple regular expression syntax.\n * The following syntax is allowed: alternations (`|`), quantifiers (`?`, `*`, `+`, and `{ }`), wildcard (`.`), and grouping parentheses.\n * Advanced features like look-around, capture groups, and references are not supported.\n *\n * This decorator may optionally provide a custom validation _message_. Emitters may choose to use the message to provide\n * context when pattern validation fails. For the sake of consistency, the message should be a phrase that describes in\n * plain language what sort of content the pattern attempts to validate. For example, a complex regular expression that\n * validates a GUID string might have a message like "Must be a valid GUID."\n *\n * @param pattern Regular expression.\n * @param validationMessage Optional validation message that may provide context when validation fails.\n *\n * @example\n * ```typespec\n * @pattern("[a-z]+", "Must be a string consisting of only lower case letters and of at least one character.")\n * scalar LowerAlpha extends string;\n * ```\n */\nextern dec pattern(\n  target: string | bytes | ModelProperty,\n  pattern: valueof string,\n  validationMessage?: valueof string\n);\n\n/**\n * Specify the minimum length this string type should be.\n * @param value Minimum length\n *\n * @example\n * ```typespec\n * @minLength(2)\n * scalar Username extends string;\n * ```\n */\nextern dec minLength(target: string | ModelProperty, value: valueof integer);\n\n/**\n * Specify the maximum length this string type should be.\n * @param value Maximum length\n *\n * @example\n * ```typespec\n * @maxLength(20)\n * scalar Username extends string;\n * ```\n */\nextern dec maxLength(target: string | ModelProperty, value: valueof integer);\n\n/** Types that can have range limits */\nalias RangeLimitableTypes =\n  | numeric\n  | utcDateTime\n  | offsetDateTime\n  | plainDate\n  | plainTime\n  | duration;\n\n/**\n * Specify the minimum number of items this array should have.\n * @param value Minimum number\n *\n * @example\n * ```typespec\n * @minItems(1)\n * model Endpoints is string[];\n * ```\n */\nextern dec minItems(target: unknown[] | ModelProperty, value: valueof integer);\n\n/**\n * Specify the maximum number of items this array should have.\n * @param value Maximum number\n *\n * @example\n * ```typespec\n * @maxItems(5)\n * model Endpoints is string[];\n * ```\n */\nextern dec maxItems(target: unknown[] | ModelProperty, value: valueof integer);\n\n/**\n * Specify the minimum value this numeric type should be.\n * @param value Minimum value\n *\n * @example\n * ```typespec\n * @minValue(18)\n * scalar Age is int32;\n * ```\n */\nextern dec minValue(\n  target: RangeLimitableTypes | ModelProperty,\n  value: valueof RangeLimitableTypes\n);\n\n/**\n * Specify the maximum value this numeric type should be.\n * @param value Maximum value\n *\n * @example\n * ```typespec\n * @maxValue(200)\n * scalar Age is int32;\n * ```\n */\nextern dec maxValue(\n  target: RangeLimitableTypes | ModelProperty,\n  value: valueof RangeLimitableTypes\n);\n\n/**\n * Specify the minimum value this numeric type should be, exclusive of the given\n * value.\n * @param value Minimum value\n *\n * @example\n * ```typespec\n * @minValueExclusive(0)\n * scalar distance is float64;\n * ```\n */\nextern dec minValueExclusive(\n  target: RangeLimitableTypes | ModelProperty,\n  value: valueof RangeLimitableTypes\n);\n\n/**\n * Specify the maximum value this numeric type should be, exclusive of the given\n * value.\n * @param value Maximum value\n *\n * @example\n * ```typespec\n * @maxValueExclusive(50)\n * scalar distance is float64;\n * ```\n */\nextern dec maxValueExclusive(\n  target: RangeLimitableTypes | ModelProperty,\n  value: valueof RangeLimitableTypes\n);\n\n/**\n * Mark this value as a secret value that should be treated carefully to avoid exposure\n *\n * @example\n * ```typespec\n * @secret\n * scalar Password is string;\n * ```\n */\nextern dec secret(target: Scalar | ModelProperty | Model | Union | Enum);\n\n/**\n * Attaches a tag to an operation, interface, or namespace. Multiple `@tag` decorators can be specified to attach multiple tags to a TypeSpec element.\n * @param tag Tag value\n */\nextern dec tag(target: Namespace | Interface | Operation, tag: valueof string);\n\n/**\n * Specifies how a templated type should name their instances.\n * @param name name the template instance should take\n * @param formatArgs Model with key value used to interpolate the name\n *\n * @example\n * ```typespec\n * @friendlyName("{name}List", T)\n * model List<Item> {\n *   value: Item[];\n *   nextLink: string;\n * }\n * ```\n */\nextern dec friendlyName(target: unknown, name: valueof string, formatArgs?: unknown);\n\n/**\n * Mark a model property as the key to identify instances of that type\n * @param altName Name of the property. If not specified, the decorated property name is used.\n *\n * @example\n * ```typespec\n * model Pet {\n *   @key id: string;\n * }\n * ```\n */\nextern dec key(target: ModelProperty, altName?: valueof string);\n\n/**\n * Specify this operation is an overload of the given operation.\n * @param overloadbase Base operation that should be a union of all overloads\n *\n * @example\n * ```typespec\n * op upload(data: string | bytes, @header contentType: "text/plain" | "application/octet-stream"): void;\n * @overload(upload)\n * op uploadString(data: string, @header contentType: "text/plain" ): void;\n * @overload(upload)\n * op uploadBytes(data: bytes, @header contentType: "application/octet-stream"): void;\n * ```\n */\nextern dec overload(target: Operation, overloadbase: Operation);\n\n/**\n * Provide an alternative name for this type when serialized to the given mime type.\n * @param mimeType Mime type this should apply to. The mime type should be a known mime type as described here https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types without any suffix (e.g. `+json`)\n * @param name Alternative name\n *\n * @example\n *\n * ```typespec\n * model Certificate {\n *   @encodedName("application/json", "exp")\n *   @encodedName("application/xml", "expiry")\n *   expireAt: int32;\n * }\n * ```\n *\n * @example Invalid values\n *\n * ```typespec\n * @encodedName("application/merge-patch+json", "exp")\n *              ^ error cannot use subtype\n * ```\n */\nextern dec encodedName(target: unknown, mimeType: valueof string, name: valueof string);\n\n/**\n * Options for `@discriminated` decorator.\n */\nmodel DiscriminatedOptions {\n  /**\n   * How is the discriminated union serialized.\n   * @default object\n   */\n  envelope?: "object" | "none";\n\n  /** Name of the discriminator property */\n  discriminatorPropertyName?: string;\n\n  /** Name of the property envelopping the data */\n  envelopePropertyName?: string;\n}\n\n/**\n * Specify that this union is discriminated.\n * @param options Options to configure the serialization of the discriminated union.\n *\n * @example\n *\n * ```typespec\n * @discriminated\n * union Pet{ cat: Cat, dog: Dog }\n *\n * model Cat { name: string, meow: boolean }\n * model Dog { name: string, bark: boolean }\n * ```\n * Serialized as:\n * ```json\n * {\n *   "kind": "cat",\n *   "value": {\n *     "name": "Whiskers",\n *     "meow": true\n *   }\n * },\n * {\n *   "kind": "dog",\n *   "value": {\n *     "name": "Rex",\n *     "bark": false\n *   }\n * }\n * ```\n *\n * @example Custom property names\n *\n * ```typespec\n * @discriminated(#{discriminatorPropertyName: "dataKind", envelopePropertyName: "data"})\n * union Pet{ cat: Cat, dog: Dog }\n *\n * model Cat { name: string, meow: boolean }\n * model Dog { name: string, bark: boolean }\n * ```\n * Serialized as:\n * ```json\n * {\n *   "dataKind": "cat",\n *   "data": {\n *     "name": "Whiskers",\n *     "meow": true\n *   }\n * },\n * {\n *   "dataKind": "dog",\n *   "data": {\n *     "name": "Rex",\n *     "bark": false\n *   }\n * }\n * ```\n */\nextern dec discriminated(target: Union, options?: valueof DiscriminatedOptions);\n\n/**\n * Specify the property to be used to discriminate this type.\n * @param propertyName The property name to use for discrimination\n *\n * @example\n *\n * ```typespec\n * @discriminator("kind")\n * model Pet{ kind: string }\n *\n * model Cat extends Pet {kind: "cat", meow: boolean}\n * model Dog extends Pet  {kind: "dog", bark: boolean}\n * ```\n */\nextern dec discriminator(target: Model, propertyName: valueof string);\n\n/**\n * Known encoding to use on utcDateTime or offsetDateTime\n */\nenum DateTimeKnownEncoding {\n  /**\n   * RFC 3339 standard. https://www.ietf.org/rfc/rfc3339.txt\n   * Encode to string.\n   */\n  rfc3339: "rfc3339",\n\n  /**\n   * RFC 7231 standard. https://www.ietf.org/rfc/rfc7231.txt\n   * Encode to string.\n   */\n  rfc7231: "rfc7231",\n\n  /**\n   * Encode a datetime to a unix timestamp.\n   * Unix timestamps are represented as an integer number of seconds since the Unix epoch and usually encoded as an int32.\n   */\n  unixTimestamp: "unixTimestamp",\n}\n\n/**\n * Known encoding to use on duration\n */\nenum DurationKnownEncoding {\n  /**\n   * ISO8601 duration\n   */\n  ISO8601: "ISO8601",\n\n  /**\n   * Encode to integer or float as seconds\n   */\n  seconds: "seconds",\n\n  /**\n   * Encode to integer or float as milliseconds\n   */\n  milliseconds: "milliseconds",\n}\n\n/**\n * Known encoding to use on bytes\n */\nenum BytesKnownEncoding {\n  /**\n   * Encode to Base64\n   */\n  base64: "base64",\n\n  /**\n   * Encode to Base64 Url\n   */\n  base64url: "base64url",\n}\n\n/**\n * Encoding for serializing arrays\n */\nenum ArrayEncoding {\n  /**\n   * Each value of the array is separated by a pipe character (|).\n   * Values can only contain | if the underlying protocol supports encoding them.\n   * - json -> error\n   * - http -> %7C\n   */\n  pipeDelimited,\n\n  /**\n   * Each value of the array is separated by a space character.\n   * Values can only contain spaces if the underlying protocol supports encoding them.\n   * - json -> error\n   * - http -> %20\n   */\n  spaceDelimited,\n\n  /**\n   * Each value of the array is separated by a comma (,).\n   * Values can only contain commas if the underlying protocol supports encoding them.\n   * - json -> error\n   * - http -> %2C\n   */\n  commaDelimited,\n\n  /**\n   * Each value of the array is separated by a newline character (\\n).\n   * Values can only contain newlines if the underlying protocol supports encoding them.\n   * - json -> error\n   * - http -> %0A\n   */\n  newlineDelimited,\n}\n\n/**\n * Specify how to encode the target type.\n * @param encodingOrEncodeAs Known name of an encoding or a scalar type to encode as(Only for numeric and boolean types to encode as string).\n * @param encodedAs What target type is this being encoded as. Default to string.\n *\n * @example offsetDateTime encoded with rfc7231\n *\n * ```tsp\n * @encode("rfc7231")\n * scalar myDateTime extends offsetDateTime;\n * ```\n *\n * @example utcDateTime encoded with unixTimestamp\n *\n * ```tsp\n * @encode("unixTimestamp", int32)\n * scalar myDateTime extends unixTimestamp;\n * ```\n *\n * @example encode numeric type to string\n *\n * ```tsp\n * model Pet {\n *   @encode(string) id: int64;\n * }\n * ```\n *\n * @example encode boolean type to string\n *\n * `@encode(string)` on boolean uses case-insensitive `true` / `false` values.\n *\n * ```tsp\n * model FeatureFlags {\n *   @encode(string) enabled: boolean;\n * }\n * ```\n */\nextern dec encode(\n  target: Scalar | ModelProperty,\n  encodingOrEncodeAs: (valueof string | EnumMember) | Scalar,\n  encodedAs?: Scalar\n);\n\n/** Options for example decorators */\nmodel ExampleOptions {\n  /** The title of the example */\n  title?: string;\n\n  /** Description of the example */\n  description?: string;\n}\n\n/**\n * Provide an example value for a data type.\n *\n * @param example Example value.\n * @param options Optional metadata for the example.\n *\n * @example\n *\n * ```tsp\n * @example(#{name: "Fluffy", age: 2})\n * model Pet {\n *  name: string;\n *  age: int32;\n * }\n * ```\n */\nextern dec example(\n  target: Model | Enum | Scalar | Union | ModelProperty | UnionVariant,\n  example: valueof unknown,\n  options?: valueof ExampleOptions\n);\n\n/**\n * Operation example configuration.\n */\nmodel OperationExample {\n  /** Example request body. */\n  parameters?: unknown;\n\n  /** Example response body. */\n  returnType?: unknown;\n}\n\n/**\n * Provide example values for an operation\'s parameters and corresponding return type.\n *\n * @param example Example value.\n * @param options Optional metadata for the example.\n *\n * @example\n *\n * ```tsp\n * @opExample(#{parameters: #{name: "Fluffy", age: 2}, returnType: #{name: "Fluffy", age: 2, id: "abc"})\n * op createPet(pet: Pet): Pet;\n * ```\n */\nextern dec opExample(\n  target: Operation,\n  example: valueof OperationExample,\n  options?: valueof ExampleOptions\n);\n\n/**\n * Returns the model with required properties removed.\n */\nextern dec withOptionalProperties(target: Model);\n\n/**\n * Returns the model with any default values removed.\n */\nextern dec withoutDefaultValues(target: Model);\n\n/**\n * Returns the model with the given properties omitted.\n * @param omit List of properties to omit\n */\nextern dec withoutOmittedProperties(target: Model, omit: string | Union);\n\n/**\n * Returns the model with only the given properties included.\n * @param pick List of properties to include\n */\nextern dec withPickedProperties(target: Model, pick: string | Union);\n\n//---------------------------------------------------------------------------\n// Paging\n//---------------------------------------------------------------------------\n\n/**\n * Mark this operation as a `list` operation that returns a paginated list of items.\n */\nextern dec list(target: Operation);\n\n/**\n * Pagination property defining the number of items to skip.\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n * }\n * @list op listPets(@offset skip: int32, @pageSize pageSize: int8): Page<Pet>;\n * ```\n */\nextern dec offset(target: ModelProperty);\n\n/**\n * Pagination property defining the page index.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n * }\n * @list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;\n * ```\n */\nextern dec pageIndex(target: ModelProperty);\n\n/**\n * Specify the pagination parameter that controls the maximum number of items to include in a page.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n * }\n * @list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;\n * ```\n */\nextern dec pageSize(target: ModelProperty);\n\n/**\n * Specify the the property that contains the array of page items.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n * }\n * @list op listPets(@pageIndex page: int32, @pageSize pageSize: int8): Page<Pet>;\n * ```\n */\nextern dec pageItems(target: ModelProperty);\n\n/**\n * Pagination property defining the token to get to the next page.\n * It MUST be specified both on the request parameter and the response.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n *   @continuationToken continuationToken: string;\n * }\n * @list op listPets(@continuationToken continuationToken: string): Page<Pet>;\n * ```\n */\nextern dec continuationToken(target: ModelProperty);\n\n/**\n * Pagination property defining a link to the next page.\n *\n * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n *   @nextLink next: url;\n *   @prevLink prev: url;\n *   @firstLink first: url;\n *   @lastLink last: url;\n * }\n * @list op listPets(): Page<Pet>;\n * ```\n */\nextern dec nextLink(target: ModelProperty);\n\n/**\n * Pagination property defining a link to the previous page.\n *\n * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n *   @nextLink next: url;\n *   @prevLink prev: url;\n *   @firstLink first: url;\n *   @lastLink last: url;\n * }\n * @list op listPets(): Page<Pet>;\n * ```\n */\nextern dec prevLink(target: ModelProperty);\n\n/**\n * Pagination property defining a link to the first page.\n *\n * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n *   @nextLink next: url;\n *   @prevLink prev: url;\n *   @firstLink first: url;\n *   @lastLink last: url;\n * }\n * @list op listPets(): Page<Pet>;\n * ```\n */\nextern dec firstLink(target: ModelProperty);\n\n/**\n * Pagination property defining a link to the last page.\n *\n * It is expected that navigating to the link will return the same set of responses as the operation that returned the current page.\n *\n * @example\n * ```tsp\n * model Page<T> {\n *   @pageItems items: T[];\n *   @nextLink next: url;\n *   @prevLink prev: url;\n *   @firstLink first: url;\n *   @lastLink last: url;\n * }\n * @list op listPets(): Page<Pet>;\n * ```\n */\nextern dec lastLink(target: ModelProperty);\n\n//---------------------------------------------------------------------------\n// Debugging\n//---------------------------------------------------------------------------\n\n/**\n * A debugging decorator used to inspect a type.\n * @param text Custom text to log\n */\nextern dec inspectType(target: unknown, text: valueof string);\n\n/**\n * A debugging decorator used to inspect a type name.\n * @param text Custom text to log\n */\nextern dec inspectTypeName(target: unknown, text: valueof string);\n',
  "lib/std/reflection.tsp": "namespace TypeSpec.Reflection;\n\nmodel Enum {}\nmodel EnumMember {}\nmodel Interface {}\nmodel Model {}\nmodel ModelProperty {}\nmodel Namespace {}\nmodel Operation {}\nmodel Scalar {}\nmodel Union {}\nmodel UnionVariant {}\nmodel StringTemplate {}\n",
  "lib/std/visibility.tsp": '// Copyright (c) Microsoft Corporation\n// Licensed under the MIT license.\n\nimport "../../dist/src/lib/tsp-index.js";\n\nusing TypeSpec.Reflection;\n\nnamespace TypeSpec;\n\n/**\n * Sets the visibility modifiers that are active on a property, indicating that it is only considered to be present\n * (or "visible") in contexts that select for the given modifiers.\n *\n * A property without any visibility settings applied for any visibility class (e.g. `Lifecycle`) is considered to have\n * the default visibility settings for that class.\n *\n * If visibility for the property has already been set for a visibility class (for example, using `@invisible` or\n * `@removeVisibility`), this decorator will **add** the specified visibility modifiers to the property.\n *\n * See: [Visibility](https://typespec.io/docs/language-basics/visibility)\n *\n * The `@typespec/http` library uses `Lifecycle` visibility to determine which properties are included in the request or\n * response bodies of HTTP operations. By default, it uses the following visibility settings:\n *\n * - For the return type of operations, properties are included if they have `Lifecycle.Read` visibility.\n * - For POST operation parameters, properties are included if they have `Lifecycle.Create` visibility.\n * - For PUT operation parameters, properties are included if they have `Lifecycle.Create` or `Lifecycle.Update` visibility.\n * - For PATCH operation parameters, properties are included if they have `Lifecycle.Update` visibility.\n * - For DELETE operation parameters, properties are included if they have `Lifecycle.Delete` visibility.\n * - For GET or HEAD operation parameters, properties are included if they have `Lifecycle.Query` visibility.\n *\n * By default, properties have all five Lifecycle visibility modifiers enabled, so a property is visible in all contexts\n * by default.\n *\n * The default settings may be overridden using the `@returnTypeVisibility` and `@parameterVisibility` decorators.\n *\n * See also: [Automatic visibility](https://typespec.io/docs/libraries/http/operations#automatic-visibility)\n *\n * @param visibilities List of visibilities which apply to this property.\n *\n * @example\n *\n * ```typespec\n * model Dog {\n *   // The service will generate an ID, so you don\'t need to send it.\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   // The service will store this secret name, but won\'t ever return it.\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   // The regular name has all vi\n *   name: string;\n * }\n * ```\n */\nextern dec visibility(target: ModelProperty, ...visibilities: valueof EnumMember[]);\n\n/**\n * Indicates that a property is not visible in the given visibility class.\n *\n * This decorator removes all active visibility modifiers from the property within\n * the given visibility class, making it invisible to any context that selects for\n * visibility modifiers within that class.\n *\n * @param visibilityClass The visibility class to make the property invisible within.\n *\n * @example\n * ```typespec\n * model Example {\n *   @invisible(Lifecycle)\n *   hidden_property: string;\n * }\n * ```\n */\nextern dec invisible(target: ModelProperty, visibilityClass: Enum);\n\n/**\n * Removes visibility modifiers from a property.\n *\n * If the visibility modifiers for a visibility class have not been initialized,\n * this decorator will use the default visibility modifiers for the visibility\n * class as the default modifier set.\n *\n * @param target The property to remove visibility from.\n * @param visibilities The visibility modifiers to remove from the target property.\n *\n * @example\n * ```typespec\n * model Example {\n *   // This property will have all Lifecycle visibilities except the Read\n *   // visibility, since it is removed.\n *   @removeVisibility(Lifecycle.Read)\n *   secret_property: string;\n * }\n * ```\n */\nextern dec removeVisibility(target: ModelProperty, ...visibilities: valueof EnumMember[]);\n\n/**\n * Removes properties that do not have at least one of the given visibility modifiers\n * active.\n *\n * If no visibility modifiers are supplied, this decorator has no effect.\n *\n * See also: [Automatic visibility](https://typespec.io/docs/libraries/http/operations#automatic-visibility)\n *\n * When using an emitter that applies visibility automatically, it is generally\n * not necessary to use this decorator.\n *\n * @param visibilities List of visibilities that apply to this property.\n *\n * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   name: string;\n * }\n *\n * // The spread operator will copy all the properties of Dog into DogRead,\n * // and @withVisibility will then remove those that are not visible with\n * // create or update visibility.\n * //\n * // In this case, the id property is removed, and the name and secretName\n * // properties are kept.\n * @withVisibility(Lifecycle.Create, Lifecycle.Update)\n * model DogCreateOrUpdate {\n *   ...Dog;\n * }\n *\n * // In this case the id and name properties are kept and the secretName property\n * // is removed.\n * @withVisibility(Lifecycle.Read)\n * model DogRead {\n *   ...Dog;\n * }\n * ```\n */\nextern dec withVisibility(target: Model, ...visibilities: valueof EnumMember[]);\n\n/**\n * Set the visibility of key properties in a model if not already set.\n *\n * This will set the visibility modifiers of all key properties in the model if the visibility is not already _explicitly_ set,\n * but will not change the visibility of any properties that have visibility set _explicitly_, even if the visibility\n * is the same as the default visibility.\n *\n * Visibility may be set explicitly using any of the following decorators:\n *\n * - `@visibility`\n * - `@removeVisibility`\n * - `@invisible`\n *\n * @param visibility The desired default visibility value. If a key property already has visibility set, it will not be changed.\n */\nextern dec withDefaultKeyVisibility(target: Model, visibility: valueof EnumMember);\n\n/**\n * Declares the visibility constraint of the parameters of a given operation.\n *\n * A parameter or property nested within a parameter will be visible if it has _any_ of the visibilities\n * in the list.\n *\n * It is invalid to call this decorator with no visibility modifiers.\n *\n * @param visibilities List of visibility modifiers that apply to the parameters of this operation.\n */\nextern dec parameterVisibility(target: Operation, ...visibilities: valueof EnumMember[]);\n\n/**\n * Declares the visibility constraint of the return type of a given operation.\n *\n * A property within the return type of the operation will be visible if it has _any_ of the visibilities\n * in the list.\n *\n * It is invalid to call this decorator with no visibility modifiers.\n *\n * @param visibilities List of visibility modifiers that apply to the return type of this operation.\n */\nextern dec returnTypeVisibility(target: Operation, ...visibilities: valueof EnumMember[]);\n\n/**\n * Returns the model with non-updateable properties removed.\n */\nextern dec withUpdateableProperties(target: Model);\n\n/**\n * Declares the default visibility modifiers for a visibility class.\n *\n * The default modifiers are used when a property does not have any visibility decorators\n * applied to it.\n *\n * The modifiers passed to this decorator _MUST_ be members of the target Enum.\n *\n * @param visibilities the list of modifiers to use as the default visibility modifiers.\n */\nextern dec defaultVisibility(target: Enum, ...visibilities: valueof EnumMember[]);\n\n/**\n * A visibility class for resource lifecycle phases.\n *\n * These visibilities control whether a property is visible during the various phases of a resource\'s lifecycle.\n *\n * @example\n * ```typespec\n * model Dog {\n *  @visibility(Lifecycle.Read)\n *  id: int32;\n *\n *  @visibility(Lifecycle.Create, Lifecycle.Update)\n *  secretName: string;\n *\n *  name: string;\n * }\n * ```\n *\n * In this example, the `id` property is only visible during the read phase, and the `secretName` property is only visible\n * during the create and update phases. This means that the server will return the `id` property when returning a `Dog`,\n * but the client will not be able to set or update it. In contrast, the `secretName` property can be set when creating\n * or updating a `Dog`, but the server will never return it. The `name` property has no visibility modifiers and is\n * therefore visible in all phases.\n */\nenum Lifecycle {\n  /**\n   * The property is visible when a resource is being created.\n   */\n  Create,\n\n  /**\n   * The property is visible when a resource is being read.\n   */\n  Read,\n\n  /**\n   * The property is visible when a resource is being updated.\n   */\n  Update,\n\n  /**\n   * The property is visible when a resource is being deleted.\n   */\n  Delete,\n\n  /**\n   * The property is visible when a resource is being queried.\n   *\n   * In HTTP APIs, this visibility applies to parameters of GET or HEAD operations.\n   */\n  Query,\n}\n\n/**\n * A visibility filter, used to specify which properties should be included when\n * using the `withVisibilityFilter` decorator.\n *\n * The filter matches any property with ALL of the following:\n * - If the `any` key is present, the property must have at least one of the specified visibilities.\n * - If the `all` key is present, the property must have all of the specified visibilities.\n * - If the `none` key is present, the property must have none of the specified visibilities.\n */\nmodel VisibilityFilter {\n  any?: EnumMember[];\n  all?: EnumMember[];\n  none?: EnumMember[];\n}\n\n/**\n * Applies the given visibility filter to the properties of the target model.\n *\n * This transformation is recursive, so it will also apply the filter to any nested\n * or referenced models that are the types of any properties in the `target`.\n *\n * If a `nameTemplate` is provided, newly-created type instances will be named according\n * to the template. See the `@friendlyName` decorator for more information on the template\n * syntax. The transformed type is provided as the argument to the template.\n *\n * @param target The model to apply the visibility filter to.\n * @param filter The visibility filter to apply to the properties of the target model.\n * @param nameTemplate The name template to use when renaming new model instances.\n *\n * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   name: string;\n * }\n *\n * @withVisibilityFilter(#{ all: #[Lifecycle.Read] })\n * model DogRead {\n *  ...Dog\n * }\n * ```\n */\n#deprecated "withVisibilityFilter is deprecated and will be removed in a future release. Use the `FilterVisibility` template or Lifecycle specific templates (e.g. `Read`, `Create`, `Update`, etc.) instead."\nextern dec withVisibilityFilter(\n  target: Model,\n  filter: valueof VisibilityFilter,\n  nameTemplate?: valueof string\n);\n\n/**\n * A copy of the input model `M` with only the properties that match the given visibility filter.\n *\n * This transformation is recursive, so it will also apply the filter to any nested\n * or referenced models that are the types of any properties in the `target`.\n *\n * If a `nameTemplate` is provided, newly-created type instances will be named according\n * to the template. See the `@friendlyName` decorator for more information on the template\n * syntax. The transformed type is provided as the argument to the template.\n *\n * @template M the model to apply the visibility filter to.\n * @template Filter the visibility filter to apply to the properties of the target model.\n * @template NameTemplate the name template to use when renaming new type instances.\n *\n * @example\n * ```typespec\n * model Dog {\n *   @visibility(CustomVisibility.A)\n *   id: int32;\n *   @removeVisibility(CustomVisibility.A)\n *   name: string;\n * }\n *\n * enum CustomVisibility {\n *   A,\n *   B,\n * }\n *\n * const customFilter: VisibilityFilter = #{ all: #[CustomVisibility.A] };\n *\n * // This model will have the `id` property but not the `name` property, since `id` has the CustomVisibility.A visibility and `name` does not.\n * model DogRead is FilterVisibility<Dog, customFilter, "Read{name}">;\n * ```\n */\nalias FilterVisibility<\n  M extends Model,\n  Filter extends valueof VisibilityFilter,\n  NameTemplate extends valueof string\n> = applyVisibilityFilter(M, Filter, NameTemplate);\n\n#suppress "experimental-feature"\ninternal extern fn applyVisibilityFilter(\n  input: Model,\n  filter: valueof VisibilityFilter,\n  nameTemplate?: valueof string\n): Model;\n\n/**\n * Transforms the `target` model to include only properties that are visible during the\n * "Update" lifecycle phase.\n *\n * Any nested models of optional properties will be transformed into the "CreateOrUpdate"\n * lifecycle phase instead of the "Update" lifecycle phase, so that nested models may be\n * fully updated.\n *\n * If a `nameTemplate` is provided, newly-created type instances will be named according\n * to the template. See the `@friendlyName` decorator for more information on the template\n * syntax. The transformed type is provided as the argument to the template.\n *\n * @param target The model to apply the transformation to.\n * @param nameTemplate The name template to use when renaming new model instances.\n *\n * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   name: string;\n * }\n *\n * @withLifecycleUpdate\n * model DogUpdate {\n *   ...Dog\n * }\n * ```\n */\n#deprecated "withLifecycleUpdate is deprecated and will be removed in a future release. Use the `Update` template instead."\nextern dec withLifecycleUpdate(target: Model, nameTemplate?: valueof string);\n\n#suppress "experimental-feature"\ninternal extern fn applyLifecycleUpdate(input: Model, nameTemplate?: valueof string): Model;\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Create" resource lifecycle phase.\n *\n * This transformation is recursive, and will include only properties that have the\n * `Lifecycle.Create` visibility modifier.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   name: string;\n * }\n *\n * // This model has only the `name` field.\n * model CreateDog is Create<Dog>;\n * ```\n */\nalias Create<\n  T extends Model,\n  NameTemplate extends valueof string = "Create{name}"\n> = applyVisibilityFilter(T, #{ all: #[Lifecycle.Create] }, NameTemplate);\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Read" resource lifecycle phase.\n *\n * The "Read" lifecycle phase is used for properties returned by operations that read data, like\n * HTTP GET operations.\n *\n * This transformation is recursive, and will include only properties that have the\n * `Lifecycle.Read` visibility modifier.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   name: string;\n * }\n *\n * // This model has the `id` and `name` fields, but not `secretName`.\n * model ReadDog is Read<Dog>;\n * ```\n */\nalias Read<\n  T extends Model,\n  NameTemplate extends valueof string = "Read{name}"\n> = applyVisibilityFilter(T, #{ all: #[Lifecycle.Read] }, NameTemplate);\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Update" resource lifecycle phase.\n *\n * The "Update" lifecycle phase is used for properties passed as parameters to operations\n * that update data, like HTTP PATCH operations.\n *\n * This transformation will include only the properties that have the `Lifecycle.Update`\n * visibility modifier, and the types of all properties will be replaced with the\n * equivalent `CreateOrUpdate` transformation.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   name: string;\n * }\n *\n * // This model will have the `secretName` and `name` fields, but not the `id` field.\n * model UpdateDog is Update<Dog>;\n * ```\n */\nalias Update<\n  T extends Model,\n  NameTemplate extends valueof string = "Update{name}"\n> = applyLifecycleUpdate(T, NameTemplate);\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Create" or "Update" resource lifecycle phases.\n *\n * The "CreateOrUpdate" lifecycle phase is used by default for properties passed as parameters to operations\n * that can create _or_ update data, like HTTP PUT operations.\n *\n * This transformation is recursive, and will include only properties that have the\n * `Lifecycle.Create` or `Lifecycle.Update` visibility modifier.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   @visibility(Lifecycle.Create)\n *   immutableSecret: string;\n *\n *   @visibility(Lifecycle.Create, Lifecycle.Update)\n *   secretName: string;\n *\n *   name: string;\n * }\n *\n * // This model will have the `immutableSecret`, `secretName`, and `name` fields, but not the `id` field.\n * model CreateOrUpdateDog is CreateOrUpdate<Dog>;\n * ```\n */\nalias CreateOrUpdate<\n  T extends Model,\n  NameTemplate extends valueof string = "CreateOrUpdate{name}"\n> = applyVisibilityFilter(T, #{ any: #[Lifecycle.Create, Lifecycle.Update] }, NameTemplate);\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Delete" resource lifecycle phase.\n *\n * The "Delete" lifecycle phase is used for properties passed as parameters to operations\n * that delete data, like HTTP DELETE operations.\n *\n * This transformation is recursive, and will include only properties that have the\n * `Lifecycle.Delete` visibility modifier.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   // Set when the Dog is removed from our data store. This happens when the\n *   // Dog is re-homed to a new owner.\n *   @visibility(Lifecycle.Delete)\n *   nextOwner: string;\n *\n *   name: string;\n * }\n *\n * // This model will have the `nextOwner` and `name` fields, but not the `id` field.\n * model DeleteDog is Delete<Dog>;\n * ```\n */\nalias Delete<\n  T extends Model,\n  NameTemplate extends valueof string = "Delete{name}"\n> = applyVisibilityFilter(T, #{ all: #[Lifecycle.Delete] }, NameTemplate);\n\n/**\n * A copy of the input model `T` with only the properties that are visible during the\n * "Query" resource lifecycle phase.\n *\n * The "Query" lifecycle phase is used for properties passed as parameters to operations\n * that read data, like HTTP GET or HEAD operations. This should not be confused for\n * the `@query` decorator, which specifies that the property is transmitted in the\n * query string of an HTTP request.\n *\n * This transformation is recursive, and will include only properties that have the\n * `Lifecycle.Query` visibility modifier.\n *\n * If a `NameTemplate` is provided, the new model will be named according to the template.\n * The template uses the same syntax as the `@friendlyName` decorator.\n *\n * @template T The model to transform.\n * @template NameTemplate The name template to use for the new model.\n *\n *  * @example\n * ```typespec\n * model Dog {\n *   @visibility(Lifecycle.Read)\n *   id: int32;\n *\n *   // When getting information for a Dog, you can set this field to true to include\n *   // some extra information about the Dog\'s pedigree that is normally not returned.\n *   // Alternatively, you could just use a separate option parameter to get this\n *   // information.\n *   @visibility(Lifecycle.Query)\n *   includePedigree?: boolean;\n *\n *   name: string;\n *\n *   // Only included if `includePedigree` is set to true in the request.\n *   @visibility(Lifecycle.Read)\n *   pedigree?: string;\n * }\n *\n * // This model will have the `includePedigree` and `name` fields, but not `id` or `pedigree`.\n * model QueryDog is Query<Dog>;\n * ```\n */\nalias Query<\n  T extends Model,\n  NameTemplate extends valueof string = "Query{name}"\n> = applyVisibilityFilter(T, #{ all: #[Lifecycle.Query] }, NameTemplate);\n'
};
var _TypeSpecLibrary_ = {
  jsSourceFiles: TypeSpecJSSources,
  typespecSourceFiles: TypeSpecSources
};
export {
  $decorators3 as $decorators,
  $defaultVisibility,
  $discriminator,
  $doc,
  $encode,
  $encodedName,
  $error,
  $errorsDoc,
  $example,
  $format,
  $friendlyName,
  $functions2 as $functions,
  $inspectType,
  $inspectTypeName,
  $invisible,
  $key,
  $maxItems,
  $maxLength,
  $maxValue,
  $maxValueExclusive,
  $minItems,
  $minLength,
  $minValue,
  $minValueExclusive,
  $opExample,
  $overload,
  $parameterVisibility,
  $pattern,
  $removeVisibility,
  $returnTypeVisibility,
  $returnsDoc,
  $secret,
  $service,
  $summary,
  $tag,
  $visibility,
  $withDefaultKeyVisibility,
  $withLifecycleUpdate,
  $withOptionalProperties,
  $withPickedProperties,
  $withUpdateableProperties,
  $withVisibility,
  $withVisibilityFilter,
  $withoutDefaultValues,
  $withoutOmittedProperties,
  EmptyVisibilityProvider,
  ListenerFlow,
  MANIFEST,
  NoTarget,
  NodeHost,
  Numeric,
  TypeSpecLanguageConfiguration,
  UnserializableValueError,
  UnsupportedScalarConstructorError,
  UsageFlags,
  VisibilityFilter,
  _TypeSpecLibrary_,
  addService,
  addVisibilityModifiers,
  applyCodeFix,
  applyCodeFixes,
  assertType,
  checkFormatTypeSpec,
  clearVisibilityModifiersForClass,
  compile,
  compilerAssert,
  createAddDecoratorCodeFix,
  createDiagnosticCollector,
  createLinterRule as createRule,
  createServer,
  createSourceFile,
  createSuppressCodeFix,
  createSuppressCodeFixes,
  createTypeSpecLibrary,
  defineCodeFix,
  defineLinter,
  definePackageFlags,
  defineTypeInfoProvider,
  discriminatedDecorator,
  emitFile,
  ensureTrailingDirectorySeparator,
  explainStringTemplateNotSerializable,
  fileRef,
  filterModelProperties,
  formatDiagnostic,
  printIdentifier as formatIdentifier,
  formatTypeSpec,
  getAllTags,
  getAnyExtensionFromPath,
  getAutoDecoratorTargets,
  getAutoDecoratorValue,
  getBaseFileName,
  getDeprecated,
  getDeprecationDetails,
  getDirectoryPath,
  getDiscriminatedTypes,
  getDiscriminatedUnion,
  getDiscriminatedUnionFromInheritance,
  getDiscriminator,
  getDoc,
  getDocData,
  getEffectiveModelType,
  getEncode,
  getEntityName,
  getErrorsDoc,
  getErrorsDocData,
  getExamples,
  getFormat,
  getFriendlyName,
  getKey as getKeyName,
  getLifecycleVisibilityEnum,
  getLocationContext,
  getMaxItems,
  getMaxItemsAsNumeric,
  getMaxLength,
  getMaxLengthAsNumeric,
  getMaxValue,
  getMaxValueAsNumeric,
  getMaxValueExclusive,
  getMaxValueExclusiveAsNumeric,
  getMaxValueExclusiveForScalar,
  getMaxValueForScalar,
  getMediaTypeHint,
  getMinItems,
  getMinItemsAsNumeric,
  getMinLength,
  getMinLengthAsNumeric,
  getMinValue,
  getMinValueAsNumeric,
  getMinValueExclusive,
  getMinValueExclusiveAsNumeric,
  getMinValueExclusiveForScalar,
  getMinValueForScalar,
  getNamespaceFullName,
  getNormalizedAbsolutePath,
  getNormalizedAbsolutePathWithoutRoot,
  getNormalizedPathComponents,
  getOpExamples,
  getOverloadedOperation,
  getOverloads,
  getPagingOperation,
  getParameterVisibilityFilter,
  getPathComponents,
  getPathFromPathComponents,
  getPattern,
  getPatternData,
  getPositionBeforeTrivia,
  getProperty,
  getPropertyType,
  getRelativePathFromDirectory,
  getReturnTypeVisibilityFilter,
  getReturnsDoc,
  getReturnsDocData,
  getRootLength,
  getService,
  getSourceFileKindFromExt,
  getSourceLocation,
  getSummary,
  getTags,
  getTypeName,
  getVisibilityForClass,
  hasAutoDecorator,
  hasTrailingDirectorySeparator,
  hasVisibility,
  ignoreDiagnostics,
  interpolatePath,
  isAnyDirectorySeparator,
  isArrayModelType,
  isDeclaredInNamespace,
  isDeclaredType,
  isDeprecated,
  isErrorModel,
  isErrorType,
  isFileRef,
  isGlobalNamespace,
  isKey,
  isList,
  isNeverType,
  isNullType,
  isNumeric,
  isNumericType,
  isPathAbsolute,
  isRecordModelType,
  isSealed,
  isSecret,
  isService,
  isStdNamespace,
  isStringType,
  isTemplateDeclaration,
  isTemplateDeclarationOrInstance,
  isTemplateInstance,
  isType,
  isTypeSpecValueTypeOf,
  isUnknownType,
  isUrl,
  isValue,
  isVisible,
  isVoidType,
  joinPaths,
  listOperationsIn,
  listServices,
  logDiagnostics,
  mapEventEmitterToNodeListener,
  markDeprecated,
  navigateProgram,
  navigateType,
  navigateTypesInNamespace,
  normalizePath,
  normalizeSlashes,
  paramMessage,
  printIdentifier,
  reducePathComponents,
  removeTrailingDirectorySeparator,
  removeVisibilityModifiers,
  reportDeprecated,
  resetVisibilityModifiersForClass,
  resolveCodeFix,
  resolveCompilerOptions,
  resolveEncodedName,
  resolveLinterDefinition,
  resolveModule,
  resolvePath,
  resolveUsages,
  sanitizePathSegment,
  scopeNavigationToNamespace,
  sealVisibilityModifiers,
  sealVisibilityModifiersForProgram,
  serializeValueAsJson,
  setAutoDecorator,
  setMediaTypeHint,
  setTypeSpecNamespace,
  typespecTypeToJson,
  validateDecoratorNotOnType,
  validateDecoratorUniqueOnNode,
  walkPropertiesInherited
};
/*! Bundled license information:

mustache/mustache.mjs:
  (*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   *)
*/
