#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SCOFIELD_DIR = path.join(__dirname, '..', '..');
const BASE_CONTENT = fs.readFileSync(path.join(SCOFIELD_DIR, 'CLAUDE.base.md'), 'utf8').trim();
const FRAMEWORK_VERSION = fs.readFileSync(path.join(SCOFIELD_DIR, '.scofield', 'version'), 'utf8').trim();

const START_MARKER = '<!-- scofield:base:start -->';
const END_MARKER = '<!-- scofield:base:end -->';

function readVersion(projectDir) {
  const versionFile = path.join(projectDir, '.scofield', 'version');
  if (fs.existsSync(versionFile)) {
    return fs.readFileSync(versionFile, 'utf8').trim();
  }
  return null;
}

function updateBaseBlock(filePath, label) {
  if (!fs.existsSync(filePath)) {
    console.log(`  - ${label} not found (skipped)`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const startIdx = content.indexOf(START_MARKER);
  const endIdx = content.indexOf(END_MARKER);

  if (startIdx === -1 || endIdx === -1) {
    console.log(`  ! ${label} — markers not found. Add <!-- scofield:base:start --> and <!-- scofield:base:end --> manually.`);
    return;
  }

  const before = content.slice(0, startIdx);
  const after = content.slice(endIdx + END_MARKER.length);
  const updated = `${before}${START_MARKER}\n${BASE_CONTENT}\n${END_MARKER}${after}`;

  if (updated === content) {
    console.log(`  = ${label} — base block unchanged`);
  } else {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`  ~ ${label} — base block updated`);
  }
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

function updateCommands(projectDir) {
  const srcClaude = path.join(SCOFIELD_DIR, '.claude', 'commands');
  const destClaude = path.join(projectDir, '.claude', 'commands');
  const srcCursor = path.join(SCOFIELD_DIR, '.cursor', 'commands');
  const destCursor = path.join(projectDir, '.cursor', 'commands');

  copyDirRecursive(srcClaude, destClaude);
  console.log('  ~ .claude/commands/ updated');

  copyDirRecursive(srcCursor, destCursor);
  console.log('  ~ .cursor/commands/ updated');
}

function syncNewTemplates(projectDir) {
  const templatesDir = path.join(SCOFIELD_DIR, '.scofield', 'templates');
  const added = [];

  function walk(dir, relBase) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = path.join(relBase, entry.name);
      const src = path.join(dir, entry.name);
      const dest = path.join(projectDir, 'specs', rel);
      if (entry.isDirectory()) {
        walk(src, rel);
      } else if (!fs.existsSync(dest)) {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, fs.readFileSync(src, 'utf8'), 'utf8');
        added.push(`specs/${rel}`);
        console.log(`  + specs/${rel} — new file from templates`);
      }
    }
  }

  walk(templatesDir, '');
  return added;
}

function archiveRemovedSpecs(projectDir) {
  // Future: compare installed templates against current templates and archive removed ones.
  // For v1.0.0 there are no removed specs — this is a no-op placeholder.
}

function readChangelog(fromVersion, toVersion) {
  const changelogPath = path.join(SCOFIELD_DIR, 'CHANGELOG.md');
  if (!fs.existsSync(changelogPath)) return null;

  const content = fs.readFileSync(changelogPath, 'utf8');
  // Extract the block for toVersion
  const versionHeader = `## [${toVersion}]`;
  const start = content.indexOf(versionHeader);
  if (start === -1) return null;

  const nextHeader = content.indexOf('\n## [', start + 1);
  const block = nextHeader === -1 ? content.slice(start) : content.slice(start, nextHeader);
  return block.trim();
}

module.exports = function update(args) {
  const projectDir = process.cwd();
  const installedVersion = readVersion(projectDir);

  if (!installedVersion) {
    console.error('\nError: No .scofield/version found. Is Scofield initialized in this project? Run `scofield init` first.\n');
    process.exit(1);
  }

  if (installedVersion === FRAMEWORK_VERSION) {
    console.log(`\nScofield is already at v${FRAMEWORK_VERSION}. Nothing to update.\n`);
    return;
  }

  console.log(`\nScofield update: ${installedVersion} → ${FRAMEWORK_VERSION}\n`);

  // 1. Update commands (framework-owned)
  console.log('Updating commands...\n');
  updateCommands(projectDir);

  // 2. Rewrite base block in CLAUDE.md and .cursorrules
  console.log('\nUpdating base block in config files...\n');
  updateBaseBlock(path.join(projectDir, 'CLAUDE.md'), 'CLAUDE.md');
  updateBaseBlock(path.join(projectDir, '.cursorrules'), '.cursorrules');

  // 3. Distribute new spec files from templates (skip existing project files)
  console.log('\nChecking for new spec file templates...\n');
  syncNewTemplates(projectDir);

  // 4. Archive removed specs (no-op in v1.0.0)
  archiveRemovedSpecs(projectDir);

  // 5. Update .scofield/version
  fs.writeFileSync(path.join(projectDir, '.scofield', 'version'), `${FRAMEWORK_VERSION}\n`, 'utf8');
  console.log(`\n  ~ .scofield/version → ${FRAMEWORK_VERSION}`);

  // 6. Display update summary from CHANGELOG
  const changelog = readChangelog(installedVersion, FRAMEWORK_VERSION);
  if (changelog) {
    console.log('\n--- Update summary ---\n');
    console.log(changelog);
    console.log('\n----------------------\n');
  }

  console.log(`\nScofield updated: ${installedVersion} → ${FRAMEWORK_VERSION}\n`);
  console.log('Run /mentor to fill gaps from this update.\n');
};
