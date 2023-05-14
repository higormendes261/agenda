const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const CadastroSchema = new mongoose.Schema({
  email: { type: String, required: true },
  inputNome: { type: String, required: true},
  inputNomeEmpresa: { type: String, required: true},
  inputCnpjEmpresa: { type: String, required: true},
  inputEmailEmpresa: { type: String, requered: true},
  password: { type: String, required: true },
  tipoUsuario: {type: String, requered: true},
  inputMatricula: {type: String, requered: true}

});

const CadastroModel = mongoose.model('Cadastro', CadastroSchema);

class Cadastro {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valida();
    if(this.errors.length > 0) return;

    await this.userExists();

    if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await CadastroModel.create(this.body);
  }

  async userExists() {
    this.user = await CadastroModel.findOne({ email: this.body.email });
    if(this.user) this.errors.push('Usuário já existe.');
  }

  valida() {
    // Validação

    this.cleanUp();
    if(this.body.inputNomeEmpresa.length < 1){
      this.errors.push('O nome da empresa não pode ser vazio.');
    }

    if(this.body.inputNome.length < 1){
      this.errors.push('O nome não pode ser vazio.');
    }
    
    
    if(this.body.inputCnpjEmpresa.length < 18){
      this.errors.push('CNPJ inválido.');
    }
    
    if(!validator.isEmail(this.body.inputEmailEmpresa)) this.errors.push('E-mail da empresa inválido.');
    
    // O e-mail precisa ser válido
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
    // A senha precisa ter entre 3 e 50
    if(this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
    }

    if(this.body.password !== this.body.inputConfirmacaoSenhaModerador){
      this.errors.push('As senhas não coincidem.');
    }
    
  }
  
  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
      inputNome: this.body.inputNome,
      inputNomeEmpresa: this.body.inputNomeEmpresa,
      inputCnpjEmpresa: this.body.inputCnpjEmpresa,
      inputEmailEmpresa: this.body.inputEmailEmpresa,
      inputConfirmacaoSenhaModerador: this.body.inputConfirmacaoSenhaModerador,
      tipoUsuario: this.body.tipoUsuario,
      inputMatricula: this.body.inputMatricula
    };
  }
}

exports.delete = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const usuario = await Usuario.delete(req.params.id);
  if(!usuario) return res.render('404');

  req.flash('success', 'Usuario apagado com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
};


Cadastro.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.user = await CadastroModel.findByIdAndUpdate(id, this.body, { new: true });
};

// Métodos estáticos
Cadastro.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const usuario = await CadastroModel.findById(id);
  return usuario;
};

Cadastro.buscaUsuario = async function() {
  const usuario = await CadastroModel.find()
  .sort({ criadoEm: -1 });
  return usuario;
};

Cadastro.delete = async function(id) {
  if(typeof id !== 'string') return;
  const usuario = await CadastroModel.findOneAndDelete({_id: id});
  return usuario;
};

module.exports = Cadastro;


