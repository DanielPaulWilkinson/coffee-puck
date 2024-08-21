import { defineStore } from "pinia";
import { variety } from "@/data/types";

export const useVarietyStore = defineStore('varietyPagination', () => {
    return { 
      data: [] as variety[],
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
  