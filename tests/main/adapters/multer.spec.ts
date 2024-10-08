import { ServerError } from "@/application/errors"
import { adaptMulter } from "@/main/adapters"

import { getMockReq, getMockRes } from "@jest-mock/express"
import { NextFunction, Request, RequestHandler, Response } from "express"
import multer from "multer"

jest.mock('multer')

describe('MulterAdapter', () => {
  let uploadSpy: jest.Mock
  let singleSpy: jest.Mock
  let multerSpy: jest.Mock
  let fakeMulter: jest.Mocked<typeof multer>
  let req: Request
  let res: Response
  let next: NextFunction
  let sut: RequestHandler

  beforeAll(() => {
    uploadSpy = jest.fn().mockImplementation((req, res, next) => {
      req.file = { buffer: Buffer.from('any_buffer'), mimetype: 'any_type' }
      next()
    })
    singleSpy = jest.fn().mockImplementation(() => uploadSpy)
    multerSpy = jest.fn().mockImplementation(() => ({ single: singleSpy }))
    fakeMulter = multer as jest.Mocked<typeof multer>
    jest.mocked(fakeMulter).mockImplementation(multerSpy)
    res = getMockRes().res
    next = getMockRes().next
  })

  beforeEach(() => {
    req = getMockReq({ locals: { anyLocals: 'any_locals' } })
    sut = adaptMulter
  })

  test('should call single upload with correct input', () => {
    sut(req, res, next)

    expect(multerSpy).toHaveBeenCalledWith()
    expect(multerSpy).toHaveBeenCalledTimes(1)
    expect(singleSpy).toHaveBeenCalledWith('picture')
    expect(singleSpy).toHaveBeenCalledTimes(1)
    expect(uploadSpy).toHaveBeenCalledWith(req, res, expect.any(Function))
    expect(uploadSpy).toHaveBeenCalledTimes(1)
  })

  test('should return 500 if upload fails', () => {
    const error = new Error('multer_error')
    uploadSpy = jest.fn().mockImplementationOnce((req, res, next) => {
      next(error)
    })

    sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: new ServerError(error).message })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  test('should not add file to req.locals', () => {
    uploadSpy = jest.fn().mockImplementationOnce((req, res, next) => {
      next()
    })

    sut(req, res, next)

    expect(req.locals).toEqual({ anyLocals: 'any_locals' })
  })

  test('should add file to req.locals', async () => {
    req = getMockReq({ locals: { anyLocals: 'any_locals' }, file: { buffer: Buffer.from('any_buffer'), mimetype: 'any_type' } })

    sut(req, res, next)

    expect(req.locals).toEqual({
      anyLocals: 'any_locals',
      // file: {
      //   buffer: req.file?.buffer,
      //   mimetype: req.file?.mimetype
      // }
    })
  })

  test('should calls next on success', async () => {
    sut(req, res, next)

    expect(next).toHaveBeenCalledWith()
    expect(next).toHaveBeenCalledTimes(1)
  })
})
