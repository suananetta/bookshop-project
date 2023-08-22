import { createAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { reqBookCategory } from '../_axios/requests';

const initialState = {
    loading: false,
    chosenBooks: [],
    booksList: [],
    initialCategory: 'Architecture',
    startIndex: 0,
    maxResult: 6
}

export const getBooks = createAsyncThunk(
    'category/categoryRequest',
    async (state) => {
        const response = await reqBookCategory(state.currentCategory, state.startIndex, state.maxResult);
        // console.log(response.data.items);
        return response.data.items;
    }
)

export const manageSlice = createSlice({
    name: 'manageBooks',
    initialState,
    reducers: {
        // selectCategory(state, action) {
        //     state.chosenCategory = action.payload;
        // },
        selectBook(state, action) {
            state.chosenBooks = [...action.payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {state.loading = true;})
            .addCase(getBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.booksList = action.payload;
                // sessionStorage.setItem('initState', JSON.stringify(action.payload))
                console.log(state.booksList);
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.loading = false;
            })
    }
})



export const { selectCategory, selectBook } = manageSlice.actions;
export default manageSlice.reducer;