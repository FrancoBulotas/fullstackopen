
import Blog from './Blog'

const Blogs = (props) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5
    }

    props.blogs.sort((a, b) => b.likes - a.likes) // ordena de mayor a menor

    return (
        <div>
            {props.blogs.map(blog => 
                <div style={blogStyle} key={blog.id}>
                    <Blog 
                        id={blog.id} 
                        title={blog.title} 
                        author={blog.author} 
                        url={blog.url} 
                        like={blog.likes} 
                        username={blog.user.username} 
                        user={props.user}
                        >
                    </Blog>
                </div>
            )}
        </div>
    )
}

export default Blogs