#!/usr/bin/env node

import os from 'node:os';
import { spawn } from 'node:child_process';

// Check if SQLite bindings are working
async function checkSqliteBindings() {
  try {
    const Database = await import('better-sqlite3');
    const db = new Database.default(':memory:');
    db.close();
    return true;
  } catch (error) {
    // Silently fail - this is expected when better-sqlite3 doesn't compile
    return false;
  }
}

// Attempt to rebuild better-sqlite3 for ARM64
async function rebuildSqlite() {
  console.log('🔧 Rebuilding better-sqlite3 for ARM64...');
  
  return new Promise((resolve) => {
    const rebuild = spawn('npm', ['rebuild', 'better-sqlite3'], {
      stdio: 'inherit',
      shell: true
    });
    
    rebuild.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Successfully rebuilt better-sqlite3 for ARM64');
        resolve(true);
      } else {
        console.log('⚠️  Failed to rebuild better-sqlite3');
        resolve(false);
      }
    });
    
    rebuild.on('error', () => {
      console.log('⚠️  Failed to rebuild better-sqlite3');
      resolve(false);
    });
  });
}

// Main installation logic
async function main() {
  const platform = os.platform();
  const arch = os.arch();
  
  // Only run on ARM64 macOS
  if (platform === 'darwin' && arch === 'arm64') {
    console.log('🍎 Detected Apple Silicon (ARM64) Mac');
    
    const bindingsWork = await checkSqliteBindings();
    
    if (!bindingsWork) {
      console.log('⚠️  SQLite bindings not working for ARM64');
      const rebuildSuccess = await rebuildSqlite();
      
      if (!rebuildSuccess) {
        console.log('');
        console.log('⚠️  Unable to rebuild SQLite bindings for ARM64');
        console.log('📝 Claude-Flow will fall back to in-memory storage');
        console.log('');
        console.log('To fix this issue, you can try:');
        console.log('1. Install Xcode Command Line Tools: xcode-select --install');
        console.log('2. Manually rebuild: cd node_modules/better-sqlite3 && npm run build-release');
        console.log('3. Use Rosetta 2: arch -x86_64 npm install');
        console.log('');
      }
    } else {
      console.log('✅ SQLite bindings are working correctly');
    }
  }
  
  // Setup GitHub token mapping if needed
  await setupGitHubTokenMapping();
}

// Setup GitHub token mapping for cross-repository operations
async function setupGitHubTokenMapping() {
  try {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const { fileURLToPath } = await import('node:url');
    
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const projectRoot = path.dirname(__dirname);
    const tokenScriptPath = path.join(projectRoot, '.env.github-token');
    
    // Check if .env.github-token exists
    if (fs.existsSync(tokenScriptPath)) {
      console.log('🔑 GitHub token mapping script found - ready for $_GITHUB_PAT → $GITHUB_TOKEN');
      
      // Make sure it's executable
      try {
        fs.chmodSync(tokenScriptPath, 0o755);
        console.log('✅ GitHub token script is executable');
      } catch (chmodError) {
        console.log('⚠️  Could not make GitHub token script executable:', chmodError.message);
      }
      
      // Add to shell profiles if not already present
      await addToShellProfiles(tokenScriptPath);
    } else {
      console.log('ℹ️  No GitHub token mapping script found (.env.github-token)');
    }
  } catch (error) {
    console.log('⚠️  Error setting up GitHub token mapping:', error.message);
  }
}

// Add sourcing to common shell profiles
async function addToShellProfiles(tokenScriptPath) {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const os = await import('node:os');
  
  const homeDir = os.homedir();
  const shellProfiles = [
    path.join(homeDir, '.bashrc'),
    path.join(homeDir, '.zshrc'),
    path.join(homeDir, '.profile')
  ];
  
  const sourceCommand = `# Claude Flow GitHub token mapping\nif [ -f "${tokenScriptPath}" ]; then\n  source "${tokenScriptPath}"\nfi\n`;
  
  for (const profile of shellProfiles) {
    try {
      if (fs.existsSync(profile)) {
        const content = fs.readFileSync(profile, 'utf8');
        
        // Check if already added
        if (!content.includes('Claude Flow GitHub token mapping')) {
          fs.appendFileSync(profile, '\n' + sourceCommand);
          console.log(`✅ Added GitHub token sourcing to ${path.basename(profile)}`);
        } else {
          console.log(`ℹ️  GitHub token sourcing already present in ${path.basename(profile)}`);
        }
      }
    } catch (error) {
      console.log(`⚠️  Could not modify ${path.basename(profile)}:`, error.message);
    }
  }
}

// Run the installation enhancement
// Exit with 0 even if there are errors - this is a best-effort script
main().catch(() => {
  // Silently ignore errors - better-sqlite3 is optional
  process.exit(0);
});