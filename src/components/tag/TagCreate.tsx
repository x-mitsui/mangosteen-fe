import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import { EmojiSelected } from './EmojiSelected'
import { emojiTable } from './emoji/EmojiTable'
import s from './TagCreate.module.scss'
import { Button } from '../../shared/Button'
export const TagCreate = defineComponent({
  name: 'TagCreate',
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
          title: () => '新建标签',
          icon: (kclass: string) => <Icon name="back" class={kclass} onClick={goBack} />,
          main: () => (
            <>
              <form class={s.wrapper}>
                <label class={s.label}>
                  <span class={s.title}>标签名</span>
                  <input type="text" class={s.input} placeholder="2到4个汉字" />
                </label>
                <label class={s.label}>
                  <span class={s.title}>符号：{refSelectedValue.value}</span>
                  <EmojiSelected
                    emojiTable={emojiTable}
                    v-model={refSelectedValue.value}
                  ></EmojiSelected>
                </label>
                <p class={s.tips}>记账时长按标签即可进行编辑</p>
                <div class={s.formRow}>
                  <div class={s.formItem_value}>
                    <Button class={[s.formItem, s.button]}>确定</Button>
                  </div>
                </div>
              </form>
            </>
          )
        }}
      </MainLayout>
    )
  }
})
