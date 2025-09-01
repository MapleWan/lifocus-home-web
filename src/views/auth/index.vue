<script setup>
import { ref } from 'vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
const formType = ref('login')
const switchFormType = (type) => {
  formType.value = type
}
</script>

<template>
  <div class="auth-container bg-#fffef8 flex flex-col justify-center items-center h100vh">
    <div
      class="form-container flex flex-col items-center min-h-300px max-h-500px min-w-30% max-w-50% pl-3 pr-3 backdrop-blur-lg">
      <div class="mt-[1rem] text-[2rem] leading-[2.34rem] font-[600]">
        欢迎回来 LiFocus</div>
      <Login class="mt-2rem" v-if="formType === 'login'" />
      <Register class="mt-2rem" v-if="formType === 'register'" @register-success="switchFormType('login')" />

      <div class="flex justify-center mt-4">
        <template v-if="formType === 'login'">
          暂无账号？<span class="inline-block cursor-pointer ml-1 color-#003cab"
            @click="switchFormType('register')">前往注册</span>
        </template>
        <template v-if="formType === 'register'">
          已有账号？<span class="inline-block cursor-pointer ml-1 color-#003cab" @click="switchFormType('login')">立即登录</span>
        </template>
      </div>
    </div>

  </div>

</template>

<style scoped lang="scss">
.form-container {

  .fomr-title {}
}
</style>