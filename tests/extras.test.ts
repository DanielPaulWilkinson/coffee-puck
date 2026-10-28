import { describe, it, expect, beforeEach } from 'vitest'
import { bestBrew } from '../src/lib/brew'
import { mergeJournal, empty } from '../src/lib/storage'
import { demoData } from '../src/lib/demo'
import { state, replaceAll, addBean, addBrew, updateBrew, deleteBrew, updateBean, deleteBean } from '../src/lib/store'

describe('bestBrew', () => {
  it('picks highest score, newest on tie', () => {
    const b = bestBrew([{ score: 4, createdAt: '2026-01-01' }, { score: 5, createdAt: '2026-01-02' }, { score: 5, createdAt: '2026-01-03' }])
    expect(b?.createdAt).toBe('2026-01-03')
  })
  it('empty -> undefined', () => expect(bestBrew([])).toBeUndefined())
})
describe('mergeJournal', () => {
  it('unions by id, incoming wins', () => {
    const d = demoData()
    const incoming = { version: 1 as const, beans: [{ ...d.beans[0], name: 'Renamed' }], brews: [{ ...d.brews[0], id: 'new1' }] }
    const m = mergeJournal(d, incoming)
    expect(m.beans).toHaveLength(d.beans.length)
    expect(m.beans.find((b) => b.id === d.beans[0].id)?.name).toBe('Renamed')
    expect(m.brews).toHaveLength(d.brews.length + 1)
  })
  it('merging into empty equals incoming', () => { const d = demoData(); expect(mergeJournal(empty(), d)).toEqual(d) })
})
describe('store edits', () => {
  beforeEach(() => replaceAll(empty()))
  it('updates and deletes a brew', () => {
    const bean = addBean({ name: 'X', roaster: 'Y', roastDate: '2026-10-01' })
    const br = addBrew({ beanId: bean.id, method: 'v60', dose: 15, yield: 250, time: 180, grind: '20', score: 3, notes: [] })
    updateBrew(br.id, { score: 5, grind: '19' })
    expect(state.brews[0]).toMatchObject({ score: 5, grind: '19' })
    deleteBrew(br.id); expect(state.brews).toHaveLength(0)
  })
  it('updates a bean; deleting removes its brews only', () => {
    const a = addBean({ name: 'A', roaster: '', roastDate: '2026-10-01' }), b = addBean({ name: 'B', roaster: '', roastDate: '2026-10-01' })
    addBrew({ beanId: a.id, method: 'v60', dose: 15, yield: 250, time: 180, grind: '', score: 3, notes: [] })
    addBrew({ beanId: b.id, method: 'v60', dose: 15, yield: 250, time: 180, grind: '', score: 3, notes: [] })
    updateBean(a.id, { name: 'A2' }); expect(state.beans[0].name).toBe('A2')
    deleteBean(a.id)
    expect(state.beans.map((x) => x.name)).toEqual(['B']); expect(state.brews).toHaveLength(1)
  })
})
