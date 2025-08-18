"use client"

import { useState, useCallback, useRef } from "react"
import { EditorSidebar } from "@/components/editor/editor-sidebar"
import { ComponentCustomizer } from "@/components/editor/component-customizer"
import { BentoCanvas } from "@/components/editor/bento-canvas"
import { EditorToolbar } from "@/components/editor/editor-toolbar"

interface BentoItem {
  id: string
  type: string
  title: string
  content: Record<string, unknown>
  gridPosition: { row: number; col: number }
  gridSize: { rows: number; cols: number }
  visible: boolean
  customComponent?: string 
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

export function EditorLayout() {
  const [items, setItems] = useState<BentoItem[]>([])
  const [selectedItem, setSelectedItem] = useState<string | undefined>()
  const [history, setHistory] = useState<BentoItem[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isSaving, setIsSaving] = useState(false)
  const [isScreenshotMode, setIsScreenshotMode] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleToggleScreenshotMode = useCallback(() => {
    setIsScreenshotMode(!isScreenshotMode)
    if (!isScreenshotMode) {
      setSelectedItem(undefined) 
    }
  }, [isScreenshotMode])

  const addToHistory = useCallback((newItems: BentoItem[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newItems])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  const handleAddComponent = useCallback((componentType: string, gridPosition?: { row: number; col: number }) => {
    const findAvailablePosition = (rows: number = 2, cols: number = 3): { row: number; col: number } => {
      const occupiedCells = new Set<string>()
      
      items.forEach(item => {
        for (let r = item.gridPosition.row; r < item.gridPosition.row + item.gridSize.rows; r++) {
          for (let c = item.gridPosition.col; c < item.gridPosition.col + item.gridSize.cols; c++) {
            occupiedCells.add(`${r}-${c}`)
          }
        }
      })

      for (let row = 0; row <= 20 - rows; row++) {
        for (let col = 0; col <= 12 - cols; col++) {
          let canPlace = true
          for (let r = row; r < row + rows; r++) {
            for (let c = col; c < col + cols; c++) {
              if (occupiedCells.has(`${r}-${c}`)) {
                canPlace = false
                break
              }
            }
            if (!canPlace) break
          }
          if (canPlace) {
            return { row, col }
          }
        }
      }
      
      return { row: 0, col: 0 } 
    }

    const defaultGridPosition = gridPosition || findAvailablePosition()
    const defaultGridSize = { rows: 2, cols: 3 }

    let customComponent = undefined
    let actualComponentType = componentType
    let customTitle = componentType.charAt(0).toUpperCase() + componentType.slice(1)
    
    if (componentType.startsWith("custom-card-")) {
      const templateId = componentType.replace("custom-card-", "")
      customComponent = templateId
      actualComponentType = "custom-card"

    }

    if (actualComponentType === "title") {
      defaultGridSize.rows = 3
      defaultGridSize.cols = 6
    } else if (actualComponentType === "badges") {
      defaultGridSize.rows = 1
      defaultGridSize.cols = 4
    } else if (actualComponentType === "stats") {
      defaultGridSize.rows = 2
      defaultGridSize.cols = 4
    }
    
    const newItem: BentoItem = {
      id: `${actualComponentType}-${Date.now()}`,
      type: actualComponentType,
      title: customTitle,
      content: customComponent ? { templateId: customComponent } : {},
      gridPosition: defaultGridPosition,
      gridSize: defaultGridSize,
      visible: true,
      customComponent,
      backgroundImage: undefined,
      useCustomBackground: false
    }
    
    const newItems = [...items, newItem]
    setItems(newItems)
    addToHistory(newItems)
    setSelectedItem(newItem.id)
  }, [items, addToHistory])

  const handleUpdateItem = useCallback((id: string, updates: Partial<BentoItem>) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
    setItems(newItems)
    addToHistory(newItems)
  }, [items, addToHistory])

  const handleDeleteItem = useCallback((id: string) => {
    const newItems = items.filter(item => item.id !== id)
    setItems(newItems)
    addToHistory(newItems)
    if (selectedItem === id) {
      setSelectedItem(undefined)
    }
  }, [items, selectedItem, addToHistory])

  const handleSave = useCallback(async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }, [])



  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setItems(history[historyIndex - 1] || [])
    }
  }, [history, historyIndex])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setItems(history[historyIndex + 1] || [])
    }
  }, [history, historyIndex])

  const handleDeselectAll = useCallback(() => {
    setSelectedItem(undefined)
  }, [])

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {!isScreenshotMode && (
        <EditorToolbar
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          isSaving={isSaving}
          components={items}
          onExportPNG={handleToggleScreenshotMode}
        />
      )}

      <div className={`${isScreenshotMode ? 'h-screen' : 'flex-1'} flex overflow-hidden`}>
        {!isScreenshotMode && <EditorSidebar onAddComponent={handleAddComponent} />}

        <div className={`flex-1`} ref={canvasRef}>
          <BentoCanvas
            items={items}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
            onAddItem={handleAddComponent}
            selectedItem={isScreenshotMode ? undefined : selectedItem}
            onSelectItem={setSelectedItem}
            onDeselectAll={handleDeselectAll}
            isScreenshotMode={isScreenshotMode}
          />
        </div>
 
          <div className="w-80 p-4 overflow-hidden">
            <ComponentCustomizer 
              selectedItem={items.find(item => item.id === selectedItem) || null}
              onUpdateItem={handleUpdateItem}
            />
          </div> 
      </div>
    </div>
  )
}
