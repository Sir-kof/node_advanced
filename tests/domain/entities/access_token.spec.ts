import { AccessToken } from "@/domain/entities"

describe('AccessToken', () => {
  test('should expire in 1800000 ms', () => {
    expect(AccessToken.expirationInMs).toBe(1800000)
  })
})
