import axios, { AxiosResponse } from 'axios'
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBool } from '../hooks/useBool'
import { MainLayout } from '../layouts/MainLayout'
import { Button } from '../shared/Button'
import { Form, FormItem } from '../shared/Form'
import { http } from '../shared/Http'
import { Icon } from '../shared/Icon'
import { hasError, validate } from '../shared/validate'
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
    const validationCodeRef = ref()
    const router = useRouter()

    const onSubmit = async (e: Event) => {
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
      if (hasError(errors)) {
        return
      }
      const response = await http.post<{ jwt: string }>('/session', formData).catch(onError)
      const jwt = response.data.jwt

      localStorage.setItem('jwt', jwt)

      router.push(localStorage.getItem('return_to') || '/')
    }
    const onError = (err: any) => {
      if (err.response.status === 422) {
        Object.assign(errors, err.response.data.errors)
      }
      throw err //一直抛，一直抛，直到有人处理，或者决定不处理
    }
    const { on: setBtnDisabled, off: setBtnEnabled, refVal } = useBool(false)
    const onSendValidateCode = async (e: Event) => {
      Object.assign(errors, {
        email: []
      })

      Object.assign(
        errors,
        validate(formData, [
          { key: 'email', type: 'required', message: '必填' },
          { key: 'email', type: 'pattern', reg: /.+@.+/, message: '必须是邮箱地址' }
        ])
      )

      if (hasError(errors)) {
        return
      }
      setBtnDisabled()
      const res = await http
        .post('/validation_codes', { email: formData.email })
        .catch(onError)
        .finally(() => {
          setBtnEnabled()
        })
      validationCodeRef.value.sendCode()
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
                  ref={validationCodeRef}
                  label="验证码"
                  kind="validationCode"
                  placeholder="请输入六位数字"
                  v-model={formData.code}
                  errors={errors.code?.[0]}
                  onClick={onSendValidateCode}
                  buttonDisabled={refVal.value}
                  timeFrom={3}
                />
                <FormItem style={{ paddingTop: '96px' }}>
                  <Button style={{ width: '100%' }} type="submit">
                    登录
                  </Button>
                </FormItem>
              </Form>
            </div>
          )
        }}
      </MainLayout>
    )
  }
})
