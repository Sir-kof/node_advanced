import { HttpGetClient } from "@/infra/gateways"

import axios from "axios"

export class AxiosHttpClient implements HttpGetClient {
  async get({ url, params }: HttpGetClient.Params): Promise<any> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
