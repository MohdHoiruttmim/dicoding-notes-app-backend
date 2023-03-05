const joi = require('joi');

const PostAuthenticationsPayloadSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

const PutAuthenticationsPayloadSchema = joi.object({
  refreshToken: joi.string().required(),
});

const DeleteAuthenticationsPayloadSchema = joi.object({
  refreshToken: joi.string().required(),
});

module.exports = { 
  PostAuthenticationsPayloadSchema,
  PutAuthenticationsPayloadSchema,
  DeleteAuthenticationsPayloadSchema, 
};
