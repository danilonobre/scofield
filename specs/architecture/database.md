<!-- mentor:file
The database architecture spec. Defines the database platform, schema conventions, access patterns, and security rules. The AI uses this file when generating migrations, queries, and RLS policies. An incomplete database spec causes the AI to invent schema conventions, skip security policies, and use inconsistent query patterns.
priority: high
-->

# Database Architecture

<!-- Only include this file if the product has a database -->

## Platform

<!-- mentor
The database platform and any relevant configuration. For hosted platforms (Supabase, PlanetScale, etc.), include enough detail to configure the project correctly. Region and tier matter for performance and cost — document them.

quality signals:
- Platform name is exact (not "a postgres database" but "Supabase Postgres")
- Region or hosting configuration is noted
- Any platform-specific features in use are listed (RLS, realtime, edge functions, etc.)
-->

## Schema conventions

<!-- mentor
How the database schema is organized: naming conventions for tables and columns, primary key strategy, timestamp conventions, soft delete approach. These conventions must be consistent across all tables — the AI needs explicit rules to generate consistent migrations.

quality signals:
- Table naming convention is stated (snake_case? plural? prefixed?)
- Column naming convention is stated
- Primary key type is specified (UUID? bigint? nanoid?)
- All tables have created_at/updated_at or the absence is explained
- Soft delete approach is described if applicable (deleted_at column? separate archive table?)
-->

## Access patterns

<!-- mentor
How the application reads and writes to the database. Direct client queries? Server-side only? Via RPC/stored procedures? The access pattern determines the RLS policy design and the security model.

quality signals:
- Client vs server access is explicitly defined
- RLS policy approach is described if using Supabase or similar
- Any tables that are read-only for the client are identified
- Any tables that are write-only (append-only logs, etc.) are identified
-->

## Rules

<!-- mentor
Database-specific constraints and conventions that govern all AI-generated database code. RLS policies, migration approach, query conventions, and forbidden patterns belong here.

quality signals:
- RLS policy requirement is stated as a rule (not a suggestion)
- Migration approach is described (how are schema changes made?)
- Any query performance rules are stated (no N+1 queries, always use indexes on foreign keys)
- Backup and recovery approach is noted if relevant to development decisions
- Any data that must never be deleted (vs soft-deleted) is identified

extensions:
- docguard: architecture validator checks that layer boundaries defined
  here are respected in actual imports and module structure.
-->
