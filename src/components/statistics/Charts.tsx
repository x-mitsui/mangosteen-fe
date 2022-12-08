import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { FormItem } from '../../shared/Form'
import s from './Charts.module.scss'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { Bars } from './Bars'
import { http } from '../../shared/Http'
import { Time } from '../../shared/time'
export type Data1Item = { happened_at: string; amount: number }
export type ItemSummary = {
  groups: Data1Item[]
}
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

    const formatData = computed<[number, number][]>(() => {
      let offset = 0
      const diff = new Time(props.endDate).getTimeStamp() - new Time(props.startDate).getTimeStamp()
      const numOfDays = diff / (24 * 60 * 60 * 1000)
      const result: [number, number][] = []
      for (let i = 0; i < numOfDays; i++) {
        const gTime = new Time(props.startDate).add(i, 'day').getTimeStamp()
        let amount = 0
        for (let j = offset; j < refData.value.length; j++) {
          const hAtStamp = new Date(refData.value[j].happened_at).getTime()
          console.log(hAtStamp)
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

    onMounted(async () => {
      const response = await http.get<ItemSummary>('/items/summary', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        kind: kind.value,
        _mock: 'itemSummary'
      })
      refData.value = response.data.groups
    })

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
        <LineChart data={formatData.value} />
        <PieChart />
        <Bars />
      </div>
    )
  }
})
