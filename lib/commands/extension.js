#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

const SCOFIELD_DIR = path.join(__dirname, '..', '..');

function readRegistry(projectDir) {
  const registryPath = path.join(projectDir, '.scofield', 'extensions', '_extensions.json');
  if (!fs.existsSync(registryPath)) return { extensions: [] };
  return JSON.parse(fs.readFileSync(registryPath, 'utf8'));
}

function writeRegistry(projectDir, registry) {
  const registryPath = path.join(projectDir, '.scofield', 'extensions', '_extensions.json');
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf8');
}

function loadManifest(name) {
  const localManifest = path.join(SCOFIELD_DIR, '.scofield', 'extensions', `${name}.json`);
  if (!fs.existsSync(localManifest)) {
    console.error(`\nError: Extension manifest not found: .scofield/extensions/${name}.json`);
    console.error(`Extensions must be curated and registered in the Scofield registry.\n`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(localManifest, 'utf8'));
}

function fetchRaw(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 404) {
        resolve(null); // file not found — caller handles warning
      } else if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      } else {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }
    }).on('error', reject);
  });
}

function fetchRemoteVersion(owner, repo) {
  return new Promise((resolve) => {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/package.json`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const pkg = JSON.parse(data);
          resolve(pkg.version || null);
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function installCommands(manifest, projectDir) {
  const [owner, repo] = manifest.source.split('/');
  const contributes = manifest.contributes || {};
  const commands = contributes.commands || {};
  const installedContributes = [];

  // Fetch and copy claude commands
  if (commands.claude && commands.claude.length > 0) {
    const destDir = path.join(projectDir, '.claude', 'commands');
    fs.mkdirSync(destDir, { recursive: true });

    for (const filePath of commands.claude) {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
      const content = await fetchRaw(url);
      const fileName = path.basename(filePath);
      const destPath = path.join(destDir, fileName);

      if (content === null) {
        console.log(`  ⚠️  ${fileName} not found at ${url}`);
        console.log(`     The manifest may be outdated. Check https://github.com/${manifest.source}/releases`);
        console.log(`     and update .scofield/extensions/${manifest.name}.json if needed.`);
      } else {
        fs.writeFileSync(destPath, content, 'utf8');
        console.log(`  + .claude/commands/${fileName}`);
      }
    }
    installedContributes.push('commands');
  }

  // Fetch and copy cursor commands
  if (commands.cursor && commands.cursor.length > 0) {
    const destDir = path.join(projectDir, '.cursor', 'commands');
    fs.mkdirSync(destDir, { recursive: true });

    for (const filePath of commands.cursor) {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
      const content = await fetchRaw(url);
      const fileName = path.basename(filePath);
      const destPath = path.join(destDir, fileName);

      if (content === null) {
        console.log(`  ⚠️  ${fileName} not found in cursor commands`);
      } else {
        fs.writeFileSync(destPath, content, 'utf8');
        console.log(`  + .cursor/commands/${fileName}`);
      }
    }
  }

  // Install runtime
  if (contributes.runtime) {
    const { execSync } = require('child_process');
    const pkg = contributes.runtime.package;
    console.log(`\n  Installing runtime: ${pkg}...`);
    try {
      execSync(`npm install -g ${pkg}`, { stdio: 'inherit' });
      installedContributes.push('runtime');
    } catch {
      console.log(`  ⚠️  Failed to install ${pkg}. Install manually: npm install -g ${pkg}`);
    }
  }

  return installedContributes;
}

async function addExtension(source, projectDir) {
  const [owner, repo] = source.split('/');
  const name = repo.toLowerCase();

  console.log(`\nScofield extension add — ${source}\n`);

  const manifest = loadManifest(name);

  // Check if already installed
  const registry = readRegistry(projectDir);
  const existing = registry.extensions.find(e => e.name === name);
  if (existing) {
    console.log(`Extension "${name}" is already installed (v${existing.version}).`);
    console.log(`To update it, run: scofield extension update ${name}\n`);
    return;
  }

  // Fetch remote version for accuracy
  const remoteVersion = await fetchRemoteVersion(owner, repo);
  const version = remoteVersion || manifest.version;

  console.log(`Installing ${manifest.name} v${version}...\n`);

  const installedContributes = await installCommands(manifest, projectDir);

  // Register in _extensions.json
  registry.extensions.push({
    name: manifest.name,
    version,
    source: manifest.source,
    installed_at: new Date().toISOString().split('T')[0],
    contributes: installedContributes
  });
  writeRegistry(projectDir, registry);

  console.log(`\n✓ ${manifest.name} v${version} installed.`);
  console.log(`\n  Commands available:`);
  const commands = (manifest.contributes.commands || {}).claude || [];
  commands.forEach(f => console.log(`  /${path.basename(f, '.md')}`));
  console.log('');
}

async function updateExtension(name, projectDir) {
  console.log(`\nScofield extension update — ${name}\n`);

  const manifest = loadManifest(name);
  const [owner, repo] = manifest.source.split('/');

  const registry = readRegistry(projectDir);
  const existing = registry.extensions.find(e => e.name === name);

  if (!existing) {
    console.log(`Extension "${name}" is not installed. Run: scofield extension add ${manifest.source}\n`);
    return;
  }

  const remoteVersion = await fetchRemoteVersion(owner, repo);
  const latestVersion = remoteVersion || manifest.version;

  if (existing.version === latestVersion) {
    console.log(`${name} is already at v${latestVersion}. Nothing to update.\n`);
    return;
  }

  console.log(`Updating ${name}: v${existing.version} → v${latestVersion}\n`);

  await installCommands(manifest, projectDir);

  // Update registry
  existing.version = latestVersion;
  existing.installed_at = new Date().toISOString().split('T')[0];
  writeRegistry(projectDir, registry);

  console.log(`\n✓ ${name} updated to v${latestVersion}.\n`);
}

module.exports = async function extension(args) {
  const projectDir = process.cwd();
  const [subcommand, target] = args;

  if (subcommand === 'add' && target) {
    await addExtension(target, projectDir);
  } else if (subcommand === 'update' && target) {
    await updateExtension(target, projectDir);
  } else if (subcommand === 'list') {
    const registry = readRegistry(projectDir);
    if (registry.extensions.length === 0) {
      console.log('\nNo extensions installed.\n');
    } else {
      console.log('\nInstalled extensions:\n');
      registry.extensions.forEach(e => {
        console.log(`  ${e.name} v${e.version} (${e.source})`);
      });
      console.log('');
    }
  } else {
    console.log(`\nUsage:
  scofield extension add <owner/repo>    Install an extension
  scofield extension update <name>       Update an installed extension
  scofield extension list                List installed extensions\n`);
  }
};
