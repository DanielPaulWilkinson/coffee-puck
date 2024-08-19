import { defineStore } from "pinia";
import { roaster } from "@/data/types";

export const useRoasterPagination = defineStore('roasterPagination', () => {
    return { 
      data: [] as roaster[],
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
  