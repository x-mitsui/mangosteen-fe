import { defineComponent, PropType, ref } from 'vue'
import s from './EmojiSelected.module.scss'
export const EmojiSelected = defineComponent({
  name: 'EmojiSelected',
  props: {
    emojiTable: {
      type: Array as PropType<[string, string[]][]>,
      required: true
    }
  },
  setup(props, context) {
    const refIndex = ref(0)
    const selectEmoji = (index: string) => {
      refIndex.value = parseInt(index)
    }
    return () => (
      <>
        <ul>
          {props.emojiTable.map((emojiItem) => {
            return <li onClick={() => selectEmoji(emojiItem[0])}>{emojiItem[0]}</li>
          })}
        </ul>
        <div>{props.emojiTable[refIndex.value][1]}</div>
      </>
    )
  }
})
