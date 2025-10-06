# 🌊 Claude-Flow Baseline: Rolling Mirror Repository

This is a **rolling mirror** of [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow) maintained by @breddin.

## 🎯 Purpose

This repository serves as a **clean baseline** for tracking upstream changes from the main claude-flow project, with minimal modifications:

- ✅ **Rolling Updates**: Automatically synced with ruvnet/claude-flow
- ✅ **Minimal Patches**: Only essential compatibility fixes  
- ✅ **GitHub Token Support**: Handles $_GITHUB_PAT → $GITHUB_TOKEN mapping
- ❌ **No Custom Features**: No additional functionality beyond upstream

## 🔧 GitHub Token Configuration

For cross-repository operations, source the token configuration:

```bash
source .env.github-token
```

This maps your `$_GITHUB_PAT` environment variable to `$GITHUB_TOKEN` for claude-flow operations.

## 📊 Sync Status

Current upstream version: **v2.5.0-alpha.131**

### Downstream Repositories:
- **github**: 148 commits behind baseline
- **ballerina**: 334 commits behind baseline

Use `scripts/sync-manager.sh` to manage synchronization across the repository chain.

## 🔄 Sync Process

```bash
# Sync baseline from upstream
bash scripts/sync-manager.sh sync-baseline

# Propagate to github repository  
bash scripts/sync-manager.sh sync-github

# Propagate to ballerina repository
bash scripts/sync-manager.sh sync-ballerina
```

## 📝 Recent Upstream Changes (v2.5.0-alpha.131)

**Phase 4 SDK Integration** (January 2025):
- 10-20x faster agent spawning via Claude SDK
- Native code acceleration in swarm coordinator
- 3 new MCP tools: `agents_spawn_parallel`, `query_control`, `query_list`
- Total: 90 MCP tools (up from 87)

**Agentic Payments System**:
- Autonomous transaction capabilities
- Crypto payment integration (Coinbase, USDC, Solana)
- Agent-driven payment flows

**Permission System Enhancement**:
- Enhanced access controls for agents
- Fine-grained permission management

See [UPSTREAM_CHANGES_REVIEW.md](./UPSTREAM_CHANGES_REVIEW.md) for detailed analysis.

## 📚 Documentation

For baseline-specific documentation:
- [MCP Tools Usage](./MCP_TOOLS_USAGE_CLARIFICATION.md) - MCP protocol vs CLI commands
- [Swarm & Hive-Mind Analysis](./CLAUDE_FLOW_SWARM_HIVE_MIND_ANALYSIS.md) - Technical deep-dive
- [Enterprise ATS Guide](./ENTERPRISE_ATS_IMPLEMENTATION_GUIDE.md) - Implementation examples
- [Upstream Changes](./UPSTREAM_CHANGES_REVIEW.md) - Recent sync analysis

For main project documentation, see [README.md](./README.md) (upstream mirror).
