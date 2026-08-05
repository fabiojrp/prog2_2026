//import { Router } from 'express';
//const router = Router();
const express = require('express');
const router = express.Router();

const users = [
    { id: 1, title: 'Inception', director: 'Cris' },
    { id: 2, title: 'The Matrix', director: 'João' },
    { id: 3, title: 'Interstellar', director: 'Zé' },
];

router.get('/', (req, res) => {
    res.render('pages/home', { data: users });
});

//export default router;
module.exports = router;