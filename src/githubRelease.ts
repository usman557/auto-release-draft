import * as core from '@actions/core'
import * as github from '@actions/github'
import * as version from './version'

export async function createReleaseDraft(
    verstionTag: string,
    repoToken: string,
    changeLog: string | null): Promise<string> {
    
    const octokit= github.getOctokit(repoToken)

    if(changeLog){
        core.debug(`the changelosg is \n ${changeLog}`)
    }

    const response= await octokit.repos.createRelease({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        tag_name: verstionTag,
        name: version.removePrefix(verstionTag),
        body: 'THIS IS THE BODY OF THE DRAFT RELEASE FROM THE GIT HUB ACTION SAMPLE APP',
        prerelease: version.isPrerelease(verstionTag),
        draft: true
    })

    if(response.status !== 201){
        core.debug('RELEASE CREATION IS FAILED');
        core.info('RELEASE CREATION IS FAILED');
        throw new Error(`Failed to create the release: ${response.status}`)
    }    

    core.debug(`Created the release draft ${response.data.name}`)

    return response.data.html_url
}