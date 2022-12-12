import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from './Button'
import { http } from './Http'
import { Icon } from './Icon'
import s from './Tags.module.scss'
import { useTags } from './useTags'
export const Tags = defineComponent({
  name: 'Tags',
  props: {
    kind: { type: String as PropType<ItemKind>, required: true },
    selectedTagId: Number
  },
  setup(props, context) {
    const router = useRouter()
    const fetcher = (kind: ItemKind, page: number) =>
      http.get<Resources<Tag[]>>(
        '/tags',
        {
          kind,
          page
        },
        { _mock: 'tagIndex', _autoLoading: true }
      )

    const { tags, pageHasMore, fetchData } = useTags(fetcher, { kind: props.kind })
    const onSelect = (id: number) => {
      context.emit('update:selectedTagId', id)
    }
    const createItem = () => {
      router.push(`/tag/create?kind=${props.kind}`)
    }
    const longTouch = (id: number) => {
      router.push(
        `/tag/${id}/edit?return_url=${router.currentRoute.value.fullPath}&kind=${props.kind}`
      )
    }
    let timer: undefined | number
    let currentTag: HTMLDivElement
    const onTouchstart = (e: TouchEvent, id: number) => {
      currentTag = e.target as HTMLDivElement
      timer = setTimeout(() => {
        longTouch(id)
      }, 500)
    }
    const onTouchend = () => {
      clearTimeout(timer)
      timer = undefined
    }
    const onTouchmove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      // contains是核心，它判断currentTag元素包不包含点击的元素
      if (currentTag !== pointedElement && currentTag?.contains(pointedElement) === false) {
        clearTimeout(timer)
      }
    }
    return () => (
      <>
        <div class={s.tags_wrapper} onTouchmove={onTouchmove}>
          <div class={s.tag} onClick={createItem}>
            <div class={s.sign}>
              <Icon name="add"></Icon>
            </div>
            <span class={s.name}>新增</span>
          </div>
          {tags.value.map((tag) => {
            return (
              <div
                class={s.tag}
                onClick={() => onSelect(tag.id)}
                onTouchstart={(e) => {
                  onTouchstart(e, tag.id)
                }}
                onTouchend={onTouchend}
              >
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
