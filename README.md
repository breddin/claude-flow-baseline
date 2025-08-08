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

---

# 🌊 Claude-Flow v2.0.0 Alpha: AI Orchestration Platform

<div align="center">

[![🌟 Star on GitHub](https://img.shields.io/github/stars/ruvnet/claude-flow?style=for-the-badge&logo=github&color=gold)](https://github.com/ruvnet/claude-flow)
[![📦 Alpha Release](https://img.shields.io/npm/v/claude-flow/alpha?style=for-the-badge&logo=npm&color=orange&label=v2.0.0-alpha.53)](https://www.npmjs.com/package/claude-flow/v/alpha)
[![⚡ Claude Code](https://img.shields.io/badge/Claude%20Code-Optimized-green?style=for-the-badge&logo=anthropic)](https://github.com/ruvnet/claude-flow)
[![🏛️ Agentics Foundation](https://img.shields.io/badge/Agentics-Foundation-crimson?style=for-the-badge&logo=openai)](https://discord.com/invite/dfxmpwkG2D)
[![🐝 Hive-Mind](https://img.shields.io/badge/Hive--Mind-AI%20Coordination-purple?style=for-the-badge&logo=swarm)](https://github.com/ruvnet/claude-flow)
[![🧠 Neural](https://img.shields.io/badge/Neural-87%20MCP%20Tools-blue?style=for-the-badge&logo=tensorflow)](https://github.com/ruvnet/claude-flow)
[![🛡️ MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative)](https://opensource.org/licenses/MIT)

</div>

---

## 🌟 **Overview**

**Claude-Flow v2 Alpha** is an enterprise-grade AI orchestration platform that reimagines how developers build with AI. By combining **hive-mind swarm intelligence**, **neural pattern recognition**, and **87 advanced MCP tools**, Claude-Flow enables unprecedented AI-powered development workflows.

### 🎯 **Key Features**

- **🐝 Hive-Mind Intelligence**: Queen-led AI coordination with specialized worker agents
- **🧠 Neural Networks**: 27+ cognitive models with WASM SIMD acceleration
- **🔧 87 MCP Tools**: Comprehensive toolkit for swarm orchestration, memory, and automation
- **🔄 Dynamic Agent Architecture (DAA)**: Self-organizing agents with fault tolerance
- **💾 SQLite Memory System**: Persistent `.swarm/memory.db` with 12 specialized tables
- **🪝 Advanced Hooks System**: Automated workflows with pre/post operation hooks
- **📊 GitHub Integration**: 6 specialized modes for repository management
- **⚡ Performance**: 84.8% SWE-Bench solve rate, 2.8-4.4x speed improvement

> 🔥 **Revolutionary AI Coordination**: Build faster, smarter, and more efficiently with AI-powered development orchestration

## ⚡ **Try v2.0.0 Alpha in 4 Commands**

### 📋 **Prerequisites**

- **Node.js 18+** (LTS recommended)
- **npm 9+** or equivalent package manager
- **Windows users**: See [Windows Installation Guide](https://github.com/ruvnet/claude-code-flow/blob/main/docs/windows-installation.md) for special instructions

⚠️ **IMPORTANT**: Claude Code must be installed first:

```bash
# 1. Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# 2. (Optional) Skip permissions check for faster setup
# Only use if you understand the security implications
# claude --dangerously-skip-permissions
```

💡 **Windows Note**: If you encounter SQLite errors, Claude Flow will automatically use in-memory storage. For persistent storage options, see our [Windows guide](https://github.com/ruvnet/claude-code-flow/blob/main/docs/windows-installation.md).

### 🎯 **Instant Alpha Testing**

```bash
# 1. Initialize Claude Flow with enhanced MCP setup (auto-configures permissions!)
npx claude-flow@alpha init --force

# 2. Explore all revolutionary capabilities  
npx claude-flow@alpha --help

# 3a. Quick AI coordination (recommended for most tasks)
npx claude-flow@alpha swarm "build me a REST API"

# 3b. OR launch the full hive-mind system (for complex projects)
npx claude-flow@alpha hive-mind wizard
npx claude-flow@alpha hive-mind spawn "build enterprise system" --claude
```

### 🤔 **Swarm vs Hive-Mind: Which to Use?**

| Feature | `swarm` Command | `hive-mind` Command |
|---------|----------------|-------------------|
| **Best For** | Quick tasks, single objectives | Complex projects, persistent sessions |
| **Setup** | Instant - no configuration needed | Interactive wizard setup |
| **Session** | Temporary coordination | Persistent with resume capability |
| **Memory** | Task-scoped | Project-wide with SQLite storage |
| **Agents** | Auto-spawned for task | Manual control with specializations |
| **Use When** | "Build X", "Fix Y", "Analyze Z" | Multi-feature projects, team coordination |

**Quick Rule:** Start with `swarm` for most tasks. Use `hive-mind` when you need persistent sessions or complex multi-agent coordination.

## 🎯 **Typical Workflows - Your "Happy Path" Guide**

### **New to Claude-Flow? Start Here!**

Confused about `.hive-mind` and `.swarm` directories? Not sure when to create new hives? Here are the most common workflow patterns:

#### **🚀 Pattern 1: Single Feature Development**
```bash
# Initialize once per feature/task
npx claude-flow@alpha init --force
npx claude-flow@alpha hive-mind spawn "Implement user authentication" --claude

# Continue working on SAME feature (reuse existing hive)
npx claude-flow@alpha hive-mind status
npx claude-flow@alpha memory query "authentication" --recent
npx claude-flow@alpha swarm "Add password reset functionality" --continue-session
```

#### **🏗️ Pattern 2: Multi-Feature Project**
```bash
# Project-level initialization (once per project)
npx claude-flow@alpha init --force --project-name "my-app"

# Feature 1: Authentication (new hive)
npx claude-flow@alpha hive-mind spawn "auth-system" --namespace auth --claude

# Feature 2: User management (separate hive)  
npx claude-flow@alpha hive-mind spawn "user-management" --namespace users --claude

# Resume Feature 1 later (use session ID from spawn output)
npx claude-flow@alpha hive-mind resume session-xxxxx-xxxxx
```

#### **🔍 Pattern 3: Research & Analysis**
```bash
# Start research session
npx claude-flow@alpha hive-mind spawn "Research microservices patterns" --agents researcher,analyst --claude

# Continue research in SAME session
npx claude-flow@alpha memory stats  # See what's been learned
npx claude-flow@alpha swarm "Deep dive into API gateway patterns" --continue-session
```

### **🤔 When Should I Create a New Hive?**

| Situation | Action | Command |
|-----------|--------|---------|
| **Same objective/feature** | Continue existing hive | `npx claude-flow@alpha hive-mind resume <session-id>` |
| **New feature in same project** | Create new hive with namespace | `npx claude-flow@alpha hive-mind spawn "new-feature" --namespace feature-name` |
| **Completely different project** | New directory + init | `mkdir new-project && cd new-project && npx claude-flow@alpha init` |
| **Experimenting/testing** | Temporary hive | `npx claude-flow@alpha hive-mind spawn "experiment" --temp` |

### **📁 Understanding "Empty" Directories**

**Don't panic if directories seem empty!** Claude-Flow uses SQLite databases that may not show files in directory listings:

```bash
# Check what's actually stored (even if directories look empty)
npx claude-flow@alpha memory stats        # See memory data
npx claude-flow@alpha memory list         # List all namespaces  
npx claude-flow@alpha hive-mind status    # See active hives

# Your project structure after initialization:
# .hive-mind/     <- Contains config.json + SQLite session data
# .swarm/         <- Contains memory.db (SQLite database)
# memory/         <- Agent-specific memories (created when agents spawn)
# coordination/   <- Active workflow files (created during tasks)
```

### **🔄 Continuing Previous Work**

```bash
# See what you were working on
npx claude-flow@alpha hive-mind status
npx claude-flow@alpha memory query --recent --limit 5

# List all sessions to find the one you want
npx claude-flow@alpha hive-mind sessions

# Resume specific session by ID
npx claude-flow@alpha hive-mind resume session-xxxxx-xxxxx
```

---

## 🪝 **Advanced Hooks System**

### **Automated Workflow Enhancement**
Claude-Flow v2.0.0 introduces a powerful hooks system that automates coordination and enhances every operation:

```bash
# Hooks automatically trigger on operations
npx claude-flow@alpha init --force  # Auto-configures MCP servers & hooks
```

### **Available Hooks**

#### **Pre-Operation Hooks**
- **`pre-task`**: Auto-assigns agents based on task complexity
- **`pre-search`**: Caches searches for improved performance  
- **`pre-edit`**: Validates files and prepares resources
- **`pre-command`**: Security validation before execution

#### **Post-Operation Hooks**
- **`post-edit`**: Auto-formats code using language-specific tools
- **`post-task`**: Trains neural patterns from successful operations
- **`post-command`**: Updates memory with operation context
- **`notification`**: Real-time progress updates

#### **Session Hooks**
- **`session-start`**: Restores previous context automatically
- **`session-end`**: Generates summaries and persists state
- **`session-restore`**: Loads memory from previous sessions

### **Hook Configuration**
```json
// .claude/settings.json (auto-configured)
{
  "hooks": {
    "preEditHook": {
      "command": "npx",
      "args": ["claude-flow", "hooks", "pre-edit", "--file", "${file}", "--auto-assign-agents", "true"],
      "alwaysRun": false
    },
    "postEditHook": {
      "command": "npx", 
      "args": ["claude-flow", "hooks", "post-edit", "--file", "${file}", "--format", "true"],
      "alwaysRun": true
    },
    "sessionEndHook": {
      "command": "npx",
      "args": ["claude-flow", "hooks", "session-end", "--generate-summary", "true"],
      "alwaysRun": true
    }
  }
}
```

### **Using Hooks in Claude Code**

Hooks integrate seamlessly with Claude Code's workflow:

1. **Automatic Triggering**: Hooks fire automatically during Claude Code operations
2. **Context Awareness**: Each hook receives relevant context (file paths, commands, etc.)
3. **Non-Blocking**: Hooks run asynchronously to maintain performance
4. **Configurable**: Enable/disable specific hooks as needed

### **Hook Examples**

```bash
# Manual hook execution
npx claude-flow hooks pre-task --description "Build REST API" --auto-spawn-agents

# Post-edit with formatting
npx claude-flow hooks post-edit --file "src/api.js" --format --train-neural

# Session management
npx claude-flow hooks session-end --generate-summary --persist-state
```

### **Fixing Hook Variable Interpolation**

If you're experiencing issues with `${file}` or `${command}` variables not working in your hooks (common with Claude Code 1.0.51+), use the `fix-hook-variables` command:

```bash
# Fix all found settings.json files
npx claude-flow@alpha fix-hook-variables

# Fix specific file
npx claude-flow@alpha fix-hook-variables .claude/settings.json

# Create test configuration
npx claude-flow@alpha fix-hook-variables --test
```

This command automatically transforms legacy variable syntax to working environment variables:
- `${file}` → `$CLAUDE_EDITED_FILE`
- `${command}` → `$CLAUDE_COMMAND`
- `${tool}` → `$CLAUDE_TOOL`

---
## 🐝 **Revolutionary Hive-Mind Intelligence**

### **Queen-Led AI Coordination**
Claude-Flow v2.0.0 introduces groundbreaking hive-mind architecture where a **Queen AI** coordinates specialized worker agents in perfect harmony.

```bash
# Deploy intelligent swarm coordination
npx claude-flow@alpha swarm "Build a full-stack application" --strategy development

# Launch hive-mind with specific specializations
npx claude-flow@alpha hive-mind spawn "Create microservices architecture" --agents 8 --claude
```

### **🤖 Intelligent Agent Types**
- **👑 Queen Agent**: Master coordinator and decision maker
- **🏗️ Architect Agents**: System design and technical architecture
- **💻 Coder Agents**: Implementation and development
- **🧪 Tester Agents**: Quality assurance and validation
- **📊 Analyst Agents**: Data analysis and insights
- **🔍 Researcher Agents**: Information gathering and analysis
- **🛡️ Security Agents**: Security auditing and compliance
- **🚀 DevOps Agents**: Deployment and infrastructure

---

## ⚡ **87 Advanced MCP Tools**

### **🧠 Neural & Cognitive Tools**
```bash
# Neural pattern recognition and training
npx claude-flow@alpha neural train --pattern coordination --epochs 50
npx claude-flow@alpha neural predict --model cognitive-analysis
npx claude-flow@alpha cognitive analyze --behavior "development workflow"
```

### **💾 SQLite Memory Systems**
```bash
# Cross-session memory management with SQLite persistence
npx claude-flow@alpha memory store "project-context" "Full-stack app requirements"
npx claude-flow@alpha memory query "authentication" --namespace sparc
npx claude-flow@alpha memory stats  # Shows 12 specialized tables
npx claude-flow@alpha memory export backup.json --namespace default
npx claude-flow@alpha memory import project-memory.json
```

> 🪟 **Windows Users**: SQLite will automatically fallback to in-memory storage if native modules fail. All features work normally, but data won't persist between sessions. See [Windows guide](https://github.com/ruvnet/claude-code-flow/blob/main/docs/windows-installation.md) for persistent storage options.

### **🔄 Workflow Orchestration**
```bash
# Advanced workflow automation
npx claude-flow@alpha workflow create --name "CI/CD Pipeline" --parallel
npx claude-flow@alpha batch process --items "test,build,deploy" --concurrent
npx claude-flow@alpha pipeline create --config advanced-deployment.json
```

## 🧠 **Neural Network Capabilities**

### **Cognitive Computing Engine**
Powered by 27+ neural models optimized with WASM SIMD acceleration:

```bash
# Train coordination patterns
npx claude-flow@alpha neural train --pattern coordination --data "workflow.json"

# Real-time predictions
npx claude-flow@alpha neural predict --model task-optimizer --input "current-state.json"

# Analyze cognitive behavior
npx claude-flow@alpha cognitive analyze --behavior "development-patterns"
```

### **Neural Features**
- **Pattern Recognition**: Learns from successful operations
- **Adaptive Learning**: Improves performance over time
- **Transfer Learning**: Apply knowledge across domains
- **Model Compression**: Efficient storage and execution
- **Ensemble Models**: Combine multiple neural networks
- **Explainable AI**: Understand decision-making process

## 🔧 **DAA MCP Endpoints**

### **Dynamic Agent Architecture**
Complete programmatic control over agent lifecycle and coordination:

```bash
# Create specialized agents
npx claude-flow@alpha daa agent-create --type "specialized-researcher" \
  --capabilities "[\"deep-analysis\", \"pattern-recognition\"]" \
  --resources "{\"memory\": 2048, \"compute\": \"high\"}"

# Match capabilities to tasks
npx claude-flow@alpha daa capability-match \
  --task-requirements "[\"security-analysis\", \"performance-optimization\"]"

# Manage agent lifecycle
npx claude-flow@alpha daa lifecycle-manage --agentId "agent-123" --action "scale-up"
```

### **DAA Features**
- **Resource Allocation**: Dynamic CPU/memory management
- **Inter-Agent Communication**: Message passing and coordination
- **Consensus Mechanisms**: Democratic decision making
- **Fault Tolerance**: Self-healing with automatic recovery
- **Performance Optimization**: Real-time bottleneck resolution

### **MCP Tool Categories**

#### **🐝 Swarm Orchestration** (15 tools)
- `swarm_init`, `agent_spawn`, `task_orchestrate`
- `swarm_monitor`, `topology_optimize`, `load_balance`
- `coordination_sync`, `swarm_scale`, `swarm_destroy`

#### **🧠 Neural & Cognitive** (12 tools)
- `neural_train`, `neural_predict`, `pattern_recognize`
- `cognitive_analyze`, `learning_adapt`, `neural_compress`
- `ensemble_create`, `transfer_learn`, `neural_explain`

#### **💾 Memory Management** (10 tools)
- `memory_usage`, `memory_search`, `memory_persist`
- `memory_namespace`, `memory_backup`, `memory_restore`
- `memory_compress`, `memory_sync`, `memory_analytics`
- **SQLite Backend**: Persistent `.swarm/memory.db` with 12 specialized tables

#### **📊 Performance & Monitoring** (10 tools)
- `performance_report`, `bottleneck_analyze`, `token_usage`
- `benchmark_run`, `metrics_collect`, `trend_analysis`
- `health_check`, `diagnostic_run`, `usage_stats`

#### **🔄 Workflow Automation** (10 tools)
- `workflow_create`, `workflow_execute`, `workflow_export`
- `automation_setup`, `pipeline_create`, `scheduler_manage`
- `trigger_setup`, `batch_process`, `parallel_execute`

#### **📦 GitHub Integration** (6 tools)
- `github_repo_analyze`, `github_pr_manage`, `github_issue_track`
- `github_release_coord`, `github_workflow_auto`, `github_code_review`

#### **🤖 Dynamic Agents** (6 tools)
- `daa_agent_create`, `daa_capability_match`, `daa_resource_alloc`
- `daa_lifecycle_manage`, `daa_communication`, `daa_consensus`

#### **🛡️ System & Security** (8 tools)
- `security_scan`, `backup_create`, `restore_system`
- `config_manage`, `features_detect`, `log_analysis`

### **📊 GitHub Integration**
```bash
# GitHub workflow orchestration and coordination
npx claude-flow@alpha github gh-coordinator analyze --analysis-type security
npx claude-flow@alpha github pr-manager review --multi-reviewer --ai-powered
npx claude-flow@alpha github release-manager coord --version 2.0.0 --auto-changelog
npx claude-flow@alpha github repo-architect optimize --structure-analysis
npx claude-flow@alpha github issue-tracker manage --project-coordination
npx claude-flow@alpha github sync-coordinator align --multi-package
```

---

## 🛡️ **Seamless Claude Code Integration**

### **Auto-MCP Server Setup**
v2.0.0 Alpha automatically configures MCP servers for seamless Claude Code integration:

```bash
# Automatic MCP integration (happens during init)
✅ claude-flow MCP server configured
✅ ruv-swarm MCP server configured  
✅ 87 tools available in Claude Code
✅ --dangerously-skip-permissions set as default
```

### **Enhanced SPARC Workflows**
```bash
# Advanced SPARC development with neural enhancement
npx claude-flow@alpha sparc mode --type "neural-tdd" --auto-learn
npx claude-flow@alpha sparc workflow --phases "all" --ai-guided --memory-enhanced
```

---

## 🧠 **Cognitive Computing Features**

### **🎯 Neural Pattern Recognition**
- **27+ Cognitive Models**: Adaptive learning from successful operations
- **Pattern Analysis**: Real-time behavior analysis and optimization
- **Decision Tracking**: Complete audit trail of AI decisions
- **Performance Learning**: Continuous improvement from past executions

### **🔄 Self-Healing Systems**
```bash
# Automatic error recovery and optimization
npx claude-flow@alpha health check --components all --auto-heal
npx claude-flow@alpha fault tolerance --strategy retry-with-learning
npx claude-flow@alpha bottleneck analyze --auto-optimize
```

### **💾 Advanced Memory Architecture**
- **SQLite Persistence**: Robust `.swarm/memory.db` storage with 12 specialized tables
- **Cross-Session Persistence**: Remember context across Claude Code sessions
- **Namespace Management**: Organized memory with hierarchical access
- **Enhanced Schema**: Agent interactions, training data, performance metrics, and more
- **Memory Compression**: Efficient storage of large coordination contexts
- **Distributed Sync**: Share memory across multiple AI instances

---

## 📊 **Performance Metrics**

### **🏆 Industry-Leading Results**
- **✅ 84.8% SWE-Bench Solve Rate**: Superior problem-solving through hive-mind coordination
- **✅ 32.3% Token Reduction**: Efficient task breakdown reduces costs significantly
- **✅ 2.8-4.4x Speed Improvement**: Parallel coordination maximizes throughput
- **✅ 87 MCP Tools**: Most comprehensive AI tool suite available
- **✅ Zero-Config Setup**: Automatic MCP integration with Claude Code

### **🚀 Available Capabilities**
```bash
# Check memory system performance
npx claude-flow@alpha memory stats
npx claude-flow@alpha memory list

# Test GitHub coordination modes
npx claude-flow@alpha github gh-coordinator --help
npx claude-flow@alpha github pr-manager --help

# Workflow orchestration
npx claude-flow@alpha workflow create --name "Development Pipeline" --parallel
```

---

## 🎮 **Advanced Usage Examples**

### **🏗️ Full-Stack Development**
```bash
# Deploy complete development swarm
npx claude-flow@alpha hive-mind spawn "Build e-commerce platform with React, Node.js, and PostgreSQL" \
  --agents 10 \
  --strategy parallel \
  --memory-namespace ecommerce

# Monitor progress in real-time
npx claude-flow@alpha swarm monitor --dashboard --real-time
```

### **🔬 Research & Analysis**
```bash
# Deploy research swarm with neural enhancement
npx claude-flow@alpha swarm "Research AI safety in autonomous systems" \
  --strategy research \
  --neural-patterns enabled \
  --memory-compression high

# Analyze results with cognitive computing
npx claude-flow@alpha cognitive analyze --target research-results
```

### **🛡️ Security & Compliance**
```bash
# Automated security analysis with AI coordination
npx claude-flow@alpha github gh-coordinator analyze --analysis-type security --target ./src
npx claude-flow@alpha github repo-architect optimize --security-focused --compliance SOC2
npx claude-flow@alpha hive-mind spawn "security audit and compliance review" --claude
```

---

## 🏗️ **Alpha Architecture Overview**

### **🐝 Hive-Mind Coordination Layer**
```
┌─────────────────────────────────────────────────────────┐
│                    👑 Queen Agent                       │
│              (Master Coordinator)                      │
├─────────────────────────────────────────────────────────┤
│  🏗️ Architect │ 💻 Coder │ 🧪 Tester │ 🔍 Research │ 🛡️ Security │
│      Agent    │   Agent  │   Agent   │    Agent    │    Agent    │
├─────────────────────────────────────────────────────────┤
│           🧠 Neural Pattern Recognition Layer           │
├─────────────────────────────────────────────────────────┤
│              💾 Distributed Memory System               │
├─────────────────────────────────────────────────────────┤
│            ⚡ 87 MCP Tools Integration Layer            │
├─────────────────────────────────────────────────────────┤
│              🛡️ Claude Code Integration                 │
└─────────────────────────────────────────────────────────┘
```

### **🔄 Coordination Strategies**
- **Hierarchical**: Queen-led with specialized worker agents
- **Mesh**: Peer-to-peer coordination for complex tasks
- **Hybrid**: Dynamic strategy selection based on task complexity
- **Neural-Enhanced**: AI-optimized coordination patterns

---

## 🛠️ **Alpha Installation & Setup**

### **🚀 Quick Alpha Installation**
```bash
# Global installation (recommended for testing)
npm install -g claude-flow@alpha

# Or use NPX for instant testing
npx claude-flow@alpha init --force

# Verify installation
claude-flow --version  # Should show 2.0.0-alpha.53
```

### **🔧 Enhanced Configuration**
```bash
# Initialize with full alpha features
npx claude-flow@alpha init --force --hive-mind --neural-enhanced

# Configure Claude Code integration
npx claude-flow@alpha mcp setup --auto-permissions --87-tools

# Test hive-mind coordination
npx claude-flow@alpha hive-mind test --agents 5 --coordination-test
```

---

## 📋 **Alpha Command Reference**

For complete command documentation, run:
```bash
npx claude-flow@alpha --help          # Main help
npx claude-flow@alpha help <command>  # Detailed command help
```

**Key Commands:**
- **Hive-Mind**: `hive-mind wizard`, `hive-mind spawn`, `hive-mind status`
- **Neural**: `neural train`, `neural predict`, `cognitive analyze`
- **Memory**: `memory store`, `memory query`, `memory stats`, `memory export/import`
- **GitHub**: `github <mode>` (6 specialized modes available)
- **Workflows**: `workflow create`, `batch process`, `pipeline create`

---

## 🧪 **Alpha Testing & Development**

### **🐛 Bug Reports & Feedback**
Found issues with the alpha? We want to hear from you!

- **🐛 Report Bugs**: [GitHub Issues](https://github.com/ruvnet/claude-flow/issues)
- **💡 Feature Requests**: Use the "Alpha Feedback" label
- **🛠️ Development**: Check the [`claude-flow-v2.0.0`](https://github.com/ruvnet/claude-flow/tree/claude-flow-v2.0.0) branch
- **📋 Alpha Testing**: Join our alpha testing program

### **🔬 Testing the Alpha**
```bash
# Test available GitHub modes
npx claude-flow@alpha github gh-coordinator --help
npx claude-flow@alpha github pr-manager --help  
npx claude-flow@alpha github issue-tracker --help
npx claude-flow@alpha github release-manager --help
npx claude-flow@alpha github repo-architect --help
npx claude-flow@alpha github sync-coordinator --help

# Test memory functionality
npx claude-flow@alpha memory stats
npx claude-flow@alpha memory store "test" "alpha testing data"
npx claude-flow@alpha memory query "test"

# Test workflow execution
npx claude-flow@alpha workflow create --name "Test Pipeline" --parallel
```

### **📊 Alpha Metrics Dashboard**
```bash
# Check memory usage and statistics
npx claude-flow@alpha memory stats

# View available GitHub coordination modes
npx claude-flow@alpha github --help

# Test workflow capabilities
npx claude-flow@alpha workflow --help
```

---

## 🚀 **Roadmap to Stable v2.0.0**

### **🎯 Alpha Phase (Current)**
- ✅ Hive-mind coordination system
- ✅ 87 MCP tools integration
- ✅ Neural pattern recognition
- ✅ Distributed memory architecture
- ✅ Auto-MCP setup for Claude Code

### **🔄 Beta Phase (Coming Soon)**
- 🔜 Enhanced swarm intelligence algorithms
- 🔜 Advanced cognitive computing features
- 🔜 Enterprise security and compliance
- 🔜 Multi-cloud deployment automation
- 🔜 Real-time collaboration features

### **🏆 Stable v2.0.0 (Q2 2025)**
- 🎯 Production-ready hive-mind orchestration
- 🎯 Complete neural computing suite
- 🎯 Enterprise-grade security and monitoring
- 🎯 Comprehensive documentation and tutorials
- 🎯 Professional support and training

---

## 🤝 **Contributing to Alpha**

### **🛠️ Alpha Development Setup**
```bash
# Clone the alpha development branch
git clone https://github.com/ruvnet/claude-flow.git
cd claude-flow
git checkout claude-flow-v2.0.0

# Install alpha dependencies
npm install

# Build alpha version
npm run build:alpha

# Test alpha features
npm run test:alpha
```

### **🔬 Alpha Testing Guidelines**
- Focus on hive-mind coordination testing
- Test neural pattern recognition accuracy
- Validate memory system persistence
- Verify Claude Code MCP integration
- Report performance metrics and bottlenecks

---

## 🛡️ **Enhanced Safety & Security Features**

### **Enterprise-Grade Security in v2.0.0 Alpha**

Claude-Flow v2.0.0 introduces revolutionary safety features that ensure secure, reliable AI orchestration at scale:

#### **🔐 Auto-Configured MCP Permissions**
```bash
# Automatic settings.local.json creation during init
# Pre-approves trusted MCP tools - no more permission prompts!
{
  "permissions": {
    "allow": [
      "mcp__ruv-swarm",
      "mcp__claude-flow"
    ],
    "deny": []
  }
}
```

#### **🌐 Quantum-Resistant Security Architecture**
- **QuDag Networks**: Future-proof encryption for global communications
- **Byzantine Fault Tolerance**: Consensus protocols prevent malicious agents
- **Zero-Trust Agent Communication**: Every inter-agent message is validated
- **Encrypted Memory Storage**: Cross-session persistence with AES-256 encryption

#### **🛡️ Multi-Layer Safety Mechanisms**

##### **1. Hook-Based Validation System**
```bash
# Pre-execution safety checks
npx claude-flow hooks pre-command --validate-security
npx claude-flow hooks pre-edit --check-permissions
```

##### **2. Agent Isolation & Sandboxing**
- Each agent runs in isolated context
- Resource limits prevent runaway processes
- Automatic timeout on long-running operations
- Memory usage caps per agent

##### **3. Audit Trail & Compliance**
```bash
# Complete audit logging
npx claude-flow security audit --full-trace
npx claude-flow security compliance --standard SOC2
```

##### **4. Real-Time Threat Detection**
- Pattern recognition for anomalous behavior
- Automatic agent suspension on security violations
- Neural network-based threat prediction
- Self-healing security responses

#### **🔒 Secure Communication Protocols**

##### **Cross-Boundary Security**
- End-to-end encryption for all agent communications
- <1ms latency with full encryption
- Secure WebSocket connections with TLS 1.3
- Certificate pinning for MCP servers

##### **DAA Security Features**
```bash
# Secure agent creation with resource limits
npx claude-flow daa agent-create \
  --security-level high \
  --resource-limits "cpu:50%,memory:2GB" \
  --sandbox enabled
```

#### **🚨 Safety Guardrails**

##### **Automatic Safety Checks**
1. **Code Injection Prevention**: Sanitizes all inputs
2. **Path Traversal Protection**: Validates file operations
3. **Command Injection Blocking**: Secure command execution
4. **Memory Overflow Protection**: Prevents buffer attacks

##### **Rollback & Recovery**
```bash
# Instant rollback on security issues
npx claude-flow init --rollback --security-breach
npx claude-flow recovery --point last-safe-state
```

#### **📊 Security Monitoring Dashboard**
```bash
# Real-time security monitoring
npx claude-flow security monitor --dashboard
npx claude-flow security scan --deep --report

# Security metrics and alerts
npx claude-flow security metrics --last-24h
npx claude-flow security alerts --configure
```

#### **🔧 Auto-Configured Security**
Claude-Flow v2.0.0 Alpha automatically configures secure defaults:
- Agent isolation and resource limits
- Encrypted memory storage with AES-256
- Complete audit logging for all operations
- Neural threat detection and prevention
- Auto-approved MCP permissions for trusted tools

#### **🛡️ Defense-in-Depth Architecture**
```
┌─────────────────────────────────────────────────────────┐
│                 🔐 Security Gateway                     │
├─────────────────────────────────────────────────────────┤
│     🛡️ Hook Validation │ 🔒 Permission Layer            │
├─────────────────────────────────────────────────────────┤
│          🚨 Threat Detection & Response                 │
├─────────────────────────────────────────────────────────┤
│     🔐 Encrypted Communication │ 📊 Audit Logging       │
├─────────────────────────────────────────────────────────┤
│            🐝 Isolated Agent Sandboxes                  │
└─────────────────────────────────────────────────────────┘
```

### **✅ Security Best Practices**
- Regular security scans with `npx claude-flow security scan`
- Enable audit logging for production environments
- Use high security level for sensitive operations
- Configure resource limits for all agents
- Regular backup and recovery testing

---

## 📚 **Additional Documentation**

### Core Documentation
- [Complete API Reference](docs/API.md) - Comprehensive API documentation
- [CLI Commands Guide](docs/CLI.md) - All command-line options
- [Architecture Overview](docs/ARCHITECTURE.md) - System design and internals
- [Examples Directory](examples/) - Code examples and demos

### New Features (v2.0.0)
- [🔒 Git Checkpoint System](docs/GIT_CHECKPOINT_HOOKS.md) - Automatic Git checkpoints for Claude Code sessions
- [📊 Real Performance Tracking](docs/REAL_PERFORMANCE_TRACKING.md) - Actual metrics collection and analysis
- [🪟 Windows Installation](docs/windows-installation.md) - Special instructions for Windows users

### Integration Guides
- [MCP Server Setup](docs/mcp-setup.md) - Model Context Protocol configuration
- [Claude Code Integration](docs/claude-code-integration.md) - Enhanced AI workflows
- [GitHub Workflows](docs/github-workflows.md) - Repository automation

---

## 📄 **License**

MIT License - see [LICENSE](./LICENSE) for details.

**Alpha Disclaimer**: This is an alpha release intended for testing and feedback. Use in production environments is not recommended.

---

## 🎉 **Alpha Credits**

- **🧠 Hive-Mind Architecture**: Inspired by natural swarm intelligence
- **⚡ Neural Computing**: Advanced AI coordination patterns  
- **🛡️ Claude Code Integration**: Seamless AI development workflow
- **🚀 Performance Optimization**: 2.8-4.4x speed improvements through parallel coordination

---

<div align="center">

### **🚀 Ready to experience the future of AI development?**

```bash
npx claude-flow@alpha init --force
```

**Join the alpha testing revolution!**

[![GitHub](https://img.shields.io/badge/GitHub-Alpha%20Branch-blue?style=for-the-badge&logo=github)](https://github.com/ruvnet/claude-flow/tree/claude-flow-v2.0.0)
[![NPM Alpha](https://img.shields.io/badge/NPM-Alpha%20Release-orange?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/claude-flow/v/alpha)
[![Discord](https://img.shields.io/badge/Discord-Agentics%20Community-purple?style=for-the-badge&logo=discord)](https://discord.com/invite/dfxmpwkG2D)

---

## Star History

<a href="https://www.star-history.com/#ruvnet/claude-flow&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=ruvnet/claude-flow&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=ruvnet/claude-flow&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=ruvnet/claude-flow&type=Date" />
 </picture>
</a>

---

**Built with ❤️ by [rUv](https://github.com/ruvnet) | Powered by Revolutionary AI**

*v2.0.0 Alpha - The Future of AI Orchestration*

</div>
