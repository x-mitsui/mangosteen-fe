import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '../../shared/Button'
import { Center } from '../../shared/Center'
import { Datetime } from '../../shared/Datetime'
import { FloatButton } from '../../shared/FloatButton'
import { http } from '../../shared/Http'
import { Icon } from '../../shared/Icon'
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
    const itemsList = ref<Item[]>([])
    const refPage = ref<number>(0)
    const hasMore = ref(false)

    const router = useRouter()
    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0
    })
    const fetchItemsBalance = async () => {
      const response = await http.get(
        '/items/balance',
        {
          happened_after: props.startDate,
          happened_before: props.endDate,
          page: refPage.value + 1
        },
        { _mock: 'itemIndexBalance', _autoLoading: true }
      )
      Object.assign(itemsBalance, response.data)
    }
    onMounted(async () => {
      await fetchItemsBalance()
    })

    const loadDatas = async (
      pageNumber = refPage.value + 1,
      happened_after = props.startDate,
      happened_before = props.endDate
    ) => {
      const response = await http
        .get<Resources<Item[]>>(
          '/items',
          {
            page: pageNumber,
            happened_after,
            happened_before
          },
          { _mock: 'itemIndex' }
        )
        .catch((err) => onFormError(err, (errors: ResourceError<any>) => {}))
      if (!response) return
      const { resources, pager } = response.data
      const { page, per_page, count } = pager

      refPage.value = page

      hasMore.value = (page - 1) * per_page + resources.length < count
      itemsList.value.push(...response.data.resources)
    }

    watch(
      () => props.refStartLoad,
      (newValue) => {
        if (newValue === true) {
          fetchItemsBalance()
          loadDatas(1)
          context.emit('update:refStartLoad', false)
        }
      }
    )
    onMounted(() => {
      if (props.refStartLoad) {
        loadDatas(1)
      }
    })

    const SummaryPage = () => (
      <>
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
          {itemsList.value.map((item) => {
            return (
              <li>
                <div class={s.sign}>
                  <span>{item.tags && item.tags.length > 0 ? item.tags[0].sign : '💰'}</span>
                </div>
                <div class={s.text}>
                  <div class={s.tagAndAmount}>
                    <span class={s.tag}>
                      {item.tags && item.tags.length > 0 ? item.tags[0].name : '未分类'}
                    </span>
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
        <div class={s.more}>
          {hasMore.value ? (
            <Button onClick={() => loadDatas()}>加载更多</Button>
          ) : (
            <span>没有更多了</span>
          )}
        </div>

        <FloatButton IconName="add" to="/item/create" />
      </>
    )

    const StartPage = () => (
      <>
        <Center>
          <Icon name="pig" class={s.icon} style={'width:50%;height:50%;'} />
        </Center>
        <div class={s.startWrapper}>
          <Button
            onClick={() => {
              router.push('/item/create')
            }}
          >
            你好
          </Button>
        </div>
      </>
    )

    return () => (
      <div class={s.wrapper}>
        {itemsList.value && itemsList.value.length > 0 ? <SummaryPage /> : <StartPage />}
        <FloatButton IconName="add" to="/item/create" />
      </div>
    )
  }
})
