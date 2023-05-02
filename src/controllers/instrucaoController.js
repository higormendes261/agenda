const Instrucao = require('../models/InstrucaoModel');

exports.index = (req, res) => {
    res.render('instrucao2', {
      instrucao: {}
    });
  };

  
  exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');
  
    const instrucao = await Instrucao.buscaPorId(req.params.id);
    if(!instrucao) return res.render('404');
  
    res.render('instrucao2', { instrucao });
    
  };