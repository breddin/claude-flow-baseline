# Claude Flow Repository Flow Management

This repository (`breddin/claude-flow-github`) is part of a structured multi-repository architecture that manages the flow of features and updates across the Claude Flow ecosystem.

## 🔄 Repository Flow Overview

```
ruvnet/claude-code-flow (Master)
    ↓ (Weekly sync)
breddin/claude-flow-baseline (Mirror)
    ↓ (Bi-weekly merge)
breddin/claude-flow-github (GitHub Features) ← YOU ARE HERE
    ↓ (Monthly merge)
breddin/claude-flow-ballerina (Language Extension)
```

## 📋 Quick Reference

### Repository Types & Purposes

| Repository | Purpose | Key Features |
|------------|---------|--------------|
| **ruvnet/claude-code-flow** | Master upstream | Core Claude Flow functionality |
| **breddin/claude-flow-baseline** | Clean mirror | Pure upstream mirror for breddin ecosystem |
| **breddin/claude-flow-github** | GitHub integration | Container startup, GitHub CLI safety, Codespaces |
| **breddin/claude-flow-ballerina** | Language extension | Ballerina programming language support |

### Current Repository Configuration

This repository is configured with the following remotes:

```bash
origin          # breddin/claude-flow-github (this repository)
upstream        # breddin/claude-flow-baseline (our direct upstream)
master-upstream # ruvnet/claude-code-flow (the master upstream)
```

## 🚀 Quick Start

### 1. Setup Repository (First Time)
```bash
# Run the setup script to configure remotes and package.json
./scripts/setup-repository.sh
```

### 2. Check Repository Health
```bash
# Verify everything is working correctly
./scripts/sync-manager.sh check-health
```

### 3. Sync from Upstream
```bash
# Pull latest changes from baseline repository
./scripts/sync-manager.sh sync-github
```

## 📚 Documentation

Detailed documentation is available in the `/docs` directory:

- **[Repository Architecture](docs/REPOSITORY_ARCHITECTURE.md)** - Complete architecture overview
- **[Feature Matrix](docs/FEATURE_MATRIX.md)** - Feature comparison across repositories
- **[GitHub Integration Guide](docs/integrations/github.md)** - GitHub-specific features

## 🔧 Management Scripts

### Repository Setup
- `scripts/setup-repository.sh` - Configure remotes and package.json
- `scripts/sync-manager.sh` - Manage synchronization between repositories

### Automated Workflows
- `.github/workflows/repository-sync.yml` - Automated sync process
- Weekly upstream syncs for baseline repository
- Bi-weekly merges for GitHub repository
- Monthly merges for Ballerina repository

## 🎯 GitHub-Specific Features

This repository adds the following GitHub-specific enhancements:

### Container & DevOps
- **DevContainer Configuration** - Optimized for GitHub Codespaces
- **Custom Startup Processing** - Automated token and permission setup
- **Cross-Repository Permissions** - Manage access across breddin repositories

### GitHub CLI Integration
- **Safety Wrapper** - Secure GitHub CLI operations
- **GitHub API Integration** - Direct GitHub API access
- **PR Management Tools** - Automated pull request workflows

### Development Environment
- **Codespaces Optimization** - Enhanced development experience
- **Automated Token Management** - Seamless authentication setup
- **Container Startup Scripts** - Environment preparation automation

## 🔄 Sync Process

### Manual Sync
```bash
# Check for upstream changes
git fetch upstream

# Create sync branch
git checkout -b sync-$(date +%Y%m%d)

# Merge upstream changes
git merge upstream/main

# Push and create PR
git push origin sync-$(date +%Y%m%d)
gh pr create --title "Sync from baseline $(date +%Y-%m-%d)"
```

### Automated Sync
The repository includes automated workflows that:
1. **Monitor upstream changes** - Weekly checks for new updates
2. **Create sync branches** - Automated branch creation with conflict detection
3. **Preserve custom features** - Maintain GitHub-specific customizations
4. **Generate pull requests** - Automated PR creation for review

## 📊 Feature Preservation

During sync operations, the following GitHub-specific features are automatically preserved:

### File Structure Additions
```
.github/workflows/          # GitHub Actions workflows
src/cli/simple-commands/github/  # GitHub CLI commands
src/utils/github-*          # GitHub utility functions
.devcontainer/              # Codespaces configuration
scripts/sync-manager.sh     # Repository sync tools
```

### Configuration Overrides
- GitHub token management
- Container startup scripts
- DevContainer settings
- GitHub-specific environment variables

## 🛠 Development Workflow

### Feature Development
1. **Create feature branch** from `main`
2. **Develop GitHub-specific features** 
3. **Test with sync process** to ensure compatibility
4. **Submit pull request** for review

### Upstream Integration
1. **Monitor baseline repository** for updates
2. **Run automated sync** or manual merge
3. **Resolve conflicts** while preserving custom features
4. **Test integration** with GitHub-specific functionality

## 🔍 Troubleshooting

### Common Issues

#### Sync Conflicts
```bash
# Check conflict status
./scripts/sync-manager.sh check-health

# Manual conflict resolution
git status
git diff
git add <resolved-files>
git commit -m "Resolve sync conflicts"
```

#### Remote Configuration
```bash
# Re-run setup if remotes are misconfigured
./scripts/setup-repository.sh
```

#### Package.json Issues
```bash
# The setup script automatically updates package.json
# to point to the correct repository URLs
```

## 📞 Support & Contact

- **Repository Issues** - Use GitHub Issues in this repository
- **Upstream Issues** - Submit to `breddin/claude-flow-baseline`
- **Master Issues** - Submit to `ruvnet/claude-code-flow`

## 📈 Version Management

This repository follows the upstream versioning with GitHub-specific enhancements:
- **Core version** follows `ruvnet/claude-code-flow`
- **GitHub features** use feature flags and independent versioning
- **Container features** are backwards compatible

---

**Last Updated:** August 22, 2025  
**Repository:** breddin/claude-flow-github  
**Upstream:** breddin/claude-flow-baseline  
**Master:** ruvnet/claude-code-flow
