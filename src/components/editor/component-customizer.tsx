"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Image, 
  Palette,
  RefreshCw,
  ExternalLink
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
  borderWidth?: number
  borderColor?: string
  iconColor?: string
  iconBgColor?: string
  iconBorderColor?: string
}

interface ComponentCustomizerProps {
  selectedItem: BentoItem | null
  onUpdateItem: (id: string, updates: Partial<BentoItem>) => void
}

const DEFAULT_BACKGROUNDS = [
  {
    name: "Galaxy Purple",
    url: "https://res.cloudinary.com/dt5qoqw6u/image/upload/v1738516789/dr38ccxejrev185h0inp.jpg"
  },
  {
    name: "Ocean Blue",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop"
  },
  {
    name: "Sunset Orange",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    name: "Forest Green",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
  },
  {
    name: "Mountain Gray",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&sat=-100"
  },
  {
    name: "Aurora Pink",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop"
  }
]

const SOLID_COLORS = [
  { name: "Dark", color: "#1a1a1a" },
  { name: "Blue", color: "#3b82f6" },
  { name: "Purple", color: "#8b5cf6" },
  { name: "Green", color: "#10b981" },
  { name: "Orange", color: "#f59e0b" },
  { name: "Red", color: "#ef4444" },
  { name: "Pink", color: "#ec4899" },
  { name: "Indigo", color: "#6366f1" }
]

const TEXT_COLORS = [
  { name: "White", color: "#ffffff" },
  { name: "Black", color: "#000000" },
  { name: "Gray", color: "#6b7280" },
  { name: "Blue", color: "#3b82f6" },
  { name: "Green", color: "#10b981" },
  { name: "Purple", color: "#8b5cf6" },
  { name: "Orange", color: "#f59e0b" },
  { name: "Red", color: "#ef4444" },
  { name: "Glass", color: "rgba(255,255,255,.05)" }
]

const BADGE_COLORS = [
  { name: "Blue", color: "#0066cc" },
  { name: "Green", color: "#28a745" },
  { name: "Red", color: "#dc3545" },
  { name: "Orange", color: "#fd7e14" },
  { name: "Purple", color: "#6f42c1" },
  { name: "Dark", color: "#343a40" }
]

const BORDER_COLORS = [
  { name: "White", color: "#ffffff" },
  { name: "Black", color: "#000000" },
  { name: "Gray", color: "#6b7280" },
  { name: "Blue", color: "#3b82f6" },
  { name: "Green", color: "#10b981" },
  { name: "Purple", color: "#8b5cf6" },
  { name: "Orange", color: "#f59e0b" },
  { name: "Red", color: "#ef4444" },
  { name: "Pink", color: "#ec4899" },
  { name: "Indigo", color: "#6366f1" },
  { name: "Teal", color: "#14b8a6" },
  { name: "Cyan", color: "#06b6d4" },
  { name: "Glass", color: "rgba(255,255,255,.05)" }
]

const GLASSMORPHISM_COLORS = [
  { name: "Clear Glass", color: "rgba(255, 255, 255, 0.1)", border: "rgba(255, 255, 255, 0.2)" },
  { name: "Blue Glass", color: "rgba(59, 130, 246, 0.1)", border: "rgba(59, 130, 246, 0.3)" },
  { name: "Purple Glass", color: "rgba(139, 92, 246, 0.1)", border: "rgba(139, 92, 246, 0.3)" },
  { name: "Green Glass", color: "rgba(16, 185, 129, 0.1)", border: "rgba(16, 185, 129, 0.3)" },
  { name: "Orange Glass", color: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.3)" },
  { name: "Pink Glass", color: "rgba(236, 72, 153, 0.1)", border: "rgba(236, 72, 153, 0.3)" },
  { name: "Teal Glass", color: "rgba(20, 184, 166, 0.1)", border: "rgba(20, 184, 166, 0.3)" },
  { name: "Dark Glass", color: "rgba(0, 0, 0, 0.2)", border: "rgba(255, 255, 255, 0.1)" }
]

