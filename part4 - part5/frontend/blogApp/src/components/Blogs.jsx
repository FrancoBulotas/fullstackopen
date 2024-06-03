

const Blogs = (props) => {
    return (
        <ul>
            {props.blogs.map(blog => 
                <li key={blog.id}>Name: {blog.title} // Likes: {blog.likes} // Author: {blog.author}</li>            )}
        </ul>
    )
}

export default Blogs