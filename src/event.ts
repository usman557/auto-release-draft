import * as core from '@actions/core'
import * as github from '@actions/github'

export function getCreatedTag(): string | null {
    if(github.context.eventName !== 'create'){
        // emit the info for the build log
        core.info(`The event name was ${github.context.eventName}`)
        return null
    }

    if(github.context.payload.ref_type !== 'tag'){
     // emit the info for the build log
     core.info('The created reference was a branch instead of a tag')
     return null   
    }

    return github.context.payload.ref
}