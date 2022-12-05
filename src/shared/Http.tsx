import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { router } from '../router'
import { mockIsOn, mockSession, mockMe, mockTagIndex } from '../mock/mock'
type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    })
  }
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'get' })
  }
  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'post' })
  }
  patch<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PatchConfig) {
    return this.instance.request<R>({ ...config, url, data, method: 'patch' })
  }
  delete<R = unknown>(url: string, query?: Record<string, string>, config?: DeleteConfig) {
    return this.instance.request<R>({ ...config, url: url, params: query, method: 'delete' })
  }
}

const mock = (response: AxiosResponse) => {
  if (
    location.hostname !== 'localhost' &&
    location.hostname !== '127.0.0.1' &&
    location.hostname !== '192.168.1.103' &&
    location.hostname !== '192.168.1.4'
  ) {
    return false
  }
  switch (response.config?.params?._mock) {
    // case 'itemCreate':
    //   ;[response.status, response.data] = mockItemCreate(response.config)
    //   return true
    // case 'itemIndex':
    //   ;[response.status, response.data] = mockItemIndex(response.config)
    //   return true
    // case 'tagCreate':
    //   ;[response.status, response.data] = mockTagCreate(response.config)
    case 'session':
      ;[response.status, response.data] = mockSession(response.config)
      return true
    case 'me':
      ;[response.status, response.data] = mockMe(response.config)
      return true
    case 'tagIndex':
      ;[response.status, response.data] = mockTagIndex(response.config)
      return true
  }
  return false
}

export const http = new Http('/api/v1')
http.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  return config
})
if (mockIsOn) {
  // 利用类似中间件的思维
  http.instance.interceptors.response.use(
    (response) => {
      mock(response)
      return response
    },
    (error) => {
      if (mock(error.response)) {
        return error.response
      } else {
        throw error
      }
    }
  )
}

http.instance.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    // 报错原因有很多种，比如说语法错误，断网等等，但如果有response字段肯定就是正常响应错误
    if (err.response) {
      const axiosError = err as AxiosError
      if (axiosError.response?.status === 429) {
        alert('请求太频繁了')
      }
      if (axiosError.response?.status === 401) {
        router.replace('/sign_in')
      }
    }
    // 这一句不能删除，因为这个err可能是其它类型的err，或者状态码有遗漏。
    // 一旦删除这句，那对外部来说，代表你对此err做了处理了，但实际上你没做处理或者直接认为这次请求是成功的
    // 所以你没做处理，就应该暴露出去
    throw err
    // return Promise.reject(err)
  }
)
