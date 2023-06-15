import { prismaClient } from '../lib/Setup'
import {rawTxPoolToEntity} from '../converters/txPending.converters'
import {generateFindQuery} from './utils'

const txPoolRelatedTables = { transaction_in_pool: true }

export const txPoolRepository = {
  async findOne (query = {}, project = {}) {
    const txPool = await prismaClient.txpool.findFirst(generateFindQuery(query, project, txPoolRelatedTables, { id: -1 }))

    if (txPool) {
      txPool.txs = [...txPool.transaction_in_pool]
      delete txPool.transaction_in_pool

      txPool._id = txPool.id
      delete txPool.id

      txPool.timestamp = Number(txPool.timestamp)
    }

    return txPool
  },
  async find (query = {}, project = {}, sort = {}, limit = 0, isArray = true) {
    let txPools = await prismaClient.txpool.findMany(generateFindQuery(query, project, txPoolRelatedTables, { timestamp: -1 }, limit))

    txPools = txPools.map(txPool => {
      txPool.txs = [...txPool.transaction_in_pool]
      delete txPool.transaction_in_pool

      txPool._id = txPool.id
      delete txPool.id

      txPool.timestamp = Number(txPool.timestamp)

      return txPool
    })

    return txPools
  },
  async insertOne (data) {
    const txpool = await prismaClient.txpool.create({data: rawTxPoolToEntity(data)})

    return txpool
  }
}
