"use client";

import Footer from "@/components/pages/Home/Footer/Footer";
import Nav from "@/components/pages/Home/Nav/TopHeader ";




export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Nav />
      {children}
      <Footer/>
    </>
  );
}
