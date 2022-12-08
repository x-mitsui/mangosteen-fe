import { defineComponent, onMounted, PropType } from 'vue'
import s from './Tabs.module.scss'
export const Tabs = defineComponent({
  name: 'Tab',
  props: {
    selected: {
      type: String,
      required: false
    },
    classPrefix: {
      type: String,
      default: ''
    },
    chooseHardRender: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    return () => {
      const tabs = context.slots.default?.()
      const { classPrefix } = props
      if (!tabs) {
        return () => null
      }
      tabs?.forEach((tab) => {
        // console.log(typeof Tab)
        // console.log(typeof tab.type)
        // console.log(tab.type === Tab)
        if (tab.type !== Tab) {
          throw new Error('Tabs组件必须使用Tab组件')
        }
      })

      return (
        <div class={s.wrapper}>
          <ul class={[s.tabs_nav, classPrefix + '_tabs_nav']}>
            {tabs?.map((tab, index) => {
              return (
                <li
                  key={index}
                  class={[
                    props.selected === tab.props?.name && s.bgColor,
                    [s.tabs_nav_item, classPrefix + '_tabs_nav_item']
                  ]}
                  onClick={() => {
                    // console.log(tab.props?.name)
                    context.emit('update:selected', tab.props?.name)
                  }}
                >
                  {tab.props?.name}
                </li>
              )
            })}
          </ul>
          {props.chooseHardRender ? (
            <div key={props.selected}>{tabs.find((tab) => props.selected === tab.props?.name)}</div>
          ) : (
            tabs.map((tab) => <tab v-show={props.selected === tab.props?.name} />)
          )}
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
