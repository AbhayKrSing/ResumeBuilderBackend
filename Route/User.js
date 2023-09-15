const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const run = require('../Auth/SignUp')
const runlogin = require('../Auth/Login')
const getuser = require('../Auth/Getuser')
const FetchUserpdfData = require('../Auth/FetchUserpdfData')

const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.saltround);
const fetch = require('../middleware/fetchuser');
const { savePdf } = require('../Savepdf/Savepdf');

//1.Logup or signup 
router.post('/Logup', [
  body('Name').isAlpha('en-US', { ignore: " " }),  //imp to ignore ' '
  body('Email').isEmail(),
  body('password').isLength({ min: 7 })], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log(req.body)
      let { Name, Email, password } = req.body
      const salt = bcrypt.genSaltSync(saltRounds);
      password = bcrypt.hashSync(password, salt);
      let token = await run(Name, Email, password)
      if (token) {
        res.status(200).json({ success: true, token })
      }
      else {
        res.status(400).json({ success: false, message: 'Give valid credientials' })
      }
    } catch (error) {
      console.log(error.message)
    }

  })
//2. Login 
router.post('/login', [
  body('Email').isEmail()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log(req.body)
      const { Email, password } = req.body
      let token = await runlogin(Email, password)
      if (token) {
        res.status(200).json({ success: true, token })
      }
      else {
        res.status(400).json({ success: false, token: null, message: 'Enter valid credentails' })
      }
    } catch (error) {
      console.log(error.message)
    }


  })
//3.Authentication(login required)
router.post('/getuser', fetch, async (req, res) => {
  try {
    const data = await getuser(req.user)
    res.status(200).send(data)
  } catch (error) {
    console.log(error.message)
  }

})


//4.save PDF data(create or update operation)
router.post('/savepdf', fetch, async (req, res) => {
  try {
    const data = await savePdf(req.body, req.user)
    res.json(data)
  } catch (error) {
    res.status(400).json(error)
  }
})

//5.fetch user specific data(read operation)
router.post('/fetchUserData', fetch, async (req, res) => {
  try {
    const data = await FetchUserpdfData(req.user)
    if (data) {
      return res.status(200).send(data)
    }
  } catch (error) {
    res.status(400).send(error)
  }
})
module.exports = router