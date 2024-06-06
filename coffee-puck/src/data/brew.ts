import axios from "axios"
import type { brew, pagination } from "./Types"

export type BrewPaginationResponse = {
   data: brew[],
   pagination: pagination,
}

export const getBrews = async (page: number, limit: number, sortBy: string, sortOrder: string, search?: string): Promise<BrewPaginationResponse> => {
   const response = await axios.get(`http://localhost:3000/brew/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}` + `${search ? `&search=${search}` : ''}`);

   if (response.status === 200) {
      return response.data;
   }
   return {} as BrewPaginationResponse;
}


export const createBrew = async (brew: brew): Promise<boolean> => {
   try {
      const response = await axios.post(`http://localhost:3000/brew/create`, brew);
      if (response.status === 200) {
         return true;
      }
      return false;
   } catch (err) {
      return false;
   }
}


export const updateBrew = async (c: brew) => {
   return (await axios.post(`http://localhost:3000/brew/update/${c.id}`, c)).data;
}
