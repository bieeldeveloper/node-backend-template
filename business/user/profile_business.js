'use strict';

const {
    Logger,
    Boom
} = require('../business_default_libs');

const ProfileModel = require('../../models/user/profile_model.js');

class ProfileBusiness {

  /*
  * Search Profile 
  * function searchProfiles
  */
  async searchProfiles(){ 
    try{
      let profiles = PorfileModel.find();
      return profiles;
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar carregar Perfil', error);
    }
  }

}

module.exports = ProfileBusiness;

