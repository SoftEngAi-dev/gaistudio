import { Agent, AgentType, AgentStatus, FileNode } from './types';

export const INITIAL_AGENTS: Agent[] = [
  { id: AgentType.PLANNER, name: 'Architect-Zero', role: 'System Orchestrator', status: AgentStatus.IDLE },
  { id: AgentType.RESEARCHER, name: 'Scout-X', role: 'Discovery & Compliance', status: AgentStatus.IDLE },
  { id: AgentType.CLOUD, name: 'Cloud-Titan', role: 'Infrastructure & Serverless', status: AgentStatus.IDLE },
  { id: AgentType.DATABASE, name: 'Data-Vault', role: 'Schema & Optimization', status: AgentStatus.IDLE },
  { id: AgentType.SECURITY, name: 'Sec-Ops', role: 'Audit & Compliance', status: AgentStatus.IDLE },
  { id: AgentType.CODER, name: 'Dev-Core', role: 'Full Stack Implementation', status: AgentStatus.IDLE },
  { id: AgentType.QA, name: 'Tester-V1', role: 'E2E & Unit Testing', status: AgentStatus.IDLE },
  { id: AgentType.DEVOPS, name: 'Deploy-Master', role: 'CI/CD Pipelines', status: AgentStatus.IDLE },
  { id: AgentType.CONTENT, name: 'Scribe-Bot', role: 'Tech Evangelist & Copy', status: AgentStatus.IDLE },
  { id: AgentType.MULTIMODAL, name: 'Artist-Gen', role: 'AI Video & Image Ops', status: AgentStatus.IDLE },
];

