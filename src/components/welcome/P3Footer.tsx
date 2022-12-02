import { RouterLink } from 'vue-router'
import { SkipFeature } from '../../shared/SkipFeature'

import { WelcomeFooter } from './WelcomeFooter'
const slots = {
  buttons: () => (
    <>
      <RouterLink to="/welcome/4">下一页</RouterLink>
      <SkipFeature />
    </>
  )
}
export const P3Footer = () => <WelcomeFooter v-slots={slots}></WelcomeFooter>
P3Footer.displayName = 'P3Footer'
