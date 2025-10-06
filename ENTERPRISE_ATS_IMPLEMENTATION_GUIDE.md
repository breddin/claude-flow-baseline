# 🏢 Enterprise ATS Implementation with Claude Flow: Complete Guide

## 📋 Project Overview

**Objective**: Create a comprehensive Applicant Tracking System (ATS) modeled after SmartRecruiters, featuring:
- Multi-tenant recruitment workflow management with Amazon RDS PostgreSQL database
- Ballerina-powered backend-for-frontend services
- Advanced candidate assessment and scoring algorithms
- Integration with job boards and social networks  
- Real-time analytics and reporting dashboard
- Mobile-responsive React frontend
- Microservices architecture with REST APIs
- Enterprise-grade security and compliance

## 🛠️ Technology Stack

### Core Technologies
- **Database**: Amazon RDS PostgreSQL 15+ with Multi-AZ deployment and automated backups
- **Backend-for-Frontend**: Ballerina programming language for API orchestration
- **Frontend**: React 18+ with TypeScript and responsive design
- **Microservices**: Node.js/Express for core business logic
- **Message Queue**: Amazon MSK (Managed Streaming for Apache Kafka) for event-driven architecture
- **Caching**: Amazon ElastiCache Redis for session management and performance optimization
- **Search**: Amazon OpenSearch for candidate and job search capabilities

### Development & Deployment
- **Orchestration**: Claude Flow with SPARC methodology
- **Testing**: Jest, Cypress, and custom Ballerina test frameworks
- **CI/CD**: GitHub Actions with comprehensive TDD gates
- **Infrastructure**: Kubernetes on AWS with auto-scaling
- **Monitoring**: Prometheus, Grafana, and distributed tracing

---

## 💰 Cost Analysis & Scaling Projections

### Monthly Cost Breakdown by Company Size

This section provides detailed cost projections for running the enterprise ATS system on AWS using managed services (RDS PostgreSQL, Amazon MSK, EKS) across three different scale scenarios.

#### 🏢 **Small Company: 100 Applicants/Month**

**Infrastructure Requirements:**
- ~500 job postings/year
- 100 applications/month (1,200/year)
- 5-10 active recruiters
- Basic reporting and analytics

| **Service** | **Configuration** | **Monthly Cost** | **Annual Cost** |
|-------------|------------------|------------------|-----------------|
| **Amazon RDS PostgreSQL** | db.t3.medium (2 vCPU, 4GB RAM)<br/>100GB storage, Multi-AZ | $180 | $2,160 |
| **Amazon MSK** | kafka.t3.small (2 brokers)<br/>100GB storage per broker | $240 | $2,880 |
| **Amazon EKS** | 1 cluster + 2 m5.large nodes<br/>(2 vCPU, 8GB RAM each) | $320 | $3,840 |
| **Application Load Balancer** | Standard ALB with SSL termination | $25 | $300 |
| **Amazon ElastiCache** | cache.t3.micro Redis instance | $15 | $180 |
| **Amazon OpenSearch** | t3.small.search (1 node) | $45 | $540 |
| **S3 Storage** | Resume storage, backups<br/>~50GB with infrequent access | $8 | $96 |
| **CloudWatch & Monitoring** | Logs, metrics, alarms | $25 | $300 |
| **Data Transfer** | Outbound data transfer | $10 | $120 |
| **Secrets Manager** | Database credentials, API keys | $5 | $60 |
| **Route 53** | DNS hosting and health checks | $5 | $60 |
| **Certificate Manager** | SSL certificates (free) | $0 | $0 |
| **NAT Gateway** | Outbound internet access | $45 | $540 |
| ****TOTAL MONTHLY**** | | **$923** | **$11,076** |

---

#### 🏭 **Medium Company: 1,000 Applicants/Month**

**Infrastructure Requirements:**
- ~2,000 job postings/year
- 1,000 applications/month (12,000/year)
- 25-50 active recruiters
- Advanced analytics and reporting
- Integration with multiple job boards

| **Service** | **Configuration** | **Monthly Cost** | **Annual Cost** |
|-------------|------------------|------------------|-----------------|
| **Amazon RDS PostgreSQL** | db.r5.xlarge (4 vCPU, 32GB RAM)<br/>500GB storage, Multi-AZ<br/>2 read replicas | $1,250 | $15,000 |
| **Amazon MSK** | kafka.m5.large (3 brokers)<br/>500GB storage per broker<br/>Enhanced monitoring | $580 | $6,960 |
| **Amazon EKS** | 1 cluster + 4 m5.xlarge nodes<br/>(4 vCPU, 16GB RAM each)<br/>Auto-scaling group | $920 | $11,040 |
| **Application Load Balancer** | ALB with advanced routing<br/>WebSockets support | $35 | $420 |
| **Amazon ElastiCache** | cache.r5.large Redis cluster<br/>Multi-AZ with failover | $185 | $2,220 |
| **Amazon OpenSearch** | r5.large.search (3 nodes)<br/>Dedicated master nodes | $420 | $5,040 |
| **S3 Storage** | Resume storage, backups, analytics<br/>~500GB with lifecycle policies | $35 | $420 |
| **CloudWatch & Monitoring** | Enhanced monitoring, custom metrics<br/>Log retention, dashboards | $85 | $1,020 |
| **Data Transfer** | Increased outbound transfer<br/>CDN for file delivery | $55 | $660 |
| **Secrets Manager** | Multiple environment credentials | $15 | $180 |
| **Route 53** | DNS with geo-routing | $8 | $96 |
| **AWS Lambda** | Background processing, webhooks<br/>~1M invocations/month | $25 | $300 |
| **Amazon SES** | Email notifications<br/>~50,000 emails/month | $15 | $180 |
| **NAT Gateway** | High availability (2 AZs) | $90 | $1,080 |
| **Amazon Kinesis** | Real-time analytics pipeline | $65 | $780 |
| ****TOTAL MONTHLY**** | | **$3,783** | **$45,396** |

---

#### 🏗️ **Enterprise: 10,000 Applicants/Month**

**Infrastructure Requirements:**
- ~10,000 job postings/year
- 10,000 applications/month (120,000/year)
- 100+ active recruiters
- Enterprise analytics and ML insights
- Advanced integrations and API usage
- Global deployment considerations

| **Service** | **Configuration** | **Monthly Cost** | **Annual Cost** |
|-------------|------------------|------------------|-----------------|
| **Amazon RDS PostgreSQL** | db.r5.4xlarge (16 vCPU, 128GB RAM)<br/>2TB storage, Multi-AZ<br/>5 read replicas across regions | $4,250 | $51,000 |
| **Amazon MSK** | kafka.m5.2xlarge (6 brokers)<br/>2TB storage per broker<br/>Multi-AZ, enhanced monitoring | $1,890 | $22,680 |
| **Amazon EKS** | 2 clusters (prod + staging)<br/>12 m5.2xlarge nodes<br/>(8 vCPU, 32GB RAM each)<br/>Auto-scaling + spot instances | $3,450 | $41,400 |
| **Application Load Balancer** | Multiple ALBs with WAF<br/>Advanced security rules | $125 | $1,500 |
| **Amazon ElastiCache** | cache.r5.2xlarge Redis cluster<br/>Multi-region replication<br/>6 nodes with sharding | $1,120 | $13,440 |
| **Amazon OpenSearch** | r5.2xlarge.search (9 nodes)<br/>Dedicated master, cross-AZ<br/>ML insights and analytics | $2,850 | $34,200 |
| **S3 Storage** | Multi-tier storage strategy<br/>~5TB with intelligent tiering<br/>Cross-region replication | $285 | $3,420 |
| **CloudWatch & Monitoring** | Enterprise monitoring suite<br/>Custom metrics, extensive logging<br/>Long-term retention | $320 | $3,840 |
| **Data Transfer** | Global CDN with CloudFront<br/>High outbound transfer | $485 | $5,820 |
| **Secrets Manager** | Enterprise secret management<br/>Multiple regions | $45 | $540 |
| **Route 53** | Global DNS with health checks<br/>Geo-routing and failover | $25 | $300 |
| **AWS Lambda** | Extensive serverless processing<br/>~10M invocations/month | $185 | $2,220 |
| **Amazon SES** | High-volume email service<br/>~500,000 emails/month | $85 | $1,020 |
| **NAT Gateway** | Multi-region high availability | $180 | $2,160 |
| **Amazon Kinesis** | Real-time analytics at scale<br/>Data Firehose + Analytics | $420 | $5,040 |
| **Amazon SageMaker** | ML model training and inference<br/>Candidate scoring algorithms | $850 | $10,200 |
| **AWS WAF** | Web application firewall<br/>DDoS protection | $65 | $780 |
| **Amazon API Gateway** | API management and throttling<br/>~1M API calls/month | $35 | $420 |
| **Amazon EventBridge** | Enterprise event routing<br/>Cross-service orchestration | $25 | $300 |
| **AWS Config** | Compliance and governance<br/>Resource monitoring | $45 | $540 |
| **Amazon GuardDuty** | Threat detection and security<br/>Multi-account monitoring | $125 | $1,500 |
| ****TOTAL MONTHLY***** | | **$16,865** | **$202,380** |

