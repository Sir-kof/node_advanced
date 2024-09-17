import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'
import {AppDataSource} from '../../../ormconfig'

type LoadParams = LoadUserAccount.Params
type LoadResult = LoadUserAccount.Result
type SaveParams = SaveFacebookAccount.Params
type SaveResult = SaveFacebookAccount.Result

export class PgUserAccountRepository implements LoadUserAccount, SaveFacebookAccount {
  async load ({ email }: LoadParams): Promise<LoadResult> {
    const dataUser = await AppDataSource
        .getRepository(PgUser)
        .createQueryBuilder('users')
        .where('users.email = :email', { email })
        .getOne()
    // const pgUserRepo = getRepository(PgUser)
    // const pgUser = await pgUserRepo.findOne({ email })
    if (dataUser !== undefined || dataUser !== null) {
      return {
        id: dataUser!.id.toString(),
        name: dataUser!.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveParams): Promise<SaveResult> {
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
          id: dataUser.id
        }
      }

      return {
        id: 'null'
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
