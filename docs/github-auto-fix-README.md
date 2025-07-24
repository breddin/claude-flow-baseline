# GitHub Issues Auto-Detection and Fix System

## Overview

The Claude Flow GitHub Auto-Fix System automatically detects GitHub issues and deploys AI agents to analyze and fix them. It integrates with the existing SPARC methodology and swarm coordination systems to provide intelligent, automated issue resolution.

## Features

### 🤖 Automatic Issue Detection
- Monitors GitHub repositories via webhooks
- Analyzes issue content and labels
- Triggers automated processing for eligible issues
- Supports manual triggering via comments

### 🧠 AI-Powered Analysis
- **SPARC Integration**: Uses SPARC methodology for systematic analysis
- **Swarm Coordination**: Deploys multiple AI agents for complex issues
- **Root Cause Analysis**: Identifies underlying problems
- **Solution Strategy**: Creates targeted fix approaches

### 🔧 Intelligent Issue Resolution
- Automatic code analysis and fixes
- Pull request creation for proposed solutions
- Test generation for regression prevention
- Documentation updates

### 📊 Real-time Monitoring
- Live processing status
- Queue management
- Progress tracking
- Result reporting

## Quick Start

### 1. Installation

```bash
# Install dependencies
npm install

# Set up environment variables
export GITHUB_TOKEN="your_github_personal_access_token"
export GITHUB_WEBHOOK_SECRET="your_webhook_secret"  # Optional but recommended
```

### 2. Configuration

```bash
# Configure the system interactively
node src/cli/commands/github-auto-fix.js configure

# Or add repositories manually
node src/cli/commands/github-auto-fix.js add-repo owner/repository-name
```

### 3. Start the System

```bash
# Start with default settings
node src/cli/commands/github-auto-fix.js start

# Start with custom port
node src/cli/commands/github-auto-fix.js start --port 3001

# Start without SPARC or Swarm
node src/cli/commands/github-auto-fix.js start --no-sparc --no-swarm
```

### 4. Set Up GitHub Webhooks

```bash
# Get webhook setup instructions
node src/cli/commands/github-auto-fix.js webhook-setup owner/repo
```

## Configuration

### Basic Configuration

The system uses a `github-auto-fix-config.json` file for configuration:

```json
{
  "enabled": true,
  "repositories": ["owner/repo1", "owner/repo2"],
  "autoFixLabels": ["bug", "auto-fix", "good first issue"],
  "ignoredLabels": ["wontfix", "duplicate", "invalid"],
  "maxConcurrentIssues": 3,
  "webhookPort": 3001,
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
  }
}
```

### GitHub Webhook Configuration

1. Go to your repository settings: `https://github.com/owner/repo/settings/hooks`
2. Click "Add webhook"
3. Configure:
   - **Payload URL**: `http://your-server.com:3001/github-webhook`
   - **Content type**: `application/json`
   - **Secret**: Your webhook secret (optional)
   - **Events**: Issues, Issue comments, Pushes
4. Ensure "Active" is checked

## Usage

### Automatic Triggering

Issues are automatically processed when they:
- Are labeled with trigger labels (`bug`, `auto-fix`, `good first issue`)
- Contain keywords indicating fixable problems
- Are opened in monitored repositories

### Manual Triggering

Add a comment to any issue with:
```
/auto-fix
```
or
```
/claude-fix
```

### Testing

Test the system with a specific issue:
```bash
node src/cli/commands/github-auto-fix.js test-issue owner repo 123
```

## GitHub Actions Integration

### Automatic Workflow

Copy the provided `.github/workflows/claude-flow-auto-fix.yml` to your repository to enable:

- Automatic issue processing
- Code analysis on push
- SPARC analysis for complex issues
- Swarm coordination for team tasks

### Manual Workflow Triggers

Add these labels to issues for specific processing:
- `sparc-analysis` - Triggers SPARC methodology analysis
- `swarm-task` - Initializes swarm coordination
- `auto-fix` - Triggers automatic fix attempt

## CLI Commands

### System Management
```bash
# Start the auto-fix system
github-auto-fix start [options]

# Check system status
github-auto-fix status

# Configure interactively
github-auto-fix configure
```

### Repository Management
```bash
# Add repository to monitor
github-auto-fix add-repo owner/repo

# Set up webhooks
github-auto-fix webhook-setup owner/repo [--url custom-url]
```

### Testing and Debugging
```bash
# Test with specific issue
github-auto-fix test-issue owner repo issue-number

# View logs
github-auto-fix logs [--lines 50]
```

