export interface CreateUser {
  create: (params: CreateUser.Params) => Promise<CreateUser.Result>
}

export namespace CreateUser {
  export type Params = {
    name: string
    email: string
  }

  export type Result = undefined | {
    id: string | number
    name: string
    facebookId?: string | number
    googleId?: string | number
    twitterId?: string | number
    email: string
    imageProfile: string
    password: string
    city: string
    state: string
    createdAt: Date
    updatedAt: Date
  }
}

export interface LoadUser {
  load: (params: LoadUser.Params) => Promise<LoadUser.Result>
}

export namespace LoadUser {
  export type Params = {
    email: string | number
  }

  export type Result = undefined | {
    id: string | number
    name: string
    facebookId?: string | number
    googleId?: string | number
    twitterId?: string | number
    email: string
    imageProfile: string
    password: string
    city: string
    state: string
    createdAt: Date
    updatedAt: Date
  }
}

export interface UpdateUser {
  update: (params: UpdateUser.Params) => Promise<UpdateUser.Result>
}

export namespace UpdateUser {
  export type Params = {
    data: any
    email: string | number
  }

  export type Result = undefined | {
    id: string | number
    name: string
    facebookId?: string | number
    googleId?: string | number
    twitterId?: string | number
    email: string
    imageProfile: string
    password: string
    city: string
    state: string
    createdAt: Date
    updatedAt: Date
  }
}

export interface DeleteUser {
  delete: (params: DeleteUser.Params) => Promise<void>
}

export namespace DeleteUser {
  export type Params = {
    email: string | number
  }
}
