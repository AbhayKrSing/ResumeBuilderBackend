const PDF = require('../model/ResumeModel')

const savePdf = async (UserDetails, LoginUserid) => {
    try {
        let { User, Name, Email, Work, Website, Address, Phone, Summary, Education, Skills, pic } = UserDetails
        User = LoginUserid
        const check = await PDF.findOne({ User: LoginUserid })
        if (check) {
            console.log(check)         //updating
            check.User = User
            check.Name = Name
            check.Email = Email
            check.Work = Work
            check.Phone = Phone
            check.Summary = Summary
            check.Education = Education
            check.skills = Skills
            check.pic = pic

            const data = await check.save()
            return data
        }
        else {
            const data = await PDF.create({ User, Name, Email, Website, Work, Address, Phone, Summary, Education, Skills, pic })
            return data
        }

    }

    catch (error) {
        return error.message
    }
}

module.exports = { savePdf }