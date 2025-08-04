'use client'

import DiscoverHero from "../../components/discover-hero"
import TemplateCard from "../../components/template-card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const mockTemplates = [
  {
    id: "1",
    title: "Professional Portfolio",
    description: "Clean and modern README template perfect for showcasing your professional projects and skills.",
    preview: "preview1.png",
    category: "professional",
    tags: ["portfolio", "professional", "clean", "modern"],
    stats: { likes: 1245, views: 8920, downloads: 2340, stars: 890 },
    author: { name: "Alex Johnson", avatar: "", username: "alexj" },
    difficulty: "intermediate" as const,
    createdAt: "2024-01-15",
    isPopular: true
  },
  {
    id: "2", 
    title: "Creative Developer",
    description: "Eye-catching template with animations and creative elements for frontend developers.",
    preview: "preview2.png",
    category: "creative",
    tags: ["creative", "animations", "frontend", "colorful"],
    stats: { likes: 892, views: 5640, downloads: 1580, stars: 445 },
    author: { name: "Sarah Chen", avatar: "", username: "sarahc" },
    difficulty: "advanced" as const,
    createdAt: "2024-01-12",
    isTrending: true
  },
  {
    id: "3",
    title: "Minimal Clean",
    description: "Simple and elegant README focusing on content with minimal distractions.",
    preview: "preview3.png", 
    category: "minimal",
    tags: ["minimal", "clean", "simple", "typography"],
    stats: { likes: 756, views: 4230, downloads: 1120, stars: 320 },
    author: { name: "David Kim", avatar: "", username: "davidk" },
    difficulty: "beginner" as const,
    createdAt: "2024-01-10"
  },
  {
    id: "4",
    title: "Open Source Project",
    description: "Comprehensive template for open source projects with contribution guidelines and badges.",
    preview: "preview4.png",
    category: "open-source", 
    tags: ["open-source", "badges", "contributing", "documentation"],
    stats: { likes: 2134, views: 12450, downloads: 3890, stars: 1234 },
    author: { name: "Emma Wilson", avatar: "", username: "emmaw" },
    difficulty: "intermediate" as const,
    createdAt: "2024-01-08",
    isPopular: true
  },
  {
    id: "5",
    title: "Startup Landing",
    description: "Professional README template designed for startup projects and company repositories.",
    preview: "preview5.png",
    category: "professional",
    tags: ["startup", "business", "corporate", "landing"],
    stats: { likes: 645, views: 3580, downloads: 890, stars: 234 },
    author: { name: "Michael Brown", avatar: "", username: "mikeb" },
    difficulty: "intermediate" as const,
    createdAt: "2024-01-05"
  },
  {
    id: "6",
    title: "Gaming Project", 
    description: "Fun and engaging template perfect for game development projects and indie games.",
    preview: "preview6.png",
    category: "creative",
    tags: ["gaming", "indie", "fun", "entertainment"],
    stats: { likes: 1089, views: 6780, downloads: 1675, stars: 567 },
    author: { name: "Lisa Garcia", avatar: "", username: "lisag" },
    difficulty: "beginner" as const,
    createdAt: "2024-01-03",
    isTrending: true
  },
  {
    id: "7",
    title: "API Documentation",
    description: "Technical template focused on API documentation with clear endpoints and examples.",
    preview: "preview7.png",
    category: "professional",
    tags: ["api", "documentation", "technical", "endpoints"],
    stats: { likes: 987, views: 7240, downloads: 2140, stars: 678 },
    author: { name: "James Taylor", avatar: "", username: "jamest" },
    difficulty: "advanced" as const,
    createdAt: "2024-01-01"
  },
  {
    id: "8",
    title: "Portfolio Showcase",
    description: "Elegant portfolio template highlighting your best work and achievements.",
    preview: "preview8.png",
    category: "portfolio",
    tags: ["portfolio", "showcase", "achievements", "elegant"],
    stats: { likes: 1456, views: 9350, downloads: 2780, stars: 892 },
    author: { name: "Rachel Adams", avatar: "", username: "rachela" },
    difficulty: "intermediate" as const,
    createdAt: "2023-12-28",
    isPopular: true
  }
]

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar/>
      <DiscoverHero/>
      <section className="container max-w-[1200px] mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
            {mockTemplates.map((template, i) => (
          <TemplateCard template={template} key={i}/>   
               ))}
          </div>
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors font-mono text-sm">
              Load More Templates
            </button>
          </div>
      </section>
      <Footer/>
    </div>
  )
}