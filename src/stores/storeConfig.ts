import { AxiosHttpRequest } from '@/core/api/core/AxiosHttpRequest'
import { i18n } from '@/main'
import axios, { AxiosError } from 'axios'
import { toast } from 'vue3-toastify'
import { useLoginStore } from '@/stores/loginStore'

const request = new AxiosHttpRequest({
  BASE: import.meta.env.VUE_APP_API_BASE as string,
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  VERSION: 'v2',
})

const requestAuth = new AxiosHttpRequest({
  BASE: import.meta.env.VUE_APP_API_AUTH as string,
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  VERSION: 'v2',
})

let isRefreshing = false // Flag to track refresh attempts

// Function to refresh the token
async function refreshToken() {
  const loginStore = useLoginStore()

  try {
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await axios.post(`${import.meta.env.VUE_APP_API_AUTH}/token/refresh`, {
      token: refreshToken,
    })

    const { token, refreshToken: newRefreshToken } = response.data
    loginStore.token = token
    loginStore.refreshToken = newRefreshToken
    return token
  } catch {
    loginStore.token = null
    loginStore.refreshToken = null
    throw new Error('Failed to refresh token')
  }
}

// Add Bearer Token to requests
axios.interceptors.request.use(
  config => {
    config.headers = config.headers || {}

    if (!config.headers.Authorization) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  error => Promise.reject(error)
)

// Handle token expiration and refresh
axios.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true // Set the flag to true
      try {
        const newToken = await refreshToken()
        if (error.config && error.config.headers) {
          error.config.headers.Authorization = `Bearer ${newToken}`
        }
        if (error.config) {
          return axios.request(error.config)
        }
      } catch (refreshError) {
        toast.error(i18n.global.t('errors.sessionExpired'))
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false // Reset the flag
      }
    }

    toast.error(i18n.global.t('errors.somethingWentWrong'))
    return Promise.reject(error)
  }
)

export default request
export { requestAuth }
