const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const notes = require("./dummyNotes");

class NoteService{
    constructor(){
      this._notes = notes;
    }

    addNote({ title, body, tags }){
      const id = nanoid(16);
      const createAt = new Date().toISOString();
      const updateAt = createAt;

      const newNote = {
        id,
        title,
        body, 
        tags, 
        createAt, 
        updateAt,
      }

      this._notes.push(newNote);

      const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

      if(!isSuccess){
        throw new InvariantError("Catatan gagal ditambahkan");
      } 

      return id;
    }

    getNotes(){
      return this._notes;
    }

    getNoteById(id){
      const note = this._notes.filter((note) => note.id === id)[0];

      if(!note){
        throw new NotFoundError("Catatan tidak ditemukan");
      } 

      return note;
    }

    editNoteById(id, { title, body, tags }){
      const index = this._notes.findIndex((note) => note.id === id);

      if(index === -1){
        throw new NotFoundError("Gagal memperbarui catatan. Id tidak ditemukan"); 
      }

      const updateAt = new Date().toISOString();

      this._notes[index] = {
        ...this._notes[index],
        title,
        body,
        tags,
        updateAt,
      }
    }

    deleteNoteById(id){
      const index = this._notes.findIndex((note) => note.id === id);

      if(index === -1){
        throw new NotFoundError("Catatan gagal dihapus. Id tidak ditemukan");
      }
      this._notes.splice(index, 1);
    }
}

module.exports = NoteService;