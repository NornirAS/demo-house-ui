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
    path: '/api/user/token',
    method: 'POST',
    body: JSON.stringify(params),
  })
}
