# pravaaha — Governance

> Version 1.0 — the founding document.
> This document is itself a pravaaha process: versioned, auditable, governed by the same rules it imposes on everyone else.

---

## Constitutional principles

These are foundational. They can be extended but never weakened. Changing them requires a 2/3 supermajority of the Specification Council and a mandatory public comment period.

1. **pravaaha governs itself by pravaaha** — all governance decisions are recorded, versioned, publicly auditable
2. **Government is a user, not a governor** — government bodies have no governance role; they adopt pravaaha on the same terms as everyone else
3. **Separation of powers** — no single entity controls more than one branch of governance
4. **Automation first** — technical decisions are automated; humans intervene only where automation genuinely cannot reach
5. **No compromise on foundational security** — the logic of verification, integrity checking, and quarantine is non-negotiable
6. **Symmetric transparency** — the rules that apply to process publishers apply to pravaaha itself

---

## Three branches

### Specification Council (legislative)
Defines the schema, constitutional rules, VPA criteria, validation logic, and CLI behaviour.

- Open contribution — anyone can propose
- Public comment period mandatory for any rule change (minimum 30 days for constitutional changes, 14 days for operational changes)
- 2/3 supermajority to change constitutional principles
- Simple majority for operational rule changes
- All votes recorded and auditable

### Operations (executive)
Maintains the PIL, runs VPA verification, operates the quarantine system, and manages automated processes.

- Multiple independent operators — no single owner of any critical function
- All actions are logged, time-stamped, and auditable
- Automated wherever technically possible
- Human involvement limited to: recovery coordination, escalation, and VPA tier assignment at the `authority` level

### Dispute Panel (judicial)
Resolves contested quarantine decisions, VPA assignment disputes, and governance conflicts.

- Independent of Operations — no overlap in membership
- Term-limited (2 years, renewable once)
- Conflict of interest must be disclosed; affected members recused
- All decisions are public
- Appeal is available to the full Specification Council

---

## Automation rules (non-negotiable)

These run without human intervention. No tier is exempt, including `authority`.

### Hash mismatch → immediate quarantine
When a process reference fails integrity verification:

1. Quarantine the compromised version immediately
2. Fall back to the last verified version automatically
3. Flag all processes referencing the compromised source with an integrity warning
4. Notify all affected process owners immediately
5. Open a time-bound recovery window
6. If unresolved within the recovery window → escalate to the Dispute Panel automatically

### Authority-tier quarantine recovery
Authority-tier processes receive an accelerated recovery path because of their systemic impact:

- All designated signers are notified immediately and required to respond
- Recovery requires active multi-party participation (minimum the same M-of-N threshold as publishing)
- Time-bound: defined recovery window, no extensions without Dispute Panel approval
- The incident is permanently recorded in the PIL regardless of outcome — no exceptions

---

## Verified Process Authority (VPA) tiers

### `authority`
The root of trust at any given level of the hierarchy.

- Verified via existing Indian infrastructure: `gov.in` domain, GSTIN, MCA21, UIDAI, or equivalent authoritative cross-reference
- Minimum 2 independent authoritative sources required
- Assigned by the Specification Council, recorded permanently in the PIL
- Cannot be self-assigned

### `authority-verified`
Verified and appointed by an `authority`-tier entity.

- Documented appointment chain must be visible in process metadata
- Inherits trust from the appointing `authority`

### `self-attested`
Org provides documentation of claimed identity. No third-party verification.

- Clearly labeled in all registry views and process metadata
- User judgment applies

### `unverified`
No verification of any kind. Clearly labeled everywhere.

- Full pravaaha functionality available
- Trust is entirely the reader's judgment

---

## Multi-sig rules

- Minimum 2-of-2 for any process publish or change
- Recommended 2-of-3 (3 signers prevents deadlock; 2 cannot)
- Signers are always appointed by a higher authority in the org hierarchy — never self-appointed
- Signer list changes require approval from the appointing authority
- Every publish requires: signing key + human-present second factor (MFA)

---

## Founding constraints

**Srikar Buddhiraju** is the founder of pravaaha. By this document, the founder:

1. Cannot unilaterally change any constitutional principle
2. Cannot simultaneously hold positions in more than one governance branch
3. Has no special override in any automated system — the automation applies equally
4. Explicitly commits to transitioning governance to a foundation or independent organisation when adoption warrants it
5. The timing of that transition is organic — it happens when the community is ready, not on a fixed schedule

The founding document is version 1.0 of pravaaha's own governance process. It is subject to the same change process as all other pravaaha rules.

---

## Process Integrity Ledger (PIL)

The PIL is an append-only log, maintained by multiple independent operators, that records:

- Every sealed process version hash at publish time
- Every VPA tier assignment and change
- Every quarantine event and its resolution
- Every governance decision

No single party controls the PIL. In a dispute, the PIL is the authoritative source of truth — not the Git repo, which is a potential attack surface.

---

## Evolution of this document

This document evolves through the standard pravaaha change process:

- Proposed change → public comment period → Specification Council vote → new sealed version
- All prior versions are preserved and auditable — nothing is deleted
- Constitutional principles require 2/3 supermajority
- Operational rules require simple majority

*The governance of pravaaha is a pravaaha process.*
