// Custom API are features that are missing inside the Hive v1.
import { CUSTOM_API } from '@/config'

const request = async ({ path, method, body }) => {
  try {
    const res = await fetch(`${CUSTOM_API}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    const data = await res.json()

    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const fetchReadAccessGhosts = async params => {
  return await request({
    path: `/read-access/${params}`,
    method: 'GET',
  })
}

export const addReadAccessGhost = async params => {
  return await request({
    path: `/read-access/add`,
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const removeReadAccessGhost = async params => {
  return await request({
    path: `/read-access/remove`,
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const fetchFloorPlanList = async params => {
  return await request({
    path: `/floor-plan/list/${params}`,
    method: 'GET',
  })
}

export const fetchFloorPlanByName = async params => {
  return await request({
    path: `/floor-plan/${params}`,
    method: 'GET',
  })
}

export const addFloorPlan = async params => {
  return await request({
    path: `/floor-plan/add`,
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const updateFloorPlan = async params => {
  return await request({
    path: `/floor-plan/update`,
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const removeFloorPlan = async params => {
  return await request({
    path: `/floor-plan/remove`,
    method: 'POST',
    body: JSON.stringify(params),
  })
}
