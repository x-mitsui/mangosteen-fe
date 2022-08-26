import { WelcomeMain } from './WelcomeMain'
const slots = {
  img: () => (
    <svg role="img">
      <use xlinkHref="#clock" />
    </svg>
  ),
  title1: () => <h2>每日提醒</h2>,
  title2: () => <h2>不会遗漏每一笔订单</h2>
}
export const P2Main = () => <WelcomeMain v-slots={slots}></WelcomeMain>
P2Main.displayName = 'P2Main'
