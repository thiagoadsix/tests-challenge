import { InMemoryStatementsRepository } from "../../../../modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "../../../../modules/users/repositories/in-memory/InMemoryUsersRepository";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let getStatementOperationUseCase: GetStatementOperationUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

describe("Get statement operation", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should be able to get the statement operation", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Test user",
      email: "test@email.com",
      password: "password",
    });

    const statement = await inMemoryStatementsRepository.create({
      user_id: user.id!,
      amount: 1,
      description: "Test description",
      type: "deposit" as any,
    });

    const response = await getStatementOperationUseCase.execute({
      user_id: user.id!,
      statement_id: statement.id!,
    });

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("user_id");
  });
});
