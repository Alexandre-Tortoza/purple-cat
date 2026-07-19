export const EASE = {
  standard: [0.25, 0.1, 0.25, 1],
  entrance: [0.65, 0, 0.35, 1],
} as const

export const DURATION = {
  fast: 0.6,
  medium: 1.0,
  slow: 1.2,
  xslow: 1.8,
} as const

export const TRANSITION_SLIDE_IN = {
  duration: DURATION.slow,
  ease: EASE.standard,
} as const
