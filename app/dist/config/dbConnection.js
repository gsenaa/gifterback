"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
require('dotenv/config');

class Database {
    constructor(){
        this.conexao();
    }

    conexao(){
        this.mongoConnection = _mongoose2.default.connect(
            process.env.MONGO_URL,
            { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true}
        )
    }

}

exports. default = new Database();