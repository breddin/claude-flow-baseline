#!/usr/bin/env node
/**
 * GitHub Issues Auto-Detection and Fix System
 * Automatically detects new GitHub issues and deploys AI agents to analyze and fix them
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { githubAPI } from './github-api.js';
import { printSuccess, printError, printWarning, printInfo } from '../../utils.js';
import { cwd } from '../../node-compat.js';

// Configuration
const CONFIG_FILE = path.join(cwd(), 'github-auto-fix-config.json');
const DEFAULT_CONFIG = {
  enabled: true,
  repositories: [],
  autoFixLabels: ['bug', 'auto-fix', 'good first issue'],
  ignoredLabels: ['wontfix', 'duplicate', 'invalid'],
  maxConcurrentIssues: 3,
  webhookPort: 3001,
  sparc: {
    enabled: true,
    mode: 'debug_specialist',
    memory_namespace: 'github_autofix'
  },
  swarm: {
    enabled: true,
    topology: 'hierarchical',
    maxAgents: 5,
    roles: ['analyzer', 'debugger', 'tester', 'fixer', 'reviewer']
  },
  notifications: {
    slack: null,
    email: null,
    github_comments: true
  }
};

class GitHubIssueAutoFix {
  constructor(config = {}) {
    this.config = this.loadConfig();
    this.activeProcesses = new Map();
    this.processQueue = [];
    this.webhook = null;
  }

  /**
   * Load configuration from file or create default
   */
  loadConfig() {
    if (existsSync(CONFIG_FILE)) {
      try {
        const config = JSON.parse(readFileSync(CONFIG_FILE, 'utf8'));
        return { ...DEFAULT_CONFIG, ...config };
      } catch (error) {
        printWarning('Invalid config file, using defaults');
        return DEFAULT_CONFIG;
      }
    }
    
    this.saveConfig(DEFAULT_CONFIG);
    return DEFAULT_CONFIG;
  }

  /**
   * Save configuration to file
   */
  saveConfig(config) {
    writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  }

  /**
   * Initialize the auto-fix system
   */
  async initialize() {
    printInfo('🚀 Initializing GitHub Issues Auto-Fix System...');
    
    // Validate GitHub token
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN environment variable is required');
    }

    // Initialize SPARC if enabled
    if (this.config.sparc.enabled) {
      await this.initializeSparc();
    }

    // Initialize Swarm if enabled
    if (this.config.swarm.enabled) {
      await this.initializeSwarm();
    }

    // Start webhook server if configured
    if (this.config.webhookPort) {
      await this.startWebhookServer();
    }

    printSuccess('✅ GitHub Issues Auto-Fix System initialized successfully');
  }

  /**
   * Initialize SPARC methodology system
   */
  async initializeSparc() {
    try {
      printInfo('🧠 Initializing SPARC methodology system...');
      
      // Set memory namespace for GitHub auto-fix
      const memorySetup = `claude-flow memory namespace ${this.config.sparc.memory_namespace}`;
      execSync(memorySetup, { stdio: 'pipe' });
      
      printSuccess('✅ SPARC system initialized');
    } catch (error) {
      printWarning('SPARC system not available, continuing without SPARC features');
    }
  }

  /**
   * Initialize Swarm coordination system
   */
  async initializeSwarm() {
    try {
      printInfo('🐝 Initializing Swarm coordination system...');
      
      // Check if ruv-swarm is available
      execSync('npx ruv-swarm --version', { stdio: 'pipe' });
      
      // Initialize swarm for GitHub coordination
      const swarmInit = execSync(
        `npx ruv-swarm init --topology ${this.config.swarm.topology} --max-agents ${this.config.swarm.maxAgents}`,
        { encoding: 'utf8', stdio: 'pipe' }
      );
      
      printSuccess('✅ Swarm system initialized');
    } catch (error) {
      printWarning('Swarm system not available, continuing without swarm features');
      this.config.swarm.enabled = false;
    }
  }

  /**
   * Start webhook server to listen for GitHub events
   */
  async startWebhookServer() {
    const http = await import('http');
    const crypto = await import('crypto');
    
    this.webhook = http.createServer(async (req, res) => {
      if (req.method === 'POST' && req.url === '/github-webhook') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const signature = req.headers['x-hub-signature-256'];
            const event = req.headers['x-github-event'];
            
            // Verify webhook signature if secret is configured
            if (process.env.GITHUB_WEBHOOK_SECRET) {
              const expectedSignature = `sha256=${crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET)
                .update(body)
                .digest('hex')}`;
              
              if (signature !== expectedSignature) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid signature' }));
                return;
              }
            }
            
            const eventData = JSON.parse(body);
            await this.handleWebhookEvent(event, eventData);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'ok' }));
          } catch (error) {
            printError(`Webhook error: ${error.message}`);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
      }
    });

    this.webhook.listen(this.config.webhookPort, () => {
      printSuccess(`🌐 Webhook server listening on port ${this.config.webhookPort}`);
    });
  }

  /**
   * Handle incoming webhook events
   */
  async handleWebhookEvent(event, eventData) {
    switch (event) {
      case 'issues':
        await this.handleIssueEvent(eventData);
        break;
      case 'issue_comment':
        await this.handleIssueCommentEvent(eventData);
        break;
      case 'push':
        await this.handlePushEvent(eventData);
        break;
      default:
        printInfo(`Received unhandled event: ${event}`);
    }
  }

  /**
   * Handle issue events (opened, labeled, etc.)
   */
  async handleIssueEvent(eventData) {
    const { action, issue, repository } = eventData;
    
    if (action === 'opened' || action === 'labeled') {
      printInfo(`📋 Issue ${action}: #${issue.number} - ${issue.title}`);
      
      // Check if this issue should be auto-fixed
      if (await this.shouldAutoFix(issue, repository)) {
        await this.queueIssueForProcessing(issue, repository);
      }
    }
  }

  /**
   * Handle issue comment events for manual triggers
   */
  async handleIssueCommentEvent(eventData) {
    const { action, comment, issue, repository } = eventData;
    
    if (action === 'created' && comment.body.includes('/auto-fix')) {
      printInfo(`💬 Auto-fix requested via comment on issue #${issue.number}`);
      await this.queueIssueForProcessing(issue, repository, true);
    }
  }

  /**
   * Handle push events to detect new issues in code
   */
  async handlePushEvent(eventData) {
    // TODO: Implement static analysis of pushed code to detect potential issues
    printInfo(`📤 Push detected: ${eventData.commits.length} commits`);
  }

  /**
   * Determine if an issue should be auto-fixed
   */
  async shouldAutoFix(issue, repository) {
    // Check repository whitelist
    const repoFullName = repository.full_name;
    if (this.config.repositories.length > 0 && !this.config.repositories.includes(repoFullName)) {
      return false;
    }

    // Check if issue has auto-fix labels
    const issueLabels = issue.labels.map(label => label.name);
    const hasAutoFixLabel = this.config.autoFixLabels.some(label => issueLabels.includes(label));
    
    // Check if issue has ignored labels
    const hasIgnoredLabel = this.config.ignoredLabels.some(label => issueLabels.includes(label));
    
    if (hasIgnoredLabel) {
      return false;
    }

    // Auto-fix if has appropriate labels or matches certain criteria
    if (hasAutoFixLabel) {
      return true;
    }

    // Auto-fix simple bugs based on title/body analysis
    const title = issue.title.toLowerCase();
    const body = (issue.body || '').toLowerCase();
    const text = `${title} ${body}`;
    
    const bugKeywords = ['error', 'bug', 'broken', 'fails', 'not working', 'crash'];
    const hasBugKeywords = bugKeywords.some(keyword => text.includes(keyword));
    
    return hasBugKeywords && issueLabels.includes('bug');
  }

  /**
   * Queue an issue for processing
   */
  async queueIssueForProcessing(issue, repository, forceProcess = false) {
    const issueId = `${repository.full_name}#${issue.number}`;
    
    // Check if already processing
    if (this.activeProcesses.has(issueId)) {
      printWarning(`Issue ${issueId} is already being processed`);
      return;
    }

    // Check concurrency limits
    if (this.activeProcesses.size >= this.config.maxConcurrentIssues && !forceProcess) {
      this.processQueue.push({ issue, repository });
      printInfo(`Issue ${issueId} queued for processing`);
      return;
    }

    await this.processIssue(issue, repository);
  }

  /**
   * Process an issue using AI agents
   */
  async processIssue(issue, repository) {
    const issueId = `${repository.full_name}#${issue.number}`;
    
    try {
      printInfo(`🔧 Processing issue ${issueId}...`);
      this.activeProcesses.set(issueId, { startTime: Date.now(), issue, repository });

      // Add processing label
      await githubAPI.addIssueLabels(repository.owner.login, repository.name, issue.number, ['auto-fixing']);

      // Step 1: Analyze the issue
      const analysis = await this.analyzeIssue(issue, repository);
      
      // Step 2: Create fix strategy
      const strategy = await this.createFixStrategy(analysis, issue, repository);
      
      // Step 3: Implement fix if possible
      const fixResult = await this.implementFix(strategy, issue, repository);
      
      // Step 4: Create summary comment
      await this.createSummaryComment(issue, repository, analysis, strategy, fixResult);

      // Remove processing label and add result label
      await githubAPI.addIssueLabels(
        repository.owner.login, 
        repository.name, 
        issue.number, 
        fixResult.success ? ['auto-fixed'] : ['auto-fix-attempted']
      );

      printSuccess(`✅ Completed processing issue ${issueId}`);
      
    } catch (error) {
      printError(`Failed to process issue ${issueId}: ${error.message}`);
      
      // Add error label and comment
      await githubAPI.addIssueLabels(repository.owner.login, repository.name, issue.number, ['auto-fix-error']);
      await this.addErrorComment(issue, repository, error);
      
    } finally {
      this.activeProcesses.delete(issueId);
      
      // Process next item in queue
      if (this.processQueue.length > 0) {
        const next = this.processQueue.shift();
        setTimeout(() => this.processIssue(next.issue, next.repository), 1000);
      }
    }
  }

  /**
   * Analyze issue using SPARC methodology
   */
  async analyzeIssue(issue, repository) {
    printInfo(`🔍 Analyzing issue #${issue.number}...`);
    
    const analysis = {
      type: 'unknown',
      severity: 'medium',
      complexity: 'unknown',
      suggestions: [],
      relatedFiles: [],
      rootCause: null
    };

    try {
      if (this.config.sparc.enabled) {
        // Use SPARC debug specialist mode for analysis
        const sparcAnalysis = execSync(
          `claude-flow sparc ${this.config.sparc.mode} "Analyze GitHub issue: ${issue.title}. Description: ${issue.body || 'No description'}"`,
          { encoding: 'utf8', stdio: 'pipe' }
        );
        
        // Parse SPARC output (simplified)
        analysis.suggestions.push('SPARC analysis completed');
      }

      // Analyze issue content
      const title = issue.title.toLowerCase();
      const body = (issue.body || '').toLowerCase();
      const text = `${title} ${body}`;

      // Determine issue type
      if (text.includes('error') || text.includes('exception') || text.includes('crash')) {
        analysis.type = 'error';
        analysis.severity = 'high';
      } else if (text.includes('slow') || text.includes('performance')) {
        analysis.type = 'performance';
        analysis.severity = 'medium';
      } else if (text.includes('ui') || text.includes('display') || text.includes('visual')) {
        analysis.type = 'ui';
        analysis.severity = 'low';
      } else if (text.includes('feature') || text.includes('enhancement')) {
        analysis.type = 'feature';
        analysis.severity = 'low';
      }

      // Extract potential file references
      const fileMatches = text.match(/[\w/.-]+\.(js|ts|py|java|cpp|c|go|rb|php|css|html|json|yaml|yml)/g);
      if (fileMatches) {
        analysis.relatedFiles = [...new Set(fileMatches)];
      }

      printSuccess(`✅ Issue analysis completed: ${analysis.type} (${analysis.severity} severity)`);
      
    } catch (error) {
      printWarning(`Analysis failed: ${error.message}`);
    }

    return analysis;
  }

  /**
   * Create fix strategy based on analysis
   */
  async createFixStrategy(analysis, issue, repository) {
    printInfo(`📋 Creating fix strategy for issue #${issue.number}...`);
    
    const strategy = {
      approach: 'investigate',
      steps: [],
      filesToCheck: analysis.relatedFiles,
      estimatedEffort: 'medium',
      requiresHumanReview: true,
      autoFixable: false
    };

    // Determine strategy based on issue type
    switch (analysis.type) {
      case 'error':
        strategy.approach = 'debug';
        strategy.steps = [
          'Examine stack trace and error logs',
          'Identify root cause in related files',
          'Create targeted fix',
          'Add error handling if needed',
          'Create unit test to prevent regression'
        ];
        strategy.autoFixable = analysis.relatedFiles.length <= 3;
        break;

      case 'performance':
        strategy.approach = 'optimize';
        strategy.steps = [
          'Profile performance bottlenecks',
          'Analyze algorithmic complexity',
          'Implement optimization',
          'Add performance tests',
          'Validate improvement metrics'
        ];
        break;

      case 'ui':
        strategy.approach = 'design';
        strategy.steps = [
          'Review UI/UX requirements',
          'Check CSS and layout issues',
          'Test across browsers/devices',
          'Implement visual fixes',
          'Add visual regression tests'
        ];
        strategy.autoFixable = true;
        break;

      case 'feature':
        strategy.approach = 'implement';
        strategy.steps = [
          'Analyze feature requirements',
          'Design implementation approach',
          'Create feature implementation',
          'Add comprehensive tests',
          'Update documentation'
        ];
        strategy.requiresHumanReview = true;
        break;

      default:
        strategy.steps = [
          'Investigate issue details',
          'Gather additional context',
          'Propose solution approach',
          'Request human review'
        ];
    }

    printSuccess(`✅ Fix strategy created: ${strategy.approach} approach`);
    return strategy;
  }

  /**
   * Implement fix using swarm coordination
   */
  async implementFix(strategy, issue, repository) {
    printInfo(`🔧 Implementing fix for issue #${issue.number}...`);
    
    const result = {
      success: false,
      implemented: false,
      pullRequestCreated: false,
      branchName: null,
      changes: [],
      testsAdded: false,
      message: 'Fix implementation attempted'
    };

    try {
      if (!strategy.autoFixable) {
        result.message = 'Issue requires human review - automated fix not attempted';
        return result;
      }

      if (this.config.swarm.enabled) {
        // Use swarm coordination for implementation
        const swarmResult = execSync(
          `npx ruv-swarm github issue-fix ${issue.number} --repo ${repository.full_name} --strategy ${strategy.approach}`,
          { encoding: 'utf8', stdio: 'pipe' }
        );
        
        if (swarmResult.includes('success')) {
          result.success = true;
          result.implemented = true;
          result.message = 'Fix implemented successfully using swarm coordination';
        }
      } else {
        // Simulate fix implementation
        result.message = 'Fix implementation simulated (swarm not available)';
      }

    } catch (error) {
      result.message = `Fix implementation failed: ${error.message}`;
    }

    return result;
  }

  /**
   * Create summary comment on the issue
   */
  async createSummaryComment(issue, repository, analysis, strategy, fixResult) {
    const timestamp = new Date().toISOString();
    
    const comment = `## 🤖 Auto-Fix Analysis Report

### Issue Analysis
- **Type**: ${analysis.type}
- **Severity**: ${analysis.severity}
- **Complexity**: ${analysis.complexity}
- **Related Files**: ${analysis.relatedFiles.length > 0 ? analysis.relatedFiles.join(', ') : 'None identified'}

### Fix Strategy
- **Approach**: ${strategy.approach}
- **Auto-fixable**: ${strategy.autoFixable ? 'Yes' : 'No'}
- **Human Review Required**: ${strategy.requiresHumanReview ? 'Yes' : 'No'}

### Implementation Result
- **Status**: ${fixResult.success ? '✅ Success' : '⚠️ Partial/Failed'}
- **Result**: ${fixResult.message}
${fixResult.pullRequestCreated ? `- **Pull Request**: Created on branch \`${fixResult.branchName}\`` : ''}
${fixResult.testsAdded ? '- **Tests**: Added regression tests' : ''}

