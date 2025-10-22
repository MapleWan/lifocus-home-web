import { login } from '../api/auth.js'
import { setTokens } from '../utils/auth.js'

import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    accessToken: null, // 访问令牌
    refreshToken: null, // 刷新令牌
    expiryTime: null, // 令牌过期时间
    userInfo: {
      // 用户信息
      username: null,
    },
  }),
  actions: {
    async login(data) {
      const res = await login(data)
      if (res.success) {
        const { user_name, access_token, refresh_token, exp } = res.data
        setTokens(access_token, refresh_token, exp)
        this.accessToken = res.data.access_token
        this.refreshToken = res.data.refresh_token
        this.expiryTime = res.data.expiry_time
        this.userInfo.username = user_name
      } else {
        throw new Error(res)
      }
    },
  },
  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['userInfo', 'accessToken', 'refreshToken', 'expiryTime'],
  },
})

export default useUserStore
