import { SearchInput } from './SearchInput'
import { TypeFilter } from './TypeFilter'
import { TagFilter } from './TagFilter'
import { Button } from '@/components/ui/Button'
import { X, List, Kanban } from 'lucide-react'
import type { CardType, Tag } from '@/types'
import { cn } from '@/lib/utils'

interface BoardFiltersProps {
  tags: Tag[]
  activeTagFilters: string[]
  activeTypeFilters: CardType[]
  searchQuery: string
  onTagFilterChange: (tags: string[]) => void
  onTypeFilterChange: (types: CardType[]) => void
  onSearchChange: (query: string) => void
  onClearFilters: () => void
  viewMode: 'horizontal' | 'vertical'
  onViewModeChange: (mode: 'horizontal' | 'vertical') => void
}

export function BoardFilters({
  tags,
  activeTagFilters,
  activeTypeFilters,
  searchQuery,
  onTagFilterChange,
  onTypeFilterChange,
  onSearchChange,
  onClearFilters,
  viewMode,
  onViewModeChange,
}: BoardFiltersProps) {
  const hasActiveFilters =
    activeTagFilters.length > 0 || activeTypeFilters.length > 0 || searchQuery.length > 0

  return (
    <div className="sticky top-0 z-30 w-full border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
          {/* Search */}
          <SearchInput value={searchQuery} onChange={onSearchChange} />

          {/* Type Filter */}
          <TypeFilter activeTypes={activeTypeFilters} onChange={onTypeFilterChange} />

          {/* Divider (Desktop) */}
          <div className="hidden h-6 w-px bg-border md:block" />

          {/* Tag Filters */}
          <div className="min-w-0 flex-1">
            <TagFilter tags={tags} activeTags={activeTagFilters} onChange={onTagFilterChange} />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center rounded-lg border border-white/5 bg-zinc-950/40 p-0.5 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => onViewModeChange('vertical')}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200",
                viewMode === 'vertical'
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Vertical List View"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('horizontal')}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200",
                viewMode === 'horizontal'
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Horizontal Board View"
            >
              <Kanban className="h-4 w-4" />
            </button>
          </div>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-9 shrink-0 gap-2 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
