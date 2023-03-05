const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UserService{
  constructor(){
    this._pool = new Pool();
  };

  async addUser({ username, password, fullname }){
    await this.verifyNewUser(username);

    const userId = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [userId, username, hashedPassword, fullname],
    }
    const result  = await this._pool.query(query);
    if (!result.rows.length){
      throw new InvariantError('Gagal menambahkan user');
    }

    return result.rows[0].id;
  };

  async getUserById(id) {
    const query = {
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [id],
    }
    const { rows } = await this._pool.query(query);

    if (!rows.length){
      throw new NotFoundError('User tidak ditemukan');
    }

    return rows[0];
  }

  async verifyNewUser(username){
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const { rows } = await this._pool.query(query);
    if (rows.length === 1){
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  };

  async verifyUserCredential(username, password){
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const { rows } = await this._pool.query(query);
    if (!rows.length){
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match){
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return id;
  };
}

module.exports = UserService;