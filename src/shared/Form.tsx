import { defineComponent, PropType } from 'vue'
import { emojiTable } from '../components/tag/emoji/EmojiTable'
import { EmojiSelected } from '../components/tag/EmojiSelected'
import s from './Form.module.scss'
type KindType = 'text' | 'emojiSelected' | 'date' | undefined
export const FormItem = defineComponent({
  name: 'FormItem',
  props: {
    kind: { type: String as PropType<KindType> },
    label: { type: String as PropType<string> },
    modelValue: { type: String as PropType<string> },
    errors: { type: String as PropType<string> }
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
          return <EmojiSelected emojiTable={emojiTable} v-model={props.modelValue} />
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
  setup(props, context) {
    return () => {
      const formItems = context.slots.default?.()

      if (!formItems) {
        return () => null
      }
      formItems?.forEach((formItem) => {
        if (formItem.type !== FormItem) {
          throw new Error('Form组件必须使用FormItem组件')
        }
      })
      return (
        <form class={s.wrapper}>
          {formItems?.map((formItem) => {
            return formItem
          })}
        </form>
      )
    }
  }
})
