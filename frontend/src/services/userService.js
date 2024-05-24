import request from '../utils/httpRequest';
import { createAuthHeader } from '../utils/createAuthHeader';

export const getUserById = async (userId, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.get(`/user/${userId}`, {
            headers: headers,
        });
        return res.data;
    } catch (error) {
        console.log('getListUserMessage ' + error);
        return error.response.data;
    }
};
