const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require('../utils/AppError');

describe("UserCreateService", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  })
  // Antes de cada teste esse before executa, instânciando nosso repositório. Dessa forma reaproveitamos duas linhas de código.

  it("user should be created", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    };
  
    const userCreated = await userCreateService.execute(user);  
    expect(userCreated).toHaveProperty("id");
  });

  it("user not should be create with exists email", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user@test.com",
      password: "123"
    };

    const user2 = {
      name: "User Test 2",
      email: "user@test.com",
      password: "456"
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."));
  });
});

// it("user must be created", () => { .... garante que o usuário deve ser criado.
// Os dados são apenas ficticios para fazer os testes automatizados.
// A minha expectativa é que dentro do userCreated tenha uma propriedade id e ai eu posso colocar então o .toHaveProperty("id"); O que vai acontecer aqui ? E criei um usuário de exemplo, passo o esse usuário para o método execute(user) do serviço userCreateService e eu espero que ele me devolva uma objeto que tem uma propriedade id do usuário que ele ganhou ao ser cadastrado e é isso que eu verifico aqui. Mas se a gente executar assim vai dar erro, porque precisamos dizer para o UserCreateService qual é o repositório que vamos usar, o que vai ser usado de banco de dados .. vamos usar tal repositório, só que aqui não vamos usar o nosso userRepository que usa o SQlite, por que ? Temos que conseguir executar os testes de forma independente do banco de dados, sem depender de serviços ou APIs, nada de ambiente externo, se usassemos o banco de dados userRepository iria poluir nosso banco de dados com informações de usuário ficticios realizados nos testes. Então podemos criar um userRepository separado para usar nos testes, dessa forma não tocamos no que é usdo em produção de fato. Vamos usar um UserRepositoryInMemory, ele vai cadastrar as informações do cadastro do usuário no vetor na memória.

// Resumindo, foi criado o teste utilizando um repositório na memória do usuário. O constructor recebe qual a estratégia de armazenamento que será utilizada.