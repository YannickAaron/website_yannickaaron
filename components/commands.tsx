/* eslint-disable react/jsx-key -- every Line is keyed by Terminal when rendered */
import type { ReactNode } from "react";
import { profile as p, kivo, empa, imprint } from "@/lib/profile";

export type Line = ReactNode;
export type Run = (cmd: string) => void;

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);
const Cmd = ({ c, run }: { c: string; run: Run }) => (
  <span className="cmd" onClick={() => run(c)}>
    {c}
  </span>
);
const H = ({ children, lime }: { children: ReactNode; lime?: boolean }) => (
  <span className={lime ? "glow-lime font-bold" : "glow-sky font-bold"}>{children}</span>
);
const dim = (s: string) => <span className="text-dim">{s}</span>;

export const LOGO = [
  " __   __ _    _     ",
  " \\ \\ / // \\  | |    ",
  "  \\ V // _ \\ | |    ",
  "   | |/ ___ \\| |___ ",
  "   |_/_/   \\_\\_____|",
];

// "login card": the CV at a glance, neofetch style
export function idCard(run: Run): Line[] {
  const kv: [string, ReactNode][] = [
    ["user", `${p.handle}@${p.host}`],
    ["name", p.name],
    ["role", p.title],
    ["building", <><H lime>KIVO</H> {dim("→")} <A href={p.links.kivo}>kivo.eco</A> {dim("· run")} <Cmd c="kivo" run={run} /></>],
    ["company", <><H>EMPA</H> {dim("→")} <A href={p.links.empa}>empa.co</A> {dim("· run")} <Cmd c="empa" run={run} /></>],
    ["location", p.location],
    ["email", <A href={`mailto:${p.email}`}>{p.email}</A>],
    ["education", "M.Sc. Frankfurt School · Data & Business Analytics"],
    ["languages", p.languages],
    ["linkedin", <A href={p.links.linkedin}>linkedin.com/in/yannickaaron</A>],
    ["github", <A href={p.links.github}>github.com/YannickAaron</A>],
  ];
  const out: Line[] = [
    <div className="flex flex-col sm:flex-row gap-x-6 gap-y-3">
      <pre className="glow-lime leading-tight shrink-0">{LOGO.join("\n")}</pre>
      <div>
        {kv.map(([k, v]) => (
          <div key={k}>
            <span className="text-sky inline-block w-24">{k}</span>
            {v}
          </div>
        ))}
      </div>
    </div>,
  ];
  out.push("");
  out.push(
    <>
      {"          "}
      {["#c6e355", "#0ea5e9", "#14b8a6", "#4b5165", "#f59e0b", "#f87171", "#c9cbd1"].map((c) => (
        <span key={c} style={{ background: c }} className="inline-block w-5 h-3 mr-1" />
      ))}
    </>,
  );
  return out;
}

// ponytail: CSS border instead of box-drawing glyphs (Google font subset lacks them)
const box = (title: string, lime: boolean, body: Line[]): Line[] => {
  const c = lime ? "border-lime" : "border-sky";
  return [
    <span className={lime ? "glow-lime font-bold" : "glow-sky font-bold"}>{"> "}{title}</span>,
    ...body.map((b) => <div className={`border-l-2 ${c} pl-3`}>{b}</div>),
  ];
};

const FILES = ["kivo.md", "empa.md", "about.md", "cv.md", "education.md", "skills.md", "projects.md", "contact.md"];

export function help(run: Run): Line[] {
  const c = (s: string, d: string) => (
    <>
      {"  "}
      <Cmd c={s} run={run} />
      {" ".repeat(Math.max(1, 14 - s.length))}
      {dim(d)}
    </>
  );
  return [
    <span className="text-lime font-bold">available commands</span>,
    c("kivo", "what I am building right now · kivo problem|flow|ai|europe|stack"),
    c("empa", "the consulting firm I cofounded"),
    c("about", "who is this guy"),
    c("cv", "work experience"),
    c("education", "degrees, theses, certificates"),
    c("skills", "toolbox"),
    c("projects", "public repos"),
    c("contact", "get in touch"),
    c("imprint", "legal notice / impressum"),
    c("neofetch", "the login card again"),
    c("ls", "list files · cat <file> reads one"),
    c("clear", "wipe the screen"),
    "",
    dim("  tab completes · ↑↓ history · click any underlined command"),
  ];
}

const KIVO_LOGO = [
  " _  _____ _   _  ___  ",
  "| |/ /_ _| | | |/ _ \\ ",
  "| ' / | || | | | | | |",
  "| . \\ | || |_| | |_| |",
  "|_|\\_\\___|\\___/ \\___/ ",
];

const KIVO_FLOW = [
  "  1 hour logged once ............ who · project · contract · billable?",
  "        |",
  "        +--> client sign-off ---> sealed timesheet --+",
  "        +--> billable value ------------------------+--> invoice --> cash flow forecast",
  "        +--> internal cost ---> project margin       |",
  "        +--> capacity plan --------------------------+",
];

