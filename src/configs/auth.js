// Arquivo para deixar as configurações de autenticação da aplicação.

module.exports = {
  jwt: {
    secret: "default", // propriedade secret, é utilizado para gerar o token.
    expiresIn: "1d"
  }
}