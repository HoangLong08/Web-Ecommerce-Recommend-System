import React from "react";
import Footer from "../Footer";
import HeaderClient from "../Header/client";
import ScrollButton from "./ScrollButton";
import "./style.css";

function LayoutClient({ children }) {
  return (
    <>
      <HeaderClient />
      <div className="container wrapper-page-content">{children}</div>
      <ScrollButton />
      <Footer />
    </>
  );
}

export default LayoutClient;
