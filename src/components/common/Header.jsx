import React, { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-[#0f0f0f] h-[78px] w-full relative">
      <div className="flex items-center justify-between h-full px-[115px]">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/img_logo.svg"
            alt="Logoipsum"
            className="w-[191px] h-[46px]"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a
            href="#"
            className="text-white text-[16px] font-medium leading-[20px] underline hover:text-gray-300 transition-colors"
          >
            HOME
          </a>
          <a
            href="#"
            className="text-white text-[16px] font-medium leading-[20px] hover:text-gray-300 transition-colors"
          >
            OUR SCREENS
          </a>
          <a
            href="#"
            className="text-white text-[16px] font-medium leading-[20px] hover:text-gray-300 transition-colors"
          >
            SCHEDULE
          </a>
          <a
            href="#"
            className="text-white text-[16px] font-medium leading-[20px] hover:text-gray-300 transition-colors"
          >
            MOVIE LIBRARY
          </a>
          <a
            href="#"
            className="text-white text-[16px] font-medium leading-[20px] hover:text-gray-300 transition-colors"
          >
            LOCATION & CONTACT
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden"
          aria-label="Toggle mobile menu"
        >
          <img
            src="/images/img_burger_menu.svg"
            alt="Menu"
            className="w-[34px] h-[20px]"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0f0f0f] border-t border-gray-700 z-50">
          <nav className="flex flex-col space-y-4 p-4">
            <a
              href="#"
              className="text-white text-[16px] font-medium leading-[20px] hover:text-gray-300 transition-colors"
            >
              HOME
            </a>
            <a
              href="#"
              className="text-white text-[16px] font-medium leading-[20px] hover:text-gray-300 transition-colors"
            >
              OUR SCREENS
            </a>
            <a
              href="#"
              className="text-white text-[16px] font-medium leading-[20px] hover:text-gray-300 transition-colors"
            >
              SCHEDULE
            </a>
            <a
              href="#"
              className="text-white text-[16px] font-medium leading-[20px] hover:text-gray-300 transition-colors"
            >
              MOVIE LIBRARY
            </a>
            <a
              href="#"
              className="text-white text-[16px] font-medium leading-[20px] hover:text-gray-300 transition-colors"
            >
              LOCATION & CONTACT
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;