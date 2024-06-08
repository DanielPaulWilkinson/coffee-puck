import { defineStore } from "pinia"
import type { coffee } from "../data/types"

export const useCoffeePagination = defineStore('coffeePagination', () => {
    return { 
      data: [] as coffee[],
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
  