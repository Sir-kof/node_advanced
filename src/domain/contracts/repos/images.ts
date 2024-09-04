export interface CreateImage {
  create: (params: CreateImage.Params) => Promise<CreateImage.Result>
}

export namespace CreateImage {
  export type Params = {
    uri: string
    company: any
  }

  export type Result = undefined | {
    id: string | number
    uri: string
    company: any
    createdAt: Date
    updatedAt: Date
  }
}

export interface LoadImage {
  load: (params: LoadImage.Params) => Promise<LoadImage.Result>
}

export namespace LoadImage {
  export type Params = {
    company: any
  }

  export type Result = undefined | {
    id: string | number
    uri: string
    company: any
    createdAt: Date
    updatedAt: Date
  }
}

export interface UpdateImage {
  update: (params: UpdateImage.Params) => Promise<UpdateImage.Result>
}

export namespace UpdateImage {
  export type Params = {
    data: any
    id: string | number
  }

  export type Result = undefined | {
    id: string | number
    uri: string
    company: any
    createdAt: Date
    updatedAt: Date
  }
}

export interface DeleteImage {
  delete: (params: DeleteImage.Params) => Promise<void>
}

export namespace DeleteImage {
  export type Params = {
    id: string | number
  }
}
