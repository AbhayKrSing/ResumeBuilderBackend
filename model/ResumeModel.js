const mongoose = require('mongoose');
const { Schema } = mongoose;

const Resumeschema = new Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        unique: true
    },
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Work: {
        type: String
    },
    Phone: {
        type: Number
    },
    Address: {
        type: String
    },
    Website: {
        type: String
    },
    Summary: {
        type: String
    },
    Education: {
        type: String
    },
    skills: {
        type: String
    },
    pic: {
        type: String,
        default: "https://res-console.cloudinary.com/do8whoupu/thumbnails/v1/image/upload/v1682966454/ZzNmZm1raDRxYXJjdnQ1Y2htbHE=/preview"
    }

}, {
    timestamps: true
})
module.exports = mongoose.model('Data', Resumeschema)