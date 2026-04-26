'use client'

import { Button } from '@/components/ui/button'
import {
  CreditCard,
  Mail,
  MapPin,
  Bot,
  Database,
  Cloud,
  Search,
  BarChart3,
} from 'lucide-react'

interface SuggestionChipsProps {
  onSelect: (suggestion: string) => void
}

const suggestions = [
  {
    icon: CreditCard,
    label: 'Payment APIs',
    query: 'What are the best payment APIs for a SaaS application?',
  },
  {
    icon: Bot,
    label: 'AI APIs',
    query: 'Recommend AI APIs for adding chatbot functionality',
  },
  {
    icon: Mail,
    label: 'Email APIs',
    query: 'What email APIs should I use for transactional emails?',
  },
  {
    icon: MapPin,
    label: 'Maps & Location',
    query: 'Compare mapping APIs like Google Maps vs Mapbox',
  },
  {
    icon: Database,
    label: 'Database APIs',
    query: 'What are serverless database options for my app?',
  },
  {
    icon: Cloud,
    label: 'Storage APIs',
    query: 'Best cloud storage APIs for file uploads',
  },
  {
    icon: Search,
    label: 'Search APIs',
    query: 'What search APIs can I use for full-text search?',
  },
  {
    icon: BarChart3,
    label: 'Analytics APIs',
    query: 'Recommend analytics APIs for tracking user behavior',
  },
]

export function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.label}
          variant="outline"
          size="sm"
          onClick={() => onSelect(suggestion.query)}
          className="gap-2 rounded-full border-border bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground"
        >
          <suggestion.icon className="size-4" />
          {suggestion.label}
        </Button>
      ))}
    </div>
  )
}
