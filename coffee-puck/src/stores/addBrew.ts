import { defineStore } from "pinia";
import type { Brew } from "./brewPagination";

export type BrewStore = {
  brew: Brew,
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
