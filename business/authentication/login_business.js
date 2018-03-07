'use strict';

const {
    Logger,
    Boom
} = require('../business_default_libs');

const UserModel = require('../../models/user/user_model.js');
const PasswordUtils = require('../../utils/password/password_utils');

class LoginBusiness {

   /*
  * Authentication User
  * function authenticateUser
  */
  static async authenticateUser(params){
    const {login, plainTextPassword} = params;
    try{
      if(login && plainTextPassword){  
        let user = await UsuarioModel.findOne({login:login}).populate('perfil');
        if(user){
          if(await PasswordUtils.comparePasswords(plainTextPassword, user.senha)){
            return user;
          }else{
            throw Boom.unauthorized('Usuário ou senha invalidos.');
          }
        }else{
          throw Boom.unauthorized('Usuário ou senha invalidos.');
        }
      }        
    }catch(error){
      throw error;
    }
  }
}

module.exports = LoginBusiness;

