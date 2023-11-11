// ModalForm.js
import { useEffect } from 'react';
import MaskIcon from '../../assets/icons/mask-group.svg';
import CloseIcon from '../../assets/icons/CloseIcon';
import { toast } from 'react-toastify';

interface Props {
  onSubmit: (e: any) => void;
  onCancel: () => void;
  customer: any;
  setCustomer: React.Dispatch<React.SetStateAction<{}>>
}

const ModalForm: React.FC<Props> = ({ onSubmit, onCancel, customer, setCustomer }) => {
  const inputClasses = "w-full rounded-lg p-4 border border-[#DCDBDD] placeholder:text-[#84818A]"

  const handleSubmit = () => {
    if (!customer.name || !customer.email || !customer.avatar) {
      toast.error('Please fill in all fields');
      return;
    }
    onSubmit(customer);
    if (customer.id) onCancel();
  };

  return (
    <div className='h-[570px]'>
      <div className='flex relative justify-center'>
        <div onClick={onCancel} className='absolute top-0 right-0 m-4 cursor-pointer text-white'>
          <CloseIcon />
        </div>
        <img src={MaskIcon} alt="icon" />
        <p className='absolute bottom-2 text-4xl text-white font-recoleta font-semibold'>
          {customer.id ? 'Update Customer' : 'Add New Customer'}
        </p>
      </div>
      <div className='p-9 space-y-8'>
        <input
          className={inputClasses}
          placeholder='Customer Name'
          value={customer.name ?? ''}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
        <input
          placeholder='Email'
          className={inputClasses}
          value={customer.email ?? ''}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
        />
        <div className='flex space-x-4'>
          <label className="custom-file-input">
            <span className='text-xl text-[#57BC90] font-semibold underline'>Upload Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCustomer({ ...customer, avatar: e.target?.files && e.target?.files[0] })}
            />
          </label>
          {customer.avatar && (
            (typeof customer.avatar === 'string') ? (
              <img className='rounded-full' width={40} src={customer.avatar} alt="img" />
            ) : (
              (customer.avatar.type && customer.avatar.type.startsWith('image/')) ? (
                <img className='rounded-full' width={40} src={URL.createObjectURL(customer.avatar)} alt="img" />
              ) : null
            )
          )}
        </div>
        <button
          onClick={handleSubmit}
          className='bg-gradient-to-r flex items-center uppercase justify-center from-[#57BC90] to-[#004B40] text-white h-[70px] w-full text-center px-9 text-[20px]  rounded mr-6'
        >
          {customer.id ? 'Update Customer' : 'Add Customer'}
        </button>
      </div>
    </div>
  );
};

export default ModalForm;
