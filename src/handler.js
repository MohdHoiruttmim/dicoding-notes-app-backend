const notes = require("./notes.js");
const { nanoid } = require("nanoid");

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
    updateAt,
  };

  notes.push(newNote);

  const isSucces = notes.filter((note) => note.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: "Success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "Failed",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: "Success",
  data: {
    notes,
  },
});

const getNotesByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((note) => note.id === id)[0];

  if (note != undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
      data: {
          ...notes[index],
      }
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (req, h) => {
    const { id } = req.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1){

        notes.splice(index, 1);

        const response = h.response({
            status: 'success',
            message: 'Data berhasil dihapus',
        });

        response.code(200);
        return response;
    };

    const response = h.response({
        status: "fail",
        message: "Data tidak ditemukan",
    });

    response.code(404);
    return response;
}

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNotesByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
