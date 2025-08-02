"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from "lucide-react"

interface CustomCardSidebarProps {
  onAddCustomCard: (templateId: string) => void
}

const CUSTOM_CARD_TEMPLATES = [
  { id: 'social-links', name: 'Social Links', description: 'Connect with your audience' },
  { id: 'stats-card', name: 'Project Stats', description: 'Display GitHub statistics' },
  { id: 'contact-info', name: 'Contact Info', description: 'Share contact details' },
  { id: 'tech-stack', name: 'Tech Stack', description: 'Show technologies used' },
  { id: 'progress-card', name: 'Progress', description: 'Development progress bars' },
  { id: 'status-card', name: 'Status', description: 'Project status indicators' },
  { id: 'team-card', name: 'Team', description: 'Meet the team members' },
  { id: 'sponsors-card', name: 'Sponsors', description: 'Support and sponsors' },
  { id: 'downloads-card', name: 'Downloads', description: 'Download statistics' },
  { id: 'security-card', name: 'Security', description: 'Security status info' }
]

export function CustomCardSidebar({ onAddCustomCard }: CustomCardSidebarProps) {
  return (
    <div className="w-80 bg-card border-l p-4 overflow-y-auto">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
          <h2 className="text-lg font-semibold">Custom Cards</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Pre-built Tailwind CSS components with Lucide React icons
        </p>
      </div>

      <div className="space-y-3">
        {CUSTOM_CARD_TEMPLATES.map((template) => (
          <Card
            key={template.id}
            className="p-3 cursor-pointer hover:shadow-md transition-shadow border-dashed border-2 hover:border-primary/50"
            onClick={() => onAddCustomCard(template.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-medium text-sm">{template.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {template.description}
                </p>
              </div>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Badge variant="outline" className="text-xs">
              Drag to canvas
            </Badge>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-3 bg-muted/50 rounded-lg">
        <div className="text-sm font-medium mb-2">Features</div>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Responsive Tailwind CSS design</li>
          <li>• Lucide React icons included</li>
          <li>• Dark/light theme support</li>
          <li>• Fully customizable content</li>
          <li>• Drag & drop positioning</li>
          <li>• Resizable components</li>
        </ul>
      </div>

      <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <div className="text-sm font-medium text-purple-600 mb-1">Limit</div>
        <p className="text-xs text-purple-600/80">
          Maximum 10 custom card templates available. Each card can be added multiple times to your canvas.
        </p>
      </div>
    </div>
  )
}
