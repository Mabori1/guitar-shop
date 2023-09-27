export const USER_VALIDATION_DATA = {
  NAME: {
    MessageValid: 'Имя должно состоять из 1-15 символов',
    MessageRequired: 'Имя обязательно',
    Min: 1,
    Max: 15,
  },
  PASSWORD: {
    MessageValid: 'Пароль должен состоять из 6-12 символов',
    MessageRequired: 'Пароль обязателен',
    Min: 6,
    Max: 12,
  },
  EMAIL: {
    MessageValid: 'Адрес электронной почты должен быть валидным',
    MessageRequired: 'Адрес электронной почты обязателен',
  },
  AVATAR: {
    MessageValid: 'Фото должно быть в формате jpeg или png',
  },
};

export const JWT_ALGORITHM = 'HS256';
