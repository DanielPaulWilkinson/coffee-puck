import { defineStore } from "pinia";
import type { coffee, variety, bean } from "@/data/types";

export type CoffeeStore = {
  coffee: coffee,
  varieties: variety[],
  beans: bean[],
}

export const useCoffeeStore = defineStore('addCoffeeStore', {
    state: (): CoffeeStore => {
      return {
        coffee: {
            id: 0,
            name: "",
            isDecaf: null,
            rating: 0,
            size: "",
            image: "",
            cost: "",
            recipe: "",
            roasterId: 0,
            beans: [],
        },
        varieties: [],
        beans: [],
      };
    },
  });
  