import React, { useState } from "react";
import { Button as ButtonAntd } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import "./Styles.css";

function ScrollButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <ButtonAntd
      type="primary"
      icon={<ArrowUpOutlined />}
      onClick={scrollToTop}
      size={"large"}
      style={{ display: visible ? "inline" : "none" }}
      className="scroll-button"
    />
  );
}

export default ScrollButton;
