import { HttpResponse, ok, serverError, unauthorized } from "@/application/helpers"
import { AccessToken, AuthenticationError } from "@/domain/entities"
import { ValidationBuilder as Builder, Validator } from "@/application/validation"
import { Controller } from "@/application/controllers"
import { FacebookAuthentication } from "@/domain/use_cases"

type HttpRequest = { token: string }
type Model = Error | { accessToken : string }

export class FacebookLoginController extends Controller {
  constructor(private readonly facebookAuthentication: FacebookAuthentication) {
    super()
  }

  async perform({ token }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const accessToken = await this.facebookAuthentication({ token })
      return accessToken instanceof AccessToken
        ? ok({accessToken: accessToken.value})
        : unauthorized()
    } catch (error: any) {
      return serverError(error)
    }
  }

  override buildValidators({ token }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: token, fieldName: 'token'}).required().build()
    ]
  }
}
