import { initializeConnection, createQueryRunner, isInitialized } from "@/infra/helpers"

jest.mock("@/infra/helpers");

class PgConnection {
  private static instance?: PgConnection
  private constructor () {}

  static getInstance (): PgConnection {
    if (PgConnection.instance === undefined) PgConnection.instance = new PgConnection()
    return PgConnection.instance
  }

  async initialize (): Promise<void> {
    if (await isInitialized() === false) {
      await initializeConnection()
    }
  }

  async createQueryRunner (): Promise<void> {
    await createQueryRunner()
  }
}

describe('PgConnection', () => {
  let initializeSpy: jest.Mock
  let isInitializedSpy: jest.Mock
  let createQueryRunnerSpy: jest.Mock
  let sut: PgConnection


  beforeAll(() => {
    initializeSpy = jest.fn()
    isInitializedSpy = jest.fn().mockReturnValue(true)
    createQueryRunnerSpy = jest.fn()
    jest.mocked(initializeConnection).mockImplementation(initializeSpy)
    jest.mocked(isInitialized).mockImplementation(isInitializedSpy)
    jest.mocked(createQueryRunner).mockImplementation(createQueryRunnerSpy)
  })

  beforeEach(() => {
    sut = PgConnection.getInstance()
  })

  test('should have only one instance', () => {
    const sut2 = PgConnection.getInstance()

    expect(sut).toBe(sut2)
  })

  test('should initialize DB instance', async () => {
    isInitializedSpy.mockReturnValue(false)

    await sut.initialize()

    expect(initializeSpy).toHaveBeenCalled();
    expect(initializeSpy).toHaveBeenCalledTimes(1);
  })

  test('should create query runner', async () => {
    await sut.createQueryRunner()

    expect(createQueryRunnerSpy).toHaveBeenCalled();
    expect(createQueryRunnerSpy).toHaveBeenCalledTimes(1);
  })
})
