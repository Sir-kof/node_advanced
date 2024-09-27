import { UniqueId, UUIDHandler } from "@/infra/gateways";

export const makeUUUIDHandler = (): UUIDHandler => {
  return new UUIDHandler()
}

export const makeUniqueId = (): UniqueId => {
  return new UniqueId()
}
