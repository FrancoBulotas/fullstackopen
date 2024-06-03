

import axios from 'axios'
const baseUrl = '/api/blogs' // para poder usar esto de esta manera hay que modificar prxy en archivoi vite.config


let token = null
const setToken = newToken => {  
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    // const request = axios.get(baseUrl)
    // return request.then(response => response.data)
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newObject) => {

    const config = {    
        headers: { Authorization: token }, 
     }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, newObject) => {
    // const request = axios.put(`${baseUrl}/${id}`, newObject)
    // return request.then(response => response.data)
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

const deleteBlog = async (id) => {
    // const request = axios.delete(`${baseUrl}/${id}`)
    // return request.then(response => {response.data})
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

export default { getAll, create, update, deleteBlog, setToken }