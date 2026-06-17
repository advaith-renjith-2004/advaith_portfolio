import { useMemo } from 'react'
import Fuse, { type IFuseOptions } from 'fuse.js'
import { AboutPanel } from './AboutPanel'
import { Column } from './Column'
import { BoardSkeleton } from './BoardSkeleton'
import type { Column as ColumnType, CardWithRelations, Tag, ProfileData } from '@/types'
import { StatusBand } from '@/components/ui/StatusBand'
import { SkillsMarquee } from '@/components/ui/SkillsMarquee'

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
    <div className="flex h-full w-full flex-col overflow-hidden">
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
      />

      <div className="columns-scroll-container flex flex-1 flex-col gap-4 overflow-y-auto p-3 md:flex-row md:gap-6 md:overflow-x-auto md:overflow-y-hidden md:p-6">
        {/* Fixed/Sticky About Panel */}
        {profileData && <AboutPanel {...profileData} />}

        {/* Columns Container - Vertical on mobile, horizontal scroll on desktop */}
        <div className="flex-1 md:overflow-x-auto md:overflow-y-hidden">
          <div className="flex flex-col gap-4 pb-2 md:h-full md:min-w-full md:flex-row md:pb-4">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                cards={filteredCards.filter((c) => c.column_id === column.id)}
                onCardClick={onCardClick}
              />
            ))}

            {/* Spacer for right padding in scroll view */}
            <div className="w-2 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
