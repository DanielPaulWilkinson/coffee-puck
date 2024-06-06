import axios from "axios";
import type { bean, pagination } from "./Types";

export type BeanPaginationResponse = {
    data: bean[];
    pagination: pagination;
};

export const getBeans = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    search?: string,
): Promise<BeanPaginationResponse> => {
    const response = await axios.get(
        `http://localhost:3000/bean/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}` +
            `${search ? `&search=${search}` : ""}`,
    );

    if (response.status === 200) {
        return response.data;
    }
    return {} as BeanPaginationResponse;
};

export const createBean = async (bean: bean): Promise<boolean> => {
    try {
        const response = await axios.post(
            `http://localhost:3000/bean/create`,
            bean,
        );
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};

export const updateBean = async (bean: bean) => {
    return (await axios.post(`http://localhost:3000/bean/update/${bean.id}`, bean))
        .data;
};
