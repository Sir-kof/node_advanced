import { FacebookApi } from "@/infra/apis"
import { AxiosHttpClient } from "@/infra/http"
import { env } from "@/main/config/env"

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
  })
  test('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAG5wyuZBRjABO5RmPFRqiMwHkQcvRIuLBO8I5H9ZB7klWVtSICE2TSZCVnF47tf7Ewuasbyl3yAyZA8PZC7ZCOQdt7RGEeFX5GKos9u9WempsDQHA5OUY31mqjmFnlPtGGZCdOk4KS668fdloe2yLn7PVVj2zTdGxhPCsS9QGcQwFbu1XLaSL7R2sXgYGnoFz9DuOC8i8dxMZCsyJ9NT9ePDYzWKwZDZD' })

    expect(fbUser).toEqual({
      facebookId: '100667956249300',
      email: 'rodrigo_mkbekkn_fernandes@tfbnw.net',
      name: 'Rodrigo Fernandes'
    })
  })

  test('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
