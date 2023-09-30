import { Logo } from '../logo/logo';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getIsAuthorized, getUserData } from '../../store/user/selector';

export function Header() {
  const isAuthorized = useAppSelector(getIsAuthorized);
  const userData = useAppSelector(getUserData);

  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <a className="link main-nav__link" href="main">
                  Каталог
                </a>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to={AppRoute.Products}>
                  Список товаров
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__container">
            <span className="header__user-name">
              {isAuthorized ? userData?.name : ''}
            </span>
            <a
              className="header__link"
              href="login.html"
              aria-label="Перейти в личный кабинет"
            >
              <svg
                className="header__link-icon"
                width="12"
                height="14"
                aria-hidden="false"
              >
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
