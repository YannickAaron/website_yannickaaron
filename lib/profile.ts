// Single source of truth for everything the terminal prints.
export const profile = {
  name: "Yannick Aaron Lehr",
  handle: "yannick",
  host: "valencia",
  title: "Cofounder & Director Ejecutivo, EMPA Spain · building KIVO",
  tagline:
    "Data scientist turned full stack builder. I design data platforms, ship the software that runs on them, and use AI where it actually pays off, not where it merely demos well.",
  location: "Valencia, Spain 🇪🇸",
  languages: "Deutsch (native) · English · Español",
  links: {
    linkedin: "https://www.linkedin.com/in/yannickaaron/",
    github: "https://github.com/YannickAaron",
    empa: "https://empa.co",
    kivo: "https://kivo.eco",
  },
  education: [
    {
      degree: "M.Sc. Management, Data & Business Analytics",
      school: "Frankfurt School of Finance & Management",
      years: "2021 – 2022",
      note: "Grade 1.4. Thesis 1.0: geospatial time series forecasting with transformers (with ioki, a Deutsche Bahn company)",
    },
    {
      degree: "B.Sc. Business Administration, Business Informatics",
      school: "Frankfurt School of Finance & Management",
      years: "2017 – 2021",
      note: "Thesis 1.0: big data quality monitoring of geodata in rail freight (with DB Cargo)",
    },
    {
      degree: "IT specialist apprenticeship + MCSA Windows Server",
      school: "You Logic AG",
      years: "2014 – 2017",
      note: "",
    },
  ],
  experience: [
    {
      role: "Cofounder & Director Ejecutivo",
      company: "EMPA Spain · EMPA Data & Management Consulting GmbH",
      years: "2023 – now",
      where: "Valencia / Frankfurt",
      points: [
        "Cofounder and Operations Officer of the GmbH, Managing Director of EMPA Consulting SPAIN S.L.",
        "Data strategy, governance and AI readiness for large organisations, DE and ES, ~20 people",
        "Built KIVO inside EMPA and ran the firm on it for three years",
      ],
    },
    {
      role: "Cofounder",
      company: "Workever GmbH",
      years: "2022 – now",
      where: "Frankfurt",
      points: ["Web platform for electric car owners, from concept to launch", "Learned to build a product, not a project"],
    },
    {
      role: "Data Consultant & COO",
      company: "DatafabriQ",
      years: "2022",
      where: "Frankfurt",
      points: ["Data pipeline / ETL product with the CEO", "Built the whole IT infrastructure of the startup"],
    },
    {
      role: "Data Scientist",
      company: "ioki · a Deutsche Bahn company",
      years: "2021 – 2022",
      where: "Frankfurt",
      points: [
        "Geodata quality automation, Airflow pipelines, PostgreSQL / MongoDB / GraphQL",
        "Demand forecasting with PyTorch transformers and graph neural networks",
      ],
    },
    {
      role: "Freelance IT consultant & developer",
      company: "self-employed",
      years: "2018 – 2022",
      where: "Germany",
      points: ["Data migrations and transformation projects", "Web apps in PHP, React, Node"],
    },
    {
      role: "Application Manager",
      company: "DB Cargo AG",
      years: "2018 – 2021",
      where: "Frankfurt",
      points: ["Rolled out and ran MPS brake test software", "Scrum master, knowledge management project"],
    },
  ],
  skills: {
    Languages: ["TypeScript", "Python", "Rust", "Julia", "SQL", "Bash"],
    "Web & app": ["Next.js", "React", "Tailwind", "tRPC", "Prisma", "Node", "Tauri"],
    "Data & AI": ["PyTorch", "Airflow", "LangChain", "Mistral", "PostgreSQL", "MongoDB", "eval harnesses"],
    Infra: ["Docker", "Scaleway", "Azure", "GitHub Actions", "Linux"],
    Business: ["Cofounder", "P&L", "hiring", "data governance", "EU AI Act"],
    "Off keyboard": ["3D printing with Klipper", "Valencia weather as productivity tool"],
  },
  repos: [
    ["lexware-client-ts", "Modern, fully typed TypeScript client for the Lexware API"],
    ["BetterMSFile", "A saner explorer app for OneDrive and SharePoint"],
    ["quick-docu-mcp", "MCP server for quick documentation capture"],
    ["scw-easy-container-redeploy", "GitHub Action to redeploy a Scaleway container by name"],
    ["TimeSeriesForecasting", "Spatiotemporal forecasting experiments"],
  ] as [string, string][],
  certs: ["Developing LLM Applications with LangChain (DataCamp, 2025)", "MCSA Windows Server 2012 (Microsoft)"],
};

export const kivo = {
  name: "KIVO",
  url: "https://kivo.eco",
  pitch: "A European business management platform built to run companies on one connected data foundation.",
  points: [
    "Not an ERP. One holistic system for running the whole business, instead of one more tool next to all the others.",
    "Finished processes, not an empty shell. Operational on day one: import your data, start working, trust the processes.",
    "Data is captured where it originates. No double entry, no carrying information from system A to system B.",
    "Decisions arrive with their context: a vacation request shows cost, project impact and billing risk before anyone decides.",
    "Deterministic by default. AI only where it earns its place, e.g. receipts read and validated in the background.",
    "Europe first: 100% European infrastructure on Scaleway, European AI models, one KMS key per company, tenant isolation on every row.",
  ],
  status: "Built inside EMPA, three years in, two customers in production. Nothing vibe coded overnight.",
  stack: "Next.js · tRPC · Prisma · PostgreSQL · Docker · Scaleway fr-par",
};

export const empa = {
  name: "EMPA - Data & Management Consulting",
  url: "https://empa.co",
  pitch: "Data strategy, governance and AI-supported business intelligence for large organisations and the Mittelstand.",
  points: [
    "Founded 2023, offices in Frankfurt (Westend) and Valencia, team of ~20 across Germany, Spain and Brazil.",
    "Named among the top ten consulting firms for mid-sized businesses by the Süddeutsche Zeitung / SZ Institut study.",
    "End-to-end: data strategy → vendor selection & implementation → custom software and AI → change enablement.",
    "EU AI Act readiness: risk assessment, stakeholder mapping, AI literacy programmes.",
    "Giving Back Initiative: paid volunteering time plus a donation for every team member's cause.",
  ],
  role: "I cofounded EMPA and run EMPA Consulting SPAIN S.L. as Director Ejecutivo from Valencia.",
};
