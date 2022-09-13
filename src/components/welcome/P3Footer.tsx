import { RouterLink } from 'vue-router'

import { WelcomeFooter } from './WelcomeFooter'
const slots = {
  buttons: () => (
    <>
      <RouterLink to="/welcome/4">下一页</RouterLink>
      <RouterLink to="/start">跳过</RouterLink>
    </>
  )
}
export const P3Footer = () => <WelcomeFooter v-slots={slots}></WelcomeFooter>
P3Footer.displayName = 'P3Footer'