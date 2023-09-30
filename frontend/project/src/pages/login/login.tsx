import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/user/api-actions';
import { AuthData } from '../../types/user.types';

export function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      email,
      password,
    });
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
        <form method="post" action="" onSubmit={handleSubmit}>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(evt) => setEmail(evt.target.value)}
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
                onChange={(evt) => setPassword(evt.target.value)}
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
            type="button"
            onClick={() => navigate(AppRoute.Products)}
          >
            Войти
          </button>
        </form>
      </section>
    </div>
  );
}
