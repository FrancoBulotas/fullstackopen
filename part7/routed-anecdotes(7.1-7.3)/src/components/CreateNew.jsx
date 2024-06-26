import { useState } from 'react'
import { useField, resetFields } from '../hooks'

const CreateNew = (props) => {
    const content = useField('content')
    const author = useField('author')
    const info = useField('info')
  
    const resetFields = () => {
      
      console.log(content)
      resetFields(content)
      
      console.log(content)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button type='submit'>create</button><button onClick={() => resetFields}>reset</button>
        </form>
        <br />
      </div>
    )
  
  }

export default CreateNew