### Next Steps
${strategy.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

---
*Generated by Claude Flow Auto-Fix System at ${timestamp}*
*Powered by ${this.config.sparc.enabled ? 'SPARC methodology' : 'Standard analysis'} and ${this.config.swarm.enabled ? 'Swarm coordination' : 'Single-agent processing'}*`;

    try {
      await githubAPI.request(`/repos/${repository.owner.login}/${repository.name}/issues/${issue.number}/comments`, {
        method: 'POST',
        body: { body: comment }
      });
    } catch (error) {
      printWarning(`Failed to add summary comment: ${error.message}`);
    }
  }

  /**
   * Add error comment to issue
   */
  async addErrorComment(issue, repository, error) {
    const comment = `## ❌ Auto-Fix Error

An error occurred while attempting to automatically analyze and fix this issue:

\`\`\`
${error.message}
\`\`\`

The issue has been marked for manual review. A human developer will need to investigate this issue.

---
*Generated by Claude Flow Auto-Fix System*`;

    try {
      await githubAPI.request(`/repos/${repository.owner.login}/${repository.name}/issues/${issue.number}/comments`, {
        method: 'POST',
        body: { body: comment }
      });
    } catch (error) {
      printWarning(`Failed to add error comment: ${error.message}`);
    }
  }

  /**
   * Configure the auto-fix system
   */
  async configure(options = {}) {
    printInfo('⚙️ Configuring GitHub Auto-Fix System...');
    
    if (options.repository) {
      if (!this.config.repositories.includes(options.repository)) {
        this.config.repositories.push(options.repository);
      }
    }

    if (options.webhookPort) {
      this.config.webhookPort = options.webhookPort;
    }

    if (options.sparc !== undefined) {
      this.config.sparc.enabled = options.sparc;
    }

    if (options.swarm !== undefined) {
      this.config.swarm.enabled = options.swarm;
    }

    this.saveConfig(this.config);
    printSuccess('✅ Configuration updated');
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      config: this.config,
      activeProcesses: this.activeProcesses.size,
      queuedProcesses: this.processQueue.length,
      webhookRunning: this.webhook !== null,
      sparcEnabled: this.config.sparc.enabled,
      swarmEnabled: this.config.swarm.enabled
    };
  }

  /**
   * Shutdown the system gracefully
   */
  async shutdown() {
    printInfo('🛑 Shutting down GitHub Auto-Fix System...');
    
    if (this.webhook) {
      this.webhook.close();
    }

    // Wait for active processes to complete (with timeout)
    const timeout = 30000; // 30 seconds
    const start = Date.now();
    
    while (this.activeProcesses.size > 0 && (Date.now() - start) < timeout) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    printSuccess('✅ GitHub Auto-Fix System shut down');
  }
}

export default GitHubIssueAutoFix;
export { GitHubIssueAutoFix };
