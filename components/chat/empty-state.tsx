'use client'

import { Zap, Code, Rocket, Shield } from 'lucide-react'

const features = [
  {
    icon: Code,
    title: 'Code Examples',
    description: 'Get working code snippets for any API',
  },
  {
    icon: Zap,
    title: 'Quick Comparisons',
    description: 'Compare multiple APIs side by side',
  },
  {
    icon: Shield,
    title: 'Security Info',
    description: 'Learn about authentication methods',
  },
  {
    icon: Rocket,
    title: 'Best Practices',
    description: 'Implementation tips and gotchas',
  },
]

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
        <Code className="size-8 text-primary" />
      </div>

      <h1 className="mb-2 text-balance text-center text-2xl font-bold text-foreground">
        AI API Expolrer
      </h1>

      <p className="mb-8 max-w-md text-balance text-center text-muted-foreground">
        Discover the perfect APIs for your project. Just describe what
        you&apos;re building and I&apos;ll recommend the best options.
      </p>

      <div className="mb-8 grid w-full max-w-lg grid-cols-2 gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
              <feature.icon className="size-5 text-primary" />
            </div>
            <h3 className="text-sm font-medium text-foreground">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
