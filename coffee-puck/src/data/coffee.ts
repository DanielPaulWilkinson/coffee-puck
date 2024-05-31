import axios from "axios";
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
     isSelected: boolean,
   }
  type Pagination = {
     current_page: number,
     next_page: number,
     offset: number,
     prev_page: number,
     total_pages: number,
     total_records: number,
  }
  
  export type CoffeePaginationResponse = {
     data: Coffee[],
     pagination: Pagination,
  }
  
export const getCoffeePage = async (page: number, limit: number, sortBy: string, sortOrder: string, search: string): Promise<CoffeePaginationResponse> => {
    const response = await axios.get(`http://localhost:3000/coffee/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}`);
    if(response.status === 200){
         return response.data;
    }
    return {} as CoffeePaginationResponse;
 }

 export const getCoffee = async (Id: number): Promise<Coffee> => {
     const response = await axios.get(`http://localhost:3000/coffee/get/${Id}`);
     if(response.status === 200){
          return response.data;
     }

     return {} as Coffee;
  }

  export const createCoffee = async (Id: number): Promise<Coffee> => {
     const response = await axios.get(`http://localhost:3000/coffee/get/${Id}`);
     if(response.status === 200){
          return response.data;
     }

     return {} as Coffee;
  }
     
     