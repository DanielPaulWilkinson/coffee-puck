import { defineStore } from "pinia"
import type { Coffee } from "./brewPagination"

export const useCoffeePagination = defineStore('coffeePagination', () => {
    return { 
      data: [] as Coffee[],
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
  