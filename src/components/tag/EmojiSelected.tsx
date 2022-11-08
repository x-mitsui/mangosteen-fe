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
    const refTitleIndex = ref(0)
    const refSelectedEmojiIndex = ref<null | number>(null)

    const selectTitle = (index: number) => {
      refTitleIndex.value = index
    }
    const selectEmoji = (emojiItem: string, index: number) => {
      context.emit('update:modelValue', emojiItem)

      refSelectedEmojiIndex.value = index
    }
    const widthSet = () => {
      return { width: props.emojiTable.length * 50 + 'px' }
    }
    const getClass = (index: number) =>
      computed(() => (refTitleIndex.value === index ? s.selected : ''))

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
          {props.emojiTable[refTitleIndex.value][1].map((emojiItem, index) => {
            return (
              <li
                class={[
                  'emoji-font-conf',
                  index === refSelectedEmojiIndex.value && s.selectedEmoji
                ]}
                onClick={() => selectEmoji(emojiItem, index)}
              >
                {emojiItem}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
})