const KIVO_EU = [
  "  browser / desktop",
  "        |",
  "  [ KIVO app  Next.js · tRPC · Docker ]",
  "        |                 \\",
  "  [ PostgreSQL ]   [ object storage ]   <-- Scaleway fr-par, one KMS key per company",
  "        |",
  "  [ European AI models ]                x  AWS · Azure · GCP · US LLM APIs: not here",
];

function kivoCmd(sub: string, runCmd: Run): Line[] {
  const nav = (
    <>
      {dim("more: ")}
      {["problem", "flow", "ai", "europe", "stack"].map((s) => (
        <span key={s} className="mr-3"><Cmd c={`kivo ${s}`} run={runCmd} /></span>
      ))}
      <A href={kivo.url}>kivo.eco</A>
    </>
  );
  const pre = (rows: string[]) => rows.map((r) => <span className="text-lime">{r}</span>);
  switch (sub) {
    case "problem":
      return box("KIVO · the problem", true, [...kivo.problem.map((x) => <>{"• "}{x}</>), "", <span className="font-bold">{kivo.why}</span>, "", nav]);
    case "flow":
      return box("KIVO · data captured once, everything derives", true, [
        "Log one hour. Sign-off, billing, cost, capacity, invoice, margin and forecast all follow from that single capture.",
        "",
        ...pre(KIVO_FLOW),
        "",
        "A vacation request arrives with its consequences already calculated: cost, project plan, billing risk.",
        "",
        nav,
      ]);
    case "ai":
      return box("KIVO · approach to AI", true, [...kivo.ai.map((x) => <>{"• "}{x}</>), "", nav]);
    case "europe":
    case "eu":
      return box("KIVO · Europe first", true, [...kivo.europe.map((x) => <>{"• "}{x}</>), "", ...pre(KIVO_EU), "", nav]);
    case "stack":
      return box("KIVO · stack & status", true, [
        <>{dim("stack    ")}{kivo.stack}</>,
        <>{dim("modules  ")}{kivo.modules.join(" · ")}</>,
        <>{dim("built    ")}<span className="bar w-36" />{" 3 years, inside EMPA"}</>,
        <>{dim("live     ")}<span className="bar w-24" />{" 2 customers in production"}</>,
        <>{dim("origin   ")}{"ran EMPA itself on it before the first external customer"}</>,
        "",
        nav,
      ]);
    default:
      return [
        ...pre(KIVO_LOGO),
        <span className="glow-lime font-bold">{kivo.pitch}</span>,
        "",
        ...box("what it is", true, [
          "Not an ERP. One holistic system for running a whole business, instead of one more tool next to the others.",
          "Finished processes, not an empty shell: import your data on day one, start working, trust the processes.",
          "No consultants, no technical setup, no separate automation layer bolted on.",
          "Standard cases run by themselves. The system speaks up only when something is out of the ordinary or a decision is needed.",
        ]),
        "",
        ...box("in numbers", true, [
          <>{dim("3 years  ")}<span className="bar w-48" />{" built inside EMPA"}</>,
          <>{dim("2 live   ")}<span className="bar w-32" />{" customers in production"}</>,
          <>{dim("100% EU  ")}<span className="bar w-64" />{" infrastructure, AI models, keys"}</>,
          <>{dim("0        ")}{"American cloud services underneath"}</>,
        ]),
        "",
        <>{dim("status ")}{kivo.status}</>,
        "",
        nav,
      ];
  }
}

