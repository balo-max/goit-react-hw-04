import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export async function getImages(inputValue, currentPage) {
    const response = await axios.get('/search/photos/', {
        params: {
            client_id: 'GPZjR_cOq9-wVfojS730O-4uvnaYPxykjBB6zNS7i8U',
            query: inputValue,
            page: currentPage,
            per_page: 15,
        }
    });

    return response.data;
}
