# Claude Flow Configuration: Greenhouse Connector Development

## Project Overview

**Objective**: Develop a comprehensive Greenhouse connector in Ballerina programming language that integrates with all major Greenhouse API endpoints for recruitment and hiring management.

**Reference Documentation**: https://developers.greenhouse.io/
**Reference Implementation**: Model after the Paylocity connector in repository `breddin/sensux-paylocity-connector`
**Target Language**: Ballerina (Swan Lake)
**Development Framework**: Claude Flow v2.0.0 with SPARC methodology

## CRITICAL FIRST STEP: API Documentation Analysis

Before any development begins, agents must thoroughly analyze the Greenhouse API structure and reference implementations:

```bash
# Import comprehensive Greenhouse API documentation and reference data
claude-flow memory import greenhouse-connector-context.json

# Verify loaded context
claude-flow memory list --namespace greenhouse
claude-flow memory stats
```

**Required Context File**: `greenhouse-connector-context.json`
```json
{
  "greenhouse-api-docs": "https://developers.greenhouse.io/harvest.html",
  "greenhouse-job-board": "https://developers.greenhouse.io/job-board.html", 
  "greenhouse-webhooks": "https://developers.greenhouse.io/webhooks.html",
  "greenhouse-onboarding": "https://developers.greenhouse.io/gho.html",
  "greenhouse-ingestion": "https://developers.greenhouse.io/candidate-ingestion.html",
  "greenhouse-assessment": "https://developers.greenhouse.io/assessment.html",
  "greenhouse-audit-log": "https://developers.greenhouse.io/audit-log.html",
  "paylocity-connector-repo": "breddin/sensux-paylocity-connector",
  "project-context": "greenhouse-connector-ballerina",
  "development-methodology": "sparc",
  "target-language": "ballerina",
  "development-priority": "critical",
  "api-categories": "7",
  "endpoint-count": "200+",
  "authentication-method": "Basic Auth with API tokens",
  "rate-limiting": "50 requests per 10 seconds",
  "security-requirements": "HTTPS only, configurable API permissions"
}
```

## Greenhouse API Architecture Analysis

### Core API Categories (7 Major APIs)
1. **Harvest API** - Primary recruitment data (jobs, candidates, applications, interviews)
2. **Job Board API** - Public job postings and career page integration
3. **Webhooks** - Real-time event notifications
4. **Onboarding API** - Employee onboarding process management
5. **Ingestion API** - Candidate data submission from external sources
6. **Assessment API** - Integration with assessment platforms
7. **Audit Log API** - Access and edit activity tracking

### Authentication Requirements
- **Method**: Basic Authentication with API token
- **Format**: `Authorization: Basic base64(api_token:)`
- **Security**: HTTPS required, API key permissions configurable per endpoint
- **Rate Limiting**: 50 requests per 10 seconds (configurable per partner)

## Agent Configuration

### 1. API Analysis Agent
**Role**: Greenhouse API Documentation Analyzer
**Specialization**: REST API analysis, authentication patterns, endpoint discovery
**Primary Responsibility**: Complete analysis of Greenhouse API structure and requirements

**Context Requirements**:
- All Greenhouse API documentation (7 categories)
- Authentication and rate limiting specifications
- Response schemas and error handling patterns
- Pagination and filtering capabilities

**Key Tasks**:
- Map all API endpoints across 7 categories
- Document authentication flow and token management
- Analyze request/response schemas for each endpoint
- Identify pagination, filtering, and sorting patterns
- Document error handling and rate limiting requirements

### 2. Architecture Agent
**Role**: Ballerina Connector Architecture Designer
**Specialization**: Ballerina microservices, REST client design, authentication integration
**Primary Responsibility**: Design connector architecture following Ballerina best practices

**Context Requirements**:
- Ballerina HTTP client patterns
- OAuth2/Basic Auth implementation in Ballerina
- Connector configuration and error handling
- Reference architecture from breddin/sensux-paylocity-connector

**Key Tasks**:
- Design modular connector architecture
- Define configuration management (API tokens, base URLs)
- Plan authentication and rate limiting implementation
- Design error handling and retry mechanisms
- Structure client modules for each API category

### 3. Data Modeling Agent
**Role**: Ballerina Data Model Designer
**Specialization**: Ballerina record types, JSON mapping, API response modeling
**Primary Responsibility**: Create comprehensive data models for all Greenhouse entities

**Context Requirements**:
- All Greenhouse API response schemas
- Ballerina record type best practices
- JSON annotation patterns
- Data validation requirements

**Key Tasks**:
- Define Ballerina records for all API entities (Jobs, Candidates, Applications, etc.)
- Implement JSON field mapping and validation
- Design pagination and filtering parameter types
- Create error response models
- Establish data transformation utilities

