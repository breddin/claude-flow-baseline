import fs from 'fs-extra';
import path from 'path';
import os from 'os';
export class ProviderManager {
    config;
    configPath;
    constructor(){
        this.configPath = path.join(os.homedir(), '.claude', 'settings.json');
        this.config = this.loadConfig();
    }
    getDefaultProvider() {
        return this.config.defaultProvider || 'anthropic';
    }
    getProviderConfig(provider) {
        return this.config.providers?.[provider] || null;
    }
    async setDefaultProvider(provider) {
        this.config.defaultProvider = provider;
        await this.saveConfig();
    }
    async configureProvider(provider, config) {
        if (!this.config.providers) {
            this.config.providers = {};
        }
        this.config.providers[provider] = {
            ...this.config.providers[provider],
            name: provider,
            ...config
        };
        await this.saveConfig();
    }
    listProviders() {
        if (!this.config.providers) {
            return this.getDefaultProviders();
        }
        return Object.values(this.config.providers);
    }
    getOptimizationStrategy() {
        return this.config.optimization?.strategy || 'balanced';
    }
    loadConfig() {
        try {
            if (fs.existsSync(this.configPath)) {
                const data = fs.readFileSync(this.configPath, 'utf-8');
                const settings = JSON.parse(data);
                return settings['claude-flow']?.execution || this.getDefaultConfig();
            }
        } catch (error) {
            console.warn('Failed to load provider config, using defaults');
        }
        return this.getDefaultConfig();
    }
    async saveConfig() {
        try {
            await fs.ensureDir(path.dirname(this.configPath));
            let settings = {};
            if (await fs.pathExists(this.configPath)) {
                const data = await fs.readFile(this.configPath, 'utf-8');
                settings = JSON.parse(data);
            }
            if (!settings['claude-flow']) {
                settings['claude-flow'] = {};
            }
            settings['claude-flow'].execution = this.config;
            await fs.writeFile(this.configPath, JSON.stringify(settings, null, 2), 'utf-8');
        } catch (error) {
            console.error('Failed to save provider config:', error.message);
        }
    }
    getDefaultConfig() {
        return {
            defaultProvider: 'anthropic',
            providers: {
                anthropic: {
                    name: 'anthropic',
                    model: 'claude-sonnet-4-5-20250929',
                    enabled: true,
                    priority: 'quality'
                },
                openrouter: {
                    name: 'openrouter',
                    model: 'meta-llama/llama-3.1-8b-instruct',
                    enabled: true,
                    priority: 'cost'
                },
                onnx: {
                    name: 'onnx',
                    model: 'Xenova/gpt2',
                    enabled: true,
                    priority: 'privacy'
                },
                gemini: {
                    name: 'gemini',
                    enabled: true,
                    priority: 'cost'
                }
            },
            optimization: {
                strategy: 'balanced',
                maxCostPerTask: 0.5
            }
        };
    }
    getDefaultProviders() {
        return Object.values(this.getDefaultConfig().providers);
    }
}
export default ProviderManager;

//# sourceMappingURL=provider-manager.js.map