import { createQueryRunner, initialize, isInitialized, PgConnection } from "@/infra/repos/postgres/helpers";

jest.mock("@/infra/repos/postgres/helpers/ormconfig_helper");

describe('PgConnection', () => {
  let initializeSpy: jest.Mock
  let isInitializedSpy: jest.Mock
  let createQueryRunnerSpy: jest.Mock
  let sut: PgConnection


  beforeAll(() => {
    initializeSpy = jest.fn()
    isInitializedSpy = jest.fn().mockReturnValue(true)
    createQueryRunnerSpy = jest.fn()
    jest.mocked(initialize).mockImplementation(initializeSpy)
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
