"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Github, 
  GitFork, 
  GitBranch, 
  GitPullRequest, 
  Heart, 
  Code, 
  Bug, 
  Lightbulb,
  MessageCircle,
  Star,
  Download,
  ExternalLink
} from "lucide-react"

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold">Contributing to FlexReadme</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            We welcome contributions from the community! Whether you're fixing bugs, adding features, 
            or improving documentation, your help makes FlexReadme better for everyone.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Getting Started */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Code className="h-6 w-6 text-blue-500" />
                <h2 className="text-2xl font-semibold">Getting Started</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <GitFork className="h-8 w-8 text-green-500 mb-3" />
                    <h3 className="font-semibold mb-2">1. Fork the Repository</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Start by forking the FlexReadme repository to your GitHub account.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <Github className="h-4 w-4 mr-2" />
                      Fork on GitHub
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <Download className="h-8 w-8 text-blue-500 mb-3" />
                    <h3 className="font-semibold mb-2">2. Clone Locally</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Clone your forked repository to your local development environment.
                    </p>
                    <div className="bg-muted rounded p-2">
                      <code className="text-xs">git clone https://github.com/your-username/flexreadme</code>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <GitBranch className="h-8 w-8 text-purple-500 mb-3" />
                    <h3 className="font-semibold mb-2">3. Create a Branch</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create a new branch for your feature or bug fix.
                    </p>
                    <div className="bg-muted rounded p-2">
                      <code className="text-xs">git checkout -b feature/your-feature</code>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <GitPullRequest className="h-8 w-8 text-orange-500 mb-3" />
                    <h3 className="font-semibold mb-2">4. Submit PR</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Push your changes and create a pull request with a clear description.
                    </p>
                    <div className="bg-muted rounded p-2">
                      <code className="text-xs">git push origin feature/your-feature</code>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Development Setup */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Development Setup</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Prerequisites</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">Node.js 18+</Badge>
                    <Badge variant="secondary">npm or yarn</Badge>
                    <Badge variant="secondary">Git</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Installation</h3>
                  <div className="bg-muted rounded-lg p-4 space-y-2">
                    <div><code className="text-sm">cd flexreadme</code></div>
                    <div><code className="text-sm">npm install</code></div>
                    <div><code className="text-sm">npm run dev</code></div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Project Structure</h3>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="font-mono text-sm space-y-1">
                      <div>src/</div>
                      <div className="ml-4">├── components/ <span className="text-muted-foreground"># Reusable components</span></div>
                      <div className="ml-4">├── app/ <span className="text-muted-foreground"># Next.js pages</span></div>
                      <div className="ml-4">├── lib/ <span className="text-muted-foreground"># Utilities</span></div>
                      <div className="ml-4">└── components/editor/ <span className="text-muted-foreground"># Editor components</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contribution Guidelines */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Contribution Guidelines</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Bug className="h-5 w-5 text-red-500" />
                    Bug Reports
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Search existing issues before creating a new one</li>
                    <li>• Include steps to reproduce the bug</li>
                    <li>• Provide browser and OS information</li>
                    <li>• Add screenshots if applicable</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    Feature Requests
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Clearly describe the feature and its benefits</li>
                    <li>• Provide mockups or examples if possible</li>
                    <li>• Explain the use case and target audience</li>
                    <li>• Discuss implementation approach</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-500" />
                    Code Contributions
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Follow the existing code style and conventions</li>
                    <li>• Write tests for new features and bug fixes</li>
                    <li>• Update documentation as needed</li>
                    <li>• Keep pull requests focused and atomic</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://github.com/AyanAhmadKhan01/FlexReadme" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub Repository
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://github.com/AyanAhmadKhan01/FlexReadme/issues" target="_blank" rel="noopener noreferrer">
                    <Bug className="h-4 w-4 mr-2" />
                    Report Issues
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="https://github.com/AyanAhmadKhan01/FlexReadme/discussions" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Discussions
                    <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                </Button>
              </div>
            </Card>

            {/* Recognition */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Recognition
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contributors will be recognized in our README and receive special badges based on their contributions.
              </p>
              <div className="space-y-2">
                <Badge variant="outline" className="w-full justify-center">🏆 Top Contributor</Badge>
                <Badge variant="outline" className="w-full justify-center">🐛 Bug Hunter</Badge>
                <Badge variant="outline" className="w-full justify-center">✨ Feature Creator</Badge>
                <Badge variant="outline" className="w-full justify-center">📚 Documentation</Badge>
              </div>
            </Card>

            {/* Support */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you need help or have questions about contributing, don't hesitate to reach out!
              </p>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Discord
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub Discussions
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
