'use client'

import { useState, useEffect } from "react"
import { Play, X, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TutorialCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show after 3 seconds if not dismissed
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('tutorial-cta-dismissed')
      if (!dismissed) {
        setIsVisible(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('tutorial-cta-dismissed', 'true')
  }

  const handleStart = () => {
    setIsVisible(false)
    // Navigate to tutorial handled by Link component
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-card border border-border rounded-xl shadow-2xl backdrop-blur-sm p-6 max-w-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Play className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Need help getting started?</h3>
              <p className="text-xs text-muted-foreground">Watch our step-by-step tutorial</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="text-xs text-muted-foreground">
            Learn how to create beautiful README files with:
          </div>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Image-based templates</li>
            <li>• Custom component generation</li>
            <li>• Live editing with preview</li>
            <li>• Export and deployment</li>
          </ul>
          
          <Link href="/tutorial" onClick={handleStart}>
            <button className="w-full flex items-center justify-center space-x-2 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
              <Play className="h-3 w-3" />
              <span>Start Tutorial</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
