import s from './WelcomeLayout.module.scss'
import cloud from '../../assets/icons/cloud.svg'
import { RouterLink } from 'vue-router'

import { WelcomeLayout } from './WelcomeLayout'
const slots = {
  img: () => <img src={cloud} alt="show" class={s.showImg} />,
  title1: () => <h2>云备份</h2>,
  title2: () => <h2>再也不怕数据丢失</h2>,
  buttons: () => (
    <>
      <RouterLink to="/welcome/4" style="visibility:hidden">
        下一页
      </RouterLink>
      <RouterLink to="/start">跳过</RouterLink>
    </>
  )
}
export const P4 = () => <WelcomeLayout v-slots={slots}></WelcomeLayout>
