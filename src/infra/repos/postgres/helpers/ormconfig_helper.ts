import { AppDataSource } from "@/infra/config"

export const isInitialized = async (): Promise<boolean> => {
  return AppDataSource.isInitialized
}

export const initialize = async (): Promise<void> => {
  await AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
}

export const createQueryRunner = async (): Promise<void> => {
  await AppDataSource.createQueryRunner()
}
