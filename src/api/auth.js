import request from '@/utils/request.js'

// 登录
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

// 注册
export function register(data) {
  return request({
    url: '/auth/register',
    method: 'post',
    data
  })
}

// 刷新 token
export function refreshToken(data) {
  return request({
    url: '/auth/refresh-token',
    method: 'post',
    data
  })
}

export default {
  login,
  register,
  refreshToken
}
