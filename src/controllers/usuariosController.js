const Usuario = require('../models/CadastroModel');

exports.index = async(req, res) => {
  const usuario = await Usuario.buscaUsuario();
  res.render('usuarios', { usuario });
};


