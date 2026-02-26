import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <div className="app">
            <Navbar />
            <main className="app__main">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
