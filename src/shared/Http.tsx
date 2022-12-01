import axios, { Axios, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>
class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    })
  }
  // 四个接口分别对应增删改查
  post<T = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, 'params' | 'method' | 'url'>
  ) {
    return this.instance.request<T>({
      url,
      data,
      method: 'post',
      ...config
    })
  }
  delete<T = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, 'params' | 'method' | 'url'>
  ) {
    return this.instance.request<T>({
      url,
      params: query,
      method: 'delete',
      ...config
    })
  }

  // put和patch选其一,put整体更新，patch局部更新，这里不做区分
  patch<T = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, 'params' | 'method' | 'url'>
  ) {
    return this.instance.request<T>({
      url,
      data,
      method: 'patch',
      ...config
    })
  }
  get<T>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, 'params' | 'method' | 'url'>
  ) {
    return this.instance.request<T>({
      url,
      method: 'get',
      params: query,
      ...config
    })
  }
}

export const http = new Http('/api/v1')
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
    }
    // 这一句不能删除，因为这个err可能是其它类型的err，或者状态码有遗漏。
    // 一旦删除这句，那对外部来说，代表你对此err做了处理了，但实际上你没做处理或者直接认为这次请求是成功的
    // 所以你没做处理，就应该暴露出去
    throw err
    // return Promise.reject(err)
  }
)
