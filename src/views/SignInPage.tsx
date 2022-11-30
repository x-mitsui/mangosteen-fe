import axios from 'axios'
import { defineComponent, reactive } from 'vue'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../shared/Button'
import { Form, FormItem } from '../shared/Form'
import { Icon } from '../shared/Icon'
import { validate } from '../shared/validate'
import s from './SignInPage.module.scss'
export const SignInPage = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      email: 'x_mitsui@163.com',
      code: ''
    })
    const errors = reactive({
      email: [],
      code: []
    })
    const onSubmit = (e: Event) => {
      e.preventDefault()
      Object.assign(errors, {
        email: [],
        code: []
      })
      Object.assign(
        errors,
        validate(formData, [
          { key: 'email', type: 'required', message: '必填' },
          { key: 'email', type: 'pattern', reg: /.+@.+/, message: '必须是邮箱地址' },
          { key: 'code', type: 'required', message: '必填' }
        ])
      )
    }
    const onSendValidateCode = async (e: Event) => {
      console.log('发送请求')
      const res = await axios.post('/api/v1/validation_codes', { email: formData.email })
      console.log('res:', res)
    }
    return () => (
      <MainLayout>
        {{
          title: () => '登录',
          icon: () => <Icon name="back" />,
          main: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="mangosteen" />
                <h1 class={s.appName}>山竹记账</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  kind="text"
                  placeholder="请输入邮箱，然后点击发送验证码"
                  v-model={formData.email}
                  errors={errors.email?.[0]}
                />
                <FormItem
                  label="验证码"
                  kind="validationCode"
                  placeholder="请输入六位数字"
                  v-model={formData.code}
                  errors={errors.code?.[0]}
                  onClick={onSendValidateCode}
                  timeFrom={3}
                />
                <FormItem style={{ paddingTop: '96px' }}>
                  <Button style={{ width: '100%' }}>登录</Button>
                </FormItem>
              </Form>
            </div>
          )
        }}
      </MainLayout>
    )
  }
})
