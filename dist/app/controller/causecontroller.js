"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _causemodel = require('../models/causemodel'); var _causemodel2 = _interopRequireDefault(_causemodel);

class CauseController {
    
    async get (req, res) {
        _causemodel2.default.find()
            .then((doc) =>{
                return res.json({Cause: doc});
            })
            .catch((err) => {
                console.log(err);
            })
    } 

    async getId(req, res){
        const {id} = req.params;
        
        _causemodel2.default.find({_id: id})
        .then((doc)=>{
            return res.json({Cause: doc});
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    async post (req, res) {
        const { name } = req.body;
        const { avatar } = req.body
        
        const user = await _causemodel2.default.create({
            name: name,
            avatar: avatar
        })
        return res.json({message: 'all good xD xD'});
    }
}

exports. default = new CauseController();