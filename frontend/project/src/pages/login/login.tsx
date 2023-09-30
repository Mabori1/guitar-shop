import { ChangeEvent, FormEvent, useState } from 'react';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/user/api-actions';

type Field = {
  value: string;
  error: boolean;
  regExp: RegExp;
  errorMessage: string;
  touched: boolean;
};

export function Login(): JSX.Element {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Record<string, Field>>({
    email: {
      value: '',
      error: false,
      regExp: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
      errorMessage: 'Incorrect Email address',
      touched: false,
    },
    password: {
      value: '',
      error: false,
      regExp: /([0-9].*[a-z])|([a-z].*[0-9])/,
      errorMessage: 'At least one letter and one number',
      touched: false,
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const isValid = formData[name].regExp.test(value);
    setFormData({
      ...formData,
      [name]: { ...formData[name], error: isValid, touched: true, value },
    });
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    //eslint-disable-next-line
    console.log(formData.email.value);

    dispatch(
      loginAction({
        email: formData.email.value,
        password: formData.password.value,
      })
    );
  };

  return (
    <div className="container">
      <section className="login">
        <h1 className="login__title">Войти</h1>
        <p className="login__text">
          Hовый пользователь?{' '}
          <a className="login__link" href={AppRoute.Register}>
            Зарегистрируйтесь
          </a>{' '}
          прямо сейчас
        </p>
        <form method="post" action="" onSubmit={handleFormSubmit}>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleInputChange}
            />
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="passwordLogin">Введите пароль</label>
            <span>
              <input
                type="password"
                placeholder="• • • • • • • • • • • •"
                id="passwordLogin"
                name="password"
                required
                onChange={handleInputChange}
              />
              <button className="input-login__button-eye" type="button">
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"></use>
                </svg>
              </button>
            </span>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <button
            className="button login__button button--medium"
            type="submit"
            disabled={!formData.email.error || !formData.password.error}
          >
            Войти
          </button>
        </form>
      </section>
    </div>
  );
}
