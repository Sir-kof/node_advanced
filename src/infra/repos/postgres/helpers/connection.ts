import { createQueryRunner, initialize, isInitialized } from "@/infra/repos/postgres/helpers"

export class PgConnection {
  private static instance?: PgConnection
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
    await createQueryRunner()
  }
}
