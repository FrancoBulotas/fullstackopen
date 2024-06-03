
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', {username : 1, name : 1})

    response.json(blogs)

  })
  
blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)  
  if (!decodedToken.id) {    
    return response.status(401).json({ error: 'token invalid' })  
  }  
  // const user = await User.findById(decodedToken.id)

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)  
  await user.save()

  response.status(201).json(savedBlog)

})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)  

  console.log(request.user.id)

  if (decodedToken.id !== blog.user.toString()) {  
    return response.status(401).json({ error: 'invalid token for deleting' })  
  }  

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const {title, author, url, likes} = request.body

  response.json(await Blog.findByIdAndUpdate(request.params.id,
    {title, author, url, likes}, 
    { new: true, runValidators: true, context: 'query' }))

})

module.exports = blogRouter