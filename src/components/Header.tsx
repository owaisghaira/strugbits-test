import React from 'react';
import { FaBars } from 'react-icons/fa';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  return (
    <header className="bg-white shadow p-12">
      <div className="flex justify-between items-center">
        <p className='text-[40px] font-bold'>Customers</p>

        <button onClick={onSidebarToggle} className="md:hidden">
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
