import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

// Importar componentes
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import UserProfile from './components/UserProfile/UserProfile';

// Importar pages
import Login from './pages/Login';
import Register from './pages/Register';

// Importar contextos
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

// Importar tipos e fetch
import { Product } from './types/product';
import { getProducts } from './data/produts'; // sua função assíncrona de busca

// Componente especial para usar o ID da URL
const ProductDetailsWrapper = ({ products }: { products: Product[] }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return <ProductDetails product={product} />;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-4">Carregando produtos...</p>;

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <div className="p-8">
              <Routes>
                <Route path="/" element={<ProductList products={products} />} />
                <Route path="/product/:id" element={<ProductDetailsWrapper products={products} />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<OrderSuccess />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

// CartPage para conectar ao CartContext
const CartPage = () => {
  return <Cart />;
};

export default App;
