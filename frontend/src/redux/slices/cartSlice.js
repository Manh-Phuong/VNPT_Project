import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listItem: [],
    cartSize: 0,
};

export const cartSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStoreListItem: (state, action) => {
            state.listItem = action.payload;
        },
        setStoreCartSize: (state, action) => {
            state.cartSize = action.payload;
        },
    },
});

export const { setStoreListItem, setStoreCartSize } = cartSlice.actions;

export default cartSlice.reducer;
