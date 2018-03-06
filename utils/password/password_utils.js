const bcrypt = require('bcrypt');

const saltRounds = 10;

class PasswordUtils {

    static generateHash(password) {
        return bcrypt.hash(password, saltRounds).then((res) => res);
    }

    static comparePasswords(plainTextPassword, hashFromDB) {
        return bcrypt.compare(plainTextPassword, hashFromDB).then((res) => res);
    }
}

module.exports = PasswordUtils;