import { WelcomeMain } from './WelcomeMain'
const slots = {
  img: () => (
    <svg role="img">
      <use xlinkHref="#cloud" />
    </svg>
  ),
  title1: () => <h2>云备份</h2>,
  title2: () => <h2>再也不怕数据丢失</h2>
}
export const P4Main = () => <WelcomeMain v-slots={slots}></WelcomeMain>
P4Main.displayName = 'P4Main'
