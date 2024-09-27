import { ConnectionNotFoundError, createQueryRunner, destroyConnection, initialize, isInitialized } from "@/infra/repos/postgres/helpers"
import { QueryRunner, Repository, ObjectType, ObjectLiteral } from "typeorm"

export class PgConnection {
  private static instance?: PgConnection
  private query?: QueryRunner

  private constructor () {}

  static getInstance (): PgConnection {
    if (PgConnection.instance === undefined) PgConnection.instance = new PgConnection()
    return PgConnection.instance
  }

  async initialize (): Promise<void> {
    if (await isInitialized() === false) {
      await initialize()
    }
  }

  async createQueryRunner (): Promise<void> {
    this.query = await createQueryRunner()
  }

  async openTransaction (): Promise<void> {
    if (this.query === undefined) throw new ConnectionNotFoundError()
    await this.query.startTransaction()
  }

  async closeTransaction (): Promise<void> {
    if (this.query === undefined) throw new ConnectionNotFoundError()
    await this.query.release()
  }

  async commit (): Promise<void> {
    if (this.query === undefined) throw new ConnectionNotFoundError()
    await this.query.commitTransaction()
  }

  async rollback (): Promise<void> {
    if (this.query === undefined) throw new ConnectionNotFoundError()
    await this.query.rollbackTransaction()
  }

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<ObjectLiteral> {
    if (this.query === undefined) throw new ConnectionNotFoundError()
    return this.query.manager.getRepository(entity)
  }

  async destroy (): Promise<void> {
    await destroyConnection()
  }
}
