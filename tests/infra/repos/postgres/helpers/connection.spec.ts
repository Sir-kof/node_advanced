import { ConnectionNotFoundError, createQueryRunner, initialize, isInitialized, PgConnection } from "@/infra/repos/postgres/helpers";

jest.mock("@/infra/repos/postgres/helpers/ormconfig_helper");

describe('PgConnection', () => {
  let initializeSpy: jest.Mock
  let isInitializedSpy: jest.Mock
  let startTransactionSpy: jest.Mock
  let createQueryRunnerSpy: jest.Mock
  let releaseSpy: jest.Mock
  let commitTransactionSpy: jest.Mock
  let rollbackTransactionSpy: jest.Mock
  let sut: PgConnection


  beforeAll(() => {
    initializeSpy = jest.fn()
    isInitializedSpy = jest.fn().mockReturnValue(true)
    startTransactionSpy = jest.fn()
    releaseSpy = jest.fn()
    commitTransactionSpy = jest.fn()
    rollbackTransactionSpy = jest.fn()
    createQueryRunnerSpy = jest.fn().mockReturnValue({
      startTransaction: startTransactionSpy,
      release: releaseSpy,
      commitTransaction: commitTransactionSpy,
      rollbackTransaction: rollbackTransactionSpy
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

  test('should close transaction', async () => {
    await sut.closeTransaction()

    expect(releaseSpy).toHaveBeenCalledWith();
    expect(releaseSpy).toHaveBeenCalledTimes(1);
  })

  test('should commit transaction', async () => {
    await sut.commit()

    expect(commitTransactionSpy).toHaveBeenCalledWith();
    expect(commitTransactionSpy).toHaveBeenCalledTimes(1);
  })

  test('should rollback transaction', async () => {
    await sut.rollback()

    expect(rollbackTransactionSpy).toHaveBeenCalledWith();
    expect(rollbackTransactionSpy).toHaveBeenCalledTimes(1);
  })
})
