export function ErrorPage(): JSX.Element {
  return (
    <div className="container">
      <section className="error">
        <h1 className="error__title">404</h1>
        <span className="error__subtitle">Страница не найдена.</span>
        <p className="error__text">Данный адрес не существует</p>
        <button className="button button__error button--small button--black-border">
          Продолжить покупки
        </button>
      </section>
    </div>
  );
}
