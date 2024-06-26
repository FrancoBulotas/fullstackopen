

import axios from 'axios'
const baseUrl = '/api/blogs' // para poder usar esto de esta manera hay que modificar prxy en archivoi vite.config


let token = null
const setToken = newToken => {  
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    console.log(response.data)
    return response.data
}
 
const create = async (newObject) => {
    const config = {    
        headers: { Authorization: token }, 
    }

    console.log(newObject)

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

// const updateComment = async (id, newComment) => {


//     const response = await axios.put(`${baseUrl}/${id}/comments`, newComment)
//     return response.data
// }

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

const deleteBlog = async (id) => {
    const config = {    
        headers: { Authorization: token }, 
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, getById, create, update, deleteBlog, setToken }