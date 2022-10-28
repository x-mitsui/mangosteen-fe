import { computed, defineComponent, PropType, ref } from 'vue'
import s from './EmojiSelected.module.scss'
export const EmojiSelected = defineComponent({
  name: 'EmojiSelected',
  props: {
    emojiTable: {
      type: Array as PropType<[string, string[]][]>,
      required: true
    },
    modelValue: {
      type: String
    }
  },
  setup(props, context) {
    const refIndex = ref(0)

    const selectTitle = (index: number) => {
      refIndex.value = index
    }
    const selectEmoji = (emojiItem: string) => {
      context.emit('update:modelValue', emojiItem)
    }
    const widthSet = () => {
      return { width: props.emojiTable.length * 50 + 'px' }
    }
    const getClass = (index: number) => computed(() => (refIndex.value === index ? s.selected : ''))

    return () => (
      <div class={s.wrapper}>
        <div class={s.titleWrapper}>
          <ul class={s.emojiTitleList} style={widthSet()}>
            {props.emojiTable.map((emojiTitle, index) => {
              return (
                <li
                  class={[s.emojiTitle, getClass(index).value]}
                  onClick={() => selectTitle(index)}
                >
                  {emojiTitle[0]}
                </li>
              )
            })}
          </ul>
        </div>

        <ul class={s.emojisWrapper}>
          {props.emojiTable[refIndex.value][1].map((emojiItem) => {
            return (
              <li class={s.emojiItem} onClick={() => selectEmoji(emojiItem)}>
                {emojiItem}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
})
