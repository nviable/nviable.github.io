# Personal Website Migration Project Plan

## Overview

Migrate from Gatsby-based personal website to modern React + React Router + Sanity.io + Cloudflare Pages architecture with Neobrutalism design using Chakra UI.

## Project Goals

- ✅ Maintain current content and visual branding (purple/yellow color scheme)
- ✅ Improve content organization and user experience
- ✅ Better content management with Sanity.io
- ✅ Modern, responsive design with wider content utilization
- ✅ Improved accessibility and usability

## Technical Stack

- **Frontend**: React 18 + React Router v6 + TypeScript
- **UI Framework**: Chakra UI with Neobrutalism styling
- **CMS**: Sanity.io
- **Hosting**: Cloudflare Pages
- **Build Tool**: Vite
- **Package Manager**: npm (via nvm on Windows 11)

## Project Structure

```
nviable.github.io/ (existing workspace)
├── old/ (existing Gatsby site - keep for reference)
│   ├── src/
│   ├── package.json
│   └── gatsby-config.js
├── src/ (new React app)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── ui/
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   └── ContactForm.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── ResearchHighlight.tsx
│   │       ├── Skills.tsx
│   │       ├── MediaAppearances.tsx
│   │       └── Contact.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Research.tsx
│   │   ├── ProjectDetail.tsx
│   │   └── Media.tsx
│   ├── lib/
│   │   ├── sanity.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── styles/
│   │   ├── theme.ts
│   │   └── globals.css
│   └── App.tsx
├── sanity/ (new Sanity.io CMS)
│   ├── schemas/
│   ├── studio/
│   └── sanity.config.ts
├── data/ (existing content - migrate to Sanity.io)
├── public/
├── package.json (new React app)
├── vite.config.ts
└── README.md
```

## Implementation Phases

### Phase 1: Project Setup & Foundation (Week 1)

- [x] Initialize new React project with Vite
- [x] Set up TypeScript configuration
- [x] Install and configure Chakra UI
- [x] Set up React Router
- [x] Create basic project structure
- [ ] Set up Sanity.io project
- [ ] Configure Sanity Studio
- [ ] Create content schemas (Publication, Project, MediaAppearance, Author)

### Phase 2: Core Components & Layout (Week 2)

- [x] Create base layout components (Header, Footer, Layout)
- [ ] Implement responsive navigation
- [ ] Create reusable UI components (Card, Button, ContactForm)
- [x] Set up Chakra UI theme with Neobrutalism styling
- [ ] Implement responsive design system
- [x] Create page routing structure

### Phase 3: Content Migration & Pages (Week 3)

- [ ] Migrate existing JSON data to Sanity.io
- [ ] Create Home page with new structure
- [ ] Implement Research archive page
- [ ] Create individual project detail pages
- [x] Set up dynamic routing for projects
- [ ] Implement content fetching from Sanity.io

### Phase 4: Polish & Testing (Week 4)

- [ ] Add animations and micro-interactions
- [ ] Implement search and filtering
- [ ] Optimize images and performance
- [ ] Add SEO meta tags
- [ ] Test responsive design across devices
- [ ] Accessibility testing and improvements

### Phase 5: Deployment & Launch (Week 5)

- [ ] Set up Cloudflare Pages
- [ ] Configure GitHub integration
- [ ] Set up environment variables
- [ ] Deploy to staging
- [ ] Final testing and bug fixes
- [ ] Launch to production

## Content Migration Priority

1. **Research Papers** (Publications) - Start here
2. **Projects**
3. **Media Appearances**
4. **Author Information**
5. **Skills & Experience**

## Sanity.io Setup Requirements

- [ ] Create Sanity.io account
- [ ] Initialize new project
- [ ] Install Sanity CLI
- [ ] Configure content schemas
- [ ] Set up Sanity Studio
- [ ] Configure CORS for frontend
- [ ] Set up environment variables

## Cloudflare Pages Setup Requirements

- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Set environment variables
- [ ] Configure custom domain (nviable.me)
- [ ] Set up preview deployments

## Development Environment (Windows 11 + nvm)

- [x] Ensure Node.js 18+ via nvm
- [x] Install npm packages
- [ ] Configure Git for Windows
- [ ] Set up VS Code extensions
- [ ] Configure environment variables

## Key Features to Implement

- [ ] Responsive navigation with mobile menu
- [ ] Dynamic project routing
- [ ] Content search and filtering
- [ ] Image optimization
- [ ] SEO optimization
- [ ] Contact form functionality
- [ ] Social media integration
- [ ] Analytics setup

## Success Metrics

- [ ] Website loads under 3 seconds
- [ ] Mobile-first responsive design
- [ ] WCAG AA accessibility compliance
- [ ] Content management workflow established
- [ ] Successful deployment to Cloudflare Pages
- [ ] All existing content migrated and accessible

## Risk Mitigation

- [ ] Backup existing website before migration
- [ ] Test content migration process
- [ ] Validate Sanity.io data structure
- [ ] Test deployment pipeline
- [ ] Plan rollback strategy

## Migration Strategy

1. **Preserve existing content** - Keep `old/` directory and `data/` directory intact
2. **Gradual replacement** - Build new React app alongside existing structure
3. **Content migration** - Move JSON data to Sanity.io while keeping original files as backup
4. **Deployment switch** - Update Cloudflare Pages to point to new React app
5. **Cleanup** - Remove old files only after successful migration and testing

## Next Steps

1. Initialize Sanity project locally and in the `sanity/` folder
2. Implement schemas for Publication, Project, MediaAppearance, Author
3. Seed Sanity with publications from `data/portfolio/publications.json`
4. Create `src/lib/sanity.ts` client and wire fetch on Research page
5. Build Home page sections (Hero, Featured Research, Skills, Media, Contact)
6. Set up Cloudflare Pages project and GitHub integration (staging)
