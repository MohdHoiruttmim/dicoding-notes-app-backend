const Hapi = require("@hapi/hapi");
const notes = require("./api/notes");
const NoteService = require("./services/inMemory/NotesService");
const NotesValidator = require("./validator/notes");

const init = async () => {
  const noteService = new NoteService();
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      }
    }
  });

  await server.register({
    plugin: notes,
    options: {
      service: noteService,
      validator: NotesValidator,
    }
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
