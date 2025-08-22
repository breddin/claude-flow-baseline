# 📚 Claude Flow Documentation - Table of Contents

## 🏠 Main Documentation Hub

### 📖 **INDEX.md** - Welcome & Documentation Hub
- Central landing page for all Claude Flow documentation
- Version-specific welcome (v2.0.0-alpha.88)
- Quick start guides and installation instructions
- Navigation to all major documentation sections
- Feature overview with 54+ agents and 112 MCP tools

### 📘 **README.md** - Repository Overview & Getting Started
- Repository purpose and baseline information
- Rolling mirror repository explanation for tracking upstream changes
- GitHub token configuration and cross-repository operations
- Quick setup instructions for Codespaces/containers
- Essential first steps for new users

---

## 🚀 Core User Documentation

### 📗 **USER_GUIDE.md** - Comprehensive User Manual
- Complete practical guide for Claude-Flow v2.0.0
- Step-by-step tutorials and common workflows
- Configuration guide and troubleshooting
- Performance optimization and integrations
- FAQ and practical examples

### 🎯 **API_DOCUMENTATION.md** - Complete API Reference
- All 112 MCP tools documentation (87 Claude-Flow + 25 Ruv-Swarm)
- Command syntax and authentication
- WebSocket integration and error handling
- 54+ agent types reference
- Best practices and examples

### 🤖 **AGENTS.md** - Complete Agent Reference
- Comprehensive guide to all 65+ specialized AI agents
- Agent categories: Core Development, Swarm Coordination, GitHub Integration
- Specialized domains: Testing, Infrastructure, SPARC methodology
- Usage examples and agent capabilities
- Template and automation agents

---

## 🏗️ Technical Architecture

### 🔧 **ARCHITECTURE.md** - System Architecture Documentation
- Microservices architecture with event-driven communication
- High-level system diagrams and component relationships
- Data flow patterns and design principles
- Technology stack and deployment architecture
- Security, performance, and scalability design

### 🌐 **SWARM.md** - Swarm Intelligence Documentation
- Multi-topology swarm coordination (centralized, distributed, mesh, hierarchical)
- Byzantine fault tolerance and consensus mechanisms
- Distributed memory management and performance metrics
- Real-world use cases and best practices
- Command reference and configuration examples

### 🛠️ **MCP_TOOLS.md** - MCP Tools Reference
- Complete reference for all 112 MCP tools
- Claude-Flow tools (87) organized in 8 categories
- Ruv-Swarm integration tools (25) for advanced swarm intelligence
- Tool naming conventions and usage patterns
- Integration examples and best practices

---

## 🔬 Methodology & Development

### ⚡ **SPARC.md** - SPARC Methodology Documentation
- Specification → Pseudocode → Architecture → Refinement → Code methodology
- Systematic development approach and mode specialization
- 15+ specialized development modes with optimized execution environments
- Memory integration and parallel execution capabilities
- Quality assurance and validation steps

### 🛠️ **DEVELOPMENT_WORKFLOW.md** - Development Workflow Guide
- Development environment setup and project structure
- SPARC development and swarm development patterns
- Testing strategy and code standards
- CI/CD pipeline and contributing guidelines
- Release process and best practices

---

## 🚀 Deployment & Operations

### 🌍 **DEPLOYMENT.md** - Production Deployment Guide
- System requirements and environment variables
- Docker and Kubernetes deployment
- CI/CD pipeline configuration
- Monitoring, observability, and security configuration
- Cloud deployment and production troubleshooting

### 🔄 **ci-cd/README.md** - CI/CD Pipeline Documentation
- GitHub Actions workflows: Verification, Truth Scoring, Integration Tests
- Automated rollback manager and quality assurance
- Multi-platform testing and deployment automation
- Pipeline triggers and job configurations

---

## 🔒 Security & Verification

### 🛡️ **src/verification/README.md** - Security Enforcement System
- Enterprise-grade security framework for agent truth verification
- Multi-factor authentication and cryptographic protection
- Byzantine fault tolerance and attack detection
- Rate limiting, DDoS protection, and quarantine systems

### 📊 **src/verification/architecture.md** - Verification Architecture
- Truth enforcement architecture with 95%+ accuracy requirements
- Verification pipeline and truth scoring engine
- Evidence collection and checkpoint system
- State management with rollback capabilities

### ✅ **verification-integration.md** - Verification System Integration
- Pre-task and post-task verification processes
- Automatic rollback and integration with commands
- Git repository state validation
- Code compilation and testing verification

---

## 🧠 Advanced Features & AI

### 🔄 **oversight/RECURSIVE_LEARNING_IMPLEMENTATION.md** - Recursive Learning System
- Self-improving adaptive intelligence framework
- Multi-factor verification and ELO ranking system
- Performance tracking and automated improvement
- Recursive accountability and learning enhancement

### 🎯 **training-pipeline-demo.md** - Training Pipeline Documentation
- Real machine learning capabilities for agent performance improvement
- Training strategies: conservative, balanced, aggressive
- Performance profiles and success rate optimization
- Agent learning and adaptation over time

### 📈 **training-pipeline-real-only.md** - Real Training Pipeline
- Production training pipeline implementation
- Agent performance monitoring and optimization
- Learning algorithms and improvement metrics

---

## 📊 Monitoring & Analytics

### 📊 **token-tracking-guide.md** - Token Usage Tracking
- Comprehensive token usage monitoring and analytics
- Cost optimization and usage pattern analysis
- Real-time tracking and reporting
- Budget management and alerts

