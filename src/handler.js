const notes = require('./notes.js');
const { nanoid } = require('nanoid');
const { response } = require('@hapi/hapi/lib/validation');

const addNoteHandler = (req, h) => {
    const { title, tag, body } = req.payload;

    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const newNote = { 
        title, 
        tag, 
        body,
        id,
        createAt,
        updateAt
    }

    notes.push(newNote);

    const isSucces = notes.filter(note => note.id === id).length > 0;

    if (isSucces) {
        const response = h.response({
            staus: 'Success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        })
        response.code(201);
        return response;
    }

    const response = h.response({
        staus: 'Failed',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
}

module.exports = { addNoteHandler };