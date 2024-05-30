

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
  
const favoriteBlog = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)[0]
}

const mostBlogs = (blogs) => {
    let author = blogs.sort((a, b) => b.blogs - a.blogs)[0]
    return { author : author.author, blogs : author.blogs}
}

const mostLikes = (blogs) => {
    let author = favoriteBlog(blogs)
    return { author : author.author, likes : author.likes}
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog, 
    mostBlogs,
    mostLikes
}   