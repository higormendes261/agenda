const Instrucao = require('../models/InstrucaoModel');

exports.index = async(req, res) => {
    const instrucao = await Instrucao.buscaInstrucao();
    res.render('instrucao', { instrucao });
  };
  