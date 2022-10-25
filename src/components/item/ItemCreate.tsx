import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import s from './ItemCreate.module.scss'
export const ItemCreate = defineComponent({
  props: {},
  setup(props, context) {
    const refSelectedValue = ref('')
    const router = useRouter()
    const onUpdateValue = (val: string) => {
      refSelectedValue.value = val
    }
    const goBack = () => {
      router.push('/start')
    }
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: (kclass: string) => <Icon name="back" class={kclass} onClick={goBack} />,
          main: () => (
            <Tabs selected={refSelectedValue.value} onUpdateValue={onUpdateValue}>
              <Tab name="income">收入</Tab>
              <Tab name="pay">支出</Tab>
            </Tabs>
          )
        }}
      </MainLayout>
    )
  }
})
