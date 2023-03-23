<script setup>
import leaflet from 'leaflet'
import { onMounted } from 'vue'
const props = defineProps({
  selectedBuilding: {
    type: Object || null,
    default: new Object(),
  },
  buildings: {
    type: Array,
    default: new Array(),
  },
})
let mymap = null
const center = [59.9133937, 10.7476917]

const addMarkers = (map, markers) => {
  markers.forEach(marker => {
    let m = leaflet
      .marker([marker.position.lat, marker.position.lng])
      .addTo(map)
    m.bindPopup(
      '<b>' +
        marker.title +
        '</b><br><div><img style="width:20px; height:20px" src="./' +
        marker.image +
        '"/></div>',
    )
  })
}

onMounted(() => {
  mymap = leaflet.map('mapid').setView(center, 13)
  leaflet
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(mymap)

  addMarkers(mymap, props.buildings)
})

console.log(props.buildings)
</script>

<template>
  <div id="mapid" class="map" style="width: 100%; height: 500px">
    Map Loading...
  </div>
</template>
