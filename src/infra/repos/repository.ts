import { PgConnection } from './postgres/helpers'

import { ObjectLiteral, ObjectType, Repository } from 'typeorm'

export abstract class PgRepository {
  constructor (private readonly connection: PgConnection = PgConnection.getInstance()) {}

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<ObjectLiteral> {
    return this.connection.getRepository(entity)
  }
}
