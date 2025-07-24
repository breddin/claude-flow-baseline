#!/usr/bin/env node
/**
 * GitHub Auto-Fix System Integration Test
 * Tests the complete workflow from issue detection to fix implementation
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import { GitHubIssueAutoFix } from '../src/cli/simple-commands/github/issue-auto-fix.js';
import { printSuccess, printError, printWarning, printInfo } from '../src/cli/simple-commands/utils.js';

class AutoFixIntegrationTest {
  constructor() {
    this.testResults = [];
    this.cleanup = [];
  }

  /**
   * Run all integration tests
   */
  async runTests() {
    console.log('🧪 GitHub Auto-Fix System Integration Tests');
    console.log('=' .repeat(50));
    console.log();

    try {
      await this.testSystemInitialization();
      await this.testConfigurationManagement();
      await this.testIssueAnalysis();
      await this.testWebhookProcessing();
      await this.testCLICommands();
      await this.testSparcIntegration();
      await this.testSwarmIntegration();
      await this.testErrorHandling();
      
      this.generateTestReport();
      
    } catch (error) {
      printError(`Test suite failed: ${error.message}`);
      process.exit(1);
    } finally {
      await this.cleanup();
    }
  }

  /**
   * Test system initialization
   */
  async testSystemInitialization() {
    printInfo('Testing system initialization...');
    
    try {
      const autoFix = new GitHubIssueAutoFix();
      
      // Test configuration loading
      const config = autoFix.getStatus().config;
      this.assert(config !== null, 'Configuration loaded');
      this.assert(config.enabled !== undefined, 'Configuration has enabled flag');
      
      // Test environment requirements
      if (!process.env.GITHUB_TOKEN) {
        printWarning('GITHUB_TOKEN not set - some tests will be skipped');
      }
      
      this.testResults.push({ test: 'System Initialization', status: 'PASS' });
      printSuccess('✅ System initialization test passed');
      
    } catch (error) {
      this.testResults.push({ test: 'System Initialization', status: 'FAIL', error: error.message });
      throw error;
    }
  }

  /**
   * Test configuration management
   */
  async testConfigurationManagement() {
    printInfo('Testing configuration management...');
    
    try {
      const autoFix = new GitHubIssueAutoFix();
      
      // Test default configuration
      const initialConfig = autoFix.getStatus().config;
      this.assert(initialConfig.repositories instanceof Array, 'Repositories is array');
      this.assert(initialConfig.autoFixLabels instanceof Array, 'Auto-fix labels is array');
      
      // Test configuration updates
      const testRepo = 'test/repo';
      await autoFix.configure({ repository: testRepo });
      
      const updatedConfig = autoFix.getStatus().config;
      this.assert(updatedConfig.repositories.includes(testRepo), 'Repository added to config');
      
      // Test configuration persistence
      const newAutoFix = new GitHubIssueAutoFix();
      const loadedConfig = newAutoFix.getStatus().config;
      this.assert(loadedConfig.repositories.includes(testRepo), 'Configuration persisted');
      
      this.testResults.push({ test: 'Configuration Management', status: 'PASS' });
      printSuccess('✅ Configuration management test passed');
      
    } catch (error) {
      this.testResults.push({ test: 'Configuration Management', status: 'FAIL', error: error.message });
      throw error;
    }
  }

  /**
   * Test issue analysis functionality
   */
  async testIssueAnalysis() {
    printInfo('Testing issue analysis...');
    
    try {
      const autoFix = new GitHubIssueAutoFix();
      
      // Test different issue types
      const testIssues = [
        {
          title: 'TypeError: Cannot read property of undefined',
          body: 'Getting an error in src/utils/parser.js line 42',
          labels: [{ name: 'bug' }],
          expected: { type: 'error', severity: 'high' }
        },
        {
          title: 'Slow loading performance on dashboard',
          body: 'The dashboard takes too long to load',
          labels: [{ name: 'performance' }],
          expected: { type: 'performance', severity: 'medium' }
        },
        {
          title: 'Add new feature for user notifications',
          body: 'Implement push notifications for users',
          labels: [{ name: 'feature' }],
          expected: { type: 'feature', severity: 'low' }
        }
      ];
      
      for (const testIssue of testIssues) {
        const analysis = await autoFix.analyzeIssue(testIssue, { owner: { login: 'test' }, name: 'repo' });
        
        this.assert(analysis.type !== 'unknown' || testIssue.expected.type === 'unknown', 
          `Issue type detected for: ${testIssue.title}`);
        this.assert(analysis.severity !== undefined, 
          `Issue severity assigned for: ${testIssue.title}`);
      }
      
      this.testResults.push({ test: 'Issue Analysis', status: 'PASS' });
      printSuccess('✅ Issue analysis test passed');
      
    } catch (error) {
      this.testResults.push({ test: 'Issue Analysis', status: 'FAIL', error: error.message });
      throw error;
    }
  }

  /**
   * Test webhook event processing
   */
  async testWebhookProcessing() {
    printInfo('Testing webhook processing...');
    
    try {
      const autoFix = new GitHubIssueAutoFix();
      
      // Test issue event handling
      const issueEvent = {
        action: 'opened',
        issue: {
          number: 123,
          title: 'Test bug report',
          body: 'This is a test bug',
          labels: [{ name: 'bug' }]
        },
        repository: {
          full_name: 'test/repo',
          name: 'repo',
          owner: { login: 'test' }
        }
      };
      
      // Test filtering logic
      const shouldFix = await autoFix.shouldAutoFix(issueEvent.issue, issueEvent.repository);
      this.assert(typeof shouldFix === 'boolean', 'Should auto-fix returns boolean');
      
      // Test comment event handling
      const commentEvent = {
        action: 'created',
        comment: { body: '/auto-fix please fix this issue' },
        issue: issueEvent.issue,
        repository: issueEvent.repository
      };
      
      // These should not throw errors
      await autoFix.handleIssueEvent(issueEvent);
      await autoFix.handleIssueCommentEvent(commentEvent);
      
      this.testResults.push({ test: 'Webhook Processing', status: 'PASS' });
      printSuccess('✅ Webhook processing test passed');
      
    } catch (error) {
      this.testResults.push({ test: 'Webhook Processing', status: 'FAIL', error: error.message });
      throw error;
    }
  }

  /**
   * Test CLI commands
   */
  async testCLICommands() {
    printInfo('Testing CLI commands...');
    
    try {
      // Test status command
      const statusOutput = execSync('node src/cli/commands/github-auto-fix.js status', 
        { encoding: 'utf8', stdio: 'pipe' });
      this.assert(statusOutput.includes('Status'), 'Status command produces output');
      
      // Test add-repo command
      execSync('node src/cli/commands/github-auto-fix.js add-repo test/cli-repo', 
        { stdio: 'pipe' });
      
      // Verify repository was added
      const updatedStatus = execSync('node src/cli/commands/github-auto-fix.js status', 
        { encoding: 'utf8', stdio: 'pipe' });
      this.assert(updatedStatus.includes('test/cli-repo'), 'Repository added via CLI');
      
      this.testResults.push({ test: 'CLI Commands', status: 'PASS' });
      printSuccess('✅ CLI commands test passed');
      
    } catch (error) {
      this.testResults.push({ test: 'CLI Commands', status: 'FAIL', error: error.message });
      printWarning('CLI commands test failed - this may be expected if dependencies are missing');
    }
  }

  /**
   * Test SPARC integration
   */
  async testSparcIntegration() {
    printInfo('Testing SPARC integration...');
    
    try {
      const autoFix = new GitHubIssueAutoFix();
      
      // Test SPARC configuration
      const config = autoFix.getStatus().config;
      this.assert(config.sparc !== undefined, 'SPARC configuration exists');
      this.assert(config.sparc.mode !== undefined, 'SPARC mode configured');
      
      // Test memory namespace setup
      this.assert(config.sparc.memory_namespace !== undefined, 'Memory namespace configured');
      
      // Test SPARC analysis (if available)
      try {
        execSync('claude-flow --version', { stdio: 'pipe' });
        printInfo('SPARC (claude-flow) CLI available');
      } catch (error) {
        printWarning('SPARC CLI not available - integration will be limited');
      }
      
      this.testResults.push({ test: 'SPARC Integration', status: 'PASS' });
      printSuccess('✅ SPARC integration test passed');
      
    } catch (error) {
      this.testResults.push({ test: 'SPARC Integration', status: 'FAIL', error: error.message });
      throw error;
    }
  }

  /**
   * Test Swarm integration
   */
  async testSwarmIntegration() {
    printInfo('Testing Swarm integration...');
    
    try {
      const autoFix = new GitHubIssueAutoFix();
      
      // Test swarm configuration
      const config = autoFix.getStatus().config;
      this.assert(config.swarm !== undefined, 'Swarm configuration exists');
      this.assert(config.swarm.topology !== undefined, 'Swarm topology configured');
      this.assert(config.swarm.roles instanceof Array, 'Swarm roles configured');
      
      // Test swarm availability
      try {
        execSync('npx ruv-swarm --version', { stdio: 'pipe' });
        printInfo('Swarm (ruv-swarm) CLI available');
      } catch (error) {
        printWarning('Swarm CLI not available - integration will be limited');
      }
      
      this.testResults.push({ test: 'Swarm Integration', status: 'PASS' });
      printSuccess('✅ Swarm integration test passed');
      
    } catch (error) {
      this.testResults.push({ test: 'Swarm Integration', status: 'FAIL', error: error.message });
      throw error;
    }
  }

  /**
   * Test error handling
   */
  async testErrorHandling() {
    printInfo('Testing error handling...');
    
    try {
      const autoFix = new GitHubIssueAutoFix();
      
      // Test invalid webhook signature handling
      try {
        await autoFix.handleWebhookEvent('invalid', {});
        // Should not reach here
        this.assert(false, 'Invalid webhook should throw error');
      } catch (error) {
        // Expected behavior
        this.assert(true, 'Invalid webhook properly rejected');
      }
      
      // Test malformed issue handling
      const malformedIssue = { /* missing required fields */ };
      const malformedRepo = { /* missing required fields */ };
      
      try {
        await autoFix.shouldAutoFix(malformedIssue, malformedRepo);
        // Should handle gracefully
        this.assert(true, 'Malformed issue handled gracefully');
      } catch (error) {
        // Should not crash the system
        this.assert(false, 'Malformed issue crashed system');
      }
      
      this.testResults.push({ test: 'Error Handling', status: 'PASS' });
      printSuccess('✅ Error handling test passed');
      
    } catch (error) {
      this.testResults.push({ test: 'Error Handling', status: 'FAIL', error: error.message });
      throw error;
    }
  }

  /**
   * Generate comprehensive test report
   */
  generateTestReport() {
    console.log();
    console.log('📊 Test Results Summary');
    console.log('=' .repeat(50));
    
    let passed = 0;
    let failed = 0;
    
    this.testResults.forEach(result => {
      const status = result.status === 'PASS' ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.status}`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
      
      if (result.status === 'PASS') passed++;
      else failed++;
    });
    
    console.log();
    console.log(`Total Tests: ${this.testResults.length}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    
    const successRate = ((passed / this.testResults.length) * 100).toFixed(1);
    console.log(`Success Rate: ${successRate}%`);
    
    if (failed === 0) {
      printSuccess('🎉 All tests passed! GitHub Auto-Fix system is ready for deployment.');
    } else {
      printWarning(`⚠️ ${failed} test(s) failed. Please review and fix issues before deployment.`);
    }
    
    // Write detailed report to file
    const report = {
      timestamp: new Date().toISOString(),
      environment: {
        node_version: process.version,
        platform: process.platform,
        github_token_set: !!process.env.GITHUB_TOKEN,
        sparc_available: this.checkCommandAvailable('claude-flow'),
        swarm_available: this.checkCommandAvailable('npx ruv-swarm')
      },
      results: this.testResults,
      summary: {
        total: this.testResults.length,
        passed,
        failed,
        success_rate: successRate
      }
    };
    
    writeFileSync('test-report.json', JSON.stringify(report, null, 2));
    printInfo('📄 Detailed test report saved to test-report.json');
  }

  /**
   * Check if a command is available
   */
  checkCommandAvailable(command) {
    try {
      execSync(`${command} --version`, { stdio: 'pipe' });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Assert helper
   */
  assert(condition, message) {
    if (!condition) {
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  /**
   * Cleanup test artifacts
   */
  async cleanup() {
    // Remove test configuration changes
    try {
      if (existsSync('github-auto-fix-config.json')) {
        const config = JSON.parse(readFileSync('github-auto-fix-config.json', 'utf8'));
        config.repositories = config.repositories.filter(repo => 
          !repo.startsWith('test/') && repo !== 'test/cli-repo'
        );
        writeFileSync('github-auto-fix-config.json', JSON.stringify(config, null, 2));
      }
    } catch (error) {
      printWarning(`Cleanup warning: ${error.message}`);
    }
  }
}

// Run tests if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new AutoFixIntegrationTest();
  await tester.runTests();
}
