"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { 
  Bot, 
  Send, 
  User, 
  Sparkles,
  Image,
  Code,
  Palette
} from "lucide-react"

interface AiChatProps {
  onAddComponent: (componentType: string) => void
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: string[]
}

const AI_SUGGESTIONS = [
  {
    text: "Create a header banner",
    componentType: "header-image",
    icon: Image
  },
  {
    text: "Add GitHub stats card",
    componentType: "stats-image", 
    icon: Code
  },
  {
    text: "Show contribution graph",
    componentType: "contributions",
    icon: Palette
  },
  {
    text: "Add profile badges",
    componentType: "badges-image",
    icon: Sparkles
  }
]

export function AiChat({ onAddComponent }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI assistant. I can help you create awesome GitHub README components. What would you like to add to your profile?",
      timestamp: new Date(),
      suggestions: ["header banner", "stats card", "badges", "contribution graph"]
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()
    
    let response = ""
    let suggestions: string[] = []
    
    if (input.includes("header") || input.includes("banner")) {
      response = "Great choice! A header banner makes your profile stand out. I'll add a customizable header banner component for you."
      onAddComponent("header-image")
      suggestions = ["Add stats below", "Include badges", "Show recent activity"]
    } else if (input.includes("stat") || input.includes("github")) {
      response = "Perfect! GitHub stats show your coding activity. I'll add a stats card that displays your contributions and language usage."
      onAddComponent("stats-image")
      suggestions = ["Add streak stats", "Show top languages", "Include trophy display"]
    } else if (input.includes("badge") || input.includes("status")) {
      response = "Nice! Badges show project status and info at a glance. I'll add a badge row component for you."
      onAddComponent("badges-image")
      suggestions = ["Add build status", "Include version info", "Show license"]
    } else if (input.includes("contribution") || input.includes("activity")) {
      response = "Excellent! Contribution graphs visualize your coding journey. I'll add a contribution graph component."
      onAddComponent("contributions")
      suggestions = ["Add recent commits", "Show language stats", "Include streak"]
    } else if (input.includes("profile") || input.includes("card")) {
      response = "Great idea! A profile card shows your key information. I'll add a profile card component for you."
      onAddComponent("profile-card")
      suggestions = ["Add social links", "Include bio", "Show followers"]
    } else {
      response = "I can help you add various components to your GitHub README. What specific element would you like to include?"
      suggestions = ["header banner", "stats card", "badges row", "contribution graph"]
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      suggestions
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleQuickAdd = (componentType: string) => {
    onAddComponent(componentType)
    
    const quickResponse: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: `Added a ${componentType.replace('-', ' ')} component to your canvas! You can customize it in the right panel.`,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, quickResponse])
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-500" />
          AI Assistant
        </CardTitle>
        <Badge variant="outline" className="w-fit">
          <Sparkles className="w-3 h-3 mr-1" />
          Smart Suggestions
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col gap-4 p-4">
        {/* Quick Actions */}
        <div>
          <div className="text-sm font-medium mb-2">Quick Add</div>
          <div className="grid grid-cols-2 gap-2">
            {AI_SUGGESTIONS.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAdd(suggestion.componentType)}
                className="text-xs h-8 justify-start"
              >
                <suggestion.icon className="w-3 h-3 mr-1" />
                {suggestion.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                  
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {message.type === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="bg-muted rounded-lg p-3 text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me to add components..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="text-sm"
          />
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
          >
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
