'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowUp, Loader2 } from 'lucide-react'
import { useRef, useEffect } from 'react'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
}

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        onSubmit()
      }
    }
  }

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask me about APIs... (e.g., 'I need a payment API for my SaaS')"
        className="min-h-[56px] resize-none rounded-2xl border-border bg-card pr-14 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
        rows={1}
        disabled={isLoading}
      />
      <Button
        onClick={onSubmit}
        disabled={!input.trim() || isLoading}
        size="icon"
        className="absolute bottom-2 right-2 size-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <ArrowUp className="size-5" />
        )}
      </Button>
    </div>
  )
}
