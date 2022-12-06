import { AxiosError } from 'axios'
import { Dialog } from 'vant'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { BackBtn } from '../../shared/BackBtn'
import { http } from '../../shared/Http'
import { Tab, Tabs } from '../../shared/Tabs'
import { Tags } from '../../shared/Tags'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'

export const ItemCreate = defineComponent({
  setup(props, context) {
    const router = useRouter()
    const refSelectedValue = ref('支出')

    const formData = reactive<Item>({
      tags_id: [],
      happened_at: new Date().toISOString(),
      amount: 0,
      kind: 'expenses'
    })
    const onError = (err: AxiosError<ResourceError>) => {
      if (err.response?.status === 422) {
        Dialog.alert({
          title: '请求参数错误',
          message: Object.values(err.response.data.errors)
            .map((error) => error.join(','))
            .join('\n')
        }).then(() => {
          // on close
        })
      }
    }
    const onSubmit = async () => {
      const res = await http
        .post<Resource<Item>>('/items', formData, { params: { _mock: 'itemCreate' } })
        .catch(onError)
      router.push('/item/list')
    }

    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: (kclass: string) => <BackBtn class={kclass} />,
          main: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={refSelectedValue.value} class={s.tabs}>
                <Tab name="支出">
                  <Tags kind="expenses" v-model:selectedTagId={formData.tags_id[0]} />
                </Tab>
                <Tab name="收入">
                  <Tags kind="income" v-model:selectedTagId={formData.tags_id[0]} />
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad
                  v-model:happen-at={formData.happened_at}
                  v-model:amount={formData.amount}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          )
        }}
      </MainLayout>
    )
  }
})
