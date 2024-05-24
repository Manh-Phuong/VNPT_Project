import request from '../utils/httpRequest';
import { createAuthHeader } from '../utils/createAuthHeader';

export const createProduct = async (data, token) => {
    try {
        const headers = createAuthHeader(token);
        const response = await request.post(`base-products`, data, { headers });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteProduct = async (baseId, token) => {
    const headers = createAuthHeader(token);
    try {
        const response = await request.delete(`base-products/${baseId}`, {
            headers: headers,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getListProduct = async (param, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.get('/base-products', {
            params: {
                page: param.page + 1,
                size: param.pageSize,
            },
            headers: headers,
        });
        // console.log(res)
        return res.data;
    } catch (error) {
        console.log('getListProduct ' + error);
        return error.response.data;
    }
};

export const getListProductHome = async (param, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.get('/base-products-home', {
            params: {
                page: param.page,
                size: param.pageSize,
            },
            headers: headers,
        });
        return res.data;
    } catch (error) {
        console.log('getListProduct ' + error);
        return error.response.data;
    }
};

export const getListProductByUser = async (param, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.get('/base-products-user', {
            params: {
                page: param.page + 1,
                size: param.pageSize,
            },
            headers: headers,
        });
        // console.log(res)
        return res.data;
    } catch (error) {
        console.log('getListProduct ' + error);
        return error.response.data;
    }
};

export const searchProduct = async (keyword, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.get('base-products/search', {
            params: {
                keyword: keyword,
            },
            headers: headers,
        });
        // console.log(res)
        return res;
    } catch (error) {
        console.log('getListProduct ' + error);
        return error.response.data;
    }
};

export const getListVariant = async (param = { page: 1, pageSize: 10 }, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.get('/base-products/variants', {
            params: {
                page: param.page,
                size: param.pageSize,
            },
            headers: headers,
        });
        // console.log(res)
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const searchVariant = async (keyword, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.get('base-products/variants/search', {
            params: {
                keyword: keyword,
            },
            headers: headers,
        });
        // console.log(res)
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getProductDetail = async (baseId, token) => {
    const headers = createAuthHeader(token);
    try {
        const res = await request.get(`base-products/${baseId}`, {
            headers: headers,
        });
        // console.log(res)
        return res.data;
    } catch (error) {
        console.log('getProductDetail ' + error);
        return error.response.data;
    }
};

export const updateBaseProduct = async (baseId, data, token) => {
    const headers = createAuthHeader(token);
    try {
        const response = await request.put(`base-products/${baseId}`, data, {
            headers: headers,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
export const createVariant = async (baseId, data, token) => {
    const headers = createAuthHeader(token);
    try {
        const response = await request.post(`base-products/${baseId}/variants`, data, {
            headers,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateVariant = async (baseId, data, token) => {
    const headers = createAuthHeader(token);
    try {
        const response = await request.put(`base-products/${baseId}/variants`, data, {
            headers,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteVariant = async (baseId, variantId, token) => {
    const headers = createAuthHeader(token);
    try {
        const response = await request.delete(`base-products/${baseId}/variants/${variantId}`, {
            headers: headers,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const createAttribute = async (baseId, data, token) => {
    const headers = createAuthHeader(token);
    try {
        const response = await request.post(`base-products/${baseId}/attributes`, data, {
            headers: headers,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const updateAttribute = async (baseId, data, token) => {
    const headers = createAuthHeader(token);
    try {
        const response = await request.put(`base-products/${baseId}/attributes`, data, {
            headers: headers,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteAttribute = async (baseId, data, token) => {
    // alert(token)
    const headers = createAuthHeader(token);
    try {
        const response = await request.delete(`base-products/${baseId}/attributes`, {
            data,
            headers,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
