"use strict";Object.defineProperty(exports, "__esModule", {value: true});exports. default = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'token não informado ou inválido' })
    }

    return next();
}