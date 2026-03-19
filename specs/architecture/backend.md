<!-- mentor:file
The backend architecture spec. Defines the server-side stack and the rules governing API design, authentication, and hosting. The AI uses this file when implementing server-side logic, writing API routes, and configuring auth. Only include this file if the product has a backend.
priority: high
-->

# Backend Architecture

<!-- Only include this file if the product has a backend -->

## Stack

<!-- mentor
The complete technology stack for the backend. Runtime, database platform, auth mechanism, and hosting must all be specified. Vague entries ("some cloud service") cause the AI to make assumptions that may be inconsistent with the actual setup.

quality signals:
- Every backend layer is specified with the actual service or technology name
- Auth mechanism is precise (not "auth" but "Supabase Auth with magic link" or "JWT with RS256")
- Hosting platform is named with enough detail to configure environment variables
- Edge functions vs serverless vs traditional server is specified if relevant
-->

| Layer | Technology |
|-------|------------|
| Runtime | |
| Database | |
| Auth | |
| Hosting | |

## Rules

<!-- mentor
Backend-specific constraints and conventions. API design conventions, error response formats, authentication requirements, rate limiting rules, and data access patterns all belong here. These rules prevent the AI from implementing insecure or inconsistent backend behavior.

quality signals:
- API response format is standardized and documented
- Authentication requirements are stated for each type of endpoint
- Data validation approach is described (where does validation happen?)
- Error handling conventions are described
- Any sensitive data handling rules are explicit (no PII in logs, etc.)
- Rate limiting behavior is described if applicable
-->
