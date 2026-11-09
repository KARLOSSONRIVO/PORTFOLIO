export const stackProjects = {
  carbonsense: { id: "carbonsense", title: "CarbonSense", logo: "/projects/logos/carbonsense.webp" },
  finshield: { id: "finshield", title: "FinShield", logo: "/projects/logos/finshield.svg" },
  daguconnect: { id: "daguconnect", title: "DaguConnect", logo: "/projects/logos/daguconnect.webp" },
  anchorwatch: { id: "anchorwatch", title: "AnchorWatch", logo: "/projects/logos/anchorwatch.webp" },
  sendnotes: { id: "sendnotes", title: "Send Notes", logo: "/projects/logos/sendnotes.webp" },
  paldex: { id: "paldex", title: "PalDex", logo: "/projects/logos/paldex.webp" },
  ucash: { id: "ucash", title: "UCash", logo: "/projects/logos/ucash.jpg" },
} as const;

type ProjectUsage = { project: keyof typeof stackProjects; description: string };
type TechnologyUsage = { description: string; projects: ProjectUsage[] };

// Project associations come from reference apps, featured-project content, and user confirmation.
// Leave projects empty when the supplied sources do not establish a project association.
export const techStackUsage: Record<string, TechnologyUsage> = {
  TypeScript: {
    description: "Typed application code for interfaces that are easier to maintain as a project grows.",
    projects: [
      { project: "finshield", description: "Builds the invoice management interface and typed client workflows." },
      { project: "anchorwatch", description: "Powers the web dashboard, analytics views, and API integrations." },
      { project: "carbonsense", description: "Types the activity tracking and sustainability dashboard interface." },
    ],
  },
  "Next.js": {
    description: "React applications with page routing, reusable layouts, and optimized production builds.",
    projects: [
      { project: "finshield", description: "Organizes the invoice, company, and branch management pages." },
      { project: "carbonsense", description: "Provides the web application and carbon tracking dashboard." },
    ],
  },
  React: {
    description: "Reusable interface components for interactive dashboards and application workflows.",
    projects: [
      { project: "anchorwatch", description: "Creates the admin dashboard, charts, and monitoring interfaces." },
      { project: "finshield", description: "Builds interactive invoice forms and management screens." },
      { project: "carbonsense", description: "Renders the activity tracker and personalized insights." },
    ],
  },
  "Node.js": {
    description: "JavaScript backend services that connect the interface, databases, and external services.",
    projects: [
      { project: "carbonsense", description: "Runs the backend for user activities, accounts, and emissions tracking." },
      { project: "finshield", description: "Supports invoice workflows and asynchronous document processing." },
    ],
  },
  "Express.js": {
    description: "HTTP APIs and middleware for handling application requests and backend business logic.",
    projects: [
      { project: "carbonsense", description: "Exposes API routes for activities, accounts, and tracking data." },
      { project: "finshield", description: "Serves the backend APIs used by the invoice management platform." },
    ],
  },
  MongoDB: {
    description: "Document-based storage for application data that needs a flexible structure.",
    projects: [
      { project: "carbonsense", description: "Stores user activities, carbon tracking records, and recommendation data." },
      { project: "anchorwatch", description: "Manages the financial monitoring data used by analytics and AI services." },
    ],
  },
  Python: {
    description: "Data processing, AI services, and backend logic for turning raw information into useful insights.",
    projects: [
      { project: "carbonsense", description: "Processes emissions data and generates personalized sustainability insights." },
      { project: "finshield", description: "Supports document analysis and processing services." },
      { project: "anchorwatch", description: "Powers financial data analysis and AI-generated summaries." },
    ],
  },
  FastAPI: {
    description: "Python APIs that make data processing and AI capabilities available to the application.",
    projects: [
      { project: "carbonsense", description: "Serves recommendation and chatbot endpoints to the web platform." },
      { project: "anchorwatch", description: "Exposes the financial analysis and AI service endpoints." },
    ],
  },
  Blockchain: {
    description: "Verifiable records for checking document integrity and tracing important changes.",
    projects: [{ project: "finshield", description: "Anchors invoice integrity on Polygon for verification and auditability." }],
  },
  Flutter: {
    description: "Cross-platform mobile interfaces built from a shared application codebase.",
    projects: [{ project: "anchorwatch", description: "Provides the mobile experience for financial monitoring and insights." }],
  },
  Dart: {
    description: "The language behind Flutter application logic, screens, and reusable mobile widgets.",
    projects: [{ project: "anchorwatch", description: "Supports the Flutter mobile application's interface and client-side logic." }],
  },
  Kotlin: {
    description: "Native Android development for mobile screens, application state, and API communication.",
    projects: [
      { project: "daguconnect", description: "Builds the Android booking, job marketplace, and chat experience." },
      { project: "sendnotes", description: "Powers the Android notes and flashcards application." },
    ],
  },
  Java: {
    description: "Object-oriented programming for JVM applications and Android development.",
    projects: [{ project: "ucash", description: "Builds the expense tracking application and its transaction workflows." }],
  },
  Redis: {
    description: "Fast in-memory data and background-job coordination for work that runs outside a request.",
    projects: [{ project: "finshield", description: "Works with BullMQ to coordinate asynchronous document processing." }],
  },
  Docker: {
    description: "Containerized environments that package applications and their dependencies consistently.",
    projects: [
      { project: "finshield", description: "Packages application services and their runtime dependencies in containers." },
      { project: "carbonsense", description: "Provides consistent container environments for the platform's services." },
    ],
  },
  Git: {
    description: "Version control for tracking changes, working on branches, and collaborating on application code.",
    projects: [
      { project: "carbonsense", description: "Tracks changes across the web, backend, and AI services." },
      { project: "finshield", description: "Maintains the history of the invoice management application." },
      { project: "daguconnect", description: "Versions the Android and web application code." },
      { project: "anchorwatch", description: "Tracks the monitoring platform's web application changes." },
    ],
  },
  MySQL: {
    description: "Relational storage for structured records and the relationships between them.",
    projects: [{ project: "daguconnect", description: "Stores the marketplace data behind client and tradesman workflows." }],
  },
  PostgreSQL: {
    description: "Relational data management for business records that need clear structure and consistency.",
    projects: [{ project: "finshield", description: "Stores invoice, company, branch, and related business records." }],
  },
  Ollama: {
    description: "Local language-model workflows for generating useful natural-language insights.",
    projects: [{ project: "anchorwatch", description: "Supports AI-powered summaries of financial monitoring data." }],
  },
  "CAG/RAG": {
    description: "Cache- and retrieval-augmented generation ground AI responses in relevant application knowledge.",
    projects: [{ project: "carbonsense", description: "Uses RAG to retrieve relevant sustainability FAQs and ground chatbot responses." }],
  },
  Solidity: {
    description: "Smart contracts for defining and executing application logic on EVM-compatible blockchains.",
    projects: [{ project: "finshield", description: "Implements smart contract logic supporting blockchain-backed invoice verification." }],
  },
  HTML: {
    description: "Semantic page structure for accessible web content, forms, and navigation.",
    projects: [
      { project: "daguconnect", description: "Structures the web management dashboard and account pages." },
      { project: "paldex", description: "Organizes the creature pages, categories, and reference content." },
    ],
  },
  CSS: {
    description: "Responsive layouts, visual styling, and interaction states for web interfaces.",
    projects: [
      { project: "daguconnect", description: "Styles the web dashboard, forms, and management views." },
      { project: "paldex", description: "Creates the visual presentation of the creature reference website." },
    ],
  },
  Laravel: {
    description: "PHP backend applications with organized routes, controllers, and API workflows.",
    projects: [{ project: "sendnotes", description: "Provides the API used by the Android notes application." }],
  },
  PHP: {
    description: "Server-side web logic and APIs that connect application screens to stored data.",
    projects: [
      { project: "daguconnect", description: "Supports the backend used by the booking and marketplace application." },
      { project: "sendnotes", description: "Runs the Laravel API consumed by the Android client." },
    ],
  },
  Django: {
    description: "Python backend services for structured application data, APIs, and administrative workflows.",
    projects: [{ project: "anchorwatch", description: "Provides the backend connected to the web administration dashboard." }],
  },
  JavaScript: {
    description: "Interactive web behavior and server-side application logic.",
    projects: [
      { project: "carbonsense", description: "Implements the Node.js and Express backend services." },
      { project: "daguconnect", description: "Handles interactions and data requests in the web dashboard." },
    ],
  },
};
