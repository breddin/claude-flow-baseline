#!/usr/bin/env node
/**
 * GitHub Auto-Fix CLI Command
 * Command-line interface for managing the GitHub issues auto-detection and fix system
 */

import { program } from 'commander';
import { GitHubIssueAutoFix } from '../simple-commands/github/issue-auto-fix.js';
import { printSuccess, printError, printWarning, printInfo } from '../utils.js';

let autoFixSystem = null;

program
  .name('github-auto-fix')
  .description('Automatically detect and fix GitHub issues using AI agents')
  .version('1.0.0');

program
  .command('start')
  .description('Start the GitHub auto-fix system')
  .option('-p, --port <port>', 'Webhook server port', '3001')
  .option('--no-sparc', 'Disable SPARC methodology')
  .option('--no-swarm', 'Disable swarm coordination')
  .action(async (options) => {
    try {
      autoFixSystem = new GitHubIssueAutoFix();
      
      await autoFixSystem.configure({
        webhookPort: parseInt(options.port),
        sparc: options.sparc,
        swarm: options.swarm
      });
      
      await autoFixSystem.initialize();
      
      printSuccess('🤖 GitHub Auto-Fix System is now running!');
      printInfo(`📡 Webhook endpoint: http://localhost:${options.port}/github-webhook`);
      printInfo('🛑 Press Ctrl+C to stop');
      
      // Keep the process running
      process.on('SIGINT', async () => {
        printInfo('\n🛑 Shutting down...');
        await autoFixSystem.shutdown();
        process.exit(0);
      });
      
      // Keep process alive
      setInterval(() => {}, 1000);
      
    } catch (error) {
      printError(`Failed to start auto-fix system: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Check the status of the auto-fix system')
  .action(async () => {
    try {
      if (!autoFixSystem) {
        autoFixSystem = new GitHubIssueAutoFix();
      }
      
      const status = autoFixSystem.getStatus();
      
      console.log('\n📊 GitHub Auto-Fix System Status');
      console.log('=' .repeat(40));
      console.log(`🔧 System Enabled: ${status.config.enabled ? '✅' : '❌'}`);
      console.log(`🧠 SPARC Enabled: ${status.sparcEnabled ? '✅' : '❌'}`);
      console.log(`🐝 Swarm Enabled: ${status.swarmEnabled ? '✅' : '❌'}`);
      console.log(`🌐 Webhook Running: ${status.webhookRunning ? '✅' : '❌'}`);
      console.log(`📋 Active Processes: ${status.activeProcesses}`);
      console.log(`⏳ Queued Processes: ${status.queuedProcesses}`);
      console.log(`📁 Watched Repositories: ${status.config.repositories.length}`);
      
      if (status.config.repositories.length > 0) {
        console.log('\n📂 Monitored Repositories:');
        status.config.repositories.forEach(repo => {
          console.log(`  - ${repo}`);
        });
      }
      
      console.log('\n🏷️ Auto-Fix Labels:');
      status.config.autoFixLabels.forEach(label => {
        console.log(`  - ${label}`);
      });
      
    } catch (error) {
      printError(`Failed to get status: ${error.message}`);
    }
  });

program
  .command('add-repo <repository>')
  .description('Add a repository to monitor (format: owner/repo)')
  .action(async (repository) => {
    try {
      if (!autoFixSystem) {
        autoFixSystem = new GitHubIssueAutoFix();
      }
      
      await autoFixSystem.configure({ repository });
      printSuccess(`✅ Added repository: ${repository}`);
      
    } catch (error) {
      printError(`Failed to add repository: ${error.message}`);
    }
  });

program
  .command('configure')
  .description('Configure the auto-fix system interactively')
  .action(async () => {
    try {
      const { default: inquirer } = await import('inquirer');
      
      if (!autoFixSystem) {
        autoFixSystem = new GitHubIssueAutoFix();
      }
      
      const currentConfig = autoFixSystem.getStatus().config;
      
      const answers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'enabled',
          message: 'Enable auto-fix system?',
          default: currentConfig.enabled
        },
        {
          type: 'input',
          name: 'webhookPort',
          message: 'Webhook server port:',
          default: currentConfig.webhookPort,
          validate: (input) => {
            const port = parseInt(input);
            return port > 0 && port < 65536 ? true : 'Please enter a valid port number';
          }
        },
        {
          type: 'number',
          name: 'maxConcurrentIssues',
          message: 'Maximum concurrent issues to process:',
          default: currentConfig.maxConcurrentIssues,
          validate: (input) => input > 0 ? true : 'Please enter a positive number'
        },
        {
          type: 'confirm',
          name: 'sparcEnabled',
          message: 'Enable SPARC methodology?',
          default: currentConfig.sparc.enabled
        },
        {
          type: 'confirm',
          name: 'swarmEnabled',
          message: 'Enable swarm coordination?',
          default: currentConfig.swarm.enabled
        },
        {
          type: 'checkbox',
          name: 'autoFixLabels',
          message: 'Select labels that trigger auto-fix:',
          choices: [
            { name: 'bug', checked: currentConfig.autoFixLabels.includes('bug') },
            { name: 'auto-fix', checked: currentConfig.autoFixLabels.includes('auto-fix') },
            { name: 'good first issue', checked: currentConfig.autoFixLabels.includes('good first issue') },
            { name: 'help wanted', checked: false },
            { name: 'easy fix', checked: false }
          ]
        },
        {
          type: 'input',
          name: 'repositories',
          message: 'Comma-separated list of repositories to monitor (owner/repo):',
          default: currentConfig.repositories.join(','),
          filter: (input) => input ? input.split(',').map(r => r.trim()).filter(r => r) : []
        }
      ]);
      
      await autoFixSystem.configure({
        enabled: answers.enabled,
        webhookPort: parseInt(answers.webhookPort),
        maxConcurrentIssues: answers.maxConcurrentIssues,
        sparc: answers.sparcEnabled,
        swarm: answers.swarmEnabled,
        autoFixLabels: answers.autoFixLabels,
        repositories: answers.repositories
      });
      
      printSuccess('✅ Configuration updated successfully!');
      
    } catch (error) {
      printError(`Configuration failed: ${error.message}`);
    }
  });

program
  .command('test-issue <owner> <repo> <issueNumber>')
  .description('Test the auto-fix system with a specific issue')
  .action(async (owner, repo, issueNumber) => {
    try {
      if (!autoFixSystem) {
        autoFixSystem = new GitHubIssueAutoFix();
        await autoFixSystem.initialize();
      }
      
      printInfo(`🧪 Testing auto-fix on issue ${owner}/${repo}#${issueNumber}...`);
      
      // Simulate webhook event for the issue
      const testEvent = {
        action: 'opened',
        issue: {
          number: parseInt(issueNumber),
          title: 'Test Issue for Auto-Fix',
          body: 'This is a test issue to verify the auto-fix system is working correctly.',
          labels: [{ name: 'bug' }, { name: 'auto-fix' }]
        },
        repository: {
          full_name: `${owner}/${repo}`,
          name: repo,
          owner: { login: owner }
        }
      };
      
      await autoFixSystem.handleIssueEvent(testEvent);
      printSuccess('✅ Test completed - check the issue for auto-fix comments');
      
    } catch (error) {
      printError(`Test failed: ${error.message}`);
    }
  });

program
  .command('webhook-setup <owner> <repo>')
  .description('Get instructions for setting up GitHub webhooks')
  .option('-u, --url <url>', 'Custom webhook URL')
  .action(async (owner, repo, options) => {
    const webhookUrl = options.url || `http://your-server.com:3001/github-webhook`;
    
    console.log('\n🔗 GitHub Webhook Setup Instructions');
    console.log('=' .repeat(50));
    console.log(`\n1. Go to: https://github.com/${owner}/${repo}/settings/hooks`);
    console.log('2. Click "Add webhook"');
    console.log(`3. Set Payload URL: ${webhookUrl}`);
    console.log('4. Set Content type: application/json');
    console.log('5. Set Secret: (optional but recommended)');
    console.log('6. Select events:');
    console.log('   ✅ Issues');
    console.log('   ✅ Issue comments');
    console.log('   ✅ Pushes (optional)');
    console.log('7. Ensure "Active" is checked');
    console.log('8. Click "Add webhook"');
    
    console.log('\n🔐 Environment Variables:');
    console.log('export GITHUB_TOKEN="your_github_token"');
    console.log('export GITHUB_WEBHOOK_SECRET="your_webhook_secret"  # Optional');
    
    console.log('\n🚀 Start the system:');
    console.log('claude-flow github-auto-fix start');
  });

program
  .command('logs')
  .description('View recent auto-fix logs')
  .option('-n, --lines <lines>', 'Number of log lines to show', '50')
  .action(async (options) => {
    // TODO: Implement logging system
    printInfo('📄 Auto-fix logs feature coming soon...');
    printInfo('For now, check the console output where the system is running.');
  });

// Parse command line arguments
program.parse();

// If no command provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
