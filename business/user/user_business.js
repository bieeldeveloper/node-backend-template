'use strict';

const {
    Logger,
    Boom
} = require('../business_default_libs');

const UserModel = require('../../models/user/user_model.js');
const PasswordUtils = require('../../utils/password/password_utils');

class UserBusiness {

  /* 
  * Search Users 
  * function searchUsers
  */
  async searchUsers(){ 
    try{
      let users = UserModel.find().populate('profile');
      return users;
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar carregar Usuários', error);
    }
  }
  /*
  * Search User by ID
  * function searchUserById
  * params id(id user)
  */
  async searchUserById(id){
    try{
      let user = UserModel.findOne({_id:id}).populate('profile');
      return user;
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar carregar Usuario', error);
    }
  }

  /*
  * Create User
  * function createUser
  * params user(User)
  */
  async createUser(user){
    try{
      user.senha = await PasswordUtils.generateHash(user.senha);
      let userModel = new UserModel(user);
      let userCreated = userModel.save();
      return userCreated;            
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar criar Usuario', error);
    }
  }

  /*
  * Update User
  * function updateUser
  * param id(id User), user(User)
  */
  async updateUser(id,user){
    try{
      let userUpdate = await UserModel.findByIdAndUpdate(id,user,{ new: false });
      return userUpdate;
    }catch(error){
      Logger.info(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar alterar Usuário', error);
    }
  }
}

module.exports = UserBusiness;

