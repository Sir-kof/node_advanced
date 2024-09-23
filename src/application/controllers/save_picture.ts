import { HttpResponse, ok } from "@/application/helpers"
import { ChangeProfilePicture } from "@/domain/use_cases"
import { Controller } from "@/application/controllers"
import { ValidationBuilder as Builder, Validator } from "@/application/validation"

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string }

export class SavePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    // if (file === undefined || file === null) return badRequest(new RequiredFieldError('file'))
    // if (file.buffer.length === 0) return badRequest(new RequiredFieldError('file'))
    // if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimeType)) return badRequest(new InvalidMimeTypeError(['png', 'jpeg']))
    // if (file.buffer.length > 5 * 1024 * 1024) return badRequest(new MaxFileSizeError(5))
    const data = await this.changeProfilePicture({ id: userId, file: file.buffer })
    return ok(data)
  }

  buildValidators({ file }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: file, fieldName: 'file' })
        .required()
        .image({ allowed: ['png', 'jpg'], maxSizeInMb: 5 })
        .build()
      // new Required(file, 'file'),
      // new RequiredBuffer(file.buffer, 'file'),
      // new AllowedMimeTypes(['png', 'jpg'], file.mimeType),
      // new MaxFileSize(5, file.buffer)
    ]
  }
}
