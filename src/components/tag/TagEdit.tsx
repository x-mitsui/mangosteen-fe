import { defineComponent } from 'vue'
import { Button } from '../../shared/Button'
import { TagForm } from './TagForm'
import s from './TagEdit.module.scss'
import { useRoute } from 'vue-router'
import { http } from '../../shared/Http'
import { router } from '../../router'
export const TagEdit = defineComponent({
  name: 'TagEdit',
  setup(props, context) {
    const route = useRoute()
    const id = route.params.id.toString()
    const onDelete = (options?: { withItems: boolean }) => {
      http.delete(
        '/tags/' + id,
        options
          ? {
              withItems: options.withItems.toString()
            }
          : undefined
      )
      router.back()
    }
    return () => (
      <>
        <TagForm title="编辑标签" id={id} />
        <div class={s.action}>
          <Button kind="danger" class={s.actionBtn} onClick={(e) => onDelete()}>
            删除标签
          </Button>
          <Button kind="danger" class={s.actionBtn} onClick={() => onDelete({ withItems: true })}>
            删除标签和记账
          </Button>
        </div>
      </>
    )
  }
})
