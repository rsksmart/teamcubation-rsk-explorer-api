"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.txPoolRepository = void 0;const txPoolRepository = {
  findOne(query = {}, project = {}, collection) {
    return collection.findOne(query, project);
  },
  find(query = {}, project = {}, collection, sort = {}, limit = 0, isArray = true) {
    if (isArray) {
      return collection.
      find(query, project).
      sort(sort).
      limit(limit).
      toArray();
    } else {
      return collection.
      find(query, project).
      sort(sort).
      limit(limit);
    }
  },
  countDocuments(query = {}, collection) {
    return collection.countDocuments(query);
  },
  aggregate(aggregate, collection) {
    return collection.aggregate(aggregate).toArray();
  },
  insertOne(data, collection) {
    return collection.insertOne(data);
  } };exports.txPoolRepository = txPoolRepository;