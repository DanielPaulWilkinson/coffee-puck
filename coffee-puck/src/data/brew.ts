import axios from "axios";
import type { brew, pagination } from "./types";

export type brewPaginationResponse = {
    data: brew[];
    pagination: pagination;
};

export const getBrews = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    search?: string,
): Promise<brewPaginationResponse> =>
    (
        await axios.get(
            `http://localhost:3000/brew/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}` +
                `${search ? `&search=${search}` : ""}`,
        )
    ).data;
export const createBrew = async (brew: brew): Promise<boolean> =>
    (await axios.post(`http://localhost:3000/brew/create`, brew)).data;
export const updateBrew = async (c: brew): Promise<boolean> =>
    (await axios.post(`http://localhost:3000/brew/update/${c.id}`, c)).data;
export const getBrew = async (id: number): Promise<brew> =>
    (await axios.get(`http://localhost:3000/brew/get/${id}`)).data[0];
