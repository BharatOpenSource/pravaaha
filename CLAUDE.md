# pravaaha — Claude Instructions

*Sanskrit: प्रवाह — flow, current, continuous movement*

> Read this before doing any work in this directory.
> Org context: see `../CLAUDE.md`.

## What this project is

Apply Git's mental model — versioning, branching, diffing, forking, blame — to institutional and civic processes. Not to code.

**The problem:** Institutional processes in India are largely invisible. How decisions get made, how rules get applied, how procedures evolve — this happens outside any system of record. There is no diff. There is no author. There is no way for a citizen or a reform-minded official to propose a change, compare two approaches, or understand why something works the way it does. The result is opacity that protects incompetence.

**Every process should be:**
- **Authored** — someone is responsible
- **Versioned** — changes are tracked, not silently overwritten
- **Auditable** — the history is visible
- **Forkable** — a panchayat can adopt a process that works elsewhere and adapt it
- **Diffable** — you can see exactly what changed between two versions

**First adopters:** NGOs, cooperatives, reform-minded local bodies — anywhere there is already incentive for transparency. Not a top-down government mandate.

## Current status

**Vision. Not yet spec.**

The core idea is clear. The data model, the interface, the format for expressing processes — these are open questions. Do not invent specifics — if something isn't decided yet, say so.

**Open background question:** pravaaha may eventually become a domain-specific language for expressing civic/institutional processes — readable, auditable, translatable to Indic scripts. Panini-inspired formal grammar meets governance logic. Don't force it. Let it arrive.

## About the builder

Srikar Buddhiraju. Cloud platform engineer, deep Azure background. AI-first working style — explicit, readable code, minimal dependencies. This is his most concretely-defined seed within BharatOpenSource.

## Design philosophy

1. **Citizen-readable** — the format for expressing processes must be readable by non-technical people
2. **Explicit and auditable** — no magic, no hidden state, everything visible
3. **Minimal dependencies** — every dependency is a maintenance liability
4. **Forkable by design** — the architecture must support forking and merging as first-class operations
5. **Indic language aware** — process descriptions should be expressible in regional scripts

## Session start checklist

Before doing anything else each session:
1. Read `docs/ConvoQA.md` — past decisions and open questions
2. Read `docs/lessons.md` — mistakes and rules to avoid repeating
3. Read `docs/LatestTask.md` — what was being worked on last session

Summarise: what was in progress, any open `[ ]` items, relevant lessons — then ask what to work on.

## Working conventions

- **200-line limit** on all markdown files in `docs/` — split if exceeded
- **LatestTask.md** — rolling session log, current 1-2 sessions only, updated during active work
- **ConvoQA.md** — any decision made in conversation that isn't captured in `CLAUDE.md`
- **lessons.md** — updated after any correction, reviewed at session start
- **todo.md** — local planning (gitignored), checkable items, reviewed before every session
- **Feature branches:** `feature/<short-description>` — never commit directly to `main`
- **Verify before done** — never mark complete without proving it works

## Self-improvement loop

After ANY correction from Srikar: update `docs/lessons.md` immediately. Review at session start.

## Git

Repo: https://github.com/BharatOpenSource/pravaaha
Branch convention: `feature/<short-description>`
Never commit directly to `main`.