---

### 📊 **Cost Scaling Analysis**

#### **Cost Per Applicant Trends:**

| **Company Size** | **Monthly Applicants** | **Total Monthly Cost** | **Cost Per Applicant** |
|------------------|------------------------|------------------------|-------------------------|
| Small | 100 | $923 | $9.23 |
| Medium | 1,000 | $3,783 | $3.78 |
| Enterprise | 10,000 | $16,865 | $1.69 |

#### **Cost Optimization Strategies:**

**Small Company (100 applicants/month):**
- Use t3 instance types for cost efficiency
- Single-AZ deployments where high availability isn't critical
- Scheduled scaling during off-hours
- Reserved instances for 1-year commitment: **~20% savings**

**Medium Company (1,000 applicants/month):**
- Mix of on-demand and reserved instances
- Implement auto-scaling policies
- Use spot instances for non-critical workloads
- 3-year reserved instances: **~35% savings**

**Enterprise (10,000 applicants/month):**
- Enterprise Discount Program (EDP) negotiations
- Savings Plans for compute workloads
- Advanced cost optimization with AWS Cost Explorer
- Potential savings with volume discounts: **~40-50% savings**

#### **Additional Considerations:**

**Development & Testing Environments:**
- Add 30-50% of production costs for staging/dev environments
- Use smaller instance types and single-AZ deployments

**Support & Professional Services:**
- AWS Business Support: 10% of monthly AWS spend (min $100)
- AWS Enterprise Support: 10% of monthly AWS spend (min $15,000)
- Professional services for initial setup: $50,000-$200,000 one-time

**Disaster Recovery:**
- Cross-region backup strategy: Add 25-40% to storage costs
- Multi-region active-active: Double infrastructure costs

---

## 🎯 Phase 1: Project Initialization & Specification Capture

### Step 1.1: Initialize Claude Flow Project

```bash
# Create project directory and initialize Claude Flow
mkdir enterprise-ats-system
cd enterprise-ats-system

# Initialize Claude Flow with enterprise configuration
npx claude-flow@alpha init --template enterprise --tdd-enabled --database rds-postgresql --bff-language ballerina --message-queue msk

# Set up GitHub integration for artifact tracking
git init
git remote add origin https://github.com/your-org/enterprise-ats-system.git

# Configure hooks for TDD enforcement with Ballerina support
npx claude-flow config set hooks.pre-commit "run-tests-mandatory"
npx claude-flow config set hooks.post-commit "generate-coverage-report"
npx claude-flow config set hooks.ballerina-validation "true"
npx claude-flow config set database.type "rds-postgresql"
npx claude-flow config set database.version "15.4"
npx claude-flow config set database.provider "aws-rds"
npx claude-flow config set message-queue.type "msk"
npx claude-flow config set message-queue.version "2.8.1"
npx claude-flow config set message-queue.provider "aws-msk"
```

### Step 1.2: SPARC Specification Phase

```bash
# Generate comprehensive specifications using SPARC methodology (CORRECTED)
npx claude-flow sparc spec-pseudocode \
  "Create enterprise ATS system specifications:
   - Multi-tenant architecture with Amazon RDS PostgreSQL database design  
   - Ballerina backend-for-frontend services for API orchestration
   - Complete recruitment workflow (job posting → hiring)
   - Advanced candidate assessment and scoring algorithms
   - Integration APIs for job boards (Indeed, LinkedIn, Glassdoor)
   - Real-time analytics with RDS PostgreSQL materialized views and read replicas
   - Mobile-responsive React frontend with TypeScript
   - Microservices backend architecture
   - SmartRecruiters feature parity analysis
   - GDPR compliance with RDS encryption and automated backups
   - Performance requirements (10k+ concurrent users with RDS scaling)
   - Ballerina service mesh for inter-service communication
   - AWS RDS Multi-AZ deployment for high availability"
```

This creates:
- **requirements-specification.md**: Detailed functional requirements with Amazon RDS PostgreSQL considerations
- **technical-requirements.md**: Non-functional requirements including Ballerina performance specs and RDS scaling
- **user-stories.md**: Complete user journey mapping
- **database-design.md**: RDS PostgreSQL-specific data modeling and optimization strategies
- **ballerina-architecture.md**: Backend-for-frontend service design patterns with RDS connectivity
- **compliance-requirements.md**: GDPR, security, accessibility standards with RDS security features
- **aws-infrastructure.md**: RDS deployment architecture, MSK cluster configuration, VPC setup, and security groups

### Step 1.3: GitHub Project Setup for Artifact Tracking

```bash
# Create GitHub project board with automation
gh project create \
  --owner "@me" \
  --title "Enterprise ATS Development"

# Set up issue templates and project tracking
mkdir .github/issue_templates
cat > .github/issue_templates/feature.md << 'EOF'
---
name: Feature Request
about: New feature for ATS system
title: '[FEATURE] '
labels: ['feature', 'tdd-required', 'rds-postgresql', 'ballerina']
---

## Feature Description
<!-- Detailed description -->

## Technology Requirements
- [ ] Amazon RDS PostgreSQL schema changes documented
- [ ] Ballerina service definitions created with RDS connectivity
- [ ] React component specifications defined

## Acceptance Criteria
- [ ] Tests written before implementation (Jest + Ballerina test framework)
- [ ] All tests passing including RDS PostgreSQL integration tests
- [ ] Code coverage ≥ 90% (including Ballerina services)
- [ ] Documentation updated (API docs, RDS schema, connection management)
- [ ] RDS PostgreSQL performance impact assessed
- [ ] Ballerina service contracts validated with RDS connectivity
- [ ] AWS RDS security groups and IAM roles configured

## SPARC Checklist
- [ ] Specification documented
- [ ] Pseudocode created (including SQL queries & Ballerina logic)
- [ ] Architecture reviewed (RDS PostgreSQL & Ballerina integration)
- [ ] Refinement completed
- [ ] Code implemented
EOF

# Configure GitHub Actions for TDD enforcement with Ballerina support
mkdir -p .github/workflows
cat > .github/workflows/tdd-enforcement.yml << 'EOF'
name: TDD Enforcement Pipeline
on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  postgresql-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15.4
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: ats_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v3
      - name: Run RDS PostgreSQL Integration Tests
        run: |
          npm run test:database
          npm run test:migrations
          
  ballerina-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Ballerina
        uses: ballerina-platform/setup-ballerina@v1.1.0
        with:
          version: 2201.8.0
      - name: Run Ballerina Tests
        run: |
          cd backend-for-frontend
          bal test --coverage
          bal test --integration
          
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run React Tests
        run: |
          npm install
          npm run test:unit
          npm run test:integration
          npm run test:e2e
EOF
```

---

## 🏗️ Phase 2: System Architecture & Design

### Step 2.1: Amazon RDS PostgreSQL Database Architecture Design

Use Claude Flow swarm mode to design the database architecture with specialized agents:

```bash
# PostgreSQL database architecture design with swarm coordination
claudeflow swarm "Design comprehensive PostgreSQL database architecture for enterprise ATS system:
  - Multi-tenant architecture with row-level security and tenant isolation
  - Optimized indexing strategy for recruitment workflows and search operations
  - Partitioning strategy for large candidate and application datasets
  - JSONB columns for flexible candidate profiles and dynamic form data
  - Full-text search capabilities for resumes and job descriptions
  - Audit trails and change tracking for compliance (GDPR, SOC2)
  - Database security architecture with encryption at rest and in transit
  - Performance optimization with materialized views for analytics
  - Migration strategy and version control for schema changes
  Output: Complete schema.sql, migration scripts, security policies, and performance benchmarks" \
  --strategy development \
  --max-agents 5 \
  --parallel \
  --output ./database/
```

### Step 2.2: Ballerina Backend-for-Frontend Architecture

```bash
# Ballerina BFF services architecture design with swarm coordination
claudeflow swarm "Design Ballerina backend-for-frontend services for enterprise ATS:
  - Mobile-optimized API endpoints with response transformation
  - Web dashboard API orchestration and aggregation
  - Real-time notification handling via WebSockets
  - File upload and resume processing services
  - Authentication and authorization middleware with JWT
  - Rate limiting and caching strategies (Redis integration)
  - Circuit breaker patterns for external API resilience
  - API contracts and OpenAPI specifications
  - Service mesh integration for inter-service communication
  Output: Ballerina service definitions, API contracts, middleware implementations, and integration tests" \
  --strategy development \
  --max-agents 5 \
  --parallel \
  --output ./backend-for-frontend/
```

### Step 2.3: Complete System Architecture & Integration Patterns

