const notes = require('./notes.js');
const { nanoid } = require('nanoid');

const addNoteHandler = (req, h) => {
    const { title, tags, body } = req.payload;

    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const newNote = { 
        title, 
        tags, 
        body,
        id,
        createAt,
        updateAt
    }

    notes.push(newNote);

    const isSucces = notes.filter(note => note.id === id).length > 0;

    if (isSucces) {
        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        })
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'Failed',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
}

const getAllNotesHandler = () => ({
    status: 'Success',
    data: {
        notes,
    },
});

const getNotesByIdHandler = (req, h) => {
    const { id } = req.params;

    const note = notes.filter(note => note.id === id)[0];

    if (note != undefined){
        return{
            status: 'success',
            data:{
                note,
            },
        };
    };

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNotesByIdHandler };