import { defineComponent } from 'vue'
import { Button } from '../../shared/Button'
import { TagForm } from './TagForm'
import s from './TagEdit.module.scss'
export const TagEdit = defineComponent({
  name: 'TagEdit',
  setup(props, context) {
    return () => (
      <>
        <TagForm title="新建标签" />
        <div class={s.action}>
          <Button kind="danger" class={s.actionBtn}>
            删除标签
          </Button>
          <Button kind="danger" class={s.actionBtn}>
            删除标签和记账
          </Button>
        </div>
      </>
    )
  }
})
