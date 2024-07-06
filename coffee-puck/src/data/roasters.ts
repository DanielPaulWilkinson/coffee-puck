import axios from "axios";
import type { pagination, roaster } from "./types";

export type roastersPaginationResponse = {
    data: roaster[];
    pagination: pagination;
};

export const getRoasters = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    search?: string,
): Promise<roastersPaginationResponse> =>
    (
        await axios.get(
            `http://localhost:3000/roaster/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}` +
                `${search ? `&search=${search}` : ""}`,
        )
    ).data;

export const createRoaster = async (roaster: roaster): Promise<boolean> =>
    (await axios.post(`http://localhost:3000/roaster/create`, roaster)).data;

export const updateRoaster = async (roaster: roaster): Promise<boolean> =>
    (
        await axios.post(
            `http://localhost:3000/roaster/update/${roaster.id}`,
            roaster,
        )
    ).data;

export const getRoaster = async (id: number) =>
    (await axios.get(`http://localhost:3000/roaster/get/${id}`)).data[0];
