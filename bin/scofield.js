#!/usr/bin/env node

const [,, command, ...args] = process.argv;

switch (command) {
  case 'init':
    require('../lib/commands/init')(args);
    break;
  case 'update':
    require('../lib/commands/update')(args).catch(err => {
      console.error(err.message);
      process.exit(1);
    });
    break;
  case 'extension':
    require('../lib/commands/extension')(args).catch(err => {
      console.error(err.message);
      process.exit(1);
    });
    break;
  default:
    console.log(`Scofield CLI v1.1.0

Usage:
  scofield init                              Set up Scofield in a project
  scofield update                            Update framework files and extensions
  scofield extension add <owner/repo>        Install a Scofield extension
  scofield extension update <name>           Update an installed extension
  scofield extension list                    List installed extensions
`);
    if (command) {
      console.error(`Unknown command: ${command}`);
      process.exit(1);
    }
}
