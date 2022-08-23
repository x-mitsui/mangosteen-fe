import { RouterLink } from 'vue-router'

import { WelcomeFooter } from './WelcomeFooter'
const slots = {
  buttons: () => (
    <>
      <RouterLink to="/start">下一页</RouterLink>
      <RouterLink to="/start" style="visibility:hidden">
        跳过
      </RouterLink>
    </>
  )
}
export const P4Footer = () => <WelcomeFooter v-slots={slots}></WelcomeFooter>
