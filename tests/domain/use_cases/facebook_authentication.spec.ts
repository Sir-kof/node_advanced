import { LoadFacebookUser, TokenGenerator } from "@/domain/contracts/gateways"
import { LoadUserAccount, SaveFacebookAccount } from "@/domain/contracts/repos"
import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use_cases'
import { AuthenticationError } from "@/domain/entities/errors"
import { AccessToken, FacebookAccount } from "@/domain/entities"

import { mock, MockProxy } from 'jest-mock-extended'

// class LoadFacebookUserSpy implements LoadFacebookUser {
//   token?: string
//   callsCount = 0
//   result = undefined
//   async loadUser(params: LoadFacebookUser.Params): Promise<LoadFacebookUser.Result> {
//     this.token = params.token
//     this.callsCount++
//     return this.result
//   }
// }

// type SutTypes ={
//   sut: FacebookAuthentication
//   LoadFacebookUser: MockProxy<LoadFacebookUser>
// }

// const makeSut = (): SutTypes => {
//   const LoadFacebookUser = mock<LoadFacebookUser>()
//   const sut = new FacebookAuthentication(LoadFacebookUser)
//   return {
//     sut,
//     LoadFacebookUser
//   }
// }

jest.mock('@/domain/entities/facebook_account')

describe('FacebookAuthentication', () => {
  let facebookApi: MockProxy<LoadFacebookUser>
  let crypto: MockProxy<TokenGenerator>
  let userAccountRepo: MockProxy<LoadUserAccount & SaveFacebookAccount>
  let sut: FacebookAuthentication
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id',
    })
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(undefined)
    userAccountRepo.saveWithFacebook.mockResolvedValue({ id: 'any_account_id' })
    crypto = mock()
    crypto.generate.mockResolvedValue('any_generated_token')
  })

  beforeEach(() => {
    sut = setupFacebookAuthentication(
      facebookApi,
      userAccountRepo,
      crypto
    )
  })
  test('should call LoadFacebookUser with correct params', async () => {
    // const LoadFacebookUser = new LoadFacebookUserSpy()
    // const LoadFacebookUser = {
    //   loadUser: jest.fn()
    // }
    // const LoadFacebookUser = mock<LoadFacebookUser>()
    // const sut = new FacebookAuthentication(LoadFacebookUser)
    // const {sut, LoadFacebookUser} = makeSut()

    await sut({token})

    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
    // expect(LoadFacebookUser.token).toBe('any_token')
    // expect(LoadFacebookUser.callsCount).toBe(1)
  })

  test('should throw AuthenticationError when LoadFacebookUser returns undefined', async () => {
    // const LoadFacebookUser = new LoadFacebookUserSpy()
    // const LoadFacebookUser = {
    //   loadUser: jest.fn()
    // }
    // const LoadFacebookUser = mock<LoadFacebookUser>()
    // const {sut, LoadFacebookUser} = makeSut()
    // LoadFacebookUser.result = undefined
    facebookApi.loadUser.mockResolvedValueOnce(undefined)
    // const sut = new FacebookAuthentication(LoadFacebookUser)

    const promise = sut({token})

    await expect(promise).rejects.toThrow(new AuthenticationError)
  })

  test('should call LoadUserAccountRepo when LoadFacebookUser returns data', async () => {
    await sut({token})

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email'})
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  test('should call SaveFacebookAccount with FacebookAccount', async () => {
    const FacebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any'}))
    jest.mocked(FacebookAccount).mockImplementation(FacebookAccountStub)
    await sut({token})

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({ any: 'any'})
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  test('should call TokenGenerator with correct params', async () => {
    await sut({token})

    expect(crypto.generate).toHaveBeenCalledWith({
      key: 'any_account_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(crypto.generate).toHaveBeenCalledTimes(1)
  })

  test('should return an AccessToken on success', async () => {
    const authResult = await sut({token})

    expect(authResult).toEqual({ accessToken: 'any_generated_token' })
  })

  test('should rethrow if LoadFacebookUser throws', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('fb_error'))

    const promise = sut({token})

    await expect(promise).rejects.toThrow(new Error('fb_error'))
  })

  test('should rethrow if LoadUserAccount throws', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load_error'))

    const promise = sut({token})

    await expect(promise).rejects.toThrow(new Error('load_error'))
  })

  test('should rethrow if SaveFacebookAccount throws', async () => {
    userAccountRepo.saveWithFacebook.mockRejectedValueOnce(new Error('save_error'))

    const promise = sut({token})

    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  test('should rethrow if TokenGenerator throws', async () => {
    crypto.generate.mockRejectedValueOnce(new Error('token_error'))

    const promise = sut({token})

    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
