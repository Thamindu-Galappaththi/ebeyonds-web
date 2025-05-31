import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] pt-16 pb-10">
      <div className="px-6 md:px-16 lg:px-28">
        {/* Company Info and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 space-y-8 md:space-y-0">
          {/* Address */}
          <div className="text-white text-[16px] md:text-[18px] leading-[27px]">
            IT Group
            <br />
            C. Salvador de Madariaga, 1
            <br />
            28027 Madrid
            <br />
            Spain
          </div>

          {/* Social Media */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <span className="text-white text-[16px] md:text-[18px]">
              Follow us on
            </span>
            <img
              src="/images/img_vector_white_a700_23x29.svg"
              alt="Social Media"
              className="w-6 h-5 md:w-[29px] md:h-[23px]"
            />
            <img
              src="/images/img_vector_white_a700_21x31.svg"
              alt="Social Media"
              className="w-7 h-5 md:w-[31px] md:h-[21px]"
            />
          </div>
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="text-[#b7b7b7] text-[14px] md:text-[16px] leading-5">
            <span>Copyright © 2022 IT Hotels. </span>
            <span>All rights reserved.</span>
          </div>

          <div className="text-[#b7b7b7] text-[14px] md:text-[16px] leading-5">
            Photos by Felix Mooneeram & Serge Kutuzov
            <span className="font-medium"> on Unsplash</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
