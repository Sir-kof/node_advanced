import "reflect-metadata"
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'docker',
  database: 'oni',
  synchronize: true,
  logging: false,
  entities: ['src/infra/postgres/entities/**/*{.ts,.js}'],
  migrations: ['src/infra/postgres/migrations/**/*{.ts,.js}'],
  subscribers: []
})
