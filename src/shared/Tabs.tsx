import { defineComponent, onMounted, PropType } from 'vue'
import s from './Tabs.module.scss'
export const Tabs = defineComponent({
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
  setup(props, context) {
    // if (context.slots.default === undefined) {
    //   return () => null
    // }
    // const vDoms = context.slots.default()
    // vDoms?.forEach((vDom) => {
    //   console.log(typeof Tab)
    //   console.log(typeof vDom.type)
    //   console.log(vDom.type === Tab)
    //   if (vDom.type !== Tab) {
    //     throw new Error('Tabs组件必须使用Tab组件')
    //   }
    // })

    return () => (
      <div class={s.wrapper}>
        <ul class={s.list}>
          {context.slots.default?.()?.map((vDom, index) => {
            return (
              <li
                key={index}
                class={[props.selected === vDom.props?.name && s.bgColor, s.item]}
                onClick={() => {
                  console.log(vDom.props?.name)

                  props.onUpdateValue?.(vDom.props?.name)
                }}
              >
                {vDom}
              </li>
            )
          })}
        </ul>
      </div>
    )
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
