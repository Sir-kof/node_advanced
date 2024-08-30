export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<void>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    facebookId: string
    email: string
    name: string
  }
}
