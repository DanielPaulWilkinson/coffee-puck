import axios from "axios"

export type brew = {
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
   rating: number | null,
}

type pagination = {
   current_page: number,
   next_page: number,
   offset: number,
   prev_page: number,
   total_pages: number,
   total_records: number,
}

export type BrewPaginationResponse = {
   data: brew[],
   pagination: pagination,
}


export const getbrews = async (page: number, limit: number, sortBy: string, sortOrder: string): Promise<BrewPaginationResponse> => {
   const response = await axios.get(`http://localhost:3000/brew/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
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
