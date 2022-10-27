import { defineComponent } from 'vue'
import s from './EmojiSelected.module.scss'
export const EmojiSelected = defineComponent({
  name: 'EmojiSelected',
  props: {
    contents: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    return () => (
      <>
        <ul>
          <li></li>
        </ul>
      </>
    )
  }
})
