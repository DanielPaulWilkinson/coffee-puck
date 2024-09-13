import { defineStore } from "pinia";
import type { coffee, variety, bean, roaster } from "@/data/types";



export type RoasterStore = {
  roaster: roaster,
}

export const useRoasterStore = defineStore('addRoasterStore', {
    state: (): RoasterStore => {
      return {
        roaster: {
            name: "",
            logo: "",
            url:"",
            blogURL: "",
            notes: "",
            socials: [],
            id: undefined,
        }
      };
    },
  });
  