# Lessons — pravaaha

> Updated after any correction. Reviewed at every session start. 200-line limit.

## 1. Pramana is IAM, not an external identity verifier
**Rule:** Do not design Pramana as a system that verifies external identities (Aadhaar, government IDs, biometrics). That is the adopting org's responsibility. Pramana is an internal AD replacement — it manages users, roles, and keys within a pravaaha deployment.

**Why:** Framed incorrectly as an "Aadhaar session" when Srikar corrected: "pramaana is just a replacement to AD." External verification is outside scope. Pramana provides integration hooks; the org wires their own identity system.

**How to apply:** When designing Pramana features, always ask: "is this about managing an identity within pravaaha, or verifying it externally?" If external — it belongs in the org's integration layer, not in Pramana.
