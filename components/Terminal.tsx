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

  const exec = useCallback(
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
      </div>
    </main>
  );
}
