import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for getting started with beautiful README files",
            badge: null,
            features: [
                "5 README projects",
                "Basic templates",
                "Markdown editor",
                "GitHub integration",
                "Export to markdown",
                "Community support"
            ],
            buttonText: "Get Started",
            buttonVariant: "outline" as const,
            popular: false
        },
        {
            name: "Pro",
            price: "$0",
            period: "month",
            description: "Everything you need for professional documentation",
            badge: "Most Popular",
            features: [
                "Unlimited README projects",
                "Premium templates",
                "Advanced editor features",
                "Priority GitHub sync",
                "Custom branding",
                "Analytics dashboard",
                "Priority support",
                "Export to multiple formats",
                "Team collaboration"
            ],
            buttonText: "Start Free Trial",
            buttonVariant: "default" as const,
            popular: true
        }
    ];

    return (
        <>
    <Navbar/>
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
                <div className="container max-w-[1200px] mx-auto px-4 relative">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="outline" className="mb-4">
                            Pricing Plans
                        </Badge>
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                            Simple, transparent pricing
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Choose the perfect plan for your documentation needs. 
                            Start free and upgrade as you grow.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-background/50">
                <div className="container max-w-[1200px] mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {plans.map((plan, index) => (
                            <Card                    
                                key={index} 
                                className={`relative ${
                                    plan.popular 
                                        ? 'border-primary shadow-lg scale-105' 
                                        : 'border-border/40'
                                }`}
                            >
                                {plan.badge && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-primary text-primary-foreground">
                                            <Star className="w-3 h-3 mr-1" />
                                            {plan.badge}
                                        </Badge>
                                    </div>
                                )}
                                
                                <CardHeader className="text-center pb-8">
                                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground">/{plan.period}</span>
                                    </div>
                                    <CardDescription className="text-base">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center">
                                                <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter>
                                    <Button 
                                        variant={plan.buttonVariant}
                                        size="lg" 
                                        className="w-full"
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container max-w-[1200px] mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6">
                            Start creating amazing README files today
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Join thousands of developers who trust FlexReadme for their documentation needs. 
                            No hidden fees, cancel anytime.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="outline">
                                View Examples
                            </Button>
                            <Button size="lg">
                                Get Started Free
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}