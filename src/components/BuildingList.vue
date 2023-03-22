<script setup>
import Button from 'primevue/button'

defineProps({
  selectedBuilding: {
    type: Object || null,
    default: new Object(),
  },
  buildings: {
    type: Array,
    default: new Array(),
  },
})

const emit = defineEmits(['update:selectedBuilding'])

const select = building => {
  emit('update:selectedBuilding', building)
}
</script>

<template>
  <div class="surface-card shadow-2 border-round p-4 h-full">
    <div class="flex justify-content-between align-items-center mb-5">
      <span class="text-xl text-900 font-medium">Buildings</span>
    </div>
    <ul class="list-none p-0 m-0">
      <li
        v-for="building in buildings"
        :key="building.title"
        class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
      >
        <div class="flex">
          <img
            :src="building.image"
            class="mr-3"
            style="width: 60px; height: 60px"
          />
          <div class="mr-0 md:mr-8">
            <span class="block text-900 font-medium mb-1">{{
              building.title
            }}</span>
            <div class="text-600">{{ building.address }}</div>
          </div>
        </div>
        <div class="mt-2 md:mt-0 flex flex-nowrap">
          <Button
            class="p-button-outlined mr-1"
            label="View"
            @click="select(building)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
