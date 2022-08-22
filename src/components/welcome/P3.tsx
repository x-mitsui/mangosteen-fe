import s from './WelcomeLayout.module.scss'
import chart from '../../assets/icons/chart.svg'
import { RouterLink } from 'vue-router'

import { WelcomeLayout } from './WelcomeLayout'
const slots = {
  img: () => <img src={chart} alt="show" class={s.showImg} />,
  title1: () => <h2>数据可视化</h2>,
  title2: () => <h2>收支一目了然</h2>,
  buttons: () => (
    <>
      <RouterLink to="/welcome/4">下一页</RouterLink>
      <RouterLink to="/start">跳过</RouterLink>
    </>
  )
}
export const P3 = () => <WelcomeLayout v-slots={slots}></WelcomeLayout>
