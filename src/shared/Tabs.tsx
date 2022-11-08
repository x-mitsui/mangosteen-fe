import { defineComponent, onMounted, PropType } from 'vue'
import s from './Tabs.module.scss'
export const Tabs = defineComponent({
  name: 'Tab',
  props: {
    selected: {
      type: String,
      required: true
    },
    onUpdateValue: {
      type: Function as PropType<(val: string) => void>,
      required: true
    }
  },
  setup: (props, context) => {
    return () => {
      const tabs = context.slots.default?.()
      if (!tabs) {
        return () => null
      }
      tabs?.forEach((tab) => {
        console.log(typeof Tab)
        console.log(typeof tab.type)
        console.log(tab.type === Tab)
        if (tab.type !== Tab) {
          throw new Error('Tabs组件必须使用Tab组件')
        }
      })

      return (
        <div class={s.wrapper}>
          <ul class={s.list}>
            {tabs?.map((tab, index) => {
              return (
                <li
                  key={index}
                  class={[props.selected === tab.props?.name && s.bgColor, s.item]}
                  onClick={() => {
                    console.log(tab.props?.name)

                    props.onUpdateValue?.(tab.props?.name)
                  }}
                >
                  {tab.props?.name}
                </li>
              )
            })}
          </ul>
          <div>{tabs.find((tab) => props.selected === tab.props?.name)}</div>
        </div>
      )
    }
  }
})

export const Tab = defineComponent({
  props: {
    name: {
      type: String,
      requred: true
    }
  },
  setup(props, context) {
    return () => <div>{context.slots.default?.()}</div>
  }
})
