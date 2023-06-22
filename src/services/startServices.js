import Logger from '../lib/Logger'
import { liveSyncer } from './liveSyncer'
import { staticSyncer } from './staticSyncer'
import { txPool } from './txPool'

const log = Logger('explorer-services')

function main () {
  const syncStatus = {
    checkingDB: false,
    updatingTip: false,
    lastReceived: -1
  }

  log.info('Logger is working!!')

  liveSyncer({ syncStatus, log })
  staticSyncer({ syncStatus, log })
  txPool({ log })
}

main()
