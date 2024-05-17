// CONFIGURAÇÕES PARA PODERMOS EXECUTAR NOSSOS TESTES COM O JEST.

module.exports = {
  bail: true, // vai parar a execução no primeiro erro identificado.
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ],
};

// Com a configuração do testMatch, na hora que o test for começar ele vai ignorar os outros arquivos. Para o testMatch não ler a pasta node_modules que não é necessária, acrescentamos o seguinte <rootDir> que é uma especie de variável global do próprio jest que vai pegar a raiz do nosso projeto /src/ pulando a pasta node_modules. Na sequência, dentro de qualquer pasta (**) com qualquer arquivo que tenha qualquer nome (*) desde que ele tenha spec.js na extensão dele, roda o teste.
