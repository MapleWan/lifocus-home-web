// token 过期时间阈值（2分钟）
const TOKEN_EXPIRY_THRESHOLD = 2 * 60 * 1000

// 检查 access token 是否即将过期
export function isTokenExpiringSoon(expiryTime) {
  if (!expiryTime) return true
  return Date.now() > expiryTime - TOKEN_EXPIRY_THRESHOLD
}

// 获取存储的 token 信息
export function getTokens() {
  return {
    accessToken: localStorage.getItem('access_token'),
    refreshToken: localStorage.getItem('refresh_token'),
    expiryTime: localStorage.getItem('token_expiry'),
  }
}

// 存储 token 信息
export function setTokens(accessToken, refreshToken, expiryTime) {
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('refresh_token', refreshToken)
  localStorage.setItem('token_expiry', expiryTime)
}

// 清除 token 信息
export function clearTokens() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('token_expiry')
}

// 刷新 token 的函数（需要在 request.js 中实现具体的 API 调用）
export function refreshAccessToken() {
  // 这个函数将在 request.js 中实现
  // 因为需要使用 axios 实例
}

export default {
  isTokenExpiringSoon,
  getTokens,
  setTokens,
  clearTokens,
  refreshAccessToken,
}
