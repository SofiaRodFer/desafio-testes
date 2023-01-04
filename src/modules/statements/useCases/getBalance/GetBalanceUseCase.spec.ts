import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"
import { GetBalanceUseCase } from "./GetBalanceUseCase"
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase"
import { AppError } from "../../../../shared/errors/AppError"

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryStatementsRepository: InMemoryStatementsRepository
let getBalanceUseCase: GetBalanceUseCase
let createUserUseCase: CreateUserUseCase

describe("Get Balance", () => {
  beforeEach(async () => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    )
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it("should be able to get user balance", async () => {
    const user = await createUserUseCase.execute({
      name: "Test",
      email: "test@gmail.com",
      password: "Test123/"
    })

    const balance = await getBalanceUseCase.execute({
      user_id: user.id as string,
    })

    expect(balance).toHaveProperty("balance")
    expect(balance).toHaveProperty("statement")
  })

  it("should not be able to balance for a non-existent user", async () => {
    expect(async () => {
      await getBalanceUseCase.execute({
        user_id: "non-existent id",
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
