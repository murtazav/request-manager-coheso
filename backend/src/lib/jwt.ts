const jwt = require('jsonwebtoken')

export const sign = (payload: any) => jwt.sign(payload, process.env.JWT_SECRET);
export const verify = (token: string) => jwt.verify(token, process.env.JWT_SECRET);

export default {
    sign,
    verify
};