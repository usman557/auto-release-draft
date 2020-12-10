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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommitMessageFrom = exports.getCommitMessagesBetween = exports.getPreviousVersionTag = exports.getChangesFromTag = void 0;
const core = __importStar(require("@actions/core"));
const ex = __importStar(require("@actions/exec"));
function getChangesFromTag(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        const pTag = yield getPreviousVersionTag(tag);
        return pTag
            ? getCommitMessagesBetween(pTag, tag)
            : getCommitMessageFrom(tag);
    });
}
exports.getChangesFromTag = getChangesFromTag;
function getPreviousVersionTag(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        let pTag = '';
        const options = {
            listeners: {
                // Reading the OutPut
                stdout: (data) => {
                    pTag += data.toString();
                }
            },
            silent: true,
            ignoreReturnCode: true // don't fail if return code is not 0, means some error occurs
        };
        // Now use exec to execute the GIT commands from CLI
        // Command Name = git,
        // Command Arguments = [ describe = Get the Tag Names, --match = Regular Expression to get the version tags only, 
        // --abbrev = Get the tagName, --first-parent = only look for current branch ,   ]
        const exitCode = yield ex.exec('git', ['describe', '--match', 'v[0-9]*', '--abbrev=0', '--first-parent', `${tag}^`], options);
        core.debug(`The previouse version tag is ${pTag}`);
        return exitCode === 0 ? pTag.trim() : null;
    });
}
exports.getPreviousVersionTag = getPreviousVersionTag;
function getCommitMessagesBetween(firstTag, secondTag) {
    return __awaiter(this, void 0, void 0, function* () {
        let commitMessages = '';
        const options = {
            listeners: {
                // Reading the OutPut
                stdout: (data) => {
                    commitMessages += data.toString();
                }
            },
            silent: true //Hide the logging by Exec in build log, to show the custom log message        
        };
        // Now use exec to execute the GIT commands from CLI
        // Command Name = git,
        // Command Arguments = [ log = Get the commit messages, --format=%s, only print the first line of the message, range of tags]     
        yield ex.exec('git', ['log', '--format=%s', `${firstTag}..${secondTag}`], options);
        core.debug(`The commit message between ${firstTag} and ${secondTag} are \n ${commitMessages}`);
        return commitMessages;
    });
}
exports.getCommitMessagesBetween = getCommitMessagesBetween;
function getCommitMessageFrom(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        let commitMessages = '';
        const options = {
            listeners: {
                // Reading the OutPut
                stdout: (data) => {
                    commitMessages += data.toString();
                }
            },
            silent: true //Hide the logging by Exec in build log, to show the custom log message        
        };
        // Now use exec to execute the GIT commands from CLI
        // Command Name = git,
        // Command Arguments = [ log = Get the commit messages, --format=%s, only print the first line of the message]     
        yield ex.exec('git', ['log', '--format=%s', `${tag}`], options);
        core.debug(`The commit message from ${tag}  are \n ${commitMessages}`);
        return commitMessages;
    });
}
exports.getCommitMessageFrom = getCommitMessageFrom;
