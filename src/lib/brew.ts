import type { Brew, Method, Note } from './types'

export interface MethodTarget {
  label: string
  ratio: [number, number] // yield:dose range
  time: [number, number] // seconds range
  defaults: { dose: number; yield: number; time: number; temp: number }
}

export const METHODS: Record<Method, MethodTarget> = {
  espresso: { label: 'Espresso', ratio: [1.8, 2.5], time: [25, 32], defaults: { dose: 18, yield: 36, time: 28, temp: 93 } },
  v60: { label: 'V60', ratio: [15, 17], time: [150, 210], defaults: { dose: 15, yield: 250, time: 180, temp: 94 } },
  aeropress: { label: 'AeroPress', ratio: [12, 16], time: [90, 150], defaults: { dose: 15, yield: 220, time: 120, temp: 90 } },
  frenchpress: { label: 'French press', ratio: [14, 17], time: [240, 300], defaults: { dose: 30, yield: 500, time: 240, temp: 95 } },
}

export function ratio(dose: number, yieldG: number): number | null {
  if (!(dose > 0) || !(yieldG > 0)) return null
  return Math.round((yieldG / dose) * 10) / 10
}

export function formatRatio(dose: number, yieldG: number): string {
  const r = ratio(dose, yieldG)
  return r === null ? '–' : `1:${r}`
}

export type Speed = 'fast' | 'slow' | 'on-target'

export function speed(method: Method, time: number): Speed {
  const [lo, hi] = METHODS[method].time
  if (time < lo) return 'fast'
  if (time > hi) return 'slow'
  return 'on-target'
}

export function formatTime(s: number): string {
  if (s < 90) return `${s}s`
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export interface Hint {
  headline: string
  detail: string
  tone: 'good' | 'adjust'
}

/** One plain-English nudge. Taste beats the clock: we read notes first, then time. */
export function dialInHint(b: Pick<Brew, 'method' | 'dose' | 'yield' | 'time' | 'score' | 'notes'>): Hint {
  const sp = speed(b.method, b.time)
  const has = (n: Note) => b.notes.includes(n)
  const sour = has('sour')
  const bitter = has('bitter')
  const finer = b.method === 'espresso' ? 'Grind finer' : 'Grind a little finer'
  const coarser = b.method === 'espresso' ? 'Grind coarser' : 'Grind a little coarser'

  if (sour && bitter)
    return { headline: 'Sour and bitter? Check your puck prep.', detail: 'Mixed flavours usually mean uneven extraction. Break up clumps and tamp level before changing the grind.', tone: 'adjust' }
  if (sour && sp === 'fast') return { headline: `Sour and fast? ${finer}.`, detail: 'The water ran through too quickly to pull out the sweetness.', tone: 'adjust' }
  if (sour) return { headline: 'Sour? Extract a bit more.', detail: b.method === 'espresso' ? 'Grind slightly finer or pull a little more yield.' : 'Grind slightly finer or use hotter water.', tone: 'adjust' }
  if (bitter && sp === 'slow') return { headline: `Bitter and slow? ${coarser}.`, detail: 'It sat too long and picked up harsh flavours.', tone: 'adjust' }
  if (bitter) return { headline: 'Bitter? Extract a bit less.', detail: b.method === 'espresso' ? 'Grind slightly coarser or stop the shot a little earlier.' : 'Grind slightly coarser or drop the water temperature by 2°C.', tone: 'adjust' }
  if (b.score >= 4) return { headline: 'Nailed it. Keep this recipe.', detail: 'Same dose, grind and time next brew.', tone: 'good' }
  if (sp === 'fast') return { headline: `Running fast. ${finer}.`, detail: `Aim for ${formatTime(METHODS[b.method].time[0])}–${formatTime(METHODS[b.method].time[1])}.`, tone: 'adjust' }
  if (sp === 'slow') return { headline: `Running slow. ${coarser}.`, detail: `Aim for ${formatTime(METHODS[b.method].time[0])}–${formatTime(METHODS[b.method].time[1])}.`, tone: 'adjust' }
  if (b.score <= 2) return { headline: 'On time but not tasty? Try a fresher bean.', detail: 'Or change one thing at a time: ratio first, then grind.', tone: 'adjust' }
  return { headline: 'Close. Change one small thing.', detail: 'Nudge the grind one step and taste again.', tone: 'adjust' }
}

export function daysSince(dateISO: string, now = new Date()): number {
  const d = new Date(dateISO + (dateISO.length === 10 ? 'T00:00:00' : ''))
  return Math.max(0, Math.floor((now.getTime() - d.getTime()) / 86400000))
}

export function restLabel(days: number): string {
  if (days < 4) return 'Resting'
  if (days <= 30) return 'Peak'
  return 'Past best'
}

/** Highest score wins; ties go to the most recent brew. */
export function bestBrew<T extends { score: number; createdAt: string }>(brews: T[]): T | undefined {
  return [...brews].sort((a, b) => b.score - a.score || b.createdAt.localeCompare(a.createdAt))[0]
}
