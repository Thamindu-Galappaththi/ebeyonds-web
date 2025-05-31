import React from 'react';

const HeroSection = () => {
return (
  <section className="relative">
    {/* Hero Background Image */}
    <div className="relative h-[350px] sm:h-[500px] md:h-[622px] lg:h-[700px] w-full">
      <img
        src="/images/img_banner.png"
        alt="Cinema Theater"
        className="w-full h-full object-cover"
      />

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 bg-[#0f0f0f] bg-opacity-60 flex items-center">
        <div className="px-4 sm:px-8 md:px-[115px] pt-8 sm:pt-[50px] md:pt-[70px] pb-8">
          <h1 className="text-white text-[28px] sm:text-[42px] md:text-[54px] font-bold leading-tight sm:leading-snug md:leading-normal mb-4 font-din-alternate">
            MOVIE LIBRARY
          </h1>
          <p className="text-[#b7b7b7] text-[14px] sm:text-lg md:text-[20px] leading-relaxed max-w-full sm:max-w-[500px] font-open-sans">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            <br className="hidden sm:block" />
            sed diam nonumy eirmod tempor invidunt ut labore et
            <br className="hidden sm:block" />
            dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </div>
      </div>
    </div>
  </section>
);

};

export default HeroSection;