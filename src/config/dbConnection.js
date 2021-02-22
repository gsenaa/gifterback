import mongoose from 'mongoose';
import 'dotenv/config';

class Database {
    constructor(){
        this.conexao();
    }

    conexao(){
        this.mongoConnection = mongoose.connect(
            process.env.MONGO_URL,
            { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true}
        )
    }

}

export default new Database();