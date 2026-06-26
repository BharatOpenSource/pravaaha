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

### What a process is — locked 2026-06-26
- A directed graph: nodes = steps, edges = conditions/branches/loops
- Each step: actor, action, inputs, outputs, conditions, immutability level
- Supports: conditional branches (if/else), loops (rejection → resubmit), dependencies, progress markers
- Both parties log justifications and reasoning at each step
- All attempts recorded — nothing is silently overwritten

### Storage model — locked 2026-06-26
- Git is the storage layer. A process IS a Git repo.
- pravaaha = format + toolchain. Git = infrastructure.
- Sealed versions are signed Git tags. Branch protection = immutability enforcement.
- Hosting is the owner's choice (GitHub, GitLab, self-hosted Gitea, own server).
- Fully decentralized — no pravaaha-central server owns the data.

### Repo structure — locked 2026-06-26
- One repo per org OR per major process domain (e.g., mca-india/company-registration)
- **Branches = processes** (not directories). Each branch is one process.
- `main` branch = repo index/overview
- Sub-processes: naming convention (`pvt-ltd/name-reservation`) — Git displays as grouped hierarchy
- Version management: commits + sealed signed tags per branch. Latest = tip of branch.
- Proposed changes: new branch (`pvt-ltd/proposed/...`) + notice period → merge + new tag

### Process schema format — locked 2026-06-26
- YAML for v0.1. Sutra language becomes the source format in v0.2+. YAML becomes compilation target.
- Schema fields: id, name, version, owner, visibility, change_lock_days, parties, rights, references, steps
- Each step: id, name, actor, action, inputs, outputs, conditions, loop_back, uses (reference), terminal, immutability
- `rights` block: party rights with mandatory `authority` (law + section/article citation)
- `references` block: external process dependencies in `org/repo@branch@version` format

### Visibility tiers — locked 2026-06-26
- `public` — open to all, indexed in registry (e.g., R&B contractor process, general public visible)
- `restricted` — visible to involved parties only, not publicly searchable (e.g., bank loan: bank + applicant)
- `private` — within org only (internal government, internal corporate)

### Immutability model — locked 2026-06-26
- Rights immutability is NOT decided by pravaaha — it derives from law (Constitution, statute, regulation)
- pravaaha enforces that if a right has a legal citation, that citation cannot be silently removed
- Step immutability: `notice-required` (all public process steps) | `flexible` (private/internal only)
- `change_lock_days`: minimum notice period before a proposed change goes live. Set by governing authority for public processes; owner-set for private.

### Access model — locked 2026-06-26
- Restricted process access: automatic upon transaction initiation (v0.2)
- v0.1: manual token distribution for restricted processes (no instances yet)
- Identity and signing: GPG/SSH key at onboarding, key confirmation for every publish (v0.1 lightweight)
- Full identity layer: Pramana (separate project, integrates in v0.2)

### Change control — locked 2026-06-26
- Minimum time lock after publishing (can't change immediately — prevents thrashing)
- No maximum lock — processes can evolve over years
- New submissions default to latest version; existing submissions stay on their version
- Proposed change + notice period model. During notice: change is visible, not yet live.
- Rights with legal citations: cannot be removed without surfacing the citation and forcing justification

### v0.1 scope — locked 2026-06-26
**Build:**
1. YAML schema spec — written document, the reference everything implements
2. `pravaaha` CLI (TypeScript) — `init`, `validate`, `publish`, `diff`, `propose-change`
3. Three reference templates — income tax filing, company registration (pvt ltd), invoice payment

**CLI migrates to Sutra-based implementation during/after v0.2.**

**Defer to v0.2:**
- GUI / visual builder
- Instance tracking
- Registry / public search
- Restricted access automation (Pramana)
- Process reference resolution
- Test mode / actor simulation

### Related projects — locked 2026-06-26
- **Sutra**: the language pravaaha will use as its source format (v0.2+). YAML is the bridge.
- **Pramana**: identity management system. pravaaha v0.1 uses lightweight GPG signing; Pramana replaces it in v0.2.

### Security architecture — locked 2026-06-26

**VPA tiers (4):** `unverified` | `self-attested` | `authority-verified` | `authority`
- `authority` tier: root of trust, verified via existing Indian infrastructure (gov.in, GSTIN, MCA21, UIDAI) — minimum 2 independent authoritative sources
- Cross-verification with existing trusted systems — pravaaha inherits trust, does not reinvent it

**Multi-sig:** Minimum 2-of-2, recommended 2-of-3. Signers always appointed by higher authority, never self-appointed. Every publish: key + MFA (human-present second factor).

**Process Integrity Ledger (PIL):** Append-only log, multiple independent operators, no single owner. Records every sealed version hash, VPA assignment, quarantine event, governance decision. Authoritative source of truth over Git repos.

**Integrity checking:** All process references hash-locked at declaration time. Hash verified on every validation run. Mismatch → automatic quarantine → automatic fallback → escalate.

**CLI distribution:** Signed binaries from GitHub releases only. No npm, no package registry.

**Data model:** pravaaha never stores personal data. Orchestrator, not a store. Integration model (DigiLocker-style): authenticate → read from source, never copy to pravaaha. Erasure via redaction available as safety net.

**Data residency:** Org's responsibility. pravaaha validates and prompts compliance — cannot technically enforce jurisdiction but will not stay silent.

**Symmetric transparency:** Government using pravaaha is as auditable as anyone else. Transparency is both-ways — a structural defense, not just a feature.

### Governance — locked 2026-06-26

Full model in `GOVERNANCE.md`. Key decisions:

- Three branches: Specification Council (legislative), Operations (executive), Dispute Panel (judicial)
- No single entity controls more than one branch
- Government = user, not governor. No governance role for government bodies.
- **Automation first:** hash mismatch fires quarantine automatically at ALL tiers including `authority`. Logic is non-negotiable.
- Authority-tier quarantine: auto-fires + auto-fallback, but recovery requires active multi-party participation, time-bound
- GOVERNANCE.md ships with v0.1, evolves organically
- Founder (Srikar Buddhiraju) explicitly limits own power in the document. No special overrides.
- Transition to foundation/org: organic, when adoption warrants it
- pravaaha's governance is itself a pravaaha process — versioned, auditable, governed by the same rules

## Open Questions

- [ ] Licensing approach per project
- [ ] Aadhaar integration for Pramana (sensitive, separate session)
- [ ] Registry design for v0.2 (indexing public repos, search by type/geography/owner)
- [ ] Notice period length standards — who sets minimums for public processes?
- [ ] What does a human-readable diff look like for a non-technical citizen?
- [ ] Key recovery mechanics for non-technical users (Pramana problem)
- [ ] PIL operators — who are they, how are they selected, how is independence enforced?
- [ ] Specification Council composition — how many members, how elected, initial bootstrap
