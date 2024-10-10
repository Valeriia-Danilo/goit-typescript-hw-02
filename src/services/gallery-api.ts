import axios from "axios";
import { Image } from "../types";

export const fetchImages = async <T extends Image>(search: string, page: number): Promise<{ images: T[], totalPages: number }> => {
  const perPage = 12;

  const response = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
      query: search,
      page,
      per_page: perPage,
      client_id: "CgVvToLJty4l8zKxb9X42w0_QBN9osQ_-a-Jz8s0aj4",
    }
  });

  const totalImages = parseInt(response.headers['x-total'], 10);
  const totalPages = Math.ceil(totalImages / perPage);

  return {
    images: response.data.results as T[],
    totalPages: totalPages,
  };
};