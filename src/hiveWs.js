import createHiveWS from '@norniras/hive-agent/ws'
import { useHiveUserStore } from './hiveUserStore.js'

const userStore = useHiveUserStore()

const hiveWS = createHiveWS({
  type: 'channel',
  token: userStore.token,
  rootDomain: 'cioty.com',
  ghostAddress: 'demohouse/ui/1',
})

export default hiveWS
