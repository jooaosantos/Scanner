const express = require("express");
const app = express();

const porta = 3003;

app.use(express.static('.'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*
Utilização do Tesseract para extrair texto de uma imagem
*/

const Tesseract = require("tesseract.js");

app.get("/converter", (req, res, next) => {

    Tesseract.recognize(
        'uploads/arquivo.png',
        'por',
        { logger: m => {
            console.log(m);
        } }
      ).then(({ data: { text } }) => {
        console.log(text);
        res.send(text);
      }).catch(err => {
        console.log(err);
      })
})

/*
Seção para realização do upĺoad do arquivo. Utiliza-se o multer para a realização do processo.
Um arquivo do tipo png deve ser recebido e salvo no diretório "uploads". Caso esse arquivo já
exista, ele será sobrescrito
*/
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `arquivo.${extensaoArquivo}`)
    }
});

const upload = multer({ storage }).single("foto");

app.post("/upload", (req, res, next) => {

    upload(req, res, err => {
        if (err){
            return console.log(err);
        }
    })
    res.send("ok");
})

/*
Iniciando servidor!
*/
app.listen(porta, () => {
    console.log("Running...");
})
