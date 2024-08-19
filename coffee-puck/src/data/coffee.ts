import axios from "axios";
import type { coffee, pagination } from "./types";

export type coffeePaginationResponse = {
    data: coffee[];
    pagination: pagination;
};

const url = 'http://localhost:3000';

export const getCoffees = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    search?: string,
): Promise<coffeePaginationResponse> => (await axios.get(
        `${url}/coffee/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}` +
            `${search ? `&search=${search}` : ""}`)).data;
export const getCoffee = async (id: number): Promise<coffee> => (await axios.get(`${url}/coffee/get/${id}`)).data;
export const createCoffee = async (coffee: coffee): Promise<coffee> => (await axios.post(`${url}/coffee/create`, coffee)).data;
export const updateCoffee = async (coffee: coffee): Promise<coffee> => (await axios.post(`${url}/coffee/update/${coffee.id}`, coffee)).data;
