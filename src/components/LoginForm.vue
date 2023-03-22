<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Card from 'primevue/card'

const authForm = ref({
  username: '',
  password: '',
})

const emit = defineEmits(['submit'])
</script>

<template>
  <Card class="surface-card">
    <template #title>Login</template>
    <template #content>
      <form @submit.prevent="emit('submit', authForm)">
        <div class="field grid">
          <label for="email" class="col-fixed" style="width: 100px"
            >Email</label
          >
          <InputText id="email" v-model="authForm.username" />
        </div>
        <div class="field grid">
          <label for="password" class="col-fixed" style="width: 100px"
            >Password</label
          >
          <Password
            id="password"
            v-model="authForm.password"
            :feedback="false"
          />
        </div>
        <Button label="Login" type="submit" />
      </form>
    </template>
  </Card>
</template>
