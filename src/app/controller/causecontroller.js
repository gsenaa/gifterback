import Cause from '../models/causemodel'

class CauseController {
    
    async get (req, res) {
        Cause.find()
            .then((doc) =>{
                return res.json({Cause: doc});
            })
            .catch((err) => {
                console.log(err);
            })
    } 

    async getId(req, res){
        const {id} = req.params;
        
        Cause.find({_id: id})
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
        
        const user = await Cause.create({
            name: name,
            avatar: avatar
        })
        return res.json({message: 'all good xD xD'});
    }
}

export default new CauseController();