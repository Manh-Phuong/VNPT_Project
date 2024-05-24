import request from '../utils/httpRequest';

export const login = async ({ username, password }) => {
    try {
        const res = await request.post('auth/login', { username, password });
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};

export const verifyToken = async (token) => {
    const res = await request.post('auth/verify-code', { token });
    return res.data;
};

