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

export const mockTagIndex: Mock = (config) => {
  const { kind } = config.params
  let id = 0
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

  return [
    200,
    {
      resources: config.params.kind === 'expenses' ? createTags(7) : createTags(20)
    }
  ]
}
