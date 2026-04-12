/**
 * Page Metadata Configuration
 * 
 * Centralized SEO metadata for all static pages. Single source of truth
 * for titles and descriptions to ensure consistency across the site.
 * 
 * Usage:
 * ```astro
 * ---
 * import BaseLayout from '../layouts/BaseLayout.astro';
 * import SEO from '../components/SEO.astro';
 * import { pagesConfig } from '../pages.config';
 * ---
 * 
 * <BaseLayout>
 *   <SEO 
 *     slot="head"
 *     title={pagesConfig.projects.title}
 *     description={pagesConfig.projects.description}
 *   />
 *   <!-- Page content -->
 * </BaseLayout>
 * ```
 * 
 * @module pages.config
 */

/**
 * Page metadata interface
 */
interface PageMeta {
  /** Page title (used in browser tab and SEO) */
  title: string;
  
  /** Page description (used in meta tags and SEO) */
  description: string;
  
  /** Page heading (displayed as h1, optional - defaults to title) */
  heading?: string;
  
  /** Page intro text (displayed below heading, optional) */
  intro?: string;
}

/**
 * Pages configuration object
 * 
 * Contains metadata for all static pages. Dynamic pages (like individual
 * project or article pages) generate their own metadata from content.
 */
export const pagesConfig = {
  /**
   * Home page (/)
   * Note: Home page uses siteConfig for title/description as it represents the site itself
   */
  home: {
    title: 'Home',
    description:
      'HCI and digital media forensics research: usable deepfake detection, expert workflows, and the DeFake Project.',
  },
  
  /**
   * Projects listing page (/projects)
   */
  projects: {
    title: 'Research projects',
    description:
      'Research programs and systems for usable media verification, deepfake detection, and training—documented as case studies with methods, tools, and outcomes.',
    heading: 'Research projects',
    intro: 'Programs I lead or co-lead at the intersection of HCI, digital media forensics, and machine learning—including the DeFake initiative and related platforms. Each entry summarizes the problem, approach, and impact; details are in the case study.',
  },
  
  /**
   * Publications listing page (/publications)
   */
  publications: {
    title: 'Publications',
    description: 'Research publications in human–computer interaction, digital media forensics, and usable AI for media verification.',
    heading: 'Publications',
    intro: 'Peer-reviewed papers, book chapters, and dissertation. Links open the venue or preprint page where available; fuller pages on this site may be added later.',
  },
  
  /**
   * Journey & speaking timeline (/journey) — merges `journey` and `speaking` collections
   */
  journey: {
    title: 'Journey — timeline, talks & appearances',
    description:
      'Chronological timeline of career milestones, learning, transitions, and speaking — conferences, meetups, interviews, workshops, and webinars.',
    heading: 'Journey',
    intro:
      'Career milestones, learning moments, transitions, and speaking engagements in one place.',
  },
  
  /**
   * Writing/blog listing page (/writing)
   */
  writing: {
    title: 'Writing - Technical Articles & Insights',
    description: 'Technical articles, insights, and lessons learned from building software systems and solving engineering challenges.',
    heading: 'Writing',
    intro: 'Technical articles, insights, and lessons learned from building software systems. I write about architecture decisions, engineering practices, and the challenges of delivering reliable software at scale.',
  },

  /**
   * Speaking engagements page (/speaking)
   */
  speaking: {
    title: 'Speaking - Talks & Presentations',
    description: 'Conference talks, meetup presentations, interviews, and workshops on software engineering, architecture, and technical leadership.',
    heading: 'Speaking',
    intro: 'I regularly speak at conferences, meetups, and in interviews about software architecture, engineering practices, and technical leadership. Here\'s a collection of my talks and presentations.',
  },
  
  /**
   * Uses/tools page (/uses)
   */
  uses: {
    title: 'Uses - Tools, Stack & Environment',
    description: 'A comprehensive list of the tools, technologies, and environment I use for development work.',
    heading: 'Uses',
    intro: 'A transparent look at the tools, technologies, and environment that power my development workflow. This page documents what I use and why, helping other engineers discover useful tools and understand my technical context.',
  },
  
  /**
   * Contact page (/contact)
   */
  contact: {
    title: 'Contact - Get in Touch',
    description: 'Get in touch to discuss opportunities, collaborations, or technical challenges.',
    heading: 'Let\'s Talk',
  },
} as const;

/**
 * Type export for the pages configuration
 */
export type PagesConfig = typeof pagesConfig;

/**
 * Type export for a single page metadata
 */
export type PageConfig = PageMeta;
