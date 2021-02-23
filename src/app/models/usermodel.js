import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    if (this.password) {
        var salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

export default mongoose.model('User', UserSchema);