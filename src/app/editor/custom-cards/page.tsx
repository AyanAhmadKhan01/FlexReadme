"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Info,
  Grid,
  List,
  Plus,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { CUSTOM_CARD_TEMPLATES, renderCustomCard } from "@/components/editor/custom-card-templates"

export default function CustomCardsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(CUSTOM_CARD_TEMPLATES.map(template => template.category)))]

  // Filter templates based on search and category
  const filteredTemplates = CUSTOM_CARD_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToEditor = (templateId: string) => {
    // This would typically navigate back to editor with the selected template
    // For now, we'll show an alert
    alert(`Adding ${templateId} to editor canvas. This would normally navigate back to the editor.`)
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/editor">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Editor
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Custom Card Templates</h1>
                <p className="text-sm text-muted-foreground">
                  Browse and add custom components to your README
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                {CUSTOM_CARD_TEMPLATES.length} Templates Available
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="border-b border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-6">
            {/* Results Info */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTemplates.length} of {CUSTOM_CARD_TEMPLATES.length} templates
                {selectedCategory !== "all" && ` in "${selectedCategory}" category`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            {/* Templates Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Preview */}
                    <div className="h-48 p-4 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden flex items-center justify-center">
                      <div className="h-full w-full max-w-full">
                        {renderCustomCard(template.id)}
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="p-4 border-t">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{template.name}</h3>
                        <Badge variant="secondary" className="text-xs ml-2">
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {template.description}
                      </p>
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleAddToEditor(template.id)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add to Canvas
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex">
                      {/* Preview */}
                      <div className="w-64 h-32 p-3 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <div className="h-full w-full max-w-full transform scale-75 origin-center">
                          {renderCustomCard(template.id)}
                        </div>
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{template.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {template.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {template.description}
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <Button 
                            size="sm"
                            onClick={() => handleAddToEditor(template.id)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add to Canvas
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or category filter
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Info Footer */}
      <div className="border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Info className="h-3 w-3" />
              <span>All components use Tailwind CSS and Lucide React icons</span>
            </div>
            <div>
              Components are responsive and theme-aware
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
