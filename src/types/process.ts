export type VpaTier = 'unverified' | 'self-attested' | 'authority-verified' | 'authority'
export type Visibility = 'public' | 'restricted' | 'private'
export type Immutability = 'notice-required' | 'flexible'

export interface ProcessOwner {
  id: string
  name: string
  vpa_tier?: VpaTier
}

export interface Party {
  id: string
  role: string
  optional?: boolean
}

export interface RightAuthority {
  law: string
  section?: string
  article?: string
}

export interface ProcessRight {
  party: string
  right: string
  authority: RightAuthority
}

export interface ProcessReference {
  id: string
  source: string
  required?: boolean
  hash?: string
}

export interface StepCondition {
  if: string
  next: string
}

export interface ProcessStep {
  id: string
  name: string
  actor?: string
  action?: string
  inputs?: string[]
  outputs?: string[]
  next?: string
  conditions?: StepCondition[]
  loop_back?: string
  uses?: string
  terminal?: boolean
  immutability?: Immutability
  rights_reference?: string
}

export interface Process {
  id: string
  name: string
  version: string
  owner: ProcessOwner
  visibility: Visibility
  change_lock_days?: number
  parties: Party[]
  rights?: ProcessRight[]
  references?: ProcessReference[]
  steps: ProcessStep[]
}

export interface ProcessFile {
  process: Process
}
