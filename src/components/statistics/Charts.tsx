import { defineComponent, onMounted, PropType, ref } from 'vue'
import { FormItem } from '../../shared/Form'
import s from './Charts.module.scss'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
import { Bars } from './Bars'
import { http } from '../../shared/Http'
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
        <LineChart data={refData.value} />
        <PieChart />
        <Bars />
      </div>
    )
  }
})
