import { defineComponent, PropType } from 'vue'
import { Icon } from './Icon'
import s from './Overlay.module.scss'
export const Overlay = defineComponent({
  props: {
    setOverlay: {
      type: Function as PropType<(e: MouseEvent) => void>
    }
  },
  setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <div class={s.showPage}>
          <section>
            <span class={s.up}>未登录用户</span>
            <span class={s.down}>点击这里登录</span>
          </section>
          <ul class={s.funcList}>
            <li class={s.item}>
              <Icon name="charts"></Icon>
              <span>统计图表</span>
            </li>
            <li class={s.item}>
              <Icon name="export"></Icon>
              <span>导出数据</span>
            </li>
            <li class={s.item}>
              <Icon name="notify"></Icon>
              <span>记账提醒</span>
            </li>
          </ul>
        </div>
        <div class={s.mask} onClick={props.setOverlay}></div>
      </div>
    )
  }
})
