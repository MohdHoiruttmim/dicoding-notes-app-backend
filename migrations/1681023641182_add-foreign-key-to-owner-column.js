/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql("INSERT INTO users(id, username, password, fullname) VALUES('old_notes', 'old_notes', 'old_notes', 'old_notes')");

  pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner IS NULL");

  pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = pgm => {};
