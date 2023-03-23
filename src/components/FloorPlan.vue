<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { fabric } from 'fabric'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import {
  fetchFloorPlanList,
  fetchFloorPlanByName,
  addFloorPlan,
  updateFloorPlan,
} from '@/customApi'
import { useHiveUserStore } from '@/hiveUserStore'
import { storeToRefs } from 'pinia'
import { isEmpty } from '@/utils'

const hiveUserStore = useHiveUserStore()
const { username } = storeToRefs(hiveUserStore)

const props = defineProps({
  item: {
    type: Object,
    default: new Object(),
  },
  roomList: {
    type: Array,
    default: new Array(),
  },
  data: {
    type: Object,
    default: new Object(),
  },
  floor: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:item'])

const canvasEl = ref(null)
const editMode = ref(false)
const canvasName = ref('')
const canvasList = ref(null)
const isNewCanvas = ref(true)
const isLoadedCanvas = ref(false)

const floorPlan = ref(
  'https://i.ibb.co/G5Lkgm3/General-blueprint-with-sensors-2x-100.jpg',
)

const selectedObject = ref(null)
const isSelectedObject = computed(() => {
  return selectedObject.value !== null
})

const resetSelectedObject = () => {
  selectedObject.value = null
}

const getCanvasList = async () => {
  const [error, data] = await fetchFloorPlanList(`${username.value}`)

  if (error) return console.error(error)

  canvasList.value = [...data]
}

// Stroke - connectivity. If connected '#1F51FF' else #36454F.
// Fill - status. ON - #0FFF50, OFF - #C0C0C0, WARNING - #FAFA33, DANGER - #FF3131

const statusColors = {
  CONNECTED: '#1F51FF',
  DISCONNECTED: '#36454F',
  ON: '#0FFF50',
  OFF: '#C0C0C0',
  WARNING: '#FAFA33',
  DANGER: '#FF3131',
}

const selectedItem = ref({})
const isSelectedItem = computed(() => {
  return !isEmpty(selectedItem.value)
})
const updateSelectedItem = ({ item }) => {
  selectedItem.value = item
}
const resetSelectedItem = () => {
  updateSelectedItem({
    item: null,
  })
}

// Add custom properties to fabric object
// When using canvas.toJSON() it doesn't export all the properties
// Thats why we need to add them when we load objects from DB
const addPopertiesToFabricObject = obj => {
  switch (obj.type) {
    case 'image':
      obj.set('selectable', false)
      break
    default:
      obj.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        bl: false,
        br: false,
        tl: false,
        tr: false,
        mtr: true,
      })
      obj.on('selected', obj => {
        updateSelectedItem(obj.target)
        selectedObject.value = Object.assign({}, obj.target)
        emit('update:item', selectedItem.value)
      })
      obj.set('selectable', editMode.value)
      break
  }
}

let canvas
const initNewCanvas = () => {
  if (canvas) canvas.dispose()
  canvas = new fabric.Canvas(canvasEl.value)
  canvas.selection = editMode.value
  canvas.setBackgroundColor('#78909c')
  canvas.renderAll()
  canvas.on('mouse:down', obj => {
    if (!obj.target || obj.target.type === 'image') {
      resetSelectedItem()
      resetSelectedObject()
      emit('update:item', selectedItem.value)
    }
  })
}
onMounted(async () => {
  initNewCanvas()
  canvasName.value = props.floor
  await loadCanvas()
  getCanvasList()
})

const addImage = () => {
  fabric.Image.fromURL(floorPlan.value, img => {
    img.scaleToWidth(800, false)
    img.scaleToHeight(600, false)
    addPopertiesToFabricObject(img)
    canvas.add(img).centerObject(img).renderAll()
  })
}

const createFabricObj = () => {
  let obj
  if (selectedItem.value.type === 'actuator') {
    obj = new fabric.Rect({
      top: 100,
      left: 400,
      width: 20,
      height: 20,
      fill: statusColors.OFF,
      stroke: statusColors.DISCONNECTED,
      strokeWidth: 4,
    })
  }
  if (selectedItem.value.type === 'sensor') {
    obj = new fabric.Circle({
      radius: 10,
      fill: statusColors.OFF,
      stroke: statusColors.DISCONNECTED,
      strokeWidth: 2,
      left: 400,
      top: 100,
    })
  }
  obj.set('item', selectedItem.value)
  addPopertiesToFabricObject(obj)
  return obj
}
const addObject = () => {
  canvas.add(createFabricObj())
  resetSelectedItem()
}

const changeObject = () => {
  const activeObjects = canvas.getActiveObjects()
  activeObjects[0].set('item', selectedItem.value)
  canvas.discardActiveObject().renderAll()
  resetSelectedItem()
  resetSelectedObject()
}

// Remove selected/active object from canvas
const removeActiveObject = () => {
  const activeObjects = canvas.getActiveObjects()
  canvas.remove(activeObjects[0])
  resetSelectedItem()
  resetSelectedObject()
  emit('update:item', selectedItem.value)
}

// In edit mode all object are seletable, but not image
const toggleEditMode = () => {
  editMode.value = !editMode.value
  canvas.getObjects().forEach(obj => {
    if (obj.type === 'image') return
    obj.set('selectable', editMode.value)
  })
}

const newCanvas = () => {
  isNewCanvas.value = true
  isLoadedCanvas.value = false
  initNewCanvas()
}

