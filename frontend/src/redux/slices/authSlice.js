import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem("user")) || {},
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setStoreToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        setStoreUser: (state, action) => {
            // console.log(action);
            state.user = action.payload;
            const jsonStr = JSON.stringify(action.payload);
            localStorage.setItem("user", jsonStr);
            // localStorage.setItem('userId', action.payload.id);
        },
    },
});

export const { setStoreToken, setStoreUser } = authSlice.actions;

export default authSlice.reducer;
