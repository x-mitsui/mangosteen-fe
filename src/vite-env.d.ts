/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>

type Tag = {
  id: number
  user_id: number
  name: string
  sign: string
  kind: 'expense' | 'income'
  delete_at: string | null
}

type Resources<T = any> = {
  resources: T
  pager: {
    page: number
    per_page: number
    count: number
  }
}

type Resource<T = any> = {
  resource: T
}

type ResourceError<T = any> = {
  errors: Record<string, string[]>
}

type ItemKind = 'expenses' | 'income'
type Item = {
  tags_id: number[]
  tags?: Tag[]
  happened_at: string
  amount: number
  kind: ItemKind
}

type User = {
  id: number;
  email: string;
}
