import React from 'react';
import Logo from '../assets/images/logo.png'
import UserIcon from '../assets/icons/customers-icon.svg'
import CloseIcon from '../assets/icons/CloseIcon';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen  , toggleSidebar}) => {
  return (
    <aside className={`w-80 md:w-[24vw] bg-[#015249] opacity-100 rounded-r-[20px] transition-all duration-300 ${isSidebarOpen ? '' : 'hidden'} md:block`}>
      <div onClick={toggleSidebar} className='absolute lg:hidden right-24 top-4'>
        <CloseIcon />
      </div>
      <div className="pt-12 px-2 flex justify-center">
        <img src={Logo} alt="logo" />
      </div>
      <div className='pt-44'>
        <div className='flex mx-2 md:ml-10 md:mr-16 rounded-lg p-5 cursor-pointer items-center bg-[#043933] shadow-lg rounded-10 opacity-100 overflow-hidden'>
          <img className='md:pl-2' src={UserIcon} alt='icon' />
          <div className='w-full text-center'>
            <p className='uppercase text-2xl text-white font-semibold '>Customers</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
