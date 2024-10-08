import { Controller } from "@/application/controllers"

import { RequestHandler } from "express"
// import { Request, RequestHandler, Response } from "express"

// export class ExpressRouter {
//   constructor(private readonly controller: Controller) {}

//   async adapt(req: Request, res: Response): Promise<void> {
//     const httpResponse = await this.controller.handle({ ...req.body })
//     if (httpResponse.statusCode === 200) {
//       res.status(200).json(httpResponse.data)
//     } else {
//       res.status(httpResponse.statusCode).json({ error: httpResponse.data.message })
//     }
//   }
// }

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = (controller) => async (req, res) => {
  const { statusCode, data } = await controller.handle({ ...req.body, ...req.locals })
  const json = [200, 204].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)
}
