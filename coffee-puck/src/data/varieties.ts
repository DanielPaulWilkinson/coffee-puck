import axios from "axios";
import type { bean, pagination, variety } from "./types";

export type varietyPaginationResponse = {
    data: variety[];
    pagination: pagination;
};

export const getVarieties = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    search?: string,
): Promise<varietyPaginationResponse> => {
    const response = await axios.get(
        `http://localhost:3000/varieties/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}` +
            `${search ? `&search=${search}` : ""}`,
    );

    if (response.status === 200) {
        return response.data;
    }
    return {} as varietyPaginationResponse;
};

export const createVariety = async (variety: variety): Promise<boolean> => {
    try {
        const response = await axios.post(
            `http://localhost:3000/varieties/create`,
            variety,
        );
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};

export const updateVariety = async (variety: variety) => {
    return (await axios.post(`http://localhost:3000/varieties/update/${variety.id}`, variety))
        .data;
};
