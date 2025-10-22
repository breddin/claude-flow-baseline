# Claude-Flow MCP Tools - Quick Reference

## 📊 Overview

Claude-Flow includes **90 MCP (Model Context Protocol) tools** across **8 categories**, integrated with **4 MCP servers**.

### Available MCP Servers

| Server | Command | Technology | Purpose |
|--------|---------|------------|---------|
| **claude-flow** | `npx claude-flow@alpha mcp start` | Node.js, SQLite, WASM | Core 90 tools, swarm orchestration |
| **ruv-swarm** | `npx ruv-swarm mcp start` | Go, Redis, gRPC | Enhanced coordination, consensus |
| **flow-nexus** | `npx flow-nexus@latest mcp start` | Kubernetes, Docker, PostgreSQL | Cloud platform, E2B sandboxes |
| **agentic-payments** | `npx agentic-payments@latest mcp` | Solana, Coinbase API, USDC | Autonomous transactions |

## 🗂️ Tool Categories (90 Total)

### 1. Swarm Coordination (12 tools)
- `swarm_init`, `agent_spawn`, `task_orchestrate`, `swarm_status`
- `agent_list`, `agent_metrics`, `swarm_monitor`, `topology_optimize`
- `load_balance`, `coordination_sync`, `swarm_scale`, `swarm_destroy`

### 2. Neural Network (15 tools)
- `neural_status`, `neural_train`, `neural_patterns`, `neural_predict`
- `model_load`, `model_save`, `wasm_optimize`, `inference_run`
- `pattern_recognize`, `cognitive_analyze`, `learning_adapt`, `neural_compress`
- `ensemble_create`, `transfer_learn`, `neural_explain`

### 3. Memory & Persistence (12 tools)
- `memory_usage`, `memory_search`, `memory_persist`, `memory_namespace`
- `memory_backup`, `memory_restore`, `memory_compress`, `memory_sync`
- `cache_manage`, `state_snapshot`, `context_restore`, `memory_analytics`

### 4. Analysis & Monitoring (13 tools)
- `performance_report`, `bottleneck_analyze`, `token_usage`, `task_status`
- `task_results`, `benchmark_run`, `metrics_collect`, `trend_analysis`
- `cost_analysis`, `quality_assess`, `error_analysis`, `usage_stats`
- `health_check`

### 5. Workflow (11 tools)
- `workflow_create`, `sparc_mode`, `workflow_execute`, `workflow_export`
- `automation_setup`, `pipeline_create`, `scheduler_manage`, `trigger_setup`
- `workflow_template`, `batch_process`, `parallel_execute`

### 6. GitHub Integration (8 tools)
- `github_repo_analyze`, `github_pr_manage`, `github_issue_track`, `github_release_coord`
- `github_workflow_auto`, `github_code_review`, `github_sync_coord`, `github_metrics`

### 7. Dynamic Agent Architecture (8 tools)
- `daa_agent_create`, `daa_capability_match`, `daa_resource_alloc`, `daa_lifecycle_manage`
- `daa_communication`, `daa_consensus`, `daa_fault_tolerance`, `daa_optimization`

### 8. System & Utilities (11 tools)
- `terminal_execute`, `config_manage`, `features_detect`, `security_scan`
- `backup_create`, `restore_system`, `log_analysis`, `diagnostic_run`

## 🚀 Phase 4 SDK Integration (New in v2.5.0-alpha.131)

### New Tools (3)

1. **`agents_spawn_parallel`** - Spawn multiple agents simultaneously (10-20x faster)
2. **`query_control`** - Control running queries (pause/resume/change model)
3. **`query_list`** - List all active queries and status

## 🔧 Underlying Technologies

### claude-flow (Primary Server)
- **Runtime**: Node.js 18+
- **Protocol**: JSON-RPC 2.0 over stdio/HTTP
- **Database**: SQLite (better-sqlite3) - `.swarm/memory.db`
- **Neural**: WASM with SIMD acceleration
- **Memory**: EventEmitter-based async operations
- **Transport**: stdio (default) or HTTP

### Technology Stack
```
┌─────────────────────────────────────┐
│   Claude Desktop / VS Code          │
│   (MCP Client)                      │
└──────────────┬──────────────────────┘
               │ JSON-RPC 2.0
               ▼
┌─────────────────────────────────────┐
│   MCP Server (Node.js)              │
│   - Tool Registry (90 tools)        │
│   - Resource Manager                │
│   - Session Manager                 │
└──────────────┬──────────────────────┘
               │
    ┌──────────┴──────────┬────────────┐
    ▼                     ▼            ▼
┌─────────┐     ┌──────────────┐  ┌────────┐
│ SQLite  │     │ WASM Engine  │  │ GitHub │
│ .swarm/ │     │ Neural Nets  │  │ API    │
│ memory  │     │ 27 Models    │  │ OAuth  │
└─────────┘     └──────────────┘  └────────┘
```

