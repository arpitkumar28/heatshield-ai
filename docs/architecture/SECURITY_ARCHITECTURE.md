# HeatShield AI - Security Architecture

## Overview

This document describes the security architecture and practices implemented in the HeatShield AI system to protect data, services, and users.

## Security Principles

1. **Defense in Depth**: Multiple layers of security controls
2. **Least Privilege**: Minimal access rights for all components
3. **Zero Trust**: Verify explicitly, never trust implicitly
4. **Secure by Default**: Security-first design approach
5. **Transparency**: Open security practices and documentation

## Authentication & Authorization

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Authentication Flow                           │
└─────────────────────────────────────────────────────────────────┘

User Credentials
    ↓
Frontend (Next.js)
    ↓
Backend API (FastAPI)
    ↓
Password Hashing (bcrypt)
    ↓
Database Verification (PostgreSQL)
    ↓
JWT Token Generation (python-jose)
    ↓
Token Signing (HS256)
    ↓
Token Return to Client
    ↓
Client Storage (httpOnly cookie)
```

### Authorization Model

**Role-Based Access Control (RBAC)**
- **Admin**: Full system access
- **Analyst**: Read-only access to analytics
- **User**: Basic access to heat maps
- **Guest**: Limited public access

### Token Management

**JWT Token Structure**
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890 + 1800
}
```

**Token Lifecycle**
- Access token: 30 minutes
- Refresh token: 7 days
- Token rotation on refresh
- Revocation list in Redis

## API Security

### Rate Limiting

**Implementation**: slowapi middleware

**Limits by Endpoint**
- `/`: 100 requests/minute
- `/health`: 200 requests/minute
- `/api/v1/*`: 60 requests/minute
- `/api/v1/auth/*`: 10 requests/minute

**Rate Limiting Strategy**
- IP-based limiting
- User-based limiting (authenticated)
- Sliding window algorithm
- Redis-backed state

### CORS Configuration

**Allowed Origins**: Configured per environment
- Development: `http://localhost:3000`, `http://localhost:8080`
- Production: Specific domain whitelist

**Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS
**Allowed Headers**: Content-Type, Authorization, X-Requested-With
**Credentials**: Enabled for authenticated requests

### Security Headers

**Implemented Headers**
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; ...
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Data Security

### Encryption

**Data at Rest**
- PostgreSQL: Transparent Data Encryption (TDE)
- Secrets: Kubernetes secrets with encryption at rest
- Backups: Encrypted with AES-256

**Data in Transit**
- TLS 1.3 for all communications
- Certificate pinning for mobile apps
- Internal service communication with mTLS (future)

### Input Validation

**Validation Layers**
1. **Frontend**: Client-side validation (user experience)
2. **Backend**: Pydantic schemas (data integrity)
3. **Database**: Constraints and triggers (data consistency)

**Validation Rules**
- Email format validation
- Coordinate range validation
- SQL injection prevention (ORM)
- XSS prevention (sanitization)

### Secrets Management

**Secret Storage**
- Development: `.env` files (gitignored)
- Production: Kubernetes secrets
- Future: HashiCorp Vault

**Secret Rotation**
- Regular rotation schedule
- Automated rotation where possible
- Manual rotation for critical secrets
- Rotation logging and auditing

## Infrastructure Security

### Network Security

**Kubernetes Network Policies**
- Default deny all traffic
- Explicit allow rules per service
- Namespace isolation
- Ingress/Egress controls

**Service Mesh** (Future)
- mTLS for service-to-service communication
- Traffic encryption
- Service identity verification

### Container Security

**Image Security**
- Base image scanning (Trivy)
- Minimal base images (alpine/slim)
- No root user in containers
- Read-only filesystems where possible

**Runtime Security**
- Resource limits
- Security contexts
- Pod security policies
- Seccomp profiles

### Access Control

**Kubernetes RBAC**
- Role-based access control
- Service accounts per application
- Minimal permissions principle
- Regular access reviews

**Cloud Provider IAM**
- Least privilege IAM roles
- Temporary credentials
- Access key rotation
- MFA enforcement

## Monitoring & Logging

### Security Monitoring

**Metrics Collected**
- Failed authentication attempts
- Rate limit violations
- Unusual API patterns
- Error rates by endpoint

**Alerting**
- Critical security events
- Anomaly detection
- Threshold-based alerts
- Integration with SIEM (future)

### Audit Logging

**Logged Events**
- User authentication (success/failure)
- Data access (read/write)
- Configuration changes
- API key usage

**Log Storage**
- Centralized logging (ELK stack)
- Log retention: 90 days
- Log integrity verification
- Secure log access

## Compliance

### Data Privacy

**PII Handling**
- Data minimization
- Purpose limitation
- Consent management
- Right to deletion

**Data Residency**
- Data stored in specified regions
- Cross-border data transfer controls
- Compliance with local regulations

### Security Standards

**Followed Standards**
- OWASP Top 10 mitigation
- NIST Cybersecurity Framework
- CIS Benchmarks (where applicable)
- 12-Factor App security practices

## Threat Model

### Identified Threats

1. **Injection Attacks**: SQL injection, XSS
   - **Mitigation**: ORM, input validation, CSP

2. **Authentication Attacks**: Brute force, credential stuffing
   - **Mitigation**: Rate limiting, account lockout, MFA (future)

3. **Data Breaches**: Unauthorized access, data exfiltration
   - **Mitigation**: Encryption, access controls, monitoring

4. **DoS Attacks**: Resource exhaustion, service disruption
   - **Mitigation**: Rate limiting, autoscaling, CDN

5. **Supply Chain Attacks**: Dependency vulnerabilities
   - **Mitigation**: Dependency scanning, SBOM, regular updates

## Incident Response

### Response Plan

**Detection**
- Automated monitoring alerts
- Security event correlation
- Anomaly detection

**Containment**
- Isolate affected systems
- Block malicious IPs
- Disable compromised accounts

**Eradication**
- Remove malicious code
- Patch vulnerabilities
- Update security controls

**Recovery**
- Restore from clean backups
- Verify system integrity
- Monitor for recurrence

**Post-Incident**
- Root cause analysis
- Lessons learned
- Security improvements

## Security Testing

### Testing Practices

**Static Analysis**
- Code scanning (SonarQube, Bandit)
- Dependency scanning (Snyk, Dependabot)
- IaC scanning (Checkov, tfsec)

**Dynamic Analysis**
- Penetration testing
- Vulnerability scanning
- Security audits

**Security Testing in CI/CD**
- Automated security scans
- Container image scanning
- Infrastructure as code scanning
- Policy as code enforcement

## Future Enhancements

### Planned Security Improvements
- Multi-factor authentication (MFA)
- Hardware security modules (HSM)
- Advanced threat detection (ML-based)
- Zero-trust network architecture
- Automated compliance reporting
- Security awareness training program

## References

- [OWASP Security Guidelines](https://owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [Kubernetes Security Best Practices](https://kubernetes.io/docs/concepts/security/)
- [FastAPI Security Documentation](https://fastapi.tiangolo.com/tutorial/security/)
