import { Paths } from '../../constants';
import { Logo } from '../logo/logo';

export const Header: React.FC = () => {
  const auth = true;

  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          {auth && (
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <a className="link main-nav__link" href={Paths.Products}>
                    Каталог
                  </a>
                </li>
                <li className="main-nav__item">
                  <a className="link main-nav__link" href={Paths.Login}>
                    Где купить?
                  </a>
                </li>
                <li className="main-nav__item">
                  <a className="link main-nav__link" href={Paths.Login}>
                    О компании
                  </a>
                </li>
              </ul>
            </nav>
          )}
          <div className="header__container">
            <span className="header__user-name">Имя</span>
            <a
              className="header__link"
              href="login.html"
              aria-label="Перейти в личный кабинет"
            >
              <svg
                className="header__link-icon"
                width="12"
                height="14"
                aria-hidden="true"
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
};
