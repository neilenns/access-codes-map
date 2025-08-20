# Access Codes Map - GitHub Copilot Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Essential Setup Commands
Run these commands in order to set up the development environment:

1. **Install Node.js 22.18.0 using nvm**:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   nvm install 22.18.0
   nvm use 22.18.0
   corepack enable
   ```

2. **Install dependencies**:
   ```bash
   pnpm install --frozen-lockfile
   ```
   Takes approximately 42 seconds. NEVER CANCEL.

3. **Set up database** (required for development):
   ```bash
   cd apps/web
   export DISABLE_AUTH=true
   export DEPLOY_ENV=dev
   pnpm run db:seed
   ```
   Takes approximately 3 seconds. Creates local SQLite database with sample data.

### Development Commands

#### Start Development Server
```bash
cd apps/web
export DISABLE_AUTH=true
export DEPLOY_ENV=dev
pnpm run dev
```
- Starts in approximately 2.3 seconds
- Runs on http://localhost:3000
- Always use DISABLE_AUTH=true for local development

#### Build Project
**WARNING**: Build currently fails in restricted network environments due to Google Fonts download issues.
```bash
cd apps/web
pnpm run build
```
The build fails with `getaddrinfo ENOTFOUND fonts.googleapis.com` in environments without internet access. This is expected behavior.

#### CI Build
```bash
pnpm exec turbo run ci --affected
```
**CRITICAL**: This fails due to Google Fonts network restrictions. Do not attempt in restricted environments.

#### Linting
```bash
pnpm exec turbo lint --affected
```
Takes approximately 11 seconds. NEVER CANCEL.

```bash
pnpm lint:md
```
Takes less than 1 second. Validates markdown files.

#### Code Formatting
Check formatting:
```bash
pnpm prettier --check .
```

Fix formatting:
```bash
pnpm prettier --write .
```

### Database Commands

#### Database Studio
```bash
cd apps/web
export DISABLE_AUTH=true
export DEPLOY_ENV=dev
pnpm run db:studio
```
Opens Drizzle Studio on http://localhost:8788. NEVER CANCEL - runs continuously.

#### Migrate Database
```bash
cd apps/web
export DEPLOY_ENV=dev
pnpm run db:migrate
```

#### Generate Drizzle Migrations
```bash
cd apps/web
pnpm run db:generate
```

## Environment Variables

### Required for Development
- `DISABLE_AUTH=true` - Disables Auth0 authentication for local development
- `DEPLOY_ENV=dev` - Specifies environment (dev/prod) for Cloudflare configuration
- `NODE_ENV=development` - Set automatically by Next.js in dev mode

### Build Environment Notes
- Production builds require Cloudflare and Auth0 environment variables
- Set `CI=true` to skip CloudFlare and Auth0 variable checks during CI builds
- Environment validation prevents `DISABLE_AUTH=true` in production

## Validation Scenarios

### Critical Validation Steps
After making changes, ALWAYS test:

1. **Start development server and verify it responds**:
   ```bash
   curl -f http://localhost:3000
   ```
   Should return HTML with "Access codes" content.

2. **Run linting**:
   ```bash
   pnpm exec turbo lint --affected
   ```

3. **Test database connectivity**:
   ```bash
   cd apps/web && export DISABLE_AUTH=true && export DEPLOY_ENV=dev && pnpm run db:seed
   ```

### Manual Testing Scenarios
- Navigate to http://localhost:3000 and verify home page loads
- Click "Launch the map" button to test routing
- Verify authentication is disabled in development mode

## Project Structure

### Key Directories
- `/apps/web/` - Main Next.js application
- `/apps/web/src/app/` - App Router pages and layouts
- `/apps/web/src/components/` - React components  
- `/apps/web/src/db/` - Database schemas and queries
- `/apps/web/drizzle/migrations/` - Database migration files
- `/packages/eslint-config/` - Shared ESLint configuration
- `/packages/typescript-config/` - Shared TypeScript configuration

### Important Files
- `apps/web/package.json` - Contains all build/dev scripts
- `apps/web/wrangler.jsonc` - Cloudflare Workers configuration
- `apps/web/drizzle.config.ts` - Database configuration
- `turbo.json` - Turborepo task configuration
- `.nvmrc` - Node.js version specification (22.18.0)

## Technology Stack
- **Framework**: Next.js 15.4.6 with App Router
- **Package Manager**: pnpm 10.14.0
- **Monorepo**: Turborepo 2.5.0
- **Database**: Cloudflare D1 (SQLite) with Drizzle ORM
- **Deployment**: Cloudflare Workers with OpenNext
- **Authentication**: Auth0 (disabled in development)
- **UI**: React 19 + Tailwind CSS + Shadcn/ui components
- **Maps**: Leaflet with React Leaflet
- **Dev Tools**: TypeScript, ESLint, Prettier, pre-commit hooks

## Known Issues and Limitations

### Build Failures
- **Google Fonts Network Issue**: Builds fail in restricted environments due to `next/font/google` attempting to download Geist fonts from fonts.googleapis.com
- **Workaround**: Fonts issue prevents production builds in CI environments without internet access
- **Status**: This is expected behavior in sandboxed environments

### Environment Dependencies  
- Requires internet access for Google Fonts during build
- Local development works without external dependencies when fonts are cached
- Database seeding requires DEPLOY_ENV to be set

## Pre-commit Hooks
The repository uses pre-commit hooks for:
- Security scanning (gitleaks)
- File system validation
- Code quality checks

Install with:
```bash
pre-commit install --install-hooks
```

## CI/CD Pipeline
- **CI**: GitHub Actions runs on pull requests
- **Build Task**: `pnpm exec turbo run ci --affected`
- **Lint Task**: `pnpm lint:md && pnpm exec turbo lint --affected`
- **Cache**: Uses Turbo cache and Next.js build cache
- **Deployment**: Separate workflows for dev and prod environments

## Time Expectations
- **Dependency Installation**: ~42 seconds
- **Development Server Start**: ~2.3 seconds  
- **Database Seeding**: ~3 seconds
- **Linting**: ~11 seconds
- **Build**: Fails due to network restrictions (would take ~19 seconds if successful)

**NEVER CANCEL** any of these operations before completion.