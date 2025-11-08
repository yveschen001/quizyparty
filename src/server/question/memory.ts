import type { Question, QuestionSet, QuestionStore, QuestionSetStore } from './types'

const questions = new Map<string, Question>()
const questionSets = new Map<string, QuestionSet>()

export function memoryQuestionStore(): QuestionStore {
  return {
    create: (question: Question) => {
      questions.set(question.id, question)
    },

    get: (id: string) => {
      return questions.get(id) || null
    },

    getByUser: (userId: string, limit = 50, offset = 0) => {
      return Array.from(questions.values())
        .filter(q => q.userId === userId)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(offset, offset + limit)
    },

    getBySet: (setId: string) => {
      const set = questionSets.get(setId)
      if (!set) return []
      return set.questionIds
        .map(id => questions.get(id))
        .filter((q): q is Question => q !== undefined)
        .sort((a, b) => {
          // 按照 questionIds 的順序排序
          const aIndex = set.questionIds.indexOf(a.id)
          const bIndex = set.questionIds.indexOf(b.id)
          return aIndex - bIndex
        })
    },

    update: (id: string, updates: Partial<Question>) => {
      const question = questions.get(id)
      if (question) {
        Object.assign(question, updates, { updatedAt: Date.now() })
      }
    },

    delete: (id: string) => {
      questions.delete(id)
    },
  }
}

export function memoryQuestionSetStore(): QuestionSetStore {
  return {
    create: (set: QuestionSet) => {
      questionSets.set(set.id, set)
    },

    get: (id: string) => {
      return questionSets.get(id) || null
    },

    getByUser: (userId: string, limit = 50, offset = 0) => {
      return Array.from(questionSets.values())
        .filter(s => s.userId === userId)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(offset, offset + limit)
    },

    update: (id: string, updates: Partial<QuestionSet>) => {
      const set = questionSets.get(id)
      if (set) {
        Object.assign(set, updates, { updatedAt: Date.now() })
      }
    },

    delete: (id: string) => {
      questionSets.delete(id)
    },
  }
}

