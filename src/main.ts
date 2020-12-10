import * as core from '@actions/core'
import * as event from './event'
import * as version from './version'
import * as git from './git'
import * as gitHubRelease from './githubRelease'

export async function run(): Promise<void> {
  try {    

    const token= core.getInput('repo-token')
    const tag  = event.getCreatedTag()    
    var releaseUrl= '';

    if(tag && version.isSemVer(tag)){
      
      const changeLog= await git.getChangesFromTag(tag)
      core.debug(`Detected the changelos:\n ${changeLog}`)
      releaseUrl = await gitHubRelease.createReleaseDraft(tag, token, changeLog)
    }

    core.setOutput('release-url', 'test url')
    
  } catch (error) {
    core.setFailed(error.message)
  }
}


