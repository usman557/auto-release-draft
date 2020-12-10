import * as core from '@actions/core'
import * as github from '@actions/github'

export function getCreatedTag(): string | null {
    if(github.context.eventName !== 'create'){
        // emit the info for the build log
        core.info(`The event name was ${github.context.eventName}`)
        core.info(`VALUE OF REF IS ${github.context.payload.ref}`)
        return '1.0.0.0'
    }

    if(github.context.payload.ref_type !== 'tag'){
     // emit the info for the build log
     core.info('The created reference was a branch instead of a tag')
     return null   
    }

    return github.context.payload.ref
}