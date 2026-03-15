/**
 * Seed Sanity with test data based on mock-data.ts.
 * Run: node scripts/seed-sanity.mjs
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const env = {};
for (const line of envContent.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = env.SANITY_API_EDITOR_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_EDITOR_TOKEN in .env.local"
  );
  console.error(
    "\nTo create a token: sanity.io/manage → your project → API → Tokens → Add API token (Editor role)"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ── Topics ──

const TOPICS = [
  {
    _id: "topic-ai",
    _type: "topic",
    name: "AI",
    slug: { _type: "slug", current: "ai" },
    description:
      "A curated archive of breakthroughs in machine learning, neural networks, and generative AI. Tracking the evolution of silicon-based intelligence.",
  },
  {
    _id: "topic-startups",
    _type: "topic",
    name: "Startups",
    slug: { _type: "slug", current: "startups" },
    description:
      "Funding rounds, product launches, and the founders reshaping industries. From seed stage to IPO.",
  },
  {
    _id: "topic-cloud",
    _type: "topic",
    name: "Cloud",
    slug: { _type: "slug", current: "cloud" },
    description:
      "Cloud infrastructure, serverless computing, and the platforms powering modern software at scale.",
  },
  {
    _id: "topic-security",
    _type: "topic",
    name: "Security",
    slug: { _type: "slug", current: "security" },
    description:
      "Cybersecurity threats, encryption standards, and the ongoing battle to protect digital infrastructure.",
  },
  {
    _id: "topic-webdev",
    _type: "topic",
    name: "Web Development",
    slug: { _type: "slug", current: "web-development" },
    description:
      "Frameworks, tooling, and best practices for building the modern web. From frontend to full-stack.",
  },
  {
    _id: "topic-opensource",
    _type: "topic",
    name: "Open Source",
    slug: { _type: "slug", current: "open-source" },
    description:
      "The projects, communities, and licensing debates shaping the open-source ecosystem.",
  },
];

// ── Articles ──

const ARTICLES = [
  {
    _id: "art-1",
    _type: "article",
    title: "OpenAI Announces GPT-5 Preview: The Dawn of Autonomous Reasoning",
    slug: { _type: "slug", current: "openai-gpt5-preview-autonomous-reasoning" },
    sourceName: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
    publishedAt: "2026-03-15T08:00:00Z",
    summaryShort:
      "OpenAI has unveiled GPT-5 with breakthrough autonomous reasoning capabilities, marking a new milestone for artificial intelligence.",
    summaryLong:
      "OpenAI has officially unveiled GPT-5 with breakthrough autonomous reasoning capabilities, marking a significant new milestone for artificial intelligence. The model demonstrates the ability to break down complex, multi-step problems and solve them with minimal human guidance. Early benchmarks suggest a 40% improvement in logical reasoning tasks compared to GPT-4o, with particular advances in mathematical proof generation and scientific hypothesis testing. The model also introduces a new 'reflection' mode that allows it to evaluate and correct its own outputs before presenting final answers.",
    whyItMatters:
      "The shift towards autonomous reasoning represents a fundamental change in how AI systems can be deployed. Rather than simply generating text, GPT-5 can now act as a genuine problem-solving partner. This has profound implications for scientific research, software engineering, and any field requiring complex analytical thinking. Companies that integrate these capabilities early will have a significant competitive advantage.",
    keyTakeaways: [
      "GPT-5 demonstrates 40% improvement in logical reasoning benchmarks over GPT-4o",
      "New 'reflection' mode enables self-evaluation and error correction",
      "Autonomous reasoning allows multi-step problem solving with minimal human guidance",
      "Early access partners report significant productivity gains in research workflows",
    ],
    tags: ["GPT-5", "OpenAI", "Reasoning", "Large Language Models"],
    topic: { _type: "reference", _ref: "topic-ai" },
    featured: true,
    digestDate: "2026-03-15",
    readingTime: 5,
  },
  {
    _id: "art-2",
    _type: "article",
    title: "The Breakthrough in Quantised Neural Architectures",
    slug: { _type: "slug", current: "breakthrough-quantised-neural-architectures" },
    sourceName: "ArXiv Daily",
    sourceUrl: "https://arxiv.org",
    publishedAt: "2026-03-15T07:30:00Z",
    summaryShort:
      "Researchers have unveiled a new method for compressing massive language models by up to 80% without losing performance accuracy.",
    summaryLong:
      "A team of researchers from Stanford and DeepMind have published a groundbreaking paper on quantised neural architectures that can compress large language models by up to 80% while maintaining 97% of their original performance. The technique, called Adaptive Precision Quantisation (APQ), dynamically adjusts the numerical precision of different layers based on their contribution to the final output. This could potentially bring GPT-class model power to mobile edge devices, democratising access to advanced AI capabilities.",
    whyItMatters:
      "Model compression at this scale could fundamentally change the economics of AI deployment. Running powerful models on edge devices eliminates cloud computing costs and latency issues, whilst also addressing privacy concerns by keeping data on-device. This research paves the way for truly ubiquitous AI.",
    keyTakeaways: [
      "Adaptive Precision Quantisation compresses models by 80% with only 3% performance loss",
      "Technique dynamically adjusts numerical precision per layer",
      "Enables GPT-class capabilities on mobile and edge devices",
      "Joint research from Stanford and DeepMind",
    ],
    tags: ["Quantisation", "Model Compression", "Edge AI", "Research"],
    topic: { _type: "reference", _ref: "topic-ai" },
    featured: false,
    digestDate: "2026-03-15",
    readingTime: 7,
  },
  {
    _id: "art-3",
    _type: "article",
    title: "Apple Expands Vision Pro Ecosystem with Developer Toolkit",
    slug: { _type: "slug", current: "apple-vision-pro-developer-toolkit" },
    sourceName: "The Verge",
    sourceUrl: "https://theverge.com",
    publishedAt: "2026-03-15T09:00:00Z",
    summaryShort:
      "Apple launches comprehensive developer tools for Vision Pro, including spatial computing APIs and a new AR content marketplace.",
    summaryLong:
      "Apple has released a major update to its Vision Pro developer ecosystem, introducing new spatial computing APIs, an enhanced Reality Composer Pro, and a curated AR content marketplace. The toolkit includes pre-built spatial UI components, hand-tracking gesture libraries, and a new collaborative workspace framework that enables multi-user AR experiences. Apple reports that over 10,000 spatial apps are now available on the platform.",
    whyItMatters:
      "The expansion of developer tools signals Apple's commitment to making spatial computing mainstream. By lowering the barrier to entry for developers, Apple is accelerating the creation of a robust app ecosystem that could drive broader consumer adoption of mixed reality devices.",
    keyTakeaways: [
      "New spatial computing APIs simplify development for Vision Pro",
      "AR content marketplace launches with curated developer submissions",
      "Over 10,000 spatial apps now available on the platform",
      "Collaborative workspace framework enables multi-user AR experiences",
    ],
    tags: ["Apple", "Vision Pro", "Spatial Computing", "AR"],
    topic: { _type: "reference", _ref: "topic-startups" },
    featured: false,
    digestDate: "2026-03-15",
    readingTime: 4,
  },
  {
    _id: "art-4",
    _type: "article",
    title: "Post-Quantum Encryption Standards Finalised by NIST",
    slug: { _type: "slug", current: "post-quantum-encryption-nist-standards" },
    sourceName: "Wired",
    sourceUrl: "https://wired.com",
    publishedAt: "2026-03-15T06:00:00Z",
    summaryShort:
      "NIST has finalised the first set of post-quantum cryptographic standards, marking a critical milestone in preparing for the quantum computing era.",
    summaryLong:
      "The National Institute of Standards and Technology has officially published the finalised versions of three post-quantum cryptographic algorithms: ML-KEM, ML-DSA, and SLH-DSA. These standards are designed to resist attacks from both classical and quantum computers. Major tech companies including Google, Microsoft, and Apple have already begun integrating these standards into their products. The transition timeline recommends full adoption by 2030.",
    whyItMatters:
      "Quantum computers capable of breaking current encryption may arrive within the next decade. These new standards provide a critical safety net, ensuring that today's encrypted data remains secure even when quantum computers become powerful enough to threaten existing cryptographic methods.",
    keyTakeaways: [
      "Three post-quantum cryptographic algorithms officially standardised",
      "Standards designed to resist both classical and quantum attacks",
      "Major tech companies already integrating into products",
      "Full adoption recommended by 2030",
    ],
    tags: ["Quantum Computing", "Encryption", "NIST", "Cryptography"],
    topic: { _type: "reference", _ref: "topic-security" },
    featured: false,
    digestDate: "2026-03-15",
    readingTime: 6,
  },
  {
    _id: "art-5",
    _type: "article",
    title: "Figure AI Secures $675M for Humanoid Robot Manufacturing",
    slug: { _type: "slug", current: "figure-ai-675m-humanoid-robots" },
    sourceName: "Bloomberg",
    sourceUrl: "https://bloomberg.com",
    publishedAt: "2026-03-15T10:00:00Z",
    summaryShort:
      "Figure AI raises $675M Series B to scale production of its humanoid robots for warehouse and manufacturing applications.",
    summaryLong:
      "Figure AI has closed a $675 million Series B funding round led by Microsoft and NVIDIA, with participation from OpenAI and Jeff Bezos. The capital will fund the construction of a dedicated manufacturing facility and the scaling of its Figure 02 humanoid robot for commercial deployment. The company has secured pilot agreements with BMW, Amazon, and DHL for warehouse automation and logistics applications.",
    whyItMatters:
      "The scale of this funding round reflects growing confidence in humanoid robotics as a practical technology rather than a research curiosity. With major customers already lined up, Figure AI is positioning itself to capture the emerging market for general-purpose robots in industrial settings.",
    keyTakeaways: [
      "Series B round led by Microsoft and NVIDIA at $675M",
      "Funding dedicated to manufacturing facility construction",
      "Pilot agreements with BMW, Amazon, and DHL",
      "Figure 02 robot designed for warehouse and logistics",
    ],
    tags: ["Robotics", "Funding", "Figure AI", "Humanoid"],
    topic: { _type: "reference", _ref: "topic-startups" },
    featured: false,
    digestDate: "2026-03-15",
    readingTime: 4,
  },
  {
    _id: "art-6",
    _type: "article",
    title: "GitHub Launches Copilot Extensions: A Plugin Ecosystem for AI Coding",
    slug: { _type: "slug", current: "github-copilot-extensions-plugin-ecosystem" },
    sourceName: "TechCrunch",
    sourceUrl: "https://techcrunch.com",
    publishedAt: "2026-03-15T11:00:00Z",
    summaryShort:
      "GitHub has officially launched Copilot Extensions, allowing developers to integrate third-party tools directly into the Copilot Chat interface.",
    summaryLong:
      "GitHub has officially launched Copilot Extensions, allowing developers to integrate their favourite third-party tools directly into the Copilot Chat interface. This move transforms Copilot from a standalone coding assistant into an extensible platform for the entire DevOps lifecycle. The ecosystem launched with over 15 initial partners including Docker, Sentry, and Azure. Private extensions allow enterprises to build internal tools that can answer questions about proprietary codebases and infrastructure.",
    whyItMatters:
      "By opening up Copilot to third-party extensions, GitHub is positioning itself as the 'operating system' for AI-assisted development. This significantly reduces the friction of 'context switching' — one of the biggest productivity killers in software engineering.",
    keyTakeaways: [
      "Developers can now query tools like Docker, Sentry, and Azure directly through Copilot Chat",
      "Ecosystem launched with over 15 initial partners",
      "Private extensions allow enterprises to build internal tools",
      "Extensions are available across GitHub.com, VS Code, and Visual Studio platforms",
    ],
    tags: ["GitHub", "Copilot", "Developer Tools", "AI Coding"],
    topic: { _type: "reference", _ref: "topic-webdev" },
    featured: false,
    digestDate: "2026-03-15",
    readingTime: 5,
  },
  {
    _id: "art-7",
    _type: "article",
    title: "The Rise of AI Agents in Software Development",
    slug: { _type: "slug", current: "rise-of-ai-agents-software-development" },
    sourceName: "InfoQ",
    sourceUrl: "https://infoq.com",
    publishedAt: "2026-03-15T07:00:00Z",
    summaryShort:
      "How autonomous AI agents are changing the way we think about software engineering, from code generation to deployment.",
    summaryLong:
      "A comprehensive analysis of how autonomous AI agents are transforming software development workflows. From AI-powered code review to automated deployment pipelines, agents are taking on increasingly complex tasks that previously required human oversight. The article examines case studies from companies like Stripe, Shopify, and Vercel, where AI agents handle up to 30% of routine engineering tasks.",
    whyItMatters:
      "The rise of AI agents represents a paradigm shift in software engineering. Rather than replacing developers, these agents are amplifying their capabilities, allowing teams to focus on architecture and design whilst agents handle implementation details.",
    keyTakeaways: [
      "AI agents now handle up to 30% of routine engineering tasks at leading companies",
      "Agent-based workflows amplify developer productivity rather than replacing developers",
      "Key areas include code review, testing, and deployment automation",
      "Early adopters report 2-3x improvement in development velocity",
    ],
    tags: ["AI Agents", "Software Engineering", "Automation", "Productivity"],
    topic: { _type: "reference", _ref: "topic-ai" },
    featured: false,
    digestDate: "2026-03-15",
    readingTime: 8,
  },
  {
    _id: "art-8",
    _type: "article",
    title: "Docker Integrations: What You Need to Know",
    slug: { _type: "slug", current: "docker-integrations-what-you-need-to-know" },
    sourceName: "Dev.to",
    sourceUrl: "https://dev.to",
    publishedAt: "2026-03-15T09:30:00Z",
    summaryShort:
      "A deep dive into the new container management features coming to Docker Desktop and Docker Hub.",
    summaryLong:
      "Docker has announced a suite of new integration features for Docker Desktop and Docker Hub, including native Kubernetes cluster management, built-in vulnerability scanning with Snyk integration, and a new Docker AI assistant that helps developers write and optimise Dockerfiles. The update also includes improved support for ARM64 architectures and WebAssembly containers.",
    whyItMatters:
      "As containerisation becomes the default deployment strategy for modern applications, Docker's expanded tooling simplifies workflows that previously required multiple third-party tools.",
    keyTakeaways: [
      "Native Kubernetes cluster management in Docker Desktop",
      "Built-in vulnerability scanning via Snyk integration",
      "New AI assistant for Dockerfile generation and optimisation",
      "Improved ARM64 and WebAssembly container support",
    ],
    tags: ["Docker", "Containers", "Kubernetes", "DevOps"],
    topic: { _type: "reference", _ref: "topic-cloud" },
    featured: false,
    digestDate: "2026-03-15",
    readingTime: 5,
  },
  {
    _id: "art-9",
    _type: "article",
    title: "AWS Announces Quantum-Ready Cloud Infrastructure",
    slug: { _type: "slug", current: "aws-quantum-ready-cloud-infrastructure" },
    sourceName: "AWS Blog",
    sourceUrl: "https://aws.amazon.com/blogs",
    publishedAt: "2026-03-14T14:00:00Z",
    summaryShort:
      "Amazon Web Services unveils quantum-ready infrastructure services, preparing enterprise customers for the post-quantum era.",
    summaryLong:
      "AWS has launched a new suite of quantum-ready cloud infrastructure services, including quantum key distribution (QKD) integration, post-quantum TLS support across all services, and a quantum computing simulator for algorithm development. The offering is designed to help enterprises begin their quantum transition without waiting for practical quantum computers to arrive.",
    whyItMatters:
      "Cloud providers are racing to establish quantum readiness as a competitive differentiator. AWS's comprehensive approach — spanning encryption, networking, and development tools — sets a new standard for enterprise quantum preparation.",
    keyTakeaways: [
      "Quantum key distribution integration now available across AWS services",
      "Post-quantum TLS support rolled out to all AWS regions",
      "New quantum computing simulator for algorithm development",
      "Enterprise migration tools for post-quantum cryptography transition",
    ],
    tags: ["AWS", "Quantum Computing", "Cloud Infrastructure", "Encryption"],
    topic: { _type: "reference", _ref: "topic-cloud" },
    featured: false,
    digestDate: "2026-03-14",
    readingTime: 6,
  },
  {
    _id: "art-10",
    _type: "article",
    title: "Rust Foundation Releases 2026 Ecosystem Report",
    slug: { _type: "slug", current: "rust-foundation-2026-ecosystem-report" },
    sourceName: "Rust Blog",
    sourceUrl: "https://blog.rust-lang.org",
    publishedAt: "2026-03-14T10:00:00Z",
    summaryShort:
      "The Rust Foundation's annual report reveals record adoption growth, with Rust now used in production by 45% of Fortune 500 companies.",
    summaryLong:
      "The Rust Foundation has published its 2026 ecosystem report, showing remarkable growth in enterprise adoption. Key findings include Rust being used in production by 45% of Fortune 500 companies (up from 28% in 2024), a 60% increase in crates.io downloads, and significant growth in embedded systems and WebAssembly use cases. The report also highlights the language's expanding role in AI infrastructure, with major ML frameworks adding Rust bindings.",
    whyItMatters:
      "Rust's trajectory from a systems programming niche to mainstream enterprise adoption validates the demand for memory-safe, high-performance languages. The language's growing role in AI infrastructure suggests it may become as foundational to the AI era as Python is to data science.",
    keyTakeaways: [
      "45% of Fortune 500 companies now use Rust in production",
      "60% increase in crates.io downloads year-over-year",
      "Growing adoption in embedded systems and WebAssembly",
      "Expanding role in AI infrastructure with new ML framework bindings",
    ],
    tags: ["Rust", "Open Source", "Programming Languages", "Ecosystem"],
    topic: { _type: "reference", _ref: "topic-opensource" },
    featured: false,
    digestDate: "2026-03-14",
    readingTime: 5,
  },
  {
    _id: "art-11",
    _type: "article",
    title: "Zero-Day Vulnerability Discovered in Popular npm Package",
    slug: { _type: "slug", current: "zero-day-vulnerability-npm-package" },
    sourceName: "Bleeping Computer",
    sourceUrl: "https://bleepingcomputer.com",
    publishedAt: "2026-03-14T16:00:00Z",
    summaryShort:
      "A critical zero-day vulnerability in a widely-used npm package affects over 200,000 projects. Patches are now available.",
    summaryLong:
      "Security researchers have disclosed a critical zero-day vulnerability (CVE-2026-1847) in a widely-used npm utility package that is a dependency of over 200,000 projects. The vulnerability allows remote code execution through crafted input strings. The npm security team has issued patches and is working with major package maintainers to ensure rapid updates across the ecosystem.",
    whyItMatters:
      "Supply chain security remains one of the most pressing challenges in software development. This incident highlights the cascading risk of vulnerabilities in foundational packages and reinforces the need for automated dependency scanning and rapid response protocols.",
    keyTakeaways: [
      "Critical RCE vulnerability affects 200,000+ npm projects",
      "CVE-2026-1847 allows remote code execution via crafted input",
      "Patches available — immediate update recommended",
      "Highlights ongoing supply chain security challenges",
    ],
    tags: ["Security", "npm", "Vulnerability", "Supply Chain"],
    topic: { _type: "reference", _ref: "topic-security" },
    featured: false,
    digestDate: "2026-03-14",
    readingTime: 4,
  },
  {
    _id: "art-12",
    _type: "article",
    title: "Next.js 16 Introduces Partial Prerendering by Default",
    slug: { _type: "slug", current: "nextjs-16-partial-prerendering-default" },
    sourceName: "Vercel Blog",
    sourceUrl: "https://vercel.com/blog",
    publishedAt: "2026-03-13T12:00:00Z",
    summaryShort:
      "Vercel ships Next.js 16 with partial prerendering enabled by default, combining the best of static and dynamic rendering.",
    summaryLong:
      "Vercel has released Next.js 16, making partial prerendering (PPR) the default rendering strategy. PPR combines static shell generation with dynamic content streaming, delivering instant initial page loads while still supporting personalised and real-time content. The release also includes improved TypeScript support, a new middleware API, and built-in support for React Server Actions with optimistic updates.",
    whyItMatters:
      "Partial prerendering represents a fundamental evolution in web rendering strategies. By making it the default, Next.js 16 eliminates the need for developers to choose between static and dynamic rendering — they get both automatically.",
    keyTakeaways: [
      "Partial prerendering now the default rendering strategy",
      "Combines static shell generation with dynamic content streaming",
      "Improved TypeScript support and new middleware API",
      "Built-in React Server Actions with optimistic updates",
    ],
    tags: ["Next.js", "React", "Web Performance", "Vercel"],
    topic: { _type: "reference", _ref: "topic-webdev" },
    featured: false,
    digestDate: "2026-03-13",
    readingTime: 6,
  },
];

// ── Digests ──

const DIGESTS = [
  {
    _id: "digest-2026-03-15",
    _type: "digest",
    title: "Daily Digest",
    slug: { _type: "slug", current: "2026-03-15" },
    date: "2026-03-15",
    intro:
      "A curated briefing of the most significant shifts in technology over the last 24 hours. We track the signals so you can ignore the noise.",
    featuredArticle: { _type: "reference", _ref: "art-1" },
    articles: [
      { _type: "reference", _ref: "art-1", _key: "a1" },
      { _type: "reference", _ref: "art-2", _key: "a2" },
      { _type: "reference", _ref: "art-3", _key: "a3" },
      { _type: "reference", _ref: "art-4", _key: "a4" },
      { _type: "reference", _ref: "art-5", _key: "a5" },
      { _type: "reference", _ref: "art-6", _key: "a6" },
      { _type: "reference", _ref: "art-7", _key: "a7" },
      { _type: "reference", _ref: "art-8", _key: "a8" },
    ],
    topicStats: {
      ai: 3,
      startups: 2,
      security: 1,
      webDevelopment: 1,
      cloud: 1,
    },
  },
  {
    _id: "digest-2026-03-14",
    _type: "digest",
    title: "Daily Digest",
    slug: { _type: "slug", current: "2026-03-14" },
    date: "2026-03-14",
    intro:
      "From quantum-ready cloud infrastructure to open-source milestones, here are the stories that shaped the tech landscape.",
    featuredArticle: { _type: "reference", _ref: "art-9" },
    articles: [
      { _type: "reference", _ref: "art-9", _key: "a9" },
      { _type: "reference", _ref: "art-10", _key: "a10" },
      { _type: "reference", _ref: "art-11", _key: "a11" },
    ],
    topicStats: {
      cloud: 1,
      openSource: 1,
      security: 1,
    },
  },
  {
    _id: "digest-2026-03-13",
    _type: "digest",
    title: "Daily Digest",
    slug: { _type: "slug", current: "2026-03-13" },
    date: "2026-03-13",
    intro:
      "Next.js 16 arrives with a rendering revolution, plus key developments across the web ecosystem.",
    featuredArticle: { _type: "reference", _ref: "art-12" },
    articles: [{ _type: "reference", _ref: "art-12", _key: "a12" }],
    topicStats: {
      webDevelopment: 1,
    },
  },
];

// ── Seed ──

async function seed() {
  console.log("Seeding Sanity...\n");

  const transaction = client.transaction();

  for (const topic of TOPICS) {
    transaction.createOrReplace(topic);
  }
  console.log(`  ${TOPICS.length} topics queued`);

  for (const article of ARTICLES) {
    transaction.createOrReplace(article);
  }
  console.log(`  ${ARTICLES.length} articles queued`);

  for (const digest of DIGESTS) {
    transaction.createOrReplace(digest);
  }
  console.log(`  ${DIGESTS.length} digests queued`);

  console.log("\nCommitting transaction...");
  await transaction.commit();
  console.log("Done! Test data seeded successfully.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
