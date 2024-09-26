import { initializeConnection, createQueryRunner } from "@/infra/helpers"

jest.mock("@/infra/helpers");

class PgConnection {
  private static instance?: PgConnection
  private constructor () {}

  static getInstance (): PgConnection {
    if (PgConnection.instance === undefined) PgConnection.instance = new PgConnection()
    return PgConnection.instance
  }

  async initialize (): Promise<void> {
    await initializeConnection()
  }

  async createQueryRunner (): Promise<void> {
    await createQueryRunner()
  }
}

describe('PgConnection', () => {
  test('should have only one instance', () => {
    const sut = PgConnection.getInstance()
    const sut2 = PgConnection.getInstance()

    expect(sut).toBe(sut2)
  })

  test('should initialize DB instance', async () => {
    const initializeSpy = jest.fn()
    jest.mocked(initializeConnection).mockImplementationOnce(initializeSpy)
    const sut = PgConnection.getInstance()

    await sut.initialize()

    expect(initializeSpy).toHaveBeenCalled();
    expect(initializeSpy).toHaveBeenCalledTimes(1);
  })

  test('should create query runner', async () => {
    const createQueryRunnerSpy = jest.fn()
    jest.mocked(createQueryRunner).mockImplementationOnce(createQueryRunnerSpy)
    const sut = PgConnection.getInstance()

    await sut.createQueryRunner()

    expect(createQueryRunnerSpy).toHaveBeenCalled();
    expect(createQueryRunnerSpy).toHaveBeenCalledTimes(1);
  })
})
