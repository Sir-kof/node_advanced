import { LoadFacebookUserApi } from "@/data/contracts/apis"
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from "@/data/contracts/repos"
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
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>
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
    userAccountRepo.load.mockResolvedValue(undefined)
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

  test('should create account with facebook data', async () => {
    await sut.perform({token})

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  test('should not update account name', async () => {
    userAccountRepo.load.mockResolvedValueOnce({
      id: 'any_id',
      name: 'any_name'
    })

    await sut.perform({token})

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'any_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  test('should update account name', async () => {
    userAccountRepo.load.mockResolvedValueOnce({
      id: 'any_id',
    })

    await sut.perform({token})

    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({
      id: 'any_id',
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })
})
