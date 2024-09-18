import { FacebookLoginController } from '@/application/controllers'
import { makeFacebookAuthenticationService } from '@/main/factories/use_cases/facebook_authentication'

export const makeFacebookLoginController = (): FacebookLoginController => {
  return new FacebookLoginController(makeFacebookAuthenticationService())
}
