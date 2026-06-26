# Latest Task — pravaaha

> Rolling log. Current session only — 1-2 sessions max. 200-line limit.

## Session: 2026-06-26

**Status:** v0.1 fully defined. Ready to build.

**Completed this session:**
- [x] Full technical QA — storage, schema, repo structure, visibility, immutability, change control, access model
- [x] All decisions locked in ConvoQA.md
- [x] YAML schema designed and validated against company registration (pvt ltd) use case
- [x] v0.1 scope locked: schema spec + CLI (TypeScript) + 3 templates
- [x] Sutra and Pramana identified as companion projects, folders created

**v0.1 build order:**
- [ ] Write the YAML schema spec (the reference document)
- [ ] Define the 3 templates in YAML (income tax, company registration, invoice payment)
- [ ] Scaffold the `pravaaha` CLI (TypeScript, Node.js)
- [ ] Implement `pravaaha init` — scaffold a new process repo
- [ ] Implement `pravaaha validate` — structural check + legal citation presence
- [ ] Implement `pravaaha publish` — key-signed sealed tag
- [ ] Implement `pravaaha diff` — human-readable diff between versions
- [ ] Implement `pravaaha propose-change` — notice period branch + PR

**Blocked on:**
- [ ] Privacy and security session (required before build starts — processes will handle sensitive data)

**Pending (future):**
- [ ] Commit current docs to GitHub repo
- [ ] v0.2 planning: GUI, instance tracking, registry, Pramana integration
