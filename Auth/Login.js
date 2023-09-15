const jwt = require("jsonwebtoken");
const User = require('../model/LogUp')
const bcrypt = require('bcrypt');
const run = async (email, password) => {
    try {
        let user = await User.findOne({ Email: email })
        const result = bcrypt.compareSync(password, user.password);

        if (user && result) {
            console.log(user.id)
            const token = jwt.sign(user.id, process.env.KEY)
            return token
        }
        else {
            console.log('not a valid credentials')
            throw new Error('Enter valid credentials');
        }

    } catch (error) {
        console.log(error.message)
    }
}
module.exports = run
