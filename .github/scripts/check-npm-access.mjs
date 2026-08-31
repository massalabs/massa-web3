// Given the JSON output of `npm access list collaborators <pkg>`, assert the
// authenticated user has read-write access. A read-only token authenticates
// fine under `npm whoami` and only fails at publish time, with a 404 that
// reads as "package not found" rather than as a permissions error.
//
// Anything we cannot positively determine is a warning, not a failure: access
// granted via a team, or a granular token with limited scope, will not always
// show up here and must not break the build.

import { readFileSync } from 'node:fs'

const [source, user] = process.argv.slice(2)

if (!user) {
  console.log('::warning::No npm identity supplied; publish rights unconfirmed.')
  process.exit(0)
}

let permissions
try {
  permissions = JSON.parse(readFileSync(source, 'utf8'))
} catch {
  console.log('::warning::Unexpected npm output; publish rights unconfirmed.')
  process.exit(0)
}

const level = permissions?.[user]

if (!level) {
  console.log(
    `::warning::${user} is not a direct collaborator. Access may come via a ` +
      'team, so publish rights were not confirmed.'
  )
  process.exit(0)
}

if (level !== 'read-write') {
  console.log(
    `::error::${user} has "${level}" access to this package. Publishing will ` +
      'fail with a 404. A read-write (Automation) token is required.'
  )
  process.exit(1)
}

console.log(`${user} has read-write access.`)
