import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import About from './pages/About'
import Contact from './pages/Contact'
import PublishProduct from './components/core/Dashboard/PublishProduct'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifyEmail from './pages/VerifyEmail'
import CreateCategory from './pages/CreateCategory'
import AddProduct from './components/core/Dashboard/AddProduct/AddProduct'
import EditProduct from './components/core/Dashboard/EditProduct'
import PageNotFound from './pages/PageNotFound'
import Try from './pages/Try'
import ProductDetails from './pages/ProductDetailsPage'
import Navbar from './components/common/Navbar'

function App() {

  return (
    <div className='w-full h-full  flex flex-col'>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/create-category' element={<CreateCategory/>}/>
        <Route path='/productDetailsPage/:productId' element={<ProductDetails/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path='/publish-product' element={<PublishProduct/>}/>
        <Route path='/category/:categoryName' element={<Category/>}/>
        <Route path='/editProduct/:productId' element={<EditProduct/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/try' element={<Try/>}/>
      </Routes>
    </div>
  )
}

export default App
