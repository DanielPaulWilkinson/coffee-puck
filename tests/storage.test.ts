import { describe, it, expect, beforeEach } from 'vitest'
import { load, save, exportJson, importJson, empty, STORAGE_KEY } from '../src/lib/storage'
import { demoData } from '../src/lib/demo'

describe('storage', () => {
  beforeEach(() => localStorage.clear())
  it('returns empty journal when nothing saved', () => expect(load()).toEqual(empty()))
  it('round-trips save/load', () => { const d = demoData(); save(d); expect(load()).toEqual(d) })
  it('survives corrupt data', () => { localStorage.setItem(STORAGE_KEY, '{oops'); expect(load()).toEqual(empty()) })
  it('ignores wrong shape', () => { localStorage.setItem(STORAGE_KEY, '{"version":2}'); expect(load()).toEqual(empty()) })
  it('export/import round-trip', () => { const d = demoData(); expect(importJson(exportJson(d))).toEqual(d) })
  it('import rejects bad JSON', () => expect(() => importJson('nope')).toThrow(/not valid JSON/))
  it('import rejects non-journal', () => expect(() => importJson('{"a":1}')).toThrow(/not a Brew Journal/))
})
