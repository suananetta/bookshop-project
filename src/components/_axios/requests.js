import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1';

const booksApi = axios.create({
    baseURL: BASE_URL,
})

export const reqBookCategory = (category, startIndex, maxRes) => {
    return booksApi.get(`/volumes?q="subject:"${category}"&filter=ebooks&langRestrict=en&key=&printType=all&showPreorders=true&startIndex=${startIndex}&maxResults=${maxRes}`, {category, startIndex, maxRes});
}

export const reqBookByAuthor = (bookInfo) => {
    return booksApi.get(`/volumes?q="${bookInfo}"+inauthor&filter=ebooks&langRestrict=en&key=&printType=all`, {bookInfo});
}

export const reqBookByTitle = (bookInfo) => {
    return booksApi.get(`/volumes?q=${bookInfo}+intitle&filter=ebooks&langRestrict=en&key=&printType=all`, {bookInfo});
}

export const getUSD = () => {
    return axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json').then(res => {return res.data.usd.rub});
}