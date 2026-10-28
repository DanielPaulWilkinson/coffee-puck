import { describe, it, expect } from 'vitest'
import { ratio, formatRatio, speed, dialInHint, daysSince, restLabel, formatTime } from '../src/lib/brew'

const base = { method: 'espresso' as const, dose: 18, yield: 36, time: 28, score: 3, notes: [] as any[] }

describe('ratio', () => {
  it('computes yield/dose to 1dp', () => { expect(ratio(18, 36)).toBe(2); expect(ratio(15, 250)).toBe(16.7) })
  it('guards zero/negative', () => { expect(ratio(0, 36)).toBeNull(); expect(formatRatio(0, 1)).toBe('–'); expect(formatRatio(18, 40)).toBe('1:2.2') })
})
describe('speed', () => {
  it('classifies espresso', () => { expect(speed('espresso', 20)).toBe('fast'); expect(speed('espresso', 28)).toBe('on-target'); expect(speed('espresso', 40)).toBe('slow') })
  it('uses method targets', () => { expect(speed('v60', 28)).toBe('fast'); expect(speed('frenchpress', 260)).toBe('on-target') })
})
describe('dialInHint', () => {
  it('sour and fast -> grind finer', () => expect(dialInHint({ ...base, time: 20, notes: ['sour'] }).headline).toBe('Sour and fast? Grind finer.'))
  it('bitter and slow -> grind coarser', () => expect(dialInHint({ ...base, time: 38, notes: ['bitter'] }).headline).toBe('Bitter and slow? Grind coarser.'))
  it('filter wording is gentler', () => expect(dialInHint({ ...base, method: 'v60', time: 100, notes: ['sour'] }).headline).toBe('Sour and fast? Grind a little finer.'))
  it('sour+bitter -> puck prep', () => expect(dialInHint({ ...base, notes: ['sour', 'bitter'] }).headline).toMatch(/puck prep/))
  it('high score -> keep', () => { const h = dialInHint({ ...base, score: 5, notes: ['sweet'] }); expect(h.tone).toBe('good') })
  it('no notes, fast -> finer', () => expect(dialInHint({ ...base, time: 18 }).headline).toBe('Running fast. Grind finer.'))
  it('no notes, slow -> coarser', () => expect(dialInHint({ ...base, time: 40 }).headline).toBe('Running slow. Grind coarser.'))
  it('on target but low score', () => expect(dialInHint({ ...base, score: 1 }).headline).toMatch(/fresher bean/))
  it('on target, middling', () => expect(dialInHint(base).tone).toBe('adjust'))
})
describe('dates & format', () => {
  it('daysSince', () => expect(daysSince('2026-10-18', new Date('2026-10-28T09:00:00'))).toBe(10))
  it('restLabel', () => { expect(restLabel(2)).toBe('Resting'); expect(restLabel(10)).toBe('Peak'); expect(restLabel(45)).toBe('Past best') })
  it('formatTime', () => { expect(formatTime(28)).toBe('28s'); expect(formatTime(185)).toBe('3:05') })
})
