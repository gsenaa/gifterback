import User from '../models/usermodel'
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth'
import bcrypt from 'bcryptjs';
import { promisify } from 'util'

class SessionController {
    async Session(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(401).json({ error: 'User not foud!' });
        }

        const passwordTest = await bcrypt.compare(password, user.password)

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
            token: jwt.sign({ _id, name, email }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        })
    }

    async LoadSession(req, res) {
        const authHeader = req.headers.authorization;

        const [, token] = authHeader.split(' ');

        try {
            const decoded = await promisify(jwt.verify)(token, authConfig.secret);

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

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(401).json({ error: 'User not foud!' });
        }

        return res.status(200).json({ message: 'User exists!' })
    }
}

export default new SessionController();