// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import authReducer from './slices/authSlice';
import messageReducer from './slices/messageSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        message: messageReducer,
        cart: cartReducer,
    },
});

export default store;
