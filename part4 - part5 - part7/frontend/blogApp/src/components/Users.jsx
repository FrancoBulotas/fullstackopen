
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

import { createSelector } from 'reselect';

const selectUsers = state => state.users
const selectFilter = state => 'root'
const selectFilteredUsers = createSelector(
  [selectUsers, selectFilter],
  (users, filter) => {
    return users.filter(user => user.username !== 'root')
  }
)

const Users = () => {
    
    const users = useSelector(selectFilteredUsers)

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