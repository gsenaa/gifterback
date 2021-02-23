"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }const { Schema } = require("mongoose")

var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

_mongoose.Schema = _mongoose2.default.Schema;

const CauseSchema = new (0, _mongoose.Schema)({
    name: String,
    avatar: String
})

exports. default = _mongoose2.default.model('Cause', CauseSchema);