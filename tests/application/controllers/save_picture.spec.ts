import { Controller, SavePictureController } from "@/application/controllers"
import { InvalidMimeTypeError, MaxFileSizeError, RequiredFieldError } from "@/application/errors"
import { AllowedMimeTypes, MaxFileSize, Required, RequiredBuffer } from "@/application/validation"

describe('SavePictureController', () => {
  let buffer: Buffer
  let mimeType: string
  let file: { buffer: Buffer, mimeType: string }
  let userId: string
  let sut: SavePictureController
  let changeProfilePicture: jest.Mock

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
    mimeType = 'image/png'
    file = { buffer, mimeType }
    userId = 'any_user_id'
    changeProfilePicture = jest.fn().mockResolvedValue({ initials: 'any_initials', pictureUrl: 'any_url' })
  })

  beforeEach(() => {
    sut = new SavePictureController(changeProfilePicture)
  })

  test('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  test('should build Validators correctly on save', async () => {
    const validators = sut.buildValidators({ file, userId })

    expect(validators).toEqual([
      new Required(file, 'file'),
      new RequiredBuffer(buffer, 'file'),
      new AllowedMimeTypes(['png', 'jpg'], mimeType),
      new MaxFileSize(5, buffer)
    ])
  })

  test('should build Validators correctly on delete', async () => {
    const validators = sut.buildValidators({ file: undefined, userId })

    expect(validators).toEqual([])
  })

  // test('should return 400 if file is not provided', async () => {
  //   const httpResponse = await sut.handle({ file: undefined as any, userId })

  //   expect(httpResponse).toEqual({
  //     statusCode: 400,
  //     data: new RequiredFieldError('file')
  //   })
  // })

  // test('should return 400 if file is not provided', async () => {
  //   const httpResponse = await sut.handle({ file: null as any, userId })

  //   expect(httpResponse).toEqual({
  //     statusCode: 400,
  //     data: new RequiredFieldError('file')
  //   })
  // })

  // test('should return 400 if file is empty', async () => {
  //   const httpResponse = await sut.handle({ file: { buffer: Buffer.from(''), mimeType }, userId })

  //   expect(httpResponse).toEqual({
  //     statusCode: 400,
  //     data: new RequiredFieldError('file')
  //   })
  // })

  // test('should return 400 if file type is invalid', async () => {
  //   const httpResponse = await sut.handle({ file: { buffer, mimeType: 'invalid_type' }, userId })

  //   expect(httpResponse).toEqual({
  //     statusCode: 400,
  //     data: new InvalidMimeTypeError(['png', 'jpeg'])
  //   })
  // })

  // test('should not return 400 if file type is valid', async () => {
  //   const httpResponse = await sut.handle({ file: { buffer, mimeType: 'image/png' }, userId })

  //   expect(httpResponse).not.toEqual({
  //     statusCode: 400,
  //     data: new InvalidMimeTypeError(['png', 'jpeg'])
  //   })
  // })

  // test('should not return 400 if file type is valid', async () => {
  //   const httpResponse = await sut.handle({ file: { buffer, mimeType: 'image/jpg' }, userId })

  //   expect(httpResponse).not.toEqual({
  //     statusCode: 400,
  //     data: new InvalidMimeTypeError(['png', 'jpeg'])
  //   })
  // })

  // test('should not return 400 if file type is valid', async () => {
  //   const httpResponse = await sut.handle({ file: { buffer, mimeType: 'image/jpeg' }, userId })

  //   expect(httpResponse).not.toEqual({
  //     statusCode: 400,
  //     data: new InvalidMimeTypeError(['png', 'jpeg'])
  //   })
  // })

  // test('should return 400 if file size is bigger than 5MB', async () => {
  //   const invalidBuffer = Buffer.from(new ArrayBuffer(6 * 1024 * 1024))
  //   const httpResponse = await sut.handle({ file: { buffer: invalidBuffer, mimeType }, userId })

  //   expect(httpResponse).toEqual({
  //     statusCode: 400,
  //     data: new MaxFileSizeError(5)
  //   })
  // })

  test('should call ChangeProfilePicture with correct input', async () => {
    await sut.handle({ file, userId })

    expect(changeProfilePicture).toHaveBeenCalledWith({ id: userId, file })
    expect(changeProfilePicture).toHaveBeenCalledTimes(1)
  })

  test('should return 200 with valid data', async () => {
    const httpResponse = await sut.handle({ file, userId })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: { initials: 'any_initials', pictureUrl: 'any_url' }
    })
  })
})
