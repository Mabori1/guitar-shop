import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
