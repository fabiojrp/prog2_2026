const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./banco/sebo.db', (erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco:', erro.message);
        return;
    }

    console.log('Banco conectado.');

    inicializarBanco();
});

function inicializarBanco() {
    db.serialize(() => {

        // 1. Backup dos dados atuais
        db.all('SELECT * FROM categorias', (erro, categorias) => {
            if (erro && !erro.message.includes('no such table')) {
                return console.error('Erro no backup de categorias:', erro.message);
            }

            categorias = categorias || [];

            db.all('SELECT * FROM livros', (erro, livros) => {
                if (erro && !erro.message.includes('no such table')) {
                    return console.error('Erro no backup de livros:', erro.message);
                }

                livros = livros || [];

                // 2. Recriação das tabelas
                db.serialize(() => {

                    db.run('BEGIN TRANSACTION');

                    db.run('DROP TABLE IF EXISTS livros');
                    db.run('DROP TABLE IF EXISTS categorias');

                    db.run(`
                        CREATE TABLE categorias (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            nome TEXT NOT NULL,
                            descricao TEXT
                        )
                    `);

                    db.run(`
                        CREATE TABLE livros (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            titulo TEXT NOT NULL,
                            destaque INTEGER DEFAULT 0,
                            categoria TEXT,
                            autor TEXT,
                            editora TEXT,
                            ano INTEGER,
                            valor FLOAT,
                            sinopse TEXT,
                            paginas INTEGER,
                            imagem TEXT
                        )
                    `);

                    // 3. Restauração das categorias
                    const stmtCategoria = db.prepare(`
                        INSERT INTO categorias (id, nome, descricao)
                        VALUES (?, ?, ?)
                    `);

                    categorias.forEach(c => {
                        stmtCategoria.run(c.id, c.nome, c.descricao);
                    });

                    stmtCategoria.finalize();

                    // 4. Restauração dos livros
                    const stmtLivro = db.prepare(`
                        INSERT INTO livros (
                            id, titulo, destaque, categoria, autor,
                            editora, ano, valor, sinopse, paginas, imagem
                        )
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `);

                    livros.forEach(l => {
                        stmtLivro.run(
                            l.id, l.titulo, l.destaque, l.categoria,
                            l.autor, l.editora, l.ano, l.valor,
                            l.sinopse, l.paginas, l.imagem
                        );
                    });

                    stmtLivro.finalize((erro) => {
                        if (erro) {
                            console.error('Erro ao restaurar livros:', erro.message);
                            db.run('ROLLBACK');
                        } else {
                            db.run('COMMIT', (erro) => {
                                if (erro) {
                                    console.error('Erro ao confirmar alterações:', erro.message);
                                    return;
                                }

                                console.log('Tabelas recriadas e dados restaurados.');
                            });
                        }
                    });
                });
            });
        });
    });
}

module.exports = db;