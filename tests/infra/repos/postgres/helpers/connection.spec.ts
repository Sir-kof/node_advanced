import { ConnectionNotFoundError, createQueryRunner, initialize, isInitialized, PgConnection } from "@/infra/repos/postgres/helpers";

jest.mock("@/infra/repos/postgres/helpers/ormconfig_helper");

describe('PgConnection', () => {
  let initializeSpy: jest.Mock
  let isInitializedSpy: jest.Mock
  let startTransactionSpy: jest.Mock
  let createQueryRunnerSpy: jest.Mock
  let sut: PgConnection


  beforeAll(() => {
    initializeSpy = jest.fn()
    isInitializedSpy = jest.fn().mockReturnValue(true)
    startTransactionSpy = jest.fn()
    createQueryRunnerSpy = jest.fn().mockReturnValue({
      startTransaction: startTransactionSpy
    })
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

    expect(initializeSpy).toHaveBeenCalledWith();
    expect(initializeSpy).toHaveBeenCalledTimes(1);
  })

  test('should create query runner', async () => {
    await sut.createQueryRunner()

    expect(createQueryRunnerSpy).toHaveBeenCalledWith();
    expect(createQueryRunnerSpy).toHaveBeenCalledTimes(1);
  })

  test('should open transaction', async () => {
    await sut.openTransaction()

    expect(startTransactionSpy).toHaveBeenCalledWith();
    expect(startTransactionSpy).toHaveBeenCalledTimes(1);
  })
})
