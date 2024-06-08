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
): Promise<roastersPaginationResponse> => {
    const response = await axios.get(
        `http://localhost:3000/roaster/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}` +
            `${search ? `&search=${search}` : ""}`,
    );

    if (response.status === 200) {
        return response.data;
    }
    return {} as roastersPaginationResponse;
};

export const createRoaster= async (roaster: roaster): Promise<boolean> => {
    try {
        const response = await axios.post(
            `http://localhost:3000/roaster/create`,
            roaster,
        );
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};

export const updateRoaster = async (roaster: roaster) => {
    return (await axios.post(`http://localhost:3000/roaster/update/${roaster.id}`, roaster))
        .data;
};
