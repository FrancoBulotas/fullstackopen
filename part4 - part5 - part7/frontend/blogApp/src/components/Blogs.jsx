
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'

const Blogs = () => {
    const blogs = useSelector(state => state.blogs)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5
    }

    return (
        <div>
            <BlogForm />
            {blogs.map(blog => 
                <div style={blogStyle} key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title}
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Blogs