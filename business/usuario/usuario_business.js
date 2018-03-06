'use strict';

const {
    Logger,
    Boom
} = require('../business_default_libs');

const UsuarioModel = require('../../models/usuario/usuario_model.js');
const AutoEscolaModel = require('../../models/autoescola/autoescola_model.js');
const PasswordUtils = require('../../utils/password/password_utils');
const UsuarioValidate = require('../validates/usuario_validate.js');
const PrimeiroAcessoValidate = require('../validates/primeiroacesso_validate.js');

class UsuarioBusiness {

  // Buscar Usuarios 
  // function getUsuario
  // params autoescola,perfil
  async getUsuariosPorPerfilEAutoescola(idPerfil,idAutoEscola,field){ 
    try{
      let usuario = UsuarioModel.find({perfil:idPerfil,autoEscola:idAutoEscola}, field).populate('perfil');
      return usuario;
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar carregar Usuários', error);
    }
  }

  // Buscar Usuario por ID
  // function getUsuario
  async getUsuarioPorIdEAutoescola(id,idPerfil,idAutoescola,field){
    try{
      let usuario = UsuarioModel.findOne({_id:id,perfil:idPerfil,autoEscola:idAutoescola}, field).populate('perfil');
      return usuario;
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar carregar Usuario', error);
    }
  }

  
  // Criar Usuario
  // function postUsuario
  async postUsuario(usuario){
    try{
      let usuarioValida = UsuarioValidate.validate(usuario);
      if(usuarioValida.error){
        Logger.debug(usuarioValida.error)
        throw Boom.badImplementation(usuarioValida.error, 500);
      } 

      usuario.senha = await PasswordUtils.generateHash(usuario.senha);
      let usuarioModel = new UsuarioModel(usuario);
      let usuarioPost = usuarioModel.save();
      return usuarioPost;            
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar criar Usuario', error);
    }
  }

  // delete Usuario
  // function deleteUsuario
  async deleteUsuario(id){
    try{
      let usuario = UsuarioModel.findByIdAndRemove(id);    
      return usuario;  
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar deletar Usuario', error);
    }
  }

  async putUsuario(id,usuario){
    try{
      let usuarioValida = UsuarioValidate.validate(usuario);
      if(usuarioValida.error){
        Logger.debug(usuarioValida.error)
        throw Boom.badImplementation(usuarioValida.error, 500);
      } 
      let usuarioAlterado = await UsuarioModel.findByIdAndUpdate(id,usuario,{ new: true });
      return usuarioAlterado;
    }catch(error){
      Logger.info(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar alterar Usuário', error);
    }
  }

  async postPrimeiroAcesso(dados){
    try{

      let usuarioValida = PrimeiroAcessoValidate.validate(dados);
      if(usuarioValida.error){
        Logger.debug(usuarioValida.error)
        throw Boom.badImplementation(usuarioValida.error, 500);
      } 
      
      const autoescola = {
        nomeFantasia: dados.autoescola
      }

      let autoEscolaModel = new AutoEscolaModel(autoescola)
      let autoEscolaPost = await autoEscolaModel.save();

      const usuario = {
        login: dados.login,
        senha: await PasswordUtils.generateHash(dados.senha),
        perfil: 1,
        autoEscola: autoEscolaPost._id
      }

      let usuarioModel = new UsuarioModel(usuario);
      let usuarioPost = usuarioModel.save();
      return usuarioPost;            
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar criar Usuario', error);
    }
  }
  

  // Buscar Usuario por ID
  // function getUsuario
  static async findgetUsuarioById(id){
    try{
      let usuario = UsuarioModel.findOne({_id:id}).populate('perfil');
      return usuario;
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar carregar Usuario', error);
    }
  }



  static async authenticateUser(params){
    const {usuario, plainTextPassword} = params;
    try{
      if(usuario && plainTextPassword){  
        let user = await UsuarioModel.findOne({login:usuario}).populate('perfil');
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



  // Buscar Usuario por ID
  // function getUsuario
  async geradorDeLogin(nome,cpf){
    try{
      const nomeUsuario = nome.trim();
      const cpfUsuario = cpf.trim();
      let novoCpf = parseInt(cpfUsuario.substring(0,3));
      let login = nomeUsuario.substring(0,3).toLowerCase() + novoCpf;
      let loginValido = await UsuarioBusiness.nextLogin(login);

      //soma + 1 o numero do cpf quando encontra algum login existente
      while(loginValido == false){
        novoCpf = novoCpf + 1;
        login = nomeUsuario.substring(0,3).toLowerCase() + novoCpf;
        loginValido = await UsuarioBusiness.nextLogin(login);
      }

      //retorna login
      return login;
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao criar login para o usuario:' + nome, error);
    }
  }

  // Buscar Usuario por ID
  // function getUsuario
  static async nextLogin(newLogin){
    try{
      let usuario = await UsuarioModel.findOne({login:newLogin});
      if(!usuario){
        return true;
      }else{
        return false;
      }
    }catch(error){
      Logger.debug(error)
      throw Boom.badImplementation('Ocorreu um erro ao tentar carregar Usuario', error);
    }
  }
}

module.exports = UsuarioBusiness;

