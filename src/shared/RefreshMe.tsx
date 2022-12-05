import { AxiosResponse } from 'axios'
import { http } from './Http'

export let mePromise: Promise<AxiosResponse<{ resource: { id: string } }, any>> | undefined

export const refreshMe = () => {
  mePromise = http.get<{ resource: { id: string } }>('/me')
  return mePromise
}

export const fetchMe = refreshMe
