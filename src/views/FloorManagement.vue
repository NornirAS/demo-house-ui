<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import FloorPlan from '@/components/FloorPlan.vue'
import ObjectDataDisplay from '@/components/ObjectDataDisplay.vue'
import { isEmpty } from '@/utils'
import hiveWS from '../hiveWs'

const route = useRoute()

const activeItem = ref({})
const incomingData = ref({})

const initialDeviceList = ref([
  {
    room: 'Admin',
    id: '1',
    type: 'sensor',
  },
  {
    room: 'Exam',
    id: '2',
    type: 'sensor',
  },
  {
    room: 'ER',
    id: '3',
    type: 'actuator',
  },
  {
    room: 'Consulting 1',
    id: '4',
    type: 'actuator',
  },
  {
    room: 'Consulting 2',
    id: '5',
    type: 'actuator',
  },
  {
    room: 'Staff',
    id: '6',
    type: 'sensor',
  },
  {
    room: 'Patient',
    id: '7',
    type: 'actuator',
  },
  {
    room: 'Cafe',
    id: '8',
    type: 'actuator',
  },
  {
    room: 'Medical',
    id: '9',
    type: 'sensor',
  },
])

const deviceDataList = ref([...initialDeviceList.value])

const roomList = computed(() => {
  return deviceDataList.value.map(item => {
    return { room: item.room, type: item.type }
  })
})

const activeItemData = computed(() => {
  const item = deviceDataList.value.filter(
    item => item.room === activeItem.value.room,
  )
  return item[0]
})

const message = ref('')

hiveWS.open(data => {
  const { RTW } = JSON.parse(data)
  if (!RTW && !RTW.PAYLOAD) return
  const msgObj = JSON.parse(RTW.PAYLOAD)
  // Update incoming data with structure from the list
  incomingData.value = Object.assign(
    msgObj,
    initialDeviceList.value[msgObj.id - 1],
  )
  // Update device data list with incomming data
  deviceDataList.value[msgObj.id - 1] = Object.assign(
    msgObj,
    initialDeviceList.value[msgObj.id - 1],
  )
})

const sendCommand = cmd => {
  hiveWS.sendData({
    command: cmd,
  })
}

const resetAll = () => {
  const commands = [
    'DOOR_LOCK',
    'LIGHT_OFF_CR1',
    'LIGHT_OFF_CR2',
    'STOP_SPIN',
    'LIGHT_OFF',
  ]
  commands.forEach(cmd => {
    setTimeout(() => {
      sendCommand(cmd)
    }, 500)
  })
}
</script>

<template>
  <div class="m-4">
    <h1>Floor Management</h1>
    <Card>
      <template #content>
        <Button
          class="p-button-text mb-4"
          label="Turn off all"
          @click="resetAll"
        />
        <div class="flex">
          <div class="flex-none align-items-center justify-content-center">
            <FloorPlan
              v-model:item="activeItem"
              :room-list="roomList"
              :data="incomingData"
              :floor="route.params.floor"
            />
          </div>
          <div class="flex-grow-1 flex ml-4 surface-ground">
            <ObjectDataDisplay
              v-if="!isEmpty(activeItem)"
              :data="activeItemData"
              @command="sendCommand"
            />
          </div>
        </div>
        <div class="p-inputgroup w-4 mt-4">
          <InputText v-model="message" placeholder="Message" />
          <Button label="Send message" @click="sendCommand(message)" />
        </div>
      </template>
    </Card>
  </div>
</template>
