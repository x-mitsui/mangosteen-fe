import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { Tags } from '../../shared/Tags'
import { InfoInput } from './InfoInput'
import s from './ItemCreate.module.scss'

export const ItemCreate = defineComponent({
  setup(props, context) {
    const refSelectedValue = ref('支出')
    const router = useRouter()

    const goBack = () => {
      router.push('/start')
    }
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: (kclass: string) => <Icon name="back" class={kclass} onClick={goBack} />,
          main: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={refSelectedValue.value} class={s.tabs}>
                <Tab name="支出">
                  <Tags kind="expenses" />
                </Tab>
                <Tab name="收入">
                  <Tags kind="income" />
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InfoInput />
              </div>
            </div>
          )
        }}
      </MainLayout>
    )
  }
})
