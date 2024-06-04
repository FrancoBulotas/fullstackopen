
import Blog from './blog'

const Blogs = (props) => {
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
            {props.blogs.map(blog => 
                <div style={blogStyle} key={blog.id}>
                    <Blog title={blog.title} url={blog.url} like={blog.likes} author={blog.author}></Blog>
                </div>
            )}
        </div>
    )
}

export default Blogs