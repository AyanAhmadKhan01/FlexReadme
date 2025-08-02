'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Heart, Eye, Download, Star, Github, ExternalLink, Copy, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"

// Mock template data (in real app this would come from API/database)
const mockTemplateData: Record<string, any> = {
  "1": {
    id: "1",
    title: "Professional Portfolio",
    description: "Clean and modern README template perfect for showcasing your professional projects and skills. This template includes sections for about, skills, projects, and contact information.",
    preview: "preview1.png",
    category: "professional",
    tags: ["portfolio", "professional", "clean", "modern"],
    stats: { likes: 1245, views: 8920, downloads: 2340, stars: 890 },
    author: { name: "Alex Johnson", avatar: "", username: "alexj", bio: "Full-stack developer passionate about clean code" },
    difficulty: "intermediate",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-18",
    isPopular: true,
    readme: `# Alex Johnson - Full Stack Developer

![Profile Banner](https://via.placeholder.com/800x200/4F46E5/white?text=Professional+Developer)

## 👋 About Me

I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. I love creating clean, efficient code and solving complex problems.

### 🚀 Skills

**Frontend**
- React, Next.js, TypeScript
- Tailwind CSS, Styled Components
- Redux, Zustand

**Backend**
- Node.js, Express, NestJS
- PostgreSQL, MongoDB
- Docker, AWS

### 📈 GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=alexj&show_icons=true&theme=radical)

### 🔥 Recent Projects

- **E-commerce Platform** - Full-stack React/Node.js application
- **Task Management Tool** - Real-time collaboration app
- **API Gateway** - Microservices architecture

### 📫 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/alexj)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/alexj)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:alex@example.com)

---

⭐ From [alexj](https://github.com/alexj)`,
    license: "MIT",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    features: [
      "Professional layout design",
      "GitHub stats integration", 
      "Social media badges",
      "Responsive sections",
      "Easy customization"
    ]
  },
  "2": {
    id: "2",
    title: "Creative Developer",
    description: "Eye-catching template with animations and creative elements for frontend developers.",
    preview: "preview2.png",
    category: "creative",
    tags: ["creative", "animations", "frontend", "colorful"],
    stats: { likes: 892, views: 5640, downloads: 1580, stars: 445 },
    author: { name: "Sarah Chen", avatar: "", username: "sarahc", bio: "UI/UX designer and creative developer" },
    difficulty: "advanced",
    createdAt: "2024-01-12",
    isTrending: true,
    readme: `# Sarah Chen ✨ Creative Developer

<div align="center">
  <img src="https://via.placeholder.com/600x300/FF6B6B/white?text=Creative+Magic" alt="Creative Banner"/>
</div>

## 🎨 Hello, Creative World!

I'm a creative developer who brings ideas to life through code and design. I specialize in creating beautiful, interactive experiences that users love.

<div align="center">
  <img src="https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif" width="400"/>
</div>

### 🌈 What I Do

\`\`\`javascript
const sarah = {
  code: ["JavaScript", "TypeScript", "Python"],
  design: ["Figma", "Adobe Creative Suite"],
  frameworks: ["React", "Vue", "Svelte"],
  creativity: "∞"
}
\`\`\`

### 🎯 Featured Projects

<table>
  <tr>
    <td width="50%">
      <h3>🎪 Interactive Portfolio</h3>
      <p>A playful, animated portfolio with micro-interactions</p>
      <img src="https://via.placeholder.com/300x200/4ECDC4/white?text=Portfolio" width="100%"/>
    </td>
    <td width="50%">
      <h3>🌟 Design System</h3>
      <p>Comprehensive UI components library</p>
      <img src="https://via.placeholder.com/300x200/45B7D1/white?text=Design+System" width="100%"/>
    </td>
  </tr>
</table>

### 🎉 Let's Connect!

<p align="center">
  <a href="https://dribbble.com/sarahc">
    <img src="https://img.shields.io/badge/Dribbble-EA4C89?style=for-the-badge&logo=dribbble&logoColor=white"/>
  </a>
  <a href="https://behance.net/sarahc">
    <img src="https://img.shields.io/badge/Behance-1769FF?style=for-the-badge&logo=behance&logoColor=white"/>
  </a>
  <a href="https://codepen.io/sarahc">
    <img src="https://img.shields.io/badge/CodePen-000000?style=for-the-badge&logo=codepen&logoColor=white"/>
  </a>
</p>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=sarahc&show_icons=true&theme=tokyonight" />
</div>

---

<p align="center">
  <i>✨ Creating magic, one pixel at a time ✨</i>
</p>`,
    license: "Creative Commons",
    technologies: ["HTML", "CSS", "JavaScript", "Animation Libraries"],
    features: [
      "Animated elements",
      "Creative layouts",
      "Interactive components",
      "Colorful design",
      "GIF integrations"
    ]
  }
}