export const MOCK_FILE_SYSTEM: FileNode[] = [
  {
    name: 'enterprise-saas-monorepo',
    type: 'folder',
    children: [
      {
        name: 'compliance',
        type: 'folder',
        children: [
          {
            name: 'oss-licenses.json',
            type: 'file',
            language: 'json',
            content: `{\n  "dependencies": [\n    { "name": "react", "license": "MIT", "source": "npm registry" },\n    { "name": "prisma", "license": "Apache-2.0", "source": "npm registry" },\n    { "name": "stripe", "license": "MIT", "source": "npm registry" },\n    { "name": "openai", "license": "Apache-2.0", "source": "npm registry" }\n  ],\n  "audit_status": "PASSED",\n  "policy_check": "NO_GPL_DETECTED"\n}`
          },
          {
            name: 'security-audit.md',
            type: 'file',
            language: 'markdown',
            content: `# Security Audit Report\n\n## Vulnerability Scan\n- **Static Analysis:** Passed (0 Critical, 0 High)\n- **Dependency Check:** Passed\n\n## Applied Policies\n- **OWASP Top 10:** Mitigation strategies active.\n- **Data Encryption:** TLS 1.3 enforced for data-in-transit.\n- **IAM:** Least privilege access configured for AWS Lambda.`
          }
        ]
      },
      {
        name: 'apps',
        type: 'folder',
        children: [
          {
            name: 'web',
            type: 'folder',
            children: [
              {
                name: 'public',
                type: 'folder',
                children: [
                  {
                    name: 'landing-page.html',
                    type: 'file',
                    language: 'html',
                    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enterprise SaaS | Scale Infinite</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-white font-sans antialiased">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
            <h1 class="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-100 sm:text-7xl">
                Scale your infrastructure
                <span class="relative whitespace-nowrap text-blue-400">
                    <span class="relative">without limits</span>
                </span>
            </h1>
            <p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-400">
                The only platform that orchestrates serverless microservices with autonomous AI agents. Built for the enterprise, secured by default.
            </p>
            <div class="mt-10 flex justify-center gap-x-6">
                <a href="#" class="group inline-flex items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:bg-blue-500 hover:text-slate-100 active:bg-blue-800 focus-visible:outline-blue-600 animate-bounce">
                    Start Building Free
                </a>
                <a href="#" class="group inline-flex ring-1 ring-slate-700 items-center justify-center rounded-full py-3 px-6 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 text-white hover:text-slate-100 hover:ring-slate-600">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Watch Demo
                </a>
            </div>
        </div>
    </div>
</body>
</html>`
                  }
                ]
              },
              {
                name: 'components',
                type: 'folder',
                children: [
                  {
                    name: 'PricingCard.tsx',
                    type: 'file',
                    language: 'typescript',
                    content: `import { loadStripe } from '@stripe/stripe-js';\n\nexport const PricingCard = ({ plan }) => {\n  const handleSubscribe = async () => {\n    const res = await fetch('/api/checkout', { method: 'POST', body: JSON.stringify({ priceId: plan.id }) });\n    const { sessionId } = await res.json();\n    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);\n    await stripe.redirectToCheckout({ sessionId });\n  };\n\n  return (\n    <div className="card">\n      <h3>{plan.name}</h3>\n      <button onClick={handleSubscribe}>Subscribe</button>\n    </div>\n  );\n};`
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'packages',
        type: 'folder',
        children: [
          {
            name: 'backend-core',
            type: 'folder',
            children: [
              {
                name: 'services',
                type: 'folder',
                children: [
                  {
                    name: 'stripe.ts',
                    type: 'file',
                    language: 'typescript',
                    content: `import Stripe from 'stripe';\n\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });\n\nexport const createCheckoutSession = async (priceId: string, userId: string) => {\n  return await stripe.checkout.sessions.create({\n    mode: 'subscription',\n    payment_method_types: ['card'],\n    line_items: [{ price: priceId, quantity: 1 }],\n    success_url: \`\${process.env.CLIENT_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}\`,\n    cancel_url: \`\${process.env.CLIENT_URL}/pricing\`,\n    metadata: { userId }\n  });\n};`
                  },
                  {
                    name: 'openai.ts',
                    type: 'file',
                    language: 'typescript',
                    content: `import OpenAI from 'openai';\n\nconst openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });\n\nexport const generateAIResponse = async (prompt: string, context: string) => {\n  const completion = await openai.chat.completions.create({\n    messages: [\n      { role: "system", content: "You are a helpful assistant." },\n      { role: "user", content: \`Context: \${context}\\n\\nQuestion: \${prompt}\` }\n    ],\n    model: "gpt-4-turbo-preview",\n  });\n\n  return completion.choices[0].message.content;\n};`
                  }
                ]
              },
              {
                name: 'db',
                type: 'folder',
                children: [
                  {
                    name: 'schema.prisma',
                    type: 'file',
                    language: 'prisma',
                    content: `datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel User {\n  id               String   @id @default(uuid())\n  email            String   @unique\n  stripeCustomerId String?\n  subscriptionStatus String @default("INACTIVE")\n  role             Role     @default(USER)\n  posts            Post[]\n  createdAt        DateTime @default(now())\n}\n\nmodel Post {\n  id        String   @id @default(uuid())\n  title     String\n  content   String\n  published Boolean  @default(false)\n  authorId  String\n  author    User     @relation(fields: [authorId], references: [id])\n}`
                  },
                  {
                    name: 'optimization-report.md',
                    type: 'file',
                    language: 'markdown',
                    content: `# Database Optimization Strategy\n\n## Indexing\n- Added composite index on \`User(email, subscriptionStatus)\` for faster auth queries.\n- Added index on \`Post(authorId)\` to optimize relation joins.\n\n## Pooling\n- Recommended PgBouncer configuration for serverless Lambda environments.\n\n## Caching\n- Implementing Redis for session storage to reduce DB load.`
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'marketing',
        type: 'folder',
        children: [
          {
            name: 'blog',
            type: 'folder',
            children: [
              {
                name: 'technical-architecture.md',
                type: 'file',
                language: 'markdown',
                content: `# Architecture Deep Dive: Scaling to 1M Users\n\n## Introduction\nThis article explores the microservices architecture deployed on AWS, utilizing Lambda functions for infinite scalability and Prisma for type-safe database interactions.\n\n## Integrations\nWe leverage Stripe for payments, OpenAI for generative features, and SendGrid for transactional messaging.\n\n## Cost Analysis\nBy utilizing serverless components, we maintain a $0 fixed cost when idle.`
              },
              {
                name: 'launch-post.md',
                type: 'file',
                language: 'markdown',
                content: `# Introducing Scale Infinite\n\nWe are thrilled to announce the launch of our new enterprise platform. Designed for developers, built for scale.`
              }
            ]
          },
          {
            name: 'assets',
            type: 'folder',
            children: [
              {
                name: 'midjourney-prompts.txt',
                type: 'file',
                language: 'text',
                content: `/imagine prompt: isometric 3d render of cloud infrastructure connecting to a futuristic database node, glowing neon lines, dark mode aesthetic, unreal engine 5 render --ar 16:9 --v 6.0\n\n/imagine prompt: abstract representation of cyber security shield, glass texture, blue and purple gradient --v 6.0`
              },
              {
                name: 'runway-video-prompts.json',
                type: 'file',
                language: 'json',
                content: `[\n  { "scene": "intro", "prompt": "cinematic drone shot of a futuristic data center, glowing server racks, 4k" },\n  { "scene": "demo", "prompt": "close up of code scrolling on a screen, matrix style, high tech HUD overlay" }\n]`
              }
            ]
          }
        ]
      },
      {
        name: 'README.md',
        type: 'file',
        language: 'markdown',
        content: `# Enterprise SaaS Platform\n\n## Quick Start\n\nThis project was autonomously generated. To run locally:\n\n\`\`\`bash\n# Install dependencies\npnpm install\n\n# Start development server\npnpm dev\n\`\`\`\n\n## Environment Setup\n\nRename \`.env.example\` to \`.env\` and add your keys:\n- STRIPE_SECRET_KEY\n- OPENAI_API_KEY\n- DATABASE_URL`
      }
    ]
  }
];