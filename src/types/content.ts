export interface Author {
  _id: string
  name: string
  email: string
  bio: string
  avatar?: string
  social: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export interface Publication {
  _id: string
  title: string
  authors: string[]
  date: string
  venue: string
  year: number
  category: 'conference' | 'journal' | 'workshop' | 'poster'
  url?: string
  pdfUrl?: string
  bibtex?: string
  project?: string
  tags: string[]
  abstract?: string
}

export interface Project {
  _id: string
  title: string
  slug: string
  description: string
  longDescription?: string
  featured: boolean
  date: string
  tags: string[]
  image?: string
  url?: string
  publications?: string[]
  mediaAppearances?: string[]
  code?: string
  awards?: string[]
}

export interface MediaAppearance {
  _id: string
  title: string
  date: string
  outlet: string
  description: string
  url: string
  project?: string
  category: 'news' | 'interview' | 'podcast' | 'video' | 'article'
  image?: string
}

export interface Talk {
  _id: string
  title: string
  speaker: string
  date: string
  location: string
  project?: string
  description?: string
  slides?: string
  video?: string
}
