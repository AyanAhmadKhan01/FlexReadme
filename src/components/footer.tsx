import Link from "next/link"

export default function Footer() {
  const footerLinks = {
    product: [
      { href: "/discover", label: "Discover" },
      { href: "/editor", label: "Editor" },
      { href: "/pricing", label: "Pricing" },
      { href: "/tutorial", label: "How To Use" },
    ],
    company: [
      { href: "https://devlegend.vercel.app", label: "About" },
      { href: "https://ayancodes.vercel.app/blogs", label: "Blog" },
    ],
  }

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-[1200px] mx-auto px-4">
      
        <div className="py-12">
          <div className="grid grid-cols-6 md:grid-cols-6 gap-8">
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
            </div>

  
            <div className="col-span-2 md:col-span-2"></div>

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
          </div>
        </div>
    
        <div className="py-6 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© 2025 FlexReadme. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>Made</span>
                <span>by <Link className="text-primary" href={'https://devlegend.vercel.app'}>Ayan Ahmad Khan</Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}