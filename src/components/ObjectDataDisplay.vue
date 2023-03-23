<script setup>
import { computed } from 'vue'
import Button from 'primevue/button'

const props = defineProps({
  data: {
    type: Object || null,
    default: null,
  },
})

const emits = defineEmits(['command'])

const isErRoom = computed(() => {
  return props.data.room === 'ER'
})

const isConsulting1Room = computed(() => {
  return props.data.room === 'Consulting 1'
})

const isConsulting2Room = computed(() => {
  return props.data.room === 'Consulting 2'
})

const isPatientRoom = computed(() => {
  return props.data.room === 'Patient'
})
const isCafeRoom = computed(() => {
  return props.data.room === 'Cafe'
})

const controls = computed(() => {
  if (!props.data) return
  if (isErRoom.value) {
    return props.data.status === '0'
      ? {
          label: 'LOCK',
          cmd: 'DOOR_LOCK',
        }
      : {
          label: 'UNLOCK',
          cmd: 'DOOR_UNLOCK',
        }
  }
  if (isConsulting1Room.value) {
    return props.data.status_cr1 === '1'
      ? {
          label: 'OFF',
          cmd: 'LIGHT_OFF_CR1',
        }
      : {
          label: 'ON',
          cmd: 'LIGHT_ON_CR1',
        }
  }
  if (isConsulting2Room.value) {
    return props.data.status_cr2 === '1'
      ? {
          label: 'OFF',
          cmd: 'LIGHT_OFF_CR2',
        }
      : {
          label: 'ON',
          cmd: 'LIGHT_ON_CR2',
        }
  }
  if (isPatientRoom.value) {
    return props.data.status === '1'
      ? {
          label: 'OFF',
          cmd: 'STOP_SPIN',
        }
      : {
          label: 'ON',
          cmd: 'START_SPIN',
        }
  }
  if (isCafeRoom.value) {
    return props.data.status === '1'
      ? {
          label: 'OFF',
          cmd: 'LIGHT_OFF',
        }
      : {
          label: 'ON',
          cmd: 'LIGHT_ON',
        }
  }
  return false
})

const send = () => {
  emits('command', controls.value.cmd)
}
</script>

<template>
  <div class="p-4 w-full">
    <div v-if="data">
      <div
        v-for="([key, value], index) in Object.entries(data)"
        :key="index"
        class="p-2"
      >
        <div class="flex align-items-center justify-content-between mb-2">
          <span class="text-500 font-medium">{{ key.toUpperCase() }}</span>
          <span class="text-900 font-medium">{{ value }}</span>
        </div>
      </div>
    </div>
    <div v-else>No data received...</div>
    <Button
      v-if="data.type === 'actuator'"
      class="mt-4"
      :label="controls.label"
      @click="send"
    />
  </div>
</template>
