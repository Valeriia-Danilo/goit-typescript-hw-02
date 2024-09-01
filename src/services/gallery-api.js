import axios from "axios";


export const fetchImages = async (search, page) => {


    let perPage = 12;

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
        images: response.data.results,
        totalPages: totalPages,

    };
}