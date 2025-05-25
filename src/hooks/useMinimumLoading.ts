import { useState, useEffect } from 'react'

export function useMinimumLoading<T>(
  loadFn: () => Promise<T>,
  minDelay = 1000,
): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const start = Date.now()

      const result = await loadFn()

      const elapsed = Date.now() - start
      const remainingDelay = Math.max(minDelay - elapsed, 0)

      if (remainingDelay > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingDelay))
      }

      setData(result)
      setLoading(false)
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    load()
  }, [loadFn, minDelay])

  return { data, loading }
}
