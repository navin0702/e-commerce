import { BrowserRouter, useLocation } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AdminProvider } from './context/AdminContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';

function Shell() {
  const location = useLocation();
  const hideShell = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!hideShell && <Navbar />}
      <main className="app__main">
        <AppRoutes />
      </main>
      {!hideShell && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AdminProvider>
          <CartProvider>
            <WishlistProvider>
              <Shell />
            </WishlistProvider>
          </CartProvider>
        </AdminProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
