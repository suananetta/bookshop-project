import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { reqBookCategory, reqBookByAuthor, reqBookByTitle } from '../_axios/requests';

const initialState = {
    loading: false,
    chosenBooks: [],
    booksList: [],
    searchResult: [],
    initialCategory: 'Architecture',
    startIndex: 0,
    maxResult: 6
}

export const getBooks = createAsyncThunk(
    'category/categoryRequest',
    async (state) => {
        const response = await reqBookCategory(state.currentCategory, state.startIndex, state.maxResult);
        return response.data.items;
    }
)

export const getBookVolume = createAsyncThunk(
    'bookVolume/bookVolumeRequest',
    async (state) => {
        const responseByAuthor = await reqBookByAuthor(state);
        const responseByTitle = await reqBookByTitle(state);
        return [...responseByAuthor.data.items, ...responseByTitle.data.items];
    }
)

export const manageBooksSlice = createSlice({
    name: 'manageBooks',
    initialState,
    reducers: {
        selectBook(state, action) {
            state.chosenBooks = [...state.chosenBooks, action.payload];
            localStorage.setItem('chosenBooks', JSON.stringify(state.chosenBooks));
        },
        removeBook(state, action) {
            state.chosenBooks = [...state.chosenBooks.filter(book => book.id !== action.payload.id)];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {state.loading = true;})
            .addCase(getBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.booksList = action.payload;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(getBookVolume.pending, (state) => {state.loading = true;})
            .addCase(getBookVolume.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResult = action.payload;
            })
            .addCase(getBookVolume.rejected, (state, action) => {
                state.loading = false;
            })
    }
})

export const { selectBook, removeBook } = manageBooksSlice.actions;
export default manageBooksSlice.reducer;