# pravaaha

*Sanskrit: प्रवाह — flow, current, continuous movement*

> Part of [Bharat Open Source](https://github.com/BharatOpenSource)

Apply Git's mental model — versioning, branching, diffing, forking, blame — to institutional and civic processes. Not to code.

## The problem

Institutional processes in India are largely invisible. How decisions get made, how rules get applied, how procedures evolve — this happens outside any system of record. There is no diff. There is no author. There is no way for a citizen or a reform-minded official to propose a change, compare two approaches, or understand why something works the way it does.

The result is opacity that protects incompetence and prevents accountability.

This is not only a government problem. Any process where one party holds the rules and another must navigate them — invoice payment, loan approval, civic applications, NGO grants — has the same structural flaw.

## What pravaaha does

Every process is:
- **Authored** — someone is responsible
- **Versioned** — changes are tracked, never silently overwritten
- **Auditable** — the full history is visible to all parties
- **Forkable** — a panchayat can adopt a process that works elsewhere and adapt it, with lineage preserved
- **Diffable** — you can see exactly what changed between two versions, in plain language

Processes are stored in Git. A process is a branch. Sealed versions are signed tags. Forks are Git forks. The toolchain — pravaaha CLI — wraps these operations so you do not need to know Git to use it.

## Current status

**v0.1 — shipped.**

The schema, CLI, and reference templates are live on `main`.

### CLI

```bash
npm install -g pravaaha   # coming soon — use npx or build from source for now

pravaaha init             # scaffold a new process.yaml
pravaaha validate         # check schema + semantics before publishing
pravaaha publish          # seal and record a version (hash + git tag)
pravaaha diff v1.0.0 v1.1.0  # human-readable diff between sealed versions
```

### Process schema

A process is a directed graph expressed in YAML — steps, actors, conditions, branches, loops, and rights. Every right must cite its legal authority. No right can be silently removed.

```yaml
process:
  id: invoice-payment
  name: Invoice Payment Process
  version: "1.0.0"
  owner:
    id: my-org
    name: My Organisation
    vpa_tier: self-attested
  visibility: public
  change_lock_days: 14

  parties:
    - id: vendor
      role: Invoice Issuer
    - id: buyer
      role: Payment Authorizer

  rights:
    - party: vendor
      right: Right to receive payment within 30 days of invoice approval
      authority:
        law: Micro, Small and Medium Enterprises Development Act 2006
        section: Section 16

  steps:
    - id: create-invoice
      name: Create and Send Invoice
      actor: vendor
      action: Vendor creates itemised invoice and sends to buyer
      outputs: [invoice_document]
      next: review-invoice
      immutability: notice-required
    # ... more steps
```

### Reference templates

Three fully-specified templates ship with v0.1 — all validate clean:

| Template | Steps | Rights | Notes |
|----------|-------|--------|-------|
| `invoice-payment` | 5 | 2 | MSME Act, Contract Act |
| `income-tax-filing` | 14 | 3 | ITR full flow with loops, scrutiny |
| `company-registration/pvt-ltd` | 7 | 3 | Companies Act + Article 14, process references |

### Governance

pravaaha ships with [`GOVERNANCE.md`](GOVERNANCE.md) — a constitutional document defining how the project governs itself. Three branches (Specification Council, Operations, Dispute Panel), automation-first integrity checking, and a four-tier Verified Process Authority (VPA) system.

**Government bodies are users, not governors.** The transparency that pravaaha imposes on others applies equally to pravaaha itself.

## Verified Process Authority (VPA)

Every published process declares a trust tier:

| Tier | Meaning |
|------|---------|
| `unverified` | Anyone can publish — clearly labeled |
| `self-attested` | Org provides identity documentation |
| `authority-verified` | Verified by a higher authority in the hierarchy |
| `authority` | The authority itself — verified via existing Indian infrastructure (gov.in, GSTIN, MCA21) |

## Who it is for

Not a top-down government mandate. First adopters are places where there is already incentive for transparency: NGOs, cooperatives, reform-minded local bodies, small businesses, civic institutions that want to work in public.

The tool works for any process where one party holds the rules and another must navigate them.

## Companion projects

- **[Sutra](https://github.com/BharatOpenSource/sutra)** — a domain-specific language for expressing processes, designed to become the source format for pravaaha v0.2+
- **[Pramana](https://github.com/BharatOpenSource/pramana)** — identity management for verified process actors, integrates with pravaaha in v0.2

## Roadmap

| Version | Focus |
|---------|-------|
| v0.1 ✓ | Schema, CLI (init/validate/publish/diff), 3 reference templates |
| v0.2 | GUI visual builder, instance tracking, public registry, Pramana identity integration |
| v0.3+ | Sutra language as source format, OSM import, PDF export for planners |

## Part of

[Bharat Open Source](https://github.com/BharatOpenSource) — infrastructure built by India, for India.
