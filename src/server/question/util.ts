import type { Question } from './types'

/**
 * 隨機打亂答案選項順序
 * 返回打亂後的選項和正確答案的新索引位置
 */
export function shuffleChoices(question: Question): {
  shuffledChoices: string[]
  correctAnswerIndex: number
} {
  const choices = [...question.choices]
  const correctAnswer = question.correctAnswer
  
  // 找到正確答案的原始索引
  const originalIndex = choices.findIndex(c => c === correctAnswer)
  
  // Fisher-Yates 洗牌算法
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]]
  }
  
  // 找到打亂後的正確答案索引
  const correctAnswerIndex = choices.findIndex(c => c === correctAnswer)
  
  return {
    shuffledChoices: choices,
    correctAnswerIndex,
  }
}

/**
 * 驗證用戶選擇是否正確
 */
export function validateAnswer(question: Question, userChoice: string): boolean {
  return question.correctAnswer === userChoice
}

