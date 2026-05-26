// 28-Day AI Operator Curriculum — lesson-as-data architecture
// Content adapted from Claude-generated "Turbo Academy" curriculum

export interface LessonTopic {
  name: string;
}

export interface Lesson {
  day: number;
  week: number;
  title: string;
  subtitle: string;
  goal: string;
  topics: string[];
  exercise: string;
  deliverables: string[];
  readingPrompt: string; // prompt for AI to generate deep-dive reading material
  audioPrompt: string;   // prompt for TTS generation
  category: 'core-tools' | 'real-work' | 'automation' | 'agents';
}

export interface Week {
  number: number;
  title: string;
  subtitle: string;
  goal: string;
}

export const weeks: Week[] = [
  {
    number: 1,
    title: 'Understanding AI & Core Tools',
    subtitle: 'Learn major AI platforms and think like an AI operator',
    goal: 'Master ChatGPT, Claude, Gemini, and Grok. Learn to compare outputs and choose the right tool for each task.',
  },
  {
    number: 2,
    title: 'AI for Real Work',
    subtitle: 'Use AI as your employee, not just a toy',
    goal: 'Apply AI to content, research, strategy, marketing, coding, and design. Complete real business deliverables.',
  },
  {
    number: 3,
    title: 'Automation & Workflows',
    subtitle: 'Make AI work continuously — not just when you ask it to',
    goal: 'Connect APIs, build Zapier/Make workflows, create databases, wire AI into messaging systems, and automate document generation.',
  },
  {
    number: 4,
    title: 'Agents, Operators & AI Businesses',
    subtitle: 'Become an AI operator — build workers, agents, and AI-powered companies',
    goal: 'Design multi-agent systems, study real AI businesses, build your first AI worker, and create a complete AI business system.',
  },
];

