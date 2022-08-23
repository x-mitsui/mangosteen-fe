import { RouterLink } from 'vue-router'

import { WelcomeFooter } from './WelcomeFooter'
const slots = {
  buttons: () => (
    <>
      <RouterLink to="/start">完成</RouterLink>
      <RouterLink to="/start" style="visibility:hidden">
        跳过
      </RouterLink>
    </>
  )
}
export const P4Footer = () => <WelcomeFooter v-slots={slots}></WelcomeFooter>
P4Footer.displayName = 'P4Footer'
