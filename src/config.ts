/**
 * Site Configuration
 * 
 * Centralized configuration for the entire site, loaded from environment variables.
 * This approach keeps sensitive data and site-specific values out of the codebase
 * while providing type-safe access throughout the application.
 * 
 * Setup:
 * 1. Copy .env.example to .env
 * 2. Customize values for your site
 * 3. Import and use siteConfig throughout the application
 * 
 * Configuration Sections:
 * - Site metadata (URL, language, title, description)
 * - Author information (name, title, bio, email, location)
 * - Social links (GitHub, LinkedIn, Twitter, Mastodon, Bluesky)
 * - Navigation structure
 * 
 * @module config
 */

/**
 * Helper function to get environment variable with fallback
 * 
 * Safely retrieves environment variables with a default fallback value.
 * Uses nullish coalescing to handle undefined values.
 * 
 * @param key - Environment variable key (e.g., 'SITE_URL')
 * @param fallback - Default value if environment variable is not set
 * @returns Environment variable value or fallback
 */
const getEnv = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] ?? fallback;
};

/** One public bio. Homepage, SEO, and build defaults should use this sentence. */
export const siteBio =
  'I work on usable systems for internet safety: digital media forensics, content verification, and media literacy.';

/** Name on papers. John Sohrawardi stays the lead public name. */
export const publishedName = 'Saniat Javid Sohrawardi';

/** Short author credit used on publications. */
export const publishedCitation = 'S. J. Sohrawardi';

/** October 2026 CV, served from this site so the link does not depend on the CDN env var. */
export const cvPdfPath = '/pdf/sohrawardi-cv-2026-10.pdf';

/**
 * Site configuration object
 * 
 * Centralized configuration loaded from environment variables with sensible defaults.
 * All values are loaded at build time and are type-safe throughout the application.
 * 
 * @constant
 */
export const siteConfig = {
  /**
   * Site URL (required for sitemap, canonical URLs, OG tags)
   * 
   * Should be the full production URL without trailing slash.
   * Example: 'https://example.com'
   */
  url: getEnv('SITE_URL', 'https://nviable.me'),
  
  /**
   * Site language (ISO 639-1 code)
   * 
   * Two-letter language code for HTML lang attribute and SEO.
   * Examples: 'en', 'id', 'es', 'fr'
   */
  language: getEnv('SITE_LANGUAGE', 'en'),
  
  /**
   * Site title
   * 
   * Used as fallback when page-specific title is not provided.
   */
  title: getEnv('SITE_TITLE', 'John Sohrawardi'),
  
  /**
   * Site description
   * 
   * Default meta description for SEO and social sharing.
   */
  description: getEnv('SITE_DESCRIPTION', siteBio),
  
  /**
   * Author information
   * 
   * Personal details used throughout the site for attribution,
   * contact information, and structured data.
   */
  author: {
    /** Full name */
    name: getEnv('SITE_AUTHOR_NAME', 'John Sohrawardi'),
    
    /** Professional title or role */
    title: getEnv('SITE_AUTHOR_TITLE', 'Postdoctoral researcher, ESL Global Cybersecurity Institute, RIT'),
    
    /** Short biography or professional summary */
    bio: getEnv('SITE_AUTHOR_BIO', siteBio),
    
    /** Contact email address */
    email: getEnv('SITE_AUTHOR_EMAIL', 'john.sohrawardi@rit.edu'),
    
    /** Location (optional, empty string to hide) */
    location: getEnv('SITE_AUTHOR_LOCATION', ''),
  },
  
  /**
   * Social media links
   * 
   * Set to empty string to hide a specific platform.
   * Only configured (non-empty) links will be displayed.
   */
  social: {
    /** GitHub profile URL */
    github: getEnv('SOCIAL_GITHUB', ''),
    
    /** LinkedIn profile URL */
    linkedin: getEnv('SOCIAL_LINKEDIN', ''),
    
    /** Twitter/X profile URL */
    twitter: getEnv('SOCIAL_TWITTER', ''),
    
    /** Mastodon profile URL */
    mastodon: getEnv('SOCIAL_MASTODON', ''),
    
    /** Bluesky profile URL */
    bluesky: getEnv('SOCIAL_BLUESKY', ''),

    /** ORCID profile URL */
    orcid: getEnv('SOCIAL_ORCID', 'https://orcid.org/0000-0002-4707-7035'),

    /** Scholar profile URL */
    scholar: getEnv('SOCIAL_SCHOLAR', 'https://scholar.google.com/citations?user=12j0HoYAAAAJ&hl=en'),
  },
  
  /**
   * Navigation links
   * 
   * Main site navigation structure. Order determines display order in the nav bar.
   * Add or remove items to customize navigation.
   */
  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'Publications', href: '/publications' },
    { label: 'Journey', href: '/journey' },
    { label: 'Experience', href: '/experience' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

/**
 * Type export for the entire site configuration
 * 
 * Use this type when you need to reference the full config structure.
 */
export type SiteConfig = typeof siteConfig;

/**
 * Type export for social links object
 * 
 * Use this type when working specifically with social media links.
 */
export type SocialLinks = typeof siteConfig.social;

/**
 * Type export for a single navigation item
 * 
 * Use this type when working with individual nav items.
 */
export type NavItem = typeof siteConfig.nav[number];
