
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/loginReducer'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  const userLogged = useSelector(state => state.login)
  const dispatch = useDispatch()

  const signOut = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  return (
    <div style={{display: 'flex'}}>
        {/* <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        { 
        userLogged !== null 
        ? <div>Logged as: {userLogged.username} <button onClick={() => signOut()}>logout</button></div> 
        : <Link style={padding} to="/loginForm">login</Link>
        } */}
        {/* <Navbar collapseOnSelect expand="lg" bg="light" variant="light"> */}
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav"> */}
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  { 
                  userLogged !== null 
                  ? <div>Logged as: {userLogged.username} <button onClick={() => signOut()}>logout</button></div> 
                  : <Link style={padding} to="/loginForm">login</Link>
                  }
                </Nav.Link>
              </Nav>
          {/* </Navbar.Collapse> */} 
        {/* </Navbar> */}

    </div>
  )
}

export default Menu