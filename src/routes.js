const { addNoteHandler } = require("./handler");

const routes = [
    {
        method: 'GET',
        path: '/notes',
        handler: (request, h) => {

        }
    }, 
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler
    }
];

module.exports = routes;