"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Trash2, 
  Edit3, 
  Copy, 
  Eye,
  EyeOff,
  Move
} from "lucide-react"

interface BentoItem {
  id: string
  type: string
  title: string
  content: Record<string, unknown>
  gridPosition: { row: number; col: number }
  gridSize: { rows: number; cols: number }
  visible: boolean
}

interface BentoCanvasProps {
  items: BentoItem[]
  onUpdateItem: (id: string, updates: Partial<BentoItem>) => void
  onDeleteItem: (id: string) => void
  onAddItem: (componentType: string, gridPosition?: { row: number; col: number }) => void
  selectedItem?: string
  onSelectItem: (id: string) => void
}

const GRID_COLS = 12
const GRID_ROWS = 20

export function BentoCanvas({ 
  items, 
  onUpdateItem, 
  onDeleteItem, 
  onAddItem,
  selectedItem, 
  onSelectItem 
}: BentoCanvasProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [resizing, setResizing] = useState<{ itemId: string; startSize: { rows: number; cols: number } } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const componentType = e.dataTransfer.getData("text/plain")
    
    if (componentType && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const cellWidth = rect.width / GRID_COLS
      const cellHeight = 120 // Base cell height
      const col = Math.floor(x / cellWidth)
      const row = Math.floor(y / cellHeight)
      
      const clampedCol = Math.max(0, Math.min(col, GRID_COLS - 3))
      const clampedRow = Math.max(0, Math.min(row, GRID_ROWS - 2))
      
      onAddItem(componentType, { row: clampedRow, col: clampedCol })
    }
  }

  const handleMouseDown = (e: React.MouseEvent, itemId: string) => {
    if ((e.target as HTMLElement).closest('.resize-handle')) return
    
    const item = items.find(i => i.id === itemId)
    if (!item) return

    setDraggedItem(itemId)
    onSelectItem(itemId)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedItem && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const cellWidth = rect.width / GRID_COLS
      const cellHeight = 120
      const newCol = Math.floor(x / cellWidth)
      const newRow = Math.floor(y / cellHeight)
      
      const item = items.find(i => i.id === draggedItem)
      if (item) {
        const clampedCol = Math.max(0, Math.min(newCol, GRID_COLS - item.gridSize.cols))
        const clampedRow = Math.max(0, Math.min(newRow, GRID_ROWS - item.gridSize.rows))
        
        onUpdateItem(draggedItem, {
          gridPosition: { row: clampedRow, col: clampedCol }
        })
      }
    }

    if (resizing && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const cellWidth = rect.width / GRID_COLS
      const cellHeight = 120
      const newCols = Math.floor(x / cellWidth) + 1
      const newRows = Math.floor(y / cellHeight) + 1
      
      const item = items.find(i => i.id === resizing.itemId)
      if (item) {
        const clampedCols = Math.max(1, Math.min(newCols - item.gridPosition.col, GRID_COLS - item.gridPosition.col))
        const clampedRows = Math.max(1, Math.min(newRows - item.gridPosition.row, GRID_ROWS - item.gridPosition.row))
        
        onUpdateItem(resizing.itemId, {
          gridSize: { cols: clampedCols, rows: clampedRows }
        })
      }
    }
  }

  const handleMouseUp = () => {
    setDraggedItem(null)
    setResizing(null)
  }

  const handleResizeStart = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation()
    const item = items.find(i => i.id === itemId)
    if (!item) return

    setResizing({ 
      itemId, 
      startSize: { rows: item.gridSize.rows, cols: item.gridSize.cols } 
    })
  }

  const handleEdit = (itemId: string) => {
    const newTitle = prompt("Enter new title:")
    if (newTitle) {
      onUpdateItem(itemId, { title: newTitle })
    }
  }

  const handleCopy = async (itemId: string) => {
    const item = items.find(i => i.id === itemId)
    if (!item) return

    try {
      await navigator.clipboard.writeText(JSON.stringify(item.content))
      alert("Component copied to clipboard!")
    } catch {
      alert("Failed to copy component")
    }
  }

  const renderComponent = (item: BentoItem) => {
    // Helper function to safely access content properties
    const getContentValue = (key: string, defaultValue: string = ''): string => {
      return (item.content[key] as string) || defaultValue
    }

    const getContentArray = (key: string, defaultValue: string[] = []): string[] => {
      const value = item.content[key]
      return Array.isArray(value) ? value : defaultValue
    }
    switch (item.type) {
      case "header-image":
        return (
          <div className="p-4 h-full flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
            <div className="text-4xl mb-2">🎨</div>
            <h1 className="text-xl font-bold mb-2">{getContentValue('title', "Your Repository Name")}</h1>
            <p className="text-sm opacity-90">{getContentValue('subtitle', "Amazing project description")}</p>
            <div className="mt-3 text-xs opacity-75">
              Generated header banner image
            </div>
          </div>
        )
      
      case "badges-image":
        return (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-sm font-medium mb-3">🏷️ Badges</h3>
            <div className="flex flex-wrap gap-2 flex-1 content-start">
              {getContentArray('badges', ["![Build Status](https://img.shields.io/badge/build-passing-brightgreen)", "![Version](https://img.shields.io/badge/version-1.0.0-blue)", "![License](https://img.shields.io/badge/license-MIT-green)"]).map((badge: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs h-fit">{badge.replace(/!\[(.*?)\]\(.*?\)/, '$1')}</Badge>
              ))}
            </div>
          </div>
        )

      case "logo":
        return (
          <div className="p-4 h-full flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-2">🖼️</div>
            <h3 className="text-base font-semibold mb-2">Project Logo</h3>
            <p className="text-xs text-muted-foreground">![Logo](your-logo-url.png)</p>
          </div>
        )

      case "installation":
        return (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-base lg:text-lg font-semibold mb-3">⚡ Installation</h3>
            <div className="bg-muted rounded-md p-3 flex-1 flex flex-col gap-2">
              <code className="text-xs lg:text-sm">npm install {getContentValue('package', "your-package")}</code>
              <code className="text-xs lg:text-sm">yarn add {getContentValue('package', "your-package")}</code>
            </div>
          </div>
        )

      case "usage":
        return (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-base lg:text-lg font-semibold mb-3">💻 Usage</h3>
            <div className="bg-muted rounded-md p-3 flex-1 overflow-y-auto">
              <pre className="text-xs lg:text-sm whitespace-pre-wrap">
{`import { YourComponent } from 'your-package'

function App() {
  return <YourComponent />
}`}
              </pre>
            </div>
          </div>
        )

      case "features":
        return (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-base lg:text-lg font-semibold mb-3">✨ Features</h3>
            <ul className="space-y-2 flex-1 overflow-y-auto">
              {getContentArray('features', ["🚀 Fast and lightweight", "📱 Responsive design", "🔧 Easy to customize", "📦 Zero dependencies"]).map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-xs lg:text-sm line-clamp-2">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )

      case "api":
        return (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-base lg:text-lg font-semibold mb-3">� API Reference</h3>
            <div className="space-y-3 flex-1 overflow-y-auto">
              <div className="bg-muted rounded p-2">
                <code className="text-xs font-mono">method(params)</code>
                <p className="text-xs text-muted-foreground mt-1">Description of the method</p>
              </div>
            </div>
          </div>
        )

      case "contributing":
        return (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-base lg:text-lg font-semibold mb-3">🤝 Contributing</h3>
            <div className="space-y-2 flex-1 overflow-y-auto text-xs lg:text-sm">
              <p>1. Fork the project</p>
              <p>2. Create your feature branch</p>
              <p>3. Commit your changes</p>
              <p>4. Push to the branch</p>
              <p>5. Open a Pull Request</p>
            </div>
          </div>
        )

      case "issues":
        return (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-base lg:text-lg font-semibold mb-3">� Issues & Support</h3>
            <div className="space-y-2 flex-1 text-xs lg:text-sm">
              <p>Found a bug? Please create an issue on GitHub</p>
              <div className="bg-muted rounded p-2 mt-2">
                <code>github.com/user/repo/issues</code>
              </div>
            </div>
          </div>
        )

      case "license":
        return (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-base lg:text-lg font-semibold mb-3">📄 License</h3>
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-sm lg:text-base">MIT License</p>
              <p className="text-xs text-muted-foreground mt-1">See LICENSE file for details</p>
            </div>
          </div>
        )

      case "acknowledgments":
        return (
          <div className="p-4 h-full flex flex-col">
            <h3 className="text-base lg:text-lg font-semibold mb-3">❤️ Acknowledgments</h3>
            <div className="space-y-2 flex-1 overflow-y-auto text-xs lg:text-sm">
              <p>• Thanks to all contributors</p>
              <p>• Inspired by awesome projects</p>
              <p>• Built with amazing tools</p>
            </div>
          </div>
        )

      default:
        return (
          <div className="p-4 text-center text-muted-foreground h-full flex flex-col items-center justify-center">
            <div className="text-2xl mb-2">📦</div>
            <p className="text-sm">Component: {item.type}</p>
          </div>
        )
    }
  }

  return (
    <div 
      ref={canvasRef}
      className="flex-1 relative bg-gradient-to-br from-background via-muted/20 to-background overflow-auto p-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_ROWS}, 120px)`,
        gap: '16px',
        minHeight: `${GRID_ROWS * 136}px` // 120px + 16px gap
      }}
    >
      {/* Grid overlay for visual feedback */}
      <div 
        className="absolute inset-4 pointer-events-none opacity-[0.02] grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 120px)`,
          gap: '16px'
        }}
      >
        {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, index) => (
          <div key={index} className="border border-primary rounded-md" />
        ))}
      </div>

      {/* Drop zone indicator */}
      {items.length === 0 && (
        <div 
          className="col-span-full row-span-4 flex items-center justify-center text-center border-2 border-dashed border-primary/20 rounded-lg bg-background/80"
        >
          <div>
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Start Building Your README</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Drag components from the sidebar to create your perfect README layout
            </p>
            <Badge variant="outline">Components will snap to grid</Badge>
          </div>
        </div>
      )}

      {/* Render bento components */}
      {items.map((item) => (
        <Card
          key={item.id}
          className={`relative cursor-move select-none transition-all duration-200 ${
            selectedItem === item.id 
              ? "ring-2 ring-primary shadow-lg z-10" 
              : "hover:shadow-md"
          } ${!item.visible ? "opacity-50" : ""} ${
            draggedItem === item.id ? "z-50 scale-105 shadow-2xl" : ""
          }`}
          style={{
            gridColumn: `${item.gridPosition.col + 1} / span ${item.gridSize.cols}`,
            gridRow: `${item.gridPosition.row + 1} / span ${item.gridSize.rows}`
          }}
          onMouseDown={(e) => handleMouseDown(e, item.id)}
        >
          {/* Item controls */}
          <div className={`absolute -top-3 left-0 right-0 flex items-center justify-between px-2 transition-opacity z-20 ${
            selectedItem === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}>
            <div className="flex items-center gap-1">
              <div className="bg-background border rounded px-2 py-1 flex items-center gap-1 shadow-sm">
                <Move className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">
                  {item.gridSize.cols}×{item.gridSize.rows}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 bg-background shadow-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onUpdateItem(item.id, { visible: !item.visible })
                }}
              >
                {item.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 bg-background shadow-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleEdit(item.id)
                }}
              >
                <Edit3 className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 bg-background shadow-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopy(item.id)
                }}
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-destructive hover:text-destructive bg-background shadow-sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteItem(item.id)
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Component content */}
          <div className="h-full overflow-hidden">
            {renderComponent(item)}
          </div>

          {/* Resize handles */}
          {selectedItem === item.id && (
            <>
              {/* Corner resize handle */}
              <div 
                className="resize-handle absolute bottom-1 right-1 w-3 h-3 bg-primary cursor-se-resize opacity-80 hover:opacity-100 transition-opacity rounded-tl"
                onMouseDown={(e) => handleResizeStart(e, item.id)}
              />
              
              {/* Edge resize handles */}
              <div 
                className="resize-handle absolute bottom-1 right-1/2 transform translate-x-1/2 w-4 h-2 bg-primary/60 cursor-s-resize rounded-t"
                onMouseDown={(e) => handleResizeStart(e, item.id)}
              />
              <div 
                className="resize-handle absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-primary/60 cursor-e-resize rounded-l"
                onMouseDown={(e) => handleResizeStart(e, item.id)}
              />
            </>
          )}
        </Card>
      ))}
    </div>
  )
}
