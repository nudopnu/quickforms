import {
  HttpPayloadDisposition,
  Visibility,
  getAuthentication,
  getOperationVerb,
  getStatusCodeDescription,
  getStatusCodesWithDiagnostics,
  isSharedRoute,
  resolveHttpPayload,
  resolvePathAndParameters
} from "./chunk-R7B5QVKT.js";
import {
  HttpStateKeys,
  createDiagnostic,
  reportDiagnostic
} from "./chunk-DUKISKLN.js";

// node_modules/@typespec/http/dist/src/auth.js
import { deepEquals } from "@typespec/compiler/utils";
function getAuthenticationForOperation(program, operation) {
  const operationAuth = getAuthentication(program, operation);
  if (operationAuth) {
    return operationAuth;
  }
  if (operation.interface !== void 0) {
    const interfaceAuth = getAuthentication(program, operation.interface);
    if (interfaceAuth) {
      return interfaceAuth;
    }
  }
  let namespace = operation.namespace;
  while (namespace) {
    const namespaceAuth = getAuthentication(program, namespace);
    if (namespaceAuth) {
      return namespaceAuth;
    }
    namespace = namespace.namespace;
  }
  return void 0;
}
function resolveAuthentication(service) {
  let schemes = {};
  let defaultAuth = { options: [] };
  const operationsAuth = /* @__PURE__ */ new Map();
  if (service.authentication) {
    const { newServiceSchemes, authOptions } = gatherAuth(service.authentication, {});
    schemes = newServiceSchemes;
    defaultAuth = authOptions;
  }
  for (const op of service.operations) {
    if (op.authentication) {
      const { newServiceSchemes, authOptions } = gatherAuth(op.authentication, schemes);
      schemes = newServiceSchemes;
      operationsAuth.set(op.operation, authOptions);
    }
  }
  return { schemes: Object.values(schemes), defaultAuth, operationsAuth };
}
function gatherAuth(authentication, serviceSchemes) {
  const newServiceSchemes = serviceSchemes;
  const authOptions = { options: [] };
  for (const option of authentication.options) {
    const authOption = { all: [] };
    for (const optionScheme of option.schemes) {
      const serviceScheme = serviceSchemes[optionScheme.id];
      let newServiceScheme = optionScheme;
      if (serviceScheme) {
        if (!authsAreEqual(serviceScheme, optionScheme)) {
          while (serviceSchemes[newServiceScheme.id]) {
            newServiceScheme.id = newServiceScheme.id + "_";
          }
        } else if (serviceScheme.type === "oauth2" && optionScheme.type === "oauth2") {
          const x = mergeOAuthScopes(serviceScheme, optionScheme);
          newServiceScheme = x;
        }
      }
      const httpAuthRef = makeHttpAuthRef(optionScheme, newServiceScheme);
      newServiceSchemes[newServiceScheme.id] = newServiceScheme;
      authOption.all.push(httpAuthRef);
    }
    authOptions.options.push(authOption);
  }
  return { newServiceSchemes, authOptions };
}
function makeHttpAuthRef(local, reference) {
  if (reference.type === "oauth2" && local.type === "oauth2") {
    const scopes = /* @__PURE__ */ new Set();
    for (const flow of local.flows) {
      for (const scope of flow.scopes) {
        scopes.add(scope.value);
      }
    }
    return { kind: "oauth2", auth: reference, scopes: Array.from(scopes) };
  } else if (reference.type === "noAuth") {
    return { kind: "noAuth", auth: reference };
  } else {
    const scopes = local.type === "openIdConnect" ? local.scopes ?? [] : [];
    return { kind: "any", auth: reference, scopes };
  }
}
function mergeOAuthScopes(scheme1, scheme2) {
  const flows = structuredClone(scheme1.flows);
  flows.forEach((flow1, i) => {
    const flow2 = scheme2.flows[i];
    const scopes = Array.from(new Set(flow1.scopes.concat(flow2.scopes)));
    flows[i].scopes = scopes;
  });
  return {
    ...scheme1,
    flows
  };
}
function ignoreScopes(scheme) {
  const flows = structuredClone(scheme.flows);
  flows.forEach((flow) => {
    flow.scopes = [];
  });
  return {
    ...scheme,
    flows
  };
}
function authsAreEqual(scheme1, scheme2) {
  const { model: _model1, ...withoutModel1 } = scheme1;
  const { model: _model2, ...withoutModel2 } = scheme2;
  if (withoutModel1.type === "oauth2" && withoutModel2.type === "oauth2") {
    return deepEquals(ignoreScopes(withoutModel1), ignoreScopes(withoutModel2));
  }
  if (withoutModel1.type === "openIdConnect" && withoutModel2.type === "openIdConnect") {
    return deepEquals({ ...withoutModel1, scopes: [] }, { ...withoutModel2, scopes: [] });
  }
  return deepEquals(withoutModel1, withoutModel2);
}

