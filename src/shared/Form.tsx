import { computed, defineComponent, PropType, ref } from 'vue'
import { emojiTable } from '../components/tag/emoji/EmojiTable'
import { EmojiSelected } from '../components/tag/EmojiSelected'
import { Button } from './Button'
import { DateSelector } from './DateSelector'
import s from './Form.module.scss'
import { Time } from './time'
type KindType = 'text' | 'emojiSelected' | 'date' | 'validationCode' | 'select' | undefined
export const FormItem = defineComponent({
  name: 'FormItem',
  props: {
    kind: { type: String as PropType<KindType> },
    label: { type: String as PropType<string> },
    modelValue: [Object, String] as PropType<string | InstanceType<typeof Time>>,
    errors: { type: String as PropType<string>, default: '　' },
    placeholder: String,
    options: Array as PropType<Array<{ value: string; text: string }>>,
    onClick: { type: Function as PropType<(e: Event) => void> },
    timeFrom: { type: Number as PropType<number>, default: 60 }
  },
  setup(props, context) {
    const timer = ref<number>(0)
    // console.log(props.timeFrom)
    const count = ref<number>(props.timeFrom)
    const isCounting = computed(() => !!timer.value)
    const sendCodeClick = () => {
      props.onClick?.()
      timer.value = setInterval(() => {
        count.value--
        if (count.value === 0) {
          clearInterval(timer.value)
          timer.value = 0
        }
      }, 1000)
    }
    const content = (kind: KindType) => {
      switch (kind) {
        case 'text':
          return (
            <input
              type="text"
              class={s.formInput}
              placeholder="2到4个汉字"
              value={props.modelValue}
              onInput={(e: any) => {
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
              <Button
                disabled={isCounting.value}
                class={[s.validationCodeButton]}
                onClick={sendCodeClick}
              >
                {isCounting.value ? `${count.value}秒后可再发送` : '发送验证码'}
              </Button>
            </div>
          )
        case 'select':
          return (
            <select
              class={s.select}
              value={props.modelValue}
              onChange={(e: any) => {
                context.emit('update:modelValue', e.target.value)
              }}
            >
              {props.options?.map((option) => (
                <option value={option.value}>{option.text}</option>
              ))}
            </select>
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
