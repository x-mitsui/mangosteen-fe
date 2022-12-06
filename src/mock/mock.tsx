import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'

type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN')

export const mockIsOn = true
export const mockSession: Mock = (config) => {
  return [
    200,
    {
      jwt: faker.random.word()
    }
  ]
}

export const mockMe: Mock = (config) => {
  return [
    200,
    {
      id: faker.random.numeric()
    }
  ]
}

let id = 0
export const mockTagIndex: Mock = (config) => {
  let { kind, page } = config.params
  page = page || 1
  const createId = () => {
    return id++
  }
  const createTags = (len = 1, attr?: any) => {
    return Array.from({ length: len }).map(() => ({
      id: createId(),
      name: faker.lorem.word(),
      sign: faker.internet.emoji(),
      kind,
      ...attr
    }))
  }
  if (kind === 'expenses' && (!page || page === 1)) {
    return [200, { resources: createTags(25), pager: { page: 1, per_page: 25, count: 26 } }]
  }
  if (kind === 'expenses' && page === 2) {
    return [200, { resources: createTags(1), pager: { page: 2, per_page: 25, count: 26 } }]
  }
  if (kind === 'income' && (!page || page === 1)) {
    return [200, { resources: createTags(25), pager: { page: 1, per_page: 25, count: 26 } }]
  }
  // if (kind === 'income' && page === 2) {
  return [200, { resources: createTags(1), pager: { page: 2, per_page: 25, count: 26 } }]
  // }
}

export const mockItemCreate: Mock = (config) => {
  return [
    422,
    {
      errors: {
        tags_id: ['标签id必填', '标签id不合法'],
        kind: ['类型必填', '类型不正确']
      }
    }
  ]
}
