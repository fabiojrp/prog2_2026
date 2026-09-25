const multer = require('multer');
const path = require('path');


// Configuração do upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },

    filename: function (req, file, cb) {
        const nomeArquivo = Date.now() + path.extname(file.originalname);
        cb(null, nomeArquivo);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;