```bash
# Use stream-chain for sequential architecture design with context preservation
claudeflow stream-chain run \
  "Analyze enterprise ATS system requirements: SmartRecruiters feature parity, scalability for 10k+ users, GDPR compliance" \
  "Design microservices architecture: user-service, job-service, candidate-service, assessment-service with PostgreSQL and Ballerina BFF" \
  "Create integration patterns: job board APIs (Indeed, LinkedIn), email notifications (Amazon SES), event streaming (Amazon MSK)" \
  "Define deployment architecture: Kubernetes on AWS EKS, Auto-scaling strategies, Multi-AZ RDS PostgreSQL, MSK cluster configuration" \
  "Document security architecture: IAM roles, security groups, encryption strategies, compliance requirements" \
  --output ./architecture/
```

### Step 2.4: SPARC Specification & Pseudocode Generation

```bash
# Generate comprehensive SPARC specifications and pseudocode for all core services
claudeflow sparc spec-pseudocode \
  "Create detailed SPARC specifications and pseudocode for enterprise ATS core services:
   
   USER MANAGEMENT SERVICE:
   - PostgreSQL schema: users, roles, permissions, tenant_memberships with row-level security
   - Ballerina auth service: JWT token generation, refresh tokens, session management
   - Multi-factor authentication flow with email/SMS verification
   
   JOB MANAGEMENT SERVICE:
   - PostgreSQL schema: jobs, job_workflow_states, job_applications, hiring_stages
   - Ballerina orchestration: Job posting workflow, status transitions, approvals
   - Integration with job boards via Ballerina connectors
   
   CANDIDATE MANAGEMENT SERVICE:
   - PostgreSQL schema: candidates, resumes (JSONB), skills, experience, education
   - Ballerina search APIs: Full-text search, faceted filtering, ranking algorithms
   - Resume parsing and profile enrichment
   
   ASSESSMENT ENGINE SERVICE:
   - PostgreSQL schema: assessments, scoring_criteria, candidate_scores, ml_models
   - Ballerina ML service integration: Skills matching, cultural fit scoring
   - Bias detection and explainable AI recommendations
   
   INTEGRATION SERVICE:
   - Ballerina connectors: Indeed, LinkedIn, Glassdoor APIs with OAuth2
   - Webhook handlers for application synchronization
   - Rate limiting and retry strategies with exponential backoff
   
   ANALYTICS SERVICE:
   - PostgreSQL materialized views: time-to-hire, conversion rates, recruiter performance
   - Ballerina reporting APIs: Real-time dashboards, export capabilities
   - Scheduled refresh jobs for analytics data
   
   NOTIFICATION SERVICE:
   - Ballerina event-driven messaging with Amazon MSK
   - Email templates and Amazon SES integration
   - SMS notifications and push notifications
   
   Output: Complete SPARC specifications, pseudocode for each service, API contracts, and test scenarios" \
  --output ./specifications/
```

---

## 🧪 Phase 3: Test-Driven Development Setup

### Step 3.1: Multi-Technology TDD Infrastructure

```bash
# Set up comprehensive testing infrastructure for RDS PostgreSQL, MSK, and Ballerina
npx claude-flow tdd init \
  --database postgresql \
  --bff-language ballerina \
  --frontend-framework react \
  --coverage-threshold 90 \
  --integration-tests \
  --e2e-tests \
  --performance-tests

# Configure PostgreSQL test database
cat > docker-compose.test.yml << 'EOF'
version: '3.8'
services:
  postgres-test:
    image: postgres:15.4
    environment:
      POSTGRES_DB: ats_test
      POSTGRES_USER: ats_test_user
      POSTGRES_PASSWORD: test_password
    ports:
      - "5433:5432"
    volumes:
      - ./database/test-data:/docker-entrypoint-initdb.d
    command: postgres -c log_statement=all
    
  redis-test:
    image: redis:7-alpine
    ports:
      - "6380:6379"
EOF

# Set up Ballerina test configuration
mkdir -p backend-for-frontend/tests
cat > backend-for-frontend/Ballerina.toml << 'EOF'
[package]
org = "enterprise_ats"
name = "bff_services"
version = "0.1.0"

[build-options]
testReport = true
codeCoverage = true
observabilityIncluded = true

[[dependency]]
org = "ballerina"
name = "http"
version = "2.9.0"

[[dependency]]
org = "ballerina" 
name = "postgresql"
version = "1.9.0"

[[dependency]]
org = "ballerina"
name = "cache"
version = "3.6.0"
EOF

# Configure comprehensive pre-commit hooks
cat > .githooks/pre-commit << 'EOF'
#!/bin/bash
echo "🧪 Running mandatory tests before commit..."

# PostgreSQL database tests
echo "📊 Testing PostgreSQL migrations and schema..."
docker-compose -f docker-compose.test.yml up -d postgres-test
sleep 5
npm run test:database || {
  echo "❌ PostgreSQL database tests failed. Commit blocked."
  docker-compose -f docker-compose.test.yml down
  exit 1
}

# Ballerina service tests
echo "⚖️ Testing Ballerina services..."
cd backend-for-frontend
bal test --coverage || {
  echo "❌ Ballerina tests failed. Commit blocked."
  cd ..
  docker-compose -f docker-compose.test.yml down
  exit 1
}
cd ..

# Frontend tests
echo "⚛️ Testing React frontend..."
npm run test:unit || {
  echo "❌ Frontend unit tests failed. Commit blocked."
  docker-compose -f docker-compose.test.yml down
  exit 1
}

# Integration tests
echo "🔗 Running integration tests..."
npm run test:integration || {
  echo "❌ Integration tests failed. Commit blocked."
  docker-compose -f docker-compose.test.yml down
  exit 1
}

# Check overall coverage
COVERAGE=$(npm run test:coverage --silent | grep "All files" | awk '{print $10}' | sed 's/%//')
if [ "$COVERAGE" -lt 90 ]; then
  echo "❌ Code coverage ($COVERAGE%) below required threshold (90%). Commit blocked."
  docker-compose -f docker-compose.test.yml down
  exit 1
fi

echo "✅ All tests passed. Coverage: $COVERAGE%"
docker-compose -f docker-compose.test.yml down
EOF

chmod +x .githooks/pre-commit
git config core.hooksPath .githooks
```

### Step 3.2: TDD Workflow with Swarm Coordination

Use swarm mode to coordinate TDD implementation across multiple technologies:

```bash
# Swarm-based TDD workflow for multi-technology stack
claudeflow swarm "Implement comprehensive TDD workflow for enterprise ATS:
  - PostgreSQL database testing: migration tests, schema validation, performance benchmarks
  - Ballerina service testing: unit tests, integration tests, contract tests with 90% coverage
  - React frontend testing: component tests, E2E tests, accessibility tests
  - Cross-stack integration testing: API workflows, data flow validation
  - Pre-commit hooks enforcing: tests pass before commit, coverage threshold met
  - CI/CD pipeline tests: automated testing on push, deployment validation
  Output: Complete test suites for all technologies, pre-commit hooks, CI/CD configurations" \
  --strategy development \
  --max-agents 6 \
  --parallel \
  --output ./tests/
```

---

## 🏭 Phase 4: Component Implementation with TDD

### Step 4.1: PostgreSQL Database Implementation with Swarm

```bash
# Use swarm to implement PostgreSQL schema with comprehensive TDD
claudeflow swarm "Implement PostgreSQL database schema for enterprise ATS with TDD:
  DATABASE SCHEMA:
  - User management tables: users, roles, permissions, tenant_memberships with row-level security
  - Job management tables: jobs, job_postings, job_workflow_states, hiring_stages with partitioning
  - Candidate management: candidates, resumes (JSONB), skills, experience, education
  - Application tracking: applications, application_events, status_history with audit trails
  - Assessment tables: assessments, scoring_criteria, candidate_scores, ml_models
  - Analytics: materialized views for time-to-hire, conversion rates, recruiter performance
  
  MIGRATION STRATEGY:
  - Flyway migrations with version control
  - Rollback scripts for each migration
  - Test data generation for development and testing
  
  TESTING:
  - Unit tests for each table creation and constraint
  - Integration tests for foreign key relationships
  - Performance tests for queries with 1M+ candidate records
  - Security tests for row-level security policies
  - Multi-tenant isolation tests
  
  Output: Complete schema.sql, migration scripts, seed data, comprehensive test suites" \
  --strategy development \
  --max-agents 6 \
  --parallel \
  --output ./database/
```

### Step 4.2: Ballerina BFF Services Implementation with Swarm

