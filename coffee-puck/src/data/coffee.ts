import axios from "axios";
import type { coffee, pagination } from "./Types";

export type CoffeePaginationResponse = {
    data: coffee[];
    pagination: pagination;
};

export const getCoffees = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    search?: string,
): Promise<CoffeePaginationResponse> => {
    const response = await axios.get(
        `http://localhost:3000/coffee/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}` +
            `${search ? `&search=${search}` : ""}`,
    );
    if (response.status === 200) {
        return response.data;
    }
    return {} as CoffeePaginationResponse;
};

export const getCoffee = async (Id: number): Promise<coffee> => {
    const response = await axios.get(`http://localhost:3000/coffee/get/${Id}`);
    if (response.status === 200) {
        return response.data;
    }

    return {} as coffee;
};

export const createCoffee = async (coffee: coffee): Promise<coffee> => {
    const response = await axios.post(
        `http://localhost:3000/coffee/create`,
        coffee,
    );
    if (response.status === 200) {
        return response.data;
    }

    return {} as coffee;
};

export const updateCoffee = async (c: coffee) => {
    return (await axios.post(`http://localhost:3000/coffee/update/${c.id}`, c))
        .data;
};
