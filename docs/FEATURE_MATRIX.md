# Claude Flow Feature Matrix

This document tracks features across the Claude Flow repository ecosystem to help maintain visibility into what capabilities exist in each variant.

## Repository Feature Comparison

| Feature Category | Upstream | Baseline | GitHub | Ballerina |
|------------------|----------|----------|--------|-----------|
| **Core AI Orchestration** | ✅ | ✅ | ✅ | ✅ |
| **Basic CLI** | ✅ | ✅ | ✅ | ✅ |
| **Memory Management** | ✅ | ✅ | ✅ | ✅ |
| **Swarm Coordination** | ✅ | ✅ | ✅ | ✅ |

## GitHub-Specific Features

| Feature | Baseline | GitHub | Ballerina |
|---------|----------|--------|-----------|
| **GitHub CLI Safety Wrapper** | ❌ | ✅ | ✅ |
| **Container Startup Processing** | ❌ | ✅ | ✅ |
| **Codespaces Optimization** | ❌ | ✅ | ✅ |
| **Cross-Repository Permissions** | ❌ | ✅ | ✅ |
| **GitHub Token Management** | ❌ | ✅ | ✅ |
| **GitHub API Integration** | ❌ | ✅ | ✅ |
| **PR Management Tools** | ❌ | ✅ | ✅ |
| **GitHub Actions Integration** | ❌ | ✅ | ✅ |

## Ballerina-Specific Features

| Feature | Baseline | GitHub | Ballerina |
|---------|----------|--------|-----------|
| **Ballerina Runtime** | ❌ | ❌ | ✅ |
| **Ballerina Language Support** | ❌ | ❌ | ✅ |
| **Enterprise Integration Patterns** | ❌ | ❌ | ✅ |
| **Ballerina Package Management** | ❌ | ❌ | ✅ |
| **Ballerina Testing Framework** | ❌ | ❌ | ✅ |
| **HTTP/gRPC Connectors** | ❌ | ❌ | ✅ |
| **Database Connectors** | ❌ | ❌ | ✅ |
| **Message Queue Integration** | ❌ | ❌ | ✅ |

## Container & DevOps Features

| Feature | Upstream | Baseline | GitHub | Ballerina |
|---------|----------|----------|--------|-----------|
| **Docker Support** | ✅ | ✅ | ✅ | ✅ |
| **DevContainer Configuration** | ❌ | ❌ | ✅ | ✅ |
| **GitHub Codespaces Support** | ❌ | ❌ | ✅ | ✅ |
| **Custom Startup Scripts** | ❌ | ❌ | ✅ | ✅ |
| **Permission Management** | ❌ | ❌ | ✅ | ✅ |
| **Automated Token Setup** | ❌ | ❌ | ✅ | ✅ |

## File Structure Differences

### GitHub Repository Additions
```
├── .github/
│   ├── workflows/
│   │   ├── repository-sync.yml      # NEW: Auto-sync workflow
│   │   └── github-integration.yml   # NEW: GitHub-specific CI
│   └── ISSUE_TEMPLATE/              # NEW: GitHub issue templates
├── src/
│   ├── cli/simple-commands/github/  # NEW: GitHub CLI commands
│   └── utils/
│       ├── github-cli-safety-wrapper.js  # NEW: GitHub CLI wrapper
│       └── github-cli-safe.js             # NEW: Safe GitHub operations
├── scripts/
│   └── sync-manager.sh              # NEW: Repository sync management
├── .devcontainer/
│   ├── devcontainer.json           # NEW: Codespaces configuration
│   └── setup-github-token.sh       # NEW: Token setup automation
├── .env.github-token               # NEW: GitHub token configuration
├── test-github-setup.sh            # NEW: GitHub setup testing
└── docs/
    ├── REPOSITORY_ARCHITECTURE.md  # NEW: Architecture documentation
    └── integrations/github.md       # NEW: GitHub integration guide
```

