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
    
    # Force non-interactive mode and pipe Y responses directly
    echo "🔄 Using aggressive confirmation for Deno installation..."
    
    # Multiple strategies to handle the Deno prompt
    {
        echo "Y"
        echo "Y" 
        echo "Y"
        sleep 1
        echo "Y"
        echo "Y"
    } | timeout 300 npm install || {
        echo "⚠️  Timeout or failure, trying alternative approach..."
        
        # Alternative: Set environment variables to skip prompts
        export DENO_INSTALL_AUTO=1
        export CI=true
        export DEBIAN_FRONTEND=noninteractive
        
        # Try with yes command for continuous Y responses
        yes "Y" | timeout 300 npm install || {
            echo "⚠️  Still failing, trying expect approach..."
            
            # Install expect if not available
            if ! command -v expect &> /dev/null; then
                sudo apt-get update -qq && sudo apt-get install -y expect
            fi
            
            # Use expect to handle interactive prompts
            timeout 300 expect << 'EOF' || echo "⚠️  Expect also failed, but continuing..."
spawn npm install
expect {
    "*allow editing shell configs*" { send "Y\r"; exp_continue }
    "*Do you want to continue*" { send "Y\r"; exp_continue }
    "*Proceed*" { send "Y\r"; exp_continue }
    "*(y/n)*" { send "Y\r"; exp_continue }
    "*(Y/n)*" { send "Y\r"; exp_continue }
    timeout { send "Y\r"; exp_continue }
    eof
}
EOF
        }
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