```bash
# Implement Ballerina BFF services with swarm coordination and TDD
claudeflow swarm "Implement Ballerina backend-for-frontend services with TDD:
  AUTHENTICATION SERVICE:
  - Endpoints: /login, /logout, /refresh-token, /validate-token
  - JWT token generation and validation with RS256
  - Session management with Redis
  - Multi-factor authentication support
  - Rate limiting: 5 requests per minute per IP
  
  USER MANAGEMENT BFF:
  - Endpoints: /profile, /permissions, /preferences, /notifications
  - PostgreSQL integration with connection pooling
  - Cache layer with Redis for frequently accessed data
  - Real-time updates via WebSockets
  
  JOB MANAGEMENT BFF:
  - Endpoints: /jobs, /jobs/:id, /jobs/:id/applications
  - Aggregation of data from multiple microservices
  - Search optimization with Elasticsearch integration
  - File upload handling for job attachments
  
  TESTING:
  - Unit tests with Ballerina test framework (95% coverage target)
  - Integration tests with TestContainers for PostgreSQL
  - Contract tests with Pact for API consumers
  - Performance tests with k6 for 1000 concurrent users
  
  Output: Complete Ballerina service implementations, test suites, OpenAPI specs" \
  --strategy development \
  --max-agents 7 \
  --parallel \
  --output ./backend-for-frontend/
import ballerina/http;
import ballerina/jwt;
import ballerina/crypto;
import ballerina/sql;
import ballerinax/postgresql;

# Configuration for the authentication service
configurable string dbHost = "localhost";
configurable int dbPort = 5432;
configurable string dbName = "ats_production";
configurable string dbUser = "ats_user";
configurable string dbPassword = "secure_password";

# PostgreSQL client configuration
postgresql:Client dbClient = check new (
    host = dbHost,
    port = dbPort,
    database = dbName,
    user = dbUser,
    password = dbPassword
);

# Authentication service
service /auth on new http:Listener(8080) {
    
    # Login endpoint with PostgreSQL integration
    resource function post login(@http:Payload LoginRequest loginReq) returns LoginResponse|http:Unauthorized|error {
        
        # Validate user credentials against PostgreSQL
        sql:ParameterizedQuery query = `
            SELECT id, email, password_hash, role, tenant_id 
            FROM users 
            WHERE email = ${loginReq.email} AND tenant_id = ${loginReq.tenantId}
        `;
        
        stream<UserRecord, sql:Error?> resultStream = dbClient->query(query);
        UserRecord[]|error users = from UserRecord user in resultStream select user;
        
        if users is error || users.length() == 0 {
            return http:UNAUTHORIZED;
        }
        
        UserRecord user = users[0];
        
        # Verify password hash
        boolean isValidPassword = check crypto:verifyBcryptHash(loginReq.password, user.password_hash);
        if !isValidPassword {
            return http:UNAUTHORIZED;
        }
        
        # Generate JWT token
        jwt:IssuerConfig issuerConfig = {
            username: user.email,
            issuer: "ats-system",
            audience: ["ats-web", "ats-mobile"],
            customClaims: {
                "userId": user.id,
                "role": user.role,
                "tenantId": user.tenant_id
            }
        };
        
        string jwtToken = check jwt:issue(issuerConfig);
        
        return {
            token: jwtToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                tenantId: user.tenant_id
            }
        };
    }
}

# Data types
type LoginRequest record {
    string email;
    string password;
    string tenantId;
};

type LoginResponse record {
    string token;
    UserInfo user;
};

type UserInfo record {
    int id;
    string email;
    string role;
    string tenantId;
};

type UserRecord record {
    int id;
    string email;
    string password_hash;
    string role;
    string tenant_id;
};
EOF

# Create comprehensive tests for Ballerina service
cat > backend-for-frontend/modules/auth/tests/auth_service_test.bal << 'EOF'
import ballerina/test;
import ballerina/http;

# Test configuration
test:Config {}
function testLoginSuccess() returns error? {
    http:Client authClient = check new ("http://localhost:8080");
    
    LoginRequest loginReq = {
        email: "test@example.com",
        password: "testpassword",
        tenantId: "tenant1"
    };
    
    http:Response response = check authClient->post("/auth/login", loginReq);
    test:assertEquals(response.statusCode, 200);
    
    LoginResponse loginResp = check response.getJsonPayload().cloneWithType(LoginResponse);
    test:assertTrue(loginResp.token.length() > 0);
    test:assertEquals(loginResp.user.email, "test@example.com");
}

test:Config {}
function testLoginFailure() returns error? {
    http:Client authClient = check new ("http://localhost:8080");
    
    LoginRequest loginReq = {
        email: "invalid@example.com",
        password: "wrongpassword", 
        tenantId: "tenant1"
    };
    
    http:Response response = check authClient->post("/auth/login", loginReq);
    test:assertEquals(response.statusCode, 401);
}
EOF
```

### Step 4.3: TDD Implementation Process for Each Technology

```bash
# 1. RED Phase - Write failing tests first for all technologies

# PostgreSQL Red Phase
npx claude-flow tdd red "UserTable" \
  --database postgresql \
  --test-cases "create-user,unique-constraint,tenant-isolation" \
  --output ./database/tests/

# Ballerina Red Phase  
npx claude-flow tdd red "AuthenticationService" \
  --language ballerina \
  --test-cases "login,logout,token-validation,error-handling" \
  --output ./backend-for-frontend/tests/

# React Red Phase
npx claude-flow tdd red "LoginComponent" \
  --framework react \
  --test-cases "render,form-validation,api-integration,error-display" \
  --output ./frontend/src/components/tests/

# 2. GREEN Phase - Implement minimal code to pass tests
npx claude-flow tdd green "UserTable" --minimal-sql-implementation
npx claude-flow tdd green "AuthenticationService" --minimal-ballerina-implementation  
npx claude-flow tdd green "LoginComponent" --minimal-react-implementation

# 3. REFACTOR Phase - Improve code quality
npx claude-flow tdd refactor "UserTable" \
  --optimize-queries \
  --add-indexes \
  --security-hardening

npx claude-flow tdd refactor "AuthenticationService" \
  --optimize-performance \
  --improve-error-handling \
  --add-logging

npx claude-flow tdd refactor "LoginComponent" \
  --improve-accessibility \
  --optimize-rendering \
  --enhance-ux
```

### Step 4.4: Full-Stack Feature Implementation with Swarm Coordination

```bash
# Use swarm for coordinated full-stack feature development
claudeflow swarm "Implement Job Management feature across full stack:
  DATABASE LAYER (PostgreSQL):
  - Tables: jobs, job_applications, job_workflow_states, hiring_stages
  - Indexes: compound indexes for tenant_id + status, full-text search on job_description
  - Row-level security policies for multi-tenant isolation
  - Migration tests and performance benchmarks
  
  BFF LAYER (Ballerina):
  - JobBFF service: CRUD operations, workflow orchestration
  - ApplicationBFF service: Application submission, status tracking
  - WorkflowBFF service: Hiring stage management, approvals
  - Contract tests and integration tests with 95% coverage
  
  FRONTEND LAYER (React):
  - JobBoard component: Job listings with filtering and search
  - JobDetails component: Job description, apply button, similar jobs
  - ApplicationForm component: Multi-step application with file upload
  - E2E tests with Playwright covering complete user flows
  
  MICROSERVICES (Node.js):
  - job-service: Job management business logic
  - application-service: Application processing and tracking
  - Unit tests, integration tests, API contract tests
  
  Output: Complete feature implementation across all layers with comprehensive tests" \
  --strategy development \
  --max-agents 8 \
  --parallel \
  --output ./features/job-management/
```

---

## 🔗 Phase 5: Integration & Third-Party Services

### Step 5.1: Job Board Integrations with Swarm Coordination

