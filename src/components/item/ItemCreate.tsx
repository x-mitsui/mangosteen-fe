import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { http } from '../../shared/Http'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { InfoInput } from './InfoInput'
import s from './ItemCreate.module.scss'

export const ItemCreate = defineComponent({
  setup(props, context) {
    const refSelectedValue = ref('支出')
    const router = useRouter()
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>('/item', {
        kind: 'expenses',
        _mock: 'tagIndex'
      })
      refExpensesTags.value = response.data.resources
    })
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>('/item', {
        kind: 'income',
        _mock: 'tagIndex'
      })
      refIncomeTags.value = response.data.resources
    })
    const refExpensesTags = ref<Tag[]>([])
    const refIncomeTags = ref<Tag[]>([])
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
                <Tab name="支出" class={s.tags_wrapper}>
                  <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>
                      <Icon name="add"></Icon>
                    </div>
                    <span class={s.name}>新增</span>
                  </div>
                  {refExpensesTags.value.map((tag) => {
                    return (
                      <div class={s.tag}>
                        <div class={s.sign}>{tag.sign}</div>
                        <span class={s.name}>{tag.name}</span>
                      </div>
                    )
                  })}
                </Tab>
                <Tab name="收入" class={s.tags_wrapper}>
                  <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>
                      <Icon name="add"></Icon>
                    </div>
                    <span class={s.name}>新增</span>
                  </div>
                  {refIncomeTags.value.map((tag) => {
                    return (
                      <div class={s.tag}>
                        <div class={s.sign}>{tag.sign}</div>
                        <span class={s.name}>{tag.name}</span>
                      </div>
                    )
                  })}
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
