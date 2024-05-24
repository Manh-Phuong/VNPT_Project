import request from '../utils/httpRequest';
import { createAuthHeader } from '../utils/createAuthHeader';

export const getListUserMessage = async (token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.get('/user-message', {
            headers: headers,
        });
        // console.log(res)
        return res.data;
    } catch (error) {
        console.log('getListUserMessage ' + error);
        return error.response.data;
    }
};

export const getDetailMessage = async (userId, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.get(`/detail-message/${userId}`, {
            headers: headers,
        });
        // console.log(res)
        return res.data;
    } catch (error) {
        console.log('getDetailMessage ' + error);
        return error.response.data;
    }
};
