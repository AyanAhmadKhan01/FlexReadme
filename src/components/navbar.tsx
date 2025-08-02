"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Code2, Twitter, Star, DollarSign, Compass, StretchHorizontal, MousePointerClick, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/modeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/discover", label: "Discover", icon: Compass },
    { href: "/editor", label: "Editor", icon: Code2 },
    { href: "/generator", label: "Generator", icon: Menu },
    { href: "/pricing", label: "Pricing", icon: DollarSign },
    { href: "/tutorial", label: "How To Use", icon: MousePointerClick },
    { href: "/contribute", label: "Contribute", icon: Heart },
  ]


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-[1200px] items-center justify-between mx-auto px-4">

        <div className="flex-shrink-0 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground"><StretchHorizontal /></span>
            </div>
            <span className="hidden font-bold sm:inline-block">
              FlexReadme
            </span>
          </Link>
        </div>

        <div className="flex-shrink-0 flex md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground"><StretchHorizontal /></span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
   
        <div className="flex-shrink-0 flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-1">
             <ModeToggle />
             
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://x.com/DevLegend_" target="_blank">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
    
            <Button size="sm" asChild>
              <Link href="https://github.com/AyanAhmadKhan01/FlexReadme" target="_blank">
                <Star className="mr-1 h-3 w-3" />
               Star on GitHub
              </Link>
            </Button>
          </div>

          <div className="flex md:hidden">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={4}
                className="w-[300px] overflow-hidden rounded-md border bg-popover p-0 text-popover-foreground shadow-md"
              >
                <div className="flex flex-col space-y-3 p-4">
                  {navItems.map((item) => {
                    const IconComponent = item.icon
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          href={item.href}
                          className="flex w-full items-center rounded-md p-2 text-sm hover:bg-accent"
                        >
                          <IconComponent className="mr-2 h-4 w-4" />
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                  <DropdownMenuSeparator />
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="https://x.com/DevLegend_" target="_blank">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </Link>
                    </Button>
                    <ModeToggle />
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <Link href="https://github.com/AyanAhmadKhan01/FlexReadme" target="_blank">
                      <Star className="mr-1 h-3 w-3" />
                     Star on GitHub
                    </Link>
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}