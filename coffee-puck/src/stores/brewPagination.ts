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

export type Bean = {
  id?: number,
  varietyId: number,
  process: string,
  producers: string,
  altitude: string,
  roast: string,
}

export type Coffee = {
  id?: number,
  name: string,
  createdOn: string,
  updatedOn: string,
  isDecaf: boolean,
  rating: number,  
  size: string,
  image: string,
  cost: string,
  recipe: string,
  roasterId: number,
  beans?: Bean[]
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

export const useBrewPagination = defineStore('brewPagination', () => {
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
