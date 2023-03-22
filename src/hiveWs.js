import createHiveWS from '@norniras/hive-agent/ws'

export const hiveWS = createHiveWS({
  type: 'string',
  token: 'yours_token',
  rootDomain: 'example.com',
  ghostAddress: 'domain/service/ghostID',
})
