import type { Process, ProcessStep } from '../types/process'

export interface SemanticError {
  type: 'error' | 'warning'
  message: string
}

export function validateSemantics(proc: Process): SemanticError[] {
  const errors: SemanticError[] = []
  const partyIds = new Set(proc.parties.map(p => p.id))
  const stepIds = new Set(proc.steps.map(s => s.id))
  const refIds = new Set((proc.references ?? []).map(r => r.id))

  // Validate rights
  for (const right of proc.rights ?? []) {
    if (!partyIds.has(right.party)) {
      errors.push({ type: 'error', message: `Right references unknown party '${right.party}'` })
    }
    if (!right.authority?.law) {
      errors.push({ type: 'error', message: `Right for party '${right.party}' missing authority.law citation` })
    }
  }

  // Validate steps
  const reachable = new Set<string>()
  if (proc.steps.length > 0) reachable.add(proc.steps[0].id)

  for (const step of proc.steps) {
    // Actor must be a known party
    if (step.actor && !partyIds.has(step.actor)) {
      errors.push({ type: 'error', message: `Step '${step.id}' references unknown actor '${step.actor}'` })
    }

    // uses must reference a declared reference
    if (step.uses && !refIds.has(step.uses)) {
      errors.push({ type: 'error', message: `Step '${step.id}' uses undeclared reference '${step.uses}'` })
    }

    // Every step needs an exit path
    const hasExit = step.terminal || step.next || step.conditions?.length || step.loop_back || step.uses
    if (!hasExit) {
      errors.push({ type: 'error', message: `Step '${step.id}' has no exit path (needs: next, conditions, loop_back, uses, or terminal: true)` })
    }

    // Check next step exists
    if (step.next) {
      if (!stepIds.has(step.next)) {
        errors.push({ type: 'error', message: `Step '${step.id}' next points to unknown step '${step.next}'` })
      } else {
        reachable.add(step.next)
      }
    }

    // Check condition targets exist
    for (const cond of step.conditions ?? []) {
      if (!stepIds.has(cond.next)) {
        errors.push({ type: 'error', message: `Step '${step.id}' condition '${cond.if}' points to unknown step '${cond.next}'` })
      } else {
        reachable.add(cond.next)
      }
    }

    // Check loop_back target exists
    if (step.loop_back) {
      if (!stepIds.has(step.loop_back)) {
        errors.push({ type: 'error', message: `Step '${step.id}' loop_back points to unknown step '${step.loop_back}'` })
      } else {
        reachable.add(step.loop_back)
      }
    }

    // Warn on missing action description
    if (!step.uses && !step.action) {
      errors.push({ type: 'warning', message: `Step '${step.id}' has no action description` })
    }
  }

  // Warn on unreachable steps
  for (const step of proc.steps) {
    if (!reachable.has(step.id)) {
      errors.push({ type: 'warning', message: `Step '${step.id}' may be unreachable from the first step` })
    }
  }

  // Public processes must define at least one right
  if (proc.visibility === 'public' && (!proc.rights || proc.rights.length === 0)) {
    errors.push({ type: 'warning', message: `Public process has no rights defined — consider declaring party rights with legal citations` })
  }

  return errors
}

export function terminalSteps(proc: Process): ProcessStep[] {
  return proc.steps.filter(s => s.terminal)
}

export function stepCount(proc: Process): number {
  return proc.steps.length
}
