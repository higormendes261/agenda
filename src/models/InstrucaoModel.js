const mongoose = require('mongoose');
const validator = require('validator');

const InstrucaoSchema = new mongoose.Schema({
  categoriaInstrucao: { type: String, required: true },
  temaInstrucao: { type: String, required: true },
  descricaoInstrucao: { type: String, required: true },
  inputCnpjEmpresa: { type: String, required: true },
  contador: { type: Number, default: 0 }
});

const InstrucaoModel = mongoose.model('instrucao', InstrucaoSchema);

function Instrucao(body) {
  this.body = body;
  this.errors = [];
  this.instrucao = null;
}


Instrucao.prototype.register = async function() {
    this.valida();
    if(this.errors.length > 0) return;
    this.instrucao = await InstrucaoModel.create(this.body);
};



Instrucao.prototype.valida = function() {
  this.cleanUp();

  // Validação
  if(!this.body.categoriaInstrucao) this.errors.push('O campo "Categoria" precisa ser preenchido.');
  if(!this.body.temaInstrucao) this.errors.push('O campo "Título"  precisa ser preenchido.');
  if(!this.body.descricaoInstrucao) this.errors.push('O campo "Descrição" precisa ser preenchido.');
};

Instrucao.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    categoriaInstrucao: this.body.categoriaInstrucao,
    temaInstrucao: this.body.temaInstrucao,
    descricaoInstrucao: this.body.descricaoInstrucao,
    inputCnpjEmpresa: this.body.inputCnpjEmpresa
  };
};

Instrucao.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.instrucao = await InstrucaoModel.findByIdAndUpdate(id, this.body, { new: true });
};

// Métodos estáticos
Instrucao.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const instrucao = await InstrucaoModel.findById(id);
  return instrucao;
};

Instrucao.buscaInstrucao = async function() {
  const instrucao = await InstrucaoModel.find()
    .sort({ criadoEm: -1 });
  return instrucao;
};

Instrucao.delete = async function(id) {
  if(typeof id !== 'string') return;
  const instrucao = await InstrucaoModel.findOneAndDelete({_id: id});
  return instrucao;
};


module.exports = Instrucao;
