import { faker } from '@faker-js/faker'
import { AxiosRequestConfig } from 'axios'

type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN')

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
const createId = () => {
  return id++
}
export const mockTagIndex: Mock = (config) => {
  let { kind, page } = config.params
  page = page || 1

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

export const mockItemIndexBalance: Mock = (config) => {
  return [
    200,
    {
      expenses: 9900,
      income: 9900,
      balance: 0
    }
  ]
}

export const mockItemIndex: Mock = (config) => {
  const { kind, page } = config.params
  const per_page = 25
  const count = 26
  const createPaper = (page = 1) => ({
    page,
    per_page,
    count
  })
  const createTag = (attrs?: any) => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind: 'expenses',
    ...attrs
  })
  const createItem = (n = 1, attrs?: any) =>
    Array.from({ length: n }).map(() => ({
      id: createId(),
      user_id: createId(),
      amount: Math.floor(Math.random() * 10000),
      tags_id: [createId()],
      tags: [createTag()],
      happened_at: faker.date.past().toISOString(),
      kind
    }))
  const createBody = (n = 1, attrs?: any) => ({
    resources: createItem(n),
    pager: createPaper(page)
  })
  if (!page || page === 1) {
    return [200, createBody(25)]
  } else if (page === 2) {
    return [200, createBody(1)]
  } else {
    return [200, {}]
  }
}

export const mockItemSummary: Mock = (config) => {
  const { group_by, kind } = config.params
  if (group_by === 'happened_at' && kind === 'expenses') {
    return [
      200,
      {
        groups: [
          { happened_at: '2022-12-18T00:00:00.000Z', amount: 100 },
          { happened_at: '2022-12-22T00:00:00.000Z', amount: 300 },
          { happened_at: '2022-12-29T00:00:00.000Z', amount: 200 }
        ],
        summary: 600
      }
    ]
  } else if (group_by === 'happened_at' && kind === 'income') {
    return [
      200,
      {
        groups: [
          { happened_at: '2022-12-08T00:00:00.000Z', amount: 100 },
          { happened_at: '2022-12-12T00:00:00.000Z', amount: 300 },
          { happened_at: '2022-12-19T00:00:00.000Z', amount: 200 }
        ],
        summary: 600
      }
    ]
  } else if (group_by === 'tag_id' && kind === 'expenses') {
    return [
      200,
      {
        groups: [
          { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 100 },
          { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
          { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
        ],
        summary: 600
      }
    ]
  } else {
    return [
      200,
      {
        groups: [
          { tag_id: 1, tag: { id: 1, name: '交通', sign: faker.internet.emoji() }, amount: 400 },
          { tag_id: 2, tag: { id: 2, name: '吃饭', sign: faker.internet.emoji() }, amount: 300 },
          { tag_id: 3, tag: { id: 3, name: '购物', sign: faker.internet.emoji() }, amount: 200 }
        ],
        summary: 900
      }
    ]
  }
}
