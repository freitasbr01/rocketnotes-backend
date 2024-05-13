// Dentro do middlewares "ensureAuthenticated" de autenticação ele vai caputar qual é o ID do usuário que está dentro do token de autenticação.
// middlewares de autenticação.
// Vamos deixar os middlewares que teremos na aplicação.

const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  // O token do usuário ele vai estar dentro da requisição do usuário só que no cabeçario e dentro do cabeçario da requisição vai ter o token de autorização.

  if(!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");
  // Ele não está criando um token, mas sim verificando se um token válido foi fornecido.
  // Esta linha divide o cabeçalho de autorização em duas partes (supondo que o esquema de autenticação seja Bearer) e extrai o token JWT.
  // Resumindo: Estamos quebrando o texto do split no array (dando um espaço) e a gente está pegando só a segunda posição desse array já passando para uma variável chamada token.
  // Se o token existir, vamos acessar aqui através de um vetor o que está dentro do header, dentro do header o token é armazenado assim "Bare xxx". Vamos fazer um split, o split pega a string e ele separa a string passando ela para um vetor, eu preciso dizer para o split qual o caracter que ele vai usar como referência para quebrar um texto em string, vou usar o espaço. Dessa forma eu teria assim const ["Bare", "xxx"] mas não preciso inserir a palavra Bare.

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    // Esta linha verifica o token JWT usando a chave secreta e extrai o ID do usuário do campo sub (subject) do token.
    // o sub é uma propriedade que eu consigo desestruturar do resultado da função do verify. O verify vai verificar se o token é válido, se for válido ele vai devolver o sub, o sub eu to mudando o nome dele, na verdade eu estou criando um alias (um apelido), só pra ficar mais semantico.

    // vai pegar o user_id do token acima e vai inserir na requisição abaixo

    request.user = {
      id: Number(user_id)
    }
    // o middleware vai pegar o user_id do token acima e vai inserir esse usuário na requisição desse codigo.
    // Esta linha anexa o ID do usuário a requisição. Isso pode ser útil para as próximas funções middleware ou controladores que precisam do ID do usuário.
    // Vou pegar a minha requisição e dentro da requisição eu vou criar uma propriedade que não existe ainda, ele vai existir a partir de agora e eu vou chamar ela de user e dentro dele vou criar uma propriedade id.
    // No banco de dados a gente guarda o id como numero, por isso convertemos novamente.

    return next();
  } catch {
      throw new AppError("JWT Token inválido", 401);
    }
}

module.exports = ensureAuthenticated;
// catch é um tratamento de exceção


// Dentro do middlewares "ensureAuthenticated" de autenticação ele vai caputar qual é o ID do usuário que está dentro do token de autenticação.