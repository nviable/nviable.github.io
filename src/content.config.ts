/**
 * Content Collections Configuration
 * 
 * Defines all content collections for the site with their schemas and validation rules.
 * Uses Astro's Content Collections API with Zod for type-safe content management.
 * 
 * Collections:
 * - projects: Research projects with structured frontmatter (identity, classification,
 *   people, abstract, highlights, artifacts, related project/publication slugs)
 * - publications: Research publications (external links; optional detail pages later)
 * - journey: Career timeline entries
 * - writing: Blog posts and articles
 * - uses: Tools, stack, and environment documentation
 * - speaking: Conference talks and presentations
 * - testimonials: Endorsements and recommendations
 * 
 * All collections use the glob loader to read MDX files from their respective directories.
 * Schemas enforce data structure and provide TypeScript types throughout the application.
 * 
 * @module content.config
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectArtifactEntry = z.object({
  label: z.string(),
  url: z.string().url(),
  type: z.enum(['demo', 'code', 'dataset', 'paper', 'website', 'other']),
});

const projectCollaboratorEntry = z.object({
  name: z.string(),
  role: z.string().optional(),
  affiliation: z.string().optional(),
});

/**
 * Projects collection
 *
 * Frontmatter is grouped for authoring and templates: identity, classification,
 * people & context, abstract, highlights, artifacts, and related slugs.
 * Narrative detail lives in the MDX body (e.g. research questions, phases).
 */
const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    // Identity
    title: z.string(),
    subtitle: z.string().optional(),
    /** Optional; route uses the file id — keep in sync if set */
    slug: z.string().optional(),
    featured: z.boolean().default(false),
    status: z
      .enum(['completed', 'ongoing', 'archived', 'inactive'])
      .default('completed'),
    order: z.number().optional(),
    /** Primary year for listings and meta (e.g. start or latest milestone) */
    year: z.number(),

    // Classification
    type: z.string(),
    domains: z.array(z.string()).default([]),
    methodologyClass: z.string(),

    // People & context
    role: z.string(),
    institution: z.string(),
    duration: z.string().optional(),
    collaborators: z.array(projectCollaboratorEntry).default([]),

    // Abstract & highlights
    abstract: z.string(),
    highlights: z.array(z.string()).min(3).max(5),

    // Artifacts & connections (papers use relatedPublications → publications collection)
    artifacts: z.array(projectArtifactEntry).default([]),
    relatedProjects: z.array(z.string()).optional(),
    relatedPublications: z.array(z.string()).optional(),
    /** Optional tags for search/filter experiments (not required by templates) */
    tags: z.array(z.string()).optional(),
  }),
});

/**
 * Publications Collection
 *
 * Research outputs with optional external venue links. Tags describe research
 * areas for display only (not filtered on the site).
 */
/**
 * Optional timeline metadata and outbound links — shared by `journey` and `speaking`
 * so any entry type can use the same fields; templates show each block only when set.
 */
const timelineExtrasSchema = z.object({
  /** Primary link (event site, venue, article, etc.) */
  url: z.string().url().optional(),
  duration: z.string().optional(),
  topics: z.array(z.string()).optional(),
  slides: z.string().url().optional(),
  video: z.string().url().optional(),
  featured: z.boolean().default(false),
  relatedPresentation: z.string().url().optional(),
  relatedPaper: z.string().url().optional(),
  relatedArticle: z.string().url().optional(),
});

const publicationsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/publications' }),
  schema: z.object({
    kind: z.enum(['bookChapter', 'journal', 'conference', 'dissertation']),
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    /** Venue tier (e.g. CORE A*); drives highlight styling on the publications list */
    quality: z.string().optional(),
    url: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    /** Shown when there is no URL (e.g. in submission) */
    statusNote: z.string().optional(),
    /** Sort order within the same year and kind (lower first) */
    order: z.number().optional(),
  }),
});

/**
 * Journey Timeline Collection
 * 
 * Career growth and learning progression timeline with milestones,
 * learning experiences, and career transitions.
 * 
 * Features:
 * - Entry types: milestone, learning, transition, plus conference/meetup for
 *   professional gatherings that live in `journey/` but use speaking-style categories
 * - Skills/technologies per entry
 * - Optional expandable MDX body
 * - Same optional links/meta as speaking (event, location, slides, related URLs, etc.)
 */
const journeyCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/journey' }),
  schema: z
    .object({
      /** Date of the timeline entry */
      date: z.coerce.date(),

      /** Entry title */
      title: z.string(),

      /** Type of timeline entry (conference/meetup match speaking categories for filters/icons) */
      type: z.enum(['milestone', 'learning', 'transition', 'conference', 'meetup']),

      /** Brief description */
      description: z.string(),

      /** Skills or technologies associated with this entry */
      skills: z.array(z.string()).optional(),

      /** Optional venue/publication name (shown in meta row when set) */
      event: z.string().optional(),

      /** Optional location (city, country, or "Online") */
      location: z.string().optional(),
    })
    .merge(timelineExtrasSchema),
});

/**
 * Writing (Blog) Collection
 * 
 * Blog posts and technical articles with MDX support.
 * 
 * Features:
 * - Draft mode for unpublished content
 * - Publish and update dates
 * - Optional tags for categorization
 */
const writingCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({
    /** Article title */
    title: z.string(),
    
    /** Article description for SEO and previews */
    description: z.string(),
    
    /** Original publication date */
    publishDate: z.coerce.date(),
    
    /** Last updated date (optional) */
    updatedDate: z.coerce.date().optional(),
    
    /** Tags for categorization */
    tags: z.array(z.string()).optional(),
    
    /** Whether the article is a draft (hidden from production) */
    draft: z.boolean().default(false),
  }),
});

/**
 * Uses Collection
 * 
 * Documentation of tools, technologies, and environment used in development workflow.
 * 
 * Features:
 * - Three categories (tools, stack, environment)
 * - Items with name, description, and optional URL
 * - Custom order for intentional presentation
 */
const usesCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/uses' }),
  schema: z.object({
    /** Category for grouping */
    category: z.enum(['tools', 'stack', 'environment']),
    
    /** List of items in this category */
    items: z.array(z.object({
      name: z.string(),
      description: z.string(),
      url: z.string().url().optional(),
    })),
    
    /** Sort order within category */
    order: z.number(),
  }),
});

/**
 * Speaking/Talks Collection
 * 
 * Conference talks, meetup presentations, interviews, and workshops.
 * 
 * Features:
 * - Five talk types (conference, meetup, interview, workshop, webinar)
 * - Event information and location (required)
 * - Shared optional extras with journey: url, slides, video, topics, duration,
 *   relatedPresentation / relatedPaper / relatedArticle, featured
 */
const speakingCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/speaking' }),
  schema: z
    .object({
      /** Talk title */
      title: z.string(),

      /** Talk description */
      description: z.string(),

      /** Event name */
      event: z.string(),

      /** Date of the talk */
      date: z.coerce.date(),

      /** Location (city, country, or "Online") */
      location: z.string(),

      /** Type of speaking engagement */
      type: z.enum(['conference', 'meetup', 'interview', 'workshop', 'webinar']),
    })
    .merge(timelineExtrasSchema),
});

/**
 * Testimonials Collection
 * 
 * Endorsements and recommendations from colleagues and clients.
 * 
 * Features:
 * - Person details (name, role, company)
 * - Relationship context
 * - Quote text
 * - Optional LinkedIn profile link
 * - Featured flag for homepage display
 */
const testimonialsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/testimonials' }),
  schema: z.object({
    /** Person's name */
    name: z.string(),
    
    /** Person's role/title */
    role: z.string(),
    
    /** Person's company */
    company: z.string(),
    
    /** Relationship context (e.g., "Worked together at Company X") */
    relationship: z.string(),
    
    /** Testimonial quote */
    quote: z.string(),
    
    /** LinkedIn profile URL (optional) */
    linkedin: z.string().url().optional(),
    
    /** Whether to feature on homepage */
    featured: z.boolean().default(false),
    
    /** Date of the testimonial */
    date: z.coerce.date(),
  }),
});

/**
 * Export all collections
 * 
 * This object is used by Astro to register all content collections
 * and generate TypeScript types for type-safe content queries.
 */
export const collections = {
  projects: projectsCollection,
  publications: publicationsCollection,
  journey: journeyCollection,
  writing: writingCollection,
  uses: usesCollection,
  speaking: speakingCollection,
  testimonials: testimonialsCollection,
};
