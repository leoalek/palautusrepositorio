const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/',async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  })

//this can be removed now
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ','') 
  }
  return null
}

blogsRouter.post('/',async (request, response) => {
  const body = new Blog(request.body)
  
  const user = request.user

  if(!body.likes){
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request,response) =>{
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token,process.env.SECRET)
  const userid = await User.findById(decodedToken.id)

  if(!decodedToken.id){
    return response.status(401).json({error: 'invalid Token'})
  }
  if(!blog){
    return response.status(404).json({error: 'blog not found'})
  }
  if(blog.user.toString() === userid.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }else{
    return response.status(403).json({error: 'not the right user'})
  }
})

module.exports = blogsRouter
  