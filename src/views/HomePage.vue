<script setup>
import { useRouter } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import { getToken } from '@/hiveApi'
import { useHiveUserStore } from '@/hiveUserStore'

const hiveUserStore = useHiveUserStore()

const router = useRouter()

const login = async userCreds => {
  const { error, data } = await getToken(userCreds)

  if (error) return console.log(error)

  hiveUserStore.set('username', userCreds.username)
  hiveUserStore.set('token', data)
  router.push({ name: 'propertyManagement' })
}
</script>

<template>
  <h1>Home</h1>
  <LoginForm @submit="login" />
</template>
