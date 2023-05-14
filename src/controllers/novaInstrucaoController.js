const Instrucao = require('../models/InstrucaoModel');

exports.index = (req, res) => {
    res.render('novaInstrucao', {
      instrucao: {}
    });
  };

exports.register = async function(req, res) {
    try {
      const instrucao = new Instrucao(req.body);
      await instrucao.register();
  
      if(instrucao.errors.length > 0) {
        req.flash('errors', instrucao.errors);
        req.session.save(() => res.redirect('back'));
        return;
      }
  
      req.flash('success', 'Instrução registrada com sucesso.');
      req.session.save(() => res.redirect(`/instrucao/index/`));
      return;
    } catch(e) {
      console.log(e);
      return res.render('404');
    }
  };

  exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');
  
    const instrucao = await Instrucao.buscaPorId(req.params.id);
    if(!instrucao) return res.render('404');
  
    res.render('novaInstrucao', { instrucao });
  };

  exports.edit = async function(req, res) {
    try {
      if(!req.params.id) return res.render('404');
      const instrucao = new Instrucao(req.body);
      await instrucao.edit(req.params.id);
  
      if(instrucao.errors.length > 0) {
        req.flash('errors', instrucao.errors);
        req.session.save(() => res.redirect('back'));
        return;
      }
  
      req.flash('success', 'Instrucao editado com sucesso.');
      req.session.save(() => res.redirect(`/instrucao/index`));
      return;
    } catch(e) {
      console.log(e);
      res.render('404');
    }
  };

  exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404');
  
    const instrucao = await Instrucao.delete(req.params.id);
    if(!instrucao) return res.render('404');
  
    req.flash('success', 'Instrucao apagado com sucesso.');
    req.session.save(() => res.redirect('back'));
    return;
  };
  