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

  /** Multiple intro paragraphs below the heading (optional; e.g. Experience hub) */
  introParagraphs?: readonly string[];
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
   * Experience / resume hub (/experience) — overview with detail subpages
   */
  experience: {
    title: 'Experience — background, roles & education',
    description:
      'Human-centered HCI and digital media forensics researcher: DeFake Project, mixed-methods work with experts, and industry UX — with room to go deeper on each chapter.',
    heading: 'Experience',
    introParagraphs: [
      'I want the technologies we build to be designed with humans in mind — not the other way around. With years of work across AI, product development, and HCI, I try to stay on the user’s side of the problem while still being honest about what is technically and organizationally feasible.',
      'On the digital forensics side, that same instinct shows up as a push for tools and workflows that give people real autonomy in verifying content themselves, instead of asking them to simply trust someone else’s word. We live in a crowded information space where many “authorities” act in their own self-interest; I care about designs that make evidence and reasoning legible so users can decide for themselves.',
      'My research and the systems I help build are meant to reflect that stance.',
    ],
  },

  /**
   * Journey & speaking timeline (/journey) — merges `journey` and `speaking` collections
   */
  journey: {
    title: 'Journey — timeline, talks & appearances',
    description:
      'A timeline of conference talks and papers, teaching, media and press, professional engagement (standards, policy, law enforcement), and career milestones.',
    heading: 'Journey',
    intro:
      'Conferences, teaching, media, professional engagement, and career milestones in one place.',
  },

  /**
   * Contact page (/contact)
   */
  contact: {
    title: 'Contact — research partnerships, talks & inquiries',
    description: 'Get in touch about research partnerships, invited talks, student inquiries, or media requests on deepfakes, media forensics, and human-centered verification.',
    heading: 'Let’s talk',
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
