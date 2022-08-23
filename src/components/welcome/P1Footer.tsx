import { RouterLink } from 'vue-router'

import { WelcomeFooter } from './WelcomeFooter'
const slots = {
  buttons: () => (
    <>
      <RouterLink to="/welcome/2">下一页</RouterLink>
      <RouterLink to="/start">跳过</RouterLink>
    </>
  )
}
export const P1Footer = () => <WelcomeFooter v-slots={slots}></WelcomeFooter>
