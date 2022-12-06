import axios, { AxiosResponse } from 'axios'
import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBool } from '../hooks/useBool'
import { MainLayout } from '../layouts/MainLayout'
import { BackBtn } from '../shared/BackBtn'
import { Button } from '../shared/Button'
import { Form, FormItem } from '../shared/Form'
import { http } from '../shared/Http'
import { Icon } from '../shared/Icon'
import { onFormError } from '../shared/onFormError'
import { refreshMe } from '../shared/RefreshMe'
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
    const route = useRoute()
    const errorFunc = (data: ResourceError) => {
      Object.assign(errors, data.errors)
    }
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
      const response = await http
        .post<{ jwt: string }>('/session', formData)
        .catch((err) => onFormError(err, errorFunc))
      if (!response) {
        alert('建立会话失败~')
        return
      }
      const jwt = response.data.jwt

      localStorage.setItem('jwt', jwt)
      refreshMe().then(
        () => {
          router.push(route.query.return_to?.toString() || '/')
        },
        (err) => {
          alert('登录失败')
        }
      )
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
        .catch((err) => onFormError(err, errorFunc))
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
          icon: () => <BackBtn />,
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
