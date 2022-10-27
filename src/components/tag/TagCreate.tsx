import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import { EmojiSelected } from './EmojiSelected'
import { emojiTable } from './emoji/EmojiTable'
import s from './TagCreate.module.scss'
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
              <form>
                <label>
                  <span>标签名</span>
                  <input type="text" />
                </label>
                <label>
                  <span>符号 {}</span>
                  <EmojiSelected emojiTable={emojiTable}></EmojiSelected>
                </label>
              </form>
            </>
          )
        }}
      </MainLayout>
    )
  }
})
