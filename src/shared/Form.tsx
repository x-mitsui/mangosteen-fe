import { defineComponent, PropType } from 'vue'
import { emojiTable } from '../components/tag/emoji/EmojiTable'
import { EmojiSelected } from '../components/tag/EmojiSelected'
import { Button } from './Button'
import { DateSelector } from './DateSelector'
import s from './Form.module.scss'
import { Time } from './time'
type KindType = 'text' | 'emojiSelected' | 'date' | 'validationCode' | undefined
export const FormItem = defineComponent({
  name: 'FormItem',
  props: {
    kind: { type: String as PropType<KindType> },
    label: { type: String as PropType<string> },
    modelValue: [Object, String] as PropType<string | InstanceType<typeof Time>>,
    errors: { type: String as PropType<string>, default: '　' },
    placeholder: String
  },
  setup(props, context) {
    const content = (kind: KindType) => {
      switch (kind) {
        case 'text':
          return (
            <input
              type="text"
              class={s.formInput}
              placeholder="2到4个汉字"
              value={props.modelValue}
              onUpdate:model-value={(e: any) => {
                context.emit('update:model-value', e.target.value)
              }}
            />
          )
        case 'emojiSelected':
          return (
            <EmojiSelected
              emojiTable={emojiTable}
              modelValue={props.modelValue?.toString()}
              onUpdate:model-value={(emojiItem: string) => {
                context.emit('update:model-value', emojiItem)
              }}
            />
          )
        case 'date':
          return (
            <DateSelector
              modelValue={props.modelValue as InstanceType<typeof Time>}
              onUpdate:model-value={(date: Date) => {
                // console.log(date)
                context.emit('update:model-value', date)
              }}
            ></DateSelector>
          )
        case 'validationCode':
          return (
            <div class={s.validationCodeWrap}>
              <input class={[s.formInput, s.validationCodeInput]} placeholder={props.placeholder} />
              <Button class={[s.validationCodeButton]}>发送验证码</Button>
            </div>
          )
        case undefined:
          return context.slots.default?.()
      }
    }
    return () => (
      <label class={s.label}>
        <span class={[s.formItem_name, props.kind === 'emojiSelected' && 'emoji-font-conf']}>
          {props.label}
        </span>
        <div class={s.formItem_value}>{content(props.kind)}</div>
        <div class={s.formItem_error}>{props.errors}</div>
      </label>
    )
  }
})
export const Form = defineComponent({
  name: 'Form',
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>
    }
  },
  setup(props, context) {
    return () => {
      const formItems = context.slots.default?.()

      // if (!formItems) {
      //   return () => null
      // }
      // formItems?.forEach((formItem) => {
      //   if (formItem.type !== FormItem) {
      //     throw new Error('Form组件必须使用FormItem组件')
      //   }
      // })
      return (
        <form onSubmit={props.onSubmit} class={s.wrapper}>
          {formItems}
        </form>
      )
    }
  }
})
