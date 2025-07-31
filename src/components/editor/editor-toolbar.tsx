"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  FileText,
  Github,
  Save,
  Undo,
  Redo,
  Zap,
  Copy,
  Check,
  Bot,
  Download,
  Camera
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
  isSaving,
  components,
  onToggleAI,
  isAIOpen,
  onExportPNG
}: EditorToolbarProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [markdownContent, setMarkdownContent] = useState("")
  const [copied, setCopied] = useState(false)

  const generateMarkdown = () => {
    // Filter out invalid components and sort by position
    const validComponents = components.filter(comp => comp && comp.type && comp.gridPosition);
    const sortedComponents = [...validComponents].sort((a, b) => {
      if (a.gridPosition.row !== b.gridPosition.row) return a.gridPosition.row - b.gridPosition.row;
      return a.gridPosition.col - b.gridPosition.col;
    });

    if (sortedComponents.length === 0) {
      return "# My GitHub Profile\n\n*Add some components to generate your README!*\n\n";
    }

    let markdown = "# My GitHub Profile\n\n";
    
    sortedComponents.forEach((component) => {
      // Safely access content properties
      const getContentValue = (key: string, defaultValue: string = ''): string => {
        const value = component.content[key]
        return typeof value === 'string' ? value : defaultValue
      }
      
      switch (component.type) {
        case "header-image":
          markdown += "## 🎨 Welcome to My Profile\n\n";
          markdown += `![Header](https://capsule-render.vercel.app/api?type=waving&color=gradient&text=${encodeURIComponent(getContentValue('title', "Hello World!"))}&section=header&size=300&animation=fadeIn)\n\n`;
          break;

        case "badges-image":
          markdown += "## 🏷️ Badges\n\n";
          markdown += "![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ";
          markdown += "![Version](https://img.shields.io/badge/version-1.0.0-blue) ";
          markdown += "![License](https://img.shields.io/badge/license-MIT-green)\n\n";
          break;

        case "stats-image":
          markdown += "## 📊 GitHub Statistics\n\n";
          markdown += "![GitHub Stats](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=radical&include_all_commits=true&count_private=true)\n\n";
          break;

        case "profile-card":
          markdown += "## 👤 Profile Card\n\n";
          markdown += "![Profile Card](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=radical)\n\n";
          break;

        case "streak-stats":
          markdown += "## 🔥 Streak Statistics\n\n";
          markdown += "![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=yourusername&theme=radical)\n\n";
          break;

        case "trophy-display":
          markdown += "## 🏆 GitHub Trophies\n\n";
          markdown += "![GitHub Trophy](https://github-profile-trophy.vercel.app/?username=yourusername&theme=radical&column=3&margin-w=15&margin-h=15)\n\n";
          break;

        case "contributions":
          markdown += "## 📈 Contribution Graph\n\n";
          markdown += "![Contribution Graph](https://github-readme-activity-graph.vercel.app/graph?username=yourusername&theme=radical)\n\n";
          break;

        case "languages":
          markdown += "## 💻 Top Languages\n\n";
          markdown += "![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=yourusername&layout=compact&theme=radical&langs_count=8)\n\n";
          break;

        case "recent-activity":
          markdown += "## ⚡ Recent Activity\n\n";
          markdown += "![Recent Activity](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=radical)\n\n";
          break;

        case "visitors-counter":
          markdown += "## 👁️ Profile Views\n\n";
          markdown += "![Profile Views](https://komarev.com/ghpvc/?username=yourusername&color=brightgreen&style=flat-square)\n\n";
          break;

        case "typing-svg":
          markdown += "## ⌨️ About Me\n\n";
          markdown += "![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=F75C7E&width=435&lines=Full+Stack+Developer;Always+learning+new+things;Love+to+code+and+create)\n\n";
          break;

        case "random-quote":
          markdown += "## 💭 Daily Quote\n\n";
          markdown += "![Quote](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical)\n\n";
          break;

        default:
          // Skip unknown component types
          console.log('Unknown component type:', component.type);
          break;
      }
    });

    // Add helpful note at the end
    markdown += "---\n\n";
    markdown += "**Note:** Replace `yourusername` with your actual GitHub username in the URLs above.\n\n";
    markdown += "*Generated with [FlexReadme](https://github.com/AyanAhmadKhan01/FlexReadme) - GitHub README Builder*\n";

    return markdown;
  };

  const handlePreviewMarkdown = () => {
    const markdown = generateMarkdown();
    setMarkdownContent(markdown);
    setIsPreviewOpen(true);
  };

  const copyMarkdownToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy markdown to clipboard:', err);
    }
  };
  return (
    <div className="h-10 bg-background border-b border-border/40 flex items-center justify-between px-4">
      {/* Left side - Project info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="text-lg">📝</div>
          <h2 className="text-sm font-semibold">GitHub README Builder</h2>
        </div>
        <Badge variant="outline" className="text-xs px-1.5 py-0.5 h-5">
          <Zap className="w-2.5 h-2.5 mr-1" />
          Live
        </Badge>
      </div>

      <div className="flex items-center gap-1">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-6 px-2 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handlePreviewMarkdown}>
              <FileText className="w-3 h-3 mr-2" />
              Export as Markdown (.md)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportPNG}>
              <Camera className="w-3 h-3 mr-2" />
              Export as PNG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Markdown Preview</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="text-xs">
                {markdownContent.split('\n').length} lines
              </Badge>
              <Button
                size="sm"
                onClick={copyMarkdownToClipboard}
                className="h-7 px-3 text-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {markdownContent}
              </pre>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <div className="w-px h-4 bg-border/40 mx-1" />

        <Button onClick={onSave} disabled={isSaving} size="sm" className="h-6 px-2 text-xs">
          <Save className="w-3 h-3 mr-1" />
          {isSaving ? "Saving..." : "Save"}
        </Button>
        <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
          <Github className="w-3 h-3 mr-1" />
          Push
        </Button>
      </div>
    </div>
  )
}
