import axios from "axios";
import { z } from "zod";

interface Pagination {
     current_page: number,
     next_page: number,
     offset: number,
     prev_page: number,
     total_pages: number,
     total_records: number,
  }

export interface CoffeeTypePaginationResponse {
     data: CoffeeType[],
     pagination: Pagination,
  }

const coffeeTypesResponse = z.object({
     id: z.number(),
     name: z.string(),
     icon: z.string().nullable(),
     description: z.string().nullable(),
     ratio: z.string().nullable(),
     isSelected: z.boolean().default(false),
})

export type CoffeeType = z.infer<typeof coffeeTypesResponse>

export const getTypePage = async (page: number, limit: number, sortBy: string, sortOrder: string, search: string): Promise<CoffeeTypePaginationResponse> => {
     const response = await axios.get(`http://localhost:3000/types/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}`);
     if(response.status === 200){
          return response.data;
     }
     return {} as CoffeeTypePaginationResponse;
  }
 
 