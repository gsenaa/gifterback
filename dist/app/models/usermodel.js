"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

_mongoose.Schema = _mongoose2.default.Schema;

const UserSchema = new (0, _mongoose.Schema)({
    name: String,
    email: String,
    password: String
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    if (this.password) {
        var salt = _bcryptjs2.default.genSaltSync(10)
        this.password = _bcryptjs2.default.hashSync(this.password, salt)
    }
    next()
})

exports. default = _mongoose2.default.model('User', UserSchema);