## Integration with SPARC Methodology

The system integrates with SPARC through several modes:

### Debug Specialist Mode
- Analyzes error-related issues
- Identifies root causes
- Suggests targeted fixes

### Architecture Reviewer Mode
- Reviews feature requests
- Designs implementation approaches
- Validates architectural decisions

### Security Auditor Mode
- Scans for security vulnerabilities
- Suggests security improvements
- Validates fix implementations

## Integration with Swarm Coordination

### Agent Roles

The system deploys specialized agents:

- **Analyzer**: Examines issue details and code
- **Debugger**: Identifies and fixes bugs
- **Tester**: Creates and runs tests
- **Fixer**: Implements solutions
- **Reviewer**: Validates changes

### Coordination Patterns

- **Hierarchical**: Coordinator manages specialized agents
- **Mesh**: Agents collaborate directly
- **Star**: Central coordinator with worker agents

## Issue Processing Workflow

1. **Detection**: Webhook receives issue event
2. **Filtering**: Check if issue should be auto-fixed
3. **Analysis**: SPARC methodology analyzes the issue
4. **Strategy**: Create fix approach based on analysis
5. **Implementation**: Swarm agents implement the fix
6. **Validation**: Test and verify the solution
7. **Reporting**: Update issue with results

## Auto-Fix Capabilities

### Automatically Fixable Issues

✅ **Simple Bugs**
- Typos in code comments
- Missing semicolons/imports
- Simple logic errors

✅ **Code Quality Issues**
- Linting violations
- Formatting problems
- Deprecated API usage

✅ **Documentation Issues**
- Missing docstrings
- Broken links
- Outdated examples

### Human Review Required

⚠️ **Complex Logic**
- Algorithm changes
- Business logic modifications
- Performance optimizations

⚠️ **Security Issues**
- Authentication problems
- Authorization changes
- Cryptographic implementations

⚠️ **Breaking Changes**
- API modifications
- Database schema changes
- Major refactoring

## Monitoring and Logging

### System Status
```bash
# Real-time status
github-auto-fix status

# Processing metrics
{
  "activeProcesses": 2,
  "queuedProcesses": 1,
  "processedToday": 15,
  "successRate": "87%"
}
```

### Issue Comments

The system adds detailed comments to processed issues:

```markdown
## 🤖 Auto-Fix Analysis Report

### Issue Analysis
- **Type**: error
- **Severity**: high
- **Complexity**: medium
- **Related Files**: src/utils/parser.js, tests/parser.test.js

### Fix Strategy
- **Approach**: debug
- **Auto-fixable**: Yes
- **Human Review Required**: No

### Implementation Result
- **Status**: ✅ Success
- **Result**: Fix implemented successfully using swarm coordination
- **Pull Request**: Created on branch `auto-fix/issue-123`
- **Tests**: Added regression tests

### Next Steps
1. Review the proposed fix in PR #456
2. Run additional integration tests
3. Merge if tests pass
```

## Security Considerations

### Access Control
- Requires GitHub personal access token
- Respects repository permissions
- Optional webhook signature verification

### Safe Processing
- Read-only analysis by default
- Human review for sensitive changes
- Automatic rollback on failures

### Data Privacy
- No persistent storage of repository data
- Webhook payload verification
- Encrypted communication

## Troubleshooting

### Common Issues

**System won't start**
```bash
# Check GitHub token
echo $GITHUB_TOKEN

# Verify permissions
github-auto-fix status
```

**Webhooks not working**
```bash
# Test webhook locally
curl -X POST http://localhost:3001/github-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

**Issues not being processed**
```bash
# Check repository configuration
github-auto-fix status

# Test specific issue
github-auto-fix test-issue owner repo 123
```

### Debug Mode

Enable verbose logging:
```bash
DEBUG=github-auto-fix* github-auto-fix start
```

## Contributing

### Adding New Fix Strategies

1. Extend the `createFixStrategy` method in `issue-auto-fix.js`
2. Add new agent roles to swarm configuration
3. Update SPARC mode mappings
4. Add tests for new strategies

### Improving Detection

1. Enhance issue analysis algorithms
2. Add new trigger labels or keywords
3. Improve code analysis capabilities
4. Extend webhook event handling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Open an issue in the repository
- Check the troubleshooting guide
- Review system logs
- Contact the development team

---

*Powered by Claude Flow, SPARC Methodology, and Swarm Coordination*
