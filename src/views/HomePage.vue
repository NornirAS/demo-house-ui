<script setup>
import { useRouter } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import { login } from '@/customApi'
import { useHiveUserStore } from '@/hiveUserStore'

const hiveUserStore = useHiveUserStore()

const router = useRouter()

const submit = async userCreds => {
  const [error, data] = await login(userCreds)
  if (error) return console.log(error)

  hiveUserStore.set('username', userCreds.username)
  hiveUserStore.set('token', data.accessToken)
  router.push({ name: 'propertyManagement' })
}
</script>

<template>
  <h1>Home</h1>
  <LoginForm @submit="submit" />
</template>
