export interface CreateComment {
  create: (params: CreateComment.Params) => Promise<CreateComment.Result>
}

export namespace CreateComment {
  export type Params = {
    rating: string
    comment: string
    company: any
    user: any
  }

  export type Result = undefined | {
    id: string | number
    rating: string
    comment: string
    company: any
    user: any
    createdAt: Date
    updatedAt: Date
  }
}

export interface LoadComment {
  load: (params: LoadComment.Params) => Promise<LoadComment.Result>
}

export namespace LoadComment {
  export type Params = {
    company: string | number
    user?: string | number
  }

  export type Result = undefined | {
    id: string | number
    rating: string
    comment: string
    company: any
    user: any
    createdAt: Date
    updatedAt: Date
  }
}

export interface UpdateComment {
  update: (params: UpdateComment.Params) => Promise<UpdateComment.Result>
}

export namespace UpdateComment {
  export type Params = {
    data: any
    id: string | number
  }

  export type Result = undefined | {
    id: string | number
    rating: string
    comment: string
    company: any
    user: any
    createdAt: Date
    updatedAt: Date
  }
}

export interface DeleteComment {
  delete: (params: DeleteComment.Params) => Promise<void>
}

export namespace DeleteComment {
  export type Params = {
    id: string | number
  }
}
