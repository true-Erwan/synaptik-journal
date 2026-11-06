// Shared domain types for Synaptik v2.
// These mirror the shape of the extracted data (src/data/*.json).

export type Lang = 'fr' | 'en';

export interface DurationPhase {
  min: number;
  max: number;
  units: 'seconds' | 'minutes' | 'hours' | 'days';
}

export interface Duration {
  onset?: DurationPhase;
  comeup?: DurationPhase;
  peak?: DurationPhase;
  offset?: DurationPhase;
  total?: DurationPhase;
  afterglow?: DurationPhase;
}

export interface DoseTiers {
  units: string;
  threshold?: number;
  lightMin?: number;
  commonMin?: number;
  strongMin?: number;
  heavyMin?: number;
}

export interface Roa {
  name: string; // 'oral' | 'sublingual' | 'insufflated' | ...
  dose?: DoseTiers;
  duration?: Duration;
  bioavailability?: { min: number; max: number };
}

export interface Interactions {
  dangerous?: string[];
  unsafe?: string[];
  uncertain?: string[];
}

export interface Substance {
  name: string;
  commonNames?: string[];
  url?: string;
  categories?: string[];
  summary?: string;
  effectsSummary?: string;
  dosageRemark?: string;
  generalRisks?: string;
  longtermRisks?: string;
  saferUse?: string[];
  interactions?: Interactions;
  roas?: Roa[];
  color?: string;
  colorArgb?: number;
  relativePotency?: number;
  classPotencies?: Record<string, number>;
  addictionScore?: number;
  physicalDependenceScore?: number;
}

export interface Category {
  name: string;
  description?: string;
  url?: string;
  color?: number;
}

// Medical schedule table (curated, non-divertible medicines only)
export interface MedicalScheduleEntry {
  minDelayHours: number;
  maxPerIntake: number;
  maxPer24h: number;
  units: string;
  doses?: number[]; // prescribed quick-pick steps shown as "Dose prescrite" chips
}

// Per-route medical dose tiers for non-divertible medicines
export interface NonDivertibleRoute {
  low: number;
  standard: number;
  max: number;
  units: string;
}

export type InteractionLevel = 'DANGEROUS' | 'UNSAFE' | 'UNCERTAIN';

export interface InteractionResult {
  type: InteractionLevel;
}

// A logged intake stored on the device
export interface Ingestion {
  id: string;
  substanceName: string; // canonical English name (data key)
  route: string;
  dose: number | null; // null for divertible substances (we never store/show misuse doses)
  unit: string;
  // Absolute timestamp (ms) of the intake. May be in the past or future.
  time: number;
  // Selected release form id (e.g. 'IR', 'OXYCONTIN_LP_12H'). Optional.
  releaseProfileId?: string;
}
