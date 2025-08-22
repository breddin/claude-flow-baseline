# 🔄 Rolling Mirror Sync Infrastructure

## 📋 Essential Sync Components (PRESERVED)

These files are **critical infrastructure** for maintaining the rolling mirror functionality and must be preserved during cleanup:

### 1. **GitHub Actions Workflow**
- **File**: `.github/workflows/repository-sync.yml`
- **Purpose**: Automated weekly sync with upstream `ruvnet/claude-flow`
- **Features**: 
  - Scheduled weekly sync (Mondays 9 AM UTC)
  - Manual dispatch with sync type options
  - Multi-repository support
  - Conflict detection and handling

### 2. **Sync Management Script**
- **File**: `scripts/sync-manager.sh`
- **Purpose**: Core synchronization logic and automation
- **Features**:
  - Upstream repository synchronization
  - Branch management and conflict resolution
  - Health checks and validation
  - Logging and error handling

### 3. **Repository Setup Script**
- **File**: `scripts/setup-repository.sh`
- **Purpose**: Initial repository configuration and remote setup
- **Features**:
  - Remote configuration for upstream tracking
  - Repository type detection
  - Environment setup and validation
  - Mirror relationship establishment

## 🎯 Why These Must Be Preserved

1. **Rolling Mirror Functionality**: These scripts enable automatic upstream synchronization
2. **Automation**: Reduces manual intervention for mirror maintenance
3. **Conflict Resolution**: Handles merge conflicts and sync issues automatically
4. **Repository Health**: Monitors and maintains repository integrity

## ⚠️ Cleanup Guidelines

**DO NOT REMOVE** during cleanup:
- ✅ `.github/workflows/repository-sync.yml`
- ✅ `scripts/sync-manager.sh`
- ✅ `scripts/setup-repository.sh`

**SAFE TO REMOVE** (development artifacts):
- ❌ Project-specific documentation (Greenhouse, VisualizeHR, etc.)
- ❌ Development tracking files (merge success docs)
- ❌ Configuration contexts for other projects
- ❌ Custom setup scripts for other repositories

## 🔧 Sync Infrastructure Usage

```bash
# Manual sync check
./scripts/sync-manager.sh check-health

# Force sync from upstream
./scripts/sync-manager.sh sync-baseline --force

# Setup repository relationships
./scripts/setup-repository.sh
```

---
**Status**: ✅ **SYNC INFRASTRUCTURE RESTORED AND PRESERVED**
