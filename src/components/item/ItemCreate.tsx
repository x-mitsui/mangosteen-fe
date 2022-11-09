import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { InfoInput } from './InfoInput'
import s from './ItemCreate.module.scss'
export const ItemCreate = defineComponent({
  setup(props, context) {
    const refSelectedValue = ref('支出')
    const router = useRouter()
    const refExpensesTags = ref([
      { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
      { id: 2, name: '打车', sign: '￥', category: 'expenses' },
      { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 4, name: '打车', sign: '￥', category: 'expenses' },
      { id: 5, name: '聚餐', sign: '￥', category: 'expenses' },
      { id: 6, name: '打车', sign: '￥', category: 'expenses' },
      { id: 7, name: '聚餐', sign: '￥', category: 'expenses' }
    ])
    const refIncomeTags = ref([
      { id: 4, name: '工资', sign: '￥', category: 'income' },
      { id: 5, name: '彩票', sign: '￥', category: 'income' },
      { id: 6, name: '滴滴', sign: '￥', category: 'income' },
      { id: 11, name: '彩票', sign: '￥', category: 'income' },
      { id: 18, name: '滴滴', sign: '￥', category: 'income' },
      { id: 17, name: '彩票', sign: '￥', category: 'income' },
      { id: 19, name: '滴滴', sign: '￥', category: 'income' },
      { id: 4, name: '工资', sign: '￥', category: 'income' },
      { id: 5, name: '彩票', sign: '￥', category: 'income' },
      { id: 6, name: '滴滴', sign: '￥', category: 'income' },
      { id: 11, name: '彩票', sign: '￥', category: 'income' },
      { id: 18, name: '滴滴', sign: '￥', category: 'income' },
      { id: 17, name: '彩票', sign: '￥', category: 'income' },
      { id: 19, name: '滴滴', sign: '￥', category: 'income' },
      { id: 4, name: '工资', sign: '￥', category: 'income' },
      { id: 5, name: '彩票', sign: '￥', category: 'income' },
      { id: 6, name: '滴滴', sign: '￥', category: 'income' },
      { id: 11, name: '彩票', sign: '￥', category: 'income' },
      { id: 18, name: '滴滴', sign: '￥', category: 'income' },
      { id: 17, name: '彩票', sign: '￥', category: 'income' },
      { id: 19, name: '滴滴', sign: '￥', category: 'income' },
      { id: 4, name: '工资', sign: '￥', category: 'income' },
      { id: 5, name: '彩票', sign: '￥', category: 'income' },
      { id: 6, name: '滴滴', sign: '￥', category: 'income' },
      { id: 11, name: '彩票', sign: '￥', category: 'income' },
      { id: 18, name: '滴滴', sign: '￥', category: 'income' },
      { id: 17, name: '彩票', sign: '￥', category: 'income' },
      { id: 19, name: '滴滴', sign: '￥', category: 'income' },
      { id: 4, name: '工资', sign: '￥', category: 'income' },
      { id: 5, name: '彩票', sign: '￥', category: 'income' },
      { id: 6, name: '滴滴', sign: '￥', category: 'income' },
      { id: 11, name: '彩票', sign: '￥', category: 'income' },
      { id: 18, name: '滴滴', sign: '￥', category: 'income' },
      { id: 17, name: '彩票', sign: '￥', category: 'income' },
      { id: 19, name: '滴滴', sign: '￥', category: 'income' }
    ])
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