export const lessons: Lesson[] = [
  // ── WEEK 1: Core Tools ──
  {
    day: 1, week: 1, title: 'What AI Actually Is (Without the Hype)',
    subtitle: 'LLMs explained simply — tokens, context, and why different AIs behave differently',
    goal: 'Understand the fundamentals well enough to explain them to anyone',
    topics: ['LLMs explained', 'Tokens & context windows', 'Memory & reasoning', 'Why ChatGPT ≠ Claude ≠ Gemini', 'How businesses use AI today'],
    exercise: 'Ask the same business problem to 3 different AI tools and compare their answers. Note differences in style, depth, and accuracy.',
    deliverables: ['AI comparison notes — one page comparing 3 tools on the same task'],
    readingPrompt: 'Write a beginner-friendly deep dive on how Large Language Models work: tokens, context windows, temperature, reasoning. Use analogies. Include a comparison table of ChatGPT vs Claude vs Gemini vs Grok. Target: someone who has never used AI before.',
    audioPrompt: 'A friendly 10-minute audio lesson explaining what AI actually is, how LLMs work, and why different AI tools give different answers. Use clear analogies. Warm, encouraging tone.',
    category: 'core-tools',
  },
  {
    day: 2, week: 1, title: 'ChatGPT Mastery',
    subtitle: 'Prompting, custom instructions, long conversations, and file uploads',
    goal: 'Get ChatGPT to produce professional-quality output on demand',
    topics: ['Prompting fundamentals', 'Context and custom instructions', 'Long conversation management', 'Uploading and analyzing files', 'ChatGPT Plus features'],
    exercise: 'Generate 4 deliverables using ChatGPT: an article, a professional email, a business proposal outline, and a market analysis.',
    deliverables: ['Personal prompt library — 5 go-to prompts you will reuse'],
    readingPrompt: 'Write a comprehensive guide to ChatGPT mastery: the anatomy of a great prompt, how to use custom instructions, managing long conversations, file uploads for analysis, and the differences between free and Plus tiers. Include 10 example prompts that produce excellent results.',
    audioPrompt: 'A practical 12-minute audio guide to writing great prompts for ChatGPT. Cover the key formula for effective prompting, common mistakes, and share examples of prompts that produce dramatically better results.',
    category: 'core-tools',
  },
  {
    day: 3, week: 1, title: 'Claude for Thinking & Research',
    subtitle: 'Why Claude excels at planning, documentation, and strategy',
    goal: 'Use Claude for deep analysis, planning, and knowledge work',
    topics: ['Claude vs ChatGPT — when to use which', 'Planning and strategy', 'Documentation and specs', 'Long-form reasoning', 'Code review and architecture'],
    exercise: 'Use Claude to create a complete Product Requirement Document for a fictional SaaS product. Include features, user stories, and technical considerations.',
    deliverables: ['A PRD document — 3-5 pages covering product vision, features, and technical approach'],
    readingPrompt: 'Write a detailed guide on Claude: its strengths vs ChatGPT, best use cases (planning, documentation, coding specs, strategy, long-form reasoning), and practical tips for getting the most out of it. Include side-by-side examples showing where Claude outperforms other models.',
    audioPrompt: 'An engaging 10-minute audio comparing Claude and ChatGPT — when to use each, what makes Claude special, and how to get the best results from Claude for thinking and research tasks.',
    category: 'core-tools',
  },
  {
    day: 4, week: 1, title: 'Gemini & Large Context',
    subtitle: 'Harnessing massive context windows for document analysis',
    goal: 'Process huge documents and extract actionable insights in minutes',
    topics: ['Gemini\'s context window advantage', 'Processing PDFs and reports', 'Transcript analysis', 'Multi-document synthesis', 'Google ecosystem integration'],
    exercise: 'Upload a large PDF, a report, and a transcript to Gemini. Extract key insights, contradictions, and action items across all three documents.',
    deliverables: ['Cross-document insight report — key findings, contradictions, and action items'],
    readingPrompt: 'Write a guide on using Gemini for large-context tasks: processing entire PDFs, analyzing transcripts, synthesizing across multiple documents, and leveraging the Google ecosystem. Include practical workflows and comparison to other models for context-heavy tasks.',
    audioPrompt: 'A 10-minute audio explaining Gemini\'s superpower — massive context windows. How to upload entire books, reports, or transcripts and get insights in minutes. Practical examples.',
    category: 'core-tools',
  },
  {
    day: 5, week: 1, title: 'Grok + Real-Time Data',
    subtitle: 'When up-to-the-minute information matters',
    goal: 'Use Grok for real-time analysis, news monitoring, and X integration',
    topics: ['Grok\'s real-time advantage', 'News and trend analysis', 'X platform integration', 'Real-time vs batch processing', 'When freshness beats depth'],
    exercise: 'Pick a breaking news story. Analyze it with Claude, ChatGPT, and Grok. Compare: which tool gave the most current, accurate information?',
    deliverables: ['Real-time vs batch AI comparison — which tool won and why'],
    readingPrompt: 'Write a guide on Grok: its real-time data advantage, X platform integration, use cases for news analysis and trend monitoring, and how it compares to other models for time-sensitive tasks. Discuss when real-time data matters vs when depth is more important.',
    audioPrompt: 'A concise 8-minute audio on Grok — what makes it different, when real-time data matters, and how to use it for news and trend analysis.',
    category: 'core-tools',
  },
  {
    day: 6, week: 1, title: 'Comparing AI Models',
    subtitle: 'Build your decision matrix — which tool for which job',
    goal: 'Instantly know which AI to reach for based on the task',
    topics: ['Tool selection framework', 'Cost vs quality tradeoffs', 'Speed vs depth', 'Specialized vs general models', 'Building your comparison matrix'],
    exercise: 'Create a personal AI tool comparison matrix. Test each tool on the same 3 tasks. Score them on quality, speed, ease of use, and cost.',
    deliverables: ['Personal AI comparison matrix spreadsheet'],
    readingPrompt: 'Write a comprehensive comparison of major AI models: ChatGPT, Claude, Gemini, Grok, and Cursor. Cover: best use case for each, cost considerations, quality tradeoffs, speed comparison, and a decision framework for choosing the right tool. Include a fillable comparison table.',
    audioPrompt: 'An 8-minute audio walkthrough of when to use which AI tool. Quick mental framework for choosing between ChatGPT, Claude, Gemini, and Grok based on the task at hand.',
    category: 'core-tools',
  },
  {
    day: 7, week: 1, title: 'Week 1 Evaluation',
    subtitle: 'Solve one real problem using everything you learned',
    goal: 'Prove you can use AI tools to produce real business value',
    topics: ['Project scoping', 'Tool selection', 'Output quality assessment', 'Process documentation', 'Self-evaluation'],
    exercise: 'Choose one real problem — business plan, content package, proposal, or market analysis. Use at least 3 AI tools to create a professional deliverable. Document your process.',
    deliverables: ['Complete project deliverable', 'Process documentation — which tools you used and why'],
    readingPrompt: '',
    audioPrompt: '',
    category: 'core-tools',
  },

  // ── WEEK 2: Real Work ──
  {
    day: 8, week: 2, title: 'Writing & Content Systems',
    subtitle: 'Build a content pipeline that runs on AI',
    goal: 'Generate blogs, social posts, ads, and web copy that actually sounds human',
    topics: ['AI content strategy', 'Blog and article generation', 'Social media content systems', 'Ad copy and landing pages', 'Maintaining brand voice across AI output'],
    exercise: 'Create a complete content pipeline: generate a blog post, 5 social media posts from it, 3 ad variations, and a landing page — all with consistent brand voice.',
    deliverables: ['Content pipeline output — blog + social posts + ads + landing page'],
    readingPrompt: 'Write a comprehensive guide to building AI-powered content systems: how to generate blogs, social posts, ad copy, and web content that sounds human. Cover brand voice consistency, content repurposing workflows, and prompt templates for each content type.',
    audioPrompt: 'A 12-minute audio guide to building an AI content pipeline — how one idea becomes blog posts, social content, ads, and landing pages, all generated by AI with consistent voice.',
    category: 'real-work',
  },
  {
    day: 9, week: 2, title: 'AI Research Assistant',
    subtitle: 'Deep research, fact-checking, and source validation',
    goal: 'Turn AI into a research team that produces reliable, cited work',
    topics: ['Deep research techniques', 'Fact-checking workflows', 'Source evaluation', 'Synthesizing multiple sources', 'Research deliverable formatting'],
    exercise: 'Research a company or market using AI as your research assistant. Produce a 5-page research brief with citations, competitive analysis, and market insights.',
    deliverables: ['5-page research brief with cited sources'],
    readingPrompt: 'Write a guide on using AI as a research assistant: deep research techniques, fact-checking strategies, source evaluation, synthesizing across multiple sources, and formatting professional research deliverables. Include prompt templates for research tasks.',
    audioPrompt: 'A 10-minute audio on turning AI into your personal research assistant — how to do deep research, verify facts, and produce polished research briefs.',
    category: 'real-work',
  },
  {
    day: 10, week: 2, title: 'AI for Business Strategy',
    subtitle: 'SWOT analysis, roadmaps, and go-to-market planning',
    goal: 'Use AI to think strategically about any business problem',
    topics: ['SWOT analysis with AI', 'Strategic roadmapping', 'GTM strategy development', 'Competitive positioning', 'Financial modeling basics'],
    exercise: 'Create a complete business strategy for a hypothetical product: SWOT analysis, 12-month roadmap, and go-to-market plan.',
    deliverables: ['Business strategy document — SWOT + roadmap + GTM plan'],
    readingPrompt: 'Write a guide on using AI for business strategy: how to generate SWOT analyses, product roadmaps, GTM strategies, competitive positioning, and basic financial models. Include prompt templates and examples of good vs bad AI-generated strategy.',
    audioPrompt: 'A 12-minute audio on using AI as your strategy consultant — SWOT analysis, roadmaps, and go-to-market planning with AI assistance.',
    category: 'real-work',
  },
  {
    day: 11, week: 2, title: 'AI for Marketing',
    subtitle: 'Email campaigns, CRM, sales funnels, and outreach',
    goal: 'Build and run a complete marketing operation with AI',
    topics: ['AI email marketing', 'CRM and pipeline automation', 'Sales funnel design', 'Outreach campaign building', 'A/B testing with AI'],
    exercise: 'Build a complete outreach campaign: research targets, draft email sequences, design the funnel, and create follow-up templates.',
    deliverables: ['Outreach campaign package — target list, email sequence, funnel diagram, follow-ups'],
    readingPrompt: 'Write a comprehensive guide to AI-powered marketing: email campaigns, CRM workflows, sales funnel design, outreach automation, and A/B testing. Include practical prompt templates and workflow diagrams (described in text).',
    audioPrompt: 'A 15-minute audio on building a complete AI marketing operation — from outreach campaigns to CRM automation to sales funnels.',
    category: 'real-work',
  },
  {
    day: 12, week: 2, title: 'AI for Coding',
    subtitle: 'Build working apps with Claude, Cursor, and ChatGPT',
    goal: 'Ship a small working application — even with zero coding background',
    topics: ['AI coding tools overview', 'Claude Code vs Cursor vs ChatGPT', 'Prompting for code generation', 'Debugging with AI', 'Deployment basics'],
    exercise: 'Build a small working app — a calculator, to-do list, or landing page — using AI coding tools. Deploy it somewhere public.',
    deliverables: ['Working app deployed to a public URL'],
    readingPrompt: 'Write a beginner-friendly guide to coding with AI: overview of Claude Code, Cursor, and ChatGPT for coding, how to prompt for code generation, debugging strategies, and basics of deployment. Include a step-by-step tutorial for building a simple app.',
    audioPrompt: 'A 12-minute audio introduction to coding with AI — how anyone can build a working app using Claude, Cursor, or ChatGPT, even with zero coding experience.',
    category: 'real-work',
  },
  {
    day: 13, week: 2, title: 'AI for Design & Media',
    subtitle: 'Generate images, videos, and creative assets with AI',
    goal: 'Create professional visual content without a design background',
    topics: ['Midjourney and DALL-E for images', 'AI video generation tools', 'Canva AI features', 'Brand asset creation', 'Design consistency with AI'],
    exercise: 'Create a complete ad or social media video using AI design tools. Include images, text overlays, and a call to action.',
    deliverables: ['AI-generated ad or video asset'],
    readingPrompt: 'Write a guide to AI-powered design and media creation: Midjourney, DALL-E, AI video tools, Canva AI, and strategies for maintaining brand consistency across AI-generated assets. Include prompt templates for high-quality image generation.',
    audioPrompt: 'A 10-minute audio overview of AI design tools — how to create professional images, videos, and brand assets with Midjourney, DALL-E, and other AI design tools.',
    category: 'real-work',
  },
  {
    day: 14, week: 2, title: 'Week 2 Evaluation',
    subtitle: 'Use AI to perform work worth $100-500',
    goal: 'Demonstrate that AI can produce economically valuable output',
    topics: ['Project planning', 'Multi-tool orchestration', 'Quality standards', 'Client-ready deliverables', 'Self-assessment'],
    exercise: 'Complete one substantial project using AI: a full website, a detailed business proposal, a comprehensive report, or a complete content package. It should be something you could sell for $100-500.',
    deliverables: ['Client-ready project deliverable'],
    readingPrompt: '',
    audioPrompt: '',
    category: 'real-work',
  },

  // ── WEEK 3: Automation ──
  {
    day: 15, week: 3, title: 'APIs Explained',
    subtitle: 'How tools talk to each other — and how you make them',
    goal: 'Understand APIs well enough to connect any two tools together',
    topics: ['What APIs are (simply explained)', 'REST and webhooks', 'Authentication and keys', 'Making your first API call', 'Reading API documentation'],
    exercise: 'Make a simple API call using a free public API. Parse the response and extract useful data.',
    deliverables: ['Working API call with documented response'],
    readingPrompt: 'Write a beginner-friendly guide to APIs: what they are, how they work, REST vs webhooks, authentication basics, making your first API call, and how to read API documentation. Use clear analogies. No prior technical knowledge assumed.',
    audioPrompt: 'A 10-minute audio explaining APIs in simple terms — how tools talk to each other, what an API call looks like, and how to start connecting services together.',
    category: 'automation',
  },
  {
    day: 16, week: 3, title: 'Zapier & Make Automation',
    subtitle: 'Build AI-powered workflows without code',
    goal: 'Create automated workflows that save hours of manual work',
    topics: ['Zapier fundamentals', 'Make (Integromat) basics', 'Connecting AI to other tools', 'Trigger-action workflows', 'Multi-step automations'],
    exercise: 'Build a working automation: AI generates content → formats it → saves to a spreadsheet or sends an email.',
    deliverables: ['Working automation workflow — documented with screenshots'],
    readingPrompt: 'Write a step-by-step guide to building AI-powered automations with Zapier and Make. Cover: connecting AI tools, trigger-action flows, multi-step workflows, error handling, and real examples of automations that save hours per week.',
    audioPrompt: 'A 12-minute audio on building automations without code — how to connect AI to email, spreadsheets, and other tools to create workflows that run automatically.',
    category: 'automation',
  },
  {
    day: 17, week: 3, title: 'Databases for AI',
    subtitle: 'Supabase, storage, vectors, and giving AI long-term memory',
    goal: 'Set up a database that your AI tools can read from and write to',
    topics: ['Database fundamentals', 'Supabase setup', 'Storing AI-generated data', 'Vector databases and embeddings', 'Giving AI persistent memory'],
    exercise: 'Create a Supabase database. Design a simple schema. Store some AI-generated data in it.',
    deliverables: ['Working database with schema and sample data'],
    readingPrompt: 'Write a practical guide to databases for AI workflows: Supabase setup, schema design for AI-generated data, vector databases and embeddings explained simply, and patterns for giving AI tools persistent memory.',
    audioPrompt: 'A 12-minute audio introduction to databases for AI — how to set up Supabase, store AI-generated data, and give your AI tools long-term memory.',
    category: 'automation',
  },
  {
    day: 18, week: 3, title: 'AI + CRM Systems',
    subtitle: 'Build lead tracking and pipeline management with AI',
    goal: 'Create a mini CRM system powered by AI',
    topics: ['CRM fundamentals', 'Lead capture and scoring', 'Pipeline management', 'AI-powered follow-ups', 'Reporting and analytics'],
    exercise: 'Build a simple CRM workflow: lead comes in → AI scores and categorizes → routes to right follow-up → logs to database.',
    deliverables: ['CRM workflow diagram and implementation'],
    readingPrompt: 'Write a guide to building AI-powered CRM systems: lead capture, scoring with AI, pipeline management, automated follow-ups, and basic reporting. Include Supabase schema examples and workflow diagrams (described in text).',
    audioPrompt: 'A 10-minute audio on building a CRM system with AI — lead tracking, pipeline management, and automated follow-ups.',
    category: 'automation',
  },
  {
    day: 19, week: 3, title: 'AI + Messaging',
    subtitle: 'Connect AI to Telegram, Slack, and WhatsApp',
    goal: 'Build a simple AI bot that responds in messaging platforms',
    topics: ['Messaging APIs overview', 'Telegram Bot API', 'Slack integration', 'WhatsApp Business API', 'Bot design patterns'],
    exercise: 'Create a simple messaging bot — AI-powered, responds to commands, and can answer questions.',
    deliverables: ['Working messaging bot — deployed and testable'],
    readingPrompt: 'Write a step-by-step guide to building AI-powered messaging bots: Telegram Bot API, Slack integration, WhatsApp Business API, bot design patterns, and deployment. Include working code examples.',
    audioPrompt: 'A 12-minute audio on building AI bots for messaging platforms — how to connect AI to Telegram, Slack, or WhatsApp.',
    category: 'automation',
  },
  {
    day: 20, week: 3, title: 'AI + Document Generation',
    subtitle: 'Auto-generate invoices, reports, and PDFs',
    goal: 'Build a system that produces professional documents on autopilot',
    topics: ['Document generation tools', 'PDF creation with AI', 'Invoice automation', 'Report generation pipelines', 'Templating systems'],
    exercise: 'Build a workflow that auto-generates a professional document: invoice, report, or proposal — formatted and ready to send.',
    deliverables: ['Auto-generated professional document'],
    readingPrompt: 'Write a guide to AI-powered document generation: tools for creating PDFs, invoice automation, report generation, and templating systems. Include code examples and workflow diagrams (described in text).',
    audioPrompt: 'A 10-minute audio on auto-generating professional documents with AI — invoices, reports, and proposals created automatically.',
    category: 'automation',
  },
  {
    day: 21, week: 3, title: 'Week 3 Evaluation',
    subtitle: 'Build a complete automated workflow',
    goal: 'Create an end-to-end automated system that would replace a human worker',
    topics: ['Workflow design', 'Error handling', 'Testing and validation', 'Deployment', 'Documentation'],
    exercise: 'Build a complete workflow: Lead → AI Processing → Email → Database. The entire pipeline should run without manual intervention.',
    deliverables: ['End-to-end automated workflow — documented and working'],
    readingPrompt: '',
    audioPrompt: '',
    category: 'automation',
  },

  // ── WEEK 4: Agents & AI Businesses ──
  {
    day: 22, week: 4, title: 'What AI Agents Are',
    subtitle: 'Single agents, multi-agent systems, workers, memory, and tasks',
    goal: 'Understand the agent paradigm and how it\'s different from just prompting AI',
    topics: ['Agent fundamentals', 'Single vs multi-agent systems', 'Worker roles and specializations', 'Memory and context in agents', 'Task decomposition and delegation'],
    exercise: 'Design a simple agent system on paper: what roles would you create, how would they communicate, what tasks would each handle?',
    deliverables: ['Agent system design document'],
    readingPrompt: 'Write a comprehensive introduction to AI agents: what agents are, how they differ from simple prompting, single vs multi-agent systems, worker specialization, memory management, and task decomposition. Use real-world analogies. Reference OpenClaw as an example.',
    audioPrompt: 'A 12-minute audio introduction to AI agents — what they are, how they work, and why multi-agent systems are the future of AI automation.',
    category: 'agents',
  },
  {
    day: 23, week: 4, title: 'OpenClaw & Multi-Agent Architecture',
    subtitle: 'Operator, Builder, Revenue, Manager — how AI businesses are structured',
    goal: 'Map out a complete AI business using the multi-agent pattern',
    topics: ['OpenClaw architecture', 'Operator role', 'Builder role', 'Revenue role', 'Manager role', 'Agent communication patterns'],
    exercise: 'Map out a complete multi-agent system for a hypothetical business. Define each agent\'s role, responsibilities, and how they communicate.',
    deliverables: ['Multi-agent business architecture diagram and role definitions'],
    readingPrompt: 'Write a deep dive into OpenClaw-style multi-agent architecture: the roles of Operator, Builder, Revenue, and Manager, how agents communicate, task delegation patterns, and how this architecture compares to traditional SaaS. This is a technical but accessible overview.',
    audioPrompt: 'A 15-minute audio explaining the multi-agent business architecture — how Operator, Builder, Revenue, and Manager agents work together to run an AI-powered business.',
    category: 'agents',
  },
  {
    day: 24, week: 4, title: 'Designing Multi-Agent Systems',
    subtitle: 'CEO → Worker → Delivery — how to architect agent hierarchies',
    goal: 'Design a multi-agent system from scratch for a real business use case',
    topics: ['Agent hierarchy design', 'CEO → Worker → Delivery pattern', 'Task routing and delegation', 'Agent specialization', 'Scaling agent systems'],
    exercise: 'Design a multi-agent system for a real business: define the CEO agent, worker agents, and delivery pipeline. Specify communication protocols and task routing.',
    deliverables: ['Multi-agent system architecture document — CEO → Workers → Delivery pipeline'],
    readingPrompt: 'Write a guide to designing multi-agent systems: the CEO-Worker-Delivery hierarchy pattern, task routing, agent specialization, communication protocols, and scaling strategies. Include practical examples for different business types.',
    audioPrompt: 'A 12-minute audio on designing multi-agent systems — how to architect agent hierarchies from CEO down to worker agents.',
    category: 'agents',
  },
  {
    day: 25, week: 4, title: 'Real AI Businesses — Case Studies',
    subtitle: 'Study FilmAssist, CreditSmith, GlassRailingPro, Turbo, Duo, StayX',
    goal: 'Understand the business models behind successful AI-powered companies',
    topics: ['FilmAssist — film industry tools', 'CreditSmith — credit automation', 'GlassRailingPro — e-commerce + AI', 'Turbo — universal worker platform', 'Duo — AI-powered content platform', 'StayX — hospitality tech'],
    exercise: 'Pick two AI businesses from the case studies. Analyze their business model, AI architecture, and revenue strategy. Identify what makes each one work.',
    deliverables: ['AI business case study analysis — 2 businesses, 2-3 pages each'],
    readingPrompt: 'Write case studies of AI-powered businesses: FilmAssist, CreditSmith, GlassRailingPro, Turbo, Duo, and StayX. For each: what problem they solve, their AI architecture, business model, and key insights. Real-world examples of AI as a product, not just a tool.',
    audioPrompt: 'A 15-minute audio walking through real AI business case studies — how FilmAssist, CreditSmith, and others built successful AI-powered companies.',
    category: 'agents',
  },
  {
    day: 26, week: 4, title: 'Build Your First AI Worker',
    subtitle: 'Create a simple agent with input, memory, and output',
    goal: 'Ship a working AI agent that performs a useful task',
    topics: ['Agent scaffolding', 'Input processing', 'Memory implementation', 'Output formatting', 'Testing and iteration'],
    exercise: 'Build a working AI worker agent. It should: accept input, process it with an LLM, store something in memory, and produce formatted output.',
    deliverables: ['Working AI worker agent — code + demonstration'],
    readingPrompt: 'Write a hands-on tutorial for building your first AI worker agent: scaffolding the agent, implementing input processing, adding memory, formatting output, and testing. Include working code examples that can be copied and run.',
    audioPrompt: 'A 10-minute audio walkthrough of building your first AI worker — from scaffolding to a working agent with memory and output.',
    category: 'agents',
  },
  {
    day: 27, week: 4, title: 'Build Your Mini AI Company',
    subtitle: 'Design your Operator, Builder, and Revenue agents',
    goal: 'Create the blueprint for a complete AI-powered business',
    topics: ['Business model design', 'Agent role definition', 'Workflow architecture', 'Revenue modeling', 'Deployment planning'],
    exercise: 'Design a complete mini AI company: define the Operator (runs operations), Builder (builds/delivers), and Revenue (finds customers) agents. Map their workflows and how they interact.',
    deliverables: ['Mini AI company blueprint — agent definitions, workflows, revenue model'],
    readingPrompt: 'Write a guide to designing your own AI-powered company: choosing a business model, defining agent roles (Operator, Builder, Revenue), architecting workflows, and planning deployment. This should be practical and actionable.',
    audioPrompt: 'A 15-minute audio on designing your own AI company — how to define your Operator, Builder, and Revenue agents and architect a complete AI business.',
    category: 'agents',
  },
  {
    day: 28, week: 4, title: 'Final Project — Your AI Business System',
    subtitle: 'Create one complete AI business system from scratch',
    goal: 'Graduate from AI user to AI operator — ship something real',
    topics: ['Capstone project', 'System integration', 'Documentation', 'Presentation', 'Next steps'],
    exercise: 'Create one complete AI business system. Examples: marketing assistant, research assistant, CRM system, content company, or estimation tool. Include: mission statement, tools used, workflow diagram, agent definitions, memory architecture, and revenue model.',
    deliverables: [
      'Complete AI business system',
      'Documentation: mission, tools, workflow, agents, memory, automation, revenue model',
      'Final presentation / walkthrough',
    ],
    readingPrompt: '',
    audioPrompt: '',
    category: 'agents',
  },
];

export function getLessonByDay(day: number): Lesson | undefined {
  return lessons.find(l => l.day === day);
}

export function getLessonsByWeek(week: number): Lesson[] {
  return lessons.filter(l => l.week === week);
}

export function getLessonCategories(): string[] {
  return [...new Set(lessons.map(l => l.category))];
}
