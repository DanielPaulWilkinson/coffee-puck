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
