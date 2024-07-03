import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Public, Home, Faq, Products, DetailProduct, AboutUs, Blogs, DetailCart, BlogCate, DetailBlog, FinalRegister, ResetPassword } from './pages/public';
import { AdminLayout, CreateBlog, CreateProduct, Dashboard, ManageBlogs, ManageOrder, ManageProducts, ManageUser } from './pages/admin';
import { MemberLayout, Personal, History, Wishlist, Checkout } from './pages/member'
import path from './ultils/path';
import { getCategories } from './store/app/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from './components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <div className="font-main h-screen relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS__CATEGORY} element={<Products />} />
          <Route path={path.FAQ} element={<Faq />} />
          <Route path={path.BLOGS__CATEGORY} element={<BlogCate />} />
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />} />
          <Route path={path.DETAIL_BLOG__CATEGORY__PID__TITLE} element={<DetailBlog />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.BLOGS} element={<Blogs />} />
          <Route path={path.DETAIL_CART} element={<DetailCart />} />
          <Route path={path.CHECKOUT} element={<Checkout />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.ALL} element={<Home />} />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={path.CREATE_BLOG} element={<CreateBlog />} />
          <Route path={path.MANAGE_BLOGS} element={<ManageBlogs />} />

        </Route>
        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<DetailCart />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.WISHLIST} element={<Wishlist />} />
        </Route>

      </Routes>
      <ToastContainer autoClose={2000} hideProgressBar={true}>
        { }
      </ToastContainer>
    </div>
  );
}

export default App;