// node_modules/@typespec/http/dist/src/responses.js
import { createDiagnosticCollector, getDoc, getErrorsDoc, getReturnsDoc, isErrorModel, isNullType, isVoidType } from "@typespec/compiler";
import { $ } from "@typespec/compiler/typekit";
function getResponsesForOperation(program, operation) {
  const diagnostics = createDiagnosticCollector();
  const responses = new ResponseIndex();
  const variants = resolveResponseVariants(program, operation.returnType);
  for (const { type, description } of variants) {
    processResponseType(program, diagnostics, operation, responses, type, description);
  }
  return diagnostics.wrap(responses.values());
}
function resolveResponseVariants(program, responseType, parentDescription) {
  const tk = $(program);
  if (!tk.union.is(responseType) || tk.union.getDiscriminatedUnion(responseType)) {
    return [{ type: responseType, description: parentDescription }];
  }
  const unionDescription = getDoc(program, responseType) ?? parentDescription;
  const plainVariants = [];
  const responseEnvelopes = [];
  for (const option of responseType.variants.values()) {
    if (isNullType(option.type)) {
      continue;
    }
    const resolved = resolveResponseVariants(program, option.type, getDoc(program, option) ?? unionDescription);
    for (const variant of resolved) {
      if (isPlainResponseBody(program, variant.type)) {
        plainVariants.push(variant.type);
      } else {
        responseEnvelopes.push(variant);
      }
    }
  }
  const results = [];
  if (plainVariants.length === 1) {
    results.push({ type: plainVariants[0], description: unionDescription });
  } else if (plainVariants.length > 1) {
    const unionType = responseEnvelopes.length === 0 ? responseType : tk.union.create(plainVariants);
    results.push({ type: unionType, description: unionDescription });
  }
  results.push(...responseEnvelopes);
  return results;
}
var ResponseIndex = class {
  #index = /* @__PURE__ */ new Map();
  get(statusCode) {
    return this.#index.get(this.#indexKey(statusCode));
  }
  set(statusCode, response) {
    this.#index.set(this.#indexKey(statusCode), response);
  }
  values() {
    return [...this.#index.values()];
  }
  #indexKey(statusCode) {
    if (typeof statusCode === "number" || statusCode === "*") {
      return String(statusCode);
    } else {
      return `${statusCode.start}-${statusCode.end}`;
    }
  }
};
function processResponseType(program, diagnostics, operation, responses, responseType, parentDescription) {
  const verb = getOperationVerb(program, operation);
  let { body: resolvedBody, metadata } = diagnostics.pipe(resolveHttpPayload(program, responseType, Visibility.Read, HttpPayloadDisposition.Response, {
    treatContentTypeAsHeader: verb === "head"
  }));
  const statusCodes = diagnostics.pipe(getResponseStatusCodes(program, responseType, metadata));
  const headers = getResponseHeaders(program, metadata);
  if (statusCodes.length === 0) {
    if (isErrorModel(program, responseType)) {
      statusCodes.push("*");
    } else if (isVoidType(responseType)) {
      resolvedBody = void 0;
      statusCodes.push(204);
    } else if (resolvedBody === void 0 || isVoidType(resolvedBody.type)) {
      resolvedBody = void 0;
      statusCodes.push(200);
    } else {
      statusCodes.push(200);
    }
  }
  for (const statusCode of statusCodes) {
    const response = responses.get(statusCode) ?? {
      statusCodes: statusCode,
      type: responseType,
      description: getResponseDescription(program, operation, responseType, statusCode, metadata, parentDescription),
      responses: []
    };
    if (resolvedBody !== void 0) {
      response.responses.push({
        body: resolvedBody,
        headers,
        properties: metadata
      });
    } else {
      response.responses.push({ headers, properties: metadata });
    }
    responses.set(statusCode, response);
  }
}
function getResponseStatusCodes(program, responseType, metadata) {
  const codes = [];
  const diagnostics = createDiagnosticCollector();
  let statusFound = false;
  for (const prop of metadata) {
    if (prop.kind === "statusCode") {
      if (statusFound) {
        reportDiagnostic(program, {
          code: "multiple-status-codes",
          target: responseType
        });
      }
      statusFound = true;
      codes.push(...diagnostics.pipe(getStatusCodesWithDiagnostics(program, prop.property)));
    }
  }
  if (responseType.kind === "Model") {
    for (let t = responseType; t; t = t.baseModel) {
      codes.push(...getExplicitSetStatusCode(program, t));
    }
  }
  return diagnostics.wrap(codes);
}
function getExplicitSetStatusCode(program, entity) {
  return program.stateMap(HttpStateKeys.statusCode).get(entity) ?? [];
}
function getResponseHeaders(program, metadata) {
  const responseHeaders = {};
  for (const prop of metadata) {
    if (prop.kind === "header") {
      responseHeaders[prop.options.name] = prop.property;
    }
  }
  return responseHeaders;
}
function isResponseEnvelope(metadata) {
  return metadata.some((prop) => prop.kind === "body" || prop.kind === "bodyRoot" || prop.kind === "multipartBody" || prop.kind === "statusCode");
}
function isPlainResponseBody(program, type) {
  if (isVoidType(type) || isErrorModel(program, type)) {
    return false;
  }
  if (type.kind === "Model" && getExplicitSetStatusCode(program, type).length > 0) {
    return false;
  }
  const [result] = resolveHttpPayload(program, type, Visibility.Read, HttpPayloadDisposition.Response);
  return !result || !result.metadata.some((p) => p.kind !== "bodyProperty");
}
function getResponseDescription(program, operation, responseType, statusCode, metadata, parentDescription) {
  if (parentDescription) {
    return parentDescription;
  }
  if (isResponseEnvelope(metadata)) {
    const desc2 = getDoc(program, responseType);
    if (desc2) {
      return desc2;
    }
  }
  const desc = isErrorModel(program, responseType) ? getErrorsDoc(program, operation) : getReturnsDoc(program, operation);
  if (desc) {
    return desc;
  }
  return getStatusCodeDescription(statusCode);
}

