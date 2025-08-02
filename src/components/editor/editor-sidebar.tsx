"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  Type, 
  Image, 
  Code, 
  Star,
  Users,
  Shield,
  Heart,
  Activity,
  Trophy,
  GitBranch,
  Plus,
  Sparkles
} from "lucide-react"
import { CustomCardDialog } from "@/components/editor/custom-card-dialog"

const componentCategories = [
  {
    name: "GitHub Images",
    items: [
      { 
        id: "header-image", 
        name: "Header Banner", 
        icon: Image, 
        description: "Repository header image/logo",
        preview: "🎨",
        githubSupported: true
      },
      { 
        id: "badges-image", 
        name: "Badges Row", 
        icon: Shield, 
        description: "Build status, version, license badges",
        preview: "🏷️",
        githubSupported: true
      },
      { 
        id: "stats-image", 
        name: "GitHub Stats", 
        icon: Star, 
        description: "Repository statistics card",
        preview: "�",
        githubSupported: true
      }
    ]
  },
  {
    name: "Profile Cards",
    items: [
      { 
        id: "profile-card", 
        name: "Profile Card", 
        icon: Users, 
        description: "Developer profile card",
        preview: "👤",
        githubSupported: true
      },
      { 
        id: "streak-stats", 
        name: "Streak Stats", 
        icon: Activity, 
        description: "GitHub streak statistics",
        preview: "�",
        githubSupported: true
      },
      { 
        id: "trophy-display", 
        name: "Trophy Display", 
        icon: Trophy, 
        description: "GitHub trophy showcase",
        preview: "🏆",
        githubSupported: true
      }
    ]
  },
  {
    name: "Activity Widgets",
    items: [
      { 
        id: "contributions", 
        name: "Contribution Graph", 
        icon: GitBranch, 
        description: "GitHub contribution activity",
        preview: "�",
        githubSupported: true
      },
      { 
        id: "languages", 
        name: "Top Languages", 
        icon: Code, 
        description: "Most used programming languages",
        preview: "💻",
        githubSupported: true
      },
      { 
        id: "recent-activity", 
        name: "Recent Activity", 
        icon: Activity, 
        description: "Latest GitHub activity feed",
        preview: "⚡",
        githubSupported: true
      }
    ]
  },
  {
    name: "Social Proof",
    items: [
      { 
        id: "visitors-counter", 
        name: "Visitor Counter", 
        icon: Users, 
        description: "Profile view counter",
        preview: "�",
        githubSupported: true
      },
      { 
        id: "typing-svg", 
        name: "Typing Animation", 
        icon: Type, 
        description: "Animated typing text",
        preview: "⌨️",
        githubSupported: true
      },
      { 
        id: "random-quote", 
        name: "Daily Quote", 
        icon: Heart, 
        description: "Inspirational quote card",
        preview: "💭",
        githubSupported: true
      }
    ]
  }
]

interface EditorSidebarProps {
  onAddComponent: (componentId: string) => void
}

export function EditorSidebar({ onAddComponent }: EditorSidebarProps) {
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null)
  const [showCustomCardDialog, setShowCustomCardDialog] = useState(false)

  const handleDragStart = (e: React.DragEvent, componentId: string) => {
    setDraggedComponent(componentId)
    e.dataTransfer.setData("text/plain", componentId)
    e.dataTransfer.effectAllowed = "copy"
  }

  const handleDragEnd = () => {
    setDraggedComponent(null)
  }

  const handleCustomCardSelect = (templateId: string) => {
    // Add a custom card component with the template ID
    onAddComponent(`custom-card-${templateId}`)
    setShowCustomCardDialog(false)
  }

  return (
    <div className="w-80 bg-background border-r border-border/40 flex flex-col h-full">
      {/* Custom Card Dialog */}
      <CustomCardDialog
        isOpen={showCustomCardDialog}
        onClose={() => setShowCustomCardDialog(false)}
        onSelectCard={handleCustomCardSelect}
      />
      
      <div className="p-4 border-b border-border/40">
        <h2 className="text-lg font-semibold mb-2">Components</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Drag components to the canvas or click to add
        </p>
        
        {/* Custom Cards Button */}
        <Button 
          className="w-full mb-2"
          variant="outline"
          onClick={() => setShowCustomCardDialog(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Custom Cards
          <Sparkles className="h-4 w-4 ml-auto" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {componentCategories.map((category, categoryIndex) => (
            <div key={category.name}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                {category.name}
              </h3>
              <div className="grid gap-2">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onDragEnd={handleDragEnd}
                    className={`p-3 border cursor-grab active:cursor-grabbing ${
                      draggedComponent === item.id 
                        ? "border-primary" 
                        : "border-border/40 hover:border-primary/40"
                    }`}
                    onClick={() => onAddComponent(item.id)}
                  >
                    <div className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 mt-0.5 text-primary" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium mb-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {categoryIndex < componentCategories.length - 1 && (
                <Separator className="mt-6" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
