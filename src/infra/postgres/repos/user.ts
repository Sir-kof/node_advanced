import {AppDataSource} from '@/../ormconfig'
import { CreateUser, LoadUser, UpdateUser, DeleteUser } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'

type CreateParams = CreateUser.Params
type CreateResult = CreateUser.Result
type LoadParams = LoadUser.Params
type LoadResult = LoadUser.Result
type UpdateParams = UpdateUser.Params
type UpdateResult = UpdateUser.Result
type DeleteParams = DeleteUser.Params

export class PgUserRepository implements CreateUser, LoadUser, UpdateUser, DeleteUser {
  async create ({
    name,
    email,
  }: CreateParams): Promise<CreateResult> {
    try {
      const responseUser = await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(PgUser)
        .values([
          {
            name,
            email,
          }
        ])
        .execute()

      if (responseUser.raw[0].id !== undefined) {
        const dataUser: any = await AppDataSource
          .getRepository(PgUser)
          .createQueryBuilder('users')
          .where('users.id = :id', { id: responseUser.raw[0].id })
          .getOne()

        return {
          id: dataUser.id,
          name: dataUser.name,
          facebookId: dataUser.facebookId,
          googleId: dataUser.googleId,
          twitterId: dataUser.twitterId,
          email: dataUser.email,
          imageProfile: dataUser.imageProfile,
          password: dataUser.password,
          city: dataUser.city,
          state: dataUser.state,
          createdAt: dataUser.createdAt,
          updatedAt: dataUser.updateAt
        }
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async load ({ email }: LoadParams): Promise<LoadResult> {
    let dataUser: any
    try {
      dataUser = await AppDataSource
        .getRepository(PgUser)
        .createQueryBuilder('users')
        .where('users.email = :email', { email })
        .getOne()

      if (dataUser !== undefined) {
        return {
          id: dataUser.id,
          name: dataUser.name,
          facebookId: dataUser.facebookId,
          googleId: dataUser.googleId,
          twitterId: dataUser.twitterId,
          email: dataUser.email,
          imageProfile: dataUser.imageProfile,
          password: dataUser.password,
          city: dataUser.city,
          state: dataUser.state,
          createdAt: dataUser.createdAt,
          updatedAt: dataUser.updateAt
        }
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async update ({ data, email }: UpdateParams): Promise<UpdateResult> {
    try {
      const responseUser = await AppDataSource
        .createQueryBuilder()
        .update(PgUser)
        .set({
          name: data.name,
          email: data.email,
          imageProfile: data.imageProfile,
          password: data.password,
          city: data.city,
          state: data.state
        })
        .where('email = :email', { email })
        .execute()

      if (responseUser.affected === 1) {
        const dataUser: any = await AppDataSource
          .getRepository(PgUser)
          .createQueryBuilder('users')
          .where('users.email = :email', { email })
          .getOne()

        return {
          id: dataUser.id,
          name: dataUser.name,
          facebookId: dataUser.facebookId,
          googleId: dataUser.googleId,
          twitterId: dataUser.twitterId,
          email: dataUser.email,
          imageProfile: dataUser.imageProfile,
          password: dataUser.password,
          city: dataUser.city,
          state: dataUser.state,
          createdAt: dataUser.createdAt,
          updatedAt: dataUser.updateAt
        }
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async delete ({ email }: DeleteParams): Promise<void> {
    try {
      await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(PgUser)
        .where('users.email = :email', { email })
        .execute()
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
