import s from './WelcomeLayout.module.scss'
import clock from '../../assets/icons/clock.svg'
import { RouterLink } from 'vue-router'

import { WelcomeLayout } from './WelcomeLayout'
const slots = {
  img: () => <img src={clock} alt="show" class={s.showImg} />,
  title1: () => <h2>每日提醒</h2>,
  title2: () => <h2>不会遗漏每一笔订单</h2>,
  buttons: () => (
    <>
      <RouterLink to="/welcome/3">下一页</RouterLink>
      <RouterLink to="/start">跳过</RouterLink>
    </>
  )
}
export const P2 = () => <WelcomeLayout v-slots={slots}></WelcomeLayout>
