const express = require('express');
const bcrypt = require('bcryptjs');
const appUsuario = express();
const db = require('../banco/database');
const { exigirLogin } = require('../util/autenticacao');

const FORMAS_PAGAMENTO = ['pix', 'credito', 'debito', 'boleto'];

// Monta o menu (categorias) usado pelo topo do site
function carregarMenu(res, callback) {
    db.all('SELECT * FROM categorias', [], function (erro, categorias) {
        if (erro) {
            console.log(erro.message);
            return res.status(500).send('Erro ao consultar categorias.');
        }
        callback(categorias);
    });
}

//================= CADASTRO =====================

appUsuario.get('/cadastro', (req, res) => {
    carregarMenu(res, (categorías) => {
        res.render('usuario/cadastro', {
            categorías,
            titulo: 'Criar conta',
            erro: null,
            valores: {}
        });
    });
});

appUsuario.post('/cadastro', (req, res) => {
    const nome = (req.body.nome || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const cpfDigitado = req.body.cpf || '';
    const cpf = cpfDigitado.replace(/\D/g, '');
    const senha = req.body.senha || '';

    function mostrarErro(mensagem) {
        carregarMenu(res, (categorías) => {
            res.render('usuario/cadastro', {
                categorías,
                titulo: 'Criar conta',
                erro: mensagem,
                valores: { nome, email, cpf: cpfDigitado }
            });
        });
    }

    if (!nome || !email || !senha) {
        return mostrarErro('Preencha todos os campos.');
    }
 
    if (senha.length < 6) {
        return mostrarErro('A senha deve ter pelo menos 6 caracteres.');
    }

    const senhaHash = bcrypt.hashSync(senha, 10);

    db.run(
        'INSERT INTO usuarios (nome, email, cpf, senha) VALUES (?, ?, ?, ?)',
        [nome, email, cpf, senhaHash],
        function (erro) {
            if (erro) {
                console.log(erro.message);
                if (erro.message.includes('usuarios.email')) {
                    return mostrarErro('Este e-mail já está cadastrado.');
                }
                if (erro.message.includes('usuarios.cpf')) {
                    return mostrarErro('Este CPF já está cadastrado.');
                }
                return mostrarErro('Erro ao cadastrar usuário.');
            }
            res.redirect('/usuario/login?cadastro=ok');
        }
    );
});

//================= LOGIN / LOGOUT =====================

appUsuario.get('/login', (req, res) => {
    carregarMenu(res, (categorías) => {
        res.render('usuario/login', {
            categorías,
            titulo: 'Entrar',
            erro: null,
            sucesso: req.query.cadastro === 'ok',
            email: ''
        });
    });
});

appUsuario.post('/login', (req, res) => {
    const email = (req.body.email || '').trim().toLowerCase();
    const senha = req.body.senha || '';

    function mostrarErro(mensagem) {
        carregarMenu(res, (categorías) => {
            res.render('usuario/login', {
                categorías,
                titulo: 'Entrar',
                erro: mensagem,
                sucesso: false,
                email
            });
        });
    }

    db.get(
        'SELECT * FROM usuarios WHERE email = ?',
        [email],
        function (erro, usuario) {
            if (erro) {
                console.log(erro.message);
                return mostrarErro('Erro ao consultar usuário.');
            }
            if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
                return mostrarErro('E-mail ou senha inválidos.');
            }

            // Nova sessão após o login (mantém o carrinho)
            const carrinho = req.session.carrinho;
            req.session.regenerate(function () {
                req.session.carrinho = carrinho;
                req.session.usuario = { id: usuario.id, nome: usuario.nome };
                res.redirect('/usuario/compra/confirmacao');
            });
        }
    );
});

appUsuario.get('/logout', (req, res) => {
    req.session.destroy(function () {
        res.redirect('/');
    });
});

//================= CONFIRMAÇÃO DA COMPRA =====================

appUsuario.get('/compra/confirmacao', exigirLogin, (req, res) => {
    db.get(
        'SELECT id, nome, email, cpf FROM usuarios WHERE id = ?',
        [req.session.usuario.id],
        function (erro, usuario) {
            if (erro || !usuario) {
                console.log(erro ? erro.message : 'Usuário não encontrado.');
                return res.redirect('/login');
            }

            // Espera: req.session.carrinho = [{ id, titulo, valor, quantidade }]
            const itens = req.session.carrinho || [];
            // const total = itens.reduce(
            //     (soma, item) => soma + Number(item.valor) * Number(item.quantidade || 1),
            //     0
            // );

            carregarMenu(res, (categorías) => {
                res.render('usuario/confirmacao', {
                    categorías,
                    titulo: 'Confirmação da compra',
                    usuario,
                    itens
                });
            });
        }
    );
});

// Provisório: próxima etapa será gravar o pedido
appUsuario.post('/compra/finalizar', exigirLogin, (req, res) => {
    const pagamento = req.body.pagamento;
    if (!FORMAS_PAGAMENTO.includes(pagamento)) {
        return res.redirect('/compra/confirmacao');
    }
    res.send('Forma de pagamento escolhida: ' + pagamento + ' (finalização do pedido em construção).');
});

module.exports = appUsuario;
