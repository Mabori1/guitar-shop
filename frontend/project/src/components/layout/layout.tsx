import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
