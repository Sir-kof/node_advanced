import { HttpGetClient } from "../http"
import { LoadFacebookUser } from "@/domain/contracts/gateways"

type AppToken = {
  access_token: string
}

type DebugToken = {
  data: {
    user_id: string
  }
}

type UserInfo = {
  facebookId: string
  name: string
  email: string
}

type Params = LoadFacebookUser.Params
type Result = LoadFacebookUser.Result

export class FacebookApi implements LoadFacebookUser {
  private readonly baseUrl = 'https://graph.facebook.com'

  constructor(
    private readonly httpClient: HttpGetClient,
    private readonly clientId: string,
    private readonly clientSecret: string,
  ) {}

  async loadUser({ token }: Params): Promise<Result> {
    try {
      // console.log(await this.getUserInfo(params.token))
      return this.getUserInfo(token)
        .then(userInfo => {
          console.log('email',userInfo.email)
          console.log(userInfo)
          return { facebookId: userInfo.facebookId, name: userInfo.name, email: userInfo.email }
      })
        .catch((e) => {
          console.error('retornou erro ao chamar', e)
          return undefined
        })
      // return {
      //   facebookId: '100667956249300',
      //   email: 'rodrigo_mkbekkn_fernandes@tfbnw.net',
      //   name: 'Rodrigo Fernandes'
      // }
    } catch (error) {
      return undefined
    }
  }

  private async getAppToken(): Promise<AppToken> {
    return this.httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials',
      }
    })
  }

  private async getDebugToken(clientToken: string): Promise<DebugToken> {
    const appToken = await this.getAppToken()
    return this.httpClient.get({
      url: `${this.baseUrl}/debug_token`,
      params: {
        access_token: appToken.access_token,
        input_token: clientToken,
      }
    })
  }

  private async getUserInfo(clientToken: string): Promise<UserInfo> {
    const debugToken = await this.getDebugToken(clientToken)
    const fieldsRequest = ['id', 'name', 'email'].join(',')
    const userInfo = await this.httpClient.get({
      url: `${this.baseUrl}/${debugToken.data.user_id}`,
      params: {
        fields: fieldsRequest,
        access_token: clientToken,
      }
    })
    return userInfo
  }
}
