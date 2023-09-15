const mongoose=require('mongoose');
const { Schema } = mongoose;

const Userschema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type:String,
        required: true,
        unique: true,
    },
    CreatedAt: {
        type: Date,
        default: new Date()
    },
    password: {
        type:String,
        min: 7,
        max: 14,
        required: true,
    }

})

module.exports = mongoose.model('users', Userschema)