### 4. HTTP Client Agent
**Role**: Ballerina HTTP Client Implementation Specialist
**Specialization**: HTTP client implementation, request/response handling, authentication
**Primary Responsibility**: Implement robust HTTP client with all required features

**Context Requirements**:
- Ballerina HTTP client documentation
- Authentication implementation patterns
- Rate limiting and retry logic
- Error handling best practices

**Key Tasks**:
- Implement authenticated HTTP client with Basic Auth
- Build rate limiting and retry mechanisms
- Create request builders for all endpoint patterns
- Implement response parsing and error handling
- Add comprehensive logging and monitoring

### 5. API Integration Agent
**Role**: Greenhouse API Endpoint Implementation Specialist
**Specialization**: REST API integration, CRUD operations, endpoint implementation
**Primary Responsibility**: Implement all Greenhouse API endpoint integrations

**Context Requirements**:
- Complete Greenhouse API endpoint documentation
- Ballerina HTTP client patterns
- CRUD operation implementations
- Pagination and filtering patterns

**Key Tasks**:
- Implement all Harvest API endpoints (200+ endpoints)
- Build Job Board API integration
- Create webhook subscription management
- Implement Onboarding API operations
- Add Ingestion, Assessment, and Audit Log APIs
- Ensure consistent error handling across all endpoints

### 6. Testing Agent
**Role**: Comprehensive Test Suite Developer
**Specialization**: Ballerina testing, API testing, integration testing
**Primary Responsibility**: Create exhaustive test coverage for all connector functionality

**Context Requirements**:
- Ballerina test framework documentation
- API testing best practices
- Mock server setup and test data
- Integration testing patterns

**Key Tasks**:
- Create unit tests for all API clients
- Build integration tests with mock Greenhouse API
- Implement authentication and error handling tests
- Add rate limiting and retry mechanism tests
- Create end-to-end workflow tests
- Establish test data management and cleanup

### 7. Documentation Agent
**Role**: Technical Documentation Specialist
**Specialization**: API documentation, usage examples, developer guides
**Primary Responsibility**: Create comprehensive documentation for connector usage

**Context Requirements**:
- All implemented connector functionality
- Ballerina documentation standards
- API usage patterns and examples
- Developer onboarding requirements

**Key Tasks**:
- Create comprehensive API reference documentation
- Write integration guides and tutorials
- Develop code examples for common use cases
- Document configuration and setup procedures
- Create troubleshooting and debugging guides

### 8. Configuration Agent
**Role**: Connector Configuration and Deployment Specialist
**Specialization**: Ballerina configuration, environment management, deployment
**Primary Responsibility**: Handle configuration management and deployment setup

**Context Requirements**:
- Ballerina configuration patterns
- Environment variable management
- Security best practices
- Deployment and packaging requirements

**Key Tasks**:
- Design secure configuration management
- Implement environment-specific settings
- Create deployment and packaging scripts
- Set up logging and monitoring configuration
- Establish security and credential management

## SPARC Methodology Implementation

### Phase 1: Specification (Hours 1-8)
**Duration**: 8 hours
**Focus**: Comprehensive analysis and requirements gathering

**Key Deliverables**:
- Complete Greenhouse API endpoint mapping (200+ endpoints)
- Authentication and security requirements analysis
- Data model specifications for all entities
- Integration architecture design
- Testing strategy and requirements

**Agent Coordination**:
- API Analysis Agent leads comprehensive endpoint documentation
- Architecture Agent designs overall connector structure
- Data Modeling Agent maps all response schemas
- All agents validate requirements against Greenhouse documentation

### Phase 2: Planning (Hours 9-16)
**Duration**: 8 hours
**Focus**: Detailed implementation planning and design

**Key Deliverables**:
- Detailed implementation roadmap
- Module structure and dependency mapping
- Authentication flow implementation plan
- Error handling and retry strategy
- Testing plan and test data requirements

**Agent Coordination**:
- Architecture Agent finalizes module design
- HTTP Client Agent plans authentication implementation
- API Integration Agent maps endpoint implementation priority
- Testing Agent designs test strategy and infrastructure

### Phase 3: Architecture (Hours 17-32)
**Duration**: 16 hours
**Focus**: Core architecture implementation

**Key Deliverables**:
- Core HTTP client with authentication
- Base connector infrastructure
- Configuration management system
- Error handling framework
- Rate limiting implementation

**Agent Coordination**:
- HTTP Client Agent implements core client infrastructure
- Configuration Agent sets up configuration management
- Data Modeling Agent implements base record types
- All agents ensure consistent error handling

### Phase 4: Realization (Hours 33-48)
**Duration**: 16 hours
**Focus**: Core API implementation

