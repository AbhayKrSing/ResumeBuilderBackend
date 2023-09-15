const PDF = require('../model/ResumeModel')
const FetchUserpdfData = async (LoginedUserID) => {
    const data = await PDF.findOne({ User: LoginedUserID })
    if (data) {
        return data
    }
    else {
        return
    }

}
module.exports = FetchUserpdfData