### Ballerina Repository Additions
```
├── src/ballerina/                   # NEW: Ballerina source code
├── ballerina/                       # NEW: Ballerina project structure
├── Ballerina.toml                   # NEW: Ballerina project config
├── Dependencies.toml                # NEW: Ballerina dependencies
├── src/
│   └── cli/simple-commands/ballerina/  # NEW: Ballerina CLI commands
├── .claude/agents/ballerina/           # NEW: Ballerina-specific agents
└── docs/
    └── integrations/ballerina.md      # NEW: Ballerina integration guide
```

## Version Compatibility Matrix

| Repository | Claude Flow Core | Node.js | GitHub CLI | Ballerina |
|------------|------------------|---------|------------|-----------|
| **Upstream** | Latest | ≥20.0.0 | N/A | N/A |
| **Baseline** | Latest | ≥20.0.0 | N/A | N/A |
| **GitHub** | Latest | ≥20.0.0 | ≥2.0.0 | N/A |
| **Ballerina** | Latest | ≥20.0.0 | ≥2.0.0 | ≥2201.8.0 |

## Dependency Tracking

### Shared Dependencies
- TypeScript ≥5.3.3
- Jest ≥29.7.0
- ESLint ≥8.57.1
- Prettier ≥3.1.1

### GitHub-Specific Dependencies
- @octokit/rest
- github-cli-wrapper
- codespaces-helpers

### Ballerina-Specific Dependencies
- ballerina-lang
- ballerina-http
- ballerina-sql
- ballerina-graphql

## Configuration Differences

### Environment Variables

| Variable | Upstream | Baseline | GitHub | Ballerina |
|----------|----------|----------|--------|-----------|
| `CLAUDE_FLOW_*` | ✅ | ✅ | ✅ | ✅ |
| `GITHUB_TOKEN` | ❌ | ❌ | ✅ | ✅ |
| `CODESPACES_*` | ❌ | ❌ | ✅ | ✅ |
| `BALLERINA_*` | ❌ | ❌ | ❌ | ✅ |

### Package.json Scripts

| Script | Upstream | Baseline | GitHub | Ballerina |
|--------|----------|----------|--------|-----------|
| Standard builds | ✅ | ✅ | ✅ | ✅ |
| `github:*` | ❌ | ❌ | ✅ | ✅ |
| `ballerina:*` | ❌ | ❌ | ❌ | ✅ |
| `container:*` | ❌ | ❌ | ✅ | ✅ |

## Testing Strategy

### Test Categories by Repository

| Test Type | Upstream | Baseline | GitHub | Ballerina |
|-----------|----------|----------|--------|-----------|
| **Unit Tests** | ✅ | ✅ | ✅ | ✅ |
| **Integration Tests** | ✅ | ✅ | ✅ | ✅ |
| **E2E Tests** | ✅ | ✅ | ✅ | ✅ |
| **GitHub Integration Tests** | ❌ | ❌ | ✅ | ✅ |
| **Container Tests** | ❌ | ❌ | ✅ | ✅ |
| **Ballerina Language Tests** | ❌ | ❌ | ❌ | ✅ |

## Maintenance Schedule

### Sync Frequency
- **Upstream → Baseline**: Weekly (Automated)
- **Baseline → GitHub**: Bi-weekly (Automated with review)
- **GitHub → Ballerina**: Monthly (Automated with review)

### Feature Development Cycles
- **GitHub Features**: 2-week sprints
- **Ballerina Features**: 4-week cycles
- **Core Features**: Follows upstream schedule

## Migration Paths

### Adding Features to Downstream
1. Develop feature in target repository
2. Test compatibility with upstream sync
3. Document feature-specific preservation rules
4. Update sync automation scripts

### Contributing Back to Upstream
1. Develop feature in baseline repository
2. Submit PR to upstream (ruvnet/claude-code-flow)
3. Update sync automation after merge

---

*Last Updated: August 22, 2025*
*Maintainers: breddin team*
