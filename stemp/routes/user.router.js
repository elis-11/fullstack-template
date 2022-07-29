import { Router } from 'express'
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { auth } from '../lib/auth.middleware.js'
import config from '../config.js'

const userRouter = Router()

// GET ALL USERS
// Route: /user
userRouter.get("/", auth, async (req, res, next) => {
  console.log("[ROUTE] Users here...")

  // we can access logged in users now anywhere
  console.log("Authenticated user:", req.user._id)
  const usersAll = await User.find()
  res.json(usersAll)
})


// GET SINGLE USER
// Route /user/:id
userRouter.get("/:id", auth, async (req, res, next) => {

  // we can access logged in users now anywhere
  console.log("Authenticated user:", req.user._id)
  const usersAll = await User.findById(req.params.id)
  res.json(usersAll)
})

// SIGNUP user
// Route POST /user
userRouter.post("/", async (req, res, next) => {

  const userData = req.body
  const { email} = userData

  const userExists = await User.findOne({ email })

  // if user already exists with that email => REJECT
  if(userExists) {
    return res.status(400).json({
      error: "We already got that user. But thank you!"
    })
  }

  // hash password BEFORE storing user in DB
  userData.password = bcrypt.hashSync(userData.password, 10)

  const user = await User.create(userData)
  res.json(user)
})

// LOGIN user
// Route: POST /user/login
userRouter.post("/login", async (req, res, next) => {
  // hello123 (Plain Password)
  // ah377370917310 (Hashed Password)

  // user has sent us plain password through a login form
  const pwPlain = req.body.password

  // find user by email first
  const user = await User.findOne({ email: req.body.email })

  // user does not exist!
  if (!user) {
    return res.status(400).json({ error: "User does not exist" })
  }

  // compare now password plain given by user with HASH stored in database
  const matches = bcrypt.compareSync(pwPlain, user.password)

  // if hashes dont match => reject! 
  if (!matches) {
    return res.status(400).json({ error: "PW incorrect" })
  }

  // create JWT Token and send it together with the user
  // const tokenData = { _id: user._id, email: user.email }
  // const token = jwt.sign(tokenData, 
const userPublic=user.toJSON()
const token=jwt.sign(
  userPublic, 
  config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRY } // expires in 4 hours
  )
  res.json({ ...userPublic, token }) // combine user object with token 
})

export default userRouter