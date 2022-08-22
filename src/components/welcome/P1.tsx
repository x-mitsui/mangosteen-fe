import { defineComponent } from "vue";
import pig from "../../assets/icons/pig.svg"
import s from "./P1.module.scss"
import { RouterLink } from "vue-router";
export const P1 = defineComponent({
setup(props, context) {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={pig} alt="show" class={s.pig} />
          <h2>会挣钱</h2>
          <h2>还要会省钱</h2>
        </div>
        <div class={s.actions}>
          <RouterLink to="/welcome/2">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </div>
      </div>
    )
  }
})