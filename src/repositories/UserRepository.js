// FOI SEPARADO NESSE ARQUIVO A RESPONSABILIDADE DA MANIPULAÇÃO DOS DADOS DO USUÁRIO.

const sqliteConnection = require('../database/sqlite');

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    return user;
  }; // Nessa função está mostrando como que o banco vai lidar com a busca pelo email.

  async create({ name, email, password }) {
    const database = await sqliteConnection();

    const userId = await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return {id: userId};
  }; // Nessa função está mostrando como que o banco vai lidar com a criação.
};

module.exports = UserRepository;