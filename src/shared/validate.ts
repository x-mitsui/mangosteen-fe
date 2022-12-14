interface FormData {
  [k: string]: JSONValue
}
type Rule<T extends FormData> = {
  key: keyof T
  message: string
} & (
  | { type: 'required' }
  | { type: 'pattern'; reg: RegExp }
  | { type: 'notEqual'; value: JSONValue }
  | { type: 'ArrayNotEmpty' }
)
type Rules<T extends FormData> = Rule<T>[]

const validate = <T extends FormData>(formData: T, rules: Rules<T>) => {
  type ErrorType = {
    [k in keyof T]?: string[]
  }
  const errors: ErrorType = {}
  rules.forEach((rule) => {
    const { key, message, type } = rule
    const value = formData[key]
    switch (type) {
      case 'required':
        if (!value) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      case 'pattern':
        // 这里ts推测错误，这里断言value非空
        if (!isEmpty(value) && !rule.reg.test(value!.toString())) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      case 'notEqual':
        if (isEmpty(value) || value === rule.value) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
      case 'ArrayNotEmpty':
        if (!Array.isArray(value) || value.length === 0) {
          errors[key] = errors[key] ?? []
          errors[key]?.push(message)
        }
        break
    }
  })
  return errors
}
const isEmpty = (value: JSONValue) => {
  return value === '' || value === null || value === undefined
}
const hasError = (errors: Record<string, string[]>) => {
  for (let item of Object.values(errors)) {
    if (item.length != 0) {
      return true
    }
  }
  return false
}
export type { Rules, Rule }
export { validate, hasError }
