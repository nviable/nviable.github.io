# Content Plan for Homepage and About Me

This file contains structured content suggestions for the Homepage and About Me pages. The tone is quirky yet professional, blending humor, personality, and expertise in HCI, AI, Cybersecurity, Ethics, and Gaming. Key ethos: "My goal is to leave this place better than I found it," which guides research motivations.

Content is derived from:

- **CV (sohrawardi_cv.pdf)**: Academic history, publications, teaching experience
- **Resume (sohrawardi_resume_5_25.pdf)**: Professional skills, work experience, projects
- **Excerpt**: Personal background, eSports, marriage, cat, career goals
- **LinkedIn (<https://www.linkedin.com/in/sohrawardi/>)**: Professional summary, endorsements, network

## Homepage Sections

### Hero Section (Overview + Call to Action)

**Purpose**: Engaging intro linking to About Me, with quirky hook and ethos tie-in.
**Suggested Content**:

```
Hey there! I'm John (Saniat Sohrawardi), a PhD candidate who's journeyed from Ukraine and Bangladesh to US labs—all in the name of making the digital world a safer, smarter place. From busting deepfakes to pondering AI ethics, my mission is simple: leave this place better than I found it.

[Button: Dive into My World →] (links to About Me)
[Button: Explore Research →] (links to Research page)
[Button: View Publications →] (links to Publications page)
```

**References**:

- Excerpt: Born in Ukraine, schooled in Russia/Bangladesh, moved to US for PhD
- LinkedIn: Professional summary as PhD Candidate in HCI/AI
- Ethos quote integrated directly
- Quirky elements: Gaming reference, weather contrast for personality

### Research Highlight (Featured Project + Cards)

**Purpose**: Showcase 1 featured project (large card) + 2 smaller cards, with "View All" button.
**Suggested Content** (Adapt to actual projects from data/portfolio/projects.json):

- **Featured (Large Card)**: DeFake Project

  ```
  Because Reality Shouldn’t Be Optional
  I oversee the development of usable deepfake detection tools—prioritizing intuitive workflows and clear, interpretable results for journalists and investigators.
  
  [View Project →]
  ```

- **Small Card 1**: Dungeons & Deepfakes

  ```
  Role-Playing Against Deepfakes
  Blending Dungeons & Dragons-style scenarios with AI tool training to help journalists spot manipulated media—because fighting misinformation should be an adventure in ethical decision-making.
  ```

- **Small Card 2**: Varuna: Digital Media Forensics Ontology

  ```
  Organizing the Chaos of Media Forensics
  Building a structured ontology to guide users through deepfake detection analytics—because bringing order to digital truth is my kind of cosmic quest.
  ```

- **Button**: View All Projects → (links to Research)

**References**:

- CV/Resume: Deepfake papers, HCI projects, cybersecurity experience
- Excerpt: Gaming background (eSports leadership)
- Ethos: Tied to "leaving better" in featured description
- Quirky: Playful language and emojis

### Latest Publications (2 Cards + View All)  // New section to highlight recent research outputs

**Purpose**: Showcase 2 latest publications as cards, with brief descriptions and links, plus "View All" button to a dedicated Publications page. This emphasizes research credentials and flows naturally from projects.

**Suggested Structure** (Dynamically pull from Sanity or data/portfolio/publications.json):

- **Card 1** (Most Recent):

  ```
  {{publication.title}}
  {{publication.venue}} · {{publication.year}}
  Authors: {{truncate(publication.authors.join(', '), 90)}}
  Abstract: {{truncate(publication.abstract, 160)}} [Expand]
  {{publication.project?.title ? `Project: ${publication.project.title}` : ''}}
  [{{publication.pdfUrl ? 'PDF' : 'Link'}} →] ({{publication.pdfUrl || publication.url}})
  Tags: {{publication.tags}}
  ```

- **Card 2** (Next Recent):

  ```
  {{publication.title}}
  {{publication.venue}} · {{publication.year}}
  Authors: {{truncate(publication.authors.join(', '), 90)}}
  Abstract: {{truncate(publication.abstract, 160)}} [Expand]
  {{publication.project?.title ? `Project: ${publication.project.title}` : ''}}
  [{{publication.pdfUrl ? 'PDF' : 'Link'}} →] ({{publication.pdfUrl || publication.url}})
  Tags: {{publication.tags}}
  ```

- **Button**: View All Publications → (links to Publications page)

**References**:

- CV/Resume: Publication list
- Quirky: Keep tone with playful summaries
- Ethos: Tie descriptions to "leaving better"

**Data placeholders (from Sanity)**:

- title: `{{publication.title}}`
- venue/year: `{{publication.venue}} · {{publication.year}}`
- authors: `{{truncate(publication.authors.join(', '), 90)}}`
- abstract: `{{truncate(publication.abstract, 160)}}` with [Expand]/[Collapse]
- link preference: `{{publication.pdfUrl || publication.url}}` with label “PDF” if `pdfUrl`
- related project pill: `{{publication.project?.title}}`
- tags: `{{publication.tags}}`

### Skills Section (Categorized, Compact)

**Purpose**: Organized skills grid, less space-wasting than original.
**Suggested Content** (Categorized from Resume/CV):

```
### Tech Superpowers (With a Side of Quirk) - Click to Expand!

**HCI & UX** [Expand]
- Research Methods: User Interviews, Surveys, Usability Testing, A/B Testing, Thematic Analysis
- Design Skills: Interface Prototyping (Figma, Adobe XD), Wireframing, User Journey Mapping, Product Design Principles
- Optimization: Accessibility Standards (WCAG), Inclusive Design, User-Centered Design Principles
- Inferred from Work: Gamified Training Strategies (e.g., Scenario-Based Role-Play for Deepfake Detection Training), UX for AI Tools

**Research & Analysis** [Expand]  // New category for Research Scientist/Qualitative Researcher/Consultancy roles
- Methodologies: Qualitative Research, Mixed-Methods Studies, Bias and Ethics Analysis
- Tools: Data Collection (Surveys, Interviews, ReVISit, Qualtrics), Statistical Analysis, Thematic Coding
- Applications: Deepfake Detection Research, Cross-Cultural Studies, Policy Recommendation Development
- Inferred from Projects: Scenario-Based Evaluations (Dungeons & Deepfakes), Ontology Building (Varuna), Publication Writing

**AI & ML** [Expand]
- Core Frameworks: TensorFlow, PyTorch, Scikit-learn
- Specializations: Computer Vision, Natural Language Processing (NLP), Deep Learning Models
- Advanced: Ethical AI Development, Bias Detection in ML, Explainable AI Techniques
- Tools: Python, Jupyter Notebooks, Data Visualization (Matplotlib, Seaborn)

**Product Management & Design** [Expand]  // New category for Product Management/Design roles
- Skills: Project Oversight, Stakeholder Collaboration, Roadmap Planning, Agile Methodologies
- Design Focus: User Needs Assessment, Prototyping and Iteration, Usability Metrics
- Inferred from Work: Leading Tool Development (DeFake.app), Integrating User Feedback, Cross-Disciplinary Team Management

**Security & Integrity** [Expand]
- Assessment: Vulnerability Scanning, Penetration Testing, Risk Analysis
- Forensics: Digital Media Forensics, Deepfake Detection Algorithms, Ontology Building (e.g., Varuna)
- Privacy: Privacy-Preserving Technologies, Data Encryption, Secure System Design
- Ethics: Ethical Technology Practices, Policy Development

**Gaming & Fun** [Expand]
- Strategy: eSports Team Leadership and Tactics
- Development: Basic Game Design and Development (Unity, Unreal Engine)
- Applications: Turning Gaming Insights into Real-World Lessons (e.g., Behavioral Analysis in Virtual Environments)

All skills deployed with one goal: Leave the digital world better than I found it!
```

**References**:

- Resume: Skills section (e.g., Python, ML tools, security protocols)
- CV: Teaching HCI, research in AI ethics
- Excerpt: eSports leadership
- Quirky: Percentages as fun metrics, playful category names

### Latest Media Appearances (2 Cards + View All)

**Purpose**: 2 latest media cards, link to archive.

**Suggested Structure** (Dynamically pull from Sanity or data/portfolio/publicity.json):

- **Card 1** (Most Recent):

  ```
  {{iconFor(media.category)}} {{media.title}}
  {{media.outlet}} · {{formatDate(media.date)}}
  {{truncate(media.description, 140)}}
  {{media.project?.title ? `Project: ${media.project.title}` : ''}}
  [Read More →] ({{media.url}})
  Category: {{media.category}}
  ```

- **Card 2** (Next Recent):

  ```
  {{iconFor(media.category)}} {{media.title}}
  {{media.outlet}} · {{formatDate(media.date)}}
  {{truncate(media.description, 140)}}
  {{media.project?.title ? `Project: ${media.project.title}` : ''}}
  [Read More →] ({{media.url}})
  Category: {{media.category}}
  ```

- **Button**: View All Media → (links to Media page)

**References**:

- LinkedIn: Media mentions, interviews
- Ethos: Tied into descriptions
- Quirky: Emojis, casual phrasing like "geek out"

**Data placeholders (from Sanity)**:

- title/outlet/date: `{{media.title}}`, `{{media.outlet}}`, `{{formatDate(media.date)}}`
- category icon: `{{iconFor(media.category)}}` (map: news/interview/podcast/video/article)
- description: `{{truncate(media.description, 140)}}`
- link: `{{media.url}}`
- related project pill: `{{media.project?.title}}`

### Compact Contact Form

**Purpose**: Simple form at bottom.
**Suggested Content**:

```
### Drop a Line (Or a Deepfake Tip)
Got a collaboration idea? Research question? Cat photo to share? Let's chat—I'm all about building connections that make the world better.

[Form Fields: Name, Email, Message]
[Button: Send Message]
```

**References**:

- Excerpt: Adopted cat Kyubi (quirky mention)
- Overall professional tone

## About Me Page

**Purpose**: Detailed bio with structure, linking back to ethos.
**Suggested Content** (Full page markdown-like structure):

### Hero Bio

```
From Dhaka Labs to Rochester Research: My Journey in Tech

Born in Ukraine, schooled in Russia and Bangladesh, and now PhD-ing in the US—I've collected more stamps in my passport than bugs in my code. Married since 2022, with the most polite cat named Kyubi who thinks he's the real researcher here. My ethos? Leave this place better than you found it.
```

### Professional Journey

```
After undergrad in Bangladesh and a stint in the workforce, I chased bigger impact to the US for my PhD in Computing & Information Sciences. Specializing in HCI, AI, Cybersecurity, and Ethics, I've led research on deepfake detection, published in top venues, and developed user-centric tools for journalists and professionals. (Fun fact: My competitive gaming days may have taught me more about human behavior than any textbook.) This experience has honed my skills in qualitative research, product design, and cross-disciplinary consultancy.
```

### Current Focus

```
Wrapping up my PhD, I'm seeking roles as a Research Scientist, UX Researcher, Qualitative Researcher, Product Manager/Designer, or Consultant in HCI/AI/Ethics. Let's mix disciplines to innovate with purpose—whether it's designing intuitive AI tools or advising on ethical tech policies. After all, leaving the world better means applying research to real-world impact.
```

### Personal Side

```
When not coding, I'm:
- Losing my rank in Valorant (thank God I quit DotA)
- Playing football/tennis (competitively, of course)
- Spoiling Kyubi with new toys
- Planning ways to make tech more inclusive

[Download CV] [Download Resume] [Connect on LinkedIn]
```

**References**:

- Excerpt: Full personal story integrated
- CV/Resume: Education, publications, skills
- LinkedIn: Professional network, endorsements
- Ethos: Woven throughout
- Quirky: Cat mentions, gaming anecdotes, passport stamps

## Implementation Notes

- **Tone Balance**: Quirky (emojis, humor) + Professional (focus on expertise, ethos)
- **Customization**: Replace placeholders with actual data from Sanity
- **Visuals**: Suggest adding photo from LinkedIn or CV
- **Length**: Concise for Homepage, detailed for About Me

Use this as a base—feel free to tweak!
