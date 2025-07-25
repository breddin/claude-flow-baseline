#!/bin/bash

# Claude Flow Manual Setup Script
# Run this after Codespace creation: ./devcontainer/setup.sh

set -e

echo "🚀 Claude Flow Manual Setup"
echo "=========================="
echo ""
echo "This script will install dependencies with proper Deno handling."
echo "Press Ctrl+C to cancel, or wait 5 seconds to continue..."
sleep 5

# Set environment variables to minimize prompts
export DEBIAN_FRONTEND=noninteractive
export CI=true
export DENO_INSTALL_AUTO=1

echo ""
echo "📦 Installing npm dependencies..."
echo "If prompted about Deno shell config, type 'Y' and press Enter."
echo ""

# Try to install with timeout to prevent hanging
timeout 600 npm install || {
    echo ""
    echo "⚠️  npm install timed out or failed."
    echo "You can try running it manually:"
    echo "  npm install"
    echo ""
    echo "If Deno prompts about shell config, just type 'Y'"
    exit 1
}

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Configure your GitHub token (see CODESPACES.md)"
echo "2. Run: npx claude-flow init --sparc"
echo "3. Start developing!"
echo ""
