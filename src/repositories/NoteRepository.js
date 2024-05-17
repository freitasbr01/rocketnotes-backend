const knex = require("../database/knex")

class NoteRepository {
  async create({ title, description, tags, links, user_id }) {

    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id
    })

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })
    await knex("links").insert(linksInsert)

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })
    await knex("tags").insert(tagsInsert)
    
  }

};


module.exports = NoteRepository;

