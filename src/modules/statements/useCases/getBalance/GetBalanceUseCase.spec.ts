import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let geBalanceUseCase: GetBalanceUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

describe("Get balance", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    geBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
  });

  it("should be able to return tha balance from user", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Test name",
      email: "test@email.com",
      password: "password",
    });

    const response = await geBalanceUseCase.execute({ user_id: user.id! });

    expect(response.statement.length).toBe(0);
    expect(response).toHaveProperty("balance");
  });
});
