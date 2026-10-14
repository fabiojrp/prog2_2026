// "Ficção científica" -> "ficcao-cientifica"
// Use esta mesma função na rota da página inicial (no lugar de gerarSlug).
module.exports = function gerarSlug(texto) {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-');
};
