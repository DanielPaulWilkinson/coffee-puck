import axios from "axios";
import type { coffeeType, pagination } from "./types";

export type CoffeeTypePaginationResponse = {
    data: coffeeType[];
    pagination: pagination;
};

export const getTypePage = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    search: string,
): Promise<CoffeeTypePaginationResponse> =>
    (
        await axios.get(
            `http://localhost:3000/types/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}`,
        )
    ).data;

export const getCoffeeType = async (id: number): Promise<coffeeType> =>
    (await axios.get(`http://localhost:3000/types/get/${id}`)).data;
