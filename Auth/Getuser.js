
const User = require('../model/LogUp')

const run = async (user) => {
    try {
        const data = await User.findById(user).select('-password')
        if (!data) {
            return { message: 'access denied!  Make sure you are entering valid credentials' }
        }
        return data

    } catch (error) {
        console.log(error.message)
    }
}
module.exports = run