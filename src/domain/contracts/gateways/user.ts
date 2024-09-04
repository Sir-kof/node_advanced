export interface CreateUserGateway {
  upload: (input: CreateUserGateway.Input) => Promise<CreateUserGateway.Output>
}

export namespace CreateUserGateway {
  export type Input = { name: string, email: string, imageProfile?: string, password: string, city: string, state: string }
  export type Output = {
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

export interface LoadUserGateway {
  upload: (input: LoadUserGateway.Input) => Promise<LoadUserGateway.Output>
}

export namespace LoadUserGateway {
  export type Input = { email: string }
  export type Output = {
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

export interface UploadUserGateway {
  upload: (input: UploadUserGateway.Input) => Promise<UploadUserGateway.Output>
}

export namespace UploadUserGateway {
  export type Input = { data: any, email: string }
  export type Output = {
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

export interface DeleteUserGateway {
  delete: (input: DeleteUserGateway.Input) => Promise<void>
}

export namespace DeleteUserGateway {
  export type Input = { email: string }
}
