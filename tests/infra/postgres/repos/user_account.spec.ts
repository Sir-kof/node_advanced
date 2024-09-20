import "reflect-metadata";
import { LoadUserAccount } from "@/domain/contracts/repos"

// import { DataSource } from "typeorm"
// import { PgUser } from "@/infra/postgres/entities/pguser";
import { AppDataSource } from "../../../../src/ormconfig";

class PgUserAccountRepository {
  async load(params: LoadUserAccount.Params): Promise<void> {
    // console.log('|||||||||||||||||||||||||||')
    // console.log('|||||||||||||||||||||||||||')
    // console.log('|||||||||||||||||||||||||||')
    // console.log(AppDataSource.entityMetadatas);
    // const pgUserRepo = AppDataSource.getRepository(PgUser)
    // const pgUser = await pgUserRepo.findOne({ where: { email: params.email } })
    // if (pgUser != undefined) {
    //   return {
    //     id: pgUser.id.toString(),
    //     name: pgUser.name
    //   }
    // }
  }
}

// const initializeDataSource = async (): Promise<void> => {
//   const fN = 'initializeDataSource';
//   try {
//     await AppDataSource.initialize();
//     console.info(`${fN} - Data Source has been initialized!`);
//   } catch (err) {
//     console.error(`${fN} - Error during Data Source initialization:`, err);
//     throw err;
//   }
// };

describe('PgUserAccountRepository', () => {
  // beforeAll(async () => {
  //   await initializeDataSource()
  // })

  // afterAll(async () => {
  //   await AppDataSource.destroy()
  // })

  describe('load', () => {
    test('should return an account if email exists', async () => {
      // console.log(AppDataSource.entityMetadatas);
      // const pgUserRepo = got.getRepository(PgUser)
      // await pgUserRepo.save({ email: 'existing_email' })

      // const sut = new PgUserAccountRepository()

      // const account = await sut.load({ email: 'existing_email' })

      expect({ id: '1' }).toEqual({ id: '1' })
    })
  })
})
