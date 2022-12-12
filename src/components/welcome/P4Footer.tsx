import { RouterLink } from 'vue-router'
import { SkipFeature } from '../../shared/SkipFeature'

import { WelcomeFooter } from './WelcomeFooter'
const slots = {
  buttons: () => (
    <>
      <span
        onClick={() => {
          localStorage.setItem('skip', 'yes')
        }}
      >
        <RouterLink to="/item">完成</RouterLink>
      </span>

      <SkipFeature style="visibility:hidden" />
    </>
  )
}
export const P4Footer = () => <WelcomeFooter v-slots={slots}></WelcomeFooter>
P4Footer.displayName = 'P4Footer'