## ⚙️ Startup & Initialization

### Automatic Setup
```bash
# Installs and configures all 4 MCP servers
npx claude-flow@alpha init
```

### Manual Setup
```bash
# Add each server individually
claude mcp add claude-flow npx claude-flow@alpha mcp start
claude mcp add ruv-swarm npx ruv-swarm mcp start
claude mcp add flow-nexus npx flow-nexus@latest mcp start
claude mcp add agentic-payments npx agentic-payments@latest mcp
```

### Configuration Location

**Claude Desktop**:
- macOS/Linux: `~/.config/claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**VS Code Claude Code**:
- `.vscode/settings.json`

### Startup Sequence

1. **Client starts** (Claude Desktop/VS Code)
2. **Reads config** → Finds MCP servers
3. **Spawns processes**:
   ```bash
   npx claude-flow@alpha mcp start  # stdio mode
   ```
4. **Server initializes**:
   - Loads 90 tools from `src/mcp/mcp-server.js`
   - Opens SQLite database (`.swarm/memory.db`)
   - Registers resources (`claude-flow://swarms`, etc.)
   - Starts JSON-RPC server
5. **Handshake** (protocol negotiation)
6. **Tool discovery** (`tools/list` RPC call)
7. **Ready** ✅

## 📋 Key Features

### 1. Persistent Memory
- **Database**: `.swarm/memory.db` (SQLite)
- **Tables**: 12 specialized tables (memory, agents, tasks, swarms, etc.)
- **Features**: TTL, namespaces, cross-session persistence
- **Backup**: Built-in backup/restore tools

### 2. Neural Networks
- **Models**: 27 pre-trained models
- **Acceleration**: WASM with SIMD (10-100x faster)
- **Patterns**: Coordination, optimization, prediction
- **Training**: Real-time adaptive learning

### 3. Swarm Topologies
- **Hierarchical**: Queen-worker hierarchy
- **Mesh**: Peer-to-peer full connectivity
- **Ring**: Circular communication
- **Star**: Central hub with spokes

### 4. Agent Types
```javascript
// Core types
'researcher', 'coder', 'tester', 'reviewer'

// Specialized types
'task-orchestrator', 'code-analyzer', 'perf-analyzer', 
'api-docs', 'performance-benchmarker', 'system-architect'

// Legacy types (backward compatible)
'coordinator', 'analyst', 'optimizer', 'documenter', 
'monitor', 'specialist', 'architect'
```

## 💡 How Users Invoke MCP Tools

**Important**: Users don't write JavaScript code to use MCP tools. Instead, tools are invoked automatically by Claude when you interact through Claude Desktop or VS Code Claude Code extension.

### How It Works

1. **User asks Claude** (in natural language):
   ```
   "Initialize a hierarchical swarm with 8 agents and spawn 
    a coordinator, researcher, coder, and tester in parallel"
   ```

2. **Claude automatically invokes MCP tools** behind the scenes:
   - Calls `swarm_init` tool with appropriate parameters
   - Calls `agents_spawn_parallel` tool to create agents
   - Returns results to you in natural language

3. **You see the results** without writing any code!

### Example Interactions

#### Example 1: Spawn Swarm with Parallel Agents
**You ask Claude**:
> "Create a hierarchical swarm with 4 agents: a queen coordinator, a researcher worker, a coder worker, and a tester worker. Use parallel spawning for speed."

