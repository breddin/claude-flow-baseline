# 🧹 Claude-Flow Baseline Cleanup Plan

## 🎯 Objective
Convert `claude-flow-baseline` from a development workspace back to a clean mirror of `ruvnet/claude-flow` while preserving valuable artifacts created during Codespace development sessions.

## ✅ Completed Steps

### 1. **Artifact Preservation** ✅
- Created `archive/development-artifacts/` directory
- Archived key documentation and configuration files:
  - `CLAUDE_FLOW_DOCUMENTATION_TOC.md`
  - `CLAUDE_FLOW_GREENHOUSE_CONNECTOR_CONFIGURATION.md` 
  - `CLAUDE_FLOW_VISUALIZEHR_ERP_CONFIGURATION.md`
  - `greenhouse-connector-context.json`
  - `ALPHA_91_MERGE_SUCCESS.md`
  - `BALLERINA_MERGE_SUCCESS.md`
  - `IMPLEMENTATION_TESTING_PLAN.md`
  - `README-REPOSITORY-FLOW.md`
  - `setup-baseline-implementation.sh`
  - GitHub workflows and scripts (if present)

## 🔄 Next Steps Required

### 2. **Remove Development Artifacts** (UPDATED - Preserves Sync Infrastructure)
```bash
# Remove development-specific files
rm -f CLAUDE_FLOW_DOCUMENTATION_TOC.md
rm -f CLAUDE_FLOW_GREENHOUSE_CONNECTOR_CONFIGURATION.md
rm -f greenhouse-connector-context.json
rm -f ALPHA_91_MERGE_SUCCESS.md
rm -f BALLERINA_MERGE_SUCCESS.md
rm -f IMPLEMENTATION_TESTING_PLAN.md
rm -f README-REPOSITORY-FLOW.md
rm -f setup-baseline-implementation.sh
rm -f docs/CLAUDE_FLOW_VISUALIZEHR_ERP_CONFIGURATION.md

# Remove other development docs
rm -f docs/FEATURE_MATRIX.md
rm -f docs/REPOSITORY_ARCHITECTURE.md

# PRESERVE SYNC INFRASTRUCTURE:
# ✅ KEEP .github/workflows/repository-sync.yml - Essential for rolling mirror
# ✅ KEEP scripts/setup-repository.sh - Repository configuration
# ✅ KEEP scripts/sync-manager.sh - Upstream sync automation
```

### 3. **Reset to Pure Upstream Mirror**
```bash
# Fetch latest upstream
git fetch upstream

# Reset to upstream/main (WARNING: This removes all custom changes)
git reset --hard upstream/main

# Force push to origin to update the mirror
git push --force-with-lease origin main
```

### 4. **Configure Automatic Sync**
Create GitHub Actions workflow for automatic upstream synchronization:
```yaml
# .github/workflows/sync-upstream.yml
name: Sync with Upstream
on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM
  workflow_dispatch:
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Sync upstream
        run: |
          git remote add upstream https://github.com/ruvnet/claude-flow.git
          git fetch upstream
          git reset --hard upstream/main
          git push --force-with-lease origin main
```

### 5. **Update Repository Description**
- Repository description: "Rolling mirror of ruvnet/claude-flow - Automatically synced"
- README should reflect mirror status only
- Remove ballerina-specific content

## ⚠️ Important Warnings

1. **Backup Check**: Ensure all valuable artifacts are preserved in archive before proceeding
2. **Force Push**: The reset operation will rewrite history - make sure this is intended
3. **Branch Cleanup**: Remove development branches like `merge-alpha-91-to-ballerina`
4. **Remote Cleanup**: Consider removing the `ballerina` remote if no longer needed

## 🎯 Post-Cleanup Repository State

**What it SHOULD contain:**
- ✅ Pure mirror of `ruvnet/claude-flow`
- ✅ Repository sync automation (repository-sync.yml)
- ✅ Sync management scripts (sync-manager.sh, setup-repository.sh)
- ✅ Archived development artifacts in `archive/` directory
- ✅ Clean git history matching upstream

**What it SHOULD NOT contain:**
- ❌ Ballerina-specific customizations
- ❌ Development artifacts in root directory
- ❌ Custom documentation not from upstream
- ❌ Mixed commit history from development work

## 🔧 GitHub Repository Context Issue

**Root Cause**: Claude-Flow agents working in Codespaces lose track of the target repository context and commit to the wrong repo.

**Prevention for Future Codespace Work:**
1. Always explicitly specify target repository in Claude-Flow commands
2. Use repository-specific environment variables
3. Verify git remote configuration before starting work
4. Implement git hooks to prevent accidental commits to baseline repo

---
*Execute cleanup steps carefully and verify each step before proceeding to the next.*
