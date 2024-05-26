export interface Brew {
    preGrindAroma: string,
    postGrindAroma: string,
    acidity: string,
    sweetness: string,
    body: string,
    finish: string,
    flavour: string,
    coffeeId: number,
    coffeeTypeId: number,
}

export interface Bean {
    id: number,
    varietyId: number,
    process: string,
    producers: string,
    altitude: string,
    roast: string,
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
    isDecaf: boolean,
    rating: number,  
    roasterId: number,
    recipe: string[]
    cost: string,
    size: string,
    image: string,
    createdOn: string,
    updatedOn?: string,
    beans: Bean[],
  }
