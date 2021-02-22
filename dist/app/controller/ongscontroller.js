"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ongsmodel = require('../models/ongsmodel'); var _ongsmodel2 = _interopRequireDefault(_ongsmodel);

class Ongscontroller {
    async get(req, res){
        _ongsmodel2.default.find()
        .then((doc)=>{
            return res.json({Ongs: doc});
        })
        .catch((err)=> {
            console.log(err);
        })
    }

    async getId(req, res){
        const {id} = req.params;
        
        _ongsmodel2.default.find({_id: id})
        .then((doc)=>{
            return res.json({Ongs: doc});
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    async getCause(req, res){
        const {causeName} = req.params;
        
        _ongsmodel2.default.find({cause: causeName})
        .then((doc)=>{
            return res.json({Ongs: doc});
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    async post(req, res){

        const { name } = req.body;
        const { description } = req.body;
        const { image } = req.body;
        const { cause } = req.body;
        const { link } = req.body;
        
        await _ongsmodel2.default.create({
            name: name,
            description: description,
            image: image,
            cause: cause,
            link: link
        })
        return res.json();
    }

    async put(req, res){
        const { id } = req.params;

        const { name, description, image, cause, link } = req.body;

        const doc = await _ongsmodel2.default.findById({ _id: id })

        if (name){
            doc.name = name;
        } if (description) {
            doc.description = description;
        } if (image) {
            doc.image = image;
        } if (cause) {
            doc.cause = cause;
        } if (link) {
            doc.link = link;
        }       

        await doc.save();
   
        return res.json(doc);
    }
}

exports. default = new Ongscontroller();