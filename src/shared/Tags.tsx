import { defineComponent, PropType } from 'vue'
import { Button } from './Button'
import { http } from './Http'
import { Icon } from './Icon'
import s from './Tags.module.scss'
import { useTags } from './useTags'
export const Tags = defineComponent({
  name: 'Tags',
  props: {
    kind: { type: String as PropType<ItemType>, required: true },
    selectedTagId: Number
  },
  setup(props, context) {
    const fetcher = (kind: ItemType, page: number) =>
      http.get<Resources<Tag[]>>('/item', {
        kind,
        page,
        _mock: 'tagIndex'
      })

    const { tags, pageHasMore, fetchData } = useTags(fetcher, { kind: props.kind })
    const onSelect = (id: number) => {
      context.emit('update:selectedTagId', id)
    }
    return () => (
      <>
        <div class={s.tags_wrapper}>
          <div class={s.tag}>
            <div class={s.sign}>
              <Icon name="add"></Icon>
            </div>
            <span class={s.name}>新增</span>
          </div>
          {tags.value.map((tag) => {
            return (
              <div class={s.tag} onClick={() => onSelect(tag.id)}>
                <div class={[s.sign, tag.id === props.selectedTagId && s.selected]}>{tag.sign}</div>
                <span class={s.name}>{tag.name}</span>
              </div>
            )
          })}
        </div>
        <div class={s.load_more}>
          {pageHasMore.value ? (
            <Button onClick={fetchData}>加载更多</Button>
          ) : (
            <span>没有更多</span>
          )}
        </div>
      </>
    )
  }
})
