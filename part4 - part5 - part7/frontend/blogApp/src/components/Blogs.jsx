
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'

const Blogs = () => {
    const user = useSelector(state => state.login)
    const blogs = useSelector(state => state.blogs)
    
    const dispatch = useDispatch()

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
            <h2>blogs</h2>
            {blogs.map(blog => 
                <div style={blogStyle} key={blog.id}>
                    <Blog 
                        id={blog.id} 
                        title={blog.title} 
                        author={blog.author} 
                        url={blog.url} 
                        like={blog.likes} 
                        blogUser={blog.user} 
                        user={user}
                        >
                    </Blog>
                </div>
            )}
        </div>
    )
}

export default Blogs