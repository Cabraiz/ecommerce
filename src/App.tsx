import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import Navbar from './components/Navbar/Navbar';
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import UserProfile from './components/UserProfile/UserProfile';

import Login from './pages/Login';
import Register from './pages/Register';

import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

import { Product } from './types/product';
import { VariacaoComTamanhosDTO } from './types/variacao';
import { getProducts } from './data/produts';
import { getProductCount } from './data/getProductCount';

const ProductDetailsWrapper = ({
  products,
  variacoes
}: {
  products: Product[];
  variacoes: VariacaoComTamanhosDTO[];
}) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  if (!product) return <div>Produto não encontrado.</div>;
  return <ProductDetails product={product} variacoes={variacoes} />;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [variacoes, setVariacoes] = useState<VariacaoComTamanhosDTO[]>([]);

  useEffect(() => {
    const cachedCount = Cookies.get('productCount');
    if (cachedCount) {
      setProductCount(parseInt(cachedCount));
    } else {
      getProductCount().then((count) => {
        setProductCount(count);
        Cookies.set('productCount', String(count), { expires: 1 });
      });
    }

    getProducts().then(setProducts);

    axios
      .get<VariacaoComTamanhosDTO[]>('https://ecommerce-api-production-df5c.up.railway.app/variacoes/com-tamanhos')
      .then((res) => setVariacoes(res.data));
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <div className="p-8">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProductList
                      products={products}
                      totalCount={productCount ?? 0}
                      variacoes={variacoes}
                    />
                  }
                />
                <Route
                  path="/product/:id"
                  element={<ProductDetailsWrapper products={products} variacoes={variacoes} />}
                />
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

const CartPage = () => <Cart />;

export default App;
