import { UniqueId } from "@/infra/gateways"

describe('UniqueId', () => {
  test('should call unique id', () => {
    const sut = new UniqueId(new Date(2021, 9, 10, 10, 10, 10))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_20211010101010')
  })
})