const loadCanvas = async () => {
  const [error, data] = await fetchFloorPlanByName(
    `${username.value}/${canvasName.value}`,
  )

  if (error) return console.error(error)

  // Add fabric objects from DB to canvas
  canvas.loadFromJSON(
    JSON.stringify(data),
    canvas.renderAll.bind(canvas),
    (_loadedObject, fabricObject) => {
      // loadedObject is object from DB
      // fabricObject is object from loadedObject
      addPopertiesToFabricObject(fabricObject)
    },
  )

  isLoadedCanvas.value = true
}

const getCanvasJSON = () => {
  const canvasJSON = canvas.toJSON(['item'])
  canvasJSON.objects = canvasJSON.objects.map(obj => {
    if (obj.type === 'image') return obj
    obj.fill = statusColors.OFF
    obj.stroke = statusColors.DISCONNECTED
    return obj
  })
  return canvasJSON
}

const saveCanvas = async () => {
  const canvasJSON = getCanvasJSON()
  await addFloorPlan({
    email: username.value,
    item: canvasJSON,
    name: canvasName.value,
  })
  getCanvasList()
}

const updateCanvas = async () => {
  const canvasJSON = getCanvasJSON()
  await updateFloorPlan({
    email: username.value,
    item: canvasJSON,
    name: canvasName.value,
  })
  getCanvasList()
}

watch(
  () => props.data,
  newValue => {
    if (newValue.room) {
      canvas.getObjects().forEach(obj => {
        const itemObj = obj.get('item')
        if (!itemObj) return
        if (newValue.room === 'Admin' && itemObj.room === 'Admin') {
          obj.set('fill', statusColors.ON)
          obj.set('stroke', statusColors.CONNECTED)
        }
        if (newValue.room === 'Exam' && itemObj.room === 'Exam') {
          obj.set('fill', statusColors.ON)
          obj.set('stroke', statusColors.CONNECTED)
        }
        if (newValue.room === 'ER' && itemObj.room === 'ER') {
          obj.set(
            'fill',
            newValue.status === '0' ? statusColors.ON : statusColors.OFF,
          )
          obj.set('stroke', statusColors.CONNECTED)
        }
        if (
          newValue.room === 'Consulting 1' &&
          itemObj.room === 'Consulting 1'
        ) {
          obj.set(
            'fill',
            newValue.status_cr1 === '1' ? statusColors.ON : statusColors.OFF,
          )
          obj.set('stroke', statusColors.CONNECTED)
        }
        if (
          newValue.room === 'Consulting 2' &&
          itemObj.room === 'Consulting 2'
        ) {
          obj.set(
            'fill',
            newValue.status_cr2 === '1' ? statusColors.ON : statusColors.OFF,
          )
          obj.set('stroke', statusColors.CONNECTED)
        }
        if (newValue.room === 'Staff' && itemObj.room === 'Staff') {
          if (newValue.fire_status === '0') {
            obj.set('fill', statusColors.ON)
          } else {
            obj.set('fill', statusColors.DANGER)
          }
          obj.set('stroke', statusColors.CONNECTED)
        }
        if (newValue.room === 'Patient' && itemObj.room === 'Patient') {
          obj.set(
            'fill',
            newValue.status === '1' ? statusColors.ON : statusColors.OFF,
          )
          obj.set('stroke', statusColors.CONNECTED)
        }
        if (newValue.room === 'Cafe' && itemObj.room === 'Cafe') {
          obj.set(
            'fill',
            newValue.status === '1' ? statusColors.ON : statusColors.OFF,
          )
          obj.set('stroke', statusColors.CONNECTED)
        }
        if (newValue.room === 'Medical' && itemObj.room === 'Medical') {
          obj.set('fill', statusColors.ON)
          obj.set('stroke', statusColors.CONNECTED)
          setTimeout(() => {
            obj.set('fill', statusColors.OFF)
          }, 2000)
        }
        canvas.renderAll()
      })
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="mb-4 flex justify-content-between">
    <div>
      <Button label="New Plan" @click="newCanvas" />
      <Button class="ml-4" label="Load Plan" @click="isNewCanvas = false" />
    </div>
    <div>
      <Button
        :label="editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'"
        class="p-button-outlined"
        @click="toggleEditMode"
      />
    </div>
  </div>
  <div v-show="!isNewCanvas" class="mb-4">
    <Dropdown
      v-model="canvasName"
      :options="canvasList"
      placeholder="Select Floor Plan"
    />
    <Button class="ml-4 p-button-outlined" label="Load" @click="loadCanvas" />
    <Button
      class="ml-4"
      label="Update"
      :disabled="!isLoadedCanvas"
      @click="updateCanvas"
    />
  </div>
  <div v-show="isNewCanvas" class="mb-4 p-inputgroup">
    <Button label="Add Floor Plan" @click="addImage" />
    <InputText v-model="floorPlan" />
  </div>
  <div class="mb-4 flex justify-content-between">
    <div>
      <Dropdown
        v-model="selectedItem"
        :options="roomList"
        option-label="room"
        placeholder="Select Item"
        :disabled="!editMode"
      />
      <Button
        v-show="!isSelectedObject"
        class="ml-4"
        label="Add"
        :disabled="!editMode || !isSelectedItem"
        @click="addObject"
      />
      <Button
        v-show="isSelectedObject"
        class="ml-4"
        label="Save"
        :disabled="!editMode"
        @click="changeObject"
      />
      <Button
        v-show="isSelectedObject"
        class="ml-4 p-button-outlined"
        label="Delete"
        :disabled="!editMode"
        @click="removeActiveObject"
      />
    </div>
    <div v-show="isNewCanvas" class="p-inputgroup w-5">
      <InputText v-model="canvasName" placeholder="Floor plan name" />
      <Button label="Save" @click="saveCanvas" />
    </div>
  </div>

  <canvas ref="canvasEl" width="800" height="600"></canvas>
</template>
