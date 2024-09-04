export interface CreateFavorite {
  create: (params: CreateFavorite.Params) => Promise<CreateFavorite.Result>
}

export namespace CreateFavorite {
  export type Params = {
    company: any
    user: any
    identifier: string
  }

  export type Result = undefined | {
    id: string | number
    company: any
    user: any
    identifier: string
    createdAt: Date
    updatedAt: Date
  }
}

export interface LoadFavorite {
  load: (params: LoadFavorite.Params) => Promise<LoadFavorite.Result>
}

export namespace LoadFavorite {
  export type Params = {
    user: string | number
    identifier?: string
  }

  export type Result = undefined | {
    id: string | number
    company: any
    user: any
    identifier: string
    createdAt: Date
    updatedAt: Date
  }
}

export interface DeleteFavorite {
  delete: (params: DeleteFavorite.Params) => Promise<void>
}

export namespace DeleteFavorite {
  export type Params = {
    id: string | number
  }
}
