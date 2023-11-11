import React, { useEffect } from 'react';
import './App.css';
import { doGetCustomers } from './store/slices/customerSlice';
import { useAppDispatch } from './hooks/reduxHooks';
import Layout from './layout/Layout';
import Customers from './pages/Customers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(doGetCustomers());
  }, [dispatch])

  return (
    <div className='font-lato'>
      <Layout>
        <Customers />
      </Layout>
      <ToastContainer />
    </div>
  );
}

export default App;
