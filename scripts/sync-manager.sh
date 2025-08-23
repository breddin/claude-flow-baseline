#!/bin/bash

# Claude Flow Baseline Repository Sync Manager
# Specialized version for the baseline repository (pure mirror)

set -e

# Configuration - Baseline Repository Specific
UPSTREAM_REPO="https://github.com/ruvnet/claude-code-flow.git"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Setup remote repositories for baseline
setup_remotes() {
    log "Setting up remotes for baseline repository..."
    
    # Baseline only needs upstream (ruvnet/claude-code-flow)
    git remote add upstream "$UPSTREAM_REPO" 2>/dev/null || \
        git remote set-url upstream "$UPSTREAM_REPO"
    
    success "Configured upstream: $UPSTREAM_REPO"
    git remote -v
}

# Sync baseline from upstream (ruvnet/claude-code-flow)
sync_baseline() {
    log "Syncing baseline repository from ruvnet/claude-code-flow..."
    
    # This is the critical sync for the entire ecosystem
    log "⚠️  CRITICAL: This sync affects ALL downstream repositories"
    
    # Fetch upstream changes
    log "Fetching from upstream..."
    git fetch upstream
    
    # Show what we're about to pull
    local commit_count=$(git rev-list --count HEAD..upstream/main 2>/dev/null || echo "0")
    log "Commits to sync: $commit_count"
    
    if [[ "$commit_count" -gt 100 ]]; then
        warning "Large sync detected ($commit_count commits)"
        echo "Recent upstream commits:"
        git log --oneline upstream/main -10
        echo ""
        read -p "Continue with sync? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log "Sync cancelled by user"
            return 1
        fi
    fi
    
    # Create sync branch
    local sync_branch="upstream-sync-$(date +%Y%m%d-%H%M)"
    log "Creating sync branch: $sync_branch"
    git checkout -b "$sync_branch" main
    
    # For baseline, we do a clean merge (no custom features to preserve)
    log "Merging upstream changes..."
    if git merge upstream/main --no-edit; then
        success "Upstream merge successful"
        
        # Show what changed
        log "Changes summary:"
        git diff --stat main.."$sync_branch"
        
        # Push sync branch
        log "Pushing sync branch..."
        git push origin "$sync_branch"
        
        # Create PR if GitHub CLI is available
        if command -v gh &> /dev/null; then
            log "Creating pull request..."
            gh pr create \
                --title "🔄 Sync from upstream ruvnet/claude-code-flow $(date +%Y-%m-%d)" \
                --body "Automated sync from ruvnet/claude-code-flow

**Commits synced:** $commit_count
**Sync type:** Baseline (clean mirror)
**Branch:** $sync_branch

This sync brings the baseline repository up to date with the master upstream repository.
All downstream repositories (github, ballerina) will inherit these changes.

### Changes Overview
$(git log --oneline main..upstream/main | head -10)

### Testing Checklist
- [ ] Build passes
- [ ] No breaking changes to core functionality  
- [ ] Package.json version updated appropriately
- [ ] Dependencies resolved correctly

### Next Steps
After merging this PR:
1. Trigger sync for claude-flow-github repository
2. Trigger sync for claude-flow-ballerina repository
3. Verify all downstream repositories function correctly" \
                --base main \
                --head "$sync_branch"
            
            success "Pull request created successfully"
        else
            warning "GitHub CLI not found. Please create PR manually for branch: $sync_branch"
        fi
        
        # Return to main branch
        git checkout main
        
    else
        error "Merge conflicts detected in baseline sync"
        log "This is unusual for a baseline repository (pure mirror)"
        log "Manual resolution required. Current branch: $sync_branch"
        log "After resolving conflicts:"
        log "  1. git add <resolved-files>"
        log "  2. git commit -m 'Resolve baseline sync conflicts'"
        log "  3. git push origin $sync_branch"
        log "  4. Create PR manually"
        return 1
    fi
}

