import { defineStore } from "pinia";
import { scrapeLog } from "@/data/scrape";
import { pagination } from "@/data/types";

export type ScrapeLogStore = {
  data: scrapeLog[],
  pagination: pagination
}

export const useScrapeLogStore = defineStore('scrapeLogStore', {
    state: (): ScrapeLogStore => {
      return {
        data: [] as scrapeLog[],
        pagination: {
            current_page: 1,
            next_page: 2,
            offset: 0,
            prev_page: 0,
            total_pages: 0,
            total_records: 0,
        },
      };
    },
  });