```bash
# Implement third-party integrations using swarm for coordinated development
claudeflow swarm "Implement third-party integrations for enterprise ATS:
  INDEED INTEGRATION:
  - Ballerina OAuth2 connector for Indeed API
  - Endpoints: post-job, update-job, get-applications, sync-candidates
  - Rate limiting: 100 requests per minute with exponential backoff
  - Webhook handler for application notifications
  - Error recovery with retry logic and circuit breaker pattern
  
  LINKEDIN JOBS INTEGRATION:
  - Ballerina connector for LinkedIn Talent Solutions API
  - Job posting synchronization and application tracking
  - Company page integration for brand consistency
  - Candidate profile enrichment from LinkedIn profiles
  
  EMAIL SERVICE (AMAZON SES):
  - Ballerina SES connector for transactional emails
  - Template engine for job alerts, application confirmations, interview invitations
  - Bounce and complaint handling
  - Email analytics and tracking
  
  MESSAGING (AMAZON MSK):
  - Event streaming for job applications, status changes, notifications
  - Kafka topic design: job-events, application-events, notification-events
  - Consumer groups for reliable event processing
  - Dead letter queues for failed message handling
  
  TESTING:
  - Mock servers for third-party APIs in test environment
  - Integration tests with real API sandbox environments
  - Error scenario testing: rate limits, timeouts, auth failures
  - End-to-end tests covering complete integration flows
  
  Output: Complete integration implementations, connectors, tests, monitoring" \
  --strategy development \
  --max-agents 8 \
  --parallel \
  --output ./integrations/
npx claude-flow integration create \
  --language ballerina \
  --database postgresql \
  --providers "indeed,linkedin,glassdoor,ziprecruiter" \
  --webhook-handlers \
  --event-driven-architecture \
  --test-mocks

# Example Ballerina connector implementation
cat > backend-for-frontend/modules/integrations/indeed_connector.bal << 'EOF'
import ballerina/http;
import ballerina/oauth2;
import ballerina/time;
import ballerina/log;

# Indeed API configuration
configurable string indeedClientId = "";
configurable string indeedClientSecret = "";
configurable string indeedApiUrl = "https://api.indeed.com/ads/apisearch";

# OAuth2 configuration for Indeed API
oauth2:ClientCredentialsGrantConfig indeedOAuth2Config = {
    tokenUrl: "https://api.indeed.com/v2/oauth/tokens",
    clientId: indeedClientId,
    clientSecret: indeedClientSecret,
    scopes: ["job_write", "applications_read"]
};

# Indeed API client with OAuth2
http:Client indeedClient = check new (indeedApiUrl, {
    auth: indeedOAuth2Config,
    timeout: 30,
    retryConfig: {
        count: 3,
        intervalInMillis: 1000,
        backOffFactor: 2.0
    }
});

# Service for Indeed integration
service /integrations/indeed on new http:Listener(8081) {
    
    # Post job to Indeed
    resource function post jobs(@http:Payload JobPostRequest jobReq) returns JobPostResponse|error {
        
        # Transform internal job format to Indeed format
        IndeedJobPost indeedJob = {
            title: jobReq.title,
            description: jobReq.description,
            location: jobReq.location,
            salary: jobReq.salary,
            jobType: jobReq.jobType,
            company: jobReq.company
        };
        
        # Post to Indeed API with retry logic
        http:Response response = check indeedClient->post("/jobs", indeedJob);
        
        if response.statusCode == 201 {
            IndeedJobResponse indeedResponse = check response.getJsonPayload().cloneWithType(IndeedJobResponse);
            
            # Store integration mapping in PostgreSQL
            _ = check storeJobMapping(jobReq.internalJobId, indeedResponse.jobId, "indeed");
            
            return {
                success: true,
                externalJobId: indeedResponse.jobId,
                postingUrl: indeedResponse.url
            };
        } else {
            return error("Failed to post job to Indeed: " + response.statusCode.toString());
        }
    }
    
    # Sync applications from Indeed
    resource function get applications/[string jobId]() returns ApplicationResponse[]|error {
        
        # Get applications from Indeed API
        http:Response response = check indeedClient->get("/jobs/" + jobId + "/applications");
        
        if response.statusCode == 200 {
            IndeedApplication[] indeedApps = check response.getJsonPayload().cloneWithType(IndeedApplication[]);
            
            # Transform and store in PostgreSQL
            ApplicationResponse[] applications = [];
            foreach IndeedApplication app in indeedApps {
                ApplicationResponse appResponse = {
                    externalId: app.id,
                    candidateName: app.candidateName,
                    email: app.email,
                    resumeUrl: app.resumeUrl,
                    appliedDate: app.appliedDate,
                    source: "indeed"
                };
                applications.push(appResponse);
                
                # Store in database
                _ = check storeApplication(jobId, appResponse);
            }
            
            return applications;
        } else {
            return error("Failed to fetch applications from Indeed");
        }
    }
}

# Helper function to store job mapping in PostgreSQL
function storeJobMapping(string internalJobId, string externalJobId, string provider) returns error? {
    // Implementation would use PostgreSQL client to store mapping
    log:printInfo("Stored job mapping: " + internalJobId + " -> " + externalJobId);
}

# Helper function to store application in PostgreSQL  
function storeApplication(string jobId, ApplicationResponse app) returns error? {
    // Implementation would use PostgreSQL client to store application
    log:printInfo("Stored application for job: " + jobId);
}

# Data types
type JobPostRequest record {
    string internalJobId;
    string title;
    string description;
    string location;
    decimal salary;
    string jobType;
    string company;
};

type IndeedJobPost record {
    string title;
    string description;
    string location;
    decimal salary;
    string jobType;
    string company;
};

type JobPostResponse record {
    boolean success;
    string externalJobId;
    string postingUrl;
};

type ApplicationResponse record {
    string externalId;
    string candidateName;
    string email;
    string resumeUrl;
    string appliedDate;
    string source;
};
EOF

# Amazon MSK Event-Driven Architecture Implementation
cat > backend-for-frontend/modules/messaging/msk_producer.bal << 'EOF'
import ballerina/kafka;
import ballerina/log;
import ballerina/uuid;
import ballerina/time;

# Amazon MSK configuration
configurable string mskBootstrapServers = "your-msk-cluster.kafka.us-east-1.amazonaws.com:9098";
configurable string mskSecurityProtocol = "SASL_SSL";
configurable string mskSaslMechanism = "AWS_MSK_IAM";

# MSK Producer configuration with IAM authentication
kafka:ProducerConfiguration mskProducerConfig = {
    bootstrapServers: mskBootstrapServers,
    securityProtocol: kafka:SASL_SSL,
    saslMechanism: kafka:PLAIN,
    authenticationConfiguration: {
        mechanism: kafka:AUTH_SASL_PLAIN,
        username: "AWS_ACCESS_KEY_ID",
        password: "AWS_SECRET_ACCESS_KEY"
    },
    retryCount: 3,
    batchSize: 16384,
    lingerMs: 5,
    bufferMemory: 33554432
};

kafka:Producer mskProducer = check new (mskProducerConfig);

# Event publisher service for ATS system
service /events on new http:Listener(8082) {
    
    # Publish job application event to MSK
    resource function post application/submitted(@http:Payload ApplicationEvent appEvent) returns EventResponse|error {
        
        # Create Kafka message with headers
        kafka:ProducerRecord applicationRecord = {
            topic: "ats-application-events",
            key: appEvent.applicationId,
            value: appEvent.toJsonString(),
            headers: {
                "event-type": "application.submitted",
                "tenant-id": appEvent.tenantId,
                "timestamp": time:utcNow().toString(),
                "correlation-id": uuid:createType4AsString()
            }
        };
        
        # Send to MSK with error handling
        kafka:Error? result = mskProducer->send(applicationRecord);
        
        if result is kafka:Error {
            log:printError("Failed to publish application event to MSK", result);
            return error("Event publishing failed: " + result.message());
        } else {
            log:printInfo("Successfully published application event: " + appEvent.applicationId);
            return {
                success: true,
                eventId: applicationRecord.headers["correlation-id"].toString(),
                topic: "ats-application-events"
            };
        }
    }
    
    # Publish job status change event
    resource function post job/status-changed(@http:Payload JobStatusEvent jobEvent) returns EventResponse|error {
        
        kafka:ProducerRecord jobRecord = {
            topic: "ats-job-events",
            key: jobEvent.jobId,
            value: jobEvent.toJsonString(),
            headers: {
                "event-type": "job.status-changed",
                "tenant-id": jobEvent.tenantId,
                "previous-status": jobEvent.previousStatus,
                "new-status": jobEvent.newStatus,
                "timestamp": time:utcNow().toString()
            }
        };
        
        kafka:Error? result = mskProducer->send(jobRecord);
        
        if result is kafka:Error {
            return error("Job event publishing failed: " + result.message());
        } else {
            return {
                success: true,
                eventId: uuid:createType4AsString(),
                topic: "ats-job-events"
            };
        }
    }
}

# MSK Consumer for processing events
kafka:ConsumerConfiguration mskConsumerConfig = {
    bootstrapServers: mskBootstrapServers,
    securityProtocol: kafka:SASL_SSL,
    saslMechanism: kafka:PLAIN,
    authenticationConfiguration: {
        mechanism: kafka:AUTH_SASL_PLAIN,
        username: "AWS_ACCESS_KEY_ID",
        password: "AWS_SECRET_ACCESS_KEY"
    },
    groupId: "ats-notification-processor",
    topics: ["ats-application-events", "ats-job-events"],
    autoOffsetReset: kafka:OFFSET_RESET_EARLIEST,
    enableAutoCommit: true
};

kafka:Consumer mskConsumer = check new (mskConsumerConfig);

# Background service to process MSK events
service /processors/notifications on new http:Listener(8083) {
    
    resource function post start-consumer() returns string|error {
        
        # Start consuming messages from MSK
        while true {
            kafka:ConsumerRecord[] records = check mskConsumer->poll(1000);
            
            foreach kafka:ConsumerRecord record in records {
                string topic = record.topic;
                string eventType = record.headers["event-type"].toString();
                
                match eventType {
                    "application.submitted" => {
                        ApplicationEvent event = check record.value.fromJsonStringWithType(ApplicationEvent);
                        _ = check processApplicationSubmission(event);
                    }
                    "job.status-changed" => {
                        JobStatusEvent event = check record.value.fromJsonStringWithType(JobStatusEvent);
                        _ = check processJobStatusChange(event);
                    }
                    _ => {
                        log:printWarn("Unknown event type received: " + eventType);
                    }
                }
            }
        }
    }
}

# Event processing functions
function processApplicationSubmission(ApplicationEvent event) returns error? {
    log:printInfo("Processing application submission: " + event.applicationId);
    
    # Send confirmation email to candidate
    # Update analytics in RDS PostgreSQL
    # Trigger background checks if required
    # Notify hiring managers
}

function processJobStatusChange(JobStatusEvent event) returns error? {
    log:printInfo("Processing job status change: " + event.jobId + " -> " + event.newStatus);
    
    # Update job board postings
    # Notify subscribed candidates
    # Update reporting metrics
}

# Event data types
type ApplicationEvent record {
    string applicationId;
    string jobId;
    string candidateId;
    string tenantId;
    string source;
    string status;
    time:Utc submittedAt;
};

type JobStatusEvent record {
    string jobId;
    string tenantId;
    string previousStatus;
    string newStatus;
    string updatedBy;
    time:Utc updatedAt;
};

type EventResponse record {
    boolean success;
    string eventId;
    string topic;
};
EOF
```

