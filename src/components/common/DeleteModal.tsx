import React from 'react'
import Button from './Button'
import DeleteIcon from '../../assets/icons/deleteIcon.svg'

interface Props {
  setIsDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

const DeleteModal: React.FC<Props> = ({ setIsDeleteModal, handleDelete }) => {
  return (
    <div className='h-[527px]'>
      <div className='text-center pt-20'>
        <img className='inline' width={84} src={DeleteIcon} alt="icon" />
        <p className='text-3xl text-black font-bold pt-7'>
          Are you sure?
        </p>
        <p className='text-2xl text-center text-black pt-7 px-8'>
          Do you really want to delete this customer? This process can not be undone.
        </p>
      </div>
      <div className='flex items-center justify-center pt-14 '>
        <Button
          btnText='Cancel'
          onClick={() => setIsDeleteModal(false)}
          classes='bg-[#A5A5AF] text-center text-white h-[55px] text-lg font-semibold w-[207px] rounded mr-6'
        ></Button>
        <Button
          btnText='Delete'
          onClick={handleDelete}
          classes='bg-[#D80000] text-white text-center h-[55px] w-[207px] text-lg font-semibold rounded'
        ></Button>
      </div>
    </div>
  )
}

export default DeleteModal