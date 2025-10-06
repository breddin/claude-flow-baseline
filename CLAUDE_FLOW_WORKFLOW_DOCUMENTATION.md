# 🔄 Claude Flow Workflow Documentation - Alpha.128

## ❌ **IMPORTANT CORRECTION**

**There is NO `claude-flow workflow` command in Claude Flow v2.0.0-alpha.128!**

The Enterprise ATS Implementation Guide contains **incorrect workflow commands**. Here's the actual documentation for workflows in Claude Flow.

---

## ✅ **Actual Workflow Methods in Claude Flow**

### 1. **Swarm-Based Workflows** (Primary Method)

```bash
# Basic swarm workflow
claude-flow swarm "Build enterprise ATS system with PostgreSQL and React"

# With specific strategies  
claude-flow swarm "Create database schema for ATS" \
  --strategy development \
  --max-agents 3 \
  --monitor

# Analysis-only workflows (read-only, safe)
claude-flow swarm "Analyze codebase architecture" \
  --analysis \
  --strategy research

# Multi-phase workflow using sequential swarms
claude-flow swarm "Design ATS architecture" --strategy research --analysis
claude-flow swarm "Implement backend services" --strategy development 
claude-flow swarm "Create frontend components" --strategy development
claude-flow swarm "Set up testing suite" --strategy testing
```

**Available Swarm Options:**
- `--strategy`: research, development, analysis, testing, optimization, maintenance
- `--mode`: centralized, distributed, hierarchical, mesh, hybrid  
- `--max-agents <n>`: Maximum agents (default: 5)
- `--parallel`: Enable parallel execution (2.8-4.4x speed)
- `--monitor`: Real-time monitoring
- `--ui`: Interactive interface
- `--claude`: Open Claude Code CLI
- `--analysis` / `--read-only`: Safe analysis mode (no code changes)

### 2. **Stream-Chain Workflows** (Multi-Step Chaining)

```bash
# Sequential workflow with context preservation
claude-flow stream-chain run \
  "Analyze ATS requirements" \
  "Design PostgreSQL schema" \
  "Generate Ballerina services"

# Predefined pipelines
claude-flow stream-chain pipeline analysis    # Analyze → Issues → Report
claude-flow stream-chain pipeline refactor   # Find opportunities → Plan → Apply  
claude-flow stream-chain pipeline test       # Coverage → Design → Generate
claude-flow stream-chain pipeline optimize   # Profile → Bottlenecks → Apply

# Demo workflow
claude-flow stream-chain demo                 # 3-step demo chain
```

**Stream-Chain Options:**
- `--verbose`: Show detailed execution info
- `--timeout <seconds>`: Timeout per step (default: 30)
- `--debug`: Enable debug mode

### 3. **Task-Based Workflows**

```bash
# Task workflow management
claude-flow task create research "ATS market analysis"
claude-flow task list --filter running
claude-flow task workflow examples/dev-flow.json  # Using JSON workflow files
claude-flow task coordination status
```

### 4. **GitHub Workflow Automation**

```bash
# GitHub-integrated workflows
claude-flow github gh-coordinator "setup CI/CD pipeline"
claude-flow github pr-manager "create feature PR with tests"  
claude-flow github release-manager "prepare v2.0.0 release"
claude-flow github repo-architect "optimize monorepo structure"
claude-flow github sync-coordinator "sync versions across packages"
```

**GitHub Options:**
- `--auto-approve`: Automatically approve safe changes
- `--dry-run`: Preview changes without applying
- `--verbose`: Detailed operation logging

### 5. **Automation Workflows**

```bash
# Intelligent workflow selection
claude-flow automation workflow-select \
  --project-type enterprise \
  --priority quality

# Smart agent spawning for workflows
claude-flow automation auto-agent \
  --task-complexity enterprise \
  --swarm-id ats-development

# Smart spawn based on requirements
claude-flow automation smart-spawn \
  --requirement "web-development" \
  --max-agents 8
```

**Automation Options:**
- `--task-complexity`: low, medium, high, enterprise
- `--project-type`: web-app, api, data-analysis, enterprise, general
- `--priority`: speed, quality, cost, balanced

### 6. **Flow Nexus Cloud Workflows** (MCP)

```javascript
// Via MCP tools - Flow Nexus cloud workflows
mcp__flow-nexus__workflow_create({
  name: "ATS Development Pipeline",
  description: "Automated ATS development workflow",
  steps: [
    { id: "analysis", action: "requirements_gathering", agent: "analyst" },
    { id: "design", action: "architecture_design", agent: "architect" },
    { id: "implement", action: "code_development", agent: "developer" }
  ],
  triggers: ["manual_trigger", "git_push"]
})

// Execute workflow
mcp__flow-nexus__workflow_execute({
  workflow_id: "ats-pipeline-123",
  input_data: {
    project: "enterprise-ats",
    database: "postgresql"
  },
  async: true
})

// Monitor workflow
mcp__flow-nexus__workflow_status({
  workflow_id: "ats-pipeline-123",
  include_metrics: true
})
```

---

## 📁 **Valid Workflow Examples**

### Example JSON Workflows (for `claude-flow task workflow`)

Located at: `examples/02-workflows/`
```
├── simple/hello-world-workflow.json
├── parallel/data-processing-workflow.json  
├── sequential/blog-platform-workflow.json
├── complex/microservices-workflow.json
└── specialized/machine-learning-workflow.json
```

**Sample Usage:**
```bash
# Execute existing workflow JSON
claude-flow task workflow examples/02-workflows/simple/hello-world-workflow.json

# Custom swarm based on workflow examples
claude-flow swarm "Build hello world app" --output ./output/hello-world
claude-flow swarm "Build microservices e-commerce platform" --agents 8 --output ./output/microservices
```

---

## 🚀 **Corrected Enterprise ATS Workflow Commands**

Replace the incorrect workflow commands in the Enterprise ATS guide with these:

### Phase 1: Project Initialization
```bash
mkdir enterprise-ats-system && cd enterprise-ats-system
npx claude-flow@alpha init
git init && git remote add origin https://github.com/your-org/enterprise-ats-system.git
```

### Phase 2: Requirements & Architecture  
```bash
# Specifications using SPARC (corrected)
npx claude-flow sparc spec-pseudocode \
  "Create enterprise ATS specifications with PostgreSQL and Ballerina..."

# Architecture design using swarms (corrected)
npx claude-flow swarm "Design PostgreSQL database architecture for enterprise ATS" \
  --strategy research \
  --analysis \
  --output ./database/

npx claude-flow swarm "Create Ballerina backend-for-frontend services architecture" \
  --strategy development \
  --max-agents 3 \
  --output ./backend-for-frontend/

# Multi-step architecture using stream-chain (corrected)
npx claude-flow stream-chain run \
  "Analyze system requirements" \
  "Design microservices architecture" \
  "Create integration patterns"
```

### Phase 3: Implementation
```bash
# Database implementation
npx claude-flow swarm "Implement PostgreSQL schema with multi-tenant security" \
  --strategy development \
  --monitor

# Backend services  
npx claude-flow swarm "Develop Ballerina authentication and user management services" \
  --strategy development \
  --max-agents 4

# Frontend development
npx claude-flow swarm "Create React frontend with TypeScript for ATS" \
  --strategy development \
  --parallel
```

### Phase 4: Testing & Deployment
```bash
# Test suite creation
npx claude-flow swarm "Create comprehensive test suite for ATS system" \
  --strategy testing \
  --max-agents 2

# Deployment automation
npx claude-flow github gh-coordinator "setup CI/CD pipeline for ATS deployment" \
  --auto-approve
```

---

## 🎯 **Key Differences**

| ❌ **Incorrect (from ATS guide)** | ✅ **Correct Commands** |
|-----------------------------------|-------------------------|
| `claude-flow workflow run file.json` | `claude-flow swarm "task description"` |
| `claude-flow sparc run spec-pseudocode` | `claude-flow sparc spec-pseudocode` |
| `claude-flow tdd init --database postgresql` | `claude-flow swarm "setup TDD with PostgreSQL"` |
| `claude-flow database create --type postgresql` | `claude-flow swarm "create PostgreSQL database schema"` |
| `claude-flow ballerina create-service` | `claude-flow swarm "create Ballerina services"` |

---

## 📚 **Resources**

- **Examples Directory**: `/examples/02-workflows/`
- **Tutorial**: `/examples/06-tutorials/getting-started/01-first-swarm.md`
- **Help Commands**: 
  - `claude-flow swarm --help`
  - `claude-flow stream-chain --help`
  - `claude-flow automation --help`
  - `claude-flow github --help`

---

## 🔧 **Testing Valid Commands**

```bash
# Test basic swarm
claude-flow swarm "Create a simple hello world app" --output ./test-output

# Test stream-chain
claude-flow stream-chain demo

# Test automation
claude-flow automation workflow-select --project-type web-app

# Test GitHub integration  
claude-flow github init
```

The Enterprise ATS Implementation Guide should be updated to use these **actual working commands** instead of the non-existent `claude-flow workflow` commands.