### Step 5.2: Assessment Engine with RDS PostgreSQL and ML Integration

```bash
# Create AI-powered assessment engine with RDS PostgreSQL backing
npx claude-flow ml create AssessmentEngine \
  --database rds-postgresql \
  --message-queue msk \
  --algorithms "skills-matching,cultural-fit,experience-scoring" \
  --training-data "./data/candidate-assessments.csv" \
  --event-streaming "application-scoring,skill-matching" \
  --ballerina-ml-services \
  --tdd-ml-models \
  --bias-detection \
  --explainable-ai

# Implement PostgreSQL-backed ML model storage
npx claude-flow sparc tdd \
  "Create PostgreSQL ML model storage and Ballerina ML service integration" \
  --database-tables "ml_models,assessment_results,candidate_scores" \
  --ballerina-services "AssessmentBFF,ScoringService" \
  --test-scenarios "model-training,prediction,result-storage,bias-detection"
```

---

## 📊 Phase 6: Analytics & Reporting

### Step 6.1: PostgreSQL Analytics with Swarm Coordination

```bash
# Implement comprehensive analytics infrastructure using swarm
claudeflow swarm "Implement analytics and reporting infrastructure for enterprise ATS:
  POSTGRESQL ANALYTICS LAYER:
  - Materialized views: time-to-hire, candidate-quality, recruiter-performance, conversion-rates
  - Refresh strategies: incremental refresh every hour, full refresh nightly
  - Partitioned analytics tables by tenant_id and time period
  - Aggregate tables for dashboard performance optimization
  - Time-series tables for trend analysis with TimescaleDB extension
  
  BALLERINA REPORTING SERVICES:
  - Analytics BFF service with caching layer (Redis)
  - Real-time dashboard APIs with WebSocket updates
  - Export services: CSV, Excel, PDF report generation
  - Scheduled report generation and email delivery
  - Custom report builder with dynamic query generation
  
  AMAZON MSK EVENT STREAMING:
  - Real-time event stream: application-submitted, candidate-hired, job-posted
  - Stream processing for live dashboard updates
  - Event aggregation for real-time metrics
  - Kafka Streams for windowed aggregations
  
  DASHBOARDS & VISUALIZATIONS:
  - Recruiter performance dashboard: applications reviewed, time-to-review, hire rate
  - Hiring pipeline dashboard: stages conversion rates, bottleneck identification
  - Candidate sourcing dashboard: source effectiveness, cost-per-hire by channel
  - Diversity & inclusion metrics: demographic analytics, bias detection
  
  TESTING:
  - Performance tests with 10M+ records
  - Materialized view refresh optimization tests
  - Real-time dashboard latency tests (target: <200ms)
  - Report generation load tests
  
  Output: Complete analytics schema, materialized views, reporting services, dashboards" \
  --strategy development \
  --max-agents 7 \
  --parallel \
  --output ./analytics/
-- Analytics tables and materialized views for ATS reporting

-- Time-to-hire analytics
CREATE MATERIALIZED VIEW mv_time_to_hire AS
SELECT 
    j.tenant_id,
    j.department,
    j.job_level,
    AVG(EXTRACT(days FROM ja.hired_date - ja.applied_date)) as avg_time_to_hire,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(days FROM ja.hired_date - ja.applied_date)) as median_time_to_hire,
    COUNT(*) as total_hires,
    DATE_TRUNC('month', ja.hired_date) as hire_month
FROM jobs j
JOIN job_applications ja ON j.id = ja.job_id
WHERE ja.status = 'hired'
GROUP BY j.tenant_id, j.department, j.job_level, DATE_TRUNC('month', ja.hired_date);

-- Candidate quality scoring
CREATE MATERIALIZED VIEW mv_candidate_quality AS
SELECT 
    c.tenant_id,
    ja.job_id,
    AVG(ar.overall_score) as avg_assessment_score,
    COUNT(DISTINCT c.id) as total_candidates,
    COUNT(CASE WHEN ja.status = 'hired' THEN 1 END) as hired_count,
    ROUND(
        COUNT(CASE WHEN ja.status = 'hired' THEN 1 END)::decimal / 
        COUNT(DISTINCT c.id) * 100, 2
    ) as hire_rate_percentage
FROM candidates c
JOIN job_applications ja ON c.id = ja.candidate_id
LEFT JOIN assessment_results ar ON ja.id = ar.application_id
GROUP BY c.tenant_id, ja.job_id;

-- Recruiter performance metrics
CREATE MATERIALIZED VIEW mv_recruiter_performance AS
SELECT 
    u.id as recruiter_id,
    u.tenant_id,
    COUNT(DISTINCT j.id) as jobs_managed,
    COUNT(ja.id) as total_applications,
    COUNT(CASE WHEN ja.status = 'hired' THEN 1 END) as successful_hires,
    AVG(EXTRACT(days FROM ja.hired_date - j.created_date)) as avg_time_to_fill,
    DATE_TRUNC('month', j.created_date) as month
FROM users u
JOIN jobs j ON u.id = j.recruiter_id
LEFT JOIN job_applications ja ON j.id = ja.job_id
WHERE u.role = 'recruiter'
GROUP BY u.id, u.tenant_id, DATE_TRUNC('month', j.created_date);

-- Indexes for performance
CREATE INDEX idx_mv_time_to_hire_tenant_month ON mv_time_to_hire(tenant_id, hire_month);
CREATE INDEX idx_mv_candidate_quality_tenant_job ON mv_candidate_quality(tenant_id, job_id);
CREATE INDEX idx_mv_recruiter_perf_tenant_month ON mv_recruiter_performance(tenant_id, month);

-- Refresh function for materialized views
CREATE OR REPLACE FUNCTION refresh_analytics_views()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_time_to_hire;
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_candidate_quality;
    REFRESH MATERIALIZED VIEW CONCURRENTLY mv_recruiter_performance;
END;
$$ LANGUAGE plpgsql;

-- Schedule automatic refresh (requires pg_cron extension)
SELECT cron.schedule('refresh-analytics', '0 */6 * * *', 'SELECT refresh_analytics_views();');
EOF

# Create Ballerina analytics service
cat > backend-for-frontend/modules/analytics/analytics_service.bal << 'EOF'
import ballerina/http;
import ballerina/sql;
import ballerinax/postgresql;

# Analytics service for reporting and dashboard data
service /analytics on new http:Listener(8082) {
    
    # Get time-to-hire metrics
    resource function get time-to-hire(string tenantId, string? department = (), string? period = "6months") 
            returns TimeToHireMetrics[]|error {
        
        string periodFilter = period == "12months" ? "12 months" : "6 months";
        
        sql:ParameterizedQuery query = `
            SELECT 
                department,
                job_level,
                avg_time_to_hire,
                median_time_to_hire,
                total_hires,
                hire_month
            FROM mv_time_to_hire 
            WHERE tenant_id = ${tenantId}
            AND hire_month >= NOW() - INTERVAL '${periodFilter}'
            ${department is () ? "" : `AND department = ${department}`}
            ORDER BY hire_month DESC, department
        `;
        
        stream<TimeToHireRecord, sql:Error?> resultStream = dbClient->query(query);
        TimeToHireRecord[]|error results = from TimeToHireRecord record in resultStream select record;
        
        if results is error {
            return error("Failed to fetch time-to-hire metrics");
        }
        
        # Transform to response format
        TimeToHireMetrics[] metrics = [];
        foreach TimeToHireRecord record in results {
            metrics.push({
                department: record.department,
                jobLevel: record.job_level,
                avgTimeToHire: record.avg_time_to_hire,
                medianTimeToHire: record.median_time_to_hire,
                totalHires: record.total_hires,
                month: record.hire_month
            });
        }
        
        return metrics;
    }
    
    # Get candidate quality metrics
    resource function get candidate-quality(string tenantId, string? jobId = ()) 
            returns CandidateQualityMetrics[]|error {
        
        sql:ParameterizedQuery query = `
            SELECT 
                job_id,
                avg_assessment_score,
                total_candidates,
                hired_count,
                hire_rate_percentage
            FROM mv_candidate_quality 
            WHERE tenant_id = ${tenantId}
            ${jobId is () ? "" : `AND job_id = ${jobId}`}
            ORDER BY avg_assessment_score DESC
        `;
        
        stream<CandidateQualityRecord, sql:Error?> resultStream = dbClient->query(query);
        CandidateQualityRecord[]|error results = from CandidateQualityRecord record in resultStream select record;
        
        if results is error {
            return error("Failed to fetch candidate quality metrics");
        }
        
        # Transform to response format
        CandidateQualityMetrics[] metrics = [];
        foreach CandidateQualityRecord record in results {
            metrics.push({
                jobId: record.job_id,
                avgAssessmentScore: record.avg_assessment_score ?: 0.0,
                totalCandidates: record.total_candidates,
                hiredCount: record.hired_count,
                hireRatePercentage: record.hire_rate_percentage
            });
        }
        
        return metrics;
    }
}

# Data types for analytics
type TimeToHireMetrics record {
    string department;
    string jobLevel;
    float avgTimeToHire;
    float medianTimeToHire;
    int totalHires;
    string month;
};

type CandidateQualityMetrics record {
    string jobId;
    float avgAssessmentScore;
    int totalCandidates;
    int hiredCount;
    float hireRatePercentage;
};

type TimeToHireRecord record {
    string department;
    string job_level;
    float avg_time_to_hire;
    float median_time_to_hire;
    int total_hires;
    string hire_month;
};

type CandidateQualityRecord record {
    string job_id;
    float? avg_assessment_score;
    int total_candidates;
    int hired_count;
    float hire_rate_percentage;
};
EOF
```

