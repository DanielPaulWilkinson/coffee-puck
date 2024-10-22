import axios from "axios";
import { pagination } from "./types";


export type scrapedCoffee = {
    id: number,
    name: string,
    url: string,
    image: string,
    price: string,
    notes: string,
    altitude: string,
    roaster: number,
    first_scrape_date: string,
    last_scrape_date: string | null,
    origin: string,
}

export type coffeeTypePaginationResponse = {
    data: scrapedCoffee[];
    notes: string[];
    pagination: pagination;
};


export const getScrapeResults = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    notes?: string[],
): Promise<coffeeTypePaginationResponse> =>
    (
        await axios.post(
            `http://localhost:3000/scrape/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            {
                notes,
            },
        )
    ).data;
