# 🔑 SYNC_TOKEN Setup Guide

## Overview
The repository sync workflows require a Personal Access Token (PAT) with cross-repository permissions to enable automatic synchronization between repositories in your organization.

## Why is this needed?
The default `GITHUB_TOKEN` provided by GitHub Actions has limited permissions:
- ✅ **Can read/write to the repository where the workflow runs**
- ❌ **Cannot access other repositories** (even in the same organization)

Our sync workflows need to:
- **claude-flow-github** → fetch from **claude-flow-baseline** (❌ 403 error)
- **claude-flow-ballerina** → fetch from **claude-flow-github** (❌ 403 error)

## 🔧 Solution: Create a SYNC_TOKEN

### Step 1: Create Personal Access Token

1. **Go to GitHub Settings**
   - Navigate to: https://github.com/settings/tokens
   - Or: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate new token (classic)**
   - Click "Generate new token" → "Generate new token (classic)"
   - **Name**: `Claude Flow Sync Token`
   - **Expiration**: Choose appropriate duration (90 days recommended)

3. **Select Required Scopes**
   ```
   ✅ repo (Full control of private repositories)
     ✅ repo:status
     ✅ repo_deployment  
     ✅ public_repo
     ✅ repo:invite
     ✅ security_events
   
   ✅ workflow (Update GitHub Action workflows)
   
   ✅ write:packages (if you use GitHub Packages)
   ✅ read:packages (if you use GitHub Packages)
   ```

4. **Generate and Copy Token**
   - Click "Generate token"
   - **⚠️ IMPORTANT**: Copy the token immediately - you won't see it again!

### Step 2: Add Token to Repository Secrets

You need to add this token to **ALL repositories** that will run sync workflows:

#### For claude-flow-baseline:
1. Go to: https://github.com/breddin/claude-flow-baseline/settings/secrets/actions
2. Click "New repository secret"
3. **Name**: `SYNC_TOKEN`
4. **Secret**: Paste your PAT
5. Click "Add secret"

#### For claude-flow-github:
1. Go to: https://github.com/breddin/claude-flow-github/settings/secrets/actions
2. Click "New repository secret"
3. **Name**: `SYNC_TOKEN`
4. **Secret**: Paste your PAT
5. Click "Add secret"

#### For claude-flow-ballerina:
1. Go to: https://github.com/breddin/claude-flow-ballerina/settings/secrets/actions
2. Click "New repository secret"
3. **Name**: `SYNC_TOKEN`
4. **Secret**: Paste your PAT
5. Click "Add secret"

### Step 3: Update Workflow Files

I've already updated the workflows to use `SYNC_TOKEN` when available. The updated workflow will:

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.SYNC_TOKEN || secrets.GITHUB_TOKEN }}
```

This means:
- ✅ **If SYNC_TOKEN exists**: Use it (full permissions)
- ✅ **If SYNC_TOKEN missing**: Fall back to GITHUB_TOKEN (limited permissions)

## 🧪 Testing the Setup

### Test 1: Manual Workflow Trigger
1. Go to any repository's Actions tab
2. Find "Repository Sync Automation" workflow
3. Click "Run workflow"
4. Select "check-health" and run
5. Verify it completes without 403 errors

### Test 2: Cross-Repository Sync
1. In claude-flow-github repository
2. Actions → "Repository Sync Automation" → "Run workflow"
3. Select "sync-github" and run
4. Should successfully fetch from baseline without 403 errors

## 🔍 Troubleshooting

### Still getting 403 errors?
1. **Check token permissions**: Ensure `repo` scope is selected
2. **Verify secret name**: Must be exactly `SYNC_TOKEN`
3. **Check token expiration**: Generate new token if expired
4. **Test token manually**:
   ```bash
   curl -H "Authorization: token YOUR_TOKEN" \
        https://api.github.com/repos/breddin/claude-flow-baseline
   ```

### Permission denied on workflow files?
- Ensure `workflow` scope is included in the PAT

### Token not found?
- The workflow will fall back to GITHUB_TOKEN
- Add SYNC_TOKEN secret to the repository

## 🔄 Workflow Behavior

### With SYNC_TOKEN (Recommended):
- ✅ Full cross-repository synchronization
- ✅ Automatic upstream monitoring  
- ✅ Cross-repository pull requests
- ✅ Complete sync chain functionality

### Without SYNC_TOKEN (Limited):
- ✅ Same-repository operations (health checks)
- ❌ Cross-repository sync (403 errors)
- ⚠️ Workflows will skip sync operations with warnings

## 🔐 Security Best Practices

1. **Use minimal required permissions**
2. **Set reasonable expiration dates** (90 days recommended)
3. **Rotate tokens regularly**
4. **Monitor token usage** in GitHub audit logs
5. **Revoke tokens immediately** if compromised

## 📋 Quick Checklist

- [ ] Create PAT with `repo` and `workflow` scopes
- [ ] Add `SYNC_TOKEN` secret to claude-flow-baseline
- [ ] Add `SYNC_TOKEN` secret to claude-flow-github  
- [ ] Add `SYNC_TOKEN` secret to claude-flow-ballerina
- [ ] Test workflow with "check-health" option
- [ ] Test cross-repository sync operation
- [ ] Verify no 403 errors in workflow logs

## 🆘 Need Help?

If you continue to see 403 errors after setup:
1. Check the workflow logs for specific error details
2. Verify token permissions and expiration
3. Test the token manually with curl commands
4. Ensure secret names match exactly (`SYNC_TOKEN`)

---

**Next Steps**: After setting up SYNC_TOKEN, the repository sync workflows will have full functionality and the 403 errors should be resolved! 🎉
