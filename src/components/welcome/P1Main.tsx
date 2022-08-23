import s from '../../views/Welcome.module.scss'
import pig from '../../assets/icons/pig.svg'

import { WelcomeMain } from './WelcomeMain'
const slots = {
  img: () => <img src={pig} alt="showPng" class={s.pig} />,
  title1: () => <h2>会挣钱</h2>,
  title2: () => <h2>还要会省钱</h2>
}
export const P1Main = () => <WelcomeMain v-slots={slots}></WelcomeMain>
