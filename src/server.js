const Hapi = require("@hapi/hapi");
const notes = require("./api/notes");
const users = require("./api/users");
const ClientError = require("./exceptions/ClientError");
const Jwt = require("@hapi/jwt");

const NoteService = require("./services/postgres/NotesService");
// const NoteService = require("./services/inMemory/NotesService");
const NotesValidator = require("./validator/notes");

const UserService = require("./services/postgres/UserService");
const UsersValidator = require("./validator/users");

// authentications
const authentications = require("./api/authentications");
const AuthenticationsService = require("./services/postgres/AuthenticationsService");
const TokenManager = require("./tokenize/TokenManager");
const AuthenticationValiadator = require("./validator/authentications"); 

require('dotenv').config();

const init = async () => {
  const noteService = new NoteService();
  const userService = new UserService();
  const authenticationsService = new AuthenticationsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      }
    }
  });

  // https://siddharth-lakhara.medium.com/using-jwt-to-build-login-register-form-on-hapijs-and-reactjs-part-1-a3c103b86956
  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy("notesapp_jwt", "jwt", {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGES,
    },
    validate: (artifacts, request) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
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
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        userService, 
        tokenManager: TokenManager,
        validator: AuthenticationValiadator,
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
