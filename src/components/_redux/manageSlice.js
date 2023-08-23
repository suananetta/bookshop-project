import { createAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { reqBookCategory } from '../_axios/requests';

const initialState = {
    loading: false,
    activeModal: false,
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
        selectBook(state, action) {
            state.chosenBooks = [...state.chosenBooks, action.payload];
            localStorage.setItem('chosenBooks', JSON.stringify(state.chosenBooks));
            console.log(state.chosenBooks);
        },
        removeBook(state, action) {
            state.chosenBooks = [...state.chosenBooks.filter(book => book.id !== action.payload.id)];
        },
        activeModal(state, action) {
            state.activeModal = !state.activeModal;
            console.log(state.activeModal);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {state.loading = true;})
            .addCase(getBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.booksList = action.payload;
                // console.log(state.booksList);
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.loading = false;
            })
    }
})



export const { selectBook, removeBook, activeModal } = manageSlice.actions;
export default manageSlice.reducer;