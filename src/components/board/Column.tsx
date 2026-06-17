'use client'

import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import type { Column as ColumnType, CardWithRelations } from '@/types'
import { CardPreview } from './CardPreview'
import { AnimatePresence, motion } from 'framer-motion'

interface ColumnProps {
  column: ColumnType
  cards: CardWithRelations[]
  isAdmin?: boolean
  onCardClick?: (cardId: string) => void
}

export function Column({ column, cards, isAdmin = false, onCardClick }: ColumnProps) {
  // Sort cards: pinned first, then by position
  const sortedCards = [...cards].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1
    if (!a.is_pinned && b.is_pinned) return 1
    return (a.position ?? 0) - (b.position ?? 0)
  })

  return (
    <div className="flex max-h-[60vh] w-full shrink-0 flex-col md:max-h-[calc(100vh-140px)] md:w-[280px] lg:w-[320px]">
      {/* Column Header */}
      <div className="group flex items-center justify-between border-b border-transparent px-4 py-3 transition-colors hover:border-border">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {column.title}
          </h3>
          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-secondary px-1.5 text-xs font-medium text-secondary-foreground">
            {cards.length}
          </span>
        </div>

        {isAdmin && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={`Add card to ${column.title}`}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Cards Container */}
      <div className="custom-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto px-2 pb-4 pt-2 md:gap-3 md:pb-6">
        <AnimatePresence mode="popLayout">
          {sortedCards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                // Smooth spring animation for layout changes (realtime position updates)
                layout: {
                  type: 'spring',
                  damping: 25,
                  stiffness: 300,
                },
                // Quick fade for enter/exit
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
            >
              <CardPreview card={card} isAdmin={isAdmin} onClick={() => onCardClick?.(card.id)} />
            </motion.div>
          ))}
        </AnimatePresence>

        {sortedCards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted py-8 text-center text-muted-foreground"
          >
            <p className="text-sm">No cards match</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
