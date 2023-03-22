import { HIVE_API } from './config'

const request = async ({ path, method, body }) => {
  try {
    const res = await fetch(`${HIVE_API}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    return await res.json()
  } catch (error) {
    return {
      data: null,
      error: false,
      message: error,
    }
  }
}

export const getToken = params => {
  return request({
    path: '/api/synxpass/user/token',
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const fetchServices = async params => {
  return await request({
    path: '/api/services',
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const updateService = async params => {
  return await request({
    path: '/api/services/update',
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const fetchGhosts = async params => {
  return await request({
    path: '/api/ghosts',
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const fetchGhostStatus = async params => {
  return await request({
    path: '/api/ghosts/status',
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const morphGhost = async params => {
  return await request({
    path: '/api/ghosts/morphed/add',
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const unmorphGhost = async params => {
  return await request({
    path: '/api/ghosts/morphed/remove',
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const giveReadAccess = async params => {
  return await request({
    path: '/api/ghosts/read-access/add',
    method: 'POST',
    body: JSON.stringify(params),
  })
}

export const removeReadAccess = async params => {
  return await request({
    path: '/api/ghosts/read-access/remove',
    method: 'POST',
    body: JSON.stringify(params),
  })
}
