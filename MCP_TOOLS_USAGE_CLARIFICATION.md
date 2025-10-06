# MCP Tools Usage Clarification

## 🔍 The Confusion: Why `mcp__claude-flow__swarm_monitor` Can't Be Called Directly

### The Problem
When you launch claude-flow with swarm mode, you see these "Pro Tips":
```
💡 Pro Tips:
──────────────────────────────
• Use TodoWrite to track parallel tasks
• Store results with mcp__claude-flow__memory_usage
• Monitor progress with mcp__claude-flow__swarm_monitor
• Check task status with mcp__claude-flow__task_status
```

**However**, there's no direct CLI command to invoke `mcp__claude-flow__swarm_monitor`. This is confusing!

### The Reason
These tools with the `mcp__claude-flow__` prefix are **MCP (Model Context Protocol) tools** designed to be called:

1. **From within Claude Desktop** - When Claude Desktop connects to the MCP server
2. **Via the MCP Protocol** - Not as standalone CLI commands
3. **By AI agents** - During swarm coordination and task execution

### How MCP Tools Actually Work

#### Architecture:
```
┌─────────────────────┐
│  Claude Desktop     │
│  (AI Assistant)     │
└──────────┬──────────┘
           │ MCP Protocol
           ↓
┌─────────────────────┐
│  MCP Server         │
│  (claude-flow)      │
└──────────┬──────────┘
           │ Exposes Tools
           ↓
┌─────────────────────┐
│  87 MCP Tools       │
│  - swarm_monitor    │
│  - memory_usage     │
│  - task_status      │
│  - neural_patterns  │
│  etc...             │
└─────────────────────┘
```

## ✅ What You CAN Do

### 1. **Start the MCP Server**
```bash
./bin/claude-flow mcp start --auto-orchestrator
```
This makes all 87 MCP tools available to Claude Desktop.

### 2. **List Available MCP Tools**
```bash
./bin/claude-flow mcp tools
./bin/claude-flow mcp tools --category=swarm
./bin/claude-flow mcp tools --verbose
```

### 3. **Check Swarm Status** (Alternative)
Instead of `mcp__claude-flow__swarm_monitor`, use the actual CLI command:

```bash
# Check swarm status via swarm command
./bin/claude-flow swarm status

# Or if you have a swarm ID
./bin/claude-flow swarm status --swarm-id <id>
```

### 4. **Monitor Via Hive-Mind** (If using hive-mind)
```bash
./bin/claude-flow hive-mind status
./bin/claude-flow hive-mind agents
./bin/claude-flow hive-mind tasks
```

### 5. **Use Real-Time Monitoring Script**
There may be a monitoring script in the codebase:
```bash
# Look for monitoring tools
find . -name "*monitor*.py" -o -name "*monitor*.js" | grep -v node_modules
```

## 🔧 Recommended Fix

The "Pro Tips" message is **misleading** because it suggests you can directly call these MCP tools from the command line, but you can't.

### Option A: Update the Pro Tips Message
Change the tips to show **actual CLI commands**:

```javascript
console.log('\n💡 Pro Tips:');
console.log('─'.repeat(30));
console.log('• Use TodoWrite to track parallel tasks');
console.log('• Check swarm status: claude-flow swarm status');
console.log('• Monitor via hive-mind: claude-flow hive-mind status');
console.log('• View agent metrics: claude-flow hive-mind agents');
console.log('• Check task progress: claude-flow hive-mind tasks');
```

### Option B: Create CLI Wrappers for MCP Tools
Add actual CLI commands that wrap the MCP tools:

```bash
./bin/claude-flow monitor swarm [--swarm-id <id>]
./bin/claude-flow monitor agents [--agent-id <id>]
./bin/claude-flow monitor tasks [--task-id <id>]
./bin/claude-flow memory store <key> <value>
./bin/claude-flow memory retrieve <key>
```

### Option C: Document MCP Tool Usage
Add clear documentation explaining:
1. MCP tools are for Claude Desktop integration
2. Here are the CLI equivalents for common tasks
3. How to set up Claude Desktop to use these tools

## 📋 Actual Working Commands

### For Swarm Monitoring:
```bash
# Launch swarm (already running)
./bin/claude-flow swarm "your objective" --strategy development

# In another terminal - check status
./bin/claude-flow swarm status

# Or use hive-mind commands
./bin/claude-flow hive-mind status
./bin/claude-flow hive-mind agents
./bin/claude-flow hive-mind tasks
./bin/claude-flow hive-mind metrics
```

### For Task Tracking:
```bash
# List tasks
./bin/claude-flow hive-mind tasks

# Check specific task
./bin/claude-flow hive-mind task <task-id>
```

### For Memory Operations:
The memory MCP tools are also not directly accessible. Instead:
- Memory is automatically managed during swarm operations
- Stored in SQLite database (check `data/hive-mind.db`)
- Or use hive-mind memory commands if they exist

## 🎯 Summary

**The Issue**: Pro Tips mention MCP tool names that can't be called directly from CLI

**The Reality**: 
- `mcp__claude-flow__swarm_monitor` → Use `claude-flow swarm status` or `claude-flow hive-mind status`
- `mcp__claude-flow__memory_usage` → Memory is auto-managed, or use hive-mind commands
- `mcp__claude-flow__task_status` → Use `claude-flow hive-mind tasks`

**The Fix Needed**: Either:
1. Update Pro Tips to show actual CLI commands
2. Create CLI wrappers for MCP tools
3. Document that these are MCP protocol tools for Claude Desktop

## 🔗 Related Files to Update

1. **`src/cli/simple-commands/swarm.js`** - Line 853-859: Update Pro Tips
2. **`src/cli/simple-commands/hive-mind.js`** - Line 2221+: Similar Pro Tips
3. **`ENTERPRISE_ATS_IMPLEMENTATION_GUIDE.md`** - Show correct monitoring commands
4. **`docs/MCP_TOOLS.md`** - Clarify MCP vs CLI distinction

## 💡 Recommended Enterprise ATS Guide Changes

Instead of saying:
```bash
# Monitor with MCP tool (doesn't work!)
mcp__claude-flow__swarm_monitor
```

Say:
```bash
# Monitor swarm progress in real-time
# Terminal 1: Run swarm
./bin/claude-flow swarm "Design PostgreSQL architecture..." --strategy development

# Terminal 2: Monitor status
watch -n 5 './bin/claude-flow hive-mind status'

# Or check periodically
./bin/claude-flow hive-mind agents
./bin/claude-flow hive-mind tasks
./bin/claude-flow hive-mind metrics
```

This way users have **actual working commands** instead of confusing MCP tool references!
