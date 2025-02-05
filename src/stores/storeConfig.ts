import { AxiosHttpRequest } from '@/core/api/core/AxiosHttpRequest'
import { i18n } from '@/main'
import axios, { AxiosError } from 'axios'
import { toast } from 'vue3-toastify'

const request = new AxiosHttpRequest({
  BASE: import.meta.env.VUE_APP_API_BASE as string,
  WITH_CREDENTIALS: false,
  CREDENTIALS: 'include',
  VERSION: 'v2',
})

axios.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    console.log('Error status:', error.response?.status)
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      return Promise.reject('Unauthorized')
    }

    toast.error(i18n.global.t('error.unknown'))
    return Promise.reject(error)
  }
)

export default request
