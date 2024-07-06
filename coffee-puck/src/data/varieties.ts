import axios from "axios";
import type { pagination, variety } from "./types";

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
): Promise<varietyPaginationResponse> =>
    (
        await axios.get(
            `http://localhost:3000/varieties/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}` +
                `${search ? `&search=${search}` : ""}`,
        )
    ).data;

export const createVariety = async (variety: variety): Promise<boolean> =>
    (await axios.post(`http://localhost:3000/varieties/create`, variety)).data;

export const updateVariety = async (variety: variety) =>
    (
        await axios.post(
            `http://localhost:3000/varieties/update/${variety.id}`,
            variety,
        )
    ).data;
