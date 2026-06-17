import type { ProfileData, Column, CardWithRelations, TagWithCount } from '@/types'

export const MOCK_PROFILE_DATA: ProfileData = {
  profileImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  name: 'Advaith Renjith',
  title: 'Full-Stack Developer & App Architect',
  bio: 'Final-year Computer Science student specializing in building responsive web applications and designing robust application architectures. Gained extensive hands-on experience in modern frontend development, REST APIs, and database design during my internship at Tachlog Pvt Ltd.',
  location: 'Trivandrum, India',
  email: 'advaithrenjith2004@gmail.com',
  socialLinks: {
    github: 'https://github.com/advaith-renjith-2004',
    linkedin: 'https://linkedin.com/in/advaith-renjith',
  }
}

export const MOCK_BOARD_COLUMNS: Column[] = [
  { id: 'col-1', title: 'About', slug: 'about', position: 0, is_visible: true, created_at: '', updated_at: '' },
  { id: 'col-2', title: 'Experience', slug: 'experience', position: 1, is_visible: true, created_at: '', updated_at: '' },
  { id: 'col-3', title: 'Projects', slug: 'projects', position: 2, is_visible: true, created_at: '', updated_at: '' },
  { id: 'col-4', title: 'Skills', slug: 'skills', position: 3, is_visible: true, created_at: '', updated_at: '' },
  { id: 'col-5', title: 'Education', slug: 'education', position: 4, is_visible: true, created_at: '', updated_at: '' },
]

export const MOCK_BOARD_TAGS: TagWithCount[] = [
  { id: 'tag-1', name: 'TypeScript', slug: 'typescript', category: 'language', color: '#3178C6', card_count: 2, created_at: null, icon_url: null },
  { id: 'tag-2', name: 'JavaScript', slug: 'javascript', category: 'language', color: '#F7DF1E', card_count: 0, created_at: null, icon_url: null },
  { id: 'tag-3', name: 'Python', slug: 'python', category: 'language', color: '#3776AB', card_count: 1, created_at: null, icon_url: null },
  { id: 'tag-4', name: 'Next.js', slug: 'nextjs', category: 'framework', color: '#000000', card_count: 2, created_at: null, icon_url: null },
  { id: 'tag-5', name: 'React', slug: 'react', category: 'framework', color: '#61DAFB', card_count: 2, created_at: null, icon_url: null },
  { id: 'tag-6', name: 'Node.js', slug: 'nodejs', category: 'framework', color: '#339933', card_count: 1, created_at: null, icon_url: null },
  { id: 'tag-7', name: 'PostgreSQL', slug: 'postgresql', category: 'database', color: '#4169E1', card_count: 1, created_at: null, icon_url: null },
  { id: 'tag-8', name: 'Supabase', slug: 'supabase-db', category: 'database', color: '#3FCF8E', card_count: 1, created_at: null, icon_url: null },
  { id: 'tag-9', name: 'Tailwind CSS', slug: 'tailwindcss', category: 'framework', color: '#06B6D4', card_count: 1, created_at: null, icon_url: null },
  { id: 'tag-10', name: 'Git', slug: 'git', category: 'tool', color: '#F05032', card_count: 0, created_at: null, icon_url: null },
]

const tagMap = new Map(MOCK_BOARD_TAGS.map(t => [t.slug, t]))

