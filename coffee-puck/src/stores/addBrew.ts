import { defineStore } from "pinia";
import type { brew } from "../data/types";

export type BrewStore = {
  brew: brew,
  coffee: string,
  coffeeType: string,
}

export const useBrewStore = defineStore('addBrewStore', {
  state: (): BrewStore => {
    return {
      brew: {
        id: null,
        preGrindAroma: "",
        postGrindAroma: "",
        acidity: "",
        sweetness: "",
        body: "",
        finish: "",
        flavour: "",
        coffeeId: null,
        coffeeTypeId: null,
        rating: 0,
      },
      coffee: "",
      coffeeType: ""
    };
  },
});
