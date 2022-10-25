import { defineComponent, ref } from 'vue'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../shared/Button'
import { Center } from '../shared/Center'
import { FloatButton } from '../shared/FloatButton'
import { Icon } from '../shared/Icon'
import { NavBar } from '../shared/NavBar'
import { Overlay } from '../shared/Overlay'
import s from './startPage.module.scss'
export const StartPage = defineComponent({
  setup(props, context) {
    const refIsShowOverlay = ref(false)
    const onclick = () => {
      console.log('hi')
    }
    const setOverlay = () => {
      console.log('setOverlay')
      refIsShowOverlay.value = !refIsShowOverlay.value
    }
    return () => (
      <>
        <MainLayout>
          {{
            title: () => '山竹记账',
            icon: (kclass: string) => <Icon name="menu" class={kclass} onClick={setOverlay} />,
            main: () => (
              <>
                <Center>
                  <Icon name="pig" class={s.icon} />
                </Center>
                <div class={s.wrapper}>
                  <Button onClick={onclick}>你好</Button>
                </div>
                <FloatButton IconName="add" />
                {refIsShowOverlay.value && <Overlay setOverlay={setOverlay} />}
              </>
            )
          }}
        </MainLayout>
      </>
    )
  }
})
