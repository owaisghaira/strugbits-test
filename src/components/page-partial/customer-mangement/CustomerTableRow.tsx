import { useState } from 'react'
import { ICustomer } from '../../../types/customer'
import Button from '../../common/Button'
import ModalForm from '../../common/Form'
import Modal from '../../common/Modal'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { deleteCustomer } from '../../../store/slices/customerSlice'
import { toast } from 'react-toastify';
import DeleteModal from '../../common/DeleteModal'

interface Props {
  costomerItem: ICustomer;
  onSubmit: (e: any) => void
}

const CustomerTableRow: React.FC<Props> = ({ costomerItem, onSubmit }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [editCustomer, setEditCustomer] = useState({})
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteCustomer(costomerItem.id ?? 0))
    setIsDeleteModal(false)
    toast.success('Customer Deleted Successfully.')
  }
  return (
    <>
      <tr className='border rounded-lg text-lg bg-white' >
        <td className="py-2 pl-4 min-w-[110px] min-h-[105px]">
          <img width={109} height={105}
            src={costomerItem.avatar}
            className='rounded-[10px] max-w-none'
            alt="icon"
          />
        </td>
        <td>{costomerItem.id}</td>
        <td className="text-[#57BC90] underline">{costomerItem.name}</td>
        <td>{costomerItem.email}</td>
        <td className='pr-2'>
          <div className='flex items-center'>
            <Button
              btnText='Edit'
              onClick={() => {
                setEditCustomer(costomerItem)
                setIsModalOpen(true)
              }}
              classes='bg-[#B0E1B7] text-center text-[#008212] h-[33px] 
              font-semibold w-[106px] rounded mr-6'
            ></Button>
            <Button
              btnText='Delete'
              onClick={() => setIsDeleteModal(true)}
              classes='bg-[#EF9999] text-[#D80000] text-center h-[33px] w-[106px] font-semibold rounded'
            ></Button>
          </div>
        </td>
      </tr>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalForm
          onSubmit={onSubmit}
          onCancel={() => setIsModalOpen(false)}
          customer={editCustomer}
          setCustomer={setEditCustomer}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
      >
        <DeleteModal
          setIsDeleteModal={setIsDeleteModal}
          handleDelete={handleDelete}
        />
      </Modal>
    </>
  )
}
export default CustomerTableRow;