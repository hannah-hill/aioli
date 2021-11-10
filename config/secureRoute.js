import jwt from 'jsonwebtoken'
import { secret } from './environment.js'
import User from '../models/user.js'

export const secureRoute = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error()
    const token = req.headers.authorization.replace('Bearer ', '')
    console.log(token)
    const payload = jwt.verify(token, secret)
    console.log(payload)
    const userToVerify = await User.findById(payload.sub)
    if (!userToVerify) throw new Error('Missing Header')
    req.currentUser = userToVerify
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: 'Unauthorised' })
  }
}