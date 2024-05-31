import { defineStore } from 'pinia'


export type Content = {
  varieties: string[],
  region: string,
  country: string, 
  process: string,
  producers: string,
  altitude: string,
  roastLevel: string,
}

export type Purchase = {
  cost: string,
  size: string,
  image: string,
}

export type Social = {
  url: string,
  name: string,
  icon: string,
}

export type Roaster = {
  name: string,
  logo: string,
  url: string,
  blogUrl: string,
  notes: string,
  socials: Social[],
}

export type Coffee = {
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

export type Brew = {
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
  rating: number,
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
