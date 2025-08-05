"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Trash2, 
  Edit3, 
  Copy, 
  Eye,
  EyeOff,
  Move,
  User,
  Award,
  BarChart3,
  GitBranch,
  Code,
  Activity,
  Zap,
  Shield,
  Image as ImageIcon
} from "lucide-react"

interface BentoItem {
  id: string
  type: string
  title: string
  content: Record<string, unknown>
  gridPosition: { row: number; col: number }
  gridSize: { rows: number; cols: number }
  visible: boolean
  backgroundImage?: string
  useCustomBackground?: boolean
  backgroundColor?: string
  textColor?: string
  textSize?: string
  textWeight?: string
  overlayOpacity?: number
  borderRadius?: number
  borderWidth?: number
  borderColor?: string
  fontFamily?: string
  customText?: string
  badgeText?: string
  badgeColor?: string
  iconColor?: string
  iconBgColor?: string
}

interface BentoCanvasProps {
  items: BentoItem[]
  onUpdateItem: (id: string, updates: Partial<BentoItem>) => void
  onDeleteItem: (id: string) => void
  onAddItem: (componentType: string, gridPosition?: { row: number; col: number }) => void
  selectedItem?: string
  onSelectItem: (id: string) => void
  onDeselectAll?: () => void
  onExportScreenshot?: () => void
}

const GRID_COLS = 12
const GRID_ROWS = 12

