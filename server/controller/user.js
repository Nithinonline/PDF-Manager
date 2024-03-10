const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const fs = require('fs');
const User = require("../Model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router()
const bcrypt = require("bcrypt")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")



//SignUp
router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || name === ' ' || email === ' ' || password === ' ') {
      return next(new ErrorHandler("All fields required", 400))
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return next(new ErrorHandler("User Already Exist", 400))
    }

    const hashPassword = bcrypt.hashSync(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashPassword
    })

    res.status(200).json(user)

  } catch (err) {
    return next(new ErrorHandler(err.message, 500))
  }
});



//Login
router.post("/login-user", catchAsyncErrors(async (req, res, next) => {
  try {

    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
      return next(new ErrorHandler("Please provide all required fields", 400))
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("Invalid credentials", 400))
    }
    const validPassword = bcrypt.compare(password, user.password)
    if (!validPassword) {
      return next(new ErrorHandler('Invalid credentials', 400))
    }

    res.status(200).json(user)

  } catch (error) {
    return next(new ErrorHandler(error.message, 500))
  }

}))





//To Add PDF
router.post('/add/:id', upload.single("file"), async (req, res, next) => {
  try {
    const {title} = req.body
    const filename=req.file.filename
    const fileUrl = path.join(filename)

    const user = await User.findById({ _id: req.params.id })

    if (!user) {
      return next(new ErrorHandler("user not found", 400))
    }

    user.pdf.push({
      title: title,
      PDFdata: fileUrl
    })
    await user.save()

    res.status(200).json({ message: 'PDF added successfully', user });

  } catch (err) {
    return next(new ErrorHandler(err.message, 500))
  }
})


module.exports = router