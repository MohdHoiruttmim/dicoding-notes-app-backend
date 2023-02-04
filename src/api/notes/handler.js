// const NoteService = require("../../services/inMemory/NotesService");
// const noteService = new NoteService();
const autoBind = require('auto-bind');

class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
    // this.postNoteHandler = this.postNoteHandler.bind(this);
    // this.getNotesHandler = this.getNotesHandler.bind(this);
    // this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    // this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    // this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async getNotesHandler(request, h){
    try{
      // const notes = noteService.getNotes();
      const notes = await this._service.getNotes();
      return {
        status: 'Success',
        data: {
          notes,
        },
      };
    } catch(error){
      const response = h.response({
        status: 'fail',
        message: 'Maaf, terjadi kesalahan pada server kami.',
      });
      
      response.code(500);
      return response;
    }
  }
  
  async postNoteHandler(request, h) {
    this._validator.validateNotePayload(request.payload);
    const { title = 'untitled', body, tags } = request.payload;
 
    const noteId = await this._service.addNote({ title, body, tags });
 
    const response = h.response({
      status: 'Success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId,
      },
    });
 
    response.code(201);
    return response;
  }
 
  async getNoteByIdHandler(request, h) {
    const { id } = request.params;
    const note = await this._service.getNoteById(id);
    const response = h.response({
      status: 'Success',
      data: {
        note,
      },
    });
    return response;
    // return {
    //   status: 'Success',
    //   data: {
    //     note,
    //   },
    // };
  }
 
  async putNoteByIdHandler(request, h) {
    this._validator.validateNotePayload(request.payload);
    const { id } = request.params;
 
    await this._service.editNoteById(id, request.payload);
 
    return {
      status: 'Success',
      message: 'Catatan berhasil diperbarui',
    };
  }
 
  async deleteNoteByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteNoteById(id);
 
    return {
      status: 'Success',
      message: 'Catatan berhasil dihapus',
    };
  }
}

module.exports = NotesHandler;