---

## 🚀 Phase 7: Deployment & Production Setup

### Step 7.1: Production Infrastructure Deployment with Swarm

```bash
# Deploy production infrastructure using swarm for coordinated setup
claudeflow swarm "Design and implement production infrastructure for enterprise ATS on AWS:
  KUBERNETES CLUSTER (AWS EKS):
  - Multi-AZ deployment across 3 availability zones
  - Node groups: system (t3.large), application (c5.2xlarge), database-proxy (r5.xlarge)
  - Auto-scaling: HPA for pods, Cluster Autoscaler for nodes
  - Network policies for micro-segmentation
  - Pod security policies and admission controllers
  
  RDS POSTGRESQL:
  - Multi-AZ deployment with automated failover
  - Instance type: db.r5.2xlarge (64GB RAM, 8 vCPUs)
  - Storage: 1TB gp3 with auto-scaling up to 5TB
  - Backup: automated daily backups with 30-day retention
  - Read replicas: 2 replicas for read scaling
  - Parameter groups: optimized for OLTP workload
  - Security: encryption at rest (KMS), in transit (SSL/TLS)
  
  AMAZON MSK (KAFKA):
  - 3-broker cluster across 3 AZs
  - Instance type: kafka.m5.large
  - Storage: 500GB per broker
  - Topics: job-events, application-events, notification-events with 30-day retention
  - Security: TLS encryption, SASL/SCRAM authentication
  - Monitoring: CloudWatch metrics and Prometheus exporters
  
  BALLERINA BFF DEPLOYMENT:
  - Kubernetes Deployment with 5 replicas
  - Resource limits: 2 CPU, 4GB memory per pod
  - Health checks: liveness probe (5s), readiness probe (10s)
  - Service mesh: Istio for traffic management and observability
  - Config: ConfigMaps for environment-specific settings
  
  INGRESS & LOAD BALANCING:
  - AWS Application Load Balancer with WAF
  - NGINX Ingress Controller for routing
  - TLS termination with ACM certificates
  - Rate limiting and DDoS protection
  
  OBSERVABILITY:
  - Prometheus for metrics collection
  - Grafana dashboards for visualization
  - ELK stack for centralized logging
  - X-Ray for distributed tracing
  - CloudWatch for AWS service monitoring
  
  Output: Complete IaC (Terraform/CloudFormation), Kubernetes manifests, deployment scripts" \
  --strategy development \
  --max-agents 8 \
  --parallel \
  --output ./infrastructure/
  name: aws-rds-credentials
type: Opaque
stringData:
  host: "ats-rds-cluster.cluster-xyz.us-east-1.rds.amazonaws.com"
  port: "5432"
  database: "ats_production"
  username: "ats_user"
  password: "secure-password-from-secrets-manager"
  ssl: "require"
---
apiVersion: v1
kind: Secret
metadata:
  name: aws-msk-config
type: Opaque
stringData:
  bootstrap-servers: "ats-msk-cluster.kafka.us-east-1.amazonaws.com:9098"
  security-protocol: "SASL_SSL"
  sasl-mechanism: "AWS_MSK_IAM"
  topic-prefix: "ats-production"
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-services-endpoints
data:
  RDS_ENDPOINT: "ats-rds-cluster.cluster-xyz.us-east-1.rds.amazonaws.com:5432"
  MSK_BOOTSTRAP_SERVERS: "ats-msk-cluster.kafka.us-east-1.amazonaws.com:9098"
  AWS_REGION: "us-east-1"
  MSK_TOPIC_APPLICATION_EVENTS: "ats-production-application-events"
  MSK_TOPIC_JOB_EVENTS: "ats-production-job-events"
  MSK_TOPIC_NOTIFICATION_EVENTS: "ats-production-notification-events"
EOF

# Ballerina service deployment
cat > k8s/ballerina-bff-deployment.yml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ats-ballerina-bff
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ats-ballerina-bff
  template:
    metadata:
      labels:
        app: ats-ballerina-bff
    spec:
      containers:
      - name: ballerina-bff
        image: ats/ballerina-bff:latest
        ports:
        - containerPort: 8080
        - containerPort: 8081
        - containerPort: 8082
        env:
        # RDS PostgreSQL Configuration
        - name: DATABASE_HOST
          valueFrom:
            secretKeyRef:
              name: aws-rds-credentials
              key: host
        - name: DATABASE_PORT
          valueFrom:
            secretKeyRef:
              name: aws-rds-credentials
              key: port
        - name: DATABASE_NAME
          valueFrom:
            secretKeyRef:
              name: aws-rds-credentials
              key: database
        - name: DATABASE_USER
          valueFrom:
            secretKeyRef:
              name: aws-rds-credentials
              key: username
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: aws-rds-credentials
              key: password
        - name: DATABASE_SSL_MODE
          valueFrom:
            secretKeyRef:
              name: aws-rds-credentials
              key: ssl
        # MSK Configuration
        - name: MSK_BOOTSTRAP_SERVERS
          valueFrom:
            secretKeyRef:
              name: aws-msk-config
              key: bootstrap-servers
        - name: MSK_SECURITY_PROTOCOL
          valueFrom:
            secretKeyRef:
              name: aws-msk-config
              key: security-protocol
        - name: MSK_SASL_MECHANISM
          valueFrom:
            secretKeyRef:
              name: aws-msk-config
              key: sasl-mechanism
        # AWS Configuration
        - name: AWS_REGION
          valueFrom:
            configMapKeyRef:
              name: aws-services-endpoints
              key: AWS_REGION
        # MSK Topics
        - name: MSK_TOPIC_APPLICATION_EVENTS
          valueFrom:
            configMapKeyRef:
              name: aws-services-endpoints
              key: MSK_TOPIC_APPLICATION_EVENTS
        - name: MSK_TOPIC_JOB_EVENTS
          valueFrom:
            configMapKeyRef:
              name: aws-services-endpoints
              key: MSK_TOPIC_JOB_EVENTS
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: ats-ballerina-bff-service
spec:
  selector:
    app: ats-ballerina-bff
  ports:
  - name: auth
    port: 8080
    targetPort: 8080
  - name: integrations
    port: 8081
    targetPort: 8081
  - name: analytics
    port: 8082
    targetPort: 8082
  type: ClusterIP
EOF

# CI/CD Pipeline with comprehensive testing gates
cat > .github/workflows/production-deploy.yml << 'EOF'
name: Production Deployment Pipeline
on:
  push:
    branches: [main]
    
jobs:
  aws-services-tests:
    runs-on: ubuntu-latest
    services:
      # Local PostgreSQL for testing (production uses RDS)
      postgres:
        image: postgres:15.4
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: ats_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v3
      - name: Run Database Tests
        run: |
          npm install
          npm run test:database
          npm run test:migrations
          npm run test:performance-database
          
  ballerina-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Ballerina
        uses: ballerina-platform/setup-ballerina@v1.1.0
        with:
          version: 2201.8.0
      - name: Run Ballerina Tests
        run: |
          cd backend-for-frontend
          bal test --coverage
          bal test --integration
          bal build --cloud=k8s
          
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Frontend Tests
        run: |
          npm install
          npm run test:unit
          npm run test:integration
          npm run test:e2e
          npm run build
          
  integration-tests:
    needs: [postgresql-tests, ballerina-tests, frontend-tests]
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15.4
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: ats_test
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v3
      - name: Setup Test Environment
        run: |
          docker-compose -f docker-compose.test.yml up -d
          sleep 30
      - name: Run Full Integration Tests
        run: |
          npm run test:full-integration
          npm run test:api-contracts
          npm run test:performance
          
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Security Scans
        run: |
          npm run security:scan
          npm run security:database-audit
          bal security scan backend-for-frontend/
          
  deploy-staging:
    needs: [integration-tests, security-scan]
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Staging
        run: |
          kubectl apply -f k8s/aws-services-config.yml
          kubectl apply -f k8s/ballerina-bff-deployment.yml
          kubectl rollout status deployment/ats-ballerina-bff
          
  production-deploy:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Production
        run: |
          npx claude-flow deploy production \
            --database postgresql \
            --bff ballerina \
            --health-check \
            --rollback-on-failure \
            --zero-downtime
EOF
```

