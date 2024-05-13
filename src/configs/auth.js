// Arquivo para deixar as configurações de autenticação da aplicação.

module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET || default, // propriedade secret, é utilizado para gerar o token.
    expiresIn: "1d"
  }
}