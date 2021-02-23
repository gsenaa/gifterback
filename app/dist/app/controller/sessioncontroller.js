"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _usermodel = require('../models/usermodel'); var _usermodel2 = _interopRequireDefault(_usermodel);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _util = require('util');

class SessionController {
    async Session(req, res) {
        const { email, password } = req.body

        const user = await _usermodel2.default.findOne({ email: email })

        if (!user) {
            return res.status(401).json({ error: 'User not foud!' });
        }

        const passwordTest = await _bcryptjs2.default.compare(password, user.password)

        if (!passwordTest) {
            return res.status(401).json({ error: 'Password not match!' });
        }

        const { name, _id } = user

        return res.json({
            user: {
                _id,
                name,
                email
            },
            token: _jsonwebtoken2.default.sign({ _id, name, email }, _auth2.default.secret, {
                expiresIn: _auth2.default.expiresIn,
            })
        })
    }

    async LoadSession(req, res) {
        const authHeader = req.headers.authorization;

        const [, token] = authHeader.split(' ');

        try {
            const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, _auth2.default.secret);

            res.status(200).send({
                token,
                user: decoded
            })
        } catch (err) {
            return res.status(401).json({ error: 'token inválido' })
        }


    }

    async userCheck(req, res) {

        const { email } = req.body;

        const user = await _usermodel2.default.findOne({ email: email })

        if (!user) {
            return res.status(401).json({ error: 'User not foud!' });
        }

        return res.status(200).json({ message: 'User exists!' })
    }
}

exports. default = new SessionController();