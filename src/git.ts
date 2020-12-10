import * as core from '@actions/core'
import * as ex from '@actions/exec'

export async function getChangesFromTag(tag:string): Promise<string | null> {
    
    const pTag = await getPreviousVersionTag(tag)

    return pTag
    ? getCommitMessagesBetween(pTag,tag)
    :getCommitMessageFrom(tag)
}

export async function getPreviousVersionTag(tag: string): Promise <string | null> {
    
    let pTag='';

    const options: ex.ExecOptions ={
        listeners:{
            // Reading the OutPut
            stdout: (data: Buffer) =>{
                pTag += data.toString()
            }
        },
        silent: true, //Hide the logging by Exec in build log, to show the custom log message
        ignoreReturnCode: true // don't fail if return code is not 0, means some error occurs
    }

    // Now use exec to execute the GIT commands from CLI
    // Command Name = git,
    // Command Arguments = [ describe = Get the Tag Names, --match = Regular Expression to get the version tags only, 
    // --abbrev = Get the tagName, --first-parent = only look for current branch ,   ]
    const exitCode = await ex.exec(
        'git',
        [ 'describe', '--match', 'v[0-9]*', '--abbrev=0', '--first-parent', `${tag}^` ],
        options
     )

     core.debug(`The previouse version tag is ${pTag}`)

     return exitCode === 0 ? pTag.trim() : null
}

export async function getCommitMessagesBetween(firstTag: string, secondTag: string): Promise <string | null> {
    
    let commitMessages='';

    const options: ex.ExecOptions ={
        listeners:{
            // Reading the OutPut
            stdout: (data: Buffer) =>{
                commitMessages += data.toString()
            }
        },
        silent: true //Hide the logging by Exec in build log, to show the custom log message        
    }

    // Now use exec to execute the GIT commands from CLI
    // Command Name = git,
    // Command Arguments = [ log = Get the commit messages, --format=%s, only print the first line of the message, range of tags]     
   await ex.exec(
        'git',
        [ 'log', '--format=%s', `${firstTag}..${secondTag}`],
        options
     )

     core.debug(`The commit message between ${firstTag} and ${secondTag} are \n ${commitMessages}`)

     return commitMessages
}

export async function getCommitMessageFrom(tag: string): Promise <string | null> {
    
    let commitMessages='';

    const options: ex.ExecOptions ={
        listeners:{
            // Reading the OutPut
            stdout: (data: Buffer) =>{
                commitMessages += data.toString()
            }
        },
        silent: true //Hide the logging by Exec in build log, to show the custom log message        
    }

    // Now use exec to execute the GIT commands from CLI
    // Command Name = git,
    // Command Arguments = [ log = Get the commit messages, --format=%s, only print the first line of the message]     
     await ex.exec(
        'git',
        [ 'log', '--format=%s', `${tag}`],
        options
     )

     core.debug(`The commit message from ${tag}  are \n ${commitMessages}`)

     return commitMessages
}