export default function TemplatePage() {
  const params = useParams()
  const templateId = params?.templateId as string
  const [template, setTemplate] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (templateId && mockTemplateData[templateId]) {
      setTemplate(mockTemplateData[templateId])
      // Update view count
      mockTemplateData[templateId].stats.views += 1
    }
  }, [templateId])

  const handleCopyReadme = async () => {
    if (template?.readme) {
      await navigator.clipboard.writeText(template.readme)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (template?.readme) {
      const blob = new Blob([template.readme], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${template.title.toLowerCase().replace(/\s+/g, '-')}-readme.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      // Update download count
      template.stats.downloads += 1
    }
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Template Not Found</h1>
          <p className="text-muted-foreground mb-4">The template you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/discover" 
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Discover</span>
          </Link>
        </div>
      </div>
    )
  }

  const difficultyColors = {
    beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
    intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    advanced: 'bg-red-500/10 text-red-400 border-red-500/20'
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/discover"
                className="p-2 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">{template.title}</h1>
                <p className="text-sm text-muted-foreground">by @{template.author.username}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={handleCopyReadme}
                className="flex items-center space-x-2 px-4 py-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-sm"
              >
                <Copy className="h-4 w-4" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button 
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors text-sm"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview/Raw Toggle */}
            <div className="flex items-center space-x-2 bg-muted/30 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-mono transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                📸 Image Preview
              </button>
              <button
                onClick={() => setActiveTab('raw')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-mono transition-colors ${
                  activeTab === 'raw'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                📝 Raw Markdown
              </button>
            </div>

            {/* Content */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              {activeTab === 'preview' ? (
                <div className="p-6">
                  {/* README Image Preview */}
                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden mb-6">
                    <div className="p-6 space-y-6">
                      {/* Header Section */}
                      <div className="flex items-center space-x-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xl">{template.author.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{template.title}</h1>
                          <p className="text-gray-600 dark:text-gray-400">@{template.author.username} • {template.author.bio}</p>
                        </div>
                      </div>

                      {/* Badges Section */}
                      <div className="flex flex-wrap gap-2">
                        <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
                        <img src="https://img.shields.io/badge/Version-v1.0.0-brightgreen.svg" alt="Version" />
                        <img src={`https://img.shields.io/badge/Stars-${template.stats.stars}-yellow.svg`} alt="Stars" />
                        <img src="https://img.shields.io/badge/Language-TypeScript-blue.svg" alt="Language" />
                        <img src="https://img.shields.io/badge/Framework-React-61DAFB.svg" alt="Framework" />
                      </div>

                      {/* Description */}
                      <div className="prose dark:prose-invert">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {template.description}
                        </p>
                      </div>

                      {/* GitHub Stats Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <img 
                            src={`https://github-readme-stats.vercel.app/api?username=${template.author.username}&show_icons=true&theme=${template.id === '2' ? 'tokyonight' : 'default'}`}
                            alt="GitHub Stats" 
                            className="w-full"
                          />
                        </div>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <img 
                            src={`https://github-readme-streak-stats.herokuapp.com/?user=${template.author.username}&theme=${template.id === '2' ? 'tokyonight' : 'default'}`}
                            alt="GitHub Streak" 
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Activity Graph */}
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📈 Activity Graph</h3>
                        <img 
                          src={`https://github-readme-activity-graph.vercel.app/graph?username=${template.author.username}&theme=${template.id === '2' ? 'tokyo-night' : 'github'}`}
                          alt="Activity Graph" 
                          className="w-full"
                        />
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🛠️ Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {template.technologies?.map((tech: string, index: number) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Social Links */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🌐 Connect with me</h3>
                        <div className="flex flex-wrap gap-2">
                          <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
                          <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
                          <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
                          <img src="https://img.shields.io/badge/Portfolio-FF7139?style=for-the-badge&logo=aboutdotme&logoColor=white" alt="Portfolio" />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-center">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          ⭐ From <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">{template.author.username}</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Preview Info */}
                  <div className="text-center text-sm text-muted-foreground">
                    👆 This is how your README will look on GitHub
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <pre className="p-6 text-sm font-mono overflow-x-auto bg-muted/30 whitespace-pre-wrap">
                    {template.readme}
                  </pre>
                  <button
                    onClick={handleCopyReadme}
                    className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-background rounded-lg border border-border transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Template Info */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold mb-4">Template Info</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty</span>
                  <div className={`px-2 py-1 rounded text-xs font-mono border ${difficultyColors[template.difficulty as keyof typeof difficultyColors]}`}>
                    {template.difficulty}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <span className="text-sm font-mono">{template.category}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">License</span>
                  <span className="text-sm font-mono">{template.license}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm font-mono">{new Date(template.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold mb-4">Statistics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                    <Heart className="h-3 w-3" />
                    <span className="text-xs">Likes</span>
                  </div>
                  <div className="text-lg font-bold">{formatNumber(template.stats.likes)}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                    <Eye className="h-3 w-3" />
                    <span className="text-xs">Views</span>
                  </div>
                  <div className="text-lg font-bold">{formatNumber(template.stats.views)}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                    <Download className="h-3 w-3" />
                    <span className="text-xs">Downloads</span>
                  </div>
                  <div className="text-lg font-bold">{formatNumber(template.stats.downloads)}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                    <Star className="h-3 w-3" />
                    <span className="text-xs">Stars</span>
                  </div>
                  <div className="text-lg font-bold">{formatNumber(template.stats.stars)}</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted/50 rounded text-xs font-mono text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold mb-4">Technologies</h3>
              <div className="space-y-2">
                {template.technologies.map((tech: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm font-mono">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold mb-4">Author</h3>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-mono text-primary">
                    {template.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{template.author.name}</p>
                  <p className="text-sm text-muted-foreground">@{template.author.username}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{template.author.bio}</p>
              
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors text-sm">
                  <Github className="h-3 w-3" />
                  <span>Follow</span>
                </button>
                <button className="p-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors">
                  <Share2 className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
                  <Heart className="h-4 w-4" />
                  <span>Like Template</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 py-2 bg-muted/50 hover:bg-muted text-foreground rounded-lg transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  <span>Use in Editor</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 py-2 bg-muted/50 hover:bg-muted text-foreground rounded-lg transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share Template</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
