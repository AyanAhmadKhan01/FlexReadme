'use client'

import { useState } from "react"
import { Play, CheckCircle, ArrowRight, Eye, Sparkles, Zap, Palette, Bot, Search, Filter, Settings, Download, Share, Github, Mouse, Grid, Paintbrush, Monitor, Copy, Link } from "lucide-react"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function Tutorial() {
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Main tutorial video
  const mainVideo = {
    title: "FlexReadme Complete Tutorial",
    description: "A comprehensive guide covering all features of FlexReadme - from discovering templates to creating custom README files with our image-based generator and live editor.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual tutorial video
    duration: "15:30",
    thumbnail: "https://via.placeholder.com/800x450/4F46E5/white?text=FlexReadme+Tutorial"
  }

  const steps = [
    {
      id: 1,
      title: "Getting Started",
      subtitle: "Create your first README",
      description: "Begin your journey with FlexReadme by exploring the dashboard and understanding the interface.",
      duration: "0:00 - 3:00",
      features: [
        "Navigate the dashboard",
        "Understand the interface", 
        "Choose your workflow",
        "Access templates gallery"
      ],
      icon: Sparkles,
      color: "purple"
    },
    {
      id: 2, 
      title: "Discover Templates",
      subtitle: "Browse image-based templates",
      description: "Explore our curated collection of README templates with live image previews and find the perfect style.",
      duration: "3:00 - 6:30",
      features: [
        "Browse template gallery",
        "Filter by category",
        "Preview image-based designs",
        "Copy template markdown"
      ],
      icon: Eye,
      color: "blue"
    },
    {
      id: 3,
      title: "Use the Generator",
      subtitle: "Create custom components",
      description: "Generate beautiful GitHub stats, badges, and social links with our image-based component generators.",
      duration: "6:30 - 10:00",
      features: [
        "Generate GitHub stats cards",
        "Create custom badges",
        "Add social links",
        "Configure themes and styles"
      ],
      icon: Bot,
      color: "green"
    },
    {
      id: 4,
      title: "Live Editor",
      subtitle: "Design with drag & drop",
      description: "Use our powerful bento-style editor to create unique layouts with real-time preview and customization.",
      duration: "10:00 - 13:30",
      features: [
        "Drag and drop components",
        "Real-time preview",
        "Bento grid layouts",
        "Custom styling options"
      ],
      icon: Palette,
      color: "orange"
    },
    {
      id: 5,
      title: "Export & Deploy",
      subtitle: "Save and share your README",
      description: "Export your README as markdown, copy the code, or deploy directly to your GitHub repository.",
      duration: "13:30 - 15:30",
      features: [
        "Export as markdown",
        "Copy to clipboard",
        "Preview final result",
        "Deploy to GitHub"
      ],
      icon: Zap,
      color: "cyan"
    }
  ]

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex])
    }
  }

  const getStepColor = (color: string) => {
    const colors = {
      purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
      blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
      green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20" },
      orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
      cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" }
    }
    return colors[color as keyof typeof colors] || colors.purple
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-background overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/5 rotate-12 rounded-3xl blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/5 rotate-45 rounded-3xl blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 border border-purple-500/10 rotate-12 rounded-3xl" />
        </div>

        <div className="container max-w-[1200px] mx-auto px-4 relative z-10 py-20">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Play className="h-4 w-4 text-primary" />
              <span className="text-sm font-mono text-primary">Step-by-Step Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              <span className="text-primary">How to Use</span>
              <span className="block">FlexReadme</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
              {'>'} Master FlexReadme with our comprehensive video tutorials and step-by-step guides
            </p>
          </div>

          {/* Progress Overview */}
          <div className="flex justify-center mb-16">
            <div className="flex items-center space-x-4 bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/60">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-sm font-mono">{completedSteps.length}/{steps.length} Steps Complete</span>
              </div>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Steps */}
      <section className="container max-w-[1400px] mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <h3 className="font-semibold text-lg mb-4">Tutorial Steps</h3>
              {steps.map((step, index) => {
                const IconComponent = step.icon
                const colors = getStepColor(step.color)
                const isActive = activeStep === index
                const isCompleted = completedSteps.includes(index)
                
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                      isActive 
                        ? `${colors.bg} ${colors.border} ${colors.text}` 
                        : 'bg-card/50 border-border/60 text-muted-foreground hover:bg-card/80 hover:border-primary/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isActive ? colors.bg : 'bg-muted/50'}`}>
                        <IconComponent className={`h-4 w-4 ${isActive ? colors.text : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{step.title}</span>
                          {isCompleted && <CheckCircle className="h-4 w-4 text-green-400" />}
                        </div>
                        <p className="text-xs opacity-70 truncate">{step.subtitle}</p>
                      </div>
                      <span className="text-xs opacity-50">{step.duration}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`transition-all duration-500 ${
                  activeStep === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute pointer-events-none'
                }`}
              >
                {activeStep === index && (
                  <div className="space-y-6">
                    {/* Step Header */}
                    <div className="bg-card rounded-lg border border-border p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl ${getStepColor(step.color).bg} ${getStepColor(step.color).border} border`}>
                            <step.icon className={`h-6 w-6 ${getStepColor(step.color).text}`} />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">{step.title}</h2>
                            <p className="text-muted-foreground">{step.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{step.duration}</span>
                          <button
                            onClick={() => markStepComplete(index)}
                            className={`p-2 rounded-lg transition-colors ${
                              completedSteps.includes(index)
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>

                    {/* Single Main Video */}
                    <div className="bg-card rounded-lg border border-border overflow-hidden">
                      <div className="aspect-video bg-black/90 relative group">
                        <iframe
                          src={mainVideo.video}
                          title={mainVideo.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-lg">{mainVideo.title}</h4>
                            <p className="text-sm text-muted-foreground">{mainVideo.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                              {mainVideo.duration}
                            </span>
                          </div>
                        </div>
                        
                        {/* Video Timeline for Current Step */}
                        <div className="bg-muted/30 rounded-lg p-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{step.title} Section:</span>
                            <span className="text-muted-foreground">{step.duration}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Jump to this section in the video above
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Step Features */}
                    <div className="bg-card rounded-lg border border-border p-6">
                      <h4 className="font-semibold text-lg mb-4">What You'll Learn</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Text Tutorial Content */}
                    <div className="bg-card rounded-lg border border-border p-6">
                      <h4 className="font-semibold text-lg mb-4">Step-by-Step Instructions</h4>
                      <div className="prose prose-sm max-w-none">
                        {step.id === 1 && (
                          <div className="space-y-6">
                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-purple-500/20 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span>
                                Welcome to FlexReadme Dashboard
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x300/1a1a1a/ffffff?text=FlexReadme+Dashboard" 
                                  alt="FlexReadme Dashboard" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">
                                When you first open FlexReadme, you'll see the main dashboard with four key sections:
                              </p>
                              <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                                <li><strong>Discover:</strong> Browse pre-made README templates</li>
                                <li><strong>Generator:</strong> Create custom components</li>
                                <li><strong>Editor:</strong> Design with drag & drop</li>
                                <li><strong>Tutorial:</strong> Learn how to use all features</li>
                              </ul>
                            </div>

                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-purple-500/20 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span>
                                Choose Your Workflow
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x200/2563eb/ffffff?text=Three+Workflow+Options" 
                                  alt="Workflow Options" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">Select the approach that best fits your needs:</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                                <div className="bg-card border rounded-lg p-3">
                                  <h6 className="font-medium text-sm text-blue-400 flex items-center"><Palette className="h-4 w-4 mr-1" /> Browse Templates</h6>
                                  <p className="text-xs text-muted-foreground mt-1">Perfect for quick starts with proven designs</p>
                                </div>
                                <div className="bg-card border rounded-lg p-3">
                                  <h6 className="font-medium text-sm text-green-400 flex items-center"><Bot className="h-4 w-4 mr-1" /> Use Generator</h6>
                                  <p className="text-xs text-muted-foreground mt-1">Create custom stats, badges, and components</p>
                                </div>
                                <div className="bg-card border rounded-lg p-3">
                                  <h6 className="font-medium text-sm text-orange-400 flex items-center"><Sparkles className="h-4 w-4 mr-1" /> Live Editor</h6>
                                  <p className="text-xs text-muted-foreground mt-1">Full creative control with visual editing</p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-purple-500/20 text-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">3</span>
                                Understanding the Interface
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x250/059669/ffffff?text=Interface+Overview" 
                                  alt="Interface Overview" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground">
                                The interface is designed for intuitive navigation with real-time previews, 
                                dark/light theme support, and easy access to all tools needed for professional README creation.
                              </p>
                            </div>
                          </div>
                        )}

                        {step.id === 2 && (
                          <div className="space-y-6">
                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span>
                                Access the Discover Page
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x300/1e40af/ffffff?text=Discover+Templates+Gallery" 
                                  alt="Discover Templates Gallery" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">
                                Navigate to the Discover section to explore our curated collection of README templates.
                                Each template shows a live image preview of how your README will look.
                              </p>
                              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mt-3">
                                <p className="text-sm text-blue-400 flex items-center"><Eye className="h-4 w-4 mr-1" /> <strong>Pro Tip:</strong> Templates are organized by categories like Web Development, Mobile Apps, AI/ML, and more.</p>
                              </div>
                            </div>

                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span>
                                Browse and Filter Templates
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x250/1d4ed8/ffffff?text=Search+and+Filter+Interface" 
                                  alt="Search and Filter Interface" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">Use the powerful search and filtering system:</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                <div className="space-y-2">
                                  <h6 className="font-medium text-sm flex items-center"><Search className="h-4 w-4 mr-1" /> Search Features:</h6>
                                  <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1 ml-4">
                                    <li>Search by keywords or project type</li>
                                    <li>Real-time search results</li>
                                    <li>Popular search suggestions</li>
                                  </ul>
                                </div>
                                <div className="space-y-2">
                                  <h6 className="font-medium text-sm flex items-center"><Filter className="h-4 w-4 mr-1" /> Filter Options:</h6>
                                  <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1 ml-4">
                                    <li>Filter by categories (Web, Mobile, AI, etc.)</li>
                                    <li>Sort by popularity or recent uploads</li>
                                    <li>Filter by complexity level</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-blue-500/20 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">3</span>
                                Preview and Select Templates
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x300/2563eb/ffffff?text=Template+Preview+Modal" 
                                  alt="Template Preview Modal" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">
                                Click any template for a detailed preview showing both the image result and markdown code.
                                When ready, click "Use Template" to start customizing.
                              </p>
                              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-3">
                                <p className="text-sm text-green-400 flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> <strong>Next Step:</strong> After selecting a template, you'll be taken to the editor where you can customize it.</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {step.id === 3 && (
                          <div className="space-y-6">
                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-green-500/20 text-green-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span>
                                Access the Generator Tools
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x300/059669/ffffff?text=Generator+Dashboard" 
                                  alt="Generator Dashboard" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">
                                The Generator page contains multiple tools for creating image-based README components.
                                Each generator creates actual images that work perfectly in GitHub READMEs.
                              </p>
                            </div>

                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-green-500/20 text-green-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span>
                                Generate GitHub Stats Cards
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x250/10b981/ffffff?text=GitHub+Stats+Generator" 
                                  alt="GitHub Stats Generator" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">Create beautiful GitHub statistics cards with these steps:</p>
                              <div className="space-y-3">
                                <div className="flex items-start space-x-2">
                                  <span className="bg-green-500/20 text-green-400 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                                  <div>
                                    <p className="text-sm font-medium">Enter your GitHub username</p>
                                    <p className="text-xs text-muted-foreground">Make sure your GitHub profile is public for stats to work</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="bg-green-500/20 text-green-400 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                                  <div>
                                    <p className="text-sm font-medium">Choose themes and styles</p>
                                    <p className="text-xs text-muted-foreground">Dark, light, transparent, and custom color options</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="bg-green-500/20 text-green-400 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                                  <div>
                                    <p className="text-sm font-medium">Customize layout and colors</p>
                                    <p className="text-xs text-muted-foreground">Adjust card size, hide specific stats, change colors</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="bg-green-500/20 text-green-400 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</span>
                                  <div>
                                    <p className="text-sm font-medium">Copy the generated markdown</p>
                                    <p className="text-xs text-muted-foreground">One-click copy of the complete markdown code</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-green-500/20 text-green-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">3</span>
                                Create Badges and Social Links
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x200/16a34a/ffffff?text=Badges+and+Social+Links" 
                                  alt="Badges and Social Links Generator" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">
                                Use the badge generator for custom shields and social links generator for your profiles.
                                All components are image-based and work seamlessly in GitHub READMEs.
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                <div className="bg-card border rounded-lg p-3">
                                  <h6 className="font-medium text-sm text-blue-400 flex items-center"><Settings className="h-4 w-4 mr-1" /> Badge Generator</h6>
                                  <p className="text-xs text-muted-foreground mt-1">Create custom shields for technologies, status, version info</p>
                                </div>
                                <div className="bg-card border rounded-lg p-3">
                                  <h6 className="font-medium text-sm text-purple-400 flex items-center"><Link className="h-4 w-4 mr-1" /> Social Links</h6>
                                  <p className="text-xs text-muted-foreground mt-1">Add LinkedIn, Twitter, portfolio links with icons</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {step.id === 4 && (
                          <div className="space-y-6">
                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-orange-500/20 text-orange-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span>
                                Open the Live Editor
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x300/ea580c/ffffff?text=Bento+Style+Editor+Interface" 
                                  alt="Bento Style Editor Interface" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">
                                The Live Editor features a bento-style grid system for creating unique, modern README layouts.
                                Everything you see is what you get - real-time preview as you design.
                              </p>
                            </div>

                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-orange-500/20 text-orange-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span>
                                Design Your Layout
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x250/f97316/ffffff?text=Drag+and+Drop+Components" 
                                  alt="Drag and Drop Components" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">Create professional layouts with these powerful features:</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                <div className="space-y-2">
                                  <h6 className="font-medium text-sm flex items-center"><Mouse className="h-4 w-4 mr-1" /> Drag & Drop:</h6>
                                  <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1 ml-4">
                                    <li>Drag components from the sidebar</li>
                                    <li>Drop anywhere on the canvas</li>
                                    <li>Automatic grid snapping</li>
                                    <li>Smart collision detection</li>
                                  </ul>
                                </div>
                                <div className="space-y-2">
                                  <h6 className="font-medium text-sm flex items-center"><Grid className="h-4 w-4 mr-1" /> Resize & Arrange:</h6>
                                  <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1 ml-4">
                                    <li>Resize by dragging corners</li>
                                    <li>Bento-grid style layouts</li>
                                    <li>Responsive design preview</li>
                                    <li>Auto-alignment helpers</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-orange-500/20 text-orange-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">3</span>
                                Customize and Style
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x200/fb923c/ffffff?text=Styling+and+Customization+Panel" 
                                  alt="Styling and Customization Panel" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">
                                Fine-tune every detail with professional-grade styling tools:
                              </p>
                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <Paintbrush className="h-4 w-4 text-orange-400" />
                                  <span className="text-sm">Custom themes and color schemes</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Settings className="h-4 w-4 text-orange-400" />
                                  <span className="text-sm">Spacing and margin controls</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Monitor className="h-4 w-4 text-orange-400" />
                                  <span className="text-sm">Background and border styling</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Sparkles className="h-4 w-4 text-orange-400" />
                                  <span className="text-sm">Animations and hover effects</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {step.id === 5 && (
                          <div className="space-y-6">
                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span>
                                Preview Your README
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x300/0891b2/ffffff?text=Live+README+Preview" 
                                  alt="Live README Preview" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">
                                Before exporting, use the comprehensive preview feature to see exactly how your README will appear on GitHub.
                                The preview includes all images, formatting, and interactive elements.
                              </p>
                              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3 mt-3">
                                <p className="text-sm text-cyan-400 flex items-center"><Eye className="h-4 w-4 mr-1" /> <strong>Preview Features:</strong> GitHub-accurate rendering, mobile responsive view, dark/light mode toggle</p>
                              </div>
                            </div>

                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span>
                                Choose Export Method
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x250/0e7490/ffffff?text=Export+Options+Panel" 
                                  alt="Export Options Panel" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">Multiple export options to fit your workflow:</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                <div className="bg-card border rounded-lg p-3">
                                  <h6 className="font-medium text-sm text-blue-400 mb-2 flex items-center"><Copy className="h-4 w-4 mr-1" /> Copy Markdown</h6>
                                  <p className="text-xs text-muted-foreground">Copy complete markdown code to clipboard for manual pasting</p>
                                </div>
                                <div className="bg-card border rounded-lg p-3">
                                  <h6 className="font-medium text-sm text-green-400 mb-2 flex items-center"><Download className="h-4 w-4 mr-1" /> Download File</h6>
                                  <p className="text-xs text-muted-foreground">Save as README.md file directly to your computer</p>
                                </div>
                                <div className="bg-card border rounded-lg p-3">
                                  <h6 className="font-medium text-sm text-purple-400 mb-2 flex items-center"><Github className="h-4 w-4 mr-1" /> GitHub Integration</h6>
                                  <p className="text-xs text-muted-foreground">Direct deploy to your GitHub repository automatically</p>
                                </div>
                                <div className="bg-card border rounded-lg p-3">
                                  <h6 className="font-medium text-sm text-orange-400 mb-2 flex items-center"><Share className="h-4 w-4 mr-1" /> Share Link</h6>
                                  <p className="text-xs text-muted-foreground">Create shareable template link for others to use</p>
                                </div>
                              </div>
                            </div>

                            <div className="bg-muted/20 rounded-lg p-4">
                              <h5 className="font-semibold text-base mb-3 flex items-center">
                                <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">3</span>
                                Deploy to GitHub
                              </h5>
                              <div className="mb-3">
                                <img 
                                  src="https://via.placeholder.com/600x200/06b6d4/ffffff?text=GitHub+Deployment+Success" 
                                  alt="GitHub Deployment Success" 
                                  className="w-full rounded-lg border border-border mb-3"
                                />
                              </div>
                              <p className="text-muted-foreground mb-2">
                                Complete the process by deploying your README:
                              </p>
                              <div className="space-y-3">
                                <div className="flex items-start space-x-2">
                                  <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                                  <div>
                                    <p className="text-sm font-medium">Connect GitHub account (for auto-deploy)</p>
                                    <p className="text-xs text-muted-foreground">Secure OAuth connection with repository access</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                                  <div>
                                    <p className="text-sm font-medium">Select repository and branch</p>
                                    <p className="text-xs text-muted-foreground">Choose where to commit your new README</p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <span className="bg-cyan-500/20 text-cyan-400 rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                                  <div>
                                    <p className="text-sm font-medium">Automatic commit and push</p>
                                    <p className="text-xs text-muted-foreground">FlexReadme handles the GitHub API integration</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-4">
                                <p className="text-sm text-green-400 flex items-center"><Zap className="h-4 w-4 mr-1" /> <strong>Congratulations!</strong> Your professional README is now live on GitHub!</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-6">
                      <button
                        onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                        disabled={activeStep === 0}
                        className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                        <span>Previous</span>
                      </button>

                      <div className="flex items-center space-x-2">
                        {steps.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              i === activeStep ? 'bg-primary' : i < activeStep ? 'bg-green-400' : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                        disabled={activeStep === steps.length - 1}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                      >
                        <span>Next</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>


      </section>
      </div>
      <Footer />
    </>
  )
}