const FONT_FAMILIES = [
  { name: "Default", value: "sans", cssClass: "font-sans" },
  { name: "Serif", value: "serif", cssClass: "font-serif" },
  { name: "Mono", value: "mono", cssClass: "font-mono" },
  { name: "Poppins", value: "var(--font-poppins)", cssClass: "font-['var(--font-poppins)']" },
  { name: "Inter", value: "var(--font-inter)", cssClass: "font-['var(--font-inter)']" },
  { name: "Roboto", value: "var(--font-roboto)", cssClass: "font-['var(--font-roboto)']" },
  { name: "Open Sans", value: "var(--font-open-sans)", cssClass: "font-['var(--font-open-sans)']" },
  { name: "Lato", value: "var(--font-lato)", cssClass: "font-['var(--font-lato)']" },
  { name: "Montserrat", value: "var(--font-montserrat)", cssClass: "font-['var(--font-montserrat)']" },
  { name: "Nunito", value: "var(--font-nunito)", cssClass: "font-['var(--font-nunito)']" },
  { name: "Source Sans", value: "var(--font-source-sans)", cssClass: "font-['var(--font-source-sans)']" },
  { name: "Ubuntu", value: "var(--font-ubuntu)", cssClass: "font-['var(--font-ubuntu)']" }
]

