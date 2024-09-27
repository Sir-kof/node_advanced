import { PgRepository } from "@/infra/repos/repository"
import { PgUserAccountRepository } from "@/infra/repos"

describe('PgUserAccountRepository', () => {
  test('should extend PgRepository', async () => {
    expect(new PgUserAccountRepository()).toBeInstanceOf(PgRepository)
  })
})
