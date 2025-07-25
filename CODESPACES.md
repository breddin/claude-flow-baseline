# 🚀 Codespaces Setup Guide

## Environment Configuration for GitHub Codespaces

When launching this project in GitHub Codespaces, you'll need to configure your GitHub token for Claude access.

### Option 1: Using Codespaces Secrets (Recommended)

1. Go to your GitHub profile settings: https://github.com/settings/codespaces
2. Click "New secret" under "Codespaces secrets"
3. Name: `GITHUB_TOKEN`
4. Value: Your GitHub Personal Access Token (see below for creation)
5. Select this repository or all repositories

### Option 2: Using Environment File

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your GitHub token:
   ```bash
   GITHUB_TOKEN=ghp_your_actual_token_here
   ```

## Creating a GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Set expiration (30-90 days recommended)
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
   - ✅ `admin:repo_hook` (Admin access to repository hooks)
   - ✅ `admin:org_hook` (Admin access to organization hooks)
5. Click "Generate token"
6. Copy the token immediately (you won't see it again)

## Starting the Development Environment

Once your token is configured:

```bash
# Install dependencies
npm install

# Initialize SPARC environment
npx claude-flow init --sparc

# Start the development server
npm run dev

# Test GitHub integration
npx claude-flow github gh-coordinator "test connection"
```

## Port Forwarding

The Codespace will automatically forward these ports:
- Port 3000: Claude Flow main application
- Port 3001: MCP server

## Troubleshooting

### Token Issues
- Ensure your token has the correct scopes
- Check token expiration
- Verify the token is accessible: `echo $GITHUB_TOKEN`

### Environment Issues
- Restart the Codespace if environment variables aren't loading
- Check `.env` file exists and contains the token
- Use Codespaces secrets for better security

### Integration Testing
```bash
# Test GitHub API connection
npx claude-flow github gh-coordinator "verify connection"

# Check current repository context
git remote -v
```

## Security Notes

- Never commit `.env` files with real tokens
- Use Codespaces secrets for production environments
- Rotate tokens regularly (30-90 days)
- Set appropriate token scopes (minimal required)
