const { Schema } = require("mongoose")

import mongoose, {Schema} from 'mongoose';

Schema = mongoose.Schema;

const CauseSchema = new Schema({
    name: String,
    avatar: String
})

export default mongoose.model('Cause', CauseSchema);