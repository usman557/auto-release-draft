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
exports.createReleaseDraft = void 0;
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const version = __importStar(require("./version"));
function createReleaseDraft(verstionTag, repoToken, changeLog) {
    return __awaiter(this, void 0, void 0, function* () {
        const octokit = github.getOctokit(repoToken);
        if (changeLog) {
            core.debug(`the changelosg is \n ${changeLog}`);
        }
        const response = yield octokit.repos.createRelease({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            tag_name: verstionTag,
            name: version.removePrefix(verstionTag),
            body: 'THIS IS THE BODY OF THE DRAFT RELEASE FROM THE GIT HUB ACTION SAMPLE APP',
            prerelease: version.isPrerelease(verstionTag),
            draft: true
        });
        if (response.status !== 201) {
            core.debug('RELEASE CREATION IS FAILED');
            core.info('RELEASE CREATION IS FAILED');
            throw new Error(`Failed to create the release: ${response.status}`);
        }
        core.debug(`Created the release draft ${response.data.name}`);
        return response.data.html_url;
    });
}
exports.createReleaseDraft = createReleaseDraft;
