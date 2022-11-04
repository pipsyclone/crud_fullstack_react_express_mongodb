import { Routes, Route } from 'react-router-dom';

import ProductList from './components/productList';
import AddProduct from './components/addProduct';
import UpdateProduct from './components/updateProduct';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ProductList />} />
      <Route path='/add-product' element={<AddProduct />} />
      <Route path='/update-product/:id' element={<UpdateProduct />} />
    </Routes>
  )
}

export default App;