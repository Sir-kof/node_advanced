import { PgRepository } from "@/infra/repos"
import { PgUserProfileRepository } from "@/infra/repos"

describe('PgUserProfileRepository', () => {
  test('should extends PgRepository', async () => {
    expect(new PgUserProfileRepository()).toBeInstanceOf(PgRepository)
  })
})
