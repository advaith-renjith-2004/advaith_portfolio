'use client'

import { useMemo, useState, useEffect } from 'react'
import Fuse, { type IFuseOptions } from 'fuse.js'
import type { Column as ColumnType, CardWithRelations, Tag, ProfileData } from '@/types'
import { StatusBand } from '@/components/ui/StatusBand'
import { SkillsMarquee } from '@/components/ui/SkillsMarquee'
import { BoardFilters } from './filters/BoardFilters'
import { useFilterState } from '@/hooks/useFilterState'
import { motion } from 'framer-motion'
import { 
  Github, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Globe, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  FolderGit2,
  Linkedin,
  Copy,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CardTags } from './CardTags'
import { CardDateRange } from './CardDateRange'
import { CardReactions } from './CardReactions'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks'

const fuseOptions: IFuseOptions<CardWithRelations & { tagNames: string }> = {
  keys: ['title', 'subtitle', 'preview_text', 'full_content', 'tagNames'],
  threshold: 0.4,
  ignoreLocation: true,
}

interface BoardProps {
  columns: ColumnType[]
  cards: CardWithRelations[]
  tags: Tag[]
  profileData: ProfileData | null
  isLoading?: boolean
  onCardClick?: (cardId: string) => void
}

export function Board({
  columns,
  cards,
  tags,
  profileData,
  isLoading = false,
  onCardClick,
}: BoardProps) {
  const [viewMode, setViewMode] = useState<'horizontal' | 'vertical'>('vertical')
  const [emailCopied, setEmailCopied] = useState(false)
  const isMobile = useIsMobile()

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-view-mode')
    if (saved === 'horizontal' || saved === 'vertical') {
      setViewMode(saved)
    }
  }, [])

  const handleViewModeChange = (mode: 'horizontal' | 'vertical') => {
    setViewMode(mode)
    localStorage.setItem('portfolio-view-mode', mode)
  }

  const handleCopyEmail = async (email: string) => {
    await navigator.clipboard.writeText(email)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const {
    activeTagFilters,
    activeTypeFilters,
    searchQuery,
    setTagFilters,
    setTypeFilters,
    setSearchQuery,
    clearFilters,
  } = useFilterState()

  // Create searchable card data
  const searchableCards = useMemo(
    () =>
      cards.map((card) => ({
        ...card,
        tagNames: card.tags.map((t) => t.name).join(' '),
      })),
    [cards]
  )

  // Get fuzzy search matches
  const fuzzyMatchIds = useMemo(() => {
    if (!searchQuery) return null
    const fuse = new Fuse(searchableCards, fuseOptions)
    return new Set(fuse.search(searchQuery).map((r) => r.item.id))
  }, [searchableCards, searchQuery])

  // Filter cards
  const filteredCards = cards.filter((card) => {
    if (activeTypeFilters.length > 0 && !activeTypeFilters.includes(card.card_type)) {
      return false
    }
    if (activeTagFilters.length > 0) {
      const cardTagSlugs = card.tags.map((t) => t.slug)
      if (!activeTagFilters.every((tag) => cardTagSlugs.includes(tag))) {
        return false
      }
    }
    if (fuzzyMatchIds && !fuzzyMatchIds.has(card.id)) {
      return false
    }
    return true
  })

  // Group cards by type
  const experienceCards = useMemo(() => cards.filter(c => c.card_type === 'experience'), [cards])
  const educationCards = useMemo(() => cards.filter(c => c.card_type === 'education'), [cards])
  const projectCards = useMemo(() => cards.filter(c => c.card_type === 'project'), [cards])
  const skillCards = useMemo(() => cards.filter(c => c.card_type === 'skill'), [cards])

  const filteredProjectCards = useMemo(() => filteredCards.filter(c => c.card_type === 'project'), [filteredCards])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-lg font-mono text-muted-foreground animate-pulse">Loading System...</div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-transparent text-foreground relative selection:bg-primary/20">
      
      {/* 1. STATUS BAND & SKILLS MARQUEE */}
      <StatusBand />
      <SkillsMarquee />

      {/* MAIN CONTAINER */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24 sm:space-y-36">

        {/* 2. HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh] pt-6">
          {/* Left Hero Details */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-6 sm:gap-8 order-2 lg:order-1">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                * STUDENT PORTFOLIO & DEVELOPMENT LOG *
              </span>
              <p className="text-[14px] md:text-[15.5px] text-muted-foreground font-mono leading-relaxed max-w-lg">
                Not just compiling code – how the architecture flows, structures, and executes under load.
              </p>
            </div>

            <h1 className="text-[3.8rem] sm:text-[5.5rem] md:text-[6.8rem] lg:text-[7.8rem] leading-[0.88] font-bold font-serif text-foreground tracking-tighter">
              Advaith<br />
              <span className="text-primary">Renjith</span>
            </h1>

            {/* Role & Institution Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-border/80 pt-6 max-w-lg">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary/90 font-mono">Role</span>
                <p className="text-[16px] md:text-[17px] font-bold text-foreground mt-1">{profileData?.title || 'Full-Stack Developer & App Architect'}</p>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary/90 font-mono">Institution</span>
                <p className="text-[16px] md:text-[17px] font-bold text-foreground mt-1">Mar Baselios College (MBCET)</p>
              </div>
            </div>

            {/* Social Icons & Call to Action */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                {profileData?.email && (
                  <button
                    onClick={() => handleCopyEmail(profileData.email)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card/45 hover:border-primary hover:text-primary transition-all duration-300 relative group"
                    title="Copy Email"
                  >
                    {emailCopied ? <Check className="h-[18px] w-[18px] text-green-600" /> : <Mail className="h-[18px] w-[18px]" />}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-mono bg-popover border text-popover-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {emailCopied ? 'Copied!' : 'Copy Email'}
                    </span>
                  </button>
                )}
                {profileData?.socialLinks.github && (
                  <a
                    href={profileData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card/45 hover:border-primary hover:text-primary transition-all duration-300"
                    title="GitHub Profile"
                  >
                    <Github className="h-[18px] w-[18px]" />
                  </a>
                )}
                {profileData?.socialLinks.linkedin && (
                  <a
                    href={profileData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card/45 hover:border-primary hover:text-primary transition-all duration-300"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="h-[18px] w-[18px]" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-3 text-[14.5px] border-l border-border/80 pl-4">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="font-mono text-muted-foreground">{profileData?.location || 'Trivandrum, India'}</span>
              </div>
            </div>
          </div>

          {/* Right Hero Photo Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-[280px] sm:w-[320px] lg:w-[340px] aspect-[3/4] border-2 border-primary/20 rounded-2xl overflow-hidden p-2 bg-card/40 backdrop-blur-sm group hover:border-primary/50 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <img
                src={profileData?.profileImageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                alt={profileData?.name || 'Advaith Renjith'}
                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 contrast-105 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* 3. PHILOSOPHY & SKILLS SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8 border-t border-border/60">
          {/* Philosophy Statement */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground tracking-tight leading-tight">
              Hardware is concrete. Software is alive. Everything else is systems.
            </h2>
            <div className="text-[16px] md:text-[17.5px] leading-relaxed text-foreground/80 space-y-4 font-sans max-w-xl">
              <p>
                I am a final-year **Electrical and Computer Engineering** student going into my senior year at Mar Baselios College of Engineering and Technology. I enjoy coding, designing clean UI layouts, and structuring robust application architectures.
              </p>
              <p>
                My core interest lies at the boundary of hardware systems and scalable modern web layers—understanding how digital electronics microprocessors feed telemetry, and building the web interfaces and databases that coordinate them.
              </p>
              <p>
                During my internship at **Tachlog Pvt Ltd**, I gained extensive hands-on experience structuring modular full-stack projects, writing SQL databases, and setting up REST APIs.
              </p>
            </div>
          </div>

          {/* Core Skills outlines (Right Column) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold mb-2">
              {"// Core Competencies & Skills"}
            </span>
            {skillCards.map((skill) => (
              <div
                key={skill.id}
                onClick={() => onCardClick?.(skill.id)}
                className="group border border-border/80 bg-card/25 hover:bg-card/45 hover:border-primary/45 rounded-xl p-5 backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[17px] font-bold text-foreground group-hover:text-primary transition-colors">
                      {skill.title}
                    </h3>
                    <p className="text-[14px] text-primary/80 font-medium mt-0.5">{skill.subtitle}</p>
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground/60 group-hover:text-primary transition-colors">
                    EXPLORE →
                  </span>
                </div>
                <p className="text-[14.5px] text-muted-foreground/85 mt-2.5 leading-relaxed">
                  {skill.preview_text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PROJECTS / SHOWCASE ACCLAIMS */}
        <section className="space-y-8 pt-8 border-t border-border/60">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              * THE REPOSITORIES AND THE CREATIONS *
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground">
              GitHub Works & Software builds
            </h2>
          </div>

          {/* Dynamic Board Filters (Embedded inside layout!) */}
          <BoardFilters
            tags={tags}
            activeTagFilters={activeTagFilters}
            activeTypeFilters={activeTypeFilters}
            searchQuery={searchQuery}
            onTagFilterChange={setTagFilters}
            onTypeFilterChange={setTypeFilters}
            onSearchChange={setSearchQuery}
            onClearFilters={clearFilters}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />

          {/* Projects Outlined Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjectCards.map((project) => (
              <div
                key={project.id}
                onClick={() => onCardClick?.(project.id)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card/25 hover:bg-card/45 hover:border-primary/45 p-6 backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <FolderGit2 className="h-5 w-5 text-primary" />
                    <span className="font-mono text-[10.5px] font-semibold text-muted-foreground/60 uppercase group-hover:text-primary transition-colors">
                      Repo Details →
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-[18px] font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-[13.5px] font-semibold text-primary/90 font-mono tracking-tight">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-[14.5px] leading-relaxed text-foreground/80">
                    {project.preview_text}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border/40 flex flex-col gap-3">
                  <CardTags tags={project.tags} maxVisible={3} />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <CardReactions
                      reactions={{
                        thumbsup: 0,
                        fire: 0,
                        eyes: 0,
                        lightbulb: 0,
                        ...((project as any).reactions_by_type || {}),
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            {filteredProjectCards.length === 0 && (
              <div className="col-span-full border-2 border-dashed border-border rounded-xl py-12 text-center text-muted-foreground">
                No matching repositories found. Clear your search or filters.
              </div>
            )}
          </div>
        </section>

        {/* 5. EXPERIENCE & EDUCATION TIMELINE (TRAJECTORY) */}
        <section className="space-y-12 pt-8 border-t border-border/60 pb-16">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              EXPERIENCE & ACADEMICS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground">
              The trajectory.
            </h2>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l-2 border-primary/20 ml-4 md:ml-6 pl-6 sm:pl-8 space-y-12">
            
            {/* Timeline Experience Node (Tachlog Internship) */}
            {experienceCards.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Connector Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-all duration-300" />
                
                <div 
                  onClick={() => onCardClick?.(exp.id)}
                  className="border border-border/80 bg-card/25 hover:bg-card/45 hover:border-primary/45 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-sm max-w-3xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="h-[18px] w-[18px] text-primary shrink-0" />
                      <div>
                        <h3 className="text-[18px] font-bold text-foreground group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-[14.5px] font-semibold text-primary/95">{exp.subtitle}</p>
                      </div>
                    </div>
                    {exp.date_start && (
                      <CardDateRange startDate={exp.date_start} endDate={exp.date_end} className="self-start sm:self-center" />
                    )}
                  </div>

                  <p className="text-[15.5px] leading-relaxed text-foreground/80">
                    {exp.preview_text}
                  </p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <CardTags tags={exp.tags} />
                    <span className="font-mono text-xs text-primary/80 group-hover:underline">VIEW DETAIL →</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Timeline Education Node (Mar Baselios College) */}
            {educationCards.map((edu) => (
              <div key={edu.id} className="relative group">
                {/* Connector Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-all duration-300" />

                <div 
                  onClick={() => onCardClick?.(edu.id)}
                  className="border border-border/80 bg-card/25 hover:bg-card/45 hover:border-primary/45 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-sm max-w-3xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="h-[18px] w-[18px] text-primary shrink-0" />
                      <div>
                        <h3 className="text-[18px] font-bold text-foreground group-hover:text-primary transition-colors">
                          {edu.title}
                        </h3>
                        <p className="text-[14.5px] font-semibold text-primary/95">{edu.subtitle}</p>
                      </div>
                    </div>
                    {edu.date_start && (
                      <CardDateRange startDate={edu.date_start} endDate={edu.date_end} className="self-start sm:self-center" />
                    )}
                  </div>

                  <p className="text-[15.5px] leading-relaxed text-foreground/80">
                    {edu.preview_text}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <CardTags tags={edu.tags} />
                    <span className="font-mono text-xs text-primary/80 group-hover:underline">VIEW DETAIL →</span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </section>

      </div>

    </div>
  )
}
