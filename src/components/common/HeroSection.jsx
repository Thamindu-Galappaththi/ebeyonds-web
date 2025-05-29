import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative">
      {/* Hero Background Image */}
      <div className="relative h-[622px] w-full">
        <img
          src="/images/img_banner.png"
          alt="Cinema Theater"
          className="w-full h-full object-cover"
        />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 bg-[#0f0f0f] bg-opacity-50">
          <div className="px-[115px] pt-[70px]">
            <h1 className="text-white text-[54px] font-bold leading-[53px] mb-[15px] font-din-alternate">
              MOVIE LIBRARY
            </h1>
            <p className="text-[#b7b7b7] text-[20px] font-normal leading-[30px] max-w-[527px] font-open-sans">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
              <br />
              sed diam nonumy eirmod tempor invidunt ut labore et
              <br />
              dolore magna aliquyam erat, sed diam voluptua.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;