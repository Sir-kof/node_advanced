import { LoadFacebookUserApi } from "@/domain/contracts/apis"
import { TokenGenerator } from "@/domain/contracts/crypto"
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from "@/domain/contracts/repos"
import { setupFacebookAuthentication, FacebookAuthentication } from '@/domain/use_cases'
import { AuthenticationError } from "@/domain/entities/errors"
import { AccessToken, FacebookAccount } from "@/domain/entities"

import { mock, MockProxy } from 'jest-mock-extended'

// class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
//   token?: string
//   callsCount = 0
//   result = undefined
//   async loadUser(params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
//     this.token = params.token
//     this.callsCount++
//     return this.result
//   }
// }

// type SutTypes ={
//   sut: FacebookAuthentication
//   loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
// }

// const makeSut = (): SutTypes => {
//   const loadFacebookUserApi = mock<LoadFacebookUserApi>()
//   const sut = new FacebookAuthentication(loadFacebookUserApi)
//   return {
//     sut,
//     loadFacebookUserApi
//   }
// }

jest.mock('@/domain/entities/facebook_account')

describe('FacebookAuthentication', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let crypto: MockProxy<TokenGenerator>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>
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
    crypto.generateToken.mockResolvedValue('any_generated_token')
  })

  beforeEach(() => {
    sut = setupFacebookAuthentication(
      facebookApi,
      userAccountRepo,
      crypto
    )
  })
  test('should call LoadFacebookUserApi with correct params', async () => {
    // const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    // const loadFacebookUserApi = {
    //   loadUser: jest.fn()
    // }
    // const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    // const sut = new FacebookAuthentication(loadFacebookUserApi)
    // const {sut, loadFacebookUserApi} = makeSut()

    await sut({token})

    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
    // expect(loadFacebookUserApi.token).toBe('any_token')
    // expect(loadFacebookUserApi.callsCount).toBe(1)
  })

  test('should throw AuthenticationError when loadFacebookUserApi returns undefined', async () => {
    // const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    // const loadFacebookUserApi = {
    //   loadUser: jest.fn()
    // }
    // const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    // const {sut, loadFacebookUserApi} = makeSut()
    // loadFacebookUserApi.result = undefined
    facebookApi.loadUser.mockResolvedValueOnce(undefined)
    // const sut = new FacebookAuthentication(loadFacebookUserApi)

    const promise = sut({token})

    await expect(promise).rejects.toThrow(new AuthenticationError)
  })

  test('should call LoadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
    await sut({token})

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email'})
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  test('should call SaveFacebookAccountRepository with FacebookAccount', async () => {
    const FacebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any'}))
    jest.mocked(FacebookAccount).mockImplementation(FacebookAccountStub)
    await sut({token})

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({ any: 'any'})
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  test('should call TokenGenerator with correct params', async () => {
    await sut({token})

    expect(crypto.generateToken).toHaveBeenCalledWith({
      key: 'any_account_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(crypto.generateToken).toHaveBeenCalledTimes(1)
  })

  test('should return an AccessToken on success', async () => {
    const authResult = await sut({token})

    expect(authResult).toEqual({ accessToken: 'any_generated_token' })
  })

  test('should rethrow if LoadFacebookUserApi throws', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('fb_error'))

    const promise = sut({token})

    await expect(promise).rejects.toThrow(new Error('fb_error'))
  })

  test('should rethrow if LoadUserAccountRepository throws', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load_error'))

    const promise = sut({token})

    await expect(promise).rejects.toThrow(new Error('load_error'))
  })

  test('should rethrow if SaveFacebookAccountRepository throws', async () => {
    userAccountRepo.saveWithFacebook.mockRejectedValueOnce(new Error('save_error'))

    const promise = sut({token})

    await expect(promise).rejects.toThrow(new Error('save_error'))
  })

  test('should rethrow if TokenGenerator throws', async () => {
    crypto.generateToken.mockRejectedValueOnce(new Error('token_error'))

    const promise = sut({token})

    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
