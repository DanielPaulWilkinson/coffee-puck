import { defineStore } from "pinia"
import type { Brew } from "./coffeeStore";

export type BrewStore = {
  brew: Brew,
  coffee: string,
  coffeeType: string,
}

export const useBrewStore = defineStore('brewStore', {
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
      },
      coffee: "",
      coffeeType: ""
    };
  },
});
