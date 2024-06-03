
const BlogForm = (props) => (
    <form onSubmit={props.addBlog}>
      <div>Tilte: <input
        value={props.newTitle}
        onChange={props.handleNewTitleChange}
      /></div>
      <div>Author: <input
        value={props.newAuthor}
        onChange={props.handleNewAuthorChange}
      /></div>
      <div>URL: <input
        value={props.newUrl}
        onChange={props.handleNewUrlChange}
      /></div>
      <button type="submit">save blog</button>
    </form> 
  )

export default BlogForm