'use strict';

const {
    Logger,
    Boom
} = require('../business_default_libs');

const PerfilModel = require('../../models/usuario/perfil_model.js');

class PerfilBusiness {

  // Buscar Perfil 
  // function getPerfil
  async getPerfils(){ 
    try{
      let perfil = PerfilModel.find();
      return perfil;
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar carregar Perfil', error);
    }
  }

}

module.exports = PerfilBusiness;

