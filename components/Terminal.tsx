"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { run, idCard, COMPLETIONS, type Line } from "./commands";
import { profile as p } from "@/lib/profile";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const PROMPT = `${p.handle}@${p.host}:~$ `;

type Entry = { id: number; node: Line };

const BOOT: [string, number, string?][] = [
  ["BIOS  yannickaaron v3.0 · Valencia build", 250],
  ["[ OK ] mounting /home/yannick", 120],
  ["[ OK ] loading data foundation ........... one model, zero double entry", 160],
  ["[ OK ] starting empa.service ............. consulting, DE + ES", 140, "sky"],
  ["[ OK ] starting kivo.service ............. 2 customers in production", 140, "lime"],
  ["[ OK ] pytorch, airflow, trpc, prisma ..... warm", 120],
  ["[ OK ] valencia.weather .................. 27°C, productivity nominal", 140],
  ["[ .. ] american cloud services ........... not found (by design)", 260, "dim"],
  ["", 200],
];

export default function Terminal() {
  const [lines, setLines] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);
  const [typing, setTyping] = useState<string | null>(null); // login typewriter
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const booted = useRef(false);
  const execRef = useRef<(c: string) => void>(() => {});
  // ponytail: promise chain so a fast typist cannot interleave two commands' output
  const queue = useRef<Promise<void>>(Promise.resolve());

  const push = useCallback((node: Line) => {
    setLines((l) => [...l, { id: idRef.current++, node }]);
  }, []);

  const pushMany = useCallback(
    async (out: Line[], delay = 18) => {
      for (const n of out) {
        push(n);
        if (delay) await sleep(delay);
      }
    },
    [push],
  );

  const runOne = useCallback(
    async (raw: string) => {
      const cmd = raw.trim();
      push(
        <>
          <span className="text-lime">{PROMPT}</span>
          {cmd}
        </>,
      );
      if (cmd) setHist((h) => (h[h.length - 1] === cmd ? h : [...h, cmd]));
      setHi(-1);
      const out = run(cmd, (c) => execRef.current(c));
      if (out === "clear") return setLines([]);
      await pushMany(out);
    },
    [push, pushMany],
  );

  const exec = useCallback(
    (raw: string) => {
      queue.current = queue.current.then(() => runOne(raw));
      return queue.current;
    },
    [runOne],
  );

  useEffect(() => {
    execRef.current = (c) => void exec(c);
  }, [exec]);

  // boot + login sequence
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    (async () => {
      for (const [text, ms, cls] of BOOT) {
        push(<span className={cls === "lime" ? "glow-lime" : cls === "sky" ? "glow-sky" : cls === "dim" ? "text-dim" : ""}>{text}</span>);
        await sleep(ms);
      }
      // typewriter login
      const type = async (label: string, value: string, mask = false) => {
        for (let i = 1; i <= value.length; i++) {
          setTyping(label + (mask ? "•".repeat(i) : value.slice(0, i)));
          await sleep(mask ? 70 : 55);
        }
        await sleep(200);
        setTyping(null);
        push(<span className="text-dim">{label}{mask ? "•".repeat(value.length) : value}</span>);
      };
      await sleep(200);
      await type("login: ", p.handle);
      await type("password: ", "kivo.eco", true);
      await sleep(150);
      push(
        <>
          <span className="text-dim">auth </span>
          <span className="bar w-40" />
          <span className="text-lime"> ok</span>
        </>,
      );
      await sleep(700);
      push(<span className="text-dim">Last login: {new Date().toUTCString()} from 🇪🇸 valencia</span>);
      push("");
      await pushMany(idCard((c) => void exec(c)), 40);
      push("");
      push(
        <>
          Welcome. Type <span className="cmd" onClick={() => void exec("help")}>help</span>, or start with{" "}
          <span className="cmd" onClick={() => void exec("kivo")}>kivo</span>.
        </>,
      );
      push("");
      setReady(true);
    })();
  }, [push, pushMany, exec]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing, input]);

  useEffect(() => {
    if (ready) inputRef.current?.focus();
  }, [ready]);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void exec(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = hi < 0 ? hist.length - 1 : Math.max(0, hi - 1);
      if (hist[i] !== undefined) { setHi(i); setInput(hist[i]); }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hi + 1;
      if (i >= hist.length) { setHi(-1); setInput(""); } else { setHi(i); setInput(hist[i]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = COMPLETIONS.filter((c) => c.startsWith(input) && c !== input);
      if (m.length === 1) setInput(m[0]);
      else if (m.length > 1) {
        push(<span className="text-dim">{m.join("  ")}</span>);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "c" && e.ctrlKey) {
      setInput("");
    }
  };

  return (
    <main
      className="crt h-dvh p-3 sm:p-6 flex"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 min-h-0 flex flex-col rounded-lg border border-slate/60 bg-panel shadow-[0_0_60px_rgba(198,227,85,0.06)] overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate/60 text-xs text-dim select-none">
          <span className="w-3 h-3 rounded-full bg-red/80" />
          <span className="w-3 h-3 rounded-full bg-amber/80" />
          <span className="w-3 h-3 rounded-full bg-lime/80" />
          <span className="ml-3">{p.handle}@{p.host}: ~ — zsh</span>
          <span className="ml-auto hidden sm:inline">
            <span className="text-lime">KIVO</span> · <span className="text-sky">EMPA</span> · Valencia
          </span>
        </div>
        <div ref={scrollRef} className="flex-1 min-h-0 p-3 sm:p-5 text-[13px] sm:text-sm leading-relaxed overflow-auto">
          {lines.map((l) => (
            <div key={l.id} className="line min-h-[1.6em]">
              {l.node}
            </div>
          ))}
          {typing !== null && (
            <div className="line text-dim">
              {typing}
              <span className="cursor" />
            </div>
          )}
          {ready && (
            <div className="line flex">
              <span className="text-lime whitespace-pre">{PROMPT}</span>
              <span className="whitespace-pre">{input}</span>
              <span className="cursor" />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                className="absolute opacity-0 w-0 h-0"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                aria-label="terminal input"
              />
            </div>
          )}
        </div>
        <footer className="flex flex-wrap items-center gap-x-4 gap-y-1 px-3 py-2 border-t border-slate/60 text-xs text-dim select-none">
          <a href={`mailto:${p.email}`}>{p.email}</a>
          <a href={p.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/></svg>
            github
          </a>
          <a href={p.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>
            linkedin
          </a>
          <span className="cmd" onClick={() => void exec("help")}>more</span>
          <span className="cmd" onClick={() => void exec("imprint")}>imprint</span>
          <span className="ml-auto hidden sm:inline">© {new Date().getFullYear()} {p.name}</span>
        </footer>
      </div>
    </main>
  );
}
