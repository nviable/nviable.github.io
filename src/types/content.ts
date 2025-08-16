export interface Author {
  _id: string
  name: string
  email?: string
  affiliation?: string
  orcid?: string
}

export interface Publication {
  _id: string
  title: string
  authors: string[]
  date: string
  venue: string
  category: 'conference' | 'journal' | 'workshop' | 'poster'
  url?: string
  bibtex?: string
  project?: {
    _id: string
    title: string
    slug: string
  }
  tags: string[]
  abstract?: string
}

export interface Project {
  _id: string
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  shortDescription: string
  body?: string
  url?: string
  tags: string[]
  startDate?: string
  endDate?: string
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
  publications?: Publication[]
  mediaAppearances?: MediaAppearance[]
}

export interface MediaAppearance {
  _id: string
  title: string
  date: string
  outlet: string
  description?: string
  url?: string
  project?: {
    _id: string
    title: string
    slug: string
  }
  category: 'news' | 'interview' | 'podcast' | 'video' | 'article'
  image?: {
    asset: {
      url: string
    }
    alt?: string
  }
}

export interface Talk {
  _id: string
  title: string
  date: string
  venue: string
  description?: string
  url?: string
  slides?: string
  video?: string
}
