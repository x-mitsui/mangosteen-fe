import { defineComponent, onMounted, PropType, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import s from './TagStyle.module.scss'
import { Button } from '../../shared/Button'
import { hasError, Rule, validate } from '../../shared/validate'
import { Form, FormItem } from '../../shared/Form'
import { BackBtn } from '../../shared/BackBtn'
import { http } from '../../shared/Http'
import { onFormError } from '../../shared/onFormError'
export const TagForm = defineComponent({
  name: 'TagForm',
  props: {
    title: {
      type: String as PropType<string>,
      required: true
    },
    id: String
  },
  setup(props, context) {
    const router = useRouter()
    const route = useRoute()
    const formData = reactive<Partial<Tag>>({
      name: '',
      sign: ''
    })
    const errors = ref<{
      [k in keyof typeof formData]?: string[]
    }>()
    onMounted(async () => {
      if (props.id) {
        const response = await http.get<Resource<Tag>>(`/tags/${props.id}`, { _mock: 'tagShow' })
        console.log('response:', response)
        Object.assign(formData, response?.data.resource)
      }
    })
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      const rule1: Rule<typeof formData> = {
        message: '须填2到4个字符',
        key: 'name',
        type: 'pattern',
        reg: /^.{1,4}$/g
      }
      const rule2: Rule<typeof formData> = {
        message: '必填',
        key: 'name',
        type: 'required'
      }
      const rule3: Rule<typeof formData> = {
        message: '必填',
        key: 'sign',
        type: 'required'
      }
      // const rules: Rules<typeof formData> = [rule1, rule2, rule3]
      const errFunc = (data: ResourceError) => {
        errors.value = data.errors
      }

      errors.value = validate<typeof formData>(formData, [rule2, rule1, rule3])
      if (hasError(errors.value)) {
        return
      }

      const { kind } = route.query
      if (props.id) {
        await http
          .patch<Resource<Tag>>(
            '/tags' + props.id,
            {
              kind: kind!.toString(),
              name: formData.name!,
              sign: formData.sign!
            },
            { params: { _mock: 'tagUpdate' } }
          )
          .catch((err) => onFormError(err, errFunc))
      } else {
        await http
          .post<Resource<Tag>>(
            '/tags',
            {
              kind: kind!.toString(),
              name: formData.name!,
              sign: formData.sign!
            },
            { params: { _mock: 'tagCreate' } }
          )
          .catch((err) => onFormError(err, errFunc))
      }

      router.back()
    }
    return () => (
      <MainLayout>
        {{
          title: () => props.title,
          icon: (kclass: string) => <BackBtn class={kclass} />,
          main: () => (
            <Form>
              <FormItem
                label="标签名"
                kind="text"
                v-model={formData.name}
                errors={errors.value?.name?.[0] ? errors.value?.name?.[0] : '\u3000'}
              ></FormItem>
              <FormItem
                label={'符号：' + formData.sign}
                kind="signSelected"
                v-model={formData.sign}
                errors={errors.value?.sign?.[0] ? errors.value?.sign?.[0] : '\u3000'}
              ></FormItem>
              <FormItem>
                <p class={s.tips}>记账时长按标签即可进行编辑</p>
              </FormItem>
              <FormItem>
                <Button type="submit" class={[s.formItem, s.button]} onClick={onSubmit}>
                  确定
                </Button>
              </FormItem>
            </Form>
          )
        }}
      </MainLayout>
    )
  }
})
