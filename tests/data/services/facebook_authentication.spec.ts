import { LoadFacebookUserApi } from "@/data/contracts/apis"
import { FacebookAuthenticationService } from "@/data/services"
import { AuthenticationError } from "@/domain/errors"

import { mock } from 'jest-mock-extended'

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

describe('FacebookAuthenticationService', () => {
  test('should call loadFacebookUserApi with correct params', async () => {
    // const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    // const loadFacebookUserApi = {
    //   loadUser: jest.fn()
    // }
    const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({token: 'any_token'})

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
    // expect(loadFacebookUserApi.token).toBe('any_token')
    // expect(loadFacebookUserApi.callsCount).toBe(1)
  })

  test('should return AuthenticationError when loadFacebookUserApi returns undefined', async () => {
    // const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    // const loadFacebookUserApi = {
    //   loadUser: jest.fn()
    // }
    const loadFacebookUserApi = mock<LoadFacebookUserApi>()
    // loadFacebookUserApi.result = undefined
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const authResult = await sut.perform({token: 'any_token'})

    expect(authResult).toEqual(new AuthenticationError)
  })
})
