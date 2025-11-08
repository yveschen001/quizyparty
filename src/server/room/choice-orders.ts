export type ChoiceOrders = Map<number, Map<string, string[]>>

function shuffleArray(source: string[]): string[] {
  const arr = source.slice()
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr
}

export function initChoiceOrders(): ChoiceOrders {
  return new Map<number, Map<string, string[]>>()
}

export function getOrCreateChoiceOrder(
  orders: ChoiceOrders,
  qIndex: number,
  memberId: string,
  baseChoices: string[]
): string[] {
  let questionOrders = orders.get(qIndex)
  if (!questionOrders) {
    questionOrders = new Map<string, string[]>()
    orders.set(qIndex, questionOrders)
  }

  const existing = questionOrders.get(memberId)
  if (existing && existing.length === baseChoices.length) {
    return existing.slice()
  }

  const newOrder = shuffleArray(baseChoices)
  questionOrders.set(memberId, newOrder)
  return newOrder.slice()
}

export function serializeChoiceOrders(orders: ChoiceOrders): Record<string, Record<string, string[]>> {
  const result: Record<string, Record<string, string[]>> = {}
  orders.forEach((userMap, qIndex) => {
    const users: Record<string, string[]> = {}
    userMap.forEach((choices, userId) => {
      users[userId] = choices.slice()
    })
    result[String(qIndex)] = users
  })
  return result
}

export function deserializeChoiceOrders(raw: any): ChoiceOrders {
  const orders = initChoiceOrders()
  if (!raw || typeof raw !== 'object') return orders
  Object.keys(raw).forEach((qIndexKey) => {
    const userObj = raw[qIndexKey]
    if (!userObj || typeof userObj !== 'object') return
    const userMap = new Map<string, string[]>()
    Object.keys(userObj).forEach((userId) => {
      const arr = Array.isArray(userObj[userId]) ? userObj[userId].map((c: any) => String(c)) : []
      userMap.set(userId, arr)
    })
    orders.set(Number(qIndexKey), userMap)
  })
  return orders
}

