import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: '6',
    openPopper: false,
    openDetailMessage: false,
    listMessage: [],
    dispatch: null,
    detailIdTexting: {},
    
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setOpenPopper: (state, action) => {
            state.openPopper = action.payload;
        },
        setOpenDetailMessage: (state, action) => {
            state.openDetailMessage = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setDispatch: (state, action) => {
            state.dispatch = action.payload;
        },
        setAddMessage: (state, action) => {
            state.listMessage = [...state.listMessage, action.payload];
        },
        setDetailIdTexting: (state, action) => {
            state.detailIdTexting = action.payload;
        },
    },
});

export const { setOpenPopper, setOpenDetailMessage, setUserId, setAddMessage, setDetailIdTexting } =
    messageSlice.actions;

export default messageSlice.reducer;
