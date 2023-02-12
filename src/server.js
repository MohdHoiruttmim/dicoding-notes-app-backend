const Hapi = require("@hapi/hapi");
const notes = require("./api/notes");
const users = require("./api/users");
const ClientError = require("./exceptions/ClientError");

const NoteService = require("./services/postgres/NotesService");
// const NoteService = require("./services/inMemory/NotesService");
const NotesValidator = require("./validator/notes");

const UserService = require("./services/postgres/UserService");
const UsersValidator = require("./validator/users");

require('dotenv').config();

const init = async () => {
  const noteService = new NoteService();
  const userService = new UserService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      }
    }
  });

  await server.register([
    {
      plugin: notes,
      options: {
        service: noteService,
        validator: NotesValidator,
      }
    },
    {
      plugin: users,
      options: {
        service: userService,
        validator: UsersValidator,
      }
    }
  ]);

  await server.ext("onPreResponse", (request, h) => {
    const { response } = request;
    // console.log(response)
    if (response instanceof ClientError) {
    const newResponse = h.response({
      status: "fail",
      message: response.message,
    });
    newResponse.code(response.statusCode);
    return newResponse;
    }

    return response.continue || response;
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

init();