export function run(input: string, runCmd: Run): Line[] | "clear" {
  const [cmd, ...args] = input.trim().split(/\s+/);
  const arg = args.join(" ");
  switch (cmd) {
    case "":
      return [];
    case "help":
    case "?":
      return help(runCmd);
    case "clear":
    case "cls":
      return "clear";
    case "neofetch":
    case "login":
    case "whoami":
      return idCard(runCmd);
    case "ls":
    case "dir":
      return [
        <>
          {FILES.map((f) => (
            <span key={f} className="mr-4">
              <Cmd c={`cat ${f}`} run={runCmd} />
            </span>
          ))}
        </>,
      ];
    case "cat":
      if (!arg) return [<span className="text-red">cat: missing file · try ls</span>];
      if (FILES.includes(arg)) return run(arg.replace(".md", ""), runCmd);
      return [<span className="text-red">cat: {arg}: No such file</span>];
    case "open":
      {
        const u = (p.links as Record<string, string>)[arg];
        if (!u) return [<span className="text-red">open: unknown target · kivo | empa | linkedin | github</span>];
        window.open(u, "_blank");
        return [dim(`→ ${u}`)];
      }
    case "kivo":
      return kivoCmd(arg, runCmd);
    case "empa":
      return box("EMPA · cofounder & director ejecutivo", false, [
        <span className="font-bold">{empa.pitch}</span>,
        "",
        ...empa.points.map((x) => <>{"• "}{x}</>),
        "",
        <>{dim("me     ")}{empa.role}</>,
        <>{dim("url    ")}<A href={empa.url}>empa.co</A>{"  "}<Cmd c="open empa" run={runCmd} /></>,
      ]);
    case "about":
    case "bio":
      return [
        <span className="text-lime font-bold">{p.name}</span>,
        p.tagline,
        "",
        <>
          {"What I actually do"}
        </>,
        <>{dim("Data Strategy  -->  ")}Governance, data models, AI readiness for large organisations</>,
        <>{dim("Engineering    -->  ")}TypeScript / Next.js / tRPC / Prisma / Postgres, from schema to shipped UI</>,
        <>{dim("AI             -->  ")}LLM pipelines with eval harnesses, agents, document intelligence</>,
        <>{dim("Analytics      -->  ")}Spatiotemporal forecasting, geodata, ML in production</>,
        <>{dim("Business       -->  ")}Cofounder, P&L, hiring, and the unglamorous operations in between</>,
        "",
        <>{dim("based in ")}{p.location}{dim(" · ")}{p.languages}</>,
      ];
    case "cv":
    case "experience":
    case "work":
      return p.experience.flatMap((e, i) => [
        <>
          <span className={i === 0 ? "glow-sky font-bold" : "text-sky font-bold"}>{e.role}</span>
          {dim(" @ ")}
          <span className={/EMPA/.test(e.company) ? "glow-lime" : ""}>{e.company}</span>
        </>,
        <>{dim(`  ${e.years} · ${e.where}`)}</>,
        ...e.points.map((x) => <>{"  • "}{x}</>),
        "",
      ]);
    case "education":
    case "edu":
      return [
        ...p.education.flatMap((e) => [
          <>
            <span className="text-sky font-bold">{e.degree}</span>
          </>,
          <>{dim(`  ${e.school} · ${e.years}`)}</>,
          ...(e.note ? [<>{"  "}{e.note}</>] : []),
          "",
        ]),
        <span className="text-lime">certificates</span>,
        ...p.certs.map((c) => <>{"  • "}{c}</>),
      ];
    case "skills":
    case "stack":
      return Object.entries(p.skills).map(([k, v]) => (
        <>
          <span className="text-sky">{k.padEnd(14)}</span>
          {v.map((s) => (
            <span key={s} className="inline-block border border-slate rounded px-1 mr-1 mb-1 text-[0.85em]">
              {s}
            </span>
          ))}
        </>
      ));
    case "projects":
    case "repos":
      return [
        ...p.repos.map(([r, d]) => (
          <>
            <A href={`${p.links.github}/${r}`}>{r.padEnd(30)}</A>
            {dim(d)}
          </>
        )),
        "",
        dim("Most of my daily work, KIVO included, lives in private repos."),
      ];
    case "contact":
    case "hire":
      return [
        "If you are wrestling with data governance, an AI project that stalled on messy data,",
        "or a company drowning in the administration between its tools, that is my favourite kind of conversation.",
        "",
        <>{dim("email     ")}<A href={`mailto:${p.email}`}>{p.email}</A></>,
        <>{dim("linkedin  ")}<A href={p.links.linkedin}>linkedin.com/in/yannickaaron</A></>,
        <>{dim("github    ")}<A href={p.links.github}>github.com/YannickAaron</A></>,
        <>{dim("empa      ")}<A href={p.links.empa}>empa.co</A></>,
        <>{dim("kivo      ")}<A href={p.links.kivo}>kivo.eco</A></>,
      ];
    case "imprint":
    case "impressum":
    case "legal":
      return [
        <span className="text-sky font-bold">Imprint / Impressum / Aviso legal</span>,
        imprint.company,
        imprint.person,
        ...imprint.address,
        <>{dim("email  ")}<A href={`mailto:${imprint.email}`}>{imprint.email}</A></>,
        <>{dim("web    ")}<A href={p.links.empa}>empa.co</A></>,
        "",
        dim(imprint.note),
      ];
    case "pwd":
      return ["/home/yannick"];
    case "date":
      return [new Date().toString()];
    case "echo":
      return [arg];
    case "sudo":
      return [<span className="text-red">yannick is not in the sudoers file. This incident will be reported to EMPA.</span>];
    case "rm":
      return [<span className="text-amber">nice try. KIVO keeps backups.</span>];
    case "exit":
    case "logout":
      return [dim("logout"), dim("There is no escape. Try"), <Cmd c="help" run={runCmd} />];
    default:
      return [
        <>
          <span className="text-red">{cmd}: command not found</span>
          {dim(" · try ")}
          <Cmd c="help" run={runCmd} />
        </>,
      ];
  }
}

export const COMMANDS = [
  "help", "kivo", "empa", "about", "cv", "education", "skills", "projects", "contact",
  "neofetch", "imprint", "ls", "cat", "open", "clear", "whoami", "pwd", "date", "echo", "exit",
];
export const COMPLETIONS = [...COMMANDS, "kivo problem", "kivo flow", "kivo ai", "kivo europe", "kivo stack", ...FILES.map((f) => `cat ${f}`), "open kivo", "open empa", "open linkedin", "open github"];
