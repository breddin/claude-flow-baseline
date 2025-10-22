export { AgentExecutor } from './agent-executor.js';
export { ProviderManager } from './provider-manager.js';
import { AgentExecutor } from './agent-executor.js';
import { ProviderManager } from './provider-manager.js';
export function createExecutor(hooksManager) {
    return new AgentExecutor(hooksManager);
}
export function createProviderManager() {
    return new ProviderManager();
}

//# sourceMappingURL=index.js.map