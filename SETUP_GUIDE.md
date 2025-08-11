# Development Environment Setup Guide

## Prerequisites

- Windows 11
- Node Version Manager (nvm) installed
- Git for Windows
- VS Code (recommended)

## Step 1: Node.js Setup via nvm

```bash
# Check current Node version
nvm list

# You already have Node.js 20.17.0 (LTS) installed and active
# This is perfect for our project - no need to install additional versions

# Verify current versions
node --version  # Should show v20.17.0
npm --version   # Should show 10.8.2
```

## Step 2: Project Initialization

```bash
# Navigate to your existing workspace
cd /d/Sandbox/nviable.github.io

# Initialize React project with Vite in the current directory
npm create vite@latest . -- --template react-ts

# Note: This will ask to overwrite existing files - choose 'No' for important files
# We'll manually merge the new structure with existing content

# Install dependencies
npm install

# Install additional required packages
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
npm install react-router-dom
npm install @sanity/client @sanity/image-url
npm install lucide-react
npm install -D @types/node
```

## Step 3: Sanity.io Setup

### 3.1 Create Sanity.io Account

1. Go to [sanity.io](https://sanity.io)
2. Sign up with GitHub account
3. Create new project: `nviable-website`

### 3.2 Install Sanity CLI

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Initialize Sanity in project
sanity init --template clean --create-project "nviable-website" --dataset production
```

### 3.3 Configure Sanity Studio

```bash
# Navigate to sanity directory
cd sanity

# Install dependencies
npm install

# Start Sanity Studio
npm run dev
```

### 3.4 Configure CORS

In Sanity.io dashboard:

1. Go to API section
2. Add CORS origin: `http://localhost:5173` (for development)
3. Add CORS origin: `https://your-cloudflare-pages-domain.pages.dev` (for production)

## Step 4: Environment Variables

### 4.1 Create .env.local

```bash
# In project root
touch .env.local
```

### 4.2 Add Environment Variables

```env
# .env.local
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_TOKEN=your_token_here
```

### 4.3 Get Sanity Token

1. Go to Sanity.io dashboard
2. Navigate to API section
3. Create new token with read permissions
4. Copy token to .env.local

## Step 5: Cloudflare Pages Setup

### 5.1 Connect GitHub Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to Pages
3. Create new project
4. Connect GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

### 5.2 Environment Variables in Cloudflare

Add the same environment variables from .env.local to Cloudflare Pages:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION`
- `VITE_SANITY_TOKEN`

### 5.3 Custom Domain

1. In Cloudflare Pages project settings
2. Go to Custom domains
3. Add `nviable.me`
4. Update DNS records as instructed

## Step 6: Development Workflow

### 6.1 Start Development Server

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Sanity Studio
cd sanity
npm run dev
```

### 6.2 Build and Deploy

```bash
# Build for production
npm run build

# Deploy to Cloudflare Pages (automatic with GitHub integration)
git add .
git commit -m "Update website"
git push origin main
```

## Step 7: VS Code Extensions (Recommended)

- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer 2

## Step 8: Git Configuration

```bash
# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize Git repository
git init
git add .
git commit -m "Initial commit"

# Add remote origin
git remote add origin https://github.com/nviable/nviable-website.git
```

## Troubleshooting

### Common Issues

1. **Node version mismatch**: Use `nvm use 18.19.0`
2. **Port conflicts**: Change Vite port in `vite.config.ts`
3. **CORS errors**: Verify Sanity.io CORS settings
4. **Build failures**: Check environment variables in Cloudflare

### Useful Commands

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Sanity connection
npm run sanity:check
```

## Next Steps After Setup

1. Verify all services are running
2. Test Sanity.io connection
3. Begin component development
4. Set up content schemas
5. Start content migration
