
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
    // const users = useSelector(state => state.users.filter(user => user.username !== 'root'))
    const usersNonFiltered = useSelector(state => state.users)
    const users = usersNonFiltered.filter(user => user.username !== 'root')
    
    // const users = useSelector(selectFilteredUsers)

    return (
        <div>
            <h2>Users</h2>
            <Table striped>      
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>
                                    {user.username}
                                </Link>
                            </td>                
                            <td>
                            {user.blogs.length}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>       
        </div>
    )
}

export default Users