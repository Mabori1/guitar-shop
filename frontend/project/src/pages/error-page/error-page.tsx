export const ErrorPage: React.FC = () => {
  return (
    <div className="container">
      <section className="error">
        <h1 className="error__title">404</h1>
        <span className="error__subtitle">Страница не найдена.</span>
        <p className="error__text">
          К сожалению, страница, которую вы ищете
          <br />
          не существует.
        </p>
        <button className="button button__error button--small button--black-border">
          Продолжить покупки
        </button>
      </section>
    </div>
  );
};
