"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _usermodel = require('../models/usermodel'); var _usermodel2 = _interopRequireDefault(_usermodel);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);

class UserController {

    async get(req, res) {
        _usermodel2.default.find()
            .then((doc) => {
                return res.json({ User: doc });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async getId(req, res) {
        const { id } = req.params;

        _usermodel2.default.find({ _id: id })
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

        const checkEmail = await _usermodel2.default.findOne({ email: email })

        if (!checkEmail) {
            await _usermodel2.default.create({
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

        const doc = await _usermodel2.default.findOne({ email: email })

        if (password) {
            console.log(doc.password)
            doc.password = password
        }

        await doc.save()


        return res.json(doc);
    }

    async put(req, res) {
        const { _id } = req.params;
    
    
        const doc = await _usermodel2.default.findById({ _id: _id })
        
        
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
            token: _jsonwebtoken2.default.sign({ _id, name, email }, _auth2.default.secret, {
                expiresIn: _auth2.default.expiresIn,
            })
        })
    }

    async delete(req, res) {
        const { id } = req.params;
    
        _usermodel2.default.findByIdAndRemove({_id: id}, { useFindAndModify: false }).then((doc)=>{
            return res.json({message: 'Deletado'});
        })
        .catch((err)=>{
            return res.json({message: 'not found'});
        });
    }

}

exports. default = new UserController();