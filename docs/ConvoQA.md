# pravaaha — Decisions & Open Questions

> 200-line limit — split into `ConvoQA-2.md` if exceeded.

## Decisions (locked)

### Name
- **pravaaha** (प्रवाह — flow, current, continuous movement)
- Rejected: prakriya, vaahini, nadi
- Chosen because it names the *motion*, not the container — processes flow, branch, merge
- **Established:** 2026-06-22

### Core mental model
- Git's model applied to institutional/civic processes — not code
- Every process: authored, versioned, auditable, forkable, diffable
- First adopters: NGOs, cooperatives, reform-minded local bodies
- Not a top-down government mandate

## Open Questions

- [ ] What is the format for expressing a process? (YAML? Markdown? Custom DSL?)
- [ ] What does "forking" a process look like concretely — how do two versions relate?
- [ ] What does a "diff" of two process versions look like to a non-technical reader?
- [ ] What is the interface — CLI? Web UI? Both?
- [ ] What does v0.1 look like? One process, one org, end-to-end?
- [ ] Is pravaaha eventually a DSL with Indic script support? (Background question — don't force it)
- [ ] What is the storage model — Git itself? A database? Something else?
- [ ] Licensing approach
