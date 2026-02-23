import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Footer from './components/layout/Footer.jsx'
import NavBar from './components/layout/NavBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
    {/* <App /> */}
    
    <ProductCard product={{
      name: "Sample Product",
      description: "This is a sample product.",
      price: 29.99,
      image: "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-17-pro-17-pro-max-hero.png"
    }} />
    <Footer />
  </StrictMode>,
)
