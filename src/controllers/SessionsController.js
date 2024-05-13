const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require ("bcryptjs");
const authConfig = require ("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first()

    if(!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })
    // ESSE CÓDIGO ESTÁ GERANDO O TOKEN QUANDO O USUÁRIO FAZ LOGIN COM SUCESSO.
    // O subject é o conteúdo que eu quero inserir dentro desse token, no caso quero inserir o id do usuário.
    // O objetivo deste código é gerar um token JWT que pode ser usado para autenticar um usuário em um aplicativo. O token incluirá o ID do usuário como subject e terá um tempo de expiração definido.

    return response.json({ user, token })
  }
}
// Vamos criar uma sessão para o usuário

module.exports = SessionsController