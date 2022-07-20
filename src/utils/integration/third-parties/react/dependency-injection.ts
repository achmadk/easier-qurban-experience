import { useMemo } from 'react'
import { container } from 'inversify-hooks-esm'

export function useInject<Type = unknown>(identifier: string) {
  return useMemo(() => container.get<Type>(identifier), [identifier])
}