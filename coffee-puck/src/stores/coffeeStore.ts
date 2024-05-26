import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export interface Content {
  varieties: string[],
  region: string,
  country: string, 
  process: string,
  producers: string,
  altitude: string,
  roastLevel: string,
}

export interface Purchase {
  cost: string,
  size: string,
  image: string,
}

export interface Social {
  url: string,
  name: string,
  icon: string,
}

export interface Roaster {
  name: string,
  logo: string,
  url: string,
  blogUrl: string,
  notes: string,
  socials: Social[],
}

export interface Coffee {
  id: number,
  name: string,
  createdOn: string,
  updatedOn: string,
  isDecaf: boolean,
  rating: number,  
  recipe: string[]
  coffeeType: string | "Black" |
  "White Coffee" |
  "Latte" |
  "Cappuccino" |
  "Americano"|
  "Espresso"|
  "Doppio"|
  "Red Eye"|
  "Galao"|
  "Macchiato"|
  "Mocha"|
  "Ristretto"|
  "Flat White"|
  "Affogato"|
  "Irish"|
  "Other",
  roasterInformation: Roaster,
  purchaseInformation: Purchase;
  contentInformation: Content[],
  isSelected?: boolean;
}

export interface Brew {
  id: number | null,
  preGrindAroma: string,
  postGrindAroma: string,
  acidity: string,
  sweetness: string,
  body: string,
  finish: string,
  flavour: string,
  coffeeId: number | null,
  coffeeTypeId: number | null,
}

export const useCoffeeStore = defineStore('coffeeStore', () => {
  return { 
    data: [] as Brew[],
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
