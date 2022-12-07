import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
import { Datetime } from '../../shared/Datetime'
import { FloatButton } from '../../shared/FloatButton'
import { http } from '../../shared/Http'
import { Money } from '../../shared/Money'
import { onFormError } from '../../shared/onFormError'
import s from './ItemSummary.module.scss'
export const ItemSummary = defineComponent({
  name: 'ItemSummary',
  props: {
    // 控制进入界面是否立即请求,lazy即不立即请求
    refStartLoad: { type: Boolean, default: true },
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup: (props, context) => {
    const itemsList = reactive<Item[]>([])
    const refPage = ref(0)
    const hasMore = ref(false)
    const { startDate, endDate } = props
    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0
    })
    onMounted(async () => {
      const response = await http.get('/items/balance', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        page: refPage.value + 1,
        _mock: 'itemIndexBalance'
      })
      Object.assign(itemsBalance, response.data)
    })

    const fetcher = async (page: number) => {
      return await http
        .get<Resources<Item[]>>('/items', {
          page,
          created_after: startDate,
          created_before: endDate,
          _mock: 'itemIndex'
        })
        .catch((err) => onFormError(err, (errors: ResourceError<any>) => {}))
    }
    const loadMore = async () => {
      const response = await fetcher(refPage.value + 1)
      if (!response) return
      const { resources, pager } = response.data
      const { page, per_page, count } = pager
      refPage.value = page
      console.log('page:', page)
      hasMore.value = (page - 1) * per_page + resources.length < count
      itemsList.push(...response.data.resources)
    }
    watch(
      () => props.refStartLoad,
      (newValue) => {
        if (newValue === true) {
          loadMore()
        }
      }
    )
    onMounted(() => {
      if (props.refStartLoad) {
        loadMore()
      }
    })

    return () => (
      <div class={s.wrapper}>
        <ul class={s.total}>
          <li>
            <span>收入</span>
            <span>
              <Money value={itemsBalance.income} />
            </span>
          </li>
          <li>
            <span>支出</span>
            <span>
              <Money value={itemsBalance.expenses} />
            </span>
          </li>
          <li>
            <span>净收入</span>
            <span>
              <Money value={itemsBalance.balance} />
            </span>
          </li>
        </ul>
        <ol class={s.list}>
          {itemsList.map((item) => {
            return (
              <li>
                <div class={s.sign}>
                  <span>{item.tags_id[0]}</span>
                </div>
                <div class={s.text}>
                  <div class={s.tagAndAmount}>
                    <span class={s.tag}>{item.tags_id[0]}</span>
                    <span class={s.amount}>
                      ￥<Money value={item.amount} />
                    </span>
                  </div>
                  <div class={s.time}>
                    <Datetime value={item.happened_at} />
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
        <div class={s.more} onClick={loadMore} v-show={hasMore.value}>
          向下滑动加载更多
        </div>
        <FloatButton IconName="add" to="/item/create" />
      </div>
    )
  }
})
