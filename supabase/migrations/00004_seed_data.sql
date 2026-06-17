-- ============================================================================
-- Migration 00004: Seed Data
-- Description: Seeding data customized for Advaith Renjith.
-- ============================================================================

-- ============================================================================
-- PERSONAL INFO
-- ============================================================================

INSERT INTO public.personal_info (id, full_name, title, email, phone, linkedin_url, location, professional_summary, profile_image_url, github_url, resume_url) VALUES
    (
        1,
        'Advaith Renjith',
        'Full-Stack Developer & App Architect',
        'advaithrenjith2004@gmail.com',
        NULL,
        'https://linkedin.com/in/advaith-renjith',
        'Trivandrum, India',
        'Final-year Computer Science student specializing in building responsive web applications and designing robust application architectures. Gained extensive hands-on experience in modern frontend development, REST APIs, and database design during my internship at Tachlog Pvt Ltd.',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        'https://github.com/advaith-renjith-2004',
        NULL
    )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- COLUMNS
-- ============================================================================

INSERT INTO columns (id, title, slug, position, is_visible) VALUES
    ('11111111-1111-1111-1111-111111111111', 'About', 'about', 0, true),
    ('22222222-2222-2222-2222-222222222222', 'Experience', 'experience', 1, true),
    ('33333333-3333-3333-3333-333333333333', 'Projects', 'projects', 2, true),
    ('44444444-4444-4444-4444-444444444444', 'Skills', 'skills', 3, true),
    ('55555555-5555-5555-5555-555555555555', 'Education', 'education', 4, true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- TAGS
-- ============================================================================

INSERT INTO tags (id, name, slug, category, color) VALUES
    -- Languages
    ('a1111111-1111-1111-1111-111111111111', 'TypeScript', 'typescript', 'language', '#3178C6'),
    ('a2222222-2222-2222-2222-222222222222', 'JavaScript', 'javascript', 'language', '#F7DF1E'),
    ('a3333333-3333-3333-3333-333333333333', 'Python', 'python', 'language', '#3776AB'),
    ('a4444444-4444-4444-4444-444444444444', 'Go', 'go', 'language', '#00ADD8'),
    ('a5555555-5555-5555-5555-555555555555', 'HTML/CSS', 'html-css', 'language', '#E34F26'),

    -- Frameworks
    ('b1111111-1111-1111-1111-111111111111', 'React', 'react', 'framework', '#61DAFB'),
    ('b2222222-2222-2222-2222-222222222222', 'Next.js', 'nextjs', 'framework', '#000000'),
    ('b3333333-3333-3333-3333-333333333333', 'Node.js', 'nodejs', 'framework', '#339933'),
    ('b4444444-4444-4444-4444-444444444444', 'FastAPI', 'fastapi', 'framework', '#009688'),
    ('b5555555-5555-5555-5555-555555555555', 'Tailwind CSS', 'tailwindcss', 'framework', '#06B6D4'),

    -- Databases
    ('c1111111-1111-1111-1111-111111111111', 'PostgreSQL', 'postgresql', 'database', '#4169E1'),
    ('c2222222-2222-2222-2222-222222222222', 'SQLite', 'sqlite', 'database', '#003B57'),
    ('c3333333-3333-3333-3333-333333333333', 'Supabase', 'supabase-db', 'database', '#3FCF8E'),

    -- Tools
    ('d1111111-1111-1111-1111-111111111111', 'Docker', 'docker', 'tool', '#2496ED'),
    ('d2222222-2222-2222-2222-222222222222', 'Git', 'git', 'tool', '#F05032'),
    ('d3333333-3333-3333-3333-333333333333', 'VS Code', 'vscode', 'tool', '#007ACC'),

    -- Concepts
    ('f1111111-1111-1111-1111-111111111111', 'REST APIs', 'rest-apis', 'concept', '#6366F1'),
    ('f2222222-2222-2222-2222-222222222222', 'App Architecture', 'app-architecture', 'concept', '#8B5CF6'),
    ('f3333333-3333-3333-3333-333333333333', 'RAG / AI Search', 'rag-ai-search', 'concept', '#00E676')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- CARDS - About Column
-- ============================================================================

INSERT INTO cards (id, column_id, card_type, position, title, subtitle, preview_text, full_content, is_pinned) VALUES
    (
        'ca111111-1111-1111-1111-111111111111',
        '11111111-1111-1111-1111-111111111111',
        'about',
        0,
        'Welcome to My Portfolio',
        'College Student & Dev',
        'Final-year Computer Science student interested in Web Development and Application Architecture.',
        E'# About Me\n\nI''m a passionate final-year Computer Science student going into my senior year. I enjoy coding, designing clean UI layouts, and structuring robust application backends. \n\n## My Journey\n- **Internship at Tachlog Pvt Ltd**: Gained hands-on experience building web apps and understanding end-to-end application architecture.\n- **B.Tech Studies**: Currently focusing on software engineering, database design, and systems.\n\n## Areas of Focus\n- **Frontend Development**: React, Next.js, Tailwind CSS\n- **Backend Engineering**: Node.js, REST APIs, PostgreSQL\n- **Design & Architecture**: Designing data schemas and modular code structures\n\nFeel free to interact with my Kanban board to explore my background!',
        true
    )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- CARDS - Experience Column
-- ============================================================================

INSERT INTO cards (id, column_id, card_type, position, title, subtitle, date_start, date_end, preview_text, full_content, metadata) VALUES
    (
        'ca222222-1111-1111-1111-111111111111',
        '22222222-2222-2222-2222-222222222222',
        'experience',
        0,
        'Full-Stack Developer Intern',
        'Tachlog Pvt Ltd',
        '2025-05-15',
        '2025-08-15',
        'Gained extensive knowledge in creating applications, designing components, and architecting database backends.',
        E'## Internship at Tachlog Pvt Ltd\n\nDuring my internship, I worked as a Full-Stack Developer where I participated in building web applications from scratch.\n\n### Key Learnings & Tasks\n- **Application Architecture**: Learned how to structure modular frontend routes and separate logic into clean services.\n- **Backend & Database**: Wrote SQL queries, designed relational schemas in PostgreSQL, and set up REST API endpoints using Express.\n- **Frontend Build**: Developed interactive, responsive dashboards using React and Tailwind CSS.\n- **Version Control**: Practiced Git workflows, code reviews, and basic package management.',
        '{"company_size": "10-50", "skills_learned": ["Express", "PostgreSQL", "React", "Architecture"]}'::jsonb
    )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- CARDS - Projects Column
-- ============================================================================

INSERT INTO cards (id, column_id, card_type, position, title, subtitle, preview_text, full_content, thumbnail_url, is_pinned) VALUES
    (
        'ca333333-1111-1111-1111-111111111111',
        '33333333-3333-3333-3333-333333333333',
        'project',
        0,
        'Cinematic Kanban Resume',
        'Next.js + Supabase Portfolio',
        'An interactive Kanban board portfolio styled with dark room aesthetics, canvas particles, a custom cursor, and Supabase integration.',
        E'# Cinematic Kanban Resume\n\nThis very website! A digital resume presented as an interactive Kanban board.\n\n## Tech Stack\n- **Framework**: Next.js 14 (App Router)\n- **Database**: Supabase (PostgreSQL + real-time reactions)\n- **Animations**: Framer Motion for board layouts and hover transitions\n- **Aesthetics**: Custom HTML5 canvas particle background, custom cursor, and monochrome spatial HUD elements.',
        NULL,
        true
    ),
    (
        'ca333333-2222-2222-2222-222222222222',
        '33333333-3333-3333-3333-333333333333',
        'project',
        1,
        'Legal Reference Recall System',
        'RAG Context Retrieval Engine',
        'A semantic retrieval project exploring legal context chunking, vector indexing, and reranking to solve legal document retrieval bottlenecks.',
        E'# Legal Reference Recall System\n\nInspired by Natural Language Processing and information retrieval research.\n\n## Features\n- **Semantic Indexing**: Breaks down large legal documents into coherent text passages.\n- **Contextual Search**: Utilizes embeddings and cosine similarity to match legal reference queries.\n- **Clean Schema**: Structured API endpoints for quick queries.',
        NULL,
        false
    )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- CARDS - Skills Column
-- ============================================================================

INSERT INTO cards (id, column_id, card_type, position, title, subtitle, preview_text, full_content) VALUES
    (
        'ca444444-1111-1111-1111-111111111111',
        '44444444-4444-4444-4444-444444444444',
        'skill',
        0,
        'Frontend & UI Development',
        'React, Next.js, Tailwind CSS',
        'Building clean, modern, and interactive interfaces with responsive grids.',
        E'## Frontend Competencies\n\n- **React / Next.js**: Component lifecycle, hooks, page routing.\n- **Styling**: Tailwind CSS, CSS Flexbox/Grid, responsive styles.\n- **State Management**: Zustand and React Context.'
    ),
    (
        'ca444444-2222-2222-2222-222222222222',
        '44444444-4444-4444-4444-444444444444',
        'skill',
        1,
        'Backend & Databases',
        'Node.js, PostgreSQL, Supabase',
        'Writing API servers, designing relational database tables, and implementing RLS policies.',
        E'## Backend Competencies\n\n- **Node.js + Express**: Building server logic and routing endpoints.\n- **PostgreSQL / SQL**: Structuring relational tables, indexing, and foreign key relations.\n- **Supabase**: Relational storage, database clients, and authentication middleware.'
    ),
    (
        'ca444444-3333-3333-3333-333333333333',
        '44444444-4444-4444-4444-444444444444',
        'skill',
        2,
        'Development Tools',
        'Git, GitHub, Docker',
        'Version control, package management, and basic containerization.',
        E'## Tools & Workflows\n\n- **Git & GitHub**: Branching, commits, pull requests, and version history.\n- **VS Code**: Custom workspace setups and extensions.\n- **Docker**: Basic containerization of web applications.'
    )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- CARDS - Education Column
-- ============================================================================

INSERT INTO cards (id, column_id, card_type, position, title, subtitle, date_start, date_end, preview_text, full_content) VALUES
    (
        'ca555555-1111-1111-1111-111111111111',
        '55555555-5555-5555-5555-555555555555',
        'education',
        0,
        'B.Tech in Computer Science',
        'Engineering College (MBCET)',
        '2023-09-01',
        '2027-06-30',
        'Going to final year in CS. Focusing on algorithms, software architecture, and web systems.',
        E'## Bachelor of Technology in Computer Science & Engineering\n\n- **Status**: Entering Final Year (Current student)\n- **Key Coursework**: Data Structures, Design & Analysis of Algorithms, Database Management Systems, Software Engineering, Operating Systems.\n- **Activities**: Technical clubs, coding workshops, magazine editing, and internship integrations.'
    )
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- CARD_TAGS - Associations
-- ============================================================================

INSERT INTO card_tags (card_id, tag_id) VALUES
    -- About card
    ('ca111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111'), -- TypeScript
    ('ca111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111'), -- React
    ('ca111111-1111-1111-1111-111111111111', 'b2222222-2222-2222-2222-222222222222'), -- Next.js
    
    -- Experience card (Tachlog)
    ('ca222222-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111'), -- React
    ('ca222222-1111-1111-1111-111111111111', 'b3333333-3333-3333-3333-333333333333'), -- Node.js
    ('ca222222-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111'), -- PostgreSQL
    ('ca222222-1111-1111-1111-111111111111', 'f2222222-2222-2222-2222-222222222222'), -- App Architecture

    -- Project 1 (Kanban Portfolio)
    ('ca333333-1111-1111-1111-111111111111', 'b2222222-2222-2222-2222-222222222222'), -- Next.js
    ('ca333333-1111-1111-1111-111111111111', 'c3333333-3333-3333-3333-333333333333'), -- Supabase
    ('ca333333-1111-1111-1111-111111111111', 'b5555555-5555-5555-5555-555555555555'), -- Tailwind CSS

    -- Project 2 (Legal Search)
    ('ca333333-2222-2222-2222-222222222222', 'a3333333-3333-3333-3333-333333333333'), -- Python
    ('ca333333-2222-2222-2222-222222222222', 'f3333333-3333-3333-3333-333333333333')  -- RAG
ON CONFLICT (card_id, tag_id) DO NOTHING;

-- ============================================================================
-- LINKS - Project Cards
-- ============================================================================

INSERT INTO links (id, card_id, label, url, link_type, position) VALUES
    ('11111111-1111-1111-1111-111111111111', 'ca333333-1111-1111-1111-111111111111', 'GitHub', 'https://github.com/advaith-renjith-2004/advaith_portfolio', 'github', 0)
ON CONFLICT (id) DO NOTHING;
