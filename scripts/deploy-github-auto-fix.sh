#!/bin/bash

# GitHub Auto-Fix System Deployment Script
# This script helps set up the GitHub Auto-Fix system

set -e

echo "🚀 Claude Flow GitHub Auto-Fix System Setup"
echo "============================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 16+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 16 ]; then
        print_error "Node.js version 16+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        print_warning "git is not installed. Some features may not work."
    fi
    
    print_success "Prerequisites check passed"
}

# Setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    # Check if .env file exists
    if [ ! -f .env ]; then
        print_status "Creating .env file..."
        cat > .env << EOF
# GitHub Auto-Fix System Environment Variables

# Required: GitHub Personal Access Token
# Get one from: https://github.com/settings/tokens
# Required permissions: repo, issues, pull_requests
GITHUB_TOKEN=

# Optional: Webhook secret for security
# Generate with: openssl rand -hex 32
GITHUB_WEBHOOK_SECRET=

# Optional: Custom webhook port
WEBHOOK_PORT=3001

# Optional: Enable debug logging
DEBUG=github-auto-fix*

# Optional: Custom server URL for webhooks
SERVER_URL=http://localhost:3001
EOF
        print_warning "Please edit .env file and add your GITHUB_TOKEN"
        print_status "Get a token from: https://github.com/settings/tokens"
        print_status "Required permissions: repo, issues, pull_requests"
    else
        print_success ".env file already exists"
    fi
    
    # Source the .env file
    if [ -f .env ]; then
        export $(cat .env | grep -v '^#' | xargs)
    fi
    
    # Validate GitHub token
    if [ -z "$GITHUB_TOKEN" ]; then
        print_error "GITHUB_TOKEN is not set. Please add it to your .env file."
        return 1
    fi
    
    # Test GitHub token
    if command -v curl &> /dev/null; then
        GITHUB_USER=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user | grep -o '"login":"[^"]*' | cut -d'"' -f4)
        if [ -n "$GITHUB_USER" ]; then
            print_success "GitHub token validated for user: $GITHUB_USER"
        else
            print_error "GitHub token validation failed"
            return 1
        fi
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install main dependencies
    npm install
    
    # Try to install optional dependencies
    print_status "Installing optional AI system dependencies..."
    
    # Try to install ruv-swarm
    if npm list ruv-swarm &> /dev/null || npm install ruv-swarm; then
        print_success "ruv-swarm installed successfully"
    else
        print_warning "ruv-swarm installation failed - swarm features will be limited"
    fi
    
    # Check for claude-flow
    if command -v claude-flow &> /dev/null; then
        print_success "claude-flow CLI found"
    else
        print_warning "claude-flow CLI not found - SPARC features may be limited"
    fi
    
    print_success "Dependencies installation completed"
}

# Initialize configuration
initialize_config() {
    print_status "Initializing configuration..."
    
    # Create config directory if it doesn't exist
    mkdir -p config
    
    # Create default configuration
    if [ ! -f github-auto-fix-config.json ]; then
        cat > github-auto-fix-config.json << EOF
{
  "enabled": true,
  "repositories": [],
  "autoFixLabels": ["bug", "auto-fix", "good first issue"],
  "ignoredLabels": ["wontfix", "duplicate", "invalid", "question"],
  "maxConcurrentIssues": 3,
  "webhookPort": ${WEBHOOK_PORT:-3001},
  "sparc": {
    "enabled": true,
    "mode": "debug_specialist",
    "memory_namespace": "github_autofix"
  },
  "swarm": {
    "enabled": true,
    "topology": "hierarchical",
    "maxAgents": 5,
    "roles": ["analyzer", "debugger", "tester", "fixer", "reviewer"]
  },
  "notifications": {
    "slack": null,
    "email": null,
    "github_comments": true
  }
}
EOF
        print_success "Default configuration created"
    else
        print_success "Configuration file already exists"
    fi
}

# Set up GitHub Actions workflow
setup_github_actions() {
    print_status "Setting up GitHub Actions workflow..."
    
    # Create .github directory
    mkdir -p .github/workflows
    
    # Copy workflow file if it exists in the project
    if [ -f ".github/workflows/claude-flow-auto-fix.yml" ]; then
        print_success "GitHub Actions workflow already configured"
    else
        print_warning "GitHub Actions workflow not found"
        print_status "Please copy .github/workflows/claude-flow-auto-fix.yml to your repository"
    fi
}

# Create systemd service (Linux only)
create_systemd_service() {
    if [ "$(uname)" = "Linux" ] && command -v systemctl &> /dev/null; then
        print_status "Creating systemd service..."
        
        SERVICE_FILE="/etc/systemd/system/github-auto-fix.service"
        CURRENT_DIR=$(pwd)
        CURRENT_USER=$(whoami)
        
        sudo tee $SERVICE_FILE > /dev/null << EOF
[Unit]
Description=GitHub Auto-Fix System
After=network.target

[Service]
Type=simple
User=$CURRENT_USER
WorkingDirectory=$CURRENT_DIR
Environment=NODE_ENV=production
EnvironmentFile=$CURRENT_DIR/.env
ExecStart=/usr/bin/node $CURRENT_DIR/src/cli/commands/github-auto-fix.js start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
        
        sudo systemctl daemon-reload
        sudo systemctl enable github-auto-fix
        
        print_success "Systemd service created and enabled"
        print_status "Use 'sudo systemctl start github-auto-fix' to start the service"
    else
        print_warning "Systemd not available - service creation skipped"
    fi
}

