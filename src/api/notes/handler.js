// const NoteService = require("../../services/inMemory/NotesService");
// const noteService = new NoteService();

class NotesHandler{
  constructor(service, validator){
    this._service = service;
    this._validator = validator;
    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  getNotesHandler(request, h){
    try{
      // const notes = noteService.getNotes();
      const notes = this._service.getNotes();
      return {
        status: 'Success',
        data: {
          notes,
        },
      };
    } catch(error){
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      
      response.code(500);
      return response;
    }
  }
  
  postNoteHandler(request, h){
    try{
      this._validator.validateNotePayload(request.payload);
      const { title = 'untitled', body, tags } = request.payload;
  
      const noteId = this._service.addNote({ title, body, tags });
  
      const response = h.response({
        status: 'Success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      
      response.code(201);
      return response;
    } catch(error){
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      
      response.code(400);
      return response;
    }

    }

  getNoteByIdHandler(request, h){
    const { id } = request.params;
    try{
      const note = this._service.getNoteById(id);

      const response = h.response({
        status: 'Success',
        data: {
          note,
        }
      });

      response.code(200);
      return response;
    }catch(error){
      const response = h.response({
        satatus: 'fail',
        message: error.message,
      });
      
      response.code(404);
      return response;
    }
  }
  
  putNoteByIdHandler(request, h){
    try{
      this._validator.validateNotePayload(request.payload);
      const { id } = request.params;
      this._service.editNoteById(id, request.payload);

      const response = h.response({
        status: 'Success',
        message: 'Catatan berhasil diperbarui',
      }); 

      response.code(200);
      return response;
    } catch(error){
    const response = h.response({
      status: 'fail',
      message: error.message,
    });

    response.code(404);
    return response;
  }
}

  deleteNoteByIdHandler(request, h){
    const { id } = request.params;
    try{
      this._service.deleteNoteById(id);

      const response = h.response({
        status: 'Success',
        message: 'Catatan berhasil dihapus',
      });

      response.code(200);
      return response;
    } catch(error){
    const response = h.response({
      status: 'fail',
      message: error.message,
    });

    response.code(404);
    return response;
    }
  }

}

module.exports = NotesHandler;