#!/bin/bash

# Codespace setup script for Claude Flow
# Handles interactive installations automatically

set -e

echo "🚀 Starting Claude Flow Codespace setup..."

# Set non-interactive mode for package installations
export DEBIAN_FRONTEND=noninteractive

# Function to handle npm install with automatic confirmation
install_with_confirmation() {
    echo "📦 Installing npm dependencies..."
    
    # Try normal install first
    if npm install 2>/dev/null; then
        echo "✅ npm install completed successfully"
        return 0
    fi
    
    echo "🔄 npm install needs confirmation, providing automatic responses..."
    
    # If that fails, try with automatic yes responses
    printf 'Y\nY\nY\n' | npm install || {
        echo "⚠️  npm install with confirmations failed, trying with expect..."
        
        # Install expect if not available
        if ! command -v expect &> /dev/null; then
            sudo apt-get update -qq && sudo apt-get install -y expect
        fi
        
        # Use expect to handle interactive prompts
        expect << 'EOF'
spawn npm install
expect {
    "*to allow editing shell configs*" { send "Y\r"; exp_continue }
    "*Do you want to continue*" { send "Y\r"; exp_continue }
    "*Proceed*" { send "Y\r"; exp_continue }
    eof
}
EOF
    }
}

# Main installation
install_with_confirmation

echo "🎉 Claude Flow Codespace setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Configure your GitHub token (see CODESPACES.md)"
echo "2. Run: npx claude-flow init --sparc"
echo "3. Start developing!"
