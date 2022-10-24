import { defineComponent } from 'vue'
import { Button } from '../shared/Button'
import { FloatButton } from '../shared/FloatButton'
import s from './startPage.module.scss'
export const StartPage = defineComponent({
  setup(props, context) {
    const onclick = () => {
      console.log('hi')
    }
    return () => (
      <>
        <div class={s.wrapper}>
          <Button onClick={onclick}>你好</Button>
        </div>
        <FloatButton IconName="add" />
      </>
    )
  }
})
