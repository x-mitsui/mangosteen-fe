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
  // return [
  //   422,
  //   {
  //     errors: {
  //       tags_id: ['标签id必填', '标签id不合法'],
  //       kind: ['类型必填', '类型不正确']
  //     }
  //   }
  // ]
  return [
    200,
    {
      resource: {
        id: 75,
        user_id: 35,
        amount: 9900,
        note: null,
        tags_id: [68, 69],
        happened_at: '2020-10-29T16:00:00.000Z',
        created_at: '2022-12-03T16:02:55.480Z',
        updated_at: '2022-12-03T16:02:55.480Z',
        kind: 'expenses'
      }
    }
  ]
}

export const mockTagCreate: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 86,
        user_id: 41,
        name: 'x',
        sign: 'x',
        delete_at: null,
        created_at: '2022-12-03T16:02:55.843Z',
        updated_at: '2022-12-03T16:02:55.843Z'
      }
    }
  ]
}

export const mockTagShow: Mock = (config) => {
  return [
    200,
    {
      resource: {
        id: 86,
        user_id: 41,
        name: 'xxx',
        sign: '😄',
        delete_at: null,
        created_at: '2022-12-03T16:02:55.843Z',
        updated_at: '2022-12-03T16:02:55.843Z'
      }
    }
  ]
}
