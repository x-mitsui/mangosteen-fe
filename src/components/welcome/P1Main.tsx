import { WelcomeMain } from './WelcomeMain'
const slots = {
  img: () => (
    <svg role="img">
      <use xlinkHref="#pig" />
    </svg>
  ),
  title1: () => <h2>会挣钱</h2>,
  title2: () => <h2>还要会省钱</h2>
}
export const P1Main = () => <WelcomeMain v-slots={slots}></WelcomeMain>
P1Main.displayName = 'P1Main'
