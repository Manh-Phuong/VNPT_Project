import request from '../utils/httpRequest';
import { createAuthHeader } from '../utils/createAuthHeader';

export const getItemInCart = async (token) => {
    try {
        const headers = createAuthHeader(token);
        const response = await request.get('cart', { headers });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

// export const addItemInCart = async (id, token) => {
//     try {
//         const headers = createAuthHeader(token);
//         const response = await request.post(`cart/${id}`, { headers: headers });
//         return response.data;
//     } catch (error) {
//         return error.response.data;
//     }
// };

export const addItemInCart = async (baseProductId, token) => {
    try {
        const headers = createAuthHeader(token);
        const response = await request.post(`cart`, {baseProductId: baseProductId},{ headers });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteItemInCart = async (id, token) => {
    try {
        const headers = createAuthHeader(token);
        const response = await request.delete(`cart/${id}`, { headers });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
