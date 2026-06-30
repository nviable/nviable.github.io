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
 * - speaking: Conference talks, interviews, and presentations
 * - experience: About, personal, positions, and education (hub + detail MDX)
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

/**
 * Publications Collection
 *
 * Research outputs with optional external venue links. Tags describe research
 * areas for display only (not filtered on the site).
 */
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
    /** Publication status — drives a status badge. Defaults to published. */
    status: z.enum(['published', 'inSubmission', 'inPreparation', 'underReview']).optional(),
    /** Shown when there is no URL (e.g. in submission) */
    statusNote: z.string().optional(),
    /** Optional DOI (e.g. 10.1145/xxxxxxx) — rendered as a resolvable link */
    doi: z.string().optional(),
    /** Sort order within the same year and kind (lower first) */
    order: z.number().optional(),
  }),
});

/**
 * Journey Timeline Collection
 *
 * Career timeline entries that share the unified audience-facing categories with
 * the speaking collection (conference, teaching, milestone, media, engagement).
 *
 * Features:
 * - Entry types: conference, teaching, milestone, media, engagement
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

      /** Audience-facing category — shared with the speaking collection for unified /journey filters. */
      type: z.enum(['conference', 'teaching', 'milestone', 'media', 'engagement']),

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
 * Experience collection
 *
 * MDX for /experience/:slug. Frontmatter drives the hub (bullets, keywords, personal
 * blurbs); the MDX body is the detail page narrative.
 */
const experienceCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['about', 'personal', 'experience', 'education']),
    /** Breadcrumb and compact labels */
    breadcrumbLabel: z.string(),
    subtitle: z.string().optional(),
    metaLine: z.string().optional(),
    /** Resume-style bullets on the Experience hub (positions & education) */
    homeBullets: z.array(z.string()).optional(),
    /** Keyword pills above “Read more” on the hub */
    keywords: z.array(z.string()).optional(),
    /** Short paragraphs for the Personal section on the hub only */
    hubParagraphs: z.array(z.string()).optional(),
    /** Sort order within category on the hub (lower first) */
    order: z.number(),
    /** SEO / social description for the detail page */
    description: z.string().optional(),
  }),
});

/**
 * Speaking/Talks Collection
 *
 * Talks and appearances that share the unified audience-facing categories with
 * the journey collection (conference, teaching, milestone, media, engagement).
 *
 * Features:
 * - Five categories (conference, teaching, milestone, media, engagement)
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

      /** Audience-facing category — shared with the journey collection for unified /journey filters. */
      type: z.enum(['conference', 'teaching', 'milestone', 'media', 'engagement']),
    })
    .merge(timelineExtrasSchema),
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
  speaking: speakingCollection,
  experience: experienceCollection,
};
