import { useMemo, useState, useEffect } from 'react'
import Fuse, { type IFuseOptions } from 'fuse.js'
import { AboutPanel } from './AboutPanel'
import { Column } from './Column'
import { BoardSkeleton } from './BoardSkeleton'
import type { Column as ColumnType, CardWithRelations, Tag, ProfileData } from '@/types'
import { StatusBand } from '@/components/ui/StatusBand'
import { SkillsMarquee } from '@/components/ui/SkillsMarquee'
import { cn } from '@/lib/utils'

// Fuse.js configuration for fuzzy search
const fuseOptions: IFuseOptions<CardWithRelations & { tagNames: string }> = {
  keys: ['title', 'subtitle', 'preview_text', 'full_content', 'tagNames'],
  threshold: 0.4, // Moderate fuzziness
  ignoreLocation: true, // Search anywhere in string
}

interface BoardProps {
  columns: ColumnType[]
  cards: CardWithRelations[]
  tags: Tag[]
  profileData: ProfileData | null
  isLoading?: boolean
  onCardClick?: (cardId: string) => void
}

import { useFilterState } from '@/hooks/useFilterState'
import { BoardFilters } from './filters/BoardFilters'

// ... existing imports

export function Board({
  columns,
  cards,
  tags,
  profileData,
  isLoading = false,
  onCardClick,
}: BoardProps) {
  const [viewMode, setViewMode] = useState<'horizontal' | 'vertical'>('vertical')

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

  const {
    activeTagFilters,
    activeTypeFilters,
    searchQuery,
    setTagFilters,
    setTypeFilters,
    setSearchQuery,
    clearFilters,
  } = useFilterState()

  // Create searchable card data with flattened tag names
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

  if (isLoading) {
    return <BoardSkeleton />
  }

  // Filter cards logic
  const filteredCards = cards.filter((card) => {
    // Type filter (OR)
    if (activeTypeFilters.length > 0 && !activeTypeFilters.includes(card.card_type)) {
      return false
    }

    // Tag filter (AND)
    if (activeTagFilters.length > 0) {
      const cardTagSlugs = card.tags.map((t) => t.slug)
      if (!activeTagFilters.every((tag) => cardTagSlugs.includes(tag))) {
        return false
      }
    }

    // Fuzzy search filter
    if (fuzzyMatchIds && !fuzzyMatchIds.has(card.id)) {
      return false
    }

    return true
  })

  return (
    <div className="flex w-full flex-col">
      {/* Status Band */}
      <StatusBand />

      {/* Skills Marquee */}
      <SkillsMarquee />

      {/* Filters Bar */}
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

      <div className={cn(
        "columns-scroll-container flex flex-col gap-4 p-3 md:flex-row md:gap-6 md:p-6",
        viewMode === 'horizontal' ? "md:overflow-x-auto md:overflow-y-hidden md:h-[calc(100vh-220px)]" : "overflow-y-visible"
      )}>
        {/* Fixed/Sticky About Panel */}
        {profileData && <AboutPanel {...profileData} />}

        {/* Columns Container */}
        <div className={cn(
          "flex-1",
          viewMode === 'horizontal' && "md:overflow-x-auto md:overflow-y-hidden"
        )}>
          <div className={cn(
            "flex flex-col gap-4 pb-2",
            viewMode === 'horizontal'
              ? "md:h-full md:min-w-full md:flex-row md:pb-4"
              : "w-full md:gap-8 pb-4"
          )}>
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                cards={filteredCards.filter((c) => c.column_id === column.id)}
                onCardClick={onCardClick}
                isVertical={viewMode === 'vertical'}
              />
            ))}

            {/* Spacer for right padding in scroll view */}
            {viewMode === 'horizontal' && <div className="w-2 shrink-0" />}
          </div>
        </div>
      </div>
    </div>
  )
}
