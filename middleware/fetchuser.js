const jwt = require("jsonwebtoken");

const fetch = (req, res, next) => {
   try {
      const token = req.header('auth-token')
      if (!token) {
         return res.status(400).json({ success: false, message: 'Enter valid credientials' })
      }
      const data = jwt.verify(token, process.env.KEY)
      console.log(data)
      req.user = data
      next()
   } catch (error) {
      console.log(error.message)
      res.status(400).send('Access denied')
   }

}
module.exports = fetch