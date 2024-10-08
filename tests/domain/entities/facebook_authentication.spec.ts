import { FacebookAccount } from "@/domain/entities"

describe('FacebookAccount', () => {
  test('should create with facebook data only', () => {
    const fbData = {
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id',
    }
    const sut = new FacebookAccount(fbData)

    expect(sut).toEqual(fbData)
  })

  test('should update name if its empty', () => {
    const accountData = { id: 'any_id' }
    const fbData = {
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id',
    }
    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id',
    })
  })

  test('should not update name if its not empty', () => {
    const accountData = { id: 'any_id', name: 'any_name' }
    const fbData = {
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id',
    }
    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id',
    })
  })
})
