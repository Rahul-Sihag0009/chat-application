'use client'

import { cn } from '@/lib/utils'
import { Bot, User, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import type { UIMessage } from 'ai'

function getMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return ''
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

interface ChatMessageProps {
  message: UIMessage
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'
  const text = getMessageText(message)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        'group flex gap-3 px-4 py-4 transition-colors',
        isUser ? 'bg-transparent' : 'bg-muted/50'
      )}
    >
      <div
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-lg',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-accent text-accent-foreground'
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {isUser ? 'You' : 'API Finder'}
          </span>
        </div>

        <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-code:rounded prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:text-foreground prose-pre:bg-secondary prose-pre:text-foreground prose-li:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown
            components={{
              pre: ({ children }) => (
                <pre className="overflow-x-auto rounded-lg bg-secondary p-4">
                  {children}
                </pre>
              ),
              code: ({ className, children, ...props }) => {
                const isInline = !className
                if (isInline) {
                  return (
                    <code
                      className="rounded bg-secondary px-1.5 py-0.5 text-sm font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  )
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      </div>

      {!isUser && text && (
        <Button
          variant="ghost"
          size="icon"
          className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="size-4 text-accent" />
          ) : (
            <Copy className="size-4 text-muted-foreground" />
          )}
        </Button>
      )}
    </div>
  )
}
