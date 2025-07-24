import Link from "next/link"
import { Github, Twitter, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const footerLinks = {
    product: [
      { href: "/discover", label: "Discover" },
      { href: "/editor", label: "Editor" },
      { href: "/pricing", label: "Pricing" },
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/careers", label: "Careers" },
    ],
    support: [
      { href: "/help", label: "Help Center" },
      { href: "/contact", label: "Contact" },
      { href: "/docs", label: "Documentation" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  }

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-[1200px] mx-auto px-4">
      
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          
            <div className="col-span-2 md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <span className="text-sm font-bold text-primary-foreground">F</span>
                </div>
                <span className="font-bold text-lg">FlexReadme</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                Create beautiful README files with our intuitive editor. 
                Perfect documentation starts here.
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://twitter.com" target="_blank">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="https://github.com/yourusername/flexreadme" target="_blank">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="col-span-1">
              <h3 className="font-semibold text-sm mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
         
            <div className="col-span-1">
              <h3 className="font-semibold text-sm mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
 
            <div className="col-span-1">
              <h3 className="font-semibold text-sm mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
      
            <div className="col-span-1">
              <h3 className="font-semibold text-sm mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    
        <div className="py-6 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2025 FlexReadme. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="outline" asChild>
                <Link href="https://github.com/yourusername/flexreadme" target="_blank">
                  <Star className="mr-1 h-3 w-3" />
                  Star on GitHub
                </Link>
              </Button>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart className="h-3 w-3 text-red-500" />
                <span>by FlexReadme Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}