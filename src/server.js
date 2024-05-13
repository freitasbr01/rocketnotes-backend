require('express-async-errors')
const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require('express')
const routes = require('./routes')

migrationsRun()

const app = express()
app.use(cors()); // habliitado para que o backend consiga atender as requisições do frontend
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
// Isso define uma rota no servidor Express.js. Qualquer requisição que comece com “/files” será tratada por esta rota.
// Este código permite que os arquivos no diretório uploadConfig.UPLOADS_FOLDER sejam acessados através de requisições HTTP que começam com “/files”. Por exemplo, se houver um arquivo chamado “image.jpg” no diretório uploadConfig.UPLOADS_FOLDER, ele poderá ser acessado com uma requisição HTTP para “/files/image.jpg”.

app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
