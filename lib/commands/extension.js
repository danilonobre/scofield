#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SCOFIELD_DIR = path.join(__dirname, '..', '..');

const START_MARKER_TPL = (name) => `<!-- scofield:ext:${name}:start -->`;
const END_MARKER_TPL = (name) => `<!-- scofield:ext:${name}:end -->`;

function readRegistry(projectDir) {
  const registryPath = path.join(projectDir, '.scofield', 'extensions', '_extensions.json');
  if (!fs.existsSync(registryPath)) return { extensions: [] };
  return JSON.parse(fs.readFileSync(registryPath, 'utf8'));
}

function writeRegistry(projectDir, registry) {
  const registryPath = path.join(projectDir, '.scofield', 'extensions', '_extensions.json');
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf8');
}

function loadManifest(source) {
  // For now: read from local .scofield/extensions/<name>.json in the Scofield source
  // Future: fetch from github.com/<owner>/<repo>/.scofield/extensions/<name>.json
  const [owner, repo] = source.split('/');
  const localManifest = path.join(SCOFIELD_DIR, '.scofield', 'extensions', `${repo}.json`);

  if (fs.existsSync(localManifest)) {
    return JSON.parse(fs.readFileSync(localManifest, 'utf8'));
  }

  console.error(`\nError: Extension manifest not found for ${source}.`);
  console.error(`Expected: .scofield/extensions/${repo}.json\n`);
  console.error(`Note: Remote extension fetching is not yet implemented in v1.0.0.`);
  console.error(`Extensions must be registered in the local .scofield/extensions/ directory.\n`);
  process.exit(1);
}

function copyCommands(manifest, projectDir) {
  const contributes = manifest.contributes || {};
  const commands = contributes.commands || {};

  const installed = [];

  if (commands.claude && Array.isArray(commands.claude)) {
    const destDir = path.join(projectDir, '.claude', 'commands');
    for (const cmdFile of commands.claude) {
      const srcPath = path.join(SCOFIELD_DIR, '.scofield', 'extensions', manifest.name, cmdFile);
      const destPath = path.join(destDir, path.basename(cmdFile));
      if (fs.existsSync(srcPath)) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(srcPath, destPath);
        console.log(`  + .claude/commands/${path.basename(cmdFile)}`);
        installed.push('commands');
      }
    }
  }

  if (commands.cursor && Array.isArray(commands.cursor)) {
    const destDir = path.join(projectDir, '.cursor', 'commands');
    for (const cmdFile of commands.cursor) {
      const srcPath = path.join(SCOFIELD_DIR, '.scofield', 'extensions', manifest.name, cmdFile);
      const destPath = path.join(destDir, path.basename(cmdFile));
      if (fs.existsSync(srcPath)) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(srcPath, destPath);
        console.log(`  + .cursor/commands/${path.basename(cmdFile)}`);
      }
    }
  }

  return installed.includes('commands') ? ['commands'] : [];
}

function installRuntime(manifest) {
  const contributes = manifest.contributes || {};
  const runtime = contributes.runtime;
  if (!runtime) return [];

  const pkg = runtime.package;
  const manager = runtime.manager || 'npm';
  const cmd = manager === 'npm' ? `npm install -g ${pkg}` : `${manager} global add ${pkg}`;

  console.log(`  + Installing runtime: ${pkg} (${manager})`);
  try {
    execSync(cmd, { stdio: 'inherit' });
    return ['runtime'];
  } catch (err) {
    console.error(`  ! Failed to install runtime: ${pkg}`);
    return [];
  }
}

function installContext(manifest, projectDir) {
  const contributes = manifest.contributes || {};
  const contextFile = contributes.context;
  if (!contextFile) return [];

  const srcPath = path.join(SCOFIELD_DIR, '.scofield', 'extensions', manifest.name, contextFile);
  if (!fs.existsSync(srcPath)) {
    console.log(`  ! Context file not found: ${contextFile} (skipped)`);
    return [];
  }

  const contextContent = fs.readFileSync(srcPath, 'utf8');
  const contextDest = path.join(projectDir, '.scofield', 'extensions', `${manifest.name}-context.md`);
  fs.writeFileSync(contextDest, contextContent, 'utf8');
  console.log(`  + .scofield/extensions/${manifest.name}-context.md`);

  // Inject import block into CLAUDE.md
  const claudeMdPath = path.join(projectDir, 'CLAUDE.md');
  if (fs.existsSync(claudeMdPath)) {
    const startMark = START_MARKER_TPL(manifest.name);
    const endMark = END_MARKER_TPL(manifest.name);
    const existing = fs.readFileSync(claudeMdPath, 'utf8');

    if (!existing.includes(startMark)) {
      const importBlock = `\n${startMark}\n<!-- Extension: ${manifest.name} -->\n<!-- Context: .scofield/extensions/${manifest.name}-context.md -->\n${endMark}\n`;
      fs.writeFileSync(claudeMdPath, existing + importBlock, 'utf8');
      console.log(`  ~ CLAUDE.md — extension context block injected`);
    }
  }

  return ['context'];
}

module.exports = function extension(args) {
  const [subcommand, source] = args;

  if (subcommand !== 'add' || !source) {
    console.log('\nUsage: scofield extension add <owner/repo>\n');
    process.exit(1);
  }

  const projectDir = process.cwd();

  // Check Scofield is initialized
  if (!fs.existsSync(path.join(projectDir, '.scofield', 'version'))) {
    console.error('\nError: Scofield is not initialized in this directory. Run `scofield init` first.\n');
    process.exit(1);
  }

  console.log(`\nInstalling extension: ${source}\n`);

  const manifest = loadManifest(source);
  console.log(`Found: ${manifest.name} v${manifest.version} — ${manifest.description}\n`);

  // Check if already installed
  const registry = readRegistry(projectDir);
  const alreadyInstalled = registry.extensions.find(e => e.name === manifest.name);
  if (alreadyInstalled) {
    console.log(`Extension ${manifest.name} is already installed (v${alreadyInstalled.version}).\n`);
    process.exit(0);
  }

  const installedContributes = [];

  // 1. Commands
  const commandsInstalled = copyCommands(manifest, projectDir);
  installedContributes.push(...commandsInstalled);

  // 2. Runtime
  const runtimeInstalled = installRuntime(manifest);
  installedContributes.push(...runtimeInstalled);

  // 3. Context
  const contextInstalled = installContext(manifest, projectDir);
  installedContributes.push(...contextInstalled);

  // 4. Register in _extensions.json
  registry.extensions.push({
    name: manifest.name,
    version: manifest.version,
    source,
    installed_at: new Date().toISOString().split('T')[0],
    contributes: installedContributes
  });
  writeRegistry(projectDir, registry);
  console.log(`\n  ~ .scofield/extensions/_extensions.json updated`);

  console.log(`\nExtension ${manifest.name} v${manifest.version} installed.\n`);
  console.log(`Contributes: ${installedContributes.join(', ') || 'nothing'}\n`);
};
