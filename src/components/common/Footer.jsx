import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] pt-[115px] pb-[40px]">
      <div className="px-[115px]">
        {/* Company Info and Social Media */}
        <div className="flex justify-between items-start mb-[167px]">
          <div className="text-white">
            <div className="text-[18px] font-normal leading-[27px] whitespace-pre-line">
              IT Group
              <br />
              C. Salvador de Madariaga, 1
              <br />
              28027 Madrid
              <br />
              Spain
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-white text-[18px] font-normal leading-[25px]">
              Follow us on
            </span>
            <img
              src="/images/img_vector_white_a700_23x29.svg"
              alt="Social Media"
              className="w-[29px] h-[23px]"
            />
            <img
              src="/images/img_vector_white_a700_21x31.svg"
              alt="Social Media"
              className="w-[31px] h-[21px]"
            />
          </div>
        </div>

        {/* Copyright and Credits */}
        <div className="flex justify-between items-center">
          <div className="text-[#b7b7b7] text-[16px] font-medium leading-[20px]">
            <span className="font-normal">Copyright © 2022 IT Hote</span>
            <span className="text-[14px]"> </span>
            <span className="font-normal">ls. All rights reserved.</span>
          </div>
          
          <div className="text-[#b7b7b7] text-[16px] font-normal leading-[22px]">
            Photos by Felix Mooneeram
            <span> & Serge Kutuzov</span>
            <span className="font-medium"> on Unsplash</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;