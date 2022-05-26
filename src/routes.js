const { addNoteHandler, getAllNotesHandler, getNotesByIdHandler } = require("./handler");

const routes = [
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    }, 
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesByIdHandler,
    }
];

module.exports = routes;