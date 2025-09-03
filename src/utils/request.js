import axios from 'axios'
import { getTokens, isTokenExpiringSoon, setTokens, clearTokens } from './auth.js'
import useMainStore from '@/stores/main.js'
// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // API 的 base_url
  timeout: 15000, // 请求超时时间
})

// 白名单路由
const whiteList = ['/auth/login', '/auth/register']

// 请求拦截器
service.interceptors.request.use(
  async (config) => {
    const mainStore = useMainStore()
    mainStore.isLoading = true
    // 在发送请求之前做些什么
    const { accessToken, expiryTime } = getTokens()
    // 检查 token 是否即将过期
    if (accessToken && !whiteList.includes(config.url) && isTokenExpiringSoon(expiryTime)) {
      // 如果即将过期，尝试刷新 token
      await refreshToken()
      // 更新 config 中的 token
      config.headers['Authorization'] = localStorage.getItem('access_token')
    } else if (accessToken && !whiteList.includes(config.url)) {
      config.headers['Authorization'] = accessToken
    }
    return config
  },
  (error) => {
    const mainStore = useMainStore()
    mainStore.isLoading = true
    // 对请求错误做些什么
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const mainStore = useMainStore()
    mainStore.isLoading = false
    // 对响应数据做点什么
    const res = response.data
    if (res.success) {
      return res
    } else {
      console.log('error')
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  (error) => {
    const mainStore = useMainStore()
    mainStore.isLoading = false
    const msg = error.message && error.response.data.message
    // MessagePlugin.error({ content: msg || 'Error', duration: 3000 })
    console.error(msg)
    return Promise.reject(error)
  }
)

// 刷新 token 的函数 TODO(这个逻辑有待验证)
async function refreshToken() {
  try {
    const { refreshToken } = getTokens()
    if (!refreshToken) {
      // 如果没有 refresh token，清除所有 token 并重定向到登录页
      clearTokens()
      // 这里可以添加重定向到登录页的逻辑
      return
    }

    const response = await service.get('/auth/login', { headers: { Authorization: refreshToken } })
    if (response.success) {
      // 更新 token
      const newAccessToken = response.data.access_token
      const newRefreshToken = response.data.refresh_token
      const expiryTime = response.data.exp

      setTokens(newAccessToken, newRefreshToken, expiryTime)
    } else {
      // 刷新失败，清除所有 token 并重定向到登录页
      clearTokens()
      // 这里可以添加重定向到登录页的逻辑
    }
  } catch (error) {
    console.error('Failed to refresh token:', error)
    clearTokens()
    // 这里可以添加重定向到登录页的逻辑
  }
}

export default service
