export type ProjectData = {
    title: string;
    slug: string;
    description: string;
    url: string;
    tags?: string[];
    publications?: string[];
    publicity?: string[];
    code?: string[];
    date?: string;
    imgsrc?: string;
};

export type PublicationsData = {
    title: string;
    slug: string;
    description: string;
    url: string;
    authors?: string[];
    date?: string;
    bibtex?: string;
    tags?: string[];
    project?: string;
    awards?: any[];
    media?: any[];
    venue?: string;
    category?: string;
    code?: string;
}

export type PublicityData = {
    slug: string;
    title: string;
    description: string;
    url: string;
    date: string;
    author?: string[];
    tags?: string[];
    project?: string;
    category?: string;
};

export type TalksData = {
    slug: string;
    title: string;
    description: string;
    url: string;
    speakers?: string[];
    datetime?: string;
    location?: string;
    project?: string;
}

export type PortfolioData = ProjectData[] | PublicationsData[] | PublicityData[] | TalksData[];