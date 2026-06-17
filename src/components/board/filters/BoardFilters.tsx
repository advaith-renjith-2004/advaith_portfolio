import { SearchInput } from './SearchInput'
import { TypeFilter } from './TypeFilter'
import { TagFilter } from './TagFilter'
import { Button } from '@/components/ui/Button'
import { X } from 'lucide-react'
import type { CardType, Tag } from '@/types'

interface BoardFiltersProps {
  tags: Tag[]
  activeTagFilters: string[]
  activeTypeFilters: CardType[]
  searchQuery: string
  onTagFilterChange: (tags: string[]) => void
  onTypeFilterChange: (types: CardType[]) => void
  onSearchChange: (query: string) => void
  onClearFilters: () => void
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
}: BoardFiltersProps) {
  const hasActiveFilters =
    activeTagFilters.length > 0 || activeTypeFilters.length > 0 || searchQuery.length > 0

  return (
    <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

        {/* Clear Filters */}
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
  )
}
