const { Router } = require('express');
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require('../controllers/UsersController');
const UserAvatarController = require('../controllers/UserAvatarController');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
// Não precisamos mais passar o id do usuário acima depois do put porque o ensureAuthenticated vai capturar qual o id do usuário que está dentro do token de autenticação.
// Dentro do middlewares "ensureAuthenticated" de autenticação ele vai caputar qual é o ID do usuário que está dentro do token de autenticação por isso não passaremos mais o id do usuário auqi.
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update)


module.exports = usersRoutes;
