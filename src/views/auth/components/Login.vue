<template>
  <div class="login-container">
    <t-form class="w-100% mb-4" ref="form" label-align="top" :data="loginForm" :rules="rules" :label-width="0"
      @submit="onSubmit">
      <t-form-item label="账号" name="username">
        <t-input v-model="loginForm.username" placeholder="账号">
        </t-input>
      </t-form-item>

      <t-form-item label="密码" name="password">
        <t-input v-model="loginForm.password" type="password" placeholder="密码">
        </t-input>
      </t-form-item>
    </t-form>
    <div
      class="mt-4 w100% h-10 flex justify-center items-center rounded-large bg-[var(--primary-color)] c-[var(--foreground-color)]"
      @click="handleLogin">
      <!-- <t-button theme="primary" @click="handleLogin" block>登录</t-button> -->
      登录
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '../../../stores/user.js'
import { Input as TInput, Button as TButton, Form as TForm, FormItem as TFormItem, MessagePlugin } from "tdesign-vue-next"

const rules = ref({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const loginForm = ref({
  username: '',
  password: ''
})
const form = ref(null)

const router = useRouter()
const userStore = useStore()
const handleLogin = async () => {
  const validation = await form.value.validate()
  if (validation === true) {
    try {
      await userStore.login(loginForm.value)
      MessagePlugin.success('登录成功')
      router.push('/')
    } catch (error) {
      console.log(error)
      const msg = error.message && error.response.data.message
      MessagePlugin.error(msg)
    }
  }
}

</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

:deep(.t-form__item) {
  margin-bottom: 20px;
}

:deep(.t-input) {
  height: 48px;
  border-radius: 12px;
  background-color: inherit;
}

:deep(.t-input__inner::placeholder) {
  color: var(--foreground-color);
}

:deep(.t-input__inner:focus) {
  color: var(--foreground-color);
}
</style>
