import { AxiosError } from 'axios'

export const onFormError = (
  err: AxiosError<ResourceError>,
  func: (errors: ResourceError) => void
) => {
  if (err.response?.status === 422) {
    func(err.response.data)
  }
}
