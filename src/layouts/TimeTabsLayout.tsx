import { Overlay } from 'vant'
import { DefineComponent, defineComponent, PropType, ref } from 'vue'
import { MainLayout } from './MainLayout'
import { Form, FormItem } from '../shared/Form'
import { OverlayIcon } from '../shared/Overlay'
import { Tab, Tabs } from '../shared/Tabs'
import { Time } from '../shared/time'
import s from './TimeTabsLayout.module.scss'

const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    }
  }
})
export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true
    }
  },
  setup(props, context) {
    const refTabSelected = ref('本月')
    const customOverlayShow = ref(false)
    const time = new Time()
    const refCustomDate = ref({ start: new Time(), end: new Time() })
    const dateList = [
      { start: time.firstDayOfMonth(), end: time.lastDayOfMonth() },
      {
        start: time.add(-1, 'month').firstDayOfMonth(),
        end: time.add(-1, 'month').lastDayOfMonth()
      },
      { start: time.firstDayOfYear(), end: time.lastDayOfYear() }
    ]

    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: (kclass: string) => <OverlayIcon kclass={kclass} />,
          main: () => (
            <div>
              <Tabs
                selected={refTabSelected.value}
                classPrefix="customTabs"
                onUpdate:selected={(name: string) => {
                  refTabSelected.value = name
                  if (name === '自定义时间') {
                    customOverlayShow.value = true
                  }
                }}
              >
                <Tab name="本月">
                  <props.component
                    startDate={dateList[0].start.format()}
                    endDate={dateList[0].end.format()}
                  />
                </Tab>
                <Tab name="上个月">
                  <props.component
                    startDate={dateList[0].start.format()}
                    endDate={dateList[0].end.format()}
                  />
                </Tab>
                <Tab name="今年">
                  <props.component
                    startDate={dateList[0].start.format()}
                    endDate={dateList[0].end.format()}
                  />
                </Tab>
                <Tab name="自定义时间">
                  <Overlay show={customOverlayShow.value} class={s.overlay}>
                    <div class={s.overlay_inner}>
                      <header>请选择时间</header>
                      <main>
                        <Form
                          onSubmit={(e: Event) => {
                            e.preventDefault()
                            customOverlayShow.value = false
                          }}
                        >
                          <FormItem
                            kind="date"
                            label="开始时间"
                            modelValue={refCustomDate.value.start}
                            onUpdate:model-value={(d: Date) => {
                              refCustomDate.value.start = new Time(d)
                            }}
                          ></FormItem>
                          <FormItem
                            kind="date"
                            label="结束时间"
                            modelValue={refCustomDate.value.end}
                            onUpdate:model-value={(d: Date) => {
                              refCustomDate.value.end = new Time(d)
                            }}
                          ></FormItem>
                          <FormItem>
                            <div class={s.actions}>
                              <button
                                type="button"
                                onClick={() => (customOverlayShow.value = false)}
                              >
                                取消
                              </button>
                              <button type="submit">确认</button>
                            </div>
                          </FormItem>
                        </Form>
                      </main>
                    </div>
                  </Overlay>
                  <props.component
                    startDate={refCustomDate.value.start.format()}
                    endDate={refCustomDate.value.end.format()}
                  />
                </Tab>
              </Tabs>
            </div>
          )
        }}
      </MainLayout>
    )
  }
})
