import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { Icon } from '../../shared/Icon'
import { EmojiSelected } from './EmojiSelected'
import { emojiList } from '../../shared/emojiList'
import s from './TagCreate.module.scss'
export const TagCreate = defineComponent({
  name: 'TagCreate',
  setup(props, context) {
    const refSelectedValue = ref('')
    const router = useRouter()
    const table: [string, string[]][] = [
      [
        '表情',
        [
          'face-smiling',
          'face-affection',
          'face-tongue',
          'face-hand',
          'face-neutral-skeptical',
          'face-sleepy',
          'face-unwell',
          'face-hat',
          'face-glasses',
          'face-concerned',
          'face-negative',
          'face-costume'
        ]
      ],
      [
        '手势',
        [
          'hand-fingers-open',
          'hand-fingers-partial',
          'hand-single-finger',
          'hand-fingers-closed',
          'hands',
          'hand-prop',
          'body-parts'
        ]
      ],
      [
        '人物',
        [
          'person',
          'person-gesture',
          'person-role',
          'person-fantasy',
          'person-activity',
          'person-sport',
          'person-resting'
        ]
      ],
      ['衣服', ['clothing']],
      [
        '动物',
        [
          'cat-face',
          'monkey-face',
          'animal-mammal',
          'animal-bird',
          'animal-amphibian',
          'animal-reptile',
          'animal-marine',
          'animal-bug'
        ]
      ],
      ['植物', ['plant-flower', 'plant-other']],
      ['自然', ['sky & weather', 'science']],
      [
        '食物',
        ['food-fruit', 'food-vegetable', 'food-prepared', 'food-asian', 'food-marine', 'food-sweet']
      ],
      ['运动', ['sport', 'game']]
    ]
    const newTable: Record<string, string[]> = {}
    table.map((item) => {
      const alias = item[1]
      const box: string[] = []
      alias.forEach((aItem) => {
        const findz = emojiList.find((emojiItem) => emojiItem[0] === aItem)
        if (findz) {
          box.push(...findz[1])
        }
      })
      newTable[item[0]] = box
    })
    console.log(newTable[0])
    const onUpdateValue = (val: string) => {
      refSelectedValue.value = val
    }
    const goBack = () => {
      router.push('/start')
    }
    return () => (
      <MainLayout>
        {{
          title: () => '新建标签',
          icon: (kclass: string) => <Icon name="back" class={kclass} onClick={goBack} />,
          main: () => (
            <>
              <form>
                <label>
                  <span>标签名</span>
                  <input type="text" />
                </label>
                <label>
                  <span>符号</span>
                  <span>符合</span>
                  <EmojiSelected></EmojiSelected>
                </label>
              </form>
            </>
          )
        }}
      </MainLayout>
    )
  }
})