// node_modules/@typespec/http/dist/src/operations.js
import { createDiagnosticCollector as createDiagnosticCollector2, getLocationContext, getOverloadedOperation, getOverloads, listOperationsIn, listServices, navigateProgram } from "@typespec/compiler";
import { unsafe_useCache as useCache } from "@typespec/compiler/experimental";
var httpOperationCacheKey = /* @__PURE__ */ Symbol.for("@typespec/http.httpOperationCache");
function getHttpOperation(program, operation, options) {
  if (!options) {
    return useCache(program, httpOperationCacheKey, operation, () => getHttpOperationInternal(program, operation, options, /* @__PURE__ */ new Map()));
  }
  return getHttpOperationInternal(program, operation, options, /* @__PURE__ */ new Map());
}
function listHttpOperationsIn(program, container, options) {
  const diagnostics = createDiagnosticCollector2();
  const operations = listOperationsIn(container, options?.listOptions);
  const cache = /* @__PURE__ */ new Map();
  const httpOperations = operations.map((x) => diagnostics.pipe(getHttpOperationInternal(program, x, options, cache)));
  return diagnostics.wrap(httpOperations);
}
function getAllHttpServices(program, options) {
  const diagnostics = createDiagnosticCollector2();
  const serviceNamespaces = listServices(program);
  const services = serviceNamespaces.map((x) => diagnostics.pipe(getHttpService(program, x.type, options)));
  if (serviceNamespaces.length === 0) {
    services.push(diagnostics.pipe(getHttpService(program, program.getGlobalNamespaceType(), options)));
  }
  return diagnostics.wrap(services);
}
function getHttpService(program, serviceNamespace, options) {
  const diagnostics = createDiagnosticCollector2();
  const httpOperations = diagnostics.pipe(listHttpOperationsIn(program, serviceNamespace, {
    ...options,
    listOptions: {
      recursive: serviceNamespace !== program.getGlobalNamespaceType()
    }
  }));
  const authentication = getAuthentication(program, serviceNamespace);
  validateRouteUnique(program, diagnostics, httpOperations);
  const service = {
    namespace: serviceNamespace,
    operations: httpOperations,
    authentication
  };
  return diagnostics.wrap(service);
}
function reportIfNoRoutes(program, routes) {
  const services = listServices(program);
  if (services.length === 0) {
    navigateProgram(program, {
      namespace: (namespace) => {
        if (namespace.name === "") {
          return;
        }
        const locationContext = getLocationContext(program, namespace);
        if (namespace.operations.size > 0 && locationContext.type === "project") {
          reportDiagnostic(program, {
            code: "no-service-found",
            format: {
              namespace: namespace.name
            },
            target: namespace
          });
        }
      }
    });
  }
}
function validateRouteUnique(program, diagnostics, operations) {
  const grouped = /* @__PURE__ */ new Map();
  for (const operation of operations) {
    const { verb, path } = operation;
    if (operation.overloading !== void 0 && isOverloadSameEndpoint(operation)) {
      continue;
    }
    if (isSharedRoute(program, operation.operation)) {
      continue;
    }
    let map = grouped.get(path);
    if (map === void 0) {
      map = /* @__PURE__ */ new Map();
      grouped.set(path, map);
    }
    let list = map.get(verb);
    if (list === void 0) {
      list = [];
      map.set(verb, list);
    }
    list.push(operation);
  }
  for (const [path, map] of grouped) {
    for (const [verb, routes] of map) {
      if (routes.length >= 2) {
        for (const route of routes) {
          diagnostics.add(createDiagnostic({
            code: "duplicate-operation",
            format: { path, verb, operationName: route.operation.name },
            target: route.operation
          }));
        }
      }
    }
  }
}
function isOverloadSameEndpoint(overload) {
  return overload.path === overload.overloading.path && overload.verb === overload.overloading.verb;
}
function getHttpOperationInternal(program, operation, options, cache) {
  const existing = cache.get(operation);
  if (existing) {
    return [existing, []];
  }
  const diagnostics = createDiagnosticCollector2();
  const httpOperationRef = { operation };
  cache.set(operation, httpOperationRef);
  const overloadBase = getOverloadedOperation(program, operation);
  let overloading;
  if (overloadBase) {
    overloading = httpOperationRef.overloading = diagnostics.pipe(getHttpOperationInternal(program, overloadBase, options, cache));
  }
  const route = diagnostics.pipe(resolvePathAndParameters(program, operation, overloading, options ?? {}));
  const responses = diagnostics.pipe(getResponsesForOperation(program, operation));
  const authentication = getAuthenticationForOperation(program, operation);
  const httpOperation = {
    path: route.path,
    uriTemplate: route.uriTemplate,
    verb: route.parameters.verb,
    container: operation.interface ?? operation.namespace ?? program.getGlobalNamespaceType(),
    parameters: route.parameters,
    responses,
    operation,
    authentication
  };
  Object.assign(httpOperationRef, httpOperation);
  const overloads = getOverloads(program, operation);
  if (overloads) {
    httpOperationRef.overloads = overloads.map((x) => diagnostics.pipe(getHttpOperationInternal(program, x, options, cache)));
  }
  return diagnostics.wrap(httpOperationRef);
}

export {
  getAuthenticationForOperation,
  resolveAuthentication,
  getResponsesForOperation,
  getHttpOperation,
  listHttpOperationsIn,
  getAllHttpServices,
  getHttpService,
  reportIfNoRoutes,
  isOverloadSameEndpoint
};
