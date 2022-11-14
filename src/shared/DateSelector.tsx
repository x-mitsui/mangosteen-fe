import { DatetimePicker, Popup } from 'vant'
import { defineComponent, PropType, ref } from 'vue'
import s from './Form.module.scss'
import { Time } from './time'
export const DateSelector = defineComponent({
  name: 'DateSelector',
  props: {
    modelValue: {
      type: Object as PropType<InstanceType<typeof Time>>,
      required: true
    }
  },
  setup(props, context) {
    const refShowPop = ref(false)
    const minDate = new Date(2020, 0, 1)
    const maxDate = new Date(2025, 0, 1)
    return () => (
      <>
        <input
          type="text"
          readonly={false}
          placeholder={props.modelValue.format()}
          onClick={() => {
            refShowPop.value = true
            console.log('11111111')
          }}
          class={[s.formItem, s.formInput]}
        />
        <Popup v-model:show={refShowPop.value} position="bottom">
          <DatetimePicker
            type="date"
            title="选择年月日"
            modelValue={props.modelValue.getRaw()}
            min-date={minDate}
            max-date={maxDate}
            close-on-click-overlay={false}
            onCancel={() => {
              refShowPop.value = false
            }}
            onConfirm={(date: Date) => {
              context.emit('update:model-value', date)

              refShowPop.value = false
            }}
          ></DatetimePicker>
        </Popup>
      </>
    )
  }
})