# Baseline-specific health check
check_health() {
    log "Checking baseline repository health..."
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        error "Not in a git repository"
        return 1
    fi
    
    # Check if this looks like the baseline repository
    local repo_url=$(git remote get-url origin 2>/dev/null || echo "")
    if [[ "$repo_url" != *"claude-flow-baseline"* ]]; then
        warning "Repository URL doesn't contain 'claude-flow-baseline'"
        warning "Current origin: $repo_url"
        warning "Expected: */claude-flow-baseline.git"
    fi
    
    # Check for uncommitted changes
    if ! git diff --quiet || ! git diff --cached --quiet; then
        warning "Uncommitted changes detected"
        git status --short
    fi
    
    # Check upstream connectivity
    log "Checking upstream connectivity..."
    if git remote | grep -q "upstream"; then
        if git ls-remote upstream > /dev/null 2>&1; then
            success "Upstream remote accessible"
            local behind_count=$(git rev-list --count HEAD..upstream/main 2>/dev/null || echo "unknown")
            log "Commits behind upstream: $behind_count"
        else
            error "Cannot connect to upstream remote"
            return 1
        fi
    else
        warning "No upstream remote configured"
        log "Run './scripts/sync-manager.sh setup-remotes' to configure"
    fi
    
    # Check if we have downstream repositories
    log "Checking for downstream repositories..."
    local parent_dir=$(dirname "$PWD")
    if [[ -d "$parent_dir/claude-flow-github" ]]; then
        success "Found downstream: claude-flow-github"
    else
        warning "Downstream repository claude-flow-github not found in $parent_dir"
    fi
    
    if [[ -d "$parent_dir/claude-flow-ballerina" ]]; then
        success "Found downstream: claude-flow-ballerina"
    else
        warning "Downstream repository claude-flow-ballerina not found in $parent_dir"
    fi
    
    success "Baseline repository health check completed"
}

# Check sync status across the chain
check_sync_status() {
    log "Checking sync status across repository chain..."
    
    # Check this repository vs upstream
    if git remote | grep -q "upstream"; then
        git fetch upstream
        local behind_upstream=$(git rev-list --count HEAD..upstream/main 2>/dev/null || echo "unknown")
        log "📊 baseline ← upstream: $behind_upstream commits behind"
    fi
    
    # Check downstream repositories if they exist
    local parent_dir=$(dirname "$PWD")
    
    if [[ -d "$parent_dir/claude-flow-github" ]]; then
        cd "$parent_dir/claude-flow-github"
        if git remote | grep -q "upstream"; then
            git fetch upstream
            local github_behind=$(git rev-list --count HEAD..upstream/main 2>/dev/null || echo "unknown")
            log "📊 github ← baseline: $github_behind commits behind"
        fi
        cd - > /dev/null
    fi
    
    if [[ -d "$parent_dir/claude-flow-ballerina" ]]; then
        cd "$parent_dir/claude-flow-ballerina"
        if git remote | grep -q "upstream"; then
            git fetch upstream
            local ballerina_behind=$(git rev-list --count HEAD..upstream/main 2>/dev/null || echo "unknown")
            log "📊 ballerina ← github: $ballerina_behind commits behind"
        fi
        cd - > /dev/null
    fi
}

# Show help
show_help() {
    cat << EOF
Claude Flow Baseline Repository Sync Manager

This is the specialized version for the baseline repository (claude-flow-baseline).
The baseline repository serves as a clean mirror of ruvnet/claude-code-flow.

Usage: $0 [COMMAND]

Commands:
    setup-remotes           Setup upstream remote (ruvnet/claude-code-flow)
    sync-baseline          Sync from ruvnet/claude-code-flow 
    check-health           Check repository health and configuration
    check-sync-status      Check sync status across entire chain
    help                   Show this help message

Examples:
    $0 setup-remotes
    $0 sync-baseline
    $0 check-health

Important Notes:
- This repository is a PURE MIRROR of ruvnet/claude-code-flow
- No custom features should be added here
- All downstream repositories depend on this repository
- Sync carefully as changes affect the entire ecosystem

EOF
}

# Main execution
main() {
    case "${1:-help}" in
        "setup-remotes")
            setup_remotes
            ;;
        "sync-baseline")
            check_health && sync_baseline
            ;;
        "check-health")
            check_health
            ;;
        "check-sync-status")
            check_sync_status
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

main "$@"
