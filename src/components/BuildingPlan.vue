<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  building: {
    type: Object,
    default: new Object(),
  },
})

const select = () => {
  router.push({ name: 'floorManagement', params: { floor: 'demo' } })
}
</script>

<template>
  <div className="building-image">
    <img :src="building.image" alt="Building" />
    <svg
      v-if="building.floorPlan"
      width="551"
      height="552"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          id="svg_4"
          opacity="0.4"
          d="m77,305l116,-113l31,-12l36,7l247,40l4,49l-280,-36l-36,0l-120,98l2,-33z"
          stroke="#000"
          fill="#fff"
          @click="select"
        />
        <path
          id="svg_5"
          opacity="0.4"
          d="m76,368l126,-77l30,-7c0,0 26,6 26,7c0,1 258,19 258,25c0,6 -3,-41 -3,-41c0,0 -313,-41 -313,-41c0,0 -126,103 -126,103"
          stroke="#000"
          fill="#fff"
          @click="select"
        />
        <path
          id="svg_8"
          opacity="0.4"
          d="m71,422c-8,-1 122,-51 122,-50c0,1 70,-2 70,-2c0,0 257,16 257,16c0,0 -4,-68 -4,-68c0,0 -256,-22 -256,-22c0,0 -37,-9 -37,-9c0,0 -23,8 -23,8c0,0 -126,74 -126,74c0,0 -2,44 -2,44c0,0 -1,15 -3,13"
          stroke="#000"
          fill="#fff"
          @click="select"
        />
        <path
          id="svg_10"
          opacity="0.4"
          d="m74,422l-2,41l119,-20l78,1l266,3l-7,-62l-267,-16l-71,0l-116,53z"
          stroke="#000"
          fill="#fff"
          @click="select"
        />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.building-image {
  position: relative;
  width: 552px;
  height: 552px;
  overflow: hidden;
}
.building-image img {
  position: absolute;
  width: 552px;
  height: 552px;
  left: 0;
  top: 0;
  z-index: 3;
}
.building-image svg {
  position: absolute;
  width: 552px;
  height: 552px;
  left: 0;
  top: 0;
  z-index: 4;
}
.building-image svg path:hover {
  fill: yellow;
  opacity: 0.5;
  cursor: pointer;
}
</style>
