#!/usr/bin/env node

const [,, command, ...args] = process.argv;

switch (command) {
  case 'init':
    require('../lib/commands/init')(args);
    break;
  case 'update':
    require('../lib/commands/update')(args);
    break;
  case 'extension':
    require('../lib/commands/extension')(args);
    break;
  default:
    console.log(`Scofield CLI v1.0.0

Usage:
  scofield init                     Set up Scofield in a project
  scofield update                   Update framework files to latest version
  scofield extension add <owner/repo>  Install a Scofield extension
`);
    if (command) {
      console.error(`Unknown command: ${command}`);
      process.exit(1);
    }
}
