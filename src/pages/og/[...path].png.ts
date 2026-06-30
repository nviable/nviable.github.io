/**
 * Per-page Open Graph card endpoint → /og/<path>.png
 *
 * Prerendered to static PNGs at build time (sharp runs in Node here, not on the
 * Worker). One card per project plus the main static pages. Pages reference these
 * via the SEO component's `image` prop.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { pagesConfig } from '../../pages.config';
import { siteConfig } from '../../config';
import { ogPng, type OgCard } from '../../utils/og';

export async function getStaticPaths() {
  const paths: { params: { path: string }; props: OgCard }[] = [
    {
      params: { path: 'home' },
      props: {
        eyebrow: 'HCI · Digital Media Forensics',
        title: siteConfig.author.name,
        subtitle:
          'Usable, trustworthy deepfake detection for journalists, analysts, and investigators.',
      },
    },
    {
      params: { path: 'projects' },
      props: { eyebrow: 'Research', title: pagesConfig.projects.heading, subtitle: pagesConfig.projects.intro },
    },
    {
      params: { path: 'publications' },
      props: { eyebrow: 'Publications', title: pagesConfig.publications.heading, subtitle: pagesConfig.publications.intro },
    },
    {
      params: { path: 'journey' },
      props: { eyebrow: 'Timeline & Talks', title: pagesConfig.journey.heading, subtitle: pagesConfig.journey.intro },
    },
    {
      params: { path: 'experience' },
      props: {
        eyebrow: 'Background',
        title: pagesConfig.experience.heading,
        subtitle: pagesConfig.experience.introParagraphs?.[0] ?? '',
      },
    },
    {
      params: { path: 'contact' },
      props: {
        eyebrow: 'Get in touch',
        title: 'Let’s talk',
        subtitle: 'Research partnerships, invited talks, and student inquiries.',
      },
    },
  ];

  const projects = await getCollection('projects');
  for (const project of projects) {
    paths.push({
      params: { path: `projects/${project.id}` },
      props: {
        eyebrow: `Research project · ${project.data.status}`,
        title: project.data.title,
        subtitle: project.data.subtitle ?? '',
      },
    });
  }

  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const png = await ogPng(props as OgCard);
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
