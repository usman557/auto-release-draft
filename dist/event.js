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
exports.getCreatedTag = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function getCreatedTag() {
    if (github.context.eventName !== 'create') {
        // emit the info for the build log
        core.info(`The event name was ${github.context.eventName}`);
        return null;
    }
    if (github.context.payload.ref_type !== 'tag') {
        // emit the info for the build log
        core.info('The created reference was a branch instead of a tag');
        return null;
    }
    return github.context.payload.ref;
}
exports.getCreatedTag = getCreatedTag;
