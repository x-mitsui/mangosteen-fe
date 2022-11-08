import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import { EmojiSelected } from './EmojiSelected'
import { emojiTable } from './emoji/EmojiTable'
import s from './TagCreate.module.scss'
import { Button } from '../../shared/Button'
import { Rule, Rules, validate } from '../../shared/validate'
export const TagCreate = defineComponent({
  name: 'TagCreate',
  setup(props, context) {
    const router = useRouter()
    const formData = reactive({
      labelName: '',
      emoji: ''
    })
    const errors = ref<{
      [k in keyof typeof formData]?: string[]
    }>()
    // const onUpdateValue = (val: string) => {
    //   console.log('呼噜噜')
    //   formData.emoji = val
    // }
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
          title: () => '新建标签',
          icon: (kclass: string) => <Icon name="back" class={kclass} onClick={goBack} />,
          main: () => (
            <form class={s.wrapper}>
              <label class={s.label}>
                <span class={s.formItem_name}>标签名</span>
                <div class={s.formItem_value}>
                  <input
                    type="text"
                    class={s.formInput}
                    placeholder="2到4个汉字"
                    v-model={formData.labelName}
                  />
                </div>
                <div class={s.formItem_error}>
                  {errors.value?.labelName?.[0] ? errors.value?.labelName?.[0] : '\u3000'}
                </div>
              </label>
              <label class={s.label}>
                <span class={[s.formItem_name, 'emoji-font-conf']}>符号：{formData.emoji}</span>
                <div class={s.formItem_value}>
                  <EmojiSelected emojiTable={emojiTable} v-model={formData.emoji}></EmojiSelected>
                </div>
                <div class={s.formItem_error}>
                  {errors.value?.emoji?.[0] ? errors.value?.emoji?.[0] : '\u3000'}
                </div>
              </label>
              <p class={s.tips}>记账时长按标签即可进行编辑</p>
              <div class={s.formRow}>
                <div class={s.formItem_value}>
                  <Button class={[s.formItem, s.button]} onClick={onSubmit}>
                    确定
                  </Button>
                </div>
              </div>
            </form>
          )
        }}
      </MainLayout>
    )
  }
})
