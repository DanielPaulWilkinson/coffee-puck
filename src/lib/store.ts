import { reactive, watch } from 'vue'
import type { Bean, Brew, JournalData } from './types'
import { load, save, uid } from './storage'

export const state = reactive<JournalData>(load())
watch(state, (v) => save(v), { deep: true })

export const beanById = (id: string) => state.beans.find((b) => b.id === id)
export const sortedBrews = () => [...state.brews].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
export const brewsFor = (beanId: string) => sortedBrews().filter((b) => b.beanId === beanId)
export const lastBrew = (beanId?: string) => (beanId ? brewsFor(beanId)[0] : sortedBrews()[0])

export function addBean(b: Omit<Bean, 'id' | 'createdAt' | 'finished'>): Bean {
  const bean: Bean = { ...b, id: uid(), finished: false, createdAt: new Date().toISOString() }
  state.beans.push(bean)
  return bean
}

export function addBrew(b: Omit<Brew, 'id' | 'createdAt'>): Brew {
  const brew: Brew = { ...b, id: uid(), createdAt: new Date().toISOString() }
  state.brews.push(brew)
  return brew
}

export function replaceAll(d: JournalData) {
  state.beans.splice(0, state.beans.length, ...d.beans)
  state.brews.splice(0, state.brews.length, ...d.brews)
}

export function updateBrew(id: string, patch: Partial<Omit<Brew, 'id' | 'createdAt'>>) {
  const b = state.brews.find((x) => x.id === id)
  if (b) Object.assign(b, patch)
}
export function deleteBrew(id: string) {
  const i = state.brews.findIndex((x) => x.id === id)
  if (i >= 0) state.brews.splice(i, 1)
}
export function updateBean(id: string, patch: Partial<Omit<Bean, 'id' | 'createdAt'>>) {
  const b = state.beans.find((x) => x.id === id)
  if (b) Object.assign(b, patch)
}
/** Deletes a bean and all of its brews. */
export function deleteBean(id: string) {
  replaceAll({ version: 1, beans: state.beans.filter((b) => b.id !== id), brews: state.brews.filter((b) => b.beanId !== id) })
}
