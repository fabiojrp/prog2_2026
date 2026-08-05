//import { Router } from 'express';
//const router = Router();
const express = require('express');
const router = express.Router();

function buscarFilmes() {
    // Simulando uma busca assíncrona por filmes
    return [
        { id: 1, title: 'Inception', director: 'Christopher Nolan' },
        { id: 2, title: 'The Matrix', director: 'The Wachowskis' },
        { id: 3, title: 'Interstellar', director: 'Christopher Nolan' },
    ];
}

router.get('/', (req, res) => {
    const filmes = buscarFilmes();

    const filme = filmes[0]

    // Desestruturação de objetos
    const { id, title } = filme
    //console.log(id);


    res.render('pages/home', { data: filmes });
});

// router.get('/', async (req, res) => {
//     const data = buscarFilmes().then(filmes => {
//         res.render('pages/home', { data: filmes });
//     });
// });

//export default router;
module.exports = router;