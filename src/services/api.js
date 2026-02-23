import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // This now points to Vercel, which proxies to your AWS IP
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
