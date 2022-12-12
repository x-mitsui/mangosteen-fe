import { defineStore } from 'pinia'
import { AxiosResponse } from 'axios'
import { http } from '../shared/Http'

type StateType = {
  me: undefined | { id: string }
  mePromise: undefined | Promise<AxiosResponse<{ resource: { id: string } }>>
}
type ActionType = {
  refreshMe: () => Promise<AxiosResponse<{ resource: { id: string } }>>
  fetchMe: () => void
}
export const useMeStore = defineStore<string, StateType, {}, ActionType>('me', {
  state: () => ({
    me: undefined,
    mePromise: undefined
  }),
  actions: {
    refreshMe() {
      this.mePromise = http.get<{ resource: { id: string } }>('/me')
      return this.mePromise
    },
    fetchMe() {
      return this.refreshMe()
    }
  }
})
