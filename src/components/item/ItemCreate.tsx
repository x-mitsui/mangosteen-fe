import { Dialog } from 'vant'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { BackBtn } from '../../shared/BackBtn'
import { http } from '../../shared/Http'
import { onFormError } from '../../shared/onFormError'
import { Tab, Tabs } from '../../shared/Tabs'
import { Tags } from '../../shared/Tags'
import { hasError, validate } from '../../shared/validate'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'

export const ItemCreate = defineComponent({
  setup(props, context) {
    const router = useRouter()

    const formData = reactive<Omit<Item, 'tags'>>({
      tag_ids: [],
      happened_at: new Date().toISOString(),
      amount: 0,
      kind: 'expenses'
    })
    const errors = reactive<FormErrors<typeof formData>>({
      kind: [],
      tag_ids: [],
      amount: [],
      happened_at: []
    })
    const errorFunc = (data: ResourceError) => {
      Dialog.alert({
        title: '请求参数错误',
        message: Object.values(data.errors)
          .map((error) => error.join(','))
          .join('\n')
      })
    }

    const onSubmit = async () => {
      Object.assign(errors, {
        kind: [],
        tag_ids: [],
        amount: [],
        happened_at: []
      })
      Object.assign(
        errors,
        validate(formData, [
          { key: 'kind', type: 'required', message: '类型必填' },
          { key: 'tag_ids', type: 'required', message: '标签必填' },
          { key: 'tag_ids', type: 'ArrayNotEmpty', message: '标签数组不能为空' },
          { key: 'amount', type: 'required', message: '金额必填' },
          { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为零' },
          { key: 'happened_at', type: 'required', message: '时间必填' }
        ])
      )
      if (hasError(errors)) {
        Dialog.alert({
          title: '出错',
          message: Object.values(errors)
            .filter((i) => i.length > 0)
            .join('\n')
        })
        return
      }
      await http
        .post<Resource<Item>>('/items', formData, { _mock: 'itemCreate', _autoLoading: true })
        .catch((err) => onFormError(err, errorFunc))
      router.push('/item')
    }

    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: (kclass: string) => <BackBtn class={kclass} />,
          main: () => (
            <div class={s.wrapper}>
              <Tabs v-model:selected={formData.kind} class={s.tabs}>
                <Tab name="支出" value="expenses">
                  <Tags kind="expenses" v-model:selectedTagId={formData.tag_ids[0]} />
                </Tab>
                <Tab name="收入" value="income">
                  <Tags kind="income" v-model:selectedTagId={formData.tag_ids[0]} />
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
