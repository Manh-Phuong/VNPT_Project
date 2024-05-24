import request from '../utils/httpRequest';
import { createAuthHeader } from '../utils/createAuthHeader';

export const createProduct = async (data, token) => {
    try {
        const headers = createAuthHeader(token);
        const response = await request.post(`upload/image`, data, { headers });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};