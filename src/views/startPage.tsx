import { defineComponent } from 'vue'
import { Button } from '../shared/Button'
import { Center } from '../shared/Center'
import { FloatButton } from '../shared/FloatButton'
import { Icon } from '../shared/Icon'
import s from './startPage.module.scss'
export const StartPage = defineComponent({
  setup(props, context) {
    const onclick = () => {
      console.log('hi')
    }
    return () => (
      <>
        <Center>
          <Icon name="pig" class={s.icon} />
        </Center>
        <div class={s.wrapper}>
          <Button onClick={onclick}>你好</Button>
        </div>
        <FloatButton IconName="add" />
      </>
    )
  }
})