export function BentoCanvas({ 
  items, 
  onUpdateItem, 
  onDeleteItem, 
  onAddItem,
  selectedItem, 
  onSelectItem,
  onDeselectAll 
}: BentoCanvasProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [resizing, setResizing] = useState<{ 
    itemId: string; 
    startSize: { rows: number; cols: number };
    startMousePos: { x: number; y: number };
    startItemPos: { row: number; col: number };
  } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const lastResizeUpdate = useRef<number>(0)

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onDeselectAll) {
      onDeselectAll()
    }
  }

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
      const cellHeight = 140 // Base cell height
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
      const cellHeight = 140
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
      const now = Date.now()
      if (now - lastResizeUpdate.current < 16) return
      lastResizeUpdate.current = now
      
      const rect = canvasRef.current.getBoundingClientRect()
      
      const deltaX = e.clientX - resizing.startMousePos.x
      const deltaY = e.clientY - resizing.startMousePos.y
      
      const cellWidth = rect.width / GRID_COLS
      const cellHeight = 140
      const deltaCols = Math.round(deltaX / cellWidth)
      const deltaRows = Math.round(deltaY / cellHeight)
      
      const newCols = Math.max(1, resizing.startSize.cols + deltaCols)
      const newRows = Math.max(1, resizing.startSize.rows + deltaRows)
      
      const maxCols = GRID_COLS - resizing.startItemPos.col
      const maxRows = GRID_ROWS - resizing.startItemPos.row
      const clampedCols = Math.min(newCols, maxCols)
      const clampedRows = Math.min(newRows, maxRows)
      
      const item = items.find(i => i.id === resizing.itemId)
      if (item && (item.gridSize.cols !== clampedCols || item.gridSize.rows !== clampedRows)) {
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
    if (!item || !canvasRef.current) return
    
    setResizing({ 
      itemId, 
      startSize: { rows: item.gridSize.rows, cols: item.gridSize.cols },
      startMousePos: { x: e.clientX, y: e.clientY },
      startItemPos: { row: item.gridPosition.row, col: item.gridPosition.col }
    })
  }

  const handleEdit = (itemId: string) => {
    const item = items.find(i => i.id === itemId)
    if (!item) return

    const newTitle = prompt("Enter title:", item.title)
    if (newTitle !== null) {
      onUpdateItem(itemId, { title: newTitle })
    }

    const newCustomText = prompt("Enter custom text:", item.customText || "")
    if (newCustomText !== null) {
      onUpdateItem(itemId, { customText: newCustomText })
    }

    if (item.type === "badges-image") {
      const newBadgeText = prompt("Enter badge text:", item.badgeText || "Build Passing")
      if (newBadgeText !== null) {
        onUpdateItem(itemId, { badgeText: newBadgeText })
      }
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
    const textColor = item.textColor || "#ffffff"
    const textSize = item.textSize || "md"
    const textWeight = item.textWeight || "medium"
    const borderRadius = item.borderRadius || 12
    const borderWidth = item.borderWidth || 2
    const borderColor = item.borderColor || "rgba(255, 255, 255, 0.3)"
    const fontFamily = item.fontFamily || "mono"
    const customText = item.customText || item.title
    const overlayOpacity = item.overlayOpacity || 0.1
    const iconColor = item.iconColor || textColor
    const iconBgColor = item.iconBgColor || "rgba(255, 255, 255, 0.2)"
    

    let backgroundStyle: React.CSSProperties = {}
    
    if (item.useCustomBackground && item.backgroundImage) {
      backgroundStyle = {
        backgroundImage: `url(${item.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    } else if (item.backgroundColor) {
      backgroundStyle = {
        backgroundColor: item.backgroundColor
      }
    } else {
     
      switch (item.type) {
        case "header-image":
          backgroundStyle = { backgroundColor: "#1e1b4b" } 
          break
        case "badges-image":
          backgroundStyle = { backgroundColor: "#065f46" } 
          break
        case "stats-image":
          backgroundStyle = { backgroundColor: "#164e63" } 
          break
        case "profile-card":
          backgroundStyle = { backgroundColor: "#7c2d12" } 
          break
        case "streak-stats":
          backgroundStyle = { backgroundColor: "#991b1b" } 
          break
        case "trophy-display":
          backgroundStyle = { backgroundColor: "#a16207" }
          break
        case "contributions":
          backgroundStyle = { backgroundColor: "#14532d" } 
          break
        case "languages":
          backgroundStyle = { backgroundColor: "#3730a3" } 
          break
        case "recent-activity":
          backgroundStyle = { backgroundColor: "#0f766e" }
          break
        case "visitors-counter":
          backgroundStyle = { backgroundColor: "#374151" } 
          break
        default:
          backgroundStyle = { backgroundColor: "#1f2937" } 
      }
    }
    
    const getTextSizeClass = (size: string) => {
      switch (size) {
        case "xs": return "text-xs"
        case "sm": return "text-sm"
        case "md": return "text-base"
        case "lg": return "text-lg"
        case "xl": return "text-xl"
        case "2xl": return "text-2xl"
        case "3xl": return "text-3xl"
        case "4xl": return "text-4xl"
        case "5xl": return "text-5xl"
        case "6xl": return "text-6xl"
        default: return "text-base"
      }
    }
    
    const getTextWeightClass = (weight: string) => {
      switch (weight) {
        case "light": return "font-light"
        case "normal": return "font-normal"
        case "medium": return "font-medium"
        case "semibold": return "font-semibold"
        case "bold": return "font-bold"
        case "extrabold": return "font-extrabold"
        default: return "font-medium"
      }
    }
    
    const getFontFamilyClass = (family: string) => {
      switch (family) {
        case "sans": return "font-sans"
        case "serif": return "font-serif"
        case "mono": return "font-mono"
        default: return "font-mono"
      }
    }
    
    const textClasses = `${getTextSizeClass(textSize)} ${getTextWeightClass(textWeight)} ${getFontFamilyClass(fontFamily)}`
    
    switch (item.type) {
      case "header-image":
        return (
          <div 
            className="h-full relative overflow-hidden"
            style={{ 
              borderRadius: `${borderRadius}px`, 
              ...backgroundStyle,
              border: `${borderWidth}px solid ${borderColor}`
            }}
          >
            {item.useCustomBackground && item.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              style={{ color: textColor }}
            >
              <div 
                className="mb-3 p-3 rounded-xl border"
                style={{ backgroundColor: iconBgColor, borderColor }}
              >
                <ImageIcon className="w-8 h-8" style={{ color: iconColor }} />
              </div>
              <h1 className={`${textClasses} mb-2 font-bold tracking-tight`}>
                {customText || "GitHub Header"}
              </h1>
              <p className="text-xs opacity-80 font-mono">
                Wave animation banner
              </p>
            </div>
          </div>
        )
      
      case "badges-image":
        return (
          <div 
            className="h-full relative overflow-hidden"
            style={{ 
              borderRadius: `${borderRadius}px`, 
              ...backgroundStyle,
              border: `${borderWidth}px solid ${borderColor}`
            }}
          >
            {item.useCustomBackground && item.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              style={{ color: textColor }}
            >
              <div className="flex gap-2 mb-3 flex-wrap justify-center">
                <div className="px-2 py-1 bg-emerald-400/20 border border-emerald-400/40 rounded text-xs font-mono flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {item.badgeText || "Build"}
                </div>
                <div className="px-2 py-1 bg-blue-400/20 border border-blue-400/40 rounded text-xs font-mono">
                  MIT
                </div>
                <div className="px-2 py-1 bg-purple-400/20 border border-purple-400/40 rounded text-xs font-mono">
                  v2.1
                </div>
              </div>
              <h3 className={`${textClasses} mb-2 font-semibold`}>{customText || "Status Badges"}</h3>
              <p className="text-xs opacity-80 font-mono">Shield.io badges</p>
            </div>
          </div>
        )

      case "stats-image":
        return (
          <div 
            className="h-full relative overflow-hidden"
            style={{ 
              borderRadius: `${borderRadius}px`, 
              ...backgroundStyle,
              border: `${borderWidth}px solid ${borderColor}`
            }}
          >
            {item.useCustomBackground && item.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              style={{ color: textColor }}
            >
              <div 
                className="mb-3 p-3 rounded-xl border"
                style={{ backgroundColor: iconBgColor, borderColor }}
              >
                <BarChart3 className="w-8 h-8" style={{ color: iconColor }} />
              </div>
              <h3 className={`${textClasses} mb-2 font-semibold`}>{customText || "GitHub Stats"}</h3>
              <p className="text-xs opacity-80 font-mono">Commits & contributions</p>
              <div className="flex gap-2 mt-2 text-xs">
                <span className="px-2 py-1 bg-white/20 rounded">1.2k stars</span>
                <span className="px-2 py-1 bg-white/20 rounded">234 commits</span>
              </div>
            </div>
          </div>
        )

      case "profile-card":
        return (
          <div 
            className="h-full relative overflow-hidden"
            style={{ 
              borderRadius: `${borderRadius}px`, 
              ...backgroundStyle,
              border: `${borderWidth}px solid ${borderColor}`
            }}
          >
            {item.useCustomBackground && item.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              style={{ color: textColor }}
            >
              <div 
                className="mb-3 p-3 rounded-full border"
                style={{ backgroundColor: iconBgColor, borderColor }}
              >
                <User className="w-10 h-10" style={{ color: iconColor }} />
              </div>
              <h3 className={`${textClasses} mb-2 font-semibold`}>{customText || "Profile Card"}</h3>
              <p className="text-xs opacity-80 font-mono">GitHub profile overview</p>
              <div className="flex gap-1 mt-2">
                <div className="w-12 h-1 bg-white/40 rounded"></div>
                <div className="w-8 h-1 bg-white/60 rounded"></div>
                <div className="w-6 h-1 bg-white/40 rounded"></div>
              </div>
            </div>
          </div>
        )

      case "streak-stats":
        return (
          <div 
            className="h-full relative overflow-hidden"
            style={{ 
              borderRadius: `${borderRadius}px`, 
              ...backgroundStyle,
              border: `${borderWidth}px solid ${borderColor}`
            }}
          >
            {item.useCustomBackground && item.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              style={{ color: textColor }}
            >
              <div 
                className="mb-3 p-3 rounded-xl border"
                style={{ backgroundColor: iconBgColor, borderColor }}
              >
                <Zap className="w-8 h-8" style={{ color: iconColor }} />
              </div>
              <h3 className={`${textClasses} mb-2 font-semibold`}>{customText || "Streak Stats"}</h3>
              <p className="text-xs opacity-80 font-mono">Contribution streak</p>
              <div className="mt-2 px-3 py-1 bg-red-400/20 rounded text-xs font-mono border border-red-400/40">
                42 days
              </div>
            </div>
          </div>
        )

      case "trophy-display":
        return (
          <div 
            className="h-full relative overflow-hidden"
            style={{ 
              borderRadius: `${borderRadius}px`, 
              ...backgroundStyle,
              border: `${borderWidth}px solid ${borderColor}`
            }}
          >
            {item.useCustomBackground && item.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              style={{ color: textColor }}
            >
              <div 
                className="mb-3 p-3 rounded-xl border"
                style={{ backgroundColor: iconBgColor, borderColor }}
              >
                <Award className="w-8 h-8" style={{ color: iconColor }} />
              </div>
              <h3 className={`${textClasses} mb-2 font-semibold`}>{customText || "Trophies"}</h3>
              <p className="text-xs opacity-80 font-mono">GitHub achievements</p>
              <div className="flex gap-1 mt-2">
                {Array.from({length: 5}).map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${
                    i < 3 ? 'bg-yellow-400' : 'bg-white/30'
                  }`}></div>
                ))}
              </div>
            </div>
          </div>
        )

      case "contributions":
        return (
          <div 
            className="h-full relative overflow-hidden"
            style={{ 
              borderRadius: `${borderRadius}px`, 
              ...backgroundStyle,
              border: `${borderWidth}px solid ${borderColor}`
            }}
          >
            {item.useCustomBackground && item.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              style={{ color: textColor }}
            >
              <div 
                className="mb-3 p-3 rounded-xl border"
                style={{ backgroundColor: iconBgColor, borderColor }}
              >
                <GitBranch className="w-8 h-8" style={{ color: iconColor }} />
              </div>
              <h3 className={`${textClasses} mb-2 font-semibold`}>{customText || "Activity Graph"}</h3>
              <p className="text-xs opacity-80 font-mono">Contribution activity</p>
            </div>
          </div>
        )

      case "languages":
        return (
          <div 
            className="h-full relative overflow-hidden"
            style={{ 
              borderRadius: `${borderRadius}px`, 
              ...backgroundStyle,
              border: `${borderWidth}px solid ${borderColor}`
            }}
          >
            {item.useCustomBackground && item.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              style={{ color: textColor }}
            >
              <div 
                className="mb-3 p-3 rounded-xl border"
                style={{ backgroundColor: iconBgColor, borderColor }}
              >
                <Code className="w-8 h-8" style={{ color: iconColor }} />
              </div>
              <h3 className={`${textClasses} mb-2 font-semibold`}>{customText || "Top Languages"}</h3>
              <p className="text-xs opacity-80 font-mono">Programming languages</p>
              <div className="flex gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="text-xs">JS</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span className="text-xs">PY</span>
                </div>
              </div>
            </div>
          </div>
        )

      case "recent-activity":
        return (
          <div 
            className="h-full relative overflow-hidden"
            style={{ 
              borderRadius: `${borderRadius}px`, 
              ...backgroundStyle,
              border: `${borderWidth}px solid ${borderColor}`
            }}
          >
            {item.useCustomBackground && item.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              style={{ color: textColor }}
            >
              <div 
                className="mb-3 p-3 rounded-xl border"
                style={{ backgroundColor: iconBgColor, borderColor }}
              >
                <Activity className="w-8 h-8" style={{ color: iconColor }} />
              </div>
              <h3 className={`${textClasses} mb-2 font-semibold`}>{customText || "Recent Activity"}</h3>
              <p className="text-xs opacity-80 font-mono">Latest commits & PRs</p>
              <div className="text-xs font-mono opacity-70 mt-2 px-2 py-1 bg-white/10 rounded">
                2h ago
              </div>
            </div>
          </div>
        )

      case "visitors-counter":
        return (
          <div 
            className="h-full relative overflow-hidden"
            style={{ 
              borderRadius: `${borderRadius}px`, 
              ...backgroundStyle,
              border: `${borderWidth}px solid ${borderColor}`
            }}
          >
            {item.useCustomBackground && item.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              style={{ color: textColor }}
            >
              <div 
                className="mb-3 p-3 rounded-xl border"
                style={{ backgroundColor: iconBgColor, borderColor }}
              >
                <Eye className="w-8 h-8" style={{ color: iconColor }} />
              </div>
              <h3 className={`${textClasses} mb-2 font-semibold`}>{customText || "Profile Views"}</h3>
              <p className="text-xs opacity-80 font-mono">Visitor counter</p>
              <div className="mt-2 px-3 py-1 bg-white/20 rounded text-xs font-mono border border-white/30">
                2,847 views
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div 
            className="h-full relative overflow-hidden border-2 border-gray-400/30"
            style={{ borderRadius: `${borderRadius}px`, ...backgroundStyle }}
          >
            {item.useCustomBackground && item.backgroundImage && (
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: overlayOpacity }}
              />
            )}
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
              style={{ color: textColor }}
            >
              <div className="mb-3 p-3 rounded-xl bg-white/20 border border-white/30">
                <ImageIcon className="w-8 h-8 text-white/80" />
              </div>
              <h3 className={`${textClasses} mb-2 font-semibold leading-tight`}>{customText || item.title}</h3>
              <p className="text-xs opacity-80 font-mono">
                {item.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Component
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="relative">
      <div 
        ref={canvasRef}
        className="flex-1 relative overflow-auto p-1"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleCanvasClick}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, minmax(100px, 140px))`,
          gap: '4px',
          minHeight: `${GRID_ROWS * 120}px`,
          maxHeight: '100vh',
          backgroundColor: 'transparent'
        }}
      >
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, minmax(100px, 140px))`,
          gap: '4px'
        }}
      >
        {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, index) => (
          <div key={index} className="border border-primary rounded-md" />
        ))}
      </div>

      {items.length === 0 && (
        <div 
          className="col-span-full row-span-4 flex items-center justify-center text-center border-primary/20 rounded-lg bg-background/80 p-4"
        >
          <div>
            <div className="text-4xl sm:text-6xl mb-4"><ImageIcon size={66} className="mx-auto"/></div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Build Your GitHub README</h3>
            <p className="text-muted-foreground mb-4 max-w-md text-sm sm:text-base">
              Drag image-based components to create your perfect GitHub README with bento layout
            </p>
          </div>
        </div>
      )}

      {items.map((item) => (
        <Card
          key={item.id}
          className={`relative cursor-move select-none transition-all duration-300 ${
            selectedItem === item.id 
              ? "ring-2 ring-purple-500/60 shadow-xl z-10 border-2 border-purple-500/40" 
              : "hover:shadow-lg border-2 border-border/40 hover:border-border/60"
          } ${!item.visible ? "opacity-50" : ""} ${
            draggedItem === item.id ? "z-50 scale-105 shadow-xl ring-2 ring-primary/50" : ""
          } group bg-transparent`}
          style={{
            gridColumn: `${item.gridPosition.col + 1} / span ${item.gridSize.cols}`,
            gridRow: `${item.gridPosition.row + 1} / span ${item.gridSize.rows}`,
            borderRadius: `${item.borderRadius || 12}px`,
            backgroundColor: 'transparent'
          }}
          onMouseDown={(e) => handleMouseDown(e, item.id)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`absolute top-2 left-2 right-2 flex items-center justify-between transition-all duration-300 z-20 ${
            selectedItem === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}>
            <div className="flex items-center gap-2">
              <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-2 py-1 flex items-center gap-2 shadow-lg">
                <Move className="w-3 h-3 text-white" />
                <span className="text-xs font-mono font-medium text-white hidden sm:inline">{item.title}</span>
                <span className="text-xs text-white/70 font-mono">
                  {item.gridSize.cols}×{item.gridSize.rows}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 bg-black/80 backdrop-blur-sm shadow-lg border border-white/20 hover:bg-black/90 text-white hover:text-white"
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
                className="h-7 w-7 p-0 bg-black/80 backdrop-blur-sm shadow-lg border border-white/20 hover:bg-black/90 text-white hover:text-white"
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
                className="h-7 w-7 p-0 bg-black/80 backdrop-blur-sm shadow-lg border border-white/20 hover:bg-black/90 text-white hover:text-white"
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
                className="h-7 w-7 p-0 text-red-400 hover:text-red-300 bg-black/80 backdrop-blur-sm shadow-lg border border-white/20 hover:bg-black/90"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteItem(item.id)
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="h-full overflow-hidden">
            {renderComponent(item)}
          </div>


          {selectedItem === item.id && (
            <>
              <div 
                className="resize-handle absolute bottom-1 right-1 w-4 h-4 bg-purple-500 cursor-se-resize opacity-90 hover:opacity-100 transition-all duration-200 rounded-tl-lg shadow-lg border border-purple-400"
                onMouseDown={(e) => handleResizeStart(e, item.id)}
              />
              
              <div 
                className="resize-handle absolute bottom-1 right-1/2 transform translate-x-1/2 w-5 h-3 bg-purple-500/80 cursor-s-resize rounded-t-lg hidden sm:block shadow-lg border border-purple-400/60"
                onMouseDown={(e) => handleResizeStart(e, item.id)}
              />
              <div 
                className="resize-handle absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-5 bg-purple-500/80 cursor-e-resize rounded-l-lg hidden sm:block shadow-lg border border-purple-400/60"
                onMouseDown={(e) => handleResizeStart(e, item.id)}
              />
            </>
          )}
        </Card>
      ))}
    </div>
    </div>
  )
}
