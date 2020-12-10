import * as core from '@actions/core'
import * as event from './event'
import * as version from './version'
import * as git from './git'
import * as gitHubRelease from './githubRelease'

export async function run(): Promise<void> {
  try {    

    core.debug('EXECUTION OF MAIN.TS STARTED');

    const token= core.getInput('repo-token')

    core.debug(`TOKEN VALUE IS ${token}`);

    const tag  ='v0.0.6'; // event.getCreatedTag()    
    core.debug(`TAG VALUE IS ${tag}`);

    let releaseUrl= '';

    if(tag && version.isSemVer(tag)){
      
      const changeLog= await git.getChangesFromTag(tag)
      core.debug(`Detected the changelos:\n ${changeLog}`)
      releaseUrl = await gitHubRelease.createReleaseDraft(tag, token, changeLog)
    }
    else{
      core.debug('CREATE RELASE METHOD NEVER CALLED');
    }

    if(releaseUrl){
      core.debug(`The Release URL Created  is \n ${releaseUrl}`)
    } 

    core.setOutput('release-url', releaseUrl)

  } catch (error) {
    core.debug(`The exception in procress  is \n ${error}`)
    core.setFailed(error.message)
  }
}

run()
