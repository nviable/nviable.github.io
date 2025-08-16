import { createClient } from '@sanity/client'
import type { Publication, MediaAppearance, Project } from '../types/content'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID as string,
  dataset: import.meta.env.VITE_SANITY_DATASET as string,
  apiVersion: (import.meta.env.VITE_SANITY_API_VERSION as string) || '2024-01-01',
  useCdn: true,
  perspective: 'published',
  // no token here for public read
})

export async function fetchPublications(): Promise<Publication[]> {
  const query = `*[_type == "publication"] | order(year desc){
    _id,
    title,
    authors,
    year,
    venue,
    url,
    pdfUrl,
    citationCount,
    abstract,
    bibtex,
    tags,
    "project": project->{
      _id,
      title,
      slug
    }
  }`
  return sanityClient.fetch(query)
}

export async function fetchMediaAppearances(limit?: number): Promise<MediaAppearance[]> {
  const query = `*[_type == "mediaAppearance"] | order(date desc)${limit ? `[0...${limit}]` : ''}{
    _id,
    title,
    date,
    outlet,
    description,
    url,
    category,
    "image": image.asset->url,
    "project": project->{
      _id,
      title,
      slug
    }
  }`
  return sanityClient.fetch(query)
}

export async function fetchProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(startDate desc){
    _id,
    title,
    slug,
    shortDescription,
    body,
    url,
    tags,
    startDate,
    endDate,
    "image": image.asset->url,
    "publications": *[_type == "publication" && references(^._id)]{
      _id,
      title,
      authors,
      year,
      venue,
      url,
      tags
    },
    "mediaAppearances": *[_type == "mediaAppearance" && references(^._id)]{
      _id,
      title,
      date,
      outlet,
      category,
      url
    }
  }`
  return sanityClient.fetch(query)
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    shortDescription,
    body,
    url,
    tags,
    startDate,
    endDate,
    "image": image.asset->url,
    "publications": *[_type == "publication" && references(^._id)] | order(year desc){
      _id,
      title,
      authors,
      year,
      venue,
      url,
      tags,
      abstract
    },
    "mediaAppearances": *[_type == "mediaAppearance" && references(^._id)] | order(date desc){
      _id,
      title,
      date,
      outlet,
      category,
      url,
      description
    }
  }`
  return sanityClient.fetch(query, { slug })
}


