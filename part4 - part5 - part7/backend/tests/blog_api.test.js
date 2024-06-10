
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    // const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
    // const promiseArray = blogObject.map(blog => blog.save())
    // await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})
  

test('checking if property id isnt call _id', async () => {
    const response = await api.get('/api/blogs')

    if (response.body.length > 0){
        const keys = Object.keys(response.body[0])
        assert(!keys.includes('_id'))
    }
})


test('adding one blog', async () => {
    
    const newBlog = {
        title: "sample",
        author: "test",
        url: "testsample.com",
        likes: 90
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    assert.strictEqual(blogsInDb.length, helper.initialBlogs.length + 1)
})


test('blog without likes is not added', async () => {
    const newBlog = {
        title: "sample",
        author: "test",
        url: "testsample.com"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    const blogsInDb = await helper.blogsInDb()
    assert.strictEqual(blogsInDb.length, helper.initialBlogs.length)
})

test('blog without title or url is not added', async () => {
    const newBlog = {
        author: "test",
        likes: 3400
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    const blogsInDb = await helper.blogsInDb()
    assert.strictEqual(blogsInDb.length, helper.initialBlogs.length)
})

test('deleting one blog', async () => {

    const firstBlogInDb = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${firstBlogInDb[0].id}`)
      .expect(204)


    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

after(async () => {
    await mongoose.connection.close()
})