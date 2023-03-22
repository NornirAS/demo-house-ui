<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'
import { GOOGLE_MAPS_API } from '@/config'

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

const center = {
  lat: 59.9133937,
  lng: 10.7476917,
}
const select = building => {
  emit('update:selectedBuilding', building)
}
</script>

<template>
  <GoogleMap
    :api-key="GOOGLE_MAPS_API"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="12"
  >
    <Marker
      v-for="building in buildings"
      :key="building.title"
      :options="{ position: building.position }"
      @click="select(building)"
    />
  </GoogleMap>
</template>
