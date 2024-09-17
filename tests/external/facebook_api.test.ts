import { FacebookApi } from "@/infra/apis"
import { AxiosHttpClient } from "@/infra/http"
import { env } from "@/main/config/env"

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi
  let token: string

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(axiosClient, env.facebookApi.clientId, env.facebookApi.clientSecret)
    token = 'EAAG5wyuZBRjABO3oIFebZCbTMxh4BG1RZAdY0ZADKU5ULGWTa8QfnTNpXtRaG11TlLPR6D1hFJEvatvuuys1ZAuO9XpfJzJZCZAsR33TQs9rAqbDrzz4YdIuyF84PTs33A5ZCVRr8BKnbtkbN7j1oPEDgU243jJamlKQ20ayZCiMrFH4SQWZAZAgHNrybZCNFryXhaY9xqAzBR6Lxhw36Ql6yfvWHSyplgZDZD'
  })
  test('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token })

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
