class NotesHandler{
  constructor(service){
    this._service = service;
  }

  getNotesHandler(request, h){
    try{
      const notes = this._service.getNotes();
      return {
        satatus: 'success',
        data: {
          notes,
        },
      };
    } catch(error){
      const response = h.response({
        satatus: 'fail',
        message: error.message,
      });
      
      response.code(500);
      return response;
    }
  }
  
  postNoteHandler(request, h){
    try{
      const { title = 'untitled', body, tags } = request.payload;
  
      const noteId = this._service.addNote({ title, body, tags });
  
      const response = h.response({
        satatus: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      
      response.code(201);
      return response;
    } catch(error){
      const response = h.response({
        satatus: 'fail',
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
        status: 'success',
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
    const { id } = request.params;
    try{
      this._service.editNoteById(id, request.payload);

      const response = h.response({
        satatus: 'success',
        message: 'Catatan berhasil diperbarui',
      });

      response.code(200);
      return response;
    } catch(error){
    const response = h.response({
      satatus: 'fail',
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
        satatus: 'success',
        message: 'Catatan berhasil dihapus',
      });

      response.code(200);
      return response;
    } catch(error){
    const response = h.response({
      satatus: 'fail',
      message: error.message,
    });
    
    response.code(404);
    return response;
    }
  }

}

module.exports = NotesHandler;