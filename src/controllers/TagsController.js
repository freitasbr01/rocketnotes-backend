const knex = require("../database/knex")

class TagsController {
  async index(request, response) {
    const user_id = request.user.id

    const tags = await knex("tags")
    .where({ user_id })
    .groupBy("name")
    // Podemos usar o recurso do banco de dados que se chama groupBy, vai agrupar pelo campo que você dizer pra ele agrupar e ele não vai trazer repetidos desse campo. Ele já remove os nomes duplicados.

    return response.json(tags)
  }
}

module.exports = TagsController