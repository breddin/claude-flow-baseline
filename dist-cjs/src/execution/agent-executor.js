import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);
export class AgentExecutor {
    agenticFlowPath;
    hooksManager;
    memoryEnabled = false;
    memoryDatabase = '.swarm/memory.db';
    constructor(hooksManager){
        this.hooksManager = hooksManager;
        this.agenticFlowPath = 'npx agentic-flow';
    }
    async initializeMemory(dbPath) {
        const db = dbPath || this.memoryDatabase;
        try {
            const { stdout } = await execAsync(`${this.agenticFlowPath} reasoningbank init`);
            this.memoryEnabled = true;
            this.memoryDatabase = db;
            console.log('✅ ReasoningBank initialized:', db);
        } catch (error) {
            console.error('Failed to initialize ReasoningBank:', error.message);
            throw error;
        }
    }
    async getMemoryStats() {
        if (!this.memoryEnabled) {
            return {
                enabled: false,
                totalMemories: 0
            };
        }
        try {
            const { stdout } = await execAsync(`${this.agenticFlowPath} reasoningbank status`);
            return {
                enabled: true,
                output: stdout
            };
        } catch (error) {
            return {
                enabled: true,
                error: error.message
            };
        }
    }
    async consolidateMemories() {
        if (!this.memoryEnabled) return;
        try {
            await execAsync(`${this.agenticFlowPath} reasoningbank consolidate`);
            console.log('✅ Memory consolidation complete');
        } catch (error) {
            console.warn('Consolidation failed:', error.message);
        }
    }
    async execute(options) {
        const startTime = Date.now();
        const taskId = options.memoryTaskId || `task-${Date.now()}`;
        try {
            if (options.enableMemory && !this.memoryEnabled) {
                try {
                    await this.initializeMemory(options.memoryDatabase);
                } catch (error) {
                    console.warn('Memory initialization failed, continuing without memory');
                }
            }
            if (this.hooksManager) {
                await this.hooksManager.trigger('pre-agent-execute', {
                    agent: options.agent,
                    task: options.task,
                    provider: options.provider || 'anthropic',
                    timestamp: Date.now(),
                    memoryEnabled: this.memoryEnabled || options.enableMemory
                });
            }
            const command = this.buildCommand(options);
            const { stdout, stderr } = await execAsync(command, {
                timeout: options.timeout || 300000,
                maxBuffer: 10 * 1024 * 1024
            });
            const duration = Date.now() - startTime;
            const result = {
                success: true,
                output: stdout,
                provider: options.provider || 'anthropic',
                model: options.model || 'default',
                duration,
                agent: options.agent,
                task: options.task,
                memoryEnabled: this.memoryEnabled || options.enableMemory || false
            };
            if (this.hooksManager) {
                await this.hooksManager.trigger('post-agent-execute', {
                    agent: options.agent,
                    task: options.task,
                    result,
                    success: true
                });
            }
            return result;
        } catch (error) {
            const duration = Date.now() - startTime;
            const result = {
                success: false,
                output: '',
                error: error.message,
                provider: options.provider || 'anthropic',
                model: options.model || 'default',
                duration,
                agent: options.agent,
                task: options.task,
                memoryEnabled: this.memoryEnabled || options.enableMemory || false
            };
            if (this.hooksManager) {
                await this.hooksManager.trigger('agent-execute-error', {
                    agent: options.agent,
                    task: options.task,
                    error: error.message
                });
            }
            return result;
        }
    }
    async listAgents(source) {
        try {
            const command = source ? `${this.agenticFlowPath} agent list --filter ${source}` : `${this.agenticFlowPath} agent list`;
            const { stdout } = await execAsync(command);
            const agents = stdout.split('\n').filter((line)=>line.trim()).map((line)=>line.trim());
            return agents;
        } catch (error) {
            console.error('Failed to list agents:', error.message);
            return [];
        }
    }
    async getAgentInfo(agentName) {
        try {
            const command = `${this.agenticFlowPath} agent info ${agentName}`;
            const { stdout } = await execAsync(command);
            if (stdout.trim().startsWith('{')) {
                return JSON.parse(stdout);
            }
            return {
                name: agentName,
                description: stdout
            };
        } catch (error) {
            console.error('Failed to get agent info:', error.message);
            return null;
        }
    }
    buildCommand(options) {
        const parts = [
            this.agenticFlowPath
        ];
        parts.push('--agent', options.agent);
        parts.push('--task', `"${options.task.replace(/"/g, '\\"')}"`);
        if (options.provider) {
            parts.push('--provider', options.provider);
        }
        if (options.model) {
            parts.push('--model', options.model);
        }
        if (options.temperature !== undefined) {
            parts.push('--temperature', options.temperature.toString());
        }
        if (options.maxTokens) {
            parts.push('--max-tokens', options.maxTokens.toString());
        }
        if (options.outputFormat) {
            parts.push('--output-format', options.outputFormat);
        }
        if (options.stream) {
            parts.push('--stream');
        }
        if (options.verbose) {
            parts.push('--verbose');
        }
        return parts.join(' ');
    }
}
export default AgentExecutor;

//# sourceMappingURL=agent-executor.js.map