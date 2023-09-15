const mongoose = require('mongoose')
mongoose.set('runValidators', true)
mongoose.set('strictQuery', true)
const connect = () => {
    mongoose.connect('mongodb+srv://kabhay849:XZA8GFE8mfOYkePw@cluster0.c6rfrvw.mongodb.net/?retryWrites=true&w=majority').then((conn) => {
        console.log(`MongoDB connected : ${conn.connection.host}`.blue.bold.underline)
    }).
        catch(error => handleError(error));
}

module.exports = connect