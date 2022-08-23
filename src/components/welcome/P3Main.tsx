import s from '../../views/Welcome.module.scss'
import chart from '../../assets/icons/chart.svg'

import { WelcomeMain } from './WelcomeMain'
const slots = {
  img: () => <img src={chart} alt="show" class={s.showImg} />,
  title1: () => <h2>数据可视化</h2>,
  title2: () => <h2>收支一目了然</h2>
}
export const P3Main = () => <WelcomeMain v-slots={slots}></WelcomeMain>
P3Main.displayName = 'P3Main'
