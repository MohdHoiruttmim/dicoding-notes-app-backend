const autoBind = require('auto-bind');

class UsersHandler{
  constructor(service, validator){
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postUserHandler(request, h){
    try {
      
    } catch (error) {

    };
  };
}

module.exports = UsersHandler;