# Create startup scripts
create_startup_scripts() {
    print_status "Creating startup scripts..."
    
    # Create start script
    cat > start-auto-fix.sh << 'EOF'
#!/bin/bash
# Start GitHub Auto-Fix System

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Start the system
echo "🚀 Starting GitHub Auto-Fix System..."
node src/cli/commands/github-auto-fix.js start "$@"
EOF
    chmod +x start-auto-fix.sh
    
    # Create status script
    cat > status-auto-fix.sh << 'EOF'
#!/bin/bash
# Check GitHub Auto-Fix System Status

echo "📊 GitHub Auto-Fix System Status"
echo "================================"
node src/cli/commands/github-auto-fix.js status
EOF
    chmod +x status-auto-fix.sh
    
    # Create configure script
    cat > configure-auto-fix.sh << 'EOF'
#!/bin/bash
# Configure GitHub Auto-Fix System

echo "⚙️ GitHub Auto-Fix System Configuration"
echo "======================================="
node src/cli/commands/github-auto-fix.js configure
EOF
    chmod +x configure-auto-fix.sh
    
    print_success "Startup scripts created"
}

# Generate webhook setup instructions
generate_webhook_instructions() {
    print_status "Generating webhook setup instructions..."
    
    SERVER_URL=${SERVER_URL:-"http://localhost:3001"}
    
    cat > WEBHOOK_SETUP.md << EOF
# GitHub Webhook Setup Instructions

## Quick Setup

1. Go to your repository settings: \`https://github.com/OWNER/REPO/settings/hooks\`
2. Click "Add webhook"
3. Configure the webhook:

### Webhook Configuration

- **Payload URL**: \`$SERVER_URL/github-webhook\`
- **Content type**: \`application/json\`
- **Secret**: \`$(openssl rand -hex 16 2>/dev/null || echo "your-secret-here")\`

### Events to Subscribe

✅ **Issues** - For issue creation and labeling
✅ **Issue comments** - For manual triggers via comments
✅ **Pushes** - For code analysis (optional)

### Test Webhook

After setup, create a test issue with the label \`auto-fix\` to verify the system is working.

## Manual Testing

\`\`\`bash
# Test the webhook endpoint
curl -X POST $SERVER_URL/github-webhook \\
  -H "Content-Type: application/json" \\
  -H "X-GitHub-Event: ping" \\
  -d '{"zen":"GitHub webhook test"}'
\`\`\`

## Troubleshooting

- Ensure the server is running and accessible
- Check firewall settings if using external server
- Verify the webhook secret matches your configuration
- Check the webhook delivery logs in GitHub

EOF
    
    print_success "Webhook setup instructions created: WEBHOOK_SETUP.md"
}

# Run tests
run_tests() {
    print_status "Running system tests..."
    
    # Test CLI commands
    if node src/cli/commands/github-auto-fix.js status &> /dev/null; then
        print_success "CLI commands working"
    else
        print_warning "CLI commands test failed"
    fi
    
    # Test configuration loading
    if [ -f github-auto-fix-config.json ]; then
        if node -e "JSON.parse(require('fs').readFileSync('github-auto-fix-config.json', 'utf8'))" &> /dev/null; then
            print_success "Configuration file valid"
        else
            print_error "Configuration file invalid JSON"
        fi
    fi
    
    print_success "System tests completed"
}

# Main deployment function
main() {
    echo
    print_status "Starting GitHub Auto-Fix System deployment..."
    echo
    
    # Run setup steps
    check_prerequisites
    echo
    
    setup_environment
    if [ $? -ne 0 ]; then
        print_error "Environment setup failed. Please fix the issues and run again."
        exit 1
    fi
    echo
    
    install_dependencies
    echo
    
    initialize_config
    echo
    
    setup_github_actions
    echo
    
    create_startup_scripts
    echo
    
    generate_webhook_instructions
    echo
    
    run_tests
    echo
    
    # Optional systemd service
    read -p "Create systemd service for automatic startup? (Linux only) [y/N]: " create_service
    if [[ $create_service =~ ^[Yy]$ ]]; then
        create_systemd_service
        echo
    fi
    
    print_success "🎉 GitHub Auto-Fix System deployment completed!"
    echo
    echo "Next steps:"
    echo "1. Edit .env file and add your GITHUB_TOKEN"
    echo "2. Configure repositories: ./configure-auto-fix.sh"
    echo "3. Set up GitHub webhooks using WEBHOOK_SETUP.md instructions"
    echo "4. Start the system: ./start-auto-fix.sh"
    echo
    echo "For help: node src/cli/commands/github-auto-fix.js --help"
}

# Run if executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