export const MOCK_BOARD_CARDS: CardWithRelations[] = [
  // About card
  {
    id: 'card-about',
    column_id: 'col-1',
    card_type: 'about',
    position: 0,
    title: 'Welcome to My Portfolio',
    subtitle: 'College Student & Dev',
    date_start: null,
    date_end: null,
    preview_text: 'Final-year Computer Science student interested in Web Development and Application Architecture.',
    full_content: `# About Me\n\nI'm a passionate final-year Computer Science student going into my senior year. I enjoy coding, designing clean UI layouts, and structuring robust application backends. \n\n## My Journey\n- **Internship at Tachlog Pvt Ltd**: Gained hands-on experience building web apps and understanding end-to-end application architecture.\n- **B.Tech Studies**: Currently focusing on software engineering, database design, and systems.\n\n## Areas of Focus\n- **Frontend Development**: React, Next.js, Tailwind CSS\n- **Backend Engineering**: Node.js, REST APIs, PostgreSQL\n- **Design & Architecture**: Designing data schemas and modular code structures\n\nFeel free to interact with my project board to explore my background!`,
    thumbnail_url: null,
    is_pinned: true,
    is_visible: true,
    created_at: null,
    updated_at: null,
    metadata: {},
    tags: [tagMap.get('typescript')!, tagMap.get('react')!, tagMap.get('nextjs')!].filter(Boolean),
    links: []
  },
  // Experience card (Tachlog)
  {
    id: 'card-exp',
    column_id: 'col-2',
    card_type: 'experience',
    position: 0,
    title: 'Full-Stack Developer Intern',
    subtitle: 'Tachlog Pvt Ltd',
    date_start: '2025-05-15',
    date_end: '2025-08-15',
    preview_text: 'Gained extensive knowledge in creating applications, designing components, and architecting database backends.',
    full_content: `## Internship at Tachlog Pvt Ltd\n\nDuring my internship, I worked as a Full-Stack Developer where I participated in building web applications from scratch.\n\n### Key Learnings & Tasks\n- **Application Architecture**: Learned how to structure modular frontend routes and separate logic into clean services.\n- **Backend & Database**: Wrote SQL queries, designed relational schemas in PostgreSQL, and set up REST API endpoints using Express.\n- **Frontend Build**: Developed interactive, responsive dashboards using React and Tailwind CSS.\n- **Version Control**: Practiced Git workflows, code reviews, and basic package management.`,
    thumbnail_url: null,
    is_pinned: false,
    is_visible: true,
    created_at: null,
    updated_at: null,
    metadata: { skills_learned: ["Express", "PostgreSQL", "React", "Architecture"] },
    tags: [tagMap.get('react')!, tagMap.get('nodejs')!, tagMap.get('postgresql')!].filter(Boolean),
    links: []
  },
  // Projects
  {
    id: 'card-proj-1',
    column_id: 'col-3',
    card_type: 'project',
    position: 0,
    title: 'Cinematic Interactive Portfolio',
    subtitle: 'Next.js + Supabase Portfolio',
    date_start: null,
    date_end: null,
    preview_text: 'An interactive board-style portfolio styled with dark room aesthetics, canvas particles, a custom cursor, and Supabase integration.',
    full_content: `# Cinematic Interactive Portfolio\n\nThis very website! A digital resume presented as an interactive board layout.\n\n## Tech Stack\n- **Framework**: Next.js 14 (App Router)\n- **Database**: Supabase (PostgreSQL + real-time reactions)\n- **Animations**: Framer Motion for board layouts and hover transitions\n- **Aesthetics**: Custom HTML5 canvas particle background, custom cursor, and monochrome spatial HUD elements.`,
    thumbnail_url: null,
    is_pinned: true,
    is_visible: true,
    created_at: null,
    updated_at: null,
    metadata: {},
    tags: [tagMap.get('nextjs')!, tagMap.get('supabase-db')!, tagMap.get('tailwindcss')!].filter(Boolean),
    links: [
      { id: 'link-1', card_id: 'card-proj-1', label: 'GitHub', url: 'https://github.com/advaith-renjith-2004/advaith_portfolio', link_type: 'github', position: 0, created_at: '' }
    ]
  },
  {
    id: 'card-proj-2',
    column_id: 'col-3',
    card_type: 'project',
    position: 1,
    title: 'Legal Reference Recall System',
    subtitle: 'RAG Context Retrieval Engine',
    date_start: null,
    date_end: null,
    preview_text: 'A semantic retrieval project exploring legal context chunking, vector indexing, and reranking to solve legal document retrieval bottlenecks.',
    full_content: `# Legal Reference Recall System\n\nInspired by Natural Language Processing and information retrieval research.\n\n## Features\n- **Semantic Indexing**: Breaks down large legal documents into coherent text passages.\n- **Contextual Search**: Utilizes embeddings and cosine similarity to match legal reference queries.\n- **Clean Schema**: Structured API endpoints for quick queries.`,
    thumbnail_url: null,
    is_pinned: false,
    is_visible: true,
    created_at: null,
    updated_at: null,
    metadata: {},
    tags: [tagMap.get('python')!].filter(Boolean),
    links: []
  },
  // Skills
  {
    id: 'card-skill-1',
    column_id: 'col-4',
    card_type: 'skill',
    position: 0,
    title: 'Frontend & UI Development',
    subtitle: 'React, Next.js, Tailwind CSS',
    date_start: null,
    date_end: null,
    preview_text: 'Building clean, modern, and interactive interfaces with responsive grids.',
    full_content: `## Frontend Competencies\n\n- **React / Next.js**: Component lifecycle, hooks, page routing.\n- **Styling**: Tailwind CSS, CSS Flexbox/Grid, responsive styles.\n- **State Management**: Zustand and React Context.`,
    thumbnail_url: null,
    is_pinned: false,
    is_visible: true,
    created_at: null,
    updated_at: null,
    metadata: {},
    tags: [],
    links: []
  },
  {
    id: 'card-skill-2',
    column_id: 'col-4',
    card_type: 'skill',
    position: 1,
    title: 'Backend & Databases',
    subtitle: 'Node.js, PostgreSQL, Supabase',
    date_start: null,
    date_end: null,
    preview_text: 'Writing API servers, designing relational database tables, and implementing RLS policies.',
    full_content: `## Backend Competencies\n\n- **Node.js + Express**: Building server logic and routing endpoints.\n- **PostgreSQL / SQL**: Structuring relational tables, indexing, and foreign key relations.\n- **Supabase**: Relational storage, database clients, and authentication middleware.`,
    thumbnail_url: null,
    is_pinned: false,
    is_visible: true,
    created_at: null,
    updated_at: null,
    metadata: {},
    tags: [],
    links: []
  },
  {
    id: 'card-skill-3',
    column_id: 'col-4',
    card_type: 'skill',
    position: 2,
    title: 'Development Tools',
    subtitle: 'Git, GitHub, Docker',
    date_start: null,
    date_end: null,
    preview_text: 'Version control, package management, and basic containerization.',
    full_content: `## Tools & Workflows\n\n- **Git & GitHub**: Branching, commits, pull requests, and version history.\n- **VS Code**: Custom workspace setups and extensions.\n- **Docker**: Basic containerization of web applications.`,
    thumbnail_url: null,
    is_pinned: false,
    is_visible: true,
    created_at: null,
    updated_at: null,
    metadata: {},
    tags: [],
    links: []
  },
  // Education
  {
    id: 'card-edu',
    column_id: 'col-5',
    card_type: 'education',
    position: 0,
    title: 'B.Tech in Computer Science',
    subtitle: 'Engineering College (MBCET)',
    date_start: '2023-09-01',
    date_end: '2027-06-30',
    preview_text: 'Going to final year in CS. Focusing on algorithms, software architecture, and web systems.',
    full_content: `## Bachelor of Technology in Computer Science & Engineering\n\n- **Status**: Entering Final Year (Current student)\n- **Key Coursework**: Data Structures, Design & Analysis of Algorithms, Database Management Systems, Software Engineering, Operating Systems.\n- **Activities**: Technical clubs, coding workshops, magazine editing, and internship integrations.`,
    thumbnail_url: null,
    is_pinned: false,
    is_visible: true,
    created_at: null,
    updated_at: null,
    metadata: {},
    tags: [],
    links: []
  }
]
