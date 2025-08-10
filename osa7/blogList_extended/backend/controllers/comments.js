const router = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

router.post('/:id/comments', async (request, response) => {
  //console.log(request.body)
  const { comment } = request.body
  const blogId = request.params.id

  const blog = await Blog.findById(blogId)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  const newComment = new Comment({
    comment,
    blog: blog._id
  })

  const savedComment = await newComment.save()
  blog.comments = await blog.comments.concat(savedComment._id)
  //console.log('comment is being uptadet to blog:', blog.comments)
  await blog.save()
  response.status(201).json(savedComment)
})

router.get('/:id/comments', async (request, response) => {
  const blogId = request.params.id
  const comments = await Comment.find({ blog: blogId }) // Filter comments by blog ID
  response.json(comments)
})

router.delete('/:id/comments/:id', async (request, response) => {
  deleteComment = await Comment.findByIdAndDelete(comment.id)
  response.json(deleteComment)
})

module.exports = router
