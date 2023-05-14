const Instrucao = require('../models/InstrucaoModel');

exports.index = async (req, res) => {
  try {
    const instrucao = await Instrucao.buscaInstrucao();

    res.render('instrucao2', { instrucao });
  } catch (error) {
    // Trate qualquer erro ocorrido
  }
};

exports.editIndex = async function(req, res) {
  if (!req.params.id) return res.render('404');

  try {
    const instrucao = await Instrucao.buscaPorId(req.params.id);
    if (!instrucao) return res.render('404');

    // Incrementa o contador
    instrucao.contador++;
    
    // Salva a instrução atualizada no banco de dados
    await instrucao.save();

    res.render('instrucao2', { instrucao, contador: instrucao.contador });
  } catch (error) {
    // Trate qualquer erro ocorrido
  }
};
