import "reflect-metadata"
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'nodetest',
  synchronize: true,
  logging: false,
  entities: ['src/infra/repos/postgres/entities/**/*{.ts,.js}'],
  migrations: ['src/infra/repos/postgres/migrations/**/*{.ts,.js}'],
  subscribers: []
})

export const initializeConnection = async (): Promise<void> => {
  await AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}

export const createQueryRunner = async (): Promise<void> => {}
