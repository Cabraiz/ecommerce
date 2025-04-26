import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

// Importar componentes
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import UserProfile from './components/UserProfile/UserProfile';

// Importar mocks
import { products } from './mocks/products';

// Importar Cart Context
import { CartProvider, useCart } from './contexts/CartContext';

// Componente especial para usar o ID da URL no ProductDetails
const ProductDetailsWrapper = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return <ProductDetails product={product} />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          
          <div className="p-8">
            <Routes>
              <Route path="/" element={<ProductList products={products} />} />
              <Route path="/product/:id" element={<ProductDetailsWrapper />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<OrderSuccess />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

// CartPage para conectar ao CartContext
const CartPage = () => {
  return <Cart />;
};

export default App;
