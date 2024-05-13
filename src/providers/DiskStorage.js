// VAI SALVAR O ARQUIVO AQUIVO E VAI DELETAR O ARQUIVO
// Sempre que o usuario enviar uma novo foto antes de salvar essa nova foto é importante verificar se esse usuario já tem uma foto, deletar a foto antiga e colocar a nova lá, por que? para não ter fotos duplicadas ou para não ter muitas fotos em um usuário, o usuário precisa de uma foto só de perfil, então a gente sempre deleta a foto anterior para colocar a nova, por isso precisamos de duas funções que é "para salvar a foto" e a outra "deletar a foto".

const fs = require("fs"); // importando do proprio node para lidar com manipulação de arquivos.
const path = require("path"); // importando do proprio node para lidar com os diretorios.
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file),
    );
    return file;
  }
// Vou pegar o arquivo dentro da pasta temporaria e passo o nome do arquivo e levo para pasta de uploads.
// Quando fazemos o upload da imagem, a imagem quando ela chega no backend vai ser carregada na pasta temporaria, vai ficar esperando lá para o nosso backende decidir o que vai fazer com aquela imagem, então quando formos salvar o arquivo, a gente pega ela da pasta temporaria e envia ela para pasta de upload que é a onde ela vai ficar. Isso é o que acontece no codigo acima. O rename do fs acima é para poder mudar o arquivo de lugar.

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    
    try {
      await fs.promises.stat(filePath) // Esse método é útil para verificar se um arquivo ou diretório existe e para obter informações sobre ele, como seu tamanho ou a última vez que foi modificado. Se existir segue para deletar.
    } catch {      
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorage;