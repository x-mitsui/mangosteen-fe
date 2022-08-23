import { RouterLink } from 'vue-router'

import { WelcomeFooter } from './WelcomeFooter'
const slots = {
  buttons: () => (
    <>
      <RouterLink to="/welcome/3">下一页</RouterLink>
      <RouterLink to="/start">跳过</RouterLink>
    </>
  )
}
export const P2Footer = () => <WelcomeFooter v-slots={slots}></WelcomeFooter>
