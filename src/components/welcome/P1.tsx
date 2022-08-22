import s from './WelcomeLayout.module.scss'
import pig from '../../assets/icons/pig.svg'
import { RouterLink } from 'vue-router'

import { WelcomeLayout } from './WelcomeLayout'
const slots = {
  img: () => <img src={pig} alt="showPng" class={s.pig} />,
  title1: () => <h2>会挣钱</h2>,
  title2: () => <h2>还要会省钱</h2>,
  buttons: () => (
    <>
      <RouterLink to="/welcome/2">下一页</RouterLink>
      <RouterLink to="/start">跳过</RouterLink>
    </>
  )
}
export const P1 = () => <WelcomeLayout v-slots={slots}></WelcomeLayout>