export function ComponentCustomizer({ selectedItem, onUpdateItem }: ComponentCustomizerProps) {
  const [customImageUrl, setCustomImageUrl] = useState("")
  const [activeTab, setActiveTab] = useState<"background" | "text" | "effects">("background")

  if (!selectedItem) {
    return (
      <Card className="w-80 h-full pt-5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Customize Component
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Select a component from the canvas to customize its appearance.
          </p>
        </CardContent>
      </Card>
    )
  }

  const handleBackgroundChange = (imageUrl: string) => {
    onUpdateItem(selectedItem.id, {
      backgroundImage: imageUrl,
      useCustomBackground: true,
      backgroundColor: undefined,
      useGradient: false
    })
  }

  const handleSolidColorChange = (color: string) => {
    onUpdateItem(selectedItem.id, {
      backgroundColor: color,
      backgroundImage: undefined,
      useGradient: false,
      useCustomBackground: true
    })
  }

  const handleTextColorChange = (color: string) => {
    onUpdateItem(selectedItem.id, {
      textColor: color
    })
  }

  const handleTextStyleChange = (property: string, value: string) => {
    onUpdateItem(selectedItem.id, {
      [property]: value
    })
  }

  const handleCustomImageSubmit = () => {
    if (customImageUrl.trim()) {
      handleBackgroundChange(customImageUrl.trim())
      setCustomImageUrl("")
    }
  }

  const resetToDefault = () => {
    onUpdateItem(selectedItem.id, {
      backgroundImage: DEFAULT_BACKGROUNDS[0].url,
      useCustomBackground: false,
      backgroundColor: undefined,
      useGradient: false,
      textColor: "#ffffff",
      textSize: "md",
      textWeight: "medium",
      overlayOpacity: 20,
      borderRadius: 8,
      fontFamily: "sans",
      customText: undefined,
      badgeText: undefined,
      badgeColor: undefined,
      borderWidth: 1,
      borderColor: "#ffffff",
      iconColor: "#ffffff",
      iconBgColor: "rgba(255, 255, 255, 0.1)",
      iconBorderColor: "rgba(255, 255, 255, 0.2)"
    })
  }

  return (
    <Card className="w-full sm:w-80 h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Customize Component
        </CardTitle>
        <Badge variant="outline" className="w-fit">
          {selectedItem.type}
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-6 overflow-y-auto">
        <div>
          <div className="text-sm font-medium">Component Title</div>
          <p className="text-sm text-muted-foreground mt-1">{selectedItem.title}</p>
        </div>
 
        <div className="space-y-4">
          <div className="flex border-b border-border/40 overflow-x-auto">
            {(["background", "text", "effects"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "background" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Background Style</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetToDefault}
                  className="text-xs"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
              </div>

              <div className="relative rounded-lg overflow-hidden border border-border/40 h-24">
                <div 
                  className="w-full h-full"
                  style={{
                    ...(selectedItem.useGradient 
                      ? { 
                          background: `linear-gradient(45deg, ${selectedItem.gradientFrom || "#3b82f6"}, ${selectedItem.gradientTo || "#8b5cf6"})` 
                        }
                      : selectedItem.backgroundImage 
                        ? { 
                            backgroundImage: `url(${selectedItem.backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                          }
                        : { 
                            backgroundColor: selectedItem.backgroundColor 
                          }
                    )
                  }}
                >
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">Current Background</span>
                  </div>
                </div>
              </div>
        
              <div>
                <div className="text-sm font-medium mb-3 block">Solid Colors</div>
                <div className="grid grid-cols-4 gap-2">
                  {SOLID_COLORS.map((colorOption, index) => (
                    <button
                      key={index}
                      onClick={() => handleSolidColorChange(colorOption.color)}
                      className="relative rounded-md h-12 border border-border/40 hover:border-primary/50 transition-colors"
                      style={{ backgroundColor: colorOption.color }}
                      title={colorOption.name}
                    >
                      <div className="absolute inset-0 rounded-md flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                        <span className="text-white text-xs font-medium">{colorOption.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-3 block">Preset Images</div>
                <div className="grid grid-cols-2 gap-2">
                  {DEFAULT_BACKGROUNDS.map((bg, index) => (
                    <button
                      key={index}
                      onClick={() => handleBackgroundChange(bg.url)}
                      className="relative rounded-md overflow-hidden border border-border/40 h-16 hover:border-primary/50 transition-colors"
                      title={bg.name}
                    >
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${bg.url})` }}
                      >
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-xs font-medium">{bg.name}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Custom Image URL</div>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://dreamwallv2.vercel.app/img/Wallpapers/Wallpaper%201.jpg"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="text-xs"
                  />
                  <Button 
                    size="sm" 
                    onClick={handleCustomImageSubmit}
                    disabled={!customImageUrl.trim()}
                    aria-label="Apply custom background image"
                  >
                    <Image className="w-3 h-3" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
          )}


          {activeTab === "text" && (
            <div className="space-y-4">
              <div className="text-sm font-medium">Text Styling</div>
              
              <div>
                <div className="text-sm font-medium mb-2">Custom Text</div>
                <Input
                  placeholder="Enter custom text..."
                  value={selectedItem.customText || ""}
                  onChange={(e) => handleTextStyleChange("customText", e.target.value)}
                  className="text-xs"
                />
              </div>

              {selectedItem.type === "badges-image" && (
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium mb-2">Badge Text</div>
                    <Input
                      placeholder="Badge text..."
                      value={selectedItem.badgeText || ""}
                      onChange={(e) => handleTextStyleChange("badgeText", e.target.value)}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Badge Color</div>
                    <div className="grid grid-cols-3 gap-2">
                      {BADGE_COLORS.map((colorOption, index) => (
                        <button
                          key={index}
                          onClick={() => handleTextStyleChange("badgeColor", colorOption.color)}
                          className="relative rounded-md h-10 border border-border/40 hover:border-primary/50 transition-colors flex items-center justify-center"
                          style={{ backgroundColor: colorOption.color }}
                          title={colorOption.name}
                        >
                          <span className="text-white text-xs font-medium">
                            {colorOption.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <div className="text-sm font-medium mb-3 block">Text Color</div>
                <div className="grid grid-cols-4 gap-2">
                  {TEXT_COLORS.map((colorOption, index) => (
                    <button
                      key={index}
                      onClick={() => handleTextColorChange(colorOption.color)}
                      className="relative rounded-md h-10 border border-border/40 hover:border-primary/50 transition-colors flex items-center justify-center"
                      style={{ backgroundColor: colorOption.color === "#ffffff" ? "#f3f4f6" : colorOption.color }}
                      title={colorOption.name}
                    >
                      <span 
                        className="text-xs font-medium"
                        style={{ color: colorOption.color === "#ffffff" ? "#000" : "#fff" }}
                      >
                        {colorOption.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Font Family</div>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {FONT_FAMILIES.map((font) => (
                    <button
                      key={font.value}
                      onClick={() => handleTextStyleChange("fontFamily", font.value)}
                      className={`px-3 py-2 text-xs border rounded-md transition-colors text-left ${
                        selectedItem.fontFamily === font.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/40 hover:border-primary/50"
                      }`}
                      style={{ fontFamily: font.value === 'sans' ? 'ui-sans-serif, system-ui' : font.value }}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Text Size</div>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { name: "XS", value: "xs" },
                    { name: "SM", value: "sm" },
                    { name: "MD", value: "md" },
                    { name: "LG", value: "lg" },
                    { name: "XL", value: "xl" },
                    { name: "2XL", value: "2xl" },
                    { name: "3XL", value: "3xl" }
                  ].map((size) => (
                    <button
                      key={size.value}
                      onClick={() => handleTextStyleChange("textSize", size.value)}
                      className={`px-2 py-2 text-xs border rounded-md transition-colors ${
                        selectedItem.textSize === size.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/40 hover:border-primary/50"
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Text Weight</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: "Light", value: "light" },
                    { name: "Normal", value: "normal" },
                    { name: "Medium", value: "medium" },
                    { name: "Bold", value: "bold" },
                    { name: "Extra", value: "extrabold" }
                  ].map((weight) => (
                    <button
                      key={weight.value}
                      onClick={() => handleTextStyleChange("textWeight", weight.value)}
                      className={`px-2 py-2 text-xs border rounded-md transition-colors ${
                        selectedItem.textWeight === weight.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/40 hover:border-primary/50"
                      }`}
                    >
                      {weight.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "effects" && (
            <div className="space-y-4">
              <div className="text-sm font-medium">Visual Effects</div>
              
              <div className="space-y-3">
                <div className="text-sm font-medium">Border Settings</div>
                
                <div>
                  <div className="text-sm font-medium mb-2 text-muted-foreground">Border Width</div>
                  <div className="grid grid-cols-6 gap-2">
                    {[0, 1, 2, 3, 4, 6, 8].map((width) => (
                      <button
                        key={width}
                        onClick={() => handleTextStyleChange("borderWidth", width.toString())}
                        className={`px-2 py-2 text-xs border rounded-md transition-colors ${
                          selectedItem.borderWidth === width
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/40 hover:border-primary/50"
                        }`}
                      >
                        {width}px
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2 text-muted-foreground">Border Color</div>
                  <div className="grid grid-cols-4 gap-2">
                    {BORDER_COLORS.map((colorOption, index) => (
                      <button
                        key={index}
                        onClick={() => handleTextStyleChange("borderColor", colorOption.color)}
                        className="relative rounded-md h-10 border border-border/40 hover:border-primary/50 transition-colors flex items-center justify-center"
                        style={{ backgroundColor: colorOption.color === "#ffffff" ? "#f3f4f6" : colorOption.color }}
                        title={colorOption.name}
                      >
                        <span 
                          className="text-xs font-medium"
                          style={{ color: colorOption.color === "#ffffff" ? "#000" : "#fff" }}
                        >
                          {colorOption.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium">Icon Glassmorphism Style</div>
                
                <div>
                  <div className="text-sm font-medium mb-2 text-muted-foreground">Glass Theme</div>
                  <div className="grid grid-cols-2 gap-2">
                    {GLASSMORPHISM_COLORS.map((glass, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleTextStyleChange("iconBgColor", glass.color)
                          handleTextStyleChange("iconBorderColor", glass.border)
                          handleTextStyleChange("iconColor", glass.border.replace(/[^,]+(?=\))/, ' 0.8'))
                        }}
                        className="relative rounded-md h-12 border border-border/40 hover:border-primary/50 transition-colors overflow-hidden"
                        style={{ 
                          backgroundColor: glass.color,
                          border: `1px solid ${glass.border}`,
                          backdropFilter: 'blur(10px)'
                        }}
                        title={glass.name}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-white drop-shadow-sm">
                            {glass.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <div className="text-sm font-medium mb-2 text-muted-foreground">Icon Color</div>
                    <div className="grid grid-cols-4 gap-2">
                      {TEXT_COLORS.map((colorOption, index) => (
                        <button
                          key={index}
                          onClick={() => handleTextStyleChange("iconColor", colorOption.color)}
                          className="relative rounded-md h-8 border border-border/40 hover:border-primary/50 transition-colors flex items-center justify-center"
                          style={{ backgroundColor: colorOption.color === "#ffffff" ? "#f3f4f6" : colorOption.color }}
                          title={`Icon ${colorOption.name}`}
                        >
                          <span 
                            className="text-xs font-medium"
                            style={{ color: colorOption.color === "#ffffff" ? "#000" : "#fff" }}
                          >
                            {colorOption.name.charAt(0)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              

              <div>
                <div className="text-sm font-medium mb-2">Border Radius</div>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 4, 8, 12, 16, 20, 24, 32].map((radius) => (
                    <button
                      key={radius}
                      onClick={() => handleTextStyleChange("borderRadius", radius.toString())}
                      className={`px-2 py-2 text-xs border rounded-md transition-colors ${
                        selectedItem.borderRadius === radius
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/40 hover:border-primary/50"
                      }`}
                    >
                      {radius}px
                    </button>
                  ))}
                </div>
              </div>
              
    
              <div>
                <div className="text-sm font-medium mb-2">Overlay Opacity</div>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 10, 20, 30, 40, 50, 60, 70, 80].map((opacity) => (
                    <button
                      key={opacity}
                      onClick={() => handleTextStyleChange("overlayOpacity", opacity.toString())}
                      className={`px-2 py-2 text-xs border rounded-md transition-colors ${
                        selectedItem.overlayOpacity === opacity
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/40 hover:border-primary/50"
                      }`}
                    >
                      {opacity}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="text-xs font-medium mb-2 flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            Pro Tips
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use high-resolution images (800x600+)</li>
            <li>• Ensure good contrast with text</li>
            <li>• Test how it looks in the final export</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
