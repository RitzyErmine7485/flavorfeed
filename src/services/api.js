import axios from 'axios'

export default axios.create({
    baseURL: 'https://flavorfeedback.azurewebsites.net/'
})