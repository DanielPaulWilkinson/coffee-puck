import { defineStore } from "pinia";
import type { Coffee } from "./brewPagination";

export type Variety = {
    id: number,
    name: string,
    history: string,
    parentId: number,		
    dwarf: string,		
    altitude: string,			
    lineage: string,
    genetic: string,
    other_names: string,		
}

export type CoffeeStore = {
  coffee: Coffee,
  varieties: Variety[],
}

export const useCoffeeStore = defineStore('addCoffeeStore', {
    state: (): CoffeeStore => {
      return {
        coffee: {
            name: "",
            isDecaf: false,
            rating: 0,
            size: "",
            image: "",
            cost: "",
            recipe: "",
            roasterId: 0,
            beans: [],
        },
        varieties: [],
      };
    },
  });
  