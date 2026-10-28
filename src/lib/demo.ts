import type { JournalData, Brew, Note, Method } from './types'

/** Realistic sample data, loaded only via ?demo=1 (for screenshots / trying it out). */
export function demoData(now = new Date()): JournalData {
  const day = (n: number) => new Date(now.getTime() - n * 86400000)
  const iso = (n: number) => day(n).toISOString().slice(0, 10)
  const beans = [
    { id: 'b1', name: 'Kiamabara AA', roaster: 'Dark Arts Coffee', roastDate: iso(12), finished: false, createdAt: day(10).toISOString() },
    { id: 'b2', name: 'Finca El Puente', roaster: 'Origin Coffee', roastDate: iso(6), finished: false, createdAt: day(4).toISOString() },
    { id: 'b3', name: 'Yirgacheffe Konga', roaster: 'Square Mile', roastDate: iso(41), finished: true, createdAt: day(38).toISOString() },
  ]
  let i = 0
  const b = (beanId: string, d: number, method: Method, dose: number, y: number, time: number, grind: string, score: number, notes: Note[], temp = 93): Brew =>
    ({ id: 'r' + i++, beanId, method, dose, yield: y, time, grind, temp, score, notes, createdAt: new Date(day(d).setHours(7, 40 + i, 0, 0)).toISOString() })
  const brews = [
    b('b3', 36, 'v60', 15, 250, 165, '22', 3, ['balanced']),
    b('b3', 33, 'v60', 15, 250, 185, '20', 4, ['sweet']),
    b('b1', 10, 'espresso', 18, 40, 19, '2.4', 2, ['sour']),
    b('b1', 9, 'espresso', 18, 38, 23, '2.2', 3, ['sour', 'balanced']),
    b('b1', 7, 'espresso', 18, 36, 27, '2.0', 4, ['balanced', 'sweet']),
    b('b1', 5, 'espresso', 18, 36, 35, '1.8', 2, ['bitter']),
    b('b1', 3, 'espresso', 18, 37, 29, '1.9', 5, ['sweet']),
    b('b2', 2, 'v60', 15, 250, 140, '24', 3, ['sour']),
    b('b1', 1, 'espresso', 18, 36, 28, '1.9', 4, ['balanced', 'sweet']),
    b('b2', 0, 'v60', 15, 250, 178, '22', 4, ['sweet']),
  ]
  return { version: 1, beans, brews }
}
