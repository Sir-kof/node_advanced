export interface CreateCompany {
  create: (params: CreateCompany.Params) => Promise<CreateCompany.Result>
}

export namespace CreateCompany {
  export type Params = {
    name: string
    hourOpen: string
    hourClose: string
    latitude: string
    longitude: string
    email: string
    coffeeSpace: string
    description?: string
    imageProfile?: string
    password: string
    rating: string
    city: string
    state: string
    whatsappLink?: string
    facebookLink?: string
    instagramLink?: string
  }

  export type Result = undefined | {
    id: string | number
    name: string
    hourOpen: string
    hourClose: string
    latitude: string
    longitude: string
    email: string
    coffeeSpace: string
    description: string
    imageProfile: string
    password: string
    rating: string
    city: string
    state: string
    whatsappLink: string
    facebookLink: string
    instagramLink: string
    createdAt: Date
    updatedAt: Date
  }
}

export interface LoadCompany {
  load: (params: LoadCompany.Params) => Promise<LoadCompany.Result>
}

export namespace LoadCompany {
  export type Params = {
    id: string | number
  }

  export type Result = undefined | {
    id: string | number
    name: string
    hourOpen: string
    hourClose: string
    latitude: string
    longitude: string
    email: string
    coffeeSpace: string
    description: string
    imageProfile: string
    password: string
    rating: string
    city: string
    state: string
    whatsappLink: string
    facebookLink: string
    instagramLink: string
    createdAt: Date
    updatedAt: Date
  }
}

export interface UpdateCompany {
  update: (params: UpdateCompany.Params) => Promise<UpdateCompany.Result>
}

export namespace UpdateCompany {
  export type Params = {
    data: any
    id: string | number
  }

  export type Result = undefined | {
    id: string | number
    name: string
    hourOpen: string
    hourClose: string
    latitude: string
    longitude: string
    email: string
    coffeeSpace: string
    description: string
    imageProfile: string
    password: string
    rating: string
    city: string
    state: string
    whatsappLink: string
    facebookLink: string
    instagramLink: string
    createdAt: Date
    updatedAt: Date
  }
}

export interface DeleteCompany {
  delete: (params: DeleteCompany.Params) => Promise<void>
}

export namespace DeleteCompany {
  export type Params = {
    id: string | number
  }
}
