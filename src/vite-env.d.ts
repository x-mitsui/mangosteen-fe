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
