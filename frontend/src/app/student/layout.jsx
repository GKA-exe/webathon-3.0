import React from 'react';
import SNavbar from '@/Components/SNavbar/SNavbar';
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

export default function StudentLayout({ children }) {
    return (
      <div>
          <SNavbar />
          {children}
      </div>
    );
  }
  