
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { AppError } from "../../../../shared/errors/AppError"
import { CreateUserUseCase } from "./CreateUserUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "Test",
      email: "test@gmail.com",
      password: "Test123/"
    })

    expect(user).toHaveProperty("id")
  })

  it("should not be able to create two users with same e-mail", () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Test",
        email: "test@gmail.com",
        password: "Test123/"
      })

      await createUserUseCase.execute({
        name: "Test",
        email: "test@gmail.com",
        password: "Test123/"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
