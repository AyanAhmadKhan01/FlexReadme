"use client"

import {
  Globe,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  TrendingUp,
  BarChart,
  Code,
  Star,
  Heart,
  Shield,
  Users
} from "lucide-react"

export interface CustomCardTemplate {
  id: string
  name: string
  description: string
  category: string
  component: string
}

// Predefined custom card templates (limit of 10)
export const CUSTOM_CARD_TEMPLATES: CustomCardTemplate[] = [
  {
    id: 'social-links',
    name: 'Social Links Card',
    description: 'Connect with me social media links',
    category: 'social',
    component: `<div className="p-4 h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg">
  <Globe className="h-8 w-8 mb-3" />
  <h3 className="text-lg font-bold mb-3">Connect With Me</h3>
  <div className="flex gap-3">
    <Github className="h-6 w-6 hover:scale-110 transition-transform cursor-pointer" />
    <Twitter className="h-6 w-6 hover:scale-110 transition-transform cursor-pointer" />
    <Linkedin className="h-6 w-6 hover:scale-110 transition-transform cursor-pointer" />
    <Mail className="h-6 w-6 hover:scale-110 transition-transform cursor-pointer" />
  </div>
</div>`
  },
  {
    id: 'stats-card',
    name: 'Project Stats',
    description: 'Display project statistics and metrics',
    category: 'stats',
    component: `<div className="p-4 h-full flex flex-col bg-card border rounded-lg">
  <div className="flex items-center mb-4">
    <BarChart className="h-5 w-5 text-blue-500 mr-2" />
    <h3 className="text-lg font-semibold">Project Stats</h3>
  </div>
  <div className="grid grid-cols-2 gap-4 flex-1">
    <div className="text-center">
      <div className="text-2xl font-bold text-green-500">1.2k</div>
      <div className="text-sm text-muted-foreground">Stars</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-blue-500">456</div>
      <div className="text-sm text-muted-foreground">Forks</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-purple-500">78</div>
      <div className="text-sm text-muted-foreground">Issues</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-orange-500">23</div>
      <div className="text-sm text-muted-foreground">PRs</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'contact-info',
    name: 'Contact Information',
    description: 'Display contact details and location',
    category: 'contact',
    component: `<div className="p-4 h-full flex flex-col bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg">
  <div className="flex items-center mb-4">
    <Mail className="h-5 w-5 mr-2" />
    <h3 className="text-lg font-semibold">Get in Touch</h3>
  </div>
  <div className="space-y-3 flex-1">
    <div className="flex items-center">
      <Mail className="h-4 w-4 mr-2" />
      <span className="text-sm">your.email@example.com</span>
    </div>
    <div className="flex items-center">
      <Phone className="h-4 w-4 mr-2" />
      <span className="text-sm">+1 (555) 123-4567</span>
    </div>
    <div className="flex items-center">
      <MapPin className="h-4 w-4 mr-2" />
      <span className="text-sm">San Francisco, CA</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'tech-stack',
    name: 'Technology Stack',
    description: 'Showcase your tech stack and skills',
    category: 'skills',
    component: `<div className="p-4 h-full flex flex-col bg-card border rounded-lg">
  <div className="flex items-center mb-4">
    <Code className="h-5 w-5 text-purple-500 mr-2" />
    <h3 className="text-lg font-semibold">Tech Stack</h3>
  </div>
  <div className="grid grid-cols-2 gap-2 flex-1 content-start">
    <div className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded text-xs font-medium">React</div>
    <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-medium">Node.js</div>
    <div className="bg-purple-500/10 text-purple-500 px-2 py-1 rounded text-xs font-medium">TypeScript</div>
    <div className="bg-orange-500/10 text-orange-500 px-2 py-1 rounded text-xs font-medium">Next.js</div>
    <div className="bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded text-xs font-medium">Tailwind</div>
    <div className="bg-pink-500/10 text-pink-500 px-2 py-1 rounded text-xs font-medium">MongoDB</div>
  </div>
</div>`
  },
  {
    id: 'progress-card',
    name: 'Progress Tracker',
    description: 'Track project development progress',
    category: 'stats',
    component: `<div className="p-4 h-full flex flex-col bg-card border rounded-lg">
  <div className="flex items-center mb-4">
    <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
    <h3 className="text-lg font-semibold">Development Progress</h3>
  </div>
  <div className="space-y-3 flex-1">
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>Core Features</span>
        <span>85%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
      </div>
    </div>
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>Documentation</span>
        <span>60%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
      </div>
    </div>
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>Testing</span>
        <span>40%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-orange-500 h-2 rounded-full" style={{width: '40%'}}></div>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'status-card',
    name: 'Project Status',
    description: 'Show current project health status',
    category: 'status',
    component: `<div className="p-4 h-full flex flex-col bg-card border rounded-lg">
  <div className="flex items-center mb-4">
    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
    <h3 className="text-lg font-semibold">Status</h3>
  </div>
  <div className="space-y-3 flex-1">
    <div className="flex items-center">
      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
      <span className="text-sm">Build Passing</span>
    </div>
    <div className="flex items-center">
      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
      <span className="text-sm">Tests Passing</span>
    </div>
    <div className="flex items-center">
      <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
      <span className="text-sm">Security Review Pending</span>
    </div>
    <div className="flex items-center">
      <Info className="h-4 w-4 text-blue-500 mr-2" />
      <span className="text-sm">Documentation Updated</span>
    </div>
  </div>
</div>`
  },
  {
    id: 'team-card',
    name: 'Team Members',
    description: 'Display team members and roles',
    category: 'team',
    component: `<div className="p-4 h-full flex flex-col bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg">
  <div className="flex items-center mb-4">
    <Users className="h-5 w-5 mr-2" />
    <h3 className="text-lg font-semibold">Our Team</h3>
  </div>
  <div className="grid grid-cols-2 gap-3 flex-1">
    <div className="text-center">
      <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-1"></div>
      <div className="text-xs font-medium">John Doe</div>
      <div className="text-xs opacity-75">Lead Dev</div>
    </div>
    <div className="text-center">
      <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-1"></div>
      <div className="text-xs font-medium">Jane Smith</div>
      <div className="text-xs opacity-75">Designer</div>
    </div>
    <div className="text-center">
      <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-1"></div>
      <div className="text-xs font-medium">Mike Johnson</div>
      <div className="text-xs opacity-75">DevOps</div>
    </div>
    <div className="text-center">
      <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-1"></div>
      <div className="text-xs font-medium">Sarah Wilson</div>
      <div className="text-xs opacity-75">QA</div>
    </div>
  </div>
</div>`
  },
  {
    id: 'sponsors-card',
    name: 'Sponsors',
    description: 'Show sponsors and support options',
    category: 'support',
    component: `<div className="p-4 h-full flex flex-col bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg">
  <div className="flex items-center mb-4">
    <Heart className="h-5 w-5 mr-2" />
    <h3 className="text-lg font-semibold">Sponsors</h3>
  </div>
  <div className="text-center flex-1 flex flex-col justify-center">
    <Star className="h-8 w-8 mx-auto mb-3 animate-pulse" />
    <p className="text-sm mb-2">Support this project</p>
    <div className="text-xs opacity-90">
      Become a sponsor and get your logo here!
    </div>
  </div>
</div>`
  },
  {
    id: 'downloads-card',
    name: 'Downloads',
    description: 'Display download statistics',
    category: 'stats',
    component: `<div className="p-4 h-full flex flex-col bg-card border rounded-lg">
  <div className="flex items-center mb-4">
    <Download className="h-5 w-5 text-green-500 mr-2" />
    <h3 className="text-lg font-semibold">Downloads</h3>
  </div>
  <div className="text-center flex-1 flex flex-col justify-center">
    <div className="text-3xl font-bold text-green-500 mb-2">1.2M+</div>
    <p className="text-sm text-muted-foreground mb-2">Total Downloads</p>
    <div className="text-xs text-muted-foreground">
      <TrendingUp className="h-3 w-3 inline mr-1" />
      +15% this month
    </div>
  </div>
</div>`
  },
  {
    id: 'made-by-card',
    name: 'Made By',
    description: 'Show project creator and contributors',
    category: 'credits',
    component: `<div className="p-4 h-full flex flex-col bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg">
  <div className="flex items-center mb-4">
    <Users className="h-5 w-5 mr-2" />
    <h3 className="text-lg font-semibold">Made By</h3>
  </div>
  <div className="flex-1 flex flex-col justify-center items-center text-center">
    <div className="w-12 h-12 bg-white/20 rounded-full mb-3 flex items-center justify-center">
      <Users className="h-6 w-6" />
    </div>
    <h4 className="font-bold text-lg mb-1">Your Name</h4>
    <p className="text-sm opacity-90 mb-2">Full Stack Developer</p>
    <div className="flex gap-2">
      <Github className="h-4 w-4 opacity-75 hover:opacity-100 cursor-pointer" />
      <Linkedin className="h-4 w-4 opacity-75 hover:opacity-100 cursor-pointer" />
      <Mail className="h-4 w-4 opacity-75 hover:opacity-100 cursor-pointer" />
    </div>
  </div>
</div>`
  },
  {
    id: 'contribute-card',
    name: 'How to Contribute',
    description: 'Instructions for contributing to the project',
    category: 'community',
    component: `<div className="p-4 h-full flex flex-col bg-card border rounded-lg">
  <div className="flex items-center mb-4">
    <Heart className="h-5 w-5 text-red-500 mr-2" />
    <h3 className="text-lg font-semibold">Contribute</h3>
  </div>
  <div className="space-y-3 flex-1 text-sm">
    <div className="flex items-start gap-2">
      <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
      <span>Fork the repository</span>
    </div>
    <div className="flex items-start gap-2">
      <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
      <span>Create feature branch</span>
    </div>
    <div className="flex items-start gap-2">
      <div className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
      <span>Make your changes</span>
    </div>
    <div className="flex items-start gap-2">
      <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</div>
      <span>Submit pull request</span>
    </div>
  </div>
</div>`
  }
]

// Component renderer function
export function renderCustomCard(templateId: string) {
  try {
    const customComponent = CUSTOM_CARD_TEMPLATES.find(template => 
      template.id === templateId
    )
    
    if (customComponent) {
      switch (customComponent.id) {
        case 'social-links':
          return (
            <div className="p-4 h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg">
              <Globe className="h-8 w-8 mb-3" />
              <h3 className="text-lg font-bold mb-3">Connect With Me</h3>
              <div className="flex gap-3">
                <Github className="h-6 w-6 hover:scale-110 transition-transform cursor-pointer" />
                <Twitter className="h-6 w-6 hover:scale-110 transition-transform cursor-pointer" />
                <Linkedin className="h-6 w-6 hover:scale-110 transition-transform cursor-pointer" />
                <Mail className="h-6 w-6 hover:scale-110 transition-transform cursor-pointer" />
              </div>
            </div>
          )
        
        case 'stats-card':
          return (
            <div className="p-4 h-full flex flex-col bg-card border rounded-lg">
              <div className="flex items-center mb-4">
                <BarChart className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold">Project Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">1.2k</div>
                  <div className="text-sm text-muted-foreground">Stars</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">456</div>
                  <div className="text-sm text-muted-foreground">Forks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">78</div>
                  <div className="text-sm text-muted-foreground">Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">23</div>
                  <div className="text-sm text-muted-foreground">PRs</div>
                </div>
              </div>
            </div>
          )
        
        case 'contact-info':
          return (
            <div className="p-4 h-full flex flex-col bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg">
              <div className="flex items-center mb-4">
                <Mail className="h-5 w-5 mr-2" />
                <h3 className="text-lg font-semibold">Get in Touch</h3>
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">your.email@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>
          )
        
        case 'tech-stack':
          return (
            <div className="p-4 h-full flex flex-col bg-card border rounded-lg">
              <div className="flex items-center mb-4">
                <Code className="h-5 w-5 text-purple-500 mr-2" />
                <h3 className="text-lg font-semibold">Tech Stack</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1 content-start">
                <div className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded text-xs font-medium">React</div>
                <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-medium">Node.js</div>
                <div className="bg-purple-500/10 text-purple-500 px-2 py-1 rounded text-xs font-medium">TypeScript</div>
                <div className="bg-orange-500/10 text-orange-500 px-2 py-1 rounded text-xs font-medium">Next.js</div>
                <div className="bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded text-xs font-medium">Tailwind</div>
                <div className="bg-pink-500/10 text-pink-500 px-2 py-1 rounded text-xs font-medium">MongoDB</div>
              </div>
            </div>
          )
        
        case 'progress-card':
          return (
            <div className="p-4 h-full flex flex-col bg-card border rounded-lg">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold">Development Progress</h3>
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Core Features</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Documentation</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Testing</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )
        
        case 'status-card':
          return (
            <div className="p-4 h-full flex flex-col bg-card border rounded-lg">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold">Status</h3>
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Build Passing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Tests Passing</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                  <span className="text-sm">Security Review Pending</span>
                </div>
                <div className="flex items-center">
                  <Info className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">Documentation Updated</span>
                </div>
              </div>
            </div>
          )
        
        case 'team-card':
          return (
            <div className="p-4 h-full flex flex-col bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg">
              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 mr-2" />
                <h3 className="text-lg font-semibold">Our Team</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div className="text-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs font-medium">John Doe</div>
                  <div className="text-xs opacity-75">Lead Dev</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs font-medium">Jane Smith</div>
                  <div className="text-xs opacity-75">Designer</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs font-medium">Mike Johnson</div>
                  <div className="text-xs opacity-75">DevOps</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-1"></div>
                  <div className="text-xs font-medium">Sarah Wilson</div>
                  <div className="text-xs opacity-75">QA</div>
                </div>
              </div>
            </div>
          )
        
        case 'sponsors-card':
          return (
            <div className="p-4 h-full flex flex-col bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 mr-2" />
                <h3 className="text-lg font-semibold">Sponsors</h3>
              </div>
              <div className="text-center flex-1 flex flex-col justify-center">
                <Star className="h-8 w-8 mx-auto mb-3 animate-pulse" />
                <p className="text-sm mb-2">Support this project</p>
                <div className="text-xs opacity-90">
                  Become a sponsor and get your logo here!
                </div>
              </div>
            </div>
          )
        
        case 'downloads-card':
          return (
            <div className="p-4 h-full flex flex-col bg-card border rounded-lg">
              <div className="flex items-center mb-4">
                <Download className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold">Downloads</h3>
              </div>
              <div className="text-center flex-1 flex flex-col justify-center">
                <div className="text-3xl font-bold text-green-500 mb-2">1.2M+</div>
                <p className="text-sm text-muted-foreground mb-2">Total Downloads</p>
                <div className="text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +15% this month
                </div>
              </div>
            </div>
          )
        
        case 'made-by-card':
          return (
            <div className="p-4 h-full flex flex-col bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg">
              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 mr-2" />
                <h3 className="text-lg font-semibold">Made By</h3>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full mb-3 flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-lg mb-1">Your Name</h4>
                <p className="text-sm opacity-90 mb-2">Full Stack Developer</p>
                <div className="flex gap-2">
                  <Github className="h-4 w-4 opacity-75 hover:opacity-100 cursor-pointer" />
                  <Linkedin className="h-4 w-4 opacity-75 hover:opacity-100 cursor-pointer" />
                  <Mail className="h-4 w-4 opacity-75 hover:opacity-100 cursor-pointer" />
                </div>
              </div>
            </div>
          )
        
        case 'contribute-card':
          return (
            <div className="p-4 h-full flex flex-col bg-card border rounded-lg">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="text-lg font-semibold">Contribute</h3>
              </div>
              <div className="space-y-3 flex-1 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                  <span>Fork the repository</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                  <span>Create feature branch</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                  <span>Make your changes</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</div>
                  <span>Submit pull request</span>
                </div>
              </div>
            </div>
          )
        
        case 'security-card':
          return (
            <div className="p-4 h-full flex flex-col bg-card border rounded-lg">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-lg font-semibold">Security</h3>
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">No known vulnerabilities</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">Dependency scan: Clean</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Code review: Passed</span>
                </div>
              </div>
            </div>
          )
        
        default:
          return (
            <div className="p-4 h-full flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-400 to-gray-600 text-white rounded-lg">
              <Code className="h-8 w-8 mb-3" />
              <h3 className="text-lg font-bold mb-2">Custom Component</h3>
              <p className="text-sm opacity-90">Dynamic TSX Component</p>
            </div>
          )
      }
    }
    
    return (
      <div className="p-4 h-full flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-400 to-gray-600 text-white rounded-lg">
        <Code className="h-8 w-8 mb-3" />
        <h3 className="text-lg font-bold mb-2">Custom Component</h3>
        <p className="text-sm opacity-90">Dynamic TSX Component</p>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-4 h-full flex flex-col items-center justify-center text-center text-red-500">
        <XCircle className="h-8 w-8 mb-2" />
        <p className="text-sm">Error rendering custom component</p>
      </div>
    )
  }
}
