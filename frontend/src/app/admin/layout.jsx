import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/footer";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
export default function AdminLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
