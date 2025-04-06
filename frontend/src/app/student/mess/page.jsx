"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import myImage from '../../../../public/images/dailymenu.png';

const Mess = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div 
      className="min-h-screen w-full p-4 sm:p-6 md:p-8"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 md:mb-8">
          <h1 
            className="text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ color: "var(--color-primary)" }}
          >
            Mess Menu Schedule
          </h1>
          <p 
            className="text-center text-sm md:text-base"
            style={{ color: "var(--color-tertiary)" }}
          >
            Today is {currentDay} - Weekly Meal Schedule
          </p>
        </header>

        {/* Menu display */}
        <div 
          className="w-full rounded-lg shadow-lg overflow-hidden"
          style={{ 
            backgroundColor: "white",
            border: "1px solid var(--color-secondary)"
          }}
        >
          <div className="p-4 flex justify-between items-center border-b" 
            style={{ borderColor: "var(--color-secondary)" }}
          >
            <h2 
              className="font-bold text-lg"
              style={{ color: "var(--color-primary)" }}
            >
              Weekly Menu
            </h2>
            <div className="space-x-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-md transition-colors duration-200"
                style={{ backgroundColor: "var(--color-secondary)" }}
                title={isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}
                aria-label={isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  {isFullscreen ? (
                    <>
                      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                      <path d="M21 3h-3a2 2 0 0 1-2-2V3" />
                      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                      <path d="M18 21v-3a2 2 0 0 1 2-2h3" />
                    </>
                  ) : (
                    <>
                      <path d="M15 3h6v6" />
                      <path d="M9 21H3v-6" />
                      <path d="M21 3l-7 7" />
                      <path d="M3 21l7-7" />
                    </>
                  )}
                </svg>
              </button>
              <a
                href={myImage.src}
                download="mess_menu.png"
                className="p-2 rounded-md transition-colors duration-200"
                style={{ backgroundColor: "var(--color-secondary)" }}
                title="Download Menu"
                aria-label="Download Menu"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          <div 
            className={`relative w-full ${isFullscreen ? 'h-screen fixed top-0 left-0 z-50 bg-black' : ''}`} 
            style={{ 
              paddingTop: isFullscreen ? '0' : '75%',
              cursor: isFullscreen ? 'zoom-out' : 'default' 
            }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                  style={{ borderColor: "var(--color-secondary)", borderTopColor: "transparent" }}
                ></div>
              </div>
            )}
            <Image
              src={myImage}
              alt="Weekly mess menu schedule"
              fill
              sizes="(max-width: 640px) 100vw, 
                     (max-width: 768px) 85vw, 
                     (max-width: 1024px) 75vw, 
                     (max-width: 1280px) 60vw, 
                     50vw"
              priority
              className={`rounded-lg ${isFullscreen ? 'object-contain p-4' : 'object-contain'} transition-transform duration-300`}
              onLoadingComplete={() => setIsLoading(false)}
              onClick={() => isFullscreen && setIsFullscreen(false)}
            />
          </div>

          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close fullscreen view"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-6 text-center">
          <p 
            className="text-sm"
            style={{ color: "var(--color-tertiary)" }}
          >
            Menu is subject to change. For questions, contact the mess committee.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mess;
