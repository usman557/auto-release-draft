"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePrefix = exports.isPrerelease = exports.isSemVer = void 0;
const semver = __importStar(require("semver"));
function isSemVer(version) {
    return semver.valid(version) !== null;
}
exports.isSemVer = isSemVer;
function isPrerelease(version) {
    return semver.prerelease(version) !== null;
}
exports.isPrerelease = isPrerelease;
function removePrefix(version) {
    const parsedVersion = semver.valid(version);
    return parsedVersion ? parsedVersion : version;
}
exports.removePrefix = removePrefix;
