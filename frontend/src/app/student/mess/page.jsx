"use client";
import React from 'react';
import Image from 'next/image';
import myImage from '../../../../public/images/dailymenu.png'; // 

const Mess = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4 sm:p-6 md:p-8">
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
      <div className="relative w-full" style={{ paddingTop: '75%' }}>  {/* 4:3 aspect ratio container */}
        <Image
          src={myImage}
          alt="Description of the image"
          fill
          sizes="(max-width: 640px) 100vw, 
                 (max-width: 768px) 85vw, 
                 (max-width: 1024px) 75vw, 
                 (max-width: 1280px) 60vw, 
                 50vw"
          priority={true}
          className="rounded-lg shadow-lg object-contain"
        />
      </div>
    </div>
  </div>
  );
};

export default Mess