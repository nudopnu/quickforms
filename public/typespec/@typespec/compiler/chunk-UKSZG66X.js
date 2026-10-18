import {
  init_define_process_env
} from "./chunk-D557AYM7.js";

// node_modules/@typespec/compiler/dist/src/core/path-utils.js
init_define_process_env();
var directorySeparator = "/";
var altDirectorySeparator = "\\";
var urlSchemeSeparator = "://";
var backslashRegExp = /\\/g;
var relativePathSegmentRegExp = /(?:\/\/)|(?:^|\/)\.\.?(?:$|\/)/;
function isAnyDirectorySeparator(charCode) {
  return charCode === CharacterCodes.slash || charCode === CharacterCodes.backslash;
}
function isUrl(path) {
  return getEncodedRootLength(path) < 0;
}
function isPathAbsolute(path) {
  return getEncodedRootLength(path) !== 0;
}
function isVolumeCharacter(charCode) {
  return charCode >= CharacterCodes.a && charCode <= CharacterCodes.z || charCode >= CharacterCodes.A && charCode <= CharacterCodes.Z;
}
function getFileUrlVolumeSeparatorEnd(url, start) {
  const ch0 = url.charCodeAt(start);
  if (ch0 === CharacterCodes.colon)
    return start + 1;
  if (ch0 === CharacterCodes.percent && url.charCodeAt(start + 1) === CharacterCodes._3) {
    const ch2 = url.charCodeAt(start + 2);
    if (ch2 === CharacterCodes.a || ch2 === CharacterCodes.A)
      return start + 3;
  }
  return -1;
}
function getRootLength(path) {
  const rootLength = getEncodedRootLength(path);
  return rootLength < 0 ? ~rootLength : rootLength;
}
function getEncodedRootLength(path) {
  if (!path)
    return 0;
  const ch0 = path.charCodeAt(0);
  if (ch0 === CharacterCodes.slash || ch0 === CharacterCodes.backslash) {
    if (path.charCodeAt(1) !== ch0)
      return 1;
    const p1 = path.indexOf(ch0 === CharacterCodes.slash ? directorySeparator : altDirectorySeparator, 2);
    if (p1 < 0)
      return path.length;
    return p1 + 1;
  }
  if (isVolumeCharacter(ch0) && path.charCodeAt(1) === CharacterCodes.colon) {
    const ch2 = path.charCodeAt(2);
    if (ch2 === CharacterCodes.slash || ch2 === CharacterCodes.backslash)
      return 3;
    if (path.length === 2)
      return 2;
  }
  const schemeEnd = path.indexOf(urlSchemeSeparator);
  if (schemeEnd !== -1) {
    const authorityStart = schemeEnd + urlSchemeSeparator.length;
    const authorityEnd = path.indexOf(directorySeparator, authorityStart);
    if (authorityEnd !== -1) {
      const scheme = path.slice(0, schemeEnd);
      const authority = path.slice(authorityStart, authorityEnd);
      if (scheme === "file" && (authority === "" || authority === "localhost") && isVolumeCharacter(path.charCodeAt(authorityEnd + 1))) {
        const volumeSeparatorEnd = getFileUrlVolumeSeparatorEnd(path, authorityEnd + 2);
        if (volumeSeparatorEnd !== -1) {
          if (path.charCodeAt(volumeSeparatorEnd) === CharacterCodes.slash) {
            return ~(volumeSeparatorEnd + 1);
          }
          if (volumeSeparatorEnd === path.length) {
            return ~volumeSeparatorEnd;
          }
        }
      }
      return ~(authorityEnd + 1);
    }
    return ~path.length;
  }
  return 0;
}
function getDirectoryPath(path) {
  path = normalizeSlashes(path);
  const rootLength = getRootLength(path);
  if (rootLength === path.length)
    return path;
  path = removeTrailingDirectorySeparator(path);
  return path.slice(0, Math.max(rootLength, path.lastIndexOf(directorySeparator)));
}
function getBaseFileName(path) {
  path = normalizeSlashes(path);
  const rootLength = getRootLength(path);
  if (rootLength === path.length)
    return "";
  path = removeTrailingDirectorySeparator(path);
  return path.slice(Math.max(getRootLength(path), path.lastIndexOf(directorySeparator) + 1));
}
function getAnyExtensionFromPath(path) {
  const baseFileName = getBaseFileName(path);
  const extensionIndex = baseFileName.lastIndexOf(".");
  if (extensionIndex >= 0) {
    return baseFileName.substring(extensionIndex).toLowerCase();
  }
  return "";
}
function pathComponents(path, rootLength) {
  const root = path.substring(0, rootLength);
  const rest = path.substring(rootLength).split(directorySeparator);
  if (rest.length && !rest[rest.length - 1])
    rest.pop();
  return [root, ...rest];
}
function getPathComponents(path, currentDirectory = "") {
  path = joinPaths(currentDirectory, path);
  return pathComponents(path, getRootLength(path));
}
function reducePathComponents(components) {
  if (!components.some((x) => x !== void 0))
    return [];
  const reduced = [components[0]];
  for (let i = 1; i < components.length; i++) {
    const component = components[i];
    if (!component)
      continue;
    if (component === ".")
      continue;
    if (component === "..") {
      if (reduced.length > 1) {
        if (reduced[reduced.length - 1] !== "..") {
          reduced.pop();
          continue;
        }
      } else if (reduced[0])
        continue;
    }
    reduced.push(component);
  }
  return reduced;
}
function joinPaths(path, ...paths) {
  if (path)
    path = normalizeSlashes(path);
  for (let relativePath of paths) {
    if (!relativePath)
      continue;
    relativePath = normalizeSlashes(relativePath);
    if (!path || getRootLength(relativePath) !== 0) {
      path = relativePath;
    } else {
      path = ensureTrailingDirectorySeparator(path) + relativePath;
    }
  }
  return path;
}
function resolvePath(path, ...paths) {
  return normalizePath(paths.some((x) => x !== void 0) ? joinPaths(path, ...paths) : normalizeSlashes(path));
}
function getNormalizedPathComponents(path, currentDirectory) {
  return reducePathComponents(getPathComponents(path, currentDirectory));
}
function getNormalizedAbsolutePath(fileName, currentDirectory) {
  return getPathFromPathComponents(getNormalizedPathComponents(fileName, currentDirectory));
}
function normalizePath(path) {
  path = normalizeSlashes(path);
  if (!relativePathSegmentRegExp.test(path)) {
    return path;
  }
  const simplified = path.replace(/\/\.\//g, "/").replace(/^\.\//, "");
  if (simplified !== path) {
    path = simplified;
    if (!relativePathSegmentRegExp.test(path)) {
      return path;
    }
  }
  const normalized = getPathFromPathComponents(reducePathComponents(getPathComponents(path)));
  return normalized && hasTrailingDirectorySeparator(path) ? ensureTrailingDirectorySeparator(normalized) : normalized;
}
function getPathWithoutRoot(pathComponents2) {
  if (pathComponents2.length === 0)
    return "";
  return pathComponents2.slice(1).join(directorySeparator);
}
function getNormalizedAbsolutePathWithoutRoot(fileName, currentDirectory) {
  return getPathWithoutRoot(getNormalizedPathComponents(fileName, currentDirectory));
}
function getPathFromPathComponents(pathComponents2) {
  if (pathComponents2.length === 0)
    return "";
  const root = pathComponents2[0] && ensureTrailingDirectorySeparator(pathComponents2[0]);
  return root + pathComponents2.slice(1).join(directorySeparator);
}
function removeTrailingDirectorySeparator(path) {
  if (hasTrailingDirectorySeparator(path)) {
    return path.substring(0, path.length - 1);
  }
  return path;
}
function ensureTrailingDirectorySeparator(path) {
  if (!hasTrailingDirectorySeparator(path)) {
    return path + directorySeparator;
  }
  return path;
}
function hasTrailingDirectorySeparator(path) {
  return path.length > 0 && isAnyDirectorySeparator(path.charCodeAt(path.length - 1));
}
function normalizeSlashes(path) {
  const index = path.indexOf("\\");
  if (index === -1) {
    return path;
  }
  backslashRegExp.lastIndex = index;
  return path.replace(backslashRegExp, directorySeparator);
}
function equateValues(a, b) {
  return a === b;
}
function equateStringsCaseInsensitive(a, b) {
  return a === b || a !== void 0 && b !== void 0 && a.toUpperCase() === b.toUpperCase();
}
function equateStringsCaseSensitive(a, b) {
  return equateValues(a, b);
}
function identity(x) {
  return x;
}
function getPathComponentsRelativeTo(from, to, stringEqualityComparer, getCanonicalFileName) {
  const fromComponents = reducePathComponents(getPathComponents(from));
  const toComponents = reducePathComponents(getPathComponents(to));
  let start;
  for (start = 0; start < fromComponents.length && start < toComponents.length; start++) {
    const fromComponent = getCanonicalFileName(fromComponents[start]);
    const toComponent = getCanonicalFileName(toComponents[start]);
    const comparer = start === 0 ? equateStringsCaseInsensitive : stringEqualityComparer;
    if (!comparer(fromComponent, toComponent))
      break;
  }
  if (start === 0) {
    return toComponents;
  }
  const components = toComponents.slice(start);
  const relative = [];
  for (; start < fromComponents.length; start++) {
    relative.push("..");
  }
  return ["", ...relative, ...components];
}
function getRelativePathFromDirectory(fromDirectory, to, getCanonicalFileNameOrIgnoreCase) {
  if (getRootLength(fromDirectory) > 0 !== getRootLength(to) > 0) {
    throw new Error("Paths must either both be absolute or both be relative");
  }
  const getCanonicalFileName = typeof getCanonicalFileNameOrIgnoreCase === "function" ? getCanonicalFileNameOrIgnoreCase : identity;
  const ignoreCase = typeof getCanonicalFileNameOrIgnoreCase === "boolean" ? getCanonicalFileNameOrIgnoreCase : false;
  const pathComponents2 = getPathComponentsRelativeTo(fromDirectory, to, ignoreCase ? equateStringsCaseInsensitive : equateStringsCaseSensitive, getCanonicalFileName);
  return getPathFromPathComponents(pathComponents2);
}
var CharacterCodes;
(function(CharacterCodes2) {
  CharacterCodes2[CharacterCodes2["nullCharacter"] = 0] = "nullCharacter";
  CharacterCodes2[CharacterCodes2["maxAsciiCharacter"] = 127] = "maxAsciiCharacter";
  CharacterCodes2[CharacterCodes2["lineFeed"] = 10] = "lineFeed";
  CharacterCodes2[CharacterCodes2["carriageReturn"] = 13] = "carriageReturn";
  CharacterCodes2[CharacterCodes2["lineSeparator"] = 8232] = "lineSeparator";
  CharacterCodes2[CharacterCodes2["paragraphSeparator"] = 8233] = "paragraphSeparator";
  CharacterCodes2[CharacterCodes2["nextLine"] = 133] = "nextLine";
  CharacterCodes2[CharacterCodes2["space"] = 32] = "space";
  CharacterCodes2[CharacterCodes2["nonBreakingSpace"] = 160] = "nonBreakingSpace";
  CharacterCodes2[CharacterCodes2["enQuad"] = 8192] = "enQuad";
  CharacterCodes2[CharacterCodes2["emQuad"] = 8193] = "emQuad";
  CharacterCodes2[CharacterCodes2["enSpace"] = 8194] = "enSpace";
  CharacterCodes2[CharacterCodes2["emSpace"] = 8195] = "emSpace";
  CharacterCodes2[CharacterCodes2["threePerEmSpace"] = 8196] = "threePerEmSpace";
  CharacterCodes2[CharacterCodes2["fourPerEmSpace"] = 8197] = "fourPerEmSpace";
  CharacterCodes2[CharacterCodes2["sixPerEmSpace"] = 8198] = "sixPerEmSpace";
  CharacterCodes2[CharacterCodes2["figureSpace"] = 8199] = "figureSpace";
  CharacterCodes2[CharacterCodes2["punctuationSpace"] = 8200] = "punctuationSpace";
  CharacterCodes2[CharacterCodes2["thinSpace"] = 8201] = "thinSpace";
  CharacterCodes2[CharacterCodes2["hairSpace"] = 8202] = "hairSpace";
  CharacterCodes2[CharacterCodes2["zeroWidthSpace"] = 8203] = "zeroWidthSpace";
  CharacterCodes2[CharacterCodes2["narrowNoBreakSpace"] = 8239] = "narrowNoBreakSpace";
  CharacterCodes2[CharacterCodes2["ideographicSpace"] = 12288] = "ideographicSpace";
  CharacterCodes2[CharacterCodes2["mathematicalSpace"] = 8287] = "mathematicalSpace";
  CharacterCodes2[CharacterCodes2["ogham"] = 5760] = "ogham";
  CharacterCodes2[CharacterCodes2["_"] = 95] = "_";
  CharacterCodes2[CharacterCodes2["$"] = 36] = "$";
  CharacterCodes2[CharacterCodes2["_0"] = 48] = "_0";
  CharacterCodes2[CharacterCodes2["_1"] = 49] = "_1";
  CharacterCodes2[CharacterCodes2["_2"] = 50] = "_2";
  CharacterCodes2[CharacterCodes2["_3"] = 51] = "_3";
  CharacterCodes2[CharacterCodes2["_4"] = 52] = "_4";
  CharacterCodes2[CharacterCodes2["_5"] = 53] = "_5";
  CharacterCodes2[CharacterCodes2["_6"] = 54] = "_6";
  CharacterCodes2[CharacterCodes2["_7"] = 55] = "_7";
  CharacterCodes2[CharacterCodes2["_8"] = 56] = "_8";
  CharacterCodes2[CharacterCodes2["_9"] = 57] = "_9";
  CharacterCodes2[CharacterCodes2["a"] = 97] = "a";
  CharacterCodes2[CharacterCodes2["b"] = 98] = "b";
  CharacterCodes2[CharacterCodes2["c"] = 99] = "c";
  CharacterCodes2[CharacterCodes2["d"] = 100] = "d";
  CharacterCodes2[CharacterCodes2["e"] = 101] = "e";
  CharacterCodes2[CharacterCodes2["f"] = 102] = "f";
  CharacterCodes2[CharacterCodes2["g"] = 103] = "g";
  CharacterCodes2[CharacterCodes2["h"] = 104] = "h";
  CharacterCodes2[CharacterCodes2["i"] = 105] = "i";
  CharacterCodes2[CharacterCodes2["j"] = 106] = "j";
  CharacterCodes2[CharacterCodes2["k"] = 107] = "k";
  CharacterCodes2[CharacterCodes2["l"] = 108] = "l";
  CharacterCodes2[CharacterCodes2["m"] = 109] = "m";
  CharacterCodes2[CharacterCodes2["n"] = 110] = "n";
  CharacterCodes2[CharacterCodes2["o"] = 111] = "o";
  CharacterCodes2[CharacterCodes2["p"] = 112] = "p";
  CharacterCodes2[CharacterCodes2["q"] = 113] = "q";
  CharacterCodes2[CharacterCodes2["r"] = 114] = "r";
  CharacterCodes2[CharacterCodes2["s"] = 115] = "s";
  CharacterCodes2[CharacterCodes2["t"] = 116] = "t";
  CharacterCodes2[CharacterCodes2["u"] = 117] = "u";
  CharacterCodes2[CharacterCodes2["v"] = 118] = "v";
  CharacterCodes2[CharacterCodes2["w"] = 119] = "w";
  CharacterCodes2[CharacterCodes2["x"] = 120] = "x";
  CharacterCodes2[CharacterCodes2["y"] = 121] = "y";
  CharacterCodes2[CharacterCodes2["z"] = 122] = "z";
  CharacterCodes2[CharacterCodes2["A"] = 65] = "A";
  CharacterCodes2[CharacterCodes2["B"] = 66] = "B";
  CharacterCodes2[CharacterCodes2["C"] = 67] = "C";
  CharacterCodes2[CharacterCodes2["D"] = 68] = "D";
  CharacterCodes2[CharacterCodes2["E"] = 69] = "E";
  CharacterCodes2[CharacterCodes2["F"] = 70] = "F";
  CharacterCodes2[CharacterCodes2["G"] = 71] = "G";
  CharacterCodes2[CharacterCodes2["H"] = 72] = "H";
  CharacterCodes2[CharacterCodes2["I"] = 73] = "I";
  CharacterCodes2[CharacterCodes2["J"] = 74] = "J";
  CharacterCodes2[CharacterCodes2["K"] = 75] = "K";
  CharacterCodes2[CharacterCodes2["L"] = 76] = "L";
  CharacterCodes2[CharacterCodes2["M"] = 77] = "M";
  CharacterCodes2[CharacterCodes2["N"] = 78] = "N";
  CharacterCodes2[CharacterCodes2["O"] = 79] = "O";
  CharacterCodes2[CharacterCodes2["P"] = 80] = "P";
  CharacterCodes2[CharacterCodes2["Q"] = 81] = "Q";
  CharacterCodes2[CharacterCodes2["R"] = 82] = "R";
  CharacterCodes2[CharacterCodes2["S"] = 83] = "S";
  CharacterCodes2[CharacterCodes2["T"] = 84] = "T";
  CharacterCodes2[CharacterCodes2["U"] = 85] = "U";
  CharacterCodes2[CharacterCodes2["V"] = 86] = "V";
  CharacterCodes2[CharacterCodes2["W"] = 87] = "W";
  CharacterCodes2[CharacterCodes2["X"] = 88] = "X";
  CharacterCodes2[CharacterCodes2["Y"] = 89] = "Y";
  CharacterCodes2[CharacterCodes2["Z"] = 90] = "Z";
  CharacterCodes2[CharacterCodes2["ampersand"] = 38] = "ampersand";
  CharacterCodes2[CharacterCodes2["asterisk"] = 42] = "asterisk";
  CharacterCodes2[CharacterCodes2["at"] = 64] = "at";
  CharacterCodes2[CharacterCodes2["backslash"] = 92] = "backslash";
  CharacterCodes2[CharacterCodes2["backtick"] = 96] = "backtick";
  CharacterCodes2[CharacterCodes2["bar"] = 124] = "bar";
  CharacterCodes2[CharacterCodes2["caret"] = 94] = "caret";
  CharacterCodes2[CharacterCodes2["closeBrace"] = 125] = "closeBrace";
  CharacterCodes2[CharacterCodes2["closeBracket"] = 93] = "closeBracket";
  CharacterCodes2[CharacterCodes2["closeParen"] = 41] = "closeParen";
  CharacterCodes2[CharacterCodes2["colon"] = 58] = "colon";
  CharacterCodes2[CharacterCodes2["comma"] = 44] = "comma";
  CharacterCodes2[CharacterCodes2["dot"] = 46] = "dot";
  CharacterCodes2[CharacterCodes2["doubleQuote"] = 34] = "doubleQuote";
  CharacterCodes2[CharacterCodes2["equals"] = 61] = "equals";
  CharacterCodes2[CharacterCodes2["exclamation"] = 33] = "exclamation";
  CharacterCodes2[CharacterCodes2["greaterThan"] = 62] = "greaterThan";
  CharacterCodes2[CharacterCodes2["hash"] = 35] = "hash";
  CharacterCodes2[CharacterCodes2["lessThan"] = 60] = "lessThan";
  CharacterCodes2[CharacterCodes2["minus"] = 45] = "minus";
  CharacterCodes2[CharacterCodes2["openBrace"] = 123] = "openBrace";
  CharacterCodes2[CharacterCodes2["openBracket"] = 91] = "openBracket";
  CharacterCodes2[CharacterCodes2["openParen"] = 40] = "openParen";
  CharacterCodes2[CharacterCodes2["percent"] = 37] = "percent";
  CharacterCodes2[CharacterCodes2["plus"] = 43] = "plus";
  CharacterCodes2[CharacterCodes2["question"] = 63] = "question";
  CharacterCodes2[CharacterCodes2["semicolon"] = 59] = "semicolon";
  CharacterCodes2[CharacterCodes2["singleQuote"] = 39] = "singleQuote";
  CharacterCodes2[CharacterCodes2["slash"] = 47] = "slash";
  CharacterCodes2[CharacterCodes2["tilde"] = 126] = "tilde";
  CharacterCodes2[CharacterCodes2["backspace"] = 8] = "backspace";
  CharacterCodes2[CharacterCodes2["formFeed"] = 12] = "formFeed";
  CharacterCodes2[CharacterCodes2["byteOrderMark"] = 65279] = "byteOrderMark";
  CharacterCodes2[CharacterCodes2["tab"] = 9] = "tab";
  CharacterCodes2[CharacterCodes2["verticalTab"] = 11] = "verticalTab";
})(CharacterCodes || (CharacterCodes = {}));

export {
  isAnyDirectorySeparator,
  isUrl,
  isPathAbsolute,
  getRootLength,
  getDirectoryPath,
  getBaseFileName,
  getAnyExtensionFromPath,
  getPathComponents,
  reducePathComponents,
  joinPaths,
  resolvePath,
  getNormalizedPathComponents,
  getNormalizedAbsolutePath,
  normalizePath,
  getNormalizedAbsolutePathWithoutRoot,
  getPathFromPathComponents,
  removeTrailingDirectorySeparator,
  ensureTrailingDirectorySeparator,
  hasTrailingDirectorySeparator,
  normalizeSlashes,
  getRelativePathFromDirectory
};
