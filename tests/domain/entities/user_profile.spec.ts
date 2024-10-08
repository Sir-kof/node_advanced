import { UserProfile } from "@/domain/entities"

describe('UserProfile', () => {
  let sut: UserProfile

  beforeEach(() => {
    sut = new UserProfile('any_id')
  })

  test('should create with empty initials when pictureUrl is provided', () => {
    sut.setPicture({ pictureUrl: 'any_url', name: 'any_name'})

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: undefined,
    })
  })

  test('should create with empty initials when pictureUrl is provided', () => {
    sut.setPicture({ pictureUrl: 'any_url'})

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: undefined,
    })
  })

  test('should create initials with first letter of first and last names', () => {
    sut.setPicture({ name: 'rodrigo fernandes'})

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'RF',
    })
  })

  test('should create initials with first two letters of first name', () => {
    sut.setPicture({ name: 'rodrigo'})

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'RO',
    })
  })

  test('should create initials with first letter', () => {
    sut.setPicture({ name: 'r'})

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'R',
    })
  })

  test('should create with empty initials when name and pictureUrl are not provided', () => {
    sut.setPicture({})

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: undefined,
    })
  })

  test('should create with empty initials when name and pictureUrl are not provided', () => {
    sut.setPicture({ name: '' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: undefined,
    })
  })
})
