import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { Button } from '../../shared/Button'
import { http } from '../../shared/Http'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { useTags } from '../../shared/useTags'
import { InfoInput } from './InfoInput'
import s from './ItemCreate.module.scss'

export const ItemCreate = defineComponent({
  setup(props, context) {
    const refSelectedValue = ref('支出')
    const router = useRouter()

    const fetcher = (kind: 'expenses' | 'income', page: number) =>
      http
        .get<Resources<Tag[]>>('/item', {
          kind,
          page,
          _mock: 'tagIndex'
        })
        .catch((err) => console.log('get/item-err', err))

    const {
      tags: refExpensesTags,
      pageHasMore: expensesPageHasMore,
      fetchData: fetchExpensesData
    } = useTags(fetcher, { kind: 'expenses' })
    const {
      tags: refIncomeTags,
      pageHasMore: incomePageHasMore,
      fetchData: fetchIncomeData
    } = useTags(fetcher, { kind: 'income' })

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
                  <div class={s.tags_wrapper}>
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
                  </div>
                  <div class={s.load_more}>
                    {expensesPageHasMore.value ? (
                      <Button onClick={fetchExpensesData}>加载更多</Button>
                    ) : (
                      <span>没有更多</span>
                    )}
                  </div>
                </Tab>
                <Tab name="收入">
                  <div class={s.tags_wrapper}>
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
                  </div>
                  <div class={s.load_more}>
                    {incomePageHasMore.value ? (
                      <Button onClick={fetchIncomeData}>加载更多</Button>
                    ) : (
                      <span>没有更多</span>
                    )}
                  </div>
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
