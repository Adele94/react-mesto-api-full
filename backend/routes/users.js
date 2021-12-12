const router = require('express').Router();
const {
  getUsers, getUserById, getProfile, updateUser, updateUserAvatar,
} = require('../controllers/users');
const {
  UpdateNameAndAboutValidation, UpdateAvatarValidation, UserIdValidation,
} = require('../middlewares/validation');

router.get('/users', getUsers); // возвращает всех пользователей
router.get('/users/me', getProfile); // возвращает информацию о текущем пользователе
router.get('/users/:userId', UserIdValidation, getUserById); // возвращает пользователя по _id
router.patch('/users/me', UpdateNameAndAboutValidation, updateUser); // обновляет профиль
router.patch('/users/me/avatar', UpdateAvatarValidation, updateUserAvatar); // обновляет аватар

module.exports = router;
