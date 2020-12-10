import * as core from '@actions/core'
import * as event from './event'
import * as version from './version'
import * as git from './git'
import * as gitHubRelease from './githubRelease'

export async function run(): Promise<void> {
  try {    

    const token= core.getInput('repo-token')
    const tag  = event.getCreatedTag()    
    let releaseUrl= '';

    if(tag && version.isSemVer(tag)){
      
      const changeLog= await git.getChangesFromTag(tag)
      core.debug(`Detected the changelos:\n ${changeLog}`)
      releaseUrl = await gitHubRelease.createReleaseDraft(tag, token, changeLog)
    }

    if(releaseUrl){
      core.debug(`The Release URL Created  is \n ${releaseUrl}`)
    } 

    core.setOutput('release-url', 'test url')

  } catch (error) {
    core.debug(`The exception in procress  is \n ${error}`)
    core.setFailed(error.message)
  }
}

run()
