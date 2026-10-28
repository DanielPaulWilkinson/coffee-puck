import type { JournalData } from './types'

export const STORAGE_KEY = 'brew-journal:v1'

export const empty = (): JournalData => ({ version: 1, beans: [], brews: [] })

export function isJournal(x: unknown): x is JournalData {
  const d = x as JournalData
  return !!d && d.version === 1 && Array.isArray(d.beans) && Array.isArray(d.brews)
    && d.beans.every((b) => typeof b.id === 'string' && typeof b.name === 'string')
    && d.brews.every((b) => typeof b.id === 'string' && typeof b.beanId === 'string' && typeof b.dose === 'number')
}

export function load(store: Storage = localStorage): JournalData {
  try {
    const raw = store.getItem(STORAGE_KEY)
    if (!raw) return empty()
    const parsed = JSON.parse(raw)
    return isJournal(parsed) ? parsed : empty()
  } catch {
    return empty()
  }
}

export function save(data: JournalData, store: Storage = localStorage): void {
  store.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function exportJson(data: JournalData): string {
  return JSON.stringify(data, null, 2)
}

/** Parses a backup file. Throws a friendly error rather than corrupting data. */
export function importJson(text: string): JournalData {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('That file is not valid JSON.')
  }
  if (!isJournal(parsed)) throw new Error('That file is not a Brew Journal backup.')
  return parsed
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)
