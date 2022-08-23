import s from '../../views/Welcome.module.scss'
import clock from '../../assets/icons/clock.svg'

import { WelcomeMain } from './WelcomeMain'
const slots = {
  img: () => <img src={clock} alt="show" class={s.showImg} />,
  title1: () => <h2>每日提醒</h2>,
  title2: () => <h2>不会遗漏每一笔订单</h2>
}
export const P2Main = () => <WelcomeMain v-slots={slots}></WelcomeMain>
