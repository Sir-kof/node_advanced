export interface CreateProduct {
  create: (params: CreateProduct.Params) => Promise<CreateProduct.Result>
}

export namespace CreateProduct {
  export type Params = {
    name: string
    image?: string
    avaliable: string
    price: string
    company: any
  }

  export type Result = undefined | {
    id: string | number
    name: string
    image?: string
    avaliable: string
    price: string
    company: any
    createdAt: Date
    updatedAt: Date
  }
}

export interface LoadProduct {
  load: (params: LoadProduct.Params) => Promise<LoadProduct.Result>
}

export namespace LoadProduct {
  export type Params = {
    company: any
    name?: string | number
    id?: string | number
  }

  export type Result = undefined | {
    id: string | number
    name: string
    image?: string
    avaliable: string
    price: string
    company: any
    createdAt: Date
    updatedAt: Date
  }
}

export interface UpdateProduct {
  update: (params: UpdateProduct.Params) => Promise<UpdateProduct.Result>
}

export namespace UpdateProduct {
  export type Params = {
    data: any
    id: string | number
  }

  export type Result = undefined | {
    id: string | number
    name: string
    image?: string
    avaliable: string
    price: string
    company: any
    createdAt: Date
    updatedAt: Date
  }
}

export interface DeleteProduct {
  delete: (params: DeleteProduct.Params) => Promise<void>
}

export namespace DeleteProduct {
  export type Params = {
    id: string | number
  }
}