**Claude invokes these tools** (internal - you don't see this):
```javascript
// Claude automatically calls:
swarm_init({ topology: 'hierarchical', maxAgents: 8 })
agents_spawn_parallel({
  agents: [
    { type: 'coordinator', name: 'queen-1', priority: 'critical' },
    { type: 'researcher', name: 'worker-1', priority: 'high' },
    { type: 'coder', name: 'worker-2', priority: 'high' },
    { type: 'tester', name: 'worker-3', priority: 'medium' }
  ],
  maxConcurrency: 4
})
```

**Claude responds to you**:
> "✅ Created hierarchical swarm with 4 agents in parallel (ID: swarm-abc123)
> - Queen coordinator: queen-1
> - Research worker: worker-1  
> - Code worker: worker-2
> - Test worker: worker-3
> 
> All agents spawned successfully using Phase 4 SDK (10-20x faster!)"

#### Example 2: Memory Management
**You ask Claude**:
> "Store my project configuration in memory under namespace 'my-project' with a 24-hour expiration. The config is: { api_key: 'xxx', timeout: 30 }"

**Claude invokes** (internal):
```javascript
memory_usage({
  action: 'store',
  key: 'project-config',
  value: '{"api_key":"xxx","timeout":30}',
  namespace: 'my-project',
  ttl: 86400
})
```

**You later ask**:
> "Search my memory for anything related to github in the my-project namespace"

**Claude invokes** (internal):
```javascript
memory_search({ pattern: 'github-*', namespace: 'my-project' })
```

#### Example 3: Query Control (Phase 4)
**You ask Claude**:
> "What queries are currently running?"

**Claude invokes** (internal):
```javascript
query_list({ includeHistory: false })
```

**Then you say**:
> "Switch the first query to use Haiku to save costs"

**Claude invokes** (internal):
```javascript
query_control({
  action: 'change_model',
  queryId: 'query-12345',
  model: 'claude-3-5-haiku-20241022'
})
```

### CLI Usage (Alternative)

You can also use MCP tools through `claude-flow` CLI commands:

```bash
# Initialize swarm
claude-flow swarm --topology hierarchical --max-agents 8

# Spawn agents (uses MCP tools internally)
claude-flow swarm spawn --type coordinator --name queen-1

# Check swarm status
claude-flow swarm status

# Memory operations
claude-flow memory store --key "config" --value '{"api":"key"}' --namespace "project"
claude-flow memory search --pattern "github-*" --namespace "project"
```

**Note**: The JavaScript examples in the full guide show the **internal implementation** - how Claude-Flow's code invokes tools, not what users type.

## 📊 Performance Metrics

- **Tool call latency**: 120ms (avg), 350ms (P95), 800ms (P99)
- **Parallel spawning**: 10-20x faster (Phase 4 SDK)
- **Memory usage**: ~150MB per MCP server
- **Database size**: ~50MB (typical project)
- **Rate limit**: 1000 requests/minute (default)

## 🔍 Troubleshooting

### Check Server Status
```bash
claude mcp list                    # List all servers
claude mcp status claude-flow      # Check specific server
```

### Restart Server
```bash
claude mcp restart claude-flow
```

### View Logs
```bash
tail -f ~/.claude/logs/mcp-claude-flow.log
```

### Database Issues
```bash
# Backup and recreate
cp .swarm/memory.db .swarm/memory.db.backup
rm .swarm/memory.db
# Restart server (will recreate database)
```

## �️ Adding Custom MCP Servers

### Quick Add
```bash
# Add existing MCP server package
claude mcp add my-server npx my-mcp-server@latest start

# Verify
claude mcp list
```

### Manual Config
Edit `~/.config/claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": { "API_KEY": "your-key" }
    }
  }
}
```

### Create Custom Server
```javascript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

class MyMCPServer {
  constructor() {
    this.server = new Server(
      { name: 'my-server', version: '1.0.0' },
      { capabilities: { tools: {} } }
    );
    this.setupTools();
  }
  
  setupTools() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'my_tool',
          description: 'My custom tool',
          inputSchema: { /* JSON Schema */ }
        }
      ]
    }));
    
    this.server.setRequestHandler(CallToolRequestSchema, async (req) => {
      // Handle tool calls
    });
  }
  
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}
```

**See full guide**: [CLAUDE_FLOW_MCP_TOOLS_GUIDE.md#adding-custom-mcp-servers](./CLAUDE_FLOW_MCP_TOOLS_GUIDE.md#%EF%B8%8F-adding-custom-mcp-servers-to-claude-flow)

## �📚 Resources

- **Detailed Guide**: [CLAUDE_FLOW_MCP_TOOLS_GUIDE.md](./CLAUDE_FLOW_MCP_TOOLS_GUIDE.md) (full documentation)
- **Swarm Analysis**: [CLAUDE_FLOW_SWARM_HIVE_MIND_ANALYSIS.md](./CLAUDE_FLOW_SWARM_HIVE_MIND_ANALYSIS.md)
- **MCP Clarification**: [MCP_TOOLS_USAGE_CLARIFICATION.md](./MCP_TOOLS_USAGE_CLARIFICATION.md)
- **Enterprise Guide**: [ENTERPRISE_ATS_IMPLEMENTATION_GUIDE.md](./ENTERPRISE_ATS_IMPLEMENTATION_GUIDE.md)
- **Baseline Info**: [BASELINE_INFO.md](./BASELINE_INFO.md)

---

**Version**: v2.5.0-alpha.131  
**Date**: October 6, 2025  
**Total Tools**: 90 (87 original + 3 Phase 4 SDK)
