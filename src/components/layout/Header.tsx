'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/icons'

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 md:px-6">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.GripVertical className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Advaith Renjith</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search or other controls could go here */}
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/advaith-renjith-2004" target="_blank" rel="noreferrer">
                <Icons.Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://linkedin.com/in/advaith-renjith"
                target="_blank"
                rel="noreferrer"
              >
                <Icons.Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:advaithrenjith2004@gmail.com">
                <Icons.Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
