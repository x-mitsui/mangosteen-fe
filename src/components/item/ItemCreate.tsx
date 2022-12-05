import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { Tags } from '../../shared/Tags'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'

export const ItemCreate = defineComponent({
  setup(props, context) {
    const router = useRouter()
    const refSelectedValue = ref('支出')
    const refTagId = ref<number>()
    const refHappenAt = ref<string>(new Date().toISOString())
    const refAmount = ref<number>(0)

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
              <h2>{refAmount.value}</h2>
              <Tabs v-model:selected={refSelectedValue.value} class={s.tabs}>
                <Tab name="支出">
                  <Tags kind="expenses" v-model:selectedTagId={refTagId.value} />
                </Tab>
                <Tab name="收入">
                  <Tags kind="income" v-model:selectedTagId={refTagId.value} />
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad v-model:happen-at={refHappenAt.value} v-model:amount={refAmount.value} />
              </div>
            </div>
          )
        }}
      </MainLayout>
    )
  }
})
