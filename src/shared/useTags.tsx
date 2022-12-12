import { AxiosResponse } from 'axios'
import { onMounted, ref } from 'vue'

type Fetcher = (
  kind: ItemKind,
  page: number
) => Promise<void | AxiosResponse<Resources<Tag[]>, any>>

export const useTags = (fetcher: Fetcher, config: { kind: ItemKind }) => {
  const tags = ref<Tag[]>([])
  const curPage = ref(0)
  const pageHasMore = ref(false)
  const fetchData = async () => {
    const response = await fetcher(config.kind, curPage.value + 1)
    if (!response) return alert('请求/item失败')
    const { resources, pager } = response.data

    const { page, per_page, count } = pager
    tags.value.push(...resources)

    curPage.value = page
    pageHasMore.value = (page - 1) * per_page + response.data.resources.length < count
  }
  onMounted(fetchData)
  return { tags, curPage, pageHasMore, fetchData }
}
