import { HttpGetClient } from "@/infra/http"

import axios from 'axios'

jest.mock('axios')

export class AxiosHttpClient {
  async get(args: HttpGetClient.Params): Promise<void> {
    await axios.get(args.url, { params: args.params })
  }
}

export namespace AxiosHttpClient {
  export type Params = {

  }
}

describe('AxiosHttpClient', () => {
  let sut: AxiosHttpClient
  let fakeAxios: jest.Mocked<typeof axios>
  let url: string
  let params: object

  beforeAll(() => {
    url = 'any_url'
    params = { any: 'any' }
    fakeAxios = axios as jest.Mocked<typeof axios>
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  describe('get', () => {
    test('should call get with correct params', async () => {
      await sut.get({ url, params })

      expect(fakeAxios.get).toHaveBeenCalledWith(url, { params })
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})
