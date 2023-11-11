import { useState } from 'react'
import { ICustomer } from '../../../types/customer'
import Button from '../../common/Button'
import ModalForm from '../../common/Form'
import Modal from '../../common/Modal'
import { deleteCustomer } from '../../../store/slices/customerSlice'
import { useAppDispatch } from '../../../hooks/reduxHooks'

interface Props {
  costomerItem: ICustomer[]
}

const CustomerTableRow = ({ costomerItem, onSubmit }: any) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [customer, setCustomer] = useState({})
  const dispatch = useAppDispatch()

  return (
    <>
      <tr className='border rounded-lg text-lg bg-white' >
        <td className="py-2 pl-4 min-w-[110px] min-h-[105px]">
          <img width={109} height={105}
            src={costomerItem.avatar}
            className='rounded-[10px] max-w-none'
            alt="customer-logo"
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
                setCustomer(costomerItem)
                setIsModalOpen(true)
              }}
              classes='bg-[#B0E1B7] text-[#008212] h-[33px] font-semibold w-[106px] rounded mr-6'
            ></Button>
            <Button
              btnText='Delete'
              onClick={() => dispatch(deleteCustomer(costomerItem.id))}
              classes='bg-[#EF9999] text-[#D80000] h-[33px] w-[106px] font-semibold rounded'
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
          customer={customer}
          setCustomer={setCustomer}
        />
      </Modal>
    </>
  )
}
export default CustomerTableRow;