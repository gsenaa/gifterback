import User from '../models/usermodel';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class UserController {

    async get(req, res) {
        User.find()
            .then((doc) => {
                return res.json({ User: doc });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async getId(req, res) {
        const { id } = req.params;

        User.find({ _id: id })
            .then((doc) => {
                return res.json({ User: doc });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async post(req, res) {
        const { name } = req.body;
        const { email } = req.body;
        const { password } = req.body

        const checkEmail = await User.findOne({ email: email })

        if (!checkEmail) {
            await User.create({
                name: name,
                email: email,
                password: password
            })
            return res.json();
        }

        return res.status(401).json({ error: 'User already exists' });

    }

    async putRecovery(req, res) {
        const { email } = req.params;

        const { password } = req.body;

        const doc = await User.findOne({ email: email })

        if (password) {
            console.log(doc.password)
            doc.password = password
        }

        await doc.save()


        return res.json(doc);
    }

    async put(req, res) {
        const { _id } = req.params;
    
    
        const doc = await User.findById({ _id: _id })
        
        
        const { nameNew, emailNew, passwordNew } = req.body;


        if (nameNew) {
            doc.name = nameNew;
        } 
        
        if (emailNew) {
            doc.email = emailNew;
        }
        
        if (passwordNew) {
            doc.password = passwordNew;
        }


        await doc.save()

        const name = doc.name;
        const email = doc.email;

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

    async delete(req, res) {
        const { id } = req.params;
    
        User.findByIdAndRemove({_id: id}, { useFindAndModify: false }).then((doc)=>{
            return res.json({message: 'Deletado'});
        })
        .catch((err)=>{
            return res.json({message: 'not found'});
        });
    }

}

export default new UserController();