### 📈 **token-tracking-status.md** - Token Tracking Status
- Current implementation status of token tracking features
- Metrics collection and reporting capabilities
- Performance monitoring and optimization

### 📋 **pair-optimization.md** - Pair Programming Optimization
- Pair programming agent optimization and performance tuning
- Collaboration patterns and efficiency metrics
- Best practices for pair programming with AI agents

---

## 📖 Interactive Documentation

### 🌟 **wiki/stream-chain-command.md** - Stream Chain Command Guide
- Multi-agent workflow creation with seamless context preservation
- Foreground and background execution modes
- Custom stream chains and sequence management
- Advanced pipeline configurations

### 💾 **wiki/session-persistence.md** - Session Persistence
- Session state management and persistence
- Context preservation across sessions
- Memory and state restoration

### 🔧 **wiki/background-commands.md** - Background Commands
- Background process management and execution
- Long-running task coordination
- Resource management and monitoring

---

## 🏃‍♂️ Sprint & Project Management

### 📅 **sparc/** - SPARC Sprint Documentation
- **sprint-1-planning.md** - First sprint planning and objectives
- **sprint-2-kickoff.md** - Second sprint initialization and goals
- **sprint-3-planning.md** - Third sprint planning and roadmap
- **sprint-3-progress.md** - Sprint 3 progress tracking and updates
- **sprint-3-resume.md** - Sprint 3 resumption and continuation
- **epic-tracking.md** - Epic-level feature tracking and management
- **project-status.md** - Overall project status and health metrics
- **artifacts-pushed.md** - Delivered artifacts and milestones
- **sprint-handoff-template.md** - Template for sprint handoffs

### 📈 **sprint-3-summary.md** - Sprint 3 Summary
- Sprint 3 completion summary and achievements
- Key deliverables and metrics
- Lessons learned and next steps

### 🧪 **sprint-4-testing-guide.md** - Sprint 4 Testing Guide
- Testing methodologies and validation approaches
- Quality assurance and testing automation
- Performance and integration testing

---

## 🔧 Integration & Setup

### 🔗 **BALLERINA_MCP_PROJECT_INSTRUCTIONS.md** - Ballerina MCP Integration
- Ballerina MCP server integration instructions
- Setup and configuration for Ballerina language support
- MCP protocol implementation for Ballerina development

### 🐳 **CONTAINER_STARTUP.md** - Container Configuration
- Container startup procedures and configuration
- Docker and containerized environment setup
- Development environment containerization

### 🔑 **CODESPACE_TOKEN_SETUP.md** - Codespace Token Configuration
- GitHub Codespaces token setup and configuration
- Environment variable management in cloud development
- Secure token handling and authentication

### 🔧 **GITHUB_PROJECT_CONFIGURATION.md** - GitHub Project Setup
- GitHub project configuration and management
- Repository setup and integration workflows
- Project automation and issue tracking

### 🔐 **GITHUB_TOKEN_SETUP.md** - GitHub Token Configuration
- Comprehensive GitHub token setup and management
- Cross-repository access and authentication
- Token scoping and security best practices

---

## 📚 Legacy & Archives

### 📋 **final-validation-summary.md** - Final Validation Report
- System validation and testing completion summary
- Quality assurance verification and sign-off
- Production readiness assessment

### 🗄️ **language-server-implementation.md** - Language Server Implementation
- Language server protocol implementation details
- IDE integration and development tool support
- Language support and features

---

## 📄 Root Documentation Files

### ⚡ **QUICK_START.md** - Quick Start Guide
- Rapid onboarding and immediate setup
- Essential commands and first steps
- Fast track to productivity

### 🤖 **CLAUDE.md** - Claude Integration Documentation
- Claude AI model integration and configuration
- Model-specific setup and optimization
- Claude-specific features and capabilities

### 🔧 **COMMAND_CONSISTENCY_FIX.md** - Command Consistency
- Command interface standardization and fixes
- CLI consistency improvements and updates
- User experience enhancements

### ✅ **TEST_SUITE_FIX_SUMMARY.md** - Test Suite Fix Summary
- Test suite improvements and bug fixes
- Testing framework updates and enhancements
- Quality assurance improvements

### 🔗 **GITHUB_TOKEN_MAPPING_COMPARISON.md** - Token Mapping Analysis
- GitHub token mapping system comparison and analysis
- Cross-repository authentication strategies
- Security and access pattern analysis

### 📋 **IMPLEMENTATION_COMPLETE.md** - Implementation Status
- Feature implementation completion tracking
- Development milestone achievements
- System readiness and deployment status

### 📦 **ARTIFACT_INVENTORY.md** - Artifact Inventory
- Complete inventory of system artifacts and deliverables
- Asset tracking and version management
- Deliverable documentation and organization

---

## 📊 Summary Statistics

- **Total Documentation Files**: 50+ comprehensive documents
- **Coverage Areas**: 8 major categories (User Guides, Architecture, Security, Development, Deployment, AI/ML, Monitoring, Integration)
- **Specialization Levels**: From beginner quick-starts to advanced system architecture
- **Integration Points**: Full CI/CD, GitHub, Docker, Kubernetes, MCP Protocol
- **AI Features**: 65+ agents, 112 MCP tools, swarm intelligence, verification systems
- **Development Methodologies**: SPARC, Agile sprints, TDD, pair programming
- **Security**: Enterprise-grade verification, Byzantine fault tolerance, cryptographic protection

This documentation ecosystem provides comprehensive coverage for all aspects of Claude Flow, from initial setup to advanced enterprise deployment and AI system management.
