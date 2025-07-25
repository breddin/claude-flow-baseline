#!/bin/bash

# Welcome message for Claude Flow Codespace

cat << 'EOF'

🚀 Welcome to Claude Flow Development Environment!
================================================

⚠️  IMPORTANT: Complete setup by running:
   
   ./.devcontainer/setup.sh

This will install npm dependencies and handle the Deno installation properly.

📖 Documentation:
   - Setup Guide: ./CODESPACES.md
   - Project Docs: ./docs/

🔧 Quick Start:
   1. Run: ./.devcontainer/setup.sh
   2. Configure GitHub token (see CODESPACES.md)
   3. Initialize: npx claude-flow init --sparc
   4. Start coding!

EOF
