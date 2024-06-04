
import { useState, forwardRef, useImperativeHandle } from 'react'

const Blog = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
      }
    
      useImperativeHandle(refs, () => {    
        return {      
          toggleVisibility    
        }  
      })

    return (
        <div>
            <div style={hideWhenVisible}>
                <div>{props.title}<button onClick={toggleVisibility}>view</button></div>
            </div>
            <div style={showWhenVisible}>
                <div>{props.title}<button onClick={toggleVisibility}>hide</button></div>
                <div>{props.url}</div>
                <div>{props.like}<button>like</button></div>
                <div>{props.author}</div>
            </div>
        </div>
    )
})

export default Blog