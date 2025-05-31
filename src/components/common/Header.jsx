import React, { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-[#0f0f0f] w-full shadow-md relative z-50">
      <div className="flex items-center justify-between h-[78px] px-6 md:px-10 lg:px-28">
        {/* Logo */}
        <div>
          <img
            src="/images/img_logo.svg"
            alt="Logo"
            className="h-[46px] w-auto"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-6">
          {['HOME', 'OUR SCREENS', 'SCHEDULE', 'MOVIE LIBRARY', 'LOCATION & CONTACT'].map((label, idx) => (
            <a
              key={idx}
              href="#"
              className={`text-white text-[15px] font-medium transition-colors hover:text-gray-300 ${
                label === 'HOME' ? 'underline' : ''
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          <img
            src="/images/img_burger_menu.svg"
            alt="Menu"
            className="w-[30px] h-[20px]"
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0f0f0f] border-t border-gray-700">
          <nav className="flex flex-col p-4 space-y-4">
            {['HOME', 'OUR SCREENS', 'SCHEDULE', 'MOVIE LIBRARY', 'LOCATION & CONTACT'].map((label, idx) => (
              <a
                key={idx}
                href="#"
                className={`text-white text-[15px] font-medium transition-colors hover:text-gray-300 ${
                  label === 'HOME' ? 'underline' : ''
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
