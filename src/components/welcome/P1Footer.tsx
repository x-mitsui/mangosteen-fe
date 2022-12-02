import { RouterLink } from 'vue-router'
import { SkipFeature } from '../../shared/SkipFeature'

import { WelcomeFooter } from './WelcomeFooter'
const slots = {
  buttons: () => (
    <>
      <RouterLink to="/welcome/2">下一页</RouterLink>
      <SkipFeature />
    </>
  )
}
export const P1Footer = () => <WelcomeFooter v-slots={slots}></WelcomeFooter>
P1Footer.displayName = 'P1Footer'
