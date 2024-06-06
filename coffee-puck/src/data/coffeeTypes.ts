import axios from "axios";
import { z } from "zod";
import type { coffeeType, pagination } from "./Types";

export type CoffeeTypePaginationResponse ={
     data: coffeeType[],
     pagination: pagination,
  }

export const getTypePage = async (page: number, limit: number, sortBy: string, sortOrder: string, search: string): Promise<CoffeeTypePaginationResponse> => {
     const response = await axios.get(`http://localhost:3000/types/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}`);
     if(response.status === 200){
          return response.data;
     }
     return {} as CoffeeTypePaginationResponse;
  }
 
 