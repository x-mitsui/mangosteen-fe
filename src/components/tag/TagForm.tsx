import { defineComponent, PropType, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import s from './TagStyle.module.scss'
import { Button } from '../../shared/Button'
import { Rule, validate } from '../../shared/validate'
import { Form, FormItem } from '../../shared/Form'
export const TagForm = defineComponent({
  name: 'TagForm',
  props: {
    title: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props, context) {
    const router = useRouter()
    const formData = reactive({
      labelName: '',
      emoji: ''
    })
    const errors = ref<{
      [k in keyof typeof formData]?: string[]
    }>()

    const goBack = () => {
      router.push('/start')
    }
    const onSubmit = (e: Event) => {
      e.preventDefault()
      const rule1: Rule<typeof formData> = {
        message: '须填2到4个字符',
        key: 'labelName',
        type: 'pattern',
        reg: /^.{1,4}$/g
      }
      const rule2: Rule<typeof formData> = {
        message: '必填',
        key: 'labelName',
        type: 'required'
      }
      const rule3: Rule<typeof formData> = {
        message: '必填',
        key: 'emoji',
        type: 'required'
      }
      // const rules: Rules<typeof formData> = [rule1, rule2, rule3]

      errors.value = validate<typeof formData>(formData, [rule2, rule1, rule3])
      console.log('1111:', errors)
    }
    return () => (
      <MainLayout>
        {{
          title: () => props.title,
          icon: (kclass: string) => <Icon name="back" class={kclass} onClick={goBack} />,
          main: () => (
            <Form>
              <FormItem
                label="标签名"
                kind="text"
                v-model={formData.labelName}
                errors={errors.value?.labelName?.[0] ? errors.value?.labelName?.[0] : '\u3000'}
              ></FormItem>
              <FormItem
                label={'符号：' + formData.emoji}
                kind="emojiSelected"
                v-model={formData.emoji}
                errors={errors.value?.emoji?.[0] ? errors.value?.emoji?.[0] : '\u3000'}
              ></FormItem>
              <FormItem>
                <p class={s.tips}>记账时长按标签即可进行编辑</p>
              </FormItem>
              <FormItem>
                <Button class={[s.formItem, s.button]} onClick={onSubmit}>
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