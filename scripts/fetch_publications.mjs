import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

// Node >=18 has global fetch

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')

const AUTHOR_ID = process.env.S2_AUTHOR_ID || '2300644'
const LIMIT = Number(process.env.S2_LIMIT || 50)
const FIELDS = 'paperId,title,authors,year,venue,abstract,citationCount,url,openAccessPdf,citationStyles'

const API_URL = `https://api.semanticscholar.org/graph/v1/author/${AUTHOR_ID}/papers?fields=${encodeURIComponent(
    FIELDS,
)}&limit=${LIMIT}`

async function ensureDir(dirPath) {
    await fs.mkdir(dirPath, { recursive: true })
}

function mapToSanityPublication(paper) {
    const authors = Array.isArray(paper.authors)
        ? paper.authors.map((a) => a?.name).filter(Boolean)
        : []

    return {
        _id: `pub-${paper.paperId}`,
        _type: 'publication',
        title: paper.title || '',
        authors,
        year: paper.year || null,
        venue: paper.venue || '',
        url: paper.url || null,
        pdfUrl: paper.openAccessPdf?.url || null,
        citationCount: paper.citationCount ?? null,
        abstract: paper.abstract || null,
        bibtex: paper.citationStyles?.bibtex || null,
        tags: [],
    }
}

async function main() {
    console.log(`Fetching publications from Semantic Scholar for author ${AUTHOR_ID} (limit ${LIMIT})...`)

    const res = await fetch(API_URL)
    if (!res.ok) {
        const text = await res.text()
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText} — ${text}`)
    }

    const json = await res.json()
    const papers = Array.isArray(json.data) ? json.data : []
    console.log(`Fetched ${papers.length} papers`)

    const publications = papers.map(mapToSanityPublication)

    const seedDir = path.join(repoRoot, 'sanity', 'seed')
    await ensureDir(seedDir)

    const jsonPath = path.join(seedDir, 'publications.json')
    const ndjsonPath = path.join(seedDir, 'publications.ndjson')

    // Write pretty JSON (array)
    await fs.writeFile(jsonPath, JSON.stringify(publications, null, 2), 'utf8')

    // Write NDJSON (for `sanity dataset import`)
    const ndjson = publications.map((doc) => JSON.stringify(doc)).join('\n') + '\n'
    await fs.writeFile(ndjsonPath, ndjson, 'utf8')

    console.log('Wrote:')
    console.log(`- ${path.relative(repoRoot, jsonPath)}`)
    console.log(`- ${path.relative(repoRoot, ndjsonPath)}`)

    console.log('\nTo import into Sanity (dataset: production):')
    console.log('  cd sanity')
    console.log('  npx sanity dataset import ./seed/publications.ndjson production --replace')
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})


