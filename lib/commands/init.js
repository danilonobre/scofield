#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const SCOFIELD_DIR = path.join(__dirname, '..', '..');
const FRAMEWORK_VERSION = fs.readFileSync(path.join(SCOFIELD_DIR, '.scofield', 'version'), 'utf8').trim();

const CLAUDE_BASE_CONTENT = fs.readFileSync(path.join(SCOFIELD_DIR, 'CLAUDE.base.md'), 'utf8');

const CLAUDE_MD_TEMPLATE = `<!-- scofield:base:start -->
${CLAUDE_BASE_CONTENT.trim()}
<!-- scofield:base:end -->

## Project overrides

<!-- Add project-specific rules here. This section is never touched by scofield update. -->
`;

const CURSORRULES_TEMPLATE = CLAUDE_MD_TEMPLATE;

function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyCommands(projectDir, force = false) {
  const srcClaude = path.join(SCOFIELD_DIR, '.claude', 'commands');
  const destClaude = path.join(projectDir, '.claude', 'commands');
  const srcCursor = path.join(SCOFIELD_DIR, '.cursor', 'commands');
  const destCursor = path.join(projectDir, '.cursor', 'commands');

  if (!fs.existsSync(destClaude)) {
    copyDirRecursive(srcClaude, destClaude);
    console.log('  + .claude/commands/ created');
  } else if (force) {
    copyDirRecursive(srcClaude, destClaude);
    console.log('  ~ .claude/commands/ updated');
  } else {
    console.log('  = .claude/commands/ already exists (skipped)');
  }

  if (!fs.existsSync(destCursor)) {
    copyDirRecursive(srcCursor, destCursor);
    console.log('  + .cursor/commands/ created');
  } else if (force) {
    copyDirRecursive(srcCursor, destCursor);
    console.log('  ~ .cursor/commands/ updated');
  } else {
    console.log('  = .cursor/commands/ already exists (skipped)');
  }
}

function createIfAbsent(filePath, content, label) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  + ${label}`);
  } else {
    console.log(`  = ${label} already exists (skipped)`);
  }
}

function injectBaseMarkers(filePath, content, label) {
  const START = '<!-- scofield:base:start -->';
  const END = '<!-- scofield:base:end -->';

  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf8');
    if (existing.includes(START)) {
      console.log(`  = ${label} already has markers (skipped)`);
      return;
    }
    // Prepend markers to existing file
    const updated = `${START}\n${CLAUDE_BASE_CONTENT.trim()}\n${END}\n\n${existing}`;
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`  ~ ${label} — markers injected`);
  } else {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  + ${label} created`);
  }
}

function createProjectSpecFiles(projectDir) {
  const templatesDir = path.join(SCOFIELD_DIR, '.scofield', 'templates');

  function walk(dir, relBase) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = path.join(relBase, entry.name);
      const src = path.join(dir, entry.name);
      const dest = path.join(projectDir, 'specs', rel);
      if (entry.isDirectory()) {
        walk(src, rel);
      } else {
        createIfAbsent(dest, fs.readFileSync(src, 'utf8'), `specs/${rel}`);
      }
    }
  }

  walk(templatesDir, '');
}

module.exports = async function init(args) {
  const projectDir = process.cwd();
  console.log(`\nScofield init — v${FRAMEWORK_VERSION}`);
  console.log(`Project: ${projectDir}\n`);

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  // Check if commands exist and might need replacement
  const claudeCommandsExist = fs.existsSync(path.join(projectDir, '.claude', 'commands'));
  const cursorCommandsExist = fs.existsSync(path.join(projectDir, '.cursor', 'commands'));
  let forceCommands = false;

  if (claudeCommandsExist || cursorCommandsExist) {
    const answer = await ask(rl, 'Commands already exist in this project. Replace them? (y/N) ');
    forceCommands = answer.trim().toLowerCase() === 'y';
  }

  rl.close();

  console.log('\nDistributing framework files...\n');

  // 1. Commands
  copyCommands(projectDir, forceCommands);

  // 2. CLAUDE.md with markers
  injectBaseMarkers(
    path.join(projectDir, 'CLAUDE.md'),
    CLAUDE_MD_TEMPLATE,
    'CLAUDE.md'
  );

  // 3. .cursorrules with markers
  injectBaseMarkers(
    path.join(projectDir, '.cursorrules'),
    CURSORRULES_TEMPLATE,
    '.cursorrules'
  );

  // 4. .scofield/version
  createIfAbsent(
    path.join(projectDir, '.scofield', 'version'),
    `${FRAMEWORK_VERSION}\n`,
    '.scofield/version'
  );

  // 5. .scofield/extensions/_extensions.json
  createIfAbsent(
    path.join(projectDir, '.scofield', 'extensions', '_extensions.json'),
    '{\n  "extensions": []\n}\n',
    '.scofield/extensions/_extensions.json'
  );

  // 6. .scofield/archived/ placeholder
  const archivedDir = path.join(projectDir, '.scofield', 'archived');
  if (!fs.existsSync(archivedDir)) {
    fs.mkdirSync(archivedDir, { recursive: true });
    console.log('  + .scofield/archived/ created');
  }

  // 7. Project spec files (created empty from templates, skipped if they exist)
  console.log('\nCreating project spec files...\n');
  createProjectSpecFiles(projectDir);

  // 8. work/ directories
  for (const dir of ['changes', 'plans', 'tasks']) {
    const p = path.join(projectDir, 'work', dir);
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p, { recursive: true });
      fs.writeFileSync(path.join(p, '.gitkeep'), '');
      console.log(`  + work/${dir}/ created`);
    } else {
      console.log(`  = work/${dir}/ already exists (skipped)`);
    }
  }

  console.log(`\nDone. Scofield v${FRAMEWORK_VERSION} initialized.\n`);
  console.log('Next step: open Claude Code or Cursor and run /mentor to fill your specs.\n');
};
