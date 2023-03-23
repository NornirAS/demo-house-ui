<script setup>
import { ref } from 'vue'
import OpenStreetMap from '@/components/OpenStreetMap.vue'
import BuildingPlan from '@/components/BuildingPlan.vue'
import BuildingList from '@/components/BuildingList.vue'

const selectedBuilding = ref(null)

const buildings = [
  {
    title: 'Foo',
    address: 'soem address',
    image: 'building_1.png',
    position: {
      lat: 59.9108846,
      lng: 10.7606307,
    },
    floorPlan: true,
  },
  {
    title: 'Bar',
    address: 'soem address',
    image: 'building_2.jpeg',
    position: {
      lat: 59.9133937,
      lng: 10.7476917,
    },
    floorPlan: false,
  },
  {
    title: 'Top',
    address: 'soem address',
    image: 'building_3.jpeg',
    position: {
      lat: 59.926608,
      lng: 10.719624,
    },
    floorPlan: false,
  },
]
</script>

<template>
  <div class="m-4">
    <h1>Property Management</h1>
    <div class="flex mb-4">
      <div class="w-8 mr-4">
        <OpenStreetMap
          v-model:selectedBuilding="selectedBuilding"
          :buildings="buildings"
        />
      </div>
      <div class="w-4">
        <BuildingList
          v-model:selectedBuilding="selectedBuilding"
          :buildings="buildings"
        />
      </div>
    </div>
    <div v-if="selectedBuilding" class="flex">
      <BuildingPlan :building="selectedBuilding" />
    </div>
  </div>
</template>
