import { sqliteQuestionStore, sqliteQuestionSetStore } from './sqlite'
import { memoryQuestionStore, memoryQuestionSetStore } from './memory'
import type { QuestionStore, QuestionSetStore } from './types'

let _questionStore: QuestionStore | null = null
let _questionSetStore: QuestionSetStore | null = null

export function questionStore(): QuestionStore {
  if (_questionStore) return _questionStore
  const dbPath = process.env.QP_SQLITE_PATH
  _questionStore = dbPath ? sqliteQuestionStore(dbPath) : memoryQuestionStore()
  return _questionStore
}

export function questionSetStore(): QuestionSetStore {
  if (_questionSetStore) return _questionSetStore
  const dbPath = process.env.QP_SQLITE_PATH
  _questionSetStore = dbPath ? sqliteQuestionSetStore(dbPath) : memoryQuestionSetStore()
  return _questionSetStore
}

export * from './types'
export * from './util'

