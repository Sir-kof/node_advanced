import { FacebookApi } from '@/infra/apis'
import { env } from '../../config/env'
import { makeAxiosHttpClient } from '@/main/factories/http'

export const makeFacebookApi = (): FacebookApi => {
  return new FacebookApi(makeAxiosHttpClient(), env.facebookApi.clientId, env.facebookApi.clientSecret)
}
