"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  X,
  Search,
  Plus,
  Info,
  Sparkles,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import { CUSTOM_CARD_TEMPLATES, renderCustomCard } from "@/components/editor/custom-card-templates"

interface CustomCardDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelectCard: (templateId: string) => void
}

export function CustomCardDialog({ isOpen, onClose, onSelectCard }: CustomCardDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")

  if (!isOpen) return null

  // Filter templates based on search
  const filteredTemplates = CUSTOM_CARD_TEMPLATES.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectCard = (templateId: string) => {
    onSelectCard(templateId)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Choose Custom Card</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Select a custom component to add to your canvas
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/editor/custom-cards">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Browse All
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b bg-muted/20">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              {filteredTemplates.length} templates found
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary/50 overflow-hidden group"
                  onClick={() => handleSelectCard(template.id)}
                >
                  {/* Preview */}
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background p-3 flex items-center justify-center">
                    <div className="h-full w-full max-w-full">
                      {renderCustomCard(template.id)}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="p-4 border-t bg-background">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{template.name}</h3>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Click to add to canvas</span>
                      <Plus className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/20">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Info className="h-3 w-3" />
              <span>All components use Tailwind CSS and Lucide React icons</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Maximum 10 templates available</span>
              <span>•</span>
              <span>Components are responsive and theme-aware</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
