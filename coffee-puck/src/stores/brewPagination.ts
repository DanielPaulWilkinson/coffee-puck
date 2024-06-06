import type { brew } from '@/data/Types'
import { defineStore } from 'pinia'

export const useBrewPagination = defineStore('brewPagination', () => {
  return { 
    data: [] as brew[],
    pagination: {
      current_page: 1,
      next_page: 2,
      offset: 0,
      prev_page: 0,
      total_pages: 0,
      total_records: 0,
    },
  }
})
