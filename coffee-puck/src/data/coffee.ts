import type { Coffee } from "@/stores/brewPagination";
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
  
export const getCoffees = async (page: number, limit: number, sortBy: string, sortOrder: string, search?: string): Promise<CoffeePaginationResponse> => {
  console.log(limit);
    const response = await axios.get(`http://localhost:3000/coffee/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}` + `${search ? `&search=${search}` : ''}`);
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

  export const createCoffee = async (coffee: Coffee): Promise<Coffee> => {
     const response = await axios.post(`http://localhost:3000/coffee/create`, coffee);
     if(response.status === 200){
          return response.data;
     }

     return {} as Coffee;
  }

  export const updateCoffee = async (c: Coffee) => {
      return (await axios.post(`http://localhost:3000/coffee/update/${c.id}`, c)).data;
 }
     