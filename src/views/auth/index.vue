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
  <div class="auth-container flex flex-col justify-center items-center h100vh">
    <div
      class="animate__animated animate__fadeInLeft form-container flex items-start w-full max-w-sm flex-col gap-4 px-8 pb-10 pt-6 rounded-large glass-effect shadow-large">
      <div class="mt-1rem text-[2rem] leading-[2.34rem] font-[500] c-[var(--foreground-color)] justify-start">
        {{ formType === "login" ? "Login" : "Register" }} LiFocus</div>
      <Login class="mt-1rem" v-if="formType === 'login'" />
      <Register class="mt-1rem" v-if="formType === 'register'" @register-success="switchFormType('login')" />

      <div class="flex justify-center mt-4 c-[var(--foreground-color)]">
        <template v-if="formType === 'login'">
          暂无账号？<span class="inline-block cursor-pointer ml-1 c-[var(--primary-color)]"
            @click="switchFormType('register')">前往注册</span>
        </template>
        <template v-if="formType === 'register'">
          已有账号？<span class="inline-block cursor-pointer ml-1 c-[var(--primary-color)]"
            @click="switchFormType('login')">立即登录</span>
        </template>
      </div>
    </div>

  </div>

</template>

<style scoped lang="scss">
.auth-container {
  // background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  // background: radial-gradient(ellipse at bottom right, #0f172a, #1e1a78, #0c0a09);
  background: linear-gradient(90deg, #D4A2A1, #2775ba, #6551A7);
  background-size: 300% 300%;
  animation: gradient 4s alternate infinite;

  @keyframes gradient {
    0% {
      background-position: 0%;
    }

    100% {
      background-position: 100%;
    }
  }
}
</style>