---

## 🔍 Phase 8: Monitoring & Quality Assurance

### Step 8.1: Comprehensive Monitoring Setup with Swarm

```bash
# Implement monitoring infrastructure using swarm coordination
claudeflow swarm "Implement comprehensive monitoring and observability for enterprise ATS:
  METRICS COLLECTION (PROMETHEUS):
  - PostgreSQL metrics: query performance, connection pools, cache hit ratios, replication lag
  - Ballerina service metrics: request latency, throughput, error rates, resource utilization
  - Kubernetes metrics: pod health, node resources, cluster capacity
  - Business metrics: applications per day, time-to-hire, user engagement
  - Custom exporters for application-specific metrics
  
  VISUALIZATION (GRAFANA):
  - Database performance dashboard: slow queries, index usage, table sizes
  - Service health dashboard: SLA compliance, error budgets, latency percentiles
  - Business KPI dashboard: hiring funnel, conversion rates, recruiter productivity
  - Infrastructure dashboard: resource utilization, cost optimization opportunities
  - Real-time alerts dashboard: active incidents, SLO violations
  
  LOGGING (ELK STACK):
  - Centralized log aggregation from all services
  - Structured logging with correlation IDs for request tracing
  - Log retention: 90 days hot, 1 year cold storage
  - Log-based alerting for error patterns and anomalies
  - Audit log tracking for compliance (GDPR, SOC2)
  
  DISTRIBUTED TRACING (AWS X-RAY):
  - End-to-end request tracing across microservices
  - Performance bottleneck identification
  - Dependency mapping and service topology visualization
  - Latency analysis and optimization recommendations
  
  ALERTING (CLOUDWATCH + PAGERDUTY):
  - Critical alerts: database down, service unavailable, data loss
  - Warning alerts: high error rates, slow queries, resource saturation
  - Info alerts: deployment events, configuration changes, capacity planning
  - Escalation policies: on-call rotations, severity-based routing
  - Alert deduplication and intelligent grouping
  
  SECURITY MONITORING:
  - Failed authentication attempts and brute force detection
  - SQL injection and XSS attack detection
  - Anomalous access patterns and privilege escalation
  - Data exfiltration detection
  - Compliance violations and audit trail gaps
  
  Output: Complete monitoring setup, dashboards, alert configurations, runbooks" \
  --strategy development \
  --max-agents 7 \
  --parallel \
  --output ./monitoring/
        - query:
            usage: "LABEL"
            description: "Query text"
        - calls:
            usage: "COUNTER"
            description: "Number of times executed"
        - total_time:
            usage: "COUNTER"
            description: "Total time spent in milliseconds"
        - mean_time:
            usage: "GAUGE"
            description: "Mean time per execution in milliseconds"
EOF

# Ballerina observability configuration
cat > backend-for-frontend/Config.toml << 'EOF'
[ballerina.observe]
enabled = true
provider = "prometheus"

[ballerina.observe.metrics]
enabled = true
provider = "prometheus"

[ballerina.observe.tracing]
enabled = true
provider = "jaeger"

[ballerina.observe.logs]
enabled = true
provider = "loki"

[prometheus]
host = "prometheus-server"
port = 9090

[jaeger]
agentHostname = "jaeger-agent"
agentPort = 6831

[loki]
host = "loki-server"
port = 3100
EOF
```

---

## 📋 Complete Command Sequence Summary

Here's the complete "happy path" command sequence for implementing the enterprise ATS with PostgreSQL and Ballerina using **actual Claude Flow commands**:

```bash
# Phase 1: Project Initialization
mkdir enterprise-ats-system && cd enterprise-ats-system
npx claudeflow@alpha init
git init && git remote add origin https://github.com/your-org/enterprise-ats-system.git

# Phase 2: Specification & Architecture
# Use swarm for architecture design with comprehensive objectives
claudeflow swarm "Design PostgreSQL database architecture for enterprise ATS: multi-tenant with RLS, JSONB profiles, full-text search, partitioning strategy" \
  --strategy development --max-agents 5 --parallel --output ./database/

claudeflow swarm "Design Ballerina BFF services: mobile-optimized APIs, WebSockets, JWT auth, circuit breakers" \
  --strategy development --max-agents 5 --parallel --output ./backend-for-frontend/

# Use stream-chain for sequential architecture steps
claudeflow stream-chain run \
  "Analyze enterprise ATS requirements: SmartRecruiters parity, 10k+ users, GDPR compliance" \
  "Design microservices: user, job, candidate, assessment services with PostgreSQL/Ballerina" \
  "Define deployment: Kubernetes EKS, Multi-AZ RDS, MSK cluster, security architecture" \
  --output ./architecture/

# Generate SPARC specifications and pseudocode
claudeflow sparc spec-pseudocode \
  "Create detailed SPARC specs for all ATS services with PostgreSQL schemas and Ballerina implementations" \
  --output ./specifications/

# Phase 3: TDD Setup
# Use swarm for coordinated TDD implementation
claudeflow swarm "Implement comprehensive TDD workflow: PostgreSQL migration tests, Ballerina service tests, React component tests, 90% coverage target" \
  --strategy development --max-agents 6 --parallel --output ./tests/

# Start test infrastructure
docker-compose -f docker-compose.test.yml up -d

# Phase 4: Database & BFF Implementation
# Implement database with swarm coordination
claudeflow swarm "Implement PostgreSQL schema with TDD: complete schemas, migrations, security policies, performance tests" \
  --strategy development --max-agents 6 --parallel --output ./database/

# Implement Ballerina services with swarm
claudeflow swarm "Implement Ballerina BFF services with TDD: auth, user management, job management with 95% coverage" \
  --strategy development --max-agents 7 --parallel --output ./backend-for-frontend/

# Phase 5: Integration & Third-Party Services
claudeflow swarm "Implement third-party integrations: Indeed, LinkedIn, Amazon SES, Amazon MSK with comprehensive testing" \
  --strategy development --max-agents 8 --parallel --output ./integrations/

# Phase 6: Analytics & Reporting
claudeflow swarm "Implement analytics infrastructure: materialized views, reporting APIs, real-time dashboards, MSK event streaming" \
  --strategy development --max-agents 7 --parallel --output ./analytics/

# Phase 7: Full-Stack Feature Implementation
claudeflow swarm "Implement Job Management feature across full stack: PostgreSQL, Ballerina, React, Node.js microservices" \
  --strategy development --max-agents 8 --parallel --output ./features/job-management/

# Phase 8: Deployment Infrastructure
claudeflow swarm "Design production infrastructure: AWS EKS, Multi-AZ RDS, MSK cluster, monitoring, IaC" \
  --strategy development --max-agents 8 --parallel --output ./infrastructure/

# Phase 9: Monitoring & Observability
claudeflow swarm "Implement comprehensive monitoring: Prometheus, Grafana, ELK, X-Ray, alerting, security monitoring" \
  --strategy development --max-agents 7 --parallel --output ./monitoring/

# Phase 10: Production Deployment
# Apply Kubernetes configurations
kubectl apply -f infrastructure/kubernetes/
kubectl rollout status deployment/ats-ballerina-bff
kubectl rollout status deployment/ats-user-service
kubectl rollout status deployment/ats-job-service

# Validate health
kubectl exec -it deployment/ats-ballerina-bff -- curl -f http://localhost:8080/health
kubectl logs deployment/ats-ballerina-bff --tail=100
```

---

## 🎯 Key Success Factors

### Technology Integration
1. **PostgreSQL Excellence**: Advanced features like row-level security, JSONB columns, materialized views for analytics
2. **Ballerina BFF Power**: Native cloud-native capabilities, excellent PostgreSQL integration, built-in observability
3. **Seamless Integration**: All three technologies (PostgreSQL, Ballerina, React) work together harmoniously

### Development Quality
1. **Specification-Driven Development**: All requirements captured with technology-specific considerations
2. **Multi-Technology TDD**: Tests written for database, backend, and frontend before implementation
3. **90%+ Coverage**: Comprehensive testing across all technology layers
4. **GitHub Integration**: Complete artifact tracking and automated deployment pipelines

### Enterprise Features
1. **SmartRecruiters Parity**: Feature-complete enterprise ATS with modern PostgreSQL-backed architecture
2. **Scalability**: Kubernetes deployment with auto-scaling PostgreSQL clusters and Ballerina services  
3. **Performance**: Optimized PostgreSQL queries, efficient Ballerina services, responsive React frontend
4. **Security**: Enterprise-grade security with PostgreSQL encryption and Ballerina built-in security features

This comprehensive approach ensures a production-ready, enterprise-grade ATS system leveraging the best of PostgreSQL's data management capabilities and Ballerina's cloud-native backend-for-frontend architecture, all orchestrated through Claude Flow's intelligent development methodology.