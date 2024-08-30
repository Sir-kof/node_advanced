import { LoadFacebookUserApi } from "@/data/contracts/apis"
import { CreateFacebookAccountRepository, LoadUserAccountRepository, UpdateFacebookAccountRepository } from "@/data/contracts/repos"
import { FacebookAuthenticationService } from "@/data/services"
import { AuthenticationError } from "@/domain/errors"

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
//   sut: FacebookAuthenticationService
//   loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
// }

// const makeSut = (): SutTypes => {
//   const loadFacebookUserApi = mock<LoadFacebookUserApi>()
//   const sut = new FacebookAuthenticationService(loadFacebookUserApi)
//   return {
//     sut,
//     loadFacebookUserApi
//   }
// }

describe('FacebookAuthenticationService', () => {
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & CreateFacebookAccountRepository & UpdateFacebookAccountRepository>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id',
    })
    userAccountRepo = mock()
    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccountRepo,
    )
  })
  test('should call loadFacebookUserApi with correct params', async () => {
    // const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    // const loadFacebookUserApi = {
    //   loadUser: jest.fn()
    // }
    // const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    // const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    // const {sut, loadFacebookUserApi} = makeSut()

    await sut.perform({token})

    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
    // expect(loadFacebookUserApi.token).toBe('any_token')
    // expect(loadFacebookUserApi.callsCount).toBe(1)
  })

  test('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
    // const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    // const loadFacebookUserApi = {
    //   loadUser: jest.fn()
    // }
    // const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    // const {sut, loadFacebookUserApi} = makeSut()
    // loadFacebookUserApi.result = undefined
    facebookApi.loadUser.mockResolvedValueOnce(undefined)
    // const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const authResult = await sut.perform({token})

    expect(authResult).toEqual(new AuthenticationError)
  })

  test('should call LoadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
    await sut.perform({token})

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email'})
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  test('should call CreateFacebookAccountRepo when LoadFacebookUserApi returns undefined', async () => {
    userAccountRepo.load.mockResolvedValueOnce(undefined)

    await sut.perform({token})

    expect(userAccountRepo.createFromFacebook).toHaveBeenCalledWith({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    expect(userAccountRepo.createFromFacebook).toHaveBeenCalledTimes(1)
  })

  test('should call UpdateFacebookAccountRepo when LoadFacebookUserApi returns data', async () => {
    userAccountRepo.load.mockResolvedValueOnce({
      id: 'any_id',
      name: 'any_name'
    })

    await sut.perform({token})

    expect(userAccountRepo.updateWithFacebook).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'any_name',
      facebookId: 'any_fb_id'
    })
    expect(userAccountRepo.updateWithFacebook).toHaveBeenCalledTimes(1)
  })
})
