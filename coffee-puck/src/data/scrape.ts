import axios from "axios";
import { pagination, roaster } from "./types";


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

export type scrapeLog = {
    id: number,
    date_of_scrape: string,
    total_new: number,
    total_removed: number,
    time_elapsed: string,
    total_scraped: number,
    error: null | string
}

export type coffeeTypePaginationResponse = {
    data: scrapedCoffee[];
    notes: string[];
    roasters: roaster[];
    pagination: pagination;
};

export type scrapeLogPaginationResponse = {
    data: scrapeLog[],
    pagination: pagination;
};

export const getScrapeResults = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
    notes?: string[],
    roasters?: string[],
): Promise<coffeeTypePaginationResponse> =>
    (
        await axios.post(
            `http://localhost:3000/scrape/get?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
            {
                notes,
                roasters
            },
        )
    ).data;


export const getScrapeLog = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
): Promise<scrapeLogPaginationResponse> =>
    (
        await axios.get(
            `http://localhost:3000/scrape/get/logs?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        )
    ).data;
