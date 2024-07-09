const User = require("../models/user")
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ','')
  }else{
    request.token = null
  }
  next()
}

const userExtractor = async(request, response, next) => {
  if(!request.token){
    request.user = null
  }else{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
      request.user = null
    }else{
      request.user = await User.findById(decodedToken.id)
    }
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    console.log(error)
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  next(error)
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}