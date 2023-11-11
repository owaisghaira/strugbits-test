import React from 'react'
import CloseIcon from '../../assets/icons/CloseIcon';

const Modal = ({ isOpen, onClose, children }:any) => {
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';
  const modalContentClasses = 'bg-white rounded-3xl shadow-lg w-[528px] relative';
  const closeButtonClasses = 'absolute top-0 right-0 m-4 cursor-pointer text-white';

  return (
    <div className={`${modalClasses} bg-black bg-opacity-80 px-2`}>
      <div className={modalContentClasses}>
        <div className={closeButtonClasses} onClick={onClose}>
          <CloseIcon/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal