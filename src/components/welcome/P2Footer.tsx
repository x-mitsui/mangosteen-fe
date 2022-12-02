import { RouterLink } from 'vue-router'
import { SkipFeature } from '../../shared/SkipFeature'

import { WelcomeFooter } from './WelcomeFooter'
const slots = {
  buttons: () => (
    <>
      <RouterLink to="/welcome/3">下一页</RouterLink>
      <SkipFeature />
    </>
  )
}
export const P2Footer = () => <WelcomeFooter v-slots={slots}></WelcomeFooter>
P2Footer.displayName = 'P2Footer'
