

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "Prueba 2",
        "author": "Perez",
        "url": "jddjdjjakajdskjd.com",
        "likes": 5000
    },
    {
        "title": "Prueba 4",
        "author": "Rodriguez",
        "url": "jddjdjjakajdskjd.com",
        "likes": 2434
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}