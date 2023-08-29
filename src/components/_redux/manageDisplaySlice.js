import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUSD: 100,
    openedCart: false,
    showSearchingResult: false,
    showMobileMenu: false,
    device: 'mobile'
}

export const manageDisplaySlice = createSlice({
    name: 'manageDisplay',
    initialState,
    reducers: {
        getCurrentUSD(state, action) {
            action.payload? state.currentUSD = action.payload : state.currentUSD = 100;
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
        identifyDevice(state, action) {
            state.device = action.payload;
        }
    }
})

export const { getCurrentUSD, openCart, searchingResult, mobileMenu, identifyDevice } = manageDisplaySlice.actions;
export default manageDisplaySlice.reducer;