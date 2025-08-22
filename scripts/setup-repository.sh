#!/bin/bash

# Claude Flow Repository Setup Script
# Configures the current repository with proper upstream relationships

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[SETUP]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Detect current repository type
detect_repo_type() {
    local repo_url=$(git remote get-url origin 2>/dev/null || echo "")
    
    if [[ "$repo_url" == *"claude-flow-baseline"* ]]; then
        echo "baseline"
    elif [[ "$repo_url" == *"claude-flow-github"* ]]; then
        echo "github"
    elif [[ "$repo_url" == *"claude-flow-ballerina"* ]]; then
        echo "ballerina"
    else
        echo "unknown"
    fi
}

# Setup remotes based on repository type
setup_remotes() {
    local repo_type="$1"
    
    log "Setting up remotes for $repo_type repository..."
    
    case "$repo_type" in
        "baseline")
            log "Adding upstream: ruvnet/claude-code-flow"
            git remote add upstream https://github.com/ruvnet/claude-code-flow.git 2>/dev/null || \
                git remote set-url upstream https://github.com/ruvnet/claude-code-flow.git
            ;;
        "github")
            log "Adding upstream: breddin/claude-flow-baseline"
            git remote add upstream https://github.com/breddin/claude-flow-baseline.git 2>/dev/null || \
                git remote set-url upstream https://github.com/breddin/claude-flow-baseline.git
            
            log "Adding master-upstream: ruvnet/claude-code-flow"
            git remote add master-upstream https://github.com/ruvnet/claude-code-flow.git 2>/dev/null || \
                git remote set-url master-upstream https://github.com/ruvnet/claude-code-flow.git
            ;;
        "ballerina")
            log "Adding upstream: breddin/claude-flow-github"
            git remote add upstream https://github.com/breddin/claude-flow-github.git 2>/dev/null || \
                git remote set-url upstream https://github.com/breddin/claude-flow-github.git
            
            log "Adding baseline-upstream: breddin/claude-flow-baseline"
            git remote add baseline-upstream https://github.com/breddin/claude-flow-baseline.git 2>/dev/null || \
                git remote set-url baseline-upstream https://github.com/breddin/claude-flow-baseline.git
            
            log "Adding master-upstream: ruvnet/claude-code-flow"
            git remote add master-upstream https://github.com/ruvnet/claude-code-flow.git 2>/dev/null || \
                git remote set-url master-upstream https://github.com/ruvnet/claude-code-flow.git
            ;;
        *)
            error "Unknown repository type: $repo_type"
            return 1
            ;;
    esac
}

# Update package.json repository information
update_package_json() {
    local repo_type="$1"
    local current_repo=$(git remote get-url origin | sed 's/\.git$//')
    
    if [[ -f "package.json" ]]; then
        log "Updating package.json repository information..."
        
        # Create a backup
        cp package.json package.json.backup
        
        # Update repository URL using node
        node -e "
            const fs = require('fs');
            const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            
            if (pkg.repository && typeof pkg.repository === 'object') {
                pkg.repository.url = 'git+${current_repo}.git';
            }
            
            if (pkg.bugs && typeof pkg.bugs === 'object') {
                pkg.bugs.url = '${current_repo}/issues';
            }
            
            if (pkg.homepage) {
                pkg.homepage = '${current_repo}#readme';
            }
            
            fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
        "
        
        success "Updated package.json repository information"
    fi
}

# Fetch all remotes
fetch_remotes() {
    log "Fetching from all remotes..."
    
    git remote -v | grep fetch | while read remote url _; do
        log "Fetching from $remote..."
        git fetch "$remote" || warning "Failed to fetch from $remote"
    done
}

# Show repository status
show_status() {
    echo ""
    echo "=== Repository Setup Complete ==="
    echo ""
    
    log "Repository Type: $(detect_repo_type)"
    log "Current Branch: $(git branch --show-current)"
    
    echo ""
    log "Configured Remotes:"
    git remote -v
    
    echo ""
    log "Recent Commits:"
    git log --oneline -5
    
    echo ""
    success "Repository is ready for Claude Flow development!"
}

# Main execution
main() {
    echo "Claude Flow Repository Setup"
    echo "============================"
    echo ""
    
    # Check if we're in a git repository
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        error "Not in a git repository"
        exit 1
    fi
    
    # Detect repository type
    local repo_type=$(detect_repo_type)
    log "Detected repository type: $repo_type"
    
    if [[ "$repo_type" == "unknown" ]]; then
        error "Cannot determine repository type from origin URL"
        echo "Please ensure you're in a claude-flow repository"
        exit 1
    fi
    
    # Setup remotes
    setup_remotes "$repo_type"
    
    # Update package.json
    update_package_json "$repo_type"
    
    # Fetch remotes
    fetch_remotes
    
    # Show status
    show_status
}

main "$@"
