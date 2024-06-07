
import { useSelector } from "react-redux" 

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div style={notification[0].style}>
      {notification[1].message}
    </div>
  )
}

export default Notification