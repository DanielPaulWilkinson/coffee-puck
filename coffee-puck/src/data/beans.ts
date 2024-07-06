import axios from "axios";
import type { bean, pagination } from "./types";

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
): Promise<BeanPaginationResponse> =>
    (
        await axios.get(
            `http://localhost:3000/bean/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}` +
                `${search ? `&search=${search}` : ""}`,
        )
    ).data;
export const createBean = async (bean: bean): Promise<boolean> =>
    (await axios.post(`http://localhost:3000/bean/create`, bean)).data;
export const updateBean = async (bean: bean) =>
    (await axios.post(`http://localhost:3000/bean/update/${bean.id}`, bean))
        .data;
