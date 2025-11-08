export async function fetchEntitlements(): Promise<{ active: string[]; managementUrl?: string }> {
  const res = await fetch('/api/rc/customer', {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) return { active: [] }
  return res.json()
}


