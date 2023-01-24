const NotesHandler = require('./handler');
const routes = require('./routes');

'use strict';

module.expors = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service }) => {
    const notesHandler = new NotesHandler(service);
    server.route(routes(notesHandler));
  },
}
