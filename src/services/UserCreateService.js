const { hash } = require('bcryptjs');
const AppError = require('../utils/AppError');

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail({email});

    if (checkUserExists){
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword });

    return userCreated;
  }
}

module.exports = UserCreateService;












// No momento em que a class UserCreateService for instânciada com new eu vou ter que dizer quem é esse userRepository. Como o construtor está no escopo da classe eu uso this.useRepository e falo que ele é igual ao userRepository que veio do parâmetro, isso significa que quando eu coloco o this.user quer dizer que é o contexto global dessa class, ou seja, eu to colocando o userRepository que veio no parâmetro do constructor e atribuindo ele a uma variavel com mesmo nome só que eu estou deixando disponivel para classe como um todo para eu ter acesso dentro da função execute.

// A linha que estava instanciando o repositorio userRepository foi retirada porque eu vou receber o userRepository como um parâmetro no construtor da minha classe UserCreateService, ou seja, no momento que eu quiser usar esse serviço que tem toda regra de negócio, lógica de cadastrar um usuário, eu vou ter que dizer qual é o userRepository, esse userRepository pode ser um banco de dados usando SQlite ou PostgreSQL, enfim ... é nele que estamos fazendo a inversão de dependência, não é dentro da classe que eu to definindo qual o banco que vou utilizar mas sim é quem for usar essa classe (UserCreateService) quem diz o banco que tem que ser utilizado, a estratégia que tem que ser utilizada no caso é o userRepository, então a gente está invertendo a dependência, está invertendo para quem chama essa classe

// No caso do this.userRepository.findByEmail(email) eu estou pressupondo que dentro desse repositorio tem um findByEmail ... isso é trabalhar com abstração. Então independente do userRepository que eu for passar no parâmetro do constructor ele tem que ter essa função findByEmail e a função create lá dentro. Então essa classe UserCreateService, não sabe como é a lógica lá dentro do findByEmail ou no create, só quem sabe é o repositorio que é responsável por manipular os dados no banco, então a única coisa que fazemos aqui é passar as informações o email, name e password, isso é abstração. A classe UserCreateService não está nem ai para o que acontece dentro do findByEmail oucreate, isso é trabalhar com abstrações.