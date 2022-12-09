import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { FormItem } from '../../shared/Form'
import s from './Charts.module.scss'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { Bars } from './Bars'
import { http } from '../../shared/Http'
import { Time } from '../../shared/time'
export type Data1Item = { happened_at: string; amount: number }
export type ItemSummary = { groups: Data1Item[]; summary: number }
type Data2Item = { tag_id: number; tag: Tag; amount: number }
type Data2 = Data2Item[]
export const Charts = defineComponent({
  name: 'Charts',
  props: {
    refStartLoad: {
      type: Boolean,
      default: false
    },
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
    const kind = ref('expenses')
    const refData = ref<Data1Item[]>([])

    const formatData1 = computed<[number, number][]>(() => {
      let offset = 0
      const diff = new Time(props.endDate).getTimeStamp() - new Time(props.startDate).getTimeStamp()
      const numOfDays = diff / (24 * 60 * 60 * 1000)
      const result: [number, number][] = []
      for (let i = 0; i < numOfDays; i++) {
        const gTime = new Time(props.startDate).add(i, 'day').getTimeStamp()
        let amount = 0
        for (let j = offset; j < refData.value.length; j++) {
          const hAtStamp = new Date(refData.value[j].happened_at).getTime()
          if (gTime === hAtStamp) {
            amount = refData.value[j].amount
            offset++
            break
          }
        }
        result.push([gTime, amount])
      }
      return result
    })
    const fetchData1 = async () => {
      const response = await http.get<ItemSummary>('/items/summary', {
        happened_after: props.startDate,
        happened_before: props.endDate,
        kind: kind.value,
        group_by: 'happened_at',
        _mock: 'itemSummary'
      })
      refData.value = response.data.groups
    }
    onMounted(fetchData1)
    watch(() => kind.value, fetchData1)

    const data2 = ref<Data2>([])
    const formatData2 = computed<{ name: string; value: number }[]>(() =>
      data2.value.map((item) => ({
        name: item.tag.name,
        value: item.amount
      }))
    )

    const formatData3 = computed<{ tag: Tag; amount: number; percent: number }[]>(() => {
      const total = data2.value.reduce((sum, item) => sum + item.amount, 0)
      return data2.value.map((item) => ({
        ...item,
        percent: Math.round((item.amount / total) * 100)
      }))
    })

    const fetchData2 = async () => {
      const response = await http.get<{ groups: Data2; summary: number }>('/items/summary', {
        happened_after: props.startDate,
        happened_before: props.endDate,
        kind: kind.value,
        group_by: 'tag_id',
        _mock: 'itemSummary'
      })
      data2.value = response.data.groups
    }
    onMounted(fetchData2)
    watch(() => kind.value, fetchData2)

    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          kind="select"
          options={[
            { value: 'expenses', text: '支出' },
            { value: 'income', text: '收入' }
          ]}
          v-model={kind.value}
        />
        <LineChart data={formatData1.value} />
        <PieChart data={formatData2.value} />
        <Bars data={formatData3.value} />
      </div>
    )
  }
})
