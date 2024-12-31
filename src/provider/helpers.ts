import { Provider } from './interface'

export function isProvider(provider: unknown): provider is Provider {
  return (
    typeof provider === 'object' && provider !== null && 'callSC' in provider
  )
}
