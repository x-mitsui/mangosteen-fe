import { defineComponent, ref } from 'vue'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import s from './ItemList.module.scss'
export const ItemList = defineComponent({
  setup(props, context) {
    const refTabSelected = ref('本月')
    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: (kclass: string) => <Icon name="menu" class={kclass}></Icon>,
          main: () => (
            <div>
              <Tabs v-model:selected={refTabSelected.value} classPrefix="customTabs">
                <Tab name="本月">本月</Tab>
                <Tab name="上个月">上个月</Tab>
                <Tab name="今年">今年</Tab>
                <Tab name="自定义起始时间">自定义起始时间</Tab>
              </Tabs>
            </div>
          )
        }}
      </MainLayout>
    )
  }
})
