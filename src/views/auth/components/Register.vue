<template>
  <div class="login-container">
    <t-form class="w-100% mb-4" ref="form" label-align="top" :data="registerForm" :rules="rules" :label-width="0"
      @submit="onSubmit">
      <t-form-item label="账号" name="username">
        <t-input v-model="registerForm.username" placeholder="账号">
        </t-input>
      </t-form-item>
      <t-form-item label="密码" name="password">
        <t-input v-model="registerForm.password" type="password" placeholder="密码">
        </t-input>
      </t-form-item>
      <t-form-item label="确认密码" name="repeatPassword">
        <t-input v-model="registerForm.repeatPassword" type="password" placeholder="再次输入密码">
        </t-input>
      </t-form-item>
    </t-form>

    <div
      class="mt-4 w100% h-10 flex justify-center items-center rounded-large bg-[var(--primary-color)] c-[var(--foreground-color)]"
      @click="handleRegister">
      注册
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Input as TInput, Button as TButton, Form as TForm, FormItem as TFormItem, MessagePlugin } from "tdesign-vue-next"
import { register } from '@/api/auth.js'
const emit = defineEmits(['register-success']);

const rules = ref({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  repeatPassword: [{ required: true, message: '请二次输入确认密码', trigger: 'blur' }, { validator: (val) => val === registerForm.value.password, message: '两次输入的密码不一致', trigger: 'blur' }]
})
const registerForm = ref({
  username: '',
  password: '',
  repeatPassword: ''
})
const form = ref(null)
const handleRegister = async () => {
  const validation = await form.value.validate()
  if (validation === true) {
    try {
      await register(registerForm.value)
      MessagePlugin.success('注册成功')
      emit('register-success')
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
