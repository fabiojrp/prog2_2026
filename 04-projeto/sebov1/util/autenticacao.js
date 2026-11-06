// Protege rotas que exigem usuário logado
function exigirLogin(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }
    next();
}

module.exports = { exigirLogin };
