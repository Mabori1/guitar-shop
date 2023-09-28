import { Footer } from '../footer/footer';
import { Header } from '../header/header';

type AppScreenProps = {
  errorsCount: number;
};

function App({ errorsCount }: AppScreenProps): JSX.Element {
  return (
    <>
      <Header />;
      <Footer />;
    </>
  );
}

export default App;
