import React, { useEffect, useState } from 'react'
import CustomerTableRow from './CustomerTableRow'
import { ICustomer } from '../../../types/customer';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { addCustomer, doGetCustomers, updateCustomer } from '../../../store/slices/customerSlice';
import Button from '../../common/Button';
import PlusIcon from '../../../assets/icons/PlusIcon';
import Modal from '../../common/Modal';
import ModalForm from '../../common/Form';
import Loader from '../../common/Loader';
import { toast } from 'react-toastify';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

const CustomerTable = () => {
  const dispatch = useAppDispatch()
  const { customer_data, loading } = useAppSelector((state) => state.customer)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [customer, setCustomer] = useState({})
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const handleFormSubmit = (formData: ICustomer) => {
    if (formData?.id) {
      if (formData.avatar instanceof File) {
        formData.avatar = URL.createObjectURL(formData.avatar);
      }
      setIsModalOpen(false);
      dispatch(updateCustomer(formData))
      toast.success('Customer Updated Successfully.');
    } else {
      let maxId = 0;
      customer_data.forEach((item: any) => {
        if (item.id > maxId) {
          maxId = item.id;
        }
      });
      formData.id = maxId + 1;
      if (formData.avatar instanceof File) {
        formData.avatar = URL.createObjectURL(formData.avatar);
      }
      setIsModalOpen(false);
      dispatch(addCustomer(formData))
      toast.success('Customer Added Successfully.');
    }
  };

  const handleSortClick = (columnName: string) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (columnName: string) => {
    if (sortColumn === columnName) {
      return sortDirection === 'asc' ? (
        <FaSortUp className="inline-block m-1 pb-[2px] text-white" />
      ) : (
        <FaSortDown className="inline-block m-1 pb-[2px] text-white" />
      );
    } else {
      return <FaSort className="inline-block m-1 pb-[2px] text-gray-400" />;
    }
  };
  const sortedCustomerData = [...customer_data].sort((a, b) => {
    const compareValue = a[sortColumn] > b[sortColumn] ? 1 : -1;
    return sortDirection === 'asc' ? compareValue : -compareValue;
  });

  useEffect(() => {
    dispatch(doGetCustomers());
  }, [dispatch])

  { true && <Loader /> }
  return (
    <>
      <div className='sm:flex-none flex items-center justify-center md:justify-start mt-4 md:m-0'>
        <Button
          btnText='Add New Customer'
          onClick={() => setIsModalOpen(true)}
          icon={<PlusIcon />}
          classes='bg-gradient-to-r flex items-center uppercase justify-between from-[#57BC90] to-[#004B40] rounded-[10px] text-white h-[70px] px-9 text-[20px] font-semibold rounded md:mr-6'
        ></Button>
      </div>
      <div className='overflow-x-auto'>
        <table className="w-[100vw] md:max-w-full md:mt-12 spacing-table text-[#015249] ">
          <thead className="text-[22px] bg-[#C5E3D5]">
            <tr className="text-left">
              <th
                scope="col"
                className="py-4 w-[100px]"
              >
              </th>
              <th
                scope="col"
                className="py-4 w-[100px] whitespace-nowrap"
                onClick={() => handleSortClick('id')}
              >
                Customer ID
                {getSortIcon('id')}
              </th>
              <th
                scope="col"
                className="py-4 w-[100px] whitespace-nowrap"
                onClick={() => handleSortClick('name')}
              >
                Customer Name
                {getSortIcon('name')}
              </th>
              <th
                scope="col"
                className="py-4 w-[150px]"
                onClick={() => handleSortClick('email')}
              >
                Email
                {getSortIcon('email')}
              </th>
              <th
                scope="col"
                className="py-4 w-[250px]"
              >
              </th>
            </tr>
          </thead>
          <tbody className=''>
            {sortedCustomerData?.map((costomerItem: ICustomer, index) => (
              <CustomerTableRow
                key={index}
                costomerItem={costomerItem}
                setCustomer={setCustomer}
                setIsModalOpen={setIsModalOpen}
                onSubmit={handleFormSubmit}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => {
        setCustomer({});
        setIsModalOpen(false)
      }}>
        <ModalForm
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          customer={customer}
          setCustomer={setCustomer}
        />
      </Modal>
    </>
  )
}

export default CustomerTable