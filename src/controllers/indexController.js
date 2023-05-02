exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    return res.render('index');
  };