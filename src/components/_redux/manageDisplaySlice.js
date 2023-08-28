import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUSD: 100,
    openedCart: false,
    showSearchingResult: false,
    showMobileMenu: false
}

export const manageDisplaySlice = createSlice({
    name: 'manageDisplay',
    initialState,
    reducers: {
        getCurrentUSD(state, action) {
            state.currentUSD = action.payload
        },
        openCart(state) {
            state.openedCart = !state.openedCart;
        },
        searchingResult(state, action) {
            action.payload?
                state.showSearchingResult = action.payload
                :
                state.showSearchingResult = !state.showSearchingResult;
        },
        mobileMenu(state) {
            state.showMobileMenu = !state.showMobileMenu;
        },
    }
})

export const { getCurrentUSD, openCart, searchingResult, mobileMenu } = manageDisplaySlice.actions;
export default manageDisplaySlice.reducer;