**Key Deliverables**:
- Harvest API implementation (primary endpoints)
- Job Board API integration
- Webhook management functionality
- Basic testing infrastructure
- Initial documentation

**Agent Coordination**:
- API Integration Agent implements priority endpoints
- Testing Agent creates test infrastructure
- Documentation Agent begins API reference
- All agents maintain implementation consistency

### Phase 5: Completion (Hours 49-56)
**Duration**: 8 hours
**Focus**: Final implementation and validation

**Key Deliverables**:
- Complete API coverage (all 7 categories)
- Comprehensive test suite
- Full documentation
- Deployment configuration
- Integration examples

**Agent Coordination**:
- API Integration Agent completes remaining endpoints
- Testing Agent finalizes comprehensive test coverage
- Documentation Agent completes all documentation
- Configuration Agent finalizes deployment setup

## Technical Implementation Requirements

### Core Connector Features
1. **Complete API Coverage**: All 200+ Greenhouse endpoints across 7 API categories
2. **Robust Authentication**: Basic Auth with configurable API tokens
3. **Rate Limiting**: Built-in rate limiting (50 req/10sec default)
4. **Error Handling**: Comprehensive error handling with retry logic
5. **Pagination**: Support for all Greenhouse pagination patterns
6. **Filtering**: Query parameter building for all filter options
7. **Webhooks**: Subscription management and event handling
8. **Configuration**: Flexible configuration for all environments

### Ballerina-Specific Requirements
1. **Record Types**: Comprehensive data models for all API entities
2. **HTTP Client**: Robust client with connection pooling
3. **JSON Handling**: Efficient JSON parsing and generation
4. **Error Types**: Custom error types for different failure scenarios
5. **Configuration**: Ballerina.toml and Config.toml integration
6. **Testing**: Ballerina test framework integration
7. **Documentation**: Ballerina doc generation support

### Security and Compliance
1. **API Key Management**: Secure storage and rotation support
2. **HTTPS Enforcement**: All communications over TLS
3. **Permission Validation**: Respect Greenhouse API permissions
4. **Data Privacy**: Proper handling of sensitive candidate data
5. **Audit Logging**: Comprehensive operation logging
6. **Rate Limiting**: Respect and implement Greenhouse rate limits

## Success Criteria

### Functional Requirements
- ✅ Complete implementation of all 7 Greenhouse API categories
- ✅ 100% endpoint coverage within scope
- ✅ Robust authentication and authorization
- ✅ Comprehensive error handling and retry logic
- ✅ Full pagination and filtering support
- ✅ Webhook subscription and event handling

### Quality Requirements
- ✅ 90%+ test coverage across all modules
- ✅ Complete API documentation with examples
- ✅ Performance within acceptable limits (<500ms avg response)
- ✅ Memory usage optimization
- ✅ Security best practices implementation
- ✅ Ballerina coding standards compliance

### Integration Requirements
- ✅ Easy integration into existing Ballerina projects
- ✅ Clear configuration and setup procedures
- ✅ Comprehensive error reporting and debugging
- ✅ Production-ready deployment configuration
- ✅ Monitoring and logging integration

## Development Workflow

### Daily Coordination
1. **Morning Standup** (15 min): Agent status updates and blocker resolution
2. **Midday Check** (10 min): Progress validation and course correction
3. **Evening Review** (15 min): Daily deliverable validation and next-day planning

### Quality Gates
1. **Specification Review**: All agents validate requirements understanding
2. **Architecture Review**: Design consistency and feasibility validation
3. **Implementation Review**: Code quality and standard compliance
4. **Testing Review**: Test coverage and integration validation
5. **Documentation Review**: Completeness and accuracy verification

### Collaboration Patterns
1. **Pair Validation**: Critical implementations reviewed by secondary agent
2. **Cross-Agent Testing**: Agents test each other's implementations
3. **Continuous Integration**: Regular integration and testing cycles
4. **Documentation Sync**: Real-time documentation updates during development

## Launch Configuration

```bash
# Initialize Claude Flow for Greenhouse Connector Development
claude-flow init --monitoring

# Store project-specific context in memory
claude-flow memory store project-name "greenhouse-ballerina-connector"
claude-flow memory store development-methodology "sparc"
claude-flow memory store target-language "ballerina"
claude-flow memory store reference-impl "breddin/sensux-paylocity-connector"

# Start coordinated development with swarm intelligence
claude-flow start --ui --swarm

# Launch SPARC methodology for structured development
claude-flow sparc init greenhouse-connector-ballerina
```

This configuration establishes a comprehensive development framework for creating a production-ready Greenhouse connector in Ballerina, with specialized agents, clear deliverables, and robust quality assurance processes. The implementation will follow the patterns and architecture established in the breddin/sensux-paylocity-connector repository.
