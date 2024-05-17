const NoteCreateService = require('./NoteCreateService');
const NoteRepositoryInMemory = require('../repositories/NoteRepositoryInMemory');

describe("NoteCreateService", () => {

  const noteRepositoryInMemory = new NoteRepositoryInMemory();
  const noteCreateService = new NoteCreateService(noteRepositoryInMemory);

  it("note should be create", async () => {
    const note = {
      title: "Note Test",
      description: "Teste Teste Teste Teste Teste Teste",
      tags: "[nota1, nota2]",
      links: "[www.gmail.com, wwww.globo.com]"
    }

    const noteCreated = await noteCreateService.execute(note);
    expect(noteCreated).toHaveProperty("id");



  })
})