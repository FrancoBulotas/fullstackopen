

const User = ({user}) => {
    
    if(!user){
        return null
    }

    return (
        <div>
            <h2>{user.username}</h2>              
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map((blog, i) => 
                    <li key={i}>{blog.title }</li>
                )}
            </ul>
        </div>
    )
}

export default User