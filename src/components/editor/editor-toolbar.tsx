"use client"

import { Button } from "@/components/ui/button"
import { 
  Undo,
  Redo,
  Bot,
  Download,
} from "lucide-react"

interface ComponentItem {
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
  useGradient?: boolean
  gradientFrom?: string
  gradientTo?: string
  textColor?: string
  textSize?: string
  textWeight?: string
  overlayOpacity?: number
  borderRadius?: number
  fontFamily?: string
  customText?: string
  badgeText?: string
  badgeColor?: string
}

interface EditorToolbarProps {
  onSave: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  isSaving: boolean
  components: ComponentItem[]
  onToggleAI?: () => void
  isAIOpen?: boolean
  onExportPNG?: () => void
}

export function EditorToolbar({ 
  onSave, 
  onUndo, 
  onRedo, 
  canUndo, 
  canRedo, 
  onToggleAI,
  isAIOpen,
}: EditorToolbarProps) {
 
  return (
    <div className="h-10 bg-background border-b border-border/40 flex items-center justify-between px-4">
      

      <div className="flex items-center gap-1 ml-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          className="h-6 w-6 p-0"
        >
          <Undo className="w-3 h-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRedo}
          disabled={!canRedo}
          className="h-6 w-6 p-0"
        >
          <Redo className="w-3 h-3" />
        </Button>

        <div className="w-px h-4 bg-border/40 mx-1" />

        <Button
          variant={isAIOpen ? "default" : "outline"}
          size="sm"
          onClick={onToggleAI}
          className="h-6 px-2 text-xs"
          title="Toggle AI Assistant"
        >
          <Bot className="w-3 h-3 mr-1" />
          AI
        </Button>
        <div className="w-px h-4 bg-border/40 mx-1" /> 
          <Button
              size="sm"
              className="h-6 px-2 text-xs"
            >
              <Download className="w-3 h-3 mr-1 cursor-pointer" />
              Export
            </Button>    
      </div>
    </div>
  )
}
