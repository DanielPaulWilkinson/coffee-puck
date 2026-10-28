export type Method = 'espresso' | 'v60' | 'aeropress' | 'frenchpress'
export type Note = 'sour' | 'bitter' | 'balanced' | 'sweet'

export interface Bean {
  id: string
  name: string
  roaster: string
  roastDate: string // YYYY-MM-DD
  finished: boolean
  createdAt: string
}

export interface Brew {
  id: string
  beanId: string
  method: Method
  dose: number // g
  yield: number // g (beverage or water for filter)
  time: number // seconds
  grind: string
  temp?: number // °C
  score: number // 1-5
  notes: Note[]
  createdAt: string // ISO
}

export interface JournalData {
  version: 1
  beans: Bean[]
  brews: Brew[]
}
