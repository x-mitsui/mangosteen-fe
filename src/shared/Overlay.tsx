import { Dialog } from 'vant'
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { router } from '../router'
import { http } from './Http'
import { Icon } from './Icon'
import s from './Overlay.module.scss'
export const Overlay = defineComponent({
  name: 'Overlay',
  props: {
    setOverlay: {
      type: Function as PropType<(e: MouseEvent) => void>
    }
  },
  setup(props, context) {
    const refMe = ref<User>()
    onMounted(async () => {
      const response = await http.get<Resource<User>>('/me')
      refMe.value = response.data.resource
    })
    const onSignOut = async () => {
      await Dialog.confirm({
        title: '确认',
        message: '你真的要退出登录吗？'
      })
      localStorage.removeItem('jwt')
      router.push('/sign_in?return_to=' + route.path)
    }
    const route = useRoute()
    return () => (
      <div class={s.wrapper}>
        <div class={s.showPage}>
          <h2>{route.fullPath}</h2>
          <section>
            {refMe.value ? (
              <div>
                <h2>{refMe.value.email}</h2>
                <p onClick={onSignOut}>点击这里退出登录</p>
              </div>
            ) : (
              <RouterLink to={'/sign_in?return_to=' + route.path}>
                <span class={s.up}>未登录用户</span>
                <span class={s.down}>点击这里登录</span>
              </RouterLink>
            )}
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

export const OverlayIcon = defineComponent({
  name: 'OverlayIcon',
  props: {
    kclass: String
  },
  emits: ['update:model-IsShowOverlay'],
  setup(props, context) {
    const refIsShowOverlay = ref(false)
    const setOverlay = () => {
      console.log('setOverlay')
      refIsShowOverlay.value = !refIsShowOverlay.value
    }
    return () => (
      <>
        <Icon name="menu" class={props.kclass} onClick={setOverlay} />
        {refIsShowOverlay.value && <Overlay setOverlay={setOverlay} />}
      </>
    )
  }
})
