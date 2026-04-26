'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { SuggestionChips } from './suggestion-chips'
import { EmptyState } from './empty-state'

export function Chat() {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  const handleSuggestionSelect = (suggestion: string) => {
    sendMessage({ text: suggestion })
  }

  const hasMessages = messages.length > 0

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
            </div>
            <span className="font-semibold text-foreground">AI API Explorer</span>
          </div>

          <div className="flex items-center gap-1 rounded bg-accent/20 px-3 py-1">
            <span className="size-2 animate-pulse rounded-full bg-accent" />
            <span className="text-xs font-medium text-accent-foreground">
              Online
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl">
          {!hasMessages ? (
            <EmptyState />
          ) : (
            <div className="divide-y divide-border">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl space-y-4 px-4 py-4">
          {!hasMessages && (
            <SuggestionChips onSelect={handleSuggestionSelect} />
          )}

          <ChatInput
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          <p className="text-center text-xs text-muted-foreground">
            API Finder can make mistakes. Verify API details on official
            documentation.
          </p>
        </div>
      </footer>
    </div>
  )
}
