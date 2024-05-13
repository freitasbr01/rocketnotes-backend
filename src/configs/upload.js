// Configurações para funcionalidades de upload de imagens

const path = require("path"); // já disponivel no node
const multer = require("multer"); // foi instalado uma biblioteca
const crypto = require("crypto"); // já disponivel no node

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp"); // pasta temporaria, onde a imagem chega
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); // pasta onde os arquivos vão ficar

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}

// O MULTER é a biblioteca que vamos utilizar para fazer o upload.
// O Multer então utiliza esse nome de arquivo para armazenar o arquivo enviado pelo cliente no destino especificado na configuração do Multer.
