import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1';

const booksApi = axios.create({
    baseURL: BASE_URL,
})

export const reqBookCategory = (category, startIndex, maxRes) => {
    return booksApi.get(`/volumes?q="subject:"${category}"&key=&printType=books&startIndex=${startIndex}&maxResults=${maxRes}`, {category, startIndex, maxRes});
}


