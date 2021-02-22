"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

_mongoose.Schema = _mongoose2.default.Schema;

const Ongsmodel = new (0, _mongoose.Schema)({
    name: String,
    description: String,
    image: String,
    cause: String,
    link: String
});

exports. default = _mongoose2.default.model('Ongs', Ongsmodel);