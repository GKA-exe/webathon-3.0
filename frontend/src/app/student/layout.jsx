import React from 'react';
import SNavbar from '@/Components/SNavbar/SNavbar';
import Footer from '@/Components/Footer/footer';
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

export default function StudentLayout({ children }) {
    return (
      <div>
          <SNavbar />
          {children}
          <Footer />
      </div>
    );
  }
  
