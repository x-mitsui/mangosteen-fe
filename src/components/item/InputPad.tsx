import { defineComponent, ref } from 'vue'
import s from './InputPad.module.scss'
import { DatetimePicker, Popup, Switch } from 'vant'
import { Icon } from '../../shared/Icon'

export const InputPad = defineComponent({
  props: {
    happenAt: String,
    amount: Number
  },
  setup(props, context) {
    const minDate = new Date(2020, 0, 1)
    const maxDate = new Date(2025, 0, 1)
    const refInfoValue = ref({
      time: new Date(),
      money: props.amount === undefined ? '0' : (props.amount / 100).toString()
    })

    const refShowPop = ref(false)
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '删除', '提交']
    const keyDown = (key: number | string) => {
      const momey = refInfoValue.value.money
      if (typeof key === 'number' || key === '.') {
        if (typeof key === 'number') {
          if (momey === '0') {
            refInfoValue.value.money = '' + key
          } else {
            refInfoValue.value.money += key
          }
        } else {
          if (momey.includes('.')) {
            return
          }
          refInfoValue.value.money += key
        }
      } else if (key === '删除') {
        refInfoValue.value.money = '0'
      } else {
        context.emit('update:amount', parseFloat(refInfoValue.value.money) * 100)
      }
    }

    return () => (
      <div class={s.wrapper}>
        <div class={s.showWrapper}>
          <div class={s.timer} onClick={() => (refShowPop.value = !refShowPop.value)}>
            <Icon name="note"></Icon>
            <span>{refInfoValue.value.time.toLocaleDateString()}</span>
          </div>
          <span>{refInfoValue.value.money}</span>
        </div>
        <div class={s.keyWrapper}>
          {keys.map((key) => {
            return <button onClick={() => keyDown(key)}>{key}</button>
          })}
        </div>
        <Popup v-model:show={refShowPop.value} position="bottom">
          <DatetimePicker
            type="date"
            title="选择年月日"
            model:value={refInfoValue.value.time}
            min-date={minDate}
            max-date={maxDate}
            onCancel={() => {
              refShowPop.value = false
            }}
            onConfirm={(date: Date) => {
              refInfoValue.value.time = date
              refShowPop.value = false
              context.emit('update:happen-at', refInfoValue.value.time.toISOString())
            }}
          ></DatetimePicker>
        </Popup>
      </div>
    )
  }
})
