import { createClient } from '@sanity/client'
import type { Publication, MediaAppearance } from '../types/content'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID as string,
  dataset: import.meta.env.VITE_SANITY_DATASET as string,
  apiVersion: (import.meta.env.VITE_SANITY_API_VERSION as string) || '2024-01-01',
  useCdn: true,
  perspective: 'published',
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
    tags
  }`
  return sanityClient.fetch(query)
}

export async function fetchMediaAppearances(limit?: number): Promise<MediaAppearance[]> {
  const query = `*[_type == "mediaAppearance"] | order(date desc){
    _id,
    title,
    outlet,
    date,
    description,
    url,
    category,
    "imageUrl": image.asset->url
  }${typeof limit === 'number' ? `[0...${limit}]` : ''}`
  return sanityClient.fetch(query)
}


