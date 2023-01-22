const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      }
    }
  });

  server.route(routes)

  await server.start();
  console.log("Server running on %s", server.info.uri);
  console.log("Server running on %s", 'http://notesapp-v1.dicodingacademy.com/');
};

init();
